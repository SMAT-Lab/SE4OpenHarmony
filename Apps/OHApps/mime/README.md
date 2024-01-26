# mime

## 简介

获取给定文件路径或扩展名的 mime 类型。

## 安装

```
ohpm install mime
```

OpenHarmony ohpm 环境配置等更多内容，请参考[如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)

## 使用说明

```
import mime from "mime";

mime.getType('js'); // application/javascript
mime.getExtension('text/plain')  // txt;
```

## 约束与限制

在下述版本验证通过：
DevEco Studio: 4.1 Canary(4.1.3.213), SDK: API11 4.1.2.3

## 目录结构

```
|---- mime
|     |---- entry  # 示例代码文件夹
|     |---- README.md  # 安装使用方法
```

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议

本项目基于 [MIT License](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/mime/LICENSE) ，请自由地享受和参与开源。
