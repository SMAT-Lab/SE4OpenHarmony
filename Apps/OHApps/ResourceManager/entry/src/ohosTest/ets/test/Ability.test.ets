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

import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import { Driver, ON, MatchPattern } from '@ohos.UiTest'
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry'
import hilog from '@ohos.hilog'
import CommonEventManager from '@ohos.commonEventManager'
import resourceManager from '@ohos.resourceManager'
import { BusinessError } from '@ohos.base'

const TAG = '[Sample_ResourceManager]'
const DOMAIN = 0xF811
const BUNDLE = 'ResourceManager_'
const SPECIFIED_NUM = 2
let testResMgr = AbilityDelegatorRegistry.getAbilityDelegator().getAppContext().resourceManager

async function getResourceFormatString(str: resourceManager.Resource, format: resourceManager.Resource): Promise<string | undefined> {
  try {
    let formatStr = testResMgr.getStringSync(format)
    let text = testResMgr.getStringSync(str, formatStr)
    return text
  } catch (error) {
    let code = (error as BusinessError).code
    let message = (error as BusinessError).message
    hilog.error(DOMAIN, TAG, `getStringSync failed, error code: ${code}, message: ${message}.`)
    return
  }
}

async function getResourceString(resource: resourceManager.Resource): Promise<string | undefined> {
  try {
    let text = await testResMgr.getStringValue(resource)
    return text
  } catch (error) {
    let code = (error as BusinessError).code
    let message = (error as BusinessError).message
    hilog.error(DOMAIN, TAG, `getStringValue failed, error code: ${code}, message: ${message}.`)
    return
  }
}

async function getResourceStringArray(resource: resourceManager.Resource): Promise<string | undefined> {
  try {
    let text = JSON.stringify(await testResMgr.getStringArrayValue(resource))
    return text
  } catch (error) {
    let code = (error as BusinessError).code
    let message = (error as BusinessError).message
    hilog.error(DOMAIN, TAG, `getStringArrayValue failed, error code: ${code}, message: ${message}.`)
    return
  }
}

async function getResourcePluralString(resource: resourceManager.Resource, num: number): Promise<string | undefined> {
  try {
    let text = await testResMgr.getPluralStringValue(resource, num)
    return text
  } catch (error) {
    let code = (error as BusinessError).code
    let message = (error as BusinessError).message
    hilog.error(DOMAIN, TAG, `getPluralStringValue failed, error code: ${code}, message: ${message}.`)
    return
  }
}

async function getDeviceCapability(): Promise<string | undefined> {
  try {
    let text = JSON.stringify(await testResMgr.getDeviceCapability())
    return text
  } catch (error) {
    let code = (error as BusinessError).code
    let message = (error as BusinessError).message
    hilog.error(DOMAIN, TAG, `getDeviceCapability failed, error code: ${code}, message: ${message}.`)
    return
  }
}

async function getConfiguration(): Promise<string | undefined> {
  try {
    let text = JSON.stringify(await testResMgr.getConfiguration())
    return text
  } catch (error) {
    let code = (error as BusinessError).code
    let message = (error as BusinessError).message
    hilog.error(DOMAIN, TAG, `getConfiguration failed, error code: ${code}, message: ${message}.`)
    return
  }
}

export default function appTest() {
  describe('ActsResMgrTest', () => {
    /**
     * 拉起应用
     */
    it(BUNDLE + 'StartAbility_001', 0, async (done: Function) => {
      hilog.info(DOMAIN, TAG, BUNDLE + 'StartAbility_001 begin')
      let abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator()
      try {
        await abilityDelegator.startAbility({
          bundleName: 'ohos.samples.resourcemanager',
          abilityName: 'EntryAbility'
        }).then(async => {
          let publishCB: (err: BusinessError) => void = (err: BusinessError): void => {
            if (err) {
              console.error(`publish failed, code is ${err.code}, message is ${err.message}`)
            } else {
              console.info("publish");
            }
          }
          setTimeout(() => {
            CommonEventManager.publish("TestResourcesEvent", publishCB) // 发布事件
            done()
          }, 1500)
        })
        done()
      } catch (error) {
        let code = (error as BusinessError).code
        let message = (error as BusinessError).message
        hilog.info(DOMAIN, TAG, `StartAbility end ${JSON.stringify((error as BusinessError).message)}`)
        expect(0).assertEqual(code)
        done()
      }
      hilog.info(DOMAIN, TAG, BUNDLE + 'StartAbility_001 end')
    })

    /**
     * 进入应用，测试getStringValue接口
     */
    it(BUNDLE + 'CreateFunction_001', 0, async () => {
      hilog.info(DOMAIN, TAG, BUNDLE + 'CreateFunction_001 begin')
      let driver = Driver.create()
      await driver.delayMs(3000)
      // 测试getStringValue接口返回值
      let stringDesc: resourceManager.Resource = {
        bundleName: 'ohos.samples.resourcemanager',
        moduleName: 'entry_test',
        id: $r('app.string.stringDesc').id
      }

      let string_str: resourceManager.Resource = {
        bundleName: 'ohos.samples.resourcemanager',
        moduleName: 'entry_test',
        id: $r('app.string.string_str').id
      }
      await driver.assertComponentExist(ON.text(await getResourceString(stringDesc) as string))
      await driver.assertComponentExist(ON.text(await getResourceString(string_str) as string))
      hilog.info(DOMAIN, TAG, BUNDLE + 'CreateFunction_001 end')
    })

    /**
     * 进入应用，测试getStringArrayValue接口
     */
    it(BUNDLE + 'CreateFunction_002', 0, async () => {
      hilog.info(DOMAIN, TAG, BUNDLE + 'CreateFunction_002 begin')
      let driver = Driver.create()
      await driver.delayMs(3000)
      // 测试getStringArrayValue接口返回值
      let stringArrayDesc: resourceManager.Resource = {
        bundleName: 'ohos.samples.resourcemanager',
        moduleName: 'entry_test',
        id: $r('app.string.stringArrayDesc').id
      }
      let str_array: resourceManager.Resource = {
        bundleName: 'ohos.samples.resourcemanager',
        moduleName: 'entry_test',
        id: $r('app.strarray.str_array').id
      }
      await driver.assertComponentExist(ON.text(await getResourceString(stringArrayDesc) as string))
      await driver.assertComponentExist(ON.text(await getResourceStringArray(str_array) as string))
      hilog.info(DOMAIN, TAG, BUNDLE + 'CreateFunction_002 end')
    })

    /**
     * 进入应用，测试getPluralStringValue接口
     */
    it(BUNDLE + 'CreateFunction_003', 0, async () => {
      hilog.info(DOMAIN, TAG, BUNDLE + 'CreateFunction_003 begin')
      let driver = Driver.create()
      await driver.delayMs(3000)
      // 测试getPluralStringValue接口返回值
      let pluralStringDesc: resourceManager.Resource = {
        bundleName: 'ohos.samples.resourcemanager',
        moduleName: 'entry_test',
        id: $r('app.string.pluralStringDesc').id
      }
      let eat_apple: resourceManager.Resource = {
        bundleName: 'ohos.samples.resourcemanager',
        moduleName: 'entry_test',
        id: $r('app.plural.eat_apple').id
      }
      await driver.assertComponentExist(ON.text(await getResourceString(pluralStringDesc) as string))
      await driver.assertComponentExist(ON.text(await getResourcePluralString(eat_apple,
        SPECIFIED_NUM) as string))
      hilog.info(DOMAIN, TAG, BUNDLE + 'CreateFunction_003 end')
    })

    /**
     * 进入应用，测试getConfiguration接口
     */
    it(BUNDLE + 'CreateFunction_004', 0, async () => {
      hilog.info(DOMAIN, TAG, BUNDLE + 'CreateFunction_004 begin')
      let driver = Driver.create()
      await driver.delayMs(3000)
      // 测试getConfiguration接口返回值
      let configurationDesc: resourceManager.Resource = {
        bundleName: 'ohos.samples.resourcemanager',
        moduleName: 'entry_test',
        id: $r('app.string.configurationDesc').id
      }
      await driver.assertComponentExist(ON.text(await getResourceString(configurationDesc) as string))
      await driver.assertComponentExist(ON.text(await getConfiguration() as string))
      hilog.info(DOMAIN, TAG, BUNDLE + 'CreateFunction_004 end')
    })

    /**
     * 进入应用，测试getDeviceCapability接口
     */
    it(BUNDLE + 'CreateFunction_005', 0, async () => {
      hilog.info(DOMAIN, TAG, BUNDLE + 'CreateFunction_005 begin')
      let driver = Driver.create()
      await driver.delayMs(3000)
      // 测试getDeviceCapability接口返回值
      let capabilityDesc: resourceManager.Resource = {
        bundleName: 'ohos.samples.resourcemanager',
        moduleName: 'entry_test',
        id: $r('app.string.capabilityDesc').id
      }
      await driver.assertComponentExist(ON.text(await getResourceString(capabilityDesc) as string))
      await driver.assertComponentExist(ON.text(await getDeviceCapability() as string))
      hilog.info(DOMAIN, TAG, BUNDLE + 'CreateFunction_005 end')
    })

    /**
     * 进入应用，测试getMediaContent接口
     */
    it(BUNDLE + 'CreateFunction_006', 0, async () => {
      hilog.info(DOMAIN, TAG, BUNDLE + 'CreateFunction_006 begin')
      let driver = Driver.create()
      await driver.delayMs(3000)
      // 测试getMediaContent接口返回值字节数
      let mediaDesc: resourceManager.Resource = {
        bundleName: 'ohos.samples.resourcemanager',
        moduleName: 'entry_test',
        id: $r('app.string.mediaDesc').id
      }
      await driver.assertComponentExist(ON.text(await getResourceString(mediaDesc) as string))
      await driver.assertComponentExist(ON.text('6790'))
      hilog.info(DOMAIN, TAG, BUNDLE + 'CreateFunction_006 end')
    })

    /**
     * 进入应用，测试getMediaContentBase64接口
     */
    it(BUNDLE + 'CreateFunction_007', 0, async () => {
      hilog.info(DOMAIN, TAG, BUNDLE + 'CreateFunction_007 begin')
      let driver = Driver.create()
      await driver.delayMs(3000)
      // 测试getMediaContentBase64接口返回值长度
      let mediaBase64Desc: resourceManager.Resource = {
        bundleName: 'ohos.samples.resourcemanager',
        moduleName: 'entry_test',
        id: $r('app.string.mediaBase64Desc').id
      }
      await driver.assertComponentExist(ON.text(await getResourceString(mediaBase64Desc) as string))
      await driver.assertComponentExist(ON.text('9078'))
      hilog.info(DOMAIN, TAG, BUNDLE + 'CreateFunction_007 end')
    })

    /**
     * 进入应用，测试getStringSync接口
     */
    it(BUNDLE + 'CreateFunction_008', 0, async () => {
      hilog.info(DOMAIN, TAG, BUNDLE + 'CreateFunction_008 begin')
      let driver = Driver.create()
      await driver.delayMs(3000)
      // 测试getStringSync接口返回的格式化字符串资源
      let formatStrDesc: resourceManager.Resource = {
        bundleName: 'ohos.samples.resourcemanager',
        moduleName: 'entry_test',
        id: $r('app.string.formatStrDesc').id
      }
      let formatStr: resourceManager.Resource = {
        bundleName: 'ohos.samples.resourcemanager',
        moduleName: 'entry_test',
        id: $r('app.string.formatStr').id
      }
      let world: resourceManager.Resource = {
        bundleName: 'ohos.samples.resourcemanager',
        moduleName: 'entry_test',
        id: $r('app.string.world').id
      }
      await driver.assertComponentExist(ON.text(await getResourceString(formatStrDesc) as string))
      await driver.assertComponentExist(ON.text(await getResourceFormatString(formatStr,
        world) as string))
      hilog.info(DOMAIN, TAG, BUNDLE + 'CreateFunction_008 end')
    })

    /**
     * 进入应用，测试getMediaContentBase64接口
     */
    it(BUNDLE + 'CreateFunction_009', 0, async () => {
      hilog.info(DOMAIN, TAG, BUNDLE + 'CreateFunction_009 begin')
      let driver = Driver.create()
      await driver.delayMs(3000)
      // 测试getMediaContentBase64接口返回的指定density图片资源
      let densityMediaDesc: resourceManager.Resource = {
        bundleName: 'ohos.samples.resourcemanager',
        moduleName: 'entry_test',
        id: $r('app.string.densityMediaDesc').id
      }
      await driver.assertComponentExist(ON.text(await getResourceString(densityMediaDesc)as string))
      await driver.assertComponentExist(ON.id('getDensityMedia'))
      hilog.info(DOMAIN, TAG, BUNDLE + 'CreateFunction_009 end')
    })

    /**
     * 进入应用，测试getSystemResourceManager接口
     */
    it(BUNDLE + 'CreateFunction_010', 0, async () => {
      hilog.info(DOMAIN, TAG, BUNDLE + 'CreateFunction_010 begin')
      let driver = Driver.create()
      await driver.delayMs(3000)
      // 测试getSystemResourceManager接口获取系统资源管理对象，并获取系统资源图片
      let systemResDesc: resourceManager.Resource = {
        bundleName: 'ohos.samples.resourcemanager',
        moduleName: 'entry_test',
        id: $r('app.string.systemResDesc').id
      }
      await driver.assertComponentExist(ON.text(await getResourceString(systemResDesc) as string))
      await driver.assertComponentExist(ON.id('getSystemMedia'))
      hilog.info(DOMAIN, TAG, BUNDLE + 'CreateFunction_010 end')
    })
  })
}