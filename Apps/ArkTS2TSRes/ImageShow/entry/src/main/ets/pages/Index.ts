interface Index_Params {
    mediaUris?: Array<string>;
    stars?: Array<boolean>;
    countStar?: number;
    isShowCamera?: boolean;
    isShowComment?: boolean;
    params?;
    paramsObj?: paramsType;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import Logger from '../../../../../imagelibrary/src/main/ets/components/data/Logger';
import { terminateSelf } from './utils';
const TAG: string = 'Index';
interface paramsType {
    mediaUris: Array<string>;
}
class routerParamsType {
    isShowCamera?: boolean;
    mediaUris?: Array<string>;
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__mediaUris = new ObservedPropertyObject([], this, "mediaUris");
        this.__stars = new ObservedPropertyObject(new Array(5).fill(false), this, "stars");
        this.__countStar = new ObservedPropertySimple(0, this, "countStar");
        this.__isShowCamera = new ObservedPropertySimple(false, this, "isShowCamera");
        this.__isShowComment = new ObservedPropertySimple(true, this, "isShowComment");
        this.params = router.getParams() as routerParamsType;
        this.paramsObj = {
            mediaUris: this.mediaUris
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.mediaUris !== undefined) {
            this.mediaUris = params.mediaUris;
        }
        if (params.stars !== undefined) {
            this.stars = params.stars;
        }
        if (params.countStar !== undefined) {
            this.countStar = params.countStar;
        }
        if (params.isShowCamera !== undefined) {
            this.isShowCamera = params.isShowCamera;
        }
        if (params.isShowComment !== undefined) {
            this.isShowComment = params.isShowComment;
        }
        if (params.params !== undefined) {
            this.params = params.params;
        }
        if (params.paramsObj !== undefined) {
            this.paramsObj = params.paramsObj;
        }
    }
    aboutToBeDeleted() {
        this.__mediaUris.aboutToBeDeleted();
        this.__stars.aboutToBeDeleted();
        this.__countStar.aboutToBeDeleted();
        this.__isShowCamera.aboutToBeDeleted();
        this.__isShowComment.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __mediaUris: ObservedPropertyObject<Array<string>>;
    get mediaUris() {
        return this.__mediaUris.get();
    }
    set mediaUris(newValue: Array<string>) {
        this.__mediaUris.set(newValue);
    }
    private __stars: ObservedPropertyObject<Array<boolean>>;
    get stars() {
        return this.__stars.get();
    }
    set stars(newValue: Array<boolean>) {
        this.__stars.set(newValue);
    }
    private __countStar: ObservedPropertySimple<number>;
    get countStar() {
        return this.__countStar.get();
    }
    set countStar(newValue: number) {
        this.__countStar.set(newValue);
    }
    private __isShowCamera: ObservedPropertySimple<boolean>;
    get isShowCamera() {
        return this.__isShowCamera.get();
    }
    set isShowCamera(newValue: boolean) {
        this.__isShowCamera.set(newValue);
    }
    private __isShowComment: ObservedPropertySimple<boolean>;
    get isShowComment() {
        return this.__isShowComment.get();
    }
    set isShowComment(newValue: boolean) {
        this.__isShowComment.set(newValue);
    }
    private params;
    private paramsObj: paramsType;
    async onPageShow() {
        Logger.info(TAG, 'enter onPageShow');
        if (this.params.isShowCamera !== undefined && this.params.isShowCamera !== null) {
            this.isShowCamera = this.params.isShowCamera;
            Logger.info(TAG, `this.isShowCamera = ${this.isShowCamera}`);
        }
        if (this.params.mediaUris !== undefined && this.params.mediaUris !== null) {
            this.mediaUris = this.params.mediaUris;
            this.mediaUris.push('');
        }
        Logger.info(TAG, 'end onPageShow');
    }
    terminateSelf(context: Context) {
        terminateSelf(context);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor('#f1f3f5');
        Row.create();
        Row.width('100%');
        Row.height(32);
        Row.padding({ left: 14 });
        Row.margin({ top: 20 });
        Image.create($r('app.media.back'));
        Image.width(46);
        Image.height(26);
        Image.objectFit(ImageFit.Contain);
        Image.onClick(() => {
            let context = getContext(this);
            this.terminateSelf(context);
        });
        Text.create($r('app.string.publish_comments'));
        Text.fontSize(22);
        Text.margin({ left: 130 });
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Blank.create();
        Blank.pop();
        Button.createWithLabel($r('app.string.submit'));
        Button.fontSize(20);
        Button.height(32);
        Button.width(80);
        Button.backgroundColor('#E92F4F');
        Button.borderRadius(20);
        Button.margin({ right: 10 });
        Button.pop();
        Row.pop();
        Scroll.create();
        Scroll.margin({ top: 20 });
        Scroll.constraintSize({ maxHeight: '94%', minHeight: '94%' });
        Scroll.backgroundColor('#f1f3f5');
        Column.create();
        Column.width('100%');
        Column.height(this.isShowCamera === false ? 380 : 300 + (this.mediaUris.length / 4 > 1 ? 160 : 60));
        Stack.create({ alignContent: Alignment.Top });
        Stack.backgroundColor('#f1f3f5');
        Stack.height('100%');
        Stack.width('94%');
        Stack.margin({ top: 10 });
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.margin({ top: 22 });
        Column.borderRadius(20);
        Column.backgroundColor('#fffffff');
        Stack.create();
        Stack.alignContent(Alignment.TopStart);
        Stack.margin({ top: 40 });
        TextArea.create({ placeholder: $r('app.string.tip') });
        TextArea.height(150);
        TextArea.backgroundColor('#fffffff');
        TextArea.onChange((value) => {
            if (value.length === 0) {
                this.isShowComment = true;
            }
            else {
                this.isShowComment = false;
            }
        });
        If.create();
        if (this.isShowComment) {
            If.branchId(0);
            Image.create($r('app.media.comment'));
            Image.height(20);
            Image.width(20);
            Image.margin({ top: 8, left: 16 });
        }
        If.pop();
        Stack.pop();
        If.create();
        if (this.isShowCamera) {
            If.branchId(0);
            Grid.create();
            Grid.columnsTemplate('1fr 1fr 1fr 1fr');
            Grid.columnsGap(8);
            Grid.rowsGap(8);
            Grid.margin({ top: 8 });
            Grid.width('94%');
            Grid.height(105 * (this.mediaUris.length > 4 ? 2 : 1));
            ForEach.create("2", this, ObservedObject.GetRawObject(this.mediaUris), (item: PixelMap | ResourceStr, index?: number) => {
                If.create();
                if (typeof index !== "undefined") {
                    If.branchId(0);
                    GridItem.create();
                    If.create();
                    if (index < this.mediaUris.length - 1) {
                        If.branchId(0);
                        Image.create(item);
                        Image.width('100%');
                        Image.height(100);
                        Image.borderRadius(10);
                    }
                    else {
                        If.branchId(1);
                        Column.create();
                        Column.alignItems(HorizontalAlign.Center);
                        Column.justifyContent(FlexAlign.Center);
                        Column.width('100%');
                        Column.height(100);
                        Column.borderRadius(10);
                        Column.backgroundColor('#F1F3F5');
                        Image.create($r('app.media.photo'));
                        Image.height(40);
                        Image.width(40);
                        Image.onClick(() => {
                            router.push({
                                url: 'pages/ChoicePhoto',
                                params: this.paramsObj
                            });
                        });
                        Text.create($r('app.string.add_picture'));
                        Text.fontSize(13);
                        Text.pop();
                        Column.pop();
                    }
                    If.pop();
                    GridItem.pop();
                }
                If.pop();
            });
            ForEach.pop();
            Grid.pop();
        }
        else {
            If.branchId(1);
            Column.create();
            Column.onClick(() => {
                router.push({
                    url: 'pages/ChoicePhoto'
                });
            });
            Column.width('94%');
            Column.height(130);
            Column.margin({ top: 10 });
            Column.borderRadius(10);
            Column.justifyContent(FlexAlign.Center);
            Column.backgroundColor('#F1F3F5');
            Image.create($r('app.media.camera'));
            Image.width(40);
            Image.height(40);
            Text.create($r('app.string.add_picture'));
            Text.fontSize(16);
            Text.pop();
            Column.pop();
        }
        If.pop();
        Text.create($r('app.string.anonymous_display'));
        Text.fontSize(15);
        Text.fontColor('#99182431');
        Text.alignSelf(ItemAlign.Start);
        Text.margin({ left: 16, top: 16 });
        Text.pop();
        Column.pop();
        Image.create($r('app.media.commodity'));
        Image.width(44);
        Image.height(44);
        Stack.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
