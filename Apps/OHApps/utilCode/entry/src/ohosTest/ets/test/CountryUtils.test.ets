/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import { CountryUtils } from '@ohos/util_code'
import I18n from '@ohos.i18n';

export default function CountryUtilsTest() {
  describe('CountryUtilsTest', () => {

    it('getCountryCode', 0, () => {
      expect(CountryUtils.getCountryCode('CN')).assertEqual('+86')
    })

    it('getCountryCodeByLanguage', 0, () => {
      let systemRegion = I18n.System.getSystemRegion();
      expect(CountryUtils.getCountryCodeByLanguage()).assertEqual(CountryUtils.getCountryCode(systemRegion))
    })

    CountryUtils.getCountryCodeFromMap().forEach((value , key) => {
      it('getCountryCodeFromMap_' + key, 0, () => {
        expect(CountryUtils.getCountryCodeFromMap().get(key)).assertEqual(value)
      })
    });

  })
}