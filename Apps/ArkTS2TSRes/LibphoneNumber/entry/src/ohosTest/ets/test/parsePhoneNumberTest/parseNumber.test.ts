let __generate__Id: number = 0;
function generateId(): string {
    return "parseNumber.test_" + ++__generate__Id;
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
import { parseNumber } from 'libphonenumber-js';
export default function parseNumberXts() {
    describe('parseNumberTest', () => {
        it('ShouldNotParseInvalidPhoneNumbers1', 0, () => {
            expect(JSON.stringify(parseNumber('+7 (800) 55-35-35-55'))).assertEqual('{}');
            expect(JSON.stringify(parseNumber('+7 (800) 55-35-35', 'US'))).assertEqual("{}");
            expect(JSON.stringify(parseNumber('+1 187 215 5230', 'US'))).assertDeepEquals("{}");
            expect(JSON.stringify(parseNumber('911231231', 'BE'))).assertDeepEquals("{}");
        });
        it('ShouldNotParseInvalidPhoneNumbers2', 0, () => {
            expect(JSON.stringify(parseNumber('(800) 55 35 35', {
                defaultCountry: 'RU'
            }))).assertDeepEquals("{}");
        });
        it("ShouldParseValidPhoneNumbersRU", 0, () => {
            expect(parseNumber('Phone: 8 (800) 555 35 35.', 'RU')).assertDeepEquals({
                country: 'RU',
                phone: '8005553535'
            });
        });
        it("ShouldParseValidPhoneNumbersIM", 0, () => {
            expect(parseNumber('07624369230', 'GB')).assertDeepEquals({
                country: 'IM',
                phone: '7624369230'
            });
        });
        it("ShouldParseValidPhoneNumbersCN", 0, () => {
            expect(parseNumber('010-852644821', 'CN')).assertDeepEquals({
                country: 'CN',
                phone: '10852644821'
            }); // France
        });
        it("ShouldParsePossibleNumbersInternationalPhoneNumber", 0, () => {
            expect(parseNumber('+71112223344')).assertDeepEquals({});
            expect(parseNumber('+71112223344', {
                extended: true
            })).assertDeepEquals({
                country: undefined,
                countryCallingCode: '7',
                phone: '1112223344',
                carrierCode: undefined,
                ext: undefined,
                valid: false,
                possible: true
            }); // International phone number.
            // Single country with the given country phone code.
            expect(parseNumber('+996', {
                extended: true
            })).assertDeepEquals({}); // Valid number.
            expect(parseNumber('+78005553535', {
                extended: true
            })).assertDeepEquals({
                country: 'RU',
                countryCallingCode: '7',
                phone: '8005553535',
                carrierCode: undefined,
                ext: undefined,
                valid: true,
                possible: true
            });
            expect(parseNumber('+966', {
                extended: true
            })).assertDeepEquals({});
            expect(parseNumber('+9664', {
                extended: true
            })).assertDeepEquals({});
            expect(parseNumber('+96645', {
                extended: true
            })).assertDeepEquals({
                carrierCode: undefined,
                phone: '45',
                ext: undefined,
                country: 'SA',
                countryCallingCode: '966',
                possible: false,
                valid: false
            });
        });
        it("ShouldParsePossibleNumbers", 0, () => {
            expect(parseNumber('1112223344', {
                defaultCountry: 'RU',
                extended: true
            })).assertDeepEquals({
                country: 'RU',
                countryCallingCode: '7',
                phone: '1112223344',
                carrierCode: undefined,
                ext: undefined,
                valid: false,
                possible: true
            }); // International phone number.
            // Several countries with the same country phone code.
        });
        it("ShouldParsePossibleNumbersTooShort", 0, () => {
            expect(parseNumber('+33011222333', {
                extended: true
            })).assertDeepEquals({
                country: 'FR',
                countryCallingCode: '33',
                phone: '011222333',
                carrierCode: undefined,
                ext: undefined,
                valid: false,
                possible: true
            }); // Too short.
            // Won't strip national prefix `8` because otherwise the number would be too short.
        });
        it("ShouldParsePossibleNumbersTooLong", 0, () => {
            expect(parseNumber('+7 (800) 55-35-35', {
                extended: true
            })).assertDeepEquals({
                country: 'RU',
                countryCallingCode: '7',
                phone: '800553535',
                carrierCode: undefined,
                ext: undefined,
                valid: false,
                possible: false
            }); // Too long.
        });
        it("ShouldParsePossibleNumbersNoNationalNumberToBeParsed", 0, () => {
            expect(parseNumber('+1 213 37342530', {
                extended: true
            })).assertDeepEquals({
                country: undefined,
                countryCallingCode: '1',
                phone: '21337342530',
                carrierCode: undefined,
                ext: undefined,
                valid: false,
                possible: false
            }); // No national number to be parsed.
        });
    });
}
