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

import UIAbility from '@ohos.app.ability.UIAbility';
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import { Hypium } from '@ohos/hypium';
import testsuite from '../test/List.test';
import data from '../test/data.json'
import window from '@ohos.window';
import Logger from '../util/Logger'
import Want from '@ohos.app.ability.Want';
import AbilityConstant from '@ohos.app.ability.AbilityConstant';

const TAG = 'testTag'
export default class TestAbility extends UIAbility {
    onCreate(want: Want, launchParam: AbilityConstant.LaunchParam) {
        Logger.info(TAG, "TestAbility onCreate");
        Logger.info(TAG, "want param:" + JSON.stringify(want));
        Logger.info(TAG, "launchParam:" + JSON.stringify(launchParam));
        let abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator()
        let abilityDelegatorArguments = AbilityDelegatorRegistry.getArguments()
        Logger.info(TAG, "start run testcase!!!");
        // 设置数据
        Hypium.setData(data);
        Hypium.hypiumTest(abilityDelegator, abilityDelegatorArguments, testsuite)
    }

    onDestroy() {
        Logger.info('testTag', '%{public}s', 'TestAbility onDestroy');
    }

    onWindowStageCreate(windowStage: window.WindowStage) {
        Logger.info(TAG, "TestAbility onWindowStageCreate");
        windowStage.loadContent('testability/pages/Index', (err, data) => {
            if (err.code) {
                Logger.error(TAG, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
                return;
            }
            Logger.info(TAG, 'Succeeded in loading the content. Data: %{public}s',
                JSON.stringify(data) ?? '');
        });
    }

    onWindowStageDestroy() {
        Logger.info('testTag', '%{public}s', 'TestAbility onWindowStageDestroy');
    }

    onForeground() {
        Logger.info('testTag', '%{public}s', 'TestAbility onForeground');
    }

    onBackground() {
        Logger.info('testTag', '%{public}s', 'TestAbility onBackground');
    }
}