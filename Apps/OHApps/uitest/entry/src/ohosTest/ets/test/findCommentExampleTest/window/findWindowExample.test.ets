/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License")
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

import { describe, it, expect, TestType } from '@ohos/hypium'
import { Driver } from '@ohos.UiTest'
import abilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import Want from '@ohos.app.ability.Want';

const DELAYMS = 1000;
const delegator = abilityDelegatorRegistry.getAbilityDelegator();
const bundleName = abilityDelegatorRegistry.getArguments().bundleName;

export default function findWindowExampleTest() {
  describe('findWindowExampleTest', () => {

    /**
     * @tc.number:findWindowExampleTest_001
     * @tc.name: findWindowExampleTest_bundleName
     * @tc.type: 0 || TestType.FUNCTION || Size.SMALLTEST || Level.LEVEL0
     * @tc.desc: 获取指定的window对象
     */
    it('findWindowExampleTest_bundleName', TestType.FUNCTION, async (done: Function) => {
      let want: Want = {
        bundleName : bundleName,
        abilityName : "EntryAbility"
      }
      await delegator.startAbility(want);
      let driver = Driver.create()
      await driver.delayMs(DELAYMS)
      let window = await driver.findWindow({bundleName: bundleName})
      let name = await window.getBundleName()
      expect(name === bundleName).assertTrue()
      done()
    })
  })
}