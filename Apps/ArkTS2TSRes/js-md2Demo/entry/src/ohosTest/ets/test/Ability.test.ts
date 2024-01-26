let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
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
import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import md2 from 'js-md2';
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
        it('md2', 0, () => {
            // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
            /* hilog.info(0x0000, 'testTag', '%{public}s', 'it begin');
             let a = 'abc'
             let b = 'b'
             // Defines a variety of assertion methods, which are used to declare expected boolean conditions.
             expect(a).assertContain(b)
             expect(a).assertEqual(a)*/
            let s1: string = md2(''); // 8350e5a3e24c153df2275c9f80692773
            console.log("md2==========" + s1);
            let s2: string = md2('The quick brown fox jumps over the lazy dog'); // 03d85a0d629d2c442e987525319fc471
            let s3: string = md2('The quick brown fox jumps over the lazy dog.'); // 71eaa7e440b611e41a6f0d97384b342a
            expect(s1).assertEqual('8350e5a3e24c153df2275c9f80692773');
            expect(s2).assertEqual('03d85a0d629d2c442e987525319fc471');
            expect(s3).assertEqual('71eaa7e440b611e41a6f0d97384b342a');
        });
    });
}
