interface Index_Params {
    isInserted?: boolean;
    files?: ZipLibSource;
    fileName?: string;
    fileContent?: string;
    path?: string;
    title?: Resource;
    dialogController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import zlib from '@ohos.zlib';
import fileio from '@ohos.fileio';
import prompt from '@ohos.promptAction';
import Logger from '../model/Logger';
import data_preferences from '@ohos.data.preferences';
import { AddDialog } from '../common/AddDialog';
import { ZipLibSource } from '../model/DataSource';
import common from '@ohos.app.ability.common';
const TAG: string = '[Index]';
let fileList: data_preferences.Preferences | null = null;
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isInserted = new ObservedPropertySimple(false, this, "isInserted");
        this.__files = new ObservedPropertyObject(new ZipLibSource([]), this, "files");
        this.__fileName = new ObservedPropertySimple('', this, "fileName");
        this.__fileContent = new ObservedPropertySimple('', this, "fileContent");
        this.path = '';
        this.title = $r('app.string.MainAbility_label');
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new AddDialog("3", this, {
                    fileName: this.fileName,
                    fileContent: this.fileContent,
                    isInserted: this.isInserted,
                    createFile: async (isInserted: boolean, fileName: string, fileContent: string) => {
                        Logger.info(TAG, `enter the createFile`);
                        this.fileName = `${fileName}.txt`;
                        let isDuplication = this.files.fileData.includes(this.fileName);
                        Logger.info(TAG, `isInserted = ${isInserted}  isDuplication = ${isDuplication}`);
                        if (!isInserted || isDuplication) {
                            return;
                        }
                        let fd = fileio.openSync(`${this.path}/${this.fileName}`, 0o100 | 0o2, 0o666);
                        let number = fileio.writeSync(fd, fileContent);
                        Logger.info(TAG, `fd = ${fd} number = ${number}`);
                        this.files.pushData(this.fileName);
                        Logger.info(TAG, `this.files = ${JSON.stringify(this.files.fileData)}`);
                        if (fileList) {
                            await fileList.put('fileName', JSON.stringify(this.files.fileData));
                            await fileList.flush();
                        }
                    }
                });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            autoCancel: true,
            alignment: DialogAlignment.Default
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.isInserted !== undefined) {
            this.isInserted = params.isInserted;
        }
        if (params.files !== undefined) {
            this.files = params.files;
        }
        if (params.fileName !== undefined) {
            this.fileName = params.fileName;
        }
        if (params.fileContent !== undefined) {
            this.fileContent = params.fileContent;
        }
        if (params.path !== undefined) {
            this.path = params.path;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__isInserted.aboutToBeDeleted();
        this.__files.aboutToBeDeleted();
        this.__fileName.aboutToBeDeleted();
        this.__fileContent.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __isInserted: ObservedPropertySimple<boolean>;
    get isInserted() {
        return this.__isInserted.get();
    }
    set isInserted(newValue: boolean) {
        this.__isInserted.set(newValue);
    }
    private __files: ObservedPropertyObject<ZipLibSource>;
    get files() {
        return this.__files.get();
    }
    set files(newValue: ZipLibSource) {
        this.__files.set(newValue);
    }
    private __fileName: ObservedPropertySimple<string>;
    get fileName() {
        return this.__fileName.get();
    }
    set fileName(newValue: string) {
        this.__fileName.set(newValue);
    }
    private __fileContent: ObservedPropertySimple<string>;
    get fileContent() {
        return this.__fileContent.get();
    }
    set fileContent(newValue: string) {
        this.__fileContent.set(newValue);
    }
    private path: string;
    private title: Resource;
    private dialogController: CustomDialogController;
    async aboutToAppear() {
        fileList = await data_preferences.getPreferences(getContext(this), 'fileList');
        let ctx = getContext(this) as common.Context;
        this.path = ctx.filesDir;
        let value = await fileList.get('fileName', '');
        this.files.fileData = JSON.parse(`${value}`);
        this.files.notifyDataReload();
    }
    async zipHandler(path: string, fileName: string): Promise<void> {
        let zipFile = `${path}/${fileName}`;
        Logger.debug(TAG, `zipFile = ${zipFile}`);
        let tempName = fileName.split('.');
        let newName = `${tempName[0]}.zip`;
        let zipOutFile = `${this.path}/${newName}`;
        Logger.debug(TAG, `zipOutFile = ${zipOutFile}`);
        let options: zlib.Options = {
            level: zlib.CompressLevel.COMPRESS_LEVEL_DEFAULT_COMPRESSION,
            memLevel: zlib.MemLevel.MEM_LEVEL_DEFAULT,
            strategy: zlib.CompressStrategy.COMPRESS_STRATEGY_DEFAULT_STRATEGY
        };
        if (this.files.fileData.includes(newName)) {
            prompt.showToast({
                message: $r('app.string.warning_failed')
            });
            return;
        }
        try {
            zlib.zipFile(zipFile, zipOutFile, options).then(data => {
                Logger.info(TAG, `data = ${JSON.stringify(data)}`);
                prompt.showToast({
                    message: $r('app.string.tip_complete')
                });
                this.files.pushData(`${newName}`);
            });
        }
        catch {
            prompt.showToast({
                message: $r('app.string.warning_failure')
            });
        }
        if (fileList) {
            await fileList.put('fileName', JSON.stringify(this.files.fileData));
            await fileList.flush();
        }
    }
    async unzipHandler(path: string, fileName: string): Promise<void> {
        let zipFile = `${path}/${fileName}`;
        Logger.debug(TAG, `zipFile = ${zipFile}`);
        let tempName = fileName.split('.');
        let newName = tempName[0];
        let zipOutFile = `${this.path}/${newName}`;
        Logger.debug(TAG, `zipOutFile = ${zipOutFile}`);
        if (this.files.fileData.includes(newName)) {
            prompt.showToast({
                message: $r('app.string.warning_failed')
            });
            return;
        }
        let options: zlib.Options = {
            level: zlib.CompressLevel.COMPRESS_LEVEL_DEFAULT_COMPRESSION,
            memLevel: zlib.MemLevel.MEM_LEVEL_DEFAULT,
            strategy: zlib.CompressStrategy.COMPRESS_STRATEGY_DEFAULT_STRATEGY
        };
        zlib.unzipFile(zipFile, zipOutFile, options).then(data => {
            Logger.info(TAG, `data = ${JSON.stringify(data)}`);
        });
        prompt.showToast({
            message: $r('app.string.tip_complete')
        });
        this.files.pushData(`${newName}`);
        if (fileList) {
            await fileList.put('fileName', JSON.stringify(this.files.fileData));
            await fileList.flush();
        }
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
        Column.create();
        Column.height('100%');
        Column.width('100%');
        Column.backgroundColor($r('app.color.index_bg'));
        Row.create();
        Row.width('100%');
        Row.height('8%');
        Row.constraintSize({ minHeight: 70 });
        Row.padding({ left: 10, right: 10 });
        Row.backgroundColor($r('app.color.button_bg'));
        Text.create(this.title);
        Text.width('90%');
        Text.fontColor(Color.White);
        Text.fontSize(28);
        Text.pop();
        Button.createWithChild();
        Button.id('addFileBtn');
        Button.width('10%');
        Button.type(ButtonType.Normal);
        Button.backgroundColor($r('app.color.button_bg'));
        Button.align(Alignment.End);
        Button.onClick(() => {
            this.dialogController.open();
        });
        Image.create($r('app.media.add'));
        Image.height(45);
        Image.width('100%');
        Image.objectFit(ImageFit.Contain);
        Image.align(Alignment.End);
        Button.pop();
        Row.pop();
        List.create({ space: 20, initialIndex: 0 });
        List.width('100%');
        List.layoutWeight(1);
        LazyForEach.create("2", this, ObservedObject.GetRawObject(this.files), (item: string, index) => {
            this.isRenderingInProgress = true;
            ListItem.create();
            ListItem.width('95%');
            ListItem.borderRadius(10);
            ListItem.margin({ top: '1%', left: '2.5%' });
            ListItem.align(Alignment.Center);
            ListItem.backgroundColor(Color.White);
            Row.create();
            Image.create(item.includes('.zip') ? $r('app.media.zip') : $r('app.media.file'));
            Image.width('10%');
            Image.margin({ left: 15, top: 5, bottom: 5 });
            Image.objectFit(ImageFit.Contain);
            Column.create();
            Text.create(item);
            Text.width('50%');
            Text.fontSize(18);
            Text.margin({ left: 15 });
            Text.pop();
            Column.pop();
            Row.create();
            Row.width('25%');
            Row.margin({ left: '15' });
            Button.createWithLabel(item.includes('.zip') ? $r('app.string.unzip') : $r('app.string.zip'));
            Button.fontSize(18);
            Button.onClick(() => {
                item.includes('.zip') ? this.unzipHandler(this.path, item) : this.zipHandler(this.path, item);
            });
            Button.id('compress_' + index);
            Button.pop();
            Row.pop();
            Row.pop();
            ListItem.pop();
            this.isRenderingInProgress = false;
        }, (item: string) => item);
        LazyForEach.pop();
        List.pop();
        Column.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
