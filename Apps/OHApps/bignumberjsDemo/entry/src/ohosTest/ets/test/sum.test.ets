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

export default function sum() {
  describe('sumtest', ()=> {

    let t = (expected:BigNumber, value:BigNumber.Value)=>{
      new Test().isTrue(expected.eq(value));
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
    it('sum', 0, ()=> {

      let expectedSum = new BigNumber(600);
      t(expectedSum, BigNumber.sum(100, 200, 300));
      t(expectedSum, BigNumber.sum('100', '200', '300'));
      t(expectedSum, BigNumber.sum(new BigNumber(100), new BigNumber(200), new BigNumber(300)));
      t(expectedSum, BigNumber.sum(100, '200', new BigNumber(300)));
      t(expectedSum, BigNumber.sum(99.9, 200.05, 300.05));
    })
  })
}