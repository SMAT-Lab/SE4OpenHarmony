/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import { afterAll, afterEach, beforeAll, beforeEach, describe,expect,it } from '@ohos/hypium'
import jsonBig from 'json-bigint'
import { jsonBigTpye} from '../../../main/ets/pages/index.ts'
export default function bigint_parse_test() {
  //测试本机BigInt支持：解析
  describe("Testing_native_BigInt_support_parse", () => {
      // Defines a test suite. Two parameters are supported: test suite name and test suite function.
      beforeAll(() => {
        // Presets an action, which is performed only once before all test cases of the test suite start.
        // This API supports only one parameter: preset action function.
      })
      beforeEach(() => {
        // Presets an action, which is performed before each unit test case starts.
        // The number of execution times is the same as the number of test cases defined by **it**.
        // This API supports only one parameter: preset action function.
      })
      afterEach(() => {
        // Presets a clear action, which is performed after each unit test case ends.
        // The number of execution times is the same as the number of test cases defined by **it**.
        // This API supports only one parameter: clear action function.
      })
      afterAll(() => {
        // Presets a clear action, which is performed after all test cases of the test suite end.
        // This API supports only one parameter: clear action function.
      })
      let  input = '{"big":92233720368547758070,"small":123}';
      it("Should_show_JSONbig_does_support_parsing_native_BigInt", 0, () => {
        if (typeof (BigInt) === 'undefined') {
          console.log('No native BigInt');
          return;
        }
        let bigInt:jsonBigTpye = jsonBig({useNativeBigInt: true});
        let obj: Record<string, string> = bigInt.parse(input);
        expect(obj.small.toString()).assertEqual("123");
        expect(obj.big.toString()).assertEqual("92233720368547758070");
        expect(typeof obj.big).assertEqual("bigint");
      });
      it("Should_show_JSONbig_does_support_forced_parsing_to_native_BigIn", 0, () => {
        let bigInt:jsonBigTpye = jsonBig({
          alwaysParseAsBig: true,
          useNativeBigInt: true
        });
        let obj: Record<string, string> = bigInt.parse(input);
        expect(obj.big.toString()).assertEqual("92233720368547758070");
        expect(typeof obj.big).assertEqual('bigint');
        expect(obj.small.toString()).assertEqual("123");
        expect(typeof obj.small).assertEqual('bigint');
      });
      it("Should_show_JSONbig_does_support_native_Bigint_parse_or_stringify_roundtrip", 0, () => {
        let bigInt:jsonBigTpye = jsonBig({
          useNativeBigint: true
        });
        let obj:string = bigInt.parse(input);
        let output:  Record<string, string >  = bigInt.stringify(obj.big);
        expect(output.toString()).assertEqual(obj.big.toString());
      });
      it("Should_show_JSONbig_does_support_native_Bigint_parse_or_stringify_roundtrip_when_BigInt_is_forced", 0, () => {
        let bigInt:jsonBigTpye = jsonBig({
          alwaysParseAsBig: true,
          useNativeBigInt: true
        });
        let obj:  Record<string, string >  = bigInt.parse(input);
        let output:  Record<string, string >  = bigInt.stringify(obj.big);
        expect(output.toString()).assertEqual(obj.big.toString());
      });
    });
};

