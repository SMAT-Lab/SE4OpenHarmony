let __generate__Id: number = 0;
function generateId(): string {
    return "ShortString.test_" + ++__generate__Id;
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
export default function ShortStringTests() {
    describe('ShortStringTests', () => {
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
        it('testDecodeBytes', 0, () => {
            let bytes = new Int8Array([97, 101, 97, 67, -61, -96, -61, -86, -61, -92, -61, -121]);
            let charset = guessCharsetName(bytes);
            expect("UTF-8").assertEqual(charset);
            bytes = new Int8Array([97, 101, 97, 67, -32, -22, -28, -57]);
            charset = guessCharsetName(bytes); // detected charset = TIS-620, Thai charset ???!!!
            expect("TIS620").assertEqual(charset);
        });
        it('testDecodeBytesBetterStats', 1, () => {
            let bytes = new Int8Array([67, 104, -61, -94, 116, 101, 97, 117]);
            let charset = guessCharsetName(bytes);
            expect("UTF-8").assertEqual(charset);
            bytes = new Int8Array([67, 104, -30, 116, 101, 97, 117]);
            charset = guessCharsetName(bytes);
            expect("WINDOWS-1252").assertEqual(charset);
        });
        it('testShortString', 2, () => {
            let bytes = new Int8Array([97, 98, 99, 100]);
            expect("US-ASCII").assertEqual(guessCharsetName(bytes));
        });
    });
}
function guessCharsetName(bytes: Int8Array): string {
    let detector = new UniversalDetector();
    detector.handleData(typedArrayToBuffer(bytes), 0, bytes.length);
    detector.dataEnd();
    return detector.getDetectedCharset();
}
