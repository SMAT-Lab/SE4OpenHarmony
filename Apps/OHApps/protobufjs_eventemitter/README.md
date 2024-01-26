# @protobufjs/eventemitter

## 简介
> @protobufjs/eventemitter 是一个轻量化的事件发射器

## 下载安装
```shell
ohpm install @protobufjs/eventemitter
```
OpenHarmony ohpm环境配置等更多内容，请参考 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。

## 使用说明

### 引用及使用
```
import EventEmitter from "@protobufjs/eventemitter"

   let ee = new EventEmitter();
   let ctx: ESObject = {};
   //注册监听事件
   ee.on("a", ((arg1: ESObject) => {
       result = result + arg1
   }) as ESObject, ctx)
   ee.emit("a", 1);//发送事件
   ee.off("a");//关闭事件监听
```

## 接口说明
1. 注册监听事件
   `on(evt: string, fn: () => any, ctx?: any): EventEmitter`
2. 关闭事件监听
   `off(evt?: string, fn?: () => any): EventEmitter`
3. 发送事件
   `emit(evt: string, ...args: any[]): EventEmitter`
## 约束与限制
在下述版本验证通过：

- DevEco Studio 版本：4.0 Release（4.0.0.600），OpenHarmony SDK:API10（4.0.10.11）

## 目录结构
````
|---- protobufjs_eventemitter
|     |---- entry  # 示例代码文件夹
|           |---- src
|                 |---- main
|                        |---- ets
|                              |---- pages
|                                    |---- Index # sample
|                 |---- ohosTest
|                       |---- ets
|                             |---- test
|                                   |---- Ability.test.ets  # 单元测试

|     |---- README.md  # 安装使用方法                    
````

## 贡献代码
使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues)给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议
本项目基于 [BSD License](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/protobufjs_eventemitter/LICENSE)，请自由地享受和参与开源。
