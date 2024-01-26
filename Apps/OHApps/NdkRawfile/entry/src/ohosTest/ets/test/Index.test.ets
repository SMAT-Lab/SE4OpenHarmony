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

import { describe, it, expect } from '@ohos/hypium'
import hilog from '@ohos.hilog';
import { Driver, ON } from '@ohos.UiTest'
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry'

const TAG = '[Sample_rawfile]'
const DOMAIN = 0xF811
const BUNDLE = 'NdkRawfile_'
const abilityDelegatorRegistry = AbilityDelegatorRegistry.getAbilityDelegator()

export default function IndexTest() {
  describe('IndexTest', () => {
    it(BUNDLE + 'StartAbility_001', 0, async () => {
      hilog.info(DOMAIN, TAG, 'StartAbility_001 begin')
      try {
        await abilityDelegatorRegistry.startAbility({
          bundleName: 'com.samples.ndkrawfile',
          abilityName: 'EntryAbility'
        })
      } catch (err) {
        hilog.info(DOMAIN, TAG, `StartAbility end ${JSON.stringify(err)}`)
        expect().assertFail()
      }
      hilog.info(DOMAIN, TAG, 'StartAbility_001 end')
    })

  it(BUNDLE + 'GetFileListTest', 0, async (done: Function) => {
    hilog.info(DOMAIN, TAG, BUNDLE + 'GetFileListTest begin')
    let driver = Driver.create()
    await driver.delayMs(1000)
    let text = await driver.findComponent(ON.id('get_file_list'))
    expect(await text.getText() === 'getFileList = rawfile.txt,rawfile1.txt,subrawfile').assertTrue()
    hilog.info(DOMAIN, TAG, BUNDLE + 'GetFileListTest end')
    done()
  })

  it(BUNDLE + 'GetRawFileContentTest', 0, async (done: Function) => {
    hilog.info(DOMAIN, TAG, BUNDLE + 'GetRawFileContentTest begin')
    let driver = Driver.create()
    await driver.delayMs(1000)
    let text = await driver.findComponent(ON.id('get_raw_file_content'))
    expect(await text.getText() === 'getRawFileContent = 114,97,119,102,105,108,101,49,32,99,111,110,116,101,110,116')
      .assertTrue()
    hilog.info(DOMAIN, TAG, BUNDLE + 'GetRawFileContentTest end')
    done()
  })

  it(BUNDLE + 'GetRawfileDescriptorTest', 0, async (done: Function) => {
    hilog.info(DOMAIN, TAG, BUNDLE + 'GetRawfileDescriptorTest begin')
    let driver = Driver.create()
    await driver.delayMs(1000)
    let text = await driver.findComponent(ON.id('length'))
    expect(await text.getText() === 'rawfileDescriptor.length = 16').assertTrue()
    hilog.info(DOMAIN, TAG, BUNDLE + 'GetRawfileDescriptorTest end')
    done()
  })
})
}