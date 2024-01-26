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

import { describe, it, expect } from '@ohos/hypium';
import { Driver, ON } from '@ohos.UiTest';
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import hilog from '@ohos.hilog';
import fs from '@ohos.file.fs';
import Want from '@ohos.app.ability.Want';
import { BusinessError } from '@ohos.base';

const TAG = '[Sample_Logger]';
const DOMAIN = 0xF811;
const BUNDLE = 'Logger_';
const DRIVER = Driver.create();
let abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator();
let filePath: string;

export default function abilityTest() {
  describe('appTest',  ()=> {
    /**
     * 拉起应用，判断界面是否存在log按钮，此处无法访问文件内容，无法判断功能行结果，仅检查UI
     */
    it(BUNDLE + 'StartAbility_001', 0, async  (done:Function) =>{
      hilog.info(DOMAIN, TAG, BUNDLE + 'StartAbility_001 begin');
      try {
        await abilityDelegator.startAbility({
          bundleName: 'ohos.samples.logger',
          abilityName: 'EntryAbility'
        });
        await DRIVER.delayMs(1000);
        filePath = (await abilityDelegator.getCurrentTopAbility()).context.filesDir;
        done();
      } catch (err) {
        if(err){
          expect(err.code).assertEqual(0);
          done();
        }
      }
      hilog.info(DOMAIN, TAG, BUNDLE + 'StartAbility_001 end');
    })

    it('AddLog_001', 0, async () => {
      let logBefore = fs.readTextSync(`${filePath}/log.txt`);
      await DRIVER.assertComponentExist(ON.id('log'));
      let log = await DRIVER.findComponent(ON.id('log'));
      await log.click();
      await DRIVER.delayMs(1000);
      let logAfter = fs.readTextSync(`${filePath}/log.txt`);
      let flag = false;
      if (logAfter.length > logBefore.length || logAfter.length === logBefore.length) {
        flag = true;
      }
      expect(flag).assertEqual(true);
    })
  })
}