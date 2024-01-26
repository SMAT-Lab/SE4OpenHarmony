interface ModifyInfo_Params {
    passWord?: string;
    emailInfo?: string;
    signature?: string;
    confirmPassword?: string;
    username?: string;
    bundleName?: string;
    dataSet?: MyDataSource;
    storage?: AccountData;
    accountModel?: AccountModel;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ModifyInfo_" + ++__generate__Id;
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
const TAG: string = '[ModifyInfo]';
class BasicDataSource implements IDataSource {
    private listeners: DataChangeListener[] = [];
    public totalCount() {
        return 0;
    }
    public getData(index: number): DataArray {
        return new DataArray();
    }
    registerDataChangeListener(listener: DataChangeListener) {
        if (this.listeners.indexOf(listener) < 0) {
            this.listeners.push(listener);
        }
    }
    unregisterDataChangeListener(listener: DataChangeListener) {
        const pos = this.listeners.indexOf(listener);
        if (pos >= 0) {
            this.listeners.splice(pos, 1);
        }
    }
    notifyDataReload() {
        this.listeners.forEach(listener => {
            listener.onDataReloaded();
        });
    }
    notifyDataAdd(index: number) {
        this.listeners.forEach(listener => {
            listener.onDataAdd(index);
        });
    }
    notifyDataChange(index: number) {
        this.listeners.forEach(listener => {
            listener.onDataChange(index);
        });
    }
    notifyDataDelete(index: number) {
        this.listeners.forEach(listener => {
            listener.onDataDelete(index);
        });
    }
    notifyDataMove(from: number, to: number) {
        this.listeners.forEach(listener => {
            listener.onDataMove(from, to);
        });
    }
}
class DataArray {
    text: Resource = $r('app.string.empty');
    inputType: InputType = InputType.Normal;
    length: number = 0;
    event: number = 0;
    promptText: Resource = $r('app.string.empty');
}
class MyDataSource extends BasicDataSource {
    private dataArray: Array<DataArray> = [
        {
            text: $r('app.string.email'),
            inputType: InputType.Normal,
            length: 18,
            event: 0,
            promptText: $r('app.string.prompt_email')
        },
        {
            text: $r('app.string.signature'),
            inputType: InputType.Normal,
            length: 18,
            event: 1,
            promptText: $r('app.string.prompt_signature')
        },
        {
            text: $r('app.string.unpassword'),
            inputType: InputType.Password,
            length: 18,
            event: 2,
            promptText: $r('app.string.prompt_password')
        },
        {
            text: $r('app.string.unconfirm_password'),
            inputType: InputType.Password,
            length: 18,
            event: 3,
            promptText: $r('app.string.prompt_confirm_password')
        }
    ];
    public totalCount() {
        return this.dataArray.length;
    }
    public getData(index: number) {
        return this.dataArray[index];
    }
    public addData(index: number) {
        this.dataArray.splice(index, 0);
        this.notifyDataAdd(index);
    }
    public pushData(index: number) {
        this.dataArray.push();
        this.notifyDataAdd(this.dataArray.length - 1);
    }
    public replaceData(result: Array<DataArray>) {
        this.dataArray = result;
    }
}
export class ModifyInfo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__passWord = new ObservedPropertySimple('', this, "passWord");
        this.__emailInfo = new ObservedPropertySimple('', this, "emailInfo");
        this.__signature = new ObservedPropertySimple('', this, "signature");
        this.__confirmPassword = new ObservedPropertySimple('', this, "confirmPassword");
        this.__username = new SynchedPropertySimpleOneWay(params.username, this, "username");
        this.__bundleName = new SynchedPropertySimpleOneWay(params.bundleName, this, "bundleName");
        this.__dataSet = new ObservedPropertyObject(new MyDataSource(), this, "dataSet");
        this.storage = new AccountData();
        this.accountModel = new AccountModel();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ModifyInfo_Params) {
        if (params.passWord !== undefined) {
            this.passWord = params.passWord;
        }
        if (params.emailInfo !== undefined) {
            this.emailInfo = params.emailInfo;
        }
        if (params.signature !== undefined) {
            this.signature = params.signature;
        }
        if (params.confirmPassword !== undefined) {
            this.confirmPassword = params.confirmPassword;
        }
        this.username = params.username;
        this.bundleName = params.bundleName;
        if (params.dataSet !== undefined) {
            this.dataSet = params.dataSet;
        }
        if (params.storage !== undefined) {
            this.storage = params.storage;
        }
        if (params.accountModel !== undefined) {
            this.accountModel = params.accountModel;
        }
    }
    aboutToBeDeleted() {
        this.__passWord.aboutToBeDeleted();
        this.__emailInfo.aboutToBeDeleted();
        this.__signature.aboutToBeDeleted();
        this.__confirmPassword.aboutToBeDeleted();
        this.__username.aboutToBeDeleted();
        this.__bundleName.aboutToBeDeleted();
        this.__dataSet.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __passWord: ObservedPropertySimple<string>;
    get passWord() {
        return this.__passWord.get();
    }
    set passWord(newValue: string) {
        this.__passWord.set(newValue);
    }
    private __emailInfo: ObservedPropertySimple<string>;
    get emailInfo() {
        return this.__emailInfo.get();
    }
    set emailInfo(newValue: string) {
        this.__emailInfo.set(newValue);
    }
    private __signature: ObservedPropertySimple<string>;
    get signature() {
        return this.__signature.get();
    }
    set signature(newValue: string) {
        this.__signature.set(newValue);
    }
    private __confirmPassword: ObservedPropertySimple<string>;
    get confirmPassword() {
        return this.__confirmPassword.get();
    }
    set confirmPassword(newValue: string) {
        this.__confirmPassword.set(newValue);
    }
    private __username: SynchedPropertySimpleOneWay<string>;
    get username() {
        return this.__username.get();
    }
    set username(newValue: string) {
        this.__username.set(newValue);
    }
    private __bundleName: SynchedPropertySimpleOneWay<string>;
    get bundleName() {
        return this.__bundleName.get();
    }
    set bundleName(newValue: string) {
        this.__bundleName.set(newValue);
    }
    private __dataSet: ObservedPropertyObject<MyDataSource>;
    get dataSet() {
        return this.__dataSet.get();
    }
    set dataSet(newValue: MyDataSource) {
        this.__dataSet.set(newValue);
    }
    private storage: AccountData;
    private accountModel: AccountModel;
    async getInfo(value: string, name: string, credentialType: string) {
        try {
            value = await this.accountModel.getAccountCredential(name, credentialType);
            Logger.info(TAG, `getAccountCredential email is ${value}`);
        }
        catch (err) {
            Logger.info(TAG, `getAccountCredential failed err is ${JSON.stringify(err)}`);
        }
        return value;
    }
    render() {
        Column.create();
        Row.create();
        Row.margin(5);
        Text.create($r('app.string.appname'));
        Text.margin(10);
        Text.fontSize(18);
        Text.width('25%');
        Text.textAlign(TextAlign.End);
        Text.pop();
        Text.create(this.bundleName);
        Text.margin(20);
        Text.width('55%');
        Text.fontSize(20);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Row.pop();
        Row.create();
        Row.margin(5);
        Text.create($r('app.string.unusername'));
        Text.margin(10);
        Text.fontSize(18);
        Text.width('25%');
        Text.textAlign(TextAlign.End);
        Text.pop();
        Text.create(this.username);
        Text.margin(10);
        Text.width('55%');
        Text.fontSize(20);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Row.pop();
        LazyForEach.create("2", this, ObservedObject.GetRawObject(this.dataSet), (item: DataArray, index: number) => {
            this.isRenderingInProgress = true;
            Row.create();
            Row.margin(5);
            Text.create(item.text);
            Text.margin(10);
            Text.fontSize(18);
            Text.width('25%');
            Text.textAlign(TextAlign.End);
            Text.backgroundColor('#ffffff');
            Text.pop();
            Column.create();
            Text.create(item.promptText);
            Text.fontSize(14);
            Text.width('80%');
            Text.fontColor('#ffb0b0b0');
            Text.textAlign(TextAlign.Center);
            Text.pop();
            TextInput.create({ placeholder: 'xxxxx' });
            TextInput.id('Modify' + (index + 1));
            TextInput.margin(10);
            TextInput.width('55%');
            TextInput.fontSize(20);
            TextInput.maxLength(20);
            TextInput.type(item.inputType);
            TextInput.maxLength(item.length);
            TextInput.fontWeight(FontWeight.Bold);
            TextInput.placeholderFont({ size: 16, weight: FontWeight.Normal });
            TextInput.onChange(async (value: string) => {
                switch (item.event) {
                    case 0:
                        this.emailInfo = value;
                        break;
                    case 1:
                        this.signature = value;
                        break;
                    case 2:
                        this.passWord = value;
                        break;
                    case 3:
                        this.confirmPassword = value;
                        break;
                    default:
                        break;
                }
            });
            Column.pop();
            Row.pop();
            this.isRenderingInProgress = false;
        }, (item: DataArray) => JSON.stringify(item));
        LazyForEach.pop();
        Button.createWithLabel($r('app.string.setting'));
        Button.id('modComplete');
        Button.margin(10);
        Button.width('60%');
        Button.fontSize(20);
        Button.fontColor(Color.White);
        Button.type(ButtonType.Capsule);
        Button.onClick(async () => {
            if (this.emailInfo !== '') {
                await this.accountModel.setAccountCredential(`${this.username}_${this.bundleName}`, `email_${this.bundleName}`, this.emailInfo);
            }
            if (this.signature !== '') {
                await this.accountModel.setAccountCredential(`${this.username}_${this.bundleName}`, `signature_${this.bundleName}`, this.signature);
            }
            let res: RegExp = new RegExp(`^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$`);
            let userPassWord: preferences.ValueType = await this.storage.getStorageValue(getContext(), this.username, this.bundleName);
            if (this.emailInfo !== '' && !res.test(this.emailInfo)) {
                AlertDialog.show({
                    message: $r('app.string.emailinfo'),
                    confirm: {
                        value: $r('app.string.close'),
                        action: () => {
                            this.emailInfo = '';
                        }
                    },
                    cancel: () => {
                        Logger.info(TAG, `AlertDialog close`);
                    }
                });
            }
            else if (this.passWord !== '' && this.passWord.length < 6) {
                AlertDialog.show({
                    message: $r('app.string.min_password'),
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
            else if (this.passWord !== '' && this.passWord === userPassWord) {
                AlertDialog.show({
                    message: $r('app.string.userpassword'),
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
            else if (this.confirmPassword !== this.passWord) {
                AlertDialog.show({
                    message: $r('app.string.password_error'),
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
            else if (this.passWord !== '' && this.confirmPassword !== '') {
                await this.storage.putStorageValue(getContext(), this.username, this.passWord, this.bundleName);
                let email = await this.getInfo('', `${this.username}_${this.bundleName}`, `email_${this.bundleName}`);
                let signature = await this.getInfo('', `${this.username}_${this.bundleName}`, `signature_${this.bundleName}`);
                AlertDialog.show({
                    message: $r('app.string.modify_info'),
                    confirm: {
                        value: $r('app.string.close'),
                        action: () => {
                            router.replaceUrl({
                                url: 'pages/Account',
                                params: {
                                    email: email,
                                    signature: signature,
                                    bundleName: this.bundleName,
                                    username: this.username
                                }
                            });
                        }
                    },
                    cancel: () => {
                        Logger.info(TAG, `AlertDialog close`);
                    }
                });
            }
            else {
                let email = await this.getInfo('', `${this.username}_${this.bundleName}`, `email_${this.bundleName}`);
                let signature = await this.getInfo('', `${this.username}_${this.bundleName}`, `signature_${this.bundleName}`);
                AlertDialog.show({
                    message: $r('app.string.modify_info'),
                    confirm: {
                        value: $r('app.string.close'),
                        action: () => {
                            router.replaceUrl({
                                url: 'pages/Account',
                                params: {
                                    email: email,
                                    signature: signature,
                                    bundleName: this.bundleName,
                                    username: this.username
                                }
                            });
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
