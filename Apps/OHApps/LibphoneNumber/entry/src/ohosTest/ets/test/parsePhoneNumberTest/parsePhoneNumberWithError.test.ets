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
import { parsePhoneNumberWithError } from "libphonenumber-js";

export default function parsePhoneNumberWithErrorXts() {
  describe('parsePhoneNumberWithErrorTest', () => {
    it("shouldGetTelURI", 0, () => {
      const phoneNumber = parsePhoneNumberWithError('Phone: 8 (800) 555 35 35 ext. 1234.', 'RU');
      expect(phoneNumber.getURI()).assertEqual('tel:+78005553535;ext=1234');
    });

    it("ShouldThrowParseErrors", 0, () => {
      expect(() => {
        return parsePhoneNumberWithError('+', 'RU');
      }).assertThrowError("NOT_A_NUMBER");
    })

    it("ShouldThrowParseErrorsCase1", 0, () => {
      expect(() => {
        return parsePhoneNumberWithError('a', 'RU');
      }).assertThrowError("NOT_A_NUMBER");
    })

    it("ShouldThrowParseErrorsCase2", 0, () => {
      expect(() => {
        return parsePhoneNumberWithError('1', 'RU');
      }).assertThrowError("TOO_SHORT");
    })

    it("ShouldThrowParseErrorsCase3", 0, () => {
      expect(() => {
        return parsePhoneNumberWithError('+4');
      }).assertThrowError("TOO_SHORT");
    })

    it("ShouldThrowParseErrorsCase4", 0, () => {
      expect(() => {
        return parsePhoneNumberWithError('+44');
      }).assertThrowError("TOO_SHORT");
    })

    it("ShouldThrowParseErrorsCase5", 0, () => {
      expect(() => {
        return parsePhoneNumberWithError('+443');
      }).assertThrowError("TOO_SHORT");
    })

    it("ShouldThrowParseErrorsCase6", 0, () => {
      expect(() => {
        return parsePhoneNumberWithError('+370');
      }).assertThrowError("TOO_SHORT");
    })

    it("ShouldThrowParseErrorsCase7", 0, () => {
      expect(() => {
        return parsePhoneNumberWithError('88888888888888888888', 'RU');
      }).assertThrowError("TOO_LONG");
    })

    it("ShouldThrowParseErrorsCase8", 0, () => {
      expect(() => {
        return parsePhoneNumberWithError('8 (800) 555 35 35');
      }).assertThrowError("INVALID_COUNTRY");
    })

    it("ShouldThrowParseErrorsCase9", 0, () => {
      expect(() => {
        return parsePhoneNumberWithError('+9991112233');
      }).assertThrowError("INVALID_COUNTRY");
    })

    it("ShouldThrowParseErrorsCase10", 0, () => {
      expect(() => {
        return parsePhoneNumberWithError('+9991112233', 'US');
      }).assertThrowError("INVALID_COUNTRY");
    })
  })
}