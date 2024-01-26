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
import window from '@ohos.window';
import AbilityConstant from '@ohos.app.ability.AbilityConstant';
import Want from '@ohos.app.ability.Want';
import Logger from '../util/Logger';

export default class PinchAbility extends UIAbility {
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam) {
    Logger.info('PinchAbility', '%{public}s', 'PinchAbility onCreate');
  }

  onDestroy() {
    Logger.info('PinchAbility', '%{public}s', 'PinchAbility onDestroy');
  }

  onWindowStageCreate(windowStage: window.WindowStage) {
    // Main window is created, set main page for this ability
    Logger.info('PinchAbility', '%{public}s', 'PinchAbility onWindowStageCreate');
    windowStage.loadContent('pages/Pinch', (err, data) => {
      if (err.code) {
        Logger.error('PinchAbility', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
        return;
      }
      Logger.info('PinchAbility', 'Succeeded in loading the content. Data: %{public}s', JSON.stringify(data) ?? '');
    });
  }

  onWindowStageDestroy() {
    // Main window is destroyed, release UI related resources
    Logger.info('PinchAbility', '%{public}s', 'PinchAbility onWindowStageDestroy');
  }

  onForeground() {
    // Ability has brought to foreground
    Logger.info('PinchAbility', '%{public}s', 'PinchAbility onForeground');
  }

  onBackground() {
    // Ability has back to background
    Logger.info('PinchAbility', '%{public}s', 'PinchAbility onBackground');
  }
}
