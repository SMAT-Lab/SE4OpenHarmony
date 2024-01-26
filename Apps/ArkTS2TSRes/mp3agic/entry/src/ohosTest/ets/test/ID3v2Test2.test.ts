let __generate__Id: number = 0;
function generateId(): string {
    return "ID3v2Test2.test_" + ++__generate__Id;
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
import { ID3v2ChapterFrameData, ID3v2Frame } from '@ohos/mp3agic';
export default function ID3v2Test2() {
    describe('ID3v2Test2', () => {
        it('toBytes01', 0, () => {
            let bytes: Int8Array = new Int8Array([42, 23, 33, 43, 34, 22, 12]);
            let iD3v2Frame = new ID3v2Frame('title', bytes);
            let toBytes = iD3v2Frame.toBytes();
            expect(toBytes[4]).assertEqual(0);
        });
        it('toBytes02', 0, () => {
            let data: Int8Array = new Int8Array([1, 2, 1, 2, 6, 22, 5]);
            let iD3v2Frame = new ID3v2Frame('new comment', data);
            let toBytes = iD3v2Frame.toBytes();
            expect(toBytes[4]).assertEqual(0);
        });
        it('toBytes03', 0, () => {
            let bytes: Int8Array = new Int8Array([29, 9, 7, 43, 5, 22, 46]);
            let iD3v2Frame = new ID3v2Frame('world', bytes);
            let toBytes = iD3v2Frame.toBytes();
            expect(toBytes[3]).assertEqual(108);
        });
        it('toBytes04', 0, () => {
            let data: Int8Array = new Int8Array([9, 57, 13, 23, 36, 0, 75]);
            let iD3v2Frame = new ID3v2Frame('open-harmony', data);
            let toBytes = iD3v2Frame.toBytes();
            expect(toBytes[3]).assertEqual(110);
        });
        it('packFrame01', 0, () => {
            let data: Int8Array = new Int8Array([55, 7, 12, 6, 3, 35]);
            let types: number[] = [3, 43, 6, 78, 9];
            let iD3v2Frame = new ID3v2Frame('new comment', data);
            let packFrame = iD3v2Frame.packFrame(types, 5);
            expect(packFrame).assertUndefined();
        });
        it('packFrame02', 0, () => {
            let data: Int8Array = new Int8Array([9, 97, 54, 26, 0, 1]);
            let types: number[] = [30, 5, 65, 76, 90];
            let iD3v2Frame = new ID3v2Frame('world', data);
            let packFrame = iD3v2Frame.packFrame(types, 2);
            expect(packFrame).assertUndefined();
        });
        it('packFrame03', 0, () => {
            let data: Int8Array = new Int8Array([0, 75, 5, 16, 56, 0]);
            let types: number[] = [33, 1, 36, 87, 49];
            let iD3v2Frame = new ID3v2Frame('default', data);
            let packFrame = iD3v2Frame.packFrame(types, 3);
            expect(packFrame).assertUndefined();
        });
        it('packFrame04', 0, () => {
            let data: Int8Array = new Int8Array([9, 3, 2, 1, 30, 114]);
            let types: number[] = [];
            let iD3v2Frame = new ID3v2Frame('timeout', data);
            let packFrame = iD3v2Frame.packFrame(types, 6);
            expect(packFrame).assertUndefined();
        });
        it('ID3v2Frame_getId01', 0, () => {
            let data: Int8Array = new Int8Array([12, 12, 22, 62, 1, 0]);
            let iD3v2Frame = new ID3v2Frame('TAG', data);
            let getId = iD3v2Frame.getId();
            expect(getId).assertEqual('TAG');
        });
        it('ID3v2Frame_getId02', 0, () => {
            let data: Int8Array = new Int8Array([4, 142, 5, 344, 1, 40]);
            let iD3v2Frame = new ID3v2Frame('TAG', data);
            let getId = iD3v2Frame.getId();
            expect(getId).assertEqual('TAG');
        });
        it('ID3v2Frame_getId03', 0, () => {
            let data: Int8Array = new Int8Array([5, 1, 90, 64, 41, 40]);
            let iD3v2Frame = new ID3v2Frame('world', data);
            let getId = iD3v2Frame.getId();
            expect(getId).assertEqual('world');
        });
        it('ID3v2Frame_getId04', 0, () => {
            let data: Int8Array = new Int8Array([]);
            let iD3v2Frame = new ID3v2Frame('time', data);
            let getId = iD3v2Frame.getId();
            expect(getId).assertEqual('time');
        });
        it('getDataLength01', 0, () => {
            let data: Int8Array = new Int8Array([44, 19, 53, 98, 1, 87]);
            let iD3v2Frame = new ID3v2Frame('TAG', data);
            let getDataLength = iD3v2Frame.getDataLength();
            expect(getDataLength).assertEqual(6);
        });
        it('getDataLength02', 0, () => {
            let data: Int8Array = new Int8Array([80, 2, 8, 4, 1, 0]);
            let iD3v2Frame = new ID3v2Frame('TCON', data);
            let getDataLength = iD3v2Frame.getDataLength();
            expect(getDataLength).assertEqual(6);
        });
        it('getDataLength03', 0, () => {
            let data: Int8Array = new Int8Array([]);
            let iD3v2Frame = new ID3v2Frame('time', data);
            let getDataLength = iD3v2Frame.getDataLength();
            expect(getDataLength).assertEqual(0);
        });
        it('getDataLength04', 0, () => {
            let data: Int8Array = new Int8Array([32, 22, 68, 6, 14, 4]);
            let iD3v2Frame = new ID3v2Frame('log', data);
            let getDataLength = iD3v2Frame.getDataLength();
            expect(getDataLength).assertEqual(6);
        });
        it('getLength01', 0, () => {
            let data: Int8Array = new Int8Array([7, 2, 28, 14, 11, 1]);
            let iD3v2Frame = new ID3v2Frame('TCON', data);
            let getLength = iD3v2Frame.getLength();
            expect(getLength).assertEqual(16);
        });
        it('getLength02', 0, () => {
            let data: Int8Array = new Int8Array([7, 2, 28, 14, 11, 1, 7, 89, 67]);
            let iD3v2Frame = new ID3v2Frame('ID3', data);
            let getLength = iD3v2Frame.getLength();
            expect(getLength).assertEqual(19);
        });
        it('getLength03', 0, () => {
            let data: Int8Array = new Int8Array([75, 22, 78, 65, 0, 61]);
            let iD3v2Frame = new ID3v2Frame('CON', data);
            let getLength = iD3v2Frame.getLength();
            expect(getLength).assertEqual(16);
        });
        it('getLength04', 0, () => {
            let data: Int8Array = new Int8Array([]);
            let iD3v2Frame = new ID3v2Frame('AAA', data);
            let getLength = iD3v2Frame.getLength();
            expect(getLength).assertEqual(10);
        });
        it('getData01', 0, () => {
            let data: Int8Array = new Int8Array([1, 5, 7, 12, 14, 11, 1, 7, 89, 67]);
            let iD3v2Frame = new ID3v2Frame('TENC', data);
            let getData = iD3v2Frame.getData();
            expect(getData[5]).assertEqual(11);
        });
        it('getData02', 0, () => {
            let data: Int8Array = new Int8Array([15, 55, 7, 56, 14, 11, 1, 7, 3]);
            let iD3v2Frame = new ID3v2Frame('TENC', data);
            let getData = iD3v2Frame.getData();
            expect(getData[6]).assertEqual(1);
        });
        it('getData03', 0, () => {
            let data: Int8Array = new Int8Array([113, 35, 37, 12, 2, 3, 21, 5, 1, 1]);
            let iD3v2Frame = new ID3v2Frame('TENC', data);
            let getData = iD3v2Frame.getData();
            expect(getData[3]).assertEqual(12);
        });
        it('getData04', 0, () => {
            let data: Int8Array = new Int8Array([]);
            let iD3v2Frame = new ID3v2Frame('TENC', data);
            let getData = iD3v2Frame.getData();
            expect(getData[4]).assertUndefined();
        });
        it('setData01', 0, () => {
            let data: Int8Array = new Int8Array([15, 55, 7, 56, 14, 11, 1, 7, 3]);
            let types: number[] = [3, 43, 6, 1, 9, 43, 7, 90, 2, 54];
            let iD3v2Frame = new ID3v2Frame('TENC', data);
            let setData = iD3v2Frame.setData(types);
            expect(setData).assertUndefined();
        });
        it('setData02', 0, () => {
            let data: Int8Array = new Int8Array([2, 3, 7, 2, 14, 3, 13, 47, 2]);
            let types: number[] = [];
            let iD3v2Frame = new ID3v2Frame('TEN', data);
            let setData = iD3v2Frame.setData(types);
            expect(setData).assertUndefined();
        });
        it('hasDataLengthIndicator01', 0, () => {
            let data: Int8Array = new Int8Array([1, 23, 7, 1, 37, 1, 7, 3]);
            let iD3v2Frame = new ID3v2Frame('WXXX', data);
            let hasDataLengthIndicator = iD3v2Frame.hasDataLengthIndicator();
            expect(hasDataLengthIndicator).assertFalse();
        });
        it('hasDataLengthIndicator02', 0, () => {
            let data: Int8Array = new Int8Array([1, 54, 45, 541, 5, 15, 7, 93, 56, 7, 2, 6]);
            let iD3v2Frame = new ID3v2Frame('The Album', data);
            let hasDataLengthIndicator = iD3v2Frame.hasDataLengthIndicator();
            expect(hasDataLengthIndicator).assertFalse();
        });
        it('hasDataLengthIndicator03', 0, () => {
            let data: Int8Array = new Int8Array([]);
            let iD3v2Frame = new ID3v2Frame('World', data);
            let hasDataLengthIndicator = iD3v2Frame.hasDataLengthIndicator();
            expect(hasDataLengthIndicator).assertFalse();
        });
        it('hasDataLengthIndicator04', 0, () => {
            let data: Int8Array = new Int8Array([11, 2, 45, 23, 51, 93, 4, 75, 23, 26]);
            let iD3v2Frame = new ID3v2Frame('', data);
            let hasDataLengthIndicator = iD3v2Frame.hasDataLengthIndicator();
            expect(hasDataLengthIndicator).assertFalse();
        });
        it('hasCompression01', 0, () => {
            let data: Int8Array = new Int8Array([11, 13, 45, 5, 15, 7, 56, 7, 22, 61]);
            let iD3v2Frame = new ID3v2Frame('', data);
            let hasCompression = iD3v2Frame.hasCompression();
            expect(hasCompression).assertFalse();
        });
        it('hasCompression02', 0, () => {
            let data: Int8Array = new Int8Array([6, 13, 9, 5, 3, 7, 56, 7, 21, 1]);
            let iD3v2Frame = new ID3v2Frame('2020', data);
            let hasCompression = iD3v2Frame.hasCompression();
            expect(hasCompression).assertFalse();
        });
        it('hasCompression03', 0, () => {
            let data: Int8Array = new Int8Array([2, 2, 2, 45, 43, 74, 456, 47, 22, 56]);
            let iD3v2Frame = new ID3v2Frame('99', data);
            let hasCompression = iD3v2Frame.hasCompression();
            expect(hasCompression).assertFalse();
        });
        it('hasCompression04', 0, () => {
            let data: Int8Array = new Int8Array([61, 3, 9, 15, 13, 72, 56, 7, 4, 21]);
            let iD3v2Frame = new ID3v2Frame('2025', data);
            let hasCompression = iD3v2Frame.hasCompression();
            expect(hasCompression).assertFalse();
        });
        it('hasEncryption01', 0, () => {
            let data: Int8Array = new Int8Array([13, 2, 9, 53, 13, 7, 56, 30, 23, 1, 21, 8]);
            let iD3v2Frame = new ID3v2Frame('zhou', data);
            let hasEncryption = iD3v2Frame.hasEncryption();
            expect(hasEncryption).assertFalse();
        });
        it('hasEncryption02', 0, () => {
            let data: Int8Array = new Int8Array([43]);
            let iD3v2Frame = new ID3v2Frame(' ', data);
            let hasEncryption = iD3v2Frame.hasEncryption();
            expect(hasEncryption).assertFalse();
        });
        it('hasEncryption03', 0, () => {
            let data: Int8Array = new Int8Array([131, 8, 2]);
            let iD3v2Frame = new ID3v2Frame('time', data);
            let hasEncryption = iD3v2Frame.hasEncryption();
            expect(hasEncryption).assertFalse();
        });
        it('hasEncryption04', 0, () => {
            let data: Int8Array = new Int8Array([10, 1, 1, 1]);
            let iD3v2Frame = new ID3v2Frame('', data);
            let hasEncryption = iD3v2Frame.hasEncryption();
            expect(hasEncryption).assertFalse();
        });
        it('hasGroup01', 0, () => {
            let data: Int8Array = new Int8Array([4, 3, 8]);
            let iD3v2Frame = new ID3v2Frame(' ', data);
            let hasGroup = iD3v2Frame.hasGroup();
            expect(hasGroup).assertFalse();
        });
        it('hasGroup02', 0, () => {
            let data: Int8Array = new Int8Array([4, 3, 8, 35, 7, 9, 4, 0, 2, 78]);
            let iD3v2Frame = new ID3v2Frame('APIC', data);
            let hasGroup = iD3v2Frame.hasGroup();
            expect(hasGroup).assertFalse();
        });
        it('hasGroup03', 0, () => {
            let data: Int8Array = new Int8Array([41, 23, 1, 4, 58]);
            let iD3v2Frame = new ID3v2Frame('ID4', data);
            let hasGroup = iD3v2Frame.hasGroup();
            expect(hasGroup).assertFalse();
        });
        it('hasGroup04', 0, () => {
            let data: Int8Array = new Int8Array([14, 7, 8, 45, 7, 19, 41, 10, 56, 55]);
            let iD3v2Frame = new ID3v2Frame('World', data);
            let hasGroup = iD3v2Frame.hasGroup();
            expect(hasGroup).assertFalse();
        });
        it('hasPreserveFile01', 0, () => {
            let data: Int8Array = new Int8Array([41, 13, 68, 12, 4, 0, 2, 5]);
            let iD3v2Frame = new ID3v2Frame('APIC', data);
            let hasPreserveFile = iD3v2Frame.hasPreserveFile();
            expect(hasPreserveFile).assertFalse();
        });
        it('hasPreserveFile02', 0, () => {
            let data: Int8Array = new Int8Array([5]);
            let iD3v2Frame = new ID3v2Frame('', data);
            let hasPreserveFile = iD3v2Frame.hasPreserveFile();
            expect(hasPreserveFile).assertFalse();
        });
        it('hasPreserveFile03', 0, () => {
            let data: Int8Array = new Int8Array([1, 3, 3, 56, 45, 45]);
            let iD3v2Frame = new ID3v2Frame('PIC', data);
            let hasPreserveFile = iD3v2Frame.hasPreserveFile();
            expect(hasPreserveFile).assertFalse();
        });
        it('hasPreserveFile04', 0, () => {
            let data: Int8Array = new Int8Array([]);
            let iD3v2Frame = new ID3v2Frame('world', data);
            let hasPreserveFile = iD3v2Frame.hasPreserveFile();
            expect(hasPreserveFile).assertFalse();
        });
        it('hasPreserveTag01', 0, () => {
            let data: Int8Array = new Int8Array([5, 1, 3, 43, 5, 8, 7, 9]);
            let iD3v2Frame = new ID3v2Frame('TPUB', data);
            let hasPreserveTag = iD3v2Frame.hasPreserveTag();
            expect(hasPreserveTag).assertFalse();
        });
        it('hasPreserveTag02', 0, () => {
            let iD3v2Frame = new ID3v2Frame('', new Int8Array([]));
            let hasPreserveTag = iD3v2Frame.hasPreserveTag();
            expect(hasPreserveTag).assertFalse();
        });
        it('hasPreserveTag03', 0, () => {
            let data: Int8Array = new Int8Array([35, 11, 18, 17, 29]);
            let iD3v2Frame = new ID3v2Frame('tup', data);
            let hasPreserveTag = iD3v2Frame.hasPreserveTag();
            expect(hasPreserveTag).assertFalse();
        });
        it('hasPreserveTag04', 0, () => {
            let data: Int8Array = new Int8Array([1]);
            let iD3v2Frame = new ID3v2Frame('', data);
            let hasPreserveTag = iD3v2Frame.hasPreserveTag();
            expect(hasPreserveTag).assertFalse();
        });
        it('isReadOnly01', 0, () => {
            let data: Int8Array = new Int8Array([5, 21, 3, 43, 5, 21, 5, 78]);
            let iD3v2Frame = new ID3v2Frame('COMMENT', data);
            let isReadOnly = iD3v2Frame.isReadOnly();
            expect(isReadOnly).assertFalse();
        });
        it('isReadOnly02', 0, () => {
            let iD3v2Frame = new ID3v2Frame('COMMENT', new Int8Array([]));
            let isReadOnly = iD3v2Frame.isReadOnly();
            expect(isReadOnly).assertFalse();
        });
        it('isReadOnly03', 0, () => {
            let data: Int8Array = new Int8Array([78]);
            let iD3v2Frame = new ID3v2Frame('time', data);
            let isReadOnly = iD3v2Frame.isReadOnly();
            expect(isReadOnly).assertFalse();
        });
        it('isReadOnly04', 0, () => {
            let iD3v2Frame = new ID3v2Frame('out', new Int8Array([]));
            let isReadOnly = iD3v2Frame.isReadOnly();
            expect(isReadOnly).assertFalse();
        });
        it('hasUnsynchronisation01', 0, () => {
            let data: Int8Array = new Int8Array([5, 21, 1, 21, 5, 2, 8, 90, 2, 5, 1]);
            let iD3v2Frame = new ID3v2Frame('LYRICS', data);
            let hasUnsynchronisation = iD3v2Frame.hasUnsynchronisation();
            expect(hasUnsynchronisation).assertFalse();
        });
        it('hasUnsynchronisation02', 0, () => {
            let iD3v2Frame = new ID3v2Frame('LYRICS', new Int8Array([]));
            let hasUnsynchronisation = iD3v2Frame.hasUnsynchronisation();
            expect(hasUnsynchronisation).assertFalse();
        });
        it('hasUnsynchronisation03', 0, () => {
            let data: Int8Array = new Int8Array([15, 34, 14, 21, 5, 2, 22, 523, 11]);
            let iD3v2Frame = new ID3v2Frame('.', data);
            let hasUnsynchronisation = iD3v2Frame.hasUnsynchronisation();
            expect(hasUnsynchronisation).assertFalse();
        });
        it('hasUnsynchronisation04', 0, () => {
            let data: Int8Array = new Int8Array([1]);
            let iD3v2Frame = new ID3v2Frame('WORLD', data);
            let hasUnsynchronisation = iD3v2Frame.hasUnsynchronisation();
            expect(hasUnsynchronisation).assertFalse();
        });
        it('ID3v2ChapterFrameData_getId01', 0, () => {
            let bytes: number[] = [1, 5, 2, 2, 7];
            let iD3v2ChapterFrameData = new ID3v2ChapterFrameData(true, bytes, '1', 1, 2, 3, 4);
            iD3v2ChapterFrameData.setId('1');
            let getId = iD3v2ChapterFrameData.getId();
            expect(getId).assertEqual('1');
        });
        it('ID3v2ChapterFrameData_getId02', 0, () => {
            let bytes: number[] = [1, 35, 32, 23, 17, 7, 1, 3, 12];
            let iD3v2ChapterFrameData = new ID3v2ChapterFrameData(false, bytes, '3', 2, 4, 2, 2);
            iD3v2ChapterFrameData.setId('3');
            let getId = iD3v2ChapterFrameData.getId();
            expect(getId).assertEqual('3');
        });
        it('ID3v2ChapterFrameData_getId03', 0, () => {
            let bytes: number[] = [1, 37];
            let iD3v2ChapterFrameData = new ID3v2ChapterFrameData(true, bytes, 'r', 453, 6, 7, 8);
            iD3v2ChapterFrameData.setId('r');
            let getId = iD3v2ChapterFrameData.getId();
            expect(getId).assertEqual('r');
        });
        it('ID3v2ChapterFrameData_getId04', 0, () => {
            let bytes: number[] = [1, 35, 32, 23, 17, 7, 1, 3, 12];
            let iD3v2ChapterFrameData = new ID3v2ChapterFrameData(false, bytes, 'A', 546.7, 9, 76, 2);
            iD3v2ChapterFrameData.setId('A');
            let getId = iD3v2ChapterFrameData.getId();
            expect(getId).assertEqual('A');
        });
        it('setStartTime01', 0, () => {
            let bytes: number[] = [3, 23, 23, 2, 17];
            let iD3v2ChapterFrameData = new ID3v2ChapterFrameData(true, bytes, '1', 1, 2, 3, 4);
            iD3v2ChapterFrameData.setStartTime(125421);
            let getStartTime = iD3v2ChapterFrameData.getStartTime();
            expect(getStartTime).assertEqual(125421);
        });
        it('setStartTime02', 0, () => {
            let bytes: number[] = [3, 23, 23, 2, 17, 2, 3, 8];
            let iD3v2ChapterFrameData = new ID3v2ChapterFrameData(false, bytes, '2', 1, 6, 3, 6);
            iD3v2ChapterFrameData.setStartTime(96541);
            let getStartTime = iD3v2ChapterFrameData.getStartTime();
            expect(getStartTime).assertEqual(96541);
        });
        it('setStartTime03', 0, () => {
            let bytes: number[] = [];
            let iD3v2ChapterFrameData = new ID3v2ChapterFrameData(true, bytes, '332', 131, 5, 4);
            iD3v2ChapterFrameData.setStartTime(451);
            let getStartTime = iD3v2ChapterFrameData.getStartTime();
            expect(getStartTime).assertEqual(451);
        });
        it('setStartTime04', 0, () => {
            let bytes: number[] = [32, 3, 17, 213, 13, 58];
            let iD3v2ChapterFrameData = new ID3v2ChapterFrameData(false, bytes, '62', 1, 363, 8, 6);
            iD3v2ChapterFrameData.setStartTime(5);
            let getStartTime = iD3v2ChapterFrameData.getStartTime();
            expect(getStartTime).assertEqual(5);
        });
        it('getEndTime01', 0, () => {
            let bytes: number[] = [3, 23, 4, 2, 17, 22, 3, 18];
            let iD3v2ChapterFrameData = new ID3v2ChapterFrameData(false, bytes, '45', 2, 6, 3, 3);
            iD3v2ChapterFrameData.setEndTime(12887);
            let getEndTime = iD3v2ChapterFrameData.getEndTime();
            expect(getEndTime).assertEqual(12887);
        });
        it('getEndTime02', 0, () => {
            let bytes: number[] = [13, 3, 4, 2, 1, 3, 3];
            let iD3v2ChapterFrameData = new ID3v2ChapterFrameData(true, bytes, '31', 21, 63, 2, 9);
            iD3v2ChapterFrameData.setEndTime(8566601);
            let getEndTime = iD3v2ChapterFrameData.getEndTime();
            expect(getEndTime).assertEqual(8566601);
        });
        it('getEndTime03', 0, () => {
            let bytes: number[] = [];
            let iD3v2ChapterFrameData = new ID3v2ChapterFrameData(false, bytes, '90', 564, 21, 34, 3);
            iD3v2ChapterFrameData.setEndTime(342);
            let getEndTime = iD3v2ChapterFrameData.getEndTime();
            expect(getEndTime).assertEqual(342);
        });
        it('getEndTime04', 0, () => {
            let bytes: number[] = [1];
            let iD3v2ChapterFrameData = new ID3v2ChapterFrameData(true, bytes, '56', 21, 63, 2, 9);
            iD3v2ChapterFrameData.setEndTime(43);
            let getEndTime = iD3v2ChapterFrameData.getEndTime();
            expect(getEndTime).assertEqual(43);
        });
        it('getStartOffset01', 0, () => {
            let bytes: number[] = [1, 3, 14, 2, 0, 13, 43];
            let iD3v2ChapterFrameData = new ID3v2ChapterFrameData(true, bytes, '9', 3, 1, 2, 9);
            iD3v2ChapterFrameData.setStartOffset(1239997);
            let getStartOffset = iD3v2ChapterFrameData.getStartOffset();
            expect(getStartOffset).assertEqual(1239997);
        });
        it('getStartOffset02', 0, () => {
            let bytes: number[] = [1, 4, 8];
            let iD3v2ChapterFrameData = new ID3v2ChapterFrameData(false, bytes, '4', 2, 21, 22, 7);
            iD3v2ChapterFrameData.setStartOffset(541);
            let getStartOffset = iD3v2ChapterFrameData.getStartOffset();
            expect(getStartOffset).assertEqual(541);
        });
        it('getStartOffset03', 0, () => {
            let bytes: number[] = [19, 34, 2, 12, 10, 9, 9];
            let iD3v2ChapterFrameData = new ID3v2ChapterFrameData(true, bytes, 'tfd', 651, 421, 5, 9);
            iD3v2ChapterFrameData.setStartOffset(12);
            let getStartOffset = iD3v2ChapterFrameData.getStartOffset();
            expect(getStartOffset).assertEqual(12);
        });
        it('getStartOffset04', 0, () => {
            let bytes: number[] = [19, 94, 98];
            let iD3v2ChapterFrameData = new ID3v2ChapterFrameData(false, bytes, 't7f', 27, 56, 58, 7);
            iD3v2ChapterFrameData.setStartOffset(98);
            let getStartOffset = iD3v2ChapterFrameData.getStartOffset();
            expect(getStartOffset).assertEqual(98);
        });
        it('getEndOffset01', 0, () => {
            let bytes: number[] = [2, 42, 8, 7, 9, 12];
            let iD3v2ChapterFrameData = new ID3v2ChapterFrameData(false, bytes, '15', 1, 21, 8, 67);
            iD3v2ChapterFrameData.setEndOffset(5674);
            let getEndOffset = iD3v2ChapterFrameData.getEndOffset();
            expect(getEndOffset).assertEqual(5674);
        });
        it('getEndOffset02', 0, () => {
            let bytes: number[] = [2, 17, 19, 2];
            let iD3v2ChapterFrameData = new ID3v2ChapterFrameData(false, bytes, '92', 1, 8, 18, 3);
            iD3v2ChapterFrameData.setEndOffset(781);
            let getEndOffset = iD3v2ChapterFrameData.getEndOffset();
            expect(getEndOffset).assertEqual(781);
        });
        it('getEndOffset03', 0, () => {
            let bytes: number[] = [25, 1, 3, 7, 9, 23];
            let iD3v2ChapterFrameData = new ID3v2ChapterFrameData(false, bytes, 'tr', 4, 54, 0, 67);
            iD3v2ChapterFrameData.setEndOffset(78);
            let getEndOffset = iD3v2ChapterFrameData.getEndOffset();
            expect(getEndOffset).assertEqual(78);
        });
        it('getEndOffset04', 0, () => {
            let bytes: number[] = [68, 17, 0, 62];
            let iD3v2ChapterFrameData = new ID3v2ChapterFrameData(false, bytes, 'ds', 7, 87, 9, 3);
            iD3v2ChapterFrameData.setEndOffset(9);
            let getEndOffset = iD3v2ChapterFrameData.getEndOffset();
            expect(getEndOffset).assertEqual(9);
        });
    });
}
