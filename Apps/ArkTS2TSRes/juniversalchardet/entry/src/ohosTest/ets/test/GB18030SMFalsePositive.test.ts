let __generate__Id: number = 0;
function generateId(): string {
    return "GB18030SMFalsePositive.test_" + ++__generate__Id;
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { UniversalDetector } from '@ohos/juniversalchardet';
import { typedArrayToBuffer } from './ArrayToBuffer';
export default function GB18030SMFalsePositiveTest() {
    describe('GB18030SMFalsePositiveTest', () => {
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
        it('testFalsePositiveBug11', 0, () => {
            let buf = new Int8Array([91, -80, 52, -80, 48, -80, 84, -80, 67, -80, 67, -80, 48, -80, 67, -80, 84]);
            let detector = new UniversalDetector();
            detector.handleData(typedArrayToBuffer(buf), 0, buf.length);
            detector.dataEnd();
            let encoding = detector.getDetectedCharset();
            detector.reset();
            expect("GB18030").assertEqual(encoding);
        });
        it('testFalsePositiveBug9', 1, () => {
            let buf = new Int8Array([87, 121, 107, 97, 109, 111, 108, 44, -93, 53, 56, 56, 46, 57, 53, 44, 48, 46, 49, 56, 44, 48, 46, 49, 50, 44, 116, 101, 115, 116, 105, 110, 103, 83, 112, 101, 99, 105, 97, 108, 105, 115, 101, 100, 32, 80, 114, 111, 100, 117, 99, 116, 115, 32, 102, 111, 114, 32, 68, 73, 89, 32, 97, 110, 100, 32, 80, 114, 111, 102, 101, 115, 115, 105, 111, 110, 97, 108, 115, -93, 49, 50]);
            let detector = new UniversalDetector();
            detector.handleDataParent(typedArrayToBuffer(buf));
            detector.dataEnd();
            let encoding = detector.getDetectedCharset();
            detector.reset();
            expect("GB18030").assertEqual(encoding);
        });
    });
}
