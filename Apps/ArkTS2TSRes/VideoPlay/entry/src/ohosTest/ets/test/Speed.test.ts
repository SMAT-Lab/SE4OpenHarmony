let __generate__Id: number = 0;
function generateId(): string {
    return "Speed.test_" + ++__generate__Id;
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
import { describe, it } from '@ohos/hypium';
import { Driver, ON } from '@ohos.UiTest';
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import { getString } from '../../../main/ets/utils/ResourceUtil';
import hilog from '@ohos.hilog';
const TAG = '[Sample_VideoPlay]';
const DOMAIN = 0xF811;
const BUNDLE = 'VideoPlay_';
export default function SpeedTest() {
    describe('SpeedTest', () => {
        /**
         * 调节倍速2.0X
         */
        it(BUNDLE + 'Speed_001', 0, async (done: Function) => {
            // 启动Ability
            hilog.info(DOMAIN, TAG, BUNDLE + 'Speed_001 begin');
            let abilityDelegatorRegistry = AbilityDelegatorRegistry.getAbilityDelegator();
            await abilityDelegatorRegistry.executeShellCommand('aa start -a EntryAbility -b net.openvally.videoplay');
            // 拉起操作界面
            let driver = await Driver.create();
            await driver.delayMs(1000);
            await driver.assertComponentExist(ON.id('Video'));
            let stack = await driver.findComponent(ON.id('Video'));
            await driver.delayMs(5000);
            await stack.click();
            // 点击倍速
            await driver.assertComponentExist(ON.id('Speed'));
            let btnPlay = await driver.findComponent(ON.id('Speed'));
            await btnPlay.click();
            // 点击2.0X
            const str = await getString($r('app.string.video_speed_2_0X'));
            await driver.assertComponentExist(ON.text(str));
            let button = await driver.findComponent(ON.text(str));
            await button.click();
            await driver.delayMs(1000);
            done();
            hilog.info(DOMAIN, TAG, BUNDLE + 'Speed_001 end');
        });
        /**
         * 调节倍速1.75X
         */
        it(BUNDLE + 'Speed_002', 0, async (done: Function) => {
            hilog.info(DOMAIN, TAG, BUNDLE + 'Speed_002 begin');
            let driver = await Driver.create();
            await driver.assertComponentExist(ON.id('Video'));
            let stack = await driver.findComponent(ON.id('Video'));
            await driver.delayMs(5000);
            await stack.click();
            // 点击倍速
            await driver.delayMs(1000);
            await driver.assertComponentExist(ON.id('Speed'));
            let btnPlay = await driver.findComponent(ON.id('Speed'));
            await btnPlay.click();
            // 点击1.75X
            const str = await getString($r('app.string.video_speed_1_75X'));
            await driver.assertComponentExist(ON.text(str));
            let button = await driver.findComponent(ON.text(str));
            await button.click();
            await driver.delayMs(1000);
            done();
            hilog.info(DOMAIN, TAG, BUNDLE + 'Speed_002 end');
        });
        /**
         * 调节倍速1.25X
         */
        it(BUNDLE + 'Speed_003', 0, async (done: Function) => {
            hilog.info(DOMAIN, TAG, BUNDLE + 'Speed_003 begin');
            let driver = await Driver.create();
            await driver.assertComponentExist(ON.id('Video'));
            let stack = await driver.findComponent(ON.id('Video'));
            await driver.delayMs(5000);
            await stack.click();
            // 点击倍速
            await driver.delayMs(1000);
            await driver.assertComponentExist(ON.id('Speed'));
            let btnPlay = await driver.findComponent(ON.id('Speed'));
            await btnPlay.click();
            // 点击1.25X
            await driver.delayMs(1000);
            const str = await getString($r('app.string.video_speed_1_25X'));
            await driver.assertComponentExist(ON.text(str));
            let button = await driver.findComponent(ON.text(str));
            await button.click();
            await driver.delayMs(1000);
            done();
            hilog.info(DOMAIN, TAG, BUNDLE + 'Speed_003 end');
        });
        /**
         * 调节倍速1.0X
         */
        it(BUNDLE + 'Speed_004', 0, async (done: Function) => {
            hilog.info(DOMAIN, TAG, BUNDLE + 'Speed_004 begin');
            let driver = await Driver.create();
            await driver.assertComponentExist(ON.id('Video'));
            let stack = await driver.findComponent(ON.id('Video'));
            await driver.delayMs(5000);
            await stack.click();
            // 点击倍速
            await driver.delayMs(1000);
            await driver.assertComponentExist(ON.id('Speed'));
            let btnPlay = await driver.findComponent(ON.id('Speed'));
            await btnPlay.click();
            // 点击1.0X
            await driver.delayMs(1000);
            const str = await getString($r('app.string.video_speed_1_0X'));
            await driver.assertComponentExist(ON.text(str));
            let button = await driver.findComponent(ON.text(str));
            await button.click();
            await driver.delayMs(1000);
            hilog.info(DOMAIN, TAG, BUNDLE + 'Speed_004 end');
            done();
        });
    });
}
