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

import hilog from '@ohos.hilog';
import { describe, it, expect, TestType } from '@ohos/hypium';
import abilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import Logger from '../../util/Logger';
import UIAbility from '@ohos.app.ability.UIAbility';
import EntryAbility from '../../../../main/ets/entryability/EntryAbility';
import Want from '@ohos.app.ability.Want';

const bundleName = abilityDelegatorRegistry.getArguments().bundleName;
const delegator = abilityDelegatorRegistry.getAbilityDelegator()
const TAG = '[basicExampleTest]'
function sleep(time: number) {
  return new Promise<void>((resolve:Function) => setTimeout(resolve, time));
}
export default function basicExampleTest() {
  describe('basicExampleTest', () => {

    /**
     * @tc.number:basicExampleTest_001
     * @tc.name: basic_StartAbility_001
     * @tc.type: 0 || TestType.FUNCTION || Size.SMALLTEST || Level.LEVEL0
     * @tc.desc: 检测delegator.startAbility接口打开指定Ability对象
     */
    it('basic_StartAbility_001',TestType.FUNCTION, async (done: Function) =>  {
      Logger.info(" StartAbility_001 begin")
      //start tested ability
      let want: Want = {
        bundleName : bundleName,
        abilityName : "EntryAbility"
      }
      await delegator.startAbility(want);
      await sleep(1000);
      //check top display ability
      await delegator.getCurrentTopAbility().then((ability: UIAbility)=>{
        console.info("get top ability");
        expect(ability.context.abilityInfo.name).assertEqual('EntryAbility');
      })
      Logger.info(TAG, " StartAbility_001 end")
      done();
    })
  })
}