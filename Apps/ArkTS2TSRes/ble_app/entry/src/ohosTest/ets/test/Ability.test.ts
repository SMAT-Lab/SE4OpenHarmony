let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
}
/* Copyright 2023 Unionman Technology Co., Ltd.
 *
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
 *
 */
import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { Driver, ON } from '@ohos.UiTest';
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import bluetoothManager from '@ohos.bluetoothManager';
const BUNDLE = 'com.unionman.ble_app';
const ABILITY_NAME = 'EntryAbility';
const TAG = 'bleAppTest';
const DOMAIN = 0xF7777;
export default function abilityTest() {
    let driver = Driver.create();
    let delegator = AbilityDelegatorRegistry.getAbilityDelegator();
    describe('ActsAbilityTest', function () {
        // Defines a test suite. Two parameters are supported: test suite name and test suite function.
        beforeAll(function () {
            // Presets an action, which is performed only once before all test cases of the test suite start.
            // This API supports only one parameter: preset action function.
        });
        beforeEach(function () {
            // Presets an action, which is performed before each unit test case starts.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: preset action function.
        });
        afterEach(function () {
            // Presets a clear action, which is performed after each unit test case ends.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: clear action function.
        });
        afterAll(function () {
            // Presets a clear action, which is performed after all test cases of the test suite end.
            // This API supports only one parameter: clear action function.
        });
        it('assertContain', 0, function () {
            // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
            hilog.info(0x0000, 'testTag', '%{public}s', 'it begin');
            let a = 'abc';
            let b = 'b';
            // Defines a variety of assertion methods, which are used to declare expected boolean conditions.
            expect(a).assertContain(b);
            expect(a).assertEqual(a);
        });
        it(BUNDLE + ' StartAbility_001', 1, async function (done) {
            hilog.info(DOMAIN, TAG, `${BUNDLE} StartAbility_001 begin`);
            let want = {
                bundleName: BUNDLE,
                abilityName: ABILITY_NAME
            };
            delegator.startAbility(want, (err) => {
                hilog.info(DOMAIN, TAG, `${BUNDLE} startAbility end err ${JSON.stringify(err)}`);
            });
            await driver.delayMs(1000);
            hilog.info(DOMAIN, TAG, `${BUNDLE} StartAbility_001 end`);
            done();
        });
        it(BUNDLE + ' getPermission', 2, async function (done) {
            hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' getPermission begin');
            try {
                await driver.delayMs(500);
                await driver.click(487, 348);
                await driver.delayMs(500);
                done();
            }
            catch (err) {
                hilog.error(DOMAIN, TAG, '%{public}s', `getPermission err ${err.code}  msg ${err.message}`);
                expect().assertFail();
            }
            hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' getPermission end');
        });
        it(BUNDLE + ' isOpenBluetooth', 3, async function (done) {
            hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' isOpenBluetooth begin');
            try {
                // 获取蓝牙状态
                let state = bluetoothManager.getState();
                // 蓝牙打开，搜索附件蓝牙设备
                let OpenToggle = await driver.findComponent(ON.id('Open_Toggle'));
                if (state === bluetoothManager.BluetoothState.STATE_ON) {
                    hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' BluetoothState is STATE_ON');
                }
                if (state === bluetoothManager.BluetoothState.STATE_OFF) {
                    await driver.delayMs(500);
                    let OpenToggle = await driver.findComponent(ON.id('Open_Toggle'));
                    await OpenToggle.click();
                    await driver.delayMs(500);
                }
                await driver.delayMs(500);
                let isOpenflag = await OpenToggle.isEnabled();
                if (isOpenflag) {
                    hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Toggle is Enabled!');
                }
                else {
                    hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' Toggle is not Enabled!');
                }
                done();
            }
            catch (err) {
                hilog.error(DOMAIN, TAG, '%{public}s', `isOpenBluetooth err ${err.code}  msg ${err.message}`);
                expect().assertFail();
            }
            hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' isOpenBluetooth end');
        });
        //BleConnect
        it(BUNDLE + ' BleConnect', 4, async function (done) {
            hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' BleConnect begin');
            try {
                let flag = true;
                while (flag) {
                    let BleConnect = await driver.findComponent(ON.id('BleConnect'));
                    await BleConnect.click();
                    let isBleConnect = await BleConnect.isClickable();
                    if (isBleConnect) {
                        flag = false;
                        hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' The BleDevice Connect!');
                    }
                    else {
                        hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' The BleDevice is not Connect!');
                    }
                }
                await driver.delayMs(14000);
                done();
            }
            catch (err) {
                hilog.error(DOMAIN, TAG, '%{public}s', `BleConnect err ${err.code}  msg ${err.message}`);
                expect().assertFail();
            }
            hilog.info(DOMAIN, TAG, '%{public}s', BUNDLE + ' BleConnect end');
        });
    });
}