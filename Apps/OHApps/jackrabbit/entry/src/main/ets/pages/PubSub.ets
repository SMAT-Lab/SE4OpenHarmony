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
struct PubSub {
  @State consoleReceive: ConsoleN.Model = new ConsoleN.Model();
  @State consoleSend: ConsoleN.Model = new ConsoleN.Model();
  @State serverIp: string = '10.50.40.15';
  rabbit: ESObject;

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

      Console({ model: $consoleReceive }).height('40%')
      Row() {
        Button('receive').onClick(() => {
          this.receive(this.consoleReceive);
        })
        Button('stop').onClick(() => {
          this.stopReceive(this.consoleReceive);
        })
      }.width('100%').height('5%')

      Console({ model: $consoleSend }).height('40%')
      Row() {
        Button('send').onClick(() => {
          this.send(this.consoleSend);
        })
      }.width('100%').height('5%')
    }
    .width('100%')
  }

  aboutToDisappear() {
    this.stopReceive(this.consoleReceive);
  }

  send(console: ConsoleN.Model) {
    let rabbit: ESObject = jackrabbit('amqp://' + this.serverIp);
    let exchange: ESObject = rabbit.fanout();

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
    let rabbit:ESObject = jackrabbit('amqp://' + this.serverIp);
    let exchange:ESObject = rabbit.fanout();
    let logs:ESObject = exchange.queue({ exclusive: true });
    let onLog = (data: ESObject) => {
      console.log('Received log:' + data);
    }

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