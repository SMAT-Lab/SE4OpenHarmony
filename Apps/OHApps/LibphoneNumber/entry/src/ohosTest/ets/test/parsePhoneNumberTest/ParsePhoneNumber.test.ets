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
import { ParseError, parsePhoneNumber } from "libphonenumber-js";

const USE_NON_GEOGRAPHIC_COUNTRY_CODE = false;

export default function parsePhoneNumberXts() {
  describe('parsePhoneNumberTest', () => {
    it('ShouldParsePhoneNumbersFromString', 0, () => {
      expect(parsePhoneNumber('Phone: 8 (800) 555 35 35.', 'RU').nationalNumber).assertEqual('8005553535');
      try {
        parsePhoneNumber('3', 'RU');
      } catch (error) {
        if (error instanceof ParseError) {
          expect(error.message).assertEqual("TOO_SHORT");
        }
      }
    });

    it("ShouldParsePhoneNumbersWhenInvalidCountryCodeIsPassed", 0, () => {
      try {
        parsePhoneNumber('+861875676768896867676767', 'CN').nationalNumber;
      } catch (error) {
        if (error instanceof ParseError) {
          expect(error.message).assertEqual("TOO_LONG");
        }
      }
    });

    it('ShouldParseNonGeographicNumberingPlanPhoneNumbers', 0, () => {
      const phoneNumber = parsePhoneNumber('+870773111632')
      expect(phoneNumber.number).assertEqual('+870773111632');
      if (USE_NON_GEOGRAPHIC_COUNTRY_CODE) {
        expect(phoneNumber.country).assertEqual('001');
      } else {
        expect(phoneNumber.country).assertUndefined();
      }
      expect(phoneNumber.countryCallingCode).assertEqual("870");
    });

    it("ShouldDetermineThePossibilityOfNonGeographicPhoneNumbers", 0, () => {
      const phoneNumber = parsePhoneNumber('+870773111632');
      expect(phoneNumber.isPossible()).assertTrue();
      const phoneNumber2 = parsePhoneNumber('+8707731116321');
      expect(phoneNumber2.isPossible()).assertFalse();
    });

    it("ShouldNotPrematurelyStripAPossibleNationalPrefixFromChineseNumbers", 0, () => {
      let phoneNumber = parsePhoneNumber('+86123456789');
      expect(phoneNumber.isPossible()).assertTrue();
      expect(phoneNumber.isValid()).assertFalse();
      expect(phoneNumber.nationalNumber).assertEqual("123456789");
    });

  });
}