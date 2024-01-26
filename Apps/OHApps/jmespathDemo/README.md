# jmespathDemo

## 简介
本demo是基于openHarmony系统下使用三方js库[jmespath.js](https://github.com/jmespath/jmespath.js)，jmespath 是 JSON 的查询语言，可以根据基本表达式、切片、列表和切片投影、对象投影、展平投影、过滤投影、管道表达式、多选、函数等方式查询或者操作JSON数据

## 下载安装
```
ohpm install jmespath
```
OpenHarmony ohpm 环境配置等更多内容，请参考 [如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)
## 使用说明
安装jmespath之后，在需要使用的界面先导入"jmespath"并调用search接口
```
import  JmesPath from 'jmespath'
let result: number | string = JmesPath.search({foo: {bar: {baz: [0, 1, 2, 3, 4]}}}, "foo.bar.baz[2]") 
if (result) {
    this.resultText = JSON.stringify(result) // 结果为 2
} else {
    this.resultText = '没有找到对应结果'
}
```

## 接口说明

|              方法名              |             入参             |    接口描述    |
|:-----------------------------:|:--------------------------:|:----------:|
|      search(case, expression)      | case：测试数据 expression：查询表达式 |   返回查询结果   |


更多接口的使用可参考[官方文档](https://github.com/jmespath/jmespath.js)
## 约束与限制
在下述版本验证通过：
- DevEco Studio: 4.0 (4.0.3.512), SDK: API10 (4.0.10.9)。
- DevEco Studio: 3.1 Beta2(3.1.0.400), SDK: API9 Release(3.2.11.9)。

# 目录结构
    |---- jmespathDemo  
    |     |---- entry  # 示例代码文件夹
    |          |---- src
    |               |---- main
    |                    |---- ets
    |                         |---- pages
    |                              |---- Index.ets  # 应用首页，提供示例测试jmespath的各种能力                   
    |     |---- README.md  # 安装使用方法

## 开源协议

本项目基于 [Apache License 2.0](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/tree/master/jmespathDemo/LICENSE) ，请自由地享受和参与开源。

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。