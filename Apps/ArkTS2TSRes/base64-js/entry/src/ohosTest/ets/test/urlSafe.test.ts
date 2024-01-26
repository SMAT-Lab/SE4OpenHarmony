let __generate__Id: number = 0;
function generateId(): string {
    return "urlSafe.test_" + ++__generate__Id;
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
export default function urlSafeTest() {
    describe('urlSafeTest', () => {
        it('decode_url_safe_style_base64_strings', 0, () => {
            const expected = [0xff, 0xff, 0xbe, 0xff, 0xef, 0xbf, 0xfb, 0xef, 0xff];
            let str = '//++/++/++//';
            let actual = b64.toByteArray(str);
            for (let i = 0; i < actual.length; i++) {
                expect(actual[i]).assertEqual(expected[i]);
            }
            expect(b64.byteLength(str)).assertEqual(actual.length);
            str = '__--_--_--__';
            actual = b64.toByteArray(str);
            for (let i = 0; i < actual.length; i++) {
                expect(actual[i]).assertEqual(expected[i]);
            }
            expect(b64.byteLength(str)).assertEqual(actual.length);
        });
    });
}
