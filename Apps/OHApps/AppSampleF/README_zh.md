# 仿应用示例 

### 介绍

仿应用扫一扫,选择“扫一扫”功能，将手机对准二维码或条形码即可自动识别。
扫描成功后，APP将自动跳转到对应的商品详情页面，用户可以查看商品的详细信息。
[@ohos.multimedia.image](https://gitee.com/openharmony/docs/blob/OpenHarmony-4.0-Beta1/zh-cn/application-dev/reference/apis/js-apis-image.md)，[@ohos.multimedia.camera](https://gitee.com/openharmony/docs/blob/OpenHarmony-4.0-Beta1/zh-cn/application-dev/reference/apis/js-apis-camera.md)
等接口,实现了拉起相机识别二维码的功能。实现效果如下;

### 效果预览

| 首页                                                        | 扫描                                                                            | 信息展示                                                                          | 
|-----------------------------------------------------------|-------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| ![首页.png](screenshots%2Fdevices%2F%E9%A6%96%E9%A1%B5.png) | ![扫描界面.png](screenshots%2Fdevices%2F%E6%89%AB%E6%8F%8F%E7%95%8C%E9%9D%A2.png) | ![信息界面.png](screenshots%2Fdevices%2F%E4%BF%A1%E6%81%AF%E7%95%8C%E9%9D%A2.png) |

使用说明

1.启动应用,首页展示扫一扫跳转页面,点击扫一扫跳转至相机模块;

2.将二维码放入相机界面进行扫描，扫描到结果后会跳转到详情页面。


### 目录结构

```
AppSampleF/src/main/ets/
|---model
|   |---CameraModel.ets                          // 相机管理
|---pages
|   |---cameraPage                               
|       |---CameraPage.ets                       // 相机界面
|   |---messagePage                               
|       |---Message.ets                          // 信息展示界面
|   |---Index.ets                                // 首页
|---utils
|   |---Decode.ets                               // 解码帮助类
|   |---Logger.ts                                // 日志帮助类
|   |---PermissionUtils.ets                      // 权限帮助类
|---workers                                 
|   |---DeCodeWorker.ts                          // 解码worker线程
```

### 具体实现
+ 本示例通过相机循环拍照获取byteBuffer后，传给zxing解码库的解码方法来识别二维码、条形码信息，源码参考[DeCode.ets](entry%2Fsrc%2Fmain%2Fets%2Futils%2FDeCode.ets)，
[CameraModel.ets](entry%2Fsrc%2Fmain%2Fets%2Fmodel%2FCameraModel.ets)；
+ 接口参考：[@ohos.worker](https://gitee.com/openharmony/docs/blob/master/zh-cn/application-dev/reference/apis/js-apis-worker.md)
，[@ohos.multimedia.camera](https://gitee.com/openharmony/docs/blob/master/zh-cn/application-dev/reference/apis/js-apis-camera.md)
，[@ohos.multimedia.image](https://gitee.com/openharmony/docs/blob/master/zh-cn/application-dev/reference/apis/js-apis-image.md)
，[@ohos.events.emitter](https://gitee.com/openharmony/docs/blob/master/zh-cn/application-dev/reference/apis/js-apis-emitter.md)；

### 相关权限
#### 本示例需要在module.json5中配置如下权限:
#### 允许使用相机服务：[ohos.permission.CAMERA](https://gitee.com/openharmony/docs/blob/master/zh-cn/application-dev/security/permission-list.md#ohospermissioncamera)

### 依赖

1.第三方解码库：[Zxing](https://gitee.com/openharmony-tpc/zxing)，[参考如何安装ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)。

### 约束与限制

1.本示例仅支持标准系统上运行,支持设备:RK3568；

2.本示例已适配API10版本SDK,版本号：4.0.7.5,镜像版本号：OpenHarmony4.0.7.5；

3.本示例需要使用DevEco Studio 3.1 Release (Build Version: 3.1.0.500, built on April 28, 2023)才可编译运行；

4.由于decode解码一次需要4-5s，识别速度较慢，所以扫描时间比较久。

### 下载

如需单独下载本工程，执行如下命令：

```
git init
git config core.sparsecheckout true
echo sample/AppSampleF/ > .git/info/sparse-checkout
git remote add origin https://gitee.com/openharmony/xts_tools.git
git pull origin master
```