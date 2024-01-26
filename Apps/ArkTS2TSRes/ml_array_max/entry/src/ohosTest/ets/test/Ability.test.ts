let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import max from "ml-array-max";
const typedArray = new Uint16Array(3);
typedArray[0] = 1;
typedArray[1] = 2;
typedArray[2] = 3;
export default function abilityTest() {
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
        it('maxTest1', 0, () => {
            expect(max([0])).assertEqual(0);
        });
        it('maxTest2', 0, () => {
            expect(max([1])).assertEqual(1);
        });
        it('maxTest3', 0, () => {
            expect(max([-1.4, 2])).assertEqual(2);
        });
        it('maxTest4', 0, () => {
            expect(max([1, 2, -1])).assertEqual(2);
        });
        it('maxTest5', 0, () => {
            expect(max([3, -2, 1.2])).assertEqual(3);
        });
        it('maxTest6', 0, () => {
            expect(max([3, 2, 1], { fromIndex: 0, toIndex: 2 })).assertEqual(3);
            expect(max([3.5, 2, 1], { fromIndex: 0, toIndex: 3 })).assertEqual(3.5);
            expect(max([3, 2.5, 1], { fromIndex: 1, toIndex: 3 })).assertEqual(2.5);
            expect(max([3, -2, 1], { fromIndex: 0, toIndex: 2 })).assertEqual(3);
            expect(max([3, -2.5, 1], { fromIndex: 2, toIndex: 3 })).assertEqual(1);
            expect(max(typedArray)).assertEqual(3);
            expect(max(typedArray, { fromIndex: 0, toIndex: 2 })).assertEqual(2);
            expect(max(typedArray, { fromIndex: 0, toIndex: 3 })).assertEqual(3);
        });
        it('should_throw_on_invalid_value', 0, () => {
            try {
                max([1, 2, 3], { fromIndex: -1, toIndex: 2 });
            }
            catch (e) {
                expect(e.message).assertEqual('fromIndex must be a positive integer smaller than length');
            }
            try {
                max([1, 2, 3], { fromIndex: 4, toIndex: 2 });
            }
            catch (e) {
                expect(e.message).assertEqual('fromIndex must be a positive integer smaller than length');
            }
            try {
                max([1, 2, 3], { fromIndex: 3, toIndex: 3 });
            }
            catch (e) {
                expect(e.message).assertEqual('fromIndex must be a positive integer smaller than length');
            }
            try {
                max([1, 2, 3], { fromIndex: 1, toIndex: 0 });
            }
            catch (e) {
                expect(e.message).assertEqual('toIndex must be an integer greater than fromIndex and at most equal to length');
            }
            try {
                max([1, 2, 3], { fromIndex: 1, toIndex: 4 });
            }
            catch (e) {
                expect(e.message).assertEqual('toIndex must be an integer greater than fromIndex and at most equal to length');
            }
            try {
                max([1, 2, 3], { fromIndex: 0, toIndex: 1.5 });
            }
            catch (e) {
                expect(e.message).assertEqual('toIndex must be an integer greater than fromIndex and at most equal to length');
            }
            try {
                max([1, 2, 3], { fromIndex: 1.5, toIndex: 2 });
            }
            catch (e) {
                expect(e.message).assertEqual('fromIndex must be a positive integer smaller than length');
            }
        });
    });
}
