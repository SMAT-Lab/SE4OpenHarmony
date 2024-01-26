let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
}
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
import { describe, it, expect } from '@ohos/hypium';
import { Driver, ON } from '@ohos.UiTest';
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import Logger from '../../../main/ets/util/Logger';
const TAG = '[Sample_Crypto_Framework]';
const BUNDLE = 'cryptoframework_';
const TAB_ENCRYPT = '0';
const TAB_DECRYPT = '1';
const TAB_SIGN = '2';
const TAB_VERIFY = '3';
export default function abilityTest() {
    let driver = Driver.create();
    describe('ActsAbilityTest', () => {
        /**
         * 拉起应用
         */
        it(BUNDLE + 'StartAbility_001', 0, async (done: Function) => {
            Logger.info(TAG, BUNDLE + 'StartAbility_001 begin');
            let abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator();
            try {
                await abilityDelegator.startAbility({
                    bundleName: 'com.samples.cryptoframework',
                    abilityName: 'EntryAbility'
                });
                done();
            }
            catch (exception) {
                expect().assertFail();
            }
            Logger.info(TAG, 'StartAbility_001 end');
            done();
        });
        /**
         * 使用cryptoFramework进行加密
         */
        it(BUNDLE + 'CipherEncrypt_001', 0, async (done: Function) => {
            Logger.info(TAG, BUNDLE + 'CipherEncrypt_001 begin');
            Logger.info(TAG, BUNDLE + 'CipherEncrypt_001 encryption');
            await driver.delayMs(1000);
            // 界面选择为加密
            await driver.assertComponentExist(ON.id(TAB_ENCRYPT));
            let tabButton = await driver.findComponent(ON.id(TAB_ENCRYPT));
            await tabButton.click();
            // 未选择文本文件和密钥文件时，点击解密按钮，弹出弹窗提示信息：message or key is null,toast弹窗信息暂不支持测试
            await driver.assertComponentExist(ON.id('encryptionBtn'));
            let encryptionBtn = await driver.findComponent(ON.id('encryptionBtn'));
            await encryptionBtn.click();
            done();
        });
        /**
         * 使用cryptoFramework进行解密
         */
        it(BUNDLE + 'CipherDecrypt_001', 0, async (done: Function) => {
            Logger.info(TAG, BUNDLE + 'CipherDecrypt_001 begin');
            Logger.info(TAG, BUNDLE + 'CipherDecrypt_001 decryption');
            await driver.delayMs(1000);
            // 界面选择为加密
            await driver.assertComponentExist(ON.id(TAB_DECRYPT));
            let tabButton = await driver.findComponent(ON.id(TAB_DECRYPT));
            await tabButton.click();
            // 未选择文本文件和密钥文件时，点击解密按钮，弹出弹窗提示信息：message or key is null,toast弹窗信息暂不支持测试
            await driver.assertComponentExist(ON.id('decryptionBtn'));
            let decryptionBtn = await driver.findComponent(ON.id('decryptionBtn'));
            await decryptionBtn.click();
            done();
        });
        /**
         * 使用cryptoFramework进行签名
         */
        it(BUNDLE + 'Sign_001', 0, async (done: Function) => {
            Logger.info(TAG, BUNDLE + 'Sign_001 begin');
            Logger.info(TAG, BUNDLE + 'Sign_001 sign');
            await driver.delayMs(1000);
            // 界面选择为加密
            await driver.assertComponentExist(ON.id(TAB_SIGN));
            let tabButton = await driver.findComponent(ON.id(TAB_SIGN));
            await tabButton.click();
            // 未选择文本文件和密钥文件时，点击签名按钮，弹出弹窗提示信息：message or key is null,toast弹窗信息暂不支持测试
            await driver.assertComponentExist(ON.id('signBtn'));
            let signBtn = await driver.findComponent(ON.id('signBtn'));
            await signBtn.click();
            done();
        });
        /**
         * 使用cryptoFramework进行验签
         */
        it(BUNDLE + 'Verify_001', 0, async (done: Function) => {
            Logger.info(TAG, BUNDLE + 'Verify_001 begin');
            Logger.info(TAG, BUNDLE + 'Verify_001 verify');
            // 界面选择为加密
            await driver.assertComponentExist(ON.id(TAB_VERIFY));
            let tabButton = await driver.findComponent(ON.id(TAB_VERIFY));
            await tabButton.click();
            // 未选择文本文件和密钥文件和签名文件时，点击验签按钮，弹出弹窗提示信息：message or key is null,toast弹窗信息暂不支持测试
            await driver.assertComponentExist(ON.id('verifyBtn'));
            let verifyBtn = await driver.findComponent(ON.id('verifyBtn'));
            await verifyBtn.click();
            done();
        });
    });
}
