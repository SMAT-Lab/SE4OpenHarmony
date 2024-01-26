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
import { findPhoneNumbersInText } from 'libphonenumber-js'

export default function findPhoneNumbersInTextXts() {

  describe('findPhoneNumbersInTextTest', () => {
    it("ShouldFindPhoneNumbersInTextWithDefaultCountry", 0, () => {
      expect(findPhoneNumbersInText('+7 (800) 555-35-35', 'US')[0].number.number).assertEqual('+78005553535');
      expect(findPhoneNumbersInText('+7 (800) 555-35-35', {
        defaultCountry: 'US'
      })[0].number.number).assertEqual('+78005553535');
    })

    it("ShouldFindPhoneNumbersInText", 0, () => {
      const NUMBERS = ['+78005553535', '+12133734253']
      const results = findPhoneNumbersInText('The number is +7 (800) 555-35-35 and not (213) 373-4253 as written in the document.');
      let i = 0
      while (i < results.length) {
        expect(results[i].number.number).assertEqual(NUMBERS[i]);
        i++
      }
    })

    it("ShouldFindPhoneNumbersInText_defaultCountryCallingCode", 0, () => {
      const NUMBERS = ['+870773111632']
      const results = findPhoneNumbersInText('The number is 773 111 632', {
        defaultCallingCode: '870'
      })
      let i = 0
      while (i < results.length) {
        expect(results[i].number.number).assertEqual(NUMBERS[i]);
        i++
      }
    })

    it("ShouldFindNumbers", 0, () => {
      expect(findPhoneNumbersInText('2133734253', {
        defaultCountry: 'US'
      })[0].number.number).assertEqual('+12133734253');

      expect(findPhoneNumbersInText('The number is +7 (800) 555-35-35 and not (213) 373-4253 as written in the document.', {
        defaultCountry: 'US'
      })[0].number.nationalNumber).assertEqual('8005553535');

      expect(findPhoneNumbersInText('The number is +7 (800) 555-35-35 and not (213) 373-4253 as written in the document.', {
        defaultCountry: 'US'
      })[1].number.nationalNumber).assertEqual('2133734253');

      expect(findPhoneNumbersInText('The number is +7 (800) 555-35-35 and not (213) 373-4253 as written in the document.', {
        defaultCountry: 'US',
        defaultCallingCode: '1'
      })[1].number.nationalNumber).assertEqual('2133734253');

      expect(findPhoneNumbersInText('1111111111', {
        defaultCountry: 'US'
      })).assertDeepEquals([]);

    })

    it("ShouldFindNonEuropeanDigits", 0, () => {
      expect(findPhoneNumbersInText('العَرَبِيَّة‎ +٤٤٣٣٣٣٣٣٣٣٣٣عَرَبِيّ‎', undefined)[0].number.nationalNumber)
        .assertDeepEquals('3333333333');
      expect(findPhoneNumbersInText('العَرَبِيَّة‎ +٤٤٣٣٣٣٣٣٣٣٣٣عَرَبِيّ‎', undefined)[0].number.country)
        .assertDeepEquals('GB');
    })

    it("FindPhoneNumbersWhichAreNotPhoneNumbers", 0, () => {
      expect(findPhoneNumbersInText('213(3734253', {
        defaultCountry: 'US'
      })).assertDeepEquals([]);
      expect(findPhoneNumbersInText('213(3734253sedsd3ff', {
        defaultCountry: 'US'
      })).assertDeepEquals([]);
      expect(findPhoneNumbersInText('The UUID is CA801c26f98cd16e231354125ad046e40b.', {
        defaultCountry: 'US'
      })).assertDeepEquals([]);
    })
  })
}