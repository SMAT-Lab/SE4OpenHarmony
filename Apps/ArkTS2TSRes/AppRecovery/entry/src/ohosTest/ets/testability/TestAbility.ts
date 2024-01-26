let __generate__Id: number = 0;
function generateId(): string {
    return "TestAbility_" + ++__generate__Id;
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
import UIAbility from '@ohos.app.ability.UIAbility';
import Window from '@ohos.window';
import Want from '@ohos.app.ability.Want';
import AbilityConstant from '@ohos.app.ability.AbilityConstant';
import AbilityDelegatorRegistry from '@ohos.application.abilityDelegatorRegistry';
import { Hypium } from '@ohos/hypium';
import testsuite from '../test/List.test';
import Logger from '../../../main/ets/common/Logger';
const TAG = '[Sample_AppRecovery]';
export default class TestAbility extends UIAbility {
    onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
        Logger.info(TAG, 'onCreate Want:${JSON.stringify(want)} launchParam: ${JSON.stringify(launchParam)}');
        let abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator();
        let abilityDelegatorArguments = AbilityDelegatorRegistry.getArguments();
        Hypium.hypiumTest(abilityDelegator, abilityDelegatorArguments, testsuite);
    }
    onDestroy(): void {
        Logger.info(TAG, 'onDestroy');
    }
    onWindowStageCreate(windowStage: Window.WindowStage): void {
        Logger.info(TAG, 'onWindowStageCreate');
        windowStage.loadContent('testability/pages/Index', (err, data) => {
            if (err.code) {
                return;
            }
        });
    }
    onWindowStageDestroy(): void {
        Logger.info(TAG, 'onWindowStageDestroy');
    }
    onForeground(): void {
        Logger.info(TAG, 'onForeground');
    }
    onBackground(): void {
        Logger.info(TAG, 'onBackground');
    }
}
