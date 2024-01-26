let __generate__Id: number = 0;
function generateId(): string {
    return "pad-pkcs7-test.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 * Licensed under the MIT License, (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@ohos/hypium';
import { CryptoJS } from '@ohos/crypto-js';
export default function padPkcs7Test() {
    describe('padPkcs7Test', () => {
        beforeAll(() => {
        });
        beforeEach(() => {
        });
        it('padPkcs7Test_testPad', 0, () => {
            let data: string = CryptoJS.lib.WordArray.create([0xdddddd00], 3);
            CryptoJS.pad.Pkcs7.pad(data, 2);
            expect(CryptoJS.lib.WordArray.create([0xdddddd05, 0x05050505]).toString()).assertEqual(data.toString());
        });
        it('padPkcs7Test_testPadClamp', 0, () => {
            let data: string = CryptoJS.lib.WordArray.create([0xdddddddd, 0xdddddddd], 3);
            CryptoJS.pad.Pkcs7.pad(data, 2);
            expect(CryptoJS.lib.WordArray.create([0xdddddd05, 0x05050505]).toString()).assertEqual(data.toString());
        });
        it('padPkcs7Test_testUnpad', 0, () => {
            let data: string = CryptoJS.lib.WordArray.create([0xdddddd05, 0x05050505]);
            CryptoJS.pad.Pkcs7.unpad(data);
            expect(CryptoJS.lib.WordArray.create([0xdddddd00], 3).toString()).assertEqual(data.toString());
        });
    });
}
