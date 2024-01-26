let __generate__Id: number = 0;
function generateId(): string {
    return "Encoder.test_" + ++__generate__Id;
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
import { QRCodeEncoder } from '@ohos/zxing';
import { EncodeHintType } from '@ohos/zxing';
import { BitArray } from '@ohos/zxing';
import { QRCodeDecoderErrorCorrectionLevel } from '@ohos/zxing';
import { QRCodeMode } from '@ohos/zxing';
import { QRCodeEncoderQRCode } from '@ohos/zxing';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
const BASE_COUNT: number = 2000;
export default function qRCodeEncoderTest() {
    describe('QRCodeEncoderTest', () => {
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
            const qrCode: QRCodeEncoderQRCode = QRCodeEncoder.encode('ABCDEF', QRCodeDecoderErrorCorrectionLevel.H);
            const expected: string = '<<\n' +
                ' mode: ALPHANUMERIC\n' +
                ' ecLevel: H\n' +
                ' version: 1\n' +
                ' maskPattern: 4\n' +
                ' matrix:\n' +
                ' 1 1 1 1 1 1 1 0 0 1 0 1 0 0 1 1 1 1 1 1 1\n' +
                ' 1 0 0 0 0 0 1 0 1 0 1 0 1 0 1 0 0 0 0 0 1\n' +
                ' 1 0 1 1 1 0 1 0 0 0 0 0 0 0 1 0 1 1 1 0 1\n' +
                ' 1 0 1 1 1 0 1 0 0 1 0 0 1 0 1 0 1 1 1 0 1\n' +
                ' 1 0 1 1 1 0 1 0 0 1 0 1 0 0 1 0 1 1 1 0 1\n' +
                ' 1 0 0 0 0 0 1 0 1 0 0 1 1 0 1 0 0 0 0 0 1\n' +
                ' 1 1 1 1 1 1 1 0 1 0 1 0 1 0 1 1 1 1 1 1 1\n' +
                ' 0 0 0 0 0 0 0 0 1 0 0 0 1 0 0 0 0 0 0 0 0\n' +
                ' 0 0 0 0 1 1 1 1 0 1 1 0 1 0 1 1 0 0 0 1 0\n' +
                ' 0 0 0 0 1 1 0 1 1 1 0 0 1 1 1 1 0 1 1 0 1\n' +
                ' 1 0 0 0 0 1 1 0 0 1 0 1 0 0 0 1 1 1 0 1 1\n' +
                ' 1 0 0 1 1 1 0 0 1 1 1 1 0 0 0 0 1 0 0 0 0\n' +
                ' 0 1 1 1 1 1 1 0 1 0 1 0 1 1 1 0 0 1 1 0 0\n' +
                ' 0 0 0 0 0 0 0 0 1 1 0 0 0 1 1 0 0 0 1 0 1\n' +
                ' 1 1 1 1 1 1 1 0 1 1 1 1 0 0 0 0 0 1 1 0 0\n' +
                ' 1 0 0 0 0 0 1 0 1 1 0 1 0 0 0 1 0 1 1 1 1\n' +
                ' 1 0 1 1 1 0 1 0 1 0 0 1 0 0 0 1 1 0 0 1 1\n' +
                ' 1 0 1 1 1 0 1 0 0 0 1 1 0 1 0 0 0 0 1 1 1\n' +
                ' 1 0 1 1 1 0 1 0 0 1 0 1 0 0 0 1 1 0 0 0 0\n' +
                ' 1 0 0 0 0 0 1 0 0 1 0 0 1 0 0 1 1 0 0 0 1\n' +
                ' 1 1 1 1 1 1 1 0 0 0 1 0 0 1 0 0 0 0 1 1 1\n' +
                '>>\n';
            expect(qrCode.toString()).assertEqual(expected);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                QRCodeEncoder.encode('testEncode', QRCodeDecoderErrorCorrectionLevel.H);
            }
            endTime(startTime, 'testAsciiStandardDecode');
        });
        it('testSimpleUTF8ECI', 0, () => {
            const hints: Map<EncodeHintType, string> = new Map<EncodeHintType, string>(); // EncodeHintType.class)
            hints.set(EncodeHintType.CHARACTER_SET, 'UTF8');
            const qrCode: QRCodeEncoderQRCode = QRCodeEncoder.encode('hello', QRCodeDecoderErrorCorrectionLevel.H, hints);
            const expected: string = '<<\n' +
                ' mode: BYTE\n' +
                ' ecLevel: H\n' +
                ' version: 1\n' +
                ' maskPattern: 6\n' +
                ' matrix:\n' +
                ' 1 1 1 1 1 1 1 0 0 0 1 1 0 0 1 1 1 1 1 1 1\n' +
                ' 1 0 0 0 0 0 1 0 0 0 1 1 0 0 1 0 0 0 0 0 1\n' +
                ' 1 0 1 1 1 0 1 0 1 0 0 1 1 0 1 0 1 1 1 0 1\n' +
                ' 1 0 1 1 1 0 1 0 1 0 0 0 1 0 1 0 1 1 1 0 1\n' +
                ' 1 0 1 1 1 0 1 0 0 1 1 0 0 0 1 0 1 1 1 0 1\n' +
                ' 1 0 0 0 0 0 1 0 0 0 0 1 0 0 1 0 0 0 0 0 1\n' +
                ' 1 1 1 1 1 1 1 0 1 0 1 0 1 0 1 1 1 1 1 1 1\n' +
                ' 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0\n' +
                ' 0 0 0 1 1 0 1 1 0 0 0 0 1 0 0 0 0 1 1 0 0\n' +
                ' 0 0 0 0 0 0 0 0 1 1 0 1 0 0 1 0 1 1 1 1 1\n' +
                ' 1 1 0 0 0 1 1 1 0 0 0 1 1 0 0 1 0 1 0 1 1\n' +
                ' 0 0 0 0 1 1 0 0 1 0 0 0 0 0 1 0 1 1 0 0 0\n' +
                ' 0 1 1 0 0 1 1 0 0 1 1 1 0 1 1 1 1 1 1 1 1\n' +
                ' 0 0 0 0 0 0 0 0 1 1 1 0 1 1 1 1 1 1 1 1 1\n' +
                ' 1 1 1 1 1 1 1 0 1 0 1 0 0 0 1 0 0 0 0 0 0\n' +
                ' 1 0 0 0 0 0 1 0 0 1 0 0 0 1 0 0 0 1 1 0 0\n' +
                ' 1 0 1 1 1 0 1 0 1 0 0 0 1 0 1 0 0 0 1 0 0\n' +
                ' 1 0 1 1 1 0 1 0 1 1 1 1 0 1 0 0 1 0 1 1 0\n' +
                ' 1 0 1 1 1 0 1 0 0 1 1 1 0 0 1 0 0 1 0 1 1\n' +
                ' 1 0 0 0 0 0 1 0 0 0 0 0 0 1 1 0 1 1 0 0 0\n' +
                ' 1 1 1 1 1 1 1 0 0 0 0 1 0 1 0 0 1 0 1 0 0\n' +
                '>>\n';
            expect(qrCode.toString()).assertEqual(expected);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                QRCodeEncoder.encode('hello', QRCodeDecoderErrorCorrectionLevel.H, hints);
            }
            endTime(startTime, 'testSimpleUTF8ECI');
        });
        it('testAppendModeInfo', 0, () => {
            const bits = new BitArray();
            QRCodeEncoder.appendModeInfo(QRCodeMode.NUMERIC, bits);
            expect(bits.toString()).assertEqual(' ...X');
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                QRCodeEncoder.appendModeInfo(QRCodeMode.NUMERIC, bits);
            }
            endTime(startTime, 'testAppendModeInfo');
        });
        it('testEncodeWithVersion', 0, () => {
            const hints: Map<EncodeHintType, number> = new Map<EncodeHintType, number>(); // EncodeHintType.class)
            hints.set(EncodeHintType.QR_VERSION, 7);
            const qrCode: QRCodeEncoderQRCode = QRCodeEncoder.encode('ABCDEF', QRCodeDecoderErrorCorrectionLevel.H, hints);
            expect(qrCode.toString().indexOf(' version: 7\n') !== -1).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                QRCodeEncoder.encode('ABCDEF', QRCodeDecoderErrorCorrectionLevel.H, hints);
            }
            endTime(startTime, 'testEncodeWithVersion');
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
