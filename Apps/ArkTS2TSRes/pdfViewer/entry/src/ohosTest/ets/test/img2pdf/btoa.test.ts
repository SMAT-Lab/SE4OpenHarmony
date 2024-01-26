let __generate__Id: number = 0;
function generateId(): string {
    return "btoa.test_" + ++__generate__Id;
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
import fs from '@ohos.file.fs';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import btoa from '@ohos/img2pdf/src/main/ets/components/btoa/btoa';
const BASE_COUNT: number = 2000;
export default function btoaTest() {
    describe('BtoaTest', () => {
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
        it('btoaTest_string', 0, () => {
            let encoded = "SGVsbG8sIBZM";
            let unencoded = "Hello, 世界";
            expect(btoa(unencoded)).assertEqual(encoded);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                btoa(unencoded);
            }
            endTime(startTime, 'image_rotation_45');
        });
    });
}
function endTime(startTime: number, tag: string) {
    let endTime: number = new Date().getTime();
    let averageTime = ((endTime - startTime) * 1000 / BASE_COUNT);
    console.info(tag + ":endTime:" + endTime);
    console.log(tag + ":averageTime:" + averageTime + "μs");
}
