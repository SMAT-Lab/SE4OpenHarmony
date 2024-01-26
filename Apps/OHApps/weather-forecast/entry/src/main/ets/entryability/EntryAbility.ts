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

import UIAbility from '@ohos.app.ability.UIAbility';
import hilog from '@ohos.hilog';
import window from '@ohos.window';

export default class EntryAbility extends UIAbility {
    onCreate(want, launchParam) {
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onCreate');
    }

    onDestroy() {
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onDestroy');
    }

    onWindowStageCreate(windowStage: window.WindowStage) {
        // Main window is created, set main page for this ability
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageCreate');

        // 1.获取应用主窗口。
        let windowClass = null;
        windowStage.getMainWindow((err, data) => {
            if (err.code) {
                console.error('Failed to obtain the main window. Cause: ' + JSON.stringify(err));
                return;
            }
            windowClass = data;
            console.info('Succeeded in obtaining the main window. Data: ' + JSON.stringify(data));


            //            let isLayoutFullScreen= true;
            //            windowClass.setLayoutFullScreen(isLayoutFullScreen, (err) => {
            //                if (err) {
            //                    console.error('Failed to set the window layout to full-screen mode. Cause:' + JSON.stringify(err));
            //                    return;
            //                }
            //                console.info('Succeeded in setting the window layout to full-screen mode.');
            //            });

            // 2.实现沉浸式效果。方式一：设置应用主窗口为全屏显示。
            //            let isFullScreen = true;
            //            windowClass.setFullScreen(isFullScreen, (err) => {
            //                if (err) {
            //                    console.error('Failed to enable the full-screen mode. Cause:' + JSON.stringify(err));
            //                    return;
            //                }
            //                console.info('Succeeded in enabling the full-screen mode.');
            //            });
            //            // 2.实现沉浸式效果。方式二：设置导航栏、状态栏不显示。
            //            let names = ["status"];
            //            windowClass.setSystemBarEnable(names, (err) => {
            //                if (err) {
            //                    console.error('Failed to set the system bar to be visible. Cause:' + JSON.stringify(err));
            //                    return;
            //                }
            //                console.info('Succeeded in setting the system bar to be visible.');
            //            });

            var SystemBarProperties = {
                statusBarColor: '#ffffff',
                navigationBarColor: '#ffffff',
                //以下两个属性从API Version7开始支持
                isStatusBarLightIcon: false,
                isNavigationBarLightIcon: false,
                //以下两个属性从API Version8开始支持
                statusBarContentColor: '#000000',
                navigationBarContentColor: '#000000'
            };

            windowClass.setSystemBarProperties(SystemBarProperties, (err, data) => {
                if (err) {
                    console.error('Failed to set the system bar properties. Cause: ' + JSON.stringify(err));
                    return;
                }
                console.info('Succeeded in setting the system bar properties. Data: ' + JSON.stringify(data));
            });
        })

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
