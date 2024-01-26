let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
export default function abilityTest() {
    //“this is a example” 的byte编码
    let example = 'dGhpcyBpcyBhIGV4YW1wbGU=';
    describe('ActsAbilityTest', () => {
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
        it('byteLength', 0, () => {
            let length = base64.byteLength(example);
            expect(length).assertEqual(17);
        });
        it('byteLength_err', 0, () => {
            try {
                let length = base64.byteLength("aaa");
                expect(length).assertEqual(3);
            }
            catch (e) {
                expect(e.message).assertEqual('Invalid string. Length must be a multiple of 4');
            }
        });
        it('toByteArray_err', 0, () => {
            try {
                let byteArray = base64.toByteArray("aaa");
                expect(JSON.stringify(byteArray)).assertEqual("");
            }
            catch (e) {
                expect(e.message).assertEqual('Invalid string. Length must be a multiple of 4');
            }
        });
        it('toByteArray', 0, () => {
            let byteArray = base64.toByteArray(example);
            expect(JSON.stringify(byteArray))
                .assertEqual('{"0":116,"1":104,"2":105,"3":115,"4":32,"5":105,"6":115,"7":32,"8":97,"9":32,"10":101,"11":120,"12":97,"13":109,"14":112,"15":108,"16":101}');
        });
        it('fromByteArray', 0, () => {
            let fromByteArray = base64.fromByteArray(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]));
            expect(fromByteArray).assertEqual('AQIDBAUGBwg=');
        });
        it('fromByteArray_err', 0, () => {
            try {
                base64.fromByteArray(null);
            }
            catch (e) {
                expect(e.message).assertEqual('Cannot read property length of null');
            }
        });
    });
}
