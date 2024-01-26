/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import UIAbility from '@ohos.app.ability.UIAbility';
import window from '@ohos.window';
import abilityAccessCtrl from '@ohos.abilityAccessCtrl';

export default class EntryAbility extends UIAbility {
  onCreate(want, launchParam) {
    if (want.parameters !== undefined) {
      AppStorage.SetOrCreate('isStage', want.parameters.isStage)
      AppStorage.SetOrCreate('deviceID', want.parameters.deviceID)
    }
    globalThis.context = this.context;
  }

  onWindowStageCreate(windowStage: window.WindowStage) {
    let AtManager = abilityAccessCtrl.createAtManager();
    AtManager.requestPermissionsFromUser(this.context, ["ohos.permission.DISTRIBUTED_DATASYNC", "ohos.permission.READ_MEDIA", "ohos.permission.WRITE_MEDIA"])
    windowStage.getMainWindowSync().setWindowSystemBarEnable([])

    windowStage.loadContent('pages/Index', null);
  }
}
