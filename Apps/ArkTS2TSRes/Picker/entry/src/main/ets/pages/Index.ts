interface Index_Params {
    mediaFileUri?: MediaFileUri;
    scroller?: Scroller;
    uri?: string;
    filename?: string;
    sizeFile?: number;
    authorizeBundleName?: string;
    log?: string;
    imageFlagCur?: number;
    fileSizeList?: Array<number>;
    fileNameList?: Array<string>;
    fileUriList?: Array<string>;
    imageNames?: Array<string>;
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
import picker from '@ohos.file.picker';
import router from '@ohos.router';
import mediaLibrary from '@ohos.multimedia.mediaLibrary';
import common from '@ohos.app.ability.common';
import { BusinessError } from '@ohos.base';
import Logger from '../common/Logger';
import MediaFileUri from '../media/MediaFileUri';
const MAX_SELECT_NUM = 3; // 选择媒体文件的最大数目
const TAG = 'pickerIndex';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.mediaFileUri = new MediaFileUri();
        this.scroller = new Scroller();
        this.__uri = new ObservedPropertySimple('Hello World', this, "uri");
        this.__filename = new ObservedPropertySimple('', this, "filename");
        this.__sizeFile = new ObservedPropertySimple(0, this, "sizeFile");
        this.authorizeBundleName = 'com.open.file.uri.demo';
        this.__log = new ObservedPropertySimple('', this, "log");
        this.__imageFlagCur = new ObservedPropertySimple(0, this, "imageFlagCur");
        this.__fileSizeList = AppStorage.SetAndLink('fileSizeList', [], this, "fileSizeList");
        this.__fileNameList = AppStorage.SetAndLink('fileNameList', [], this, "fileNameList");
        this.__fileUriList = AppStorage.SetAndLink('fileUriList', [], this, "fileUriList");
        this.__imageNames = AppStorage.SetAndLink('imageNames', [], this, "imageNames");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.mediaFileUri !== undefined) {
            this.mediaFileUri = params.mediaFileUri;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.uri !== undefined) {
            this.uri = params.uri;
        }
        if (params.filename !== undefined) {
            this.filename = params.filename;
        }
        if (params.sizeFile !== undefined) {
            this.sizeFile = params.sizeFile;
        }
        if (params.authorizeBundleName !== undefined) {
            this.authorizeBundleName = params.authorizeBundleName;
        }
        if (params.log !== undefined) {
            this.log = params.log;
        }
        if (params.imageFlagCur !== undefined) {
            this.imageFlagCur = params.imageFlagCur;
        }
    }
    aboutToBeDeleted() {
        this.__uri.aboutToBeDeleted();
        this.__filename.aboutToBeDeleted();
        this.__sizeFile.aboutToBeDeleted();
        this.__log.aboutToBeDeleted();
        this.__imageFlagCur.aboutToBeDeleted();
        this.__fileSizeList.aboutToBeDeleted();
        this.__fileNameList.aboutToBeDeleted();
        this.__fileUriList.aboutToBeDeleted();
        this.__imageNames.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private mediaFileUri: MediaFileUri;
    private scroller: Scroller;
    private __uri: ObservedPropertySimple<string>;
    get uri() {
        return this.__uri.get();
    }
    set uri(newValue: string) {
        this.__uri.set(newValue);
    }
    private __filename: ObservedPropertySimple<string>;
    get filename() {
        return this.__filename.get();
    }
    set filename(newValue: string) {
        this.__filename.set(newValue);
    }
    private __sizeFile: ObservedPropertySimple<number>;
    get sizeFile() {
        return this.__sizeFile.get();
    }
    set sizeFile(newValue: number) {
        this.__sizeFile.set(newValue);
    }
    private authorizeBundleName: string;
    private __log: ObservedPropertySimple<string>;
    get log() {
        return this.__log.get();
    }
    set log(newValue: string) {
        this.__log.set(newValue);
    }
    private __imageFlagCur: ObservedPropertySimple<number>;
    get imageFlagCur() {
        return this.__imageFlagCur.get();
    }
    set imageFlagCur(newValue: number) {
        this.__imageFlagCur.set(newValue);
    }
    private __fileSizeList: ObservedPropertyAbstract<Array<number>>;
    get fileSizeList() {
        return this.__fileSizeList.get();
    }
    set fileSizeList(newValue: Array<number>) {
        this.__fileSizeList.set(newValue);
    }
    private __fileNameList: ObservedPropertyAbstract<Array<string>>;
    get fileNameList() {
        return this.__fileNameList.get();
    }
    set fileNameList(newValue: Array<string>) {
        this.__fileNameList.set(newValue);
    }
    private __fileUriList: ObservedPropertyAbstract<Array<string>>;
    get fileUriList() {
        return this.__fileUriList.get();
    }
    set fileUriList(newValue: Array<string>) {
        this.__fileUriList.set(newValue);
    }
    private __imageNames: ObservedPropertyAbstract<Array<string>>;
    get imageNames() {
        return this.__imageNames.get();
    }
    set imageNames(newValue: Array<string>) {
        this.__imageNames.set(newValue);
    }
    /**
     * 拉起picker选择文件
     */
    async callFilePickerSelectFile(): Promise<void> {
        try {
            let DocumentSelectOptions = new picker.DocumentSelectOptions();
            let documentPicker = new picker.DocumentViewPicker();
            documentPicker.select(DocumentSelectOptions).then((DocumentSelectResult) => {
                Logger.info(TAG, 'DocumentViewPicker.select successfully, DocumentSelectResult uri: ' + JSON.stringify(DocumentSelectResult));
                let editFlag = false;
                if (DocumentSelectResult !== null && DocumentSelectResult !== undefined) {
                    DocumentSelectResult.forEach((value) => {
                        this.uri = value;
                        editFlag = true;
                        Logger.info(TAG, `select file uri: ${this.uri}`);
                    });
                }
                if (editFlag) {
                    this.getFilenameByUri(this.uri);
                }
            }).catch((err: BusinessError) => {
                Logger.error(TAG, 'DocumentViewPicker.select failed with err: ' + JSON.stringify(err));
            });
        }
        catch (err) {
            Logger.error(TAG, 'DocumentViewPicker failed with err: ' + JSON.stringify(err));
        }
    }
    /**
     * 拉起picker保存文件
     */
    async callFilePickerSaveFile(): Promise<void> {
        try {
            let DocumentSaveOptions = new picker.DocumentSaveOptions();
            DocumentSaveOptions.newFileNames = ['MyDocument_01.txt'];
            let documentPicker = new picker.DocumentViewPicker();
            documentPicker.save(DocumentSaveOptions).then((DocumentSaveResult) => {
                Logger.info(TAG, 'DocumentViewPicker.save successfully, DocumentSaveResult uri: ' + JSON.stringify(DocumentSaveResult));
                if (DocumentSaveResult !== null && DocumentSaveResult !== undefined) {
                    this.uri = DocumentSaveResult[0];
                    Logger.info(TAG, `save file uri: ${this.uri}`);
                }
                this.getFilenameByUri(this.uri);
            }).catch((err: BusinessError) => {
                Logger.error(TAG, 'DocumentViewPicker.save failed with err: ' + JSON.stringify(err));
            });
        }
        catch (err) {
            Logger.error(TAG, 'DocumentViewPicker failed with err: ' + err);
        }
    }
    async getFilenameByUriForMedia(myUris: string[]) {
        Logger.info(TAG, ' getFilenameByUriForMedia begin');
        // 创建文件获取选项，此处参数为获取image类型的文件资源
        let imagesFetchOp: mediaLibrary.MediaFetchOptions = {
            selections: mediaLibrary.FileKey.MEDIA_TYPE + '= ? OR ' + mediaLibrary.FileKey.MEDIA_TYPE + '= ?',
            selectionArgs: [mediaLibrary.MediaType.IMAGE.toString(), mediaLibrary.MediaType.VIDEO.toString()],
            uri: myUris[0],
        };
        let media = mediaLibrary.getMediaLibrary(getContext(this));
        // 获取文件资源，使用callback方式返回异步结果
        media.getFileAssets(imagesFetchOp, async (error, fetchFileResult) => {
            // 判断获取的文件资源的检索结果集是否为undefined，若为undefined则接口调用失败
            Logger.info(TAG, 'getFilenameByUriForMedia getMediaLibrary is ok');
            if (fetchFileResult === undefined) {
                Logger.error(TAG, 'get fetchFileResult failed with error: ' + error);
                return;
            }
            // 获取文件检索结果集中的总数
            const count = fetchFileResult.getCount();
            Logger.info(TAG, ' getFilenameByUriForMedia count is: ' + count);
            // 判断结果集中的数量是否小于0，小于0时表示接口调用失败
            if (count < 0) {
                Logger.error(TAG, 'get count from fetchFileResult failed, count: ' + count);
                return;
            }
            // 判断结果集中的数量是否等于0，等于0时表示接口调用成功，但是检索结果集为空，请检查文件获取选项参数配置是否有误和设备中是否存在相应文件
            if (count === 0) {
                Logger.info(TAG, 'The count of fetchFileResult is zero');
                return;
            }
            Logger.info(TAG, 'Get fetchFileResult successfully, count: ' + count);
            // 获取文件检索结果集中的第一个资源，使用callback方式返回异步结果，文件数量较多时请使用getAllObject接口
            fetchFileResult.getFirstObject(async (error, fileAsset) => {
                // 检查获取的第一个资源是否为undefined，若为undefined则接口调用失败
                if (fileAsset === undefined) {
                    Logger.error(TAG, 'get first object failed with error: ' + error);
                    return;
                }
                Logger.info(TAG, ' fileAsset.uri 0:' + fileAsset.uri);
                Logger.info(TAG, ' myUri: ' + myUris[0]);
                let index = 0;
                this.imageNames[index] = fileAsset.displayName;
                Logger.info(TAG, ' ViewMedia imageFlagCur ' + this.imageFlagCur);
                router.pushUrl({
                    url: 'pages/ViewMedia',
                    params: {
                        uris: myUris
                    }
                }, router.RouterMode.Standard);
                fetchFileResult.close();
            });
        });
    }
    async getFilenameByUri(myUri: string): Promise<void> {
        // 获取文件名称
        this.filename = (myUri.split("/").pop()) as string;
        router.pushUrl({
            url: 'pages/EditFile',
            params: {
                fileName: this.filename,
                myUri: myUri
            }
        }, router.RouterMode.Standard);
    }
    /**
     * 拉起picker选择图片/视频
     */
    async callFilePickerSelectImage(): Promise<void> {
        let array: string[];
        try {
            // 设置photoPicker的参数
            let PhotoSelectOptions = new picker.PhotoSelectOptions();
            PhotoSelectOptions.MIMEType = picker.PhotoViewMIMETypes.IMAGE_VIDEO_TYPE; // 过滤选择媒体文件类型
            PhotoSelectOptions.maxSelectNumber = MAX_SELECT_NUM; // 选择媒体文件的最大数目
            let mediaFlag = false;
            let photoPicker = new picker.PhotoViewPicker(); // 使用图库选择器对象前，需要先创建PhotoViewPicker实例
            photoPicker.select(PhotoSelectOptions).then((PhotoSelectResult) => {
                Logger.info(TAG, 'PhotoViewPicker.select successfully, PhotoSelectResult uri: ' + JSON.stringify(PhotoSelectResult)); // 日志中记录成功信息
                if (PhotoSelectResult !== null && PhotoSelectResult !== undefined) { // 接口采用callback异步返回形式，返回PhotoSelectResult对象，故进行下一步操作前要先判断是否已经成功返回PhotoSelectResult对象了
                    // PhotoSelectResult为返回的结果集。
                    // 其中包含Array<string>类型的photoUris，为返回图库选择后的媒体文件的uri数组；还包含boolean类型的isOriginalPhoto，指示返回图库选择后的媒体文件是否为原图。
                    // 声明变量array，其取值为PhotoSelectResult中的数组。
                    array = PhotoSelectResult['photoUris'];
                    array.forEach((value) => {
                        this.uri = value;
                        mediaFlag = true;
                        Logger.info(TAG, `select image/video uri: ${this.uri}`);
                    });
                }
                if (mediaFlag) {
                    this.getFilenameByUriForMedia(array);
                }
            })
                .catch((err: BusinessError) => {
                Logger.error(TAG, 'PhotoViewPicker.select failed with err: ' + JSON.stringify(err));
            });
        }
        catch (err) {
            Logger.error(TAG, 'PhotoViewPicker failed with err: ' + err);
        }
    }
    aboutToDisappear(): void {
        this.fileNameList = [];
        this.fileSizeList = [];
        this.fileUriList = [];
    }
    onPageShow(): void {
        let context = getContext(this) as common.UIAbilityContext;
        this.mediaFileUri.getAllFiles(context);
    }
    render() {
        Scroll.create(this.scroller);
        Row.create();
        Row.height('100%');
        Column.create();
        Column.alignItems(HorizontalAlign.Center);
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor('#f1f3f5');
        Row.create();
        Row.width('100%');
        Row.height(41);
        Row.margin({ top: 7, left: 24, right: 25, bottom: 8 });
        Column.create();
        Column.width('50%');
        Column.margin({ left: '6.7%' });
        Column.alignItems(HorizontalAlign.Start);
        Text.create($r('app.string.last_open'));
        Text.fontFamily('HarmonyHeiTi-Bold');
        Text.fontSize(30);
        Text.fontWeight(700);
        Text.textAlign(TextAlign.Start);
        Text.fontColor('#182431');
        Text.lineHeight(41);
        Text.width('70%');
        Text.height(41);
        Text.pop();
        Column.pop();
        Row.create();
        Row.justifyContent(FlexAlign.End);
        Row.padding({ right: '8%' });
        Row.width('50%');
        Image.create($r('app.media.ic_saveas'));
        Image.width(25);
        Image.height(25);
        Image.margin({ right: '12%' });
        Image.id('newFile');
        Image.onClick(() => {
            this.callFilePickerSaveFile();
        });
        Image.create($r('app.media.ic_picture'));
        Image.width(25);
        Image.height(25);
        Image.id('picture');
        Image.margin({ right: '12%' });
        Image.onClick(() => {
            this.callFilePickerSelectImage();
        });
        Image.create($r('app.media.ic_folder'));
        Image.width(25);
        Image.height(25);
        Image.id('folder');
        Image.opacity(1);
        Image.margin({ right: '6%' });
        Image.onClick(() => {
            this.callFilePickerSelectFile();
        });
        Row.pop();
        Row.pop();
        Row.create();
        Row.backgroundColor(0xFFFFFF);
        Row.width('100%');
        Row.height('52vp');
        Row.padding({ top: 4, left: 12, right: 12 });
        Row.onClick(() => {
            this.callFilePickerSelectFile();
        });
        Text.create($r('app.string.view_last_open'));
        Text.fontSize(16);
        Text.textAlign(TextAlign.Start);
        Text.lineHeight(22);
        Text.pop();
        Blank.create();
        Blank.pop();
        Image.create($r('app.media.right_arrow'));
        Image.height('19vp');
        Image.width('10vp');
        Image.margin({ left: 9, right: 9, top: 6, bottom: 6 });
        Row.pop();
        Column.create();
        Column.height('100%');
        Column.width('100%');
        List.create({ space: 12, initialIndex: 0 });
        List.listDirection(Axis.Vertical);
        List.id('indexList');
        List.edgeEffect(EdgeEffect.Spring);
        List.scrollBar(BarState.Auto);
        List.alignListItem(ListItemAlign.Center);
        List.margin({ top: '1%', left: 12, right: 12 });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.fileNameList), (item: string, index?: number) => {
            ListItem.create();
            ListItem.onClick(() => {
                Logger.info(TAG, 'fileAsset.displayName fileName item: ' + item);
                if (index !== undefined) {
                    router.pushUrl({
                        url: 'pages/EditFile',
                        params: {
                            fileName: item,
                            myUri: this.fileUriList[index]
                        }
                    }, router.RouterMode.Standard);
                }
            });
            Row.create();
            Row.id('fileItem' + (index !== undefined ? index : ""));
            Row.borderRadius(24);
            Row.width('100%');
            Row.height(64);
            Row.padding({ right: 12 });
            Row.backgroundColor('#FFFFFF');
            Image.create($r('app.media.ic_docs'));
            Image.width('3.3%');
            Image.height(22);
            Image.margin({ left: 15, right: 19 });
            Text.create(item);
            Text.fontSize(16);
            Text.fontFamily('HarmonyHeiTi-Medium');
            Text.fontColor('#182431');
            Text.lineHeight(22);
            Text.fontWeight(500);
            Text.textAlign(TextAlign.Start);
            Text.margin({ left: 0, right: 16 });
            Text.width('64.5%');
            Text.pop();
            If.create();
            if (index !== undefined) {
                If.branchId(0);
                Text.create('Size: ' + JSON.stringify(this.fileSizeList[index]) + 'B');
                Text.fontSize(14);
                Text.fontFamily('HarmonyHeiTi-Medium');
                Text.lineHeight(19);
                Text.fontColor('#182431');
                Text.textAlign(TextAlign.End);
                Text.opacity(0.6);
                Text.width('20.8%');
                Text.margin({ left: 0, right: 12 });
                Text.pop();
            }
            If.pop();
            Row.pop();
            ListItem.pop();
        }, (item: string) => item);
        ForEach.pop();
        List.pop();
        Column.pop();
        Column.pop();
        Row.pop();
        Scroll.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
