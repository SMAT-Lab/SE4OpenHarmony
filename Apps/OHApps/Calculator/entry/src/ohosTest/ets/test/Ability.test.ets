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

import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { Driver, ON } from '@ohos.UiTest';
import logger from '../util/Logger';
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';

const TAG = '[Sample_etsdistributedcalc]';
const BUNDLE = 'Calculator_';
const DRIVER = Driver.create();
let abilityDelegatorRegistry = AbilityDelegatorRegistry.getAbilityDelegator();

export default function abilityTest() {
  describe('ActsAbilityTest', () => {

    /**
     * 长按打开卡片列表
     */
    it(BUNDLE + 'OpenFormList_001', 0, async (done: Function) => {
      let ability = await abilityDelegatorRegistry.getCurrentTopAbility();
      let manager = ability.context.resourceManager;
      // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
      logger.info(TAG, `${BUNDLE}OpenFormList_001 begin`);
      // 点击退出
      await DRIVER.pressBack();
      await DRIVER.delayMs(500);
      // 检查桌面是否存在计算器卡片应用
      await DRIVER.assertComponentExist(ON.text(await manager.getStringValue($r('app.string.EntryAbility_label'))));
      let apps = await DRIVER.findComponents(ON.text(await manager.getStringValue($r('app.string.EntryAbility_label'))));
      // 获取文字控件边框
      let rect = await apps[1].getBounds();
      // 计算文字控件高度
      let height = rect.bottom - rect.top;
      // 获取文字控件中心点
      let point = await apps[1].getBoundsCenter();
      await DRIVER.longClick(point.x, point.y - height);
      await DRIVER.delayMs(500);
      // 检查长按应用是否存在服务卡片弹窗
      await DRIVER.assertComponentExist(ON.text(await manager.getStringValue($r('app.string.Card_Button'))));
      let formBtn = await DRIVER.findComponent(ON.text(await manager.getStringValue($r('app.string.Card_Button'))));
      await formBtn.click();
      done();
      logger.info(TAG, `${BUNDLE}OpenFormList_001 end`);
    })

    /**
     * 创建卡片
     */
    it(BUNDLE + 'createForm_001', 0, async (done: Function) => {
      // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
      logger.info(TAG, `${BUNDLE}createForm_001 begin`);
      let resourceManager = AbilityDelegatorRegistry.getAbilityDelegator().getAppContext().resourceManager;
      await DRIVER.delayMs(500);
      // 检查是否有添加到桌面按钮
      await DRIVER.assertComponentExist(ON.text(await resourceManager.getStringValue($r('app.string.AddForm'))));
      let addToDesk = await DRIVER.findComponent(ON.text(await resourceManager.getStringValue($r('app.string.AddForm'))));
      await addToDesk.click();
      await DRIVER.delayMs(500);
      // 检查是否桌面上是否有计算器卡片
      await DRIVER.assertComponentExist(ON.text(await resourceManager.getStringValue($r('app.string.EntryAbility_label'))));
      let resultArray = await DRIVER.findComponents(ON.text(await resourceManager.getStringValue($r('app.string.EntryAbility_label'))));
      expect(resultArray.length).assertEqual(3);
      done();
      logger.info(TAG, `${BUNDLE}createForm_001 end`);
    })
  })
}