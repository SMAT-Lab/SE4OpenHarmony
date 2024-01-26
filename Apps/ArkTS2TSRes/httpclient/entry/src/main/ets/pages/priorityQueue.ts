interface priorityQueue_Params {
    queueCount?: string;
    maxCallCount?: string;
    maxCount?: number;
    client?: HttpClient;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "priorityQueue_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { HttpClient, Logger, Request, Response, TimeUnit } from '@ohos/httpclient';
import { BusinessError } from '@ohos.base';
class priorityQueue extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__queueCount = new ObservedPropertySimple('', this, "queueCount");
        this.__maxCallCount = new ObservedPropertySimple('最大请求队列数为： 64', this, "maxCallCount");
        this.maxCount = 64;
        this.client = new HttpClient.Builder()
            .setConnectTimeout(5, TimeUnit.SECONDS)
            .setReadTimeout(5, TimeUnit.SECONDS)
            .setWriteTimeout(5, TimeUnit.SECONDS)
            .build();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: priorityQueue_Params) {
        if (params.queueCount !== undefined) {
            this.queueCount = params.queueCount;
        }
        if (params.maxCallCount !== undefined) {
            this.maxCallCount = params.maxCallCount;
        }
        if (params.maxCount !== undefined) {
            this.maxCount = params.maxCount;
        }
        if (params.client !== undefined) {
            this.client = params.client;
        }
    }
    aboutToBeDeleted() {
        this.__queueCount.aboutToBeDeleted();
        this.__maxCallCount.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __queueCount: ObservedPropertySimple<string>;
    get queueCount() {
        return this.__queueCount.get();
    }
    set queueCount(newValue: string) {
        this.__queueCount.set(newValue);
    }
    private __maxCallCount: ObservedPropertySimple<string>;
    get maxCallCount() {
        return this.__maxCallCount.get();
    }
    set maxCallCount(newValue: string) {
        this.__maxCallCount.set(newValue);
    }
    private maxCount: number;
    private client: HttpClient;
    createAndRequestCall() {
        for (let i = 1; i < 201; i++) {
            Logger.info('Dispatcher 创建第 ' + i + ' 例优先级为0的请求');
            this.queueCount = '详情：运行中队列 ' + this.client.dispatcher.getRunningCallsCount() + ' 例，等待队列 ' +
                this.client.dispatcher.getReadyCallsCount() + ' 例';
            let request: Request = new Request.Builder()
                .url('http://hshapp.ncn.com.cn/wisdom3/config/config.do')
                .get()
                .setPriority(0)
                .build();
            this.client.newCall(request).enqueue((result: Response) => {
                Logger.info('Dispatcher 第 ' + i + ' 例优先级为0的请求完成');
                this.queueCount = '详情：运行中队列 ' + this.client.dispatcher.getRunningCallsCount() + ' 例，等待队列 ' +
                    this.client.dispatcher.getReadyCallsCount() + ' 例';
            }, (err: BusinessError) => {
                Logger.info('Dispatcher 第 ' + i + ' 例优先级为0的请求完成');
                this.queueCount = '详情：运行中队列 ' + this.client.dispatcher.getRunningCallsCount() + ' 例，等待队列 ' +
                    this.client.dispatcher.getReadyCallsCount() + ' 例';
            });
        }
        this.createHighPriorityCall(1);
        this.createHighPriorityCall(2);
        this.createHighPriorityCall(3);
        this.createHighPriorityCall(4);
        this.createHighPriorityCall(5);
        this.createHighPriorityCall(6);
        this.createHighPriorityCall(7);
        this.createHighPriorityCall(8);
        this.createHighPriorityCall(9);
        this.createHighPriorityCall(10);
    }
    createHighPriorityCall(priority: Number) {
        Logger.info('Dispatcher 创建优先级为' + priority + ' 的请求');
        this.queueCount = '详情：运行中队列 ' + this.client.dispatcher.getRunningCallsCount() + ' 例，等待队列 ' +
            this.client.dispatcher.getReadyCallsCount() + ' 例';
        let request: Request = new Request.Builder()
            .url('http://hshapp.ncn.com.cn/wisdom3/config/config.do')
            .get()
            .setPriority(priority)
            .build();
        this.client.newCall(request).enqueue((result: Response) => {
            Logger.info('Dispatcher 优先级为 ' + priority + '的请求完成');
            this.queueCount = '详情：运行中队列 ' + this.client.dispatcher.getRunningCallsCount() + ' 例，等待队列 ' +
                this.client.dispatcher.getReadyCallsCount() + ' 例';
        }, (err: BusinessError) => {
            Logger.info('Dispatcher 优先级为 ' + priority + '的请求完成');
            this.queueCount = '详情：运行中队列 ' + this.client.dispatcher.getRunningCallsCount() + ' 例，等待队列 ' +
                this.client.dispatcher.getReadyCallsCount() + ' 例';
        });
    }
    render() {
        Column.create();
        Column.justifyContent(FlexAlign.Start);
        Column.width('100%');
        Column.height('100%');
        Flex.create({
            direction: FlexDirection.Column
        });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Navigator.create({
            target: '',
            type: NavigationType.Back
        });
        Text.create('BACK');
        Text.fontSize(12);
        Text.border({
            width: 1
        });
        Text.padding(10);
        Text.fontColor(0x000000);
        Text.borderColor(0x317aff);
        Text.pop();
        Navigator.pop();
        Flex.pop();
        TextInput.create({ placeholder: '请输入新的最大请求队列数' });
        TextInput.placeholderColor(Color.Grey);
        TextInput.placeholderFont({ size: 14, weight: 400 });
        TextInput.caretColor(Color.Blue);
        TextInput.width(400);
        TextInput.height(40);
        TextInput.margin(20);
        TextInput.fontSize(14);
        TextInput.fontColor(Color.Black);
        TextInput.type(InputType.Number);
        TextInput.onChange((value: string) => {
            this.maxCount = Number.parseInt(value);
        });
        Button.createWithLabel('确定修改');
        Button.width('50%');
        Button.height(40);
        Button.fontSize(18);
        Button.fontColor(0xFFFFFF);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick(() => {
            if (this.maxCount <= 0) {
                Logger.info('Dispatcher 设置数值不对');
            }
            else {
                this.maxCallCount = '最大请求队列数为： ' + this.maxCount;
                this.client.dispatcher.setMaxRequestCount(this.maxCount);
            }
        });
        Button.pop();
        Text.create(this.maxCallCount);
        Text.fontColor(0X0000FF);
        Text.width('80%');
        Text.fontSize('14fp');
        Text.margin(20);
        Text.pop();
        Button.createWithLabel('发起请求');
        Button.width('50%');
        Button.height(40);
        Button.fontSize(18);
        Button.fontColor(0xFFFFFF);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick(() => {
            this.createAndRequestCall();
        });
        Button.pop();
        Text.create(this.queueCount);
        Text.fontColor(0X0000FF);
        Text.width('80%');
        Text.fontSize('14fp');
        Text.margin(20);
        Text.pop();
        Column.pop();
    }
}
loadDocument(new priorityQueue("1", undefined, {}));
