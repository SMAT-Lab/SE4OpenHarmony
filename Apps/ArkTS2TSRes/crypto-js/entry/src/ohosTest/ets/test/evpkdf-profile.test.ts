let __generate__Id: number = 0;
function generateId(): string {
    return "evpkdf-profile.test_" + ++__generate__Id;
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
export default function evpkdfProfileTest() {
    describe('evpkdfProfileTest', () => {
        beforeAll(() => {
        });
        beforeEach(() => {
        });
        it('evpkdfProfileTest_setUp', 0, () => {
            let localErr: Error | null = null;
            let result: String | null = null;
            try {
                let keySizeArg: Record<string, number> = {
                    'keySize': 256 / 32, 'iterations': 20
                };
                result = CryptoJS.algo.EvpKDF.create(keySizeArg).compute('password', 'ATHENA.MIT.EDUraeburn');
            }
            catch (err) {
                localErr = err;
            }
            expect(localErr).assertNull();
            expect(result).not().assertNull();
        });
    });
}
