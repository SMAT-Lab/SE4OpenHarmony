interface Rpc_Params {
    consoleServer?: ConsoleN.Model;
    consoleClient?: ConsoleN.Model;
    serverIp?: string;
    rabbitServer?: ESObject;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Rpc_" + ++__generate__Id;
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
class Rpc extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__consoleServer = new ObservedPropertyObject(new ConsoleN.Model(), this, "consoleServer");
        this.__consoleClient = new ObservedPropertyObject(new ConsoleN.Model(), this, "consoleClient");
        this.__serverIp = new ObservedPropertySimple('10.50.40.15', this, "serverIp");
        this.rabbitServer = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Rpc_Params) {
        if (params.consoleServer !== undefined) {
            this.consoleServer = params.consoleServer;
        }
        if (params.consoleClient !== undefined) {
            this.consoleClient = params.consoleClient;
        }
        if (params.serverIp !== undefined) {
            this.serverIp = params.serverIp;
        }
        if (params.rabbitServer !== undefined) {
            this.rabbitServer = params.rabbitServer;
        }
    }
    aboutToBeDeleted() {
        this.__consoleServer.aboutToBeDeleted();
        this.__consoleClient.aboutToBeDeleted();
        this.__serverIp.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __consoleServer: ObservedPropertyObject<ConsoleN.Model>;
    get consoleServer() {
        return this.__consoleServer.get();
    }
    set consoleServer(newValue: ConsoleN.Model) {
        this.__consoleServer.set(newValue);
    }
    private __consoleClient: ObservedPropertyObject<ConsoleN.Model>;
    get consoleClient() {
        return this.__consoleClient.get();
    }
    set consoleClient(newValue: ConsoleN.Model) {
        this.__consoleClient.set(newValue);
    }
    private __serverIp: ObservedPropertySimple<string>;
    get serverIp() {
        return this.__serverIp.get();
    }
    set serverIp(newValue: string) {
        this.__serverIp.set(newValue);
    }
    private rabbitServer: any;
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
            View.create(new Console("2", this, { model: this.__consoleServer }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        __Common__.pop();
        Row.create();
        Row.width('100%');
        Row.height('5%');
        Button.createWithLabel('start rpc server');
        Button.onClick(() => {
            this.startServer(ObservedObject.GetRawObject(this.consoleServer));
        });
        Button.pop();
        Button.createWithLabel('stop rpc server');
        Button.onClick(() => {
            this.stopServer(ObservedObject.GetRawObject(this.consoleServer));
        });
        Button.pop();
        Row.pop();
        __Common__.create();
        __Common__.height('40%');
        let earlierCreatedChild_3: Console = (this && this.findChildById) ? this.findChildById("3") as Console : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new Console("3", this, { model: this.__consoleClient }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        __Common__.pop();
        Row.create();
        Row.width('100%');
        Row.height('5%');
        Button.createWithLabel('send by rpc client');
        Button.onClick(() => {
            this.startClient(ObservedObject.GetRawObject(this.consoleClient));
        });
        Button.pop();
        Row.pop();
        Column.pop();
    }
    aboutToDisappear() {
        this.stopServer(this.consoleServer);
    }
    startClient(console: ConsoleN.Model) {
        let rabbit: any = jackrabbit('amqp://' + this.serverIp);
        const exchange: any = rabbit.default();
        const rpc: any = exchange.queue({ name: 'rpc_queue_jackrabbit', prefetch: 1, durable: false });
        const onReply = (data: any) => {
            console.log('result:' + data.result);
            rabbit.close();
        };
        rpc.on('ready', () => {
            exchange.publish({ n: 30 }, {
                key: 'rpc_queue_jackrabbit',
                reply: onReply // auto sends necessary info so the reply can come to the exclusive reply-to queue for this rabbit instance
            });
        });
        console.info('Request fib(30), wait for reply.');
    }
    startServer(console: ConsoleN.Model) {
        if (this.rabbitServer) {
            return;
        }
        let rabbit: any = jackrabbit('amqp://' + this.serverIp);
        const exchange: any = rabbit.default();
        const rpc: any = exchange.queue({ name: 'rpc_queue_jackrabbit', prefetch: 1, durable: false });
        const fib = (n: any): number => {
            if (n === 0) {
                return 0;
            }
            if (n === 1) {
                return 1;
            }
            return fib(n - 1) + fib(n - 2);
        };
        const onRequest = (data: any, reply: any) => {
            console.log('got request for n:' + data.n);
            if (data.n > 30) {
                console.warn(`fib(${data.n}) may costs too mush time on device, replace to fib(30)`);
                data.n = 30;
            }
            reply({ result: fib(data.n) });
        };
        rpc.consume(onRequest);
        this.rabbitServer = rabbit;
        console.info('start rpc server');
    }
    stopServer(console: ConsoleN.Model) {
        if (this.rabbitServer) {
            this.rabbitServer.close();
            this.rabbitServer = null;
            console.info('stop rpc server');
        }
    }
}
loadDocument(new Rpc("1", undefined, {}));
