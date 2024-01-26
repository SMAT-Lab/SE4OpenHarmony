interface Index_Params {
    message?: string;
    buttonStatus?: boolean;
    contexts?: common.UIAbilityContext;
    dialogController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import preferences from '@ohos.data.preferences';
import abilityAccessCtrl from '@ohos.abilityAccessCtrl';
import identifier from '@ohos.identifier.oaid';
import rpc from '@ohos.rpc';
import { BusinessError } from '@ohos.base';
import { CommonConstants } from '../common/CommonConstants';
import UserPrivacyDialog from '../view/UserPrivacyDialog';
import Logger from '../util/Logger';
const TAG: string = 'Index';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('', this, "message");
        this.__buttonStatus = new ObservedPropertySimple(true, this, "buttonStatus");
        this.contexts = getContext(this) as common.UIAbilityContext;
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new UserPrivacyDialog("2", this, {
                    cancel: () => {
                        this.exitApp();
                    }
                });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            cancel: () => {
                this.exitApp();
            },
            autoCancel: false,
            alignment: DialogAlignment.Bottom,
            offset: { dx: $r('app.float.offset_dx'), dy: $r('app.float.offset_dy') }
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.buttonStatus !== undefined) {
            this.buttonStatus = params.buttonStatus;
        }
        if (params.contexts !== undefined) {
            this.contexts = params.contexts;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__buttonStatus.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __buttonStatus: ObservedPropertySimple<boolean>;
    get buttonStatus() {
        return this.__buttonStatus.get();
    }
    set buttonStatus(newValue: boolean) {
        this.__buttonStatus.set(newValue);
    }
    private contexts: common.UIAbilityContext;
    private dialogController: CustomDialogController;
    onConfirm() {
        let preference = preferences.getPreferences(this.contexts, 'OAID');
        preference.then((res) => {
            res.put('isPrivate', true).then(() => {
                res.flush();
                Logger.info('SplashPage', 'isPrivacy is put success');
            }).catch((err: Error) => {
                Logger.error('SplashPage', 'isPrivacy put failed. Cause:' + JSON.stringify(err));
            });
        });
    }
    exitApp() {
        this.contexts.terminateSelf();
    }
    requestPermissions() {
        // Trigger the dynamic authorization dialog box to request the user to authorize the ad tracking permission.
        const atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
        try {
            let context = getContext(this) as common.Context;
            atManager.requestPermissionsFromUser(context, ['ohos.permission.APP_TRACKING_CONSENT']).then((data) => {
                if (data.authResults[0] == 0) {
                    Logger.info(TAG, 'request permission success');
                    this.onConfirm();
                }
                else {
                    Logger.error(TAG, `user rejected`);
                    this.onConfirm();
                    this.exitApp();
                }
            }).catch((err: BusinessError) => {
                Logger.error(TAG, `request permission failed, error message: ${err.message}`);
            });
        }
        catch (err) {
            Logger.error(TAG, `catch err->${JSON.stringify(err)}`);
        }
    }
    checkAccessToken() {
        // Determine the authorization status.
        let callerTokenId: number = rpc.IPCSkeleton.getCallingTokenId();
        let atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
        try {
            atManager.checkAccessToken(callerTokenId, 'ohos.permission.APP_TRACKING_CONSENT')
                .then((data: abilityAccessCtrl.GrantStatus) => {
                if (data == -1) { // Permission forbidden
                    this.dialogController.open();
                }
                Logger.info(TAG, `checkAccessToken success, data->${JSON.stringify(data)}`);
            })
                .catch((err: BusinessError) => {
                Logger.error(TAG, `checkAccessToken fail, err->${JSON.stringify(err)}`);
            });
        }
        catch (err) {
            Logger.error(TAG, `checkAccessToken catch err->${JSON.stringify(err)}`);
        }
    }
    aboutToAppear() {
        let preference = preferences.getPreferences(this.contexts, 'OAID');
        preference.then((res) => {
            res.get('isPrivate', false).then((isPrivate) => {
                if (isPrivate === true) {
                    this.checkAccessToken();
                }
                else {
                    this.requestPermissions();
                }
            });
        });
    }
    render() {
        Column.create();
        Navigation.create();
        Navigation.hideBackButton(true);
        Navigation.titleMode(NavigationTitleMode.Mini);
        Navigation.title($r('app.string.navigation_title'));
        Navigation.mode(NavigationMode.Stack);
        Navigation.backgroundColor($r('app.color.background_color'));
        Column.create();
        Column.height(CommonConstants.COLUMN_HEIGHT);
        Text.create($r('app.string.OAID_text'));
        Text.fontSize($r('app.float.text_font_size'));
        Text.fontColor(Color.Gray);
        Text.padding({
            top: $r('app.float.text_padding_top'),
            left: $r('app.float.text_padding_left'),
            bottom: $r('app.float.text_padding_bottom')
        });
        Text.width(CommonConstants.TEXT_WIDTH);
        Text.pop();
        Row.create();
        Row.margin({
            right: $r('app.float.textArea_margin_right'),
            left: $r('app.float.textArea_margin_left'),
            bottom: $r('app.float.textArea_margin_bottom')
        });
        TextArea.create({ text: 'OAID: ' + this.message });
        TextArea.backgroundColor(Color.White);
        TextArea.fontFamily('HarmonyHeiTi');
        TextArea.fontWeight(FontWeight.Normal);
        TextArea.fontColor(Color.Black);
        TextArea.focusable(false);
        TextArea.fontSize($r('app.float.textArea_font_size'));
        TextArea.height($r('app.float.textArea_height'));
        TextArea.padding({
            top: $r('app.float.textArea_padding_top'),
            right: $r('app.float.textArea_padding_right'),
            left: $r('app.float.textArea_padding_left'),
            bottom: $r('app.float.textArea_padding_bottom')
        });
        TextArea.width(CommonConstants.TEXTAREA_WIDTH);
        Row.pop();
        Blank.create();
        Blank.pop();
        Button.createWithLabel($r('app.string.button_name'), { stateEffect: this.buttonStatus });
        Button.backgroundColor(this.buttonStatus ? $r('app.color.button_color') : $r('app.color.button_disabled_color'));
        Button.fontSize($r('app.float.button_font_size'));
        Button.fontColor(Color.White);
        Button.height($r('app.float.button_height'));
        Button.margin({ bottom: $r('app.float.button_margin_bottom') });
        Button.width(CommonConstants.BOTTOM_WIDTH);
        Button.onClick(() => {
            try {
                identifier.getOAID((err: BusinessError, data) => {
                    if (err.code) {
                        Logger.error(TAG, `get oaid failed, code: ${err.code}, message: ${err.message}`);
                    }
                    else {
                        this.message = data;
                        this.buttonStatus = false;
                        Logger.info(TAG, `get oaid by callback success`);
                    }
                });
            }
            catch (err) {
                Logger.error(TAG, `get oaid catch error, code: ${err?.code}, message: ${err?.message}`);
            }
        });
        Button.pop();
        Column.pop();
        Navigation.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
