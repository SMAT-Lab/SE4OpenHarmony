
// Type definitions for jackrabbit 4.3
// Project: https://github.com/hunterloftis/jackrabbit
// Definitions by: Elvis Adomnica <https://github.com/elvisvoer>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.2


import { Connection, Options, Message } from '@ohos/amqplib/src/main/ets/types/index.js';
import  * as events from '@ohos/node-polyfill';

declare namespace jackrabbit {

    function jackrabbit(url: string): JackRabbit;

    interface JackRabbit extends events.EventEmitter {
        default(): Exchange;
        direct(name?: string): Exchange;
        fanout(name?: string): Exchange;
        topic(name?: string): Exchange;
        close(callback?: (e: Error) => any): void;
        getInternals: () => {
            amqp: any;
            connection: Connection;
        };
    }

    enum exchangeType {
        direct = 'direct',
        fanout = 'fanout',
        topic = 'topic',
    }


    interface Exchange extends events.EventEmitter {
        name: string;
        type: exchangeType;
        options: Options.AssertExchange;
        queue(options: QueueOptions): Queue;
        connect(con: Connection): Exchange;
        publish(message: any, options?: PublishOptions): Exchange;
        rpcClient(key: string, message: any, options: PublishOptions | any, callback?: any): void;
        rpcServer(key: string, handler: any): void;
    }

    type PublishOptions = Options.Publish & {
        key: string;
        reply?: AckCallback | undefined;
    };

    type QueueOptions = Options.AssertQueue & {
        name?: string | undefined;
        key?: string | undefined;
        keys?: ReadonlyArray<string> | undefined;
        prefetch?: number | undefined;
    };

    type AckCallback = (data?: any) => void;

    // @ts-ignore
    interface Queue extends EventEmitter {
        name: string;
        options: QueueOptions;
        connect(con: Connection): void;
        consume: (
            callback: (data: any, ack: AckCallback, nack: () => void, msg: Message) => void,
            options?: Options.Consume
        ) => void;
        cancel(done: any): void;
        purge(done: any): void;
    }
}

export default jackrabbit.jackrabbit;
