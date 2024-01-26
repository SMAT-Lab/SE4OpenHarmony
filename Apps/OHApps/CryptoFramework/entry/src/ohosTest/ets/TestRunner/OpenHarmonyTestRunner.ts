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

import Logger from '../../../main/ets/util/Logger';
import TestRunner from '@ohos.application.testRunner';
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';

let abilityDelegator = undefined;
let abilityDelegatorArguments = undefined;

async function onAbilityCreateCallback() {
  Logger.info('testTag', 'onAbilityCreateCallback');
}

async function addAbilityMonitorCallback(err: any) {
  Logger.info('testTag', `addAbilityMonitorCallback : ${JSON.stringify(err) ?? ''}`);
}

export default class OpenHarmonyTestRunner implements TestRunner {
  constructor() {
  }

  onPrepare() {
    Logger.info('testTag', 'OpenHarmonyTestRunner OnPrepare ');
  }

  async onRun() {
    Logger.info('testTag', 'OpenHarmonyTestRunner onRun run');
    abilityDelegatorArguments = AbilityDelegatorRegistry.getArguments();
    abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator();
    let testAbilityName = abilityDelegatorArguments.bundleName + '.TestAbility';
    let lMonitor = {
      abilityName: testAbilityName,
      onAbilityCreate: onAbilityCreateCallback,
    };
    abilityDelegator.addAbilityMonitor(lMonitor, addAbilityMonitorCallback);
    let cmd = 'aa start -d 0 -a TestAbility' + ' -b ' + abilityDelegatorArguments.bundleName;
    let debug = abilityDelegatorArguments.parameters['-D'];
    if (debug == 'true') {
      cmd += ' -D'
    }
    ;
    Logger.info('testTag', `cmd : ${cmd}`);
    abilityDelegator.executeShellCommand(cmd, (err, data) => {
      Logger.info('testTag', `executeShellCommand : err : ${JSON.stringify(err) ?? ''}`);
      Logger.info('testTag', `executeShellCommand : data : ${data.stdResult ?? ''}`);
      Logger.info('testTag', `executeShellCommand : data : ${data.exitCode ?? ''}`);
    });
    Logger.info('testTag', 'OpenHarmonyTestRunner onRun end');
  }
}