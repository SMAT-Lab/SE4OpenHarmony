/**
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * This software is distributed under a license. The full license
 * agreement can be found in the file LICENSE in this distribution.
 * This software may not be copied, modified, sold or distributed
 * other than expressed in the named license agreement.
 *
 * This software is distributed without any warranty.
 */

import UIAbility from '@ohos.app.ability.UIAbility'
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import { Hypium } from '@ohos/hypium'
import testsuite from '../test/List.test'
import { GlobalContext } from '../../../main/ets/common/GlobalContext';

export default class TestAbility extends UIAbility {
    onCreate(want: ESObject, launchParam: ESObject) {
        let abilityDelegator: ESObject
        abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator()
        let abilityDelegatorArguments: ESObject
        abilityDelegatorArguments = AbilityDelegatorRegistry.getArguments()
        console.info('start run testcase!!!')
        Hypium.hypiumTest(abilityDelegator, abilityDelegatorArguments, testsuite)
    }

    onDestroy() {
        console.log('TestAbility onDestroy')
    }

    onWindowStageCreate(windowStage: ESObject) {
        console.log('TestAbility onWindowStageCreate')
        windowStage.loadContent("TestAbility/pages/index", (err: ESObject, data: ESObject) => {
            if (err.code) {
                console.error('Failed to load the content. Cause:' + JSON.stringify(err));
                return;
            }
            console.info('Succeeded in loading the content. Data: ' + JSON.stringify(data))
        });

        GlobalContext.getContext().setValue('abilityContext',this.context);
    }

    onWindowStageDestroy() {
        console.log('TestAbility onWindowStageDestroy')
    }

    onForeground() {
        console.log('TestAbility onForeground')
    }

    onBackground() {
        console.log('TestAbility onBackground')
    }
};