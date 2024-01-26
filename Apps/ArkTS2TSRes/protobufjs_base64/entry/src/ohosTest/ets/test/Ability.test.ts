let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
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
import { describe, expect, it } from '@ohos/hypium';
import { length, encode, decode, test } from '@protobufjs/base64';
import util from '@ohos.util';
export default function abilityTest() {
    describe('ActsAbilityTest', () => {
        it('length', 0, () => {
            let str = "abcdefgh";
            let decodeStr = "YWJjZGVmZ2g=";
            expect(length(decodeStr)).assertEqual(getByteLength(str));
        });
        it('lengthEmpty', 0, () => {
            let str = "";
            let decodeStr = "";
            expect(length(decodeStr)).assertEqual(getByteLength(str));
        });
        it('lengthChines', 0, () => {
            let str = "你好 hello";
            let decodeStr = "5L2g5aW9IGhlbGxv";
            expect(length(decodeStr)).assertEqual(getByteLength(str));
        });
        it('lengthNum', 0, () => {
            let str = "123879";
            let decodeStr = "MTIzODc5";
            expect(length(decodeStr)).assertEqual(getByteLength(str));
        });
        it('encode', 0, () => {
            let str = "harmony os";
            const textEncoder = new util.TextEncoder();
            let uint8Array = textEncoder.encodeInto(str);
            let result = encode(uint8Array, 0, uint8Array.length);
            expect(result).assertEqual("aGFybW9ueSBvcw==");
        });
        it('encodeChinese', 0, () => {
            let str = "你好中国";
            const textEncoder = new util.TextEncoder();
            let uint8Array = textEncoder.encodeInto(str);
            let result = encode(uint8Array, 0, uint8Array.length);
            expect(result).assertEqual("5L2g5aW95Lit5Zu9");
        });
        it('encodeNum', 0, () => {
            let str = "908790895";
            const textEncoder = new util.TextEncoder();
            let uint8Array = textEncoder.encodeInto(str);
            let result = encode(uint8Array, 0, uint8Array.length);
            expect(result).assertEqual("OTA4NzkwODk1");
        });
        it('encodeMixed', 0, () => {
            let str = "你好, 123 chinese.";
            const textEncoder = new util.TextEncoder();
            let uint8Array = textEncoder.encodeInto(str);
            let result = encode(uint8Array, 0, uint8Array.length);
            expect(result).assertEqual("5L2g5aW9LCAxMjMgY2hpbmVzZS4=");
        });
        it('decode', 0, () => {
            let str = "harmonys os";
            const textEncoder = new util.TextEncoder();
            let uint8Array = textEncoder.encodeInto(str);
            let encodeStr = encode(uint8Array, 0, uint8Array.length);
            let decodeUint8Array = new Uint8Array(length(encodeStr));
            let result = decode(encodeStr, decodeUint8Array, 0);
            expect(decodeUint8Array).assertDeepEquals(uint8Array);
        });
        it('decodeMixed', 0, () => {
            let str = "你好, 123 chinese.";
            const textEncoder = new util.TextEncoder();
            let uint8Array = textEncoder.encodeInto(str);
            let encodeStr = encode(uint8Array, 0, uint8Array.length);
            let decodeUint8Array = new Uint8Array(length(encodeStr));
            let result = decode(encodeStr, decodeUint8Array, 0);
            expect(decodeUint8Array).assertDeepEquals(uint8Array);
        });
        it('decodeNum', 0, () => {
            let str = "877654657";
            const textEncoder = new util.TextEncoder();
            let uint8Array = textEncoder.encodeInto(str);
            let encodeStr = encode(uint8Array, 0, uint8Array.length);
            let decodeUint8Array = new Uint8Array(length(encodeStr));
            let result = decode(encodeStr, decodeUint8Array, 0);
            expect(decodeUint8Array).assertDeepEquals(uint8Array);
        });
        it('decodeChinese', 0, () => {
            let str = "你好中国";
            const textEncoder = new util.TextEncoder();
            let uint8Array = textEncoder.encodeInto(str);
            let encodeStr = encode(uint8Array, 0, uint8Array.length);
            let decodeUint8Array = new Uint8Array(length(encodeStr));
            let result = decode(encodeStr, decodeUint8Array, 0);
            expect(decodeUint8Array).assertDeepEquals(uint8Array);
        });
        it('testTrue', 0, () => {
            let enc = "YWJjZGVmZw==";
            expect(test(enc)).assertTrue();
        });
        it('testFalse', 0, () => {
            let enc = "abcdhgy";
            expect(test(enc)).assertFalse();
        });
        it('testNumber', 0, () => {
            let enc = "12345";
            expect(test(enc)).assertFalse();
        });
        it('testUndefined', 0, () => {
            let enc: any = undefined;
            expect(test(enc)).assertFalse();
        });
    });
}
function getByteLength(str: string) {
    let byteLength = 0;
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        if (charCode < 0x007F) {
            byteLength += 1;
        }
        else if (charCode < 0x07FF) {
            byteLength += 2;
        }
        else {
            byteLength += 3;
        }
    }
    return byteLength;
}
