# 仿应用示例

### 介绍

本示例主要展示了网络连接、文件上传、音视频播放等媒体方面的应用。  

使用说明  

1. 搭建服务器环境：https://help.jeecg.com/java/setup/tools.html 。  

2. 启动服务器：[服务器前端目录](../../../../jeecgboot-vue3-master)，[服务器后端目录](../../../../jeecg-boot-master)。  

3. 打开应用，此时为仿应用主页，循环播放视频，可点击暂停或者播放。  

4. 点击右上角**搜索图标**，可进入搜索页面，默认展示**综合类**结果页面，由于搜索历史记录及对应搜索结果都是静态模拟数据，所以可点击前三个任意一条记录以展示不同搜索结果，也可输入与前三条记录一致的结果以展示不同搜索结果。  

5. 点击**头像**可播放音乐，下滑点击**播放**按钮可播放视频。  

6. 点击**视频**展示**视频类**结果页面，点击左上角返回图标回到**首页**。  

7. 点击首页**消息**进入好友列表，好友列表为模拟数据，只可点击第一位进入聊天页面。  

8. 进入聊天页面，输入文字，点击**发送**图标可发送消息至好友，点击返回回到首页。  

9. 点击首页**加号**图标进入**录制视频**页面，首先进行授权，每条权限等待上一条权限授权成功后再继续授权，点击**红色按钮**录制，等待若干秒后再次点击停止录制，点击**下一步**进入发布页面。  

10. 在发布页面点击右下角**发布按钮**，则发布视频至服务端，发布成功后回到首页。  

### 工程目录

```
/Socket
├── entry                                                  # 主entry模块目录
│   └── src
│       ├── main
│           ├── ets                                        # ets模块目录
│               ├── components                             # 组件目录
│                   ├── ChatComponent.ets                  # 聊天
│                   ├── MessageComponent.ets               # 首页中消息组件
│                   ├── SearchComponent.ets                # 搜索
│                   ├── SearchPlayMusicComponent.ets       # 搜索结果综合类音频
│                   ├── SearchPlayVideoComponent.ets       # 搜索结果综合类视频
│                   ├── SearchResultComponent.ets          # 搜索结果组件
│                   ├── SearchSynthesizeComponent.ets      # 搜索结果综合类
│                   ├── SearchVideoComponent.ets           # 搜索结果视频类
│                   ├── VideoComponent.ets                 # 首页中视频组件
│               ├── controller                     
│                   ├── ChatController.ts                  # 负责聊天发送消息
│                   ├── LoginController.ts                 # 负责登录
│                   ├── UploadController.ts                # 负责上传文件
│               ├── entryability                
│               ├── appsampled                           
│                   ├── data                               # 实体类目录
│                       ├── ChatBox.ts                     # 消息信息实体
│                       ├── DataSource.ts                  # 数据源，懒加载使用
│                       ├── LoginResult.ts                 # 登录信息实体
│                       ├── R.ts                           # 返回结果信息实体
│                       ├── SearchResult.ts                # 搜索结果信息实体
│                       ├── Tool.ts                        # 工具类实体
│                       ├── User.ts                        # 用户类实体
│                   ├── pages                              # 数据源实体
│                       ├── CameraPage.ets                 # 相机录制页面
│                       ├── ChatPage.ets                   # 聊天页面
│                       ├── Login.ets                      # 登录页面
│                       ├── PublishPage.ets                # 发布页面
│                       ├── SearchPage.ets                 # 搜索页面
│               ├── mock                                   # 模拟数据
│               ├── model                            
│                   ├── AVPlayerModel.ts                   # 负责音视频播放
│                   ├── CameraModel.ts                     # 负责相机预览和录制等管理
│                   ├── MediaModel.ts                      # 负责媒体查询等媒体文件操作
│                   ├── NetworkModel.ts                    # 负责网络通信等操作
│               ├── pages                           
│                   ├── Index.ets                          # 首页
│               ├── utils                                  # 工具类目录
```

### 具体实现

- 网络连接合请求：@ohos.net.http  
- 消息接收：@ohos.net.webSocket  
- 文件上传：@ohos.request  
- 文件操作：@ohos.multimedia.mediaLibrary  
- 音视频播放：@ohos.multimedia.media  

### 相关权限

网络权限: ohos.permission.INTERNET  
相机权限: ohos.permission.CAMERA  
麦克风权限: ohos.permission.MICROPHONE  
媒体位置权限: ohos.permission.MEDIA_LOCATION  
媒体文件写入权限: ohos.permission.WRITE_MEDIA  
媒体文件读取权限: ohos.permission.READ_MEDIA  

### 依赖

1. windows上启动服务器前端代码，模拟消息转发服务器[服务器前端目录](../../../../jeecgboot-vue3-master)  
2. windows上启动服务器后端代码，模拟消息转发服务器[服务器后端目录](../../../../jeecg-boot-master)  

### 约束与限制

1. 本示例仅支持标准系统上运行，支持设备：RK3568。  

2. 本示例为Stage模型，仅支持API10版本SDK，版本号：4.0.7.5，镜像版本号: OpenHarmony 4.0.7.5。  

3. 本示例需要使用DevEco Studio 3.1 Release (Build Version: 3.1.0.500, built on April 28, 2023)才可编译运行。  

4. 本示例在启动前需搭建服务端环境，需与客户端处于同一局域网，成功启动服务端后再运行客户端，服务端代码（[服务器前端代码](../../../../jeecgboot-vue3-master)，[服务器后端代码](../../../../jeecg-boot-master)）。  

5. 在进入录制页面授权时，在授权第三条权限之前等待若干秒，等待上一条权限授权成功后再继续授权，否则可能授权失败。  

### 下载

如需单独下载本工程，执行如下命令：  

```
git init
git config core.sparsecheckout true
echo sample/AppSampleD/ > .git/info/sparse-checkout
git remote add origin https://gitee.com/openharmony/xts_tools.git
git pull origin master
```