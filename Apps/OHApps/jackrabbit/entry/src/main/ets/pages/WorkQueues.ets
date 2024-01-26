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
struct WorkQueues {
  @State consolePublisher: ConsoleN.Model = new ConsoleN.Model();
  @State consoleEnglish: ConsoleN.Model = new ConsoleN.Model();
  @State consoleSpanish: ConsoleN.Model = new ConsoleN.Model();
  @State serverIp: string = '10.50.40.15';
  rabbitEnglish: ESObject;
  rabbitSpanish: ESObject;

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

      Console({ model: $consoleEnglish }).height('25%')
      Row() {
        Button('receive from default').onClick(() => {
          this.receiveEnglish(this.consoleEnglish);
        })
        Button('stop').onClick(() => {
          this.stopEnglish(this.consoleEnglish);
        })
      }.width('100%').height('5%')

      Console({ model: $consoleSpanish }).height('25%')
      Row() {
        Button('receive from direct').onClick(() => {
          this.receiveSpanish(this.consoleSpanish);
        })
        Button('stop').onClick(() => {
          this.stopSpanish(this.consoleSpanish);
        })
      }.width('100%').height('5%')

      Console({ model: $consolePublisher }).height('25%')
      Row() {
        Button('send').onClick(() => {
          this.publish(this.consolePublisher);
        })
      }.width('100%').height('5%')
    }
    .width('100%')
  }

  aboutToDisappear() {
    this.stopEnglish(this.consoleEnglish);
    this.stopSpanish(this.consoleSpanish);
  }

  publish(console: ConsoleN.Model) {
    let rabbit:ESObject = jackrabbit('amqp://' + this.serverIp);
    let exchange:ESObject = rabbit.default();
    let hello:ESObject = exchange.queue({ name: 'task_queue', durable: true });

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
    let rabbit:ESObject = jackrabbit('amqp://' + this.serverIp);
    let exchange:ESObject = rabbit.default();
    let hello :ESObject= exchange.queue({ name: 'task_queue', durable: true });

    let onGreet = (data: ESObject, ack: ESObject) => {
      console.log('Hello, ' + data.name + '!');
      ack();
    }
    hello.consume(onGreet);
    this.rabbitEnglish = rabbit;
    console.info('start English receiver');
  }

  stopEnglish(console: ConsoleN.Model) {
    if (this.rabbitEnglish) {
      this.rabbitEnglish.close();
      this.rabbitEnglish = null;
      console.info('stop English receiver')
    }
  }

  receiveSpanish(console: ConsoleN.Model) {
    if (this.rabbitSpanish) {
      return;
    }
    let rabbit:ESObject = jackrabbit('amqp://' + this.serverIp);
    let exchange:ESObject = rabbit.direct();
    let hello:ESObject = exchange.queue({ name: 'task_queue', durable: true });

    let onGreet = (data: ESObject, ack: ESObject) => {
      console.log('Hola, ' + data.name + '!');
      ack();
    }

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