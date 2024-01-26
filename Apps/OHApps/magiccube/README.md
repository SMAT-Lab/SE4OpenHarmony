# OpenGL魔方2.0
## 实现介绍
本例使用Native XComponent作为opengl的自定义绘制画板，使用opengl es 3.0标准进行魔方的绘制。通过滑动屏幕，可以对魔方进行旋转变换，可借此观察魔方的各个部分。在右侧菜单选择旋转轴与旋转面，点击旋转，左侧的魔方相应面便会按旋转轴逆时针旋转90°
![2.jpg](../figures/magiccube/2.jpg)
![3.jpg](../figures/magiccube/3.jpg)
## 运行环境要求
本示例仅支持在标准系统上运行。  
* 系统要求：openharmony 4.0 Beta2及以上
* SDK：full sdk 4.0.9.6(API Version 10)
* 开发工具: DevEco Studio 4.0.0.400
* Gpu: 支持OpenGL ES 3.0及以上
## XComponent简介
`Native XComponent`是`XComponent`组件提供在Native层的实例，可作为JS层和Native层`XComponent`绑定的桥梁。`XComponent`所提供的的NDK接口都依赖于该实例。接口能力包括获取`Native Window`实例、获取`XComponent`的布局/事件信息、注册`XComponent`的生命周期回调、注册`XComponent`的触摸、鼠标、按键等事件回调。针对`Native XComponent`，主要的开发场景如下：
1. 利用`Native XComponent`提供的接口注册`XComponent`的生命周期和事件回调。
2. 在这些回调中进行初始化环境、获取当前状态、响应各类事件的开发。
3. 利用`Native Window`和`EGL`接口开发自定义绘制内容以及申请和提交Buffer到图形队列。

本例主要使用场景是第三点，即opengl绘图场景。在`XComponent`的`context`实现类的`OnSurfaceCreated`回调中，会接收到一个类型为`void*`的`handle`,实际上的类型为`EGLNativeWindowType`，所以需要使用强制类型转换，转换为`EGLNativeWindowType`。然后有了这个`handle`就可使用`EGL`来创建opnegl上下文和`surface`，进而就可在`XComponent`上进行自定义绘制。
## 开发流程
### DevEco Studio创建Native C++项目
点击新建，选择Native C++项目，如图所示：
![1.jpg](../figures/magiccube/1.jpg)
### 添加opengl依赖
在项目根文件夹中进入`entry/src/main/cpp`文件夹，打开`CMakeLists.txt`,在末尾添加以下行
```cmake
target_link_libraries(tetrahedron_napi PUBLIC EGL)
target_link_libraries(tetrahedron_napi PUBLIC GLESv3)
target_link_libraries(tetrahedron_napi PUBLIC hilog_ndk.z)
target_link_libraries(tetrahedron_napi PUBLIC ace_ndk.z)
target_link_libraries(tetrahedron_napi PUBLIC ace_napi.z)
target_link_libraries(tetrahedron_napi PUBLIC uv)
```
以添加opengl相关依赖库至项目中
### 引入相关文件
由于`Native XComponent`底层代码较复杂，且相对固定。可将[NativeOpenGL](https://gitee.com/openharmony/applications_app_samples/tree/master/code/BasicFeature/Native/NdkOpenGL)项目的`module.cpp`,`napi_manager.cpp`,`napi_manager.h`,`napi_util.cpp`,`napi_util.h`,`app_napi.cpp`,`app_napi.h``native_common.h`源文件,复制到项目中。这样就相当于有了一个现成的框架，只需要关心opengl的代码部分。
### 导入依赖库
由于扭动部分需要进行矩阵运算，所以使用了[glm](https://github.com/g-truc/glm)作为矩阵运算库，glm是一个纯头文件库，因此运行sample时下载glm到`entry/src/main/cpp/include`即可
### 编写opengl实现部分
创建一个OpenglDraw类，实现以下public成员函数，并定义旋转轴和旋转面，旋转方向的枚举类
```C++
enum class Axis { X, Y, Z };

enum class Face { Left, Middle, Right };

enum class RotateDir : int { clockwise = -1, Counterclockwise = 1 };

int32_t Init(EGLNativeWindowType windowHandle, int windowWidth,int windowHeight);
void Update(void);
int32_t Quit(void);
void twist(TwistMode mode, Axis axis, Face face, RotateDir dir = RotateDir::Counterclockwise);
void resetAngle();
void route(float x,float y);
```
#### 初始化opengl环境
首先Init函数在`AppNapi`类的`OnSurfaceCreated`回调中调用，该回调将参数类型强制类型转换后传入init函数:
```C++
int32_t ret = OH_NativeXComponent_GetXComponentSize(component, window, &width_, &height_);
if (ret == OH_NATIVEXCOMPONENT_RESULT_SUCCESS) {
    openglDraw->Init(reinterpret_cast<EGLNativeWindowType>(window), width_, height_);
    openglDraw->Update();
    isCreated_++;
    xcHeight_ = height_;
    xcWidth_ = width_;
}
```
OpenglDraw函数通过传入的`window handle`和窗口尺寸，来初始化`EGL`，opengl上下文和编译着色器:
```C++
mEglWindow = handle;
mEGLDisplay = eglGetDisplay(EGL_DEFAULT_DISPLAY);
if (mEGLDisplay == EGL_NO_DISPLAY) {
    return -1;
}
EGLint eglMajVers, eglMinVers;
if (!eglInitialize(mEGLDisplay, &eglMajVers, &eglMinVers)) {
    mEGLDisplay = EGL_NO_DISPLAY;
    return -1;
} 
mEGLConfig = getConfig(mEGLDisplay);
if (mEGLConfig == nullptr) {
    return -1;
}
EGLint winAttribs[] = {
    EGL_GL_COLORSPACE_KHR, EGL_GL_COLORSPACE_SRGB_KHR,
    EGL_NONE
};
if (mEglWindow) {
    mEGLSurface = eglCreateWindowSurface(mEGLDisplay, mEGLConfig, mEglWindow, winAttribs);
    if (mEGLSurface == nullptr) {
        return -1;
    }
}
int attrib3_list[] = {
    EGL_CONTEXT_CLIENT_VERSION, 3,
    EGL_NONE
};
mEGLContext = eglCreateContext(mEGLDisplay, mEGLConfig, mSharedEGLContext, attrib3_list);
eglMakeCurrent(mEGLDisplay, mEGLSurface, mEGLSurface, mEGLContext)
glViewport(0, 0, width, height);
routeMat = glm::mat4(1.0f);
glEnable(GL_DEPTH_TEST);
vertexManger = new VertexManger(vertices, colors, offsets);
shader = new Shader(vertexShader, fragmentShader);
return 0;
```
初始化的时候，如果使用opengl es 3.0标准，注意给`eglCreateWindowSurface`传入的EglConfig，需要将`EGL_RENDERABLE_TYPE`设置为`EGL_OPENGL_ES3_BIT`,给`eglCreateContext`传入的attrib3_list，`EGL_CONTEXT_CLIENT_VERSION`也需要设置为3，如果没有完全
设置，则不会启用es3.0标准。打开深度测试时，除了需要调用`glEnable(GL_DEPTH_TEST)`,也需要在EglConfig中添加`EGL_DEPTH_SIZE, 24`来申请深度缓冲区，因为EGL默认并不会申请深度缓冲区，如果没有深度缓冲区将会无法执行深度测试，导致面绘制错乱的问题。初始化完成后，`OnSurfaceCreated`继续调用`update`函数来更新绘制图像。
#### 绘制魔方
绘制部分，本例采用的方式是图元分解法，一个n阶魔方可以看作由$n^3-(n-2)^3$个小正方体组成，每个正方体的颜色面也是一致的排列，因此可以先设置好小正方体组成的所有三角形顶点参数和颜色，然后使用`glDrawArraysInstanced`一次性画出26个小正方体，在之前传入`offsets`,`translate`实例化数组，合理设置`offsets`数组的值会让每个小正方体平移到魔方相应的位置。`translate`记录每个正方体所做的旋转变换，可使每个正方体旋转不同的角度，进而实现魔方的扭动。
#### 旋转魔方
napi提供了`updateAngle`方法，传入两个参数，分别是滑动时在x轴偏移的距离与y轴偏移的距离,然后根据距离乘以一个旋转速度转化为平移的角度值，然后更新`OpenglDraw`类的`angleX`，`angleY`字段,调用`update()`更新图像。`OpenglDraw`类的`update()`函数会读取`angleX`，`angleY`字段，转换为弧度值，计算sin,cos生成对应的旋转矩阵，然后送入顶点着色器的`uniform`中，再调用绘制函数，绘制时着色器便会乘以这个旋转矩阵完成旋转变换。
##### 扭动魔方
napi提供了`twist`方法，传入四个参数，分别是扭动的旋转轴以及旋转面,旋转方向,视角模式的枚举
###### 自由视角模式
当处于自由视角模式时，先遍历魔方的每个小正方体的中心点坐标，找到需要旋转的小正方体(旋转面如为左面则旋转轴对应到坐标的分量小于0，中间面则等于0，右面则大于0),找到符合的小正方体后，调用`twistOneBlock`方法旋转这个小正方体，只需要取出小正方体对应的旋转矩阵，乘以逆时针或者顺时针旋转90°的旋转矩阵后即可，然后调用`draw`方法重新绘制旋转后的魔方图像。
###### 固定视角模式
当处于固定视角模式时，由于视角所在的x,y轴是已经旋转后的相对于摄像机的x,y轴，并不同于自由视角模式的世界坐标系。相对于摄像机的坐标系是用世界坐标系的坐标乘于旋转矩阵得到的，因此通过相对于摄像机的坐标系求出对应的世界坐标系需要做相应的逆运算，也就是用相对于摄像机的坐标系坐标乘以旋转矩阵的逆矩阵得到。获得世界坐标系的旋转轴后，步骤与自由视角模式相同。
#### ets编写
在ui中添加一个`XComponent`控件给opengl提供画板,设置其id,`type`设置为surface,`libraryname`设置为magiccube,库名并不用带lib前缀和.so后缀。自由视角模式需要添加`gesture`控件方法添加触摸监听，传入`PanGesture`使用滑动触摸的监听，在`onActionUpdate`(滑动中)回调中，调用libmagiccube.so中napi提供的`updateAngle`方法来旋转魔方的位置，这样就能实现滑动旋转魔方的效果。在右侧新增俩个选择框，一个文本框和一个按钮，选择框用于选择旋转面和旋转轴，在按钮点击的回调事件中调用`twist`方法，传入旋转轴和旋转面即可完成扭动。固定视角模式需要添加在`onActionStart`(滑动开始)回调，记录开始滑动的x坐标和y坐标，添加`onActionEnd`(滑动结束)回调，根据开始滑动的坐标以及现在的坐标，计算滑动的方向以及滑动的面，然后调用`twist`方法进行扭动。
### 注意事项
在遍历魔方的每个小正方体的中心点坐标，找到需要旋转的小正方体时，由于坐标都是以单精度浮点数存储的，因此在进行矩阵运算时可能会发生精度损失，因此不能直接去判断小于0，等于0或者大于0。而是要考虑误差情况。代码如下：
```C++
constexpr double precision = 0.000001f;
switch (face) {
    case Face::Left:
        if (block[index] < -precision) {
            twistOneBlock(i, axis, dir);
        }
        break;
    case Face::Middle:
        if (std::fabs(block[index]) < precision) {
            twistOneBlock(i, axis, dir);
        }
        break;
    case Face::Right:
        if (block[index] > precision) {
            twistOneBlock(i, axis, dir);
        }
        break;
    default:
        break;
}
```