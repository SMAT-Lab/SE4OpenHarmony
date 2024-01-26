let __generate__Id: number = 0;
function generateId(): string {
    return "isISBN.test_" + ++__generate__Id;
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import validator from 'validator';
import { SBNOptions } from './isSBNType';
export default function isISBNTest() {
    describe('isISBN', () => {
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
        let test = (options: SBNOptions) => {
            const args = options.args || [];
            args.unshift(null);
            // if (options.error) {
            //   options.error.forEach((error) => {
            //     args[0] = error;
            //
            //     try {
            //       expect(validator[options.validator](...args)).assertFail()
            //     } catch (err) {
            //       console.log(`ValidatorsTest validator.${options.validator}(${args}) ` + err)
            //     }
            //   });
            // }
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
        it('should_validate_ISBNs', 0, () => {
            let option1: SBNOptions = new SBNOptions();
            option1.validator = 'isISBN';
            option1.args = [{
                    version: 10
                }];
            option1.invalid = [
                '3423214121', '3-423-21412-1', '3 423 21412 1',
                '978-3836221191', '9783836221191',
                '123456789a', 'foo', '',
            ];
            test(option1);
            let option2: SBNOptions = new SBNOptions();
            option2.validator = 'isISBN';
            option2.args = [{
                    version: 13
                }];
            option2.valid = [
                '9783836221191', '978-3-8362-2119-1', '978 3 8362 2119 1',
                '9783401013190', '978-3401013190', '978 3401013190',
                '9784873113685', '978-4-87311-368-5', '978 4 87311 368 5',
            ];
            option2.invalid = [
                '9783836221190', '978-3-8362-2119-0', '978 3 8362 2119 0',
                '3836221195', '3-8362-2119-5', '3 8362 2119 5',
                '01234567890ab', 'foo', '',
            ];
            test(option2);
            let option3: SBNOptions = new SBNOptions();
            option3.validator = 'isISBN';
            option3.valid = [
                '340101319X',
                '9784873113685',
            ];
            option3.invalid = [
                '3423214121',
                '9783836221190',
            ];
            test(option3);
            let option4: SBNOptions = new SBNOptions();
            option4.validator = 'isISBN';
            option4.args = [{
                    version: 'foo'
                }];
            option4.invalid = [
                '340101319X',
                '9784873113685',
            ];
            test(option4);
        });
    });
}
