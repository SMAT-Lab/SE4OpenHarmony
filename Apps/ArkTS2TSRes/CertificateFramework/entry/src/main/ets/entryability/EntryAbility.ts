let __generate__Id: number = 0;
function generateId(): string {
    return "EntryAbility_" + ++__generate__Id;
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
import AbilityConstant from '@ohos.app.ability.AbilityConstant';
import Logger from '../model/Logger';
import Want from '@ohos.app.ability.Want';
import window from '@ohos.window';
export default class EntryAbility extends UIAbility {
    onCreate(want: Want, launchParam: AbilityConstant.LaunchParam) {
        Logger.info('testTag', 'Ability onCreate');
    }
    onDestroy() {
        Logger.info('testTag', 'Ability onDestroy');
    }
    onWindowStageCreate(windowStage: window.WindowStage) {
        // Main window is created, set main page for this ability
        Logger.info('testTag', 'Ability onWindowStageCreate');
        windowStage.loadContent('pages/Index', (err, data) => {
            if (err.code) {
                Logger.error('testTag', `Failed to load the content. Cause: ${JSON.stringify(err) ?? ''}`);
                return;
            }
            Logger.info('testTag', `Succeeded in loading the content. Data: ${JSON.stringify(err) ?? ''}`);
        });
    }
    onWindowStageDestroy() {
        // Main window is destroyed, release UI related resources
        Logger.info('testTag', 'Ability onWindowStageDestroy');
    }
    onForeground() {
        // Ability has brought to foreground
        Logger.info('testTag', 'Ability onForeground');
    }
    onBackground() {
        // Ability has back to background
        Logger.info('testTag', 'Ability onBackground');
    }
}
