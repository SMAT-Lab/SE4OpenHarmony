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
import { Driver, ON } from '@ohos.UiTest'
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry'
import Logger from '../../../main/ets/model/Logger'

const TAG = '[Sample_Huks]'
const BUNDLE = 'Huks_'

// 返回首页
async function backToIndexPage(driver: Driver) {
  Logger.info(TAG, BUNDLE + 'backToIndexPage begin')
  await driver.pressBack();
  await driver.delayMs(500)
  await driver.assertComponentExist(ON.id('new_key'))
  await driver.assertComponentExist(ON.id('old_key'))
  Logger.info(TAG, BUNDLE + 'backToIndexPage end')
}

export default function abilityTest() {
  let driver = Driver.create();
  describe('ActsAbilityTest',  () => {
    /**
     * 拉起应用
     */
    it(BUNDLE + 'StartAbility_001', 0, async (done: Function) => {
      Logger.info(TAG, BUNDLE + 'StartAbility_001 begin');
      let abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator();
      try {
        await abilityDelegator.startAbility({
          bundleName: 'com.samples.huks',
          abilityName: 'EntryAbility'
        });
        done();
      } catch (exception) {
        Logger.info(TAG, `StartAbility_001 exception = ${JSON.stringify(exception)}`);
        expect().assertFail();
      }
      Logger.info(TAG, 'StartAbility_001 end');
    })

    /**
     * 使用HUKS生成的新密钥进行加密
     */
    it(BUNDLE + 'CipherByNewKeyFunction_001', 0, async (done: Function) => {
      Logger.info(TAG, BUNDLE + 'CipherByNewKeyFunction_001 begin');
      // 点击新密钥按钮，跳转至使用新密钥进行加解密页面
      Logger.info(TAG, BUNDLE + 'CipherByNewKeyFunction_001 encryption');
      await driver.delayMs(1000);
      await driver.assertComponentExist(ON.id('new_key'));
      let encryption = await driver.findComponent(ON.id('new_key'));
      await encryption.click();
      // 未输入发送的消息内容时，点击发送按钮，弹出toast弹窗提示信息：This message is null,toast弹窗信息暂不支持测试
      await driver.assertComponentExist(ON.id('encryptionBtn'));
      let encryptionBtn = await driver.findComponent(ON.id('encryptionBtn'));
      await encryptionBtn.click();
      // 输入要发送的消息内容进行加密
      Logger.info(TAG, BUNDLE + 'CipherByNewKeyFunction_001 input encryption content');
      await driver.assertComponentExist(ON.id('encryptionInput'));
      let encryptionInput = await driver.findComponent(ON.id('encryptionInput'));
      await encryptionInput.inputText('test');
      let encryptionContent = await encryptionInput.getText();
      Logger.info(TAG, BUNDLE + `CipherByNewKeyFunction_001 select encryptionContent:${encryptionContent}`);
      expect(encryptionContent).assertEqual('test');
      // 点击发送按钮进行加密并发送密文消息
      await encryptionBtn.click();
      // 文本框显示加密后的消息内容
      Logger.info(TAG, BUNDLE + 'CipherByNewKeyFunction_001 show encryption content');
      await driver.assertComponentExist(ON.id('encryptionInfo'));
      let encryptionInfo = await driver.findComponent(ON.id('encryptionInfo'));
      let encryptionMessage = await encryptionInfo.getText();
      Logger.info(TAG, BUNDLE + `CipherByNewKeyFunction_001 select encryptionMessage:${encryptionMessage}`);
      expect(encryptionMessage === 'test').assertFalse();
      Logger.info(TAG, BUNDLE + 'CipherByNewKeyFunction_001 end');
      done();
    })

    /**
     * 使用HUKS生成的新密钥进行解密
     */
    it(BUNDLE + 'CipherByNewKeyFunction_002', 0, async (done: Function) => {
      Logger.info(TAG, BUNDLE + 'CipherByNewKeyFunction_002 begin');
      // 点击接收消息对发送的消息密文进行解密
      Logger.info(TAG, BUNDLE + 'CipherByNewKeyFunction_001 decryption');
      await driver.assertComponentExist(ON.id('decryptionBtn'));
      let decryptBtn = await driver.findComponent(ON.id('decryptionBtn'));
      await decryptBtn.click();
      // 文本框显示解密后的消息内容
      Logger.info(TAG, BUNDLE + 'CipherByNewKeyFunction_002 show decrypt message');
      await driver.assertComponentExist(ON.id('decryptionInfo'));
      let decryptInfo = await driver.findComponent(ON.id('decryptionInfo'));
      let decryptMessage = await decryptInfo.getText();
      Logger.info(TAG, BUNDLE + `CipherByNewKeyFunction_002 select decryptMessage:${decryptMessage}`);
      expect(decryptMessage).assertEqual('test');
      // 返回首页
      await backToIndexPage(driver);
      Logger.info(TAG, BUNDLE + 'CipherByNewKeyFunction_002 end');
      done();
    })

    /**
     * 使用HUKS导入的旧密钥进行加密
     */
    it(BUNDLE + 'CipherByOldKeyFunction_001', 0, async (done: Function) => {
      Logger.info(TAG, BUNDLE + 'CipherByOldKeyFunction_001 begin');
      // 点击新密钥按钮，跳转至使用新密钥进行加解密页面
      Logger.info(TAG, BUNDLE + 'CipherByOldKeyFunction_001 encryption');
      await driver.delayMs(500);
      await driver.assertComponentExist(ON.id('old_key'));
      let encryption = await driver.findComponent(ON.id('old_key'));
      await encryption.click();
      // 未输入发送的消息内容时，点击发送按钮，弹出toast弹窗提示信息：This message is null,toast弹窗信息暂不支持测试
      await driver.assertComponentExist(ON.id('encryptionBtn'));
      let encryptionBtn = await driver.findComponent(ON.id('encryptionBtn'));
      await encryptionBtn.click();
      // 输入要发送的消息内容进行加密
      Logger.info(TAG, BUNDLE + 'CipherByOldKeyFunction_001 input encryption content');
      await driver.assertComponentExist(ON.id('encryptionInput'));
      let encryptionInput = await driver.findComponent(ON.id('encryptionInput'));
      await encryptionInput.inputText('test');
      let encryptionContent = await encryptionInput.getText();
      Logger.info(TAG, BUNDLE + `CipherByOldKeyFunction_001 select encryptionContent:${encryptionContent}`);
      expect(encryptionContent).assertEqual('test');
      // 点击发送按钮进行加密并发送密文消息
      await encryptionBtn.click();
      // 文本框显示加密后的消息内容
      Logger.info(TAG, BUNDLE + 'CipherByOldKeyFunction_001 show encryption content');
      await driver.assertComponentExist(ON.id('encryptionInfo'));
      let encryptionInfo = await driver.findComponent(ON.id('encryptionInfo'));
      let encryptionMessage = await encryptionInfo.getText();
      Logger.info(TAG, BUNDLE + `CipherByOldKeyFunction_001 select encryptionMessage:${encryptionMessage}`);
      expect(encryptionMessage === 'test').assertFalse();
      Logger.info(TAG, BUNDLE + 'CipherByOldKeyFunction_001 end');
      done();
    })

    /**
     * 使用HUKS导入的旧密钥进行解密
     */
    it(BUNDLE + 'CipherByOldKeyFunction_002', 0, async (done: Function) => {
      Logger.info(TAG, BUNDLE + 'CipherByOldKeyFunction_002 begin');
      // 点击新密钥按钮，跳转至使用新密钥进行加解密页面
      Logger.info(TAG, BUNDLE + 'CipherByOldKeyFunction_002 decryption');
      // 点击导入按钮导入旧密钥
      await driver.assertComponentExist(ON.id('importKeyBtn'));
      let importKeyBtn = await driver.findComponent(ON.id('importKeyBtn'));
      await importKeyBtn.click();
      await driver.delayMs(500);
      // 点击接收消息对发送的消息密文进行解密
      await driver.assertComponentExist(ON.id('decryptionBtn'));
      let decryptBtn = await driver.findComponent(ON.id('decryptionBtn'));
      await decryptBtn.click();
      await driver.delayMs(500);
      // 文本框显示解密后的消息内容
      Logger.info(TAG, BUNDLE + 'CipherByOldKeyFunction_002 show decrypt message');
      await driver.assertComponentExist(ON.id('decryptionInfo'));
      let decryptInfo = await driver.findComponent(ON.id('decryptionInfo'));
      let decryptMessage = await decryptInfo.getText();
      Logger.info(TAG, BUNDLE + `CipherByOldKeyFunction_002 select decryptMessage:${decryptMessage}`);
      expect(decryptMessage).assertEqual('test');
      // 返回首页
      await backToIndexPage(driver);
      Logger.info(TAG, BUNDLE + 'CipherByOldKeyFunction_002 end');
      done();
    })

    /**
     * 使用HUKS进行低安访问控制加密
     */
    it(BUNDLE + 'MinAccessControlFunction_001', 0, async (done: Function) => {
      Logger.info(TAG, BUNDLE + 'MinAccessControlFunction_001 begin');
      // 点击低安访问控制按钮，跳转至使用低安访问控制页面
      Logger.info(TAG, BUNDLE + 'MinAccessControlFunction_001 encryption');
      await driver.delayMs(1000);
      await driver.assertComponentExist(ON.id('min_access_control'));
      let encryption = await driver.findComponent(ON.id('min_access_control'));
      await encryption.click();
      await driver.delayMs(1000);
      // 未输入发送的消息内容时，点击发送按钮，弹出toast弹窗提示信息：This message is null,toast弹窗信息暂不支持测试
      await driver.assertComponentExist(ON.id('save_password'));
      let encryptionBtn = await driver.findComponent(ON.id('save_password'));
      await encryptionBtn.click();
      await driver.delayMs(1000);
      Logger.info(TAG, BUNDLE + 'MinAccessControlFunction_001 input encryption content');
      await driver.assertComponentExist(ON.id('passwordInput'));
      let encryptionInput = await driver.findComponent(ON.id('passwordInput'));
      await encryptionInput.inputText('test');
      await driver.delayMs(1000);
      let encryptionContent = await encryptionInput.getText();
      Logger.info(TAG, BUNDLE + `MinAccessControlFunction_001 select encryptionContent:${encryptionContent}`);
      expect(encryptionContent).assertEqual('test');
      // 点击发送按钮进行加密并发送密文消息
      await encryptionBtn.click();
      await driver.delayMs(1000);
      // 文本框显示加密后的消息内容
      Logger.info(TAG, BUNDLE + 'MinAccessControlFunction_001 show encryption content');
      await driver.assertComponentExist(ON.id('cipherTextinfo'));
      let encryptionInfo = await driver.findComponent(ON.id('cipherTextinfo'));
      let encryptionMessage = await encryptionInfo.getText();
      Logger.info(TAG, BUNDLE + `MinAccessControlFunction_001 select encryptionMessage:${encryptionMessage}`);
      expect(encryptionMessage === 'test').assertFalse();
      Logger.info(TAG, BUNDLE + 'MinAccessControlFunction_001 end');
      done();
    })

  })
}