let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Shenzhen Kaihong Digital Industry Development Co., Ltd.
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
import { Driver, ON } from '@ohos.UiTest';
import common from '@ohos.app.ability.common';
const TAG = '[Sample_BackupExtension]';
const BUNDLE = 'BackupExtension_';
export default function abilityTest() {
    describe('ActsAbilityTest', () => {
        /**
         * 打开应用
         */
        it(BUNDLE + 'StartAbility_001', 0, async (done: Function) => {
            console.info(TAG, BUNDLE + 'StartAbility_001 begin');
            let driver = Driver.create();
            let abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator();
            try {
                await abilityDelegator.startAbility({
                    bundleName: 'com.samples.backupextension',
                    abilityName: 'EntryAbility'
                });
            }
            catch (exception) {
                console.info(TAG, `StartAbility_001 exception = ${JSON.stringify(exception)}`);
                expect().assertFail();
            }
            console.info(TAG, BUNDLE + 'StartAbility_001 end');
            await driver.delayMs(1000);
            let resource = $r('app.string.fileData').id;
            let str = '';
            try {
                let context = getContext() as common.UIAbilityContext;
                context.resourceManager.getStringValue(resource, (error, value) => {
                    if (error != null) {
                        console.log("error is " + error);
                    }
                    else {
                        str = value;
                    }
                });
            }
            catch (error) {
                console.error(`callback getStringValue failed, error code: ${error?.code}, message: ${error?.message}.`);
            }
            await driver.assertComponentExist(ON.text(str));
            await driver.assertComponentExist(ON.id('file0'));
            done();
        });
        /**
         * 点击按钮生成文件
         */
        it(BUNDLE + 'CreateFiles_001', 2, async () => {
            console.info(TAG, BUNDLE + 'CreateFiles_001 begin');
            let driver = Driver.create();
            // 判断是否有按键
            await driver.assertComponentExist(ON.id('createFiles'));
            let createFilesBtn = await driver.findComponent(ON.id('createFiles'));
            // 点击生成文件按钮
            await createFilesBtn.click();
            await driver.delayMs(1000);
            await driver.assertComponentExist(ON.id('size0'));
            console.info(TAG, BUNDLE + 'CreateFiles_001 end');
        });
    });
}
