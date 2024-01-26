let __generate__Id: number = 0;
function generateId(): string {
    return "lib-serializablecipher-test.test_" + ++__generate__Id;
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
import { MultiplyData, MultiplyFn } from './interface/MultiplyData';
import { Data, HasNoMsgData, IVData, IVFn } from './interface/interface';
import { ModePaddingData } from './interface/ModePaddingData';
export default function libSerializablecipherTest() {
    let data: Data | null = null;
    let setUpErr: Error | null = null;
    describe('libSerializablecipherTest', () => {
        beforeAll(() => {
            try {
                if (data) {
                    // data = {};
                    data.message = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607, 0x08090a0b, 0x0c0d0e0f]);
                    data.key = CryptoJS.lib.WordArray.create([0x10111213, 0x14151617, 0x18191a1b, 0x1c1d1e1f]);
                    data.iv = CryptoJS.lib.WordArray.create([0x20212223, 0x24252627, 0x28292a2b, 0x2c2d2e2f]);
                }
            }
            catch (err) {
                setUpErr = err;
            }
        });
        beforeEach(() => {
        });
        it('libSerializablecipherTest_setUp', 0, () => {
            if (data) {
                expect(setUpErr).assertNull();
                expect(data).not().assertNull();
                expect(data.key).not().assertNull();
                expect(data.iv).not().assertNull();
                expect(data.message).not().assertNull();
            }
        });
        it('libSerializablecipherTest_testEncrypt', 0, () => {
            // Compute actual
            if (data) {
                // Compute expected
                let ciphertext: MultiplyData = CryptoJS.algo.AES.createEncryptor(data.key, IVFn(data.iv)).finalize(data.message);
                let expected: MultiplyData = CryptoJS.lib.CipherParams.create(MultiplyFn(ciphertext, data.key, data.iv, CryptoJS.algo.AES, CryptoJS.algo.AES.createEncryptor(data.key, IVFn(data.iv)).cfg.mode, CryptoJS.algo.AES.createEncryptor(data.key, IVFn(data.iv)).cfg.padding, CryptoJS.algo.AES.createEncryptor(data.key, IVFn(data.iv)).blockSize, CryptoJS.format.OpenSSL));
                let actual: MultiplyData = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, data.message, data.key, IVFn(data.iv));
                // Test
                expect(expected.toString()).assertEqual(actual.toString());
                expect(expected.ciphertext.toString()).assertEqual(actual.ciphertext.toString());
                expect(expected.key.toString()).assertEqual(actual.key.toString());
                expect(expected.iv.toString()).assertEqual(actual.iv.toString());
                expect(expected.algorithm.toString()).assertEqual(actual.algorithm.toString());
                expect(expected.mode.toString()).assertEqual(actual.mode.toString());
                expect(expected.padding.toString()).assertEqual(actual.padding.toString());
                expect(expected.blockSize.toString()).assertEqual(actual.blockSize.toString());
            }
        });
        it('libSerializablecipherTest_testDecrypt', 0, () => {
            if (data) {
                let encrypted: string = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, data.message, data.key, IVFn(data.iv)) + '';
                let decrypted: string = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, encrypted, data.key, IVFn(data.iv));
                expect(data.message.toString()).assertEqual(decrypted.toString());
            }
        });
    });
}
