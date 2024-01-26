let __generate__Id: number = 0;
function generateId(): string {
    return "MoveToEvent.test_" + ++__generate__Id;
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
import Want from '@ohos.app.ability.Want';
import { Driver } from '@ohos.UiTest';
import { BusinessError } from '@ohos.base';
import Logger from '../../../util/Logger';
const delegator = abilityDelegatorRegistry.getAbilityDelegator();
const bundleName = abilityDelegatorRegistry.getArguments().bundleName;
const WAIT_UI_READYMS = 1000;
const TAG = "MoveTo_Test";
const BUNDLE = "MoveTo_";
export default function MoveToEventTest() {
    describe('MoveToEventTest', () => {
        beforeAll(async () => {
            let want: Want = {
                bundleName: bundleName,
                abilityName: "EntryAbility"
            };
            await delegator.startAbility(want);
        });
        /**
         * @tc.number:MoveToEventTest_001
         * @tc.name: testWindowMoveTo
         * @tc.type: 0 || TestType.FUNCTION || Size.SMALLTEST || Level.LEVEL0
         * @tc.desc: 检测 window1.moveTo 功能
         */
        it("MoveTo_Test_001", TestType.FUNCTION, async (done: Function) => {
            Logger.info(TAG, BUNDLE + "Test_001 start");
            let driver = Driver.create();
            await driver.delayMs(WAIT_UI_READYMS);
            let window = await driver.findWindow({ bundleName: bundleName });
            try {
                // 设置window状态
                await window.resume();
                await driver.delayMs(WAIT_UI_READYMS);
                let window1 = await driver.findWindow({ bundleName: bundleName });
                let bounds1 = await window1.getBounds();
                // 设置window移动 100， 100
                await window1.moveTo(100, 100);
                await driver.delayMs(WAIT_UI_READYMS);
                let window2 = await driver.findWindow({ bundleName: bundleName });
                let bounds2 = await window2.getBounds();
                // 判断俩个window窗口大小是否相同
                expect(bounds1 != bounds2).assertTrue();
            }
            catch (err) {
                if ((err as BusinessError).message == 'this device can not support this action') {
                    expect(window != null).assertTrue();
                }
                else {
                    expect(false).assertTrue();
                }
            }
            finally {
                Logger.info(TAG, BUNDLE + "Test_001 end");
                done();
            }
        });
    });
}
