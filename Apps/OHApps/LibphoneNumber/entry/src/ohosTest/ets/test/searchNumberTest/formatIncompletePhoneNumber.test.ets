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
import { formatIncompletePhoneNumber } from 'libphonenumber-js'

export default function formatIncompletePhoneNumberXts() {
  describe('formatIncompletePhoneNumberTest', () => {
    it("ShouldFormatParsedInputValueCase1", 0, () => {
      expect(formatIncompletePhoneNumber('880055535', 'RU')).assertEqual("8 (800) 555-35");
    })

    it("ShouldFormatParsedInputValueCase2", 0, () => {
      expect(formatIncompletePhoneNumber('+780055535', "US")).assertEqual("+7 800 555 35");
    })

    it("ShouldFormatParsedInputValueCase3", 0, () => {
      expect(formatIncompletePhoneNumber("+780055535")).assertEqual("+7 800 555 35");
    })

    it("ShouldFormatParsedInputValueCase4", 0, () => {
      expect(formatIncompletePhoneNumber("+780055535", "RU")).assertEqual("+7 800 555 35");
    })

    it("ShouldFormatParsedInputValueCase5", 0, () => {
      expect(formatIncompletePhoneNumber("+8617330754462", "CN")).assertEqual("+86 173 3075 4462");
    })
  })
}