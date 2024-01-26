# RxJS

## 简介

本项目是OpenHarmony rxjsDemo项目。
[rxjs](https://github.com/reactivex/rxjs)是一个通过使用可观察序列来合成异步和基于事件的程序的JavaScript库。它通过使用 observable 序列编写基于异步和事件的程序。核心类型是： Observable , 附属类型：Observer， Schedules, Subjects 和一些操作符 map，filter等。这些操作符可以把异步事件当作集合处理。

| 功能名称                                       | 功能描述                                                     |
| ---------------------------------------------- | :----------------------------------------------------------- |
| 创建一个可观察对象发射数据流                   | 创建可观察对象Observale，发送数据流，或则一条数据，一个通知  |
| 通过操作符Operator加工处理数据流               | 创建操作符、 组合操作符、 过滤操作符、条件操作符、转换操作符、工具集 |
| Scheduler调度者                                | 通过线程调度器Scheduler指定操作数据流所在的线程。            |
| 创建一个观察者Observer接收响应数据流，或者通知 | 1.onNext接收数据<br/> 2.onError接收异常通知<br/> 3.onComplete接收完成通知 |

## 下载安装

```shell
ohpm install rxjs
```

OpenHarmony ohpm 环境配置等更多内容，请参考[如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)



## 使用说明

### RxJS 观察者模式

什么是观察员？观察者是观察者传递的价值的消费者。观察者只是一组回调，一个用于由所述可观测的递送通知每种类型：next，error，和 complete。
以下是典型的 Observer 对象的示例：

```javascript
const observer = {
  next: x => console.log('Observer got a next value: ' + x),
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};
```

要使用 Observer，请将其提供给 subscribeObservable 的：

```javascript
const subscription =observable.subscribe(observer);
```

取消订阅
订阅实际上仅具有 unsubscribe()释放资源或取消可观察执行的功能。

```javascript
subscription.unsubscribe();
```

### 操作符

操作符就是功能。操作符有两种：
一、管道运算符是可以使用语法通过管道传递给 Observables 的类型 observableInstance.pipe(operator())。 这些包括filter(...)和 mergeMap(...)。调用时，它们不会更改现有的 Observable 实例。相反，它们返回一个新的 Observable，其订阅逻辑基于第一个 Observable。
管道运算符是一个将 Observable 作为其输入并返回另一个 Observable 的函数。这是一个纯粹的操作：以前的 Observable 保持不变。
二、创建运算符是另一种运算符，可以称为独立函数来创建新的 Observable。例如：of(1, 2, 3)创建一个可观察物体，该物体将依次发射 1、2 和 3。

以下是其中一些操作符的例子：
create：使用给定的订阅函数来创建 observable

```javascript
import { Observable } from 'rxjs';
//创建在订阅函数中发出 'Hello' 和 'World' 的 observable 。
    const hello = Observable.create(function (observer) {
      observer.next('Hello');
      observer.next('World');
    });
    // 输出: 'Hello'...'World'
    const subscribe = hello.subscribe(val => console.log(val));
```

concat：concat 2个基础的 observables

```javascript
import { concat } from 'rxjs/operators';
import { of } from 'rxjs';

// 发出 1,2,3
const sourceOne = of(1, 2, 3);
// 发出 4,5,6
const sourceTwo = of(4, 5, 6);
// 先发出 sourceOne 的值，当完成时订阅 sourceTwo
const example = sourceOne.pipe(concat(sourceTwo));
// 输出: 1,2,3,4,5,6
const subscribe = example.subscribe(val =>
  console.log('Example: Basic concat:', val)
);
```

debounce：根据一个选择器函数，舍弃掉在两次输出之间小于指定时间的发出值

```javascript
import { of, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

// 发出四个字符串
const example = of('WAIT', 'ONE', 'SECOND', 'Last will display');
/*
  只有在最后一次发送后再经过一秒钟，才会发出值，并抛弃在此之前的所有其他值
*/
const debouncedExample = example.pipe(debounce(() => timer(1000)));
/*
    在这个示例中，所有的值都将被忽略，除了最后一个
    输出: 'Last will display'
*/
const subscribe = debouncedExample.subscribe(val => console.log(val));
```

关于更多的操作符的使用方式，可以参考这个文档[学习RxJs](https://rxjs-cn.github.io/learn-rxjs-operators/)

### Schedulers (调度器)

#### 调度程序类型

下列中的每一个都可以通过使用Scheduler对象的静态属性来创建和返回。

| 调度器         | 目的                                                         |
| :------------- | :----------------------------------------------------------- |
| null           | 通过不传递任何调度程序，通知以同步和递归的方式传递。将此用于恒定时间操作或尾递归操作。 |
| queueScheduler | 当前事件框架中的队列上调度（蹦床调度程序）。将此用于迭代操作。 |
| asapScheduler  | 微任务队列上的调度，与用于承诺的队列相同。基本上在当前工作之后，但在下一个工作之前。将此用于异步转换。 |
| asyncScheduler | 使用 setInterval 的调度。用于基于时间的操作符。              |

#### 使用调度器

对于返回带有有限和少量消息的observable的操作符，RxJS不使用调度程序，即null或undefined。对于返回潜在大量或无限数量消息的操作符，使用queue调度程序。对于使用计时器的操作员，使用async。

* 静态创建操作符通常将调度程序作为参数。例如，from(array, scheduler)让您指定在传递从array. 它通常是运算符的最后一个参数。以下静态创建操作符采用Scheduler参数：
  bindCallback
  bindNodeCallback
  combineLatest
  concat
  empty
  from
  fromPromise
  interval
  merge
  of
  range
  throw
  timer

* 使用subscribeOn预定计划在什么情况下会在subscribe()呼叫发生。默认情况下，subscribe()对 Observable的调用将同步且立即发生。但是，您可以使用实例 operator 延迟或安排实际订阅发生在给定的调度程序上subscribeOn(scheduler)。

* 使用observeOn预定计划在什么情况下会通知交付。实例操作符observeOn(scheduler)在源 Observable 和目标观察者之间引入了一个中介观察者，其中中介使用给定的scheduler。实例运算符可以将调度程序作为参数。

* 时间相关的操作符如bufferTime，debounceTime，delay，auditTime，sampleTime，throttleTime，timeInterval，timeout，timeoutWith，windowTime都将一个调度程序作为最后一个参数，否则默认情况下的操作asyncScheduler。

关于RxJs的更多介绍，可以参考官方文档[https://rxjs.dev/]

## 接口说明

RxJS 操作符的完整列表

| 操作符类型 | 操作符方法名                                                 |
| ---------- | :----------------------------------------------------------- |
| 创建       | create、empty、from、interval、of / just、range、throw、timer |
| 组合       | combineAll、combineLatest、concat、concatAll、forkJoin、merge、mergeAll、pairwise、race、startWith、withLatestFrom、zip |
| 过滤       | debounce、debounceTime、distinctUntilChanged、filter、first、ignoreElements、last、sample、single、skip、skipUntil、skipWhile、take、takeUntil、takeWhile、throttle、throttleTime |
| 条件       | defaultIfEmpty、every                                        |
| 转换       | buffer、bufferCount、bufferTime、bufferToggle、bufferWhen、concatMap、concatMapTo、exhaustMap、expand、groupBy、map、mapTo、mergeMap、partition、pluck、reduce、scan、switchMap、window、windowCount、windowTime、windowToggle、windowWhen |
| 工具集     | do / tap、delay、delayWhen、dematerialize、timeout           |
| 错误处理   | catch / catchError、 retry 、  retryWhen                     |
| 多播       | publish、multicast、share、 shareReplay                      |

## 约束与限制
在下述版本验证通过：

DevEco Studio:DevEco Studio 4.1 Canary2(4.1.3.400), SDK: API11 (4.1.0.36(SP6))

## 目录

```
 ├── entry
 │ └── src
 │ │ └── main
 │ │ │ ├── ets
 │ │ │ │  ├── pages
 │ │ │ │  │ ├── index.ets        # 入口文件
 │ │ │ │  │ ├── create.ets       # 创建操作符相关demo
 │ │ │ │  │ ├── filter.ets       # 过滤操作符相关demo
 │ │ │ │  │ ├── multicast.ets    # 多播操作符相关demo
 │ │ │ │  │ ├── combine.ets      # 组合操作符相关demo
 │ │ │ │  │ ├── error.ets        # 错误处理操作符相关demo
 │ │ │ │  │ ├── condition.ets    # 条件操作符相关demo
 │ │ │ │  │ ├── convert.ets      # 转换操作符相关demo
 │ │ │ │  │ ├── tool.ets         # 工具集相关demo
 │ │ │ │  │ ├── scheduler.ets    # 调度器相关demo
 │ │ │ │  │ └── ArkTools.ts      # 适配ark语法相关工具函数
 │ │ │ │  └── log.js             # 日志打印工具类
 │ │ │ ├── resources              # hap资源存放目录
 │ │ │ └── module.json5            # hap配置文件
```

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议

本项目基于 [Apache License 2.0](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/RxJS/LICENSE) 协议，请自由地享受和参与开源。
