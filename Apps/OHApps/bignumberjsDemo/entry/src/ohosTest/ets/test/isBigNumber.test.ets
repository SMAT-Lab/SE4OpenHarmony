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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import { BigNumber } from './BigNumber';
import Test from './tester';

export default function isBigNumber() {
  describe('isBigNumbertest', ()=> {

    let t=(expected:string |BigNumber.Format| boolean |(() => BigNumber)|number|BigNumber|Function, value:undefined|Object|undefined[]|string|null| number|BigNumber)=>{
      new Test().areEqual(expected, BigNumber.isBigNumber(value));
    }

    let tx = (fn:Function, msg:string)=>{
      new Test().isException(fn, msg);
    }

    // Defines a test suite. Two parameters are supported: test suite name and test suite function.
    beforeAll(()=> {
      // Presets an action, which is performed only once before all test cases of the test suite start.
      // This API supports only one parameter: preset action function.
    })
    beforeEach(()=> {
      // Presets an action, which is performed before each unit test case starts.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: preset action function.
    })
    afterEach(()=> {
      // Presets a clear action, which is performed after each unit test case ends.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: clear action function.
    })
    afterAll(()=> {
      // Presets a clear action, which is performed after all test cases of the test suite end.
      // This API supports only one parameter: clear action function.
    })
    it('isBigNumber', 0, ()=> {
      t(false, void 0);
      t(false, null);
      t(false, '0');
      t(false, 0);
      t(false, 1);
      t(false, Number.NaN);
      t(false, []);
      t(false, {});

      t(true, new BigNumber(0));
      t(true, new BigNumber('0'));
      t(true, new BigNumber(1));
      t(true, new BigNumber('1'));

      let AnotherBigNumber = BigNumber.clone();
      t(true, new AnotherBigNumber(0));
      t(true, new AnotherBigNumber('0'));
      t(true, new AnotherBigNumber(1));
      t(true, new AnotherBigNumber('1'));

      t(false, {c: null, e: null, s: null});
      t(false, {c: null, e: null, s: 1});
      t(false, {c: null, e: null, s: -1});

      t(true, {c: null, e: null, s: null, _isBigNumber: true});          // NaN
      t(true, {c: null, e: null, s: 1, _isBigNumber: true});             // Infinity
      t(true, {c: null, e: null, s: -1, _isBigNumber: true});            // -Infinity

      tx(()=> {BigNumber.isBigNumber({c: undefined, e: null, s: null, _isBigNumber: true})}, "{c: undefined, e: null, s: null, _isBigNumber: true}");
      tx(()=> {BigNumber.isBigNumber({c: undefined, e: null, s: null, _isBigNumber: true})}, "{c: undefined, e: null, s: null, _isBigNumber: true}");
      tx(()=> {BigNumber.isBigNumber({c: null, e: undefined, s: null, _isBigNumber: true})}, "{c: null, e: undefined, s: null, _isBigNumber: true}");
      tx(()=> {BigNumber.isBigNumber({c: null, e: null, s: undefined, _isBigNumber: true})}, "{c: null, e: null, s: undefined, _isBigNumber: true}");
      tx(()=> {BigNumber.isBigNumber({c: null, e: 1, s: 0, _isBigNumber: true})}, "{c: null, e: 1, s: 0, _isBigNumber: true}");
      tx(()=> {BigNumber.isBigNumber({c: null, e: 1, s: null, _isBigNumber: true})}, "{c: null, e: 1, s: null, _isBigNumber: true}");
      tx(()=> {BigNumber.isBigNumber({c: [1], e: 1, s: null, _isBigNumber: true})}, "{c: [1], e: 1, s: null, _isBigNumber: true}");
      tx(()=> {BigNumber.isBigNumber({c: [1], e: null, s: null, _isBigNumber: true})}, "{c: [1], e: null, s: null, _isBigNumber: true}");

      tx(()=> {BigNumber.isBigNumber({c: [0, 1], e: 0, s: 1, _isBigNumber: true})}, "{c: [0, 1], e: 0, s: 1, _isBigNumber: true}");
      tx(()=> {BigNumber.isBigNumber({c: [0, 0], e: 0, s: 1, _isBigNumber: true})}, "{c: [0, 0], e: 0, s: 1, _isBigNumber: true}");
      tx(()=> {BigNumber.isBigNumber({c: [0, 0, 1], e: 0, s: 1, _isBigNumber: true})}, "{c: [0, 0, 1], e: 0, s: 1, _isBigNumber: true}");
      tx(()=> {BigNumber.isBigNumber({c: [1, 0], e: 0, s: 1, _isBigNumber: true})}, "{c: [1, 0], e: 0, s: 1, _isBigNumber: true}");

      t(true, {c: [0], e: 0, s: 1, _isBigNumber: true});                 // 0

      tx(()=> {BigNumber.isBigNumber({c: [0], e: 1, s: 1, _isBigNumber: true})}, "{c: [0], e: 1, s: 1, _isBigNumber: true}");
      tx(()=> {BigNumber.isBigNumber({c: [0], e: -1, s: 1, _isBigNumber: true})}, "{c: [0], e: -1, s: 1, _isBigNumber: true}");

      t(true, {c: [1], e: 0, s: 1, _isBigNumber: true});                 // 1
      t(true, {c: [1], e: 0, s: -1, _isBigNumber: true});                // -1

      tx(()=> {BigNumber.isBigNumber({c: [1], e: 1, s: 1, _isBigNumber: true})}, "{c: [1], e: 1, s: 1, _isBigNumber: true}");
      tx(()=> {BigNumber.isBigNumber({c: [1], e: 1, s: 1, _isBigNumber: true})}, "{c: [1], e: 1, s: 1, _isBigNumber: true}");
      tx(()=> {BigNumber.isBigNumber({c: ['1'], e: 0, s: 1, _isBigNumber: true})}, "{c: ['1'], e: 0, s: 1, _isBigNumber: true}");
      tx(()=> {BigNumber.isBigNumber({c: [1], e: '0', s: 1, _isBigNumber: true})}, "{c: [1], e: '0', s: 1, _isBigNumber: true}");
      tx(()=> {BigNumber.isBigNumber({c: [1], e: 0, s: '0', _isBigNumber: true})}, "{c: [1], e: 0, s: '0', _isBigNumber: true}");
      tx(()=> {BigNumber.isBigNumber({c: ['1'], e: undefined, s: 1, _isBigNumber: true})}, "{c: ['1'], e: undefined, s: 1, _isBigNumber: true}");
      tx(()=> {BigNumber.isBigNumber({c: [1.1], e: 0, s: 1, _isBigNumber: true})}, "{c: [1.1], e: 0, s: 1, _isBigNumber: true}");
      tx(()=> {BigNumber.isBigNumber({c: [1], e: 0.1, s: 1, _isBigNumber: true})}, "{c: [1], e: 0.1, s: 1, _isBigNumber: true}");
      tx(()=> {BigNumber.isBigNumber({c: [1], e: 0, s: 1.1, _isBigNumber: true})}, "{c: [1], e: 0, s: 1.1, _isBigNumber: true}");
      tx(()=> {BigNumber.isBigNumber({c: [1], e: 0, s: -1.1, _isBigNumber: true})}, "{c: [1], e: 0, s: -1.1, _isBigNumber: true}");

      t(true, {c: [10], e: 1, s: 1, _isBigNumber: true});                // 10

      tx(()=> {BigNumber.isBigNumber({c: [10], e: 0, s: 1, _isBigNumber: true})}, "{c: [10], e: 0, s: 1, _isBigNumber: true}");
      tx(()=> {BigNumber.isBigNumber({c: [1], e: 1, s: 1, _isBigNumber: true})}, "{c: [1], e: 1, s: 1, _isBigNumber: true}");

      t(true, {c: [10000000000000], e: 13, s: 1, _isBigNumber: true});   // 1e13

      tx(()=> {BigNumber.isBigNumber({c: [1], e: 13, s: 1, _isBigNumber: true})}, "{c: [1], e: 13, s: 1, _isBigNumber: true}");

      t(true, {c: [99999999999999], e: 13, s: 1, _isBigNumber: true});   // 99999999999999

      t(true, {c: [1], e: 14, s: 1, _isBigNumber: true});                // 100000000000000

      tx(()=> {BigNumber.isBigNumber({c: [100000000000000], e: 14, s: 1, _isBigNumber: true})}, "{c: [100000000000000], e: 14, s: 1, _isBigNumber: true}");
      tx(()=> {BigNumber.isBigNumber({c: [100000000000000], e: 0, s: 1, _isBigNumber: true})}, "{c: [100000000000000], e: 0, s: 1, _isBigNumber: true}");

      t(true, {c: [1e13], e: -1, s: -1, _isBigNumber: true});            // 0.1

      tx(()=> {BigNumber.isBigNumber({c: [1], e: -1, s: -1, _isBigNumber: true})}, "{c: [1], e: -1, s: -1, _isBigNumber: true}");

      t(true, {c: [98700000], e: -7, s: -1, _isBigNumber: true});        // -0.000000987

      tx(()=> {BigNumber.isBigNumber({c: [987], e: -7, s: -1, _isBigNumber: true})}, "{c: [987], e: -7, s: -1, _isBigNumber: true}");

      t(true, {c: [9, 9, 9], e: 14, s: 1, _isBigNumber: true});          // 900000000000009.00000000000009

      tx(()=> {BigNumber.isBigNumber({c: [900000000000009, 9], e: 14, s: 1, _isBigNumber: true})}, "{c: [900000000000009, 9], e: 14, s: 1, _isBigNumber: true}");
    })
  })
}