let __generate__Id: number = 0;
function generateId(): string {
    return "PlanarYUVLuminanceSource.test_" + ++__generate__Id;
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
import { PlanarYUVLuminanceSource } from '@ohos/zxing';
import { ZXingSystem } from '@ohos/zxing';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
const BASE_COUNT: number = 2000;
export default function planarYUVLuminanceSourceTest() {
    const YUV: Uint8ClampedArray = Uint8ClampedArray.from([
        0, 1, 1, 2, 3, 5,
        8, 13, 21, 34, 55, 89,
        0, -1, -1, -2, -3, -5,
        -8, -13, -21, -34, -55, -89,
        127, 127, 127, 127, 127, 127,
        127, 127, 127, 127, 127, 127,
    ]);
    const COLS: number /*int*/ = 6;
    const ROWS: number /*int*/ = 4;
    const Y = new Uint8ClampedArray(COLS * ROWS);
    ZXingSystem.arraycopy(YUV, 0, Y, 0, Y.length);
    describe('planarYUVLuminanceSourceTest', () => {
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
        it('testNoCrop', 0, () => {
            const source = new PlanarYUVLuminanceSource(YUV, COLS, ROWS, 0, 0, COLS, ROWS, false);
            assertTypedArrayEquals(Y, 0, source.getMatrix(), 0, Y.length);
            for (let r: number /*int*/ = 0; r < ROWS; r++) {
                assertTypedArrayEquals(Y, r * COLS, source.getRow(r), 0, COLS);
            }
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                assertTypedArrayEquals(Y, 0, source.getMatrix(), 0, Y.length);
            }
            endTime(startTime, 'testNoCrop');
        });
        it('testCrop', 0, () => {
            const source = new PlanarYUVLuminanceSource(YUV, COLS, ROWS, 1, 1, COLS - 2, ROWS - 2, false);
            expect(source.isCropSupported()).assertTrue();
            const cropMatrix: Uint8ClampedArray = source.getMatrix();
            for (let r: number /*int*/ = 0; r < ROWS - 2; r++) {
                assertTypedArrayEquals(Y, (r + 1) * COLS + 1, cropMatrix, r * (COLS - 2), COLS - 2);
            }
            for (let r: number /*int*/ = 0; r < ROWS - 2; r++) {
                assertTypedArrayEquals(Y, (r + 1) * COLS + 1, source.getRow(r), 0, COLS - 2);
            }
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                source.isCropSupported();
            }
            endTime(startTime, 'testCrop');
        });
    });
}
function assertTypedArrayEquals(expected: Uint8ClampedArray, expectedFrom: number /*int*/, actual: Uint8ClampedArray, actualFrom: number /*int*/, length: number /*int*/) {
    for (let i: number /*int*/ = 0; i < length; i++) {
        expect(actual[actualFrom + i]).assertEqual(expected[expectedFrom + i]);
    }
}
function endTime(startTime: number, tag: string) {
    console.log(tag + ":startTime:" + startTime);
    let endTime: number = new Date().getTime();
    let averageTime = ((endTime - startTime) * 1000 / BASE_COUNT);
    console.log(tag + ":endTime:" + endTime);
    console.log(tag + ":averageTime:" + averageTime + "μs");
}
