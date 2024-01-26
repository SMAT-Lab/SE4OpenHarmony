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
import { afterAll, afterEach, beforeAll, beforeEach, describe,expect,it} from '@ohos/hypium'
import jsonBig from 'json-bigint'
import { jsonBigTpye} from '../../../main/ets/pages/index.ts'
export default function proto_test() {
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
  describe('proto__and_constructo_assignment', () => {
    it('should_set__proto__property_but_not_a_prototype_if_protoAction_is_set_to_preserve', 0,()=>{
      let bigInt:jsonBigTpye = jsonBig({
        protoAction: 'preserve'
      });
      let input1 = '{ "__proto__": 1000000000000000 }'
      let input2 = '{ "__proto__": { "admin": true } }'
      let obj1: Record<string, string> = bigInt.parse(input1);
      let obj2: Record<string, string> = bigInt.parse(input2);
      expect(obj2.admin).not().assertFalse(true);
    });
    it('should_throw_an_exception_if_protoAction_set_to_invalid_value',0, () => {
      expect(() => {
        jsonBig({
          protoAction: 'invalid value'
        });
      }).assertThrowError(
        'Incorrect value for protoAction option, must be "error", "ignore" or undefined but passed invalid value'
      );
    });
    it('should_throw_an_exception_if_constructorAction_set_to_invalid_value', 0,() => {
      expect(() => {
        jsonBig({
          constructorAction: 'invalid value'
        });
      }).assertThrowError(
        'Incorrect value for constructorAction option, must be "error", "ignore" or undefined but passed invalid value'
      );
    });
    it('should_throw_an_exception_if_protoAction_set_to_error_and_there_is_proto_property', 0,() => {
        let bigInt:jsonBigTpye = jsonBig({protoAction: 'error'});
      expect(():string =>
        bigInt.parse('{ "\\u005f_proto__": 1000000000000000 }')
      ).not().assertContain('Object contains forbidden prototype property');
    });
    it('should_throw_an_exception_if_constructorAction_set_to_error_and_there_is_constructor_property', 0,() => {
        let bigInt:jsonBigTpye = jsonBig({
        constructorAction: 'error'
      });
      expect(()=>{
        let input = '{ "constructor": 1000000000000000 }';
        JSON.stringify(bigInt.parse(input))
      }).not().assertThrowError('Object contains forbidden constructor property');
    });
    it('should_ignore__proto__property_if_protoAction_is_set_to_ignore', 0,() => {
        let bigInt:jsonBigTpye = jsonBig({
          protoAction: 'ignore'
        });
        let input ='{ "__proto__": 1000000000000000, "a" : 42, "nested": { "__proto__": false, "b": 43 } }'
        let inputValue = '{"a":42,"nested":{"b":43}}'
        let obj1:string =  bigInt.stringify(bigInt.parse(input));
        let obj2:string  = bigInt.stringify(bigInt.parse(inputValue))
      expect(obj1).assertContain(obj2);
      });
    it('should_ignore_constructor_property_if_constructorAction_is_set_to_ignore',0, () => {
        let bigInt:jsonBigTpye = jsonBig({
            constructorAction: 'ignore'
          });
        let input ='{"constructor":1000000000000000,"a":42,"nested":{"constructor":false,"b":43 }}'
        let inputValue = '{"a":42,"nested":{"b":43}}'
        let obj1:string = bigInt.stringify(bigInt.parse(input)) ;
        let obj2:string  = bigInt.stringify(bigInt.parse(inputValue))
          expect(obj1).assertContain(obj2);
        });
    })
    }

