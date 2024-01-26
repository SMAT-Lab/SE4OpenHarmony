# bignumberjsDemo

## 简介
本demo是基于openHarmony系统下使用三方js库[bignumber.js](https://github.com/MikeMcl/bignumber.js)，bignumber.js是一个数学库，用于任意精度十进制和非十进制算术的 JavaScript 库

## 下载安装
```
ohpm install bignumber.js
```
OpenHarmony ohpm 环境配置等更多内容，请参考 [如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)
## 使用说明
如果ArkTS不支持"bignumber.js"包名带 ".js",请参照[示例](./entry/src/main/ets/pages)
```javascript
import BigNumber from "bignumber.js"
let x = new BigNumber('1111222233334444555566');
x.toString();                       // "1.111222233334444555566e+21"
x.toFixed();                        // "1111222233334444555566"
let x = new BigNumber('1111222233334444555566');
x.toString();                       // "1.111222233334444555566e+21"
x.toFixed();                        // "1111222233334444555566"
```

## 接口说明

|        方法名        |      入参       |    接口描述    |
|:-----------------:|:-------------:|:----------:|
| absoluteValue() |               |   返回绝对值    |
|   comparedTo(data)   |  data：输入比较的数  |    比较大小    |
|   decimalPlaces(data)    | data:输入小数的位数  |  返回小数的位数   |
|   dividedBy(data)    |   data：输入除数   |    除法函数    |
| dividedToIntegerBy(data) |   data:输入除数   | 返回值除以的整数部分 |
|   exponentiatedBy(data)   | data：保留的小数位数  |    指数函数    |
|   integerValue(data)    | data:向下或者向上取整 |    取整函数    |
|   minus(data)    |   data：输入减数   |    减法函数    |
| modulo(data) |   data:输入除数   |    取余数     |
|   plus(data)    |   data：输入乘数   |    乘法函数    |
|   shiftedBy(data)   |  data：输入移动位数   |  按位置移动函数   |
|   squareRoot()    |    |   平方根函数    |

更多接口的使用可参考[官方文档](https://mikemcl.github.io/bignumber.js/)，单元测试用例详情见[TEST.md](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/tree/master/bignumberjsDemo/TEST.md)
## 约束与限制
在下述版本验证通过：
- DevEco Studio: 4.0 (4.0.3.512), SDK: API10 (4.0.10.9)。
- DevEco Studio: 3.1 Beta2(3.1.0.400), SDK: API9 Release(3.2.11.9)。

## 开源协议

本项目基于 [Apache License 2.0](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/tree/master/bignumberjsDemo/LICENSE) ，请自由地享受和参与开源。

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。