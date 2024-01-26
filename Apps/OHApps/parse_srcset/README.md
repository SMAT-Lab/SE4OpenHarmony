# parse-srcset

## 简介

> parse-srcset。HTML5 srcset属性的javascript解析器，基于WHATWG参考算法。它有一个基于W3C srcset一致性检查器的广泛测试套件。它符合jQuery
> JSCS样式规则。
> 为了兼容性，使用internet -geezer编写测试。

## 下载安装

```shell
ohpm  install parse-srcset@1.0.2
```

OpenHarmony ohpm 环境配置等更多内容，请参考 如何安装 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。

## 使用说明

```js
import * as parseSrcset from 'parse-srcset'
let result:ESObject = JSON.stringify(parseSrcset('&#x9;&#x9;data:,a&#x9;&#x9;1x&#x9;&#x9'));
```
## 接口说明
parseSrcset：解析HTML5 srcset属性

## 约束与限制

在下述版本验证通过：

- DevEco Studio 版本： 4.1 Canary(4.1.3.317),OpenHarmony SDK:API11 (4.1.0.36)。

## 目录结构

````
|---- parse_srcset
|     |---- entry  # 示例代码文件夹
              ├── src  
                 ├── main   
                   ├── ets
                       ├── pages
                             ├── Index.ets  sample代码
|     |---- README.md  # 安装使用方法                    
````

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues)
给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议

本项目基于 [MIT License](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/parse-srcset/LICENSE) ，请自由地享受和参与开源。
