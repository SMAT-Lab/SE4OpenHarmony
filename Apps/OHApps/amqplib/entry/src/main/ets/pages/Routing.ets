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
const exchangeName = 'fanoutExchange';
const exchangeType = Contents.exchangeType_fanout;
//定义队列
const errorQueue = 'error';
const infoQueue = 'info';
//绑定队列到交换机
const routingKey = 'myRoutingKey';

@Entry
@Component
struct Routing {
  @State consoleReceive: ConsoleN.Model = new ConsoleN.Model();
  @State consoleSend: ConsoleN.Model = new ConsoleN.Model();
  @State serverIp: string = Contents.serverIp
  connection: Connection | null = null
  channel: Channel | null = null

  async connect() {
    amqplib.connect('amqp://' + this.serverIp, async (err: Error, conn: Connection) => {
      if (err) {
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
      await this.channel.assertQueue(errorQueue, queueOptions);
      await this.channel.assertQueue(infoQueue, queueOptions);

      // 绑定队列到交换机
      await this.channel.bindQueue(errorQueue, exchangeName, routingKey);
      await this.channel.bindQueue(infoQueue, exchangeName, routingKey);
    });
    console.log('Connected to RabbitMQ server');
  };

  aboutToAppear() {
    this.connect()
  }

  aboutToDisappear() {
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
          let isPush: boolean | undefined = this.channel?.sendToQueue(infoQueue, Buffer.from('this is a harmless log'), publishOptions);
          this.channel?.sendToQueue(infoQueue, Buffer.from('this one is more important'), publishOptions);
          this.channel?.sendToQueue(errorQueue, Buffer.from('pay attention to me!'), publishOptions);
          this.consoleSend.info('publish message:' + isPush)
        })
        Console({ model: $consoleReceive }).height('40%')
        Button('消费消息').onClick(async () => {
          // 消费消息
          const consumeOptions: Options.Consume = { noAck: false };
          await this.channel?.consume(infoQueue, (msg: ConsumeMessage | null) => {
            this.consoleReceive.log('Writing to console: ' + Unit8ArrayUtils.Uint8ArrayToString(msg?.content));
            this.channel?.ack(msg);
          }, consumeOptions);
          await this.channel?.consume(errorQueue, (msg: ConsumeMessage | null) => {
            this.consoleReceive.log('Writing to disk: ' + Unit8ArrayUtils.Uint8ArrayToString(msg?.content));
            this.channel?.ack(msg);
          }, consumeOptions);
        })
      }.width('100%')
    }.height('100%')
  }
}