# lz4jsDemo

## 简介

本demo是基于openHarmony系统下使用三方js库[lz4js](https://github.com/Benzinga/lz4js)，lz4js提供lz4格式压缩解压码功能

## 下载安装

```
  ohpm install lz4js
```
OpenHarmony ohpm 环境配置等更多内容，请参考 [如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)

## 使用说明
 
### 1.使用lz4js压缩解压。
```
  import lz4 from 'lz4js'

// Compress 128 bytes of zero.
var compressed = lz4.compress(new Array(128));

// Decompress.
var decompressed = lz4.decompress(compressed);

```

## 接口说明

|                  方法名                  |          入参          |    接口描述     |
|:-------------------------------------:|:--------------------:|:-----------:|
|            compress(data)             |      data：压缩内容       | lz4js压缩功能 |
|           decompress(data)            |      data：解压内容       |  lz4js解压功能  |

## 目录结构

```
/lz4jsDemo  # 工程代码
|—— entry   # 工程demo示例
│   └── main
│       └── ets
│       └── pages  
│           └── Index.ets             # lz4js示例
```

## 约束与限制
在下述版本验证通过：
- DevEco Studio: 4.0 (4.0.3.512), SDK: API10 (4.0.10.9)
- DevEco Studio: 3.1 Beta2(3.1.0.400), SDK: API9 Release(3.2.11.9) 。

## 开源协议

本项目基于 [Apache License 2.0](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/lz4jsDemo/LICENSE) ，请自由地享受和参与开源。

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。