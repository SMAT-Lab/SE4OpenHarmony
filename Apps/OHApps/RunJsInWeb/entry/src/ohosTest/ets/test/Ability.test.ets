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

import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import { describe, it, expect } from '@ohos/hypium';
import { Driver, ON, Component, MatchPattern } from '@ohos.UiTest';
import Want from '@ohos.app.ability.Want';
import { logger } from '../util/Logger';

const TAG = '[Sample_RunJsInWeb]';
const BUNDLE = 'RunJsInWeb_';

export default function abilityTest() {
  let driver = Driver.create();
  let delegator = AbilityDelegatorRegistry.getAbilityDelegator();
  describe('ActsAbilityTest', () => {
    // 启动应用
    it(BUNDLE + 'StartAbility_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE}StartAbility_001 begin`);
      let want: Want = {
        bundleName: 'com.samples.runjsinweb',
        abilityName: 'EntryAbility'
      };
      delegator.startAbility(want, (err) => {
        logger.info(TAG, `${BUNDLE}startAbility end err ${JSON.stringify(err)}`);
      })
      await driver.delayMs(1000);
      await delegator.getCurrentTopAbility().then((Ability) => {
        logger.info(TAG, `${BUNDLE}get top ability, ${Ability.context.abilityInfo.name}`);
        expect(Ability.context.abilityInfo.name).assertEqual('EntryAbility');
      })
      logger.info(TAG, `${BUNDLE}StartAbility_001 end`);
      done();
    })

    // 游戏界面按钮显示
    it(BUNDLE + 'CheckUI_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE}CheckUI_001 begin`);
      await driver.delayMs(3000);
      await driver.assertComponentExist(ON.text('Start', MatchPattern.CONTAINS));
      await driver.assertComponentExist(ON.text('Reset', MatchPattern.CONTAINS));
      await driver.assertComponentExist(ON.text('L', MatchPattern.CONTAINS));
      await driver.assertComponentExist(ON.text('R', MatchPattern.CONTAINS));
      logger.info(TAG, `${BUNDLE}CheckUI_001 end`);
      done();
    })

    // 开始游戏
    it(BUNDLE + 'StartGame_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE}StartGame_001 begin`);
      await driver.delayMs(1000);
      await driver.assertComponentExist(ON.text('Start', MatchPattern.CONTAINS));
      let start = await driver.findComponent(ON.text('Start', MatchPattern.CONTAINS));
      let left = await driver.findComponent(ON.text('L', MatchPattern.CONTAINS));
      let right = await driver.findComponent(ON.text('R', MatchPattern.CONTAINS));
      await start.click();
      await left.click();
      await right.click();
      await driver.delayMs(2000);
      logger.info(TAG, `${BUNDLE}StartGame_001 end`);
      done();
    })
  })
}