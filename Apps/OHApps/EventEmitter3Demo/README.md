# EventEmitter3 

## 简介

 EventEmitter3是一款高性能EventEmitter，支持添加监听事件，监听一次性事件，发送事件，移除事件，统计监听事件的个数，统计监听事件的名称。

```
ohpm install @types/eventemitter3 
```

OpenHarmony ohpm 环境配置等更多内容，请参考[如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)

## 使用说明

安装eventemitter3库之后，在需要使用的界面先导入eventemitter3，并完成初始化。

```typescript
import EventEmitter from 'eventemitter3';

let emitter: EventEmitter<string, Object> = new EventEmitter<string, Object>();
```

### 添加事件

#### 通过on的方式来绑定事件

  ```typescript
// 通过on来绑定event事件，通过回调接口来接受发送的事件，无数据传递
emitter.on('event', () => {
  ctx.state = ctx.state + "\r\n" + `收到事件event回调`
});  
// 通过on来绑定event事件，通过回调接口来接受发送的事件传递来的数据 data
emitter.on('event', (data: string) => {
  ctx.state = ctx.state + "\r\n" + `收到事件event回调，数据为：${data}`
});

// 通过on来绑定event事件，通过回调接口来接受发送事件传递来的数据 name,age
emitter.on('event', (name: string,age: number) => {
  ctx.state = ctx.state + "\r\n" + `收到事件event回调，name为：${data},age为：${age}`
});

  ```

EventEmitter3支持通过on的方式来绑定事件，在回调接口里面接受该事件传递的数据，回调接口支持0到多个参数。

#### 通过addListener的方式来绑定事件

```typescript
  emitter.addListener('addListener', () => {
      ctx.state = ctx.state + "\r\n" + `收到事件addListener回调`
  });

 let callback = (data: string) => {
      ctx.state = ctx.state + "\r\n" + `收到事件callback回调，数据为：${data}`
 }
 emitter.addListener('callback', callback);
```

EventEmitter3也支持通过addListener的方式来绑定事件，在回调接口里面接受该事件传递的数据，回调接口支持0到多个参数。

#### 通过once的方式来绑定事件

```typescript
emitter.once('single', (data: string) => {
      ctx.state = ctx.state + "\r\n" + `收到事件single回调，数据为：${data}`
    });
```

EventEmitter3还支持通过once的方式来绑定事件，该事件在接收到一次回调之后即会解除绑定。



**以上三种方式均可绑定事件，并且同一个事件可以绑定多次，事件发出之后每个绑定事件的回调接口均可以接收到通知，回调接口接收到通知的顺序为绑定时候的顺序**

### 发送事件

```typescript
emitter.emit("callback")
emitter.emit('event', "这是原始信息");
emitter.emit('event', 'Tom', 18, "这是原始信息");
```

EventEmitter3通过emit发送事件，支持同时携带多个参数。其中首个参数为事件名称，其余参数为该事件携带的数据。

如果用户是通过on或者addListener来绑定的事件，那么emit发送多次事件，回调接口可以接收到多次回调。

如果用户是通过once来绑定的事件，那么emit发送多次事件，回调接口只可以接收一次回调。



**发送事件一定要发生在绑定事件之后，否则绑定事件的回调接口无法接收到事件的通知**

### 解绑事件

#### 通过off的方式来解绑

```typescript
 let listener1 = () => {
 }
 emitter.on('listenNum', listener1);
 emitter.off('listenNum', listener1)
```

#### 通过removeListener的方式来解绑

一次性绑定多个同名的事件回调接口，同时不指定移除某一个回调接口，那么通过事件名移除回调接口的时候，会把同名的所有回调接口都移除。

```typescript
let obj1 = () => {}
let obj2 = () => {}
let obj3 = () => {}
let obj4 = () => {}
emitter.on('newListener',obj1 );
emitter.on('newListener', obj2);
emitter.on('newListener', obj3);
emitter.on('newListener', obj4);
emitter.removeListener('newListener');
```

一次性绑定多个同名的事件回调接口，指定移除某一个回调接口，那么通过事件名移除回调接口的时候，只会移除该回调接口，同时保留同名的剩余回调接口。

```typescript
let obj1 = () => {}
let obj2 = () => {}
let obj3 = () => {}
let obj4 = () => {}
emitter.on('newListener',obj1 );
emitter.on('newListener', obj2);
emitter.on('newListener', obj3);
emitter.on('newListener', obj4);
emitter.removeListener('newListener',obj3);
```

**通过off解绑同样是不指定移除某个回调接口的时候，会把同名事件的所有回调接口都移除。**

#### 通过removeAllListeners移除所有绑定的事件

```typescript
emitter.removeAllListeners();
```

### 简单使用示例

```typescript
const emitter: EventEmitter<string, Object> = new EventEmitter<string, Object>(); //初始化EventEmitter

emitter.on('event', (name: string, age: number) => {   //绑定事件event
  console.log(`${name} is ${age} years old`);
});
let callback = (data: string) => {   
  console.log(`data is ${data} `);
}
emitter.addListener('callback', callback);//绑定事件callback
emitter.emit('event', 'Tom', 18);  //发送事件
emitter.listeners('event') //返回一个事件的listener数组
emitter.listenerCount('event') //返回一个事件的listener数量
emitter.eventNames(); //返回绑定的所有事件的名称数组
emitter.off('event') //移除event事件
emitter.removeListener('callback',callback) //移除callback事件
emitter.removeAllListeners() //移除绑定的所有事件
```

### 跨页面调用

EntryAbility.ts

```typescript
import EventEmitter from 'eventemitter3'
import { GlobalContext } from '../pages/GlobalContext'
export default class EntryAbility extends UIAbility {
    
    onWindowStageCreate(windowStage: window.WindowStage) {
      GlobalContext.getContext().setObject(GlobalContext.KEY_CONTEXT, this.context);
      GlobalContext.getContext().setObject(GlobalContext.KEY_CACHE_DIR, this.context.cacheDir);
      GlobalContext.getContext().setObject(GlobalContext.KEY_FILES_DIR, this.context.filesDir);
      const emitter: EventEmitter<string, Object> = new EventEmitter<string, Object>();
      GlobalContext.getContext().setObject(GlobalContext.KEY_EMITTER, emitter);
      windowStage.loadContent('pages/Index', (err, data) => {
    });
  }
}

```

Index.ets

```typescript
import { GlobalContext } from './GlobalContext'
        
        Button('页面之间的通信') 
        .width('100%')
        .backgroundColor(Color.Blue)
        .fontColor(Color.White)
        .padding(10)
        .margin(20)
        .onClick(() => {
          router.pushUrl({
            url: 'pages/JumpOne'
          }).then(() => {
              // 需要在跳转发起之后发出事件，否则下个页面的事件监听还没有绑定则无法接收到发出的事件
            let emitterInstance: EventEmitter<string, Object> | undefined = GlobalContext.getContext()
              .getObject(GlobalContext.KEY_EMITTER) as EventEmitter<string, Object>;
            if (emitterInstance) {
              emitterInstance.emit('pageOne', '这是首页发给页面1的信息');
            }
          })

        })
```

JumpOne.ets

```typescript
import { GlobalContext } from './GlobalContext'
        
  aboutToAppear() {
    const ctx = this
    // 页面初始化的时候绑定事件，一定要保证使用全局的EventEmitter对象，以及绑定事件发生在发出事件之前
    let emitter: EventEmitter<string, Object> | undefined = GlobalContext.getContext()
      .getObject(GlobalContext.KEY_EMITTER) as EventEmitter<string, Object>;
    if (emitter) {
        emitter.on('pageOne', (data: string) => {
          console.log(`componentB Data: ${data}`);
          ctx.message = data
        });
    }
  }
```

### 事件处理排序

```typescript
import EventEmitter from 'eventemitter3'

@Entry
@Component
struct EventSequencing {
  @State message: string = ''
  @State emitter: EventEmitter<string, Object> | undefined = undefined;

  aboutToAppear() {
    this.emitter = new EventEmitter<string, Object>();
    this.emitter.on('event', (name: string, age: number, message: string) => {}); //页面初始化的时候添加同名的event事件
  }

  onPageShow() {
    this.emitter.on('event', (name: string, age: number, message: string) => {}); //页面显示的时候添加同名的event事件
  }

  build() {
    Row() {
      Column() {
        Button('发送事件')
          .width('100%')
          .height(50)
          .backgroundColor(Color.Blue)
          .fontColor(Color.White)
          .margin(20)
          .onClick(() => {
            this.startSendEvent()
          })
      }
      .width('100%')
    }
    .height('100%')
  }

  startSendEvent() {
    const ctx = this
    //点击按钮之后首次添加同名的event事件
    ctx.emitter.on('event', (name: string, age: number, message: string) => {});
    //点击按钮之后第二次添加同名的event事件
    ctx.emitter.on('event', (name: string, age: number, message: string) => { });
    ctx.emitter.emit('event', 'Tom', 18, "这是原始信息");
  }
}
  
```

在发出事件之后通过查看各个对调接口的执行顺序可以发现，回调接口的执行顺序是按照添加顺序来执行的。在一些场景下，需要对事件进行排序处理，例如在队列中处理事件，只需要按照顺序将事件添加到EventEmitter3即可。

## 接口说明

### EventEmitter3

| 接口名             | 参数                                                         | 返回值                                           | 说明                         |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------ | ---------------------------- |
| eventNames         | 暂无                                                         | Array<EventEmitter.EventNames<EventTypes>>       | 返回绑定的所有事件的名称数组 |
| listeners          | event: T                                                     | Array<EventEmitter.EventListener<EventTypes, T>> | 返回一个事件的listener数组   |
| listenerCount      | event: EventEmitter.EventNames<EventTypes>                   | number                                           | 返回一个事件的listener数量   |
| emit               | event: T, ...args: EventEmitter.EventArgs<EventTypes, T>     | boolean                                          | 发送一个事件                 |
| on                 | event: T,<br/>fn: EventEmitter.EventListener<EventTypes, T>, <br/>context?: Context | EventEmitter                                     | 绑定事件                     |
| addListener        | event: T,<br/>fn: EventEmitter.EventListener<EventTypes, T>, <br/>context?: Context | EventEmitter                                     | 添加事件                     |
| once               | event: T,<br/>fn: EventEmitter.EventListener<EventTypes, T>, <br/>context?: Context | EventEmitter                                     | 绑定一次性事件               |
| removeListener     | event: T,<br/>fn?: EventEmitter.EventListener<EventTypes, T>, <br/>context?: Context,<br/>once?: boolean | EventEmitter                                     | 移除事件                     |
| off                | event: T,<br/>fn?: EventEmitter.EventListener<EventTypes, T>, <br/>context?: Context,<br/>once?: boolean | EventEmitter                                     | 移除事件                     |
| removeAllListeners | event?: EventEmitter.EventNames<EventTypes>                  | EventEmitter                                     | 移除绑定的所有事件           |

更多模块的使用可参考[官方文档](https://github.com/primus/eventemitter3/blob/master/README.md)，[单元测试用例](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/EventEmitter3Demo/TEST.md)详情可参考

## 约束与限制

在下述版本验证通过：
DevEco Studio: 4.0 Release(4.0.3.513), SDK: API10 Release(4.0.10.10)

## 目录结构

```typescript
|---- EventEmitter3Demo  
|     |---- entry  # 示例代码文件夹
			|---- pages  # 应用页面，根据测试场景的不同分为不同页面。
			    |---- ApiTest.ets  # 全量API测试示例
                |---- EventSequencing.ets  # 事件处理排序示例
                |---- FileRead.ets  # 监听文件读取完成的事件示例
                |---- GlobalContext.ts  # 单例模式的存储类
                |---- Index.ets  # 首页
                |---- JumpOne.ets  # 页面跳转页面1示例
                |---- JumpTwo.ets  # 页面跳转页面2示例
|     |---- README.MD  # 安装使用方法                   
```

## 贡献代码

使用过程中发现任何问题都可以提[Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们提[PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls)。

## 开源协议

本项目基于 [MIT License ](https://gitee.com/zdy09/openharmony_tpc_samples/blob/master/EventEmitter3Demo/LICENSE)，请自由地享受和参与开源。

