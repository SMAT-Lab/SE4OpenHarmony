let __generate__Id: number = 0;
function generateId(): string {
    return "EntryAbility_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import UIAbility from '@ohos.app.ability.UIAbility';
import hilog from '@ohos.hilog';
import window from '@ohos.window';
import display from '@ohos.display';
import AbilityConstant from '@ohos.app.ability.AbilityConstant';
import Want from '@ohos.app.ability.Want';
import SysPermissionUtils from "./SysPermissionUtil";
import { GlobalContext } from '@ohos/zxing';
export default class EntryAbility extends UIAbility {
    onCreate(want: Want, launchParam: AbilityConstant.LaunchParam) {
        AppStorage.setOrCreate('context', this.context);
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onCreate');
    }
    onDestroy() {
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onDestroy');
    }
    async onWindowStageCreate(windowStage: any) {
        // Main window is created, set main page for this ability
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageCreate');
        GlobalContext.getContext().setObject("display", display.getDefaultDisplaySync());
        let topWindow = await window.getLastWindow(this.context);
        let properties = topWindow.getWindowProperties();
        GlobalContext.getContext().setObject("displayWindow", properties.windowRect);
        SysPermissionUtils.request(this.context, (isGranted: boolean, permission: string) => {
            if (permission === "ohos.permission.CAME" && isGranted) {
                windowStage.loadContent('pages/Index');
            }
        }, "ohos.permission.READ_MEDIA", "ohos.permission.WRITE_MEDIA", "ohos.permission.MEDIA_LOCATION", "ohos.permission.CAMERA");
        // windowStage.loadContent('pages/Index', (err, data) => {
        //   if (err.code) {
        //     hilog.error(0x0000, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
        //     return;
        //   }
        //   hilog.info(0x0000, 'testTag', 'Succeeded in loading the content. Data: %{public}s', JSON.stringify(data) ?? '');
        // });
        windowStage.setUIContent(this.context, 'pages/Index', null);
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
