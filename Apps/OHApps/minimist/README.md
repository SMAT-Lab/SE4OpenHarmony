# minimist

## 简介

> 一个轻量级的命令行参数解析库，用于解析Node.js应用程序的命令行参数。它的主要功能是将命令行参数解析为一个对象，方便开发者在程序中使用.

## 下载安装

```shell
ohpm install minimist
```

OpenHarmony
ohpm环境配置等更多内容，请参考 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。

## 使用说明

1. 引入文件及代码依赖

 ```
 import minimist from 'minimist'
 
 let parse = minimist(['-f', '11', '--zoom', '55'], { alias: { z: ['zm', 'zoom']}})
 // {"_":[],"f":11,"zoom":55,"z":55,"zm":55} 
 ```

## 接口说明

* 将命令行参数解析为一个 JavaScript 对象
  `minimist(args, opts={})`

## 目录结构
````
|---- minimist
|     |---- entry  # 示例代码文件夹
              ├── src  
                 ├── main   
                   ├── ets
                       ├── pages
                             ├── Index.ets  sample代码
|     |---- README.md  # 安装使用方法                    
````
## 约束与限制

在下述版本验证通过：

- DevEco Studio 版本： 4.1 Canary(4.1.3.317),OpenHarmony SDK:API11 (4.1.0.36)

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues)
给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议

本项目基于 [MIT License](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/minimist/LICENSE) ，请自由地享受和参与开源。

