interface EventSequencing_Params {
    message?: string;
    state?: string;
    emitter?: EventEmitter<string, Object> | undefined;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "EventSequencing_" + ++__generate__Id;
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
class EventSequencing extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('对同一个事件多次监听，看是否是按照队列中事件的先后顺序来进行处理。经测试发现，emitter.on多次监听同一个事件，按照添加顺序，每一个监听都会执行，在监听里修改回调数据不改变其他监听器里的数据，不可在监听器里再次发送同名的事件', this, "message");
        this.__state = new ObservedPropertySimple('状态信息：\r\n', this, "state");
        this.__emitter = new ObservedPropertyObject(undefined, this, "emitter");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: EventSequencing_Params) {
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
        const ctx = this;
        ctx.emitter = new EventEmitter<string, Object>();
        ctx.emitter.on('event', (name: string, age: number, message: string) => {
            console.log(`Listener 1: ${name} is ${age} years old`);
            ctx.state = ctx.state + "\r\n" + `aboutToAppear监听器收到信息,name:${name},age:${age},message:${message}`;
        });
    }
    onPageShow() {
        const ctx = this;
        let emitterInstance = this.emitter;
        if (emitterInstance) {
            emitterInstance.on('event', (name: string, age: number, message: string) => {
                console.log(`Listener 2: ${name} is ${age} years old`);
                ctx.state = ctx.state + "\r\n" + `onPageShow监听器收到信息,name:${name},age:${age},message:${message}`;
            });
        }
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.padding(10);
        Text.pop();
        Button.createWithLabel('发送事件');
        Button.width('100%');
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.margin(20);
        Button.onClick(() => {
            this.startSendEvent();
        });
        Button.pop();
        Text.create(this.state);
        Text.width('100%');
        Text.backgroundColor(Color.Red);
        Text.fontColor(Color.White);
        Text.margin(20);
        Text.pop();
        Column.pop();
        Row.pop();
    }
    startSendEvent() {
        const ctx = this;
        let emitterInstance = ctx.emitter;
        if (!emitterInstance) {
            return;
        }
        emitterInstance.on('event', (name: string, age: number, message: string) => {
            console.log(`Listener 3: ${name} is ${age} years old`);
            ctx.state = ctx.state + "\r\n" + `startSendEvent---1---监听器收到信息,name:${name},age:${age},message:${message}`;
            name = "张三";
            age = Number(age) + 30;
            message = '111112222333';
            // ctx.emitter.emit('event', '张三', 64, "这是倒数第二个监听器，修改信息试试");
        });
        emitterInstance.on('event', (name: string, age: number, message: string) => {
            console.log(`Listener 4: ${name} is ${age} years old`);
            ctx.state = ctx.state + "\r\n" + `startSendEvent---2---监听器收到信息,name:${name},age:${age},message:${message}`;
        });
        emitterInstance.emit('event', 'Tom', 18, "这是原始信息");
    }
}
loadDocument(new EventSequencing("1", undefined, {}));
