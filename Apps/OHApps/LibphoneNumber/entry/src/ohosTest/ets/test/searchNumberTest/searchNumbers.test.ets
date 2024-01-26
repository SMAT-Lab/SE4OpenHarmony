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
import { NumberFound, NumberFoundLegacy, searchNumbers } from 'libphonenumber-js';
import Logger from '../utils/Logger';
import { returnNumberFoundLegacyToEts, returnNumberFoundToEts, } from './searchNumberIterableIteratorResultToEts';

const Log = new Logger("searchNumbersXts :: ");

export default function searchNumbersXts() {

  describe('searchNumbersTest', () => {
    let tmp: Array<NumberFoundLegacy> = returnNumberFoundLegacyToEts(
      "The number is +7 (800) 555-35-35 and not (213) 373-4253 as written in the document.","US"
    );
    Log.info(" searchNumbersXts init tmp.length == " + tmp.length);
    let temp: Array<NumberFound> = returnNumberFoundToEts(
      'The number is +7 (800) 555-35-35 and',
      {
        defaultCountry: "US",
        v2: true
      });
    Log.info(" searchNumbersXts init temp.length == " + temp.length);
    
    it("searchNumbersCase1", 0, () => {
      expect(tmp.length).assertEqual(2);
    })

    it("searchNumbersCase2", 0, () => {
      expect(tmp[0].phone).assertEqual("8005553535");
    })

    it("searchNumbersCase3", 0, () => {
      expect(tmp[1].phone).assertEqual("2133734253");
    })

    it("searchNumbersCase4", 0, () => {
      let tmp: Array<NumberFoundLegacy> = returnNumberFoundLegacyToEts('The number is +7 (800) 555-35-35 and');
      Log.info(" searchNumbersXts searchNumbersCase4 tmp.length == " + tmp.length);
      expect(tmp.length).assertEqual(1);
    })

    it("searchNumbersCase5", 0, () => {
      let tmp: Array<NumberFoundLegacy> = returnNumberFoundLegacyToEts("The number is  not (*213) 3&73-4253 as written in the document.");
      Log.info(" searchNumbersXts searchNumbersCase5 tmp.length == " + tmp.length);
      expect(tmp.length).assertEqual(0);
    })

    it("searchNumbersCase6", 0, () => {
      Log.info(" temp.length : " + temp.length);
      expect(temp.length).assertEqual(1)
    })

    it("searchNumbersCase7", 0, () => {
      expect(temp[0].startsAt).assertEqual(14);
    })

    it("searchNumbersCase8", 0, () => {
      expect(temp[0].number.nationalNumber).assertEqual("8005553535");
    })

    it("searchNumbersCase9", 0, () => {
      expect(temp[0].number.number).assertEqual("+78005553535");
    })

    it("searchNumbersCase10", 0, () => {
      expect(temp[0].number.country).assertEqual("RU");
    })

  })
}