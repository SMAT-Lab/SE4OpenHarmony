interface Download_Params {
    fileData?: CustomDataSource;
    isBackground?: boolean;
    downloadFolder?: Array<string>;
    isGetData?: boolean;
    checkFile?: Array<string>;
    checkList?: Array<boolean>;
    isRunning?: boolean;
    isPause?: boolean;
    progress?: number;
    selectFolder?;
    folderDialogController?: CustomDialogController;
    downloadFilesCallback?;
    downloadFileCallback?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Download_" + ++__generate__Id;
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
import router from '@ohos.router';
import { CustomDataSource } from '../components/CustomDataSource';
import { FileModel, FileType, fileUtils, logger, requestFiles, requestDownload, TOAST_BOTTOM } from '@ohos/uploaddownload';
import { SelectFolderDialog } from '../components/SelectFolderDialog';
const TAG: string = 'Download';
class Download extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.fileData = new CustomDataSource([]);
        this.__isBackground = AppStorage.SetAndLink('isBackground', false, this, "isBackground");
        this.__downloadFolder = new ObservedPropertyObject([], this, "downloadFolder");
        this.addProvidedVar("downloadFolder", this.__downloadFolder, false);
        this.__isGetData = new ObservedPropertySimple(false, this, "isGetData");
        this.__checkFile = new ObservedPropertyObject([], this, "checkFile");
        this.__checkList = new ObservedPropertyObject([], this, "checkList");
        this.__isRunning = new ObservedPropertySimple(false, this, "isRunning");
        this.__isPause = new ObservedPropertySimple(false, this, "isPause");
        this.__progress = new ObservedPropertySimple(0, this, "progress");
        this.selectFolder = (folder: string) => {
            logger.info(TAG, `selectFolder = ${folder}`);
            this.download(folder);
        };
        this.folderDialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new SelectFolderDialog("3", this, { selectFolder: this.selectFolder });
                jsDialog.setController(this.folderDialogController);
                View.create(jsDialog);
            },
            autoCancel: true,
            alignment: DialogAlignment.Bottom,
            offset: { dx: 0, dy: -12 }
        }, this);
        this.downloadFilesCallback = (downloadCount: number, isSuccess: boolean) => {
            this.progress = downloadCount;
            if (downloadCount === this.checkFile.length) {
                this.downloadFinish(isSuccess);
            }
        };
        this.downloadFileCallback = (progress: number, isSuccess: boolean) => {
            this.progress = progress;
            if (this.progress === 100) {
                this.downloadFinish(isSuccess);
            }
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Download_Params) {
        if (params.fileData !== undefined) {
            this.fileData = params.fileData;
        }
        if (params.downloadFolder !== undefined) {
            this.downloadFolder = params.downloadFolder;
        }
        if (params.isGetData !== undefined) {
            this.isGetData = params.isGetData;
        }
        if (params.checkFile !== undefined) {
            this.checkFile = params.checkFile;
        }
        if (params.checkList !== undefined) {
            this.checkList = params.checkList;
        }
        if (params.isRunning !== undefined) {
            this.isRunning = params.isRunning;
        }
        if (params.isPause !== undefined) {
            this.isPause = params.isPause;
        }
        if (params.progress !== undefined) {
            this.progress = params.progress;
        }
        if (params.selectFolder !== undefined) {
            this.selectFolder = params.selectFolder;
        }
        if (params.folderDialogController !== undefined) {
            this.folderDialogController = params.folderDialogController;
        }
        if (params.downloadFilesCallback !== undefined) {
            this.downloadFilesCallback = params.downloadFilesCallback;
        }
        if (params.downloadFileCallback !== undefined) {
            this.downloadFileCallback = params.downloadFileCallback;
        }
    }
    aboutToBeDeleted() {
        this.__isBackground.aboutToBeDeleted();
        this.__downloadFolder.aboutToBeDeleted();
        this.__isGetData.aboutToBeDeleted();
        this.__checkFile.aboutToBeDeleted();
        this.__checkList.aboutToBeDeleted();
        this.__isRunning.aboutToBeDeleted();
        this.__isPause.aboutToBeDeleted();
        this.__progress.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private fileData: CustomDataSource;
    private __isBackground: ObservedPropertyAbstract<boolean>;
    get isBackground() {
        return this.__isBackground.get();
    }
    set isBackground(newValue: boolean) {
        this.__isBackground.set(newValue);
    }
    private __downloadFolder: ObservedPropertyObject<Array<string>>;
    get downloadFolder() {
        return this.__downloadFolder.get();
    }
    set downloadFolder(newValue: Array<string>) {
        this.__downloadFolder.set(newValue);
    }
    private __isGetData: ObservedPropertySimple<boolean>;
    get isGetData() {
        return this.__isGetData.get();
    }
    set isGetData(newValue: boolean) {
        this.__isGetData.set(newValue);
    }
    private __checkFile: ObservedPropertyObject<Array<string>>;
    get checkFile() {
        return this.__checkFile.get();
    }
    set checkFile(newValue: Array<string>) {
        this.__checkFile.set(newValue);
    }
    private __checkList: ObservedPropertyObject<Array<boolean>>;
    get checkList() {
        return this.__checkList.get();
    }
    set checkList(newValue: Array<boolean>) {
        this.__checkList.set(newValue);
    }
    private __isRunning: ObservedPropertySimple<boolean>;
    get isRunning() {
        return this.__isRunning.get();
    }
    set isRunning(newValue: boolean) {
        this.__isRunning.set(newValue);
    }
    private __isPause: ObservedPropertySimple<boolean>;
    get isPause() {
        return this.__isPause.get();
    }
    set isPause(newValue: boolean) {
        this.__isPause.set(newValue);
    }
    private __progress: ObservedPropertySimple<number>;
    get progress() {
        return this.__progress.get();
    }
    set progress(newValue: number) {
        this.__progress.set(newValue);
    }
    private selectFolder;
    private folderDialogController: CustomDialogController;
    render() {
        Navigation.create();
        Navigation.width('100%');
        Navigation.height('100%');
        Navigation.hideBackButton(false);
        Navigation.titleMode(NavigationTitleMode.Mini);
        Navigation.mode(NavigationMode.Stack);
        Navigation.backgroundColor($r('app.color.light_gray'));
        Navigation.hideToolBar(false);
        Navigation.title($r('app.string.download'));
        Column.create();
        Column.padding({ left: 12, right: 12, bottom: 12 });
        Column.height('100%');
        If.create();
        if (this.isGetData) {
            If.branchId(0);
            LoadingProgress.create();
            LoadingProgress.width(100);
            LoadingProgress.layoutWeight(1);
        }
        else {
            If.branchId(1);
            List.create({ space: 12 });
            List.width('100%');
            List.scrollBar(BarState.Off);
            List.layoutWeight(1);
            List.backgroundColor(Color.White);
            List.borderRadius(24);
            List.padding({ top: 4, bottom: 4 });
            List.divider({ strokeWidth: 1, startMargin: 44, endMargin: 12 });
            LazyForEach.create("2", this, ObservedObject.GetRawObject(this.fileData), (item: FileModel, index?: number) => {
                this.isRenderingInProgress = true;
                ListItem.create();
                this.FileItem(item, index, this);
                ListItem.pop();
                this.isRenderingInProgress = false;
            }, (item: FileModel) => JSON.stringify(item));
            LazyForEach.pop();
            List.pop();
        }
        If.pop();
        this.BottomView(this);
        Column.pop();
        Navigation.pop();
    }
    FileItem(file: FileModel, index: number, parent = null) {
        Row.create();
        Row.width('100%');
        Row.padding({ left: 12, right: 12 });
        Row.height(48);
        Row.onClick(() => {
            this.fileCheck(index);
        });
        Row.create();
        Row.layoutWeight(1);
        If.create();
        if (file.fileType === FileType.FOLDER) {
            If.branchId(0);
            Image.create($r('app.media.ic_files_folder'));
            Image.size({ width: 24, height: 24 });
            Image.objectFit(ImageFit.Contain);
        }
        else if (file.fileType === FileType.IMAGE) {
            If.branchId(1);
            Image.create($r('app.media.ic_public_picture'));
            Image.size({ width: 24, height: 24 });
            Image.objectFit(ImageFit.Contain);
        }
        else if (file.fileType === FileType.MUSIC) {
            If.branchId(2);
            Image.create($r('app.media.ic_public_music'));
            Image.size({ width: 24, height: 24 });
            Image.objectFit(ImageFit.Contain);
        }
        else if (file.fileType === FileType.Video) {
            If.branchId(3);
            Image.create($r('app.media.ic_public_video'));
            Image.size({ width: 24, height: 24 });
            Image.objectFit(ImageFit.Contain);
        }
        else {
            If.branchId(4);
            Image.create($r('app.media.ic_public_document'));
            Image.size({ width: 24, height: 24 });
            Image.objectFit(ImageFit.Contain);
        }
        If.pop();
        Text.create(decodeURIComponent(file.name));
        Text.fontSize(16);
        Text.fontWeight(400);
        Text.layoutWeight(1);
        Text.maxLines(1);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.margin({ left: 12 });
        Text.pop();
        Row.pop();
        Checkbox.create({ name: '', group: 'checkboxGroup' });
        Checkbox.select(this.checkList[index]);
        Checkbox.selectedColor($r('app.color.button_blue'));
        Checkbox.margin({ left: 12 });
        Checkbox.hitTestBehavior(HitTestMode.None);
        Checkbox.pop();
        Row.pop();
    }
    BottomView(parent = null) {
        Column.create({ space: 12 });
        Column.margin({ top: 12, left: 12, right: 12 });
        Button.createWithChild();
        Button.id('download_to');
        Button.type(ButtonType.Capsule);
        Button.height(45);
        Button.width('100%');
        Button.backgroundColor($r('app.color.button_blue'));
        Button.onClick(() => {
            if (!this.isRunning) {
                this.folderDialogController.open();
            }
        });
        Row.create();
        If.create();
        if (!this.isBackground && this.isRunning) {
            If.branchId(0);
            Text.create(`${this.progress}%`);
            Text.fontColor(Color.White);
            Text.fontSize(16);
            Text.pop();
            Text.create($r('app.string.downloading'));
            Text.fontColor(Color.White);
            Text.fontSize(16);
            Text.margin({ left: 12 });
            Text.pop();
        }
        else {
            If.branchId(1);
            Text.create($r('app.string.download'));
            Text.fontColor(Color.White);
            Text.fontSize(16);
            Text.pop();
        }
        If.pop();
        Row.pop();
        Button.pop();
        Button.createWithLabel($r('app.string.view_download_files'));
        Button.id('view_download_files');
        Button.type(ButtonType.Capsule);
        Button.backgroundColor($r('sys.color.ohos_id_color_button_normal'));
        Button.width('100%');
        Button.fontSize(16);
        Button.margin({ bottom: 12 });
        Button.fontColor($r('app.color.btn_text_blue'));
        Button.onClick(() => {
            router.pushUrl({
                url: 'pages/DownloadFiles'
            });
        });
        Button.pop();
        Column.pop();
    }
    aboutToAppear() {
        this.isRunning = false;
        this.isPause = false;
        this.isGetData = true;
        requestFiles.requestFiles().then((data: FileModel[]) => {
            this.checkList = [];
            this.isRunning = false;
            this.fileData.dataArray = data;
            this.fileData.dataArray.forEach((item: FileModel) => {
                this.checkList.push(false);
            });
            this.isGetData = false;
            this.fileData.notifyDataReload();
        });
        fileUtils.listFolders().then((folders: Array<string>) => {
            this.downloadFolder = folders;
        });
    }
    fileCheck(index: number) {
        if (!this.isBackground) {
            for (let i = 0; i < this.checkList.length; i++) {
                if (i !== index) {
                    this.checkList[i] = false;
                }
            }
        }
        this.checkList[index] = !this.checkList[index];
        logger.info(TAG, `this.checkList = ${JSON.stringify(this.checkList)}`);
    }
    download(folder: string) {
        this.checkFile = [];
        if (this.checkList === undefined) {
            return;
        }
        logger.info(TAG, `this.checkList = ${JSON.stringify(this.checkList)}`);
        for (let i = 0; i < this.checkList.length; i++) {
            if (this.checkList[i]) {
                let fileModel = this.fileData.getData(i);
                logger.info(TAG, `fileModel = ${JSON.stringify(fileModel)}`);
                fileModel.files.forEach((url: string) => {
                    let splitUrl = url.split('//')[1].split('/');
                    if (splitUrl[splitUrl.length - 1] !== '') {
                        this.checkFile.push(url);
                    }
                });
            }
        }
        logger.info(TAG, `this.checkFile = ${JSON.stringify(this.checkFile)}`);
        if (this.checkFile.length === 0) {
            promptAction.showToast({ message: $r('app.string.check_file_tips'), bottom: TOAST_BOTTOM });
            return;
        }
        this.progress = 0;
        if (this.isBackground) {
            this.isRunning = false;
            requestDownload.downloadFilesBackground(folder, this.checkFile);
            this.checkFile = [];
            this.checkList = [];
            this.fileData.dataArray.forEach((item: FileModel) => {
                this.checkList.push(false);
            });
            this.fileData.notifyDataReload();
            promptAction.showToast({ message: $r('app.string.background_task_start'), bottom: TOAST_BOTTOM });
        }
        else {
            this.isRunning = true;
            requestDownload.downloadFile(folder, this.checkFile[0], this.downloadFileCallback);
        }
    }
    private downloadFilesCallback;
    private downloadFileCallback;
    downloadFinish(isSuccess: boolean) {
        this.isRunning = false;
        this.checkFile = [];
        this.checkList = [];
        this.fileData.dataArray.forEach((item: FileModel) => {
            this.checkList.push(false);
        });
        this.fileData.notifyDataReload();
        let message = isSuccess ? $r('app.string.download_finish') : $r('app.string.download_fail');
        promptAction.showToast({ message: message, bottom: TOAST_BOTTOM });
    }
}
loadDocument(new Download("1", undefined, {}));
