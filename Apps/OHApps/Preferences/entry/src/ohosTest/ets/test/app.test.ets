/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import AbilityDelegatorRegistry from '@ohos.application.abilityDelegatorRegistry'
import { UiDriver, BY, UiComponent, MatchPattern } from '@ohos.UiTest'
import hilog from '@ohos.hilog'
import Want from '@ohos.app.ability.Want'

const TAG = '[Sample_Preferences]'
const DOMAIN = 0xF811
const BUNDLE = 'Preferences_'

export default function appTest() {
  describe('appTest', () => {
    it(BUNDLE + 'StartAbilityFunction_001', 0, async (done: Function) => {
      hilog.info(DOMAIN, TAG, BUNDLE + 'StartAbilityFunction_001 begin')
      let want: Want = {
        bundleName: "ohos.samples.preference",
        abilityName: "MainAbility"
      }
      let abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator()
      abilityDelegator.startAbility(want, (err, data) => {
        hilog.info(DOMAIN, TAG, BUNDLE + 'StartAbilityFunction_001,err.code:' + err.code)
        expect(0).assertEqual(err.code)
        done()
        hilog.info(DOMAIN, TAG, BUNDLE + 'StartAbilityFunction_001 end')
      })
    })
    /**
     * 点击按钮，选择主题
     */
    it(BUNDLE + 'SelectThemeFunction_001', 0, async () => {
      hilog.info(DOMAIN, TAG, BUNDLE + 'SelectThemeFunction_001 begin')
      let driver = await UiDriver.create()
      await driver.delayMs(1000)
      hilog.info(DOMAIN, TAG, BUNDLE + 'SelectThemeFunction_001 clickChangeBtn')
      // 点击按钮
      await driver.assertComponentExist(BY.key('changeBtn'))
      let btnChange = await driver.findComponent(BY.key('changeBtn'))
      await btnChange.click()
      await driver.delayMs(1000)
      hilog.info(DOMAIN, TAG, BUNDLE + 'SelectThemeFunction_001 end')
    })
  })
}