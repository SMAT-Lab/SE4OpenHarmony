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

const Buffer: ESObject = buffer.Buffer;
//定义交换机
const exchangeName = 'directExchange';
const exchangeType = Contents.exchangeType_direct;
//定义队列
const firstName = 'first';
const secondName = 'second';
//绑定队列到交换机
const routingKey = 'myRoutingKey';
@Entry
@Component
struct Topics {
  @State consoleReceive: ConsoleN.Model = new ConsoleN.Model();
  @State consoleSend: ConsoleN.Model = new ConsoleN.Model();
  @State serverIp: string = Contents.serverIp
  connection: Connection | null = null
  channel: Channel | null = null

  async connect() {
    amqplib.connect('amqp://' + this.serverIp, async (err: Error, conn: Connection) => {
      if (err){
        console.info('onConnection--------------err:' + err.message)
        return
      }
      this.connection = conn
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
  };

  aboutToAppear() {
    this.connect()
  }
  aboutToDisappear(){
    this.connection?.close()
    this.channel?.close()
  }
  build() {
    Row() {
      Column() {
        Console({ model: $consoleSend }).height('40%')
        Button('发布消息').onClick(async () => {
          // 发布消息
          const publishOptions: Options.Publish = { persistent: true };
          this.channel?.sendToQueue(firstName, Buffer.from('both queues 1'), publishOptions);
          this.channel?.sendToQueue(firstName, Buffer.from('both queues 2'), publishOptions);
          this.channel?.sendToQueue(firstName, Buffer.from('first queue 1'), publishOptions);
          this.channel?.sendToQueue(secondName, Buffer.from('second queue 3'), publishOptions);
          this.channel?.sendToQueue(secondName, Buffer.from('second queue 1'), publishOptions);
          this.channel?.sendToQueue(secondName, Buffer.from('second queue 2'), publishOptions);
          this.channel?.sendToQueue(secondName, Buffer.from('discarded 1'), publishOptions);
          let isPush =  this.channel?.sendToQueue(firstName, Buffer.from('discarded 2'), publishOptions);
          this.consoleSend.info('publish message:' + isPush)
        })
        Console({ model: $consoleReceive }).height('40%')
        Button('消费消息').onClick(async () => {
          // 消费消息
          await this.channel?.consume('first', (msg: ConsumeMessage | null) => {
              this.consoleReceive.log('First:' + Unit8ArrayUtils.Uint8ArrayToString(msg?.content));
              this.channel?.ack(msg);
            },{ exclusive: true });

          await this.channel?.consume('second', (msg: ConsumeMessage | null) => {
              this.consoleReceive.log('Second: ' + Unit8ArrayUtils.Uint8ArrayToString(msg?.content));
              this.channel?.ack(msg);
            },{ exclusive: true });
        })
      }.width('100%')
    }.height('100%')
  }
}