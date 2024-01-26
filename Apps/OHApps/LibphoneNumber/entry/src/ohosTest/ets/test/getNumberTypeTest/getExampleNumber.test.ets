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
import { getExampleNumber } from 'libphonenumber-js';
import examples from 'libphonenumber-js/examples.mobile.json'

export default function getExampleNumberXts() {
  describe('getExampleNumberTest', () => {
    it("ShouldGetAnExampleNumber", 0, () => {
      const phoneNumber = getExampleNumber('RU', examples);
      if (phoneNumber != undefined) {
        expect(phoneNumber.nationalNumber).assertEqual('9123456789');
        expect(phoneNumber.number).assertEqual('+79123456789');
        expect(phoneNumber.countryCallingCode).assertEqual('7');
        expect(phoneNumber.country).assertEqual('RU');
      }
    })

    it("ShouldGetAnCNExampleNumber", 0, () => {
      const phoneNumber = getExampleNumber('CN', examples);
      if (phoneNumber != undefined) {
        expect(phoneNumber.nationalNumber).assertEqual('13123456789');
        expect(phoneNumber.number).assertEqual('+8613123456789');
        expect(phoneNumber.countryCallingCode).assertEqual('86');
        expect(phoneNumber.country).assertEqual('CN');
      }
    })

    it("ShouldGetAnUSExampleNumber", 0, () => {
      const phoneNumber = getExampleNumber('US', examples);
      if (phoneNumber != undefined) {
        expect(phoneNumber.countryCallingCode).assertEqual('1');
        expect(phoneNumber.country).assertEqual('US');
      }
    })

    it("ShouldGetAnACExampleNumber", 0, () => {
      const phoneNumber = getExampleNumber('AC', examples);
      if (phoneNumber != undefined) {
        expect(phoneNumber.country).assertEqual('AC');
      }
    })

    it("ShouldGetDZExampleNumber", 0, () => {
      const phoneNumber = getExampleNumber('DZ', examples);
      if (phoneNumber != undefined) {
        expect(phoneNumber.country).assertEqual('DZ');
        expect(phoneNumber.countryCallingCode).assertEqual('213');
        expect(phoneNumber.nationalNumber).assertEqual('551234567');
      }
    })
  })
}