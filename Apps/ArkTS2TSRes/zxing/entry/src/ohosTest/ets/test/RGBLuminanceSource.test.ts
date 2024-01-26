let __generate__Id: number = 0;
function generateId(): string {
    return "RGBLuminanceSource.test_" + ++__generate__Id;
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
import { LuminanceSource } from '@ohos/zxing';
import { RGBLuminanceSource } from '@ohos/zxing';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
const BASE_COUNT: number = 2000;
export default function rgbLuminanceSourceTest() {
    const SOURCE = new RGBLuminanceSource(Int32Array.from([
        0x000000, 0x7F7F7F, 0xFFFFFF,
        0xFF0000, 0x00FF00, 0x0000FF,
        0x0000FF, 0x00FF00, 0xFF0000
    ]), 3, 3);
    describe('rgbLuminanceSourceTest', () => {
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
        it('testCrop', 0, () => {
            expect(SOURCE.isCropSupported()).assertTrue();
            const cropped: LuminanceSource = SOURCE.crop(1, 1, 1, 1);
            expect(cropped.getHeight()).assertEqual(1);
            expect(cropped.getWidth()).assertEqual(1);
            expect(typedArraysAreEqual(Uint8ClampedArray.from([0x7F]), cropped.getRow(0))).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                SOURCE.isCropSupported();
            }
            endTime(startTime, 'testCrop');
        });
        it('testMatrix', 0, () => {
            expect(typedArraysAreEqual(Uint8ClampedArray.from([0x00, 0x7F, 0xFF, 0x3F, 0x7F, 0x3F, 0x3F, 0x7F, 0x3F]), SOURCE.getMatrix())).assertTrue();
            const croppedFullWidth: LuminanceSource = SOURCE.crop(0, 1, 3, 2);
            expect(typedArraysAreEqual(Uint8ClampedArray.from([0x3F, 0x7F, 0x3F, 0x3F, 0x7F, 0x3F]), croppedFullWidth.getMatrix())).assertTrue();
            const croppedCorner: LuminanceSource = SOURCE.crop(1, 1, 2, 2);
            expect(typedArraysAreEqual(Uint8ClampedArray.from([0x7F, 0x3F, 0x7F, 0x3F]), croppedCorner.getMatrix())).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                SOURCE.getMatrix();
            }
            endTime(startTime, 'testMatrix');
        });
        it('testGetRow', 0, () => {
            expect(typedArraysAreEqual(Uint8ClampedArray.from([0x3F, 0x7F, 0x3F]), SOURCE.getRow(2, new Uint8ClampedArray(3)))).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                SOURCE.getRow(2, new Uint8ClampedArray(3));
            }
            endTime(startTime, 'testGetRow');
        });
        it('testToString', 0, () => {
            expect(SOURCE.toString()).assertEqual('#+ \n#+#\n#+#\n');
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                SOURCE.toString();
            }
            endTime(startTime, 'testToString');
        });
    });
}
function typedArraysAreEqual(left: Int32Array | Uint8ClampedArray, right: Int32Array | Uint8ClampedArray, size?: number): boolean {
    if (!size) {
        size = Math.max(left.length, right.length);
    }
    for (let i = 0; i < size; i++) {
        if (left[i] !== right[i]) {
            return false;
        }
    }
    return true;
}
function endTime(startTime: number, tag: string) {
    console.log(tag + ":startTime:" + startTime);
    let endTime: number = new Date().getTime();
    let averageTime = ((endTime - startTime) * 1000 / BASE_COUNT);
    console.log(tag + ":endTime:" + endTime);
    console.log(tag + ":averageTime:" + averageTime + "μs");
}
