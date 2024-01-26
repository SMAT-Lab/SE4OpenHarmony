interface ApiTest_Params {
    message?: string;
    state?: string;
    emitter?: EventEmitter<string, Object> | undefined;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ApiTest_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import EventEmitter from 'eventemitter3';
import buffer from '@ohos.buffer';
class ApiTest extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('对于EventEmitter公开的API进行测试并显示结果', this, "message");
        this.__state = new ObservedPropertySimple('状态信息：\r\n', this, "state");
        this.__emitter = new ObservedPropertyObject(undefined, this, "emitter");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ApiTest_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.state !== undefined) {
            this.state = params.state;
        }
        if (params.emitter !== undefined) {
            this.emitter = params.emitter;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__state.aboutToBeDeleted();
        this.__emitter.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __state: ObservedPropertySimple<string>;
    get state() {
        return this.__state.get();
    }
    set state(newValue: string) {
        this.__state.set(newValue);
    }
    private __emitter: ObservedPropertyObject<EventEmitter<string, Object> | undefined>;
    get emitter() {
        return this.__emitter.get();
    }
    set emitter(newValue: EventEmitter<string, Object> | undefined) {
        this.__emitter.set(newValue);
    }
    aboutToAppear() {
        this.emitter = new EventEmitter<string, Object>();
        this.state = this.state + "\r\n" + `测试初始化接口：new EventEmitter，看是否成功：${(this.emitter != undefined && this.emitter != null)}`;
        this.state = this.state + "\r\n" + `<--------------------------------------------->`;
    }
    render() {
        Row.create();
        Row.height('100%');
        Scroll.create();
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.padding(10);
        Text.pop();
        Button.createWithLabel('测试API');
        Button.width('100%');
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.margin(20);
        Button.onClick(() => {
            this.testApi();
        });
        Button.pop();
        Text.create(this.state);
        Text.width('100%');
        Text.backgroundColor(Color.Red);
        Text.fontColor(Color.White);
        Text.margin(20);
        Text.pop();
        Column.pop();
        Scroll.pop();
        Row.pop();
    }
    testApi(): void {
        const ctx = this;
        ctx.state = ctx.state + "\r\n" + `测试先订阅事件event,然后发送事件event，看是否收到event事件回调`;
        let emitterInstance: EventEmitter<string, Object> | undefined = ctx.emitter;
        if (!emitterInstance) {
            return;
        }
        emitterInstance.on('event', (data: Object) => {
            ctx.state = ctx.state + "\r\n" + `收到事件event回调，数据为：${data}`;
        });
        emitterInstance.emit('event', "这是原始信息");
        this.state = this.state + "\r\n" + `<--------------------------------------------->`;
        ctx.state = ctx.state + "\r\n" + `测试先发送事件before,然后订阅事件before，看是否收到before事件回调`;
        emitterInstance.emit('before', "在绑定之前先发送事件");
        emitterInstance.on('before', (data: Object) => {
            ctx.state = ctx.state + "\r\n" + `收到事件before回调，数据为：${data}`;
        });
        this.state = this.state + "\r\n" + `<--------------------------------------------->`;
        ctx.state = ctx.state + "\r\n" + `测试先订阅事件multi,然后多次发送事件multi，看是否收到多次multi事件回调`;
        emitterInstance.on('multi', (data: Object) => {
            ctx.state = ctx.state + "\r\n" + `收到事件multi回调，数据为：${data}`;
        });
        emitterInstance.emit('multi', "这是multi第一次发送");
        emitterInstance.emit('multi', "这是multi第二次发送");
        emitterInstance.emit('multi', "这是multi第三次发送");
        this.state = this.state + "\r\n" + `<--------------------------------------------->`;
        ctx.state = ctx.state + "\r\n" + `测试先once订阅事件single,然后多次发送事件single，看是否收到多次single事件回调`;
        emitterInstance.once('single', (data: Object) => {
            ctx.state = ctx.state + "\r\n" + `收到事件single回调，数据为：${data}`;
        });
        emitterInstance.emit('single', "这是single第一次发送");
        emitterInstance.emit('single', "这是single第二次发送");
        emitterInstance.emit('single', "这是single第三次发送");
        this.state = this.state + "\r\n" + `<--------------------------------------------->`;
        ctx.state = ctx.state + "\r\n" + `测试获取某个事件listeners数组的API---listeners，看看on绑定和once绑定是否都计数了`;
        let listener1 = () => {
        };
        let listener2 = () => {
        };
        let listener3 = () => {
        };
        emitterInstance.on('listenNum', listener1);
        emitterInstance.on('listenNum', listener2);
        emitterInstance.once('listenNum', listener3);
        const listeners = emitterInstance.listeners('event');
        const listenerListenNum = emitterInstance.listeners('listenNum');
        ctx.state = ctx.state + "\r\n" + `event事件计数个数，预期为1个，实际为${listeners.length}`;
        if (listenerListenNum.length === 3) {
            ctx.state = ctx.state + "\r\n" + `listenNum事件计数个数，预期为3个，实际为${listenerListenNum.length},on和once绑定的listener都计数`;
        }
        else if (listenerListenNum.length === 2) {
            ctx.state = ctx.state + "\r\n" + `listenNum事件计数个数，预期为3个，实际为${listenerListenNum.length},on绑定的listener都计数，once绑定的不计数`;
        }
        else if (listenerListenNum.length === 1) {
            ctx.state = ctx.state + "\r\n" + `listenNum事件计数个数，预期为3个，实际为${listenerListenNum.length},once绑定的listener都计数，on绑定的不计数`;
        }
        else {
            ctx.state = ctx.state + "\r\n" + `listenNum事件计数个数，预期为3个，实际为${listenerListenNum.length},计数错误`;
        }
        this.state = this.state + "\r\n" + `<--------------------------------------------->`;
        const count = emitterInstance.listenerCount('listenNum');
        ctx.state = ctx.state + "\r\n" + `测试获取某个事件listeners个数API---listenerCount，预期为3个，实际为${count}`;
        this.state = this.state + "\r\n" + `<--------------------------------------------->`;
        emitterInstance.off('listenNum', listener1);
        emitterInstance.off('listenNum', listener2);
        emitterInstance.off('listenNum', listener3);
        const count1 = emitterInstance.listenerCount('listenNum');
        if (count1 === 0) {
            ctx.state = ctx.state + "\r\n" + `测试解除事件绑定API---off，原有绑定接口为3个，解绑后预期为0个，实际为${count1},once绑定的监听器也可解绑`;
        }
        else if (count1 === 1) {
            ctx.state = ctx.state + "\r\n" + `测试解除事件绑定API---off，原有绑定接口为3个，解绑后预期为0个，实际为${count},once绑定的监听器不可解绑`;
        }
        else {
            ctx.state = ctx.state + "\r\n" + `测试解除事件绑定API---off，原有绑定接口为3个，解绑后预期为0个，实际为${count},监听器解绑失败`;
        }
        this.state = this.state + "\r\n" + `<--------------------------------------------->`;
        ctx.state = ctx.state + "\r\n" + `测试添加事件绑定API---addListener,先添加addListener 然后发送事件addListener，看是否收到addListener事件回调`;
        emitterInstance.addListener('addListener', () => {
            ctx.state = ctx.state + "\r\n" + `收到事件addListener回调`;
        });
        emitterInstance.emit("addListener");
        this.state = this.state + "\r\n" + `<--------------------------------------------->`;
        ctx.state = ctx.state + "\r\n" + `测试添加事件绑定API---callback,先发送事件callback,然后添加callback，看是否收到callback事件回调`;
        emitterInstance.emit("callback");
        let callback = (data: Object) => {
            ctx.state = ctx.state + "\r\n" + `收到事件callback回调，数据为：${data}`;
        };
        emitterInstance.addListener('callback', callback);
        this.state = this.state + "\r\n" + `<--------------------------------------------->`;
        const count2: number = emitterInstance.listeners('event').length;
        const count3: number = emitterInstance.listeners('before').length;
        const count4: number = emitterInstance.listeners('multi').length;
        const count5: number = emitterInstance.listeners('single').length; // once使用过后即会删除，这里的个数为0
        const count6: number = emitterInstance.listeners('listenNum').length;
        const count7: number = emitterInstance.listeners('addListener').length;
        const count8: number = emitterInstance.listeners('callback').length;
        let total = count2 + count3 + count4 + count5 + count6 + count7 + count8;
        ctx.state = ctx.state + "\r\n" + `测试解除事件绑定API---off，解除所有绑定的事件之前事件个数${total}`;
        this.state = this.state + "\r\n" + `<--------------------------------------------->`;
        const names: string[] = emitterInstance.eventNames();
        ctx.state = ctx.state + "\r\n" + `测试获取所有事件绑定API---eventNames，解除所有绑定的事件之前所有事件名称是：${JSON.stringify(names)}`;
        this.state = this.state + "\r\n" + `<--------------------------------------------->`;
        emitterInstance.removeAllListeners();
        const count22: number = emitterInstance.listeners('event').length;
        const count33: number = emitterInstance.listeners('before').length;
        const count44: number = emitterInstance.listeners('multi').length;
        const count55: number = emitterInstance.listeners('single').length;
        const count66: number = emitterInstance.listeners('listenNum').length;
        const count77: number = emitterInstance.listeners('addListener').length;
        const count88: number = emitterInstance.listeners('callback').length;
        let total1 = count22 + count33 + count44 + count55 + count66 + count77 + count88;
        ctx.state = ctx.state + "\r\n" + `测试解除所有事件绑定API---removeAllListeners，解除所有绑定的事件之后事件个数${total1}`;
        this.state = this.state + "\r\n" + `<--------------------------------------------->${'\r\n'}`;
        emitterInstance.addListener('newListener', (data: Object) => {
            ctx.state = ctx.state + "\r\n" + `收到事件newListener回调，数据为：${JSON.stringify(data)}`;
        });
        const beforeCount = emitterInstance.listenerCount('newListener');
        const nameBefore = emitterInstance.eventNames();
        ctx.state = ctx.state + "\r\n" + `测试解除事件绑定API---removeListener，解除绑定的事件之前事件个数${beforeCount}，事件名称${JSON.stringify(nameBefore)}}`;
        emitterInstance.emit('newListener', {
            name: "张三",
            age: 21,
            isMan: true,
            info: {
                msg: "这是测试数据",
                data: buffer.from("测试是否支持ArrayBuffer").buffer,
                list: [1, 2, 3, 4]
            }
        });
        emitterInstance.removeListener('newListener');
        const afterCount = emitterInstance.listenerCount('newListener');
        const nameAfter = emitterInstance.eventNames();
        ctx.state = ctx.state + "\r\n" + `测试解除事件绑定API---removeListener，解除绑定的事件之后事件个数${afterCount}，事件名称${JSON.stringify(nameAfter)}}`;
        this.state = this.state + "\r\n" + `<--------------------------------------------->${'\r\n'}`;
        emitterInstance.on('newListener', () => {
        });
        emitterInstance.on('newListener', () => {
        });
        emitterInstance.on('newListener', () => {
        });
        emitterInstance.on('newListener', () => {
        });
        const beforeCount1 = emitterInstance.listenerCount('newListener');
        const nameBefore1 = emitterInstance.eventNames();
        ctx.state = ctx.state + "\r\n" + `测试解除事件绑定API---removeListener，一次性添加多个同名事件不指定解除某一个监听器回调接口，解除绑定的事件之前事件个数${beforeCount1}，事件名称${JSON.stringify(nameBefore1)}}`;
        emitterInstance.removeListener('newListener');
        const afterCount1 = emitterInstance.listenerCount('newListener');
        const nameAfter1 = emitterInstance.eventNames();
        ctx.state = ctx.state + "\r\n" + `测试解除事件绑定API---removeListener，一次性添加多个同名事件不指定解除某一个监听器回调接口，解除绑定的事件之后事件个数${afterCount1}，事件名称${JSON.stringify(nameAfter1)}}`;
        this.state = this.state + "\r\n" + `<--------------------------------------------->${'\r\n'}`;
        let obj1 = () => {
        };
        let obj2 = () => {
        };
        let obj3 = () => {
        };
        let obj4 = () => {
        };
        emitterInstance.on('newListener', obj1);
        emitterInstance.on('newListener', obj2);
        emitterInstance.on('newListener', obj3);
        emitterInstance.on('newListener', obj4);
        const beforeCount2 = emitterInstance.listenerCount('newListener');
        const nameBefore3 = emitterInstance.eventNames();
        ctx.state = ctx.state + "\r\n" + `测试解除事件绑定API---removeListener，一次性添加多个同名事件指定解除某一个监听器回调接口，解除绑定的事件之前事件个数${beforeCount2}，事件名称${JSON.stringify(nameBefore3)}}`;
        emitterInstance.removeListener('newListener', obj3);
        const afterCount2 = emitterInstance.listenerCount('newListener');
        const nameAfter2 = emitterInstance.eventNames();
        ctx.state = ctx.state + "\r\n" + `测试解除事件绑定API---removeListener，一次性添加多个同名事件指定解除某一个监听器回调接口，解除绑定的事件之后事件个数${afterCount2}，事件名称${JSON.stringify(nameAfter2)}}`;
        this.state = this.state + "\r\n" + `<--------------------------------------------->${'\r\n'}`;
    }
}
loadDocument(new ApiTest("1", undefined, {}));
