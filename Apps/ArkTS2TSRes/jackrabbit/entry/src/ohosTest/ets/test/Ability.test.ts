let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
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
import hilog from '@ohos.hilog';
import { describe, beforeAll, it, expect } from '@ohos/hypium';
import jackrabbit from '@ohos/jackrabbit';
export default function abilityTest() {
    let rabbit: any = null;
    let serverIp: string = '';
    describe('client_jackrabbit_test', () => {
        beforeAll(() => {
            serverIp = '10.50.40.18';
            rabbit = jackrabbit('amqp://' + serverIp);
        });
        it('jackrabbit', 0, () => {
            expect(rabbit).assertInstanceOf('Object');
        });
        it('jackrabbit_empty', 0, () => {
            try {
                let rabbit = jackrabbit('');
                hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'rabbit:' + JSON.stringify(rabbit) ?? '');
            }
            catch (e) {
                expect(e.message).assertEqual('url required for jackrabbit connection');
            }
        });
        it('jackrabbit_undefined', 0, () => {
            try {
                let rabbit = jackrabbit(undefined);
                hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'rabbit:' + JSON.stringify(rabbit) ?? '');
            }
            catch (e) {
                expect(e.message).assertEqual('url required for jackrabbit connection');
            }
        });
        it('jackrabbit_null', 0, () => {
            try {
                let rabbit = jackrabbit(null);
                hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'rabbit:' + JSON.stringify(rabbit) ?? '');
            }
            catch (e) {
                expect(e.message).assertEqual('url required for jackrabbit connection');
            }
        });
        it('Jackrabbit_default', 0, () => {
            let exchange: any = rabbit.default();
            hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'exchange:' + JSON.stringify(exchange) ?? '');
            expect(exchange).assertInstanceOf('Object');
        });
        it('Jackrabbit_direct', 0, () => {
            let exchange: any = rabbit.direct('direct_logs_jackrabbit');
            hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'exchange:' + JSON.stringify(exchange) ?? '');
            expect(exchange.name).assertEqual('direct_logs_jackrabbit');
        });
        it('Jackrabbit_direct_empty', 0, () => {
            let exchange: any = rabbit.direct();
            hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'exchange:' + JSON.stringify(exchange) ?? '');
            expect(exchange.name).assertEqual('amq.direct');
        });
        it('Jackrabbit_direct_undefined', 0, () => {
            let exchange: any = rabbit.direct(undefined);
            hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'exchange:' + JSON.stringify(exchange) ?? '');
            expect(exchange.name).assertEqual('amq.direct');
        });
        it('Jackrabbit_direct_null', 0, () => {
            let exchange: any = rabbit.direct(null);
            hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'exchange:' + JSON.stringify(exchange) ?? '');
            expect(exchange.name).assertEqual('amq.direct');
        });
        it('Jackrabbit_fanout', 0, () => {
            let exchange: any = rabbit.fanout('fanout_animals');
            hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'exchange:' + JSON.stringify(exchange) ?? '');
            expect(exchange.name).assertEqual('fanout_animals');
        });
        it('Jackrabbit_fanout_empty', 0, () => {
            let exchange: any = rabbit.fanout();
            hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'exchange:' + JSON.stringify(exchange) ?? '');
            expect(exchange.name).assertEqual('amq.fanout');
        });
        it('Jackrabbit_fanout_undefined', 0, () => {
            let exchange: any = rabbit.fanout(undefined);
            hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'exchange:' + JSON.stringify(exchange) ?? '');
            expect(exchange.name).assertEqual('amq.fanout');
        });
        it('Jackrabbit_fanout_null', 0, () => {
            let exchange: any = rabbit.fanout(null);
            hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'exchange:' + JSON.stringify(exchange) ?? '');
            expect(exchange.name).assertEqual('amq.fanout');
        });
        it('Jackrabbit_topic', 0, () => {
            let exchange: any = rabbit.topic('topic_animals');
            hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'exchange:' + JSON.stringify(exchange) ?? '');
            expect(exchange.name).assertEqual('topic_animals');
        });
        it('Jackrabbit_topic_empty', 0, () => {
            let exchange: any = rabbit.topic();
            hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'exchange:' + JSON.stringify(exchange) ?? '');
            expect(exchange.name).assertEqual('amq.topic');
        });
        it('Jackrabbit_topic_undefined', 0, () => {
            let exchange: any = rabbit.topic(undefined);
            hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'exchange:' + JSON.stringify(exchange) ?? '');
            expect(exchange.name).assertEqual('amq.topic');
        });
        it('Jackrabbit_topic_null', 0, () => {
            let exchange: any = rabbit.topic(null);
            hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'exchange:' + JSON.stringify(exchange) ?? '');
            expect(exchange.name).assertEqual('amq.topic');
        });
        it('Jackrabbit_close', 0, () => {
            let exchange: any = rabbit.close();
            hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'exchange:' + JSON.stringify(exchange) ?? '');
            expect(exchange).assertUndefined();
        });
        it('Exchange_name', 0, () => {
            let exchange: any = rabbit.direct('test_name');
            hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'exchange:' + JSON.stringify(exchange) ?? '');
            expect(exchange.name).assertEqual('test_name');
        });
        it('Exchange_type_fanout', 0, () => {
            let exchange: any = rabbit.fanout('test_type');
            hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'exchange:' + JSON.stringify(exchange) ?? '');
            expect(exchange.type).assertEqual('fanout');
        });
        it('Exchange_type_direct', 0, () => {
            let exchange: any = rabbit.direct('test_type');
            hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'exchange:' + JSON.stringify(exchange) ?? '');
            expect(exchange.type).assertEqual('direct');
        });
        it('Exchange_type_topic', 0, () => {
            let exchange: any = rabbit.topic('test_type');
            hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'exchange:' + JSON.stringify(exchange) ?? '');
            expect(exchange.type).assertEqual('topic');
        });
        it('Exchange_type', 0, () => {
            let exchange: any = rabbit;
            hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'exchange:' + JSON.stringify(exchange) ?? '');
            expect(exchange.type).assertUndefined();
        });
        it('Exchange_queue', 0, () => {
            let exchange: any = rabbit.default();
            let q: any = exchange.queue({
                name: 'jackrabbit_test_default', prefetch: 0
            });
            hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'q:' + JSON.stringify(q) ?? '');
            expect(q.options.name).assertEqual('jackrabbit_test_default');
            expect(q.options.prefetch).assertEqual(0);
        });
        it('Exchange_queue_null', 0, () => {
            let exchange: any = rabbit.default();
            let q: any = exchange.queue({
                name: null, prefetch: 0
            });
            hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'q:' + JSON.stringify(q) ?? '');
            expect(q.options.name).assertNull();
        });
        it('Exchange_queue_undefined', 0, () => {
            let exchange: any = rabbit.default();
            let q: any = exchange.queue({
                name: undefined, prefetch: 0
            });
            hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'q:' + JSON.stringify(q) ?? '');
            expect(q.options.name).assertUndefined();
        });
        it('Exchange_queue_null_options', 0, () => {
            let exchange: any = rabbit.default();
            let q: any = exchange.queue(null);
            hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'q:' + JSON.stringify(q) ?? '');
            expect(q.options.exclusive).assertFalse();
            expect(q.options.durable).assertTrue();
        });
        it('Exchange_publish', 0, () => {
            let exchange: any = rabbit.fanout();
            let pub: any = exchange.publish('this is a log');
            hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'pub:' + JSON.stringify(pub) ?? '');
            expect(pub).assertInstanceOf('Object');
        });
        it('Exchange_publish_eventsCount', 0, () => {
            let exchange: any = rabbit.fanout();
            let pub: any = exchange.publish('this is a log');
            hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'pub:' + JSON.stringify(pub) ?? '');
            expect(pub._eventsCount).assertEqual(1);
        });
        it('Exchange_rpcServer', 0, () => {
            let exchange: any = rabbit.default();
            const rpc: any = exchange.queue({
                name: 'rpc_queue_jackrabbit_timeout', prefetch: 1, durable: false, autoDelete: true
            });
            rpc.on('ready', () => {
                let rpc: any = exchange.rpcServer('rpc_queue_jackrabbit_timeout', (data: any, reply: any) => {
                    console.log('got request for n:' + data.n);
                });
                hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'rpc:' + JSON.stringify(rpc) ?? '');
                expect(rpc).assertUndefined();
            });
        });
        it('Exchange_rpcClient', 0, () => {
            let exchange: any = rabbit.default();
            const rpc: any = exchange.queue({
                name: 'rpc_queue_jackrabbit_timeout', prefetch: 1, durable: false, autoDelete: true
            });
            rpc.on('ready', () => {
                let rpc: any = exchange.rpcClient('rpc_queue_jackrabbit_timeout', {
                    n: 30
                }, null, (result: any) => {
                    if (result && result instanceof Error) {
                        console.error(result.toString());
                    }
                    else {
                        console.info(result);
                    }
                });
                hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'rpc:' + JSON.stringify(rpc) ?? '');
                expect(rpc).assertUndefined();
            });
        });
        it('Queue_name', 0, () => {
            let exchange: any = rabbit.default();
            let hello: any = exchange.queue({
                name: 'hello_jackrabbit', prefetch: 0
            });
            hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'name:' + JSON.stringify(hello.name) ?? '');
            expect(hello.name).assertEqual('hello_jackrabbit');
        });
        it('Queue_consume', 0, () => {
            let exchange: any = rabbit.default();
            let hello: any = exchange.queue({
                name: 'hello_jackrabbit', prefetch: 0
            });
            let onMessage = (data: any) => {
                console.log('received:%s', data);
            };
            let con: any = hello.consume(onMessage, {
                noAck: true
            });
            hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'con:' + JSON.stringify(con) ?? '');
            expect(con).assertUndefined();
        });
        it('Queue_cancel', 0, () => {
            let exchange: any = rabbit.default();
            let hello: any = exchange.queue({
                name: 'hello_jackrabbit', prefetch: 0
            });
            let cancel: any = hello.cancel((done: any) => {
            });
            hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'cancel:' + JSON.stringify(cancel) ?? '');
            expect(cancel).assertUndefined();
        });
        it('Queue_purge', 0, () => {
            let exchange: any = rabbit.default();
            let hello: any = exchange.queue({
                name: 'hello_jackrabbit', prefetch: 0
            });
            let purge: any = hello.purge((done: any) => {
            });
            hilog.info(0x0000, 'client_jackrabbit_test', '%{public}s', 'purge:' + JSON.stringify(purge) ?? '');
            expect(purge).assertUndefined();
        });
    });
}
