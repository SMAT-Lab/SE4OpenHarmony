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
import i2cnapidemo from '@ohos.i2cnapidemo';
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import { Driver, ON } from '@ohos.UiTest';

const BUNDLE = 'com.example.i2c_app';
const ABILITY_NAME = 'EntryAbility';
const TAG = 'i2cAppTest';
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

    it(BUNDLE + 'SoftResetAbility_001', 1, function () {
      // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
      hilog.info(DOMAIN, TAG, '%{public}s', 'SoftReset test begin');
      let a = i2cnapidemo.SoftReset();
      // Defines a variety of assertion methods, which are used to declare expected boolean conditions.
      expect(0).assertEqual(a)
      hilog.info(DOMAIN, TAG, '%{public}s', 'SoftReset test end');
    })

    it(BUNDLE + 'ModeSetAbility_001', 2, function () {
      // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
      hilog.info(DOMAIN, TAG, '%{public}s', 'ModeSet test begin');
      let MAX_Mps_Num = 6;
      let MAX_Rate_Num = 4;
      for (let Mps = -1; Mps < MAX_Mps_Num; Mps++) {
        for (let rate = -1; rate < MAX_Rate_Num; rate++) {
          if (Mps >= 0 && Mps <= 4 && rate >= 0 && rate <= 2) {
            let a = i2cnapidemo.ModeSet(Mps, rate);
            expect(0).assertEqual(a)
          }
          else {
            let b = i2cnapidemo.ModeSet(Mps, rate);
            expect(-3).assertEqual(b);
            hilog.error(DOMAIN, TAG, '%{public}s %{public}d %{public}d', 'Error para !!!', Mps, rate);
          }
        }
      }
      hilog.info(DOMAIN, TAG, '%{public}s', 'ModeSet test end');
    })

    it(BUNDLE + 'ReadDataAbility_001', 3, function () {
      // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
      hilog.info(DOMAIN, TAG, '%{public}s', 'ReadData test begin');

      let a = i2cnapidemo.ReadData();
      // Defines a variety of assertion methods, which are used to declare expected boolean conditions.
      expect(0).assertEqual(a)
      hilog.info(DOMAIN, TAG, '%{public}s', 'ReadData test end');
    })

    it(BUNDLE + 'ReadTemperatureCAbility_001', 4, function () {
      // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
      hilog.info(DOMAIN, TAG, '%{public}s', 'ReadTemperatureC test begin');

      let a = i2cnapidemo.ReadTemperatureC();
      // Defines a variety of assertion methods, which are used to declare expected boolean conditions.
      expect(a).assertLarger(0)
      hilog.info(DOMAIN, TAG, '%{public}s', 'ReadTemperatureC test end');
    })

    it(BUNDLE + 'ReadTemperatureFAbility_001', 5, function () {
      // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
      hilog.info(DOMAIN, TAG, '%{public}s', 'ReadTemperatureF test begin');

      let a = i2cnapidemo.ReadTemperatureF();
      // Defines a variety of assertion methods, which are used to declare expected boolean conditions.
      expect(a).assertLarger(0)
      hilog.info(DOMAIN, TAG, '%{public}s', 'ReadTemperatureF test end');
    })

    it(BUNDLE + 'ReadHumidityAbility_001', 6, function () {
      // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
      hilog.info(DOMAIN, TAG, '%{public}s', 'ReadHumidity test begin');

      let a = i2cnapidemo.ReadHumidity();
      // Defines a variety of assertion methods, which are used to declare expected boolean conditions.
      expect(a).assertLarger(0)
      hilog.info(DOMAIN, TAG, '%{public}s', 'ReadHumidity test end');
    })

    it(BUNDLE + ' Click_001', 7, async function (done) {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Click_001 begin');

      try {
        await driver.delayMs(500);
        let button = await driver.findComponent(ON.id('button'));
        await button.click()
        await driver.delayMs(500);
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `Click_001 err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Click_001 end');
    });

    it(BUNDLE + ' Click_002', 8, async function (done) {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Click_002 begin');

      try {
        await driver.delayMs(500);
        let button = await driver.findComponent(ON.id('softReset_button'));
        await button.click()
        await driver.delayMs(500);
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `Click_002 err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Click_002 end');
    });

    it(BUNDLE + ' Click_003', 9, async function (done) {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Click_003 begin');

      try {
        await driver.delayMs(500);
        let button = await driver.findComponent(ON.id('modeSet_button'));
        await button.click()
        await driver.delayMs(500);
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `Click_003 err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Click_003 end');
    });

    it(BUNDLE + ' Click_004', 10, async function (done) {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Click_004 begin');

      try {
        await driver.delayMs(500);
        let button = await driver.findComponent(ON.id('Mode_cancel'));
        await button.click()
        await driver.delayMs(500);
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `Click_004 err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Click_004 end');
    });

    it(BUNDLE + ' Click_005', 11, async function (done) {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Click_005 begin');

      try {
        await driver.delayMs(500);
        let button = await driver.findComponent(ON.id('modeSet_button'));
        await button.click()
        await driver.delayMs(500);
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `Click_005 err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Click_005 end');
    });

    it(BUNDLE + ' Click_006', 12, async function (done) {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Click_006 begin');

      try {
        await driver.delayMs(500);
        let button = await driver.findComponent(ON.id('modeConfirm_button'));
        await button.click()
        await driver.delayMs(500);
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `Click_006 err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Click_006 end');
    });

    it(BUNDLE + ' Click_007', 13, async function (done) {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Click_007 begin');

      try {
        await driver.delayMs(500);
        let button = await driver.findComponent(ON.id('getTemp_Button'));
        await button.click()
        await driver.delayMs(500);
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `Click_007 err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Click_007 end');
    });

    it(BUNDLE + ' CheckTemp_001', 14, async function (done) {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' CheckTempC begin');

      try {
        await driver.delayMs(500);
        let textC = await driver.findComponent(ON.id('TempC'))
        let getTextC = await textC.getText();
        let TempCStr = getTextC.substring(4, 9)
        let TempC = Number.parseFloat(TempCStr);
        hilog.info(DOMAIN, TAG, '%{public}s %{public}d', 'the TempC is ', TempC);
        expect(TempC).assertLarger(0)
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `CheckTempC err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' CheckTempC end');
    });

    it(BUNDLE + ' CheckTemp_002', 15, async function (done) {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' CheckTempF begin');

      try {
        await driver.delayMs(500);
        let textF = await driver.findComponent(ON.id('TempF'))
        let getTextF = await textF.getText();
        let TempFStr = getTextF.substring(4, 9)
        let TempF = Number.parseFloat(TempFStr);
        hilog.info(DOMAIN, TAG, '%{public}s %{public}d', 'the TempF is ', TempF);
        expect(TempF).assertLarger(0)
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `CheckTempF err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' CheckTempF end');
    });

    it(BUNDLE + ' CheckHum_001', 16, async function (done) {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' CheckHum begin');

      try {
        await driver.delayMs(500);
        let textH = await driver.findComponent(ON.id('Hum'))
        let getTextH = await textH.getText();
        let HumStr = getTextH.substring(3, 8)
        let Hum = Number.parseFloat(HumStr);
        hilog.info(DOMAIN, TAG, '%{public}s %{public}d', 'the Hum is ', Hum);
        expect(Hum).assertLarger(0)
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `CheckHum err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' CheckHum end');
    });

    it(BUNDLE + ' Swipe_001', 17, async function (done) {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Swipe_001 begin');

      try {
        await driver.delayMs(500);
        await driver.assertComponentExist(ON.id('Mps_TextPicker'));
        await driver.swipe(100, 110, 100, 200);
        await driver.delayMs(500);
        await driver.swipe(100, 110, 100, 200);
        await driver.delayMs(500);
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `Swipe_001 err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Swipe_001 end');
    });

    it(BUNDLE + ' Swipe_002', 18, async function (done) {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Swipe_002 begin');

      try {
        await driver.delayMs(500);
        await driver.assertComponentExist(ON.id('Repeatability_TextPicker'));
        await driver.swipe(300, 110, 300, 200);
        await driver.delayMs(500);
        await driver.swipe(300, 110, 300, 200);
        await driver.delayMs(500);
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `Swipe_002 err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Swipe_002 end');
    });

    it(BUNDLE + ' Click_008', 19, async function (done) {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Click_008 begin');

      try {
        await driver.delayMs(500);
        let button = await driver.findComponent(ON.id('modeSet_button'));
        await button.click()
        await driver.delayMs(500);
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `Click_008 err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Click_008 end');
    });

    it(BUNDLE + ' Click_009', 20, async function (done) {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Click_009 begin');

      try {
        await driver.delayMs(500);
        let button = await driver.findComponent(ON.id('modeConfirm_button'));
        await button.click()
        await driver.delayMs(500);
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `Click_009 err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Click_009 end');
    });

    it(BUNDLE + ' Click_010', 21, async function (done) {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Click_010 begin');

      try {
        await driver.delayMs(500);
        let button = await driver.findComponent(ON.id('back_button'));
        await button.click()
        await driver.delayMs(500);
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `Click_010 err ${err.code}  msg ${err.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Click_010 end');
    });

  })
}