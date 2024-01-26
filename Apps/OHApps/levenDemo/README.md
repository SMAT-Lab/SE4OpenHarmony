# levenDemo

## 简介
本demo是基于openHarmony系统下使用三方js库[leven](https://github.com/sindresorhus/leven)，使用Leven 距离算法的最快JS实现测量两个字符串之间的差异

## 下载安装
```
ohpm install leven
```
OpenHarmony ohpm 环境配置等更多内容，请参考 [如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)
## 使用说明

```javascript
import leven from 'leven';

let data1:string = "ABCDEF";
let data2:string = "ABCDGH";
let s:number = leven(data1,data2);
```

## 接口说明

|        方法名         |           入参            | 接口描述 |
|:------------------:|:-----------------------:|:----:|
| leven(data1,data2) | data1:字符串内容，data2:字符串内容 |  比较字符串的不同个数  |


## 约束与限制
在下述版本验证通过：

- DevEco Studio: 4.0 (4.0.3.512), SDK: API10 (4.0.10.9)
- DevEco Studio: 3.1 Beta2 (3.1.0.400), SDK: API9 Release (3.2.11.9)

## 开源协议

本项目基于 [MIT license](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/tree/master/levenDemo/LICENSE) ，请自由地享受和参与开源。

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。