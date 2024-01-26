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

@Entry
@Component
struct TimeoutRpc {
  @State consoleServer: ConsoleN.Model = new ConsoleN.Model();
  @State consoleClient: ConsoleN.Model = new ConsoleN.Model();
  @State consoleClientTimeout: ConsoleN.Model = new ConsoleN.Model();
  @State serverIp: string = '10.50.40.15';
  rabbitServer: ESObject;

  aboutToAppear() {
    let obj: ESObject = router.getParams()
    if (obj.serverIp)
      this.serverIp = obj.serverIp
  }

  build() {
    Column() {
      Row() {
        Text('RabbitMQ server ip: ')
        TextInput({ text: this.serverIp }).onChange((value) => {
          this.serverIp = value;
        }).focusable(false)
      }.width('100%').height('10%')

      Console({ model: $consoleServer }).height('25%')
      Row() {
        Button('start rpc server').onClick(() => {
          this.startServer(this.consoleServer);
        })
        Button('stop rpc server').onClick(() => {
          this.stopServer(this.consoleServer);
        })
      }.width('100%').height('5%')

      Console({ model: $consoleClient }).height('25%')
      Row() {
        Button('send by rpc client').onClick(() => {
          this.startClient(this.consoleClient);
        })
      }.width('100%').height('5%')

      Console({ model: $consoleClientTimeout }).height('25%')
      Row() {
        Button('send by rpc client(with 1s timeout)').onClick(() => {
          this.startClientTimeout(this.consoleClientTimeout);
        })
      }.width('100%').height('5%')
    }
    .width('100%')
  }

  aboutToDisappear() {
    this.stopServer(this.consoleServer);
  }

  startClient(console: ConsoleN.Model) {
    let rabbit:ESObject = jackrabbit('amqp://' + this.serverIp);
    const exchange:ESObject = rabbit.default();

    // ensure queue is ready before sending out request
    const rpc :ESObject= exchange.queue({ name: 'rpc_queue_jackrabbit_timeout', prefetch: 1, durable: false, autoDelete: true });
    rpc.on('ready', () => {
      exchange.rpcClient('rpc_queue_jackrabbit_timeout', { n: 30 }, null, (result: ESObject) => {
        if (result && result instanceof Error) {
          console.error(result.toString());
        } else {
          console.info(result);
        }
      });
    });
    console.info('Request fib(30), wait for reply.');
  }

 async  startClientTimeout(console: ConsoleN.Model) {
    let rabbit:ESObject = jackrabbit('amqp://' + this.serverIp);
    const exchange:ESObject = rabbit.default();
    exchange.rpcClient('rpc_queue_jackrabbit_timeout', { n: 30 }, { timeout: 1000 }, (result: ESObject) => {
      if (result && result instanceof Error) {
        console.error(result.toString());
      } else {
        console.info(result);
      }
    });
    console.info('Request fib(30), wait for reply(with 1s timeout).');
  }

  startServer(console: ConsoleN.Model) {
    if (this.rabbitServer) {
      return;
    }
    let rabbit:ESObject = jackrabbit('amqp://' + this.serverIp);
    const exchange :ESObject= rabbit.default();

    const fib = (n: ESObject): number => {
      if (n === 0) {
        return 0;
      }

      if (n === 1) {
        return 1;
      }

      return fib(n - 1) + fib(n - 2);
    };

    const onRequest = (data: ESObject, reply: ESObject) => {

      console.log('got request for n:' + data.n);
      if (data.n > 30) {
        console.warn(`fib(${data.n}) may costs too mush time on device, replace to fib(30)`)
        data.n = 30;
      }
      reply({ result: fib(data.n) });
    };

    // ensure queue is ready before connecting
    const rpc: ESObject = exchange.queue({ name: 'rpc_queue_jackrabbit_timeout', prefetch: 1, durable: false, autoDelete: true });
    rpc.on('ready',async () => {
      exchange.rpcServer('rpc_queue_jackrabbit_timeout', onRequest);
    });

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