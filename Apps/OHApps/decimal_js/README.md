# decimal_js

## 简介

> An arbitrary-precision Decimal type for JavaScript.

## 下载安装

```shell
ohpm  install decimal.js@10.4.0
```

OpenHarmony ohpm 环境配置等更多内容，请参考 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。

## 使用说明


```js
import decimal from "decimal.js"

let x = new Decimal(123.4567);
x.add(33)
x.sub(33)
x.mul(2)
x.div(3)
x.pow(2)
x.abs()
x.floor()
x.ceil()
x.round()
x.toBinary()
x.toExponential(5)
x.toFixed(5)
x.toPrecision(5)
x.toFraction()
x.isZero()

```
单元测试用例详情见[TEST.md](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/decimal_js/TEST.md)

## 约束与限制

在下述版本验证通过：

- DevEco Studio 版本： 4.1 Canary(4.1.3.317),OpenHarmony SDK:API11 (4.1.0.36)。

## 目录结构

````
|---- decimal_js
|     |---- entry  # 示例代码文件夹
              ├── src  
                 ├── main   
                   ├── ets
                       ├── pages
                             ├── Index.ets  sample代码
|     |---- README.md  # 安装使用方法                    
````

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议

本项目基于 [MIT License](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/decimal_js/LICENSE)，请自由地享受和参与开源。
    