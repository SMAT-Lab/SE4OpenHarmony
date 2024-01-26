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
import { PhoneNumberMatcher } from 'libphonenumber-js'

export default function PhoneNumberMatcherXts() {

  describe('PhoneNumberMatcherTest', () => {
    it("ShouldFindPhoneNumbers", 0, () => {
      const matcher = new PhoneNumberMatcher('The number is +7 (800) 555-35-35 and not (213) 373-4253 as written in the document.', {
        defaultCountry: "RU",
        v2: true
      });
      while (matcher.hasNext()) {
        const matcherNext = matcher.next();
        if (matcherNext != undefined) {
          expect(matcherNext.startsAt).assertEqual(14);
          expect(matcherNext.endsAt).assertEqual(32);
          expect(matcherNext.number.nationalNumber).assertEqual("8005553535");
          expect(matcherNext.number.country).assertEqual("RU");
          expect(matcherNext.number.countryCallingCode).assertEqual("7");
        }
      }
    })

    it("ShouldFindPhoneNumbersOnlyTextArg", 0, () => {
      const matcher = new PhoneNumberMatcher('The number is +7 (800) 555-35-35 and not (213) 373-4253 as written in the document.');
      while (matcher.hasNext()) {
        const matcherNext = matcher.next();
        if (matcherNext != undefined) {
          expect(matcherNext.startsAt).assertEqual(14);
          expect(matcherNext.endsAt).assertEqual(32);
          expect(JSON.stringify(matcherNext)).not().assertNull();
        }
      }
    })

    it("ShouldFindPhoneNumbers_CN", 0, () => {
      const matcher = new PhoneNumberMatcher('cn number is +86 173 2945 1789 .', {
        defaultCountry: "CN",
        v2: true
      });
      while (matcher.hasNext()) {
        const matcherNext = matcher.next();
        if (matcherNext != undefined) {
          expect(matcherNext.startsAt).assertEqual(13);
          expect(matcherNext.endsAt).assertEqual(30);
          expect(matcherNext.number.nationalNumber).assertEqual("17329451789");
          expect(matcherNext.number.country).assertEqual("CN");
          expect(matcherNext.number.countryCallingCode).assertEqual("86");
          expect(matcherNext.number.number).assertEqual("+8617329451789");
        }
      }
    })

    it("PhoneNumberMatcher_MX", 0, () => {
      const matcher = new PhoneNumberMatcher('MX number +52 (449)978-0001 and not 4499780001 as written in the document.');
      while (matcher.hasNext()) {
        const matcherNext = matcher.next();
        if (matcherNext != undefined) {
          expect(matcherNext.startsAt).assertEqual(10);
          expect(matcherNext.endsAt).assertEqual(27);
          expect(matcherNext.number).assertUndefined();
        }
      }
    })

    it("TestParsingFixed_lineNumbersOfArgentina", 0, () => {
      const matcher = new PhoneNumberMatcher('AR number+54 11 3797 0000 and not 1137970000 as written in the document.');
      while (matcher.hasNext()) {
        const matcherNext = matcher.next();
        if (matcherNext != undefined) {
          expect(matcherNext.startsAt).assertEqual(9);
          expect(matcherNext.endsAt).assertEqual(25);
          expect(matcherNext.number).assertUndefined();
        }
      }
    })
  })
}