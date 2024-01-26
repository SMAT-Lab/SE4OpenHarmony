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
import { format } from 'libphonenumber-js'

export default function formatXts() {
  describe('formatTest', () => {

    it("ShouldWorkWithTheFirstArgumentBeingAE.164NumberCase1", 0, () => {
      expect(format('+12133734253', 'INTERNATIONAL')).assertEqual('+1 213 373 4253');
    });

    it("ShouldWorkWithTheFirstArgumentBeingAE.164NumberCase2", 0, () => {
      expect(format('+12133734253', 'NATIONAL')).assertEqual('(213) 373-4253');
    })

    it("ShouldWorkWithTheFirstArgumentBeingAE.164NumberCase3", 0, () => {
      // Invalid number.
      expect(format('+12111111111', 'NATIONAL')).assertEqual('(211) 111-1111');
    })

    it("ShouldWorkWithTheFirstArgumentBeingAE.164NumberCase4", 0, () => {
      // Formatting invalid E.164 numbers.
      expect(format('+11111', 'INTERNATIONAL')).assertEqual('+1 1111');
    })

    it("ShouldWorkWithTheFirstArgumentBeingAE.164NumberCase5", 0, () => {
      expect(format('+11111', 'NATIONAL')).assertEqual('1111');
      expect(format('2133734253', 'US', 'E.164')).assertEqual('+12133734253');
    })

    it("ShouldFormatPhoneNumberExtensions", 0, () => {
      // Custom ext prefix
      expect(format({
        country: 'GB',
        phone: '7912345678',
        ext: '123'
      }, 'INTERNATIONAL')).assertEqual('+44 7912 345678 x123');
    });

    it("ShouldFormatPhoneNumberExtensionsCase2", 0, () => {
      // International
      expect(format({
        country: 'US',
        phone: '2133734253',
        ext: '123'
      }, 'INTERNATIONAL')).assertEqual('+1 213 373 4253 ext. 123');
    })

    it("ShouldFormatPhoneNumberExtensionsCase3", 0, () => {
      // International
      expect(format({
        country: 'US',
        phone: '2133734253',
        ext: '123'
      }, 'INTERNATIONAL')).assertEqual('+1 213 373 4253 ext. 123');
    })

    it("ShouldFormatPhoneNumberExtensionsCase4", 0, () => {
      // E.164
      expect(format({
        country: 'US',
        phone: '2133734253',
        ext: '123'
      }, 'E.164')).assertEqual('+12133734253');
    })

    it("ShouldFormatPhoneNumberExtensionsCase5", 0, () => {
      // RFC3966
      expect(format({
        country: 'US',
        phone: '2133734253',
        ext: '123'
      }, 'RFC3966')).assertEqual('tel:+12133734253;ext=123');
    })

    it("ShouldFormatPossibleNumbers", 0, () => {
      expect(format({
        countryCallingCode: '7', country: 'US', phone: "1111111111"
      }, 'E.164'))
        .assertEqual('+11111111111');

      expect(format({
        country: 'US', phone: "1111111111"
      }, 'INTERNATIONAL'))
        .assertEqual('+1 1111111111');
    })
  })
}