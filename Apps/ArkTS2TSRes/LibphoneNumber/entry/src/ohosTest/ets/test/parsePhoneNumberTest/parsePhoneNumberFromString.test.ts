let __generate__Id: number = 0;
function generateId(): string {
    return "parsePhoneNumberFromString.test_" + ++__generate__Id;
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
import { describe, expect, it } from '@ohos/hypium';
import parsePhoneNumberFromString from 'libphonenumber-js';
export default function parsePhoneNumberFromStringXts() {
    describe("parsePhoneNumberFromStringTest", () => {
        it("parsePhoneNumberFromString", 0, () => {
            let re = parsePhoneNumberFromString("+8618717452986", {
                defaultCountry: "CN",
                extract: false
            });
            if (re != undefined) {
                expect(re.countryCallingCode).assertDeepEquals("86");
                expect(re.nationalNumber).assertDeepEquals("18717452986");
                expect(re.getURI()).assertDeepEquals("tel:+8618717452986");
            }
            else {
                expect(re).assertUndefined();
            }
        });
        it("ShouldSupportExtractFalseFlag", 0, () => {
            expect(parsePhoneNumberFromString('Call: (213) 373-4253', {
                extract: false,
                defaultCountry: 'US'
            })).assertUndefined();
        });
        it("ShouldSupportExtractFalseFlagFalse", 0, () => {
            expect(parsePhoneNumberFromString('(213) 373-4253x', {
                extract: false,
                defaultCountry: 'US'
            })).assertUndefined();
        });
        it("ShouldSupportExtractFalseFlagTrue", 0, () => {
            expect(parsePhoneNumberFromString('(213) 373-4253', {
                extract: false,
                defaultCountry: 'US'
            })).not().assertUndefined();
        });
        it("ShouldSupportExtractFalseFlagTrueCase1", 0, () => {
            expect(parsePhoneNumberFromString('+1 (213) 373-4253', {
                extract: false,
                defaultCountry: 'US'
            })).not().assertUndefined();
        });
        it("ShouldSupportExtractFalseFlagTrue2", 0, () => {
            expect(parsePhoneNumberFromString('- (213) 373-4253 -', {
                extract: false,
                defaultCountry: 'US'
            })).not().assertUndefined();
        });
        it("ShouldSupportNormalNumberExtractFalseFlagFalse", 0, () => {
            expect(parsePhoneNumberFromString(' +1 (213) 373-4253', {
                extract: false,
                defaultCountry: 'US'
            })).assertUndefined();
        });
    });
}
