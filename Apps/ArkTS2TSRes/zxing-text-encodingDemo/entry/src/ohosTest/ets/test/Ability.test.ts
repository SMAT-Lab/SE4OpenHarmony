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
import { TextDecoder, TextEncoder } from '@zxing/text-encoding';
export default function abilityTest() {
    describe('TextEncodingTest', () => {
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
        it('testEncode', 0, () => {
            const expected = '0123456789';
            const encoded = new TextEncoder('utf-8').encode('0123456789');
            const decodedArray = new TextDecoder('utf-8').decode(encoded);
            expect(decodedArray).assertEqual(expected);
        });
        it('testDecode', 0, () => {
            const expected = '0123456789';
            const encoded = new TextEncoder('utf-8').encode('0123456789');
            const decodedBuffer = new TextDecoder('utf-8').decode(encoded.buffer);
            expect(decodedBuffer).assertEqual(expected);
        });
    });
}
