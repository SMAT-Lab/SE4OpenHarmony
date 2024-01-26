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

import abilityAccessCtrl from '@ohos.abilityAccessCtrl';
import AbilityConstant from '@ohos.app.ability.AbilityConstant';
import UIAbility from '@ohos.app.ability.UIAbility';
import window from '@ohos.window';
import Want from '@ohos.app.ability.Want';
import { Permissions } from '@ohos.abilityAccessCtrl';
import { logger, urlUtils } from '@ohos/uploaddownload';

const PERMISSIONS: Array<Permissions> = ['ohos.permission.READ_MEDIA'];
const TAG: string = 'EntryAbility';

export default class EntryAbility extends UIAbility {
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    logger.info(TAG, 'Ability onCreate');
    let atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
    try {
      atManager.requestPermissionsFromUser(this.context, PERMISSIONS, (err, data) => {
        if (err) {
          logger.info(TAG, `requestPermissionsFromUser data: ${JSON.stringify(err)}`);
        } else {
          logger.info(TAG, `requestPermissionsFromUser data: ${JSON.stringify(data)}`);
        }
      });
    } catch (err) {
      logger.info(TAG, `catch err->${JSON.stringify(err)}`);
    }
  }

  onDestroy(): void {
    logger.info(TAG, 'Ability onDestroy');
  }

  onWindowStageCreate(windowStage: window.WindowStage): void {
    // Main window is created, set main page for this ability
    logger.info(TAG, 'Ability onWindowStageCreate');
    urlUtils.subscribe(this.context);
    windowStage.loadContent('pages/Index', (err, data) => {
      if (err.code) {
        logger.error(TAG, `Failed to load the content. Cause:${JSON.stringify(err) ?? ''}`);
        return;
      }
      logger.info(TAG, `Succeeded in loading the content. Data:${JSON.stringify(data) ?? ''}`);
    });
  }

  onWindowStageDestroy(): void {
    // Main window is destroyed, release UI related resources
    logger.info(TAG, 'Ability onWindowStageDestroy');
  }

  onForeground(): void {
    // Ability has brought to foreground
    logger.info(TAG, 'Ability onForeground');
  }

  onBackground(): void {
    // Ability has back to background
    logger.info(TAG, 'Ability onBackground');
  }
}
