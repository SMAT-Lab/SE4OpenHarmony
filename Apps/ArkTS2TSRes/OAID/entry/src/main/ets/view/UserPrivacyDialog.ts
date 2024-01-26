interface UserPrivacyDialog_Params {
    controller?: CustomDialogController;
    cancel?: Function;
    confirm?: Function;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "UserPrivacyDialog_" + ++__generate__Id;
}
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
import common from '@ohos.app.ability.common';
import Want from '@ohos.app.ability.Want';
import { BusinessError } from '@ohos.base';
import { CommonConstants } from '../common/CommonConstants';
import Logger from '../util/Logger';
function __Text__descStyle(): void {
    Text.fontWeight(FontWeight.Normal);
    Text.width(CommonConstants.DESC_STYLE_WIDTH);
    Text.lineHeight($r('app.float.descStyle_line_height'));
    Text.margin({ top: $r('app.float.descStyle_margin_top') });
}
export default class UserPrivacyDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = new CustomDialogController({
            builder: ''
        }, this);
        this.cancel = () => {
        };
        this.confirm = () => {
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: UserPrivacyDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.cancel !== undefined) {
            this.cancel = params.cancel;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private cancel: Function;
    private confirm: Function;
    // The application information page is displayed.
    startSettingsAppInfoAbilityExplicit(): void {
        let context = getContext(this) as common.UIAbilityContext;
        let want: Want = {
            bundleName: 'com.huawei.hmos.settings',
            abilityName: 'com.huawei.hmos.settings.AppInfoAbility',
            action: 'action.settings.app.info',
            parameters: {
                settingsParamBundleName: 'com.example.OAID'
            }
        };
        context.startAbility(want)
            .catch((err: BusinessError) => {
            Logger.error(`Failed to startAbility. Code: ${err.code}, message: ${err.message}`);
        });
    }
    render() {
        Column.create();
        Column.padding($r('app.float.windows_padding'));
        Text.create($r('app.string.description_tips'));
        __Text__descStyle();
        Text.fontSize($r('app.float.blackText_font_size'));
        Text.pop();
        Text.create($r('app.string.functional_requirement'));
        __Text__descStyle();
        Text.fontSize($r('app.float.descStyle_font_size'));
        Text.opacity(CommonConstants.TEXT_OPACITY);
        Text.pop();
        Row.create();
        Row.width(CommonConstants.WINDOWS_BOTTOM_WIDTH);
        Row.margin({ top: $r('app.float.buttons_margin_bottom') });
        Row.justifyContent(FlexAlign.SpaceEvenly);
        Button.createWithLabel($r('app.string.quit'));
        Button.backgroundColor(Color.White);
        Button.fontColor($r('app.color.button_color'));
        Button.onClick(() => {
            this.controller.close();
            this.cancel();
        });
        Button.pop();
        Divider.create();
        Divider.vertical(true);
        Divider.height($r('app.float.divider_height'));
        Divider.opacity(CommonConstants.DIVIDER_OPACITY);
        Button.createWithLabel($r('app.string.redirect'));
        Button.backgroundColor(Color.White);
        Button.fontColor($r('app.color.button_color'));
        Button.onClick(() => {
            this.startSettingsAppInfoAbilityExplicit();
            this.cancel();
        });
        Button.pop();
        Row.pop();
        Column.pop();
    }
}
