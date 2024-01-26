let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
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
const TAG = '[Sample_Scan]';
const DOMAIN = 0xF811;
const BUNDLE = 'Scan_';
let abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator();
async function getResourceString(resource: Resource): Promise<string> {
    let manage = abilityDelegator.getAppContext().resourceManager;
    let text = await manage.getStringValue(resource);
    return text;
}
export default function abilityTest() {
    describe('ActsAbilityTest', () => {
        /**
         * 拉起应用
         */
        it(BUNDLE + 'StartAbility_001 begin', 0, async (done: () => void) => {
            hilog.info(DOMAIN, TAG, BUNDLE + 'StartAbility_001 begin');
            try {
                await abilityDelegator.startAbility({
                    bundleName: "com.samples.appsamplef",
                    abilityName: "EntryAbility"
                });
                done();
            }
            catch (err) {
                expect(err.code).assertEqual(0);
                done();
            }
            hilog.info(DOMAIN, TAG, BUNDLE + 'StartAbility_001 end');
        });
        /**
         * 点击进入相机页面
         */
        it(BUNDLE + 'GotoScanFunction_001', 0, async () => {
            // create UiDriver
            hilog.info(DOMAIN, TAG, BUNDLE + 'GotoScanFunction_001 begin');
            let driver = Driver.create();
            await driver.delayMs(2000);
            // 进入相机扫一扫
            await driver.assertComponentExist(ON.id('sweep'));
            let firstButton = await driver.findComponent(ON.id('sweep'));
            await firstButton.click();
            await driver.delayMs(1000);
            // 权限允许
            await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.pass'))));
            let passBtn = await driver.findComponent(ON.text(await getResourceString($r('app.string.pass'))));
            await passBtn.click();
            await driver.delayMs(30000);
            hilog.info(DOMAIN, TAG, BUNDLE + 'GotoScanFunction_001 end');
        });
    });
}
