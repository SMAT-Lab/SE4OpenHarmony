/*
 * Copyright 2023 Unionman Technology Co., Ltd.
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
// import um_spi from '@ohos.spitest';
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import { Driver, ON } from '@ohos.UiTest';
import Want from '@ohos.app.ability.Want';


const BUNDLE = 'com.um.two_videoplayer';
const ABILITY_NAME = 'EntryAbility';
const TAG = 'two_videoplayer';
const DOMAIN = 0xF811;
let DELAY_TIME = 1000

export default function abilityTest() {
  let driver = Driver.create();
  let delegator = AbilityDelegatorRegistry.getAbilityDelegator();
  describe('ActsAbilityTest', () => {
    // Defines a test suite. Two parameters are supported: test suite name and test suite function.
    beforeAll(() => {
      // Presets an action, which is performed only once before all test cases of the test suite start.
      // This API supports only one parameter: preset action function.
    })
    beforeEach(() => {
      // Presets an action, which is performed before each unit test case starts.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: preset action function.
    })
    afterEach(() => {
      // Presets a clear action, which is performed after each unit test case ends.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: clear action function.
    })
    afterAll(() => {
      // Presets a clear action, which is performed after all test cases of the test suite end.
      // This API supports only one parameter: clear action function.
    })
    /**
     * @tc.number    : StartAbility_001
     * @tc.name      : StartAbility
     * @tc.desc      : start entry ability
     */
    it(BUNDLE + ' StartAbility_001', 0, async (done: Function) => {
      hilog.info(DOMAIN, TAG, `${BUNDLE} StartAbility_001 begin`);
      let want : Want= {
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
     * @tc.number    : Slider_001
     * @tc.name      : Slider
     * @tc.desc      : Sliding bar
     */
    it('Slider_001', 0, async () => {
      let driver: Driver = Driver.create();
      let atom = "Slider";
      await driver.assertComponentExist(ON.id(atom));
      let slider_01 = await driver.findComponent(ON.id(atom));
      let rect = await slider_01.getBoundsCenter();
      await driver.drag(rect.x - 100, rect.y, rect.x + 100, rect.y, 800)

    })
    /**
     * @tc.number    : Btn_001
     * @tc.name      : Btn
     * @tc.desc      : Click the pause button
     */
    it('Btn_001', 0, async () => {
      let driver: Driver = Driver.create();
      await driver.delayMs(DELAY_TIME);
      await driver.assertComponentExist(ON.id("Play"));
      let button = await driver.findComponent(ON.id("Play"));
      await button.click();
      await driver.delayMs(DELAY_TIME);

    })

  })
}
