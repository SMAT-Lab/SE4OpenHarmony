let __generate__Id: number = 0;
function generateId(): string {
    return "Decoder.test_" + ++__generate__Id;
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
import { BitMatrix } from '@ohos/zxing';
import { ResultPoint } from '@ohos/zxing';
import { AztecDecoder } from '@ohos/zxing';
import { AztecDetectorResult } from '@ohos/zxing';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
/**
 * Tests {@link Decoder}.
 */
const BASE_COUNT: number = 2000;
export default function decoderTest() {
    describe('DecoderTest', () => {
        const NO_POINTS: ResultPoint[] = [];
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
        /**
         * @Test
        * @throws FormatException
         */
        it('testAztecResult', 0, () => {
            const matrix = BitMatrix.parseFromString('X X X X X     X X X       X X X     X X X     \n' +
                'X X X     X X X     X X X X     X X X     X X \n' +
                '  X   X X       X   X   X X X X     X     X X \n' +
                '  X   X X     X X     X     X   X       X   X \n' +
                '  X X   X X         X               X X     X \n' +
                '  X X   X X X X X X X X X X X X X X X     X   \n' +
                '  X X X X X                       X   X X X   \n' +
                '  X   X   X   X X X X X X X X X   X X X   X X \n' +
                '  X   X X X   X               X   X X       X \n' +
                '  X X   X X   X   X X X X X   X   X X X X   X \n' +
                '  X X   X X   X   X       X   X   X   X X X   \n' +
                '  X   X   X   X   X   X   X   X   X   X   X   \n' +
                '  X X X   X   X   X       X   X   X X   X X   \n' +
                '  X X X X X   X   X X X X X   X   X X X   X X \n' +
                'X X   X X X   X               X   X   X X   X \n' +
                '  X       X   X X X X X X X X X   X   X     X \n' +
                '  X X   X X                       X X   X X   \n' +
                '  X X X   X X X X X X X X X X X X X X   X X   \n' +
                'X     X     X     X X   X X               X X \n' +
                'X   X X X X X   X X X X X     X   X   X     X \n' +
                'X X X   X X X X           X X X       X     X \n' +
                'X X     X X X     X X X X     X X X     X X   \n' +
                '    X X X     X X X       X X X     X X X X   \n', 'X ', '  ');
            const r = new AztecDetectorResult(matrix, NO_POINTS, false, 30, 2);
            const result = new AztecDecoder().decode(r);
            expect('88888TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT').assertEqual(result.getText());
            expect(180).assertEqual(result.getNumBits());
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                new AztecDecoder().decode(r);
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
