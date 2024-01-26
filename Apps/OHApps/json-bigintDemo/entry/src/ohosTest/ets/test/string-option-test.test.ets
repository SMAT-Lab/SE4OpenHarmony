/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
export default function string_option_test() {
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
  describe("Testing_storeAsString_option", () => {
    let key = '{ "key": 12345678901234567 }';
    it("Should_show_that_the_key_is_of_type_object", 0,() => {
      let bigInt:jsonBigTpye = jsonBig(key);
      let result: Record<string, string | number> = bigInt.parse(key);
      expect(typeof result.key).assertEqual("object");
    });
    it("Should_show_that_key_is_of_type_string_when_storeAsString_option_is_true",0, () => {
      let bigInt:jsonBigTpye = jsonBig({
        storeAsString: true
      });
      let result: Record<string, string | number> = bigInt.parse(key);
      expect(typeof result.key).assertEqual("string");
    });
  });
}