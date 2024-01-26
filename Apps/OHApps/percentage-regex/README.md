# validator
## 简介
本demo是基于openHarmony系统下使用三方js库percentage-regex,percentage-regex是百分比验证的库。

## 下载安装

```ts
ohpm install percentage-regex
```
- OpenHarmony ohpm环境配置等更多内容，请参考 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。

## 使用说明

```ts
import percentageRegex from 'percentage-regex';

let result:boolean = percentageRegex({exact: true}).test("19%")
['10%'].toString() = 'foo 10% bar'.match(percentageRegex({exact: false})).toString()
```

## 接口说明
### percentage-regex

| 接口                       | 描述                                                                                       |
|--------------------------|------------------------------------------------------------------------------------------|
| percentageRegex(options) | 返回匹配百分比值的正则表达式。                                                                          |
| options.exact            | 类型：`boolean `，默认值：`false`*（匹配字符串中的任何百分比）* ，只匹配一个精确的字符串。与“RegExp#test”一起检查某个字符串是否为百分比很有用。 |


[单元测试用例详情](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/percentage-regex/TEST.md)

## 约束与限制
在下述版本验证通过：

DevEco Studio: 3.1 Beta2(3.1.0.400), SDK: API9 Release(3.2.11.9)
DevEco Studio: 4.0Canary1(4.0.0.112), SDK: API10(4.0.7.2)
DevEco Studio: 4.0(4.0.3.512),SDK: API10（4.0.10.9）

## 贡献代码

使用过程中发现任何问题都可以提[Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/percentage-regex/issues) 给我们，当然，我们也非常欢迎你给我们提[PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/percentage-regex/pulls)。

## 开源协议

本项目基于 [MIT License](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/percentage-regex/blob/master/LICENSE)，请自由地享受和参与开源。