/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
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

const delegator = AbilityDelegatorRegistry.getAbilityDelegator();

export default function ExitTest() {
  describe('ExitTest', () => {
    /**
     * 退出测试
     */
    it(BUNDLE + 'Exit_001', 0, async (done: Function) => {
      hilog.info(DOMAIN, TAG, BUNDLE + 'Exit_001 begin');
      await delegator.executeShellCommand('aa start -a EntryAbility -b net.openvally.videoplay');
      // 拉起操作界面
      let driver = Driver.create();
      await driver.delayMs(1000);
      await driver.assertComponentExist(ON.id('Video'));
      let stack = await driver.findComponent(ON.id('Video'));
      await stack.click();
      // 点击退出
      await driver.delayMs(1000);
      await driver.assertComponentExist(ON.id('Exit'));
      let Exit = await driver.findComponent(ON.id('Exit'));
      await Exit.click();
      done();
      hilog.info(DOMAIN, TAG, BUNDLE + 'Exit_001 end');
    })
  })
}