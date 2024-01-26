let __generate__Id: number = 0;
function generateId(): string {
    return "bigData.test_" + ++__generate__Id;
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
import base64 from 'base64-js';
import { describe, it, expect } from '@ohos/hypium';
function equal(a: any, b: any) {
    let i: number;
    const length: number = a.length;
    if (length !== b.length)
        return false;
    for (i = 0; i < length; ++i) {
        if (a[i] !== b[i])
            return false;
    }
    return true;
}
export default function bigDataTest() {
    describe('bag_data_test', () => {
        it('convert_big_data_to_base64', 0, () => {
            let big = new Uint8Array(64);
            for (let i: number = 0, length: number = big.length; i < length; ++i) {
                big[i] = i % 2;
            }
            let b64str = base64.fromByteArray(big);
            let arr = base64.toByteArray(b64str);
            expect(equal(arr, big)).assertTrue();
            expect(base64.byteLength(b64str)).assertDeepEquals(arr.length);
        });
    });
}
