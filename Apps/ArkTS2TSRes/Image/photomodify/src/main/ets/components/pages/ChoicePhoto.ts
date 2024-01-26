interface ChoicePhoto_Params {
    whichShow?: boolean[];
    medias?: Array<mediaLibrary.FileAsset>;
    choiceShow?: Array<Resource>;
    taskShow?: Array<Resource>;
    textShow?: Array<Resource>;
    isShowChoices?: Array<boolean>;
    choiceMedias?: Array<mediaLibrary.FileAsset>;
    mediaUris?: Array<string>;
    isChoice?: boolean;
    nextText?: string;
    isLand?: boolean;
    mediaLibraryInstance?: mediaLibrary.MediaLibrary;
    listener?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ChoicePhoto_" + ++__generate__Id;
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
import prompt from '@ohos.promptAction';
import router from '@ohos.router';
import mediaQuery from '@ohos.mediaquery';
import mediaLibrary from '@ohos.multimedia.mediaLibrary';
import { logger } from '../util/Logger';
const TAG: string = 'ChoicePhoto';
export class ChoicePhoto extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__whichShow = new ObservedPropertyObject([true, false], this, "whichShow");
        this.__medias = new ObservedPropertyObject([], this, "medias");
        this.__choiceShow = new ObservedPropertyObject([$r('app.string.choice_photo'), $r('app.string.choice_video')], this, "choiceShow");
        this.__taskShow = new ObservedPropertyObject([$r('app.media.photo'), $r('app.media.video')], this, "taskShow");
        this.__textShow = new ObservedPropertyObject([$r('app.string.photograph'), $r('app.string.take_video')], this, "textShow");
        this.__isShowChoices = new ObservedPropertyObject(new Array(this.medias.length).fill(false), this, "isShowChoices");
        this.__choiceMedias = new ObservedPropertyObject([], this, "choiceMedias");
        this.__mediaUris = new ObservedPropertyObject([], this, "mediaUris");
        this.__isChoice = new ObservedPropertySimple(false, this, "isChoice");
        this.__nextText = new ObservedPropertySimple('', this, "nextText");
        this.__isLand = new ObservedPropertySimple(false, this, "isLand");
        this.mediaLibraryInstance = mediaLibrary.getMediaLibrary(getContext(this));
        this.listener = mediaQuery.matchMediaSync('screen and (min-aspect-ratio: 1.5) or (orientation: landscape)');
        this.updateWithValueParams(params);
        this.declareWatch("choiceMedias", this.choiceChange);
    }
    updateWithValueParams(params: ChoicePhoto_Params) {
        if (params.whichShow !== undefined) {
            this.whichShow = params.whichShow;
        }
        if (params.medias !== undefined) {
            this.medias = params.medias;
        }
        if (params.choiceShow !== undefined) {
            this.choiceShow = params.choiceShow;
        }
        if (params.taskShow !== undefined) {
            this.taskShow = params.taskShow;
        }
        if (params.textShow !== undefined) {
            this.textShow = params.textShow;
        }
        if (params.isShowChoices !== undefined) {
            this.isShowChoices = params.isShowChoices;
        }
        if (params.choiceMedias !== undefined) {
            this.choiceMedias = params.choiceMedias;
        }
        if (params.mediaUris !== undefined) {
            this.mediaUris = params.mediaUris;
        }
        if (params.isChoice !== undefined) {
            this.isChoice = params.isChoice;
        }
        if (params.nextText !== undefined) {
            this.nextText = params.nextText;
        }
        if (params.isLand !== undefined) {
            this.isLand = params.isLand;
        }
        if (params.mediaLibraryInstance !== undefined) {
            this.mediaLibraryInstance = params.mediaLibraryInstance;
        }
        if (params.listener !== undefined) {
            this.listener = params.listener;
        }
    }
    aboutToBeDeleted() {
        this.__whichShow.aboutToBeDeleted();
        this.__medias.aboutToBeDeleted();
        this.__choiceShow.aboutToBeDeleted();
        this.__taskShow.aboutToBeDeleted();
        this.__textShow.aboutToBeDeleted();
        this.__isShowChoices.aboutToBeDeleted();
        this.__choiceMedias.aboutToBeDeleted();
        this.__mediaUris.aboutToBeDeleted();
        this.__isChoice.aboutToBeDeleted();
        this.__nextText.aboutToBeDeleted();
        this.__isLand.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __whichShow: ObservedPropertyObject<boolean[]>;
    get whichShow() {
        return this.__whichShow.get();
    }
    set whichShow(newValue: boolean[]) {
        this.__whichShow.set(newValue);
    }
    private __medias: ObservedPropertyObject<Array<mediaLibrary.FileAsset>>;
    get medias() {
        return this.__medias.get();
    }
    set medias(newValue: Array<mediaLibrary.FileAsset>) {
        this.__medias.set(newValue);
    }
    private __choiceShow: ObservedPropertyObject<Array<Resource>>;
    get choiceShow() {
        return this.__choiceShow.get();
    }
    set choiceShow(newValue: Array<Resource>) {
        this.__choiceShow.set(newValue);
    }
    private __taskShow: ObservedPropertyObject<Array<Resource>>;
    get taskShow() {
        return this.__taskShow.get();
    }
    set taskShow(newValue: Array<Resource>) {
        this.__taskShow.set(newValue);
    }
    private __textShow: ObservedPropertyObject<Array<Resource>>;
    get textShow() {
        return this.__textShow.get();
    }
    set textShow(newValue: Array<Resource>) {
        this.__textShow.set(newValue);
    }
    private __isShowChoices: ObservedPropertyObject<Array<boolean>>;
    get isShowChoices() {
        return this.__isShowChoices.get();
    }
    set isShowChoices(newValue: Array<boolean>) {
        this.__isShowChoices.set(newValue);
    }
    private __choiceMedias: ObservedPropertyObject<Array<mediaLibrary.FileAsset>>;
    get choiceMedias() {
        return this.__choiceMedias.get();
    }
    set choiceMedias(newValue: Array<mediaLibrary.FileAsset>) {
        this.__choiceMedias.set(newValue);
    }
    private __mediaUris: ObservedPropertyObject<Array<string>>;
    get mediaUris() {
        return this.__mediaUris.get();
    }
    set mediaUris(newValue: Array<string>) {
        this.__mediaUris.set(newValue);
    }
    private __isChoice: ObservedPropertySimple<boolean>;
    get isChoice() {
        return this.__isChoice.get();
    }
    set isChoice(newValue: boolean) {
        this.__isChoice.set(newValue);
    }
    private __nextText: ObservedPropertySimple<string>;
    get nextText() {
        return this.__nextText.get();
    }
    set nextText(newValue: string) {
        this.__nextText.set(newValue);
    }
    private __isLand: ObservedPropertySimple<boolean>;
    get isLand() {
        return this.__isLand.get();
    }
    set isLand(newValue: boolean) {
        this.__isLand.set(newValue);
    }
    private mediaLibraryInstance: mediaLibrary.MediaLibrary;
    private listener;
    onLand(mediaQueryResult: mediaQuery.MediaQueryResult) {
        if (mediaQueryResult.matches) {
            this.isLand = true;
        }
        else {
            this.isLand = false;
        }
    }
    choiceChange() {
        if (this.choiceMedias.length > 0) {
            this.isChoice = true;
        }
        else {
            this.isChoice = false;
        }
    }
    showChoiceBuild(backGround: string, showNumber: number, parent = null) {
        Column.create();
        Column.width(24);
        Column.height(24);
        Column.margin({ top: 6, right: 6 });
        Column.borderRadius(15);
        Column.border({ width: 1, style: BorderStyle.Solid, color: Color.White });
        Column.backgroundColor(backGround);
        Text.create(showNumber === 0 ? '' : `${showNumber}`);
        Text.fontSize(14);
        Text.fontColor(Color.White);
        Text.height(20);
        Text.margin({ top: 2 });
        Text.pop();
        Column.pop();
    }
    async getFileAssetsFromType(mediaType: mediaLibrary.MediaType) {
        logger.info(TAG, `getFileAssetsFromType`);
        let context = getContext(this) as Context;
        let mediaLibraryInstance = mediaLibrary.getMediaLibrary(context);
        if (!mediaLibraryInstance) {
            return;
        }
        logger.info(TAG, `mediaLibraryInstance = ${JSON.stringify(mediaLibraryInstance)}`);
        let fileKeyObj = mediaLibrary.FileKey;
        let fetchOp: mediaLibrary.MediaFetchOptions = {
            selections: `${fileKeyObj.MEDIA_TYPE}=?`,
            selectionArgs: [`${mediaType}`],
        };
        let fetchFileResult = await mediaLibraryInstance.getFileAssets(fetchOp);
        logger.info(TAG, `fetchFileResult = ${JSON.stringify(fetchFileResult)} , ${fetchFileResult.getCount()}`);
        if (fetchFileResult && fetchFileResult.getCount() > 0) {
            this.medias = await fetchFileResult.getAllObject();
        }
        logger.info(TAG, `this.medias = ${JSON.stringify(this.medias)}`);
    }
    convertContext(context: Context): Context {
        return context;
    }
    async convertResourceToString(resource: Resource): Promise<string> {
        return await this.convertContext(getContext(this)).resourceManager.getString(resource.id);
    }
    async aboutToAppear() {
        logger.info(TAG, `aboutToAppear`);
        this.listener.on('change', this.onLand);
        this.nextText = await this.convertResourceToString($r('app.string.next'));
        this.getFileAssetsFromType(mediaLibrary.MediaType.IMAGE);
    }
    getMaxHeight(): ConstraintSizeOptions {
        if (!this.isLand && this.isChoice) {
            return { maxHeight: '64%' };
        }
        else if (!this.isLand && !this.isChoice) {
            return { maxHeight: '75%' };
        }
        else if (this.isLand && this.isChoice) {
            return { maxHeight: '62%' };
        }
        else if (this.isLand && !this.isChoice) {
            return { maxHeight: '73%' };
        }
        return { maxHeight: '73%' };
    }
    render() {
        Column.create();
        Row.create();
        Row.width('100%');
        Row.height(35);
        Row.padding({ left: 14 });
        Row.margin({ top: 20 });
        Image.create($r('app.media.back'));
        Image.width(44);
        Image.height(24);
        Image.objectFit(ImageFit.Contain);
        Image.onClick(() => {
            router.back();
        });
        Text.create($r('app.string.recently_added'));
        Text.fontColor(Color.Black);
        Text.fontSize(22);
        Text.margin({ left: 120 });
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Image.create($r('app.media.drop_down'));
        Image.width(30);
        Image.height(32);
        Image.objectFit(ImageFit.Contain);
        Blank.create();
        Blank.pop();
        Button.createWithLabel(`${this.nextText} ${this.isChoice === true ? `(${this.choiceMedias.length})` : ''}`);
        Button.fontSize(20);
        Button.height(32);
        Button.backgroundColor(this.isChoice === true ? '#E92F4F' : '#fffa8e8e');
        Button.margin({ right: 10 });
        Button.borderRadius(20);
        Button.onClick(() => {
            if (this.isChoice === false) {
                return;
            }
            this.mediaUris = this.choiceMedias.map((item: mediaLibrary.FileAsset) => {
                return item.uri;
            });
            router.push({
                url: 'pages/EditPages',
                params: { mediaUris: this.mediaUris, isLand: this.isLand }
            });
        });
        Button.pop();
        Row.pop();
        Column.create();
        Row.create();
        Row.margin({ top: 20 });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.choiceShow), (item: Resource, index?: number) => {
            Column.create();
            Column.width('30%');
            If.create();
            if (index !== undefined) {
                If.branchId(0);
                Text.create(item);
                Text.fontSize(20);
                Text.fontWeight(500);
                Text.fontColor(this.whichShow[index] === true ? '#0000000' : '#99182431');
                Text.onClick(() => {
                    this.whichShow.fill(false);
                    if (this.whichShow.length > index) {
                        if (index) {
                            this.whichShow[index] = true;
                        }
                    }
                    this.medias = [];
                    if (index == 0) {
                        this.getFileAssetsFromType(mediaLibrary.MediaType.IMAGE);
                    }
                    else {
                        prompt.showDialog({ message: $r('app.string.user_tip') });
                        this.choiceMedias = [];
                        this.isShowChoices = new Array(this.medias.length).fill(false);
                    }
                });
                Text.pop();
                If.create();
                if (this.whichShow[index]) {
                    If.branchId(0);
                    Divider.create();
                    Divider.vertical(false);
                    Divider.strokeWidth(3);
                    Divider.color('#ffff0000');
                    Divider.lineCap(LineCapStyle.Round);
                    Divider.width('40%');
                    Divider.margin({ top: 4 });
                }
                If.pop();
            }
            If.pop();
            Column.pop();
        });
        ForEach.pop();
        Row.pop();
        Column.pop();
        Scroll.create();
        Scroll.margin({ top: 20 });
        Scroll.width('100%');
        Scroll.constraintSize(this.getMaxHeight());
        Scroll.backgroundColor('#fff5f3f3');
        Column.create();
        Column.height('100%');
        Column.width('95%');
        Column.margin({ top: 8 });
        Grid.create();
        Grid.columnsTemplate('1fr 1fr 1fr 1fr');
        Grid.columnsGap(8);
        Grid.rowsGap(8);
        ForEach.create("3", this, ObservedObject.GetRawObject(this.medias), (item: mediaLibrary.FileAsset, index?: number) => {
            GridItem.create();
            GridItem.aspectRatio(1);
            Stack.create({ alignContent: Alignment.TopEnd });
            Stack.width('100%');
            Stack.height('100%');
            Stack.onClick(() => {
                if (index !== undefined) {
                    this.isShowChoices[index] = !this.isShowChoices[index];
                    if (this.isShowChoices[index]) {
                        if (this.choiceMedias.length > 5) {
                            prompt.showDialog({ message: $r('app.string.choice_number') });
                            this.isShowChoices[index] = !this.isShowChoices[index];
                            return;
                        }
                        this.choiceMedias.push(item);
                    }
                    else {
                        if (this.choiceMedias.indexOf(item) != -1) {
                            this.choiceMedias.splice(this.choiceMedias.indexOf(item), 1);
                        }
                    }
                }
            });
            Image.create(item.uri);
            Image.width('100%');
            Image.height('100%');
            Image.borderRadius(10);
            Image.objectFit(ImageFit.Fill);
            If.create();
            if (index !== undefined && this.isShowChoices[index]) {
                If.branchId(0);
                this.showChoiceBuild('#e92f4f', this.choiceMedias.indexOf(item) + 1, this);
            }
            else {
                If.branchId(1);
                this.showChoiceBuild('#ffb7b4b4', 0, this);
            }
            If.pop();
            Stack.pop();
            GridItem.pop();
        });
        ForEach.pop();
        Grid.pop();
        Column.pop();
        Scroll.pop();
        If.create();
        if (this.isChoice) {
            If.branchId(0);
            Grid.create();
            Grid.columnsTemplate('1fr 1fr 1fr 1fr 1fr 1fr');
            Grid.columnsGap(8);
            Grid.rowsGap(8);
            Grid.margin({ top: 8 });
            Grid.width('95%');
            Grid.height(70);
            ForEach.create("4", this, ObservedObject.GetRawObject(this.choiceMedias), (item: mediaLibrary.FileAsset, index?: number) => {
                GridItem.create();
                Stack.create({ alignContent: Alignment.TopEnd });
                Stack.width('100%');
                Image.create(item.uri);
                Image.width('100%');
                Image.height(70);
                Image.borderRadius(10);
                Image.create($r('app.media.delete'));
                Image.width(20);
                Image.height(20);
                Image.margin({ top: 5, right: 5 });
                Image.onClick(() => {
                    if (index !== undefined) {
                        for (let i = 0; i < this.medias.length; i++) {
                            if (this.choiceMedias[index] && this.isShowChoices.length > i && this.medias[i] === this.choiceMedias[index]) {
                                this.isShowChoices[i] = false;
                            }
                        }
                        this.choiceMedias.splice(index, 1);
                    }
                });
                Stack.pop();
                GridItem.pop();
            });
            ForEach.pop();
            Grid.pop();
            Divider.create();
            Divider.vertical(false);
            Divider.strokeWidth(1);
            Divider.color('#ffd9d5d6');
            Divider.lineCap(LineCapStyle.Round);
            Divider.width('100%');
            Divider.margin({ top: 8 });
        }
        If.pop();
        Row.create();
        Row.margin({ top: 8 });
        ForEach.create("5", this, ObservedObject.GetRawObject(this.taskShow), (item: Resource, index?: number) => {
            If.create();
            if (index !== undefined) {
                If.branchId(0);
                Column.create();
                Column.width('50%');
                Image.create(item);
                Image.width(30);
                Image.height(30);
                Text.create(this.textShow[index]);
                Text.fontSize(14);
                Text.fontColor('#99182431');
                Text.margin({ top: 2 });
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
