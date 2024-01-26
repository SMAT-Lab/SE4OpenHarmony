interface MiscViewsDemo_Params {
    timer?: string;
    textView?: OverScrollDecor.Model;
    imageView?: OverScrollDecor.Model;
    chronometer?: OverScrollDecor.Model;
    isVisibility?: Visibility;
    backOffset?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MiscViewsDemo_" + ++__generate__Id;
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
import { OverScrollDecor } from '@ohos/overscroll-decor';
import SideBar from "./SideBar";
class MiscViewsDemo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__timer = new ObservedPropertySimple('', this, "timer");
        this.__textView = new ObservedPropertyObject(new OverScrollDecor.Model(), this, "textView");
        this.__imageView = new ObservedPropertyObject(new OverScrollDecor.Model(), this, "imageView");
        this.__chronometer = new ObservedPropertyObject(new OverScrollDecor.Model(), this, "chronometer");
        this.__isVisibility = new ObservedPropertySimple(Visibility.None, this, "isVisibility");
        this.__backOffset = new ObservedPropertySimple(0, this, "backOffset");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MiscViewsDemo_Params) {
        if (params.timer !== undefined) {
            this.timer = params.timer;
        }
        if (params.textView !== undefined) {
            this.textView = params.textView;
        }
        if (params.imageView !== undefined) {
            this.imageView = params.imageView;
        }
        if (params.chronometer !== undefined) {
            this.chronometer = params.chronometer;
        }
        if (params.isVisibility !== undefined) {
            this.isVisibility = params.isVisibility;
        }
        if (params.backOffset !== undefined) {
            this.backOffset = params.backOffset;
        }
    }
    aboutToBeDeleted() {
        this.__timer.aboutToBeDeleted();
        this.__textView.aboutToBeDeleted();
        this.__imageView.aboutToBeDeleted();
        this.__chronometer.aboutToBeDeleted();
        this.__isVisibility.aboutToBeDeleted();
        this.__backOffset.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __timer: ObservedPropertySimple<string>;
    get timer() {
        return this.__timer.get();
    }
    set timer(newValue: string) {
        this.__timer.set(newValue);
    }
    private __textView: ObservedPropertyObject<OverScrollDecor.Model>;
    get textView() {
        return this.__textView.get();
    }
    set textView(newValue: OverScrollDecor.Model) {
        this.__textView.set(newValue);
    }
    private __imageView: ObservedPropertyObject<OverScrollDecor.Model>;
    get imageView() {
        return this.__imageView.get();
    }
    set imageView(newValue: OverScrollDecor.Model) {
        this.__imageView.set(newValue);
    }
    private __chronometer: ObservedPropertyObject<OverScrollDecor.Model>;
    get chronometer() {
        return this.__chronometer.get();
    }
    set chronometer(newValue: OverScrollDecor.Model) {
        this.__chronometer.set(newValue);
    }
    private __isVisibility: ObservedPropertySimple<Visibility>;
    get isVisibility() {
        return this.__isVisibility.get();
    }
    set isVisibility(newValue: Visibility) {
        this.__isVisibility.set(newValue);
    }
    private __backOffset: ObservedPropertySimple<number>;
    get backOffset() {
        return this.__backOffset.get();
    }
    set backOffset(newValue: number) {
        this.__backOffset.set(newValue);
    }
    private chronometerView() {
        let min = 0;
        let sec = 0;
        let that = this;
        setInterval(() => {
            sec++;
            if (sec == 60) {
                sec = 0;
                min++;
                if (min == 60) {
                    min = 0;
                }
            }
            let minutes = min < 10 ? '0' + min : min;
            let seconds = sec < 10 ? '0' + sec : sec;
            that.timer = minutes + ' : ' + seconds;
        }, 1000);
    }
    aboutToAppear() {
        this.chronometerView();
        this.textView
            .setUpOverScroll(true)
            .setOrientation(OverScrollDecor.ORIENTATION.HORIZONTAL)
            .setOverScrollBounceEffect(true)
            .setScrollBar(false)
            .setWidth("100%")
            .setHeight("28%");
        this.imageView
            .setUpOverScroll(true)
            .setOrientation(OverScrollDecor.ORIENTATION.VERTICAL)
            .setOverScrollBounceEffect(true)
            .setScrollBar(false)
            .setWidth("100%")
            .setHeight("36%");
        this.chronometer
            .setUpOverScroll(true)
            .setOrientation(OverScrollDecor.ORIENTATION.HORIZONTAL)
            .setOverScrollBounceEffect(true)
            .setScrollBar(false)
            .setWidth("100%")
            .setHeight("28%");
    }
    textViewScroll(parent = null) {
        Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center });
        Flex.width("105%");
        Text.create("Practically any clickable widget can be over-scrolled.\nTry it!");
        Text.textAlign(TextAlign.Center);
        Text.fontSize(30);
        Text.width("75%");
        Text.fontColor("#727171");
        Text.pop();
        Flex.pop();
    }
    imageViewScroll(parent = null) {
        Flex.create({ justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center });
        Flex.width("100%");
        Flex.height("105%");
        Image.create($r('app.media.image'));
        Image.objectFit(ImageFit.Contain);
        Image.width("33%");
        Image.height("50%");
        Flex.pop();
    }
    chronometerViewScroll(parent = null) {
        Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center });
        Flex.width("105%");
        Row.create({ space: 5 });
        Text.create('' + this.timer);
        Text.fontSize(50);
        Text.pop();
        Row.pop();
        Flex.pop();
    }
    render() {
        Stack.create({ alignContent: Alignment.TopStart });
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Row.create();
        Row.width("100%");
        Row.height("8%");
        Row.backgroundColor("#ffffbb33");
        Image.create($r('app.media.ic_more'));
        Image.objectFit(ImageFit.Contain);
        Image.width("10%");
        Image.height("65%");
        Image.margin({ left: 16, right: 20 });
        Image.onClick((event?: ClickEvent) => {
            let that = this;
            this.backOffset = -1;
            let intervalID = setInterval(() => {
                that.backOffset += 0.1;
            }, 40);
            let timeoutID = setTimeout(() => {
                clearInterval(intervalID);
                that.backOffset = 0;
            }, 400);
            this.isVisibility = Visibility.Visible;
        });
        Text.create("Misc. Over-Scroll Demo");
        Text.fontSize(38);
        Text.maxLines(1);
        Text.fontColor(Color.White);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.width("80%");
        Text.pop();
        Row.pop();
        Text.create(this.timer);
        Text.visibility(Visibility.None);
        Text.pop();
        Flex.pop();
        Stack.create({ alignContent: Alignment.TopStart });
        Stack.width("100%");
        Stack.height("100%");
        Stack.visibility(this.isVisibility);
        Flex.create();
        Flex.width("100%");
        Flex.height("100%");
        Flex.backgroundColor(Color.Black);
        Flex.opacity(0.5 + this.backOffset * 0.3);
        Flex.onClick((event?: ClickEvent) => {
            let that = this;
            let intervalID = setInterval(() => {
                that.backOffset -= 0.1;
            }, 40);
            let timeoutID = setTimeout(() => {
                clearInterval(intervalID);
                that.backOffset = 0;
                that.isVisibility = Visibility.None;
            }, 400);
        });
        Flex.pop();
        Flex.create();
        Flex.offset({ x: this.backOffset * 500, y: 0 });
        let earlierCreatedChild_2: SideBar = (this && this.findChildById) ? this.findChildById("2") as SideBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new SideBar("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Flex.pop();
        Stack.pop();
        Stack.pop();
    }
}
loadDocument(new MiscViewsDemo("1", undefined, {}));
