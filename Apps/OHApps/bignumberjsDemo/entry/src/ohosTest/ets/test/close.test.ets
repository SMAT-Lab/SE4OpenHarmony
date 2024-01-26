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

export default function close() {
  describe('closetest', ()=> {
    let t = (value:boolean) =>{
      new Test().isTrue(value);
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
    it('close', 0, ()=> {

      let Big = BigNumber.clone();

      let x = new Big(0);
      let y = new Big('1');

      t(x instanceof Big);
      t(y instanceof Big);
      t(!(x instanceof BigNumber));
      t(!(y instanceof BigNumber));

      t(BigNumber.isBigNumber(x));
      t(BigNumber.isBigNumber(y));

      t(Big.isBigNumber(x));
      t(Big.isBigNumber(y));

      let z = new BigNumber(x);

      t(z instanceof BigNumber);
      t(!(z instanceof Big));

      t(BigNumber.isBigNumber(z));
      t(Big.isBigNumber(z));

      t(x.eq(z));
      t(!x.eq(y));
      t(!z.eq(y));

      let AnotherBig = Big.clone();

      let xx = new AnotherBig(0);
      let yy = new AnotherBig('1');

      t(xx instanceof AnotherBig);
      t(!(xx instanceof BigNumber));
      t(!(yy instanceof BigNumber));
      t(!(xx instanceof Big));
      t(!(yy instanceof Big));

      t(Big.isBigNumber(xx));
      t(Big.isBigNumber(yy));

      t(AnotherBig.isBigNumber(xx));
      t(AnotherBig.isBigNumber(yy));

      let zz = new Big(z);

      t(zz instanceof Big);
      t(!(zz instanceof AnotherBig));
      t(!(zz instanceof BigNumber));

      t(zz.eq(x));
      t(zz.eq(xx));
      t(zz.eq(z));
      t(!zz.eq(y));
      t(!zz.eq(yy));
    })
  })
}
