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
import hilog from '@ohos.hilog';
import window from '@ohos.window';
import distributedDataObject from '@ohos.data.distributedDataObject';
import relationalStore from '@ohos.data.relationalStore'

export default class EntryAbility extends UIAbility {
  onCreate(want, launchParam) {

    let sessionId = '123456';
    let funcAbilityWant = want;
    console.info("want" + JSON.stringify(funcAbilityWant.parameters))
    console.info("want" + funcAbilityWant.parameters.info)
    if (funcAbilityWant.parameters.info == 1) {
      //join
      globalThis.remoteObject = distributedDataObject.create(this.context, {
        name: undefined,
        status: 2,
        hero: undefined,
        generate: undefined,
        generateBig: undefined,
        mode: undefined,
      })
      globalThis.remoteObject.setSessionId(sessionId).then(() => {
        console.info("join session.");
        console.info(globalThis.remoteObject.name)
      }).catch((erro) => {
        console.info(erro.code + erro.message)
      })
      //subscrib
      function changeCallback(sessionId, changeData) {
        console.info(JSON.stringify(globalThis.remoteObject.hero))
        console.info(`change: ${sessionId}`);
        if (changeData !== null && changeData !== undefined) {
          globalThis.remote = 1
          globalThis.app = 1
          changeData.forEach(element => {
          });
        }
      }

      globalThis.remoteObject.on("change", changeCallback.bind(this));
    }
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onCreate');
  }

  onDestroy() {
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onDestroy');
  }

  onWindowStageCreate(windowStage: window.WindowStage) {

    // Main window is created, set main page for this ability
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageCreate');

    windowStage.loadContent('pages/Index', (err, data) => {
      if (err.code) {
        hilog.error(0x0000, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
        return;
      }
      hilog.info(0x0000, 'testTag', 'Succeeded in loading the content. Data: %{public}s', JSON.stringify(data) ?? '');
    });
  }

  onWindowStageDestroy() {
    // Main window is destroyed, release UI related resources
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageDestroy');
  }

  onForeground() {
    // Ability has brought to foreground
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onForeground');
  }

  onBackground() {
    // Ability has back to background
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onBackground');
  }
}
