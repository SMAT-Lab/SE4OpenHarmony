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
import leven from 'leven';
export default function abilityTest() {
    describe('LevenTest', () => {
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
        it('leven', 0, () => {
            let test1: string = "ABCDEF";
            let test2: string = "ABCDGH";
            let s: number = leven(test1, test2);
            expect(2).assertEqual(s);
            let s1: number = leven('a', 'b');
            expect(1).assertEqual(s1);
            let s2: number = leven('ab', 'ac');
            expect(1).assertEqual(s2);
            let s3: number = leven('abc', 'axc');
            expect(1).assertEqual(s3);
            let s4: number = leven('kitten', 'sitting');
            expect(3).assertEqual(s4);
            let s5: number = leven('xabxcdxxefxgx', '1ab2cd34ef5g6');
            expect(6).assertEqual(s5);
            let s6: number = leven('cat', 'cow');
            expect(2).assertEqual(s6);
            let s7: number = leven('distance', 'difference');
            expect(5).assertEqual(s7);
            let s8: number = leven('因為我是中國人所以我會說中文', '因為我是英國人所以我會說英文');
            expect(2).assertEqual(s8);
        });
    });
}
