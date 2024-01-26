interface Configuration_Params {
    model?: SubsamplingScaleImageView.Model;
    swiperController?: SwiperController;
    text?: String;
    index?: number;
    visible?: Visibility;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Configuration_" + ++__generate__Id;
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
import { SubsamplingScaleImageView } from '@ohos/subsampling-scale-image-view';
import router from '@ohos.router';
class Configuration extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new SubsamplingScaleImageView.Model(), this, "model");
        this.swiperController = new SwiperController();
        this.text = '';
        this.__index = new ObservedPropertySimple(0, this, "index");
        this.visible = Visibility.Hidden;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Configuration_Params) {
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
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
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
    aboutToAppear() {
        this.model.setImage($r('app.media.card'));
    }
    render() {
        Stack.create({ alignContent: Alignment.Bottom });
        Button.createWithChild({ type: ButtonType.Normal, stateEffect: true });
        Button.position({ x: 0, y: 0 });
        Button.backgroundColor(Color.Black);
        Button.zIndex(100);
        Button.width(40);
        Button.height(40);
        Button.onClick(() => {
            router.back();
        });
        Image.create($r("app.media.previous"));
        Image.width("100%");
        Image.height("100%");
        Button.pop();
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
                this.model.setPanEnabled(false);
            }
            else {
                this.model.setPanEnabled(true);
            }
            console.info(index.toString());
        });
        Row.create({ space: 5 });
        Row.width('100%');
        Row.height(60);
        Row.backgroundColor(0x3d3d3d);
        Text.create('The maximum scale. You can zoom in until the image is very pixellated.');
        Text.width('100%');
        Text.height(60);
        Text.layoutWeight(1);
        Text.fontColor(0xffffff);
        Text.fontSize(14);
        Text.margin({ left: 10 });
        Text.pop();
        Image.create($r('app.media.next'));
        Image.width(30);
        Image.height(30);
        Image.margin({ top: 6, left: 10, right: 10 });
        Image.onClick((event?: ClickEvent) => {
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
        Image.onClick((event?: ClickEvent) => {
            this.index = 0;
        });
        Text.create('Dragging has been disabled. You can only zoom in to the centre point.');
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
        Image.margin({ top: 6, left: 10, right: 10 });
        Image.onClick((event?: ClickEvent) => {
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
        Image.onClick((event?: ClickEvent) => {
            this.index = 1;
        });
        Text.create('On double tap, the tapped point is now zoomed to the center of the screen instead of remaining in the same place.');
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
        Image.margin({ top: 6, left: 10, right: 10 });
        Image.onClick((event?: ClickEvent) => {
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
        Image.onClick((event?: ClickEvent) => {
            this.index = 2;
        });
        Text.create('On double tap, the zoom now happens immediately.');
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
        Image.margin({ top: 6, left: 10, right: 10 });
        Image.onClick((event?: ClickEvent) => {
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
        Image.onClick((event?: ClickEvent) => {
            this.index = 3;
        });
        Text.create('The double tap image zoom');
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
loadDocument(new Configuration("1", undefined, {}));
