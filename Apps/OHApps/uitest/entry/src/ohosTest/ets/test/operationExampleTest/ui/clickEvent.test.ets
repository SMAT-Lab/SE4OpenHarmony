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
import {Driver, ON} from '@ohos.UiTest'
import Want from '@ohos.app.ability.Want';

const delegator = abilityDelegatorRegistry.getAbilityDelegator();
const bundleName = abilityDelegatorRegistry.getArguments().bundleName;
const WAIT_UI_READYMS = 1000;

export default function clickEventTest() {
  describe('clickEventTest', () => {
    beforeAll(async () => {
      let want: Want = {
        bundleName : bundleName,
        abilityName : "clickAbility"
      }
      await delegator.startAbility(want);
    })

    /**
     * @tc.number:clickEventTest_001
     * @tc.name: clickEventTest_click
     * @tc.type: 0 || TestType.FUNCTION || Size.SMALLTEST || Level.LEVEL0
     * @tc.desc: 检测uitest Component click 功能
     */
    it('clickEventTest_click',TestType.FUNCTION, async (done: Function) => {
      let dr = await Driver.create();
      await dr.delayMs(WAIT_UI_READYMS)
      let button = await dr.findComponent(ON.id("click_bt"));
      let text = await dr.findComponent(ON.id("result_text"));
      expect(await text.getText() == "Hello World").assertTrue();
      await button.click();
       let text1 = await dr.findComponent(ON.id("result_text"));
      expect(await text1.getText() === "singleClick").assertTrue();
      done()
    })

    /**
     * @tc.number:clickEventTest_002
     * @tc.name: clickEventTest_double_click
     * @tc.type: 0 || TestType.FUNCTION || Size.SMALLTEST || Level.LEVEL0
     * @tc.desc: 检测uitest double click 功能
     */
    it('clickEventTest_double_click',TestType.FUNCTION, async (done: Function) => {
      let driver = Driver.create()
      await driver.delayMs(WAIT_UI_READYMS)
      let button = await driver.findComponent(ON.text('Click twice'))
      await button.doubleClick()
      await driver.delayMs(WAIT_UI_READYMS)
      let newButton = await driver.findComponent(ON.text('doubleClick'))
      let text = await newButton.getText()
      expect(text === 'doubleClick').assertTrue()
      await newButton.click()
      done()
    })

    /**
     * @tc.number:clickEventTest_003
     * @tc.name: clickEventTest_double_click
     * @tc.type: 0 || TestType.FUNCTION || Size.SMALLTEST || Level.LEVEL0
     * @tc.desc: 检测uitest long click 功能
     */
    it('clickEventTest_Long_click', TestType.FUNCTION, async (done: Function) => {
      let driver = Driver.create()
      await driver.delayMs(WAIT_UI_READYMS)
      let button = await driver.findComponent(ON.text('Click twice'))
      await button.longClick()
      await driver.delayMs(WAIT_UI_READYMS)
      let newButton = await driver.findComponent(ON.text('longClick'))
      let text = await newButton.getText()
      expect(text === 'longClick').assertTrue()
      await newButton.click()
      done();
    })

    /**
     * @tc.number:clickEventTest_004
     * @tc.name: clickEventTest_double_click
     * @tc.type: 0 || TestType.FUNCTION || Size.SMALLTEST || Level.LEVEL0
     * @tc.desc: 检测uitest PressBack 功能
     */
    it('clickEventTest_PressBack', TestType.FUNCTION, async (done: Function) => {
      let driver = Driver.create()
      await driver.delayMs(WAIT_UI_READYMS)
      let button = await driver.findComponent(ON.text('Click twice'))
      await button.longClick()
      await driver.delayMs(WAIT_UI_READYMS)
      await driver.pressBack()
      await driver.delayMs(WAIT_UI_READYMS)
      let button_ori = await driver.findComponent(ON.text('Click twice'))
      expect(await button_ori.getText() === 'Click twice').assertTrue()
      done()
    })


    /**
     * @tc.number:clickEventTest_005
     * @tc.name: clickEventTest_double_click
     * @tc.type: 0 || TestType.FUNCTION || Size.SMALLTEST || Level.LEVEL0
     * @tc.desc: 检测uitest triggerKey 功能
     */
    it('clickEventTest_TriggerKey', TestType.FUNCTION, async (done: Function) => {
      let driver = Driver.create()
      await driver.delayMs(WAIT_UI_READYMS)
      let button = await driver.findComponent(ON.text('Click twice'))
      await button.longClick()
      await driver.delayMs(WAIT_UI_READYMS)
      let keyBack = 2 // back
      await driver.triggerKey(keyBack)
      await driver.delayMs(WAIT_UI_READYMS)
      let button_ori = await driver.findComponent(ON.text('Click twice'))
      expect(await button_ori.getText() === 'Click twice').assertTrue()
      done()
    })
  })
}