interface ImageBrowserDialog_Params {
    modelList?: SubsamplingScaleImageView.Model[];
    imageList?: imgSrc;
    index?: number;
    positionX?: number;
    controller?: CustomDialogController;
    swiperController?: SwiperController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ImageBrowserDialog_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { SubsamplingScaleImageView } from '@ohos/subsampling-scale-image-view';
type imgSrc = string[] | Resource[] | PixelMap[];
export class ImageBrowserDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__modelList = new ObservedPropertyObject([], this, "modelList");
        this.__imageList = new SynchedPropertyObjectTwoWay(params.imageList, this, "imageList");
        this.__index = new SynchedPropertySimpleTwoWay(params.index, this, "index");
        this.__positionX = new ObservedPropertySimple(0, this, "positionX");
        this.controller = undefined;
        this.swiperController = new SwiperController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ImageBrowserDialog_Params) {
        if (params.modelList !== undefined) {
            this.modelList = params.modelList;
        }
        if (params.positionX !== undefined) {
            this.positionX = params.positionX;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.swiperController !== undefined) {
            this.swiperController = params.swiperController;
        }
    }
    aboutToBeDeleted() {
        this.__modelList.aboutToBeDeleted();
        this.__imageList.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        this.__positionX.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __modelList: ObservedPropertyObject<SubsamplingScaleImageView.Model[]>;
    get modelList() {
        return this.__modelList.get();
    }
    set modelList(newValue: SubsamplingScaleImageView.Model[]) {
        this.__modelList.set(newValue);
    }
    private __imageList: SynchedPropertySimpleOneWay<imgSrc>;
    get imageList() {
        return this.__imageList.get();
    }
    set imageList(newValue: imgSrc) {
        this.__imageList.set(newValue);
    }
    private __index: SynchedPropertySimpleTwoWay<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private __positionX: ObservedPropertySimple<number>;
    get positionX() {
        return this.__positionX.get();
    }
    set positionX(newValue: number) {
        this.__positionX.set(newValue);
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private swiperController: SwiperController;
    // 若尝试在CustomDialog中传入多个其他的Controller，以实现在CustomDialog中打开另一个或另一些CustomDialog，那么此处需要将指向自己的controller放在最后
    aboutToAppear() {
        let dialog = this;
        this.imageList.forEach((image: string | Resource | PixelMap, index: number, modelList: string[] | Resource[] | PixelMap[]) => {
            this.modelList.push(new SubsamplingScaleImageView.Model()
                .setImage(image)
                .setSingleTapListener({
                onSingleTapConfirmed(event: ClickEvent) {
                    dialog.close();
                }
            }));
        });
    }
    close() {
        this.controller.close();
    }
    render() {
        Stack.create({ alignContent: Alignment.Bottom });
        Stack.width('100%');
        Stack.height('100%');
        Swiper.create(this.swiperController);
        Swiper.index(this.index);
        Swiper.indicator(false);
        Swiper.duration(300);
        Swiper.loop(false);
        Swiper.onChange((index: number) => {
            this.index = index;
        });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.modelList), (model: SubsamplingScaleImageView.Model) => {
        });
        ForEach.pop();
        Swiper.pop();
        Text.create(`${this.index + 1} / ${this.imageList.length}`);
        Text.fontColor(Color.White);
        Text.margin({
            left: 20,
            bottom: 20
        });
        Text.pop();
        Stack.pop();
    }
}
