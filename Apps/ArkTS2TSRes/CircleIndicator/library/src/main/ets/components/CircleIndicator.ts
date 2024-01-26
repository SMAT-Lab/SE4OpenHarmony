interface CircleIndicator_Params {
    model?: CircleModel;
    itemIndex?: number;
    opacityValue?: number;
    scaleValue?: number;
    count?: number;
    arr?: number[];
    startX?: number;
    indicatorOffset?: number;
    upFlag?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CircleIndicator_" + ++__generate__Id;
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
import { CircleModel, Orientation } from '../models/CircleModel';
class CircleIndicator extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new CircleModel(null), this, "model");
        this.__itemIndex = new SynchedPropertySimpleTwoWay(params.itemIndex, this, "itemIndex");
        this.__opacityValue = new ObservedPropertySimple(0, this, "opacityValue");
        this.__scaleValue = new ObservedPropertySimple(0, this, "scaleValue");
        this.__count = new SynchedPropertySimpleTwoWay(params.count, this, "count");
        this.__arr = new ObservedPropertyObject([], this, "arr");
        this.startX = 0;
        this.__indicatorOffset = new ObservedPropertySimple(0, this, "indicatorOffset");
        this.upFlag = false;
        this.updateWithValueParams(params);
        this.declareWatch("count", this.onCountChange);
    }
    updateWithValueParams(params: CircleIndicator_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.opacityValue !== undefined) {
            this.opacityValue = params.opacityValue;
        }
        if (params.scaleValue !== undefined) {
            this.scaleValue = params.scaleValue;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.startX !== undefined) {
            this.startX = params.startX;
        }
        if (params.indicatorOffset !== undefined) {
            this.indicatorOffset = params.indicatorOffset;
        }
        if (params.upFlag !== undefined) {
            this.upFlag = params.upFlag;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__itemIndex.aboutToBeDeleted();
        this.__opacityValue.aboutToBeDeleted();
        this.__scaleValue.aboutToBeDeleted();
        this.__count.aboutToBeDeleted();
        this.__arr.aboutToBeDeleted();
        this.__indicatorOffset.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<CircleModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: CircleModel) {
        this.__model.set(newValue);
    }
    private __itemIndex: SynchedPropertySimpleTwoWay<number>;
    get itemIndex() {
        return this.__itemIndex.get();
    }
    set itemIndex(newValue: number) {
        this.__itemIndex.set(newValue);
    }
    private __opacityValue: ObservedPropertySimple<number>;
    get opacityValue() {
        return this.__opacityValue.get();
    }
    set opacityValue(newValue: number) {
        this.__opacityValue.set(newValue);
    }
    private __scaleValue: ObservedPropertySimple<number>;
    get scaleValue() {
        return this.__scaleValue.get();
    }
    set scaleValue(newValue: number) {
        this.__scaleValue.set(newValue);
    }
    private __count: SynchedPropertySimpleTwoWay<number>;
    get count() {
        return this.__count.get();
    }
    set count(newValue: number) {
        this.__count.set(newValue);
    }
    private __arr: ObservedPropertyObject<number[]>;
    get arr() {
        return this.__arr.get();
    }
    set arr(newValue: number[]) {
        this.__arr.set(newValue);
    }
    private startX: number;
    private __indicatorOffset: ObservedPropertySimple<number>;
    get indicatorOffset() {
        return this.__indicatorOffset.get();
    }
    set indicatorOffset(newValue: number) {
        this.__indicatorOffset.set(newValue);
    }
    private upFlag: boolean; //横向移动手势抬起标志
    onCountChange() {
        this.arr = Array.from(new Array(this.count).keys());
    }
    render() {
        If.create();
        if (this.model.getOrientation() == Orientation.HORIZONTAL) {
            If.branchId(0);
            Stack.create({ alignContent: Alignment.Start });
            Stack.backgroundColor(this.model.getBackgroundColor());
            Stack.width(this.model.getWidth());
            If.create();
            if (this.model.isBorderLines() == true) {
                If.branchId(0);
                If.create();
                if (this.model.isRectangle() == false) {
                    If.branchId(0);
                    Row.create({ space: this.model.getMargin() });
                    Row.height(this.model.getHeight());
                    ForEach.create("2", this, ObservedObject.GetRawObject(this.arr), (item: number) => {
                        Stack.create({ alignContent: Alignment.Center });
                        Circle.create();
                        Circle.height(this.model.getRadius() + 1);
                        Circle.width(this.model.getRadius() + 1);
                        Circle.fill(this.model.getStrokeColor());
                        Circle.create();
                        Circle.height(this.model.getRadius() - 1);
                        Circle.width(this.model.getRadius() - 1);
                        Circle.fill(this.model.getUnselectedColor());
                        Stack.pop();
                    }, (item: number) => JSON.stringify(item));
                    ForEach.pop();
                    Row.pop();
                }
                else {
                    If.branchId(1);
                    Row.create({ space: this.model.getMargin() });
                    Row.height(this.model.getHeight());
                    ForEach.create("3", this, ObservedObject.GetRawObject(this.arr), (item: number) => {
                        Stack.create({ alignContent: Alignment.Center });
                        Rect.create();
                        Rect.radius(this.model.getRectangleRadius());
                        Rect.height(this.model.getItemHeight() - this.model.getMargin());
                        Rect.width(this.model.getItemWidth() + this.model.getMargin());
                        Rect.fill(this.model.getStrokeColor());
                        Rect.opacity(0.5);
                        Rect.create();
                        Rect.radius(this.model.getRectangleRadius());
                        Rect.height(this.model.getItemHeight() - this.model.getMargin());
                        Rect.width(this.model.getItemWidth() - 8 + this.model.getMargin());
                        Rect.fill(this.model.getUnselectedColor());
                        Rect.opacity(0.5);
                        Stack.pop();
                    }, (item: number) => JSON.stringify(item));
                    ForEach.pop();
                    Row.pop();
                }
                If.pop();
            }
            else {
                If.branchId(1);
                If.create();
                if (this.model.isRectangle() == false) {
                    If.branchId(0);
                    Row.create({ space: this.model.getMargin() });
                    Row.height(this.model.getHeight());
                    ForEach.create("4", this, ObservedObject.GetRawObject(this.arr), (item: number) => {
                        Stack.create({ alignContent: Alignment.Center });
                        Circle.create();
                        Circle.height(this.model.getRadius() + 1);
                        Circle.width(this.model.getRadius() + 1);
                        Circle.fill(this.model.getUnselectedColor());
                        Stack.pop();
                    }, (item: number) => JSON.stringify(item));
                    ForEach.pop();
                    Row.pop();
                }
                else {
                    If.branchId(1);
                    Row.create({ space: this.model.getMargin() });
                    Row.height(this.model.getHeight());
                    If.create();
                    if (this.model.isRotate() == false) {
                        If.branchId(0);
                        ForEach.create("5", this, ObservedObject.GetRawObject(this.arr), (item: number) => {
                            Stack.create({ alignContent: Alignment.Center });
                            Rect.create();
                            Rect.radius(this.model.getRectangleRadius());
                            Rect.height(this.model.getItemHeight() - this.model.getMargin());
                            Rect.width(this.model.getItemWidth() + this.model.getMargin());
                            Rect.fill(this.model.getUnselectedColor());
                            Rect.opacity(0.5);
                            Stack.pop();
                        }, (item: number) => JSON.stringify(item));
                        ForEach.pop();
                    }
                    else {
                        If.branchId(1);
                        ForEach.create("6", this, ObservedObject.GetRawObject(this.arr), (item: number) => {
                        }, (item: number) => JSON.stringify(item));
                        ForEach.pop();
                    }
                    If.pop();
                    Row.pop();
                }
                If.pop();
            }
            If.pop();
            If.create();
            if (this.model.isRectangle() == false) {
                If.branchId(0);
                If.create();
                if (this.model.isBackgroundGradient() == true) {
                    If.branchId(0);
                    If.create();
                    if (this.model.isScale() == true) {
                        If.branchId(0);
                        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center
                        });
                        Flex.height(this.model.getRadius());
                        Flex.width(this.model.getRadius());
                        Flex.offset({
                            x: this.model.isSnap() ? ((this.model.getRadius() + this.model.getMargin() + 1) * (this.itemIndex - this.indicatorOffset / 1080)) + 0.5 : ((this.model.getRadius() + this.model.getMargin() + 1) * (this.itemIndex - 1)) + 0.5,
                            y: 0
                        });
                        Flex.visibility(this.upFlag ? Visibility.None : (this.indicatorOffset < 0 ? Visibility.None : Visibility.Visible));
                        Circle.create();
                        Circle.height(this.model.getRadius());
                        Circle.width(this.model.getRadius());
                        Circle.opacity(this.indicatorOffset / 950);
                        Circle.fill(this.indicatorOffset == 0 ? "#00000000" : this.model.getFillColor());
                        Circle.scale({ x: (this.indicatorOffset / 950) + 0.5, y: (this.indicatorOffset / 950) + 0.5 });
                        Flex.pop();
                        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center
                        });
                        Flex.height(this.model.getRadius());
                        Flex.width(this.model.getRadius());
                        Flex.offset({
                            x: this.model.isSnap() ? ((this.model.getRadius() + this.model.getMargin() + 1) * (this.itemIndex - this.indicatorOffset / 1080)) + 0.5 : ((this.model.getRadius() + this.model.getMargin() + 1) * (this.itemIndex)) + 0.5,
                            y: 0
                        });
                        Circle.create();
                        Circle.height(this.model.getRadius());
                        Circle.width(this.model.getRadius());
                        Circle.opacity(1 - (this.indicatorOffset / 950));
                        Circle.fill(this.model.getFillColor());
                        Circle.scale({
                            x: this.indicatorOffset / 950 < 0 ? ((1 - (-(this.indicatorOffset / 950))) + 0.5) : ((1 - ((this.indicatorOffset / 950))) + 0.5),
                            y: this.indicatorOffset / 950 < 0 ? ((1 - (-(this.indicatorOffset / 950))) + 0.5) : ((1 - ((this.indicatorOffset / 950))) + 0.5)
                        });
                        Flex.pop();
                        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center
                        });
                        Flex.height(this.model.getRadius());
                        Flex.width(this.model.getRadius());
                        Flex.offset({
                            x: this.model.isSnap() ? ((this.model.getRadius() + this.model.getMargin() + 1) * (this.itemIndex - this.indicatorOffset / 1080)) + 0.5 : ((this.model.getRadius() + this.model.getMargin() + 1) * (this.itemIndex + 1)) + 0.5,
                            y: 0
                        });
                        Flex.visibility(this.upFlag ? Visibility.None : (this.indicatorOffset > 0 ? Visibility.None : Visibility.Visible));
                        Circle.create();
                        Circle.height(this.model.getRadius());
                        Circle.width(this.model.getRadius());
                        Circle.opacity(-(this.indicatorOffset / 950));
                        Circle.fill(this.indicatorOffset == 0 ? "#00ffffff" : this.model.getFillColor());
                        Circle.scale({ x: (-(this.indicatorOffset / 950)) + 0.5, y: (-(this.indicatorOffset / 950)) + 0.5 });
                        Flex.pop();
                    }
                    else { //设置了背景没有设置缩放
                        If.branchId(1);
                        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center
                        });
                        Flex.height(this.model.getRadius());
                        Flex.width(this.model.getRadius());
                        Flex.offset({
                            x: this.model.isSnap() ? ((this.model.getRadius() + this.model.getMargin() + 1) * (this.itemIndex - this.indicatorOffset / 1080)) + 0.5 : ((this.model.getRadius() + this.model.getMargin() + 1) * (this.itemIndex - 1)) + 0.5,
                            y: 0
                        });
                        Circle.create();
                        Circle.height(this.model.getRadius());
                        Circle.width(this.model.getRadius());
                        Circle.opacity(this.indicatorOffset / 950);
                        Circle.fill(this.indicatorOffset == 0 ? "#00000000" : this.model.getFillColor());
                        Flex.pop();
                        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center
                        });
                        Flex.height(this.model.getRadius());
                        Flex.width(this.model.getRadius());
                        Flex.offset({
                            x: this.model.isSnap() ? ((this.model.getRadius() + this.model.getMargin() + 1) * (this.itemIndex - this.indicatorOffset / 1080)) + 0.5 : ((this.model.getRadius() + this.model.getMargin() + 1) * (this.itemIndex)) + 0.5,
                            y: 0
                        });
                        Circle.create();
                        Circle.height(this.model.getRadius());
                        Circle.width(this.model.getRadius());
                        Circle.opacity(1 - (this.indicatorOffset / 950));
                        Circle.fill(this.model.getFillColor());
                        Flex.pop();
                        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center
                        });
                        Flex.height(this.model.getRadius());
                        Flex.width(this.model.getRadius());
                        Flex.offset({
                            x: this.model.isSnap() ? ((this.model.getRadius() + this.model.getMargin() + 1) * (this.itemIndex - this.indicatorOffset / 1080)) + 0.5 : ((this.model.getRadius() + this.model.getMargin() + 1) * (this.itemIndex + 1)) + 0.5,
                            y: 0
                        });
                        Circle.create();
                        Circle.height(this.model.getRadius());
                        Circle.width(this.model.getRadius());
                        Circle.opacity(-(this.indicatorOffset / 950));
                        Circle.fill(this.indicatorOffset == 0 ? "#00ffffff" : this.model.getFillColor());
                        Flex.pop();
                    }
                    If.pop();
                }
                else { //没有设置背景，设置了缩放
                    If.branchId(1);
                    If.create();
                    if (this.model.isScale() == true) {
                        If.branchId(0);
                        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center
                        });
                        Flex.height(this.model.getRadius());
                        Flex.width(this.model.getRadius());
                        Flex.offset({
                            x: this.model.isSnap() ? ((this.model.getRadius() + this.model.getMargin() + 1) * (this.itemIndex - this.indicatorOffset / 1080)) + 0.5 : ((this.model.getRadius() + this.model.getMargin() + 1) * (this.itemIndex - 1)) + 0.5,
                            y: 0
                        });
                        Circle.create();
                        Circle.height(this.model.getRadius());
                        Circle.width(this.model.getRadius());
                        Circle.fill(this.indicatorOffset <= 0 ? "#00000000" : (this.indicatorOffset < -0.6 ? (this.model.getFillColor()) : "#00000000"));
                        Circle.scale({ x: (this.indicatorOffset / 950) + 0.5, y: (this.indicatorOffset / 950) + 0.5 });
                        Flex.pop();
                        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center
                        });
                        Flex.height(this.model.getRadius());
                        Flex.width(this.model.getRadius());
                        Flex.offset({
                            x: this.model.isSnap() ? ((this.model.getRadius() + this.model.getMargin() + 1) * (this.itemIndex - this.indicatorOffset / 1080)) + 0.5 : ((this.model.getRadius() + this.model.getMargin() + 1) * (this.itemIndex)) + 0.5,
                            y: 0
                        });
                        Circle.create();
                        Circle.height(this.model.getRadius());
                        Circle.width(this.model.getRadius());
                        Circle.fill(this.model.getFillColor());
                        Circle.scale({
                            x: this.indicatorOffset / 950 < 0 ? ((1 - (-(this.indicatorOffset / 950))) + 0.5) : ((1 - ((this.indicatorOffset / 950))) + 0.5),
                            y: this.indicatorOffset / 950 < 0 ? ((1 - (-(this.indicatorOffset / 950))) + 0.5) : ((1 - ((this.indicatorOffset / 950))) + 0.5)
                        });
                        Flex.pop();
                        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center
                        });
                        Flex.height(this.model.getRadius());
                        Flex.width(this.model.getRadius());
                        Flex.offset({
                            x: this.model.isSnap() ? ((this.model.getRadius() + this.model.getMargin() + 1) * (this.itemIndex - this.indicatorOffset / 1080)) + 0.5 : ((this.model.getRadius() + this.model.getMargin() + 1) * (this.itemIndex + 1)) + 0.5,
                            y: 0
                        });
                        Circle.create();
                        Circle.height(this.model.getRadius());
                        Circle.width(this.model.getRadius());
                        Circle.fill(this.indicatorOffset >= 0 ? "#00ffffff" : (this.indicatorOffset > 0.6 ? (this.model.getFillColor()) : "#00000000"));
                        Circle.scale({ x: (-(this.indicatorOffset / 950)) + 0.5, y: (-(this.indicatorOffset / 950)) + 0.5 });
                        Flex.pop();
                    }
                    else { // 没有设置背景，没有设置缩放
                        If.branchId(1);
                        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center
                        });
                        Flex.height(this.model.getRadius());
                        Flex.width(this.model.getRadius());
                        Flex.offset({
                            x: this.model.isSnap() ? ((this.model.getRadius() + this.model.getMargin() + 1) * (this.itemIndex - this.indicatorOffset / 1080)) + 0.5 : ((this.model.getRadius() + this.model.getMargin() + 1) * (this.itemIndex - 1)) + 0.5,
                            y: 0
                        });
                        Circle.create();
                        Circle.height(this.model.getRadius());
                        Circle.width(this.model.getRadius());
                        Circle.fill(this.indicatorOffset <= 0 ? "#00000000" : (this.indicatorOffset < -0.6 ? (this.model.getFillColor()) : "#00000000"));
                        Flex.pop();
                        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center
                        });
                        Flex.height(this.model.getRadius());
                        Flex.width(this.model.getRadius());
                        Flex.offset({
                            x: this.model.isSnap() ? ((this.model.getRadius() + this.model.getMargin() + 1) * (this.itemIndex - this.indicatorOffset / 1080)) + 0.5 : ((this.model.getRadius() + this.model.getMargin() + 1) * (this.itemIndex)) + 0.5,
                            y: 0
                        });
                        Circle.create();
                        Circle.height(this.model.getRadius());
                        Circle.width(this.model.getRadius());
                        Circle.fill(this.model.getFillColor());
                        Flex.pop();
                        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center
                        });
                        Flex.height(this.model.getRadius());
                        Flex.width(this.model.getRadius());
                        Flex.offset({
                            x: this.model.isSnap() ? ((this.model.getRadius() + this.model.getMargin() + 1) * (this.itemIndex - this.indicatorOffset / 1080)) + 0.5 : ((this.model.getRadius() + this.model.getMargin() + 1) * (this.itemIndex + 1)) + 0.5,
                            y: 0
                        });
                        Circle.create();
                        Circle.height(this.model.getRadius());
                        Circle.width(this.model.getRadius());
                        Circle.fill(this.indicatorOffset >= 0 ? "#00000000" : (this.indicatorOffset > 0.6 ? (this.model.getFillColor()) : "#00000000"));
                        Flex.pop();
                    }
                    If.pop();
                }
                If.pop();
            }
            else { // 矩形
                If.branchId(1);
                If.create();
                if (this.model.isBackgroundGradient() == true) { //设置了背景透明
                    If.branchId(0);
                    If.create();
                    if (this.model.isScale() == true) { //设置了背景，设置了缩放,不设置旋转
                        If.branchId(0);
                        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center
                        });
                        Flex.height(this.model.getItemHeight() - 1);
                        Flex.width(this.model.getItemWidth() - 8);
                        Flex.offset({
                            x: this.model.isSnap() ? (((this.model.getItemWidth() + this.model.getMargin() + 1) * (this.itemIndex - this.indicatorOffset / 1080)) + (this.model.getMargin() * (this.itemIndex - 1))) : ((this.model.getItemWidth() + this.model.getMargin() + 1) * (this.itemIndex - 1) + (this.model.getMargin() * (this.itemIndex - 1))),
                            y: 0
                        });
                        Rect.create();
                        Rect.radius(this.model.getRectangleRadius());
                        Rect.height(this.model.getItemHeight() - this.model.getMargin());
                        Rect.width(this.model.getItemWidth() + this.model.getMargin());
                        Rect.opacity(this.indicatorOffset / 950);
                        Rect.fill(this.indicatorOffset == 0 ? "#00000000" : this.model.getFillColor());
                        Rect.scale({ x: (this.indicatorOffset / 950) + 0.5, y: (this.indicatorOffset / 950) + 0.5 });
                        Flex.pop();
                        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center
                        });
                        Flex.height(this.model.getItemHeight() - 1);
                        Flex.width(this.model.getItemWidth() - 8);
                        Flex.offset({
                            x: this.model.isSnap() ? (((this.model.getItemWidth() + this.model.getMargin() + 1) * (this.itemIndex - this.indicatorOffset / 1080)) + (this.model.getMargin() * this.itemIndex)) : (((this.model.getItemWidth() + this.model.getMargin() + 1) * (this.itemIndex) + (this.model.getMargin() * this.itemIndex))),
                            y: 0
                        });
                        Rect.create();
                        Rect.radius(this.model.getRectangleRadius());
                        Rect.height(this.model.getItemHeight() - this.model.getMargin());
                        Rect.width(this.model.getItemWidth() + this.model.getMargin());
                        Rect.opacity(1 - (this.indicatorOffset / 950));
                        Rect.fill(this.model.getFillColor());
                        Rect.scale({
                            x: this.indicatorOffset / 950 < 0 ? ((1 - (-(this.indicatorOffset / 950))) + 0.5) : ((1 - ((this.indicatorOffset / 950))) + 0.5),
                            y: this.indicatorOffset / 950 < 0 ? ((1 - (-(this.indicatorOffset / 950))) + 0.5) : ((1 - ((this.indicatorOffset / 950))) + 0.5)
                        });
                        Flex.pop();
                        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center
                        });
                        Flex.height(this.model.getItemHeight() - 1);
                        Flex.width(this.model.getItemWidth() - 8);
                        Flex.offset({
                            x: this.model.isSnap() ? (((this.model.getItemWidth() + this.model.getMargin() + 1) * (this.itemIndex - this.indicatorOffset / 1080)) + (this.model.getMargin() * (this.itemIndex + 1))) : (((this.model.getItemWidth() + this.model.getMargin() + 1) * (this.itemIndex + 1)) + (this.model.getMargin() * (this.itemIndex + 1))),
                            y: 0
                        });
                        Rect.create();
                        Rect.radius(this.model.getRectangleRadius());
                        Rect.height(this.model.getItemHeight() - this.model.getMargin());
                        Rect.width(this.model.getItemWidth() + this.model.getMargin());
                        Rect.opacity(-(this.indicatorOffset / 950));
                        Rect.fill(this.indicatorOffset == 0 ? "#00ffffff" : this.model.getFillColor());
                        Rect.scale({ x: (-(this.indicatorOffset / 950)) + 0.5, y: (-(this.indicatorOffset / 950)) + 0.5 });
                        Flex.pop();
                    }
                    else { // 设置了背景，未设置缩放
                        If.branchId(1);
                        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center
                        });
                        Flex.height(this.model.getItemHeight() - 1);
                        Flex.width(this.model.getItemWidth() - 8);
                        Flex.offset({
                            x: this.model.isSnap() ? (((this.model.getItemWidth() + this.model.getMargin() + 1) * (this.itemIndex - this.indicatorOffset / 1080)) + (this.model.getMargin() * (this.itemIndex - 1))) : ((this.model.getItemWidth() + this.model.getMargin() + 1) * (this.itemIndex - 1) + (this.model.getMargin() * (this.itemIndex - 1))),
                            y: 0
                        });
                        Rect.create();
                        Rect.radius(this.model.getRectangleRadius());
                        Rect.height(this.model.getItemHeight() - this.model.getMargin());
                        Rect.width(this.model.getItemWidth() + this.model.getMargin());
                        Rect.opacity(this.indicatorOffset / 950);
                        Rect.fill(this.indicatorOffset == 0 ? "#00000000" : this.model.getFillColor());
                        Flex.pop();
                        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center
                        });
                        Flex.height(this.model.getItemHeight() - 1);
                        Flex.width(this.model.getItemWidth() - 8);
                        Flex.offset({
                            x: this.model.isSnap() ? (((this.model.getItemWidth() + this.model.getMargin() + 1) * (this.itemIndex - this.indicatorOffset / 1080)) + (this.model.getMargin() * this.itemIndex)) : (((this.model.getItemWidth() + this.model.getMargin() + 1) * (this.itemIndex) + (this.model.getMargin() * this.itemIndex))),
                            y: 0
                        });
                        Rect.create();
                        Rect.radius(this.model.getRectangleRadius());
                        Rect.height(this.model.getItemHeight() - this.model.getMargin() + 2);
                        Rect.width(this.model.getItemWidth() + this.model.getMargin() + 2);
                        Rect.opacity(1 - (this.indicatorOffset / 950));
                        Rect.fill(this.model.getFillColor());
                        Flex.pop();
                        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center
                        });
                        Flex.height(this.model.getItemHeight() - 1);
                        Flex.width(this.model.getItemWidth() - 8);
                        Flex.offset({
                            x: this.model.isSnap() ? (((this.model.getItemWidth() + this.model.getMargin() + 1) * (this.itemIndex - this.indicatorOffset / 1080)) + (this.model.getMargin() * (this.itemIndex + 1))) : (((this.model.getItemWidth() + this.model.getMargin() + 1) * (this.itemIndex + 1)) + (this.model.getMargin() * (this.itemIndex + 1))),
                            y: 0
                        });
                        Rect.create();
                        Rect.radius(this.model.getRectangleRadius());
                        Rect.height(this.model.getItemHeight() - this.model.getMargin());
                        Rect.width(this.model.getItemWidth() + this.model.getMargin());
                        Rect.opacity(-(this.indicatorOffset / 950));
                        Rect.fill(this.indicatorOffset == 0 ? "#00ffffff" : this.model.getFillColor());
                        Flex.pop();
                    }
                    If.pop();
                }
                else { //未设置背景透明
                    If.branchId(1);
                    If.create();
                    if (this.model.isScale() == true) { // 未设置背景透明，设置了缩放
                        If.branchId(0);
                        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center
                        });
                        Flex.height(this.model.getItemHeight() - 1);
                        Flex.width(this.model.getItemWidth() - 8);
                        Flex.offset({
                            x: this.model.isSnap() ? (((this.model.getItemWidth() + this.model.getMargin() + 1) * (this.itemIndex - this.indicatorOffset / 1080)) + (this.model.getMargin() * (this.itemIndex - 1))) : ((this.model.getItemWidth() + this.model.getMargin() + 1) * (this.itemIndex - 1) + (this.model.getMargin() * (this.itemIndex - 1))),
                            y: 0
                        });
                        Rect.create();
                        Rect.radius(this.model.getRectangleRadius());
                        Rect.height(this.model.getItemHeight() - this.model.getMargin());
                        Rect.width(this.model.getItemWidth() + this.model.getMargin());
                        Rect.fill(this.indicatorOffset <= 0 ? "#00000000" : (this.indicatorOffset < -0.6 ? (this.model.getFillColor()) : "#00000000"));
                        Rect.scale({ x: (-(this.indicatorOffset / 950)) + 0.5, y: (-(this.indicatorOffset / 950)) + 0.5 });
                        Flex.pop();
                        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center
                        });
                        Flex.height(this.model.getItemHeight() - 1);
                        Flex.width(this.model.getItemWidth() - 8);
                        Flex.offset({
                            x: this.model.isSnap() ? (((this.model.getItemWidth() + this.model.getMargin() + 1) * (this.itemIndex - this.indicatorOffset / 1080)) + (this.model.getMargin() * this.itemIndex)) : (((this.model.getItemWidth() + this.model.getMargin() + 1) * (this.itemIndex) + (this.model.getMargin() * this.itemIndex))),
                            y: 0
                        });
                        Rect.create();
                        Rect.radius(this.model.getRectangleRadius());
                        Rect.height(this.model.getItemHeight() - this.model.getMargin());
                        Rect.width(this.model.getItemWidth() + this.model.getMargin());
                        Rect.fill(this.model.getFillColor());
                        Rect.scale({
                            x: this.indicatorOffset / 950 < 0 ? ((1 - (-(this.indicatorOffset / 950))) + 0.5) : ((1 - ((this.indicatorOffset / 950))) + 0.5),
                            y: this.indicatorOffset / 950 < 0 ? ((1 - (-(this.indicatorOffset / 950))) + 0.5) : ((1 - ((this.indicatorOffset / 950))) + 0.5)
                        });
                        Flex.pop();
                        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center
                        });
                        Flex.height(this.model.getItemHeight() - 1);
                        Flex.width(this.model.getItemWidth() - 8);
                        Flex.offset({
                            x: this.model.isSnap() ? (((this.model.getItemWidth() + this.model.getMargin() + 1) * (this.itemIndex - this.indicatorOffset / 1080)) + (this.model.getMargin() * (this.itemIndex + 1))) : (((this.model.getItemWidth() + this.model.getMargin() + 1) * (this.itemIndex + 1)) + (this.model.getMargin() * (this.itemIndex + 1))),
                            y: 0
                        });
                        Rect.create();
                        Rect.radius(this.model.getRectangleRadius());
                        Rect.height(this.model.getItemHeight() - this.model.getMargin());
                        Rect.width(this.model.getItemWidth() + this.model.getMargin());
                        Rect.fill(this.indicatorOffset >= 0 ? "#00ffffff" : (this.indicatorOffset > 0.6 ? (this.model.getFillColor()) : "#00000000"));
                        Rect.scale({ x: (-(this.indicatorOffset / 950)) + 0.5, y: (-(this.indicatorOffset / 950)) + 0.5 });
                        Flex.pop();
                    }
                    else if (this.model.isRotate() == true) { //未设置背景透明,未设置缩放//只有这里能设置旋转
                        If.branchId(1);
                        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center
                        });
                        Flex.height(this.model.getItemHeight() - 1);
                        Flex.width(this.model.getItemWidth() - 8);
                        Flex.offset({
                            x: this.model.isSnap() ? (((this.model.getItemWidth() + this.model.getMargin() + 1) * (this.itemIndex - this.indicatorOffset / 1080)) + (this.model.getMargin() * (this.itemIndex - 1))) : ((this.model.getItemWidth() + this.model.getMargin() + 1) * (this.itemIndex - 1) + (this.model.getMargin() * (this.itemIndex - 1))),
                            y: 0
                        });
                        Rect.create();
                        Rect.radius(this.model.getRectangleRadius());
                        Rect.height(this.model.getItemHeight() - this.model.getMargin());
                        Rect.width(this.model.getItemWidth() + this.model.getMargin());
                        Rect.fill(this.indicatorOffset <= 0 ? "#00000000" : (this.indicatorOffset < -0.6 ? (this.model.getFillColor()) : "#00000000"));
                        Flex.pop();
                        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
                        Flex.height(this.model.getItemHeight() - 1);
                        Flex.width(this.model.getItemWidth() - 8);
                        Flex.offset({
                            x: this.model.isSnap() ? (((this.model.getItemWidth() + this.model.getMargin() + 1) * (this.itemIndex - this.indicatorOffset / 1080)) + (this.model.getMargin() * this.itemIndex)) :
                                ((this.model.getItemWidth() + this.model.getMargin() + 1) * (this.itemIndex) + (this.model.getMargin() * this.itemIndex)),
                            y: 0
                        });
                        ForEach.create("7", this, ObservedObject.GetRawObject(this.arr), (item: number) => {
                            If.create();
                            if (item == this.itemIndex) {
                                If.branchId(0);
                                If.create();
                                if (this.itemIndex == 0) {
                                    If.branchId(0);
                                    Rect.create();
                                    Rect.radius(this.model.getRectangleRadius());
                                    Rect.height(this.model.getItemHeight() - this.model.getMargin());
                                    Rect.width(this.model.getItemWidth() + this.model.getMargin());
                                    Rect.fill(this.model.getFillColor());
                                }
                                else {
                                    If.branchId(1);
                                    Flex.create();
                                    Flex.rotate({
                                        x: this.scaleValue,
                                        y: this.scaleValue,
                                        z: this.scaleValue * 18,
                                        centerX: this.model.getItemHeight() + (this.model.getItemWidth() >= 15 ? (this.model.getItemWidth() - 15) * 0.5 : -((15 - this.model.getItemWidth()) * 0.5)),
                                        angle: this.scaleValue * 180
                                    });
                                    Flex.onAppear(() => {
                                        Context.animateTo({ duration: 500, delay: 10,
                                            onFinish: () => {
                                                setTimeout(() => {
                                                    this.scaleValue = 0;
                                                }, 0);
                                            },
                                        }, () => {
                                            this.scaleValue = 1;
                                        });
                                    });
                                    Rect.create();
                                    Rect.radius(this.model.getRectangleRadius());
                                    Rect.height(this.model.getItemHeight() - this.model.getMargin());
                                    Rect.width(this.model.getItemWidth() + this.model.getMargin());
                                    Rect.fill(this.model.getFillColor());
                                    Flex.pop();
                                }
                                If.pop();
                            }
                            If.pop();
                        }, (item: number) => JSON.stringify(item));
                        ForEach.pop();
                        Flex.pop();
                        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center
                        });
                        Flex.height(this.model.getItemHeight() - 1);
                        Flex.width(this.model.getItemWidth() - 8);
                        Flex.offset({
                            x: this.model.isSnap() ? (((this.model.getItemWidth() + this.model.getMargin() + 1) * (this.itemIndex - this.indicatorOffset / 1080)) + (this.model.getMargin() * (this.itemIndex + 1))) : (((this.model.getItemWidth() + this.model.getMargin() + 1) * (this.itemIndex + 1)) + (this.model.getMargin() * (this.itemIndex + 1))),
                            y: 0
                        });
                        Rect.create();
                        Rect.radius(this.model.getRectangleRadius());
                        Rect.height(this.model.getItemHeight() - this.model.getMargin());
                        Rect.width(this.model.getItemWidth() + this.model.getMargin());
                        Rect.fill(this.indicatorOffset >= 0 ? "#00ffffff" : (this.indicatorOffset > 0.6 ? (this.model.getFillColor()) : "#00000000"));
                        Flex.pop();
                    }
                    else {
                        If.branchId(2);
                        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center
                        });
                        Flex.height(this.model.getItemHeight() - 1);
                        Flex.width(this.model.getItemWidth() - 8);
                        Flex.offset({
                            x: this.model.isSnap() ? (((this.model.getItemWidth() + this.model.getMargin() + 1) * (this.itemIndex - this.indicatorOffset / 1080)) + (this.model.getMargin() * (this.itemIndex - 1))) : ((this.model.getItemWidth() + this.model.getMargin() + 1) * (this.itemIndex - 1) + (this.model.getMargin() * (this.itemIndex - 1))),
                            y: 0
                        });
                        Rect.create();
                        Rect.radius(this.model.getRectangleRadius());
                        Rect.height(this.model.getItemHeight() - this.model.getMargin());
                        Rect.width(this.model.getItemWidth() + this.model.getMargin());
                        Rect.fill(this.indicatorOffset <= 0 ? "#00000000" : (this.indicatorOffset < -0.6 ? (this.model.getFillColor()) : "#00000000"));
                        Flex.pop();
                        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center
                        });
                        Flex.height(this.model.getItemHeight() - 1);
                        Flex.width(this.model.getItemWidth() - 8);
                        Flex.offset({
                            x: this.model.isSnap() ? (((this.model.getItemWidth() + this.model.getMargin() + 1) * (this.itemIndex - this.indicatorOffset / 1080)) + (this.model.getMargin() * this.itemIndex)) : (((this.model.getItemWidth() + this.model.getMargin() + 1) * (this.itemIndex) + (this.model.getMargin() * this.itemIndex))),
                            y: 0
                        });
                        Rect.create();
                        Rect.radius(this.model.getRectangleRadius());
                        Rect.height(this.model.getItemHeight() - this.model.getMargin());
                        Rect.width(this.model.getItemWidth() + this.model.getMargin());
                        Rect.fill(this.model.getFillColor());
                        Flex.pop();
                        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center
                        });
                        Flex.height(this.model.getItemHeight() - 1);
                        Flex.width(this.model.getItemWidth() - 8);
                        Flex.offset({
                            x: this.model.isSnap() ? (((this.model.getItemWidth() + this.model.getMargin() + 1) * (this.itemIndex - this.indicatorOffset / 1080)) + (this.model.getMargin() * (this.itemIndex + 1))) : (((this.model.getItemWidth() + this.model.getMargin() + 1) * (this.itemIndex + 1)) + (this.model.getMargin() * (this.itemIndex + 1))),
                            y: 0
                        });
                        Rect.create();
                        Rect.radius(this.model.getRectangleRadius());
                        Rect.height(this.model.getItemHeight() - this.model.getMargin());
                        Rect.width(this.model.getItemWidth() + this.model.getMargin());
                        Rect.fill(this.indicatorOffset >= 0 ? "#00ffffff" : (this.indicatorOffset > 0.6 ? (this.model.getFillColor()) : "#00000000"));
                        Flex.pop();
                    }
                    If.pop();
                }
                If.pop();
            }
            If.pop();
            Stack.pop();
        }
        else if (this.model.getOrientation() == Orientation.VERTICAL) {
            If.branchId(1);
            Flex.create({
                alignItems: this.model.isCentered() ? ItemAlign.Center : ItemAlign.Start,
                justifyContent: FlexAlign.Center
            });
            Flex.height(this.model.getHeight());
            Flex.width(this.model.getWidth());
            Flex.backgroundColor(this.model.getBackgroundColor());
            Stack.create({ alignContent: Alignment.Top });
            Stack.height((this.model.getRadius() + this.model.getStrokeWidth() + this.model.getMargin()) * this.count - this.model.getMargin());
            Flex.create();
            Flex.height("100%");
            Column.create({ space: 0 });
            ForEach.create("8", this, ObservedObject.GetRawObject(this.arr), (item: number) => {
                Stack.create({ alignContent: Alignment.Center });
                Stack.margin({ bottom: this.model.getMargin() });
                Circle.create();
                Circle.height(this.model.getRadius() + this.model.getStrokeWidth());
                Circle.width(this.model.getRadius() + this.model.getStrokeWidth());
                Circle.fill(this.model.getStrokeColor());
                Circle.create();
                Circle.height(this.model.getRadius());
                Circle.width(this.model.getRadius());
                Circle.fill(this.model.getUnselectedColor());
                Stack.pop();
            }, (item: number) => JSON.stringify(item));
            ForEach.pop();
            Column.pop();
            Flex.pop();
            Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center
            });
            Flex.height(this.model.getRadius() + this.model.getStrokeWidth());
            Flex.width(this.model.getRadius() + this.model.getStrokeWidth());
            Flex.offset({
                y: (this.model.getRadius() + this.model.getMargin() + this.model.getStrokeWidth()) * this.itemIndex + (this.model.isSnap() ? 0 : -this.indicatorOffset / this.model.getHeight() * (this.model.getRadius() + this.model.getStrokeWidth() + this.model.getMargin())),
                x: 0
            });
            Circle.create();
            Circle.height(this.model.getRadius() + this.model.getStrokeWidth() / 2);
            Circle.width(this.model.getRadius() + this.model.getStrokeWidth() / 2);
            Circle.fill(this.model.getFillColor());
            Flex.pop();
            Stack.pop();
            Flex.pop();
        }
        If.pop();
    }
    aboutToAppear() {
        this.model.setOnPageTouchListener((event: TouchEvent, currentIndex: number) => {
            this.onIndicatorTouch(event, currentIndex);
        });
        this.onCountChange();
    }
    onIndicatorTouch(event: TouchEvent, itemIndex: number) {
        if (!!!this.model || !!!this.model.getOrientation()) {
            return;
        }
        if (this.model.getOrientation() == Orientation.HORIZONTAL) {
            let itemIndex = this.itemIndex;
            let startX = this.startX;
            let offset = 0;
            if (event.type === TouchType.Down) {
                this.startX = event.touches[0].x;
                this.upFlag = false;
            }
            if (event.type === TouchType.Move) {
                offset = event.touches[0].x - startX;
                if ((offset >= 0 && itemIndex > 0) || (offset <= 0 && itemIndex < this.count - 1)) {
                    this.indicatorOffset = offset;
                }
            }
            if (event.type === TouchType.Up) {
                this.upFlag = true;
                let that = this;
                setTimeout(() => {
                    offset = 0;
                    that.indicatorOffset = offset;
                }, 750);
            }
        }
        else {
            let startX = this.startX;
            let offset = 0;
            if (event.type === TouchType.Down) {
                this.startX = event.touches[0].y;
            }
            if (event.type === TouchType.Move) {
                offset = event.touches[0].y - startX;
                if ((offset >= 0 && itemIndex > 0) || (offset <= 0 && itemIndex < this.count - 1)) {
                    this.indicatorOffset = offset;
                }
            }
            if (event.type === TouchType.Up) {
                if (this.indicatorOffset >= this.model.getHeight() / 2 && itemIndex > 0) {
                    itemIndex--;
                }
                else if (this.indicatorOffset <= -this.model.getHeight() / 2 && itemIndex < this.count - 1) {
                    itemIndex++;
                }
                this.model.getTabsController()?.changeIndex(itemIndex);
                offset = 0;
                this.indicatorOffset = offset;
                this.itemIndex = itemIndex;
            }
        }
    }
}
export default CircleIndicator;
