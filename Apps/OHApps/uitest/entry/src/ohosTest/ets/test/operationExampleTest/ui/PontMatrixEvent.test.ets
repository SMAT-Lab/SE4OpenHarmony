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

import { describe, beforeAll, it, expect, TestType } from '@ohos/hypium'
import abilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import { Driver, ON, PointerMatrix} from '@ohos.UiTest'
import Want from '@ohos.app.ability.Want';

const delegator = abilityDelegatorRegistry.getAbilityDelegator();
const bundleName = abilityDelegatorRegistry.getArguments().bundleName;
const WAIT_UI_READYMS = 1000;

export default function PontMatrixEventTest() {
  describe('PontMatrixEventTest', () => {
    beforeAll(async () => {
      let want: Want = {
        bundleName : bundleName,
        abilityName : "PointMatrixAbility"
      }
      await delegator.startAbility(want);
    })

    /**
     * @tc.number:PontMatrixEventTest_001
     * @tc.name: testInjectMultiPointerAction
     * @tc.type: 0 || TestType.FUNCTION || Size.SMALLTEST || Level.LEVEL0
     * @tc.desc: 检测uitest injectMultiPointerAction 功能
     */
    it('testInjectMultiPointerAction', TestType.FUNCTION, async (done: Function) => {
      let driver = Driver.create()
      await driver.delayMs(WAIT_UI_READYMS)
      let image1 = await driver.findComponent(ON.id('pinch_ima'))
      let bounds1 = await image1.getBounds()
      let pointer = PointerMatrix.create(2,11)
      await driver.delayMs(300)
      pointer.setPoint(0,0,{x:245,y:480})
      pointer.setPoint(0,1,{x:250,y:480})
      pointer.setPoint(0,2,{x:255,y:480})
      pointer.setPoint(0,3,{x:260,y:480})
      pointer.setPoint(0,4,{x:265,y:480})
      pointer.setPoint(0,5,{x:270,y:480})
      pointer.setPoint(0,6,{x:275,y:480})
      pointer.setPoint(0,7,{x:280,y:480})
      pointer.setPoint(0,8,{x:285,y:480})
      pointer.setPoint(0,9,{x:290,y:480})
      pointer.setPoint(0,10,{x:295,y:480})
      pointer.setPoint(1,0,{x:505,y:480})
      pointer.setPoint(1,1,{x:500,y:480})
      pointer.setPoint(1,2,{x:495,y:480})
      pointer.setPoint(1,3,{x:490,y:480})
      pointer.setPoint(1,4,{x:485,y:480})
      pointer.setPoint(1,5,{x:480,y:480})
      pointer.setPoint(1,6,{x:475,y:480})
      pointer.setPoint(1,7,{x:470,y:480})
      pointer.setPoint(1,8,{x:465,y:480})
      pointer.setPoint(1,9,{x:460,y:480})
      pointer.setPoint(1,10,{x:455,y:480})
      await driver.injectMultiPointerAction(pointer, 600)
      let image2 = await driver.findComponent(ON.id('pinch_ima'))
      let bounds2= await image2.getBounds()
      expect(bounds2 !== bounds1).assertTrue()
      await driver.pressBack()
      done()
    })
  })
}