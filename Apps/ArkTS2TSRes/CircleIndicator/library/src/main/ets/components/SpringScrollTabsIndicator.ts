interface SpringScrollTabsIndicator_Params {
    model?: SpringScrollTabsModel;
    itemIndex?: number;
    titles?: Array<string | number>;
    scroller?: Scroller;
    lastIndex?: number;
    startX?: number;
    indicatorOffset?: number;
    timeoutId?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SpringScrollTabsIndicator_" + ++__generate__Id;
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
import { SpringScrollTabsModel } from '../models/SpringScrollTabsModel';
class SpringScrollTabsIndicator extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new SpringScrollTabsModel(null), this, "model");
        this.__itemIndex = new SynchedPropertySimpleTwoWay(params.itemIndex, this, "itemIndex");
        this.__titles = new ObservedPropertyObject([], this, "titles");
        this.scroller = new Scroller();
        this.lastIndex = 0;
        this.startX = 0;
        this.__indicatorOffset = new ObservedPropertySimple(0, this, "indicatorOffset");
        this.timeoutId = -1;
        this.updateWithValueParams(params);
        this.declareWatch("itemIndex", this.itemIndexChange);
    }
    updateWithValueParams(params: SpringScrollTabsIndicator_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.titles !== undefined) {
            this.titles = params.titles;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.lastIndex !== undefined) {
            this.lastIndex = params.lastIndex;
        }
        if (params.startX !== undefined) {
            this.startX = params.startX;
        }
        if (params.indicatorOffset !== undefined) {
            this.indicatorOffset = params.indicatorOffset;
        }
        if (params.timeoutId !== undefined) {
            this.timeoutId = params.timeoutId;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__itemIndex.aboutToBeDeleted();
        this.__titles.aboutToBeDeleted();
        this.__indicatorOffset.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<SpringScrollTabsModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: SpringScrollTabsModel) {
        this.__model.set(newValue);
    }
    private __itemIndex: SynchedPropertySimpleTwoWay<number>;
    get itemIndex() {
        return this.__itemIndex.get();
    }
    set itemIndex(newValue: number) {
        this.__itemIndex.set(newValue);
    }
    private __titles: ObservedPropertyObject<Array<string | number>>;
    get titles() {
        return this.__titles.get();
    }
    set titles(newValue: Array<string | number>) {
        this.__titles.set(newValue);
    }
    private scroller: Scroller;
    private lastIndex: number;
    private startX: number;
    private __indicatorOffset: ObservedPropertySimple<number>;
    get indicatorOffset() {
        return this.__indicatorOffset.get();
    }
    set indicatorOffset(newValue: number) {
        this.__indicatorOffset.set(newValue);
    }
    private timeoutId;
    itemIndexChange() {
        let itemIndex = this.itemIndex;
        this.model.getTabsController()?.changeIndex(itemIndex);
        let that = this;
        that.scroller.scrollTo({
            xOffset: ((-px2vp(this.model.getViewWidth()) / 2)) + that.scrollExtra(itemIndex) + this.computeTabsWidth() / 2,
            yOffset: 0,
            animation: { duration: 300, curve: Curve.Ease }
        });
        let index = this.lastIndex;
        that.indicatorOffset = -vp2px(that.scrollExtra(index) - that.scrollExtra(itemIndex));
        let intervalID = setInterval(() => {
            that.indicatorOffset += vp2px(that.scrollExtra(index) - that.scrollExtra(itemIndex)) / 10;
        }, 15);
        setTimeout(() => {
            that.indicatorOffset = 0;
            clearInterval(intervalID);
        }, 150);
        this.lastIndex = itemIndex;
        if (this.model.getChangeListener()) {
            this.model.getChangeListener()(this.itemIndex);
        }
    }
    TabItem(data: number | string, index: number, parent = null) {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.height("100%");
        Flex.onClick(() => {
            this.model.setClickChange(true);
            this.itemIndex = index;
        });
        Stack.create();
        Row.create();
        Row.border({ radius: 30 });
        Row.zIndex(10);
        Stack.create();
        Text.create(data + "");
        Text.fontSize(this.comFontSize(index, this.itemIndex));
        Text.fontColor(this.comFontColor(index, this.itemIndex));
        Text.width(this.computeTabsWidth());
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Stack.pop();
        Row.pop();
        Stack.pop();
        Flex.pop();
    }
    aboutToAppear() {
        this.model.setOnPageTouchListener((event: TouchEvent, currentIndex: number) => {
            this.onIndicatorTouch(event, currentIndex);
        });
    }
    render() {
        Stack.create({ alignContent: Alignment.Start });
        Stack.height(this.model.getHeight());
        Stack.width(this.model.getWidth());
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Horizontal);
        Scroll.align(Alignment.Start);
        Scroll.width('100%');
        Scroll.height('100%');
        Scroll.backgroundColor(this.model.getBackgroundColor());
        Stack.create({ alignContent: Alignment.Start });
        Row.create();
        Row.zIndex(10);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.titles), (item: string, idx: number) => {
            this.TabItem(item, idx, this);
        }, (item: string) => item);
        ForEach.pop();
        Row.pop();
        If.create();
        if (this.model.getHeight()) {
            If.branchId(0);
            Stack.create({ alignContent: Alignment.Center });
            Stack.height(this.model.getHeight());
            Stack.width(this.computeWidth(this.itemIndex));
            Stack.offset({
                y: 0,
                x: (this.scrollExtra(this.itemIndex)) - (this.computeWidth(this.itemIndex)) / 2 + this.computeTabsWidth() / 2
            });
            Path.create();
            Path.width("100%");
            Path.height("100%");
            Path.commands("M" + vp2px(this.computeWidth(this.itemIndex) - this.model.getHeight() / 2) + " " + vp2px(this.model.getHeight() / 2) +
                " L" + vp2px(this.computeWidth(this.itemIndex) - this.model.getHeight() / 2) + " " + vp2px(this.model.getHeight() / 2 - this.comBelzierCircle(this.itemIndex, false) / 2) +
                " Q" + vp2px(this.computeWidth(this.itemIndex) / 2) + " " + vp2px(this.model.getHeight() / 2) + " " + vp2px(this.model.getHeight() / 2) + " " + vp2px(this.model.getHeight() / 2 - this.comBelzierCircle(this.itemIndex, true) / 2) +
                " L" + vp2px(this.model.getHeight() / 2) + " " + vp2px(this.model.getHeight() / 2 + this.comBelzierCircle(this.itemIndex, true) / 2) +
                " Q" + vp2px(this.computeWidth(this.itemIndex) / 2) + " " + vp2px(this.model.getHeight() / 2) + " " + vp2px(this.computeWidth(this.itemIndex) - this.model.getHeight() / 2) + " " + vp2px(this.model.getHeight() / 2 + this.comBelzierCircle(this.itemIndex, false) / 2) + " Z");
            Path.fill(this.model.getSpringColor());
            Circle.create({
                width: this.comBelzierCircle(this.itemIndex, true),
                height: this.comBelzierCircle(this.itemIndex, true)
            });
            Circle.markAnchor({ x: (this.computeWidth(this.itemIndex) - this.model.getHeight()) / 2, y: 0 });
            Circle.fill(this.model.getSpringColor());
            Circle.create({
                width: this.comBelzierCircle(this.itemIndex, false),
                height: this.comBelzierCircle(this.itemIndex, false)
            });
            Circle.markAnchor({ x: -(this.computeWidth(this.itemIndex) - this.model.getHeight()) / 2, y: 0 });
            Circle.fill(this.model.getSpringColor());
            Stack.pop();
        }
        If.pop();
        Stack.pop();
        Scroll.pop();
        Stack.pop();
    }
    onIndicatorTouch(event: TouchEvent, itemIndex: number) {
        let startX = this.startX;
        let offset = 0;
        if (event.type === TouchType.Down) {
            this.startX = event.touches[0].x;
        }
        if (event.type === TouchType.Move) {
            offset = event.touches[0].x - startX;
            if ((offset >= 0 && itemIndex > 0) || (offset <= 0 && itemIndex < this.titles.length - 1)) {
                this.indicatorOffset = offset;
            }
            let width = 0;
            this.scroller.scrollTo({
                xOffset: (-px2vp(this.model.getViewWidth()) / 2) + this.scrollExtra(itemIndex) + width + this.computeTabsWidth() / 2,
                yOffset: 0
            });
        }
        if (event.type === TouchType.Up) {
            setTimeout(() => {
                offset = 0;
                this.indicatorOffset = offset;
            }, 750);
        }
    }
    computeTabsWidth() {
        let tabWidth = 0;
        if (this.titles.length >= 5) {
            tabWidth = px2vp(this.model.getViewWidth() / 5);
        }
        else if (this.titles.length > 0 && this.titles.length < 5) {
            tabWidth = px2vp(this.model.getViewWidth() / this.titles.length);
        }
        return tabWidth;
    }
    scrollExtra(index: number) {
        let sum = 0;
        for (let i = 0; i < index; i++) {
            sum += this.computeTabsWidth();
        }
        if (this.indicatorOffset > 0 && index > 0) {
            sum -= this.indicatorOffset / this.model.getViewWidth() * (2 * this.computeTabsWidth()) / 2;
        }
        else if (this.indicatorOffset < 0 && index < this.titles.length - 1) {
            sum -= this.indicatorOffset / this.model.getViewWidth() * (2 * this.computeTabsWidth()) / 2;
        }
        return sum;
    }
    computeWidth(itemIndex: number, onOffset: boolean = false) {
        let width = 0;
        width = this.model.getHeight();
        if (this.indicatorOffset > 0 && itemIndex > 0) {
            width = (1 / 2 - Math.abs(this.indicatorOffset / this.model.getViewWidth() - 1 / 2)) * 2 * this.computeTabsWidth() + this.model.getHeight();
        }
        else if (this.indicatorOffset < 0 && itemIndex < this.titles.length - 1) {
            width = (1 / 2 - Math.abs(this.indicatorOffset / this.model.getViewWidth() + 1 / 2)) * 2 * this.computeTabsWidth() + this.model.getHeight();
        }
        return width;
    }
    comBelzierCircle(itemIndex: number, isLeft: boolean) {
        let radiusOffset = Math.abs(this.model.getMaxRadiusPercent() - this.model.getMinRadiusPercent());
        if (itemIndex > 0 && this.indicatorOffset > 0) {
            if (isLeft) {
                return ((this.indicatorOffset / this.model.getViewWidth()) * radiusOffset) * this.model.getHeight() + this.model.getMinRadiusPercent() * this.model.getHeight();
            }
            else {
                return this.model.getMaxRadiusPercent() * this.model.getHeight() - (this.indicatorOffset / this.model.getViewWidth() * radiusOffset) * this.model.getHeight(); //圆角系数   2
            }
        }
        else if (itemIndex < this.titles.length - 1 && this.indicatorOffset < 0) {
            if (isLeft) {
                return this.model.getMaxRadiusPercent() * this.model.getHeight() - (-this.indicatorOffset / this.model.getViewWidth() * radiusOffset) * this.model.getHeight(); //圆角系数   2
            }
            else {
                return ((-this.indicatorOffset / this.model.getViewWidth()) * radiusOffset) * this.model.getHeight() + this.model.getMinRadiusPercent() * this.model.getHeight();
            }
        }
        return this.model.getMaxRadiusPercent() * this.model.getHeight();
    }
    comFontColor(index: number, itemIndex: number): string {
        if (this.model.getSelectedTextColor()) {
            if (index == itemIndex) {
                if ((itemIndex > 0 && this.indicatorOffset > 0) || itemIndex < this.titles.length - 1 && this.indicatorOffset < 0) {
                    return this.comHalfFontColor(Math.abs(this.indicatorOffset) / this.model.getViewWidth());
                }
                return this.model.getSelectedTextColor();
            }
            else if (itemIndex > 0 && index == itemIndex - 1 && this.indicatorOffset > 0) {
                return this.comHalfFontColor(1 - Math.abs(this.indicatorOffset) / this.model.getViewWidth());
            }
            else if (itemIndex < this.titles.length - 1 && index == itemIndex + 1 && this.indicatorOffset < 0) {
                return this.comHalfFontColor(1 - Math.abs(this.indicatorOffset) / this.model.getViewWidth());
            }
        }
        return this.model.getUnselectTextColor();
    }
    comHalfFontColor(offset: number): string {
        let selectedTextColor = this.model.getSelectedTextColor()
            .substring(this.model.getSelectedTextColor().indexOf("#") + 1);
        let textColor = this.model.getUnselectTextColor().substring(this.model.getUnselectTextColor().indexOf("#") + 1);
        let halfFontColor = '';
        halfFontColor = "#";
        for (let i = 0; i < 3; i++) {
            let a = Math.floor(Number.parseInt("0x" + selectedTextColor.substring(i * 2, i * 2 + 2)) * (1 - offset) + Number.parseInt("0x" + textColor.substring(i * 2, i * 2 + 2)) * offset)
                .toString(16);
            halfFontColor += a.length == 2 ? a : "0" + a;
        }
        return halfFontColor;
    }
    comFontSize(index: number, itemIndex: number): number {
        if (this.model.getSelectedTextSize()) {
            if (index == itemIndex) {
                if (((itemIndex > 0 && this.indicatorOffset > 0) || itemIndex < this.titles.length - 1 && this.indicatorOffset < 0)) {
                    return Math.abs(this.indicatorOffset) / this.model.getViewWidth() * this.model.getUnselectTextSize() + (1 - Math.abs(this.indicatorOffset) / this.model.getViewWidth()) * this.model.getSelectedTextSize();
                }
                return this.model.getSelectedTextSize();
            }
            else if (itemIndex > 0 && index == itemIndex - 1 && this.indicatorOffset > 0) {
                return Math.abs(this.indicatorOffset) / this.model.getViewWidth() * this.model.getSelectedTextSize() + (1 - Math.abs(this.indicatorOffset) / this.model.getViewWidth()) * this.model.getUnselectTextSize();
            }
            else if (itemIndex < this.titles.length - 1 && index == itemIndex + 1 && this.indicatorOffset < 0) {
                return Math.abs(this.indicatorOffset) / this.model.getViewWidth() * this.model.getSelectedTextSize() + (1 - Math.abs(this.indicatorOffset) / this.model.getViewWidth()) * this.model.getUnselectTextSize();
            }
        }
        return this.model.getUnselectTextSize();
    }
}
export default SpringScrollTabsIndicator;
