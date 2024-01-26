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
import { formatNumber, FormatNumberOptions } from 'libphonenumber-js'

export default function formatNumberXts() {
  describe('formatNumberTest', () => {

    it("ShouldWorkWithTheFirstArgumentBeingAE.164NumberIsINTERNATIONAL", 0, () => {
      expect(formatNumber('+12133734253', 'INTERNATIONAL')).assertEqual('+1 213 373 4253');
      // Formatting invalid E.164 numbers.
      expect(formatNumber('+11111', 'INTERNATIONAL')).assertEqual('+1 1111');

    });

    it("ShouldWorkWithTheFirstArgumentBeingAE.164NumberIsNATIONAL", 0, () => {
      expect(formatNumber('+12133734253', 'NATIONAL')).assertEqual('(213) 373-4253');
      // Invalid number.
      expect(formatNumber('+12111111111', 'NATIONAL')).assertEqual('(211) 111-1111');
      expect(formatNumber('+12133734253', 'NATIONAL')).assertEqual('(213) 373-4253');
      expect(formatNumber('+11111', 'NATIONAL')).assertEqual('1111');
    })

    it("ShouldSortOutTheArgumentsArgFormatNumberOptions", 0, () => {
      const options: FormatNumberOptions = {
        formatExtension: (number: string, extension: string) => `${number} доб. ${extension}`
      }
      expect(formatNumber({
        phone: '8005553535',
        country: 'RU',
        ext: '123'
      },
        'NATIONAL', options))
        .assertEqual('8 (800) 555-35-35 доб. 123');
    });

    it("ShouldSortOutTheArgumentsArgFormatNumberOptions2", 0, () => {
      const options: FormatNumberOptions = {
        formatExtension: (number: string, extension: string) => `${number} доб. ${extension}`
      }
      // Parse number from string.
      expect(formatNumber('+78005553535', 'NATIONAL', options)).assertEqual('8 (800) 555-35-35');
    })

    it("ShouldFormatPhoneNumberExtensions", 0, () => {
      expect(formatNumber({
        country: 'US',
        phone: '2133734253',
        ext: '123'
      }, 'NATIONAL')).assertEqual('(213) 373-4253 ext. 123');
    });

    it("ShouldFormatPhoneNumberExtensionsInternational", 0, () => {
      // International
      expect(formatNumber({
        country: 'US',
        phone: '2133734253',
        ext: '123'
      }, 'INTERNATIONAL')).assertEqual('+1 213 373 4253 ext. 123');
    })

    it("ShouldFormatPhoneNumberExtensionsE.164", 0, () => {
      // E.164
      expect(formatNumber({
        country: 'US',
        phone: '2133734253',
        ext: '123'
      }, 'E.164')).assertEqual('+12133734253');
    })

    it("ShouldFormatPhoneNumberExtensionsRFC3966", 0, () => {
      // RFC3966
      expect(formatNumber({
        country: 'US',
        phone: '2133734253',
        ext: '123'
      }, 'RFC3966')).assertEqual('tel:+12133734253;ext=123');
    })

    it("ShouldFormatPhoneNumberExtensionsCustomExtPrefix", 0, () => {
      // Custom ext prefix
      expect(formatNumber({
        country: 'GB',
        phone: '7912345678',
        ext: '123'
      }, 'INTERNATIONAL')).assertEqual('+44 7912 345678 x123');
    })

    it("ShouldFormatPossibleNumbers", 0, () => {
      expect(formatNumber({
        countryCallingCode: '7', country: 'US', phone: "1111111111"
      }, 'E.164'))
        .assertEqual('+11111111111');

      expect(formatNumber({
        country: 'US', phone: "1111111111"
      }, 'INTERNATIONAL'))
        .assertEqual('+1 1111111111');
    })
  })
}