interface AccountInfo_Params {
    email?: string;
    username?: string;
    signature?: string;
    bundleName?: string;
    storage?: AccountData;
    accountModel?: AccountModel;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AccountInfo_" + ++__generate__Id;
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
import { AccountData } from '../model/AccountData';
import { AccountModel } from '../model/AccountModel';
const TAG: string = '[AccountInfo]';
export class AccountInfo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__email = new SynchedPropertySimpleOneWay(params.email, this, "email");
        this.__username = new SynchedPropertySimpleOneWay(params.username, this, "username");
        this.__signature = new SynchedPropertySimpleOneWay(params.signature, this, "signature");
        this.__bundleName = new SynchedPropertySimpleOneWay(params.bundleName, this, "bundleName");
        this.storage = new AccountData();
        this.accountModel = new AccountModel();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AccountInfo_Params) {
        this.email = params.email;
        this.username = params.username;
        this.signature = params.signature;
        this.bundleName = params.bundleName;
        if (params.storage !== undefined) {
            this.storage = params.storage;
        }
        if (params.accountModel !== undefined) {
            this.accountModel = params.accountModel;
        }
    }
    aboutToBeDeleted() {
        this.__email.aboutToBeDeleted();
        this.__username.aboutToBeDeleted();
        this.__signature.aboutToBeDeleted();
        this.__bundleName.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __email: SynchedPropertySimpleOneWay<string>;
    get email() {
        return this.__email.get();
    }
    set email(newValue: string) {
        this.__email.set(newValue);
    }
    private __username: SynchedPropertySimpleOneWay<string>;
    get username() {
        return this.__username.get();
    }
    set username(newValue: string) {
        this.__username.set(newValue);
    }
    private __signature: SynchedPropertySimpleOneWay<string>;
    get signature() {
        return this.__signature.get();
    }
    set signature(newValue: string) {
        this.__signature.set(newValue);
    }
    private __bundleName: SynchedPropertySimpleOneWay<string>;
    get bundleName() {
        return this.__bundleName.get();
    }
    set bundleName(newValue: string) {
        this.__bundleName.set(newValue);
    }
    private storage: AccountData;
    private accountModel: AccountModel;
    infoShow(title: Resource, value: string, parent = null) {
        Row.create();
        Row.padding({ left: 5 });
        Text.create(title);
        Text.margin(10);
        Text.fontSize(18);
        Text.width('25%');
        Text.textAlign(TextAlign.End);
        Text.pop();
        Text.create(value);
        Text.margin(10);
        Text.width('55%');
        Text.fontSize(20);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Row.pop();
    }
    render() {
        Scroll.create();
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.layoutWeight(1);
        this.infoShow($r('app.string.appname'), this.bundleName, this);
        this.infoShow($r('app.string.unusername'), this.username, this);
        this.infoShow($r('app.string.email'), this.email, this);
        this.infoShow($r('app.string.signature'), this.signature, this);
        Button.createWithLabel($r('app.string.modify'));
        Button.id('modify');
        Button.margin(10);
        Button.width('60%');
        Button.fontSize(20);
        Button.fontColor(Color.White);
        Button.type(ButtonType.Capsule);
        Button.onClick(() => {
            router.replaceUrl({
                url: 'pages/Modify',
                params: {
                    username: this.username,
                    bundleName: this.bundleName,
                    email: this.email,
                    signature: this.signature
                }
            });
        });
        Button.pop();
        Button.createWithLabel($r('app.string.application'));
        Button.id('application');
        Button.margin(10);
        Button.width('60%');
        Button.fontSize(20);
        Button.fontColor(Color.White);
        Button.type(ButtonType.Capsule);
        Button.onClick(() => {
            AlertDialog.show({
                title: $r('app.string.warning'),
                message: $r('app.string.switch_app'),
                primaryButton: {
                    value: $r('app.string.confirm'),
                    action: () => {
                        router.replaceUrl({
                            url: 'pages/Index'
                        });
                    }
                },
                secondaryButton: {
                    value: $r('app.string.cancel'),
                    action: () => {
                        Logger.info(TAG, `AlertDialog enter`);
                    }
                },
                cancel: () => {
                    Logger.info(TAG, `AlertDialog close`);
                }
            });
        });
        Button.pop();
        Button.createWithLabel($r('app.string.delete'));
        Button.id('delete');
        Button.margin(10);
        Button.width('60%');
        Button.fontSize(20);
        Button.fontColor(Color.White);
        Button.type(ButtonType.Capsule);
        Button.onClick(() => {
            AlertDialog.show({
                title: $r('app.string.warning'),
                message: $r('app.string.delete_account'),
                primaryButton: {
                    value: $r('app.string.confirm'),
                    action: () => {
                        this.accountModel.deleteAccount(`${this.username}_${this.bundleName}`);
                        this.storage.deleteStorageValue(getContext(), this.username, this.bundleName);
                        router.replaceUrl({
                            url: 'pages/Login',
                            params: {
                                bundleName: this.bundleName
                            }
                        });
                    }
                },
                secondaryButton: {
                    value: $r('app.string.cancel'),
                    action: () => {
                        Logger.info(TAG, `AlertDialog enter`);
                    }
                },
                cancel: () => {
                    Logger.info(TAG, `AlertDialog close`);
                }
            });
        });
        Button.pop();
        Column.pop();
        Scroll.pop();
    }
}
