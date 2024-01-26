interface NewKey_Params {
    cipherTextinfo?: string;
    plainTextinfo?: string;
    message?: string;
    huksModel?: HuksModel;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "NewKey_" + ++__generate__Id;
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
import prompt from '@ohos.promptAction';
import Logger from '../model/Logger';
import { HuksModel } from '../model/HuksModel';
const TAG: string = '[HUKS]';
export class NewKey extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__cipherTextinfo = new ObservedPropertySimple('', this, "cipherTextinfo");
        this.__plainTextinfo = new ObservedPropertySimple('', this, "plainTextinfo");
        this.__message = new ObservedPropertySimple('', this, "message");
        this.huksModel = new HuksModel();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: NewKey_Params) {
        if (params.cipherTextinfo !== undefined) {
            this.cipherTextinfo = params.cipherTextinfo;
        }
        if (params.plainTextinfo !== undefined) {
            this.plainTextinfo = params.plainTextinfo;
        }
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.huksModel !== undefined) {
            this.huksModel = params.huksModel;
        }
    }
    aboutToBeDeleted() {
        this.__cipherTextinfo.aboutToBeDeleted();
        this.__plainTextinfo.aboutToBeDeleted();
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __cipherTextinfo: ObservedPropertySimple<string>;
    get cipherTextinfo() {
        return this.__cipherTextinfo.get();
    }
    set cipherTextinfo(newValue: string) {
        this.__cipherTextinfo.set(newValue);
    }
    private __plainTextinfo: ObservedPropertySimple<string>;
    get plainTextinfo() {
        return this.__plainTextinfo.get();
    }
    set plainTextinfo(newValue: string) {
        this.__plainTextinfo.set(newValue);
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private huksModel: HuksModel;
    render() {
        Stack.create({ alignContent: Alignment.Center });
        Stack.width('100%');
        Stack.height('100%');
        Column.create();
        Text.create($r('app.string.input_message'));
        Text.fontSize(20);
        Text.margin({ left: 1, top: 1 });
        Text.pop();
        TextInput.create();
        TextInput.enableKeyboardOnFocus(false);
        TextInput.margin(4);
        TextInput.width('90%');
        TextInput.id('encryptionInput');
        TextInput.onChange((value: string) => {
            this.message = value;
        });
        Row.create();
        Button.createWithLabel($r('app.string.send_message'));
        Button.margin(10);
        Button.fontSize(20);
        Button.width('45%');
        Button.height('6%');
        Button.id('encryptionBtn');
        Button.onClick(() => {
            if (this.message === '') {
                prompt.showToast({
                    message: 'This message is null.'
                });
            }
            else {
                this.huksModel.encryptData(this.message, (result: string) => {
                    Logger.info(TAG, `this result = ${result}`);
                    this.cipherTextinfo = `${result}`;
                });
            }
        });
        Button.pop();
        Row.pop();
        Text.create(this.cipherTextinfo);
        Text.id('encryptionInfo');
        Text.fontSize(18);
        Text.width('85%');
        Text.height('25%');
        Text.border({ width: 2, color: Color.Black });
        Text.margin(10);
        Text.pop();
        Row.create();
        Button.createWithLabel($r('app.string.recieve_message'));
        Button.margin(10);
        Button.fontSize(20);
        Button.width('45%');
        Button.height('6%');
        Button.id('decryptionBtn');
        Button.onClick(() => {
            if (this.message === '') {
                prompt.showToast({
                    message: 'This message is null.'
                });
            }
            else {
                this.huksModel.decryptData((result: string) => {
                    Logger.info(TAG, `this result = ${result}`);
                    this.plainTextinfo = `${result}`;
                });
            }
        });
        Button.pop();
        Row.pop();
        Text.create(this.plainTextinfo);
        Text.id('decryptionInfo');
        Text.fontSize(18);
        Text.width('85%');
        Text.height('25%');
        Text.border({ width: 2, color: Color.Black });
        Text.margin(10);
        Text.pop();
        Column.pop();
        Stack.pop();
    }
}
