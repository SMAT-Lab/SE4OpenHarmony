interface NestedScrollViewDemo_Params {
    textView?: OverScrollDecor.Model;
    scrollView?: OverScrollDecor.Model;
    isVisibility?: Visibility;
    backOffset?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "NestedScrollViewDemo_" + ++__generate__Id;
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
class NestedScrollViewDemo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__textView = new ObservedPropertyObject(new OverScrollDecor.Model(), this, "textView");
        this.__scrollView = new ObservedPropertyObject(new OverScrollDecor.Model(), this, "scrollView");
        this.__isVisibility = new ObservedPropertySimple(Visibility.None, this, "isVisibility");
        this.__backOffset = new ObservedPropertySimple(0, this, "backOffset");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: NestedScrollViewDemo_Params) {
        if (params.textView !== undefined) {
            this.textView = params.textView;
        }
        if (params.scrollView !== undefined) {
            this.scrollView = params.scrollView;
        }
        if (params.isVisibility !== undefined) {
            this.isVisibility = params.isVisibility;
        }
        if (params.backOffset !== undefined) {
            this.backOffset = params.backOffset;
        }
    }
    aboutToBeDeleted() {
        this.__textView.aboutToBeDeleted();
        this.__scrollView.aboutToBeDeleted();
        this.__isVisibility.aboutToBeDeleted();
        this.__backOffset.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __textView: ObservedPropertyObject<OverScrollDecor.Model>;
    get textView() {
        return this.__textView.get();
    }
    set textView(newValue: OverScrollDecor.Model) {
        this.__textView.set(newValue);
    }
    private __scrollView: ObservedPropertyObject<OverScrollDecor.Model>;
    get scrollView() {
        return this.__scrollView.get();
    }
    set scrollView(newValue: OverScrollDecor.Model) {
        this.__scrollView.set(newValue);
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
    aboutToAppear() {
        this.textView
            .setUpOverScroll(true)
            .setOrientation(OverScrollDecor.ORIENTATION.VERTICAL)
            .setOverScrollBounceEffect(false)
            .setScrollBar(false)
            .setWidth("100%")
            .setHeight("30%")
            .setMargin(16);
        this.scrollView
            .setUpOverScroll(true)
            .setOrientation(OverScrollDecor.ORIENTATION.VERTICAL)
            .setOverScrollBounceEffect(true)
            .setScrollBar(false)
            .setWidth("100%")
            .setHeight("92%");
    }
    scrollViewVerticalItem(parent = null) {
        Row.create({ space: 20 });
        Image.create($r('app.media.image'));
        Image.objectFit(ImageFit.Contain);
        Image.width("20%");
        Image.height("13%");
        Text.create("EverythingMe");
        Text.fontSize(31);
        Text.fontColor("#A9A9A9");
        Text.pop();
        Row.pop();
    }
    textViewScroll(parent = null) {
        Column.create();
        Column.width("100%");
        Text.create("This text box is scrollable thanks to being situated inside a nested scroll view. That makes it scrollable regardless of the scrolling of the content of the entire screen, which can be scrolled independently.\nThe point here is to demonstrate how the over-scroll effect can work in the presence of nested scroll-views, provided it is applied over the parent (root) view, regardless of having inner nested scroll-views as children.\nIn this demo, the root view is merely a ScrollView, and therefore applying the effect over it is straightforward (i.e. using the OverScrollHelper).");
        Text.fontSize(40);
        Text.fontWeight(600);
        Text.fontColor("#727171");
        Text.pop();
        Column.pop();
    }
    SpecificChild(parent = null) {
        Column.create({ space: 20 });
        Column.width('100%');
        this.scrollViewVerticalItem(this);
        this.scrollViewVerticalItem(this);
        this.scrollViewVerticalItem(this);
        this.scrollViewVerticalItem(this);
        this.scrollViewVerticalItem(this);
        this.scrollViewVerticalItem(this);
        this.scrollViewVerticalItem(this);
        this.scrollViewVerticalItem(this);
        this.scrollViewVerticalItem(this);
        Column.pop();
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
        Text.create("NestedScrollView Over-Scroll Demo");
        Text.fontSize(38);
        Text.maxLines(1);
        Text.fontColor(Color.White);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.width("80%");
        Text.pop();
        Row.pop();
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
loadDocument(new NestedScrollViewDemo("1", undefined, {}));
