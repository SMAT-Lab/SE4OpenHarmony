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

import { describe, it, expect } from '@ohos/hypium';
import { Driver, ON, Component } from '@ohos.UiTest';
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import Logger from '../util/Logger';
import Want from '@ohos.app.ability.Want';


const BUNDLE = 'AdaptiveServiceWidget_';
const TAG = 'AppTestPage';

export default function appTest() {
  describe('appTest', () => {
    // 打开应用
    it(BUNDLE + 'StartAbility', 0, (done: Function) => {
      Logger.info(TAG, 'StartAbility start');
      let want: Want = {
        bundleName: "ohos.samples.adaptiveservicewidget",
        abilityName: "EntryAbility"
      };
      let abilityDelegator: AbilityDelegatorRegistry.AbilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator();
      abilityDelegator.startAbility(want, (err) => {
        Logger.info(TAG, `_startAbility get err ${JSON.stringify(err)}`);
        done();
        Logger.info(TAG, '_startAbility end');
      });
      Logger.info(TAG, 'StartAbility end');
    })
    /**
     * 返回桌面
     */
    it(`${BUNDLE}ReturnToDesktop_001`, 0, async () => {
      Logger.info(TAG, BUNDLE + 'ReturnToDesktop begin');
      let driver: Driver = Driver.create();
      await driver.delayMs(500);
      await driver.click(360, 1244);
      await driver.delayMs(500);
      Logger.info(TAG, BUNDLE + 'ReturnToDesktop end');
    })
    /**
     * 进入服务卡片
     */
    it(`${BUNDLE}EnterServiceCard_001`, 0, async () => {
      Logger.info(TAG, BUNDLE + 'EnterServiceCard_001 begin');
      let driver: Driver = Driver.create();
      await driver.delayMs(500);
      await driver.assertComponentExist(ON.text('AdaptiveServiceWidget'));
      let adaptiveServiceWidget: Component = await driver.findComponent(ON.text('AdaptiveServiceWidget'));
      // 获取文件控件边框
      let rect = await adaptiveServiceWidget.getBounds();
      // 计算文字控件高度
      let height = rect.bottom - rect.top;
      // 获取文字控件中心点
      let point = await adaptiveServiceWidget.getBoundsCenter();
      await driver.longClick(point.x, point.y - height);
      await driver.assertComponentExist(ON.text('服务卡片'));
      let serviceCard: Component = await driver.findComponent(ON.text('服务卡片'));
      await serviceCard.click();
      await driver.delayMs(1000);
      Logger.info(TAG, BUNDLE + 'EnterServiceCard_001 end');
    });
    /**
     * 选取卡片并添加到桌面
     */
    it(`${BUNDLE}GetServiceCard_001`, 0, async () => {
      Logger.info(TAG, BUNDLE + 'GetServiceCard_001 begin');
      let driver: Driver = Driver.create();
      await driver.delayMs(1000);
      await driver.swipe(430, 516, 320, 516, 600);
      await driver.delayMs(1000);
      await driver.swipe(430, 516, 320, 516, 600);
      await driver.delayMs(1000);
      await driver.assertComponentExist(ON.text('添加到桌面'));
      let addDesk: Component = await driver.findComponent(ON.text('添加到桌面'));
      await addDesk.click();
      await driver.delayMs(1000);
      //校验是否添加成功
      await driver.assertComponentExist(ON.text('AdaptiveServiceWidget'));
      let adaptiveServiceWidgets = await driver.findComponents(ON.text('AdaptiveServiceWidget'));
      await driver.delayMs(1000);
      if (adaptiveServiceWidgets.length <= 1) {
        expect().assertFail();
      }
      await driver.delayMs(500);
      Logger.info(TAG, BUNDLE + 'GetServiceCard_001 end');
    });
  })
}