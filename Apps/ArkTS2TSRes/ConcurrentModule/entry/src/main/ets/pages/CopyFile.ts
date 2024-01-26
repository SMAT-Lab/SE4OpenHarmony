interface Watcher_Params {
    message?: Resource;
    myContext?: Context;
    filePathSize?: Array<number>;
    showFilePath?: Array<string>;
    eventFilePath?: Array<string>;
    fileListNames?: Array<string>;
    fileNum?: string;
    fileListName1?: string;
    fileListName2?: string;
    copyFileLog1?: string;
    copyFileLog2?: string;
    copyFileLog3?: string;
    copyFileLog4?: string;
    copyFileShowLog?: string;
    myWorker?: MyWorker;
    scroller?: Scroller;
    dirPath?: string;
    baseDir?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CopyFile_" + ++__generate__Id;
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
import MyWorker from '../fileFs/MyWorker';
import common from '@ohos.app.ability.common';
import fs from '@ohos.file.fs';
import router from '@ohos.router';
import { Logger } from '../common/Common';
const TAG: string = '[ConcurrentModule].[CopyFile]';
class Watcher extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertyObject($r('app.string.copyFileText'), this, "message");
        this.__myContext = new ObservedPropertyObject(getContext(this) as common.UIAbilityContext, this, "myContext");
        this.__filePathSize = new ObservedPropertyObject([], this, "filePathSize");
        this.__showFilePath = new ObservedPropertyObject([], this, "showFilePath");
        this.__eventFilePath = new ObservedPropertyObject([], this, "eventFilePath");
        this.__fileListNames = new ObservedPropertyObject([], this, "fileListNames");
        this.__fileNum = AppStorage.SetAndLink('fileNumber', '0', this, "fileNum");
        this.__fileListName1 = AppStorage.SetAndLink('fileListName1', ' ', this, "fileListName1");
        this.__fileListName2 = AppStorage.SetAndLink('fileListName2', '', this, "fileListName2");
        this.__copyFileLog1 = AppStorage.SetAndLink('copyFileLog1', '', this, "copyFileLog1");
        this.__copyFileLog2 = AppStorage.SetAndLink('copyFileLog2', '', this, "copyFileLog2");
        this.__copyFileLog3 = AppStorage.SetAndLink('copyFileLog3', '', this, "copyFileLog3");
        this.__copyFileLog4 = AppStorage.SetAndLink('copyFileLog4', '', this, "copyFileLog4");
        this.__copyFileShowLog = AppStorage.SetAndLink('copyFileShowLog', '', this, "copyFileShowLog");
        this.myWorker = new MyWorker();
        this.scroller = new Scroller();
        this.dirPath = '';
        this.baseDir = AppStorage.Get('sanBoxFileDir') as string;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Watcher_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.myContext !== undefined) {
            this.myContext = params.myContext;
        }
        if (params.filePathSize !== undefined) {
            this.filePathSize = params.filePathSize;
        }
        if (params.showFilePath !== undefined) {
            this.showFilePath = params.showFilePath;
        }
        if (params.eventFilePath !== undefined) {
            this.eventFilePath = params.eventFilePath;
        }
        if (params.fileListNames !== undefined) {
            this.fileListNames = params.fileListNames;
        }
        if (params.myWorker !== undefined) {
            this.myWorker = params.myWorker;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.dirPath !== undefined) {
            this.dirPath = params.dirPath;
        }
        if (params.baseDir !== undefined) {
            this.baseDir = params.baseDir;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__myContext.aboutToBeDeleted();
        this.__filePathSize.aboutToBeDeleted();
        this.__showFilePath.aboutToBeDeleted();
        this.__eventFilePath.aboutToBeDeleted();
        this.__fileListNames.aboutToBeDeleted();
        this.__fileNum.aboutToBeDeleted();
        this.__fileListName1.aboutToBeDeleted();
        this.__fileListName2.aboutToBeDeleted();
        this.__copyFileLog1.aboutToBeDeleted();
        this.__copyFileLog2.aboutToBeDeleted();
        this.__copyFileLog3.aboutToBeDeleted();
        this.__copyFileLog4.aboutToBeDeleted();
        this.__copyFileShowLog.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertyObject<Resource>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: Resource) {
        this.__message.set(newValue);
    }
    private __myContext: ObservedPropertyObject<Context>;
    get myContext() {
        return this.__myContext.get();
    }
    set myContext(newValue: Context) {
        this.__myContext.set(newValue);
    }
    private __filePathSize: ObservedPropertyObject<Array<number>>;
    get filePathSize() {
        return this.__filePathSize.get();
    }
    set filePathSize(newValue: Array<number>) {
        this.__filePathSize.set(newValue);
    }
    private __showFilePath: ObservedPropertyObject<Array<string>>;
    get showFilePath() {
        return this.__showFilePath.get();
    }
    set showFilePath(newValue: Array<string>) {
        this.__showFilePath.set(newValue);
    }
    private __eventFilePath: ObservedPropertyObject<Array<string>>;
    get eventFilePath() {
        return this.__eventFilePath.get();
    }
    set eventFilePath(newValue: Array<string>) {
        this.__eventFilePath.set(newValue);
    }
    private __fileListNames: ObservedPropertyObject<Array<string>>;
    get fileListNames() {
        return this.__fileListNames.get();
    }
    set fileListNames(newValue: Array<string>) {
        this.__fileListNames.set(newValue);
    }
    private __fileNum: ObservedPropertyAbstract<string>;
    get fileNum() {
        return this.__fileNum.get();
    }
    set fileNum(newValue: string) {
        this.__fileNum.set(newValue);
    }
    private __fileListName1: ObservedPropertyAbstract<string>;
    get fileListName1() {
        return this.__fileListName1.get();
    }
    set fileListName1(newValue: string) {
        this.__fileListName1.set(newValue);
    }
    private __fileListName2: ObservedPropertyAbstract<string>;
    get fileListName2() {
        return this.__fileListName2.get();
    }
    set fileListName2(newValue: string) {
        this.__fileListName2.set(newValue);
    }
    private __copyFileLog1: ObservedPropertyAbstract<string>;
    get copyFileLog1() {
        return this.__copyFileLog1.get();
    }
    set copyFileLog1(newValue: string) {
        this.__copyFileLog1.set(newValue);
    }
    private __copyFileLog2: ObservedPropertyAbstract<string>;
    get copyFileLog2() {
        return this.__copyFileLog2.get();
    }
    set copyFileLog2(newValue: string) {
        this.__copyFileLog2.set(newValue);
    }
    private __copyFileLog3: ObservedPropertyAbstract<string>;
    get copyFileLog3() {
        return this.__copyFileLog3.get();
    }
    set copyFileLog3(newValue: string) {
        this.__copyFileLog3.set(newValue);
    }
    private __copyFileLog4: ObservedPropertyAbstract<string>;
    get copyFileLog4() {
        return this.__copyFileLog4.get();
    }
    set copyFileLog4(newValue: string) {
        this.__copyFileLog4.set(newValue);
    }
    private __copyFileShowLog: ObservedPropertyAbstract<string>;
    get copyFileShowLog() {
        return this.__copyFileShowLog.get();
    }
    set copyFileShowLog(newValue: string) {
        this.__copyFileShowLog.set(newValue);
    }
    private myWorker: MyWorker;
    private scroller: Scroller;
    public dirPath: string;
    public baseDir: string;
    onPageShow() {
        this.myWorker.readyFilesToWorker();
        let filePathDir = this.baseDir + '/workerDir';
        let filenames = fs.listFileSync(filePathDir);
        Logger.info(TAG, 'listFile succeed');
        for (let i = 0; i < filenames.length; i++) {
            Logger.info(TAG, 'filename: %s', filenames[i]);
            this.showFilePath[i] = filenames[i];
            let filePath = filePathDir + '/' + filenames[i];
            this.filePathSize[i] = fs.statSync(filePath).size;
        }
        this.dirPath = this.baseDir + '/workerCopy';
        if (!fs.accessSync(this.dirPath)) {
            fs.mkdirSync(this.dirPath);
        }
    }
    onPageHide() {
        this.dirPath = this.baseDir + '/workerCopy';
        let isDirectory = fs.statSync(this.dirPath).isDirectory();
        if (isDirectory) {
            fs.rmdirSync(this.dirPath);
            AppStorage.setOrCreate('fileNumber', '0');
            AppStorage.setOrCreate('fileListName1', '');
            AppStorage.setOrCreate('fileListName2', '');
            AppStorage.setOrCreate('copyFileShowLog', '');
        }
        let filePathDir = this.baseDir + '/workerDir';
        let isDir = fs.statSync(filePathDir).isDirectory();
        if (isDir) {
            fs.rmdirSync(filePathDir);
        }
    }
    render() {
        Scroll.create(this.scroller);
        Row.create();
        Column.create();
        Column.height('100%');
        Row.create();
        Row.width('100%');
        Row.height(56);
        Row.backgroundColor('#f1f3f5');
        Row.align(Alignment.Start);
        Image.create($r('app.media.ic_back'));
        Image.id('backIndex2');
        Image.width(20);
        Image.height(18);
        Image.align(Alignment.Start);
        Image.margin({ top: 13, bottom: 15, left: 26, right: 18 });
        Image.onClick(() => {
            router.back();
        });
        Text.create(this.message);
        Text.fontSize(20);
        Text.fontColor('#182431');
        Text.textAlign(TextAlign.Start);
        Text.lineHeight(28);
        Text.fontWeight(700);
        Text.margin({ top: 13, bottom: 15 });
        Text.pop();
        Row.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.width('100%');
        Column.create();
        Column.backgroundColor('#f1f3f5');
        Column.width('100%');
        Row.create();
        Row.margin({ left: 24, right: 52 });
        Row.height(48);
        Row.backgroundColor('#f1f3f5');
        Row.create();
        Row.width('100%');
        Row.backgroundColor('#f1f3f5');
        Text.create($r('app.string.workerTitleText'));
        Text.fontSize(14);
        Text.margin({ top: 19.5, bottom: 9.5 });
        Text.lineHeight(19);
        Text.width(176);
        Text.fontColor('#182431');
        Text.fontWeight(500);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Row.pop();
        Row.pop();
        Column.create();
        Column.backgroundColor('#f1f3f5');
        Column.height(436);
        Column.align(Alignment.Center);
        List.create({ space: 12, initialIndex: 0 });
        List.height('100%');
        List.width('100%');
        List.id('listWorkerFile');
        List.alignListItem(ListItemAlign.Center);
        List.scrollBar(BarState.Auto);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.showFilePath), (item: string, index) => {
            ListItem.create();
            ListItem.id('listItem');
            Row.create();
            Row.borderRadius(20);
            Row.margin({ left: 12, right: 12 });
            Row.height(56);
            Row.backgroundColor(0xFFFFFF);
            Text.create(item);
            Text.fontSize(16);
            Text.fontColor('#182431');
            Text.width('86%');
            Text.lineHeight(22);
            Text.textAlign(TextAlign.Start);
            Text.fontWeight(500);
            Text.margin({ left: 12 });
            Text.borderRadius(10);
            Text.backgroundColor(0xFFFFFF);
            Text.pop();
            Row.create();
            Row.id('row' + index);
            Row.width('9%');
            Checkbox.create();
            Checkbox.select(false);
            Checkbox.id('checkbox' + index);
            Checkbox.width(20);
            Checkbox.height(20);
            Checkbox.margin({ right: 12 });
            Checkbox.selectedColor('#007DFF');
            Checkbox.borderRadius(4);
            Checkbox.onChange((value: boolean) => {
                Logger.info(TAG, 'Checkbox1 change is' + value);
                if (value) {
                    Logger.info(TAG, 'Workerets Checkbox1 index ' + index + ' is true');
                    this.eventFilePath.push(this.showFilePath[index]);
                }
                else {
                    for (let i = 0; i < this.eventFilePath.length; i++) {
                        if (this.eventFilePath[i] === this.showFilePath[index]) {
                            this.eventFilePath[i] = 'deletedTag';
                        }
                    }
                }
            });
            Checkbox.pop();
            Row.pop();
            Row.pop();
            ListItem.pop();
        }, (item: string) => item);
        ForEach.pop();
        List.pop();
        Column.pop();
        Column.create();
        Column.backgroundColor('#f1f3f5');
        Column.width('100%');
        Column.height(216);
        Row.create();
        Row.width('100%');
        Row.align(Alignment.Start);
        Text.create($r('app.string.logTitle'));
        Text.fontSize(14);
        Text.fontColor('#182431');
        Text.textAlign(TextAlign.Start);
        Text.lineHeight(19);
        Text.fontWeight(500);
        Text.margin({ top: 19.5, left: 24 });
        Text.width(176);
        Text.pop();
        Row.pop();
        Column.create();
        Column.borderRadius(20);
        Column.height(80);
        Column.margin({ top: 9.5, left: 16, right: 16 });
        Column.backgroundColor('#ffffff');
        Column.create();
        Column.margin({ top: 8, left: 12, right: 12, bottom: 8 });
        Column.height(64);
        Text.create(this.copyFileLog1 + this.fileNum + this.copyFileLog2);
        Text.fontSize(16);
        Text.fontColor('#182431');
        Text.fontWeight(400);
        Text.width('100%');
        Text.pop();
        Text.create(this.copyFileShowLog);
        Text.fontSize(16);
        Text.fontColor('#182431');
        Text.fontWeight(400);
        Text.width('100%');
        Text.pop();
        Column.pop();
        Column.pop();
        Row.create({ space: 1 });
        Row.align(Alignment.Center);
        Row.width('100%');
        Row.margin({ top: 24, left: 24, right: 24, bottom: 24 });
        Column.create();
        Column.width('100%');
        Column.align(Alignment.End);
        Button.createWithLabel($r('app.string.copyFileText'));
        Button.fontSize(16);
        Button.width(312);
        Button.height(40);
        Button.fontColor('#FFFFFF');
        Button.fontWeight(500);
        Button.id('copyFile');
        Button.onClick(async () => {
            this.myWorker.deleteCopyFile(this.dirPath);
            await this.myWorker.workToCopyFiles(ObservedObject.GetRawObject(this.eventFilePath), this.dirPath);
        });
        Button.pop();
        Column.pop();
        Row.pop();
        Column.pop();
        Column.pop();
        Flex.pop();
        Column.pop();
        Row.pop();
        Scroll.pop();
    }
}
loadDocument(new Watcher("1", undefined, {}));
