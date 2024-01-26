interface AdvancedEventHandling_Params {
    model?: LargeImage.Model;
    swiperController?: SwiperController;
    index?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AdvancedEventHandling_" + ++__generate__Id;
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
import { LargeImage, OnLongPressListener, OnDoubleTapListener, OnSingleTapListener, } from '@ohos/LargeImage';
import prompt from '@system.prompt';
class AdvancedEventHandling extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new LargeImage.Model(), this, "model");
        this.swiperController = new SwiperController();
        this.__index = new ObservedPropertySimple(0, this, "index");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AdvancedEventHandling_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.swiperController !== undefined) {
            this.swiperController = params.swiperController;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
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
    aboutToAppear() {
        this.model.setImage($r('app.media.sanmartino'));
        this.model.setZoomEnabled(false);
        let onSingleTapListener: CustomOnSingleTapListener = new CustomOnSingleTapListener(this.model);
        this.model.setSingleTapListener(onSingleTapListener);
        let onLongPressListener: CustomOnLongPressListener = new CustomOnLongPressListener(this.model);
        this.model.setLongPressListener(onLongPressListener);
        let onDoubleTapListener: CustomOnDoubleTapListener = new CustomOnDoubleTapListener(this.model);
        this.model.setDoubleTapListener(onDoubleTapListener);
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
            console.info(index.toString());
        });
        Row.create({ space: 5 });
        Row.width('100%');
        Row.height(60);
        Row.backgroundColor(0x3d3d3d);
        Text.create('Some gestures can be overridden with your own GestureDetector without affecting the image view. This allows you to get the coordinates of the event.');
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
            this.index = 1;
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
            this.index = 0;
        });
        Text.create('onSingleTapConfirmed has been overridden. Tap the image to see coordinates.');
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
            this.index = 2;
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
            this.index = 1;
        });
        Text.create('onDoubleTap has been overridden. Tap the image to see coordinates. This overrides the default zoom in behaviour.');
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
            this.index = 3;
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
            this.index = 2;
        });
        Text.create('onLongPress has been overridden. Press and hold the image');
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
            this.index = 4;
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
            this.index = 3;
        });
        Text.create('You can override any event you want, but customising swipe,fling and zoom gestures will stop the view working normally.');
        Text.width('100%');
        Text.height(60);
        Text.layoutWeight(1);
        Text.fontColor(0xffffff);
        Text.textAlign(TextAlign.Center);
        Text.fontSize(16);
        Text.pop();
        Row.pop();
        Swiper.pop();
        Column.pop();
        Stack.pop();
    }
}
class CustomOnSingleTapListener implements OnSingleTapListener {
    model: LargeImage.Model = new LargeImage.Model();
    constructor(model: LargeImage.Model) {
        this.model = model;
    }
    onSingleTapConfirmed(event: ClickEvent) {
        prompt.showToast({
            message: " Single tap: " + this.model.viewToSourceX(event.x) + "," + this.model.viewToSourceY(event.y),
            duration: 2000,
        });
        console.info("LargeImage Width" + this.model.getLoadedImageWidth());
        console.info("LargeImage Height" + this.model.getLoadedImageHeight());
    }
}
class CustomOnLongPressListener implements OnLongPressListener {
    model: LargeImage.Model = new LargeImage.Model();
    constructor(model: LargeImage.Model) {
        this.model = model;
    }
    onLongPress(event: GestureEvent) {
        let fingerInfo: FingerInfo[] = event.fingerList;
        if (!!fingerInfo && fingerInfo.length > 0) {
            prompt.showToast({
                message: "Long press" + this.model.viewToSourceX(fingerInfo[0].globalX) + "," + this.model.viewToSourceY(fingerInfo[0].globalY),
                duration: 2000
            });
        }
    }
}
class CustomOnDoubleTapListener implements OnDoubleTapListener {
    model: LargeImage.Model = new LargeImage.Model();
    constructor(model: LargeImage.Model) {
        this.model = model;
    }
    onDoubleTap(event: GestureEvent) {
        let fingerInfo: FingerInfo[] = event.fingerList;
        if (!!fingerInfo && fingerInfo.length > 0) {
            prompt.showToast({
                message: "Double tap" + this.model.viewToSourceX(fingerInfo[0].globalX) + "," + this.model.viewToSourceY(fingerInfo[0].globalY),
                duration: 1000
            });
        }
    }
}
loadDocument(new AdvancedEventHandling("1", undefined, {}));
