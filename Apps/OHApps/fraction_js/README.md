# fraction_js

## 简介

> A rational number library

## 下载安装

```shell
ohpm  install fraction.js@4.2.0
```

OpenHarmony ohpm 环境配置等更多内容，请参考 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。

## 使用说明


```js
import Fraction from 'fraction.js';

let x = Fraction(1.23);
x.mul(98)
x.div(98)
x.add(3)
x.sub(33)
x.pow(2)
x.ceil()
x.floor()
x.round()
x.neg()
x.abs()
x.mod(1)
x.clone()
x.toString()
x.gcd('2')
x.lcm('2')
x.simplify()
x.divisible(2)
x.valueOf()
x.toContinued()

```
单元测试用例详情见[TEST.md](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/fraction_js/TEST.md)

## 约束与限制

在下述版本验证通过：

- DevEco Studio 版本： 4.1 Canary(4.1.3.317),OpenHarmony SDK:API11 (4.1.0.36)。

## 目录结构

````
|---- fraction_js
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

本项目基于 [MIT License](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/fraction_js/LICENSE)，请自由地享受和参与开源。
    