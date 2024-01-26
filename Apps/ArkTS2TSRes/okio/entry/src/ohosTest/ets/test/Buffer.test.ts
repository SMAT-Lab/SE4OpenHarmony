let __generate__Id: number = 0;
function generateId(): string {
    return "Buffer.test_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@ohos/hypium';
import { Okio } from '@ohos/okio';
import buffer from '@ohos.buffer';
interface OkioBuffer {
    writeUtf8: (str: string) => void;
    readUtf8: () => string;
    writeInt: (num: number) => void;
    readInt: () => number;
    writeString: (str: string) => void;
    readString: () => string;
    writeShort: (num: number) => void;
    readShort: () => number;
    writeIntLe: (num: number) => void;
    readIntLe: () => number;
    writeShortLe: (num: number) => void;
    readShortLe: () => number;
    writeByte: (num: number) => void;
    readByte: () => number;
    writeUtf8CodePoint: (num: number) => void;
    readUtf8CodePoint: () => number;
    readUtf8ByteCount: (size: number) => string;
    size: number;
}
let okioBuffer: OkioBuffer;
export default function bufferTest() {
    describe('bufferTest', () => {
        beforeAll(() => {
        });
        beforeEach(() => {
            okioBuffer = new Okio.Buffer();
        });
        afterEach(() => {
        });
        afterAll(() => {
        });
        it('writeUtf8_readUtf8', 0, () => {
            okioBuffer.writeUtf8('这是一个测试字符串');
            expect(okioBuffer.readUtf8()).assertEqual('这是一个测试字符串');
        });
        it('writeInt_readInt', 0, () => {
            okioBuffer.writeInt(99999);
            expect(okioBuffer.readInt()).assertEqual(99999);
        });
        it('writeString_readString', 0, () => {
            okioBuffer.writeString("this is a test string");
            expect(okioBuffer.readString()).assertEqual("this is a test string");
        });
        it('writeShort_readShort', 0, () => {
            okioBuffer.writeShort(1234);
            expect(okioBuffer.readShort()).assertEqual(1234);
        });
        it('writeIntLe_readIntLe', 0, () => {
            okioBuffer.writeIntLe(96969696);
            expect(okioBuffer.readIntLe()).assertEqual(96969696);
        });
        it('writeShortLe_readShortLe', 0, () => {
            okioBuffer.writeShortLe(1234);
            expect(okioBuffer.readShortLe()).assertEqual(1234);
        });
        it('writeByte_readByte', 0, () => {
            okioBuffer.writeByte(66);
            expect(okioBuffer.readByte()).assertEqual(66);
        });
        it('writeUtf8CodePoint_readUtf8CodePoint', 0, () => {
            okioBuffer.writeUtf8CodePoint(25);
            expect(okioBuffer.readUtf8CodePoint()).assertEqual(25);
        });
        it('writeUtf8_readUtf8ByteCount', 0, () => {
            okioBuffer.writeUtf8("你好呀 在哪里");
            let str = buffer.from("你好呀 在哪里").toString("utf8");
            expect(okioBuffer.readUtf8ByteCount(okioBuffer.size)).assertEqual(str);
        });
    });
}
