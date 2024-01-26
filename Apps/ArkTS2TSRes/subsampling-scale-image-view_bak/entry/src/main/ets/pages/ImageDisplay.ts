interface ImageDisplay_Params {
    model?: SubsamplingScaleImageView.Model;
    swiperController?: SwiperController;
    text?: String;
    index?: number;
    visible?: Visibility;
    mRotate?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ImageDisplay_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import { SubsamplingScaleImageView, OnImageEventListener, OnStateChangedListener } from "@ohos/subsampling-scale-image-view";
import prompt from '@system.prompt';
class ImageDisplay extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new SubsamplingScaleImageView.Model(), this, "model");
        this.swiperController = new SwiperController();
        this.text = '';
        this.__index = new ObservedPropertySimple(0, this, "index");
        this.visible = Visibility.Hidden;
        this.__mRotate = new ObservedPropertySimple(0, this, "mRotate");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ImageDisplay_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.swiperController !== undefined) {
            this.swiperController = params.swiperController;
        }
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.visible !== undefined) {
            this.visible = params.visible;
        }
        if (params.mRotate !== undefined) {
            this.mRotate = params.mRotate;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        this.__mRotate.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<SubsamplingScaleImageView.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: SubsamplingScaleImageView.Model) {
        this.__model.set(newValue);
    }
    private swiperController: SwiperController;
    private text: String;
    private __index: ObservedPropertySimple<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private visible: Visibility;
    private __mRotate: ObservedPropertySimple<number>;
    get mRotate() {
        return this.__mRotate.get();
    }
    set mRotate(newValue: number) {
        this.__mRotate.set(newValue);
    }
    aboutToAppear() {
        this.model.setImage($r('app.media.card')).setMinScale(1).setDoubleTapZoomScale(3)
            .setDoubleTapZoomDuration(500).setDoubleZoom(true).setPanLimit(1);
        let onStateChangedListener: OnStateChangedListener = new CustomOnStateChangedListener(this.model);
        this.model.setOnStateChangedListener(onStateChangedListener);
        let onImageEventListener: OnImageEventListener = new CustomOnImageEventListener(this.model);
        this.model.setOnImageEventListener(onImageEventListener);
    }
    onPageShow() {
        setTimeout(() => {
            console.debug("SubsamplingScaleImageView isReady:" + this.model.isReady());
        }, 1000);
    }
    render() {
        Stack.create({ alignContent: Alignment.Bottom });
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
                this.model.setImage($r('app.media.swissroad'));
            }
        });
        Row.create({ space: 5 });
        Row.width('100%');
        Row.height(60);
        Row.backgroundColor(0x3d3d3d);
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
        Image.onClick((event?: ClickEvent) => {
            this.mRotate += 90;
            this.model.setOrientation(this.mRotate);
        });
        Row.pop();
        Swiper.pop();
        Column.pop();
        Stack.pop();
    }
}
class CustomOnStateChangedListener implements OnStateChangedListener {
    model: SubsamplingScaleImageView.Model = new SubsamplingScaleImageView.Model();
    constructor(model: SubsamplingScaleImageView.Model) {
        this.model = model;
    }
    onScaleChanged(scale: number) {
        prompt.showToast({
            message: "OnScaleChanged scale:" + scale,
            duration: 1000
        });
    }
}
class CustomOnImageEventListener implements OnImageEventListener {
    model: SubsamplingScaleImageView.Model = new SubsamplingScaleImageView.Model();
    constructor(model: SubsamplingScaleImageView.Model) {
        this.model = model;
    }
    onImageLoaded() {
        console.debug("subsampling image load success");
    }
    onImageLoadError() {
        console.debug("subsampling image load error");
    }
}
loadDocument(new ImageDisplay("1", undefined, {}));
