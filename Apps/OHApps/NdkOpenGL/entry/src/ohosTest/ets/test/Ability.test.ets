/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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

import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import { Driver, ON } from '@ohos.UiTest';

const BUNDLE_NAME = 'com.samples.ndkopengl';
const ABILITY_NAME = 'EntryAbility';
const TAG = 'NdkOpenGLTest';
const DOMAIN = 0xF629;

interface wantType {
  bundleName: string;
  abilityName: string
}

export default function abilityTest() {
  let driver = Driver.create();
  let delegator = AbilityDelegatorRegistry.getAbilityDelegator();
  describe('ActsAbilityTest', () => {
    it(BUNDLE_NAME + ' StartAbility_001', 0, async (done: Function) => {
      hilog.info(DOMAIN, TAG, `${BUNDLE_NAME} StartAbility_001 begin`);
      let want = {
        bundleName: BUNDLE_NAME,
        abilityName: ABILITY_NAME
      } as wantType;
      delegator.startAbility(want, (err) => {
        hilog.info(DOMAIN, TAG, `${BUNDLE_NAME} startAbility end err ${JSON.stringify(err)}`);
      })
      await driver.delayMs(1000);
      hilog.info(DOMAIN, TAG, `${BUNDLE_NAME} StartAbility_001 end`);
      done();
    })

    /**
     * 左右滑动
     */
    it(BUNDLE_NAME + ' Swipe_001', 0, async (done: Function) => {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE_NAME + ' Swipe_001 begin');

      try {
        await driver.delayMs(1000);
        await driver.assertComponentExist(ON.id('xComponent'));
        await driver.swipe(100, 400, 130, 400);
        await driver.delayMs(1000);
        await driver.swipe(200, 400, 170, 400);
        await driver.delayMs(1000);
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `Swipe_001 err ${err?.code}  msg ${err?.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE_NAME + ' Swipe_001 end');
    });

    /**
     * 上下滑动
     */
    it(BUNDLE_NAME + ' Swipe_002', 0, async (done: Function) => {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE_NAME + ' Swipe_002 begin');

      try {
        await driver.delayMs(1000);
        await driver.assertComponentExist(ON.id('xComponent'));
        await driver.swipe(100, 400, 100, 445);
        await driver.delayMs(1000);
        await driver.swipe(100, 300, 100, 455);
        await driver.delayMs(1000);
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `Swipe_002 err ${err?.code}  msg ${err?.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE_NAME + ' Swipe_002 end');
    });

    /**
     * 对角线滑动
     */
    it(BUNDLE_NAME + ' Swipe_003', 0, async (done: Function) => {
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE_NAME + ' Swipe_003 begin');

      try {
        await driver.delayMs(1000);
        await driver.assertComponentExist(ON.id('xComponent'));
        await driver.swipe(100, 400, 120, 445);
        await driver.delayMs(1000);
        await driver.swipe(145, 400, 100, 355);
        await driver.delayMs(1000);
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, '%{public}s', `Swipe_003 err ${err?.code}  msg ${err?.message}`);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE_NAME + ' Swipe_003 end');
    });
  })
}