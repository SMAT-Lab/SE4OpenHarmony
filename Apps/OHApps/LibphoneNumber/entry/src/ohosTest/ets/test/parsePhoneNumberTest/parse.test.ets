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

import { describe, it, expect } from '@ohos/hypium'
import { parse } from 'libphonenumber-js';

export default function parseXts() {

  describe('parseTest', () => {

    it('ShouldNotParseInvalidPhoneNumbers', 0, () => {
      expect(JSON.stringify(parse('+1 187 215 5230', 'US'))).assertDeepEquals("{}");
      expect(JSON.stringify(parse('911231231', 'BE'))).assertDeepEquals("{}");
      expect(JSON.stringify(parse('+7 (800) 55-35-35-55'))).assertEqual('{}');
      expect(JSON.stringify(parse('+7 (800) 55-35-35', 'US'))).assertEqual("{}");
    })

    it('ShouldNotParseInvalidPhoneNumbersCountryIsRU', 0, () => {
      expect(JSON.stringify(parse('(800) 55 35 35', {
        defaultCountry: 'RU'
      }))).assertDeepEquals("{}");
    })

    it("ShouldParseValidPhoneNumbers", 0, () => {
      expect(parse('Phone: 8 (800) 555 35 35.', 'RU')).assertDeepEquals({
        country: 'RU',
        phone: '8005553535'
      });
    })

    it("ShouldParseValidPhoneNumbersGB", 0, () => {
      expect(parse('07624369230', 'GB')).assertDeepEquals({
        country: 'IM',
        phone: '7624369230'
      });
    })

    it("ShouldParseValidPhoneNumbersKZ", 0, () => {
      expect(parse('+7 702 211 1111')).assertDeepEquals({
        country: 'KZ',
        phone: '7022111111'
      });
    })

    it("ShouldParseValidPhoneNumbersCN", 0, () => {
      expect(parse('010-852644821', 'CN')).assertDeepEquals({
        country: 'CN',
        phone: '10852644821'
      });
    })

    it("ShouldParsePossibleNumbersIsParseNumberOptions", 0, () => {
      expect(parse('+78005553535', {
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

      expect(parse('+966', {
        extended: true
      })).assertDeepEquals({});
      expect(parse('+9664', {
        extended: true
      })).assertDeepEquals({});
      expect(parse('+96645', {
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
    })

    it("ShouldParsePossibleNumbersIsParseNumberOptions2", 0, () => {
      expect(parse('+71112223344')).assertDeepEquals({});
      expect(parse('+71112223344', {
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
    })

    it("ShouldParsePossibleNumberTooShort", 0, () => {
      expect(parse('+33011222333', {
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
    })

    it("ShouldParsePossibleNumbersValidNumber", 0, () => {
      expect(parse('+996', {
        extended: true
      })).assertDeepEquals({}); // Valid number.
    })

    it("ShouldParsePossibleNumbersIsParseNumberOptionsToLong", 0, () => {
      expect(parse('+7 (800) 55-35-35', {
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
    })

    it("NoNationalNumberToBeParsed.", 0, () => {
      expect(parse('+1 213 37342530', {
        extended: true
      })).assertDeepEquals({
        country: undefined,
        countryCallingCode: '1',
        phone: '21337342530',
        carrierCode: undefined,
        ext: undefined,
        valid: false,
        possible: false
      });
    })

    it("InternationalPhoneNumber", 0, () => {
      expect(parse('1112223344', {
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
      })
      // Several countries with the same country phone code.
    })
  })
}