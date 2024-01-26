let __generate__Id: number = 0;
function generateId(): string {
    return "isPossibleNumber.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
import { describe, it, expect } from '@ohos/hypium';
import { isPossibleNumber } from 'libphonenumber-js';
export default function isPossibleNumberXts() {
    describe('isPossibleNumberTest', () => {
        it("shouldWork", 0, () => {
            expect(isPossibleNumber('+79992223344')).assertTrue();
            expect(isPossibleNumber({
                phone: '11122233445', country: 'RU'
            })).assertFalse();
        });
        it("isPossibleNumber", 0, () => {
            expect(isPossibleNumber({
                phone: '1112223344', country: 'RU'
            })).assertTrue();
        });
        it("isPossibleNumber_false", 0, () => {
            expect(isPossibleNumber({
                phone: '111222334', country: 'RU'
            })).assertFalse();
        });
        it("isPossibleNumber_existenceCountryCallingCodeArg", 0, () => {
            expect(isPossibleNumber({
                countryCallingCode: "7", country: "US", phone: '1112223344'
            })).assertTrue();
        });
        it("ShouldWorkInEdgeCases", 0, () => {
            expect(isPossibleNumber('1112223344')).assertFalse();
        });
    });
}
