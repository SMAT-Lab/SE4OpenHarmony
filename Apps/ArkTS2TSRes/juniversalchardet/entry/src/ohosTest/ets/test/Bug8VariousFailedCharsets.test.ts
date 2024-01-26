let __generate__Id: number = 0;
function generateId(): string {
    return "Bug8VariousFailedCharsets.test_" + ++__generate__Id;
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
export default function Bug8VariousFailedCharsetsTest() {
    describe('Bug8VariousFailedCharsetsTest', () => {
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
        it('test1', 0, () => {
            let data = new Int8Array([91, 83, 97, 110, 111, 111, 107, 93, 32, -73, -76, -54, -51, -70, -69, -47, -83, -53, -46, -95, -46, -61, -51, -24, -46, -71, -64, -46, -55, -46, -28, -73, -62, -51, -43, -95, -92, -61, -47, -23, -89, 32, -15, -14, -13]);
            let charset = detect(typedArrayToBuffer(data));
            expect("TIS620").assertEqual(charset);
        });
        it('test2', 1, () => {
            let data = new Int8Array([-51, -8, -46, -41, -45, -54, -49, -28, -41, -44, -74, -81, -69, -40, -72, -76, 58]);
            let charset = detect(typedArrayToBuffer(data));
            expect("ISO-8859-5").assertEqual(charset);
        });
    });
}
function detect(data: ArrayBuffer): string {
    let detector: UniversalDetector = new UniversalDetector();
    detector.handleDataParent(data);
    detector.dataEnd();
    let detected: string = detector.getDetectedCharset();
    detector.reset();
    return detected;
}
