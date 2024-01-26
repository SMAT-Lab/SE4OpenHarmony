interface Index_Params {
    defaultPassword?: string;
    patternLockController?: PatternLockController;
    message?: Resource;
    isReset?: boolean;
    password?: Array<number>;
    isHasPass?: boolean;
    isShowSetting?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import router from '@ohos.router';
import Logger from '../model/Logger';
import PreferencesUtils from '../model/PreferencesUtils';
import TitleBar from '../common/TitleBar';
const TAG: string = 'Index';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.defaultPassword = '';
        this.patternLockController = new PatternLockController();
        this.__message = new ObservedPropertyObject($r('app.string.message_input'), this, "message");
        this.__isReset = new ObservedPropertySimple(false, this, "isReset");
        this.__password = new ObservedPropertyObject([], this, "password");
        this.__isHasPass = new ObservedPropertySimple(true, this, "isHasPass");
        this.__isShowSetting = new ObservedPropertySimple(false, this, "isShowSetting");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.defaultPassword !== undefined) {
            this.defaultPassword = params.defaultPassword;
        }
        if (params.patternLockController !== undefined) {
            this.patternLockController = params.patternLockController;
        }
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.isReset !== undefined) {
            this.isReset = params.isReset;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
        if (params.isHasPass !== undefined) {
            this.isHasPass = params.isHasPass;
        }
        if (params.isShowSetting !== undefined) {
            this.isShowSetting = params.isShowSetting;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__isReset.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__isHasPass.aboutToBeDeleted();
        this.__isShowSetting.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private defaultPassword: string;
    private patternLockController: PatternLockController;
    private __message: ObservedPropertyObject<Resource>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: Resource) {
        this.__message.set(newValue);
    }
    private __isReset: ObservedPropertySimple<boolean>;
    get isReset() {
        return this.__isReset.get();
    }
    set isReset(newValue: boolean) {
        this.__isReset.set(newValue);
    }
    private __password: ObservedPropertyObject<Array<number>>;
    get password() {
        return this.__password.get();
    }
    set password(newValue: Array<number>) {
        this.__password.set(newValue);
    }
    private __isHasPass: ObservedPropertySimple<boolean>;
    get isHasPass() {
        return this.__isHasPass.get();
    }
    set isHasPass(newValue: boolean) {
        this.__isHasPass.set(newValue);
    }
    private __isShowSetting: ObservedPropertySimple<boolean>;
    get isShowSetting() {
        return this.__isShowSetting.get();
    }
    set isShowSetting(newValue: boolean) {
        this.__isShowSetting.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundImage($r('app.media.bg'));
        Column.backgroundImageSize(ImageSize.Cover);
        Column.opacity(0.7);
        let earlierCreatedChild_2: TitleBar = (this && this.findChildById) ? this.findChildById("2") as TitleBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new TitleBar("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Column.create();
        Column.layoutWeight(1);
        Column.justifyContent(FlexAlign.End);
        If.create();
        if (this.isHasPass && !this.isReset) {
            If.branchId(0);
            Text.create($r('app.string.reset_password'));
            Text.fontSize(25);
            Text.fontWeight(FontWeight.Bold);
            Text.padding(20);
            Text.width('100%');
            Text.fontColor(Color.Blue);
            Text.onClick(() => {
                this.isReset = true;
                this.message = $r('app.string.message_input_old');
                this.password = [];
                this.patternLockController.reset();
            });
            Text.pop();
        }
        If.pop();
        If.create();
        if (this.isShowSetting) {
            If.branchId(0);
            Button.createWithLabel($r('app.string.message_set_password'));
            Button.margin(30);
            Button.width('60%');
            Button.height(30);
            Button.onClick(() => {
                this.setPassword();
            });
            Button.pop();
        }
        If.pop();
        Text.create(this.message);
        Text.textAlign(TextAlign.Center);
        Text.fontSize(30);
        Text.width('90%');
        Text.padding(10);
        Text.pop();
        PatternLock.create(this.patternLockController);
        PatternLock.sideLength(300);
        PatternLock.circleRadius(15);
        PatternLock.pathStrokeWidth(15);
        PatternLock.autoReset(true);
        PatternLock.margin({ top: 30, bottom: 50 });
        PatternLock.onPatternComplete((input: Array<number>) => {
            if (input === null || input === undefined || input.length < 5) {
                this.message = $r('app.string.message_password_length_insufficient');
                return;
            }
            if (this.isHasPass) {
                if (this.defaultPassword === input.toString()) {
                    if (this.isReset) {
                        this.message = $r('app.string.message_input_new');
                        this.defaultPassword = 'null';
                        this.patternLockController.reset();
                        this.password = [];
                        this.isHasPass = false;
                        return;
                    }
                    router.replace({
                        url: 'pages/Home'
                    });
                }
                else {
                    this.message = $r('app.string.message_incorrect');
                    this.password = [];
                    return;
                }
            }
            if (this.password.length > 0) {
                if (this.password.toString() === input.toString()) {
                    this.password = input;
                    this.message = $r('app.string.message_correct');
                    this.isShowSetting = true;
                }
                else {
                    this.message = $r('app.string.message_not_match');
                    this.patternLockController.reset();
                }
            }
            else {
                this.password = input;
                this.message = $r('app.string.message_input_again');
                this.patternLockController.reset();
            }
        });
        Column.pop();
        Column.pop();
    }
    async aboutToAppear() {
        this.password = [];
        this.defaultPassword = await PreferencesUtils.getPassword(getContext(this)) as string;
        if (this.defaultPassword === 'null') {
            this.isHasPass = false;
        }
        else {
            this.isHasPass = true;
        }
    }
    async setPassword() {
        this.defaultPassword = this.password.toString();
        await PreferencesUtils.setPassword(this.defaultPassword, getContext(this));
        this.message = $r('app.string.message_set_success');
        this.isShowSetting = false;
        this.isHasPass = true;
        this.password = [];
        this.patternLockController.reset();
        this.isReset = false;
    }
}
loadDocument(new Index("1", undefined, {}));
