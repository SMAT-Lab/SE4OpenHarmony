interface EditPage_Params {
    mediaUris?: Array<string>;
    pixelMaps?: Array<image.PixelMap>;
    tasks?: Array<Resource>;
    tempTasks?: Array<Resource>;
    choiceTasks?: Array<Resource>;
    taskText?: Array<Resource>;
    cropRatios?: Array<Resource>;
    cropMedias?: Array<Resource>;
    tempCropMedias?: Array<Resource>;
    cropChoiceMedias?: Array<Resource>;
    scaleTexts?: Array<Resource>;
    scaleMedias?: Array<Resource>;
    cropFrontShows?: Array<boolean>;
    tasksFrontShows?: Array<boolean>;
    borderShows?: Array<boolean>;
    pixelMap?: image.PixelMap;
    tempPixelMap?: image.PixelMap;
    single?: number;
    isCrop?: boolean;
    isScale?: boolean;
    scaleSliderValue?: number;
    selectIndex?: number;
    isLand?: boolean;
    mediaLibraryInstance?: mediaLibrary.MediaLibrary;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "EditPage_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import router from '@ohos.router';
import image from '@ohos.multimedia.image';
import mediaLibrary from '@ohos.multimedia.mediaLibrary';
import { logger } from '../util/Logger';
const TAG: string = 'EditPage';
interface MediaUris extends Object {
    mediaUris: Array<string>;
    isLand: boolean;
}
export class EditPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__mediaUris = new ObservedPropertyObject((router.getParams() as MediaUris).mediaUris, this, "mediaUris");
        this.__pixelMaps = new ObservedPropertyObject([], this, "pixelMaps");
        this.__tasks = new ObservedPropertyObject([$r('app.media.scale'), $r('app.media.crop'), $r('app.media.rotate')], this, "tasks");
        this.__tempTasks = new ObservedPropertyObject([$r('app.media.scale'), $r('app.media.crop'), $r('app.media.rotate')], this, "tempTasks");
        this.__choiceTasks = new ObservedPropertyObject([$r('app.media.scale_red'), $r('app.media.crop_red'), $r('app.media.rotate_red')], this, "choiceTasks");
        this.__taskText = new ObservedPropertyObject([$r('app.string.scale'), $r('app.string.crop'), $r('app.string.rotate')], this, "taskText");
        this.__cropRatios = new ObservedPropertyObject([$r('app.string.origin_photo'), $r('app.string.proportion_one_one'), $r('app.string.proportion_three_four'), $r('app.string.proportion_nine_sixth')], this, "cropRatios");
        this.__cropMedias = new ObservedPropertyObject([$r('app.media.origin_gray'), $r('app.media.one_one_gray'), $r('app.media.three_four_gray'), $r('app.media.nine_sixth_gray')], this, "cropMedias");
        this.__tempCropMedias = new ObservedPropertyObject([$r('app.media.origin_gray'), $r('app.media.one_one_gray'), $r('app.media.three_four_gray'), $r('app.media.nine_sixth_gray')], this, "tempCropMedias");
        this.__cropChoiceMedias = new ObservedPropertyObject([$r('app.media.origin_red'), $r('app.media.one_one_red'), $r('app.media.three_four_red'), $r('app.media.nine_sixth_red')], this, "cropChoiceMedias");
        this.__scaleTexts = new ObservedPropertyObject([$r('app.string.narrow'), $r('app.string.amplification')], this, "scaleTexts");
        this.__scaleMedias = new ObservedPropertyObject([$r('app.media.scale_small'), $r('app.media.scale_big')], this, "scaleMedias");
        this.__cropFrontShows = new ObservedPropertyObject(new Array(4).fill(false), this, "cropFrontShows");
        this.__tasksFrontShows = new ObservedPropertyObject(new Array(3).fill(false), this, "tasksFrontShows");
        this.__borderShows = new ObservedPropertyObject(new Array(this.mediaUris.length).fill(false), this, "borderShows");
        this.__pixelMap = new ObservedPropertyObject({} as image.PixelMap, this, "pixelMap");
        this.__tempPixelMap = new ObservedPropertyObject({} as image.PixelMap, this, "tempPixelMap");
        this.__single = new ObservedPropertySimple(0, this, "single");
        this.__isCrop = new ObservedPropertySimple(false, this, "isCrop");
        this.__isScale = new ObservedPropertySimple(false, this, "isScale");
        this.__scaleSliderValue = new ObservedPropertySimple(0, this, "scaleSliderValue");
        this.__selectIndex = new ObservedPropertySimple(0, this, "selectIndex");
        this.__isLand = new ObservedPropertySimple(false, this, "isLand");
        this.mediaLibraryInstance = mediaLibrary.getMediaLibrary(getContext(this) as Context);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: EditPage_Params) {
        if (params.mediaUris !== undefined) {
            this.mediaUris = params.mediaUris;
        }
        if (params.pixelMaps !== undefined) {
            this.pixelMaps = params.pixelMaps;
        }
        if (params.tasks !== undefined) {
            this.tasks = params.tasks;
        }
        if (params.tempTasks !== undefined) {
            this.tempTasks = params.tempTasks;
        }
        if (params.choiceTasks !== undefined) {
            this.choiceTasks = params.choiceTasks;
        }
        if (params.taskText !== undefined) {
            this.taskText = params.taskText;
        }
        if (params.cropRatios !== undefined) {
            this.cropRatios = params.cropRatios;
        }
        if (params.cropMedias !== undefined) {
            this.cropMedias = params.cropMedias;
        }
        if (params.tempCropMedias !== undefined) {
            this.tempCropMedias = params.tempCropMedias;
        }
        if (params.cropChoiceMedias !== undefined) {
            this.cropChoiceMedias = params.cropChoiceMedias;
        }
        if (params.scaleTexts !== undefined) {
            this.scaleTexts = params.scaleTexts;
        }
        if (params.scaleMedias !== undefined) {
            this.scaleMedias = params.scaleMedias;
        }
        if (params.cropFrontShows !== undefined) {
            this.cropFrontShows = params.cropFrontShows;
        }
        if (params.tasksFrontShows !== undefined) {
            this.tasksFrontShows = params.tasksFrontShows;
        }
        if (params.borderShows !== undefined) {
            this.borderShows = params.borderShows;
        }
        if (params.pixelMap !== undefined) {
            this.pixelMap = params.pixelMap;
        }
        if (params.tempPixelMap !== undefined) {
            this.tempPixelMap = params.tempPixelMap;
        }
        if (params.single !== undefined) {
            this.single = params.single;
        }
        if (params.isCrop !== undefined) {
            this.isCrop = params.isCrop;
        }
        if (params.isScale !== undefined) {
            this.isScale = params.isScale;
        }
        if (params.scaleSliderValue !== undefined) {
            this.scaleSliderValue = params.scaleSliderValue;
        }
        if (params.selectIndex !== undefined) {
            this.selectIndex = params.selectIndex;
        }
        if (params.isLand !== undefined) {
            this.isLand = params.isLand;
        }
        if (params.mediaLibraryInstance !== undefined) {
            this.mediaLibraryInstance = params.mediaLibraryInstance;
        }
    }
    aboutToBeDeleted() {
        this.__mediaUris.aboutToBeDeleted();
        this.__pixelMaps.aboutToBeDeleted();
        this.__tasks.aboutToBeDeleted();
        this.__tempTasks.aboutToBeDeleted();
        this.__choiceTasks.aboutToBeDeleted();
        this.__taskText.aboutToBeDeleted();
        this.__cropRatios.aboutToBeDeleted();
        this.__cropMedias.aboutToBeDeleted();
        this.__tempCropMedias.aboutToBeDeleted();
        this.__cropChoiceMedias.aboutToBeDeleted();
        this.__scaleTexts.aboutToBeDeleted();
        this.__scaleMedias.aboutToBeDeleted();
        this.__cropFrontShows.aboutToBeDeleted();
        this.__tasksFrontShows.aboutToBeDeleted();
        this.__borderShows.aboutToBeDeleted();
        this.__pixelMap.aboutToBeDeleted();
        this.__tempPixelMap.aboutToBeDeleted();
        this.__single.aboutToBeDeleted();
        this.__isCrop.aboutToBeDeleted();
        this.__isScale.aboutToBeDeleted();
        this.__scaleSliderValue.aboutToBeDeleted();
        this.__selectIndex.aboutToBeDeleted();
        this.__isLand.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __mediaUris: ObservedPropertyObject<Array<string>>;
    get mediaUris() {
        return this.__mediaUris.get();
    }
    set mediaUris(newValue: Array<string>) {
        this.__mediaUris.set(newValue);
    }
    private __pixelMaps: ObservedPropertyObject<Array<image.PixelMap>>;
    get pixelMaps() {
        return this.__pixelMaps.get();
    }
    set pixelMaps(newValue: Array<image.PixelMap>) {
        this.__pixelMaps.set(newValue);
    }
    private __tasks: ObservedPropertyObject<Array<Resource>>;
    get tasks() {
        return this.__tasks.get();
    }
    set tasks(newValue: Array<Resource>) {
        this.__tasks.set(newValue);
    }
    private __tempTasks: ObservedPropertyObject<Array<Resource>>;
    get tempTasks() {
        return this.__tempTasks.get();
    }
    set tempTasks(newValue: Array<Resource>) {
        this.__tempTasks.set(newValue);
    }
    private __choiceTasks: ObservedPropertyObject<Array<Resource>>;
    get choiceTasks() {
        return this.__choiceTasks.get();
    }
    set choiceTasks(newValue: Array<Resource>) {
        this.__choiceTasks.set(newValue);
    }
    private __taskText: ObservedPropertyObject<Array<Resource>>;
    get taskText() {
        return this.__taskText.get();
    }
    set taskText(newValue: Array<Resource>) {
        this.__taskText.set(newValue);
    }
    private __cropRatios: ObservedPropertyObject<Array<Resource>>;
    get cropRatios() {
        return this.__cropRatios.get();
    }
    set cropRatios(newValue: Array<Resource>) {
        this.__cropRatios.set(newValue);
    }
    private __cropMedias: ObservedPropertyObject<Array<Resource>>;
    get cropMedias() {
        return this.__cropMedias.get();
    }
    set cropMedias(newValue: Array<Resource>) {
        this.__cropMedias.set(newValue);
    }
    private __tempCropMedias: ObservedPropertyObject<Array<Resource>>;
    get tempCropMedias() {
        return this.__tempCropMedias.get();
    }
    set tempCropMedias(newValue: Array<Resource>) {
        this.__tempCropMedias.set(newValue);
    }
    private __cropChoiceMedias: ObservedPropertyObject<Array<Resource>>;
    get cropChoiceMedias() {
        return this.__cropChoiceMedias.get();
    }
    set cropChoiceMedias(newValue: Array<Resource>) {
        this.__cropChoiceMedias.set(newValue);
    }
    private __scaleTexts: ObservedPropertyObject<Array<Resource>>;
    get scaleTexts() {
        return this.__scaleTexts.get();
    }
    set scaleTexts(newValue: Array<Resource>) {
        this.__scaleTexts.set(newValue);
    }
    private __scaleMedias: ObservedPropertyObject<Array<Resource>>;
    get scaleMedias() {
        return this.__scaleMedias.get();
    }
    set scaleMedias(newValue: Array<Resource>) {
        this.__scaleMedias.set(newValue);
    }
    private __cropFrontShows: ObservedPropertyObject<Array<boolean>>;
    get cropFrontShows() {
        return this.__cropFrontShows.get();
    }
    set cropFrontShows(newValue: Array<boolean>) {
        this.__cropFrontShows.set(newValue);
    }
    private __tasksFrontShows: ObservedPropertyObject<Array<boolean>>;
    get tasksFrontShows() {
        return this.__tasksFrontShows.get();
    }
    set tasksFrontShows(newValue: Array<boolean>) {
        this.__tasksFrontShows.set(newValue);
    }
    private __borderShows: ObservedPropertyObject<Array<boolean>>;
    get borderShows() {
        return this.__borderShows.get();
    }
    set borderShows(newValue: Array<boolean>) {
        this.__borderShows.set(newValue);
    }
    private __pixelMap: ObservedPropertyObject<image.PixelMap>;
    get pixelMap() {
        return this.__pixelMap.get();
    }
    set pixelMap(newValue: image.PixelMap) {
        this.__pixelMap.set(newValue);
    }
    private __tempPixelMap: ObservedPropertyObject<image.PixelMap>;
    get tempPixelMap() {
        return this.__tempPixelMap.get();
    }
    set tempPixelMap(newValue: image.PixelMap) {
        this.__tempPixelMap.set(newValue);
    }
    private __single: ObservedPropertySimple<number>;
    get single() {
        return this.__single.get();
    }
    set single(newValue: number) {
        this.__single.set(newValue);
    }
    private __isCrop: ObservedPropertySimple<boolean>;
    get isCrop() {
        return this.__isCrop.get();
    }
    set isCrop(newValue: boolean) {
        this.__isCrop.set(newValue);
    }
    private __isScale: ObservedPropertySimple<boolean>;
    get isScale() {
        return this.__isScale.get();
    }
    set isScale(newValue: boolean) {
        this.__isScale.set(newValue);
    }
    private __scaleSliderValue: ObservedPropertySimple<number>;
    get scaleSliderValue() {
        return this.__scaleSliderValue.get();
    }
    set scaleSliderValue(newValue: number) {
        this.__scaleSliderValue.set(newValue);
    }
    private __selectIndex: ObservedPropertySimple<number>;
    get selectIndex() {
        return this.__selectIndex.get();
    }
    set selectIndex(newValue: number) {
        this.__selectIndex.set(newValue);
    }
    private __isLand: ObservedPropertySimple<boolean>;
    get isLand() {
        return this.__isLand.get();
    }
    set isLand(newValue: boolean) {
        this.__isLand.set(newValue);
    }
    private mediaLibraryInstance: mediaLibrary.MediaLibrary;
    flushPage() {
        this.tempPixelMap = this.pixelMap;
        this.pixelMap = {} as image.PixelMap;
        this.pixelMap = this.tempPixelMap;
    }
    async queryFile(dataUri: string): Promise<mediaLibrary.FileAsset> {
        logger.info(TAG, `enter queryFile`);
        let fileKeyObj = mediaLibrary.FileKey;
        logger.info(TAG, `fileKeyObj = ${fileKeyObj}`);
        let fetchOp: mediaLibrary.MediaFetchOptions = {
            selections: '',
            selectionArgs: [],
            uri: dataUri
        };
        const fetchFileResult = await this.mediaLibraryInstance.getFileAssets(fetchOp);
        logger.info(TAG, `fetchFileResult = ${JSON.stringify(fetchFileResult)} ,count = ${JSON.stringify(fetchFileResult.getCount())}`);
        if (!fetchFileResult) {
            return {} as mediaLibrary.FileAsset;
        }
        const fileAsset = await fetchFileResult.getFirstObject();
        if (!fileAsset) {
            return {} as mediaLibrary.FileAsset;
        }
        logger.info(TAG, `fileAsset = ${JSON.stringify(fileAsset)}`);
        return fileAsset;
    }
    async getPixelMap(uri: string): Promise<image.PixelMap> {
        let fileAssert: mediaLibrary.FileAsset = await this.queryFile(uri);
        if (!fileAssert) {
            return {} as image.PixelMap;
        }
        let fd = await fileAssert.open('Rw');
        if (!fd) {
            return {} as image.PixelMap;
        }
        logger.info(TAG, `fd = ${fd}`);
        let imageSourceApi = image.createImageSource(fd);
        if (!imageSourceApi) {
            return {} as image.PixelMap;
        }
        let pixmap = await imageSourceApi.createPixelMap({ editable: true });
        if (!pixmap) {
            return {} as image.PixelMap;
        }
        return pixmap;
    }
    async cropImage(proportion: number) {
        let imageInfo: image.ImageInfo = await this.pixelMap.getImageInfo();
        if (!imageInfo) {
            return;
        }
        let imageHeight = imageInfo.size.height;
        let imageWith = imageInfo.size.width;
        logger.info(TAG, `imageInfo = ${JSON.stringify(imageInfo)}`);
        if (proportion === 1) {
            if (imageHeight > imageWith) {
                imageHeight = imageWith;
            }
            else {
                imageWith = imageHeight;
            }
            logger.info(TAG, `imageHeight = ${JSON.stringify(imageHeight)},imageWith = ${JSON.stringify(imageWith)}`);
        }
        try {
            await this.pixelMap.crop({
                size: { height: imageHeight * proportion, width: imageWith },
                x: 0,
                y: 0
            });
        }
        catch (error) {
            logger.info(TAG, `crop error = ${JSON.stringify(error)}`);
        }
        this.flushPage();
    }
    async aboutToAppear() {
        logger.info(TAG, `enter aboutToAppear uris = ${JSON.stringify(this.mediaUris)}`);
        this.pixelMaps = [];
        if (router.getParams() && (router.getParams() as MediaUris).isLand) {
            this.isLand = (router.getParams() as MediaUris).isLand;
        }
        for (let i = 0; i < this.mediaUris.length; i++) {
            let pixelMap = await this.getPixelMap(this.mediaUris[i]);
            logger.info(TAG, `this.pixelMap = ${JSON.stringify(this.pixelMap)}`);
            if (pixelMap) {
                this.pixelMaps.push(pixelMap);
            }
        }
        logger.info(TAG, `this.pixelMaps = ${JSON.stringify(this.pixelMaps)}`);
        if (this.pixelMaps.length > 0) {
            this.pixelMap = this.pixelMaps[0];
        }
        if (this.borderShows.length > 0) {
            this.borderShows[0] = true;
        }
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor('#f1f3f5');
        Row.create();
        Row.width('100%');
        Row.height('5%');
        Row.constraintSize({ minHeight: 40 });
        Row.padding({ left: 15 });
        Row.backgroundColor('#f1f3f5');
        Row.margin({ top: 15 });
        Image.create($r('app.media.back'));
        Image.width(44);
        Image.height(24);
        Image.objectFit(ImageFit.Contain);
        Image.onClick(() => {
            router.back();
        });
        Blank.create();
        Blank.pop();
        Button.createWithLabel($r('app.string.confirm'));
        Button.fontSize(20);
        Button.height(32);
        Button.width(80);
        Button.backgroundColor('#E92F4F');
        Button.margin({ right: 10 });
        Button.onClick(() => {
            AppStorage.Delete('pixelMap');
            AppStorage.SetOrCreate('pixelMaps', ObservedObject.GetRawObject(this.pixelMaps));
            router.push({
                url: 'pages/Index',
                params: { isShowCamera: true }
            });
        });
        Button.pop();
        Row.pop();
        Scroll.create();
        Scroll.constraintSize(this.isLand === false ? { maxHeight: '84%' } : { maxHeight: '82%' });
        Scroll.backgroundColor('#f1f3f5');
        Column.create();
        Column.height('100%');
        Column.width('100%');
        Column.create();
        Column.height('89%');
        Column.width('100%');
        Column.backgroundColor('#ff070707');
        Image.create(this.pixelMap);
        Image.height('100%');
        Image.width('90%');
        Image.objectFit(ImageFit.None);
        Image.backgroundColor('#ff070707');
        Column.pop();
        If.create();
        if (!this.isCrop && !this.isScale) {
            If.branchId(0);
            Row.create();
            Row.margin({ top: 10 });
            Row.alignSelf(ItemAlign.Start);
            Row.backgroundColor('#f1f3f5');
            ForEach.create("2", this, ObservedObject.GetRawObject(this.pixelMaps), (item: image.PixelMap, index?: number) => {
                If.create();
                if (index !== undefined) {
                    If.branchId(0);
                    Image.create(item);
                    Image.width(60);
                    Image.height(60);
                    Image.borderRadius(15);
                    Image.margin({ left: 8 });
                    Image.border({
                        style: BorderStyle.Solid,
                        width: 2,
                        color: (this.borderShows[index] === true ? '#e92f4f' : '#ffffff')
                    });
                    Image.onClick(async () => {
                        if (this.pixelMap === item) {
                            return;
                        }
                        this.borderShows.fill(false);
                        if (this.borderShows.length > index) {
                            this.borderShows[index] = true;
                        }
                        this.single = 0;
                        this.pixelMap = item;
                        this.selectIndex = index;
                    });
                }
                If.pop();
            });
            ForEach.pop();
            Row.create();
            Row.backgroundColor('#ffeae9e9');
            Row.justifyContent(FlexAlign.Center);
            Row.borderRadius(8);
            Row.width(60);
            Row.height(60);
            Row.margin({ left: 8 });
            Image.create($r('app.media.add'));
            Image.width(40);
            Image.height(40);
            Image.borderRadius(15);
            Image.onClick(() => {
                router.back();
            });
            Row.pop();
            Row.pop();
        }
        else if (this.isCrop) {
            If.branchId(1);
            Row.create();
            Row.width('100%');
            Row.margin({ top: 15 });
            ForEach.create("3", this, ObservedObject.GetRawObject(this.cropMedias), (item: Resource, index?: number) => {
                Column.create();
                Column.layoutWeight(1);
                Column.onClick(async () => {
                    this.cropMedias = this.tempCropMedias.map((item: Resource) => {
                        return item;
                    });
                    if (index !== undefined) {
                        if (index === 0) {
                            if (this.mediaUris.length > this.selectIndex && this.pixelMaps.length > this.selectIndex) {
                                this.pixelMap = await this.getPixelMap(this.mediaUris[this.selectIndex]);
                                this.pixelMaps[this.selectIndex] = this.pixelMap;
                            }
                        }
                        else if (index === 1) {
                            await this.cropImage(1);
                        }
                        else if (index === 2) {
                            await this.cropImage(3 / 4);
                        }
                        else if (index === 3) {
                            await this.cropImage(9 / 16);
                        }
                        if (this.cropMedias.length > index && this.cropChoiceMedias.length > index) {
                            this.cropMedias[index] = this.cropChoiceMedias[index];
                        }
                        this.cropFrontShows.fill(false);
                        if (this.cropFrontShows.length > index) {
                            this.cropFrontShows[index] = true;
                        }
                    }
                });
                Image.create(item);
                Image.width(30);
                Image.height(30);
                If.create();
                if (index !== undefined) {
                    If.branchId(0);
                    Text.create(this.cropRatios[index]);
                    Text.fontSize(15);
                    Text.fontColor(this.cropFrontShows[index] === true ? '#e92f4f' : '#acabab');
                    Text.margin({ top: 5 });
                    Text.pop();
                }
                If.pop();
                Column.pop();
            });
            ForEach.pop();
            Row.pop();
        }
        else if (this.isScale) {
            If.branchId(2);
            Row.create();
            Row.width('100%');
            Row.margin({ top: 15 });
            ForEach.create("4", this, ObservedObject.GetRawObject(this.scaleMedias), (item: Resource, index?: number) => {
                If.create();
                if (index !== undefined) {
                    If.branchId(0);
                    Column.create();
                    Column.layoutWeight(1);
                    Column.onClick(async () => {
                        if (index === 0) {
                            await this.pixelMap.scale(0.8, 0.8);
                        }
                        else if (index === 1) {
                            await this.pixelMap.scale(1.25, 1.25);
                        }
                        this.flushPage();
                    });
                    Image.create(item);
                    Image.height(30);
                    Image.width(30);
                    Text.create(this.scaleTexts[index]);
                    Text.fontSize(15);
                    Text.margin({ top: 5 });
                    Text.pop();
                    Column.pop();
                }
                If.pop();
            });
            ForEach.pop();
            Row.pop();
        }
        If.pop();
        Column.pop();
        Scroll.pop();
        Divider.create();
        Divider.vertical(false);
        Divider.strokeWidth(0.8);
        Divider.color('#ffd9d5d6');
        Divider.lineCap(LineCapStyle.Round);
        Divider.width('100%');
        Divider.margin({ top: 8 });
        Row.create();
        Row.width('100%');
        Row.margin({ top: 10 });
        ForEach.create("5", this, ObservedObject.GetRawObject(this.tasks), (item: Resource, index?: number) => {
            If.create();
            if (index !== undefined) {
                If.branchId(0);
                Column.create();
                Column.height(60);
                Column.width(60);
                Column.layoutWeight(1);
                Column.onClick(async () => {
                    if (index === 0) {
                        this.isScale = !this.isScale;
                        this.isCrop = false;
                    }
                    else if (index === 1) {
                        this.isCrop = !this.isCrop;
                        this.isScale = false;
                    }
                    else if (index === 2) {
                        await this.pixelMap.rotate(90);
                        this.isCrop = false;
                        this.isScale = false;
                        this.flushPage();
                    }
                    this.tasksFrontShows.fill(false);
                    if (this.tasksFrontShows.length > index) {
                        this.tasksFrontShows[index] = true;
                    }
                    this.tasks = this.tempTasks.map((item: Resource) => {
                        return item;
                    });
                    if (this.tasks.length > index && this.choiceTasks.length > index) {
                        this.tasks[index] = this.choiceTasks[index];
                    }
                    this.cropFrontShows.fill(false);
                    this.cropMedias = this.tempCropMedias.map((item: Resource) => {
                        return item;
                    });
                });
                Image.create(item);
                Image.width(30);
                Image.height(30);
                Text.create(this.taskText[index]);
                Text.fontSize(15);
                Text.fontColor(this.tasksFrontShows[index] === true ? '#e92f4f' : '#acabab');
                Text.pop();
                Column.pop();
            }
            If.pop();
        });
        ForEach.pop();
        Row.pop();
        Column.pop();
    }
}
