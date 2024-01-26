/*
* Copyright (c) 2023 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License")
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
/*

* >查找控件属性
* | No. | API                                | 功能描述                       |
* |-----|------------------------------------|----------------------------|
* | 1   | getBundleName():Promise<string>    | 获取bundleName                      |
* | 2   | getBounds():Promise<Rect>          | 获取window的区域            |
* | 3   | getTitle():Promise<string>         | 获取指定window title                    |
* | 4   | getWindowMode():Promise<WindowMode> | 获取window类型。                  |
* | 5   | isFocused():Promise<boolean>       | 货物window状态。                 |
* | 6   | isActived():Promise<boolean>       | 获取当前window是否active。                 |
*
 */



import { describe, beforeAll, it, expect, TestType } from '@ohos/hypium'
import abilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import { Driver } from '@ohos.UiTest'
import Want from '@ohos.app.ability.Want';

import Logger from '../../../util/Logger'

const delegator = abilityDelegatorRegistry.getAbilityDelegator();
const bundleName = abilityDelegatorRegistry.getArguments().bundleName;
const WAIT_UI_READYMS = 1000;
const TAG = "WindowAttr_Test";
const BUNDLE = "WindowAttr_"
export default function WindowAttr() {
  describe('WindowAttr',  () => {
    beforeAll(async () => {
      let want: Want = {
        bundleName : bundleName,
        abilityName : "EntryAbility"
      }
      await delegator.startAbility(want);
    })

    /**
     * @tc.number:WindowAttr_001
     * @tc.name: WindowAttr_Test_001
     * @tc.type: 0 || TestType.FUNCTION || Size.SMALLTEST || Level.LEVEL0
     * @tc.desc: 设置window指定的大小与方向测试
     */
    it("WindowAttr_Test_001", TestType.FUNCTION, async (done: Function) => {
      Logger.info(TAG, BUNDLE + "Test_001 start")
      let driver = Driver.create()
      await driver.delayMs(WAIT_UI_READYMS)
      let window = await driver.findWindow({bundleName: bundleName})
      // 获取widow bundle名称
      let name = await window.getBundleName()
      // 断言bundleName
      expect(name == bundleName).assertTrue()
      Logger.info(TAG, BUNDLE + "Test_001 end")
      done()
    })
  })
}