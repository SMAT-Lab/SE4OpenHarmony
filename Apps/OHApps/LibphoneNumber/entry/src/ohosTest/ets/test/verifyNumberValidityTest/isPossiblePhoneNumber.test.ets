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
import { isPossiblePhoneNumber } from 'libphonenumber-js';

export default function isPossiblePhoneNumberXts() {
  describe('isPossiblePhoneNumberTest', () => {
    it("ShouldDetectWhetherAPhoneNumberIsPossible", 0, () => {
      expect(isPossiblePhoneNumber('+7 (800) 555 35 35')).assertTrue();
      expect(isPossiblePhoneNumber('+7 1 (800) 555 35 35')).assertFalse();
      expect(isPossiblePhoneNumber(' +7 (800) 555 35 35')).assertFalse();
      expect(isPossiblePhoneNumber(' +7 (800) 555 35 35')).assertFalse();
    })

    it("ShouldDetectWhetherAPhoneNumberIsPossible_IncludeOptionalParameters", 0, () => {
      expect(isPossiblePhoneNumber('8 (800) 555 35 35', {
        defaultCountry: 'RU'
      })).assertTrue();
    })

    it("ShouldDetectWhetherAPhoneNumberIsPossible_InvalidParameter", 0, () => {
      expect(isPossiblePhoneNumber(' ')).assertFalse();
    })

    it("ShouldDetectWhetherAPhoneNumberIsPossibleFromCountryCodeIsRU", 0, () => {
      expect(isPossiblePhoneNumber('8 (800) 555 35 35', 'RU')).assertTrue();
      expect(isPossiblePhoneNumber('8 (800) 555 35 35 0', 'RU')).assertFalse();
      expect(isPossiblePhoneNumber('Call: 8 (800) 555 35 35', 'RU')).assertFalse();
    })

  })
}