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
"use strict";
import Buffer from '@ohos.buffer';
import {MsgExt} from "./msg-ext";
import {Int64BE} from "./int64-buffer";
import Timestamp from "./timestamp";

const BIT34 = 0x400000000;
const BIT32 = 0x100000000;
const EXTTYPE = -1;

/**
 * Timestamp extension type is assigned to extension type -1.
 */

export abstract class MsgTimestamp extends MsgExt {
    constructor(buffer) {
        super(buffer);
    }
    abstract getTime(): number;

    abstract getNano(): number;

    abstract toTimestamp(): Timestamp;

    toJSON(): string {
        return this.toTimestamp().toJSON();
    }

    toString(fmt?: string): string {
        return this.toTimestamp().toString(fmt);
    }

    toDate(): Date {
        return this.toTimestamp().toDate();
    }

    static from(timeT: number | Int64BE, nano?: number): MsgTimestamp {
        nano = 0 | nano as number;

        const time = +timeT;
        if (0 <= time && time < BIT32 && !nano) {
            return MsgTimestamp32.from(time);
        } else if (0 <= time && time < BIT34) {
            return MsgTimestamp64.from(time, nano);
        } else {
            return MsgTimestamp96.from(timeT, nano);
        }
    }

    static parse(buffer): MsgTimestamp {
        const length = buffer.length;

        switch (length) {
            case 4:
                return  new MsgTimestamp32(buffer);
            case 8:
                return new MsgTimestamp64(buffer);
            case 12:
                return new MsgTimestamp96(buffer);
            default:
                throw new TypeError("Invalid payload length: " + length);
        }
    }
}

// ext type -1

MsgTimestamp.prototype['type'] = EXTTYPE;

/**
 * Timestamp 32 format can represent a timestamp in [1970-01-01 00:00:00 UTC, 2106-02-07 06:28:16 UTC) range. Nanoseconds part is 0.
 */

export class MsgTimestamp32 extends MsgTimestamp {
    constructor(buffer) {
        super(buffer);
    }

    static from(time: number) {
        const payload = Buffer.alloc(4);

        // seconds in 32-bit unsigned int
        payload.writeUInt32BE(+time, 0);

        return new MsgTimestamp32(payload);
    }

    getTime() {
        // seconds in 32-bit unsigned int
        return this['buffer'].readUInt32BE(0);
    }

    getNano() {
        return 0;
    }

    toTimestamp() {
        const time = this.getTime();
        return Timestamp.fromTimeT(time);
    }
}

/**
 * Timestamp 64 format can represent a timestamp in [1970-01-01 00:00:00.000000000 UTC, 2514-05-30 01:53:04.000000000 UTC) range.
 */

export class MsgTimestamp64 extends MsgTimestamp {
    constructor(buffer) {
        super(buffer);
    }
    static from(time: number, nano?: number) {
        time = +time;
        nano = 0 | nano as number;

        const payload = Buffer.alloc(8);

        // nanoseconds in 30-bit unsigned int
        const high = (nano * 4) + ((time / BIT32) & 3);
        payload.writeUInt32BE(high, 0);

        // seconds in 34-bit unsigned int
        const low = time % BIT32;
        payload.writeUInt32BE(low, 4);

        return new MsgTimestamp64(payload);
    }

    getTime() {
        const high = this['buffer'][3] & 3;
        const low = this['buffer'].readUInt32BE(4);

        // seconds in 34-bit unsigned int
        return high * BIT32 + low;
    }

    getNano() {
        const high = this['buffer'].readUInt32BE(0);

        // nanoseconds in 30-bit unsigned int
        return Math.floor(high / 4);
    }

    toTimestamp() {
        const time = this.getTime();
        const nano = this.getNano();
        return Timestamp.fromTimeT(time).addNano(nano);
    }
}

/**
 * Timestamp 96 format can represent a timestamp in [-584554047284-02-23 16:59:44 UTC, 584554051223-11-09 07:00:16.000000000 UTC) range.
 */

export class MsgTimestamp96 extends MsgTimestamp {
    constructor(buffer) {
        super(buffer);
    }
    static from(time, nano?: number) {
        const payload = Buffer.alloc(12);
        nano = 0 | nano as number;

        // nanoseconds in 32-bit unsigned int
        payload.writeUInt32BE(nano, 0);

        // seconds in 64-bit signed int
        if (Int64BE.isInt64BE(time)) {
            time.toBuffer().copy(payload, 4);
        } else {
            new Int64BE(payload, 4, +time);
        }

        return new MsgTimestamp96(payload);
    }

    getTime() {
        // seconds in 64-bit signed int
        return new Int64BE(this['buffer'], 4).toNumber();
    }

    getNano() {
        // nanoseconds in 32-bit unsigned int
        return this['buffer'].readUInt32BE(0);
    }

    toTimestamp() {
        const nano = this.getNano();

        // seconds in 64-bit signed int
        return Timestamp.fromInt64BE(this['buffer'], 4).addNano(nano);
    }
}
