interface Index_Params {
    model?: SubsamplingScaleImageView.Model;
    model2?: SubsamplingScaleImageView.Model;
    swiperController?: SwiperController;
    subSwiperController?: SwiperController;
    text?: String;
    index?: number;
    subIndex?: number;
    visible?: Visibility;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ViewPager_" + ++__generate__Id;
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
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new SubsamplingScaleImageView.Model(), this, "model");
        this.__model2 = new ObservedPropertyObject(new SubsamplingScaleImageView.Model(), this, "model2");
        this.swiperController = new SwiperController();
        this.subSwiperController = new SwiperController();
        this.text = '';
        this.__index = new ObservedPropertySimple(0, this, "index");
        this.__subIndex = new ObservedPropertySimple(0, this, "subIndex");
        this.visible = Visibility.Hidden;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.model2 !== undefined) {
            this.model2 = params.model2;
        }
        if (params.swiperController !== undefined) {
            this.swiperController = params.swiperController;
        }
        if (params.subSwiperController !== undefined) {
            this.subSwiperController = params.subSwiperController;
        }
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.subIndex !== undefined) {
            this.subIndex = params.subIndex;
        }
        if (params.visible !== undefined) {
            this.visible = params.visible;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__model2.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        this.__subIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<SubsamplingScaleImageView.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: SubsamplingScaleImageView.Model) {
        this.__model.set(newValue);
    }
    private __model2: ObservedPropertyObject<SubsamplingScaleImageView.Model>;
    get model2() {
        return this.__model2.get();
    }
    set model2(newValue: SubsamplingScaleImageView.Model) {
        this.__model2.set(newValue);
    }
    private swiperController: SwiperController;
    private subSwiperController: SwiperController;
    private text: String;
    private __index: ObservedPropertySimple<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private __subIndex: ObservedPropertySimple<number>;
    get subIndex() {
        return this.__subIndex.get();
    }
    set subIndex(newValue: number) {
        this.__subIndex.set(newValue);
    }
    private visible: Visibility;
    aboutToAppear() {
        this.model.setImage($r('app.media.sanmartino'));
        this.model2.setImage($r('app.media.swissroad'));
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
        Swiper.create(this.swiperController);
        Swiper.index(this.subIndex);
        Swiper.autoPlay(false);
        Swiper.indicator(false);
        Swiper.loop(false);
        Swiper.duration(50);
        Swiper.vertical(false);
        Swiper.itemSpace(0);
        Swiper.onChange((index: number) => {
            console.info(index.toString());
        });
        Swiper.pop();
        Column.create({ space: 5 });
        Column.height(80);
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
        Row.height(80);
        Row.backgroundColor(0x3d3d3d);
        Text.create('This gallery has two images in a ViewPager. Swipe to move to the next image. If you\'re zoomed in on an image, you need to pan to the right of it, then swipe again to activate the pager.');
        Text.width('100%');
        Text.layoutWeight(1);
        Text.fontColor(0xffffff);
        Text.fontSize(13);
        Text.margin({ top: 3, left: 5, right: 5, bottom: 3 });
        Text.pop();
        Row.pop();
        Swiper.pop();
        Column.pop();
        Stack.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
