interface Sample_Params {
    data?: PhotoView.Model;
    data1?: PhotoView.Model;
    data2?: PhotoView.Model;
    swiperController?: SwiperController;
    disableSwipe?: boolean;
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
import { PhotoView } from '@ohos/photoview';
class Sample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__data = new ObservedPropertyObject(new PhotoView.Model(), this, "data");
        this.__data1 = new ObservedPropertyObject(new PhotoView.Model(), this, "data1");
        this.__data2 = new ObservedPropertyObject(new PhotoView.Model(), this, "data2");
        this.swiperController = new SwiperController();
        this.__disableSwipe = new ObservedPropertySimple(false, this, "disableSwipe");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Sample_Params) {
        if (params.data !== undefined) {
            this.data = params.data;
        }
        if (params.data1 !== undefined) {
            this.data1 = params.data1;
        }
        if (params.data2 !== undefined) {
            this.data2 = params.data2;
        }
        if (params.swiperController !== undefined) {
            this.swiperController = params.swiperController;
        }
        if (params.disableSwipe !== undefined) {
            this.disableSwipe = params.disableSwipe;
        }
    }
    aboutToBeDeleted() {
        this.__data.aboutToBeDeleted();
        this.__data1.aboutToBeDeleted();
        this.__data2.aboutToBeDeleted();
        this.__disableSwipe.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __data: ObservedPropertyObject<PhotoView.Model>;
    get data() {
        return this.__data.get();
    }
    set data(newValue: PhotoView.Model) {
        this.__data.set(newValue);
    }
    private __data1: ObservedPropertyObject<PhotoView.Model>;
    get data1() {
        return this.__data1.get();
    }
    set data1(newValue: PhotoView.Model) {
        this.__data1.set(newValue);
    }
    private __data2: ObservedPropertyObject<PhotoView.Model>;
    get data2() {
        return this.__data2.get();
    }
    set data2(newValue: PhotoView.Model) {
        this.__data2.set(newValue);
    }
    private swiperController: SwiperController;
    private __disableSwipe: ObservedPropertySimple<boolean>;
    get disableSwipe() {
        return this.__disableSwipe.get();
    }
    set disableSwipe(newValue: boolean) {
        this.__disableSwipe.set(newValue);
    }
    aboutToAppear() {
        let that: any = this;
        this.data
            .setImageResource($r('app.media.wallpaper'))
            .setSwipeDirection(SwipeDirection.Horizontal)
            .isParentSwiper(true);
        that.data.setOnSwipeListener({
            onSwipeListener(ableSwipe: boolean) {
                that.disableSwipe = ableSwipe;
            }
        });
        this.data1
            .setImageResource($r('app.media.wallpaper'))
            .setSwipeDirection(SwipeDirection.Horizontal)
            .isParentSwiper(true);
        that.data1.setOnSwipeListener({
            onSwipeListener(ableSwipe: boolean) {
                that.disableSwipe = ableSwipe;
            }
        });
        this.data2
            .setImageResource($r('app.media.wallpaper'))
            .setSwipeDirection(SwipeDirection.Horizontal)
            .isParentSwiper(true);
        that.data2.setOnSwipeListener({
            onSwipeListener(ableSwipe: boolean) {
                that.disableSwipe = ableSwipe;
            }
        });
    }
    render() {
        Column.create();
        Column.height('100%');
        Column.width('100%');
        Column.backgroundColor(0x3d3d3d);
        Swiper.create(this.swiperController);
        Swiper.autoPlay(false);
        Swiper.indicator(false);
        Swiper.loop(false);
        Swiper.vertical(false);
        Swiper.itemSpace(10);
        Swiper.disableSwipe(this.disableSwipe);
        Swiper.onChange((index: number) => {
            if (index == 0) {
                this.data.resetMatrix();
            }
            else if (index == 1) {
                this.data1.resetMatrix();
            }
            else {
                this.data2.resetMatrix();
            }
        });
        Swiper.pop();
        Column.pop();
    }
}
loadDocument(new Sample("1", undefined, {}));
