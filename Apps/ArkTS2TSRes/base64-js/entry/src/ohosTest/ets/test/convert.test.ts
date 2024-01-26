let __generate__Id: number = 0;
function generateId(): string {
    return "convert.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import b64 from 'base64-js';
import { describe, it, expect } from '@ohos/hypium';
const checks = [
    'a',
    'aa',
    'aaa',
    'hi',
    'hi!',
    'hi!!',
    'sup',
    'sup?',
    'sup?!'
];
function equal(a: any, b: any) {
    let i: number;
    const length: number = a.length;
    if (length !== b.length)
        return false;
    for (i = 0; i < length; ++i) {
        if ((a[i] & 0xFF) !== (b[i] & 0xFF))
            return false;
    }
    return true;
}
function map(arr: any, callback: any): any[] {
    const res: any[] = [];
    let kValue: any;
    let mappedValue: any;
    for (let k: number = 0, len: number = arr.length; k < len; k++) {
        if ((typeof arr === 'string' && !!arr.charAt(k))) {
            kValue = arr.charAt(k);
            mappedValue = callback(kValue, k, arr);
            res[k] = mappedValue;
        }
        else if (typeof arr !== 'string' && arr.indexOf(k)) {
            kValue = arr[k];
            mappedValue = callback(kValue, k, arr);
            res[k] = mappedValue;
        }
    }
    return res;
}
export default function convertTest() {
    describe('convertTest', () => {
        it('convert_to_base64_and_back', 0, () => {
            for (let i = 0; i < checks.length; i++) {
                const check = checks[i];
                const b64Str = b64.fromByteArray(new Uint8Array(map(check, (char: any): any => {
                    return char.charCodeAt(0);
                })));
                const arr = b64.toByteArray(b64Str);
                expect(b64.byteLength(b64Str)).assertEqual(arr.length);
            }
        });
        const data = [
            [[0, 0, 0], 'AAAA'],
            [[0, 0, 1], 'AAAB'],
            [[0, 1, -1], 'AAH/'],
            [[1, 1, 1], 'AQEB'],
            [[0, -73, 23], 'ALcX']
        ];
        it('convert_known_data_to_string', 0, () => {
            for (let i = 0; i < data.length; i++) {
                const bytes: any = data[i][0];
                const expected: any = data[i][1];
                const actual = b64.fromByteArray(new Uint8Array(bytes));
                expect(actual).assertEqual(expected);
            }
        });
        it('convert_known_data_from_string', 0, () => {
            for (let i = 0; i < data.length; i++) {
                const expected: any = data[i][0];
                const string: any = data[i][1];
                const actual = b64.toByteArray(string);
                expect(equal(actual, expected)).assertTrue();
                const length: any = b64.byteLength(string);
                expect(length).assertEqual(expected.length);
            }
        });
    });
}
