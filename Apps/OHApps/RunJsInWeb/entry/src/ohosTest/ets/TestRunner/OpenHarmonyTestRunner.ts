/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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

import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import type TestRunner from '@ohos.application.testRunner';
import { logger } from '../util/Logger';

let abilityDelegator = undefined;
let abilityDelegatorArguments = undefined;
const TAG: string = 'OpenHarmonyTestRunner';

async function onAbilityCreateCallback() {
  logger.info(TAG, 'onAbilityCreateCallback');
}

async function addAbilityMonitorCallback(err: any) {
  logger.info(TAG, `addAbilityMonitorCallback : ${JSON.stringify(err) ?? ''} `);
}

export default class OpenHarmonyTestRunner implements TestRunner {
  constructor() {
  }

  onPrepare() {
    logger.info(TAG, 'OpenHarmonyTestRunner OnPrepare ');
  }

  async onRun() {
    logger.info(TAG, 'OpenHarmonyTestRunner onRun run');
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
      cmd += ' -D';
    }
    logger.info(TAG, `cmd : ${cmd}`);
    abilityDelegator.executeShellCommand(cmd,
      (err: Error, d: {
        stdResult: string,
        exitCode: number
      }) => {
        logger.info(TAG, `executeShellCommand : err : ${JSON.stringify(err) ?? ''},data: ${d.stdResult ?? ''}, ${d.exitCode ?? ''}`);
      });
    logger.info(TAG, 'OpenHarmonyTestRunner onRun end');
  }
}