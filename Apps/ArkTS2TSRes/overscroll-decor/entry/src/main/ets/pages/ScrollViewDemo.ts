interface ScrollViewDemo_Params {
    scroller?: Scroller;
    verticalScrollView?: OverScrollDecor.Model;
    horizontalScrollView?: OverScrollDecor.Model;
    isVisibility?: Visibility;
    backOffset?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ScrollViewDemo_" + ++__generate__Id;
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
class ScrollViewDemo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.__verticalScrollView = new ObservedPropertyObject(new OverScrollDecor.Model(), this, "verticalScrollView");
        this.__horizontalScrollView = new ObservedPropertyObject(new OverScrollDecor.Model(), this, "horizontalScrollView");
        this.__isVisibility = new ObservedPropertySimple(Visibility.None, this, "isVisibility");
        this.__backOffset = new ObservedPropertySimple(0, this, "backOffset");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ScrollViewDemo_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.verticalScrollView !== undefined) {
            this.verticalScrollView = params.verticalScrollView;
        }
        if (params.horizontalScrollView !== undefined) {
            this.horizontalScrollView = params.horizontalScrollView;
        }
        if (params.isVisibility !== undefined) {
            this.isVisibility = params.isVisibility;
        }
        if (params.backOffset !== undefined) {
            this.backOffset = params.backOffset;
        }
    }
    aboutToBeDeleted() {
        this.__verticalScrollView.aboutToBeDeleted();
        this.__horizontalScrollView.aboutToBeDeleted();
        this.__isVisibility.aboutToBeDeleted();
        this.__backOffset.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller;
    private __verticalScrollView: ObservedPropertyObject<OverScrollDecor.Model>;
    get verticalScrollView() {
        return this.__verticalScrollView.get();
    }
    set verticalScrollView(newValue: OverScrollDecor.Model) {
        this.__verticalScrollView.set(newValue);
    }
    private __horizontalScrollView: ObservedPropertyObject<OverScrollDecor.Model>;
    get horizontalScrollView() {
        return this.__horizontalScrollView.get();
    }
    set horizontalScrollView(newValue: OverScrollDecor.Model) {
        this.__horizontalScrollView.set(newValue);
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
        this.horizontalScrollView
            .setUpOverScroll(true)
            .setOrientation(OverScrollDecor.ORIENTATION.HORIZONTAL)
            .setOverScrollBounceEffect(true)
            .setScrollBar(true)
            .setWidth("100%")
            .setHeight("27%");
        this.verticalScrollView
            .setUpOverScroll(true)
            .setOrientation(OverScrollDecor.ORIENTATION.VERTICAL)
            .setOverScrollBounceEffect(true)
            .setScrollBar(true)
            .setWidth("100%")
            .setHeight("51%");
    }
    scrollViewVerticalItem(parent = null) {
        Row.create({ space: 20 });
        Image.create($r('app.media.image'));
        Image.objectFit(ImageFit.Contain);
        Image.width("20%");
        Image.height(100);
        Text.create("EverythingMe");
        Text.fontSize(31);
        Text.fontColor("#A9A9A9");
        Text.pop();
        Row.pop();
    }
    scrollViewVertical(parent = null) {
        Flex.create({ direction: FlexDirection.Column });
        Column.create({ space: 20 });
        Column.alignItems(HorizontalAlign.Start);
        Column.width("100%");
        this.scrollViewVerticalItem(this);
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
        Flex.pop();
    }
    scrollViewHorizontalItem(parent = null) {
        Column.create({ space: 20 });
        Image.create($r('app.media.image'));
        Image.objectFit(ImageFit.Contain);
        Image.width("20%");
        Image.height("42%");
        Text.create("EverythingMe");
        Text.fontSize(28);
        Text.fontColor("#A9A9A9");
        Text.pop();
        Column.pop();
    }
    scrollViewHorizontal(parent = null) {
        Flex.create({ direction: FlexDirection.Column });
        Row.create({ space: 20 });
        this.scrollViewHorizontalItem(this);
        this.scrollViewHorizontalItem(this);
        this.scrollViewHorizontalItem(this);
        this.scrollViewHorizontalItem(this);
        this.scrollViewHorizontalItem(this);
        this.scrollViewHorizontalItem(this);
        this.scrollViewHorizontalItem(this);
        this.scrollViewHorizontalItem(this);
        this.scrollViewHorizontalItem(this);
        this.scrollViewHorizontalItem(this);
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
        Text.create("ScrollView Over-Scroll Demo");
        Text.fontSize(38);
        Text.maxLines(1);
        Text.fontColor(Color.White);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.width("80%");
        Text.pop();
        Row.pop();
        Text.create("⇔ Drag Horizontally");
        Text.textAlign(TextAlign.Center);
        Text.fontSize(35);
        Text.width('100%');
        Text.height("7%");
        Text.fontColor("#727171");
        Text.pop();
        Text.create("⇳ Drag Vertically");
        Text.textAlign(TextAlign.Center);
        Text.fontSize(35);
        Text.width('100%');
        Text.height("7%");
        Text.fontColor("#727171");
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
loadDocument(new ScrollViewDemo("1", undefined, {}));
