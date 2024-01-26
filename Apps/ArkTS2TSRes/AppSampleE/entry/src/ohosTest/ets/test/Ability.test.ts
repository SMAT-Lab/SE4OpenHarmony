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
import { Driver, ON, MatchPattern } from '@ohos.UiTest';
import abilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import Logger from '../util/Logger';
import { getString } from '../util/ResourceUtil';
import { Callback } from '@ohos.base';
const DELAY_TIME = 1500;
const delegator = abilityDelegatorRegistry.getAbilityDelegator();
let driver = Driver.create();
const BUNDLE = 'IMmeituaun';
const TAG = '[Sample_AppSampleE]';
const DOMAIN = 0xF811;
/**
 * 根据id拿到组件并点击
 * @param id
 */
async function checkAndClickById(id: string, log: string) {
    hilog.info(DOMAIN, TAG, BUNDLE + `${log} id:${id}`);
    await driver.assertComponentExist(ON.id(id));
    let res = await driver.findComponent(ON.id(id));
    await res.click();
}
/**
 * 根据text拿到组件并点击
 * @param text
 */
async function checkAndClickByText(text: string, log: string) {
    hilog.info(DOMAIN, TAG, BUNDLE + `${log} text:${text}`);
    await driver.assertComponentExist(ON.text(text));
    let res = await driver.findComponent(ON.text(text));
    await res.click();
}
export default function abilityTest() {
    describe('ActsAbilityTest', () => {
        // Defines a test suite. Two parameters are supported: test suite name and test suite function.
        beforeAll(async () => {
            // Presets an action, which is performed only once before all test cases of the test suite start.
            // This API supports only one parameter: preset action function.
            // 启动Ability
        });
        beforeEach(() => {
            // Presets an action, which is performed before each unit test case starts.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: preset action function.
        });
        afterEach(() => {
            // Presets a clear action, which is performed after each unit test case ends.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: clear action function.
        });
        afterAll(() => {
            // Presets a clear action, which is performed after all test cases of the test suite end.
            // This API supports only one parameter: clear action function.
        });
        it('assertContain', 0, async () => {
            // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
            hilog.info(0x0000, 'testTag', '%{public}s', 'it begin');
            it(BUNDLE + 'StartAbility_001', 0, async (done: () => void) => {
                delegator.executeShellCommand('aa start -a EntryAbility -b com.samples.appsamplee');
                await driver.delayMs(DELAY_TIME);
                done();
            });
            it(BUNDLE + 'Login_001', 0, async () => {
                await driver.delayMs(DELAY_TIME);
                await checkAndClickById('login', 'Login');
                await driver.delayMs(4000);
                await checkAndClickByText(getString($r('app.string.pass')), 'Login');
                await driver.delayMs(DELAY_TIME);
            });
            it(BUNDLE + 'Buy_001', 0, async () => {
                await driver.delayMs(DELAY_TIME);
                await checkAndClickById('buy', 'Buy');
                await driver.delayMs(DELAY_TIME);
                await checkAndClickById('selfPickUp', 'SelfPickUp');
                await driver.delayMs(DELAY_TIME);
                await checkAndClickById('back', 'Back');
                await driver.delayMs(DELAY_TIME);
                await checkAndClickById('back', 'Back');
                await driver.delayMs(DELAY_TIME);
            });
            it(BUNDLE + 'HongTuan_001', 0, async () => {
                let driver: Driver = Driver.create();
                await driver.delayMs(DELAY_TIME);
                await checkAndClickById('business', 'Business');
                await driver.delayMs(DELAY_TIME);
                await checkAndClickById('business0', 'Business0');
                await driver.delayMs(DELAY_TIME);
                await checkAndClickByText(getString($r('app.string.pd_tabs_appraise')), 'Appraise');
                await driver.delayMs(DELAY_TIME);
                await checkAndClickByText(getString($r('app.string.commodity_tabs_order')), 'Order');
                await driver.delayMs(DELAY_TIME);
                await checkAndClickById('commentList0', 'CommentList0');
                await driver.delayMs(DELAY_TIME);
                await checkAndClickById('back', 'Back');
                await driver.delayMs(DELAY_TIME);
                await checkAndClickById('commodity0', 'Commodity0');
                await driver.delayMs(DELAY_TIME);
                await checkAndClickById('panel', 'Panel');
                await driver.delayMs(DELAY_TIME);
                await checkAndClickById('panel', 'Panel');
                await driver.delayMs(DELAY_TIME);
                await checkAndClickById('pay', 'Pay');
                await driver.delayMs(DELAY_TIME);
            });
        });
    });
}
