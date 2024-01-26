let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
}
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
import Logger from '../../../main/ets/model/Logger';
const TAG = '[Sample_Cipher]';
const BUNDLE = 'Cipher_';
// 选择AES加/解密算法
async function selectAESAlgorithm() {
    Logger.info(TAG, BUNDLE + 'selectAESAlgorithm begin');
    let driver = Driver.create();
    await driver.delayMs(200);
    await driver.assertComponentExist(ON.text('AES'));
    let aesAlgorithm = await driver.findComponent(ON.text('AES'));
    await aesAlgorithm.click();
    await driver.delayMs(200);
    Logger.info(TAG, BUNDLE + 'selectAESAlgorithm end');
}
// 返回首页
async function backToIndexPage() {
    Logger.info(TAG, BUNDLE + 'backToIndexPage begin');
    let driver = Driver.create();
    await driver.delayMs(200);
    await driver.assertComponentExist(ON.id('back'));
    let btnBack = await driver.findComponent(ON.id('back'));
    await btnBack.click();
    await driver.delayMs(200);
    await driver.assertComponentExist(ON.id('encryption'));
    await driver.assertComponentExist(ON.id('decrypt'));
    Logger.info(TAG, BUNDLE + 'backToIndexPage end');
}
export default function abilityTest() {
    describe('ActsAbilityTest', () => {
        /**
         * 拉起应用
         */
        it(BUNDLE + 'StartAbility_001', 0, async (done: Function) => {
            Logger.info(TAG, BUNDLE + 'StartAbility_001 begin');
            let abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator();
            try {
                await abilityDelegator.startAbility({
                    bundleName: 'ohos.samples.cipher',
                    abilityName: 'EntryAbility'
                });
                done();
            }
            catch (exception) {
                Logger.info(TAG, `StartAbility_001 exception = ${JSON.stringify(exception)}`);
                expect().assertFail();
            }
        });
        /**
         * 加密
         */
        it(BUNDLE + 'EncryptionFunction_001', 0, async () => {
            Logger.info(TAG, BUNDLE + 'EncryptionFunction_001 begin');
            let driver = Driver.create();
            await driver.delayMs(200);
            // 点击加密按钮，跳转至加密页面
            Logger.info(TAG, BUNDLE + 'EncryptionFunction_001 encryption');
            await driver.assertComponentExist(ON.id('encryption'));
            let encryption = await driver.findComponent(ON.id('encryption'));
            await encryption.click();
            await driver.delayMs(200);
            // 点击选择加密算法
            Logger.info(TAG, BUNDLE + 'EncryptionFunction_001 select encryption algorithm');
            await driver.assertComponentExist(ON.id('encryptionAlgorithm'));
            let selectAlgorithm = await driver.findComponent(ON.id('encryptionAlgorithm'));
            await selectAlgorithm.click();
            await driver.delayMs(200);
            // 选择AES加密算法
            await selectAESAlgorithm();
            // 未输入加密内容时，点击加密按钮，弹出toast弹窗提示信息：This message is null,toast弹窗信息暂不支持测试
            await driver.assertComponentExist(ON.id('encryptionBtn'));
            let encryptionBtn = await driver.findComponent(ON.id('encryptionBtn'));
            await encryptionBtn.click();
            await driver.delayMs(200);
            // 输入待加密内容
            Logger.info(TAG, BUNDLE + 'EncryptionFunction_001 input encryption content');
            await driver.assertComponentExist(ON.id('encryptionInput'));
            let encryptionInput = await driver.findComponent(ON.id('encryptionInput'));
            await encryptionInput.inputText('a');
            let encryptionContent = await encryptionInput.getText();
            Logger.info(TAG, BUNDLE + `EncryptionFunction_001 select encryptionContent:${encryptionContent}`);
            expect(encryptionContent).assertEqual('a');
            // 点击加密按钮进行加密
            await encryptionBtn.click();
            // 文本框显示加密后的内容
            Logger.info(TAG, BUNDLE + 'EncryptionFunction_001 show encryption content');
            await driver.assertComponentExist(ON.id('encryptionInfo'));
            let encryptionInfo = await driver.findComponent(ON.id('encryptionInfo'));
            let encryptionMessage = await encryptionInfo.getText();
            Logger.info(TAG, BUNDLE + `EncryptionFunction_001 select encryptionMessage:${encryptionMessage}`);
            expect(encryptionMessage).assertEqual('Encryption result is :  ZtJpi1Z5BwPPXqXYRHGthQ==');
            // 点击重置按钮清空加密内容
            Logger.info(TAG, BUNDLE + 'EncryptionFunction_001 clear encryption message');
            await driver.assertComponentExist(ON.id('encryptionResetBtn'));
            let encryptionResetBtn = await driver.findComponent(ON.id('encryptionResetBtn'));
            await encryptionResetBtn.click();
            await driver.delayMs(200);
            // 加密内容被清空
            let clearEncryptionMessage = await encryptionInfo.getText();
            Logger.info(TAG, BUNDLE + `EncryptionFunction_001 select clearEncryptionMessage:${clearEncryptionMessage}`);
            expect(clearEncryptionMessage).assertEqual('');
            await driver.delayMs(200);
            // 返回首页
            await backToIndexPage();
            Logger.info(TAG, BUNDLE + 'EncryptionFunction_001 end');
        });
        /**
         * 解密
         */
        it(BUNDLE + 'DecryptFunction_001', 0, async (done: Function) => {
            Logger.info(TAG, BUNDLE + 'DecryptFunction_001 begin');
            let driver = await Driver.create();
            await driver.delayMs(200);
            // 点击解密按钮，跳转至解密页面
            Logger.info(TAG, BUNDLE + 'DecryptFunction_001 decrypt');
            await driver.assertComponentExist(ON.id('decrypt'));
            let decrypt = await driver.findComponent(ON.id('decrypt'));
            await decrypt.click();
            await driver.delayMs(200);
            // 点击选择解密算法
            Logger.info(TAG, BUNDLE + 'EncryptionFunction_001 select encryption algorithm');
            await driver.assertComponentExist(ON.id('decryptAlgorithm'));
            let selectAlgorithm = await driver.findComponent(ON.id('decryptAlgorithm'));
            await selectAlgorithm.click();
            await driver.delayMs(200);
            // 选择AES解密算法
            await selectAESAlgorithm();
            // 未输入要解密的内容时，点击解密按钮，弹出toast弹窗提示信息：This message is null,toast弹窗信息暂不支持测试
            await driver.assertComponentExist(ON.id('decryptBtn'));
            let decryptBtn = await driver.findComponent(ON.id('decryptBtn'));
            await decryptBtn.click();
            await driver.delayMs(200);
            // 输入待解密内容
            Logger.info(TAG, BUNDLE + 'EncryptionFunction_001 input decrypt content');
            await driver.assertComponentExist(ON.id('decryptInput'));
            let decryptInput = await driver.findComponent(ON.id('decryptInput'));
            await decryptInput.inputText('ZtJpi1Z5BwPPXqXYRHGthQ==');
            let decryptContent = await decryptInput.getText();
            Logger.info(TAG, BUNDLE + `EncryptionFunction_001 select decryptContent:${decryptContent}`);
            expect(decryptContent).assertEqual('ZtJpi1Z5BwPPXqXYRHGthQ==');
            // 点击解密按钮进行解密
            await decryptBtn.click();
            // 文本框显示解密后的内容
            Logger.info(TAG, BUNDLE + 'EncryptionFunction_001 show decrypt message');
            await driver.assertComponentExist(ON.id('decryptInfo'));
            let decryptInfo = await driver.findComponent(ON.id('decryptInfo'));
            let decryptMessage = await decryptInfo.getText();
            Logger.info(TAG, BUNDLE + `EncryptionFunction_001 select decryptMessage:${decryptMessage}`);
            expect(decryptMessage).assertEqual('Decrypt result is :  a');
            // 点击重置按钮清空解密内容
            Logger.info(TAG, BUNDLE + 'EncryptionFunction_001 clear decrypt message');
            await driver.assertComponentExist(ON.id('decryptResetBtn'));
            let decryptResetBtn = await driver.findComponent(ON.id('decryptResetBtn'));
            await decryptResetBtn.click();
            await driver.delayMs(200);
            // 解密内容被清空
            let clearDecryptMessage = await decryptInfo.getText();
            Logger.info(TAG, BUNDLE + `EncryptionFunction_001 select clearDecryptMessage:${clearDecryptMessage}`);
            expect(clearDecryptMessage).assertEqual('');
            await driver.delayMs(200);
            // 返回首页
            await backToIndexPage();
            Logger.info(TAG, BUNDLE + 'DecryptFunction_001 end');
        });
    });
}
