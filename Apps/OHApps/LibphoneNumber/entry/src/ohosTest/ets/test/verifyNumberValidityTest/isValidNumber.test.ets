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
import { isValidNumber } from 'libphonenumber-js';

export default function isValidNumberXts() {
  describe('isValidNumberTest', () => {
    it("ShouldValidateUSPhoneNumbers", 0, () => {
      expect(isValidNumber('(213) 373-4253', 'US')).assertTrue();
      expect(isValidNumber('(213) 37', 'US')).assertFalse();
      expect(isValidNumber({
        country: 'US', phone: '2133734253'
      })).assertTrue();
      expect(isValidNumber('+380972423740')).assertTrue();
      expect(isValidNumber('0912345678', 'TW')).assertTrue();
      expect(isValidNumber('07624369230', 'GB')).assertTrue();
    })

    it("VerifyNumbersWithDefaultCountryCodesIsNUllAndUndefined", 0, () => {
      expect(isValidNumber('+1-213-373-4253', null)).assertTrue();
      expect(isValidNumber('+1-213-373-4253', undefined)).assertTrue();
    })

    it("VerifyNumbersWithoutDefaultCountryCodes", 0, () => {
      expect(isValidNumber('+1-213-373-4253')).assertTrue();
      expect(isValidNumber('+1-213-373')).assertFalse();
    })

    it("ShouldRefinePhoneNumberValidationInCaseExtendedRegularExpressionsAreSetForACountry", 0, () => {
      expect(isValidNumber('961111111', 'UZ')).assertTrue();
      expect(isValidNumber('912345678', 'UZ')).assertTrue();
    })

    it("ShouldAcceptPhoneNumberExtensions", 0, () => {
      expect(isValidNumber('+12133734253 ext. 123')).assertTrue();
      expect(isValidNumber('88005553535 x123', 'RU')).assertTrue();
    })
  })
}