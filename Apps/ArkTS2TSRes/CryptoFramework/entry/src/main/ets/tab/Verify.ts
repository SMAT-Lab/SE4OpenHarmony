interface Verify_Params {
    keyFileName?: string;
    keyFileUri?: string;
    textFileUri?: string;
    textFileName?: string;
    keyString?: string;
    plainText?: string;
    message?: string;
    signFileUri?: string;
    signFileName?: string;
    signText?: string;
    createKeyUri?: string;
    CryptoOperation?: CryptoOperation;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Verify_" + ++__generate__Id;
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
import promptAction from '@ohos.promptAction';
import Logger from '../util/Logger';
import picker from '@ohos.file.picker';
import { CryptoOperation } from '../cryptoframework/CryptoOperation';
import TextFileManager from '../textfilemanager/TextFileManager';
import common from '@ohos.app.ability.common';
const TAG: string = '[Crypto_Framework]';
export class Verify extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__keyFileName = new ObservedPropertySimple('', this, "keyFileName");
        this.__keyFileUri = new ObservedPropertySimple('', this, "keyFileUri");
        this.__textFileUri = new ObservedPropertySimple('', this, "textFileUri");
        this.__textFileName = new ObservedPropertySimple('', this, "textFileName");
        this.__keyString = new ObservedPropertySimple('', this, "keyString");
        this.__plainText = new ObservedPropertySimple('', this, "plainText");
        this.__message = new ObservedPropertySimple('', this, "message");
        this.__signFileUri = new ObservedPropertySimple('', this, "signFileUri");
        this.__signFileName = new ObservedPropertySimple('', this, "signFileName");
        this.__signText = new ObservedPropertySimple('', this, "signText");
        this.__createKeyUri = new ObservedPropertySimple('', this, "createKeyUri");
        this.CryptoOperation = new CryptoOperation();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Verify_Params) {
        if (params.keyFileName !== undefined) {
            this.keyFileName = params.keyFileName;
        }
        if (params.keyFileUri !== undefined) {
            this.keyFileUri = params.keyFileUri;
        }
        if (params.textFileUri !== undefined) {
            this.textFileUri = params.textFileUri;
        }
        if (params.textFileName !== undefined) {
            this.textFileName = params.textFileName;
        }
        if (params.keyString !== undefined) {
            this.keyString = params.keyString;
        }
        if (params.plainText !== undefined) {
            this.plainText = params.plainText;
        }
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.signFileUri !== undefined) {
            this.signFileUri = params.signFileUri;
        }
        if (params.signFileName !== undefined) {
            this.signFileName = params.signFileName;
        }
        if (params.signText !== undefined) {
            this.signText = params.signText;
        }
        if (params.createKeyUri !== undefined) {
            this.createKeyUri = params.createKeyUri;
        }
        if (params.CryptoOperation !== undefined) {
            this.CryptoOperation = params.CryptoOperation;
        }
    }
    aboutToBeDeleted() {
        this.__keyFileName.aboutToBeDeleted();
        this.__keyFileUri.aboutToBeDeleted();
        this.__textFileUri.aboutToBeDeleted();
        this.__textFileName.aboutToBeDeleted();
        this.__keyString.aboutToBeDeleted();
        this.__plainText.aboutToBeDeleted();
        this.__message.aboutToBeDeleted();
        this.__signFileUri.aboutToBeDeleted();
        this.__signFileName.aboutToBeDeleted();
        this.__signText.aboutToBeDeleted();
        this.__createKeyUri.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __keyFileName: ObservedPropertySimple<string>;
    get keyFileName() {
        return this.__keyFileName.get();
    }
    set keyFileName(newValue: string) {
        this.__keyFileName.set(newValue);
    }
    private __keyFileUri: ObservedPropertySimple<string>;
    get keyFileUri() {
        return this.__keyFileUri.get();
    }
    set keyFileUri(newValue: string) {
        this.__keyFileUri.set(newValue);
    }
    private __textFileUri: ObservedPropertySimple<string>;
    get textFileUri() {
        return this.__textFileUri.get();
    }
    set textFileUri(newValue: string) {
        this.__textFileUri.set(newValue);
    }
    private __textFileName: ObservedPropertySimple<string>;
    get textFileName() {
        return this.__textFileName.get();
    }
    set textFileName(newValue: string) {
        this.__textFileName.set(newValue);
    }
    private __keyString: ObservedPropertySimple<string>;
    get keyString() {
        return this.__keyString.get();
    }
    set keyString(newValue: string) {
        this.__keyString.set(newValue);
    }
    private __plainText: ObservedPropertySimple<string>;
    get plainText() {
        return this.__plainText.get();
    }
    set plainText(newValue: string) {
        this.__plainText.set(newValue);
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __signFileUri: ObservedPropertySimple<string>;
    get signFileUri() {
        return this.__signFileUri.get();
    }
    set signFileUri(newValue: string) {
        this.__signFileUri.set(newValue);
    }
    private __signFileName: ObservedPropertySimple<string>;
    get signFileName() {
        return this.__signFileName.get();
    }
    set signFileName(newValue: string) {
        this.__signFileName.set(newValue);
    }
    private __signText: ObservedPropertySimple<string>;
    get signText() {
        return this.__signText.get();
    }
    set signText(newValue: string) {
        this.__signText.set(newValue);
    }
    private __createKeyUri: ObservedPropertySimple<string>;
    get createKeyUri() {
        return this.__createKeyUri.get();
    }
    set createKeyUri(newValue: string) {
        this.__createKeyUri.set(newValue);
    }
    private CryptoOperation: CryptoOperation;
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
        ListItem.onClick(() => {
            this.selectTextFileAndRead();
        });
        Row.create();
        Row.backgroundColor(0xFFFFFF);
        Row.width('100%');
        Row.height('52vp');
        Row.padding({ top: 4, left: 12, right: 12 });
        Text.create($r('app.string.open_file'));
        Text.fontSize(16);
        Text.textAlign(TextAlign.Start);
        Text.lineHeight(22);
        Text.pop();
        Blank.create();
        Blank.pop();
        Text.create(this.textFileName === '' ? $r('app.string.please_choose') : this.textFileName);
        Text.fontSize(14);
        Text.textAlign(TextAlign.Start);
        Text.lineHeight(19);
        Text.pop();
        Image.create($r('app.media.right_arrow'));
        Image.height('19vp');
        Image.width('10vp');
        Image.margin({ left: 9, right: 9, top: 6, bottom: 6 });
        Row.pop();
        ListItem.pop();
        ListItem.create();
        ListItem.onClick(() => {
            this.selectRsaKeyFileAndRead();
        });
        Row.create();
        Row.backgroundColor(0xFFFFFF);
        Row.width('100%');
        Row.height('48vp');
        Row.padding({ left: 12, right: 12 });
        Text.create($r('app.string.select_key_file'));
        Text.fontSize(16);
        Text.textAlign(TextAlign.Start);
        Text.lineHeight(22);
        Text.pop();
        Blank.create();
        Blank.pop();
        Text.create(this.keyFileName === '' ? $r('app.string.please_choose') : this.keyFileName);
        Text.fontSize(14);
        Text.textAlign(TextAlign.Start);
        Text.lineHeight(19);
        Text.pop();
        Image.create($r('app.media.right_arrow'));
        Image.height('19vp');
        Image.width('10vp');
        Image.margin({ left: 9, right: 9, top: 6, bottom: 6 });
        Row.pop();
        ListItem.pop();
        List.pop();
        Flex.pop();
        GridCol.pop();
        GridRow.pop();
        GridRow.create();
        GridRow.height('56vp');
        GridRow.margin({ left: 12, right: 12, bottom: 12 });
        GridCol.create({ span: { xs: 12, sm: 12, md: 12, lg: 12 } });
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        List.create();
        List.width('100%');
        List.borderRadius(16);
        ListItem.create();
        ListItem.onClick(() => {
            this.selectSignFileAndRead();
        });
        Row.create();
        Row.backgroundColor(0xFFFFFF);
        Row.width('100%');
        Row.height('56vp');
        Row.padding({ left: 12, right: 12, top: 4, bottom: 4 });
        Text.create($r('app.string.select_signature_file'));
        Text.fontSize(16);
        Text.textAlign(TextAlign.Start);
        Text.lineHeight(22);
        Text.pop();
        Blank.create();
        Blank.pop();
        Text.create(this.signFileName === '' ? $r('app.string.please_choose') : this.signFileName);
        Text.fontSize(14);
        Text.textAlign(TextAlign.Start);
        Text.lineHeight(19);
        Text.pop();
        Image.create($r('app.media.right_arrow'));
        Image.height('19vp');
        Image.width('10vp');
        Image.margin({ left: 9, right: 9, top: 6, bottom: 6 });
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
        Text.create($r('app.string.text_context'));
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
        Span.create(this.plainText);
        Span.fontSize(16);
        Span.fontWeight(400);
        Span.fontColor('#182431');
        Text.pop();
        Row.pop();
        Column.pop();
        Flex.pop();
        GridCol.pop();
        GridRow.pop();
        Column.create();
        Column.width('100%');
        Column.height('340vp');
        Column.justifyContent(FlexAlign.End);
        GridRow.create();
        GridRow.margin({ left: 24, right: 24 });
        GridCol.create({ span: { xs: 12, sm: 12, md: 12, lg: 12 } });
        Column.create();
        Button.createWithChild();
        Button.borderRadius(20);
        Button.id('verifyBtn');
        Button.type(ButtonType.Capsule);
        Button.margin({ left: 24, right: 24 });
        Button.width('100%');
        Button.height('40vp');
        Button.backgroundColor('#007DFF');
        Button.onClick(() => {
            if (this.textFileUri === '' || this.keyFileUri === '' || this.signFileUri === '') {
                promptAction.showToast({
                    message: $r('app.string.null_message')
                });
            }
            else {
                this.verifyFunc();
            }
        });
        Text.create($r('app.string.verify'));
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
    async selectRsaKeyFileAndRead() {
        // let config = {
        //   action: 'ohos.want.action.OPEN_FILE',
        //   parameters: {
        //     startMode: 'choose',
        //   }
        // }
        // let context = getContext(this) as common.UIAbilityContext;
        // let result = await context.startAbilityForResult(config);
        // if (result === null || result === undefined) {
        //   Logger.error(TAG, `result is null or undefined!`);
        //   return;
        // }
        // if (result.resultCode !== 0) {
        //   Logger.error(TAG, `DocumentPicker.select failed, code is ${result.resultCode}, message is ${result.want.parameters.message}`);
        //   return;
        // }
        // if (result.want.parameters.select_item_list === null || result.want.parameters.select_item_list === undefined) {
        //   Logger.error(TAG, `result uri is null or undefined!`);
        //   return;
        // }
        // if (result.want.parameters.file_name_list === null || result.want.parameters.file_name_list === undefined) {
        //   Logger.error(TAG, `result file name is null or undefined!`);
        //   return;
        // }
        let documentSelectOptions = new picker.DocumentSelectOptions();
        documentSelectOptions.fileSuffixFilters = ['.txt'];
        documentSelectOptions.maxSelectNumber = 1;
        let uri: string = '';
        let documentViewPicker = new picker.DocumentViewPicker();
        await documentViewPicker.select(documentSelectOptions).then((documentSelectResult: Array<string>) => {
            uri = documentSelectResult[0];
            console.info('documentViewPicker.select to text file succeed and uris are:' + uri);
        }).catch((err: Error) => {
            console.error(`Invoke documentViewPicker.select failed, code is ${err}, message is ${err.message}`);
        });
        // 获取到密钥文档文件的URI
        this.keyFileUri = uri;
        // 获取到密钥文档文件的文件名称
        await TextFileManager.readTextFile(this.keyFileUri);
        this.keyFileName = TextFileManager.getName();
        this.keyString = TextFileManager.getString();
    }
    async selectTextFileAndRead() {
        // let config = {
        //   action: 'ohos.want.action.OPEN_FILE',
        //   parameters: {
        //     startMode: 'choose',
        //   }
        // }
        // let context = getContext(this) as common.UIAbilityContext;
        // let result = await context.startAbilityForResult(config);
        // if (result === null || result === undefined) {
        //   Logger.error(TAG, `result is null or undefined!`);
        //   return;
        // }
        // if (result.resultCode !== 0) {
        //   Logger.error(TAG, `DocumentPicker.select failed, code is ${result.resultCode}, message is ${result.want.parameters.message}`);
        //   return;
        // }
        // if (result.want.parameters.select_item_list === null || result.want.parameters.select_item_list === undefined) {
        //   Logger.error(TAG, `result uri is null or undefined!`);
        //   return;
        // }
        // if (result.want.parameters.file_name_list === null || result.want.parameters.file_name_list === undefined) {
        //   Logger.error(TAG, `result file name is null or undefined!`);
        //   return;
        // }
        let documentSelectOptions = new picker.DocumentSelectOptions();
        documentSelectOptions.fileSuffixFilters = ['.txt'];
        documentSelectOptions.maxSelectNumber = 1;
        let uri: string = '';
        let documentViewPicker = new picker.DocumentViewPicker();
        await documentViewPicker.select(documentSelectOptions).then((documentSelectResult: Array<string>) => {
            uri = documentSelectResult[0];
            console.info('documentViewPicker.select to text file succeed and uris are:' + uri);
        }).catch((err: Error) => {
            console.error(`Invoke documentViewPicker.select failed, code is ${err}, message is ${err.message}`);
        });
        // 获取到文档文件的URI
        this.textFileUri = uri;
        // 获取到文档文件的文件名称
        await TextFileManager.readTextFile(this.textFileUri);
        this.textFileName = TextFileManager.getName();
        this.plainText = TextFileManager.getString();
    }
    async selectSignFileAndRead() {
        // let config = {
        //   action: 'ohos.want.action.OPEN_FILE',
        //   parameters: {
        //     startMode: 'choose',
        //   }
        // }
        // let context = getContext(this) as common.UIAbilityContext;
        // let result = await context.startAbilityForResult(config);
        // if (result === null || result === undefined) {
        //   Logger.error(TAG, `result is null or undefined!`);
        //   return;
        // }
        // if (result.resultCode !== 0) {
        //   Logger.error(TAG, `DocumentPicker.select failed, code is ${result.resultCode}, message is ${result.want.parameters.message}`);
        //   return;
        // }
        // if (result.want.parameters.select_item_list === null || result.want.parameters.select_item_list === undefined) {
        //   Logger.error(TAG, `result uri is null or undefined!`);
        //   return;
        // }
        // if (result.want.parameters.file_name_list === null || result.want.parameters.file_name_list === undefined) {
        //   Logger.error(TAG, `result file name is null or undefined!`);
        //   return;
        // }
        let documentSelectOptions = new picker.DocumentSelectOptions();
        documentSelectOptions.fileSuffixFilters = ['.txt'];
        documentSelectOptions.maxSelectNumber = 1;
        let uri: string = '';
        let documentViewPicker = new picker.DocumentViewPicker();
        await documentViewPicker.select(documentSelectOptions).then((documentSelectResult: Array<string>) => {
            uri = documentSelectResult[0];
            console.info('documentViewPicker.select to text file succeed and uris are:' + uri);
        }).catch((err: Error) => {
            console.error(`Invoke documentViewPicker.select failed, code is ${err}, message is ${err.message}`);
        });
        // 获取到文档文件的URI
        this.signFileUri = uri;
        // 获取到文档文件的文件名称
        await TextFileManager.readTextFile(this.signFileUri);
        this.signFileName = TextFileManager.getName();
        this.signText = TextFileManager.getString();
    }
    async createKeyFileAndWrite() {
        let documentSaveOptions = new picker.DocumentSaveOptions();
        documentSaveOptions.newFileNames = ['rsaKey.txt'];
        let documentPicker = new picker.DocumentViewPicker();
        try {
            let documentSaveResult = await documentPicker.save(documentSaveOptions);
            this.createKeyUri = documentSaveResult[0];
            await TextFileManager.writeTextFile(this.createKeyUri, this.keyString);
        }
        catch (error) {
            Logger.error(TAG, `save key failed, ${error}`);
        }
    }
    async verifyFunc() {
        let verifyRes: Boolean = false;
        if (this.plainText === '' || this.keyFileUri === '' || this.signText === '') {
            promptAction.showToast({
                message: $r('app.string.null_message')
            });
            return;
        }
        try {
            verifyRes = await this.CryptoOperation.rsaConvertAndVerify(this.keyString, this.plainText, this.signText);
        }
        catch (error) {
            Logger.error(TAG, `verify failed, ${error}`);
        }
        if (verifyRes != true) {
            promptAction.showToast({
                message: $r('app.string.verify_fail')
            });
            return;
        }
        else {
            promptAction.showToast({
                message: $r('app.string.verify_success')
            });
        }
    }
}
