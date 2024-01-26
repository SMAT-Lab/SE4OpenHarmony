let __generate__Id: number = 0;
function generateId(): string {
    return "qrCodeGenerator.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * - The above copyright notice and this permission notice shall be included in
 *   all copies or substantial portions of the Software.
 * - The Software is provided "as is", without warranty of any kind, express or
 *   implied, including but not limited to the warranties of merchantability,
 *   fitness for a particular purpose and noninfringement. In no event shall the
 *   authors or copyright holders be liable for any claim, damages or other
 *   liability, whether in an action of contract, tort or otherwise, arising from,
 *   out of or in connection with the Software or the use or other dealings in the
 *   Software.
 */
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { qrcodegen } from '@ohos/qr-code-generator';
export default function qrCodeGeneratorTest() {
    describe('qrCodeGeneratorTest1', () => {
        // Defines a test suite. Two parameters are supported: test suite name and test suite function.
        beforeAll(() => {
            // Presets an action, which is performed only once before all test cases of the test suite start.
            // This API supports only one parameter: preset action function.
        });
        beforeEach(() => {
            // Presets an action, which is performed before each unit test case starts.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: preset action function.
        });
        afterEach(() => {
            // Presets a clear action, which is performed after each unit test case ends.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: clear action function.
        });
        afterAll(() => {
            // Presets a clear action, which is performed after all test cases of the test suite end.
            // This API supports only one parameter: clear action function.
        });
        it('encodeText', 0, () => {
            let qrcode: qrcodegen.QrCode = qrcodegen.QrCode.encodeText("Hello, world!", qrcodegen.QrCode.Ecc.MEDIUM);
            expect(qrcode.size).assertEqual(21);
            expect(qrcode.mask).assertEqual(2);
            expect(qrcode.version).assertEqual(1);
            expect(qrcode.getModule(1, 6)).assertTrue();
        });
        it('encodeBinary', 1, () => {
            let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            let qrcode: qrcodegen.QrCode = qrcodegen.QrCode.encodeBinary(array, qrcodegen.QrCode.Ecc.MEDIUM);
            expect(qrcode.size).assertEqual(21);
            expect(qrcode.mask).assertEqual(7);
            expect(qrcode.version).assertEqual(1);
            expect(qrcode.getModule(1, 6)).assertTrue();
        });
        it('makeSegments', 2, () => {
            let str: string = "Hello, world!";
            let Segments: Array<qrcodegen.QrSegment> = qrcodegen.QrSegment.makeSegments(str);
            let result: boolean = Segments ? true : false;
            expect(result).assertTrue();
        });
        it('makeNumeric', 3, () => {
            let str: string = "6180339887498948482045868343656381177203091798057628621354486227052604628189024497072072041893911374";
            let Segments: qrcodegen.QrSegment = qrcodegen.QrSegment.makeNumeric(str);
            let array = [1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0,
                1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1,
                1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0,
                1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0,
                0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1,
                0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1,
                0, 1, 0, 0];
            expect(Segments.getData().toString()).assertEqual(array.toString());
            expect(Segments.numChars).assertEqual(100);
        });
        it('makeAlphanumeric', 4, () => {
            let str: string = "......";
            let Segments: qrcodegen.QrSegment = qrcodegen.QrSegment.makeAlphanumeric(str);
            let array = [1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0];
            expect(Segments.getData().toString()).assertEqual(array.toString());
            expect(Segments.numChars).assertEqual(6);
        });
        it('makeEci', 5, () => {
            let str: number = 2;
            let Segments: qrcodegen.QrSegment = qrcodegen.QrSegment.makeEci(str);
            let array = [0, 0, 0, 0, 0, 0, 1, 0];
            expect(Segments.getData().toString()).assertEqual(array.toString());
            expect(Segments.numChars).assertEqual(0);
        });
        it('encodeSegments', 6, () => {
            let str: string = "6180339887498948482045868343656381177203091798057628621354486227052604628189024497072072041893911374";
            let str1: string = "......";
            let segs = [
                qrcodegen.QrSegment.makeNumeric(str),
                qrcodegen.QrSegment.makeAlphanumeric(str1)
            ];
            let qrcode: qrcodegen.QrCode = qrcodegen.QrCode.encodeSegments(segs, qrcodegen.QrCode.Ecc.MEDIUM);
            expect(qrcode.size).assertEqual(33);
            expect(qrcode.mask).assertEqual(2);
            expect(qrcode.version).assertEqual(4);
            expect(qrcode.getModule(1, 6)).assertTrue();
        });
        it('makeBytes', 7, () => {
            let str: string = "Golden ratio \u03C6 = 1.";
            let Segments: qrcodegen.QrSegment = qrcodegen.QrSegment.makeBytes(str2UTF8(str));
            let array = [0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0,
                1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1,
                0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0];
            expect(Segments.getData().toString()).assertEqual(array.toString());
            expect(Segments.numChars).assertEqual(20);
        });
    });
    let str2UTF8 = (str: string) => {
        let bytes: Array<number> = new Array();
        let len: number = 0;
        let c: number = 0;
        len = str.length;
        for (let i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if (c >= 0x010000 && c <= 0x10FFFF) {
                bytes.push(((c >> 18) & 0x07) | 0xF0);
                bytes.push(((c >> 12) & 0x3F) | 0x80);
                bytes.push(((c >> 6) & 0x3F) | 0x80);
                bytes.push((c & 0x3F) | 0x80);
            }
            else if (c >= 0x000800 && c <= 0x00FFFF) {
                bytes.push(((c >> 12) & 0x0F) | 0xE0);
                bytes.push(((c >> 6) & 0x3F) | 0x80);
                bytes.push((c & 0x3F) | 0x80);
            }
            else if (c >= 0x000080 && c <= 0x0007FF) {
                bytes.push(((c >> 6) & 0x1F) | 0xC0);
                bytes.push((c & 0x3F) | 0x80);
            }
            else {
                bytes.push(c & 0xFF);
            }
        }
        return bytes;
    };
}
