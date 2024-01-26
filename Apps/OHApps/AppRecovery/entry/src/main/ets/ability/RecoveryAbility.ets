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
import Window from '@ohos.window'
import AbilityConstant from '@ohos.app.ability.AbilityConstant';
import Want from '@ohos.app.ability.Want';

import Logger from '../common/Logger'
import { CurActiveAbility } from '../common/CurActiveAbility';

const TAG: string = 'SecondAbility';

export default class RecoveryAbility extends UIAbility {
  storage: LocalStorage = new LocalStorage();

  onCreate(want: Want, launchParam:AbilityConstant.LaunchParam): void  {
    Logger.info(TAG, 'onCreate');
    this.storage.setOrCreate<string>('launchReason', launchParam.launchReason.toString());
    this.storage.setOrCreate<string>('lastExitReason', launchParam.lastExitReason.toString());
    if (want.parameters !== undefined) {
      AppStorage.setOrCreate<string>('RecoverAbility', want.parameters['RecoverAbility'] as string);
    }
  }

  onDestroy(): void {
    Logger.info(TAG, 'onDestroy');
  }

  onWindowStageCreate(windowStage: Window.WindowStage):void {
    Logger.info(TAG, 'onWindowStageCreate');
    windowStage.loadContent('pages/RecoveryPage', this.storage, (err, data) => {
      if (err.code) {
        Logger.info(TAG, 'Failed to load the content. Cause:${JSON.stringify(err)}}');
        return;
      }
    });
  }

  onWindowStageDestroy(): void {
    Logger.info(TAG, 'onWindowStageDestroy');
  }

  onForeground(): void {
    Logger.info(TAG, 'onForeground');
    CurActiveAbility.GetInstance().SetGlobalAbility(this);
  }

  onSaveState(reason: AbilityConstant.StateType, wantParam: Record<string, Object>): AbilityConstant.OnSaveResult {
    // No need to save state
    Logger.info(TAG, 'onSaveState');
    return AbilityConstant.OnSaveResult.ALL_REJECT;
  }

  onBackground(): void {
    // Ability has back to background
    Logger.info(TAG, 'onBackground');
  }
}
