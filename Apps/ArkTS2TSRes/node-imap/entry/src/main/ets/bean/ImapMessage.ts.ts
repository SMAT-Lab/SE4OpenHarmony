/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { EventEmitter, ReadableStream, Buffer } from '@ohos/node-imap';
type BufferEncoding = 'ascii' | 'utf8' | 'utf-8' | 'utf16le' | 'ucs2' | 'ucs-2' | 'base64' | 'base64url' | 'latin1' | 'binary' | 'hex';
export declare class MyBuffer extends Buffer {
    toString(encoding?: BufferEncoding, start?: number, end?: number): string;
}
export declare class MyStream extends ReadableStream {
    on(eventName: string, callback: (stream: MyBuffer, info: object) => void);
    on(event: 'data', callback: (stream: MyBuffer) => void);
    on(eventName: 'body', callback: (stream: MyBuffer) => void);
    once(eventName: 'end', callback: (stream: MyBuffer) => void);
    once(eventName: string, callback: (stream: MyBuffer, info: object) => void);
}
export declare interface ImapMessageAttributes {
    /** A 32-bit ID that uniquely identifies this message within its mailbox. */
    uid: number;
    /** A list of flags currently set on this message. */
    flags: string[];
    /** The internal server date for the message. */
    date: Date;
    /** The message's body structure (only set if requested with fetch()). */
    struct?: any[] | undefined;
    /** The RFC822 message size (only set if requested with fetch()). */
    size?: number | undefined;
}
export declare interface ImapMessageBodyInfo {
    /** The specifier for this body (e.g. 'TEXT', 'HEADER.FIELDS (TO FROM SUBJECT)', etc). */
    which: string;
    /** The size of this body in bytes. */
    size: number;
}
export declare class ImapMessage extends EventEmitter {
    on(event: string, listener: Function): this;
    on(event: "body", listener: (stream: MyStream, info: ImapMessageBodyInfo) => void): this;
    on(event: "attributes", listener: (attrs: ImapMessageAttributes) => void): this;
    once(event: "end", listener: () => void): this;
    once(event: "attributes", listener: (attrs: ImapMessageAttributes) => void): this;
}
export declare class ImapFetch extends EventEmitter {
    on(event: string, listener: Function): this;
    on(event: "message", listener: (message: ImapMessage, seqno: number) => void): this;
    on(event: "error", listener: (error: Error) => void): this;
    once(event: string, listener: Function): this;
    once(event: "error", listener: (error: Error) => void): this;
}
