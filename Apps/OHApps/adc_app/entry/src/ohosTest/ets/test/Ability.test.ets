/* Copyright 2023 Unionman Technology Co., Ltd.
 *
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
 *
 */
import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import { Driver, ON } from '@ohos.UiTest';
import adc_napi from '@ohos.adc_napi';

const BUNDLE = 'com.example.adc_app';
const ABILITY_NAME = 'EntryAbility';
const TAG = 'adcAppTest';
const DOMAIN = 0xF811;

export default function abilityTest() {
  let driver = Driver.create();
  let delegator = AbilityDelegatorRegistry.getAbilityDelegator();
  describe('ActsAbilityTest', function () {
    // Defines a test suite. Two parameters are supported: test suite name and test suite function.
    beforeAll(function () {
      // Presets an action, which is performed only once before all test cases of the test suite start.
      // This API supports only one parameter: preset action function.
    })
    beforeEach(function () {
      // Presets an action, which is performed before each unit test case starts.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: preset action function.
    })
    afterEach(function () {
      // Presets a clear action, which is performed after each unit test case ends.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: clear action function.
    })
    afterAll(function () {
      // Presets a clear action, which is performed after all test cases of the test suite end.
      // This API supports only one parameter: clear action function.
    })
    it(BUNDLE + ' StartAbility_001', 0, async function (done) {
      hilog.info(DOMAIN, TAG, `${BUNDLE} StartAbility_001 begin`);
      let want = {
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

    it(BUNDLE + 'getPermissionAbility_001', 1, function () {
      // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
      hilog.info(DOMAIN, TAG, '%{public}s', 'getPermissionAbility_001 test begin');
      if (adc_napi.sync_get_adc_value() < 0)
      {
      let a = adc_napi.sync_get_permission();
      expect(0).assertEqual(a)
      }
      // Defines a variety of assertion methods, which are used to declare expected boolean conditions.
      hilog.info(DOMAIN, TAG, '%{public}s', 'getPermissionAbility_001 test end');
    })

    it(BUNDLE + 'getAdcValueAbility_001', 2, function () {
      // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
      hilog.info(DOMAIN, TAG, '%{public}s', 'getAdcValueAbility_001 test begin');
      let a = adc_napi.sync_get_adc_value()
      // Defines a variety of assertion methods, which are used to declare expected boolean conditions.
      expect(a).assertLess(800)
      expect(a).assertLarger(-1)
      hilog.info(DOMAIN, TAG, '%{public}s  %{public}d', 'the temp is ',0.042 * a);
      hilog.info(DOMAIN, TAG, '%{public}s', 'getAdcValueAbility_001 test end');
    })

    it(BUNDLE + ' Click_001', 3, async function (done) {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Click_001 begin');

      try {
        await driver.delayMs(500);
        let button = await driver.findComponent(ON.id('get_adc_button'));
        await button.click()
        await driver.delayMs(500);
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `Click_001 err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Click_001 end');
    });

    it(BUNDLE + ' Click_002', 4, async function (done) {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Click_002 begin');

      try {
        await driver.delayMs(500);
        let button = await driver.findComponent(ON.id('Toggle'));
        await button.click()
        await driver.assertComponentExist(ON.id('QRCode'))
        await driver.delayMs(500);
        await button.click()
        await driver.delayMs(500);
        await button.click()
        await driver.assertComponentExist(ON.id('QRCode'))
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `Click_002 err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Click_002 end');
    });

    it(BUNDLE + ' CheckTemp_001', 5, async function (done) {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' CheckTempC begin');

      try {
        await driver.delayMs(500);
        let textC = await driver.findComponent(ON.id('Temp_value'))
        let getTextC = await textC.getText();
        let TempCStr = getTextC.substring(3, 7)
        let TempC = Number.parseFloat(TempCStr);
        hilog.info(DOMAIN, TAG, '%{public}s %{public}d', 'the TempC is ', TempC);
        expect(TempC).assertLarger(-1)
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `CheckTempC err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' CheckTempC end');
    });

    it(BUNDLE + ' CheckAdc_001', 6, async function (done) {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' CheckAdc begin');

      try {
        await driver.delayMs(500);
        let textadc = await driver.findComponent(ON.id('adc_value'))
        let getTextAdc = await textadc.getText();
        let ADCStr = getTextAdc.substring(6, )
        let ADC = Number.parseFloat(ADCStr);
        hilog.info(DOMAIN, TAG, '%{public}s %{public}d', 'adc_value is ', ADC);
        expect(ADC).assertLess(800)
        expect(ADC).assertLarger(-1)
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `CheckAdc err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' CheckAdc end');
    });

  })
}