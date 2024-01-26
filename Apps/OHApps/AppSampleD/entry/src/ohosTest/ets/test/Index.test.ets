/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';

import hilog from '@ohos.hilog';
import { Driver, ON, MatchPattern } from '@ohos.UiTest';
import abilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import { getString } from '../util/ResourceUtil';

const TAG = '[Sample_AppSampleD]';
const DOMAIN = 0xF811;
const BUNDLE = 'AppSampleD';
const delegator = abilityDelegatorRegistry.getAbilityDelegator();

let driver = Driver.create();

export default function IndexTest() {
  describe('IndexTest', function () {
    // Defines a test suite. Two parameters are supported: test suite name and test suite function.
    beforeAll(async function (done) {
      // Presets an action, which is performed only once before all test cases of the test suite start.
      // This API supports only one parameter: preset action function.

      // 启动Ability
      delegator.executeShellCommand('aa start -a EntryAbility -b com.samples.appsamppled');

      await driver.delayMs(2000);
      done()
    })
    beforeEach(function () {
      // Presets an action, which is performed before each unit test case starts.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: preset action function.
    })
    afterEach(function () {
      // Presets a clear action, which is performed after each unit test case ends.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: clear action function.
    })
    afterAll(function () {
      // Presets a clear action, which is performed after all test cases of the test suite end.
      // This API supports only one parameter: clear action function.
    })

    it('Video', 0, async function (done) {
      hilog.info(DOMAIN, TAG, BUNDLE + 'Video begin');
      await driver.delayMs(1000);

      await checkAndClickById('video_action','Video');
      await driver.delayMs(500);

      await checkAndClickById('video_action','Video');
      await driver.delayMs(1000);

      await checkAndClickById('search','Video');
      await driver.delayMs(500);

      await driver.delayMs(1000);
      hilog.info(DOMAIN, TAG, BUNDLE + 'Video end');
      done()
    })

    it('Search', 0, async function (done) {
      hilog.info(DOMAIN, TAG, BUNDLE + 'Search begin');
      await driver.delayMs(1000);

      await checkAndClickById('searchItem_1','Search');
      await driver.delayMs(500);

      await checkAndClickById('musicID_1','Search');
      await driver.delayMs(2000);

      await checkAndClickById('musicID_2','Search');
      await driver.delayMs(2000);

      await checkAndClickById('musicID_2','Search');
      await driver.delayMs(2000);

      await checkAndClickById('titleID_2','Search');
      await driver.delayMs(500);

      await checkAndClickById('searchBack','Search');
      await driver.delayMs(500);

      await checkAndClickById('searchBack','Search');
      await driver.delayMs(500);

      await driver.delayMs(1000);
      hilog.info(DOMAIN, TAG, BUNDLE + 'Search end');
      done()
    })

    it('Message', 0, async function (done) {
      hilog.info(DOMAIN, TAG, BUNDLE + 'Message begin');
      await driver.delayMs(1000);

      await checkAndClickById('index_message','Message');
      await driver.delayMs(1000);

      await checkAndClickById('login','Message');

      await driver.delayMs(5000);

      await checkAndClickById('index_message','Message');
      await driver.delayMs(500);

      await checkAndClickById('userID_1','Message');
      await driver.delayMs(500);

      await checkAndInputById('chatInput','Hello!','Message');
      await driver.delayMs(500);

      await checkAndClickById('msgSend','Message');
      await driver.delayMs(500);

      await checkAndInputById('chatInput','How are you?','Message');
      await driver.delayMs(500);

      await checkAndClickById('msgSend','Message');
      await driver.delayMs(500);

      await checkAndClickById('chatBack','Message');
      await driver.delayMs(500);

      await driver.delayMs(1000);
      hilog.info(DOMAIN, TAG, BUNDLE + 'Message end');
      done()
    })

    it('Post_videos', 0, async function (done) {
      hilog.info(DOMAIN, TAG, BUNDLE + 'Post_videos begin');
      await driver.delayMs(1000);

      await checkAndClickById('index_main','Post_videos');
      await driver.delayMs(1000);

      // 授权
      await checkAndClickPermission(getString($r('app.string.allow')), "Post_videos");
      await checkAndClickPermission(getString($r('app.string.allow')), "Post_videos");
      await checkAndClickPermission(getString($r('app.string.allow')), "Post_videos");
      await driver.delayMs(1000);

      await checkAndClickById('startVideo','Post_videos');
      await driver.delayMs(5000);
      await checkAndClickById('stopVideo','Post_videos');
      await driver.delayMs(2000);

      await checkAndClickById('next','Post_videos');
      await driver.delayMs(2000);

      await checkAndInputById('textArea','This is my video','Post_videos');
      await driver.delayMs(2000);

      await checkAndClickById('upload','Post_videos');
      await driver.delayMs(500);

      await driver.delayMs(1000);
      hilog.info(DOMAIN, TAG, BUNDLE + 'Post_videos end');
      done()
    })
  })



  /**
   * 根据id拿到组件并点击
   * @param id
   */
  async function checkAndClickById(id: string, log: string) {
    hilog.info(DOMAIN, TAG, BUNDLE + `${log} id:${id}`);
    await driver.assertComponentExist(ON.id(id));
    let res = await driver.findComponent(ON.id(id));
    await res.click();
  }
  /**
   * 根据text拿到组件并点击
   * @param text
   */
  async function checkAndClickByText(text: string, log: string) {
    hilog.info(DOMAIN, TAG, BUNDLE + `${log} text:${text}`);
    await driver.assertComponentExist(ON.text(text));
    let res = await driver.findComponent(ON.text(text));
    await res.click();
  }

  /**
   * 根据id拿到组件并输入消息
   * @param id
   * @param msg
   */
  async function checkAndInputById(id:string,msg:string,log:string){
    hilog.info(DOMAIN, TAG, BUNDLE + `${log} id:${id}`);
    await driver.assertComponentExist(ON.id(id));
    let res = await driver.findComponent(ON.id(id));
    await res.inputText(msg);
  }

  /**
   * 根据Text验证对应权限
   * @param text
   * @param log
   */
  async function checkAndClickPermission(text: string, log: string) {
    hilog.info(DOMAIN, TAG, BUNDLE + `${log} text:${text}`);
    await driver.assertComponentExist(ON.text(getString($r('app.string.whether')) + text, MatchPattern.CONTAINS));
    let res = await driver.findComponent(ON.text(text, MatchPattern.EQUALS));
    await res.click();
  }
}