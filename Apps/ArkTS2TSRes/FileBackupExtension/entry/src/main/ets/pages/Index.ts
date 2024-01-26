interface BackupExample_Params {
    createFile?;
    baseDir?: string;
    filePathSize?: Array<string>;
    showFilePath?: Array<string>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Shenzhen Kaihong Digital Industry Development Co., Ltd.
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
import CreateFile from '../fileFs/CreateFile';
import Logger from '../common/Logger';
import fs from '@ohos.file.fs';
const TAG: string = '[Sample_FileBackDemo]';
class BackupExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.createFile = new CreateFile();
        this.baseDir = AppStorage.get<string>('sanBoxFileDir') + '/TextDir';
        this.__filePathSize = new ObservedPropertyObject([], this, "filePathSize");
        this.__showFilePath = new ObservedPropertyObject([], this, "showFilePath");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: BackupExample_Params) {
        if (params.createFile !== undefined) {
            this.createFile = params.createFile;
        }
        if (params.baseDir !== undefined) {
            this.baseDir = params.baseDir;
        }
        if (params.filePathSize !== undefined) {
            this.filePathSize = params.filePathSize;
        }
        if (params.showFilePath !== undefined) {
            this.showFilePath = params.showFilePath;
        }
    }
    aboutToBeDeleted() {
        this.__filePathSize.aboutToBeDeleted();
        this.__showFilePath.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private createFile;
    private baseDir: string;
    private __filePathSize: ObservedPropertyObject<Array<string>>;
    get filePathSize() {
        return this.__filePathSize.get();
    }
    set filePathSize(newValue: Array<string>) {
        this.__filePathSize.set(newValue);
    }
    private __showFilePath: ObservedPropertyObject<Array<string>>;
    get showFilePath() {
        return this.__showFilePath.get();
    }
    set showFilePath(newValue: Array<string>) {
        this.__showFilePath.set(newValue);
    }
    onPageShow() {
        try {
            if (!fs.accessSync(this.baseDir)) {
                fs.mkdirSync(this.baseDir);
                this.showFilePath[0] = '';
                this.filePathSize[0] = '';
                return;
            }
            Logger.info(TAG, `readyFileToFileFs successful`);
        }
        catch (e) {
            Logger.error(TAG, `readyFileToFileFs has failed for: {message: ${e?.message}, code: ${e?.code}}`);
        }
        let filenames = fs.listFileSync(this.baseDir);
        for (let i = 0; i < filenames.length; i++) {
            Logger.info(TAG, "filename:" + filenames[i]);
            this.showFilePath[i] = filenames[i];
            let filePath = this.baseDir + '/' + filenames[i];
            this.filePathSize[i] = fs.statSync(filePath).size.toString() + 'Byte';
            Logger.info(TAG, "arrayfilename: " + i + this.showFilePath[i].toString());
        }
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor('#F1F3F5');
        Text.create($r('app.string.fileData'));
        Text.fontSize(14);
        Text.fontColor('#182431');
        Text.margin({ top: 8, left: 48, bottom: 8 });
        Text.id('filedata');
        Text.opacity(0.6);
        Text.align(Alignment.TopStart);
        Text.width('93%');
        Text.pop();
        List.create({ space: 10, initialIndex: 0 });
        List.height('80%');
        List.width('93%');
        List.borderRadius(24);
        List.backgroundColor(0xFFFFFF);
        List.align(Alignment.Center);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.showFilePath), (item: string, index?: number) => {
            ListItem.create();
            Column.create();
            Column.width('100%');
            If.create();
            if (this.showFilePath[0] === '') {
                If.branchId(0);
                Text.create($r("app.string.filelistWaitingToBeGenerated"));
                Text.fontSize(16);
                Text.margin({ top: 8 });
                Text.fontColor('#182431');
                Text.opacity(0.4);
                Text.width('90%');
                Text.align(Alignment.Start);
                Text.pop();
            }
            If.pop();
            Row.create();
            Row.width('100%');
            Row.height(56);
            Text.create(' ' + item);
            Text.fontSize(16);
            Text.fontColor('#182431');
            Text.width('70%');
            Text.textAlign(TextAlign.Start);
            Text.fontWeight(500);
            Text.margin({ left: 20 });
            Text.id('file' + index);
            Text.pop();
            If.create();
            if (index != undefined) {
                If.branchId(0);
                Text.create(this.filePathSize[index]);
                Text.fontSize(14);
                Text.width('20%');
                Text.textAlign(TextAlign.End);
                Text.fontColor('#182431');
                Text.fontWeight(400);
                Text.margin({ right: 16 });
                Text.opacity(0.6);
                Text.id('size' + index);
                Text.pop();
            }
            If.pop();
            Row.pop();
            If.create();
            if (this.showFilePath[0] !== '') {
                If.branchId(0);
                Divider.create();
                Divider.strokeWidth('1vp');
                Divider.color('#182431');
                Divider.opacity(0.05);
                Divider.margin({ left: 24, right: 24 });
                Divider.width('90%');
            }
            If.pop();
            Column.pop();
            ListItem.pop();
        }, (item: string) => item);
        ForEach.pop();
        List.pop();
        Button.createWithLabel($r("app.string.createFiles"));
        Button.id('createFiles');
        Button.backgroundColor('#007DFF');
        Button.margin(15);
        Button.width('87%');
        Button.borderRadius(20);
        Button.onClick(async () => {
            await this.createFile.createTestFiles();
            this.onPageShow();
        });
        Button.align(Alignment.Center);
        Button.pop();
        Column.pop();
    }
}
loadDocument(new BackupExample("1", undefined, {}));
