interface ViewMedia_Params {
    myContext?: Context;
    myFileSizes?: number[];
    myFileNames?: string[];
    myFileTypes?: number[];
    myFileName?: string;
    myFileSize?: number;
    myUris?: string[];
    uri?: string;
    showPauses?: Array<number>;
    mediaFileUri?: MediaFileUri;
    scroller?: Scroller;
    currentUri?: string;
    controllers?: Array<VideoController>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ViewMedia_" + ++__generate__Id;
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
import common from '@ohos.app.ability.common';
import fs from '@ohos.file.fs'; // 实现应用文件访问能力
import router from '@ohos.router';
import picker from '@ohos.file.picker';
import mediaLibrary from '@ohos.multimedia.mediaLibrary';
import { BusinessError } from '@ohos.base';
import MediaFileUri from '../media/MediaFileUri';
import Logger from '../common/Logger';
const TAG = 'ViewMedia';
interface myParams extends Object {
    uris: string[];
}
class ViewMedia extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__myContext = new ObservedPropertyObject(getContext(this) as common.UIAbilityContext, this, "myContext");
        this.__myFileSizes = new ObservedPropertyObject([], this, "myFileSizes");
        this.__myFileNames = new ObservedPropertyObject([], this, "myFileNames");
        this.__myFileTypes = new ObservedPropertyObject([], this, "myFileTypes");
        this.__myFileName = AppStorage.SetAndLink('myFileName', '', this, "myFileName");
        this.__myFileSize = AppStorage.SetAndLink('myFileSize', 0, this, "myFileSize");
        this.__myUris = new ObservedPropertyObject((router.getParams() as myParams).uris, this, "myUris");
        this.__uri = new ObservedPropertySimple('Hello World', this, "uri");
        this.__showPauses = AppStorage.SetAndLink('showPauses', [], this, "showPauses");
        this.mediaFileUri = new MediaFileUri();
        this.scroller = new Scroller();
        this.currentUri = '';
        this.controllers = [];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ViewMedia_Params) {
        if (params.myContext !== undefined) {
            this.myContext = params.myContext;
        }
        if (params.myFileSizes !== undefined) {
            this.myFileSizes = params.myFileSizes;
        }
        if (params.myFileNames !== undefined) {
            this.myFileNames = params.myFileNames;
        }
        if (params.myFileTypes !== undefined) {
            this.myFileTypes = params.myFileTypes;
        }
        if (params.myUris !== undefined) {
            this.myUris = params.myUris;
        }
        if (params.uri !== undefined) {
            this.uri = params.uri;
        }
        if (params.mediaFileUri !== undefined) {
            this.mediaFileUri = params.mediaFileUri;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.currentUri !== undefined) {
            this.currentUri = params.currentUri;
        }
        if (params.controllers !== undefined) {
            this.controllers = params.controllers;
        }
    }
    aboutToBeDeleted() {
        this.__myContext.aboutToBeDeleted();
        this.__myFileSizes.aboutToBeDeleted();
        this.__myFileNames.aboutToBeDeleted();
        this.__myFileTypes.aboutToBeDeleted();
        this.__myFileName.aboutToBeDeleted();
        this.__myFileSize.aboutToBeDeleted();
        this.__myUris.aboutToBeDeleted();
        this.__uri.aboutToBeDeleted();
        this.__showPauses.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __myContext: ObservedPropertyObject<Context>;
    get myContext() {
        return this.__myContext.get();
    }
    set myContext(newValue: Context) {
        this.__myContext.set(newValue);
    }
    private __myFileSizes: ObservedPropertyObject<number[]>;
    get myFileSizes() {
        return this.__myFileSizes.get();
    }
    set myFileSizes(newValue: number[]) {
        this.__myFileSizes.set(newValue);
    }
    private __myFileNames: ObservedPropertyObject<string[]>;
    get myFileNames() {
        return this.__myFileNames.get();
    }
    set myFileNames(newValue: string[]) {
        this.__myFileNames.set(newValue);
    }
    private __myFileTypes: ObservedPropertyObject<number[]>;
    get myFileTypes() {
        return this.__myFileTypes.get();
    }
    set myFileTypes(newValue: number[]) {
        this.__myFileTypes.set(newValue);
    }
    private __myFileName: ObservedPropertyAbstract<string>;
    get myFileName() {
        return this.__myFileName.get();
    }
    set myFileName(newValue: string) {
        this.__myFileName.set(newValue);
    }
    private __myFileSize: ObservedPropertyAbstract<number>;
    get myFileSize() {
        return this.__myFileSize.get();
    }
    set myFileSize(newValue: number) {
        this.__myFileSize.set(newValue);
    }
    private __myUris: ObservedPropertyObject<string[]>;
    get myUris() {
        return this.__myUris.get();
    }
    set myUris(newValue: string[]) {
        this.__myUris.set(newValue);
    }
    private __uri: ObservedPropertySimple<string>;
    get uri() {
        return this.__uri.get();
    }
    set uri(newValue: string) {
        this.__uri.set(newValue);
    }
    private __showPauses: ObservedPropertyAbstract<Array<number>>;
    get showPauses() {
        return this.__showPauses.get();
    }
    set showPauses(newValue: Array<number>) {
        this.__showPauses.set(newValue);
    }
    private mediaFileUri: MediaFileUri;
    private scroller: Scroller;
    private currentUri: string;
    private controllers: Array<VideoController>;
    /**
     * 拉起picker保存图片/视频
     */
    async callFilePickerSaveImageVideo(): Promise<void> {
        try {
            let PhotoSaveOptions = new picker.PhotoSaveOptions();
            PhotoSaveOptions.newFileNames = ['PhotoViewPicker01.jpg', 'PhotoViewPicker01.mp4'];
            let photoPicker = new picker.PhotoViewPicker();
            photoPicker.save(PhotoSaveOptions).then((PhotoSaveResult) => {
                Logger.info(TAG, 'PhotoViewPicker.save successfully, PhotoSaveResult uri: ' + JSON.stringify(PhotoSaveResult));
                if (PhotoSaveResult !== null && PhotoSaveResult !== undefined) {
                    PhotoSaveResult.forEach((value: string) => {
                        this.uri = value;
                        Logger.info(TAG, `save image/video uri: ${this.uri}`);
                    });
                }
            }).catch((err: BusinessError) => {
                Logger.error(TAG, 'PhotoViewPicker.save failed with err: ' + JSON.stringify(err));
            });
        }
        catch (err) {
            Logger.error(TAG, 'PhotoViewPicker failed with err: ' + err);
        }
    }
    onPageShow() {
        this.getImagesInfo();
        this.myFileName = this.myFileNames[0];
        this.myFileSize = this.myFileSizes[0];
        Logger.info(TAG, 'onPageShow getFilenameByUriForMedia this.myFileName ' + this.myFileName);
        Logger.info(TAG, 'onPageShow getFilenameByUriForMedia begin' + this.myFileSize);
        AppStorage.SetOrCreate('myFileName', this.myFileName);
        AppStorage.SetOrCreate('myFileSize', this.myFileSize);
    }
    getMediaNameByUri(myUri: string, index: number) {
        Logger.info(TAG, 'getMediaNameByUri getFilenameByUriForMedia begin');
        // 创建文件获取选项，此处参数为获取image类型的文件资源
        let imagesFetchOp: mediaLibrary.MediaFetchOptions = {
            selections: mediaLibrary.FileKey.MEDIA_TYPE + '= ? OR ' + mediaLibrary.FileKey.MEDIA_TYPE + '= ?',
            selectionArgs: [mediaLibrary.MediaType.IMAGE.toString(), mediaLibrary.MediaType.VIDEO.toString()],
            uri: myUri
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
            Logger.info(TAG, 'getFilenameByUriForMedia count is: ' + count);
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
                Logger.info(TAG, 'fileAsset.displayName ' + '0 : ' + fileAsset.displayName);
                Logger.info(TAG, 'fileAsset.uri 0:' + fileAsset.uri);
                Logger.info(TAG, 'myUri: ' + myUri);
                this.myFileTypes[index] = fileAsset.mediaType;
                this.myFileName = fileAsset.displayName;
                this.myFileNames[index] = this.myFileName;
                AppStorage.SetOrCreate('myFileName', this.myFileName);
                AppStorage.SetOrCreate('myFileTypes', this.myFileTypes);
                if (this.myFileTypes[index] === mediaLibrary.MediaType.VIDEO) {
                    Logger.info(TAG, 'getMediaNameByUri set showPauses for VIDEO');
                    this.showPauses[index] = 1;
                }
                Logger.info(TAG, 'getFilenameByUriForMedia getImagesInfo this.myFileName ' + this.myFileName);
                Logger.info(TAG, 'getFilenameByUriForMedia getImagesInfo index ' + index);
                Logger.info(TAG, 'getFilenameByUriForMedia getImagesInfo this.myFileTypes[index] ' + this.myFileTypes[index]);
                Logger.info(TAG, 'getFilenameByUriForMedia getImagesInfo this.myFileNames[index] ' + this.myFileNames[index]);
                fetchFileResult.close();
            });
        });
    }
    getImagesInfo() {
        for (let index = 0; index < this.myUris.length; index++) {
            Logger.info(TAG, 'getFilenameByUriForMedia  getImagesInfo  index: ' + index);
            this.controllers[index] = new VideoController();
            this.getMediaNameByUri(this.myUris[index], index);
            this.myFileSizes[index] = this.mediaFileUri.myGetFileSize(this.myUris[index], fs.OpenMode.READ_ONLY);
            Logger.info(TAG, 'getFilenameByUriForMedia  getVideosInfo  this.myFileNames[index]: ' + this.myFileNames[index] + ' index ' + index);
            Logger.info(TAG, 'getFilenameByUriForMedia getVideosInfo this.myFileSizes[index]' + this.myFileSizes[index]);
            Logger.info(TAG, 'getFilenameByUriForMedia getVideosInfo this.myFileTypes[index] cc' + this.myFileTypes[index]);
        }
    }
    render() {
        Column.create();
        Column.backgroundColor('#f1f3f5');
        Column.height('100%');
        // 顶部的行容器
        Row.create();
        // 顶部的行容器
        Row.height('7.4%');
        // 顶部的行容器
        Row.width('100%');
        // 后退箭头
        Row.create();
        // 后退箭头
        Row.width('12.8%');
        // 后退箭头
        Row.padding({ left: '7.2%' });
        Image.create($r('app.media.ic_back'));
        Image.focusable(true);
        Image.focusOnTouch(true);
        Image.width(25);
        Image.height(25);
        Image.align(Alignment.Start);
        Image.id('back2Index');
        Image.onClick(() => {
            router.back();
        });
        // 后退箭头
        Row.pop();
        // 文件名及信息
        Column.create();
        // 文件名及信息
        Column.width('45%');
        // 文件名及信息
        Column.margin({ left: '5%' });
        Row.create();
        Row.width('100%');
        Row.align(Alignment.Start);
        Row.margin({ top: '0.4%', bottom: '0.3%' });
        Text.create(this.myFileName);
        Text.focusable(true);
        Text.focusOnTouch(true);
        Text.fontSize(20);
        Text.fontFamily('HarmonyHeiTi-Bold');
        Text.fontColor('#182431');
        Text.textAlign(TextAlign.Start);
        Text.fontWeight(700);
        Text.lineHeight(28);
        Text.maxLines(1);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Row.margin({ top: '0.3%', bottom: '0.5%' });
        Row.align(Alignment.Start);
        Text.create('size: ' + JSON.stringify(this.myFileSize) + 'B');
        Text.focusable(true);
        Text.focusOnTouch(true);
        Text.opacity(0.6);
        Text.fontFamily('HarmonyHeiTi');
        Text.fontSize(14);
        Text.fontColor('#182431');
        Text.textAlign(TextAlign.Start);
        Text.lineHeight(19);
        Text.fontWeight(400);
        Text.pop();
        Row.pop();
        // 文件名及信息
        Column.pop();
        // 右边一个图标，另存为
        Row.create();
        // 右边一个图标，另存为
        Row.height('100%');
        // 右边一个图标，另存为
        Row.width('37.2%');
        // 右边一个图标，另存为
        Row.padding({ right: '7.2%' });
        // 右边一个图标，另存为
        Row.justifyContent(FlexAlign.End);
        Image.create($r('app.media.ic_saveas'));
        Image.focusable(true);
        Image.focusOnTouch(true);
        Image.width(25);
        Image.height(25);
        Image.visibility(Visibility.Hidden);
        // 右边一个图标，另存为
        Row.pop();
        // 顶部的行容器
        Row.pop();
        Scroll.create(this.scroller);
        Scroll.padding({ top: '1.5%', left: '6.7%', right: '6.7%' });
        // 显示媒体文件的容器
        Column.create();
        List.create({ space: 20, initialIndex: 0 });
        List.id('picScroller');
        List.scrollBar(BarState.Auto);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.myUris), (uri: string, index?: number) => {
            ListItem.create();
            ListItem.height('25%');
            Column.create();
            Column.height('100%');
            Image.create(uri);
            Image.borderRadius(24);
            Image.visibility(index !== undefined && this.myFileTypes[index] === mediaLibrary.MediaType.IMAGE ? Visibility.Visible : Visibility.Hidden);
            Image.onClick(() => {
                if (index !== undefined) {
                    this.myFileSize = this.myFileSizes[index];
                    this.myFileName = this.myFileNames[index];
                }
                AppStorage.SetOrCreate('myFileName', this.myFileName);
                AppStorage.SetOrCreate('myFileSize', this.myFileSize);
                Logger.info(TAG, 'Image onClick myFileName is ' + this.myFileName);
                Logger.info(TAG, 'Image onClick myFileName is ' + this.myFileSize);
            });
            If.create();
            if (index !== undefined) {
                If.branchId(0);
                Stack.create({ alignContent: Alignment.Center });
                Stack.onClick(() => {
                    this.myFileSize = this.myFileSizes[index];
                    this.myFileName = this.myFileNames[index];
                    AppStorage.SetOrCreate('myFileName', this.myFileName);
                    AppStorage.SetOrCreate('myFileSize', this.myFileSize);
                });
                Video.create({
                    src: uri,
                    controller: this.controllers[index]
                });
                Video.autoPlay(false);
                Video.controls(true);
                Video.borderRadius(24);
                Video.visibility(this.myFileTypes[index] === mediaLibrary.MediaType.VIDEO ? Visibility.Visible : Visibility.Hidden);
                Image.create($r('app.media.ic_PAUSE'));
                Image.width(25);
                Image.height(25);
                Image.onClick(() => {
                    this.controllers[index].start();
                    this.showPauses[index] = 0;
                });
                Image.visibility(this.showPauses[index] === 0 ? Visibility.Hidden : Visibility.Visible);
                Stack.pop();
            }
            If.pop();
            Column.pop();
            ListItem.pop();
        }, (item: string) => item);
        ForEach.pop();
        List.pop();
        // 显示媒体文件的容器
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
loadDocument(new ViewMedia("1", undefined, {}));
