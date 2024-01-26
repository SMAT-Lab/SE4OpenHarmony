interface MinAccessControl_Params {
    cipherTextinfo?: string;
    plainTextinfo?: string;
    inputPassword?: string;
    huksModel?: HuksModel;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MinAccessControl_" + ++__generate__Id;
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
export class MinAccessControl extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__cipherTextinfo = new ObservedPropertySimple('', this, "cipherTextinfo");
        this.__plainTextinfo = new ObservedPropertySimple('', this, "plainTextinfo");
        this.__inputPassword = new ObservedPropertySimple('', this, "inputPassword");
        this.huksModel = new HuksModel();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MinAccessControl_Params) {
        if (params.cipherTextinfo !== undefined) {
            this.cipherTextinfo = params.cipherTextinfo;
        }
        if (params.plainTextinfo !== undefined) {
            this.plainTextinfo = params.plainTextinfo;
        }
        if (params.inputPassword !== undefined) {
            this.inputPassword = params.inputPassword;
        }
        if (params.huksModel !== undefined) {
            this.huksModel = params.huksModel;
        }
    }
    aboutToBeDeleted() {
        this.__cipherTextinfo.aboutToBeDeleted();
        this.__plainTextinfo.aboutToBeDeleted();
        this.__inputPassword.aboutToBeDeleted();
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
    private __inputPassword: ObservedPropertySimple<string>;
    get inputPassword() {
        return this.__inputPassword.get();
    }
    set inputPassword(newValue: string) {
        this.__inputPassword.set(newValue);
    }
    private huksModel: HuksModel;
    render() {
        Stack.create({ alignContent: Alignment.Center });
        Column.create();
        Column.width('100%');
        Column.height('100%');
        GridRow.create();
        GridRow.height('100vp');
        GridRow.margin({ left: 12, right: 12, bottom: 12 });
        GridCol.create({ span: { xs: 12, sm: 12, md: 12, lg: 12 } });
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        List.create();
        List.width('100%');
        List.height('100%');
        List.borderRadius(16);
        ListItem.create();
        Row.create();
        Row.backgroundColor(0xFFFFFF);
        Row.width('100%');
        Row.height('52vp');
        Row.padding({ top: 4, left: 12, right: 12 });
        Text.create($r('app.string.input_save_password'));
        Text.fontSize(16);
        Text.textAlign(TextAlign.Start);
        Text.lineHeight(22);
        Text.pop();
        Row.pop();
        ListItem.pop();
        ListItem.create();
        Row.create();
        Row.backgroundColor(0xFFFFFF);
        Row.width('100%');
        Row.height('48vp');
        Row.padding({ left: 12, right: 12 });
        TextInput.create();
        TextInput.enableKeyboardOnFocus(false);
        TextInput.margin(4);
        TextInput.width('90%');
        TextInput.id('passwordInput');
        TextInput.fontSize(16);
        TextInput.textAlign(TextAlign.Start);
        TextInput.onChange((value: string) => {
            this.inputPassword = value;
        });
        Row.pop();
        ListItem.pop();
        List.pop();
        Flex.pop();
        GridCol.pop();
        GridRow.pop();
        GridRow.create();
        GridRow.height('100vp');
        GridRow.margin({ left: 12, right: 12, bottom: 12 });
        GridCol.create({ span: { xs: 12, sm: 12, md: 12, lg: 12 } });
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Column.create();
        Column.borderRadius(16);
        Column.width('100%');
        Column.height('100');
        Column.backgroundColor(0xFFFFFF);
        Row.create();
        Row.padding({ left: 12, right: 12 });
        Row.width('100%');
        Row.height('48vp');
        Text.create($r('app.string.cipher_text'));
        Text.fontSize(16);
        Text.textAlign(TextAlign.Start);
        Text.fontWeight(500);
        Text.lineHeight(22);
        Text.pop();
        Row.pop();
        Row.create();
        Row.padding({ left: 12, right: 12, bottom: 4 });
        Row.width('100%');
        Row.height('52vp');
        Text.create();
        Text.textAlign(TextAlign.Start);
        Text.id('cipherTextinfo');
        Span.create(this.cipherTextinfo);
        Span.fontSize(16);
        Span.fontWeight(400);
        Span.fontColor(0x808080);
        Span.fontColor('#182431');
        Text.pop();
        Row.pop();
        Column.pop();
        Flex.pop();
        GridCol.pop();
        GridRow.pop();
        GridRow.create();
        GridRow.height('100vp');
        GridRow.margin({ left: 12, right: 12, bottom: 12 });
        GridCol.create({ span: { xs: 12, sm: 12, md: 12, lg: 12 } });
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Column.create();
        Column.borderRadius(16);
        Column.width('100%');
        Column.height('100');
        Column.backgroundColor(0xFFFFFF);
        Row.create();
        Row.padding({ left: 12, right: 12 });
        Row.width('100%');
        Row.height('48vp');
        Text.create($r('app.string.plain_text'));
        Text.fontSize(16);
        Text.textAlign(TextAlign.Start);
        Text.fontWeight(500);
        Text.lineHeight(22);
        Text.pop();
        Row.pop();
        Row.create();
        Row.padding({ left: 12, right: 12, bottom: 4 });
        Row.width('100%');
        Row.height('52vp');
        Text.create();
        Text.textAlign(TextAlign.Start);
        Text.id('plainTextinfo');
        Span.create(this.plainTextinfo);
        Span.fontSize(16);
        Span.fontWeight(400);
        Span.fontColor(0x808080);
        Span.fontColor('#182431');
        Text.pop();
        Row.pop();
        Column.pop();
        Flex.pop();
        GridCol.pop();
        GridRow.pop();
        Column.create();
        Column.width('100%');
        Column.height('296vp');
        Column.justifyContent(FlexAlign.End);
        GridRow.create();
        GridRow.margin({ left: 24, right: 24 });
        GridCol.create({ span: { xs: 12, sm: 12, md: 12, lg: 12 } });
        Column.create();
        Button.createWithChild();
        Button.id('save_password');
        Button.borderRadius(20);
        Button.type(ButtonType.Capsule);
        Button.width('100%');
        Button.height('40vp');
        Button.margin({ bottom: 16 });
        Button.backgroundColor('#007DFF');
        Button.onClick(() => {
            if (this.inputPassword === '') {
                prompt.showToast({
                    message: 'This message is null.'
                });
            }
            else {
                this.huksModel.encryptDataUseSm4(this.inputPassword, (result: string) => {
                    Logger.info(TAG, `this result = ${result}`);
                    this.cipherTextinfo = `${result}`;
                });
            }
        });
        Text.create($r('app.string.save_password'));
        Text.fontSize(16);
        Text.fontWeight(500);
        Text.lineHeight(22);
        Text.fontColor('#FFFFFF');
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.borderRadius(20);
        Button.id('read_password');
        Button.type(ButtonType.Capsule);
        Button.margin({ left: 24, right: 24 });
        Button.width('100%');
        Button.height('40vp');
        Button.backgroundColor('#007DFF');
        Button.onClick(() => {
            if (this.inputPassword === '') {
                prompt.showToast({
                    message: 'This message is null.'
                });
            }
            else {
                this.huksModel.decryptDataUseSm4((result: string) => {
                    Logger.info(TAG, `this result = ${result}`);
                    this.plainTextinfo = `${result}`;
                });
            }
        });
        Text.create($r('app.string.read_password'));
        Text.fontSize(16);
        Text.fontWeight(500);
        Text.lineHeight(22);
        Text.fontColor('#FFFFFF');
        Text.pop();
        Button.pop();
        Column.pop();
        GridCol.pop();
        GridRow.pop();
        Column.pop();
        Column.pop();
        Stack.pop();
    }
}
