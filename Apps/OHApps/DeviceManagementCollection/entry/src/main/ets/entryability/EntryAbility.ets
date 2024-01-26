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

import display from '@ohos.display';
import UIAbility from '@ohos.app.ability.UIAbility';
import window from '@ohos.window';
import { logger } from '@ohos/common';
import Want from '@ohos.app.ability.Want';
import AbilityConstant from '@ohos.app.ability.AbilityConstant';

const BREAKPOINT_MD: number = 600;
const BREAKPOINT_BIG: number = 840;
const PARAMS_PX_TO_VP: number = 160;
const TAG: string = 'EntryAbility';

export default class EntryAbility extends UIAbility {
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    logger.info(TAG, 'Ability onCreate');
    AppStorage.SetOrCreate('selectedLabel', '');
  }

  updateBreakpoint(windowWidth: number): void {
    let windowWidthVp: number = windowWidth / (display.getDefaultDisplaySync().densityDPI / PARAMS_PX_TO_VP);
    let curBp: string;
    if (windowWidthVp < BREAKPOINT_MD) {
      curBp = 'sm';
    } else if (windowWidthVp < BREAKPOINT_BIG) {
      curBp = 'md';
    } else {
      curBp = 'lg';
    }
    logger.info(TAG, 'window width: ' + windowWidth + ', window width vp: ' + windowWidthVp + ', breakpoint: ' + curBp);
    AppStorage.SetOrCreate('currentBreakpoint', curBp);
    AppStorage.SetOrCreate('windowWidth', windowWidthVp);
    AppStorage.SetOrCreate('isSplitMode', curBp === 'sm' ? false : true);
  }

  onDestroy(): void {
    logger.info(TAG, 'Ability onDestroy');
  }

  onWindowStageCreate(windowStage: window.WindowStage): void {
    // Main window is created, set main page for this ability
    logger.info(TAG, 'Ability onWindowStageCreate');

    windowStage.getMainWindow().then((windowObj: window.Window) => {
      let windowWidth: number = windowObj.getWindowProperties().windowRect.width;
      this.updateBreakpoint(windowWidth);
      windowObj.on('windowSizeChange', (newSize: window.Size) => {
        let windowWidth: number = newSize.width;
        this.updateBreakpoint(windowWidth);

        if (windowObj.getWindowProperties().isFullScreen) {
          logger.info(TAG, 'isFullScreen');
        }
        if (windowObj.getWindowProperties().isLayoutFullScreen) {
          logger.info(TAG, 'isLayoutFullScreen');
        }
      });
    });

    windowStage.loadContent('pages/Index', (err, data) => {
      if (err.code) {
        logger.error(TAG, `Failed to load the content. Cause: ${JSON.stringify(err)}`);
        return;
      }
      logger.info(TAG, `Succeeded in loading the content. Data:  ${JSON.stringify(data)}`);
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