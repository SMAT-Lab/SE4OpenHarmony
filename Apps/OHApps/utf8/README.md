# utf8

## 简介

> 在OpenHarmony环境下,提供了UTF-8的编码能力和解码能力。

## 下载安装

```shell
ohpm install utf8
```

OpenHarmony ohpm 环境配置等更多内容，请参考[如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)
## 使用说明

### UTF8编解码使用

```typescript
import utf8 from "utf8";
import promptAction from '@ohos.promptAction';
@Entry
@Component
struct Index {
  @State message: string = 'Hello World'

  build() {
    Row() {
      Column() {
        Button("编码(encode)").onClick(() => {
          this.showMessage(utf8.encode('\xA9'));
          this.showMessage(utf8.encode('\uD800\uDC01'));
        })
        Button("解码(decoded)").onClick(() => {
          this.showMessage(utf8.decode('\xC2\xA9'));
          this.showMessage(utf8.decode('\xF0\x90\x80\x81'));
        })
      }
.width('100%')
}
.height('100%')
}

showMessage(message:string){
  promptAction.showToast({message})
}
}
```

## 约束与限制

在下述版本验证通过：

DevEco Studio版本: 4.0Canary2(4.0.1.300), SDK: API10(4.0.9.6)

## 目录结构

```

/entry/src/
- main/ets/     
    - pages                        # 测试page页面列表
       - Index.ets                    	# 测试UTF8编解码能力
```

单元测试用例详情见[TEST.md](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/utf8/TEST.md)

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues)
给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议

本项目基于 [MIT License]() ，请自由地享受和参与开源。



