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

import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import * as amqp from '@ohos/amqplib';
import { Channel, Connection, ConsumeMessage, GetMessage, Replies, ConfirmChannel } from '@ohos/amqplib';
import { buffer } from '@ohos/node-polyfill';

export default function abilityTest() {
  let connection: Connection;
  let channel: Channel;
  let confirmChannel: ConfirmChannel;
  describe('AbilityTest', () => {
    // Defines a test suite. Two parameters are supported: test suite name and test suite function.
    beforeAll(async () => {
      // Presets an action, which is performed only once before all test cases of the test suite start.
      // This API supports only one parameter: preset action function.
      connection = await amqp.connect('amqp://192.168.1.100');
      channel = await connection.createChannel();
      confirmChannel = await connection.createConfirmChannel()
    })
    beforeEach(() => {
      // Presets an action, which is performed before each unit test case starts.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: preset action function.
    })
    afterEach(() => {
      // Presets a clear action, which is performed after each unit test case ends.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: clear action function.
    })
    afterAll(async () => {
      // Presets a clear action, which is performed after all test cases of the test suite end.
      // This API supports only one parameter: clear action function.
      await channel.close();
      await connection.close();
    })

    it('should_create_a_connection', 0, async () => {
      expect(connection != undefined).assertTrue();
    });


    it('should_create_a_confirmChannel', 0, async () => {
      expect(confirmChannel != undefined).assertTrue();
    });

    it('should_create_a_channel', 0, async () => {
      expect(channel != undefined).assertTrue();
    });

    it('confirmChannel_publish', 0, async () => {
      await confirmChannel.assertExchange('myExchange', 'direct');
      await confirmChannel.assertQueue('myQueue');
      confirmChannel.publish('myExchange', 'myRoutingKey', buffer.Buffer.from('Hello, exchange!'), {
      }, (err: ESObject, ok: Replies.Empty) => {
        if (!err) {
          expect(ok).assertUndefined()
        }
      })
    });

    it('confirmChannel_sendToQueue', 0, async () => {
      await confirmChannel.assertExchange('myExchange', 'direct');
      await confirmChannel.assertQueue('myQueue');
      confirmChannel.sendToQueue('myQueue', buffer.Buffer.from('Hello, exchange!'), {
      }, (err: ESObject, ok: Replies.Empty) => {
        if (!err) {
          expect(ok).assertUndefined()
        }
      })
    });

    it('should_consume_a_message_from_a_queue', 0, async () => {
      await channel.assertQueue('myQueue');
      await channel.sendToQueue('myQueue', buffer.Buffer.from('Hello, exchange!'));
      await channel.consume('myQueue', (msg) => {
        if (msg !== null) {
          expect(msg.content.toString().length > 0).assertTrue();
          channel.ack(msg);
        }
      });
    });

    it('should_bind_a_queue_to_an_exchange', 0, async () => {
      await channel.assertExchange('myExchange', 'direct');
      await channel.assertQueue('myQueue');
      await channel.bindQueue('myQueue', 'myExchange', 'myRoutingKey');
      expect(channel.checkQueue('myQueue') != undefined).assertTrue()
    });

    it('should_publish_a_message_to_an_exchange', 0, async () => {
      await channel.assertExchange('myExchange', 'direct');
      let publish = await channel.publish('myExchange', 'myRoutingKey', buffer.Buffer.from('Hello, exchange!'));
      expect(publish).assertTrue();
    });

    it('should_consume_a_message_from_an_exchange', 0, async () => {
      await channel.assertExchange('myExchange', 'direct');
      await channel.assertQueue('myQueue');
      await channel.bindQueue('myQueue', 'myExchange', 'myRoutingKey');
      await channel.consume('myQueue', (msg) => {
        if (msg !== null) {
          expect(msg.content.toString()).assertEqual('Hello, exchange!');
          channel.ack(msg);
        }
      });
    });

    it('should_consume_a_message_from_a_headers_exchange', 0, async () => {
      await channel.assertExchange('myHeadersExchange', 'headers');
      await channel.assertQueue('myQueue');
      await channel.bindQueue('myQueue', 'myHeadersExchange', '', {
        'x-match': 'any', 'header1': 'value1'
      });
      await channel.consume('myQueue', (msg) => {
        if (msg !== null) {
          expect(msg.content.toString()).assertEqual('Hello, headers exchange!');
          channel.ack(msg);
        }
      });
    });

    it('should_create_connection_and_channel', 0, () => {
      expect(connection != undefined).assertTrue();
      expect(channel != undefined).assertTrue();
      expect(typeof connection).assertEqual('object');
      expect(typeof channel).assertEqual('object');
    });

    it('should_declare_queue', 0, async () => {
      const queueName = 'test-queue';
      await channel.assertQueue(queueName);
      const queueInfo = await channel.checkQueue(queueName);
      expect(queueInfo.queue).assertEqual(queueName);
    });


    it('should_publish_and_consume_messages', 0, async () => {
      const queue = 'test-queue';
      const message = 'Hello, RabbitMQ!';

      // Declare a queue
      await channel.assertQueue(queue);

      // Publish a message to the queue
      await channel.sendToQueue(queue, buffer.Buffer.from(message));

      // Consume the message from the queue
      const consumePromise = new Promise<string>((resolve) => {
        channel.consume(queue, (msg) => {
          const content: string = msg?.content.toString();
          resolve(content);
        });
      });

      const consumedMessage = await consumePromise;

      expect(consumedMessage).assertEqual(message);
    });


    it('should_publish_and_consume_messages_with_exchange', 0, async () => {
      const queueName = 'test-queue';
      const exchangeName = 'test-exchange';
      const routingKey = 'test-routing-key';
      const message = 'Hello, world!';

      await channel.assertQueue(queueName);
      await channel.assertExchange(exchangeName, 'direct');
      await channel.bindQueue(queueName, exchangeName, routingKey);

      await channel.publish(exchangeName, routingKey, buffer.Buffer.from(message));

      await channel.consume(queueName, (msg: ConsumeMessage | null) => {
        expect(msg).assertEqual(message);
      });
    });

    it('should_consume_a_message_from_a_fanout_exchange', 0, async () => {
      await channel.assertExchange('myFanoutExchange', 'fanout');
      await channel.assertQueue('myQueue');
      await channel.bindQueue('myQueue', 'myFanoutExchange', '');
      await channel.consume('myQueue', (msg) => {
        if (msg !== null) {
          expect(msg.content.toString()).assertEqual('Hello, fanout exchange!');
          channel.ack(msg);
        }
      });
    });

    it('should_consume_a_message_from_a_topic_exchange', 0, async () => {
      await channel.assertExchange('myTopicExchange', 'topic');
      await channel.assertQueue('myQueue');
      await channel.bindQueue('myQueue', 'myTopicExchange', 'myTopic.*');
      await channel.consume('myQueue', (msg) => {
        if (msg !== null) {
          expect(msg.content.toString()).assertEqual('Hello, topic exchange!');
          channel.ack(msg);
        }
      });
    });

    it('get_false', 0, async () => {
      await channel.assertQueue('myQueue');
      await channel.bindQueue('myQueue', 'myTopicExchange', 'myTopic.*');
      let getMessage: GetMessage | false = await channel.get('myQueue')
      expect(getMessage).assertFalse()
    });

    it('get_message', 0, async () => {
      await channel.assertExchange('myTopicExchange', 'topic');
      await channel.assertQueue('myQuu');
      await channel.bindQueue('myQuu', 'myTopicExchange', 'myTopic.*');
      await channel.sendToQueue('myQuu', buffer.Buffer.from('abc'))
      let getMessage = await channel.get('myQuu')
      expect(typeof getMessage).assertEqual('object')
    });

    it('deleteQueue', 0, async () => {
      await channel.assertQueue('myQueue');
      let deleteQueue: Replies.DeleteQueue = await channel.deleteQueue('myQueue');
      expect(deleteQueue.messageCount).assertEqual(0)
    });


    it('unbindQueue', 0, async () => {
      await channel.assertQueue('myQueue');
      await channel.bindQueue('myQueue', 'myTopicExchange', 'myTopic.*');
      let unbindQueue: Replies.Empty = await channel.unbindQueue('myQueue', 'myTopicExchange', 'myTopic.*');
      expect(unbindQueue != undefined).assertTrue()
    });



    it('checkExchange', 0, async () => {
      let checkExchange = await channel.checkExchange('myTopicExchange')
      expect(checkExchange != undefined).assertTrue()
    });

    it('deleteExchange', 0, async () => {
      let deleteExchange = await channel.deleteExchange('myTopicExchange')
      expect(deleteExchange != undefined).assertTrue()
    });

    it('bindExchange', 0, async () => {
      await channel.assertExchange('mTopicExchange', 'topic');
      let bindExchange = await channel.bindExchange('mTopicExchange', 'mTopicExchange', 'mTopic.*')
      expect(bindExchange != undefined).assertTrue()
    });

    it('unbindExchange', 0, async () => {
      let unbindExchange = await channel.unbindExchange('mTopicExchange', 'mTopicExchange', 'mTopic.*')
      expect(unbindExchange != undefined).assertTrue()
    });

    it('consumerTag', 0, async () => {
      let consume = await channel.consume('myQueue', (msg: ConsumeMessage | null) => {}, {
        consumerTag: 'my-consumer'
      })
      expect(consume.consumerTag).assertEqual('my-consumer')
    });

    it('cancel', 0, async () => {
      let cancel = await channel.cancel('my-consumer')
      expect(cancel).assertUndefined()
    });
  })
}