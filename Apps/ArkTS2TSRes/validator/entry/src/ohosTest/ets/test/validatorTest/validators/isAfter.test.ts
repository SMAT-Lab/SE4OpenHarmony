let __generate__Id: number = 0;
function generateId(): string {
    return "isAfter.test_" + ++__generate__Id;
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
import { AfterOptions } from './isAfterType';
export default function isAfterTest() {
    describe('isAfter', () => {
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
        let test = (options: AfterOptions) => {
            const args = options.args || [];
            args.unshift(null);
            if (options.valid) {
                options.valid.forEach((valid) => {
                    args[0] = valid;
                    let resule: boolean = validator[options.validator](...args);
                    expect(resule).assertTrue();
                });
            }
            if (options.invalid) {
                options.invalid.forEach((invalid) => {
                    args[0] = invalid;
                    let resule: boolean = validator[options.validator](...args);
                    expect(resule).assertFalse();
                });
            }
        };
        it('should_validate_dates_against_a_start_date', 0, () => {
            test({
                validator: 'isAfter',
                args: [{
                        comparisonDate: '2011-08-03'
                    }],
                valid: ['2011-08-04', new Date(2011, 8, 10).toString()],
                invalid: ['2010-07-02', '2011-08-03', new Date(0).toString(), 'foo'],
            });
            test({
                validator: 'isAfter',
                valid: ['2100-08-04', new Date(Date.now() + 86400000).toString()],
                invalid: ['2010-07-02', new Date(0).toString()],
            });
            test({
                validator: 'isAfter',
                args: [{
                        comparisonDate: '2011-08-03'
                    }],
                valid: ['2015-09-17'],
                invalid: ['invalid date'],
            });
            test({
                validator: 'isAfter',
                args: [{
                        comparisonDate: 'invalid date'
                    }],
                invalid: ['invalid date', '2015-09-17'],
            });
            test({
                validator: 'isAfter',
                args: ['2011-08-03'],
                valid: ['2011-08-04', new Date(2011, 8, 10).toString()],
                invalid: ['2010-07-02', '2011-08-03', new Date(0).toString(), 'foo'],
            });
            test({
                validator: 'isAfter',
                valid: ['2100-08-04', new Date(Date.now() + 86400000).toString()],
                invalid: ['2010-07-02', new Date(0).toString()],
            });
            test({
                validator: 'isAfter',
                args: ['2011-08-03'],
                valid: ['2015-09-17'],
                invalid: ['invalid date'],
            });
            test({
                validator: 'isAfter',
                args: ['invalid date'],
                invalid: ['invalid date', '2015-09-17'],
            });
        });
    });
}
