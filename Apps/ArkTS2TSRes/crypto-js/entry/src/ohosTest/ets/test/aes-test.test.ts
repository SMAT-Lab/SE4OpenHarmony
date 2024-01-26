let __generate__Id: number = 0;
function generateId(): string {
    return "aes-test.test_" + ++__generate__Id;
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
import { Key } from './interface/interface';
import { ModePaddingFn } from './interface/ModePaddingData';
import { Utils } from './interface/Utils';
interface CiphertextData {
    ciphertext: object;
}
let ciphertextFn = (ciphertext: object): CiphertextData => {
    let ciphertextFnData: CiphertextData = {
        ciphertext: ciphertext,
    };
    return ciphertextFnData;
};
export default function aesTest() {
    describe('aesTest', () => {
        beforeAll(() => {
        });
        beforeEach(() => {
        });
        it('aesTest_testEncryptKeySize128', 0, () => {
            let result: string = CryptoJS.AES.encrypt(CryptoJS.enc.Hex.parse('00112233445566778899aabbccddeeff'), CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f'), ModePaddingFn(CryptoJS.mode.ECB, CryptoJS.pad.NoPadding)).ciphertext.toString();
            expect('69c4e0d86a7b0430d8cdb78070b4c55a').assertEqual(result);
        });
        it('aesTest_testEncryptKeySize192', 0, () => {
            let result: string = CryptoJS.AES.encrypt(CryptoJS.enc.Hex.parse('00112233445566778899aabbccddeeff'), CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f1011121314151617'), ModePaddingFn(CryptoJS.mode.ECB, CryptoJS.pad.NoPadding)).ciphertext.toString();
            expect('dda97ca4864cdfe06eaf70a0ec0d7191').assertEqual(result);
        });
        it('aesTest_testEncryptKeySize256', 0, () => {
            let result: string = CryptoJS.AES.encrypt(CryptoJS.enc.Hex.parse('00112233445566778899aabbccddeeff'), CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f'), ModePaddingFn(CryptoJS.mode.ECB, CryptoJS.pad.NoPadding)).ciphertext.toString();
            expect('8ea2b7ca516745bfeafc49904b496089').assertEqual(result);
        });
        it('aesTest_testDecryptKeySize128', 0, () => {
            let result: string = CryptoJS.AES.decrypt(CryptoJS.lib.CipherParams.create(ciphertextFn(CryptoJS.enc.Hex.parse('69c4e0d86a7b0430d8cdb78070b4c55a'))), CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f'), ModePaddingFn(CryptoJS.mode.ECB, CryptoJS.pad.NoPadding)).toString();
            expect('00112233445566778899aabbccddeeff').assertEqual(result);
        });
        it('aesTest_testDecryptKeySize192', 0, () => {
            let result: string = CryptoJS.AES.decrypt(CryptoJS.lib.CipherParams.create(ciphertextFn(CryptoJS.enc.Hex.parse('dda97ca4864cdfe06eaf70a0ec0d7191'))), CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f1011121314151617'), ModePaddingFn(CryptoJS.mode.ECB, CryptoJS.pad.NoPadding)).toString();
            expect('00112233445566778899aabbccddeeff').assertEqual(result);
        });
        it('aesTest_testDecryptKeySize256', 0, () => {
            let result: string = CryptoJS.AES.decrypt(CryptoJS.lib.CipherParams.create(ciphertextFn(CryptoJS.enc.Hex.parse('8ea2b7ca516745bfeafc49904b496089'))), CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f'), ModePaddingFn(CryptoJS.mode.ECB, CryptoJS.pad.NoPadding)).toString();
            expect('00112233445566778899aabbccddeeff').assertEqual(result);
        });
        it('aesTest_testMultiPart', 0, () => {
            let aes: any = Utils.getModePaddingFn();
            let ciphertext1: string = aes.process(CryptoJS.enc.Hex.parse('001122334455'));
            let ciphertext2: string = aes.process(CryptoJS.enc.Hex.parse('66778899aa'));
            let ciphertext3: string = aes.process(CryptoJS.enc.Hex.parse('bbccddeeff'));
            let ciphertext4: string = aes.finalize();
            let result = ciphertext1.concat(ciphertext2).concat(ciphertext3).concat(ciphertext4).toString();
            expect('69c4e0d86a7b0430d8cdb78070b4c55a').assertEqual(result);
        });
        it('aesTest_testInputIntegrity', 0, () => {
            let message: string = CryptoJS.enc.Hex.parse('00112233445566778899aabbccddeeff');
            let key: string = CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f');
            let iv: string = CryptoJS.enc.Hex.parse('101112131415161718191a1b1c1d1e1f');
            let expectedMessage: string = message.toString();
            let expectedKey: string = key.toString();
            let expectedIv: string = iv.toString();
            let IVArg: Record<string, string> = {
                'iv': iv
            };
            CryptoJS.AES.encrypt(message, key, IVArg);
            expect(expectedMessage).assertEqual(message.toString());
            expect(expectedKey).assertEqual(key.toString());
            expect(expectedIv).assertEqual(iv.toString());
        });
        it('aesTest_testHelper', 0, () => {
            // Save original random method
            let random: object = CryptoJS.lib.WordArray.random;
            // Replace random method with one that returns a predictable value
            CryptoJS.lib.WordArray.random = (nBytes: number): Key => {
                let words: Object[] = [];
                for (let i = 0; i < nBytes; i += 4) {
                    words.push([0x11223344]);
                }
                return CryptoJS.lib.WordArray.create(words, nBytes);
            };
            // Test
            expect(CryptoJS.algo.AES.createEncryptor(CryptoJS.SHA256('Jefe'), ModePaddingFn(CryptoJS.mode.ECB, CryptoJS.pad.NoPadding))
                .finalize('Hi There')
                .toString()).assertEqual(CryptoJS.AES.encrypt('Hi There', CryptoJS.SHA256('Jefe'), ModePaddingFn(CryptoJS.mode.ECB, CryptoJS.pad.NoPadding)).ciphertext.toString());
            expect(CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, 'Hi There', CryptoJS.SHA256('Jefe'), ModePaddingFn(CryptoJS.mode.ECB, CryptoJS.pad.NoPadding)).toString()).assertEqual(CryptoJS.AES.encrypt('Hi There', CryptoJS.SHA256('Jefe'), ModePaddingFn(CryptoJS.mode.ECB, CryptoJS.pad.NoPadding)).toString());
            expect(CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, 'Hi There', 'Jefe', ModePaddingFn(CryptoJS.mode.ECB, CryptoJS.pad.NoPadding)).toString()).assertEqual(CryptoJS.AES.encrypt('Hi There', 'Jefe', ModePaddingFn(CryptoJS.mode.ECB, CryptoJS.pad.NoPadding)).toString());
            // Restore random method
            CryptoJS.lib.WordArray.random = random;
        });
    });
}
