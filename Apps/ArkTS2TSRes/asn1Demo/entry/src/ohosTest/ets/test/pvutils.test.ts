let __generate__Id: number = 0;
function generateId(): string {
    return "pvutils.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { LocalBaseBlock, arrayBufferToString, bufferToHexCodes, checkBufferParams, fromBase64, getParametersValue, getUTCDate, isEqualBuffer, nearestPowerOf2, padNumber, stringToArrayBuffer, toBase64, utilConcatBuf, utilConcatView, utilFromBase, utilToBase } from 'pvutils';
export default function PvUtilsTest() {
    describe('PvUtilsTest', () => {
        it("getUTCDate", 0, () => {
            const date = new Date();
            expect(getUTCDate(date)).assertDeepEquals(new Date(date.getTime() + (date.getTimezoneOffset() * 60000)));
        });
        it("getParametersValue", 0, () => {
            expect(getParametersValue(1 as any, "name", 2)).assertEqual(2);
            expect(getParametersValue({ name: 33 }, "name", 2)).assertEqual(33);
            expect(getParametersValue({ name: 33 }, "fake", 2)).assertEqual(2);
        });
        it("bufferToHexCodes", 0, () => {
            const data = new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A]);
            let ab: ArrayBuffer = data.buffer.slice(0, data.buffer.byteLength);
            expect(bufferToHexCodes(ab)).assertEqual("0102030405060708090A");
            expect(bufferToHexCodes(ab, 1)).assertEqual("02030405060708090A");
            expect(bufferToHexCodes(ab, 1, 3)).assertEqual("020304");
            expect(bufferToHexCodes(ab, 1, 3, true)).assertEqual("02 03 04");
        });
        it("checkBufferParams", 0, () => {
            const baseBlock = {} as LocalBaseBlock;
            let result = checkBufferParams(baseBlock, 1 as any, 1, 1);
            expect(result).assertFalse();
        });
        it("utilFromBase", 0, () => {
            expect(utilFromBase(new Uint8Array([0x01]), 7)).assertEqual(1);
        });
        it("utilToBase", 0, () => {
            expect(bufferToHexCodes(utilToBase(1, 7))).assertEqual("01");
            expect(bufferToHexCodes(utilToBase(129, 7))).assertEqual("0101");
            expect(bufferToHexCodes(utilToBase(16513, 7))).assertEqual("010101");
            expect(bufferToHexCodes(utilToBase(16513, 7, 4))).assertEqual("00010101");
            expect(bufferToHexCodes(utilToBase(16513, 7, 0))).assertEqual("");
        });
        it("utilConcatBuf", 0, () => {
            const data = new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A]);
            let ab: ArrayBuffer = data.buffer.slice(0, data.buffer.byteLength);
            expect(bufferToHexCodes(utilConcatBuf(ab))).assertEqual("0102030405060708090A");
            expect(bufferToHexCodes(utilConcatBuf(ab, ab))).assertEqual("0102030405060708090A0102030405060708090A");
            expect(bufferToHexCodes(utilConcatBuf(ab, ab, ab))).assertEqual("0102030405060708090A0102030405060708090A0102030405060708090A");
        });
        it("utilConcatView", 0, () => {
            const data = new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A]);
            expect(bufferToHexCodes(utilConcatView(data).buffer.slice(0, utilConcatView(data).buffer.byteLength))).assertEqual("0102030405060708090A");
            expect(bufferToHexCodes(utilConcatView(data, data).buffer.slice(0, utilConcatView(data, data).buffer.byteLength))).assertEqual("0102030405060708090A0102030405060708090A");
            expect(bufferToHexCodes(utilConcatView(data, data, data).buffer.slice(0, utilConcatView(data, data, data).buffer.byteLength))).assertEqual("0102030405060708090A0102030405060708090A0102030405060708090A");
        });
        it("isEqualBuffer", 0, () => {
            const data = new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A]);
            let ab: ArrayBuffer = data.buffer.slice(0, data.buffer.byteLength);
            expect(isEqualBuffer(ab, ab)).assertTrue();
            expect(isEqualBuffer(ab, new Uint8Array().buffer.slice(0, new Uint8Array().buffer.byteLength))).assertFalse();
        });
        it("padNumber", 0, () => {
            expect(padNumber(1, -1)).assertEqual("");
            expect(padNumber(1, 1)).assertEqual("1");
            expect(padNumber(1, 2)).assertEqual("01");
        });
        it("toBase64", 0, () => {
            expect(toBase64("\x01\x02\x03\x04\x05\x06\x07\x08\xFF\xFF")).assertEqual("AQIDBAUGBwj//w==");
            expect(toBase64("\x01\x02\x03\x04\x05\x06\x07\x08\xFF\xFF", true)).assertEqual("AQIDBAUGBwj__w==");
            expect(toBase64("\x01\x02\x03\x04\x05\x06\xFF\xFF\xFF\xFF", true, true)).assertEqual("AQIDBAUG_____w");
            expect(toBase64("\x00\x00\x01\x02\x03\x04\x05\x06\xFF\xFF\xFF\xFF\xFF", true, true, true)).assertEqual("AQIDBAUG______8");
        });
        it("fromBase64", 0, () => {
            expect(fromBase64("AQIDBAUGBwj//w==")).assertEqual("\x01\x02\x03\x04\x05\x06\x07\x08\xFF\xFF");
            expect(fromBase64("AQIDBAUGBwj__w==", true)).assertEqual("\x01\x02\x03\x04\x05\x06\x07\x08\xFF\xFF");
            expect(fromBase64("AQIDBAUGBwj__wAA", true, true)).assertEqual("\x01\x02\x03\x04\x05\x06\x07\x08\xFF\xFF");
            expect(fromBase64("AQIDBAUGBwj__w==", true, true)).assertEqual("\x01\x02\x03\x04\x05\x06\x07\x08\xFF\xFF");
            expect(fromBase64("AAAAAA====", true, true)).assertEqual("");
        });
        it("arrayBufferToString", 0, () => {
            const data = new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A]);
            expect(arrayBufferToString(data.buffer.slice(0, data.buffer.byteLength))).assertEqual("\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0A");
        });
        it("stringToArrayBuffer", 0, () => {
            const data = new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A]);
            expect(isEqualBuffer(stringToArrayBuffer("\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0A"), data.buffer.slice(0, data.buffer.byteLength))).assertTrue();
        });
        it("nearestPowerOf2", 0, () => {
            expect(nearestPowerOf2(7)).assertEqual(3);
        });
    });
}
