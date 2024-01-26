let __generate__Id: number = 0;
function generateId(): string {
    return "DecodedBitStreamParser.test_" + ++__generate__Id;
}
/*
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
import { DataMatrixDecodedBitStreamParser } from '@ohos/zxing';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
const BASE_COUNT: number = 2000;
export default function decodedBitStreamParserTest() {
    describe('decodedBitStreamParserTest', () => {
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
        it('testAsciiStandardDecode', 0, () => {
            // ASCII characters 0-127 are encoded as the value + 1
            const bytes: Uint8Array = new Uint8Array(6);
            bytes[0] = 'a'.charCodeAt(0) + 1;
            bytes[1] = 'b'.charCodeAt(0) + 1;
            bytes[2] = 'c'.charCodeAt(0) + 1;
            bytes[3] = 'A'.charCodeAt(0) + 1;
            bytes[4] = 'B'.charCodeAt(0) + 1;
            bytes[5] = 'C'.charCodeAt(0) + 1;
            const decodedString = DataMatrixDecodedBitStreamParser.decode(bytes).getText();
            expect(decodedString).assertEqual('abcABC');
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                DataMatrixDecodedBitStreamParser.decode(bytes).getText();
            }
            endTime(startTime, 'testAsciiStandardDecode');
        });
        it('assertContain', 0, () => {
            const bytes: Uint8Array = new Uint8Array(4);
            bytes[0] = 130;
            bytes[1] = 1 + 130;
            bytes[2] = 98 + 130;
            bytes[3] = 99 + 130;
            const decodedString = DataMatrixDecodedBitStreamParser.decode(bytes).getText();
            expect(decodedString).assertEqual('00019899');
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                DataMatrixDecodedBitStreamParser.decode(bytes).getText();
            }
            endTime(startTime, 'testAsciiStandardDecode');
        });
    });
}
function endTime(startTime: number, tag: string) {
    console.log(tag + ":startTime:" + startTime);
    let endTime: number = new Date().getTime();
    let averageTime = ((endTime - startTime) * 1000 / BASE_COUNT);
    console.log(tag + ":endTime:" + endTime);
    console.log(tag + ":averageTime:" + averageTime + "μs");
}
