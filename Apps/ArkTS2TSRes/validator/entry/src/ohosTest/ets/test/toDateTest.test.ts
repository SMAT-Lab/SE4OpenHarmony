let __generate__Id: number = 0;
function generateId(): string {
    return "toDateTest.test_" + ++__generate__Id;
}
/**
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
import validator from 'validator';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
export default function toDateTest() {
    describe('toDateTest', () => {
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
        it('toDate1', 0, () => {
            let result: Date = validator.toDate("2022/12/05");
            expect(result.toString()).assertEqual("Mon Dec 05 2022 00:00:00 GMT+0800");
        });
        it('toDate2', 0, () => {
            let result: Date = validator.toDate("2022-12-05");
            expect(result.toString()).assertEqual("Mon Dec 05 2022 08:00:00 GMT+0800");
        });
        it('toDate3', 0, () => {
            let result: Date = validator.toDate("2007-04-06T00:00");
            expect(result.toString()).assertEqual("Fri Apr 06 2007 00:00:00 GMT+0800");
        });
        it('toDate4', 0, () => {
            let result: Date = validator.toDate("2010-02-18T16:23:48.5");
            expect(result.toString()).assertEqual("Thu Feb 18 2010 16:23:48 GMT+0800");
        });
        it('toDate5', 0, () => {
            let result: Date = validator.toDate("2007-05-19 14:34:23");
            expect(result.toString()).assertEqual("Sat May 19 2007 14:34:23 GMT+0800");
        });
    });
}
