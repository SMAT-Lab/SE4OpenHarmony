/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 *
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
 *
 */
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import { Driver, ON } from '@ohos.UiTest';
import resourceManager from '@ohos.resourceManager';
import Logger from '../../../main/ets/model/Logger';

const BUNDLE = 'DistributedVideoPlayer_';

const DELAY_TIME = 1000;
const DELAY_TIME_FiVE = 500;
let driver: Driver = Driver.create();

// 获取AbilityDelegator
let abilityDelegatorRegistry = AbilityDelegatorRegistry.getAbilityDelegator();
// 启动后获取app上下文
let context: Context;
// 启动后获取resourceManager
let manager: resourceManager.ResourceManager;

// 通过 resource 验证有没有这个组件 有的话点击一下
async function checkButtonAndClickWithTextByResource(text: Resource) {
  let atom: string = await manager.getStringValue(text);
  await driver.assertComponentExist(ON.text(atom));
  let button = await driver.findComponent(ON.text(atom));
  await button.click();
  await driver.delayMs(DELAY_TIME_FiVE);
  Logger.info(BUNDLE + atom);
}

// 通过 ID 滑动 slider
async function drawSliderWithId(text: string) {
  let atom = text;
  await driver.assertComponentExist(ON.id(atom));
  let slider = await driver.findComponent(ON.id(atom));
  let rect = await slider.getBoundsCenter();
  await driver.drag(rect.x - 100, rect.y, rect.x + 100, rect.y, 800)
  await driver.delayMs(DELAY_TIME_FiVE);
  Logger.info(BUNDLE + atom);
}

// 通过text验证有没有这个组件 有的话点击一下
async function checkButtonAndClickWithText(text: string) {
  let atom = text;
  await driver.assertComponentExist(ON.text(atom));
  let button = await driver.findComponent(ON.text(atom));
  await button.click();
  await driver.delayMs(DELAY_TIME);
  Logger.info(BUNDLE + atom);
}

// 通过id验证有没有这个组件 有的话点击一下
async function checkButtonAndClickWithID(text: string) {
  let atom = text;
  await driver.assertComponentExist(ON.id(atom));
  let button = await driver.findComponent(ON.id(atom));
  await button.click();
  await driver.delayMs(DELAY_TIME_FiVE);
  Logger.info(BUNDLE + atom);
}

// 通过id验证有没有这个组件 有的话点击一下
async function checkButtonAndDoubleClickWithID(text: string) {
  let atom = text;
  await driver.assertComponentExist(ON.id(atom));
  let button = await driver.findComponent(ON.id(atom));
  await button.doubleClick();
  await driver.delayMs(DELAY_TIME_FiVE);
  Logger.info(BUNDLE + atom);
}

// 展开Select并选择
async function clickSelectIDAndSelectText(toggleId: string, selectText: string) {
  { //展开
    let atom = toggleId;
    await checkButtonAndClickWithID(atom);
  }
  { //选择
    let atom = selectText;
    await checkButtonAndClickWithText(atom);
  }
}

export default function abilityTest() {
  describe('ActsAbilityTest', () => {
    // Defines a test suite. Two parameters are supported: test suite name and test suite function.
    beforeAll(() => {
      // Presets an action, which is performed only once before all test cases of the test suite start.
      // This API supports only one parameter: preset action function.
    })
    beforeEach(() => {
      // Presets an action, which is performed before each unit test case starts.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: preset action function.
    })
    afterEach(() => {
      // Presets a clear action, which is performed after each unit test case ends.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: clear action function.
    })
    afterAll(() => {
      // Presets a clear action, which is performed after all test cases of the test suite end.
      // This API supports only one parameter: clear action function.
    })
    it("assertContain", 0, () => {

      Logger.info("Sample_DistributedVideoPlayer test start")
      /**
       * 打开应用
       */
      it(BUNDLE + 'StartAbility_001', 0, async (done: Function) => {
        let testName = 'StartAbility';
        Logger.info(BUNDLE + testName + ' begin');
        let abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator()
        try {
          await abilityDelegator.startAbility({
            bundleName: 'com.unionman.distributedvideoplayer',
            abilityName: 'EntryAbility'
          })

          context = abilityDelegatorRegistry.getAppContext();
          manager = context.resourceManager;

          done();
        } catch (exception) {
          Logger.info(BUNDLE, `StartAbility_001 end ${JSON.stringify(exception)}`);
          expect(0).assertEqual(exception.code);
          done();
        }
        Logger.info(BUNDLE + testName + ' end');
      })

      /**
       * 获取权限
       */
      it(BUNDLE + 'RequestPermissionFunction_001', 0, async () => {
        let testName = 'RequestPermissionFunction';
        Logger.info(BUNDLE + testName + ' begin');
        await driver.delayMs(DELAY_TIME);

        // 获取多设备协同权限
        await checkButtonAndClickWithTextByResource($r('app.string.permit'));
        // 获取文件读写权限
        await checkButtonAndClickWithTextByResource($r('app.string.permit'));
        Logger.info(BUNDLE + testName + ' end');
      })

      /**
       * 关闭应用
       */
      it(BUNDLE + 'StopAbility_001', 0, async (done: Function) => {
        let testName = 'StopAbility';
        Logger.info(BUNDLE + testName + ' begin');
        try {
          await checkButtonAndClickWithID("back");
          await driver.delayMs(DELAY_TIME);

          done();
        } catch (exception) {
          Logger.info(BUNDLE, `StopAbility_001 end ${JSON.stringify(exception)}`);
          expect(0).assertEqual(exception.code);
          done();
        }
        Logger.info(BUNDLE + testName + ' end');
      })

      /**
       * 打开应用
       */
      it(BUNDLE + 'StartAbility_002', 0, async (done: Function) => {
        let testName = 'StartAbility';
        Logger.info(BUNDLE + testName + ' begin');
        let abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator()
        try {
          await abilityDelegator.startAbility({
            bundleName: 'com.unionman.distributedvideoplayer',
            abilityName: 'EntryAbility'
          })

          done();
        } catch (exception) {
          Logger.info(BUNDLE, `StartAbility_002 end ${JSON.stringify(exception)}`);
          expect(0).assertEqual(exception.code);
          done();
        }
        Logger.info(BUNDLE + testName + ' end');
      })

      /**
       * 单击播放按钮
       */
      it(BUNDLE + 'PlayVideo_001', 0, async () => {
        let testName = 'PlayVideo';
        Logger.info(BUNDLE + testName + ' begin');
        await driver.delayMs(DELAY_TIME);

        // 播放
        await checkButtonAndClickWithID('playBtn');
        await driver.delayMs(DELAY_TIME);

        // 暂停
        await checkButtonAndClickWithID('playBtn');
        await driver.delayMs(DELAY_TIME);

        Logger.info(BUNDLE + testName + ' end');
      });

      /**
       * 双击页面
       */
      it(BUNDLE + 'PlayVideo_002', 0, async () => {
        let testName = 'PlayVideo';
        Logger.info(BUNDLE + testName + ' begin');

        // 播放
        await checkButtonAndDoubleClickWithID('container');
        await driver.delayMs(DELAY_TIME);

        // 暂停
        await checkButtonAndDoubleClickWithID('container');
        await driver.delayMs(DELAY_TIME);

        // 播放
        await checkButtonAndDoubleClickWithID('container');
        await driver.delayMs(DELAY_TIME);

        Logger.info(BUNDLE + testName + ' end');
      });

      /**
       * 滑动Slider进度条
       */
      it(BUNDLE + 'Slider_001', 0, async () => {
        let testName = 'Slider';
        Logger.info(BUNDLE + testName + ' begin');

        await drawSliderWithId("slider");
        await driver.delayMs(DELAY_TIME);

        Logger.info(BUNDLE + testName + ' end');
      });

      /**
       * 左右滑动屏幕
       */
      it(BUNDLE + 'Swipe_001', 0, async () => {
        let testName = 'Swipe';
        Logger.info(BUNDLE + testName + ' begin');

        // 左滑
        await driver.swipe(500, 200, 200, 200, 600);
        await driver.delayMs(DELAY_TIME);

        // 右滑
        await driver.swipe(200, 200, 500, 200, 600);
        await driver.delayMs(DELAY_TIME);

        Logger.info(BUNDLE + testName + ' end');
      });

      /**
       * 调整倍速
       */
      it(BUNDLE + 'PlaybackSpeed_001', 0, async () => {
        let testName = 'PlaybackSpeed';
        Logger.info(BUNDLE + testName + ' begin');

        // 单击屏幕显示控制栏
        await checkButtonAndClickWithID('container');
        await driver.delayMs(DELAY_TIME);

        // 选择2.0X倍速
        await clickSelectIDAndSelectText('playbackSpeed', '2.0X');
        await driver.delayMs(DELAY_TIME);

        // 单击屏幕显示控制栏
        await checkButtonAndClickWithID('container');

        // 选择0.75X倍速
        await clickSelectIDAndSelectText('playbackSpeed', '0.75X');
        await driver.delayMs(DELAY_TIME);

        Logger.info(BUNDLE + testName + ' end');
      });

      /**
       * 展开视频列表
       */
      it(BUNDLE + 'ShwoVideoList_001', 0, async () => {
        let testName = 'ShwoVideoList';
        Logger.info(BUNDLE + testName + ' begin');
        await driver.delayMs(DELAY_TIME);

        // 单击屏幕显示控制栏
        await checkButtonAndClickWithID('container');
        await driver.delayMs(DELAY_TIME);

        // 点击展开视频列表
        await checkButtonAndClickWithID("viewList");
        await driver.delayMs(DELAY_TIME);

        // 单击隐藏视频列表 固定坐标只支持UnionPi-Tiger，其他设备需要调整
        await driver.click(200, 200);
        await driver.delayMs(DELAY_TIME);

        Logger.info(BUNDLE + testName + ' end');
      });

      /**
       * 截图
       */
      it(BUNDLE + 'Screenshot_001', 0, async () => {
        let testName = 'Screenshot';
        Logger.info(BUNDLE + testName + ' begin');
        await driver.delayMs(DELAY_TIME);

        // 单击屏幕显示控制栏
        await checkButtonAndClickWithID('container');
        await driver.delayMs(DELAY_TIME);

        // 单击截图图标
        await checkButtonAndClickWithID('screenshot');
        await driver.delayMs(DELAY_TIME);

        // 单击隐藏截图窗口 固定坐标只支持UnionPi-Tiger，其他设备需要调整
        await driver.click(800, 200);
        await driver.delayMs(DELAY_TIME);

        Logger.info(BUNDLE + testName + ' end');
      });

      /**
       * 测试选择设备弹窗是否能正常弹出
       */
      it(BUNDLE + 'ShwoDeviceDialog_001', 0, async () => {
        let testName = 'ShwoDeviceDialog';
        Logger.info(BUNDLE + testName + ' begin');
        await driver.delayMs(DELAY_TIME);

        // 单击屏幕显示控制栏
        await checkButtonAndClickWithID('container');
        await driver.delayMs(DELAY_TIME);

        // 单击流转图标
        await checkButtonAndClickWithID('hop');
        await driver.delayMs(DELAY_TIME);

        // 点击取消
        await checkButtonAndClickWithTextByResource($r('app.string.cancel'));
        await driver.delayMs(DELAY_TIME);

        Logger.info(BUNDLE + testName + ' end');
      });

      /**
       * 设置流转模式
       */
      it(BUNDLE + 'SetContinuationMode_001', 0, async () => {
        let testName = 'SetContinuationMode';
        Logger.info(BUNDLE + testName + ' begin');
        await driver.delayMs(DELAY_TIME);

        // 单击屏幕显示控制栏
        await checkButtonAndClickWithID('container');
        await driver.delayMs(DELAY_TIME);

        // 单击设置图标
        await checkButtonAndClickWithID('settings');
        await driver.delayMs(DELAY_TIME);

        // 选择多端协同模式
        await checkButtonAndClickWithID('synchronization');
        await driver.delayMs(DELAY_TIME);

        // 返回
        await checkButtonAndClickWithID('settings_back');
        await driver.delayMs(DELAY_TIME);

        Logger.info(BUNDLE + testName + ' end');
      });
    })
  })
}