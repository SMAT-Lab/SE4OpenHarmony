let __generate__Id: number = 0;
function generateId(): string {
    return "mode-cbc-test.test_" + ++__generate__Id;
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
import { Data } from './interface/interface';
import { IVModePaddingFn } from './interface/ModePaddingData';
export default function modeCbcTest() {
    let data: Data | null = null;
    let setUpErr: Error | null = null;
    describe('modeCbcTest', () => {
        beforeAll(() => {
            try {
                if (data) {
                    // data = {};
                    data.message = CryptoJS.lib.WordArray.create([
                        0x00010203, 0x04050607, 0x08090a0b, 0x0c0d0e0f,
                        0x10111213, 0x14151617, 0x18191a1b, 0x1c1d1e1f
                    ]);
                    data.key = CryptoJS.lib.WordArray.create([0x20212223, 0x24252627, 0x28292a2b, 0x2c2d2e2f]);
                    data.iv = CryptoJS.lib.WordArray.create([0x30313233, 0x34353637, 0x38393a3b, 0x3c3d3e3f]);
                }
            }
            catch (err) {
                setUpErr = err;
            }
        });
        beforeEach(() => {
        });
        it('modeCbcTest_setUp', 0, () => {
            if (data) {
                expect(setUpErr).assertNull();
                expect(data).not().assertNull();
                expect(data.key).not().assertNull();
                expect(data.iv).not().assertNull();
                expect(data.message).not().assertNull();
            }
        });
        it('modeCbcTest_testEncryptor', 0, () => {
            if (data) {
                // Compute expected
                // First block XORed with IV, then encrypted
                for (let i = 0; i < 4; i++) {
                    data.message.clone().words[i] ^= data.iv.words[i];
                }
                CryptoJS.algo.AES.createEncryptor(data.key).encryptBlock(data.message.clone().words, 0);
                // Subsequent blocks XORed with previous crypted block, then encrypted
                for (let i = 4; i < 8; i++) {
                    data.message.clone().words[i] ^= data.message.clone().words[i - 4];
                }
                CryptoJS.algo.AES.createEncryptor(data.key).encryptBlock(data.message.clone().words, 4);
                // Compute actual
                let actual: string = CryptoJS.AES.encrypt(data.message, data.key, IVModePaddingFn(data.iv, CryptoJS.mode.CBC, CryptoJS.pad.NoPadding)).ciphertext;
                // Test
                expect(data.message.clone().toString()).assertEqual(actual.toString());
            }
        });
        it('modeCbcTest_testDecryptor', 0, () => {
            if (data) {
                let encrypted: string = CryptoJS.AES.encrypt(data.message, data.key, IVModePaddingFn(data.iv, CryptoJS.mode.CBC, CryptoJS.pad.NoPadding));
                let decrypted: string = CryptoJS.AES.decrypt(encrypted, data.key, IVModePaddingFn(data.iv, CryptoJS.mode.CBC, CryptoJS.pad.NoPadding));
                expect(data.message.toString()).assertEqual(decrypted.toString());
            }
        });
    });
}
