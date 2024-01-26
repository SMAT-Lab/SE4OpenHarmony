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

import appRecovery from '@ohos.app.ability.appRecovery';
import AbilityConstant from '@ohos.app.ability.AbilityConstant';
import UIAbility from '@ohos.app.ability.UIAbility';
import Want from '@ohos.app.ability.Want';
import Window from '@ohos.window';

import Logger from '../common/Logger';
import { CurActiveAbility } from '../common/CurActiveAbility';

const TAG: string = 'SecondAbility';

export default class SecondAbility extends UIAbility {
  isRecoverLaunch: boolean = false;
  storage: LocalStorage = new LocalStorage();

  // Read previous saved status from want if we are launched by appRecovery
  restoreLocalStorage(want: Want) : void {
    if (want.parameters !== undefined) {
      this.storage.setOrCreate<string>('FaultTriggerPageString', want.parameters['FaultTriggerPageString'] as string);
      this.storage.setOrCreate<number>('FaultTriggerPageCounter', want.parameters['FaultTriggerPageCounter'] as number);
    }
  }

  onCreate(want: Want, launchParam:AbilityConstant.LaunchParam): void  {
    Logger.info(TAG, 'onCreate');
    this.storage.setOrCreate<string>('CurrentAbilityName', 'SecondAbility');
    this.storage.setOrCreate<string>('launchReason', launchParam.launchReason.toString());
    this.storage.setOrCreate<string>('lastExitReason', launchParam.lastExitReason.toString());
    this.isRecoverLaunch = (launchParam.launchReason == AbilityConstant.LaunchReason.APP_RECOVERY);
    if (this.isRecoverLaunch) {
      // savedState is in wantParams
      this.restoreLocalStorage(want);
      this.context.restoreWindowStage(this.storage);
    }
  }

  onDestroy(): void {
    Logger.info(TAG, 'onDestroy');
  }

  onWindowStageCreate(windowStage: Window.WindowStage): void {
    Logger.info(TAG, 'onWindowStageCreate');
    // Share storage between pages and current ability
    windowStage.loadContent('pages/Index', this.storage, (err, data) => {
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
    Logger.info(TAG, 'onSaveState');
    let string = this.storage.get<string>('FaultTriggerPageString');
    let counter = this.storage.get<number>('FaultTriggerPageCounter');
    wantParam['FaultTriggerPageString'] = string ?? 'Empty';
    wantParam['FaultTriggerPageCounter'] = counter as number;
    return AbilityConstant.OnSaveResult.ALL_AGREE;
  }

  onBackground(): void {
    Logger.info(TAG, 'onBackground');
    // save state when background
    appRecovery.saveAppState(this.context);
  }
}
