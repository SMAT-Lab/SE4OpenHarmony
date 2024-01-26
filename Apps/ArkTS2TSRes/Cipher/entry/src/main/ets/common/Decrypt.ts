interface Decrypt_Params {
    info?: string;
    message?: string;
    algorithmType?: string;
    cipherModel?: CipherModel;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Decrypt_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
import { CipherModel } from '../model/CipherModel';
import Logger from '../model/Logger';
const TAG: string = '[Decrypt]';
export class Decrypt extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__info = new ObservedPropertySimple('', this, "info");
        this.__message = new ObservedPropertySimple('', this, "message");
        this.__algorithmType = new ObservedPropertySimple('Decrypt Algorithm', this, "algorithmType");
        this.cipherModel = new CipherModel();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Decrypt_Params) {
        if (params.info !== undefined) {
            this.info = params.info;
        }
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.algorithmType !== undefined) {
            this.algorithmType = params.algorithmType;
        }
        if (params.cipherModel !== undefined) {
            this.cipherModel = params.cipherModel;
        }
    }
    aboutToBeDeleted() {
        this.__info.aboutToBeDeleted();
        this.__message.aboutToBeDeleted();
        this.__algorithmType.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __info: ObservedPropertySimple<string>;
    get info() {
        return this.__info.get();
    }
    set info(newValue: string) {
        this.__info.set(newValue);
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __algorithmType: ObservedPropertySimple<string>;
    get algorithmType() {
        return this.__algorithmType.get();
    }
    set algorithmType(newValue: string) {
        this.__algorithmType.set(newValue);
    }
    private cipherModel: CipherModel;
    render() {
        Stack.create({ alignContent: Alignment.Center });
        Stack.width('100%');
        Stack.height('100%');
        Column.create();
        Select.create([{ value: 'RSA' },
            { value: 'AES' }]);
        Select.id('decryptAlgorithm');
        Select.margin(4);
        Select.selected(0);
        Select.value(this.algorithmType);
        Select.font({ size: 20, weight: 300, family: 'serif', style: FontStyle.Normal });
        Select.selectedOptionFont({ size: 16, weight: 280, family: 'serif', style: FontStyle.Normal });
        Select.optionFont({ size: 16, weight: 280, family: 'serif', style: FontStyle.Normal });
        Select.onSelect((index: number, value: string) => {
            this.algorithmType = value;
            Logger.info(TAG, `Select: ${index} value: ${value}`);
        });
        Select.pop();
        TextArea.create();
        TextArea.id('decryptInput');
        TextArea.margin(6);
        TextArea.width('60%');
        TextArea.onChange((value: string) => {
            this.message = value;
        });
        Row.create();
        Row.margin(10);
        Button.createWithLabel($r('app.string.decrypt'));
        Button.fontSize(20);
        Button.margin(10);
        Button.width('30%');
        Button.height('6%');
        Button.id('decryptBtn');
        Button.onClick(() => {
            if (this.message === '') {
                prompt.showToast({
                    message: 'This message is null.'
                });
            }
            else {
                if (this.algorithmType === 'RSA') {
                    this.cipherModel.rsaDecrypt(this.message, (result: resultInfo) => {
                        Logger.info(TAG, `this result = ${JSON.stringify(result)}`);
                        this.info = `Decrypt result is :  ${result.text}`;
                    });
                }
                else {
                    this.cipherModel.aesDecrypt(this.message, (result: resultInfo) => {
                        Logger.info(TAG, `this result = ${JSON.stringify(result)}`);
                        this.info = `Decrypt result is :  ${result.text}`;
                    });
                }
            }
        });
        Button.pop();
        Button.createWithLabel($r('app.string.reset'));
        Button.fontSize(20);
        Button.margin(10);
        Button.width('30%');
        Button.height('6%');
        Button.id('decryptResetBtn');
        Button.onClick(() => {
            this.info = '';
        });
        Button.pop();
        Row.pop();
        Text.create(this.info);
        Text.id('decryptInfo');
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
class resultInfo {
    text: string = '';
}
