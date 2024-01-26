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
import { isValidNumberForRegion } from 'libphonenumber-js';

export default function isValidNumberForRegionXts() {
  describe('isValidNumberForRegionTest', () => {
    it("ShouldDetectIfIsValidNumberForRegionCase1", 0, () => {
      expect(isValidNumberForRegion('07624369230', 'GB')).assertFalse();
    })

    it("ShouldDetectIfIsValidNumberForRegionCase2", 0, () => {
      expect(isValidNumberForRegion('07624369230', 'IM')).assertTrue();
    })

    it("ShouldDetectIfIsValidNumberForRegionCase3", 0, () => {
      expect(isValidNumberForRegion('7', 'GB')).assertFalse();
    })

    it("ShouldDetectIfIsValidNumberForRegionCase4", 0, () => {
      expect(isValidNumberForRegion('xxx07624369230', 'CK')).assertFalse();
    })

    it("ShouldDetectIfIsValidNumberForRegionCase5", 0, () => {
      expect(isValidNumberForRegion('076243ss69230', "AU")).assertFalse();
    })
  })
}