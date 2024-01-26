# complex_js

## 简介

> Complex.js is a well tested JavaScript library to work with complex number arithmetic in JavaScript. 

## 下载安装

```shell
ohpm  install complex.js@2.1.1
```

OpenHarmony ohpm 环境配置等更多内容，请参考 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。

## 使用说明


```js
import { Complex } from "complex.js"

let c = new Complex("99.3+8i");
c.mul({re: 3, im: 9})
c.div(4.9)
c.sub(3, 2)
c.add(3, 2)
c.pow(1, 2)
c.sqrt()
c.abs()
c.floor(0)
c.ceil(1)
c.round(1)
c.clone()
c.isZero()
c.cot()
c.acos()


```
单元测试用例详情见[TEST.md](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/complex_js/TEST.md)

## 约束与限制

在下述版本验证通过：

- DevEco Studio 版本： 4.1 Canary(4.1.3.317),OpenHarmony SDK:API11 (4.1.0.36)。

## 目录结构

````
|---- complex_js
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

本项目基于 [MIT License](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/complex_js/LICENSE)，请自由地享受和参与开源。
    