interface ViewPagerDemo_Params {
    color?: Array<string>;
    colorName?: Array<string>;
    controller?: TabsController;
    itemIndex?: number;
    model?: OverScrollDecor.Model;
    isVisibility?: Visibility;
    backOffset?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ViewPagerDemo_" + ++__generate__Id;
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
import { OverScrollDecor, ViewPagerOverScroll } from '@ohos/overscroll-decor';
import SideBar from "./SideBar";
class ViewPagerDemo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.color = ["#ffaa66cc", "#ff0099cc", "#ff33b5e5", "#00e0e0", "#ff669900", "#ff99cc00",
            "#f0e000", "#ffffbb33", "#ffff8800", "#ffff4444", "#ffcc0000"];
        this.colorName = ["PURPLE", "BLUE", "LIGHT BLUE", "CYAN", "GREEN", "LIGHT GREEN",
            "YELLOW", "LIGHT ORANGE", "ORANGE", "LIGHT RED", "RED"];
        this.controller = new TabsController();
        this.itemIndex = 0;
        this.__model = new ObservedPropertyObject(new OverScrollDecor.Model(), this, "model");
        this.__isVisibility = new ObservedPropertySimple(Visibility.None, this, "isVisibility");
        this.__backOffset = new ObservedPropertySimple(0, this, "backOffset");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ViewPagerDemo_Params) {
        if (params.color !== undefined) {
            this.color = params.color;
        }
        if (params.colorName !== undefined) {
            this.colorName = params.colorName;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.itemIndex !== undefined) {
            this.itemIndex = params.itemIndex;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.isVisibility !== undefined) {
            this.isVisibility = params.isVisibility;
        }
        if (params.backOffset !== undefined) {
            this.backOffset = params.backOffset;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__isVisibility.aboutToBeDeleted();
        this.__backOffset.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private color: Array<string>;
    private colorName: Array<string>;
    private controller: TabsController;
    private itemIndex: number;
    private __model: ObservedPropertyObject<OverScrollDecor.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: OverScrollDecor.Model) {
        this.__model.set(newValue);
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
        this.model.setHeight("92%");
    }
    SquareText(index: number, parent = null) {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.height("100%");
        Flex.width("100%");
        Flex.backgroundColor(this.color[index]);
        Text.create(this.colorName[index]);
        Text.fontSize(28);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Flex.pop();
    }
    SpecificChild(parent = null) {
        Tabs.create({ index: this.itemIndex, controller: this.controller });
        Tabs.height("100%");
        Tabs.width("100%");
        Tabs.barWidth(0);
        Tabs.barHeight(0);
        Tabs.padding(16);
        TabContent.create();
        this.SquareText(0, this);
        TabContent.pop();
        TabContent.create();
        this.SquareText(1, this);
        TabContent.pop();
        TabContent.create();
        this.SquareText(2, this);
        TabContent.pop();
        TabContent.create();
        this.SquareText(3, this);
        TabContent.pop();
        TabContent.create();
        this.SquareText(4, this);
        TabContent.pop();
        TabContent.create();
        this.SquareText(5, this);
        TabContent.pop();
        TabContent.create();
        this.SquareText(6, this);
        TabContent.pop();
        TabContent.create();
        this.SquareText(7, this);
        TabContent.pop();
        TabContent.create();
        this.SquareText(8, this);
        TabContent.pop();
        TabContent.create();
        this.SquareText(9, this);
        TabContent.pop();
        TabContent.create();
        this.SquareText(10, this);
        TabContent.pop();
        Tabs.pop();
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
        Text.create("ViewPager Over-Scroll Demo");
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
loadDocument(new ViewPagerDemo("1", undefined, {}));
