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
import parsePhoneNumberFromString, { Extension, parsePhoneNumber, PhoneNumber } from 'libphonenumber-js';
import Logger from '../utils/Logger';

export default function PhoneNumberXts() {

  const Log = new Logger("PhoneNumberXTS ： "); // Log instance and TAG
  const numberList: string[] = ['2345678', '1112345678', '2133734253', '012345678', '18717851845'];

  let tmp0 = parsePhoneNumberFromString(numberList[0],
    {
      defaultCallingCode: "1", defaultCountry: "US"
    });
  let phoneNumber0: PhoneNumber;
  if (tmp0 != undefined) {
    phoneNumber0 = tmp0;
  }

  const tmp1 = parsePhoneNumberFromString(numberList[1],
    {
      defaultCallingCode: "55"
    });
  let phoneNumber1: PhoneNumber;
  if (tmp1 != undefined) {
    phoneNumber1 = tmp1;
  }

  const tmp2 = parsePhoneNumberFromString(numberList[2], "US");
  let phoneNumber2: PhoneNumber;
  if (tmp2 != undefined) {
    phoneNumber2 = tmp2;
  }

  const tmp3 = parsePhoneNumberFromString(numberList[3],
    {
      defaultCallingCode: "236"
    });
  let phoneNumber3: PhoneNumber;
  if (tmp3 != undefined) {
    phoneNumber3 = tmp3;
  }

  const tmp4 = parsePhoneNumberFromString(numberList[4], "CN");
  let phoneNumber4: PhoneNumber;
  if (tmp4 != undefined) {
    phoneNumber4 = tmp4;
  }

  let temp = parsePhoneNumberFromString("+12133734253");
  let phoneNumber_setExtCase3: PhoneNumber;
  if (temp != undefined) {
    phoneNumber_setExtCase3 = temp;
  }

  let formatExtension_func = (number: string, extension: Extension): string => {
    return "".concat(number, " \u0434\u043E\u0431. ").concat(extension);
  }

  describe('PhoneNumberClassTest', () => {
    it("setExtCase1", 0, () => {
      phoneNumber0.setExt("1234");
      Log.info("phoneNumber0.ext : " + phoneNumber0.ext); // phoneNumber0.ext : 1234
      expect(phoneNumber0.ext)
        .assertEqual("1234");
    })

    it("setExtCase2", 0, () => {
      const phoneNumber_setExtCase2: PhoneNumber = parsePhoneNumber("+12133734253");
      phoneNumber_setExtCase2.setExt("100");
      Log.info("phoneNumber.ext : " + phoneNumber_setExtCase2.ext);
      expect(phoneNumber_setExtCase2.ext)
        .assertEqual("100");
    })

    it("setExtCase3", 0, () => {
      phoneNumber_setExtCase3.setExt("100");
      Log.info("phoneNumber2.ext : " + phoneNumber_setExtCase3.ext);
      expect(phoneNumber_setExtCase3.ext)
        .assertEqual("100");
    })

    it("setExtCase4", 0, () => {
      Log.info("phoneNumber3.ext : " + phoneNumber3.ext);
      expect(phoneNumber3.ext)
        .assertUndefined();
    })

    it("setExtCase5", 0, () => {
      const phoneNumber_setExtCase5: PhoneNumber = parsePhoneNumber("+8618791660306");
      phoneNumber_setExtCase5.setExt("200");
      Log.info(" phoneNumber4.ext : " + phoneNumber_setExtCase5.ext);
      expect(phoneNumber_setExtCase5.ext)
        .assertEqual("200");
    })


    it("isPossibleCase1", 0, () => {
      const phoneNumber_isPossibleCase1: PhoneNumber = parsePhoneNumber("+12133734253");
      const possibleResult: boolean = phoneNumber_isPossibleCase1.isPossible();
      Log.info("possibleResult : " + possibleResult);
      expect(possibleResult)
        .assertTrue();
    })

    it("isPossibleCase2", 0, () => {
      const phoneNumber_isPossibleCase1: PhoneNumber = parsePhoneNumber("+18792661756");
      const possibleResult: boolean = phoneNumber_isPossibleCase1.isPossible();
      Log.info("phoneNumber_isPossibleCase1.isPossible() : " + possibleResult);
      expect(phoneNumber1.isPossible())
        .assertTrue();
    })

    it("isPossibleCase3", 0, () => {
      Log.info("phoneNumber0.isPossible() : " + phoneNumber2.isPossible());
      expect(phoneNumber2.isPossible())
        .assertTrue();
    })
    it("isPossibleCase4", 0, () => {
      Log.info("phoneNumber3.isPossible() : " + phoneNumber3.isPossible());
      expect(phoneNumber3.isPossible())
        .assertFalse();
    })
    it("isPossibleCase5", 0, () => {
      Log.info("phoneNumber4.isPossible() : " + phoneNumber4.isPossible());
      expect(phoneNumber4.isPossible())
        .assertTrue();
    })

    it("isValidCase1", 0, () => {
      Log.info("phoneNumber0.isValid() : " + phoneNumber0.isValid());
      expect(phoneNumber0.isValid())
        .assertFalse();
    })

    it("isValidCase2", 0, () => {
      Log.info("phoneNumber1.isValid() : " + phoneNumber1.isValid());
      expect(phoneNumber1.isValid())
        .assertTrue();
    })
    it("isValidCase3", 0, () => {
      Log.info("phoneNumber2.isValid() : " + phoneNumber2.isValid());
      expect(phoneNumber2.isValid())
        .assertTrue();
    })
    it("isValidCase4", 0, () => {
      Log.info("phoneNumber3.isValid() : " + phoneNumber3.isValid());
      expect(phoneNumber3.isValid())
        .assertFalse();
    })
    it("isValidCase5", 0, () => {
      Log.info("phoneNumber4.isValid() : " + phoneNumber4.isValid());
      expect(phoneNumber4.isValid())
        .assertTrue();
    })

    it("getTypeCase1", 0, () => {
      Log.info("phoneNumber0.getType() : " + phoneNumber0.getType());
      expect(phoneNumber0.getType())
        .assertUndefined();
    })

    it("getTypeCase2", 0, () => {
      Log.info("phoneNumber1.getType() : " + phoneNumber1.getType());
      expect(phoneNumber1.getType())
        .assertUndefined();
    })
    it("getTypeCase3", 0, () => {
      Log.info("phoneNumber2.getType() : " + phoneNumber2.getType());
      expect(phoneNumber2.getType())
        .assertEqual("FIXED_LINE_OR_MOBILE");
    })
    it("getTypeCase4", 0, () => {
      Log.info("phoneNumber3.getType() : " + phoneNumber3.getType());
      expect(phoneNumber3.getType())
        .assertUndefined();
    })
    it("getTypeCase5", 0, () => {
      Log.info("phoneNumber4.getType() : " + phoneNumber4.getType());
      expect(phoneNumber4.getType())
        .assertUndefined();
    })

    it("formatCase1", 0, () => {
      let formatCase1: PhoneNumber = parsePhoneNumber("+8618791663266");
      formatCase1.ext = '123';
      const formatResult: string = formatCase1.format('NATIONAL', {
        formatExtension: formatExtension_func
      });
      Log.info(" formatResult 00000 : " + formatResult);
      expect(formatResult)
        .assertEqual('187 9166 3266 доб. 123');
    })

    it("formatCase2", 0, () => {
      phoneNumber0.ext = '456';
      const formatResult_0: string = phoneNumber0.format('INTERNATIONAL', {
        formatExtension: formatExtension_func
      });
      Log.info("formatResult_0 : " + formatResult_0);
      expect(formatResult_0)
        .assertEqual("+1 2345678 доб. 456");
    })

    it("formatCase3", 0, () => {
      phoneNumber1.ext = '789';
      const formatResult_1: string = phoneNumber1.format('E.164', {});
      Log.info("formatResult_1 : " + formatResult_1);
      expect(formatResult_1)
        .assertEqual("+551112345678");
    })
    it("formatCase4", 0, () => {
      phoneNumber2.ext = '100';
      const formatResult_2: string = phoneNumber2.format('RFC3966', {});
      Log.info("formatResult_2 : " + formatResult_2);
      expect(formatResult_2)
        .assertEqual("tel:+12133734253;ext=100");
    })
    it("formatCase5", 0, () => {
      phoneNumber4.ext = '200';
      const formatResult_4: string = phoneNumber4.format('IDD', {
        formatExtension: formatExtension_func
      });
      Log.info("formatResult_4 : " + formatResult_4);
      expect(formatResult_4)
        .assertUndefined();
    })

    it("formatNationalCase1", 0, () => {
      const formatNationalCase1: PhoneNumber = parsePhoneNumber("+12133734253");
      const p_formatNational: string = formatNationalCase1.formatNational();
      Log.info(" p_formatNational : " + p_formatNational);
      expect(p_formatNational)
        .assertEqual('(213) 373-4253');
    })

    it("formatNationalCase2", 0, () => {
      phoneNumber1.setExt("1.00");
      const p_formatNational0: string = phoneNumber1.formatNational({
        v2: true,
        formatExtension: (number: string, extension: Extension) => {
          return "".concat(number, "-").concat(extension);
        }
      });
      Log.info("p_formatNational0 : " + p_formatNational0);
      expect(p_formatNational0)
        .assertEqual("1112345678-1.00");
    })

    it("formatNationalCase3", 0, () => {
      const p_formatNational1: string = phoneNumber1.formatNational({
        v2: false,
        formatExtension: formatExtension_func
      })
      Log.info("p_formatNational1 : " + p_formatNational1);
      expect(p_formatNational1)
        .assertEqual("1112345678 доб. 1.00");
    })

    it("formatNationalCase4", 0, () => {
      const p_formatNational2: string = phoneNumber2.formatNational({
        v2: true,
        formatExtension: formatExtension_func
      })
      Log.info("p_formatNational2 : " + p_formatNational2);
      expect(p_formatNational2)
        .assertEqual("(213) 373-4253 доб. 100");
    })

    it("formatNationalCase5", 0, () => {
      const p_formatNational4: string = phoneNumber4.formatNational({
        formatExtension: formatExtension_func
      })
      Log.info("p_formatNational4 : " + p_formatNational4);
      expect(p_formatNational4)
        .assertEqual("187 1785 1845 доб. 200");
    })

    it("formatInternationalCase1", 0, () => {
      const formatInternationalCase1: PhoneNumber = parsePhoneNumber("+12133734253");
      const p_formatInternational: string = formatInternationalCase1.formatInternational();
      Log.info(" p_formatInternational : " + p_formatInternational);
      expect(p_formatInternational)
        .assertEqual('+1 213 373 4253');
    })

    it("formatInternationalCase2", 0, () => {
      phoneNumber1.setExt("1.00");
      const p_formatInternational0: string = phoneNumber1.formatInternational({
        v2: true,
        formatExtension: (number: string, extension: Extension) => {
          return "".concat(number, "-").concat(extension);
        }
      });
      Log.info("p_formatInternational0 : " + p_formatInternational0);
      expect(p_formatInternational0)
        .assertEqual("+55 1112345678-1.00");
    })

    it("formatInternationalCase3", 0, () => {
      const p_formatInternational1: string = phoneNumber1.formatInternational({
        v2: false,
        formatExtension: formatExtension_func
      })
      Log.info("p_formatInternational1 : " + p_formatInternational1);
      expect(p_formatInternational1)
        .assertEqual("+55 1112345678 доб. 1.00");
    })

    it("formatInternationalCase4", 0, () => {
      const p_formatInternational2: string = phoneNumber2.formatInternational({
        v2: true,
        formatExtension: formatExtension_func
      })
      Log.info("p_formatInternational2 : " + p_formatInternational2);
      expect(p_formatInternational2)
        .assertEqual("+1 213 373 4253 доб. 100");
    })

    it("formatInternationalCase5", 0, () => {
      const p_formatInternational4: string = phoneNumber4.formatInternational({
        formatExtension: formatExtension_func
      })
      Log.info("p_formatInternational4 : " + p_formatInternational4);
      expect(p_formatInternational4)
        .assertEqual("+86 187 1785 1845 доб. 200");
    })

    it("getURICase1", 0, () => {
      const getURICase1: PhoneNumber = parsePhoneNumber("+12133734253");
      const p_getURI: string = getURICase1.getURI();
      Log.info(" phoneNumber.getURI : " + p_getURI);
      expect(p_getURI)
        .assertEqual('tel:+12133734253');
    })

    it("getURICase2", 0, () => {
      phoneNumber1.setExt("1.00");
      const p_getURI0: string = phoneNumber1.getURI({
        v2: true,
        formatExtension: (number: string, extension: Extension) => {
          return "".concat(number, "-").concat(extension);
        }
      });
      Log.info("p_getURI0 : " + p_getURI0);
      expect(p_getURI0)
        .assertEqual("tel:+551112345678;ext=1.00");
    })

    it("getURICase3", 0, () => {
      const p_getURI1: string = phoneNumber1.getURI({
        v2: false,
        formatExtension: formatExtension_func
      })
      Log.info("p_formatInternational1 : " + p_getURI1);
      expect(p_getURI1)
        .assertEqual("tel:+551112345678;ext=1.00");
    })

    it("getURICase4", 0, () => {
      const p_getURI2: string = phoneNumber2.getURI({
        v2: true,
        formatExtension: formatExtension_func
      })
      Log.info("p_formatInternational2 : " + p_getURI2);
      expect(p_getURI2)
        .assertEqual("tel:+12133734253;ext=100");
    })

    it("getURICase5", 0, () => {
      const p_getURI4: string = phoneNumber4.getURI({
        formatExtension: formatExtension_func
      })
      Log.info("p_formatInternational4 : " + p_getURI4);
      expect(p_getURI4)
        .assertEqual("tel:+8618717851845;ext=200");
    })

    it("isNonGeographicCase1", 0, () => {
      const isNonGeographic0: boolean = phoneNumber0.isNonGeographic();
      Log.info("isNonGeographic0 : " + isNonGeographic0);
      expect(isNonGeographic0)
        .assertFalse();
    })

    it("isNonGeographicCase2", 0, () => {
      const isNonGeographic1: boolean = phoneNumber1.isNonGeographic();
      Log.info("isNonGeographic1 : " + isNonGeographic1);
      expect(isNonGeographic1)
        .assertFalse();
    })

    it("isNonGeographicCase3", 0, () => {
      const isNonGeographic2: boolean = phoneNumber2.isNonGeographic();
      Log.info("isNonGeographic2 : " + isNonGeographic2);
      expect(isNonGeographic2)
        .assertFalse();
    })

    it("isNonGeographicCase4", 0, () => {
      const isNonGeographic3: boolean = phoneNumber3.isNonGeographic();
      Log.info("isNonGeographic3 : " + isNonGeographic3);
      expect(isNonGeographic3)
        .assertFalse();
    })

    it("isNonGeographicCase5", 0, () => {
      const isNonGeographic4: boolean = phoneNumber4.isNonGeographic();
      Log.info("isNonGeographic4 : " + isNonGeographic4);
      expect(isNonGeographic4)
        .assertFalse();
    })

    it("isEqualCase1", 0, () => {
      const phoneNumber1: PhoneNumber = parsePhoneNumber("8005553535","RU");
      const phoneNumber2: PhoneNumber = parsePhoneNumber("8005553535","RU");
      const compareResults: boolean = phoneNumber1.isEqual(phoneNumber2);
      Log.info("compareResults : " + compareResults);
      expect(compareResults)
        .assertTrue();
    })

    it("isEqualCase2", 0, () => {
      const phoneNumber1: PhoneNumber = parsePhoneNumber("8005553535","RU");
      const phoneNumber2: PhoneNumber = parsePhoneNumber("5555553535","RU");
      const compareResults0: boolean = phoneNumber1.isEqual(phoneNumber2);
      Log.info("compareResults0 : " + compareResults0);
      expect(compareResults0)
        .assertFalse();
    })

    it("isEqualCase3", 0, () => {
      const phoneNumber1: PhoneNumber = parsePhoneNumber("+12133734253","US");
      const phoneNumber2: PhoneNumber = parsePhoneNumber("8005553535","RU");
      const compareResults1: boolean = phoneNumber1.isEqual(phoneNumber2);
      Log.info("compareResults1 : " + compareResults1);
      expect(compareResults1)
        .assertFalse();
    })

    it("isEqualCase4", 0, () => {
      const phoneNumber1: PhoneNumber = parsePhoneNumber("+12133734253","US");
      const phoneNumber2: PhoneNumber = parsePhoneNumber("8003535","RU");
      const compareResults2: boolean = phoneNumber1.isEqual(phoneNumber2);
      Log.info("compareResults2 : " + compareResults2);
      expect(compareResults2)
        .assertFalse();
    })
  })
}