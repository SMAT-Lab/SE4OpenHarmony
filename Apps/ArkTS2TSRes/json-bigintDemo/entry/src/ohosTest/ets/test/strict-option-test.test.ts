let __generate__Id: number = 0;
function generateId(): string {
    return "strict-option-test.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@ohos/hypium';
import jsonBig from 'json-bigint';
import { jsonBigTpye } from '../../../main/ets/pages/index.ts';
export default function strict_option_test() {
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
    describe("Testing_strict_option", () => {
        let dupkeys = '{ "dupkey": "value 1", "dupkey": "value 2"}';
        it("Should_show_that_the_strict_option_will_failfast_on_duplicate_keys", 0, () => {
            let bigIntStrict: jsonBigTpye = jsonBig({
                strict: true
            });
            let result: string = 'before';
            let tryParse = () => {
                result = bigIntStrict.parse(dupkeys);
            };
            expect(tryParse).not().assertThrowError('Duplicate key "dupkey"');
            expect(result).assertEqual('before');
        });
    });
}
