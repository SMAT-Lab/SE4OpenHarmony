interface Index_Params {
    message?: string;
    emitter?: EventEmitter<string, Object> | undefined;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import router from '@ohos.router';
import EventEmitter from 'eventemitter3';
import { GlobalContext } from './GlobalContext';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('常用场景举例', this, "message");
        this.__emitter = new ObservedPropertyObject(undefined, this, "emitter");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.emitter !== undefined) {
            this.emitter = params.emitter;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
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
    private __emitter: ObservedPropertyObject<EventEmitter<string, Object> | undefined>;
    get emitter() {
        return this.__emitter.get();
    }
    set emitter(newValue: EventEmitter<string, Object> | undefined) {
        this.__emitter.set(newValue);
    }
    aboutToAppear() {
        this.emitter = new EventEmitter<string, Object>();
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Text.fontSize(30);
        Text.fontWeight(FontWeight.Bold);
        Text.textAlign(TextAlign.Center);
        Text.width('100%');
        Text.height(100);
        Text.pop();
        Button.createWithLabel('监听文件读取完成的事件');
        Button.width('100%');
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.margin(20);
        Button.onClick(() => {
            router.pushUrl({
                url: 'pages/FileRead'
            });
        });
        Button.pop();
        Button.createWithChild();
        Button.width('100%');
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.padding(10);
        Button.margin(20);
        Button.onClick(() => {
            router.pushUrl({
                url: 'pages/JumpOne'
            }).then(() => {
                let emitterInstance: EventEmitter<string, Object> | undefined = GlobalContext.getContext()
                    .getObject(GlobalContext.KEY_EMITTER) as EventEmitter<string, Object>;
                if (emitterInstance) {
                    emitterInstance.emit('pageOne', '这是首页发给第一个页面的信息');
                }
            });
        });
        Text.create('页面之间的通信: \r\n1.不同的页面之间通信 需要使用同一个EventEmitter对象\r\n2.不同的页面之间通信 发送事件.emit一定要在监听事件emitter.on之后，否则无法接收');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Button.createWithLabel('处理事件排序');
        Button.width('100%');
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.margin(20);
        Button.onClick(() => {
            router.pushUrl({
                url: 'pages/EventSequencing'
            });
        });
        Button.pop();
        Button.createWithLabel('测试所有API');
        Button.width('100%');
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.margin(20);
        Button.onClick(() => {
            router.pushUrl({
                url: 'pages/ApiTest'
            });
        });
        Button.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
