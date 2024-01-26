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

import Logger from '../util/Logger';
import Want from '@ohos.app.ability.Want';
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import { Component, Driver, ON } from '@ohos.UiTest';
import { describe, it, expect } from '@ohos/hypium';

const TAG: string = "[Sample_NBody]";
const BUNDLE: string = 'NBody';
const delegator = AbilityDelegatorRegistry.getAbilityDelegator();
const ID_BUTTON_TASK_POOL_CALCULATE: string = "id_btn_task_pool_calculate";
const ID_BUTTON_WORKER_CALCULATE: string = "id_btn_worker_calculate";
const ID_TEXT_MESSAGE: string = "id_text_message";
const ID_TOP_IMAGE: string = "id_top_image";
const ID_TOP_TEXT: string = "id_top_text";
const CALCULATING_TEXT: string = "Calculating...";
const CALCULATE_RESULT_START_TEXT: string = "Total time costed = ";

// 资源本地化
function getResourceString<T extends Resource>(resource: T): string {
  let manage = delegator.getAppContext().resourceManager;
  let text = manage.getStringSync(resource);
  return text;
}

export default function abilityTest() {
  describe('ActsAbilityTest', () => {

    // 打开应用
    it(BUNDLE + '_startAbility', 0, async (done: Function) => {
      Logger.info(TAG, BUNDLE + '_startAbility start');
      let want: Want = {
        bundleName: 'com.example.nbody',
        abilityName: 'EntryAbility'
      };
      delegator.startAbility(want, (err) => {
        Logger.info(TAG, 'StartAbility get err ' + JSON.stringify(err));
        expect(err).assertNull();
      })
      Logger.info(TAG, BUNDLE + '_startAbility end');
      done();
    })

    // 验证页面是否正常显示
    it(BUNDLE + '_CheckPageFunction_001', 0, async (done: Function) => {
      Logger.info(TAG, BUNDLE + '_CheckPageFunction_001 begin');
      let driver = Driver.create();
      await driver.delayMs(2000);
      expect(driver).not().assertNull();
      Logger.info(TAG, BUNDLE + '_CheckPageFunction_001 check page');
      // 检查图片是否显示正常
      await driver.assertComponentExist(ON.id(ID_TOP_IMAGE));
      await driver.delayMs(500);
      // 检查标题是否显示正常
      await driver.assertComponentExist(ON.id(ID_TOP_TEXT));
      await driver.delayMs(500);
      // 检查显示消息的Text是否正常显示
      await driver.assertComponentExist(ON.id(ID_TEXT_MESSAGE));
      await driver.delayMs(500);
      // 检查通过TaskPool方式计算的Button是否正常显示
      await driver.assertComponentExist(ON.id(ID_BUTTON_TASK_POOL_CALCULATE));
      await driver.delayMs(500);
      // 检查通过Worker方式计算的Button是否正常显示
      await driver.assertComponentExist(ON.id(ID_BUTTON_WORKER_CALCULATE));
      Logger.info(TAG, BUNDLE + '_CheckPageFunction_001 end');
      done();
    })

    // 开始TaskPool方式计算
    it(BUNDLE + '_StartTaskPoolCalculate_001', 0, async (done: Function) => {
      Logger.info(TAG, BUNDLE + '_StartTaskPoolCalculate_001 begin');
      let driver: Driver = Driver.create();
      await driver.delayMs(2000);
      Logger.info(TAG, BUNDLE + '_StartTaskPoolCalculate_001 find component');
      let btnTaskPoolCalculate: Component = await driver.findComponent(ON.id(ID_BUTTON_TASK_POOL_CALCULATE));
      Logger.info(TAG, BUNDLE + '_StartTaskPoolCalculate_001 click');
      await btnTaskPoolCalculate.click();
      await driver.delayMs(1000);
      // 找到显示计算结果的Text组件
      let messageText: Component = await driver.findComponent(ON.id(ID_TEXT_MESSAGE));
      // 获取Text组件上显示的文字
      let text: string = await messageText.getText();
      // 判断是否处于测试状态
      expect(text === CALCULATING_TEXT).assertTrue()
      // 测试能否弹出重复测试的弹窗提示
      Logger.info(TAG, BUNDLE + '_StartTaskPoolCalculate_001 dialog test start');
      await btnTaskPoolCalculate.click();
      await driver.delayMs(1000);
      // 判断弹窗是否弹出
      await driver.assertComponentExist(ON.text(getResourceString($r('app.string.AlertDialog_message'))));
      await driver.delayMs(500);
      // 找到确认按钮，关闭弹窗
      let alertDialogClose: Component = await driver.findComponent(ON.text(getResourceString($r('app.string.AlertDialog_ok'))));
      await alertDialogClose.click();
      await driver.delayMs(500);
      // 获取到Worker计算的Button组件
      let btnWorkerCalculate: Component = await driver.findComponent(ON.id(ID_BUTTON_WORKER_CALCULATE));
      await btnWorkerCalculate.click();
      await driver.delayMs(1000);
      // 判断弹窗是否弹出
      await driver.assertComponentExist(ON.text(getResourceString($r('app.string.AlertDialog_message'))));
      await driver.delayMs(500);
      // 找到确认按钮，关闭弹窗
      alertDialogClose = await driver.findComponent(ON.text(getResourceString($r('app.string.AlertDialog_ok'))));
      await alertDialogClose.click();
      Logger.info(TAG, BUNDLE + '_StartTaskPoolCalculate_001 dialog test end');
      Logger.info(TAG, BUNDLE + '_StartTaskPoolCalculate_001 waiting result');
      // 等待计算结果
      while (text === CALCULATING_TEXT) {
        await driver.delayMs(2000);
        text = await messageText.getText();
      }
      // 判断计算结果是否以规定的文字显示
      expect(text.startsWith(CALCULATE_RESULT_START_TEXT)).assertTrue()
      Logger.info(TAG, BUNDLE + '_StartTaskPoolCalculate_001 end');
      done();
    })

    // 开始Worker方式计算
    it(BUNDLE + '_StartWorkerCalculate_001', 0, async (done: Function) => {
      Logger.info(TAG, BUNDLE + '_StartWorkerCalculate_001 begin');
      let driver: Driver = Driver.create();
      await driver.delayMs(2000);
      Logger.info(TAG, BUNDLE + '_StartWorkerCalculate_001 find component');
      let btnWorkerCalculate: Component = await driver.findComponent(ON.id(ID_BUTTON_WORKER_CALCULATE));
      Logger.info(TAG, BUNDLE + '_StartWorkerCalculate_001 click');
      await btnWorkerCalculate.click();
      await driver.delayMs(1000);
      // 找到显示计算结果的Text组件
      let messageText: Component = await driver.findComponent(ON.id(ID_TEXT_MESSAGE));
      // 获取Text组件上显示的文字
      let text: string = await messageText.getText();
      // 判断是否处于测试状态
      expect(text === CALCULATING_TEXT).assertTrue()
      // 测试能否弹出重复测试的弹窗提示
      Logger.info(TAG, BUNDLE + '_StartWorkerCalculate_001 dialog test start');
      await btnWorkerCalculate.click();
      await driver.delayMs(1000);
      // 判断弹窗是否弹出
      await driver.assertComponentExist(ON.text(getResourceString($r('app.string.AlertDialog_message'))));
      await driver.delayMs(500);
      // 找到确认按钮，关闭弹窗
      let alertDialogClose: Component = await driver.findComponent(ON.text(getResourceString($r('app.string.AlertDialog_ok'))));
      await alertDialogClose.click();
      await driver.delayMs(500);
      // 获取到TaskPool计算的Button组件
      let btnTaskPoolCalculate: Component = await driver.findComponent(ON.id(ID_BUTTON_TASK_POOL_CALCULATE));
      await btnTaskPoolCalculate.click();
      await driver.delayMs(1000);
      // 判断弹窗是否弹出
      await driver.assertComponentExist(ON.text(getResourceString($r('app.string.AlertDialog_message'))));
      await driver.delayMs(500);
      // 找到确认按钮，关闭弹窗
      alertDialogClose = await driver.findComponent(ON.text(getResourceString($r('app.string.AlertDialog_ok'))));
      await alertDialogClose.click();
      Logger.info(TAG, BUNDLE + '_StartWorkerCalculate_001 dialog test end');
      // 不等待计算结果，直接结束测试
      await driver.delayMs(1000);
      Logger.info(TAG, BUNDLE + '_StartWorkerCalculate_001 end');
      done();
    })
  })
}