# intl_messageformat_parser

## 简介

> ICU消息字符串解析，intl_messageformat_parser是icu4j指定的依赖库。

## 下载安装

```shell
ohpm install @f-fjs/intl-messageformat-parser@4.1.2
```

OpenHarmony ohpm
环境配置等更多内容，请参考[如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)

## 使用说明

1. 导入依赖库

```typescript
import * as intl_messageformat_parser from '@ohos/intl_messageformat_parser'
```

2. 按需使用相关接口

```typescript
Button('parse测试').fontSize(24).onClick(() => {
  let input = 'On{takenDate,date,short} {name} took {numPhotos,plural, =0 {no photos.} =1{one photo.} other {# photos}}';
  const ast = intl_messageformat_parser.parse(input);
  setData(JSON.stringify(ast), this.dialogController)
})
```

## 接口说明

- 解析字符串

```
parse(input: string, opts ? : ParseOptions):MessageFormatElement[]
```

## 约束与限制

在下述版本验证通过：

- DevEco Studio 版本：4.1 Canary(4.1.3.317)，OpenHarmony SDK:API version 11 (4.1.0.36)

## 目录结构

````
|---- OHOS_APP_icu4j  
|     |---- entry  # 示例代码文件夹
|     |---- intl_messageformat_parser  # intl_messageformat_parser库
|           |---- ets #核心代码目录
|     |---- README.md  # 安装使用方法                    
````

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-sig/intl_messageformat_parser/issues)
给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-sig/intl_messageformat_parser/pulls) 。

## 开源协议

本项目基于 [Apache LICENSE](https://gitee.com/openharmony-sig/intl_messageformat_parser/blob/master/LICENSE)
，请自由地享受和参与开源。

  

