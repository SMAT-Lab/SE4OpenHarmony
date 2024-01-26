interface WorkQueues_Params {
    consolePublisher?: ConsoleN.Model;
    consoleEnglish?: ConsoleN.Model;
    consoleSpanish?: ConsoleN.Model;
    serverIp?: string;
    rabbitEnglish?: ESObject;
    rabbitSpanish?: ESObject;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "WorkQueues_" + ++__generate__Id;
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
class WorkQueues extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__consolePublisher = new ObservedPropertyObject(new ConsoleN.Model(), this, "consolePublisher");
        this.__consoleEnglish = new ObservedPropertyObject(new ConsoleN.Model(), this, "consoleEnglish");
        this.__consoleSpanish = new ObservedPropertyObject(new ConsoleN.Model(), this, "consoleSpanish");
        this.__serverIp = new ObservedPropertySimple('10.50.40.15', this, "serverIp");
        this.rabbitEnglish = undefined;
        this.rabbitSpanish = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: WorkQueues_Params) {
        if (params.consolePublisher !== undefined) {
            this.consolePublisher = params.consolePublisher;
        }
        if (params.consoleEnglish !== undefined) {
            this.consoleEnglish = params.consoleEnglish;
        }
        if (params.consoleSpanish !== undefined) {
            this.consoleSpanish = params.consoleSpanish;
        }
        if (params.serverIp !== undefined) {
            this.serverIp = params.serverIp;
        }
        if (params.rabbitEnglish !== undefined) {
            this.rabbitEnglish = params.rabbitEnglish;
        }
        if (params.rabbitSpanish !== undefined) {
            this.rabbitSpanish = params.rabbitSpanish;
        }
    }
    aboutToBeDeleted() {
        this.__consolePublisher.aboutToBeDeleted();
        this.__consoleEnglish.aboutToBeDeleted();
        this.__consoleSpanish.aboutToBeDeleted();
        this.__serverIp.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __consolePublisher: ObservedPropertyObject<ConsoleN.Model>;
    get consolePublisher() {
        return this.__consolePublisher.get();
    }
    set consolePublisher(newValue: ConsoleN.Model) {
        this.__consolePublisher.set(newValue);
    }
    private __consoleEnglish: ObservedPropertyObject<ConsoleN.Model>;
    get consoleEnglish() {
        return this.__consoleEnglish.get();
    }
    set consoleEnglish(newValue: ConsoleN.Model) {
        this.__consoleEnglish.set(newValue);
    }
    private __consoleSpanish: ObservedPropertyObject<ConsoleN.Model>;
    get consoleSpanish() {
        return this.__consoleSpanish.get();
    }
    set consoleSpanish(newValue: ConsoleN.Model) {
        this.__consoleSpanish.set(newValue);
    }
    private __serverIp: ObservedPropertySimple<string>;
    get serverIp() {
        return this.__serverIp.get();
    }
    set serverIp(newValue: string) {
        this.__serverIp.set(newValue);
    }
    private rabbitEnglish: any;
    private rabbitSpanish: any;
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
        __Common__.height('25%');
        let earlierCreatedChild_2: Console = (this && this.findChildById) ? this.findChildById("2") as Console : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Console("2", this, { model: this.__consoleEnglish }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        __Common__.pop();
        Row.create();
        Row.width('100%');
        Row.height('5%');
        Button.createWithLabel('receive from default');
        Button.onClick(() => {
            this.receiveEnglish(ObservedObject.GetRawObject(this.consoleEnglish));
        });
        Button.pop();
        Button.createWithLabel('stop');
        Button.onClick(() => {
            this.stopEnglish(ObservedObject.GetRawObject(this.consoleEnglish));
        });
        Button.pop();
        Row.pop();
        __Common__.create();
        __Common__.height('25%');
        let earlierCreatedChild_3: Console = (this && this.findChildById) ? this.findChildById("3") as Console : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new Console("3", this, { model: this.__consoleSpanish }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        __Common__.pop();
        Row.create();
        Row.width('100%');
        Row.height('5%');
        Button.createWithLabel('receive from direct');
        Button.onClick(() => {
            this.receiveSpanish(ObservedObject.GetRawObject(this.consoleSpanish));
        });
        Button.pop();
        Button.createWithLabel('stop');
        Button.onClick(() => {
            this.stopSpanish(ObservedObject.GetRawObject(this.consoleSpanish));
        });
        Button.pop();
        Row.pop();
        __Common__.create();
        __Common__.height('25%');
        let earlierCreatedChild_4: Console = (this && this.findChildById) ? this.findChildById("4") as Console : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new Console("4", this, { model: this.__consolePublisher }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({});
            View.create(earlierCreatedChild_4);
        }
        __Common__.pop();
        Row.create();
        Row.width('100%');
        Row.height('5%');
        Button.createWithLabel('send');
        Button.onClick(() => {
            this.publish(ObservedObject.GetRawObject(this.consolePublisher));
        });
        Button.pop();
        Row.pop();
        Column.pop();
    }
    aboutToDisappear() {
        this.stopEnglish(this.consoleEnglish);
        this.stopSpanish(this.consoleSpanish);
    }
    publish(console: ConsoleN.Model) {
        let rabbit: any = jackrabbit('amqp://' + this.serverIp);
        let exchange: any = rabbit.default();
        let hello: any = exchange.queue({ name: 'task_queue', durable: true });
        exchange.publish({ name: 'Hunter' }, { key: 'task_queue' });
        exchange.on('drain', () => {
            console.info('Message sent: Hunter');
            setTimeout(() => {
                rabbit.close();
            }, 100);
        });
    }
    receiveEnglish(console: ConsoleN.Model) {
        if (this.rabbitEnglish) {
            return;
        }
        let rabbit: any = jackrabbit('amqp://' + this.serverIp);
        let exchange: any = rabbit.default();
        let hello: any = exchange.queue({ name: 'task_queue', durable: true });
        let onGreet = (data: any, ack: any) => {
            console.log('Hello, ' + data.name + '!');
            ack();
        };
        hello.consume(onGreet);
        this.rabbitEnglish = rabbit;
        console.info('start English receiver');
    }
    stopEnglish(console: ConsoleN.Model) {
        if (this.rabbitEnglish) {
            this.rabbitEnglish.close();
            this.rabbitEnglish = null;
            console.info('stop English receiver');
        }
    }
    receiveSpanish(console: ConsoleN.Model) {
        if (this.rabbitSpanish) {
            return;
        }
        let rabbit: any = jackrabbit('amqp://' + this.serverIp);
        let exchange: any = rabbit.direct();
        let hello: any = exchange.queue({ name: 'task_queue', durable: true });
        let onGreet = (data: any, ack: any) => {
            console.log('Hola, ' + data.name + '!');
            ack();
        };
        hello.consume(onGreet);
        this.rabbitSpanish = rabbit;
        console.info('start Spanish receiver');
    }
    stopSpanish(console: ConsoleN.Model) {
        if (this.rabbitSpanish) {
            this.rabbitSpanish.close();
            this.rabbitSpanish = null;
            console.info('stop Spanish receiver');
        }
    }
}
loadDocument(new WorkQueues("1", undefined, {}));
