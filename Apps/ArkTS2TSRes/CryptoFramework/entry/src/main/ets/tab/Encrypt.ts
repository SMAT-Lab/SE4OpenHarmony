interface Encrypt_Params {
    keyFileName?: string;
    keyFileUri?: string;
    textFileUri?: string;
    textFileName?: string;
    keyString?: string;
    cipherText?: string;
    plainText?: string;
    message?: string;
    createKeyUri?: string;
    encryptedFileUri?: string;
    CryptoOperation?: CryptoOperation;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Encrypt_" + ++__generate__Id;
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
const TAG: string = '[Crypto_Framework]';
export class Encrypt extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__keyFileName = new ObservedPropertySimple('', this, "keyFileName");
        this.__keyFileUri = new ObservedPropertySimple('', this, "keyFileUri");
        this.__textFileUri = new ObservedPropertySimple('', this, "textFileUri");
        this.__textFileName = new ObservedPropertySimple('', this, "textFileName");
        this.__keyString = new ObservedPropertySimple('', this, "keyString");
        this.__cipherText = new ObservedPropertySimple('', this, "cipherText");
        this.__plainText = new ObservedPropertySimple('', this, "plainText");
        this.__message = new ObservedPropertySimple('', this, "message");
        this.__createKeyUri = new ObservedPropertySimple('', this, "createKeyUri");
        this.__encryptedFileUri = new ObservedPropertySimple('', this, "encryptedFileUri");
        this.CryptoOperation = new CryptoOperation();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Encrypt_Params) {
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
        if (params.cipherText !== undefined) {
            this.cipherText = params.cipherText;
        }
        if (params.plainText !== undefined) {
            this.plainText = params.plainText;
        }
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.createKeyUri !== undefined) {
            this.createKeyUri = params.createKeyUri;
        }
        if (params.encryptedFileUri !== undefined) {
            this.encryptedFileUri = params.encryptedFileUri;
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
        this.__cipherText.aboutToBeDeleted();
        this.__plainText.aboutToBeDeleted();
        this.__message.aboutToBeDeleted();
        this.__createKeyUri.aboutToBeDeleted();
        this.__encryptedFileUri.aboutToBeDeleted();
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
    private __cipherText: ObservedPropertySimple<string>;
    get cipherText() {
        return this.__cipherText.get();
    }
    set cipherText(newValue: string) {
        this.__cipherText.set(newValue);
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
    private __createKeyUri: ObservedPropertySimple<string>;
    get createKeyUri() {
        return this.__createKeyUri.get();
    }
    set createKeyUri(newValue: string) {
        this.__createKeyUri.set(newValue);
    }
    private __encryptedFileUri: ObservedPropertySimple<string>;
    get encryptedFileUri() {
        return this.__encryptedFileUri.get();
    }
    set encryptedFileUri(newValue: string) {
        this.__encryptedFileUri.set(newValue);
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
            this.selectAesKeyFileAndRead();
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
        Text.create($r('app.string.encrypted_context'));
        Text.fontSize(16);
        Text.textAlign(TextAlign.Start);
        Text.fontWeight(500);
        Text.lineHeight(22);
        Text.pop();
        Row.pop();
        Row.create();
        Row.padding({ left: 12, right: 12, bottom: 4 });
        Row.width('100%');
        Row.height('80vp');
        Text.create();
        Text.textAlign(TextAlign.Start);
        Span.create(this.cipherText);
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
        Column.height('296vp');
        Column.justifyContent(FlexAlign.End);
        GridRow.create();
        GridRow.margin({ left: 24, right: 24 });
        GridCol.create({ span: { xs: 12, sm: 12, md: 12, lg: 12 } });
        Column.create();
        Button.createWithChild();
        Button.id('encryptAesGenKey');
        Button.borderRadius(20);
        Button.type(ButtonType.Capsule);
        Button.width('100%');
        Button.height('40vp');
        Button.margin({ bottom: 16 });
        Button.backgroundColor('#007DFF');
        Button.onClick(() => {
            this.genAesKey();
        });
        Text.create($r('app.string.generate_aes_key_randomly'));
        Text.fontSize(16);
        Text.fontWeight(500);
        Text.lineHeight(22);
        Text.fontColor('#FFFFFF');
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.borderRadius(20);
        Button.id('encryptionBtn');
        Button.type(ButtonType.Capsule);
        Button.margin({ left: 24, right: 24 });
        Button.width('100%');
        Button.height('40vp');
        Button.backgroundColor('#007DFF');
        Button.onClick(() => {
            if (this.textFileUri === '' || this.keyFileUri === '') {
                promptAction.showToast({
                    message: $r('app.string.null_message')
                });
            }
            else {
                this.encryptFunc();
            }
        });
        Text.create($r('app.string.encrypt'));
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
    async selectAesKeyFileAndRead() {
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
        this.keyFileUri = uri;
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
        this.textFileUri = uri;
        await TextFileManager.readTextFile(this.textFileUri);
        this.textFileName = TextFileManager.getName();
        this.plainText = TextFileManager.getString();
    }
    async createTextFileAndWrite() {
        let documentSaveOptions = new picker.DocumentSaveOptions();
        documentSaveOptions.newFileNames = ['cipherText.txt'];
        let documentPicker = new picker.DocumentViewPicker();
        let documentSaveResult = await documentPicker.save(documentSaveOptions);
        this.encryptedFileUri = documentSaveResult[0];
        await TextFileManager.writeTextFile(this.encryptedFileUri, this.cipherText);
    }
    async createKeyFileAndWrite() {
        let documentSaveOptions = new picker.DocumentSaveOptions();
        documentSaveOptions.newFileNames = ['aesKey.txt'];
        let documentPicker = new picker.DocumentViewPicker();
        let documentSaveResult = await documentPicker.save(documentSaveOptions);
        this.createKeyUri = documentSaveResult[0];
        await TextFileManager.writeTextFile(this.createKeyUri, this.keyString);
    }
    async encryptFunc() {
        if (this.plainText === '' || this.keyFileUri === '') {
            promptAction.showToast({
                message: $r('app.string.null_message')
            });
            return;
        }
        try {
            this.cipherText = await this.CryptoOperation.aesConvertAndEncrypt(this.keyString, this.plainText);
        }
        catch (error) {
            Logger.error(TAG, `encrypt failed, ${error}`);
            promptAction.showToast({
                message: $r('app.string.encrypt_fail')
            });
        }
        if (this.cipherText === '' || this.cipherText === undefined || this.cipherText === null) {
            promptAction.showToast({
                message: $r('app.string.encrypt_fail')
            });
            return;
        }
        else {
            try {
                await this.createTextFileAndWrite();
            }
            catch (error) {
                Logger.error(TAG, `encrypt failed, ${error}`);
            }
        }
        if (this.encryptedFileUri === '' || typeof (this.encryptedFileUri) == 'undefined') {
            promptAction.showToast({
                message: $r('app.string.encrypt_fail')
            });
        }
        else {
            promptAction.showToast({
                message: $r('app.string.encrypt_success')
            });
        }
    }
    async genAesKey() {
        try {
            this.keyString = await this.CryptoOperation.generateAesKey();
        }
        catch (error) {
            Logger.error(TAG, `gen aes key failed, ${error}`);
        }
        if (this.keyString === '' || typeof (this.keyString) == 'undefined') {
            promptAction.showToast({
                message: $r('app.string.gen_key_fail')
            });
            return;
        }
        else {
            try {
                await this.createKeyFileAndWrite();
            }
            catch (error) {
                Logger.error(TAG, `write aes key failed, ${error}`);
            }
        }
        if (this.createKeyUri === '' || typeof (this.createKeyUri) == 'undefined') {
            promptAction.showToast({
                message: $r('app.string.gen_key_fail')
            });
        }
        else {
            promptAction.showToast({
                message: $r('app.string.gen_key_success')
            });
        }
    }
}
