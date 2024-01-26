let __generate__Id: number = 0;
function generateId(): string {
    return "BufferToolsTest.test_" + ++__generate__Id;
}
/**
 *  MIT License
 *
 *  Copyright (c) 2023 Huawei Device Co., Ltd.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */
import { describe, it, expect } from '@ohos/hypium';
import { BufferTools } from '@ohos/mp3agic/src/main/ets/components/mp3agic/BufferTools';
export default function BufferToolsTest() {
    describe('BufferToolsTest', () => {
        it('unpackSynchsafeInteger01', 0, () => {
            console.info('unpackSynchsafeInteger  begin');
            let result = 63652745;
            let dataLength = BufferTools.unpackSynchsafeInteger(30, 45, 7, 9);
            expect(dataLength).assertEqual(result);
        });
        it('unpackSynchsafeInteger02', 0, () => {
            console.info('unpackSynchsafeInteger  begin');
            let result = 20499347;
            let dataLength = BufferTools.unpackSynchsafeInteger(9, 99, 23, 19);
            expect(dataLength).assertEqual(result);
        });
        it('unpackSynchsafeInteger03', 0, () => {
            console.info('unpackSynchsafeInteger  begin');
            let result = 158028189;
            let dataLength = BufferTools.unpackSynchsafeInteger(75, 45, 35, 29);
            expect(dataLength).assertEqual(result);
        });
        it('unpackSynchsafeInteger04', 0, () => {
            console.info('unpackSynchsafeInteger  begin');
            let result = 28000513;
            let dataLength = BufferTools.unpackSynchsafeInteger(13, 45, 2, 1);
            expect(dataLength).assertEqual(result);
        });
        it('unpackInteger01', 0, () => {
            console.info('unpackInteger  begin');
            let result = 506267401;
            let value = BufferTools.unpackInteger(30, 45, 7, 9);
            expect(value).assertEqual(result);
        });
        it('unpackInteger02', 0, () => {
            console.info('unpackInteger  begin');
            let result = 131073;
            let value = BufferTools.unpackInteger(0, 2, 0, 1);
            expect(value).assertEqual(result);
        });
        it('unpackInteger03', 0, () => {
            console.info('unpackInteger  begin');
            let result = 20449112;
            let value = BufferTools.unpackInteger(1, 56, 7, 88);
            expect(value).assertEqual(result);
        });
        it('unpackInteger04', 0, () => {
            console.info('unpackInteger  begin');
            let result = -368936186;
            let value = BufferTools.unpackInteger(234, 2, 123, 6);
            expect(value).assertEqual(result);
        });
        it('packInteger01', 0, () => {
            console.info('packInteger  begin');
            let result = 4;
            let value = BufferTools.packInteger(30);
            expect(value.length).assertEqual(result);
        });
        it('packInteger02', 0, () => {
            console.info('packInteger  begin');
            let result = 4;
            let value = BufferTools.packInteger(0);
            expect(value.length).assertEqual(result);
        });
        it('packInteger03', 0, () => {
            console.info('packInteger  begin');
            let value = BufferTools.packInteger(7);
            expect(JSON.stringify(value)).assertEqual('[0,0,0,7]');
        });
        it('packInteger04', 0, () => {
            console.info('packInteger  begin');
            let value = BufferTools.packInteger(857);
            expect(JSON.stringify(value)).assertEqual('[0,0,3,89]');
        });
        it('shiftByte01', 0, () => {
            console.info('shiftByte  begin');
            let result = 7;
            let value = BufferTools.shiftByte(30, 2);
            expect(value).assertEqual(result);
        });
        it('shiftByte02', 0, () => {
            console.info('shiftByte  begin');
            let result = 0;
            let value = BufferTools.shiftByte(1, 2);
            expect(value).assertEqual(result);
        });
        it('shiftByte03', 0, () => {
            console.info('shiftByte  begin');
            let value = BufferTools.shiftByte(321, 90);
            expect(value).assertEqual(0);
        });
        it('shiftByte04', 0, () => {
            console.info('shiftByte  begin');
            let value = BufferTools.shiftByte(131, 132);
            expect(value).assertEqual(8);
        });
        it('checkBit01', 0, () => {
            console.info('checkBit  begin');
            let value = BufferTools.checkBit(30, 2);
            expect(value).assertTrue();
        });
        it('checkBit02', 0, () => {
            console.info('checkBit  begin');
            let value = BufferTools.checkBit(90, 12);
            expect(value).assertFalse();
        });
        it('checkBit03', 0, () => {
            console.info('checkBit  begin');
            let value = BufferTools.checkBit(13, 32);
            expect(value).assertTrue();
        });
        it('checkBit04', 0, () => {
            console.info('checkBit  begin');
            let value = BufferTools.checkBit(null, 7);
            expect(value).assertFalse();
        });
        it('copyBuffer01', 0, () => {
            console.info('copyBuffer  begin');
            let bytes: Int8Array = new Int8Array([23, 34, 56, 67, 89, 0, 13]);
            let value = BufferTools.copyBuffer(bytes, 3, 2);
            let item = value.pop();
            expect(bytes[4]).assertEqual(item);
        });
        it('copyBuffer02', 0, () => {
            console.info('copyBuffer  begin');
            let bytes: Int8Array = new Int8Array([3, 23, 5, 452, 2, 13, 99]);
            let value = BufferTools.copyBuffer(bytes, 1, 54);
            expect(value[1]).assertEqual(5);
        });
        it('copyBuffer03', 0, () => {
            console.info('copyBuffer  begin');
            let bytes: Int8Array = new Int8Array([4, 1, 4, 67, 17, 30, 98]);
            let value = BufferTools.copyBuffer(bytes, 2, 1);
            let item = value.pop();
            expect(item).assertEqual(4);
        });
        it('copyBuffer04', 0, () => {
            console.info('copyBuffer  begin');
            let bytes: Int8Array = new Int8Array([57, 5, 234, 6, 25, 57, 0]);
            let value = BufferTools.copyBuffer(bytes, 23, 9);
            expect(value[2]).assertUndefined();
        });
        it('byteBufferToStringIgnoringEncodingIssues01', 0, () => {
            console.info('byteBufferToStringIgnoringEncodingIssues  begin');
            let str = 'CY';
            let bytes: Int8Array = new Int8Array([23, 34, 56, 67, 89, 0, 13]);
            let result = BufferTools.byteBufferToStringIgnoringEncodingIssues(bytes, 3, 2);
            expect(str).assertEqual(result);
        });
        it('byteBufferToStringIgnoringEncodingIssues02', 0, () => {
            console.info('byteBufferToStringIgnoringEncodingIssues  begin');
            let bytes: Int8Array = new Int8Array([18, 3, 88, 109, 23, 20, 2]);
            let result = BufferTools.byteBufferToStringIgnoringEncodingIssues(bytes, 1, 3);
            expect(result).assertEqual('Xm');
        });
        it('byteBufferToStringIgnoringEncodingIssues03', 0, () => {
            console.info('byteBufferToStringIgnoringEncodingIssues  begin');
            let bytes: Int8Array = new Int8Array([1, 23, 4, 9, 65, 80, 58]);
            let result = BufferTools.byteBufferToStringIgnoringEncodingIssues(bytes, 1, 1);
            expect(result).assertDeepEquals("\u0017");
        });
        it('byteBufferToStringIgnoringEncodingIssues04', 0, () => {
            console.info('byteBufferToStringIgnoringEncodingIssues  begin');
            let bytes: Int8Array = new Int8Array([23, 113, 6, 43, 450, 220, 12]);
            let result = BufferTools.byteBufferToStringIgnoringEncodingIssues(bytes, 2, 2);
            expect(result).assertDeepEquals("\u0006+");
        });
        it('byteBufferToString01', 0, () => {
            console.info('byteBufferToString  begin');
            let str = 'CY';
            let bytes: number[] = [23, 34, 56, 67, 89, 0, 13];
            let result = BufferTools.byteBufferToString(bytes, 3, 2);
            expect(str).assertEqual(result);
        });
        it('byteBufferToString02', 0, () => {
            console.info('byteBufferToString  begin');
            let bytes: number[] = [1, 34, 1, 21, 33, 0, 2];
            let result = BufferTools.byteBufferToString(bytes, 1, 1);
            expect(result).assertEqual('"');
        });
        it('byteBufferToString03', 0, () => {
            console.info('byteBufferToString  begin');
            let bytes: number[] = [1, 2, 5, 3, 3, 0, 3];
            let result = BufferTools.byteBufferToString(bytes, 1, 2);
            expect(result).assertDeepEquals("\u0002\u0005");
        });
        it('byteBufferToString04', 0, () => {
            console.info('byteBufferToString  begin');
            let bytes: number[] = [11, 1, 17, 45, 7, 20, 32];
            let result = BufferTools.byteBufferToString(bytes, 2, 1);
            expect(result).assertDeepEquals("\u0011");
        });
        it('indexOfTerminatorForEncoding01', 0, () => {
            console.info('indexOfTerminatorForEncoding  begin');
            let num = -1;
            let bytes: number[] = [23, 34, 56, 67, 89, 0, 13];
            let result = BufferTools.indexOfTerminatorForEncoding(bytes, 3, 2);
            expect(num).assertEqual(result);
        });
        it('indexOfTerminatorForEncoding02', 0, () => {
            console.info('indexOfTerminatorForEncoding  begin');
            let bytes: number[] = [1, 34, 22, 21, 44];
            let result = BufferTools.indexOfTerminatorForEncoding(bytes, 1, 2);
            expect(result).assertEqual(-1);
        });
        it('indexOfTerminatorForEncoding03', 0, () => {
            console.info('indexOfTerminatorForEncoding  begin');
            let bytes: number[] = [9, 1, 56, 3, 89, 67, 5];
            let result = BufferTools.indexOfTerminatorForEncoding(bytes, 1, 2);
            expect(result).assertEqual(-1);
        });
        it('indexOfTerminatorForEncoding04', 0, () => {
            console.info('indexOfTerminatorForEncoding  begin');
            let bytes: number[] = [13, 5, 6, 21, 1];
            let result = BufferTools.indexOfTerminatorForEncoding(bytes, 3, 2);
            expect(result).assertEqual(-1);
        });
        it('indexOfTerminator01', 0, () => {
            console.info('indexOfTerminator  begin');
            let num = -1;
            let bytes: number[] = [23, 34, 56, 67, 89, 0, 13];
            let result = BufferTools.indexOfTerminator(bytes, 3, 2);
            expect(num).assertEqual(result);
        });
        it('indexOfTerminator02', 0, () => {
            console.info('indexOfTerminator  begin');
            let bytes: number[] = [112, 3, 2, 21, 23];
            let result = BufferTools.indexOfTerminator(bytes, 1, 3);
            expect(result).assertEqual(-1);
        });
        it('indexOfTerminator03', 0, () => {
            console.info('indexOfTerminator  begin');
            let bytes: number[] = [0, 4, 5, 67, 12, 90, 16];
            let result = BufferTools.indexOfTerminator(bytes, 1, 2);
            expect(result).assertEqual(-1);
        });
        it('indexOfTerminator04', 0, () => {
            console.info('indexOfTerminator  begin');
            let bytes: number[] = [7, 39, 42, 4, 74];
            let result = BufferTools.indexOfTerminator(bytes, 2, 0);
            expect(result).assertEqual(-1);
        });
        it('stringToBytes01', 0, () => {
            console.info('stringToBytes  begin');
            let num1 = 97;
            let num2 = 98;
            let result = BufferTools.stringToBytes('abc');
            expect(num1).assertEqual(result[0]);
            expect(num2).assertEqual(result[1]);
        });
        it('stringToBytes02', 0, () => {
            console.info('stringToBytes  begin');
            let result = BufferTools.stringToBytes('string');
            expect(result[0]).assertEqual(115);
            expect(result[1]).assertEqual(116);
        });
        it('stringToBytes03', 0, () => {
            console.info('stringToBytes  begin');
            let num3 = 99;
            let result = BufferTools.stringToBytes('abc');
            expect(num3).assertEqual(result[2]);
        });
        it('stringToBytes04', 0, () => {
            console.info('stringToBytes  begin');
            let result = BufferTools.stringToBytes('string');
            expect(result[2]).assertEqual(114);
            expect(result[3]).assertEqual(105);
            expect(result[4]).assertEqual(110);
            expect(result[5]).assertEqual(103);
        });
        it('mergeArrayBuffer01', 0, () => {
            console.info('mergeArrayBuffer  begin');
            let bytes: number[] = [23, 34, 56, 67, 89, 0, 13];
            let bytes1: number[] = [3, 4, 6, 7, 9, 0, 8];
            let result: ArrayBuffer = BufferTools.mergeArrayBuffer(bytes, bytes1);
            expect(bytes.length + bytes1.length).assertEqual(result.byteLength);
        });
        it('mergeArrayBuffer02', 0, () => {
            console.info('mergeArrayBuffer  begin');
            let bytes: number[] = [23, 2, 11, 10, 22, 123, 2];
            let result: ArrayBuffer = BufferTools.mergeArrayBuffer(bytes, bytes);
            expect(result.byteLength).assertEqual(14);
        });
        it('mergeArrayBuffer03', 0, () => {
            console.info('mergeArrayBuffer  begin');
            let bytes: number[] = [2, 1, 4, 3, 1, 110, 45];
            let bytes1: number[] = [31, 14, 11, 71, 9, 45, 28];
            let result: ArrayBuffer = BufferTools.mergeArrayBuffer(bytes, bytes1);
            expect(JSON.stringify(result)).assertEqual('{}');
        });
        it('mergeArrayBuffer04', 0, () => {
            console.info('mergeArrayBuffer  begin');
            let bytes: number[] = [5, 5, 21, 5, 9];
            let result: ArrayBuffer = BufferTools.mergeArrayBuffer(bytes, bytes);
            expect(result.byteLength).assertEqual(10);
        });
        it('setBit01', 0, () => {
            console.info('setBit  begin');
            let num = 105;
            let result = BufferTools.setBit(97, 99, true);
            expect(num).assertEqual(result);
        });
        it('setBit02', 0, () => {
            console.info('setBit  begin');
            let result = BufferTools.setBit(11, 122, false);
            expect(result).assertEqual(11);
        });
        it('setBit03', 0, () => {
            console.info('setBit  begin');
            let result = BufferTools.setBit(1, 67, true);
            expect(result).assertEqual(9);
        });
        it('setBit04', 0, () => {
            console.info('setBit  begin');
            let result = BufferTools.setBit(4, 78, false);
            expect(result).assertEqual(4);
        });
        it('packSynchsafeInteger01', 0, () => {
            console.info('packSynchsafeInteger  begin');
            let num = 34;
            let result = BufferTools.packSynchsafeInteger(34);
            expect(num).assertEqual(result[3]);
        });
        it('packSynchsafeInteger02', 0, () => {
            console.info('packSynchsafeInteger  begin');
            let result = BufferTools.packSynchsafeInteger(112);
            expect(result[0]).assertEqual(0);
            expect(result[2]).assertEqual(0);
        });
        it('packSynchsafeInteger03', 0, () => {
            console.info('packSynchsafeInteger  begin');
            let result = BufferTools.packSynchsafeInteger(119);
            expect(JSON.stringify(result)).assertEqual('[0,0,0,119]');
        });
        it('packSynchsafeInteger04', 0, () => {
            console.info('packSynchsafeInteger  begin');
            let result = BufferTools.packSynchsafeInteger(69);
            expect(JSON.stringify(result)).assertEqual('[0,0,0,69]');
        });
        it('padStringRight01', 0, () => {
            console.info('padStringRight  begin');
            let str = 'qwerwe';
            let result = BufferTools.padStringRight('qwerwe', 3, 'uoojh');
            expect(result).assertContain(str);
        });
        it('padStringRight02', 0, () => {
            console.info('padStringRight  begin');
            let result = BufferTools.padStringRight('Copyright', 3, 'Artist');
            expect(result).assertContain('Copyright');
        });
        it('padStringRight03', 0, () => {
            console.info('padStringRight  begin');
            let result = BufferTools.padStringRight('STRING', 3, 'success');
            expect(result).assertEqual('STRING');
        });
        it('padStringRight04', 0, () => {
            console.info('padStringRight  begin');
            let result = BufferTools.padStringRight('Holle', 3, 'DEL');
            expect(result).assertEqual('Holle');
        });
        it('sizeUnsynchronisationWouldAdd01', 0, () => {
            console.info('sizeUnsynchronisationWouldAdd  begin');
            let bytes1: number[] = [3, 4, 6, 7, 9, 0, 8];
            let result = BufferTools.sizeUnsynchronisationWouldAdd(bytes1);
            expect(result).assertEqual(0);
        });
        it('sizeUnsynchronisationWouldAdd02', 0, () => {
            console.info('sizeUnsynchronisationWouldAdd  begin');
            let bytes: number[] = [36, 17, 3, 20, 33, 2, 7, 2];
            let result = BufferTools.sizeUnsynchronisationWouldAdd(bytes);
            expect(result).assertEqual(0);
        });
        it('sizeUnsynchronisationWouldAdd03', 0, () => {
            console.info('sizeUnsynchronisationWouldAdd  begin');
            let bytes1: number[] = [23, 5, 64, 47, 92, 14, 28];
            let result = BufferTools.sizeUnsynchronisationWouldAdd(bytes1);
            expect(result).assertEqual(0);
        });
        it('sizeUnsynchronisationWouldAdd04', 0, () => {
            console.info('sizeUnsynchronisationWouldAdd  begin');
            let bytes: number[] = [45, 3, 3, 3, 1, 12, 47, 42];
            let result = BufferTools.sizeUnsynchronisationWouldAdd(bytes);
            expect(result).assertEqual(0);
        });
        it('unsynchroniseBuffer01', 0, () => {
            console.info('unsynchroniseBuffer  begin');
            let bytes1: number[] = [3, 4, 6, 7, 9, 0, 8];
            let result = BufferTools.unsynchroniseBuffer(bytes1);
            expect(JSON.stringify(result)).assertEqual('[3,4,6,7,9,0,8]');
        });
        it('unsynchroniseBuffer02', 0, () => {
            console.info('unsynchroniseBuffer  begin');
            let bytes: number[] = [33, 44, 56, 17, 93];
            let result = BufferTools.unsynchroniseBuffer(bytes);
            expect(JSON.stringify(result)).assertEqual('[33,44,56,17,93]');
        });
        it('unsynchroniseBuffer03', 0, () => {
            console.info('unsynchroniseBuffer  begin');
            let bytes1: number[] = [3, 24, 16, 734, 39, 0, 6, 1, 8];
            let result = BufferTools.unsynchroniseBuffer(bytes1);
            expect(JSON.stringify(result)).assertEqual('[3,24,16,734,39,0,6,1,8]');
        });
        it('unsynchroniseBuffer04', 0, () => {
            console.info('unsynchroniseBuffer  begin');
            let bytes: number[] = [55, 1, 23, 17, 7];
            let result = BufferTools.unsynchroniseBuffer(bytes);
            expect(JSON.stringify(result)).assertEqual('[55,1,23,17,7]');
        });
        it('copyOf01', 0, () => {
            console.info('copyOf  begin');
            let bytes1: number[] = [3, 4, 6, 7, 9, 0, 8];
            let result = BufferTools.copyOf(bytes1, 4);
            expect(result[0]).assertEqual(bytes1[0]);
        });
        it('copyOf02', 0, () => {
            console.info('copyOf  begin');
            let bytes: number[] = [55, 26, 17, 9, 10, 28];
            let result = BufferTools.copyOf(bytes, 4);
            expect(result[3]).assertEqual(9);
        });
        it('copyOf03', 0, () => {
            console.info('copyOf  begin');
            let bytes1: number[] = [352, 42, 6, 27, 19, 10, 18];
            let result = BufferTools.copyOf(bytes1, 8);
            expect(result[2]).assertEqual(6);
        });
        it('copyOf04', 0, () => {
            console.info('copyOf  begin');
            let bytes: number[] = [0, 4, 3, 9, 43, 76];
            let result = BufferTools.copyOf(bytes, 1);
            expect(result[1]).assertUndefined();
        });
        it('isNumber01', 0, () => {
            console.info('isNumber  begin');
            let result = BufferTools.isNumber('35');
            expect(result).assertTrue();
            let result1 = BufferTools.isNumber('35er');
            expect(result1).assertFalse();
        });
        it('isNumber02', 0, () => {
            console.info('isNumber  begin');
            let result = BufferTools.isNumber('99.99');
            let result1 = BufferTools.isNumber('-11.11es');
            expect(result).assertTrue();
            expect(result1).assertFalse();
        });
        it('isNumber03', 0, () => {
            console.info('isNumber  begin');
            let result = BufferTools.isNumber('38WQE5');
            expect(result).assertFalse();
        });
        it('isNumber04', 0, () => {
            console.info('isNumber  begin');
            let result = BufferTools.isNumber('-154');
            expect(result).assertTrue();
        });
        it('sizeSynchronisationWouldSubtract01', 0, () => {
            console.info('sizeSynchronisationWouldSubtract  begin');
            let bytes: number[] = [3, 4, 6, 7, 9, 0, 8];
            let result = BufferTools.sizeSynchronisationWouldSubtract(bytes);
            expect(result).assertEqual(0);
        });
        it('sizeSynchronisationWouldSubtract02', 0, () => {
            console.info('sizeSynchronisationWouldSubtract  begin');
            let bytes: number[] = [24, 16, 27, 19, 10, 2];
            let result = BufferTools.sizeSynchronisationWouldSubtract(bytes);
            expect(result).assertEqual(0);
        });
        it('sizeSynchronisationWouldSubtract03', 0, () => {
            console.info('sizeSynchronisationWouldSubtract  begin');
            let bytes: number[] = [31, 7, 19, 20, 18];
            let result = BufferTools.sizeSynchronisationWouldSubtract(bytes);
            expect(result).assertEqual(0);
        });
        it('sizeSynchronisationWouldSubtract04', 0, () => {
            console.info('sizeSynchronisationWouldSubtract  begin');
            let bytes: number[] = [13, 1, 27, 45, 2, 12];
            let result = BufferTools.sizeSynchronisationWouldSubtract(bytes);
            expect(result).assertEqual(0);
        });
        it('synchroniseBuffer01', 0, () => {
            console.info('synchroniseBuffer  begin');
            let bytes: number[] = [3, 4, 6, 7, 9, 0, 8];
            let result = BufferTools.synchroniseBuffer(bytes);
            expect(result[0]).assertEqual(bytes[0]);
        });
        it('synchroniseBuffer02', 0, () => {
            console.info('synchroniseBuffer  begin');
            let bytes: number[] = [11111111, 2, 11111111];
            let result = BufferTools.synchroniseBuffer(bytes);
            expect(result[2]).assertEqual(11111111);
        });
        it('synchroniseBuffer03', 0, () => {
            console.info('synchroniseBuffer  begin');
            let bytes: number[] = [52, 964, 91, 20, 45];
            let result = BufferTools.synchroniseBuffer(bytes);
            expect(result[3]).assertEqual(20);
        });
        it('synchroniseBuffer04', 0, () => {
            console.info('synchroniseBuffer  begin');
            let bytes: number[] = [965, 2, 2222];
            let result = BufferTools.synchroniseBuffer(bytes);
            expect(result[1]).assertEqual(2);
        });
        it('packSynchsafeIntegerOther01', 0, () => {
            console.info('packSynchsafeIntegerOther  begin');
            let bytes: number[] = [32, 2, 20, 13, 7];
            let result = BufferTools.packSynchsafeIntegerOther(1, bytes, 3);
            expect(result).assertUndefined();
        });
        it('packSynchsafeIntegerOther02', 0, () => {
            console.info('packSynchsafeIntegerOther  begin');
            let bytes: number[] = [];
            let result = BufferTools.packSynchsafeIntegerOther(0, bytes, 0);
            expect(result).assertUndefined();
        });
        it('packSynchsafeIntegerOther03', 0, () => {
            console.info('packSynchsafeIntegerOther  begin');
            let bytes: number[] = [1, 2, 1, 56, 1];
            let result = BufferTools.packSynchsafeIntegerOther(1, bytes, 2);
            expect(result).assertUndefined();
        });
        it('packSynchsafeIntegerOther04', 0, () => {
            console.info('packSynchsafeIntegerOther  begin');
            let bytes: number[] = [342, 1, 3, 67];
            let result = BufferTools.packSynchsafeIntegerOther(1, bytes, 0);
            expect(result).assertUndefined();
        });
        it('fill01', 0, () => {
            console.info('fill  begin');
            let bytes: number[] = [1, 3, 5, 9];
            let fill = BufferTools.fill(bytes, 1);
            expect(fill).assertUndefined();
        });
        it('fill02', 0, () => {
            console.info('fill  begin');
            let bytes: number[] = [6, 5, 9];
            let fill = BufferTools.fill(bytes, 66);
            expect(fill).assertUndefined();
        });
        it('fill03', 0, () => {
            console.info('fill  begin');
            let bytes: number[] = [1, 6, 66, 76, 5, 9];
            let fill = BufferTools.fill(bytes, 4);
            expect(fill).assertUndefined();
        });
        it('fill04', 0, () => {
            console.info('fill  begin');
            let bytes: number[] = [62, 5, 349, 78, 12];
            let fill = BufferTools.fill(bytes, 13);
            expect(fill).assertUndefined();
        });
        it('stringIntoByteBuffer01', 0, () => {
            console.info('stringIntoByteBuffer  begin');
            let bytes: number[] = [84, 65, 71, 116, 105, 116, 108, 101, 0, 0];
            let stringIntoByteBuffer = BufferTools.stringIntoByteBuffer('new comment', 0, 11, bytes, 97);
            expect(stringIntoByteBuffer).assertUndefined();
        });
        it('stringIntoByteBuffer02', 0, () => {
            console.info('stringIntoByteBuffer  begin');
            let bytes: number[] = [];
            let stringIntoByteBuffer = BufferTools.stringIntoByteBuffer(' ', 0, 1, bytes, 1);
            expect(stringIntoByteBuffer).assertUndefined();
        });
        it('stringIntoByteBuffer03', 0, () => {
            console.info('stringIntoByteBuffer  begin');
            let bytes: number[] = [3, 65, 71, 2, 34, 90, 0, 80];
            let stringIntoByteBuffer = BufferTools.stringIntoByteBuffer('new comment', 2, 75, bytes, 7);
            expect(stringIntoByteBuffer).assertUndefined();
        });
        it('stringIntoByteBuffer04', 0, () => {
            console.info('stringIntoByteBuffer  begin');
            let bytes: number[] = [34, 0, 21, 45, 90];
            let stringIntoByteBuffer = BufferTools.stringIntoByteBuffer(' ', 77, 81, bytes, 861);
            expect(stringIntoByteBuffer).assertUndefined();
        });
        it('trimStringRight01', 0, () => {
            console.info('trimStringRight  begin');
            let trimStringRight = BufferTools.trimStringRight('new comment');
            expect(trimStringRight).assertEqual('new comment');
        });
        it('trimStringRight02', 0, () => {
            console.info('trimStringRight  begin');
            let trimStringRight = BufferTools.trimStringRight(' ');
            expect(trimStringRight).assertEqual('');
        });
        it('trimStringRight03', 0, () => {
            console.info('trimStringRight  begin');
            let trimStringRight = BufferTools.trimStringRight('hello world ！');
            expect(trimStringRight).assertEqual('hello world ！');
        });
        it('trimStringRight04', 0, () => {
            console.info('trimStringRight  begin');
            let trimStringRight = BufferTools.trimStringRight('ArkTs');
            expect(trimStringRight).assertEqual('ArkTs');
        });
        it('copyIntoByteBuffer01', 0, () => {
            console.info('copyIntoByteBuffer  begin');
            let bytes: number[] = [12, 3, 4, 7, 89];
            let buffer: number[] = [23, 5, 7, 87, 1, 0];
            let copyIntoByteBuffer = BufferTools.copyIntoByteBuffer(bytes, 1, 3, buffer, 3);
            expect(copyIntoByteBuffer).assertUndefined();
        });
        it('copyIntoByteBuffer02', 0, () => {
            console.info('copyIntoByteBuffer  begin');
            let bytes: number[] = [23, 3, 23, 27, 2, 7, 25, 6];
            let buffer: number[] = [2, 22, 7, 33, 1, 90];
            let copyIntoByteBuffer = BufferTools.copyIntoByteBuffer(bytes, 5, 53, buffer, 0);
            expect(copyIntoByteBuffer).assertUndefined();
        });
        it('copyIntoByteBuffer03', 0, () => {
            console.info('copyIntoByteBuffer  begin');
            let bytes: number[] = [2, 33, 44, 17, 211];
            let copyIntoByteBuffer = BufferTools.copyIntoByteBuffer(bytes, 4, 33, [], 13);
            expect(copyIntoByteBuffer).assertUndefined();
        });
        it('copyIntoByteBuffer04', 0, () => {
            console.info('copyIntoByteBuffer  begin');
            let buffer: number[] = [21, 3, 7, 56, 11, 34];
            let copyIntoByteBuffer = BufferTools.copyIntoByteBuffer([], 95, 5, buffer, 10);
            expect(copyIntoByteBuffer).assertUndefined();
        });
        it('stringToByteBuffer01', 0, () => {
            console.info('stringToByteBuffer  begin');
            let stringToByteBuffer = BufferTools.stringToByteBuffer('title', 1, 1);
            expect(stringToByteBuffer[0]).assertEqual(105);
        });
        it('stringToByteBuffer02', 0, () => {
            console.info('stringToByteBuffer  begin');
            let stringToByteBuffer = BufferTools.stringToByteBuffer('The Album', 2, 2);
            expect(stringToByteBuffer[0]).assertEqual(101);
            expect(stringToByteBuffer[1]).assertEqual(32);
        });
        it('stringToByteBuffer03', 0, () => {
            console.info('stringToByteBuffer  begin');
            let stringToByteBuffer = BufferTools.stringToByteBuffer('time', 3, 5);
            expect(stringToByteBuffer[1]).assertUndefined();
        });
        it('stringToByteBuffer04', 0, () => {
            console.info('stringToByteBuffer  begin');
            let stringToByteBuffer = BufferTools.stringToByteBuffer('Timmy', 56, 22);
            expect(stringToByteBuffer[1]).assertUndefined();
        });
        it('replaceNumbersWithBytes01', 0, () => {
            console.info('replaceNumbersWithBytes  begin');
            let bytes: number[] = [43, 3, 2, 22, 2, 1, 8, 6];
            let replaceNumbersWithBytes = BufferTools.replaceNumbersWithBytes(bytes, 1);
            expect(replaceNumbersWithBytes).assertUndefined();
        });
        it('replaceNumbersWithBytes02', 0, () => {
            console.info('replaceNumbersWithBytes  begin');
            let bytes: number[] = [12, 13, 22, 8, 26];
            let replaceNumbersWithBytes = BufferTools.replaceNumbersWithBytes(bytes, 5);
            expect(replaceNumbersWithBytes).assertUndefined();
        });
        it('replaceNumbersWithBytes03', 0, () => {
            console.info('replaceNumbersWithBytes  begin');
            let replaceNumbersWithBytes = BufferTools.replaceNumbersWithBytes([], 9);
            expect(replaceNumbersWithBytes).assertUndefined();
        });
        it('replaceNumbersWithBytes04', 0, () => {
            console.info('replaceNumbersWithBytes  begin');
            let bytes: number[] = [3, 78, 71, 34, 26];
            let replaceNumbersWithBytes = BufferTools.replaceNumbersWithBytes(bytes, 4);
            expect(replaceNumbersWithBytes).assertUndefined();
        });
    });
}
