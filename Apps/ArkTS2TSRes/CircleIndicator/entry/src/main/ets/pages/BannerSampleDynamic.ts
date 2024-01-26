interface BannerSampleDynamic_Params {
    swiperController?: SwiperController;
    model?: BannerModel;
    index?: number;
    count?: number;
    enable?: boolean;
    arr?: Array<Resource>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "BannerSampleDynamic_" + ++__generate__Id;
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
import { BannerIndicator, BannerModel } from '@ohos/circleindicator';
const iconArrs: Array<Resource> = [$r('app.media.p1'), $r('app.media.p2'), $r('app.media.p3'), $r('app.media.p4')];
class BannerSampleDynamic extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.swiperController = new SwiperController();
        this.model = new BannerModel(this.swiperController);
        this.__index = new ObservedPropertySimple(0, this, "index");
        this.__count = new ObservedPropertySimple(4, this, "count");
        this.__enable = new ObservedPropertySimple(true, this, "enable");
        this.__arr = new ObservedPropertyObject([], this, "arr");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: BannerSampleDynamic_Params) {
        if (params.swiperController !== undefined) {
            this.swiperController = params.swiperController;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.count !== undefined) {
            this.count = params.count;
        }
        if (params.enable !== undefined) {
            this.enable = params.enable;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
    }
    aboutToBeDeleted() {
        this.__index.aboutToBeDeleted();
        this.__count.aboutToBeDeleted();
        this.__enable.aboutToBeDeleted();
        this.__arr.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private swiperController: SwiperController;
    private model: BannerModel;
    private __index: ObservedPropertySimple<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private __count: ObservedPropertySimple<number>;
    get count() {
        return this.__count.get();
    }
    set count(newValue: number) {
        this.__count.set(newValue);
    }
    private __enable: ObservedPropertySimple<boolean>;
    get enable() {
        return this.__enable.get();
    }
    set enable(newValue: boolean) {
        this.__enable.set(newValue);
    }
    private __arr: ObservedPropertyObject<Array<Resource>>;
    get arr() {
        return this.__arr.get();
    }
    set arr(newValue: Array<Resource>) {
        this.__arr.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Start });
        Flex.width('100%');
        Flex.height('100%');
        Flex.backgroundColor(0xa9a9a9);
        Stack.create({ alignContent: Alignment.Bottom });
        Swiper.create(this.swiperController);
        Swiper.loop(true);
        Swiper.indicator(false);
        Swiper.onTouch((event: TouchEvent) => {
            this.model.notifyTouch(event, this.index);
        });
        Swiper.onChange((index: number) => {
            this.index = index;
        });
        Swiper.enabled(this.enable);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.arr), (item: Resource) => {
            Image.create(item);
            Image.objectFit(ImageFit.Cover);
            Image.width('100%');
            Image.height("440lpx");
        }, (item: number) => JSON.stringify(item));
        ForEach.pop();
        Swiper.pop();
        Stack.pop();
        Row.create();
        Row.margin({ top: 50 });
        Text.create("变为0个");
        Text.onClick((event: ClickEvent) => {
            this.arr = [];
            this.count = 0;
            this.model.stopAutoPlay();
            this.enable = false;
        });
        Text.backgroundColor(0xd4d4d4);
        Text.fontSize(15);
        Text.padding(8);
        Text.fontColor(Color.Black);
        Text.pop();
        Text.create("变为1个");
        Text.onClick((event: ClickEvent) => {
            this.arr = [iconArrs[this.index]];
            this.count = 1;
            this.model.startAutoPlay();
            this.enable = true;
        });
        Text.backgroundColor(0xd4d4d4);
        Text.fontSize(15);
        Text.padding(8);
        Text.fontColor(Color.Black);
        Text.margin({ left: 30, right: 30 });
        Text.pop();
        Text.create("变为4个");
        Text.onClick((event: ClickEvent) => {
            this.arr = iconArrs;
            this.count = 4;
            this.index = 0;
            this.model.startAutoPlay();
            this.enable = true;
        });
        Text.backgroundColor(0xd4d4d4);
        Text.fontSize(15);
        Text.padding(8);
        Text.fontColor(Color.Black);
        Text.pop();
        Row.pop();
        Flex.pop();
    }
    aboutToAppear() {
        this.arr = iconArrs;
        this.model
            .setFades(false)
            .setBackgroundColor("#00ffffff")
            .setColor(0xffffff)
            .setHeight(6)
            .startAutoPlay();
    }
}
loadDocument(new BannerSampleDynamic("1", undefined, {}));
