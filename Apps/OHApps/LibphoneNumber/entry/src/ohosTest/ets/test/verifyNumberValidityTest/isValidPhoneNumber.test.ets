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
import { isValidPhoneNumber } from 'libphonenumber-js';

export default function isValidPhoneNumberXts() {
  describe('isValidPhoneNumberTest', () => {
    it('ShouldDetectWhetherAPhoneNumberIsValidCase1', 0, () => {
      expect(isValidPhoneNumber('8 (800) 555 35 35', 'RU')).assertTrue();
      expect(isValidPhoneNumber('8 (800) 555 35 35 0', 'RU')).assertFalse();
      expect(isValidPhoneNumber('Call: 8 (800) 555 35 35', 'RU')).assertFalse();
    })

    it('ShouldDetectWhetherAPhoneNumberIsValidCase2', 0, () => {
      expect(isValidPhoneNumber('8 (800) 555 35 35', {
        defaultCountry: 'RU'
      })).assertTrue();
    })

    it('ShouldDetectWhetherAPhoneNumberIsValidCase3', 0, () => {
      expect(isValidPhoneNumber('+7 (800) 555 35 35', {
        defaultCountry: "US", defaultCallingCode: "7"
      })).assertTrue();
    })

    it('ShouldDetectWhetherAPhoneNumberIsValidCase4', 0, () => {
      expect(isValidPhoneNumber(' ')).assertFalse();
    })

    it('ShouldDetectWhetherAPhoneNumberIsValidCase5', 0, () => {
      expect(isValidPhoneNumber('+7 1 (800) 555 35 35')).assertFalse();
      expect(isValidPhoneNumber(' +7 (800) 555 35 35')).assertFalse();
    })
  })
}