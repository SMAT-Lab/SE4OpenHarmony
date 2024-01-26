interface BannerSampleNoFades_Params {
    swiperController?: SwiperController;
    model?: BannerModel;
    index?: number;
    count?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "BannerSampleNoFades_" + ++__generate__Id;
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
class BannerSampleNoFades extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.swiperController = new SwiperController();
        this.model = new BannerModel(this.swiperController);
        this.__index = new ObservedPropertySimple(0, this, "index");
        this.__count = new ObservedPropertySimple(4, this, "count");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: BannerSampleNoFades_Params) {
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
    }
    aboutToBeDeleted() {
        this.__index.aboutToBeDeleted();
        this.__count.aboutToBeDeleted();
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
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Swiper.create(this.swiperController);
        Swiper.loop(true);
        Swiper.indicator(false);
        Swiper.onTouch((event: TouchEvent) => {
            this.model.notifyTouch(event, this.index);
        });
        Swiper.onChange((index: number) => {
            this.index = index;
        });
        Image.create($r('app.media.p1'));
        Image.objectFit(ImageFit.Cover);
        Image.width('100%');
        Image.height("440lpx");
        Image.create($r('app.media.p2'));
        Image.objectFit(ImageFit.Cover);
        Image.width('100%');
        Image.height("440lpx");
        Image.create($r('app.media.p3'));
        Image.objectFit(ImageFit.Cover);
        Image.width('100%');
        Image.height("440lpx");
        Image.create($r('app.media.p4'));
        Image.objectFit(ImageFit.Cover);
        Image.width('100%');
        Image.height("440lpx");
        Swiper.pop();
        Flex.pop();
    }
    aboutToAppear() {
        this.model.setFades(false);
    }
}
loadDocument(new BannerSampleNoFades("1", undefined, {}));
