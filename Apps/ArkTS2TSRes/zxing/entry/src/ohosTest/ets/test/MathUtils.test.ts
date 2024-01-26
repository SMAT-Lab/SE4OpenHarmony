let __generate__Id: number = 0;
function generateId(): string {
    return "MathUtils.test_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { MathUtils } from '@ohos/zxing';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
const BASE_COUNT: number = 2000;
export default function mathUtilsTest() {
    const EPSILON: number /*float*/ = 1.0E-8;
    describe('MathUtilsTest', () => {
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
        it('testRound', 0, () => {
            expect(MathUtils.round(-1.0)).assertEqual(-1);
            expect(MathUtils.round(0.0)).assertEqual(0);
            expect(MathUtils.round(1.0)).assertEqual(1);
            expect(MathUtils.round(1.9)).assertEqual(2);
            expect(MathUtils.round(2.1)).assertEqual(2);
            expect(MathUtils.round(2.5)).assertEqual(3);
            expect(MathUtils.round(-1.9)).assertEqual(-2);
            expect(MathUtils.round(-2.1)).assertEqual(-2);
            expect(MathUtils.round(-2.5)).assertEqual(-3);
            expect(MathUtils.round(Number.MAX_SAFE_INTEGER)).assertEqual(Number.MAX_SAFE_INTEGER);
            expect(MathUtils.round(Number.MIN_SAFE_INTEGER)).assertEqual(Number.MIN_SAFE_INTEGER);
            expect(MathUtils.round(Number.POSITIVE_INFINITY)).assertEqual(Number.MAX_SAFE_INTEGER);
            expect(MathUtils.round(Number.NEGATIVE_INFINITY)).assertEqual(Number.MIN_SAFE_INTEGER);
            // expect(MathUtils.round(NaN)).assertEqual(0)
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                MathUtils.round(Number.MIN_SAFE_INTEGER);
            }
            endTime(startTime, 'testAsciiStandardDecode');
        });
        it('testDistance', 0, () => {
            expect(Math.abs(MathUtils.distance(1.0, 2.0, 3.0, 4.0) - /*(float) */ Math.sqrt(8.0)) < EPSILON).assertTrue();
            expect(Math.abs(MathUtils.distance(1.0, 2.0, 1.0, 2.0) - 0.0) < EPSILON).assertTrue();
            expect(Math.abs(MathUtils.distance(1, 2, 3, 4) - /*(float) */ Math.sqrt(8.0)) < EPSILON).assertTrue();
            expect(Math.abs(MathUtils.distance(1, 2, 1, 2) - 0.0) < EPSILON).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                MathUtils.distance(1.0, 2.0, 3.0, 4.0);
            }
            endTime(startTime, 'testDistance');
        });
        it('testSum', 0, () => {
            expect(MathUtils.sum(Int32Array.from([]))).assertEqual(0);
            expect(MathUtils.sum(Int32Array.from([1]))).assertEqual(1);
            expect(MathUtils.sum(Int32Array.from([1, 3]))).assertEqual(4);
            expect(MathUtils.sum(Int32Array.from([-1, 1]))).assertEqual(0);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                MathUtils.sum(Int32Array.from([]));
            }
            endTime(startTime, 'testSum');
        });
    });
}
function endTime(startTime: number, tag: string) {
    console.log(tag + ":startTime:" + startTime);
    let endTime: number = new Date().getTime();
    let averageTime = ((endTime - startTime) * 1000 / BASE_COUNT);
    console.log(tag + ":endTime:" + endTime);
    console.log(tag + ":averageTime:" + averageTime + "μs");
}
