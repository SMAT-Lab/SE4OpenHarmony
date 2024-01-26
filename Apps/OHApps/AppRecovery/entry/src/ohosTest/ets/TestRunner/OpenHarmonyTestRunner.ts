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

import TestRunner from '@ohos.application.testRunner';
import AbilityDelegatorRegistry from '@ohos.application.abilityDelegatorRegistry';
import Logger from '../../../main/ets/common/Logger';

let abilityDelegator = undefined;
let abilityDelegatorArguments = undefined;

const TAG: string = 'TestRunner';
const keySet = new Set([
  '-s class', '-s notClass', '-s suite', '-s it',
  '-s level', '-s testType', '-s size', '-s timeout',
  '-s dryRun'
]);

function translateParamsToString(parameters): string {
  let targetParams = '';
  for (const key in parameters) {
    if (keySet.has(key)) {
      targetParams = '${targetParams} ${key} ${parameters[key]}';
      Logger.info(TAG, 'targetParams:${targetParams}');
    }
  }
  return targetParams.trim();
}

async function onAbilityCreateCallback(): Promise<void> {
  Logger.info(TAG, 'onAbilityCreateCallback');
}

async function addAbilityMonitorCallback(err: Error): Promise<void> {
  Logger.info(TAG, 'addAbilityMonitorCallback');
}

export default class OpenHarmonyTestRunner implements TestRunner {
  constructor() {
  }

  onPrepare(): void {
    Logger.info(TAG, 'OpenHarmonyTestRunner onPrepare');
  }

  async onRun(): Promise<void> {
    Logger.info(TAG, 'OpenHarmonyTestRunner onRun');
    abilityDelegatorArguments = AbilityDelegatorRegistry.getArguments();

    let testAbilityName = abilityDelegatorArguments.bundleName + '.TestAbility';
    let lMonitor = {
      abilityName: testAbilityName,
      onAbilityCreate: onAbilityCreateCallback,
    };

    abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator();
    abilityDelegator.addAbilityMonitor(lMonitor, addAbilityMonitorCallback);

    let cmd = 'aa start -d 0 -a TestAbility' + ' -b ' + abilityDelegatorArguments.bundleName;
    cmd += ' ' + translateParamsToString(abilityDelegatorArguments.parameters);
    let debug = abilityDelegatorArguments.parameters['-D'];
    if (debug === 'true') {
      cmd += ' -D';
    }
    Logger.info(TAG, 'cmd:${cmd}');

    abilityDelegator.executeShellCommand(cmd,
      (err: any, d: any) => {
        Logger.info(TAG, 'OpenHarmonyTestRunner onError');
      });
    Logger.info(TAG, 'OpenHarmonyTestRunner onRun end');
  }
}
