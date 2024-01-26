let __generate__Id: number = 0;
function generateId(): string {
    return "PDF417Decoder.test_" + ++__generate__Id;
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
import { PDF417ResultMetadata } from '@ohos/zxing';
import { PDF417DecodedBitStreamParser } from '@ohos/zxing';
/**
 * Tests {@link PDF417DecodedBitStreamParser}.
 */
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
const BASE_COUNT: number = 2000;
export default function pdf417DecoderTest() {
    describe('pdf417DecoderTest', () => {
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
        it('testStandardSample2', 0, () => {
            const resultMetadata = new PDF417ResultMetadata();
            const sampleCodes = Int32Array.from([11, 928, 111, 103, 17, 53, 923, 1, 111, 104, 922,
                // we should never reach these
                1000, 1000, 1000]);
            PDF417DecodedBitStreamParser.decodeMacroBlock(sampleCodes, 2, resultMetadata);
            expect(3).assertEqual(resultMetadata.getSegmentIndex());
            expect('ARBX').assertEqual(resultMetadata.getFileId());
            expect(resultMetadata.isLastSegment()).assertTrue();
            expect(4).assertEqual(resultMetadata.getSegmentCount());
            expect(resultMetadata.getAddressee()).assertNull();
            expect(resultMetadata.getSender()).assertNull();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                PDF417DecodedBitStreamParser.decodeMacroBlock(sampleCodes, 2, resultMetadata);
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
