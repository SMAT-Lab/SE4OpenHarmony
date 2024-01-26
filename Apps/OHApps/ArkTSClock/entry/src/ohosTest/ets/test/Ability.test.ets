/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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

import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { Driver, MatchPattern } from '@ohos.UiTest';
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import hilog from '@ohos.hilog';
import Want from '@ohos.app.ability.Want';

const TAG = '[Sample_Clock]';
const DOMAIN = 0xF811;
const BUNDLE = 'Clock_';

export default function appTest() {
  describe('ActsAbilityTest', () => {
    it(BUNDLE + 'StartAbility_001', 0, async (done:Function) => {
      hilog.info(DOMAIN, TAG, BUNDLE + 'StartAbility_001 begin');
      let abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator();
      let want: Want = {
        bundleName: 'ohos.samples.etsclock',
        abilityName: 'MainAbility'
      };
      abilityDelegator.startAbility(want, (err) => {
        if (err) {
          expect(err.code).assertEqual(0);
          done();
        } else {
          done();
        }
      });
      hilog.info(DOMAIN, TAG, BUNDLE + 'StartAbility_001 end');
    })

    /**
     * 进入应用
     */
    it(BUNDLE + 'CreateFunction_001', 0, async() => {
      hilog.info(DOMAIN, TAG, BUNDLE + 'CreateFunction_001 begin');
      let driver = Driver.create();
      await driver.delayMs(3000);
      hilog.info(DOMAIN, TAG, BUNDLE + 'CreateFunction_001 end');
    })
  })
}