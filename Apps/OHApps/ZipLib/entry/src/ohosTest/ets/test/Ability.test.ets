/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
import { Driver, ON } from '@ohos.UiTest';
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import hilog from '@ohos.hilog';
import Want from '@ohos.app.ability.Want';

const TAG = '[Sample_ZipLib]';
const DOMAIN = 0xF811;
const BUNDLE = 'ZipLib_';

export default function appTest() {
  describe('ActsAbilityTest',  () => {
    it(BUNDLE + 'StartAbilityFunction_001', 0, async (done:Function) => {
      hilog.info(DOMAIN, TAG, BUNDLE + 'StartAbilityFunction_001 begin');
      let abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator();
      let want: Want = {
        bundleName: 'ohos.samples.ziplib',
        abilityName: 'EntryAbility'
      };
      abilityDelegator.startAbility(want, (err) => {
        if (err) {
          expect(err.code).assertEqual(0);
          done();
        } else {
          done();
        }
      });
      hilog.info(DOMAIN, TAG, BUNDLE + 'StartAbilityFunction_001 end');
    })
    /**
     * 添加文件
     */
    it(BUNDLE + 'AddFileFunction_001', 0, async  () =>{
      hilog.info(DOMAIN, TAG, BUNDLE + 'AddFileFunction_001 begin');
      let driver = await Driver.create();
      await driver.delayMs(1000);
      hilog.info(DOMAIN, TAG, BUNDLE + 'AddFileFunction_001 clickAddBtn');
      // 点击添加
      await driver.assertComponentExist(ON.id('addFileBtn'));
      let btnAdd = await driver.findComponent(ON.id('addFileBtn'));
      await btnAdd.click();
      await driver.delayMs(1000);
      // 输入文件名称
      await driver.assertComponentExist(ON.id('inputFileName'));
      let fileNameInput = await driver.findComponent(ON.id('inputFileName'));
      await fileNameInput.inputText('fileName');
      // 输入文件内容
      await driver.assertComponentExist(ON.id('inputFileContent'));
      let fileContentInput = await driver.findComponent(ON.id('inputFileContent'));
      await fileContentInput.inputText('fileContent');
      // 点击确认
      await driver.assertComponentExist(ON.id('confirmBtn'));
      let confirmBtn = await driver.findComponent(ON.id('confirmBtn'));
      await confirmBtn.click();
      await driver.delayMs(1000);
      // 点击压缩
      await driver.assertComponentExist(ON.id('compress_0'));
      let compressBtn = await driver.findComponent(ON.id('compress_0'));
      await compressBtn.click();
      await driver.delayMs(1000);
      // 点击解压
      await driver.assertComponentExist(ON.id('compress_1'));
      let decompressBtn = await driver.findComponent(ON.id('compress_1'));
      await decompressBtn.click();
      await driver.delayMs(1000);
      hilog.info(DOMAIN, TAG, BUNDLE + 'AddFileFunction_001 end');
    })
  })
}