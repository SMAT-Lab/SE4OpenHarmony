# tiny_emitter

## 简介

> 一个小型（小于1k）事件发射器库

## 下载安装

```shell
ohpm  install tiny-emitter@2.1.0
```

OpenHarmony ohpm 环境配置等更多内容，请参考 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。

## 使用说明


```js
使用方式一：
import { TinyEmitter } from "tiny-emitter";

let mEmitter: TinyEmitter = new TinyEmitter();
mEmitter.on('some-event', (arg1: string, arg2: string, arg3: string) => {
     
});
mEmitter.once('some-event', (arg1: string, arg2: string, arg3: string) => {
    
});
mEmitter.off('some-event');
mEmitter.emit('some-event', 'arg1 value', 'arg2 value', 'arg3 value');


使用方式二：
import emitter from "tiny-emitter/instance";

emitter.on('some-event', (arg1: string, arg2: string, arg3: string) => {
    
});
emitter.once('some-event', (arg1: string, arg2: string, arg3: string) => {

});
emitter.off('some-event');
emitter.emit('some-event', 'arg1 value', 'arg2 value', 'arg3 value');

```
单元测试用例详情见[TEST.md](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/tiny_emitter/TEST.md)

## 约束与限制

在下述版本验证通过：

- DevEco Studio 版本： 4.1 Canary(4.1.3.317),OpenHarmony SDK:API11 (4.1.0.36)。

## 接口说明

| **接口**                                             | 参数                                         | 功能        |
|----------------------------------------------------|--------------------------------------------|-----------|
| on(event: string, callback: Function, ctx?: any)   | event:事件名称<br/> callback:回调方法<br/> ctx:上下文 | 监听事件      |
| once(event: string, callback: Function, ctx?: any) | event:事件名称<br/> callback:回调方法<br/> ctx:上下文 | 监听事件只响应一次 |
| off(event: string, callback?: Function)            | event:事件名称<br/> callback:回调方法              | 取消监听      |
| emit(event: string, ...args: any[])                | event:事件名称<br/> args: 发射的数据                | 发射数据      |

## 目录结构

````
|---- tiny_emitter
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

本项目基于 [MIT License](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/tiny_emitter/LICENSE)，请自由地享受和参与开源。
    