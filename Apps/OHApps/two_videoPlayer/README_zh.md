# two_videoPlayer应用

### 介绍
视频播放的主要工作是将视频数据转码并输出到设备进行播放，同时管理播放任务。本文将对视频播放全流程、视频切换、视频循环播放等场景开发进行介绍说明。
本示例主要展示了播放本地视频和网络视频相关功能。

使用说明

1.点击视频界面，唤起视频操作面板，再次点击操作面板消失，如果不做任何操作操作界面会5s自动消失;

2.点击暂停/播放按钮，控制视频暂停播放;

3.滑动视频进度条，视频跳转到指定位置,在视频中间会出现时间进度方便用户查看视频进度;


### 目录结构
```
VideoPlay/src/main/ets/
|---common
|   |---ipVideo.ets                            // 网络视频
|   |---localVideo.ets                          // 本地视频
|---pages
|   |---Index.ets                                // 首页视频界面
```

### 具体实现
+ 使用VideoController()对象controller来控制video播放，暂停，播放进度;
+ 使用windowClass.setKeepScreenOn接口设置常亮；
+ 暂停、播放：点击暂停、播放时调用controller.pause()、controller.play();
+ 视频跳转：在拖动滑动条时调用controller.setCurrentTime()

### 相关权限

ohos.permission.INTERNET(网络权限)

### 依赖
不涉及。

### 约束与限制

1.本示例仅支持标准系统上运行,需要联网才能够播放网络视频;

2.本示例已适配API10版本SDK,版本号：4.0.10.13,镜像版本号：OpenHarmony4.0.7.5;

3.本示例需要使用DevEco Studio 4.0 (构建版本：4.0.0.400, 构建 2023年8月2日)才可编译运行。