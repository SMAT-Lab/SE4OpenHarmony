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
import { describe, it, expect } from '@ohos/hypium';
import { Driver, ON, MatchPattern } from '@ohos.UiTest';
import { logger } from '../util/Logger';
import Want from '@ohos.app.ability.Want';

const TAG: string = 'Sample_LanguageBaseClassLibraryTest';
const BUNDLE = 'LanguageBaseClassLibrary';
const delegator = AbilityDelegatorRegistry.getAbilityDelegator()
const driver: Driver = Driver.create();

// 资源本地化
async function getResourceString(resource: Resource): Promise<string> {
  let manage = delegator.getAppContext().resourceManager
  let text = await manage.getStringValue(resource)
  return text
}

async function addContact(driver: Driver, name: string, phone: string) {
  // 进入新增联系人
  await driver.assertComponentExist(ON.id('add'));
  let addBtn = await driver.findComponent(ON.id('add'));
  await addBtn.click();
  await driver.delayMs(200);
  // 点击姓名输入框
  await driver.assertComponentExist(ON.id('add_name'));
  let addNameTextInput = await driver.findComponent(ON.id('add_name'));
  await addNameTextInput.inputText(name);
  await driver.delayMs(200);
  // 点击年龄输入框
  await driver.assertComponentExist(ON.id('add_age'));
  let addAgeComponent = await driver.findComponent(ON.id('add_age'));
  await addAgeComponent.click();
  await driver.delayMs(200);
  // 点击确定按钮
  await driver.assertComponentExist(ON.id('add_sure'));
  let addSureBtn = await driver.findComponent(ON.id('add_sure'));
  await addSureBtn.click();
  await driver.delayMs(200);
  // 点击电话输入框
  await driver.assertComponentExist(ON.id('add_phone'));
  let addPhoneTextInput = await driver.findComponent(ON.id('add_phone'));
  await addPhoneTextInput.inputText(phone);
  await driver.delayMs(200);
  // 点击完成按钮
  await driver.assertComponentExist(ON.id('add_confirm'));
  let addConfirmBtn = await driver.findComponent(ON.id('add_confirm'));
  await addConfirmBtn.click();
  await driver.delayMs(200);
}

async function deleteItem(driver: Driver, id: string) {
  await driver.assertComponentExist(ON.id(id));
  let deleteBtn = await driver.findComponent(ON.id(id));
  await deleteBtn.click();
  await driver.delayMs(200);
}

async function addKeyValue(driver: Driver, key: string, value: string) {
  // 进入新增Key/Value
  await driver.assertComponentExist(ON.id('add'));
  let addBtn = await driver.findComponent(ON.id('add'));
  await addBtn.click();
  await driver.delayMs(200);
  // 点击Key输入框
  await driver.assertComponentExist(ON.id('add_key'));
  let addKeyTextInput = await driver.findComponent(ON.id('add_key'));
  await addKeyTextInput.inputText(key);
  await driver.delayMs(200);
  // 点击Value输入框
  await driver.assertComponentExist(ON.id('add_value'));
  let addValueTextInput = await driver.findComponent(ON.id('add_value'));
  await addValueTextInput.inputText(value);
  await driver.delayMs(200);
  // 点击完成按钮
  await driver.assertComponentExist(ON.id('add_confirm'));
  let addConfirmBtn = await driver.findComponent(ON.id('add_confirm'));
  await addConfirmBtn.click();
  await driver.delayMs(200);
}

async function addValue(driver: Driver, value: string) {
  // 进入新增Value
  await driver.assertComponentExist(ON.id('add'));
  let addBtn = await driver.findComponent(ON.id('add'));
  await addBtn.click();
  await driver.delayMs(200);
  // 点击Value输入框
  await driver.assertComponentExist(ON.id('add_value'));
  let addValueTextInput = await driver.findComponent(ON.id('add_value'));
  await addValueTextInput.inputText(value);
  await driver.delayMs(200);
  // 点击完成按钮
  await driver.assertComponentExist(ON.id('add_confirm'));
  let addConfirmBtn = await driver.findComponent(ON.id('add_confirm'));
  await addConfirmBtn.click();
  await driver.delayMs(200);
}

export default function abilityTest() {
  describe('ActsAbilityTest', () => {
    // 打开应用
    it(BUNDLE + 'StartAbility_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE}StartAbility_001 begin`);
      let want: Want = {
        bundleName: 'com.samples.languagebaseclasslibrary',
        abilityName: 'EntryAbility'
      };
      delegator.startAbility(want, (err) => {
        logger.info(TAG, `${BUNDLE}_startAbility end err ${JSON.stringify(err)}`);
      })
      await driver.delayMs(1000);
      logger.info(TAG, `${BUNDLE}StartAbility_001 end`);
      done();
    })

    // 进入xml解析、生成与转换页面
    it(BUNDLE + 'Xml_ConvertXml_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE}Xml_ConvertXml_001 begin`);
      await driver.delayMs(200);
      // find component on text 'Xml'
      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.xml'))));
      let button = await driver.findComponent(ON.text(await getResourceString($r('app.string.xml'))));
      await button.click();
      await driver.delayMs(200);
      // 点击Xml生成
      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.serializer')), MatchPattern.CONTAINS));
      let serializer = await driver.findComponent(ON.text(await getResourceString($r('app.string.serializer')), MatchPattern.CONTAINS));
      await serializer.click();
      await driver.delayMs(1000);
      logger.info(TAG, BUNDLE + 'ClickXmlFunction_001 clickParserXml');
      // 点击Xml解析
      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.parser')), MatchPattern.CONTAINS));
      let parser = await driver.findComponent(ON.text(await getResourceString($r('app.string.parser')), MatchPattern.CONTAINS));
      await parser.click();
      await driver.delayMs(1000);
      logger.info(TAG, BUNDLE + 'ClickXmlFunction_001 clickConvertXml');
      // 点击Xml转换
      let convert = await driver.findComponent(ON.text(await getResourceString($r('app.string.convert')), MatchPattern.CONTAINS));
      await convert.click();
      await driver.delayMs(1000);
      // 校验是否进入对应页面
      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.xml'))));
      await driver.delayMs(200);
      await driver.pressBack();
      done();
      logger.info(TAG, `${BUNDLE}Xml_ConvertXml_001 end`);
    })

    // 进入Util界面
    it(BUNDLE + 'util_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE}util_001 begin`);
      await driver.delayMs(200);
      // check text
      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.util'))));
      let button = await driver.findComponent(ON.text(await getResourceString($r('app.string.util'))));
      await button.click();
      await driver.delayMs(200);
      done();
      logger.info(TAG, `${BUNDLE}util_001 end`);
    })

    // StringCode(字符串编码)
    it(BUNDLE + 'StringCodeFunction_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE} StringCodeFunction_001 begin`);
      await driver.delayMs(200);
      // 进入字符串编解码界面
      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.string_code'))));
      let strBtn = await driver.findComponent(ON.text(await getResourceString($r('app.string.string_code'))));
      await strBtn.click();
      await driver.delayMs(200);
      // 点击特定格式输出
      await driver.assertComponentExist(ON.id('specFormatOutput'));
      let specOutputBtn = await driver.findComponent(ON.id('specFormatOutput'));
      await specOutputBtn.click();
      await driver.delayMs(200);
      // 点击文本编码器
      await driver.assertComponentExist(ON.id('textEncoder'));
      let textEncoderBtn = await driver.findComponent(ON.id('textEncoder'));
      await textEncoderBtn.click();
      await driver.delayMs(200);
      // 判断读取信息是否正确
      await driver.assertComponentExist(ON.id('read'));
      let readInfo = await driver.findComponent(ON.id('read'));
      let readValue = await readInfo.getText();
      logger.info(TAG, `${BUNDLE}clickTextEncoderFunction_001 readValue：${readValue}`);
      expect(readValue).assertEqual('23');
      // 判断写入信息是否正确
      await driver.assertComponentExist(ON.id('write'));
      let writeInfo = await driver.findComponent(ON.id('write'));
      let writeValue = await writeInfo.getText();
      logger.info(TAG, `${BUNDLE}clickTextEncoderFunction_001 writeValue：${writeValue}`);
      expect(writeValue).assertEqual('39');
      // 点击文本译码器
      await driver.assertComponentExist(ON.id('textDecoder'));
      let textDecoderBtn = await driver.findComponent(ON.id('textDecoder'));
      await textDecoderBtn.click();
      await driver.delayMs(200);
      // 获取译码文本，判断是否是原字符串
      await driver.assertComponentExist(ON.id('decRes'));
      let decRes = await driver.findComponent(ON.id('decRes'));
      let decodeValue = await decRes.getText();
      expect(decodeValue).assertContain('OpenHarmony 3.0');
      // 返回首页
      await driver.pressBack();
      done();
      logger.info(TAG, `${BUNDLE} StringCodeFunction_001 end`);
    })

    // RationalNumber(有理数)
    it(BUNDLE + 'RationalNumber_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE}RationalNumber_001 begin`);
      await driver.delayMs(200);
      // 进入有理数界面
      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.rational_number'))));
      let button = await driver.findComponent(ON.text(await getResourceString($r('app.string.rational_number'))));
      await button.click();
      await driver.delayMs(200);

      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.compare'))));
      let compare = await driver.findComponent(ON.text(await getResourceString($r('app.string.compare'))));
      await compare.click();
      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.less_than'))));

      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.get'))));
      let getValue = await driver.findComponent(ON.text(await getResourceString($r('app.string.get'))));
      await getValue.click();
      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.get_value')), MatchPattern.CONTAINS));

      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.getDenominator'))));
      let operation0 = await driver.findComponent(ON.text(await getResourceString($r('app.string.getDenominator'))));
      await operation0.click();
      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.numerator')), MatchPattern.CONTAINS));

      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.isZero'))));
      let operation1 = await driver.findComponent(ON.text(await getResourceString($r('app.string.isZero'))));
      await operation1.click();
      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.rational_number_is')), MatchPattern.CONTAINS));

      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.isNaN'))));
      let operation2 = await driver.findComponent(ON.text(await getResourceString($r('app.string.isNaN'))));
      await operation2.click();
      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.rational_number_is_not_nan')), MatchPattern.CONTAINS));

      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.isFinite'))));
      let operation3 = await driver.findComponent(ON.text(await getResourceString($r('app.string.isFinite'))));
      await operation3.click();
      await driver.assertComponentExist(ON.text('Finite', MatchPattern.CONTAINS));

      await driver.pressBack();
      done();
      logger.info(TAG, `${BUNDLE}RationalNumber_001 end`);
    })

    // 进入到LRUCache (缓冲区)
    it(BUNDLE + 'UtilLruBuffer_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE}UtilLruBuffer_001 begin`);
      await driver.delayMs(200);
      // find component on text 'LRUCache'
      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.lru_cache'))));
      let button = await driver.findComponent(ON.text(await getResourceString($r('app.string.lru_cache'))));
      await button.click();
      await driver.delayMs(200);
      logger.info(TAG, BUNDLE + 'UtilLruBuffer_001 clickCheckPresetValue');
      // 点击初始化缓冲区
      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.initialize_buffer'))));
      let initializeBtn = await driver.findComponent(ON.text(await getResourceString($r('app.string.initialize_buffer'))));
      await initializeBtn.click();
      await driver.delayMs(200);
      logger.info(TAG, BUNDLE + 'UtilLruBuffer_001 clickCheckPresetValue');
      // 点击获取缓冲区容量
      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.get_buffer_capacity'))));
      let getBufferBtn = await driver.findComponent(ON.text(await getResourceString($r('app.string.get_buffer_capacity'))));
      await getBufferBtn.click();
      await driver.delayMs(200);
      logger.info(TAG, BUNDLE + 'UtilLruBuffer_001 clickCheckPresetValue');
      // 点击更新缓冲区容量
      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.update_buffer_capacity'))));
      let updateBufferBtn = await driver.findComponent(ON.text(await getResourceString($r('app.string.update_buffer_capacity'))));
      await updateBufferBtn.click();
      await driver.delayMs(200);
      logger.info(TAG, BUNDLE + 'UtilLruBuffer_001 clickCheckPresetValue');
      // 点击获取缓冲区字符串
      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.get_buffer_string'))));
      let getBufferCharacterBtn = await driver.findComponent(ON.text(await getResourceString($r('app.string.get_buffer_string'))));
      await getBufferCharacterBtn.click();
      await driver.delayMs(200);
      logger.info(TAG, BUNDLE + 'UtilLruBuffer_001 clickCheckPresetValue');
      // 点击添加键值对
      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.add_key_value'))));
      let addBtn = await driver.findComponent(ON.text(await getResourceString($r('app.string.add_key_value'))));
      await addBtn.click();
      await driver.delayMs(200);
      logger.info(TAG, BUNDLE + 'UtilLruBuffer_001 clickCheckPresetValue');
      // 点击获取键对应的值
      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.get_value_with_key'))));
      let getBtn = await driver.findComponent(ON.text(await getResourceString($r('app.string.get_value_with_key'))));
      await getBtn.click();
      await driver.delayMs(200);
      logger.info(TAG, BUNDLE + 'UtilLruBuffer_001 clickCheckPresetValue');
      // 关闭弹窗
      let getDialogBtn = await driver.findComponent(ON.type('Dialog'));
      await getDialogBtn.click();
      await driver.delayMs(200);
      logger.info(TAG, BUNDLE + 'UtilLruBuffer_001 clickCheckPresetValue');
      // 点击获取所有键值对
      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.get_all_key_values'))));
      let getAllBtn = await driver.findComponent(ON.text(await getResourceString($r('app.string.get_all_key_values'))));
      await getAllBtn.click();
      await driver.delayMs(200);
      logger.info(TAG, BUNDLE + 'UtilLruBuffer_001 clickCheckPresetValue');
      // 点击删除指定键及关联值
      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.delete_key_and_value'))));
      let deleteBtn = await driver.findComponent(ON.text(await getResourceString($r('app.string.delete_key_and_value'))));
      await deleteBtn.click();
      await driver.delayMs(200);
      logger.info(TAG, BUNDLE + 'UtilLruBuffer_001 clickCheckPresetValue');
      // 关闭弹窗
      let deleteDialogBtn = await driver.findComponent(ON.type('Dialog'));
      await deleteDialogBtn.click();
      await driver.delayMs(200);
      logger.info(TAG, BUNDLE + 'UtilLruBuffer_001 clickCheckPresetValue');
      // 点击清除所有键值对
      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.clear_all_key_values'))));
      let eliminateBtn = await driver.findComponent(ON.text(await getResourceString($r('app.string.clear_all_key_values'))));
      await eliminateBtn.click();
      await driver.delayMs(200);
      logger.info(TAG, BUNDLE + 'UtilLruBuffer_001 clickCheckPresetValue');
      // 点击查看操作记录
      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.view_operation_record'))));
      let operatingBtn = await driver.findComponent(ON.text(await getResourceString($r('app.string.view_operation_record'))));
      await operatingBtn.click();
      await driver.delayMs(200);
      await driver.pressBack();
      done();
      logger.info(TAG, `${BUNDLE}UtilLruBuffer_001 end`);
    })

    // Base64Helper (Base64编解码)
    it(BUNDLE + 'UtilBase64Codec_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE}UtilBase64Codec_001 begin`);
      await driver.delayMs(200);
      // 进入Base64编解码
      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.base64'))));
      let typeBtn = await driver.findComponent(ON.text(await getResourceString($r('app.string.base64'))));
      await typeBtn.click();
      await driver.delayMs(200);
      // 点击编码
      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.encode'))));
      let codeBtn = await driver.findComponent(ON.text(await getResourceString($r('app.string.encode'))));
      await codeBtn.click();
      await driver.delayMs(200);
      logger.info(TAG, BUNDLE + 'UtilBase64Codec_001 clickCheckPresetValue');
      // 点击解码
      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.decode'))));
      let decodeBtn = await driver.findComponent(ON.text(await getResourceString($r('app.string.decode'))));
      await decodeBtn.click();
      await driver.delayMs(1000);
      await driver.pressBack();
      done();
      logger.info(TAG, `${BUNDLE}UtilBase64Codec_001 begin`);
    })

    // TypeCheck (类型检查)
    it(BUNDLE + 'TypeCheck_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE}TypeCheck_001 begin`);
      await driver.delayMs(200);
      // 进入类型检查
      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.type_check'))));
      let typeBtn = await driver.findComponent(ON.text(await getResourceString($r('app.string.type_check'))));
      await typeBtn.click();
      await driver.delayMs(1000);
      // 点击显示预置值
      await driver.assertComponentExist(ON.id('displayPresetValue'));
      let displayPresetValueBtn = await driver.findComponent(ON.id('displayPresetValue'));
      await displayPresetValueBtn.click();
      await driver.delayMs(200);
      logger.info(TAG, BUNDLE + 'TypeCheck_001 clickCheckPresetValue');
      // 点击校验预置值
      await driver.assertComponentExist(ON.id('checkPresetValue'));
      let checkPresetValueBtn = await driver.findComponent(ON.id('checkPresetValue'));
      await checkPresetValueBtn.click();
      await driver.delayMs(200);
      await driver.pressBack();
      await driver.pressBack();
      await driver.delayMs(1000);
      done();

      logger.info(TAG, `${BUNDLE}TypeCheck_001 begin`)
    })

    // 进入Url字符串解析页面
    it(BUNDLE + 'Url_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE}Url_001 begin`);
      await driver.delayMs(500);
      // find component on text 'Xml'
      await driver.assertComponentExist(ON.text('Url (Url字符串解析)'));
      let button = await driver.findComponent(ON.text('Url (Url字符串解析)'));
      await button.click();
      await driver.delayMs(1000);
      // check text
      await driver.assertComponentExist(ON.text('Url (Url字符串解析)'));
      await driver.delayMs(1000);
      done()
      logger.info(TAG, `${BUNDLE}Url_001 end`);
    })

    // Url字符串解析
    it(BUNDLE + 'ClickUrlStringBtnFunction_001', 0, async (done: Function) => {
      logger.info(TAG, BUNDLE + 'ClickUrlStringBtnFunction_001 begin')
      await driver.delayMs(1000)
      // 点击插入键值对到查询字符串
      await driver.assertComponentExist(ON.id('item0'))
      let insertKeyValuePairs = await driver.findComponent(ON.id('item0'))
      await insertKeyValuePairs.click()
      await driver.delayMs(500)
      // 是否成功插入
      await driver.assertComponentExist(ON.id('output'))
      let outputInsert = await driver.findComponent(ON.id('output'))
      let insertValue = await outputInsert.getText()
      await driver.delayMs(1000);
      expect(insertValue).assertContain('node=nodeValue1')
      // 点击删除键值对
      await driver.assertComponentExist(ON.id('item1'))
      let deleteKeyValuePairs = await driver.findComponent(ON.id('item1'))
      await deleteKeyValuePairs.click()
      await driver.delayMs(500)
      // 是否成功删除
      await driver.assertComponentExist(ON.id('output'))
      let outputDelete = await driver.findComponent(ON.id('output'))
      let deleteValue = await outputDelete.getText()
      await driver.delayMs(1000);
      expect(deleteValue).assertEqual('https://gitee.com/openharmony/');
      // 点击获取指定名称对应的第一个值
      await driver.assertComponentExist(ON.id('item0'))
      let insertKeyValue = await driver.findComponent(ON.id('item0'))
      await insertKeyValue.click()
      await driver.delayMs(500)
      await driver.assertComponentExist(ON.id('item2'))
      let getFirstValue = await driver.findComponent(ON.id('item2'))
      await getFirstValue.click()
      await driver.delayMs(500)
      // 是否成功获取
      await driver.assertComponentExist(ON.id('output'))
      let outputGet = await driver.findComponent(ON.id('output'))
      let getValue = await outputGet.getText()
      await driver.delayMs(1000);
      expect(getValue).assertContain('nodeValue1')
      // 点击设置键的新值
      await driver.assertComponentExist(ON.id('item3'))
      let setNewValue = await driver.findComponent(ON.id('item3'))
      await setNewValue.click()
      await driver.delayMs(500)
      // 是否成功设置新值
      await driver.assertComponentExist(ON.id('output'))
      let outputSet = await driver.findComponent(ON.id('output'))
      let setValue = await outputSet.getText()
      await driver.delayMs(1000);
      expect(setValue).assertContain('newValue')
      // 返回首页
      await driver.pressBack();
      done();
      logger.info(TAG, BUNDLE + 'ClickUrlStringBtnFunction_001 end')
    })

    // 进入TaskPool页面
    it(BUNDLE + 'TaskPool_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE}TaskPool_001 begin`);
      await driver.delayMs(200);
      // 滚动到TaskPool
      await driver.assertComponentExist(ON.id('menu_list'));
      let menuList = await driver.findComponent(ON.id('menu_list'));
      // find component on text 'TaskPool'
      let button = await menuList.scrollSearch(ON.text(await getResourceString($r('app.string.task_pool'))));
      await button.click();
      await driver.delayMs(200);
      // 点击Execute task
      await driver.assertComponentExist(ON.id('execute_task'));
      let executeTask = await driver.findComponent(ON.id('execute_task'));
      await executeTask.click();
      await driver.delayMs(1000);
      logger.info(TAG, BUNDLE + 'ClickTaskPoolFunction_001 clickExecuteTask');
      // 点击Cancel task
      await driver.assertComponentExist(ON.id('cancel_task'));
      let parser = await driver.findComponent(ON.id('cancel_task'));
      await parser.click();
      await driver.delayMs(1000);
      logger.info(TAG, BUNDLE + 'ClickTaskPoolFunction_001 clickCancelTask');
      await driver.pressBack();
      done();
      logger.info(TAG, `${BUNDLE}TaskPool_001 end`);
    })

    // 进入Deque界面
    it(BUNDLE + 'deque_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE}deque_001 begin`);
      await driver.delayMs(200);
      // 滚动到Deque
      await driver.assertComponentExist(ON.id('menu_list'));
      let menuList = await driver.findComponent(ON.id('menu_list'));
      //find component on text 'Deque'
      let button = await menuList.scrollSearch(ON.text(await getResourceString($r('app.string.deque'))));
      await button.click();
      await driver.delayMs(200);
      //check text
      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.deque'))));
      await driver.delayMs(200);
      done();
      logger.info(TAG, `${BUNDLE}deque_001 end`);
    })

    // 新增数据
    it(BUNDLE + 'DequeAddFunction_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE} DequeAddFunction_001 begin`);
      await driver.delayMs(200);
      // 添加三条数据
      await addContact(driver, '1', '1');
      await addContact(driver, '2', '2');
      await addContact(driver, '3', '3');
      // 删除三条数据
      await deleteItem(driver, 'delete2');
      await deleteItem(driver, 'delete0');
      await deleteItem(driver, 'delete0');
      // 返回上一页
      await driver.pressBack();
      done();
      logger.info(TAG, `${BUNDLE} DequeAddFunction_001 end`);
    })

    // 进入HashMap界面
    it(BUNDLE + 'hash_map_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE}hash_map_001 begin`);
      await driver.delayMs(200);
      // 滚动到HashMap
      await driver.assertComponentExist(ON.id('menu_list'));
      let menuList = await driver.findComponent(ON.id('menu_list'));
      //find component on text 'HashMap'
      let button = await menuList.scrollSearch(ON.text(await getResourceString($r('app.string.hash_map'))));
      await button.click();
      await driver.delayMs(200);
      //check text
      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.hash_map'))));
      await driver.delayMs(200);
      done();
      logger.info(TAG, `${BUNDLE}hash_map_001 end`);
    })

    // 新增数据
    it(BUNDLE + 'HashMapAddFunction_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE} HashMapAddFunction_001 begin`);
      await driver.delayMs(200);
      // 添加三条数据
      await addKeyValue(driver, '1', '1');
      await addKeyValue(driver, '2', '2');
      await addKeyValue(driver, '3', '3');
      // 删除三条数据
      await deleteItem(driver, 'delete0');
      await deleteItem(driver, 'delete0');
      await deleteItem(driver, 'delete0');
      // 返回上一页
      await driver.pressBack();
      done();
      logger.info(TAG, `${BUNDLE} HashMapAddFunction_001 end`);
    })

    // 进入HashSet界面
    it(BUNDLE + 'hash_set_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE}hash_set_001 begin`);
      await driver.delayMs(200);
      // 滚动到HashSet
      await driver.assertComponentExist(ON.id('menu_list'));
      let menuList = await driver.findComponent(ON.id('menu_list'));
      //find component on text 'HashSet'
      let button = await menuList.scrollSearch(ON.text(await getResourceString($r('app.string.hash_set'))));
      await button.click();
      await driver.delayMs(200);
      //check text
      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.hash_set'))));
      await driver.delayMs(200);
      done();
      logger.info(TAG, `${BUNDLE}hash_set_001 end`);
    })

    // 新增数据
    it(BUNDLE + 'HashSetAddFunction_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE} HashSetAddFunction_001 begin`);
      await driver.delayMs(200);
      // 添加三条数据
      await addValue(driver, '1');
      await addValue(driver, '2');
      await addValue(driver, '3');
      // 删除三条数据
      await deleteItem(driver, 'delete0');
      await deleteItem(driver, 'delete0');
      await deleteItem(driver, 'delete0');
      // 返回上一页
      await driver.pressBack();
      done();
      logger.info(TAG, `${BUNDLE} HashSetAddFunction_001 end`);
    })

    // 进入LightWeightMap界面
    it(BUNDLE + 'light_weight_map_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE}light_weight_map_001 begin`);
      await driver.delayMs(200);
      // 滚动到LightWeightMap
      await driver.assertComponentExist(ON.id('menu_list'));
      let menuList = await driver.findComponent(ON.id('menu_list'));
      //find component on text 'LightWeightMap'
      let button = await menuList.scrollSearch(ON.text(await getResourceString($r('app.string.light_weight_map'))));
      await button.click();
      await driver.delayMs(200);
      //check text
      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.light_weight_map'))));
      await driver.delayMs(200);
      done();
      logger.info(TAG, `${BUNDLE}light_weight_map_001 end`);
    })

    // 新增数据
    it(BUNDLE + 'LightWeightMapAddFunction_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE} LightWeightMapAddFunction_001 begin`);
      await driver.delayMs(200);
      // 添加三条数据
      await addKeyValue(driver, '1', '1');
      await addKeyValue(driver, '2', '2');
      await addKeyValue(driver, '3', '3');
      // 删除三条数据
      await deleteItem(driver, 'delete0');
      await deleteItem(driver, 'delete0');
      await deleteItem(driver, 'delete0');
      // 返回上一页
      await driver.pressBack();
      done();
      logger.info(TAG, `${BUNDLE} LightWeightMapAddFunction_001 end`);
    })

    // 进入LightWeightSet界面
    it(BUNDLE + 'light_weight_set_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE}light_weight_set_001 begin`);
      await driver.delayMs(200);
      // 滚动到LightWeightSet
      await driver.assertComponentExist(ON.id('menu_list'));
      let menuList = await driver.findComponent(ON.id('menu_list'));
      //find component on text 'LightWeightSet'
      let button = await menuList.scrollSearch(ON.text(await getResourceString($r('app.string.light_weight_set'))));
      await button.click();
      await driver.delayMs(200);
      //check text
      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.light_weight_set'))));
      await driver.delayMs(200);
      done();
      logger.info(TAG, `${BUNDLE}light_weight_set_001 end`);
    })

    // 新增数据
    it(BUNDLE + 'LightWeightSetAddFunction_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE} LightWeightSetAddFunction_001 begin`);
      await driver.delayMs(200);
      // 添加三条数据
      await addValue(driver, '1');
      await addValue(driver, '2');
      await addValue(driver, '3');
      // 删除三条数据
      await deleteItem(driver, 'delete0');
      await deleteItem(driver, 'delete0');
      await deleteItem(driver, 'delete0');
      // 返回上一页
      await driver.pressBack();
      done();
      logger.info(TAG, `${BUNDLE} LightWeightSetAddFunction_001 end`);
    })

    // 进入LinkedList界面
    it(BUNDLE + 'linked_list_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE}linked_list_001 begin`);
      await driver.delayMs(200);
      // 滚动到LinkedList
      await driver.assertComponentExist(ON.id('menu_list'));
      let menuList = await driver.findComponent(ON.id('menu_list'));
      //find component on text 'LinkedList'
      let button = await menuList.scrollSearch(ON.text(await getResourceString($r('app.string.linked_list'))));
      await button.click();
      await driver.delayMs(200);
      //check text
      await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.linked_list'))));
      await driver.delayMs(200);
      done();
      logger.info(TAG, `${BUNDLE}linked_list_001 end`);
    })

    // 新增数据
    it(BUNDLE + 'LinkedListAddFunction_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE} LinkedListAddFunction_001 begin`);
      await driver.delayMs(200);
      // 添加三条数据
      await addContact(driver, '1', '1');
      await addContact(driver, '2', '2');
      await addContact(driver, '3', '3');
      // 删除三条数据
      await deleteItem(driver, 'delete2');
      await deleteItem(driver, 'delete0');
      await deleteItem(driver, 'delete0');
      // 返回上一页
      await driver.pressBack();
      done();
      logger.info(TAG, `${BUNDLE} LinkedListAddFunction_001 end`);
    })

    // 进入List页面
    it(BUNDLE + 'list_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE} list_001 begin`);
      await driver.delayMs(200);
      //find component on text 'list'
      let scrollBar = await driver.findComponent(ON.id('menu_list'));
      let button = await scrollBar.scrollSearch(ON.text(await getResourceString($r('app.string.list'))));
      await button.click()
      await driver.delayMs(200);
      // list添加数据
      await addContact(driver, '1', '1');
      await addContact(driver, '2', '2');
      await addContact(driver, '3', '3');
      // list删除数据
      await deleteItem(driver, 'delete2')
      await deleteItem(driver, 'delete1')
      await deleteItem(driver, 'delete0')
      await driver.pressBack();
      await driver.delayMs(3000);
      done();
      logger.info(TAG, `${BUNDLE} list_001 end`);
    })

    // 进入plain_array页面
    it(BUNDLE + 'plain_array_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE} plain_array_001 begin`);
      await driver.delayMs(200);
      //find component on text 'plain_array'
      let scrollBar = await driver.findComponent(ON.id('menu_list'));
      let button = await scrollBar.scrollSearch(ON.text(await getResourceString($r('app.string.plain_array'))));
      await button.click()
      await driver.delayMs(200);
      // PlainArray添加数据
      await addKeyValue(driver, '1', '1');
      await addKeyValue(driver, '2', '2');
      await addKeyValue(driver, '3', '3');
      // PlainArray删除数据
      await deleteItem(driver, 'delete2')
      await deleteItem(driver, 'delete1')
      await deleteItem(driver, 'delete0')
      await driver.pressBack();
      await driver.delayMs(3000);
      done();
      logger.info(TAG, `${BUNDLE} plain_array_001 end`);
    })

    // 进入queue页面
    it(BUNDLE + 'queue_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE} queue_001 begin`);
      await driver.delayMs(200);
      //find component on text 'queue'
      let scrollBar = await driver.findComponent(ON.id('menu_list'));
      let button = await scrollBar.scrollSearch(ON.text(await getResourceString($r('app.string.queue'))));
      await button.click()
      await driver.delayMs(200);
      // queue添加数据
      await addContact(driver, '1', '1');
      await addContact(driver, '2', '2');
      await addContact(driver, '3', '3');
      // queue删除数据
      await deleteItem(driver, 'delete0')
      await deleteItem(driver, 'delete0')
      await deleteItem(driver, 'delete0')
      await driver.pressBack();
      await driver.delayMs(3000);
      done();
      logger.info(TAG, `${BUNDLE} queue_001 end`);
    })

    // 进入stack页面
    it(BUNDLE + 'stack_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE} stack_001 begin`);
      await driver.delayMs(200);
      // find component on text 'stack'
      let scrollBar = await driver.findComponent(ON.id('menu_list'));
      let button = await scrollBar.scrollSearch(ON.text(await getResourceString($r('app.string.stack'))));
      await button.click()
      await driver.delayMs(200);
      // stack添加数据
      await addContact(driver, '1', '1');
      await addContact(driver, '2', '2');
      await addContact(driver, '3', '3');
      // stack删除数据
      await deleteItem(driver, 'delete2')
      await deleteItem(driver, 'delete1')
      await deleteItem(driver, 'delete0')
      await driver.pressBack();
      await driver.delayMs(3000);
      done();
      logger.info(TAG, `${BUNDLE} stack_001 end`);
    })

    // 进入tree_map页面
    it(BUNDLE + 'tree_map_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE} tree_map_001 begin`);
      await driver.delayMs(200);
      //find component on text 'tree_map'
      let scrollBar = await driver.findComponent(ON.id('menu_list'));
      let button = await scrollBar.scrollSearch(ON.text(await getResourceString($r('app.string.tree_map'))));
      await button.click()
      await driver.delayMs(200);
      // tree_map添加数据
      await addKeyValue(driver, '1', '1');
      await addKeyValue(driver, '2', '2');
      await addKeyValue(driver, '3', '3');
      // tree_map删除数据
      await deleteItem(driver, 'delete2')
      await deleteItem(driver, 'delete1')
      await deleteItem(driver, 'delete0')
      await driver.pressBack();
      await driver.delayMs(3000);
      done();
      logger.info(TAG, `${BUNDLE} tree_map_001 end`);
    })

    // 进入tree_set页面
    it(BUNDLE + 'tree_set_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE} tree_set_001 begin`);
      await driver.delayMs(200);
      //find component on text 'tree_set'
      let scrollBar = await driver.findComponent(ON.id('menu_list'));
      let button = await scrollBar.scrollSearch(ON.text(await getResourceString($r('app.string.tree_set'))));
      await button.click()
      await driver.delayMs(200);
      // tree_set添加数据
      await addValue(driver, '1');
      await addValue(driver, '2');
      await addValue(driver, '3');
      // tree_set删除数据
      await deleteItem(driver, 'delete2')
      await deleteItem(driver, 'delete1')
      await deleteItem(driver, 'delete0')
      await driver.pressBack();
      await driver.delayMs(3000);
      done();
      logger.info(TAG, `${BUNDLE} tree_set_001 end`);
    })

    // 进入vector页面
    it(BUNDLE + 'vector_001', 0, async (done: Function) => {
      logger.info(TAG, `${BUNDLE} vector_001 begin`);
      await driver.delayMs(200);
      //find component on text 'vector'
      let scrollBar = await driver.findComponent(ON.id('menu_list'));
      let button = await scrollBar.scrollSearch(ON.text(await getResourceString($r('app.string.vector'))));
      await button.click()
      await driver.delayMs(200);
      // vector添加数据
      await addContact(driver, '1', '1');
      await addContact(driver, '2', '2');
      await addContact(driver, '3', '3');
      // vector删除数据
      await deleteItem(driver, 'delete2')
      await deleteItem(driver, 'delete1')
      await deleteItem(driver, 'delete0')
      await driver.pressBack();
      await driver.delayMs(3000);
      done();
      logger.info(TAG, `${BUNDLE} vector_001 end`);
    })
  })
}