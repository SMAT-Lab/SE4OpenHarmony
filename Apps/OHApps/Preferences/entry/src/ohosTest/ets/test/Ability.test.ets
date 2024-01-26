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

import { Driver, ON } from '@ohos.UiTest'
import emitter from '@ohos.events.emitter'
import Logger from '../../../main/ets/model/Logger'
// import missionManager from '@ohos.app.ability.missionManager'
import { describe, it, expect, beforeAll } from '@ohos/hypium'
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry'

const TAG = '[Sample_Preferences]'
const BUNDLE = 'Preferences_'
let nowTheme: string = ''
let driver = Driver.create()


export default function abilityTest() {
  describe('ActsAbilityTest', () => {
    beforeAll(() => {
      emitter.on({
        eventId: 0, priority: 0
      }, (data: emitter.EventData) => {
        if(data.data){
          nowTheme = data.data['nowTheme'];
        }
      })
    })

    /**
     * 打开应用
     */
    it(BUNDLE + 'Preferences_StartAbility_001', 0, async (done: Function) => {
      Logger.info(TAG, BUNDLE + 'Preferences_StartAbility_001 begin')
      let abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator()
      try {
        await abilityDelegator.startAbility({
          bundleName: 'ohos.samples.preference',
          abilityName: 'MainAbility'
        })
        done()
      } catch (exception) {
        Logger.info(TAG, BUNDLE + `Preferences_StartAbility_001 exception = ${JSON.stringify(exception)}`)
        expect().assertFail()
      }
      Logger.info(TAG, BUNDLE + 'Preferences_StartAbility_001 end')
    })

    /**
     * 点击切换按钮然后选择simplicity主题
     */
    it(BUNDLE + "Preferences_SwitchChooseTheme_001", 0, async () => {
      Logger.info(TAG, BUNDLE + 'Preferences_SwitchChooseTheme_001 begin')
      await driver.delayMs(1000)
      Logger.info(TAG, BUNDLE + 'Preferences_SwitchChooseTheme_001 clickChangeBtn')
      // 点击切换按钮
      await driver.assertComponentExist(ON.id('changeBtn'))
      let btnChange = await driver.findComponent(ON.id('changeBtn'))
      await btnChange.click()
      await driver.delayMs(1000)
      // 选择主题
      await driver.assertComponentExist(ON.text('simplicity'))
      let btnTheme = await driver.findComponent(ON.text('simplicity'))
      await btnTheme.click()
      await driver.delayMs(1000)
      Logger.info(TAG, BUNDLE + 'Preferences_SwitchChooseTheme_001 end')
    })

    /**
     * 退出应用
     */
    it(BUNDLE + "Preferences_ShutDown_001", 0, async () => {
      Logger.info(TAG, BUNDLE + 'Preferences_ShutDown_001 begin')
      await driver.pressBack()
      // try {
      //   missionManager.clearAllMissions(err => {
      //     if (err) {
      //       console.error('clearAllMissions failed: ${err.message}');
      //     } else {
      //       console.info('clearAllMissions successfully.');
      //     }
      //   });
      // } catch (err) {
      //   console.error('clearAllMissions failed: ${err.message}');
      // }
      await driver.delayMs(1000)
      Logger.info(TAG, BUNDLE + 'Preferences_ShutDown_001 end')
    })

    /**
     * 重启应用
     */
    it(BUNDLE + 'Preferences_StartAbility_002', 0, async (done: Function) => {
      Logger.info(TAG, BUNDLE + 'Preferences_StartAbility_002 begin')
      let abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator()
      try {
        await abilityDelegator.startAbility({
          bundleName: 'ohos.samples.preference',
          abilityName: 'MainAbility'
        })
        await driver.delayMs(1000)
        expect(nowTheme).assertEqual('simplicity') // 判断重启后的主题是否为simplicity
        done()
      } catch (exception) {
        Logger.info(TAG, BUNDLE + `Preferences_StartAbility_002 exception = ${JSON.stringify(exception)}`)
        expect().assertFail()
      }
      Logger.info(TAG, BUNDLE + 'Preferences_StartAbility_002 end')
    })

    /**
     * 点击切换按钮然后选择default主题
     */
    it(BUNDLE + "Preferences_SwitchChooseTheme_002", 0, async () => {
      Logger.info(TAG, BUNDLE + 'Preferences_SwitchChooseTheme_002 begin')
      await driver.delayMs(1000)
      Logger.info(TAG, BUNDLE + 'Preferences_SwitchChooseTheme_002 clickChangeBtn')
      // 点击切换按钮
      await driver.assertComponentExist(ON.id('changeBtn'))
      let btnChange = await driver.findComponent(ON.id('changeBtn'))
      await btnChange.click()
      await driver.delayMs(1000)
      // 选择主题
      await driver.assertComponentExist(ON.text('default'))
      let btnTheme = await driver.findComponent(ON.text('default'))
      await btnTheme.click()
      await driver.delayMs(1000)
      Logger.info(TAG, BUNDLE + 'Preferences_SwitchChooseTheme_002 end')
    })

    /**
     * 退出应用
     */
    it(BUNDLE + "Preferences_ShutDown_002", 0, async () => {
      Logger.info(TAG, BUNDLE + 'Preferences_ShutDown_002 begin')
      await driver.pressBack()
      // try {
      //   missionManager.clearAllMissions(err => {
      //     if (err) {
      //       console.error('clearAllMissions failed: ${err.message}');
      //     } else {
      //       console.info('clearAllMissions successfully.');
      //     }
      //   });
      // } catch (err) {
      //   console.error('clearAllMissions failed: ${err.message}');
      // }
      await driver.delayMs(1000)
      Logger.info(TAG, BUNDLE + 'Preferences_ShutDown_002 end')
    })

    /**
     * 重启应用
     */
    it(BUNDLE + 'Preferences_StartAbility_003', 0, async (done: Function) => {
      Logger.info(TAG, BUNDLE + 'Preferences_StartAbility_003 begin')
      let abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator()
      try {
        await abilityDelegator.startAbility({
          bundleName: 'ohos.samples.preference',
          abilityName: 'MainAbility'
        })
        await driver.delayMs(1000)
        expect(nowTheme).assertEqual('default') // 判断重启后的主题是否为default
        done()
      } catch (exception) {
        Logger.info(TAG, BUNDLE + `Preferences_StartAbility_003 exception = ${JSON.stringify(exception)}`)
        expect().assertFail()
      }
      Logger.info(TAG, BUNDLE + 'Preferences_StartAbility_003 end')
    })

    /**
     * 点击切换按钮然后选择pomeloWhtie主题
     */
    it(BUNDLE + "Preferences_SwitchChooseTheme_003", 0, async () => {
      Logger.info(TAG, BUNDLE + 'Preferences_SwitchChooseTheme_003 begin')
      await driver.delayMs(1000)
      Logger.info(TAG, BUNDLE + 'Preferences_SwitchChooseTheme_003 clickChangeBtn')
      // 点击切换按钮
      await driver.assertComponentExist(ON.id('changeBtn'))
      let btnChange = await driver.findComponent(ON.id('changeBtn'))
      await btnChange.click()
      await driver.delayMs(1000)
      // 选择主题
      await driver.assertComponentExist(ON.text('pomeloWhtie'))
      let btnTheme = await driver.findComponent(ON.text('pomeloWhtie'))
      await btnTheme.click()
      await driver.delayMs(1000)
      Logger.info(TAG, BUNDLE + 'Preferences_SwitchChooseTheme_003 end')
    })

    /**
     * 退出应用
     */
    it(BUNDLE + "Preferences_ShutDown_003", 0, async () => {
      Logger.info(TAG, BUNDLE + 'Preferences_ShutDown_003 begin')
      await driver.pressBack()
      // try {
      //   missionManager.clearAllMissions(err => {
      //     if (err) {
      //       console.error('clearAllMissions failed: ${err.message}');
      //     } else {
      //       console.info('clearAllMissions successfully.');
      //     }
      //   });
      // } catch (err) {
      //   console.error('clearAllMissions failed: ${err.message}');
      // }
      await driver.delayMs(1000)
      Logger.info(TAG, BUNDLE + 'Preferences_ShutDown_003 end')
    })

    /**
     * 重启应用
     */
    it(BUNDLE + 'Preferences_StartAbility_004', 0, async (done: Function) => {
      Logger.info(TAG, BUNDLE + 'Preferences_StartAbility_004 begin')
      let abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator()
      try {
        await abilityDelegator.startAbility({
          bundleName: 'ohos.samples.preference',
          abilityName: 'MainAbility'
        })
        await driver.delayMs(1000)
        expect(nowTheme).assertEqual('pomeloWhtie') // 判断重启后的主题是否为pomeloWhtie
        done()
      } catch (exception) {
        Logger.info(TAG, BUNDLE + `Preferences_StartAbility_004 exception = ${JSON.stringify(exception)}`)
        expect().assertFail()
      }
      Logger.info(TAG, BUNDLE + 'Preferences_StartAbility_004 end')
    })
  })
}