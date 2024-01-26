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

export default function toNumber() {
  describe('toNumbertest', ()=> {

    let isMinusZero = (n:number)=>  {
      return n === 0 ? 1 / n === Number.NEGATIVE_INFINITY : null
    }

    let t = (value:BigNumber.Value, n:string | boolean |(() => BigNumber)|number|BigNumber|Function)=> {
      new Test().areEqual(n, new BigNumber(value).toNumber());
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
    it('toNumber', 0, ()=> {
      BigNumber.config({
        DECIMAL_PLACES: 20,
        ROUNDING_MODE: 4,
        RANGE: 1E9,
        EXPONENTIAL_AT: 1E9
      });

      new Test().areEqual(false, isMinusZero(new BigNumber('0').toNumber()));
      new Test().areEqual(false, isMinusZero(new BigNumber('0.0').toNumber()));
      new Test().areEqual(false, isMinusZero(new BigNumber('0.000000000000').toNumber()));
      new Test().areEqual(false, isMinusZero(new BigNumber('0e+0').toNumber()));
      new Test().areEqual(false, isMinusZero(new BigNumber('0e-0').toNumber()));
      new Test().areEqual(false, isMinusZero(new BigNumber('1e-1000000000').toNumber()));

      new Test().areEqual(true, isMinusZero(new BigNumber('-0').toNumber()));
      new Test().areEqual(true, isMinusZero(new BigNumber('-0.0').toNumber()));
      new Test().areEqual(true, isMinusZero(new BigNumber('-0.000000000000').toNumber()));
      new Test().areEqual(true, isMinusZero(new BigNumber('-0e+0').toNumber()));
      new Test().areEqual(true, isMinusZero(new BigNumber('-0e-0').toNumber()));
      new Test().areEqual(true, isMinusZero(new BigNumber('-1e-1000000000').toNumber()));

      t(1, 1);
      t('1', 1);
      t('1.0', 1);
      t('1e+0', 1);
      t('1e-0', 1);
      t(12345.6789, 12345.6789);

      t(-1, -1);
      t('-1', -1);
      t('-1.0', -1);
      t('-1e+0', -1);
      t('-1e-0', -1);

      t(Number.POSITIVE_INFINITY, 1 / 0);
      t('Infinity', 1 / 0);
      t(Number.NEGATIVE_INFINITY, -1 / 0);
      t('-Infinity', -1 / 0);
      t(Number.NaN, Number.NaN);
      t('NaN', Number.NaN);

      t('9.999999e+1000000000', 1 / 0);
      t('-9.999999e+1000000000', -1 / 0);
      t('1e-1000000000', 0);
      t('-1e-1000000000', -0);
    })
  })
}