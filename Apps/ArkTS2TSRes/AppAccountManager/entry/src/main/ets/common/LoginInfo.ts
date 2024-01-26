interface LoginInfo_Params {
    name?: string;
    password?: string;
    bundleName?: string;
    storage?: AccountData;
    accountModel?: AccountModel;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "LoginInfo_" + ++__generate__Id;
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
import preferences from '@ohos.data.preferences';
const TAG: string = '[LoginInfo]';
export class LoginInfo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__name = new ObservedPropertySimple('', this, "name");
        this.__password = new ObservedPropertySimple('', this, "password");
        this.__bundleName = new SynchedPropertySimpleOneWay(params.bundleName, this, "bundleName");
        this.storage = new AccountData();
        this.accountModel = new AccountModel();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: LoginInfo_Params) {
        if (params.name !== undefined) {
            this.name = params.name;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
        this.bundleName = params.bundleName;
        if (params.storage !== undefined) {
            this.storage = params.storage;
        }
        if (params.accountModel !== undefined) {
            this.accountModel = params.accountModel;
        }
    }
    aboutToBeDeleted() {
        this.__name.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__bundleName.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __name: ObservedPropertySimple<string>;
    get name() {
        return this.__name.get();
    }
    set name(newValue: string) {
        this.__name.set(newValue);
    }
    private __password: ObservedPropertySimple<string>;
    get password() {
        return this.__password.get();
    }
    set password(newValue: string) {
        this.__password.set(newValue);
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
    render() {
        Column.create();
        Row.create();
        Row.margin({ top: '10%' });
        Row.padding({ left: 5 });
        Text.create($r('app.string.appname'));
        Text.margin(10);
        Text.fontSize(18);
        Text.width('20%');
        Text.textAlign(TextAlign.End);
        Text.pop();
        Text.create(this.bundleName);
        Text.margin(10);
        Text.width('55%');
        Text.fontSize(20);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Row.pop();
        Row.create();
        Row.padding({ left: 5 });
        Text.create($r('app.string.username'));
        Text.margin(10);
        Text.fontSize(18);
        Text.width('20%');
        Text.textAlign(TextAlign.End);
        Text.pop();
        TextInput.create({ placeholder: 'xxxxxxx' });
        TextInput.id('nameInput');
        TextInput.margin(10);
        TextInput.width('55%');
        TextInput.fontSize(20);
        TextInput.maxLength(20);
        TextInput.fontWeight(FontWeight.Bold);
        TextInput.placeholderFont({ size: 16, weight: FontWeight.Normal });
        TextInput.onChange((value: string) => {
            this.name = value;
        });
        Row.pop();
        Row.create();
        Row.padding({ left: 5 });
        Text.create($r('app.string.password'));
        Text.margin(10);
        Text.fontSize(18);
        Text.width('20%');
        Text.textAlign(TextAlign.End);
        Text.pop();
        TextInput.create({ placeholder: 'xxxxxxx' });
        TextInput.id('passwordInput');
        TextInput.margin(10);
        TextInput.width('55%');
        TextInput.fontSize(20);
        TextInput.maxLength(20);
        TextInput.type(InputType.Password);
        TextInput.fontWeight(FontWeight.Bold);
        TextInput.placeholderFont({ size: 16, weight: FontWeight.Normal });
        TextInput.onChange((value: string) => {
            this.password = value;
        });
        Row.pop();
        Button.createWithLabel($r('app.string.register'));
        Button.id('register');
        Button.margin(10);
        Button.width('60%');
        Button.fontSize(20);
        Button.fontColor(Color.White);
        Button.type(ButtonType.Capsule);
        Button.onClick(() => {
            router.replaceUrl({
                url: 'pages/Register',
                params: {
                    bundleName: this.bundleName
                }
            });
        });
        Button.pop();
        Button.createWithLabel($r('app.string.login'));
        Button.id('login');
        Button.margin(10);
        Button.width('60%');
        Button.fontSize(20);
        Button.fontColor(Color.White);
        Button.type(ButtonType.Capsule);
        Button.onClick(async () => {
            let result: preferences.ValueType = await this.storage.getStorageValue(getContext(), this.name, this.bundleName);
            let effect: preferences.ValueType = await this.storage.getStorageValue(getContext(), this.bundleName, `${this.name}_${this.bundleName}`);
            if (this.name === '') {
                AlertDialog.show({
                    message: $r('app.string.blank'),
                    confirm: {
                        value: $r('app.string.close'),
                        action: () => {
                            Logger.info(TAG, `AlertDialog enter`);
                        }
                    },
                    cancel: () => {
                        Logger.info(TAG, `AlertDialog close`);
                    }
                });
            }
            else if (this.password === '') {
                AlertDialog.show({
                    message: $r('app.string.password_blank'),
                    confirm: {
                        value: $r('app.string.close'),
                        action: () => {
                            Logger.info(TAG, `AlertDialog enter`);
                        }
                    },
                    cancel: () => {
                        Logger.info(TAG, `AlertDialog close`);
                    }
                });
            }
            else if (result === this.password && effect === 'true') {
                let email: string = '';
                let signature: string = '';
                try {
                    email = await this.accountModel.getAccountCredential(`${this.name}_${this.bundleName}`, `email_${this.bundleName}`);
                    Logger.info(TAG, `getAccountCredential email is ${email}`);
                }
                catch (err) {
                    email = '';
                    Logger.info(TAG, `getAccountCredential failed err is ${JSON.stringify(err)}`);
                }
                try {
                    signature = await this.accountModel.getAccountCredential(`${this.name}_${this.bundleName}`, `signature_${this.bundleName}`);
                    Logger.info(TAG, `getAccountCredential signature is ${signature}`);
                }
                catch (err) {
                    signature = '';
                    Logger.info(TAG, `getAccountCredential failed err is ${JSON.stringify(err)}`);
                }
                router.replaceUrl({
                    url: 'pages/Account',
                    params: {
                        email: email,
                        username: this.name,
                        signature: signature,
                        bundleName: this.bundleName
                    }
                });
            }
            else {
                AlertDialog.show({
                    message: $r('app.string.password_message'),
                    confirm: {
                        value: $r('app.string.close'),
                        action: () => {
                            Logger.info(TAG, `AlertDialog enter`);
                        }
                    },
                    cancel: () => {
                        Logger.info(TAG, `AlertDialog close`);
                    }
                });
            }
        });
        Button.pop();
        Column.pop();
    }
}
