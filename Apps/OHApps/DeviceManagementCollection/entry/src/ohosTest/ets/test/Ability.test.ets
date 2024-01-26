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

import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import { describe, beforeAll, it } from '@ohos/hypium';
import { Driver, ON, MatchPattern } from '@ohos.UiTest';
import { logger } from '../util/Logger';
import { getString, getStringArray } from '../util/ResourceUtil';
import Want from '@ohos.app.ability.Want';

const TAG: string = 'Sample_DeviceManagement';
const BUNDLE = 'DeviceManagement_';
const delegator = AbilityDelegatorRegistry.getAbilityDelegator();

export default function abilityTest() {
  /**
   * 启动测试app
   */
  beforeAll(async () => {
    logger.info(TAG, `${BUNDLE}StartAbility_001, begin`);
    let want : Want = {
      bundleName: "com.samples.devicemanagementcollection",
      abilityName: "EntryAbility"
    };
    let driver: Driver = Driver.create();
    delegator.startAbility(want, (err) => {
      logger.info(TAG, `${BUNDLE}StartAbility_001, success`);
    })
    await driver.delayMs(1000);
    logger.info(TAG, `${BUNDLE}StartAbility_001, end`);
  })
  describe('ActsAbilityTest', () => {

    /**
     * 电量信息
     */
    it(BUNDLE + 'BatteryInfo_001', 0, async (done: Function) => {
      let driver: Driver = Driver.create();
      await driver.delayMs(200);
      logger.info(TAG, `${BUNDLE}BatteryInfo_001, begin`);
      await driver.assertComponentExist(ON.type('List'));
      let list = await driver.findComponent(ON.type('List'));
      logger.info(TAG, `${BUNDLE}BatteryInfo_001, find ${getString($r('app.string.battery_info'))}`);
      let button = await list.scrollSearch(ON.text(getString($r('app.string.battery_info'))));
      logger.info(TAG, `${BUNDLE}BatteryInfo_001, click ${getString($r('app.string.battery_info'))}`);
      await button.click();
      await driver.delayMs(200);

      logger.info(TAG, `${BUNDLE}BatteryInfo_001, success`);
      await driver.assertComponentExist(ON.text('Battery SOC'));
      logger.info(TAG, `${BUNDLE}BatteryInfo_001, end`);

      await driver.pressBack();
      done();
    })

    /**
     * RunningLock
     */
    it(BUNDLE + 'RunningLock_001', 0, async (done: Function) => {
      let driver: Driver = Driver.create();
      await driver.delayMs(200);
      logger.info(TAG, `${BUNDLE}RunningLock_001, begin`);
      await driver.assertComponentExist(ON.type('List'));
      let list = await driver.findComponent(ON.type('List'));
      logger.info(TAG, `${BUNDLE}RunningLock_001, find ${getString($r('app.string.running_lock'))}`);
      let button = await list.scrollSearch(ON.text(getString($r('app.string.running_lock'))));
      logger.info(TAG, `${BUNDLE}RunningLock_001, click ${getString($r('app.string.running_lock'))}`);
      await button.click();
      await driver.delayMs(200);
      logger.info(TAG, `${BUNDLE}RunningLock_001, end`);

      let opts = await getStringArray($r('app.strarray.running_lock_operations'))
      logger.info(TAG, `${BUNDLE}RunningLock_002, begin`);
      logger.info(TAG, `${BUNDLE}RunningLock_002, find ${opts[0]}`);
      await driver.assertComponentExist(ON.text(opts[0]));
      let btn1 = await driver.findComponent(ON.text(opts[0]));
      logger.info(TAG, `${BUNDLE}RunningLock_002, click ${opts[0]}`);
      await btn1.click();
      await driver.delayMs(200);
      logger.info(TAG, `${BUNDLE}RunningLock_002, end`);

      logger.info(TAG, `${BUNDLE}RunningLock_003, begin`);
      logger.info(TAG, `${BUNDLE}RunningLock_003, find ${opts[1]}`);
      await driver.assertComponentExist(ON.text(opts[1]));
      let btn2 = await driver.findComponent(ON.text(opts[1]));
      logger.info(TAG, `${BUNDLE}RunningLock_003, click ${opts[1]}`);
      await btn2.click();
      await driver.delayMs(200);
      logger.info(TAG, `${BUNDLE}RunningLock_003, end`);

      logger.info(TAG, `${BUNDLE}RunningLock_004, begin`);
      logger.info(TAG, `${BUNDLE}RunningLock_004, find ${opts[2]}`);
      await driver.assertComponentExist(ON.text(opts[2]));
      let btn3 = await driver.findComponent(ON.text(opts[2]));
      logger.info(TAG, `${BUNDLE}RunningLock_004, click ${opts[2]}`);
      await btn3.click();
      await driver.delayMs(3000);
      logger.info(TAG, `${BUNDLE}RunningLock_004, end`);

      await driver.pressBack();
      done();
    })

    /**
     * 系统电源管理
     */
    it(BUNDLE + 'Power_001', 0, async (done: Function) => {
      let driver: Driver = Driver.create();
      logger.info(TAG, `${BUNDLE}Power_001, begin`);
      await driver.assertComponentExist(ON.type('List'));
      let list = await driver.findComponent(ON.type('List'));
      logger.info(TAG, `${BUNDLE}Power_001, find ${getString($r('app.string.power_manager'))}`);
      let button = await list.scrollSearch(ON.text(getString($r('app.string.power_manager'))));
      logger.info(TAG, `${BUNDLE}Power_001, click ${getString($r('app.string.power_manager'))}`);
      await button.click();
      await driver.delayMs(200);
      logger.info(TAG, `${BUNDLE}Power_001, end`);
      let opts = await getStringArray($r('app.strarray.power_operations'))

      logger.info(TAG, `${BUNDLE}Power_002, begin`);
      // 检测亮灭屏状态
      logger.info(TAG, `${BUNDLE}Power_002, find ${opts[0]}`);
      await driver.assertComponentExist(ON.text(opts[0], MatchPattern.CONTAINS));
      let judge = await driver.findComponent(ON.text(opts[0], MatchPattern.CONTAINS));
      logger.info(TAG, `${BUNDLE}Power_002, click ${opts[0]}`);
      await judge.click();
      await driver.delayMs(1000);
      logger.info(TAG, `${BUNDLE}Power_002, find ${getString($r('app.string.screen_state'))}`);
      await driver.assertComponentExist(ON.text(getString($r('app.string.screen_state')), MatchPattern.CONTAINS));
      await driver.delayMs(200);
      logger.info(TAG, `${BUNDLE}Power_002, end`);

      logger.info(TAG, `${BUNDLE}Power_003, begin`);
      // 获取电源模式
      logger.info(TAG, `${BUNDLE}Power_003, find ${opts[1]}`);
      await driver.assertComponentExist(ON.text(opts[1], MatchPattern.CONTAINS));
      let modeBtn = await driver.findComponent(ON.text(opts[1], MatchPattern.CONTAINS));
      logger.info(TAG, `${BUNDLE}Power_003, click ${opts[1]}`);
      await modeBtn.click();
      await driver.delayMs(1000);
      logger.info(TAG, `${BUNDLE}Power_003, find ${getString($r('app.string.power_mode'))}:`);
      await driver.assertComponentExist(ON.text(getString($r('app.string.power_mode')), MatchPattern.CONTAINS));
      await driver.delayMs(200);
      logger.info(TAG, `${BUNDLE}Power_003, end`);

      await driver.pressBack();
      done();
    })

    /**
     * 设置数据项名称
     */
    it(BUNDLE + 'Settings_001', 0, async (done: Function) => {
      let driver: Driver = Driver.create();
      await driver.delayMs(200);
      logger.info(TAG, `${BUNDLE}Settings_001, begin`);
      await driver.assertComponentExist(ON.type('List'));
      let list = await driver.findComponent(ON.type('List'));
      logger.info(TAG, `${BUNDLE}Settings_001, find ${getString($r('app.string.settings'))}`);
      let button = await list.scrollSearch(ON.text(getString($r('app.string.settings'))));
      logger.info(TAG, `${BUNDLE}Settings_001, click ${getString($r('app.string.settings'))}`);
      await button.click();
      await driver.delayMs(200);
      logger.info(TAG, `${BUNDLE}Settings_001, end`);

      let opts = await getStringArray($r('app.strarray.settings_operations'))
      logger.info(TAG, `${BUNDLE}Settings_002, begin`);
      logger.info(TAG, `${BUNDLE}Settings_002, find ${opts[0]}`);
      await driver.assertComponentExist(ON.text(opts[0]));
      let btn1 = await driver.findComponent(ON.text(opts[0]));
      logger.info(TAG, `${BUNDLE}Settings_002, click ${opts[0]}`);
      await btn1.click();
      await driver.delayMs(200);
      logger.info(TAG, `${BUNDLE}Settings_002, check dataability`);
      await driver.assertComponentExist(ON.text('dataability://', MatchPattern.CONTAINS));
      logger.info(TAG, `${BUNDLE}Settings_002, end`);

      logger.info(TAG, `${BUNDLE}Settings_003, begin`);
      logger.info(TAG, `${BUNDLE}Settings_003, find ${opts[1]}`);
      await driver.assertComponentExist(ON.text(opts[1]));
      let btn3 = await driver.findComponent(ON.text(opts[1]));
      logger.info(TAG, `${BUNDLE}Settings_003, click ${opts[1]}`);
      await btn3.click();
      await driver.delayMs(200);
      logger.info(TAG, `${BUNDLE}Settings_003, check ${getString($r('app.string.airplane_status'))}`);
      await driver.assertComponentExist(ON.text(getString($r('app.string.airplane_status')), MatchPattern.CONTAINS));
      logger.info(TAG, `${BUNDLE}Settings_003, end`);

      logger.info(TAG, `${BUNDLE}Settings_004, begin`);
      logger.info(TAG, `${BUNDLE}Settings_004, find ${opts[2]}`);
      await driver.assertComponentExist(ON.text(opts[2]));
      let btn4 = await driver.findComponent(ON.text(opts[2]));
      logger.info(TAG, `${BUNDLE}Settings_004, click ${opts[2]}`);
      await btn4.click();
      await driver.delayMs(200);
      logger.info(TAG, `${BUNDLE}Settings_004, end`);

      await driver.pressBack();
      done();
    })

    /**
     * 设备状态感知框架
     */
    it(BUNDLE + 'Stationary_001', 0, async (done: Function) => {
      let driver: Driver = Driver.create();
      await driver.delayMs(200);
      logger.info(TAG, `${BUNDLE}Stationary_001, begin`);
      await driver.assertComponentExist(ON.type('List'));
      let list = await driver.findComponent(ON.type('List'));
      logger.info(TAG, `${BUNDLE}Stationary_001, find ${getString($r('app.string.stationary'))}`);
      let button = await list.scrollSearch(ON.text(getString($r('app.string.stationary'))));
      logger.info(TAG, `${BUNDLE}Stationary_001, click ${getString($r('app.string.stationary'))}`);
      await button.click();
      await driver.delayMs(200);
      logger.info(TAG, `${BUNDLE}Stationary_001, end`);

      let opts = await getStringArray($r('app.strarray.stationary_operations'))
      logger.info(TAG, `${BUNDLE}Stationary_002, begin`);
      logger.info(TAG, `${BUNDLE}Stationary_002, find ${opts[0]}`);
      await driver.assertComponentExist(ON.text(opts[1]));
      let btn1 = await driver.findComponent(ON.text(opts[1]));
      logger.info(TAG, `${BUNDLE}Stationary_002, click ${opts[0]}`);
      await btn1.click();
      await driver.delayMs(200);
      logger.info(TAG, `${BUNDLE}Stationary_002, end`);

      logger.info(TAG, `${BUNDLE}Stationary_003, begin`);
      logger.info(TAG, `${BUNDLE}Stationary_003, find ${opts[1]}`);
      await driver.assertComponentExist(ON.text(opts[1]));
      let btn2 = await driver.findComponent(ON.text(opts[1]));
      logger.info(TAG, `${BUNDLE}Stationary_003, click ${opts[1]}`);
      await btn2.click();
      await driver.delayMs(200);
      logger.info(TAG, `${BUNDLE}Stationary_003, end`);

      logger.info(TAG, `${BUNDLE}Stationary_004, begin`);
      logger.info(TAG, `${BUNDLE}Stationary_004, find ${opts[2]}`);
      await driver.assertComponentExist(ON.text(opts[2]));
      let btn3 = await driver.findComponent(ON.text(opts[2]));
      logger.info(TAG, `${BUNDLE}Stationary_004, click ${opts[2]}`);
      await btn3.click();
      await driver.delayMs(200);
      logger.info(TAG, `${BUNDLE}Stationary_004, end`);

      await driver.pressBack();
      done();
    })

    /**
     * 热管理
     */
    it(BUNDLE + 'Thermal_001', 0, async (done: Function) => {
      let driver: Driver = Driver.create();
      await driver.delayMs(200);
      logger.info(TAG, `${BUNDLE}Thermal_001, begin`);
      await driver.assertComponentExist(ON.type('List'));
      let list = await driver.findComponent(ON.type('List'));
      logger.info(TAG, `${BUNDLE}Thermal_001, find ${getString($r('app.string.thermal'))}`);
      let button = await list.scrollSearch(ON.text(getString($r('app.string.thermal'))));
      logger.info(TAG, `${BUNDLE}Thermal_001, click ${getString($r('app.string.thermal'))}`);
      await button.click();
      await driver.delayMs(500);

      logger.info(TAG, `${BUNDLE}Thermal_001, check Thermal level`);
      await driver.assertComponentExist(ON.text('Thermal level'));
      await driver.assertComponentExist(ON.text('Callback level'));
      await driver.delayMs(200);
      logger.info(TAG, `${BUNDLE}Thermal_001, end`);

      await driver.pressBack();
      done();
    })

    /**
     * USB管理
     */
    it(BUNDLE + 'UsbManager_001', 0, async (done: Function) => {
      let driver: Driver = Driver.create();
      await driver.delayMs(200);
      logger.info(TAG, `${BUNDLE}UsbManager_001, begin`);
      await driver.assertComponentExist(ON.type('List'));
      let list = await driver.findComponent(ON.type('List'));
      logger.info(TAG, `${BUNDLE}UsbManager_001, find ${getString($r('app.string.usb_manager'))}`);
      let button = await list.scrollSearch(ON.text(getString($r('app.string.usb_manager'))));
      logger.info(TAG, `${BUNDLE}UsbManager_001, click ${getString($r('app.string.usb_manager'))}`);
      await button.click();
      await driver.delayMs(200);
      logger.info(TAG, `${BUNDLE}UsbManager_001, end`);

      logger.info(TAG, `${BUNDLE}UsbManager_002, begin`);
      // 打开监听开关
      logger.info(TAG, `${BUNDLE}UsbManager_002, find Toggle`);
      await driver.assertComponentExist(ON.type('Toggle'));
      let toggle = await driver.findComponent(ON.type('Toggle'));
      logger.info(TAG, `${BUNDLE}usb_manager_002, open Toggle`);
      await toggle.click();
      await driver.delayMs(1000);
      logger.info(TAG, `${BUNDLE}UsbManager_002, end`);

      // 点击列表Item
      logger.info(TAG, `${BUNDLE}UsbManager_003, begin`);
      logger.info(TAG, `${BUNDLE}UsbManager_003, find device_0`);
      let device_0 = await driver.findComponent(ON.id('device_0'));
      if (device_0) {
        logger.info(TAG, `${BUNDLE}UsbManager_003, click device_0`);
        await device_0.click();
      }
      await driver.delayMs(200);
      logger.info(TAG, `${BUNDLE}UsbManager_003, end`);

      // 点击详情对话框确定按钮
      logger.info(TAG, `${BUNDLE}UsbManager_004, begin`);
      logger.info(TAG, `${BUNDLE}UsbManager_004, find dialog`);
      let btn = await driver.findComponent(ON.text(getString($r('app.string.confirm'))));
      if (btn) {
        logger.info(TAG, `${BUNDLE}UsbManager_004, click dialog`);
        await btn.click();
      }
      await driver.delayMs(200);
      // 关闭监听开关
      logger.info(TAG, `${BUNDLE}UsbManager_004, close toggle`);
      await toggle.click();
      logger.info(TAG, `${BUNDLE}UsbManager_004, end`);

      await driver.delayMs(1000);
      await driver.pressBack();
      done();
    })
  })
}