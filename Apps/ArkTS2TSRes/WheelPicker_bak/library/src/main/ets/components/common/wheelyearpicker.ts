interface WheelYearPicker_Params {
    model?: WheelYearPicker.Model;
    scroller?: Scroller;
    scroller1?: Scroller;
    solarYearsArray?: SolarCalendar[];
    YearsArray?: SolarCalendar[];
    lastYearPosition?: number;
    dividerIndex?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "wheelyearpicker_" + ++__generate__Id;
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
import { initializeSolarCalendar, SolarCalendar, MonthAndDay } from './SolarCalendar';
const ADAPTWIDTH = "30%";
class WheelYearPicker extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new WheelYearPicker.Model(), this, "model");
        this.scroller = new Scroller();
        this.scroller1 = new Scroller();
        this.solarYearsArray = initializeSolarCalendar(this.model.yearRangeStart, this.model.yearRangeEnd);
        this.__YearsArray = new ObservedPropertyObject(this.solarYearsArray, this, "YearsArray");
        this.lastYearPosition = 0;
        this.dividerIndex = 0;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: WheelYearPicker_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.scroller1 !== undefined) {
            this.scroller1 = params.scroller1;
        }
        if (params.solarYearsArray !== undefined) {
            this.solarYearsArray = params.solarYearsArray;
        }
        if (params.YearsArray !== undefined) {
            this.YearsArray = params.YearsArray;
        }
        if (params.lastYearPosition !== undefined) {
            this.lastYearPosition = params.lastYearPosition;
        }
        if (params.dividerIndex !== undefined) {
            this.dividerIndex = params.dividerIndex;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__YearsArray.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<WheelYearPicker.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: WheelYearPicker.Model) {
        this.__model.set(newValue);
    }
    private scroller: Scroller;
    private scroller1: Scroller;
    private solarYearsArray: SolarCalendar[];
    private __YearsArray: ObservedPropertyObject<SolarCalendar[]>;
    get YearsArray() {
        return this.__YearsArray.get();
    }
    set YearsArray(newValue: SolarCalendar[]) {
        this.__YearsArray.set(newValue);
    }
    private lastYearPosition: number;
    private dividerIndex: number;
    ScrollIndex(textColor: string, parent = null) {
        Column.create();
        Column.width(ADAPTWIDTH);
        Column.alignItems(this.model.mAlign);
        If.create();
        if (!this.model.isCyslic) {
            If.branchId(0);
            ForEach.create("2", this, ObservedObject.GetRawObject(this.YearsArray), (solarYearItem: SolarCalendar) => {
                Text.create((solarYearItem.year).toString());
                Text.fontSize(this.model.mItemTextSize);
                Text.height(this.model.mItemHeight);
                Text.fontColor(textColor);
                Text.fontFamily(this.model.mFontFamily);
                Text.padding(this.model.mSpace);
                Text.pop();
            }, (solarYearItem: SolarCalendar) => (solarYearItem.year).toString());
            ForEach.pop();
        }
        else if (this.model.mVisibleItem < this.YearsArray.length) {
            If.branchId(1);
            ForEach.create("4", this, ObservedObject.GetRawObject(Array.from(new Array(3).keys())), (item: number) => {
                ForEach.create("3", this, ObservedObject.GetRawObject(this.YearsArray), (solarYearItem: SolarCalendar) => {
                    Text.create((solarYearItem.year).toString());
                    Text.fontSize(this.model.mItemTextSize);
                    Text.height(this.model.mItemHeight);
                    Text.fontColor(textColor);
                    Text.fontFamily(this.model.mFontFamily);
                    Text.padding(this.model.mSpace);
                    Text.pop();
                }, (solarYearItem: SolarCalendar) => (solarYearItem.year).toString());
                ForEach.pop();
            }, (item: string) => item);
            ForEach.pop();
        }
        else {
            If.branchId(2);
            ForEach.create("6", this, ObservedObject.GetRawObject(Array.from(new Array(Math.ceil(this.model.mVisibleItem / this.YearsArray.length) * 3).keys())), (item: number) => {
                ForEach.create("5", this, ObservedObject.GetRawObject(this.YearsArray), (solarYearItem: SolarCalendar) => {
                    Text.create((solarYearItem.year).toString());
                    Text.fontSize(this.model.mItemTextSize);
                    Text.height(this.model.mItemHeight);
                    Text.fontColor(textColor);
                    Text.fontFamily(this.model.mFontFamily);
                    Text.padding(this.model.mSpace);
                    Text.pop();
                }, (solarYearItem: SolarCalendar) => (solarYearItem.year).toString());
                ForEach.pop();
            }, (item: string) => item);
            ForEach.pop();
        }
        If.pop();
        Column.pop();
    }
    aboutToAppear() {
        this.model.updateVisibleItemCount();
        setTimeout(() => {
            this.model.scrollInit(this.scroller1); //初始位置选择
            let mOffset: number = this.scroller.currentOffset().yOffset;
            if (this.model.isCyslic) {
                this.scroller1.scrollTo({
                    xOffset: 0,
                    yOffset: mOffset + this.model.mHalfItemCount * this.model.mItemHeight,
                });
                this.scroller.scrollTo({
                    xOffset: 0,
                    yOffset: 1,
                });
            }
            else {
                this.scroller1.scrollTo({
                    xOffset: 0,
                    yOffset: mOffset,
                });
            }
        }, 300);
    }
    render() {
        Row.create();
        Stack.create();
        Scroll.create(this.scroller);
        Scroll.height(this.model.mWheelHeight);
        Scroll.backgroundColor('#E5DEEB');
        Scroll.scrollBar(BarState.Off);
        Scroll.onScroll((xOffset: number, yOffset: number) => {
            // this.model.scrollInit(this.scroller) //初始位置选择
            let mOffset: number = this.scroller.currentOffset().yOffset;
            this.model.mHalfItemCount = (this.model.mVisibleItem - 1) / 2;
            this.lastYearPosition = yOffset == 0 ? this.lastYearPosition : yOffset;
            if (this.model.isCyslic) {
                this.scroller1.scrollTo({
                    xOffset: 0,
                    yOffset: mOffset + this.model.mFirstSelectPosition * this.model.mItemHeight,
                });
            }
            else {
                this.scroller1.scrollTo({
                    xOffset: 0,
                    yOffset: mOffset,
                });
            }
        });
        Scroll.onScrollEnd(() => {
            let scrollOffset = this.scroller.currentOffset().yOffset % this.model.mItemHeight;
            if (scrollOffset > 1) {
                if (this.lastYearPosition <= 0) { // 小于0，向下滑动，大于0是，是向上滑动
                    this.scroller.scrollTo({
                        xOffset: 0,
                        yOffset: this.scroller.currentOffset().yOffset - scrollOffset,
                        animation: { duration: 100, curve: Curve.Ease }
                    });
                    this.model.mSelectedItemPosition = ((this.scroller.currentOffset()
                        .yOffset - scrollOffset) / this.model.mItemHeight) % this.YearsArray.length;
                }
                else {
                    this.scroller.scrollTo({
                        xOffset: 0,
                        yOffset: this.scroller.currentOffset().yOffset + this.model.mItemHeight - scrollOffset,
                        animation: { duration: 100, curve: Curve.Ease }
                    });
                    this.model.mSelectedItemPosition = ((this.scroller.currentOffset()
                        .yOffset - scrollOffset) / this.model.mItemHeight + 1) % this.YearsArray.length;
                }
                this.dividerIndex = (this.scroller.currentOffset().yOffset - scrollOffset) / this.model.mItemHeight;
            }
        });
        Scroll.onScrollEdge((side: Edge) => {
            if (this.model.isCyslic) {
                let scollerBack = Math.ceil((Math.floor(this.model.mVisibleItem / this.YearsArray.length) * 3) / 2 + 1) * this.YearsArray.length * this.model.mItemHeight;
                if (side.valueOf() === 0) {
                    this.scroller.scrollTo({
                        xOffset: 0,
                        yOffset: scollerBack,
                        animation: { duration: 0, curve: Curve.Ease }
                    });
                }
                // 向下滚动
                if (side.valueOf() === 2) {
                    this.scroller.scrollTo({
                        xOffset: 0,
                        yOffset: scollerBack - (2 * this.model.mHalfItemCount + 1) * this.model.mItemHeight,
                        animation: { duration: 0, curve: Curve.Ease }
                    });
                }
            }
        });
        Column.create();
        If.create();
        if (!this.model.isCyslic) {
            If.branchId(0);
            ForEach.create("7", this, ObservedObject.GetRawObject(Array.from(new Array(this.model.mHalfItemCount).keys())), (item: number) => {
                Text.create("");
                Text.fontSize(this.model.mItemTextSize);
                Text.height(this.model.mItemHeight);
                Text.padding(this.model.mSpace);
                Text.pop();
            }, (item: string) => item);
            ForEach.pop();
        }
        If.pop();
        this.ScrollIndex(this.model.mItemTextColor, this);
        If.create();
        if (!this.model.isCyslic) {
            If.branchId(0);
            ForEach.create("8", this, ObservedObject.GetRawObject(Array.from(new Array(this.model.mHalfItemCount).keys())), (item: number) => {
                Text.create("");
                Text.fontSize(this.model.mItemTextSize);
                Text.height(this.model.mItemHeight);
                Text.padding(this.model.mSpace);
                Text.pop();
            }, (item: string) => item);
            ForEach.pop();
        }
        If.pop();
        Column.pop();
        Scroll.pop();
        If.create();
        if (this.model.hasIndicator) {
            If.branchId(0);
            Divider.create();
            Divider.offset({ x: 0, y: -this.model.mItemHeight / 2 });
            Divider.color(this.model.mIndicatorColor);
            Divider.width(ADAPTWIDTH);
            Divider.strokeWidth(this.model.mIndicatorSize);
            Divider.zIndex(2);
            Divider.create();
            Divider.offset({ x: 0, y: this.model.mItemHeight / 2 });
            Divider.color(this.model.mIndicatorColor);
            Divider.width(ADAPTWIDTH);
            Divider.strokeWidth(this.model.mIndicatorSize);
            Divider.zIndex(2);
        }
        If.pop();
        Column.create();
        Scroll.create(this.scroller1);
        Scroll.height(this.model.mItemHeight);
        Scroll.enabled(false);
        Scroll.backgroundColor('#E5DEEB');
        Scroll.scrollBar(BarState.Off);
        Column.create();
        this.ScrollIndex(this.model.mSelectedItemTextColor, this);
        Column.pop();
        Scroll.pop();
        Column.pop();
        If.create();
        if (this.model.hasAtmospheric) {
            If.branchId(0);
            Flex.create();
            Flex.width(ADAPTWIDTH);
            Flex.height(this.model.mWheelHeight);
            Flex.touchable(false);
            Flex.linearGradient({
                angle: 0,
                direction: GradientDirection.Top,
                colors: [['#ffE5DEEB', 0.0], ['#00E5DEEB', 0.5], ['#ffE5DEEB', 1.0]]
            });
            Flex.pop();
        }
        If.pop();
        If.create();
        if (this.model.hasCurtain) {
            If.branchId(0);
            Text.create();
            Text.width(ADAPTWIDTH);
            Text.height(this.model.mItemHeight);
            Text.opacity(0.5);
            Text.backgroundColor(this.model.mCurtainColor);
            Text.enabled(false);
            Text.pop();
        }
        If.pop();
        Stack.pop();
        Row.pop();
    }
}
namespace WheelYearPicker {
    export class Model {
        computeEnd: boolean = false;
        mTextHeight: number = 30;
        mSpace: number = 8;
        mItemHeight: number = this.mTextHeight + 2 * this.mSpace;
        mVisibleItem: number = 9;
        mWheelHeight: number = this.mItemHeight * this.mVisibleItem;
        mCenterY: number = this.mWheelHeight / 2;
        mItemTextSize: number = 16;
        mItemTextColor: string = "#536D8A";
        mTextMaxHeight: number = 30;
        mSelectedItemTextColor: string = "#FAFAaa";
        mIndicatorSize: number = 2;
        mIndicatorColor: string = "red";
        mCurtainColor: string = "#FFFFFF";
        mHalfItemCount: number = 4;
        mFontFamily: string = '';
        isCyslic: boolean = false;
        hasIndicator: boolean = true;
        hasAtmospheric: boolean = true;
        hasCurtain: boolean = true;
        mFirstSelectPosition: number = 0;
        mSelectedItemPosition: number = 0;
        mAlign: HorizontalAlign = HorizontalAlign.Center;
        yearRangeStart: number = 1972;
        yearRangeEnd: number = 2022;
        constructor() {
        }
        setData(mData: string[]): Model {
            throw new Error("You can not invoke setData in WheelYearPicker");
        }
        setSelectDays(FirstSelectPosition: number): Model {
            this.mFirstSelectPosition = FirstSelectPosition;
            return this;
        }
        getSelectDays(): number {
            return this.mFirstSelectPosition;
        }
        getCurrentDays(): number {
            return this.mSelectedItemPosition;
        }
        setTextHeight(mTextHeight: number): Model {
            this.mTextHeight = mTextHeight;
            return this;
        }
        getTextHeight(): number {
            return this.mTextHeight;
        }
        setVisibleItemCount(count: number): Model {
            this.mVisibleItem = count;
            return this;
        }
        getVisibleItemCount(): number {
            return this.mVisibleItem;
        }
        getItemHeight(): number {
            return this.mItemHeight;
        }
        setCyclic(isCyslic: boolean): Model {
            this.isCyslic = isCyslic;
            return this;
        }
        isCyslicShow(): boolean {
            return this.isCyslic;
        }
        setSelectedItemTextColor(color: string): Model {
            this.mSelectedItemTextColor = color;
            return this;
        }
        getSelectedItemTextColor(): string {
            return this.mSelectedItemTextColor;
        }
        setItemTextColor(color: string): Model {
            this.mItemTextColor = color;
            return this;
        }
        getItemTextColor(): string {
            return this.mItemTextColor;
        }
        setItemTextSize(size: number): Model {
            this.mItemTextSize = size;
            return this;
        }
        getItemTextSize(): number {
            return this.mItemTextSize;
        }
        setItemSpace(space: number): Model {
            this.mSpace = space;
            return this;
        }
        getItemSpace(): number {
            return this.mSpace;
        }
        setIndicator(hasIndicator: boolean): Model {
            this.hasIndicator = hasIndicator;
            return this;
        }
        hasIndicatorDivide(): boolean {
            return this.hasIndicator;
        }
        setIndicatorSize(size: number): Model {
            this.mIndicatorSize = size;
            return this;
        }
        getIndicatorSize(): number {
            return this.mIndicatorSize;
        }
        setIndicatorColor(color: string): Model {
            this.mIndicatorColor = color;
            return this;
        }
        getIndicatorColor(): string {
            return this.mIndicatorColor;
        }
        setCurtain(hasCurtain: boolean): Model {
            this.hasCurtain = hasCurtain;
            return this;
        }
        hasCurtainShow(): boolean {
            return this.hasCurtain;
        }
        setCurtainColor(color: string): Model {
            this.mCurtainColor = color;
            return this;
        }
        getCurtainColor(): string {
            return this.mCurtainColor;
        }
        setAtmospheric(hasAtmospheric: boolean): Model {
            this.hasAtmospheric = hasAtmospheric;
            return this;
        }
        hasAtmosphericShow(): boolean {
            return this.hasAtmospheric;
        }
        setItemAlign(align: HorizontalAlign): Model {
            this.mAlign = align;
            return this;
        }
        getItemAlign(): HorizontalAlign {
            return this.mAlign;
        }
        setFontFamily(fontFamily: string): Model {
            this.mFontFamily = fontFamily;
            return this;
        }
        getFontFamily(): string {
            return this.mFontFamily;
        }
        updateVisibleItemCount() {
            if (this.mVisibleItem < 2)
                return;
            if (this.mVisibleItem % 2 == 0)
                this.mVisibleItem += 1;
            this.mWheelHeight = this.mVisibleItem * this.mItemHeight;
            this.mCenterY = this.mWheelHeight / 2;
        }
        scrollInit(scroller: Scroller) {
            if (!this.computeEnd) {
                scroller.scrollTo({
                    xOffset: 0,
                    yOffset: this.mItemHeight * this.mFirstSelectPosition,
                    animation: { duration: 1, curve: Curve.Ease }
                });
                this.mSelectedItemPosition = this.mFirstSelectPosition;
                this.computeEnd = true;
            }
        }
    }
}
export default WheelYearPicker;
