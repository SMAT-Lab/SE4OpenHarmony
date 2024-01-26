let __generate__Id: number = 0;
function generateId(): string {
    return "EntryAbility_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import UIAbility from '@ohos.app.ability.UIAbility';
import AbilityConstant from '@ohos.app.ability.AbilityConstant';
import hilog from '@ohos.hilog';
import window from '@ohos.window';
import emitter from '@ohos.events.emitter';
import Want from '@ohos.app.ability.Want';
import { GlobalContext } from '../utils/GlobalContext';
export default class EntryAbility extends UIAbility {
    private tag = 'entryAbility';
    onCreate(want: Want, launchParam: AbilityConstant.LaunchParam) {
        GlobalContext.getContext().setObject('abilityWant', want);
        GlobalContext.getContext().setObject('context', this.context);
        if (want.parameters) {
            if (want.parameters.currentTime) {
                GlobalContext.getContext().setObject('currentTime', want.parameters.currentTime);
                console.info(this.tag, 'time: ' + want.parameters.currentTime);
            }
        }
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onCreate');
    }
    onDestroy() {
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onDestroy');
    }
    onWindowStageCreate(windowStage: window.WindowStage): void {
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageCreate');
        windowStage.getMainWindow().then((win: window.Window) => {
            win.setWindowKeepScreenOn(true);
            win.setWindowSystemBarProperties({
                statusBarColor: '#000000'
            });
            win.on('windowSizeChange', (newSize: window.Size) => {
                let eventWHData: emitter.EventData = {
                    data: {
                        'width': newSize.width,
                        'height': newSize.height
                    }
                };
                let innerEventWH: emitter.InnerEvent = {
                    eventId: 3,
                    priority: emitter.EventPriority.HIGH
                };
                emitter.emit(innerEventWH, eventWHData);
            });
        });
        windowStage.loadContent('pages/Index', (err, data) => {
            if (err.code) {
                hilog.error(0x0000, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
                return;
            }
            hilog.info(0x0000, 'testTag', 'Succeeded in loading the content. Data: %{public}s', JSON.stringify(data) ?? '');
        });
    }
    onWindowStageDestroy() {
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageDestroy');
    }
    onForeground() {
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onForeground');
    }
    onBackground() {
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onBackground');
    }
}
