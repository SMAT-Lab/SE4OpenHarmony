# jszip

## 简介

[jszip](https://github.com/xqdoo00o/jszip) ，是一个支持创建、编辑以及生成压缩文件的工具库。本库基于[jszip](https://github.com/xqdoo00o/jszip) 原库 v3.5.0 版本进行适配，使其可以运行在 OpenHarmony，并沿用其现有用法和特性。

## 下载安装

```javascript
ohpm install @ohos/jszip
```

OpenHarmony ohpm 环境配置等更多内容，请参考[如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)

## 接口和属性列表

接口列表

| **接口**                                         | 参数                                                                     | 功能             |
| ------------------------------------------------ | ------------------------------------------------------------------------ | ---------------- |
| file                       | (path,data[, options])                                            | 创建文件         |
| folder                                     | (name)                                            | 创建文件夹         |
| forEach    | (callback:(relativePath,file) => void)                                           | 遍历目录及文件         |
| filter | (predicate:(relativePath,file) => boolean)     | 支持过滤目录/文件    |
| remove                                    | (path)   | 移除目录或者文件 |
| generateAsync                  | (options,onUpdate) | 异步生成压缩文件，支持设置密码   |
| loadAsync                          | (data,options) | 异步加载压缩文件  |



## 使用示例
创建zip实例
```javascript
import JSZip from "@ohos/jszip";

const jszip = new JSZip();
```

创建文件

```javascript
jszip.file("xxx.txt","这是一段文本");
```

创建文件夹

```javascript
jszip.folder("xxx");
```

指定目录下创建文件或文件夹
```javascript
const folder = jszip.folder("xxx");

folder.folder("xxx");
folder.file("xxx.txt","这是一段文本");
```


异步生成压缩文件
```javascript
jszip.generateAsync({ type: "arraybuffer"})
```
异步生成加密压缩文件
```javascript
jszip.generateAsync({ type: "arraybuffer", password: "1234", encryptStrength: 3 })
```

异步加载压缩文件
```javascript
jszip.loadAsync(data)
```


## 约束与限制

在下述版本验证通过：
DevEco Studio: 4.1.3.313, SDK: API11(4.1.2.1)

## 目录结构

```javascript
|---- jszip
|     |---- AppScrope  # 示例代码文件夹
|     |---- entry  # 示例代码文件夹
|     |---- jszip  # jszip库文件夹
|           |---- src  # 模块代码
|                |---- core   # jszip核心代码
|                |---- dist   # 打包脚本生成代码
|                |---- type   # 类型声明文件
|           |---- index.ets        # 入口文件
|           |---- *.json5      # 配置文件
|           |---- rollup.config.js      # rollup配置文件
|     |---- README.md  # 安装使用方法
|     |---- README.OpenSource  # 开源说明
|     |---- CHANGELOG.md  # 更新日志
```

## 开源协议

本项目基于 [Apache License 2.0](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/jszipDemo/LICENSE ) ，请自由地享受和参与开源。

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues ) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls ) 。
