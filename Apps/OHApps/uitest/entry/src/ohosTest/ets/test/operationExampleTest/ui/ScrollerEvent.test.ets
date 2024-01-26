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
import { Driver, ON} from '@ohos.UiTest'
import Want from '@ohos.app.ability.Want';

const delegator = abilityDelegatorRegistry.getAbilityDelegator();
const bundleName = abilityDelegatorRegistry.getArguments().bundleName;
const WAIT_UI_READYMS = 1000;

export default function ScrollerEventTest() {
  describe('ScrollerEvent', () => {
    beforeAll(async () => {
      let want: Want = {
        bundleName : bundleName,
        abilityName : "ScrollerAbility"
      }
      await delegator.startAbility(want);
    })

    /**
     * @tc.number:ScrollerEventTest_001
     * @tc.name: ScrollerEvent_bottom
     * @tc.type: 0 || TestType.FUNCTION || Size.SMALLTEST || Level.LEVEL0
     * @tc.desc: 检测 uitest scrollToBottom 滑到底部功能
     */
    it('ScrollerEvent_bottom', TestType.FUNCTION, async (done: Function) => {
      let driver = Driver.create()
      await driver.delayMs(WAIT_UI_READYMS)
      let scroll = await driver.findComponent(ON.type('Scroll'))
      await scroll.scrollToBottom();
      await driver.delayMs(WAIT_UI_READYMS)
      let text = await driver.findComponent(ON.id("scroller_item_text"));
      expect(await text.getText()).not().assertEqual("0");
      done()
    })

    /**
     * @tc.number:ScrollerEventTest_002
     * @tc.name: ScrollerEvent_top
     * @tc.type: 0 || TestType.FUNCTION || Size.SMALLTEST || Level.LEVEL0
     * @tc.desc: 检测 uitest scrollToTop 滑到顶部功能
     */
    it('ScrollerEvent_top', TestType.FUNCTION, async (done: Function) => {
      let driver = Driver.create()
      await driver.delayMs(WAIT_UI_READYMS)
      let scroll = await driver.findComponent(ON.type('Scroll'))
      await scroll.scrollToBottom();
      await driver.delayMs(WAIT_UI_READYMS)
      await scroll.scrollToTop();
      let text = await driver.findComponent(ON.id("scroller_item_text"));
      expect(await text.getText()).assertEqual("0");
      done()
    })
  })
}