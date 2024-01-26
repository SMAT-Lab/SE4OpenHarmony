interface EventHandling_Params {
    model?: SubsamplingScaleImageView.Model;
    swiperController?: SwiperController;
    text?: String;
    index?: number;
    visible?: Visibility;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "EventHandling_" + ++__generate__Id;
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
import { OnLongPressListener, OnSingleTapListener, SubsamplingScaleImageView } from '@ohos/subsampling-scale-image-view';
import prompt from '@system.prompt';
import router from '@ohos.router';
class EventHandling extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new SubsamplingScaleImageView.Model(), this, "model");
        this.swiperController = new SwiperController();
        this.text = '';
        this.__index = new ObservedPropertySimple(0, this, "index");
        this.visible = Visibility.Hidden;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: EventHandling_Params) {
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
        this.model.setImage($r('app.media.sanmartino'));
        let onSingleTapListener: CustomOnSingleTapListener = new CustomOnSingleTapListener();
        this.model.setSingleTapListener(onSingleTapListener);
        let onLongPressListener: OnLongPressListener = new CustomOnLongPressListener();
        this.model.setLongPressListener(onLongPressListener);
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
            console.info(index.toString());
        });
        Row.create({ space: 5 });
        Row.width('100%');
        Row.height(60);
        Row.backgroundColor(0x3d3d3d);
        Text.create('Touch handling by the image view doesn\'t prevent normal events from working.');
        Text.width('100%');
        Text.height(60);
        Text.fontColor(0xffffff);
        Text.layoutWeight(1);
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
        Text.create('This view has an OnClickListener. Tap once to activate the click.');
        Text.width(260);
        Text.height(60);
        Text.fontColor(0xffffff);
        Text.fontSize(14);
        Text.margin({ top: 6, left: 10, right: 10 });
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
        Text.create('This view has an OnLongClickListener. Press and hold to activate it.');
        Text.width(325);
        Text.height(60);
        Text.fontColor(0xffffff);
        Text.fontSize(14);
        Text.pop();
        Row.pop();
        Swiper.pop();
        Column.pop();
        Stack.pop();
    }
}
class CustomOnSingleTapListener implements OnSingleTapListener {
    onSingleTapConfirmed(event: ClickEvent): void {
        prompt.showToast({
            message: 'clicked',
            duration: 2000,
        });
    }
}
class CustomOnLongPressListener implements OnLongPressListener {
    onLongPress(event: GestureEvent): void {
        setTimeout(() => {
            prompt.showToast({ message: "Long clicked", duration: 1000 });
        }, 600);
    }
}
loadDocument(new EventHandling("1", undefined, {}));
