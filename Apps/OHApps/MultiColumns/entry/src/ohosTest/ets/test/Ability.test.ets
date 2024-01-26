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
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import { logger } from '../util/Logger';
import { Driver, ON, ResizeDirection } from '@ohos.UiTest'

const TAG: string = '[Sample_MultiColumns]';
const BUNDLE = 'MultiColumns_';

export default function abilityTest() {
  describe('ActsAbilityTest', () => {
    /**
     * 拉起应用,进入A+B+C页面，拖拽窗口至360vp
     */
    it(BUNDLE + 'DragWindow_001', 0, async (done: Function) => {
      let driver = Driver.create();
      await startAbility();
      await driver.delayMs(1000);
      let buttonOne = await driver.findComponent(ON.id('caseOne'));
      await buttonOne.click();
      await dragWindow(vp2px(360));
      await driver.delayMs(1000);
      done();
    })

    /**
     * 拉起应用,进入A+B+C页面，拖拽窗口至600vp
     */
    it(BUNDLE + 'DragWindow_002', 0, async (done: Function) => {
      let driver = Driver.create();
      await terminateAbility();
      await driver.delayMs(1000);
      await startAbility();
      await driver.delayMs(1000);
      let buttonOne = await driver.findComponent(ON.id('caseOne'));
      await buttonOne.click();
      await dragWindow(vp2px(600));
      await driver.delayMs(1000);
      done();
    })

    /**
     * 拉起应用,进入A+B+C页面，拖拽窗口至840vp
     */
    it(BUNDLE + 'DragWindow_003', 0, async (done: Function) => {
      let driver = Driver.create();
      await terminateAbility();
      await driver.delayMs(1000);
      await startAbility();
      await driver.delayMs(1000);
      let buttonOne = await driver.findComponent(ON.id('caseOne'));
      await buttonOne.click();
      await dragWindow(vp2px(850));
      await driver.delayMs(1000);
      done();
    })

    /**
     * 拉起应用,进入A+C页面，拖拽窗口至360vp
     */
    it(BUNDLE + 'DragWindow_004', 0, async (done: Function) => {
      let driver = Driver.create();
      await terminateAbility();
      await driver.delayMs(1000);
      await startAbility();
      await driver.delayMs(1000);
      let buttonTwo = await driver.findComponent(ON.id('caseTwo'));
      await buttonTwo.click();
      await dragWindow(vp2px(360));
      await driver.delayMs(1000);
      done();
    })

    /**
     * 拉起应用,进入A+C页面，拖拽窗口至600vp
     */
    it(BUNDLE + 'DragWindow_005', 0, async (done: Function) => {
      let driver = Driver.create();
      await terminateAbility();
      await driver.delayMs(1000);
      await startAbility();
      await driver.delayMs(1000);
      let buttonTwo = await driver.findComponent(ON.id('caseTwo'));
      await buttonTwo.click();
      await dragWindow(vp2px(600));
      await driver.delayMs(1000);
      done();
    })

    /**
     * 拉起应用,进入B+C页面，拖拽窗口至360vp
     */
    it(BUNDLE + 'DragWindow_006', 0, async (done: Function) => {
      let driver = Driver.create();
      await terminateAbility();
      await driver.delayMs(1000);
      await startAbility();
      await driver.delayMs(1000);
      let buttonThree = await driver.findComponent(ON.id('caseThree'));
      await buttonThree.click();
      await dragWindow(vp2px(360));
      await driver.delayMs(1000);
      done();
    })

    /**
     * 拉起应用,进入B+C页面，拖拽窗口至600vp
     */
    it(BUNDLE + 'DragWindow_007', 0, async (done: Function) => {
      let driver = Driver.create();
      await terminateAbility();
      await driver.delayMs(1000);
      await startAbility();
      await driver.delayMs(1000);
      let buttonThree = await driver.findComponent(ON.id('caseThree'));
      await buttonThree.click();
      await dragWindow(vp2px(600));
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
      bundleName: 'com.samples.multicolumns',
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
    let windowObj = await driver.findWindow({ bundleName: 'com.samples.multicolumns' });
    let rectInfo = await windowObj.getBounds();
    let windowHeight = rectInfo.bottom - rectInfo.top;
    await windowObj.resize(width, windowHeight, ResizeDirection.LEFT);
  } catch (err) {
    logger.info(TAG, `dragWindow err ${JSON.stringify(err)}`);
  }
}