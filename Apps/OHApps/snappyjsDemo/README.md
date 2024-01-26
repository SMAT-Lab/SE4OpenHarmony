# snappyjsDemo

## 简介

本demo是基于openHarmony系统下使用三方js库[snappyjs](https://github.com/zhipeng-jia/snappyjs)，snappyjs提供snappy格式压缩解压码功能

## 下载安装

```
  ohpm install snappyjs
```
OpenHarmony ohpm 环境配置等更多内容，请参考 [如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)

## 使用说明


### 1.使用snappyjs压缩解压。
```
  import snappyJS from 'snappyjs'
  
var buffer = new ArrayBuffer(100)
var compressed = snappyJS.compress(buffer)
var uncompressed = snappyJS.uncompress(compressed)
```

## 接口说明

|                    方法名                    |                            入参                            |    接口描述    |
|:-----------------------------------------:|:--------------------------------------------------------:|:----------:|
|              compress(data:Uint8Array\|ArrayBuffer)              |            data:Uint8Array和ArrayBuffer类型压缩内容             | snappy压缩功能 |
|             uncompress(data:Uint8Array\|ArrayBuffer)             |            data：Uint8Array和ArrayBuffer类型解压内容             |  snappy解压功能  |

## 目录结构

```
/snappyjsDemo  # 工程代码
|—— entry   # 工程demo示例
│   └── main
│       └── ets
│           └── pages  
│               └── Index.ets             # snappyjs示例 
```

## 约束与限制
在下述版本验证通过：

DevEco Studio: 3.1 Beta2(3.1.0.400), SDK: API9 Release(3.2.11.9)
DevEco Studio: 4.0(4.0.3.512),SDK: API10（4.0.10.9）

## 开源协议

本项目基于 [Apache License 2.0](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/snappyjsDemo/LICENSE) ，请自由地享受和参与开源。

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。