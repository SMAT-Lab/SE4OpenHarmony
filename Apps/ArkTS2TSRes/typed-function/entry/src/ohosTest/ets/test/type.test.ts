let __generate__Id: number = 0;
function generateId(): string {
    return "type.test_" + ++__generate__Id;
}
/*
 * MIT License
 *
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import typed from 'typed-function';
export default function typeTest() {
    describe('ActsTypeTest', () => {
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
        it('string', 0, () => {
            let fn: any = typed({
                string: (value: string) => {
                    return 'string:' + value;
                }
            });
            expect("string:foo").assertEqual(fn("foo"));
        });
        it('number', 0, () => {
            let fn: any = typed({
                number: (value: number) => {
                    return 'number:' + value;
                }
            });
            expect("number:12").assertEqual(fn(12));
        });
        it('boolean', 0, () => {
            let fn: any = typed({
                boolean: (value: boolean) => {
                    return 'boolean:' + value;
                }
            });
            expect("boolean:true").assertEqual(fn(true));
        });
        it('number_number', 0, () => {
            let fn: any = typed({
                'number,number': () => {
                    return 'number,number';
                }
            });
            expect("number,number").assertEqual(fn(12, 12));
        });
        it('string_string', 0, () => {
            let fn: any = typed({
                'string,string': () => {
                    return 'string,string';
                }
            });
            expect("string,string").assertEqual(fn("foo", "bar"));
        });
        it('Array_string', 0, () => {
            let fn: any = typed({
                'Array,string': () => {
                    return 'Array,string';
                }
            });
            expect("Array,string").assertEqual(fn([], "foo"));
        });
        it('number_number_string', 0, () => {
            let fn: any = typed({
                'number,number,string': () => {
                    return 'three';
                }
            });
            expect("three").assertEqual(fn(12, 12, "foo"));
        });
        it('compose1', 0, () => {
            let fn: any = typed({
                'string | number, boolean': () => { return 'A'; },
                'boolean, boolean | number': () => { return 'B'; },
                string: () => { return 'C'; }
            });
            expect("A").assertEqual(fn('str', false));
        });
        it('compose2', 0, () => {
            let fn: any = typed({
                'string | number, boolean': () => { return 'A'; },
                'boolean, boolean | number': () => { return 'B'; },
                string: () => { return 'C'; }
            });
            expect("B").assertEqual(fn(false, true));
        });
        it('compose3', 0, () => {
            let fn: any = typed({
                'string | number, boolean': () => { return 'A'; },
                'boolean, boolean | number': () => { return 'B'; },
                string: () => { return 'C'; }
            });
            expect("C").assertEqual(fn('str'));
        });
        it('onMismatch1', 0, () => {
            let square: any = typed('square', {
                number: (x: number) => x * x,
                string: (s: string) => s + s
            });
            typed.onMismatch = () => 42;
            expect(25).assertEqual(square(5));
        });
        it('onMismatch2', 0, () => {
            let square: any = typed('square', {
                number: (x: number) => x * x,
                string: (s: string) => s + s
            });
            typed.onMismatch = () => 42;
            expect(42).assertEqual(square([13]));
        });
        it('onMismatch3', 0, () => {
            let square: any = typed('square', {
                number: (x: number) => x * x,
                string: (s: string) => s + s
            });
            typed.onMismatch = () => 42;
            expect('yoyo').assertEqual(square('yo'));
        });
    });
}
