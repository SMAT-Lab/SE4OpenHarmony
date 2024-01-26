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
import { CountryCode, getCountries } from 'libphonenumber-js/core';
import metadata from 'libphonenumber-js/metadata.min.json'
import customMeaDta from '../../../../main/ets/pages/customData.json'
import { getCountryCallingCode, getExtPrefix, isSupportedCountry } from 'libphonenumber-js';

export default function getCountriesXts() {
  describe('getCountriesTest', () => {
    it("ShouldGetCountriesList", 0, () => {
      const countryCode: CountryCode[] = getCountries(metadata);
      console.log(" getCountriesXts 000 == " + JSON.stringify(countryCode));
      expect(getCountries(metadata).indexOf('RU') > 0).assertTrue();
    })

    it("countryListLengthIs2", 0, () => {
      expect(getCountries(customMeaDta).length).assertEqual(2);
    })

    it("customMeaDtaUSIndexIs1", 0, () => {
      expect(getCountries(customMeaDta).indexOf('US')).assertEqual(1);
    })

    it("ShouldGetCountryCallingCode", 0, () => {
      expect(getCountryCallingCode('US')).assertEqual("1");
      expect(getCountryCallingCode('CN')).assertEqual("86");
    })

    it("ShouldExtPrefix", 0, () => {
      expect(getExtPrefix('US')).assertEqual(" ext. ");
      expect(getExtPrefix('CN')).assertEqual(" ext. ");
    })

    it("ShouldShowWhetherThisCountryCodeIsSupported", 0, () => {
      expect(isSupportedCountry("CN")).assertTrue();
      expect(isSupportedCountry("US")).assertTrue();
      expect(isSupportedCountry("RU")).assertTrue();
    })

    it("ShouldShowWhetherThisCountryCodeNotSupported", 0, () => {
      expect(isSupportedCountry("YY")).assertFalse();
    })
  })
}