let __generate__Id: number = 0;
function generateId(): string {
    return "validatePhoneNumberLength.test_" + ++__generate__Id;
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
import { validatePhoneNumberLength } from 'libphonenumber-js';
export default function validatePhoneNumberLengthXts() {
    describe('validatePhoneNumberLengthTest', () => {
        it("ShouldDetectWhetherAPhoneNumberLengthIsValid", 0, () => {
            expect(validatePhoneNumberLength('444 1 44', 'TR')).assertEqual('TOO_SHORT');
            expect(validatePhoneNumberLength('444 1 444', 'TR')).assertUndefined();
            expect(validatePhoneNumberLength('444 1 4444', 'TR')).assertEqual('INVALID_LENGTH');
            expect(validatePhoneNumberLength('444 1 4444444444', 'TR')).assertEqual('TOO_LONG');
        });
        it("NonPhoneNumberValidatePhoneNumberLength", 0, () => {
            // Not a phone number.
            expect(validatePhoneNumberLength('+')).assertEqual('NOT_A_NUMBER');
        });
        it("NoCountrySuppliedForANationalNumber", 0, () => {
            expect(validatePhoneNumberLength('abcde'))
                .assertEqual('NOT_A_NUMBER'); // No country supplied for a national number.
        });
        it("TestNational_significant_NumberLength", 0, () => {
            expect(validatePhoneNumberLength('2', 'US')).assertEqual('TOO_SHORT');
            expect(validatePhoneNumberLength('+1', 'US')).assertEqual('TOO_SHORT');
            expect(validatePhoneNumberLength('+12', 'US'))
                .assertEqual('TOO_SHORT'); // Test national (significant) number length.
        });
        it("TooShortWhileTheNumberIsNotConsideredViable", 0, () => {
            expect(validatePhoneNumberLength('123'))
                .assertEqual('INVALID_COUNTRY'); // Too short while the number is not considered "viable"
        });
    });
}
