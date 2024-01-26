let __generate__Id: number = 0;
function generateId(): string {
    return "QRCode.test_" + ++__generate__Id;
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
import { QRCodeDecoderErrorCorrectionLevel } from '@ohos/zxing';
import { QRCodeMode } from '@ohos/zxing';
import { QRCodeVersion } from '@ohos/zxing';
import { QRCodeEncoderQRCode } from '@ohos/zxing';
import { QRCodeByteMatrix } from '@ohos/zxing';
import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
const BASE_COUNT: number = 2000;
export default function qrCodeEncoderQRCodeTest() {
    describe('qrCodeEncoderQRCodeTest', () => {
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
        it('test', 0, () => {
            const qrCode = new QRCodeEncoderQRCode();
            // First, test simple setters and getters.
            // We use numbers of version 7-H.
            qrCode.setMode(QRCodeMode.BYTE);
            qrCode.setECLevel(QRCodeDecoderErrorCorrectionLevel.H);
            qrCode.setVersion(QRCodeVersion.getVersionForNumber(7));
            qrCode.setMaskPattern(3);
            expect(QRCodeMode.BYTE.equals(qrCode.getMode())).assertTrue();
            expect(QRCodeDecoderErrorCorrectionLevel.H.equals(qrCode.getECLevel())).assertTrue();
            expect(qrCode.getVersion().getVersionNumber()).assertEqual(7);
            expect(qrCode.getMaskPattern()).assertEqual(3);
            // Prepare the matrix.
            const matrix = new QRCodeByteMatrix(45, 45);
            // Just set bogus zero/one values.
            for (let y: number /*int*/ = 0; y < 45; ++y) {
                for (let x: number /*int*/ = 0; x < 45; ++x) {
                    matrix.setNumber(x, y, (y + x) % 2);
                }
            }
            // Set the matrix.
            qrCode.setMatrix(matrix);
            expect(matrix.equals(qrCode.getMatrix())).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                qrCode.setMode(QRCodeMode.BYTE);
            }
            endTime(startTime, 'setMode');
            let startTime1 = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                qrCode.setECLevel(QRCodeDecoderErrorCorrectionLevel.H);
            }
            endTime(startTime1, 'setECLevel');
            let startTime2 = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                qrCode.setVersion(QRCodeVersion.getVersionForNumber(7));
            }
            endTime(startTime2, 'setVersion');
            let startTime3 = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                qrCode.setMaskPattern(3);
            }
            endTime(startTime3, 'setVersion');
        });
        it('testToString1', 0, () => {
            const qrCode = new QRCodeEncoderQRCode();
            const expected: string = '<<\n' +
                ' mode: null\n' +
                ' ecLevel: null\n' +
                ' version: null\n' +
                ' maskPattern: -1\n' +
                ' matrix: null\n' +
                '>>\n';
            expect(qrCode.toString()).assertEqual(expected);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                qrCode.toString();
            }
            endTime(startTime, 'testToString1');
        });
        it('testToString2', 0, () => {
            const qrCode = new QRCodeEncoderQRCode();
            qrCode.setMode(QRCodeMode.BYTE);
            qrCode.setECLevel(QRCodeDecoderErrorCorrectionLevel.H);
            qrCode.setVersion(QRCodeVersion.getVersionForNumber(1));
            qrCode.setMaskPattern(3);
            const matrix = new QRCodeByteMatrix(21, 21);
            for (let y: number /*int*/ = 0; y < 21; ++y) {
                for (let x: number /*int*/ = 0; x < 21; ++x) {
                    matrix.setNumber(x, y, (y + x) % 2);
                }
            }
            qrCode.setMatrix(matrix);
            const expected: string = '<<\n' +
                ' mode: BYTE\n' +
                ' ecLevel: H\n' +
                ' version: 1\n' +
                ' maskPattern: 3\n' +
                ' matrix:\n' +
                ' 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0\n' +
                ' 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1\n' +
                ' 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0\n' +
                ' 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1\n' +
                ' 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0\n' +
                ' 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1\n' +
                ' 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0\n' +
                ' 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1\n' +
                ' 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0\n' +
                ' 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1\n' +
                ' 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0\n' +
                ' 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1\n' +
                ' 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0\n' +
                ' 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1\n' +
                ' 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0\n' +
                ' 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1\n' +
                ' 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0\n' +
                ' 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1\n' +
                ' 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0\n' +
                ' 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1\n' +
                ' 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0\n' +
                '>>\n';
            expect(qrCode.toString()).assertEqual(expected);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                qrCode.toString();
            }
            endTime(startTime, 'testToString2');
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
