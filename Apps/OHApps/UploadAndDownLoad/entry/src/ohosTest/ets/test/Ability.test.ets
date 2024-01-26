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
import UIAbility from '@ohos.app.ability.UIAbility';
import Want from '@ohos.app.ability.Want';
import resourceManager from '@ohos.resourceManager';
import { describe, it, expect } from '@ohos/hypium';
import { Driver, ON, MatchPattern } from '@ohos.UiTest';
import { logger } from '../util/Logger';

const TAG = '[Sample_UploadAndDownload]';
const BUNDLE = 'UploadAndDownload_';

function getResourceString(resource: Resource) {
  let res: resourceManager.Resource = {
    bundleName: resource.bundleName,
    moduleName: resource.moduleName,
    id: resource.id
  }
  let delegator = AbilityDelegatorRegistry.getAbilityDelegator();
  return delegator.getAppContext().resourceManager.getStringSync(res);
}

export default function abilityTest() {
  let delegator = AbilityDelegatorRegistry.getAbilityDelegator();
  let driver: Driver = Driver.create();

  describe('AbilityTest', () => {
    it(BUNDLE + 'StartAbility_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE}StartAbility_001 begin`)
      let want: Want = {
        bundleName: 'com.samples.uploadanddownload',
        abilityName: 'EntryAbility'
      };
      delegator.startAbility(want, (err: Error) => {
        logger.info(TAG, `${BUNDLE}startAbility end err ${JSON.stringify(err)}`);
      })
      await driver.delayMs(1000);
      logger.info(TAG, `${BUNDLE}StartAbility_001 end`);
      done();
    })

    /**
     * 获取权限，并判断是否正常进入主页
     */
    it(BUNDLE + 'RequestPermissionFunction_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE}RequestPermissionFunction_001 begin`);
      await driver.delayMs(1000);
      // 获取权限
      logger.info(TAG, BUNDLE + 'RequestPermissionFunction_001 requestPermission');
      await driver.assertComponentExist(ON.text(getResourceString($r('app.string.allow'))));
      let btnAllow = await driver.findComponent(ON.text(getResourceString($r('app.string.allow'))));
      if (btnAllow === undefined || btnAllow === null) {
        btnAllow = await driver.findComponent(ON.text(getResourceString($r('app.string.allow_up'))));
      }
      if (btnAllow !== undefined && btnAllow !== null) {
        await btnAllow.click();
      }
      await driver.delayMs(1000);
      btnAllow = await driver.findComponent(ON.text(getResourceString($r('app.string.allow'))));
      if (btnAllow === undefined || btnAllow === null) {
        btnAllow = await driver.findComponent(ON.text(getResourceString($r('app.string.allow_up'))));
      }
      if (btnAllow !== undefined && btnAllow !== null) {
        await btnAllow.click();
      }
      await delegator.getCurrentTopAbility().then((ability: UIAbility) => {
        logger.info(TAG, `${BUNDLE}get top ability`);
        expect(ability.context.abilityInfo.bundleName).assertEqual('com.samples.uploadanddownload');
      })
      logger.info(TAG, `${BUNDLE}RequestPermissionFunction_001 end`);
      done();
    })

    // 上传页面
    it(BUNDLE + 'Upload_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE}Upload_001 begin`);
      await driver.assertComponentExist(ON.id('btn_upload'));
      let btnUpload = await driver.findComponent(ON.id('btn_upload'));
      await btnUpload.click();
      await driver.delayMs(1000);
      await driver.assertComponentExist(ON.id('publish'));
      logger.info(TAG, `${BUNDLE}Upload_001 end`);
      done();
    })

    // 从图库选择照片
    it(BUNDLE + 'Upload_002', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE}Upload_002 begin`);
      let gridItems = await driver.findComponents(ON.type('GridCol'));
      await gridItems[gridItems.length-1].click();
      await driver.delayMs(1000);
      await driver.assertComponentExist(ON.text(getResourceString($r('app.string.ok'))));
      let pickAlbum = await driver.findComponent(ON.text(getResourceString($r('app.string.ok'))));
      await pickAlbum.click();
      await driver.delayMs(5000);
      await driver.pressBack();
      await driver.delayMs(1000);
      await driver.assertComponentExist(ON.id('publish'));
      await driver.pressBack();
      await driver.delayMs(1000);
      logger.info(TAG, `${BUNDLE}Upload_002 end`);
      done();
    })

    // 下载页面
    it(BUNDLE + 'Download_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE}Download_001 begin`);
      await driver.assertComponentExist(ON.id('btn_download'));
      let btnDownload = await driver.findComponent(ON.id('btn_download'));
      await btnDownload.click();
      await driver.delayMs(1000);
      await driver.assertComponentExist(ON.id('view_download_files'));
      let viewDownload = await driver.findComponent(ON.id('view_download_files'));
      await viewDownload.click();
      await driver.delayMs(1000);
      let gridItems = await driver.findComponents(ON.type('List'));
      expect(gridItems.length > 0).assertTrue();
      logger.info(TAG, `${BUNDLE}Download_001 end`);
      done();
    })

    // 查看下载文件页面
    it(BUNDLE + 'Download_002', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE}Download_002 begin`);
      await driver.delayMs(1000);
      let listItems = await driver.findComponents(ON.type('List'));
      expect(listItems.length > 0).assertTrue();
      await listItems[0].click();
      await driver.delayMs(1000);
      await driver.assertComponentExist(ON.text(getResourceString($r('app.string.clear_folder')), MatchPattern.CONTAINS));
      logger.info(TAG, `${BUNDLE}Download_002 end`);
      done();
    })

    // 下载页面
    it(BUNDLE + 'Download_003', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE}Download_003 begin`);
      await driver.pressBack();
      await driver.delayMs(1000);
      await driver.pressBack();
      await driver.delayMs(1000);
      await driver.assertComponentExist(ON.id('download_to'));
      let downloadTo = await driver.findComponent(ON.id('download_to'));
      await downloadTo.click();
      await driver.assertComponentExist(ON.id('menu0'));
      logger.info(TAG, `${BUNDLE}Download_001 end`);
      done();
    })
  })
}