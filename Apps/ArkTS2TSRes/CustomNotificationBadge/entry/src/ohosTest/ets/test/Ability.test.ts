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
import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import { Driver, ON } from '@ohos.UiTest';
import UIAbility from '@ohos.app.ability.UIAbility';
import Base from '@ohos.base';
const TAG: string = '[Samples_Badge]';
const DOMAIN = 0xF811;
const BUNDLE = 'Badge_';
let ability: UIAbility;
export default function abilityTest() {
    describe('ActsAbilityTest', () => {
        /**
         * 打开应用
         */
        it(BUNDLE + 'StartAbility_001', 0, async (done: Function) => {
            hilog.info(DOMAIN, TAG, BUNDLE + 'StartAbility_001 begin');
            let abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator();
            try {
                await abilityDelegator.startAbility({
                    bundleName: 'com.samples.customnotificationbadge',
                    abilityName: 'EntryAbility'
                });
                done();
            }
            catch (expection) {
                hilog.info(DOMAIN, TAG, 'StartAbility end err:' + JSON.stringify(expection as Base.BusinessError));
                expect(0).assertEqual(expection?.code);
                done();
            }
            ability = await abilityDelegator.getCurrentTopAbility();
            hilog.info(DOMAIN, TAG, BUNDLE + 'StartAbility_001 end');
        });
        /**
         * 获取权限
         */
        it(BUNDLE + 'RequestPermissionFunction_001', 1, async () => {
            hilog.info(DOMAIN, TAG, BUNDLE + 'RequestPermissionFunction_001 begin');
            let driver = Driver.create();
            await driver.delayMs(1000);
            // 获取允许
            hilog.info(DOMAIN, TAG, BUNDLE + 'RequestPermissionFunction_001 requestPermission');
            let resourceManager = ability.context.resourceManager;
            await driver.assertComponentExist(ON.text(await resourceManager.getStringValue($r('app.string.accept'))));
            let btnAccept = await driver.findComponent(ON.text(await resourceManager.getStringValue($r('app.string.accept'))));
            await driver.delayMs(200);
            await btnAccept.click();
            await driver.delayMs(200);
            hilog.info(DOMAIN, TAG, BUNDLE + 'RequestPermissionFunction_001 end');
        });
        /**
         * 发送基本类型通知
         */
        it(BUNDLE + 'BasicNotification_001', 1, async () => {
            hilog.info(DOMAIN, TAG, BUNDLE + 'BasicNotification_001 begin');
            let driver = Driver.create();
            await driver.delayMs(1000);
            let resourceManager = ability.context.resourceManager;
            await driver.assertComponentExist(ON.id('tabBar0'));
            await driver.assertComponentExist(ON.id('tabBar1'));
            let messages = await driver.findComponent(ON.id('tabBar0'));
            let notification = await driver.findComponent(ON.id('tabBar1'));
            await driver.delayMs(200);
            await notification.click();
            await driver.delayMs(200);
            await driver.assertComponentExist(ON.text(await resourceManager.getStringValue($r('app.string.basic_notification'))));
            let btnAccept = await driver.findComponent(ON.text(await resourceManager.getStringValue($r('app.string.basic_notification'))));
            await driver.delayMs(200);
            await btnAccept.click();
            await driver.delayMs(200);
            await messages.click();
            await driver.delayMs(2000);
            hilog.info(DOMAIN, TAG, BUNDLE + 'BasicNotification_001 end');
        });
        /**
         * 发送长文本类型通知
         */
        it(BUNDLE + 'LongTextNotification_001', 1, async () => {
            hilog.info(DOMAIN, TAG, BUNDLE + 'LongTextNotification_001 begin');
            let driver = Driver.create();
            await driver.delayMs(1000);
            let resourceManager = ability.context.resourceManager;
            await driver.assertComponentExist(ON.id('tabBar0'));
            await driver.assertComponentExist(ON.id('tabBar1'));
            let messages = await driver.findComponent(ON.id('tabBar0'));
            let notification = await driver.findComponent(ON.id('tabBar1'));
            await driver.delayMs(200);
            await notification.click();
            await driver.delayMs(200);
            await driver.assertComponentExist(ON.text(await resourceManager.getStringValue($r('app.string.long_text_notification'))));
            let btnAccept = await driver.findComponent(ON.text(await resourceManager.getStringValue($r('app.string.long_text_notification'))));
            await driver.delayMs(200);
            await btnAccept.click();
            await driver.delayMs(200);
            await driver.delayMs(200);
            await messages.click();
            await driver.delayMs(2000);
            hilog.info(DOMAIN, TAG, BUNDLE + 'LongTextNotification_001 end');
        });
        /**
         * 发送多行文本类型通知
         */
        it(BUNDLE + 'MultilineNotification_001', 1, async () => {
            hilog.info(DOMAIN, TAG, BUNDLE + 'MultilineNotification_001 begin');
            let driver = Driver.create();
            await driver.delayMs(1000);
            let resourceManager = ability.context.resourceManager;
            await driver.assertComponentExist(ON.id('tabBar0'));
            await driver.assertComponentExist(ON.id('tabBar1'));
            let messages = await driver.findComponent(ON.id('tabBar0'));
            let notification = await driver.findComponent(ON.id('tabBar1'));
            await driver.delayMs(200);
            await notification.click();
            await driver.delayMs(200);
            await driver.assertComponentExist(ON.text(await resourceManager.getStringValue($r('app.string.multiline_notification'))));
            let btnAccept = await driver.findComponent(ON.text(await resourceManager.getStringValue($r('app.string.multiline_notification'))));
            await driver.delayMs(200);
            await btnAccept.click();
            await driver.delayMs(200);
            await messages.click();
            await driver.delayMs(2000);
            hilog.info(DOMAIN, TAG, BUNDLE + 'MultilineNotification_001 end');
        });
        /**
         * 发送图片类型通知
         */
        it(BUNDLE + 'PictureNotification_001', 1, async () => {
            hilog.info(DOMAIN, TAG, BUNDLE + 'PictureNotification_001 begin');
            let driver = Driver.create();
            await driver.delayMs(1000);
            let resourceManager = ability.context.resourceManager;
            await driver.assertComponentExist(ON.id('tabBar0'));
            await driver.assertComponentExist(ON.id('tabBar1'));
            let messages = await driver.findComponent(ON.id('tabBar0'));
            let notification = await driver.findComponent(ON.id('tabBar1'));
            await driver.delayMs(200);
            await notification.click();
            await driver.delayMs(200);
            await driver.assertComponentExist(ON.text(await resourceManager.getStringValue($r('app.string.picture_notification'))));
            let btnAccept = await driver.findComponent(ON.text(await resourceManager.getStringValue($r('app.string.picture_notification'))));
            await driver.delayMs(200);
            await btnAccept.click();
            await driver.delayMs(200);
            await driver.delayMs(200);
            await messages.click();
            await driver.delayMs(2000);
            hilog.info(DOMAIN, TAG, BUNDLE + 'PictureNotification_001 end');
        });
    });
}
