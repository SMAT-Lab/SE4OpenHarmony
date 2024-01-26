let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
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
import { EncodedText, ID3v22Tag, ID3v23Tag, ID3v24Tag, ID3v2ObseleteFrame, JList } from '@ohos/mp3agic';
import { ByteBufferUtils } from '@ohos/mp3agic/src/main/ets/components/mp3agic/ByteBufferUtils';
import { MutableInteger } from '@ohos/mp3agic/src/main/ets/components/mp3agic/MutableInteger';
export default function abilityTest() {
    describe('AbilityTest', () => {
        it('getInt01', 0, () => {
            console.info("it begin");
            expect(16909060).assertEqual(ByteBufferUtils.getInt(1, 2, 3, 4));
            expect(185999660).assertEqual(ByteBufferUtils.getInt(11, 22, 33, 44));
        });
        it('getInt02', 0, () => {
            console.info("it begin");
            let getInt = ByteBufferUtils.getInt(31, 32, 23, 7);
            let getInt1 = ByteBufferUtils.getInt(11, 43, 5, 77);
            expect(getInt).assertEqual(522196743);
            expect(getInt1).assertEqual(187368781);
        });
        it('getInt03', 0, () => {
            console.info("it begin");
            expect(ByteBufferUtils.getInt(7, 5, 90, 39)).assertEqual(117791271);
        });
        it('getInt04', 0, () => {
            console.info("it begin");
            let getInt = ByteBufferUtils.getInt(1, 1, 2, 2);
            expect(getInt).assertEqual(16843266);
        });
        it('extractNullTerminatedString01', 0, () => {
            console.info("it begin");
            let bytes: number[] = [3, 3, 3, 1, 11];
            let extractNullTerminatedString = ByteBufferUtils.extractNullTerminatedString(bytes, 3);
            expect(extractNullTerminatedString).assertEqual('');
        });
        it('extractNullTerminatedString02', 0, () => {
            console.info("it begin");
            let bytes: number[] = [1, 5, 2, 2, 7];
            let extractNullTerminatedString = ByteBufferUtils.extractNullTerminatedString(bytes, 1);
            expect(extractNullTerminatedString).assertEqual('');
        });
        it('extractNullTerminatedString03', 0, () => {
            console.info("it begin");
            let bytes: number[] = [38, 34, 673, 21, 64];
            let extractNullTerminatedString = ByteBufferUtils.extractNullTerminatedString(bytes, 5);
            expect(extractNullTerminatedString).assertEqual('&"ʡ@');
        });
        it('extractNullTerminatedString04', 0, () => {
            console.info("it begin");
            let bytes: number[] = [19, 95, 223, 62, 72];
            let extractNullTerminatedString = ByteBufferUtils.extractNullTerminatedString(bytes, 3);
            expect(extractNullTerminatedString).assertEqual('_ß');
        });
        it('getValue01', 0, () => {
            let bean1 = new MutableInteger(1);
            expect(1).assertEqual(bean1.getValue());
        });
        it('getValue02', 0, () => {
            let bean2 = new MutableInteger(10);
            expect(10).assertEqual(bean2.getValue());
        });
        it('getValue03', 0, () => {
            let bean = new MutableInteger(2);
            expect(2).assertEqual(bean.getValue());
        });
        it('getValue04', 0, () => {
            let bean = new MutableInteger(14);
            expect(14).assertEqual(bean.getValue());
        });
        it('setValue01', 0, () => {
            let bean = new MutableInteger(1);
            bean.setValue(11);
            expect(11).assertEqual(bean.getValue());
        });
        it('setValue02', 0, () => {
            let bean = new MutableInteger(1);
            bean.setValue(22);
            expect(22).assertEqual(bean.getValue());
        });
        it('setValue03', 0, () => {
            let bean = new MutableInteger(1);
            bean.setValue(16);
            expect(16).assertEqual(bean.getValue());
        });
        it('setValue04', 0, () => {
            let bean = new MutableInteger(1);
            bean.setValue(34);
            expect(34).assertEqual(bean.getValue());
        });
        it('increment01', 0, () => {
            let bean = new MutableInteger(1);
            bean.increment();
            bean.increment();
            bean.increment();
            expect(4).assertEqual(bean.getValue());
        });
        it('increment02', 0, () => {
            let bean = new MutableInteger(2);
            bean.increment();
            bean.increment();
            bean.increment();
            expect(5).assertEqual(bean.getValue());
        });
        it('increment03', 0, () => {
            let bean = new MutableInteger(3);
            bean.increment();
            bean.increment();
            bean.increment();
            expect(6).assertEqual(bean.getValue());
        });
        it('increment04', 0, () => {
            let bean = new MutableInteger(5);
            bean.increment();
            bean.increment();
            bean.increment();
            expect(8).assertEqual(bean.getValue());
        });
        it('getTextEncoding01', 0, () => {
            let encodedText = new EncodedText({
                textEncoding: 1, value: [1, 23, 4, 67, 9], str: 'ARTIST'
            });
            encodedText.setTextEncoding(2, true);
            let getTextEncoding = encodedText.getTextEncoding();
            expect(getTextEncoding).assertEqual(2);
        });
        it('getTextEncoding02', 0, () => {
            let encodedText = new EncodedText({
                textEncoding: 7, value: [11, 3, 14, 34, 29], str: ''
            });
            encodedText.setTextEncoding(78, false);
            let getTextEncoding = encodedText.getTextEncoding();
            expect(getTextEncoding).assertEqual(78);
        });
        it('getTextEncoding03', 0, () => {
            let encodedText = new EncodedText({
                textEncoding: 571, value: [14, 2, 14, 556, 59], str: 'music'
            });
            encodedText.setTextEncoding(234, true);
            let getTextEncoding = encodedText.getTextEncoding();
            expect(getTextEncoding).assertEqual(234);
        });
        it('getTextEncoding04', 0, () => {
            let encodedText = new EncodedText({
                textEncoding: 76, value: [], str: ''
            });
            encodedText.setTextEncoding(6, false);
            let getTextEncoding = encodedText.getTextEncoding();
            expect(getTextEncoding).assertEqual(6);
        });
        it('toString01', 0, async () => {
            let encodedText = new EncodedText({
                textEncoding: 7, value: [3, 3, 14, 7], str: 'COMMENT'
            });
            let toString = encodedText.toString();
            expect(toString).assertEqual('COMMENT');
        });
        it('toString02', 0, () => {
            let encodedText = new EncodedText({
                textEncoding: 3, value: [], str: ''
            });
            let toString = encodedText.toString();
            expect(toString).assertEqual('');
        });
        it('toString03', 0, async () => {
            let encodedText = new EncodedText({
                textEncoding: 65, value: [65, 334, 65, 5], str: 'TIME'
            });
            let toString = encodedText.toString();
            expect(toString).assertEqual('TIME');
        });
        it('toString04', 0, () => {
            let encodedText = new EncodedText({
                textEncoding: 53, value: [9], str: ''
            });
            let toString = encodedText.toString();
            expect(toString).assertEqual('');
        });
        it('getTerminator01', 0, () => {
            let encodedText = new EncodedText({
                textEncoding: 17, value: [3, 33, 14, 17], str: 'COMMENT'
            });
            let getTerminator = encodedText.getTerminator();
            expect(getTerminator).assertUndefined();
        });
        it('getTerminator02', 0, () => {
            let encodedText = new EncodedText({
                textEncoding: 4, value: [], str: ''
            });
            let getTerminator = encodedText.getTerminator();
            expect(getTerminator).assertUndefined();
        });
        it('getTerminator03', 0, () => {
            let encodedText = new EncodedText({
                textEncoding: 123, value: [34, 56, 9, 9], str: 'o'
            });
            let getTerminator = encodedText.getTerminator();
            expect(getTerminator).assertUndefined();
        });
        it('getTerminator04', 0, () => {
            let encodedText = new EncodedText({
                textEncoding: 42, value: [5], str: 'string'
            });
            let getTerminator = encodedText.getTerminator();
            expect(getTerminator).assertUndefined();
        });
        it('getCharacterSet01', 0, () => {
            let encodedText = new EncodedText({
                textEncoding: 85, value: [33, 11, 32, 17], str: '(13)Pop'
            });
            let getCharacterSet = encodedText.getCharacterSet();
            expect(getCharacterSet).assertUndefined();
        });
        it('getCharacterSet02', 0, () => {
            let encodedText = new EncodedText({
                textEncoding: 3, value: [2, 5], str: ' '
            });
            let getCharacterSet = encodedText.getCharacterSet();
            expect(getCharacterSet).assertEqual('UTF-8');
        });
        it('getCharacterSet03', 0, () => {
            let encodedText = new EncodedText({
                textEncoding: 85, value: [33, 11, 32, 17], str: '(13)Pop'
            });
            let getCharacterSet = encodedText.getCharacterSet();
            expect(getCharacterSet).assertUndefined();
        });
        it('getCharacterSet04', 0, () => {
            let encodedText = new EncodedText({
                textEncoding: 3, value: [2, 5], str: '"\u03B3\u03B5\u03B9\u03AC \u03C3\u03BF\u03C5"'
            });
            let getCharacterSet = encodedText.getCharacterSet();
            expect(getCharacterSet).assertEqual('UTF-8');
        });
        it('append', 0, () => {
            let jList: any = new JList<any>();
            let append: any = jList.append(2);
            expect(append).assertUndefined();
        });
        it('front', 0, () => {
            let jList: any = new JList<any>();
            let front: any = jList.front();
            expect(front).assertUndefined();
        });
        it('ID3v23Tag_packFlags', 0, () => {
            let iD3v23Tag: ID3v23Tag = new ID3v23Tag();
            let packFlags: any = iD3v23Tag.packFlags([1], 2);
            expect(packFlags).assertUndefined();
        });
        it('ID3v23Tag_unpackFlags', 0, () => {
            let iD3v23Tag: ID3v23Tag = new ID3v23Tag();
            let bytes: Int8Array = new Int8Array([3, 23, 5, 452, 2, 13, 99]);
            let unpackFlags: any = iD3v23Tag.unpackFlags(bytes);
            expect(unpackFlags).assertUndefined();
        });
        it('ID3v24Tag_unpackFlags', 0, () => {
            let iD3v24Tag: ID3v24Tag = new ID3v24Tag();
            let bytes: Int8Array = new Int8Array([3, 23, 5, 452, 2, 13, 99]);
            let unpackFlags: any = iD3v24Tag.unpackFlags(bytes);
            expect(unpackFlags).assertUndefined();
        });
        it('ID3v24Tag_packFlags', 0, () => {
            let iD3v24Tag: ID3v24Tag = new ID3v24Tag();
            let packFlags: any = iD3v24Tag.packFlags([1, 2, 3, 4, 5, 6, 7], 2);
            expect(packFlags).assertUndefined();
        });
        it('ID3v24Tag_getRecordingTime', 0, () => {
            let iD3v24Tag: ID3v24Tag = new ID3v24Tag();
            let getRecordingTime: any = iD3v24Tag.getRecordingTime();
            expect(getRecordingTime).assertEqual(null);
        });
        it('ID3v22Tag_getRecordingTime', 0, () => {
            let iD3v22Tag: ID3v22Tag = new ID3v22Tag();
            let bytes: Int8Array = new Int8Array([3, 23, 5, 452, 2, 13, 99]);
            let getRecordingTime: any = iD3v22Tag.unpackFlags(bytes);
            expect(getRecordingTime).assertUndefined();
        });
        it('ID3v22Tag_packFlags', 0, () => {
            let iD3v22Tag: ID3v22Tag = new ID3v22Tag();
            let packFlags: any = iD3v22Tag.packFlags([4, 5, 26, 17], 12);
            expect(packFlags).assertUndefined();
        });
        it('ID3v2ObseleteFrame_packFlags1', 0, () => {
            let bytes: Int8Array = new Int8Array([3, 23, 5, 452, 2, 13, 99]);
            let iD3v2ObseleteFrame: ID3v2ObseleteFrame = new ID3v2ObseleteFrame('1', bytes);
            let packFlags: any = iD3v2ObseleteFrame.getLength();
            expect(packFlags).assertEqual(13);
        });
        it('ID3v2ObseleteFrame_packFlags2', 0, () => {
            let bytes: Int8Array = new Int8Array([3, 23, 5, 99]);
            let iD3v2ObseleteFrame: ID3v2ObseleteFrame = new ID3v2ObseleteFrame('13A', bytes);
            let packFlags: any = iD3v2ObseleteFrame.getLength();
            expect(packFlags).assertEqual(10);
        });
        it('ID3v2ObseleteFrame_packFlags3', 0, () => {
            let bytes: Int8Array = new Int8Array([]);
            let iD3v2ObseleteFrame: ID3v2ObseleteFrame = new ID3v2ObseleteFrame('558', bytes);
            let packFlags: any = iD3v2ObseleteFrame.getLength();
            expect(packFlags).assertEqual(6);
        });
        it('ID3v2ObseleteFrame_packFlags4', 0, () => {
            let bytes: Int8Array = new Int8Array([1]);
            let iD3v2ObseleteFrame: ID3v2ObseleteFrame = new ID3v2ObseleteFrame('str', bytes);
            let packFlags: any = iD3v2ObseleteFrame.getLength();
            expect(packFlags).assertEqual(7);
        });
    });
}
