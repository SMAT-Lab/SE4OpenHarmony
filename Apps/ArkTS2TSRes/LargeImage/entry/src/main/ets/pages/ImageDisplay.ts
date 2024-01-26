interface ImageDisplay_Params {
    model?: LargeImage.Model;
    swiperController?: SwiperController;
    index?: number;
    rotateValue?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ImageDisplay_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { LargeImage } from '@ohos/LargeImage';
class ImageDisplay extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new LargeImage.Model(), this, "model");
        this.swiperController = new SwiperController();
        this.__index = new ObservedPropertySimple(0, this, "index");
        this.__rotateValue = new ObservedPropertySimple(0, this, "rotateValue");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ImageDisplay_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.swiperController !== undefined) {
            this.swiperController = params.swiperController;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.rotateValue !== undefined) {
            this.rotateValue = params.rotateValue;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        this.__rotateValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<LargeImage.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: LargeImage.Model) {
        this.__model.set(newValue);
    }
    private swiperController: SwiperController;
    private __index: ObservedPropertySimple<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private __rotateValue: ObservedPropertySimple<number>;
    get rotateValue() {
        return this.__rotateValue.get();
    }
    set rotateValue(newValue: number) {
        this.__rotateValue.set(newValue);
    }
    aboutToAppear() {
        this.model.setImage($r('app.media.card'));
        this.model.setMaxScale(2);
    }
    render() {
        Stack.create({ alignContent: Alignment.Bottom });
        If.create();
        if (this.index == 0) {
            If.branchId(0);
        }
        If.pop();
        If.create();
        if (this.index == 1) {
            If.branchId(0);
        }
        If.pop();
        Column.create({ space: 5 });
        Column.height(60);
        Column.backgroundColor(0x3d3d3d);
        Column.align(Alignment.Bottom);
        Swiper.create(this.swiperController);
        Swiper.index(this.index);
        Swiper.autoPlay(false);
        Swiper.indicator(false);
        Swiper.loop(false);
        Swiper.duration(50);
        Swiper.vertical(false);
        Swiper.itemSpace(0);
        Swiper.onChange((index: number) => {
            if (index == 1) {
                this.model = new LargeImage.Model();
                this.model.setImage($r('app.media.swissroad'));
                this.index = 1;
            }
            if (index == 0) {
                this.model = new LargeImage.Model();
                this.model.setImage($r('app.media.card'));
                this.index = 0;
            }
        });
        Row.create({ space: 5 });
        Row.width('100%');
        Row.height(60);
        Row.backgroundColor(0x3d3d3d);
        Text.create('This image is 7,800 x 6,240 pixels. On most devices it will be subsampled, and higher quality tiles are loaded as you zoom in.');
        Text.width('100%');
        Text.height(60);
        Text.layoutWeight(1);
        Text.fontColor(0xffffff);
        Text.textAlign(TextAlign.Center);
        Text.fontSize(16);
        Text.pop();
        Image.create($r('app.media.next'));
        Image.width(30);
        Image.height(30);
        Image.margin({ top: 6, left: 10 });
        Image.onClick((event: ClickEvent) => {
            this.swiperController.showNext();
        });
        Row.pop();
        Row.create({ space: 5 });
        Row.width('100%');
        Row.height(60);
        Row.backgroundColor(0x3d3d3d);
        Image.create($r('app.media.previous'));
        Image.width(30);
        Image.height(30);
        Image.margin({ top: 6 });
        Image.onClick((event: ClickEvent) => {
            this.swiperController.showPrevious();
        });
        Text.create('This image has been rotated 90 degrees. Tap the button to rotate it. EXIF rotation is supported for external files.');
        Text.width('100%');
        Text.height(60);
        Text.layoutWeight(1);
        Text.fontColor(0xffffff);
        Text.textAlign(TextAlign.Center);
        Text.fontSize(16);
        Text.pop();
        Image.create($r('app.media.rotate'));
        Image.width(30);
        Image.height(30);
        Image.margin({ top: 6, left: 10, right: 20 });
        Image.onClick((event: ClickEvent) => {
            this.rotateValue += 90;
            this.model.setOrientation(this.rotateValue);
        });
        Row.pop();
        Swiper.pop();
        Column.pop();
        Stack.pop();
    }
}
loadDocument(new ImageDisplay("1", undefined, {}));
