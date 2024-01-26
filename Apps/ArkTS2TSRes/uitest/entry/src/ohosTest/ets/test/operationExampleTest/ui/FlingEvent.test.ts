let __generate__Id: number = 0;
function generateId(): string {
    return "FlingEvent.test_" + ++__generate__Id;
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
import { Driver, ON, UiDirection } from '@ohos.UiTest';
import Want from '@ohos.app.ability.Want';
import Logger from '../../../util/Logger';
const delegator = abilityDelegatorRegistry.getAbilityDelegator();
const bundleName = abilityDelegatorRegistry.getArguments().bundleName;
const WAIT_UI_READYMS = 1000;
export default function FlingEventTest() {
    describe('FlingEvent', () => {
        beforeAll(async () => {
            let want: Want = {
                bundleName: bundleName,
                abilityName: 'FlingAbility'
            };
            await delegator.startAbility(want);
        });
        /**
         * @tc.number:FlingEventTest_001
         * @tc.name: FlingEvent_h
         * @tc.type: 0 || TestType.FUNCTION || Size.SMALLTEST || Level.LEVEL0
         * @tc.desc: 检测uitest fling 功能
         */
        it('FlingEvent_h', TestType.FUNCTION, async (done: Function) => {
            let driver = Driver.create();
            await driver.delayMs(WAIT_UI_READYMS);
            let swiper = await driver.findComponent(ON.id('swiper'));
            let point = await swiper.getBounds();
            await driver.fling({ x: point.left + 100, y: 700 }, { x: point.right - 100, y: 700 }, 20, 2000);
            await driver.delayMs(WAIT_UI_READYMS);
            await driver.fling({ x: point.left + 100, y: 700 }, { x: point.right - 100, y: 700 }, 20, 2000);
            await driver.delayMs(WAIT_UI_READYMS);
            let text = await driver.findComponent(ON.id('swiper_text'));
            expect(await text.getText()).assertEqual("arkUI");
            done();
        });
        /**
         * @tc.number:FlingEventTest_002
         * @tc.name: FlingEvent_v
         * @tc.type: 0 || TestType.FUNCTION || Size.SMALLTEST || Level.LEVEL0
         * @tc.desc: 检测uitest fling 功能
         */
        it('FlingEvent_v', TestType.FUNCTION, async (done: Function) => {
            let driver = Driver.create();
            await driver.delayMs(WAIT_UI_READYMS);
            let scroll = await driver.findComponent(ON.id('scroll_item'));
            let point = await scroll.getBounds();
            let midX = (point.left + point.right) / 2;
            let midY = (point.top + point.bottom) / 2;
            await driver.fling({ x: midX, y: midY + 80 }, { x: midX, y: midY - 80 }, 20, 2000);
            await driver.delayMs(WAIT_UI_READYMS);
            let text = await driver.findComponent(ON.id('scroll_item'));
            expect(await text.getText()).not().assertEqual('0');
            done();
        });
        /**
         * @tc.number:FlingEventTest_003
         * @tc.name: FlingEvent_d
         * @tc.type: 0 || TestType.FUNCTION || Size.SMALLTEST || Level.LEVEL0
         * @tc.desc: 检测uitest fling方向设置测试 功能
         */
        it('FlingEvent_d', TestType.FUNCTION, async (done: Function) => {
            let driver = Driver.create();
            await driver.delayMs(WAIT_UI_READYMS);
            await driver.fling(UiDirection.LEFT, 39000);
            await driver.delayMs(WAIT_UI_READYMS);
            await driver.fling(UiDirection.RIGHT, 39000);
            await driver.delayMs(WAIT_UI_READYMS);
            await driver.fling(UiDirection.DOWN, 39000);
            await driver.delayMs(WAIT_UI_READYMS);
            await driver.fling(UiDirection.UP, 39000);
            let text = await driver.findComponent(ON.text('next page'));
            expect(text !== null).assertTrue();
            done();
        });
    });
}
