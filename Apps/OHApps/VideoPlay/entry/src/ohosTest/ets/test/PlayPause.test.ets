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
import { describe, it } from '@ohos/hypium';
import { Driver, ON } from '@ohos.UiTest';
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import hilog from '@ohos.hilog';

const TAG = '[Sample_VideoPlay]';
const DOMAIN = 0xF811;
const BUNDLE = 'VideoPlay_';

export default function PlayPauseTest() {
  /**
   * 暂停、播放
   */
  describe('PlayPauseTest', () => {
    /**
     * 点击暂停
     */
    it(BUNDLE + 'PlayPause_001', 0, async (done: Function) => {
      hilog.info(DOMAIN, TAG, BUNDLE + 'PlayPause_001 begin');
      let abilityDelegatorRegistry = AbilityDelegatorRegistry.getAbilityDelegator();
      await abilityDelegatorRegistry.executeShellCommand('aa start -a EntryAbility -b net.openvally.videoplay');
      let driver = Driver.create();
      await driver.delayMs(2000);
      // 拉起操作界面
      await driver.assertComponentExist(ON.id('Video'));
      let stack = await driver.findComponent(ON.id('Video'));
      await stack.click();
      // 点击暂停
      await driver.assertComponentExist(ON.id('play'));
      let btnPlay = await driver.findComponent(ON.id('play'));
      await btnPlay.click();
      await driver.delayMs(2000);
      done();
      hilog.info(DOMAIN, TAG, BUNDLE + 'PlayPause_001 end');
    })
    /**
     * 点击播放
     */
    it(BUNDLE + 'PlayPause_002', 0, async (done: Function) => {
      hilog.info(DOMAIN, TAG, BUNDLE + 'PlayPause_002 begin');
      let driver = Driver.create();
      await driver.delayMs(6000);
      // 拉起操作界面
      await driver.assertComponentExist(ON.id('Video'));
      let stack = await driver.findComponent(ON.id('Video'));
      await stack.click();
      // 点击播放
      await driver.assertComponentExist(ON.id('play'));
      let btnPlay = await driver.findComponent(ON.id('play'));
      await btnPlay.click();
      await driver.delayMs(2000);
      done();
      hilog.info(DOMAIN, TAG, BUNDLE + 'PlayPause_002 end');
    })
  })
}