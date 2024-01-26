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
import { getString } from '../../../main/ets/utils/ResourceUtil';
import hilog from '@ohos.hilog';

const TAG = '[Sample_VideoPlay]';
const DOMAIN = 0xF811;
const BUNDLE = 'VideoPlay_';

export default function ChooseTest() {
  describe('ChooseTest', () => {
    /**
     * 切换test2.mp4视频
     */
    it(BUNDLE + 'Choose_001', 0, async (done: Function) => {
      // 启动Ability
      hilog.info(DOMAIN, TAG, BUNDLE + 'Choose_001 begin');
      let abilityDelegatorRegistry = AbilityDelegatorRegistry.getAbilityDelegator();
      await abilityDelegatorRegistry.executeShellCommand('aa start -a EntryAbility -b net.openvally.videoplay');

      // 拉起操作界面
      let driver = await Driver.create();
      await driver.delayMs(1000);
      await driver.assertComponentExist(ON.id('Video'));
      let stack = await driver.findComponent(ON.id('Video'));
      await driver.delayMs(5000);
      await stack.click();
      // 点击视频列表
      await driver.assertComponentExist(ON.id('Choose'));
      let btnPlay = await driver.findComponent(ON.id('Choose'));
      await btnPlay.click();

      // 点击test2.mp4
      const str = await getString($r('app.string.video_res_2'));
      await driver.assertComponentExist(ON.text(str));
      let button = await driver.findComponent(ON.text(str));
      await button.click();
      await driver.delayMs(1000);
      done();
      hilog.info(DOMAIN, TAG, BUNDLE + 'Choose_001 end');
    })

    /**
     * 切换network.mp4视频
     */
    it(BUNDLE + 'Choose_002', 0, async (done: Function) => {
      hilog.info(DOMAIN, TAG, BUNDLE + 'Choose_002 begin');
      let driver = await Driver.create();
      await driver.delayMs(1000);
      // 拉起操作界面
      await driver.assertComponentExist(ON.id('Video'));
      let stack = await driver.findComponent(ON.id('Video'));
      await driver.delayMs(5000);
      await stack.click();
      // 点击视频列表
      await driver.assertComponentExist(ON.id('Choose'));
      let btnPlay = await driver.findComponent(ON.id('Choose'));
      await btnPlay.click();
      // 点击netWork.mp4
      const str = await getString($r('app.string.video_res_3'));
      await driver.assertComponentExist(ON.text(str));
      let button = await driver.findComponent(ON.text(str));
      await button.click();
      await driver.delayMs(3000);
      done();
      hilog.info(DOMAIN, TAG, BUNDLE + 'Choose_002 end');
    })

    /**
     * 切换test1.mp4视频
     */
    it(BUNDLE + 'Choose_003', 0, async (done: Function) => {
      hilog.info(DOMAIN, TAG, BUNDLE + 'Choose_003 begin');
      let driver = await Driver.create();
      await driver.delayMs(1000);
      // 拉起操作界面
      await driver.assertComponentExist(ON.id('Video'));
      let stack = await driver.findComponent(ON.id('Video'));
      await driver.delayMs(5000);
      await stack.click();
      // 点击视频列表
      await driver.assertComponentExist(ON.id('Choose'));
      let btnPlay = await driver.findComponent(ON.id('Choose'));
      await btnPlay.click();

      // 点击test1.mp4
      const str = await getString($r('app.string.video_res_1'));
      await driver.assertComponentExist(ON.text(str));
      let button = await driver.findComponent(ON.text(str));
      await button.click();
      await driver.delayMs(1000);
      done();
      hilog.info(DOMAIN, TAG, BUNDLE + 'Choose_003 end');
    })
  })
}