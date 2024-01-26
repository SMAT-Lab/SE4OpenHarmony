/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import adc_napi from '@ohos.napi_adc';
import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import { Driver, ON } from '@ohos.UiTest';
import inputMethod from '@ohos.inputMethod';
import abilityAccessCtrl from '@ohos.abilityAccessCtrl';
import Want from '@ohos.app.ability.Want';


const BUNDLE = 'com.um.adc_module_app';
const ABILITY_NAME = 'EntryAbility';
const TAG = 'adc_module_app';
const DOMAIN = 0xF811;

export default function abilityTest() {
  let driver = Driver.create();
  let delegator = AbilityDelegatorRegistry.getAbilityDelegator();
  let shurufa = inputMethod.getController();
  describe('ActsAbilityTest', () => {
    beforeAll(() => {
    })
    beforeEach(() => {
    })
    afterEach(() => {
    })
    afterAll(() => {
    })
    /**
     * @tc.number    : StartAbility_001
     * @tc.name      : StartAbility
     * @tc.desc      : Start the Ability
     */
    it(BUNDLE + ' StartAbility_001', 0, async (done: Function) => {
      hilog.info(DOMAIN, TAG, `${BUNDLE} StartAbility_001 begin`);
      let want: Want = {
        bundleName: BUNDLE,
        abilityName: ABILITY_NAME
      };
      delegator.startAbility(want, (err) => {
        hilog.info(DOMAIN, TAG, `${BUNDLE} startAbility end err ${JSON.stringify(err)}`);
      })
      await driver.delayMs(1000);
      hilog.info(DOMAIN, TAG, `${BUNDLE} StartAbility_001 end`);
      done();
    })

    /**
     * @tc.number    : getAdcValueAbility_001
     * @tc.name      : getAdcValueAbility
     * @tc.desc      : check get_adc_value() interface
     */
    it(BUNDLE + 'getAdcValueAbility_001', 1, async (done: Function) => {
      hilog.info(DOMAIN, TAG, '%{public}s', 'getAdcValueAbility test begin');
      try {
        let adc_test = adc_napi.get_adc_value()
        expect(0).not().assertEqual(adc_test)
        done()
      } catch (err) {
        hilog.info(DOMAIN, TAG, 'getAdcValueAbility test err and err is %{public}s', err);
      }
      hilog.info(DOMAIN, TAG, '%{public}s', 'getAdcValueAbility test end');
    })

    /**
     * @tc.number    : filewriteCallbackAbility_001
     * @tc.name      : filewriteCallbackAbility
     * @tc.desc      : check filewriteCallback() interface
     */
    it(BUNDLE + 'filewriteCallbackAbility_001', 2, async (done: Function) => {
      hilog.info(DOMAIN, TAG, '%{public}s', 'filewriteCallback test begin');
      try {
        let adc_test = adc_napi.filewriteCallback()
        expect(adc_test).assertNull()
        done()
      } catch (err) {
        hilog.info(DOMAIN, TAG, 'filewriteCallback test err and err is %{public}s', err);
      }
      hilog.info(DOMAIN, TAG, '%{public}s', 'filewriteCallback test end');
    })

    /**
     * @tc.number    : Click_001
     * @tc.name      : Click
     * @tc.desc      : Click and enter the second page
     */
    it(BUNDLE + ' Click_001', 3, async (done: Function) => {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Click_001 begin');

      try {
        await driver.delayMs(500);
        await driver.assertComponentExist(ON.id("welcomePage"));
        let enterSecondPage = await driver.findComponent(ON.id("welcomePage"))
        await enterSecondPage.click()
        await driver.delayMs(500);
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `Click_001 err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Click_001 end');
    })

    /**
     * @tc.number    : CheckValue001
     * @tc.name      : CheckValue
     * @tc.desc      : Check adcValue and TempC
     */
    it(BUNDLE + ' CheckValue001', 4, async (done: Function) => {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' CheckValue001 begin');

      try {
        await driver.delayMs(500);
        await driver.assertComponentExist(ON.id("adcValue"));
        let enterSecondPage = await driver.findComponent(ON.id("adcValue"))
        let text = await enterSecondPage.getText();
        let value = text.substring(text.indexOf(":") + 1,)
        let value_num = Number.parseInt(value)
        expect(value_num).assertLarger(0)
        expect(value_num).assertLess(800)
        hilog.info(DOMAIN, TAG, 'the text is %{public}s', text);

        await driver.assertComponentExist(ON.id("C"));
        let TempC = await driver.findComponent(ON.id("C"))
        text = await TempC.getText();
        value = text.substring(text.indexOf(":") + 1, text.indexOf("°"))
        value_num = Number.parseInt(value)
        expect(value_num).not().assertEqual(0)
        hilog.info(DOMAIN, TAG, 'the TempC is %{public}d', value_num);
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `CheckValue001 err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' CheckValue001 end');
    })

    /**
     * @tc.number    : Click_002
     * @tc.name      : Click
     * @tc.desc      : Click and enter setting page
     */
    it(BUNDLE + ' Click_002', 5, async (done: Function) => {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Click_002 begin');

      try {
        await driver.delayMs(500);
        await driver.assertComponentExist(ON.id("Setting"));
        let enterSecondPage = await driver.findComponent(ON.id("Setting"))
        await enterSecondPage.click()
        await driver.delayMs(500);
        await driver.assertComponentExist(ON.id("back"));
        enterSecondPage = await driver.findComponent(ON.id("back"))
        await enterSecondPage.click()
        await driver.delayMs(500);
        await driver.assertComponentExist(ON.id("Setting"));
        enterSecondPage = await driver.findComponent(ON.id("Setting"))
        await enterSecondPage.click()
        await driver.delayMs(500);
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `Click_002 err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Click_002 end');
    })

    /**
     * @tc.number    : Click_003
     * @tc.name      : Click
     * @tc.desc      : Check modeSet and Saving
     */
    it(BUNDLE + ' Click_003', 6, async (done: Function) => {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Click_003 begin');

      try {
        await driver.delayMs(500);
        await driver.assertComponentExist(ON.id("TempUnit"));
        await driver.assertComponentExist(ON.id("MinTemp"));
        await driver.assertComponentExist(ON.id("MaxTemp"));
        let C = await driver.findComponent(ON.id('°C'))
        await C.click()
        await driver.delayMs(500);
        let F = await driver.findComponent(ON.id('°F'))
        await F.click()
        await driver.delayMs(500);
        let Min = await driver.findComponent(ON.id("InputMin"))
        await Min.inputText("60")
        await driver.delayMs(500);
        await shurufa.hideTextInput()
        let Max = await driver.findComponent(ON.id("InputMax"))
        await Max.inputText("80")
        await driver.delayMs(500);
        await shurufa.hideTextInput()
        let saving = await driver.findComponent(ON.id("Saving"))
        await saving.click()
        await driver.delayMs(500);
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `Click_003 err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Click_003 end');
    })

    /**
     * @tc.number    : CheckValue002
     * @tc.name      : CheckValue
     * @tc.desc      : Check adcValue and TempF
     */
    it(BUNDLE + ' CheckValue002', 7, async (done: Function) => {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' CheckValue002 begin');

      try {
        await driver.delayMs(500);
        await driver.assertComponentExist(ON.id("adcValue"));
        let enterSecondPage = await driver.findComponent(ON.id("adcValue"))
        let text = await enterSecondPage.getText();
        let value = text.substring(text.indexOf(":") + 1,)
        let value_num = Number.parseInt(value)
        expect(value_num).assertLarger(0)
        expect(value_num).assertLess(800)
        hilog.info(DOMAIN, TAG, 'the text is %{public}s', text);

        await driver.assertComponentExist(ON.id("F"));
        let TempF = await driver.findComponent(ON.id("F"))
        text = await TempF.getText();
        value = text.substring(text.indexOf(":") + 1, text.indexOf("°"))
        value_num = Number.parseInt(value)
        expect(value_num).not().assertEqual(0)
        hilog.info(DOMAIN, TAG, 'the TempF is %{public}d', value_num);
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `CheckValue002 err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' CheckValue002 end');
    })

    /**
     * @tc.number    : Click_004
     * @tc.name      : Click
     * @tc.desc      : Enter the Canvas page and assert Component Exist
     */
    it(BUNDLE + ' Click_004', 8, async (done: Function) => {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Click_004 begin');

      try {
        await driver.delayMs(500);
        let history = await driver.findComponent(ON.id("history"))
        await history.click()
        await driver.assertComponentExist(ON.id("Canvas"));
        await driver.delayMs(500);
        let Slider = await driver.findComponent(ON.id("Slider"));
        expect(await Slider.isScrollable()).assertTrue()
        let draw = await driver.findComponent(ON.id("Draw"))
        await draw.click()
        await draw.click()
        await driver.delayMs(1000);
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `Click_004 err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Click_004 end');
    })

  })
}