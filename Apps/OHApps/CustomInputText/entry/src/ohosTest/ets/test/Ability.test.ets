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
import { describe, it, expect } from '@ohos/hypium';
import { Driver, ON, MatchPattern } from '@ohos.UiTest';
import { logger } from '../util/Logger';

const TAG: string = 'Sample_CustomTextArea_Test';
const BUNDLE = 'CustomTextArea_';

export default function abilityTest() {
  describe('ActsAbilityTest', () => {
    // 打开应用界面
    it(BUNDLE + 'StartAbility_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE}StartAbility_001 begin`);
      let driver: Driver = Driver.create();
      let delegator = AbilityDelegatorRegistry.getAbilityDelegator();
      await delegator.executeShellCommand('aa start -b com.samples.customtextinput -a EntryAbility')
        .then(result => {
          logger.info(TAG, `${BUNDLE}start ability finished, result = ${JSON.stringify(result)}`);
        }).catch((err: Error) => {
          logger.info(TAG, `${BUNDLE}start ability failed, err = ${JSON.stringify(err)}`);
        })
      await driver.delayMs(3000);
      await delegator.getCurrentTopAbility().then((ability: UIAbility) => {
        logger.info(TAG, `${BUNDLE}get top ability`);
        expect(ability.context.abilityInfo.name).assertEqual('EntryAbility');
      })
      logger.info(TAG, `${BUNDLE}StartAbility_001 end`);
      done();
    })

    // 点击attach、show、on按钮绑定输入法应用，并输入内容
    it(BUNDLE + 'ShowKeyboard_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE}ShowKeyboard_001 begin`);
      let driver: Driver = Driver.create();
      await driver.delayMs(1000);
      await driver.assertComponentExist(ON.id('btnAttach'));
      let btnAttach = await driver.findComponent(ON.id('btnAttach'));
      await btnAttach.click();
      await driver.assertComponentExist(ON.id('btnShow'));
      let btnShow = await driver.findComponent(ON.id('btnShow'));
      await btnShow.click();
      await driver.assertComponentExist(ON.id('btnOn'));
      let btnOn = await driver.findComponent(ON.id('btnOn'));
      await btnOn.click();
      await driver.delayMs(3000);

      // 如果当前是编辑菜单，切换到主键盘
      let btnEdit = await driver.findComponent(ON.id('btnEdit'));
      if (btnEdit !== undefined && btnEdit !== null) {
        await driver.assertComponentExist(ON.id('keyboardMenu'));
        let keyboardMenu = await driver.findComponent(ON.id('keyboardMenu'));
        await keyboardMenu.click();
      }

      // 如果当前是编辑页面，切换到主键盘
      let btn_selection = await driver.findComponent(ON.id('btn_selection'));
      if (btn_selection !== undefined && btn_selection !== null) {
        await driver.assertComponentExist(ON.id('keyboardMenu'));
        let keyboardMenu = await driver.findComponent(ON.id('keyboardMenu'));
        await keyboardMenu.click();
      }

      // 如果当前是数字键盘或符号键盘，切换到字母键盘
      let charKey = await driver.findComponent(ON.text('ABC', MatchPattern.CONTAINS));
      if (charKey !== undefined && charKey !== null) {
        await charKey.click();
      }
      await driver.delayMs(1000);
      await driver.assertComponentExist(ON.text('a', MatchPattern.CONTAINS));
      let inputText = await driver.findComponent(ON.text('a', MatchPattern.CONTAINS));
      await inputText.click();
      await inputText.click();
      await inputText.click();
      await inputText.click();
      let inputContent = await driver.findComponent(ON.id('inputText'));
      let inputString = await inputContent.getText();
      expect(inputString === 'aaaa').assertTrue();
      logger.info(TAG, `${BUNDLE}ShowKeyboard_001 end`);
      done();
    })

    // 更新光标信息
    it(BUNDLE + 'UpdateCursor_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE}UpdateCursor_001 begin`);
      let driver: Driver = Driver.create();
      await driver.delayMs(1000);
      await driver.assertComponentExist(ON.id('cursorLeft'));
      let cursorLeft = await driver.findComponent(ON.id('cursorLeft'));
      await cursorLeft.inputText('120');
      await driver.assertComponentExist(ON.id('cursorTop'));
      let cursorTop = await driver.findComponent(ON.id('cursorTop'));
      await cursorTop.inputText('50');
      await driver.assertComponentExist(ON.id('cursorWidth'));
      let cursorWidth = await driver.findComponent(ON.id('cursorWidth'));
      await cursorWidth.inputText('2');
      await driver.assertComponentExist(ON.id('cursorHeight'));
      let cursorHeight = await driver.findComponent(ON.id('cursorHeight'));
      await cursorHeight.inputText('20');
      await driver.assertComponentExist(ON.id('btnUpdateCursor'));
      let btnUpdateCursor = await driver.findComponent(ON.id('btnUpdateCursor'));
      await btnUpdateCursor.click();
      logger.info(TAG, `${BUNDLE}UpdateCursor_001 end`);
      done();
    })

    // 选中文本
    it(BUNDLE + 'ChangeSelection_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE}ChangeSelection_001 begin`);
      let driver: Driver = Driver.create();
      await driver.delayMs(1000);
      await driver.assertComponentExist(ON.id('selectStart'));
      let selectStart = await driver.findComponent(ON.id('selectStart'));
      await selectStart.inputText('2');
      await driver.assertComponentExist(ON.id('selectEnd'));
      let selectEnd = await driver.findComponent(ON.id('selectEnd'));
      await selectEnd.inputText('4');
      // 键盘可能遮挡，所以先隐藏键盘
      await driver.assertComponentExist(ON.id('btnShow'));
      let btnShow = await driver.findComponent(ON.id('btnShow'));
      await btnShow.click();
      await driver.delayMs(1000);
      await driver.assertComponentExist(ON.id('btnChangeSelection'));
      let btnChangeSelection = await driver.findComponent(ON.id('btnChangeSelection'));
      await btnChangeSelection.click();
      await driver.delayMs(1000);
      let selectInput = await driver.findComponent(ON.id('selectInput'));
      let selectString = await selectInput.getText();
      expect(selectString.length === 2).assertTrue();
      await driver.delayMs(1000);
      logger.info(TAG, `${BUNDLE}ChangeSelection_001 end`);
      done();
    })

    // 修改软键盘输入文本类型和Enter键类型
    it(BUNDLE + 'UpdateAttribute_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE}UpdateAttribute_001 begin`);
      let driver: Driver = Driver.create();
      await driver.delayMs(1000);

      await driver.assertComponentExist(ON.id('inputTypeSelect'));
      let inputTypeSelect = await driver.findComponent(ON.id('inputTypeSelect'));
      await inputTypeSelect.click();
      await driver.assertComponentExist(ON.text('Number'));
      let numberType = await driver.findComponent(ON.text('Number'));
      await numberType.click();
      await driver.delayMs(2000);
      await driver.assertComponentExist(ON.id('enterKeySelect'));
      let enterKeySelect = await driver.findComponent(ON.id('enterKeySelect'));
      await enterKeySelect.click();
      await driver.assertComponentExist(ON.text('Search'));
      let searchType = await driver.findComponent(ON.text('Search'));
      await searchType.click();
      await driver.delayMs(2000);
      await driver.assertComponentExist(ON.id('btnUpdateAttribute'));
      let btnUpdateAttribute = await driver.findComponent(ON.id('btnUpdateAttribute'));
      await btnUpdateAttribute.click();
      await driver.delayMs(1000);
      // 更新属性后，解绑，重新绑定输入法，查看键盘类型和enter键
      await driver.assertComponentExist(ON.id('btnAttach'));
      let btnAttach = await driver.findComponent(ON.id('btnAttach'));
      await btnAttach.click();
      await driver.delayMs(1000);
      await driver.assertComponentExist(ON.id('customInputText'));
      let customInputText = await driver.findComponent(ON.id('customInputText'));
      await customInputText.click();
      await driver.delayMs(1000);
      await driver.assertComponentExist(ON.text('0'));
      await driver.assertComponentExist(ON.text('1'));
      await driver.assertComponentExist(ON.text('2'));
      logger.info(TAG, `${BUNDLE}UpdateAttribute_001 end`);
      done();
    })

    // 解绑输入法应用
    it(BUNDLE + 'ShowKeyboard_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE}ShowKeyboard_001 begin`);
      let driver: Driver = Driver.create();
      await driver.delayMs(1000);
      await driver.assertComponentExist(ON.id('btnShow'));
      let btnShow = await driver.findComponent(ON.id('btnShow'));
      await btnShow.click();
      await driver.assertComponentExist(ON.id('btnOn'));
      let btnOn = await driver.findComponent(ON.id('btnOn'));
      await btnOn.click();
      await driver.assertComponentExist(ON.id('btnAttach'));
      let btnAttach = await driver.findComponent(ON.id('btnAttach'));
      await btnAttach.click();
      await driver.delayMs(1000);
      let text = await btnAttach.getText();
      expect(text === 'attach').assertTrue();
      logger.info(TAG, `${BUNDLE}ShowKeyboard_001 end`);
      done();
    })
  })
}
