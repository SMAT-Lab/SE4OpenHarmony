let __generate__Id: number = 0;
function generateId(): string {
    return "MouseEvent.test_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License")
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
import { describe, beforeAll, it, expect, TestType } from '@ohos/hypium';
import abilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import { Driver, MouseButton, ON } from '@ohos.UiTest';
import Want from '@ohos.app.ability.Want';
const delegator = abilityDelegatorRegistry.getAbilityDelegator();
const bundleName = abilityDelegatorRegistry.getArguments().bundleName;
const WAIT_UI_READYMS = 1000;
export default function MouseEventTest() {
    describe('MouseEventTest', () => {
        beforeAll(async () => {
            let want: Want = {
                bundleName: bundleName,
                abilityName: "MouseAbility"
            };
            await delegator.startAbility(want);
        });
        /**
         * @tc.number:MouseEventTest_001
         * @tc.name: testMouseClick1
         * @tc.type: 0 || TestType.FUNCTION || Size.SMALLTEST || Level.LEVEL0
         * @tc.desc: 检测uitest 模拟鼠标左键点击 功能
         */
        it('testMouseClick1', TestType.FUNCTION, async (done: Function) => {
            let driver = Driver.create();
            await driver.delayMs(WAIT_UI_READYMS);
            let button = await driver.findComponent(ON.id("mouse_test"));
            let point = await button.getBoundsCenter();
            await driver.mouseClick(point, MouseButton.MOUSE_BUTTON_LEFT, 2017);
            let text = await driver.findComponent(ON.id("mouse_test_result"));
            expect(await text.getText() === 'left').assertTrue();
            done();
        });
        /**
         * @tc.number:MouseEventTest_002
         * @tc.name: testMouseClick2
         * @tc.type: 0 || TestType.FUNCTION || Size.SMALLTEST || Level.LEVEL0
         * @tc.desc: 检测uitest 模拟鼠标右键点击 功能
         */
        it('testMouseClick2', TestType.FUNCTION, async (done: Function) => {
            let driver = Driver.create();
            await driver.delayMs(WAIT_UI_READYMS);
            let button = await driver.findComponent(ON.id("mouse_test"));
            let point = await button.getBoundsCenter();
            await driver.mouseClick(point, MouseButton.MOUSE_BUTTON_RIGHT, 2017);
            let text = await driver.findComponent(ON.id("mouse_test_result"));
            expect(await text.getText() === 'right').assertTrue();
            done();
        });
        /**
         * @tc.number:MouseEventTest_003
         * @tc.name: testMouseClick3
         * @tc.type: 0 || TestType.FUNCTION || Size.SMALLTEST || Level.LEVEL0
         * @tc.desc: 检测uitest 模拟鼠标中间点击 功能
         */
        it('testMouseClick3', TestType.FUNCTION, async (done: Function) => {
            let driver = Driver.create();
            await driver.delayMs(WAIT_UI_READYMS);
            let button = await driver.findComponent(ON.id("mouse_test"));
            let point = await button.getBoundsCenter();
            await driver.mouseClick(point, MouseButton.MOUSE_BUTTON_MIDDLE);
            let text = await driver.findComponent(ON.id("mouse_test_result"));
            expect(await text.getText() === 'middle').assertTrue();
            done();
        });
        /**
         * @tc.number:MouseEventTest_004
         * @tc.name: testMouseMoveTo
         * @tc.type: 0 || TestType.FUNCTION || Size.SMALLTEST || Level.LEVEL0
         * @tc.desc: 检测uitest 模拟鼠标滚轮向下滑动功能
         */
        it('testMouseMoveTo', TestType.FUNCTION, async (done: Function) => {
            let driver = Driver.create();
            await driver.delayMs(WAIT_UI_READYMS);
            let Button = await driver.findComponent(ON.id('hover_bt'));
            let center = await Button.getBoundsCenter();
            await driver.mouseMoveTo(center);
            await driver.delayMs(WAIT_UI_READYMS);
            let newButton = await driver.findComponent(ON.id('hoverText'));
            expect(await newButton.getText() === 'hover').assertTrue();
            done();
        });
        /**
         * @tc.number:MouseEventTest_005
         * @tc.name: testMouseScroll
         * @tc.type: 0 || TestType.FUNCTION || Size.SMALLTEST || Level.LEVEL0
         * @tc.desc: 检测uitest 模拟鼠标滚轮向下滑动功能
         */
        it('testMouseScroll', TestType.FUNCTION, async (done: Function) => {
            let driver = Driver.create();
            await driver.delayMs(WAIT_UI_READYMS);
            let scroll = await driver.findComponent(ON.id('scroll_test'));
            let center = await scroll.getBoundsCenter();
            await driver.mouseScroll(center, true, 30);
            let button1 = await driver.findComponent(ON.id('scroll_item'));
            expect(await button1.getText() !== '0').assertTrue();
            done();
        });
    });
}
