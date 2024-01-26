interface MagicScrollTabsIndicator_Params {
    model?: MagicScrollTabsModel;
    index?: number;
    titles?: Array<string>;
    fixed?: boolean;
    indicatorOffset?: number;
    startX?;
    scroller?: Scroller;
    lastIndex?: number;
    computeEnd?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MagicScrollTabsIndicator_" + ++__generate__Id;
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
import ClipText from "./inner_components/clipText";
import ColorFlipText from "./inner_components/colorFlipText";
import ColorGradientText from "./inner_components/colorGradientText";
import DefaultText from "./inner_components/defaultText";
import ComputeTextWidth from "./inner_components/computeTextWidth";
import { MagicScrollTabsModel, TitleMode, CursorType, DividerWidthMode } from '../models/MagicScrollTabsModel';
class MagicScrollTabsIndicator extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new MagicScrollTabsModel(null), this, "model");
        this.__index = new SynchedPropertySimpleTwoWay(params.index, this, "index");
        this.__titles = new ObservedPropertyObject([], this, "titles");
        this.__fixed = new ObservedPropertySimple(false, this, "fixed");
        this.__indicatorOffset = new ObservedPropertySimple(0, this, "indicatorOffset");
        this.startX = 0;
        this.scroller = new Scroller();
        this.lastIndex = 0;
        this.__computeEnd = new ObservedPropertySimple(false, this, "computeEnd");
        this.updateWithValueParams(params);
        this.declareWatch("index", this.itemIndexChange);
    }
    updateWithValueParams(params: MagicScrollTabsIndicator_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.titles !== undefined) {
            this.titles = params.titles;
        }
        if (params.fixed !== undefined) {
            this.fixed = params.fixed;
        }
        if (params.indicatorOffset !== undefined) {
            this.indicatorOffset = params.indicatorOffset;
        }
        if (params.startX !== undefined) {
            this.startX = params.startX;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.lastIndex !== undefined) {
            this.lastIndex = params.lastIndex;
        }
        if (params.computeEnd !== undefined) {
            this.computeEnd = params.computeEnd;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        this.__titles.aboutToBeDeleted();
        this.__fixed.aboutToBeDeleted();
        this.__indicatorOffset.aboutToBeDeleted();
        this.__computeEnd.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<MagicScrollTabsModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: MagicScrollTabsModel) {
        this.__model.set(newValue);
    }
    private __index: SynchedPropertySimpleTwoWay<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private __titles: ObservedPropertyObject<Array<string>>;
    get titles() {
        return this.__titles.get();
    }
    set titles(newValue: Array<string>) {
        this.__titles.set(newValue);
    }
    private __fixed: ObservedPropertySimple<boolean>;
    get fixed() {
        return this.__fixed.get();
    }
    set fixed(newValue: boolean) {
        this.__fixed.set(newValue);
    }
    private __indicatorOffset: ObservedPropertySimple<number>;
    get indicatorOffset() {
        return this.__indicatorOffset.get();
    }
    set indicatorOffset(newValue: number) {
        this.__indicatorOffset.set(newValue);
    }
    private startX;
    private scroller: Scroller;
    private lastIndex: number;
    private __computeEnd: ObservedPropertySimple<boolean>;
    get computeEnd() {
        return this.__computeEnd.get();
    }
    set computeEnd(newValue: boolean) {
        this.__computeEnd.set(newValue);
    }
    onIndicatorTouch(event: TouchEvent, index: number) {
        let startX = this.startX;
        let offset = 0;
        if (event.type === TouchType.Down) {
            this.startX = event.touches[0].x;
        }
        if (event.type === TouchType.Move) {
            offset = event.touches[0].x - startX;
            if ((offset >= 0 && index > 0) || (offset <= 0 && index < this.titles.length - 1)) {
                this.indicatorOffset = offset;
            }
        }
        if (event.type === TouchType.Up) {
            offset = event.touches[0].x - startX;
            offset = 0;
            this.indicatorOffset = offset;
        }
        if (this.model.isFollowTouch() && this.computeEnd) {
            this.scroller.scrollTo({
                xOffset: (-px2vp(this.model.getViewWidth()) / 2) + this.model.getLeftPadding()
                    - px2vp(this.model.getViewWidth()) * (this.model.getScrollPivotX() - 0.5)
                    + this.scrollExtra(index),
                yOffset: 0
            });
        }
    }
    itemIndexChange() {
        if (this.model.isClickChange() && this.lastIndex == this.index) {
            return;
        }
        if (!this.computeEnd) {
            this.model.getTabsController()?.changeIndex(this.index);
            return;
        }
        let index = this.index;
        let that = this;
        let xOffset: number = that.scroller.currentOffset().xOffset;
        this.model.getTabsController()?.changeIndex(this.index);
        if (that.model.isEnablePivotScroll() && this.model.isFollowTouch()) {
            xOffset = (-px2vp(this.model.getViewWidth()) / 2) + this.model.getLeftPadding()
                - (that.model.getScrollPivotX() - 0.5) * px2vp(this.model.getViewWidth()) + that.scrollExtra(index);
        }
        else if (that.scroller.currentOffset().xOffset < this.model.getLeftPadding() + that.scrollExtra(index)
            + that.model.getTextModel().getTextWidthList()[index] / 2 - px2vp(that.model.getViewWidth())) {
            xOffset = this.model.getLeftPadding() + that.scrollExtra(index)
                + that.model.getTextModel().getTextWidthList()[index] / 2 - px2vp(that.model.getViewWidth());
        }
        else if (that.scroller.currentOffset().xOffset > this.model.getLeftPadding() + that.scrollExtra(index)
            - that.model.getTextModel().getTextWidthList()[index] / 2) {
            xOffset = this.model.getLeftPadding() + that.scrollExtra(index)
                - that.model.getTextModel().getTextWidthList()[index] / 2;
        }
        that.scroller.scrollTo({
            xOffset: xOffset,
            yOffset: 0,
            animation: { duration: that.model.isSmoothScroll() ? 300 : 0, curve: Curve.Linear }
        });
        if (this.model.isSkimOver() && this.model.isClickChange()) {
            let lastIndex = this.lastIndex;
            that.indicatorOffset = -vp2px(that.scrollExtra(lastIndex) - that.scrollExtra(index));
            let intervalID = setInterval(() => {
                that.indicatorOffset = that.indicatorOffset + vp2px(that.scrollExtra(lastIndex) - that.scrollExtra(index)) / 10;
            }, 15);
            setTimeout(() => {
                that.indicatorOffset = 0;
                clearInterval(intervalID);
            }, 150);
        }
        this.model.setClickChange(true);
        this.lastIndex = index;
        if (this.model.getChangeListener()) {
            this.model.getChangeListener()(this.index);
        }
    }
    aboutToAppear() {
        this.model.setOnPageTouchListener((event: TouchEvent, currentIndex: number) => {
            this.onIndicatorTouch(event, currentIndex);
        });
        if (!this.computeEnd) {
            this.model.getTextModel()
                .setFontSize(this.model.getUnselectedTextSize())
                .setTextList(this.model.getTitles())
                .setExtra(2 * this.model.getHorizontalPadding())
                .setComputeEndListener(() => {
                if (!this.computeEnd) {
                    this.computeEnd = true;
                }
            });
        }
    }
    TabItem(data: string, index: number, fixed: boolean = false, parent = null) {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.backgroundColor(this.model.isPinnedTabView()
            && this.fixed
            && !((this.indicatorOffset > 0 && this.index == 1) || (this.indicatorOffset < 0 && this.index == 0))
            && index == 0 ? this.model.getPinnedTabBgColor() : "#00000000");
        Flex.height("100%");
        Flex.onClick(() => {
            this.model.setClickChange(true);
            this.index = index;
            this.model.setClickChange(false);
            if (this.model.getClickListener()) {
                this.model.getClickListener()(this.index);
            }
        });
        Stack.create();
        Row.create();
        Row.padding({
            left: this.model.getHorizontalPadding(),
            right: this.model.getHorizontalPadding(),
            top: this.model.getVerticalPadding(),
            bottom: this.model.getVerticalPadding()
        });
        Row.border({ radius: this.model.getRoundRadius() });
        Row.backgroundColor((index == this.index && this.model.getFillColor()
            && (!this.computeEnd || (this.model.isPinnedTabView()
                && !((this.indicatorOffset > 0 && this.index == 1) || (this.indicatorOffset < 0 && this.index == 0))
                && this.index == 0) || (this.model.isAdjustMode() && this.model.getMaxNum() <= 4)))
            ? this.model.getFillColor() : "#00000000");
        If.create();
        if (this.model.getTitleMode() == TitleMode.DEFAULT) {
            If.branchId(0);
            let earlierCreatedChild_2: DefaultText = ((parent ? parent : this) && (parent ? parent : this).findChildById) ? (parent ? parent : this).findChildById(generateId()) as DefaultText : undefined;
            if (earlierCreatedChild_2 == undefined) {
                View.create(new DefaultText("MagicScrollTabsIndicator_" + __generate__Id, parent ? parent : this, { index: index, itemIndex: this.__index, model: this.model }));
            }
            else {
                earlierCreatedChild_2.updateWithValueParams({
                    index: index, model: this.model
                });
                View.create(earlierCreatedChild_2);
            }
        }
        else if (this.model.getTitleMode() == TitleMode.COLOR_FLIP) {
            If.branchId(1);
            let earlierCreatedChild_3: ColorFlipText = ((parent ? parent : this) && (parent ? parent : this).findChildById) ? (parent ? parent : this).findChildById(generateId()) as ColorFlipText : undefined;
            if (earlierCreatedChild_3 == undefined) {
                View.create(new ColorFlipText("MagicScrollTabsIndicator_" + __generate__Id, parent ? parent : this, { index: index, indicatorOffset: this.indicatorOffset, itemIndex: this.__index, model: this.model }));
            }
            else {
                earlierCreatedChild_3.updateWithValueParams({
                    index: index, indicatorOffset: this.indicatorOffset, model: this.model
                });
                View.create(earlierCreatedChild_3);
            }
        }
        else if (this.model.getTitleMode() == TitleMode.COLOR_GRADIENT) {
            If.branchId(2);
            let earlierCreatedChild_4: ColorGradientText = ((parent ? parent : this) && (parent ? parent : this).findChildById) ? (parent ? parent : this).findChildById(generateId()) as ColorGradientText : undefined;
            if (earlierCreatedChild_4 == undefined) {
                View.create(new ColorGradientText("MagicScrollTabsIndicator_" + __generate__Id, parent ? parent : this, { index: index, indicatorOffset: this.indicatorOffset, itemIndex: this.__index, model: this.model }));
            }
            else {
                earlierCreatedChild_4.updateWithValueParams({
                    index: index, indicatorOffset: this.indicatorOffset, model: this.model
                });
                View.create(earlierCreatedChild_4);
            }
        }
        else if (this.model.getTitleMode() == TitleMode.CLIP) {
            If.branchId(3);
            let earlierCreatedChild_5: ClipText = ((parent ? parent : this) && (parent ? parent : this).findChildById) ? (parent ? parent : this).findChildById(generateId()) as ClipText : undefined;
            if (earlierCreatedChild_5 == undefined) {
                View.create(new ClipText("MagicScrollTabsIndicator_" + __generate__Id, parent ? parent : this, { index: index, indicatorOffset: this.indicatorOffset, itemIndex: this.__index, model: this.model }));
            }
            else {
                earlierCreatedChild_5.updateWithValueParams({
                    index: index, indicatorOffset: this.indicatorOffset, model: this.model
                });
                View.create(earlierCreatedChild_5);
            }
        }
        If.pop();
        Row.pop();
        If.create();
        if (index == this.index && !this.computeEnd) {
            If.branchId(0);
            If.create();
            if (this.model.getCursorType() == CursorType.BEZIER) {
                If.branchId(0);
                Circle.create({
                    width: this.model.getMaxCircleRadius(),
                    height: this.model.getMaxCircleRadius()
                });
                Circle.offset({
                    y: this.model.getYOffset() * 40 + "%"
                });
                Circle.fill(this.comLineColor(this.index));
                Circle.zIndex(this.model.isIndicatorOnTop() ? 1 : -1);
            }
            else if (this.model.getCursorType() == CursorType.LINE) {
                If.branchId(1);
                Divider.create();
                Divider.vertical(false);
                Divider.strokeWidth(this.model.getStrokeWidth());
                Divider.color(this.comLineColor(this.index));
                Divider.width(this.model.getDividerWidthMode() == DividerWidthMode.MODE_MATCH_EDGE
                    ? "100%" : (this.model.getDividerWidthMode() == DividerWidthMode.MODE_WRAP_CONTENT
                    ? "80%" : this.model.getDividerWidth()));
                Divider.offset({
                    y: this.model.getYOffset() * 40 + "%"
                });
                Divider.lineCap(this.model.isLineRound() ? LineCapStyle.Round : LineCapStyle.Square);
                Divider.zIndex(this.model.isIndicatorOnTop() ? 1 : -1);
            }
            else if (this.model.getCursorType() == CursorType.TRIANGLE) {
                If.branchId(2);
                Stack.create({ alignContent: this.model.isReverse() ? Alignment.Top : Alignment.Bottom });
                Stack.width(this.model.getTriangleWidth());
                Stack.height("100%");
                Stack.offset({ y: (this.model.getYOffset() - 1 + (this.model.isReverse() ? -0.25 : 0.25)) * 100 + "%", x: 0 });
                Stack.enabled(false);
                Stack.zIndex(this.model.isIndicatorOnTop() ? 1 : -1);
                Polygon.create({ width: this.model.getTriangleWidth(), height: this.model.getTriangleHeight() });
                Polygon.points(this.model.isReverse()
                    ? [[0, 0], [this.model.getTriangleWidth() / 2, this.model.getTriangleHeight()], [this.model.getTriangleWidth(), 0]]
                    : [
                        [0, this.model.getTriangleHeight()],
                        [this.model.getTriangleWidth() / 2, 0],
                        [this.model.getTriangleWidth(), this.model.getTriangleHeight()]
                    ]);
                Polygon.fill(this.model.getStrokeColor());
                Stack.pop();
            }
            If.pop();
        }
        If.pop();
        Stack.pop();
        Flex.pop();
    }
    render() {
        Stack.create({
            alignContent: Alignment.Start
        });
        Stack.height(this.model.getHeight());
        Stack.width(this.model.getWidth());
        Scroll.create(this.scroller);
        Scroll.onScroll((xOffset: number, yOffset: number) => {
            if (this.scroller.currentOffset().xOffset == 0) {
                this.fixed = false;
            }
            else {
                this.fixed = true;
            }
        });
        Scroll.scrollable(ScrollDirection.Horizontal);
        Scroll.align(Alignment.Start);
        Scroll.width('100%');
        Scroll.height('100%');
        Scroll.backgroundColor(this.model.getBackgroundColor());
        Scroll.scrollBar(BarState.Off);
        If.create();
        if (this.model.isAdjustMode() && this.model.getMaxNum() <= 4) {
            If.branchId(0);
            Flex.create({
                direction: FlexDirection.Row,
                justifyContent: FlexAlign.SpaceBetween,
                alignContent: FlexAlign.SpaceBetween
            });
            Flex.width("100%");
            ForEach.create("6", this, ObservedObject.GetRawObject(this.model.getTitles()), (item: string, idx: number) => {
                If.create();
                if (idx < this.model.getMaxNum()) {
                    If.branchId(0);
                    this.TabItem(item, idx, this);
                }
                If.pop();
            }, (item: string) => item);
            ForEach.pop();
            Flex.pop();
        }
        else {
            If.branchId(1);
            Stack.create({ alignContent: Alignment.Start });
            Row.create();
            If.create();
            if (this.model.getLeftPadding()) {
                If.branchId(0);
                Row.create();
                Row.width(this.model.getLeftPadding());
                Row.pop();
            }
            If.pop();
            ForEach.create("7", this, ObservedObject.GetRawObject(this.model.getTitles()), (item: string, idx: number) => {
                If.create();
                if (idx < this.model.getMaxNum()) {
                    If.branchId(0);
                    If.create();
                    if (idx > 0 && idx < this.model.getMaxNum()) {
                        If.branchId(0);
                        Flex.create();
                        Flex.width(this.model.getInterval());
                        Flex.pop();
                    }
                    If.pop();
                    this.TabItem(item, idx, this);
                }
                If.pop();
            }, (item: string) => item);
            ForEach.pop();
            If.create();
            if (this.model.getRightPadding()) {
                If.branchId(0);
                Row.create();
                Row.width(this.model.getRightPadding());
                Row.pop();
            }
            If.pop();
            Row.pop();
            If.create();
            if (this.computeEnd) {
                If.branchId(0);
                If.create();
                if (this.model.getCursorType() == CursorType.BEZIER) {
                    If.branchId(0);
                    // 贝塞尔线条指示器
                    Stack.create({ alignContent: Alignment.Center });
                    // 贝塞尔线条指示器
                    Stack.height(this.model.getMaxCircleRadius());
                    // 贝塞尔线条指示器
                    Stack.width(this.computeWidth(this.index));
                    // 贝塞尔线条指示器
                    Stack.offset({
                        y: this.model.getYOffset() * 40 + "%",
                        x: (this.indicatorScrollExtra(this.index) + this.model.getLeftPadding())
                    });
                    // 贝塞尔线条指示器
                    Stack.zIndex(this.model.isIndicatorOnTop() ? 1 : -1);
                    Path.create();
                    Path.width("100%");
                    Path.height("100%");
                    Path.commands("M" + vp2px(this.computeWidth(this.index) - this.model.getMaxCircleRadius() / 2)
                        + " " + vp2px(this.model.getMaxCircleRadius() / 2)
                        + " L" + vp2px(this.computeWidth(this.index) - this.model.getMaxCircleRadius() / 2)
                        + " " + vp2px(this.model.getMaxCircleRadius() / 2 - this.comBelzierCircle(this.index, false) / 2)
                        + " Q" + vp2px(this.computeWidth(this.index) / 2)
                        + " " + vp2px(this.model.getMaxCircleRadius() / 2)
                        + " " + vp2px(this.model.getMaxCircleRadius() / 2)
                        + " " + vp2px(this.model.getMaxCircleRadius() / 2 - this.comBelzierCircle(this.index, true) / 2)
                        + " L" + vp2px(this.model.getMaxCircleRadius() / 2)
                        + " " + vp2px(this.model.getMaxCircleRadius() / 2 + this.comBelzierCircle(this.index, true) / 2)
                        + " Q" + vp2px(this.computeWidth(this.index) / 2)
                        + " " + vp2px(this.model.getMaxCircleRadius() / 2)
                        + " " + vp2px(this.computeWidth(this.index) - this.model.getMaxCircleRadius() / 2)
                        + " " + vp2px(this.model.getMaxCircleRadius() / 2 + this.comBelzierCircle(this.index, false) / 2)
                        + " Z");
                    Path.fill(this.comLineColor(this.index));
                    Circle.create({
                        width: this.comBelzierCircle(this.index, true),
                        height: this.comBelzierCircle(this.index, true)
                    });
                    Circle.markAnchor({ x: (this.computeWidth(this.index) - this.model.getMaxCircleRadius()) / 2, y: 0 });
                    Circle.fill(this.comLineColor(this.index));
                    Circle.create({
                        width: this.comBelzierCircle(this.index, false),
                        height: this.comBelzierCircle(this.index, false)
                    });
                    Circle.markAnchor({
                        x: -(this.computeWidth(this.index) - this.model.getMaxCircleRadius()) / 2,
                        y: 0
                    });
                    Circle.fill(this.comLineColor(this.index));
                    // 贝塞尔线条指示器
                    Stack.pop();
                }
                else if (this.model.getCursorType() == CursorType.LINE) {
                    If.branchId(1);
                    // 线条指示器
                    Divider.create();
                    // 线条指示器
                    Divider.vertical(false);
                    // 线条指示器
                    Divider.strokeWidth(this.model.getStrokeWidth());
                    // 线条指示器
                    Divider.color(this.comLineColor(this.index));
                    // 线条指示器
                    Divider.width(this.computeWidth(this.index));
                    // 线条指示器
                    Divider.offset({
                        y: this.model.getYOffset() * 45 + "%",
                        x: (this.indicatorScrollExtra(this.index)) + this.model.getLeftPadding()
                    });
                    // 线条指示器
                    Divider.lineCap(this.model.isLineRound() ? LineCapStyle.Round : LineCapStyle.Square);
                    // 线条指示器
                    Divider.zIndex(this.model.isIndicatorOnTop() ? 1 : -1);
                }
                else if (this.model.getCursorType() == CursorType.TRIANGLE) {
                    If.branchId(2);
                    // 三角形指示器
                    Stack.create({ alignContent: this.model.isReverse() ? Alignment.Top : Alignment.Bottom });
                    // 三角形指示器
                    Stack.width(this.model.getTriangleWidth());
                    // 三角形指示器
                    Stack.height("100%");
                    // 三角形指示器
                    Stack.enabled(false);
                    // 三角形指示器
                    Stack.offset({
                        y: (this.model.getYOffset() - 1) * 100 + "%",
                        x: (this.scrollExtra(this.index)) - this.model.getTriangleWidth() / 2 + this.model.getLeftPadding()
                    });
                    // 三角形指示器
                    Stack.zIndex(this.model.isIndicatorOnTop() ? 1 : -1);
                    Polygon.create({ width: this.model.getTriangleWidth(), height: this.model.getTriangleHeight() });
                    Polygon.points(this.model.isReverse()
                        ? [[0, 0], [this.model.getTriangleWidth() / 2, this.model.getTriangleHeight()], [this.model.getTriangleWidth(), 0]]
                        : [
                            [0, this.model.getTriangleHeight()],
                            [this.model.getTriangleWidth() / 2, 0],
                            [this.model.getTriangleWidth(), this.model.getTriangleHeight()]
                        ]);
                    Polygon.fill(this.model.getStrokeColor());
                    // 三角形指示器
                    Stack.pop();
                }
                If.pop();
                If.create();
                // 胶囊状背景色
                if (this.model.getCursorType() == CursorType.WRAP) {
                    If.branchId(0);
                    Flex.create();
                    Flex.padding({ top: this.model.getVerticalPadding(), bottom: this.model.getVerticalPadding() });
                    Flex.width(this.computeWidth(this.index));
                    Flex.offset({
                        y: 0,
                        x: (this.indicatorScrollExtra(this.index) + this.model.getLeftPadding())
                    });
                    Flex.border({ radius: this.model.getRoundRadius() });
                    Flex.backgroundColor(this.model.getFillColor());
                    Flex.zIndex(this.model.isIndicatorOnTop() ? 1 : -1);
                    Text.create(" ");
                    Text.fontSize(this.model.getSelectedTextSize() ? this.model.getSelectedTextSize() : this.model.getUnselectedTextSize());
                    Text.opacity(0);
                    Text.pop();
                    Flex.pop();
                }
                If.pop();
            }
            If.pop();
            Stack.pop();
        }
        If.pop();
        Scroll.pop();
        If.create();
        if (this.model.isPinnedTabView() && this.fixed
            && !((this.indicatorOffset > 0 && this.index == 1) || (this.indicatorOffset > 0 && this.index == 0))) {
            If.branchId(0);
            this.TabItem(this.model.getTitles()[0], 0, this.fixed, this);
        }
        If.pop();
        let earlierCreatedChild_8: ComputeTextWidth = (this && this.findChildById) ? this.findChildById("8") as ComputeTextWidth : undefined;
        if (earlierCreatedChild_8 == undefined) {
            View.create(new ComputeTextWidth("8", this, { textModel: this.model.getTextModel() }));
        }
        else {
            earlierCreatedChild_8.updateWithValueParams({
                textModel: this.model.getTextModel()
            });
            View.create(earlierCreatedChild_8);
        }
        If.create();
        if (this.model.getCursorType() == CursorType.TRIANGLE) {
            If.branchId(0);
            // 下部线条，三角指示器
            Stack.create({ alignContent: this.model.isReverse() ? Alignment.Top : Alignment.Bottom });
            // 下部线条，三角指示器
            Stack.width("100%");
            // 下部线条，三角指示器
            Stack.height("100%");
            // 下部线条，三角指示器
            Stack.enabled(false);
            Divider.create();
            Divider.vertical(false);
            Divider.strokeWidth(this.model.getStrokeWidth());
            Divider.color(this.model.getStrokeColor());
            // 下部线条，三角指示器
            Stack.pop();
        }
        If.pop();
        Stack.pop();
    }
    // 计算滑动偏移
    scrollExtra(index: number, onOffset: boolean = false): number {
        let sum = 0;
        for (let i = 0; i < index; i++) {
            sum += this.model.getTextModel().getTextWidthList()[i] + this.model.getInterval();
        }
        if (this.model.getSelectedTextSize()) {
            sum += ((this.model.getTextModel().getTextWidthList()[index]
                - this.model.getTextModel()
                    .getExtra()) * this.model.getSelectedTextSize() / this.model.getUnselectedTextSize() + this.model.getHorizontalPadding() * 2) / 2;
        }
        else {
            sum += this.model.getTextModel().getTextWidthList()[index] / 2;
        }
        if (!onOffset) {
            if (this.indicatorOffset > 0 && this.indicatorOffset > 0 && index > 0) {
                sum -= this.indicatorOffset / this.model.getViewWidth()
                    * (this.model.getTextModel().getTextWidthList()[index] +
                        this.model.getTextModel().getTextWidthList()[index - 1] + 2 * this.model.getInterval()) / 2;
            }
            else if (this.indicatorOffset < 0 && index < this.titles.length - 1) {
                sum -= this.indicatorOffset / this.model.getViewWidth()
                    * (this.model.getTextModel().getTextWidthList()[index] +
                        this.model.getTextModel().getTextWidthList()[index + 1] + 2 * this.model.getInterval()) / 2;
            }
        }
        return sum;
    }
    indicatorScrollExtra(index: number): number {
        let sum = 0;
        sum = this.scrollExtra(index, true);
        let leftX = this.scrollExtra(index, true) - this.computeWidth1(index) / 2;
        let nextLeftX = 0;
        if (this.indicatorOffset > 0 && this.indicatorOffset > 0 && index > 0) {
            nextLeftX = this.scrollExtra(index - 1, true) - this.computeWidth1(index - 1) / 2;
            sum -= (leftX - nextLeftX) * (this.model.getRightCurve() ? this.model.getRightCurve()
                .interpolate(Math.abs(this.indicatorOffset / this.model.getViewWidth())) : Math.abs(this.indicatorOffset / this.model.getViewWidth()));
        }
        else if (this.indicatorOffset < 0 && index < this.titles.length - 1) {
            nextLeftX = this.scrollExtra(index + 1, true) - this.computeWidth1(index + 1) / 2;
            sum -= (leftX - nextLeftX) * (this.model.getLeftCurve() ? this.model.getLeftCurve()
                .interpolate(Math.abs(this.indicatorOffset / this.model.getViewWidth())) : Math.abs(this.indicatorOffset / this.model.getViewWidth()));
        }
        sum -= this.computeWidth1(index) / 2;
        return sum;
    }
    // 计算指示器宽度
    computeWidth1(index: number): number {
        let width = 0;
        if (this.model.getDividerWidthMode() == DividerWidthMode.MODE_EXACTLY) {
            width = this.model.getDividerWidth();
        }
        else {
            if (this.model.getSelectedTextSize()) {
                width = (this.model.getTextModel().getTextWidthList()[index]
                    - this.model.getTextModel()
                        .getExtra()) * this.model.getSelectedTextSize() / this.model.getUnselectedTextSize() + this.model.getHorizontalPadding() * 2;
            }
            else {
                width = this.model.getTextModel().getTextWidthList()[index];
            }
            if (this.model.getDividerWidthMode() == DividerWidthMode.MODE_WRAP_CONTENT) {
                width -= this.model.getHorizontalPadding() * 2;
            }
        }
        return width;
    }
    // 计算指示器宽度
    computeWidth(index: number): number {
        let leftX: number = 0;
        let nextLeftX: number = 0;
        let rightX: number = 0;
        let nextRightX: number = 0;
        let width = this.computeWidth1(index);
        leftX = this.scrollExtra(index, true) - this.computeWidth1(index) / 2;
        rightX = this.scrollExtra(index, true) + this.computeWidth1(index) / 2;
        if (this.indicatorOffset > 0 && index > 0) {
            nextLeftX = this.scrollExtra(index - 1, true) - this.computeWidth1(index - 1) / 2;
            nextRightX = this.scrollExtra(index - 1, true) + this.computeWidth1(index - 1) / 2;
            width += (leftX - nextLeftX) * (this.model.getRightCurve() ? this.model.getRightCurve()
                .interpolate(Math.abs(this.indicatorOffset / this.model.getViewWidth())) : Math.abs(this.indicatorOffset / this.model.getViewWidth()))
                - (rightX - nextRightX) * (this.model.getLeftCurve() ? this.model.getLeftCurve()
                    .interpolate(Math.abs(this.indicatorOffset / this.model.getViewWidth())) : Math.abs(this.indicatorOffset / this.model.getViewWidth()));
        }
        else if (this.indicatorOffset < 0 && index < this.titles.length - 1) {
            nextLeftX = this.scrollExtra(index + 1, true) - this.computeWidth1(index + 1) / 2;
            nextRightX = this.scrollExtra(index + 1, true) + this.computeWidth1(index + 1) / 2;
            width += (nextRightX - rightX) * (this.model.getRightCurve() ? this.model.getRightCurve()
                .interpolate(Math.abs(this.indicatorOffset / this.model.getViewWidth())) : Math.abs(this.indicatorOffset / this.model.getViewWidth()))
                - (nextLeftX - leftX) * (this.model.getLeftCurve() ? this.model.getLeftCurve()
                    .interpolate(Math.abs(this.indicatorOffset / this.model.getViewWidth())) : Math.abs(this.indicatorOffset / this.model.getViewWidth()));
        }
        return width;
    }
    // 计算贝塞尔线条两侧圆的直径
    comBelzierCircle(index: number, isLeft: boolean): number {
        if (index > 0 && this.indicatorOffset > 0) {
            if (isLeft) {
                return (this.indicatorOffset / this.model.getViewWidth()) * this.model.getMaxCircleRadius()
                    + (1 - this.indicatorOffset / this.model.getViewWidth()) * this.model.getMinCircleRadius();
            }
            else {
                return (this.indicatorOffset / this.model.getViewWidth()) * this.model.getMinCircleRadius()
                    + (1 - this.indicatorOffset / this.model.getViewWidth()) * this.model.getMaxCircleRadius();
            }
        }
        else if (index < this.titles.length - 1 && this.indicatorOffset < 0) {
            if (isLeft) {
                return (-this.indicatorOffset / this.model.getViewWidth()) * this.model.getMinCircleRadius()
                    + (1 + this.indicatorOffset / this.model.getViewWidth()) * this.model.getMaxCircleRadius();
            }
            else {
                return (-this.indicatorOffset / this.model.getViewWidth()) * this.model.getMaxCircleRadius()
                    + (1 + this.indicatorOffset / this.model.getViewWidth()) * this.model.getMinCircleRadius();
            }
        }
        return this.model.getMaxCircleRadius();
    }
    // 计算贝塞尔线条颜色
    comLineColor(index: number): ResourceColor {
        let selectedColor = this.model.getIndicatorColors()[index % this.model.getIndicatorColors().length];
        let nextColor: number | string = '';
        let offset = Math.abs(this.indicatorOffset / this.model.getViewWidth());
        if (index < this.titles.length - 1 && this.indicatorOffset < 0) {
            nextColor = this.model.getIndicatorColors()[(index + 1) % this.model.getIndicatorColors().length];
        }
        else if (index > 0 && this.indicatorOffset > 0) {
            nextColor = this.model.getIndicatorColors()[(index - 1) % this.model.getIndicatorColors().length];
        }
        else {
            return this.model.getIndicatorColors()[index % this.model.getIndicatorColors().length];
        }
        if (typeof selectedColor == "string") {
            selectedColor = selectedColor.substring(1);
            if (selectedColor.length == 6) {
                selectedColor = "ff" + selectedColor;
            }
            selectedColor = Number.parseInt("0x" + selectedColor);
        }
        else if (selectedColor < 0x01000000) {
            selectedColor += 0xff000000;
        }
        if (typeof nextColor == "string") {
            nextColor = nextColor.substring(1);
            if (nextColor.length == 6) {
                nextColor = "ff" + nextColor;
            }
            nextColor = Number.parseInt("0x" + nextColor);
        }
        else if (nextColor < 0x01000000) {
            nextColor += 0xff000000;
        }
        let halfFontColor = 0x0;
        for (let i = 0x0; i < 0x4; i++) {
            halfFontColor += Math.floor(Math.floor(selectedColor % (0x1 * (0x100 ** (i + 0x1))) / (0x1 * (0x100 ** i)))
                * (1 - offset) + Math.floor(nextColor % (0x1 * (0x100 ** (i + 0x1))) / (0x1 * (0x100 ** i))) * offset) * (0x100 ** i);
        }
        let halfColor = halfFontColor.toString(16);
        while (halfColor.length < 8) {
            halfColor = "0" + halfColor;
        }
        return "#" + halfColor;
    }
}
export default MagicScrollTabsIndicator;
