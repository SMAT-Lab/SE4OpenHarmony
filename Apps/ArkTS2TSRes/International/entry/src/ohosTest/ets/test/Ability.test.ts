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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { Driver, ON, MatchPattern } from '@ohos.UiTest';
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import I18n from '@ohos.i18n';
import Logger from '../Logger';
const BUNDLE = "International_";
const TAG: string = '[Sample_International]';
const delegator = AbilityDelegatorRegistry.getAbilityDelegator();
let driver: Driver = Driver.create();
// 资源本地化
async function getResourceString(resource: Resource): Promise<string> {
    let manage = delegator.getAppContext().resourceManager;
    return await manage.getStringValue(resource);
}
// 通过id验证有没有这个组件 有的话点击一下
async function checkButtonAndClickWithID(text: string) {
    let atom = text;
    await driver.assertComponentExist(ON.id(atom));
    let button = await driver.findComponent(ON.id(atom));
    await button.click();
    await driver.delayMs(1000);
}
// 路由返回
async function goBack() {
    await driver.assertComponentExist(ON.id('btnBack'));
    let btnBack = await driver.findComponent(ON.id('btnBack'));
    await btnBack.click();
    await driver.delayMs(1000);
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
                    bundleName: 'ohos.samples.international',
                    abilityName: 'EntryAbility'
                });
                done();
            }
            catch (error) {
                Logger.info(TAG, `StartAbility end ${JSON.stringify(error)}`);
                expect(0).assertEqual(error?.code);
                done();
            }
            Logger.info(TAG, BUNDLE + 'StartAbility_001 end');
        });
        /**
         * 测试日历
         */
        it(BUNDLE + 'International_001', 0, async (done: Function) => {
            Logger.info(TAG, BUNDLE + 'International_001 begin');
            let driver: Driver = Driver.create();
            await driver.delayMs(1000);
            // 进入到日历页面，确认日期显示是否正确
            await checkButtonAndClickWithID('operationView_0');
            let calendar = I18n.getCalendar('en-US');
            let toDayY: number = calendar.get('year');
            let toDayM: number = calendar.get('month');
            let dateStr: string = `${toDayY}-${toDayM + 1 >= 10 ? '' : '0'}${toDayM + 1}`;
            await driver.assertComponentExist(ON.text(dateStr));
            // 点击上月
            await checkButtonAndClickWithID('pre_month');
            toDayY = toDayM - 1 >= 0 ? toDayY : toDayY - 1;
            toDayM = toDayM - 1 >= 0 ? toDayM - 1 : 11;
            dateStr = `${toDayY}-${toDayM + 1 >= 10 ? '' : '0'}${toDayM + 1}`;
            await driver.assertComponentExist(ON.text(dateStr));
            // 点击今天
            await checkButtonAndClickWithID('today');
            toDayY = calendar.get('year');
            toDayM = calendar.get('month');
            dateStr = `${toDayY}-${toDayM + 1 >= 10 ? '' : '0'}${toDayM + 1}`;
            await driver.assertComponentExist(ON.text(dateStr));
            // 点击下月
            await checkButtonAndClickWithID('next_month');
            toDayY = toDayM + 1 < 12 ? toDayY : toDayY + 1;
            toDayM = toDayM + 1 < 12 ? toDayM + 1 : 0;
            dateStr = `${toDayY}-${toDayM + 1 >= 10 ? '' : '0'}${toDayM + 1}`;
            await driver.assertComponentExist(ON.text(dateStr));
            done();
            Logger.info(TAG, BUNDLE + 'International_001 end');
        });
        /**
         * 测试字符、文本处理
         */
        it(BUNDLE + 'International_002', 0, async (done: Function) => {
            Logger.info(TAG, BUNDLE + 'International_002 begin');
            let driver: Driver = Driver.create();
            await driver.delayMs(1000);
            // 返回到首页
            await goBack();
            // 进入到字符、文本断点处理页面
            await checkButtonAndClickWithID('operationView_1');
            await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.show_character_type'))));
            await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.text_breakpoint'))));
            // 类型判断
            let shortTextInput = await driver.findComponent(ON.id('short_text_input'));
            await shortTextInput.inputText('1');
            await checkButtonAndClickWithID('show_character_type');
            await driver.delayMs(100);
            await driver.assertComponentExist(ON.text(await getResourceString($r('app.string.number'))));
            // 文本断点处理
            let longTextInput = await driver.findComponent(ON.id('long_text_input'));
            await longTextInput.inputText('text processing test');
            let longTextButton = await driver.findComponent(ON.text(await getResourceString($r('app.string.text_breakpoint'))));
            await longTextButton.click();
            await driver.delayMs(100);
            await driver.assertComponentExist(ON.text('text /processing /test'));
            done();
            Logger.info(TAG, BUNDLE + 'International_002 end');
        });
    });
}
