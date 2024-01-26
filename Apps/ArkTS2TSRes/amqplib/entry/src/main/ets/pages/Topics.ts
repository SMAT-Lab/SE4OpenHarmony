interface Topics_Params {
    consoleReceive?: ConsoleN.Model;
    consoleSend?: ConsoleN.Model;
    serverIp?: string;
    connection?: Connection | null;
    channel?: Channel | null;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Topics_" + ++__generate__Id;
}
/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import * as amqplib from '@ohos/amqplib/src/main/ets/callback_api';
import { Options, Channel, Connection, ConsumeMessage } from '@ohos/amqplib';
import { buffer } from '@ohos/node-polyfill';
import { Unit8ArrayUtils } from './Unit8ArrayUtils';
import ConsoleN from '../components/ConsoleN';
import { Console } from '../components/Console';
import { Contents } from '../Contents';
const Buffer: any = buffer.Buffer;
//定义交换机
const exchangeName = 'directExchange';
const exchangeType = Contents.exchangeType_direct;
//定义队列
const firstName = 'first';
const secondName = 'second';
//绑定队列到交换机
const routingKey = 'myRoutingKey';
class Topics extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__consoleReceive = new ObservedPropertyObject(new ConsoleN.Model(), this, "consoleReceive");
        this.__consoleSend = new ObservedPropertyObject(new ConsoleN.Model(), this, "consoleSend");
        this.__serverIp = new ObservedPropertySimple(Contents.serverIp, this, "serverIp");
        this.connection = null;
        this.channel = null;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Topics_Params) {
        if (params.consoleReceive !== undefined) {
            this.consoleReceive = params.consoleReceive;
        }
        if (params.consoleSend !== undefined) {
            this.consoleSend = params.consoleSend;
        }
        if (params.serverIp !== undefined) {
            this.serverIp = params.serverIp;
        }
        if (params.connection !== undefined) {
            this.connection = params.connection;
        }
        if (params.channel !== undefined) {
            this.channel = params.channel;
        }
    }
    aboutToBeDeleted() {
        this.__consoleReceive.aboutToBeDeleted();
        this.__consoleSend.aboutToBeDeleted();
        this.__serverIp.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __consoleReceive: ObservedPropertyObject<ConsoleN.Model>;
    get consoleReceive() {
        return this.__consoleReceive.get();
    }
    set consoleReceive(newValue: ConsoleN.Model) {
        this.__consoleReceive.set(newValue);
    }
    private __consoleSend: ObservedPropertyObject<ConsoleN.Model>;
    get consoleSend() {
        return this.__consoleSend.get();
    }
    set consoleSend(newValue: ConsoleN.Model) {
        this.__consoleSend.set(newValue);
    }
    private __serverIp: ObservedPropertySimple<string>;
    get serverIp() {
        return this.__serverIp.get();
    }
    set serverIp(newValue: string) {
        this.__serverIp.set(newValue);
    }
    private connection: Connection | null;
    private channel: Channel | null;
    async connect() {
        amqplib.connect('amqp://' + this.serverIp, async (err: Error, conn: Connection) => {
            if (err) {
                console.info('onConnection--------------err:' + err.message);
                return;
            }
            this.connection = conn;
            this.channel = await this.connection.createChannel();
            // 定义交换机
            const exchangeOptions: Options.AssertExchange = { durable: true };
            await this.channel.assertExchange(exchangeName, exchangeType, exchangeOptions);
            // 定义队列
            const queueOptions: Options.AssertQueue = { durable: true };
            await this.channel.assertQueue(firstName, queueOptions);
            await this.channel.assertQueue(secondName, queueOptions);
            // 绑定队列到交换机
            await this.channel.bindQueue(firstName, exchangeName, routingKey);
            await this.channel.bindQueue(secondName, exchangeName, routingKey);
        });
        console.log('Connected to RabbitMQ server');
    }
    aboutToAppear() {
        this.connect();
    }
    aboutToDisappear() {
        this.connection?.close();
        this.channel?.close();
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        __Common__.create();
        __Common__.height('40%');
        let earlierCreatedChild_2: Console = (this && this.findChildById) ? this.findChildById("2") as Console : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Console("2", this, { model: this.__consoleSend }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        __Common__.pop();
        Button.createWithLabel('发布消息');
        Button.onClick(async () => {
            // 发布消息
            const publishOptions: Options.Publish = { persistent: true };
            this.channel?.sendToQueue(firstName, Buffer.from('both queues 1'), publishOptions);
            this.channel?.sendToQueue(firstName, Buffer.from('both queues 2'), publishOptions);
            this.channel?.sendToQueue(firstName, Buffer.from('first queue 1'), publishOptions);
            this.channel?.sendToQueue(secondName, Buffer.from('second queue 3'), publishOptions);
            this.channel?.sendToQueue(secondName, Buffer.from('second queue 1'), publishOptions);
            this.channel?.sendToQueue(secondName, Buffer.from('second queue 2'), publishOptions);
            this.channel?.sendToQueue(secondName, Buffer.from('discarded 1'), publishOptions);
            let isPush = this.channel?.sendToQueue(firstName, Buffer.from('discarded 2'), publishOptions);
            this.consoleSend.info('publish message:' + isPush);
        });
        Button.pop();
        __Common__.create();
        __Common__.height('40%');
        let earlierCreatedChild_3: Console = (this && this.findChildById) ? this.findChildById("3") as Console : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new Console("3", this, { model: this.__consoleReceive }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        __Common__.pop();
        Button.createWithLabel('消费消息');
        Button.onClick(async () => {
            // 消费消息
            await this.channel?.consume('first', (msg: ConsumeMessage | null) => {
                this.consoleReceive.log('First:' + Unit8ArrayUtils.Uint8ArrayToString(msg?.content));
                this.channel?.ack(msg);
            }, { exclusive: true });
            await this.channel?.consume('second', (msg: ConsumeMessage | null) => {
                this.consoleReceive.log('Second: ' + Unit8ArrayUtils.Uint8ArrayToString(msg?.content));
                this.channel?.ack(msg);
            }, { exclusive: true });
        });
        Button.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Topics("1", undefined, {}));
