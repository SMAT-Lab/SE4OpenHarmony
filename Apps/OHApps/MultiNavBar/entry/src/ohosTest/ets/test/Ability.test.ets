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
import { Driver, ON, ResizeDirection } from '@ohos.UiTest';
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import { logger } from '../util/Logger';

const TAG: string = '[Sample_MultiNavBar]';
const BUNDLE = 'MultiNavBar_';

export default function abilityTest() {
  describe('ActsAbilityTest', () => {
    /**
     * 拉起应用，拖拽窗口至360vp
     */
    it(BUNDLE + 'testAbility_001', 0, async (done: Function) => {
      let driver = Driver.create();
      await startAbility();
      await driver.delayMs(1000);
      await dragWindow(vp2px(360));
      await driver.delayMs(1000);
      done();
    })

    /**
     * 拉起应用，拖拽窗口至580vp
     */
    it(BUNDLE + 'testAbility_002', 0, async (done: Function) => {
      let driver = Driver.create();
      await startAbility();
      await driver.delayMs(1000);
      await dragWindow(vp2px(580));
      await driver.delayMs(1000);
      done();
    })

    /**
     * 拉起应用，拖拽窗口至800vp
     */
    it(BUNDLE + 'testAbility_003', 0, async (done: Function) => {
      let driver = Driver.create();
      await startAbility();
      await driver.delayMs(1000);
      await dragWindow(vp2px(800));
      await driver.delayMs(1000);
      done();
    })

    /**
     * 拉起应用，拖拽窗口至800vp，点击汉堡按钮切换至侧边导航栏
     */
    it(BUNDLE + 'testAbility_004', 0, async (done: Function) => {
      let driver = Driver.create();
      await startAbility();
      await driver.delayMs(1000);
      await dragWindow(vp2px(800));
      await driver.delayMs(1000);
      await buttonClick('switchButton');
      await driver.delayMs(1000);
      done();
    })

    /**
     * 拉起应用，拖拽窗口至1080vp
     */
    it(BUNDLE + 'testAbility_005', 0, async (done: Function) => {
      let driver = Driver.create();
      await startAbility();
      await driver.delayMs(1000);
      await dragWindow(vp2px(1080));
      await driver.delayMs(1000);
      done();
    })

    /**
     * 拉起应用，拖拽窗口至1080vp，点击汉堡按钮切换至侧边Tabs
     */
    it(BUNDLE + 'testAbility_006', 0, async (done: Function) => {
      let driver = Driver.create();
      await startAbility();
      await driver.delayMs(1000);
      await dragWindow(vp2px(1080));
      await driver.delayMs(1000);
      await buttonClick('switchButton');
      await driver.delayMs(1000);
      done();
    })

    /**
     * 拉起应用，拖拽窗口至1080vp，点击汉堡按钮切换至侧边Tabs，点击搜索图标切换至侧边导航栏
     */
    it(BUNDLE + 'testAbility_007', 0, async (done: Function) => {
      let driver = Driver.create();
      await startAbility();
      await driver.delayMs(1000);
      await dragWindow(vp2px(1080));
      await driver.delayMs(1000);
      await buttonClick('switchButton');
      await driver.delayMs(1000);
      await buttonClick('searchButton');
      await driver.delayMs(1000);
      done();
    })

    /**
     * 拉起应用，拖拽窗口至1080vp，拖动侧边导航栏区域
     */
    it(BUNDLE + 'testAbility_008', 0, async (done: Function) => {
      let driver = Driver.create();
      await startAbility();
      await driver.delayMs(1000);
      await dragWindow(vp2px(1080));
      await driver.delayMs(1000);
      await driver.swipe(725, 900, 800, 900);
      await driver.delayMs(1000);
      done();
    })

    /**
     * 拉起应用，拖拽窗口至1080vp，点击底部工具栏添加按钮，再次点击汉堡按钮切换至侧边Tabs，点击底部工具更多图标
     */
    it(BUNDLE + 'testAbility_009', 0, async (done: Function) => {
      let driver = Driver.create();
      await startAbility();
      await driver.delayMs(1000);
      await dragWindow(vp2px(1080));
      await driver.delayMs(1000);
      await buttonClick('addTools');
      await driver.delayMs(1000);
      await buttonClick('switchButton');
      await driver.delayMs(1000);
      await buttonClick('moreTools');
      await driver.delayMs(1000);
      done();
    })
  })
}

/**
 * 拉起应用
 */
async function startAbility() {
  try {
    let abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator();
    await abilityDelegator.startAbility({
      bundleName: 'com.samples.multiplenavbar',
      abilityName: 'EntryAbility'
    });
  } catch (err) {
    logger.info(TAG, `StartAbility err ${JSON.stringify(err)}`);
  }
}

/**
 * 关闭应用
 */
async function terminateAbility() {
  try {
    let abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator();
    let topAbility = await abilityDelegator.getCurrentTopAbility();
    await topAbility.context.terminateSelf();
  } catch (err) {
    logger.info(TAG, `terminateAbility err ${JSON.stringify(err)}`);
  }
}

/**
 * 拖拽窗口
 */
async function dragWindow(width: number) {
  try {
    let driver = Driver.create();
    let windowObj = await driver.findWindow({ actived: true });
    let rectInfo = await windowObj.getBounds();
    let windowHeight = rectInfo.bottom - rectInfo.top;
    await windowObj.resize(width, windowHeight, ResizeDirection.LEFT);
  } catch (err) {
    logger.info(TAG, `dragWindow err ${JSON.stringify(err)}`);
  }
}

/**
 * 按钮点击事件
 */
async function buttonClick(componentId: string) {
  try {
    let driver = Driver.create();
    let btn = await driver.findComponent(ON.id(componentId));
    await driver.delayMs(300);
    await btn.click();
  } catch (err) {
    logger.info(TAG, `buttonClick err ${JSON.stringify(err)}`);
  }
}