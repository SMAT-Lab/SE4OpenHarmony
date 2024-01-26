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
struct Topics {
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
    this.stopReceive(this.consoleReceive)
  }

  async send(console: ConsoleN.Model) {
    let rabbit:ESObject = jackrabbit('amqp://' + this.serverIp);
    let exchange:ESObject = rabbit.topic('topic_animals');
    exchange
      .publish({ text: 'both queues 1' }, { key: 'quick.orange.rabbit' })
      .publish({ text: 'both queues 2' }, { key: 'lazy.orange.elephant' })
      .publish({ text: 'first queue 1' }, { key: 'quick.orange.fox' })
      .publish({ text: 'second queue 1' }, { key: 'lazy.brown.fox' })
      .publish({ text: 'second queue 2' }, { key: 'lazy.pink.rabbit' })
      .publish({ text: 'discarded' }, { key: 'quick.brown.fox' })
      .publish({ text: 'discarded' }, { key: 'orange' })
      .publish({ text: 'second queue 3' }, { key: 'lazy.orange.male.rabbit' })
      .on('drain', () => {
        console.info('Message sent.');
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
    let exchange:ESObject = rabbit.topic('topic_animals');

    let first :ESObject= (data: ESObject, ack: ESObject) => {
      console.log('First:' + data.text);
      ack();
    }

    let second = (data: ESObject, ack: ESObject) => {
      console.log('Second:' + data.text);
      ack();
    }

    exchange
      .queue({ exclusive: true, key: '*.orange.*' })
      .consume(first);

    exchange
      .queue({ exclusive: true, keys: ['*.*.rabbit', 'lazy.#'] })
      .consume(second);


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