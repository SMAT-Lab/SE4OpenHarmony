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

import { describe, it, expect } from '@ohos/hypium';
import { Driver, ON, Component } from '@ohos.UiTest';
import UIAbility from '@ohos.app.ability.UIAbility';
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import Logger from '../util/Logger';
import Want from '@ohos.app.ability.Want';

const TAG = 'AppTest';
const BUNDLE = 'PatternLock_';
let driver: Driver = Driver.create();
let abilityDelegatorRegistry = AbilityDelegatorRegistry.getAbilityDelegator();
let ability: UIAbility;

export default function appTest() {
  describe('appTest',  () => {
    // 启动应用
    it(BUNDLE + 'StartAbility_001', 0, async  (done:Function) => {
      Logger.info(TAG, `${BUNDLE}StartAbility start`);
      let want:Want = {
        bundleName: 'ohos.samples.patternlock',
        abilityName: 'MainAbility'
      }
      abilityDelegatorRegistry.startAbility(want, (err) => {
        Logger.info(TAG, `${BUNDLE}StartAbility get err ${JSON.stringify(err)}`);
        done();
      });
      ability = await abilityDelegatorRegistry.getCurrentTopAbility();
      Logger.info(TAG, `${BUNDLE}StartAbility end`);
    });
    // 验证是否进入页面
    it(`${BUNDLE}CheckEnterPage_001`, 0, async () => {
      Logger.info(TAG, `${BUNDLE}CheckEnterPage_001 begin`);
      await driver.delayMs(1000);
      await driver.assertComponentExist(ON.id('title'));
      Logger.info(TAG, `${BUNDLE}CheckEnterPage_001 end`);
    })
  })
}