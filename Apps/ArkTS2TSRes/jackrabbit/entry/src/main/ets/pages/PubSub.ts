interface PubSub_Params {
    consoleReceive?: ConsoleN.Model;
    consoleSend?: ConsoleN.Model;
    serverIp?: string;
    rabbit?: ESObject;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PubSub_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import { Console } from '../components/Console';
import ConsoleN from '../components/ConsoleN';
import jackrabbit from '@ohos/jackrabbit';
import router from '@ohos.router';
class PubSub extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__consoleReceive = new ObservedPropertyObject(new ConsoleN.Model(), this, "consoleReceive");
        this.__consoleSend = new ObservedPropertyObject(new ConsoleN.Model(), this, "consoleSend");
        this.__serverIp = new ObservedPropertySimple('10.50.40.15', this, "serverIp");
        this.rabbit = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PubSub_Params) {
        if (params.consoleReceive !== undefined) {
            this.consoleReceive = params.consoleReceive;
        }
        if (params.consoleSend !== undefined) {
            this.consoleSend = params.consoleSend;
        }
        if (params.serverIp !== undefined) {
            this.serverIp = params.serverIp;
        }
        if (params.rabbit !== undefined) {
            this.rabbit = params.rabbit;
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
    private rabbit: any;
    aboutToAppear() {
        let obj: any = router.getParams();
        if (obj.serverIp)
            this.serverIp = obj.serverIp;
    }
    render() {
        Column.create();
        Column.width('100%');
        Row.create();
        Row.width('100%');
        Row.height('10%');
        Text.create('RabbitMQ server ip: ');
        Text.pop();
        TextInput.create({ text: this.serverIp });
        TextInput.onChange((value) => {
            this.serverIp = value;
        });
        TextInput.focusable(false);
        Row.pop();
        __Common__.create();
        __Common__.height('40%');
        let earlierCreatedChild_2: Console = (this && this.findChildById) ? this.findChildById("2") as Console : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Console("2", this, { model: this.__consoleReceive }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        __Common__.pop();
        Row.create();
        Row.width('100%');
        Row.height('5%');
        Button.createWithLabel('receive');
        Button.onClick(() => {
            this.receive(ObservedObject.GetRawObject(this.consoleReceive));
        });
        Button.pop();
        Button.createWithLabel('stop');
        Button.onClick(() => {
            this.stopReceive(ObservedObject.GetRawObject(this.consoleReceive));
        });
        Button.pop();
        Row.pop();
        __Common__.create();
        __Common__.height('40%');
        let earlierCreatedChild_3: Console = (this && this.findChildById) ? this.findChildById("3") as Console : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new Console("3", this, { model: this.__consoleSend }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        __Common__.pop();
        Row.create();
        Row.width('100%');
        Row.height('5%');
        Button.createWithLabel('send');
        Button.onClick(() => {
            this.send(ObservedObject.GetRawObject(this.consoleSend));
        });
        Button.pop();
        Row.pop();
        Column.pop();
    }
    aboutToDisappear() {
        this.stopReceive(this.consoleReceive);
    }
    send(console: ConsoleN.Model) {
        let rabbit: any = jackrabbit('amqp://' + this.serverIp);
        let exchange: any = rabbit.fanout();
        exchange.publish('this is a log');
        exchange.on('drain', () => {
            console.info('Message sent: this is a log');
            setTimeout(() => {
                rabbit.close();
            }, 100);
        });
    }
    receive(console: ConsoleN.Model) {
        if (this.rabbit) {
            return;
        }
        let rabbit: any = jackrabbit('amqp://' + this.serverIp);
        let exchange: any = rabbit.fanout();
        let logs: any = exchange.queue({ exclusive: true });
        let onLog = (data: any) => {
            console.log('Received log:' + data);
        };
        logs.consume(onLog, { noAck: true });
        // logs.consume(false); // stops consuming
        this.rabbit = rabbit;
        console.info('start receiver');
    }
    stopReceive(console: ConsoleN.Model) {
        if (this.rabbit) {
            this.rabbit.close();
            this.rabbit = null;
            console.info('stop receiver');
        }
    }
}
loadDocument(new PubSub("1", undefined, {}));
