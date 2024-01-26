# 图片显示

### 介绍

本示例展示从相册选择图片展示在商品评价页面。

本示例使用 [TextArea](https://developer.harmonyos.com/cn/docs/documentation/doc-references-V3/ts-basic-components-textarea-0000001427902464-V3) 组件实现多文本输入，使用 [mediaLibrary](https://developer.harmonyos.com/cn/docs/documentation/doc-references-V3/js-apis-medialibrary-0000001478061921-V3#ZH-CN_TOPIC_0000001478061921__medialibrary) 实现图片的获取与选择。

### 使用说明

1.点击添加图片/照片，页面跳转到图片选择页面。

2.进入图片选择页面后，选择需要显示的图片，选择的图片数量会显示在右上方，选择的图片会显示在下方。最多选择6张图片。

3.选定图片后点击下一步，页面会跳转回主页面，图片显示在主页。若不确定选择，点击添加图片/照片进行重新选择。

4.图片选择后，点击文本输入框，可以对商品进行评价。

5.点击返回按钮，退出应用。

### 效果预览

![](screenshots/devices/zh/index.png) ![](screenshots/devices/zh/not_choice.png) ![](screenshots/devices/zh/choice.png) ![](screenshots/devices/zh/show.png)

### 工程结构
```
entry/src/main/ets/                 
|---MainAbility
|   |---MainAbility.ts                    
|---pages
|   |---Index.ets                      // 主页
|   |---ChoicePhoto.ets                // 选择图片/照片
|   |---utils.ts
```

### 具体实现
* 本示例分为三个模块：
    * 发表评价页面模块：
        * 使用scroll，TextArea，Grid等组件开发发表评价页面
        * 源码链接：[Index.ets](entry/src/main/ets/pages/Index.ets)
        * 参考接口：[@ohos.router](https://gitee.com/openharmony/docs/blob/master/zh-cn/application-dev/reference/apis/js-apis-router.md)

    * 选择图片/照片模块
        * 调用依赖中ChoicePhotos方法打开相册，mediaquery媒体查询相册，getMediaLibrary获取媒体库的实例，访问用户等个人媒体数据信息并选中图片
        * 源码链接：[ChoicePhotos.ets](imagelibrary/src/main/ets/components/pages/ChoicePhotos.ets)，[MainAbility.ts](entry/src/main/ets/MainAbility/MainAbility.ts)
        * 参考接口：[@ohos.router](https://gitee.com/openharmony/docs/blob/master/zh-cn/application-dev/reference/apis/js-apis-router.md)，[@ohos.promptAction](https://gitee.com/openharmony/docs/blob/master/zh-cn/application-dev/reference/apis/js-apis-promptAction.md)，[@ohos.mediaquery](https://gitee.com/openharmony/docs/blob/master/zh-cn/application-dev/reference/apis/js-apis-system-mediaquery.md)，[@ohos.multimedia.mediaLibrary](https://gitee.com/openharmony/docs/blob/master/zh-cn/application-dev/reference/apis/js-apis-medialibrary.md)，[@ohos.abilityAccessCtrl](https://gitee.com/openharmony/docs/blob/master/zh-cn/application-dev/reference/apis/js-apis-abilityAccessCtrl.md)

    * 提交模块
        * 选中图片后点击下一步按钮，回到发表评价页面，点击提交按钮进行提交
        * 源码链接：[Index.ets](entry/src/main/ets/pages/Index.ets)
        * 参考接口：[@ohos.router](https://gitee.com/openharmony/docs/blob/master/zh-cn/application-dev/reference/apis/js-apis-router.md)


### 相关权限

[ohos.permission.READ_MEDIA](https://developer.harmonyos.com/cn/docs/documentation/doc-guides/permission-list-0000001281480750)

### 依赖

不涉及

### 约束与限制

1. 本示例仅支持在标准系统上运行，支持设备：华为手机或者运行在DevEco Studio上的华为手机模拟器。
2. 本示例为Stage模型，从API version 9开始支持。
3. 本示例需要使用DevEco Studio 3.1 Beta2 (Build Version：3.1.0.400)才可编译运行。