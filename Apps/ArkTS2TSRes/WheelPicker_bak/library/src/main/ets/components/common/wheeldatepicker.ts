interface WheelDatePicker_Params {
    model?: WheelDatePicker.Model;
    solarYearsArray?: SolarCalendar[];
    YearsArray?: SolarCalendar[];
    yearChange?: number;
    monthChange?: number;
    dayChange?: number;
    lastYearPosition?: number;
    lastMonthPosition?: number;
    lastDayPosition?: number;
    computeYearFirst?: boolean;
    computeMonthFirst?: boolean;
    computeDayFirst?: boolean;
    scrollerYear?: Scroller;
    scrollerMonth?: Scroller;
    scrollerDay?: Scroller;
    scrollerYearColor?: Scroller;
    scrollerMonthColor?: Scroller;
    scrollerDayColor?: Scroller;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "wheeldatepicker_" + ++__generate__Id;
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
class WheelDatePicker extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new WheelDatePicker.Model(), this, "model");
        this.solarYearsArray = initializeSolarCalendar(this.model.yearRangeStart, this.model.yearRangeEnd);
        this.__YearsArray = new ObservedPropertyObject(this.solarYearsArray, this, "YearsArray");
        this.__yearChange = new ObservedPropertySimple(0, this, "yearChange");
        this.__monthChange = new ObservedPropertySimple(0, this, "monthChange");
        this.__dayChange = new ObservedPropertySimple(0, this, "dayChange");
        this.lastYearPosition = 0;
        this.lastMonthPosition = 0;
        this.lastDayPosition = 0;
        this.computeYearFirst = false;
        this.computeMonthFirst = false;
        this.computeDayFirst = false;
        this.scrollerYear = new Scroller();
        this.scrollerMonth = new Scroller();
        this.scrollerDay = new Scroller();
        this.scrollerYearColor = new Scroller();
        this.scrollerMonthColor = new Scroller();
        this.scrollerDayColor = new Scroller();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: WheelDatePicker_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.solarYearsArray !== undefined) {
            this.solarYearsArray = params.solarYearsArray;
        }
        if (params.YearsArray !== undefined) {
            this.YearsArray = params.YearsArray;
        }
        if (params.yearChange !== undefined) {
            this.yearChange = params.yearChange;
        }
        if (params.monthChange !== undefined) {
            this.monthChange = params.monthChange;
        }
        if (params.dayChange !== undefined) {
            this.dayChange = params.dayChange;
        }
        if (params.lastYearPosition !== undefined) {
            this.lastYearPosition = params.lastYearPosition;
        }
        if (params.lastMonthPosition !== undefined) {
            this.lastMonthPosition = params.lastMonthPosition;
        }
        if (params.lastDayPosition !== undefined) {
            this.lastDayPosition = params.lastDayPosition;
        }
        if (params.computeYearFirst !== undefined) {
            this.computeYearFirst = params.computeYearFirst;
        }
        if (params.computeMonthFirst !== undefined) {
            this.computeMonthFirst = params.computeMonthFirst;
        }
        if (params.computeDayFirst !== undefined) {
            this.computeDayFirst = params.computeDayFirst;
        }
        if (params.scrollerYear !== undefined) {
            this.scrollerYear = params.scrollerYear;
        }
        if (params.scrollerMonth !== undefined) {
            this.scrollerMonth = params.scrollerMonth;
        }
        if (params.scrollerDay !== undefined) {
            this.scrollerDay = params.scrollerDay;
        }
        if (params.scrollerYearColor !== undefined) {
            this.scrollerYearColor = params.scrollerYearColor;
        }
        if (params.scrollerMonthColor !== undefined) {
            this.scrollerMonthColor = params.scrollerMonthColor;
        }
        if (params.scrollerDayColor !== undefined) {
            this.scrollerDayColor = params.scrollerDayColor;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__YearsArray.aboutToBeDeleted();
        this.__yearChange.aboutToBeDeleted();
        this.__monthChange.aboutToBeDeleted();
        this.__dayChange.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<WheelDatePicker.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: WheelDatePicker.Model) {
        this.__model.set(newValue);
    }
    private solarYearsArray: SolarCalendar[];
    private __YearsArray: ObservedPropertyObject<SolarCalendar[]>;
    get YearsArray() {
        return this.__YearsArray.get();
    }
    set YearsArray(newValue: SolarCalendar[]) {
        this.__YearsArray.set(newValue);
    }
    private __yearChange: ObservedPropertySimple<number>;
    get yearChange() {
        return this.__yearChange.get();
    }
    set yearChange(newValue: number) {
        this.__yearChange.set(newValue);
    }
    private __monthChange: ObservedPropertySimple<number>;
    get monthChange() {
        return this.__monthChange.get();
    }
    set monthChange(newValue: number) {
        this.__monthChange.set(newValue);
    }
    private __dayChange: ObservedPropertySimple<number>;
    get dayChange() {
        return this.__dayChange.get();
    }
    set dayChange(newValue: number) {
        this.__dayChange.set(newValue);
    }
    private lastYearPosition: number;
    private lastMonthPosition: number;
    private lastDayPosition: number;
    private computeYearFirst: boolean;
    private computeMonthFirst: boolean;
    private computeDayFirst: boolean;
    private scrollerYear: Scroller;
    private scrollerMonth: Scroller;
    private scrollerDay: Scroller;
    private scrollerYearColor: Scroller;
    private scrollerMonthColor: Scroller;
    private scrollerDayColor: Scroller;
    aboutToAppear() {
        this.model.mDate = this.YearsArray[this.model.mFirstSelectYearPosition + this.model.mHalfItemCount].year + "-" + this.YearsArray[this.model.mFirstSelectYearPosition + this.model.mHalfItemCount].monthAndDay[this.model.mFirstSelectMonthPosition + this.model.mHalfItemCount].month + "-" + this.YearsArray[this.model.mFirstSelectYearPosition + this.model.mHalfItemCount].monthAndDay[this.model.mFirstSelectMonthPosition + this.model.mHalfItemCount].days[this.model.mFirstSelectDayPosition + this.model.mHalfItemCount];
        this.model.updateVisibleItemCount();
        setTimeout(() => {
            let mOffsetYear: number = this.scrollerYear.currentOffset().yOffset;
            let mOffsetMonth: number = this.scrollerMonth.currentOffset().yOffset;
            let mOffsetDay: number = this.scrollerDay.currentOffset().yOffset;
            this.model.scrollInit(this.scrollerYear, this.computeYearFirst, this.model.mFirstSelectYearPosition, this, "computeYearFirst");
            this.model.scrollInit(this.scrollerMonth, this.computeMonthFirst, this.model.mFirstSelectMonthPosition, this, "computeMonthFirst");
            this.model.scrollInit(this.scrollerDay, this.computeDayFirst, this.model.mFirstSelectDayPosition, this, "computeDayFirst");
            if (this.model.isCyslic) {
                this.scrollerYearColor.scrollTo({
                    xOffset: 0,
                    yOffset: mOffsetYear + this.model.mHalfItemCount * this.model.mItemHeight,
                });
                this.scrollerMonthColor.scrollTo({
                    xOffset: 0,
                    yOffset: mOffsetMonth + this.model.mHalfItemCount * this.model.mItemHeight,
                });
                this.scrollerDayColor.scrollTo({
                    xOffset: 0,
                    yOffset: mOffsetDay + this.model.mHalfItemCount * this.model.mItemHeight,
                });
            }
            else {
                this.scrollerYearColor.scrollTo({
                    xOffset: 0,
                    yOffset: mOffsetYear,
                });
                this.scrollerMonthColor.scrollTo({
                    xOffset: 0,
                    yOffset: mOffsetMonth,
                });
                this.scrollerDayColor.scrollTo({
                    xOffset: 0,
                    yOffset: mOffsetDay,
                });
            }
        }, 300);
    }
    render() {
        Row.create();
        Stack.create();
        Scroll.create(this.scrollerYear);
        Scroll.height(this.model.mWheelHeight);
        Scroll.backgroundColor('#E5DEEB');
        Scroll.scrollBar(BarState.Off);
        Scroll.onScroll((xOffset: number, yOffset: number) => {
            this.model.scrollInit(this.scrollerYear, this.computeYearFirst, this.model.mFirstSelectYearPosition, this, "computeYearFirst"); //初始位置选择
            let mOffset: number = this.scrollerYear.currentOffset().yOffset;
            this.model.mHalfItemCount = (this.model.mVisibleItem - 1) / 2;
            this.lastYearPosition = yOffset == 0 ? this.lastYearPosition : yOffset;
            if (this.model.isCyslic) {
                this.scrollerYearColor.scrollTo({
                    xOffset: 0,
                    yOffset: mOffset + this.model.mHalfItemCount * this.model.mItemHeight,
                });
            }
            else {
                this.scrollerYearColor.scrollTo({
                    xOffset: 0,
                    yOffset: mOffset,
                });
            }
        });
        Scroll.onScrollStop(() => {
            let scrollOffset = this.scrollerYear.currentOffset().yOffset % this.model.mItemHeight;
            if (scrollOffset > 0) {
                if (this.lastYearPosition <= 0) { // 小于0，向下滑动，大于0是，是向上滑动
                    this.model.solarLatestYearIndex = ((this.scrollerYear.currentOffset()
                        .yOffset - scrollOffset) / this.model.mItemHeight) % this.YearsArray.length;
                    this.scrollerYear.scrollTo({
                        xOffset: 0,
                        yOffset: this.scrollerYear.currentOffset().yOffset - scrollOffset,
                        animation: { duration: 100, curve: Curve.Ease }
                    });
                }
                else {
                    this.model.solarLatestYearIndex = ((this.scrollerYear.currentOffset()
                        .yOffset - scrollOffset) / this.model.mItemHeight + 1) % this.YearsArray.length;
                    this.scrollerYear.scrollTo({
                        xOffset: 0,
                        yOffset: this.scrollerYear.currentOffset().yOffset + this.model.mItemHeight - scrollOffset,
                        animation: { duration: 100, curve: Curve.Ease }
                    });
                }
                if (this.model.solarLatestYearIndex <= this.YearsArray.length - this.model.mHalfItemCount) {
                    this.model.solarLatestYearIndex = this.model.solarLatestYearIndex + this.model.mHalfItemCount;
                }
                else if (this.model.solarLatestYearIndex > this.YearsArray.length - 1) {
                    this.model.solarLatestYearIndex = this.YearsArray.length - 1;
                }
                else {
                    this.model.solarLatestYearIndex = this.model.solarLatestYearIndex + this.model.mHalfItemCount - 50;
                }
                if (this.model.isCyslic) {
                    this.yearChange = (this.model.solarLatestYearIndex + this.model.mHalfItemCount) % this.YearsArray.length;
                    this.model.mDate = this.YearsArray[this.yearChange].year + "-" + this.YearsArray[this.yearChange].monthAndDay[(this.model.solarLatestMonthIndex + this.model.mHalfItemCount) % 12].month + "-" + this.YearsArray[this.yearChange].monthAndDay[(this.model.solarLatestMonthIndex + this.model.mHalfItemCount) % 12].days[this.dayChange];
                }
                else {
                    this.model.mDate = this.YearsArray[this.model.solarLatestYearIndex].year + "-" + this.YearsArray[this.model.solarLatestYearIndex].monthAndDay[this.model.solarLatestMonthIndex].month + "-" + this.YearsArray[this.model.solarLatestYearIndex].monthAndDay[this.model.solarLatestMonthIndex].days[this.model.solarLatestDayIndex];
                }
            }
        });
        Scroll.onScrollEdge((side: Edge) => {
            if (this.model.isCyslic) {
                let scollerBack: number = Math.ceil((this.model.mVisibleItem / this.YearsArray.length * 3) / 2 + 1) * this.YearsArray.length * this.model.mItemHeight;
                if (side.valueOf() === 0) {
                    this.scrollerYear.scrollTo({
                        xOffset: 0,
                        yOffset: scollerBack,
                        animation: { duration: 0, curve: Curve.Ease }
                    });
                }
                // 向下滚动
                if (side.valueOf() === 2) {
                    this.scrollerYear.scrollTo({
                        xOffset: 0,
                        yOffset: scollerBack - (2 * this.model.mHalfItemCount + 1) * this.model.mItemHeight,
                        animation: { duration: 0, curve: Curve.Ease }
                    });
                }
            }
        });
        Column.create();
        Column.width(ADAPTWIDTH);
        Column.alignItems(this.model.mAlignYear);
        If.create();
        if (!this.model.isCyslic) {
            If.branchId(0);
            ForEach.create("2", this, ObservedObject.GetRawObject(Array.from(new Array(this.model.mHalfItemCount).keys())), (item: number) => {
                Text.create("");
                Text.fontSize(this.model.mItemTextSize);
                Text.height(this.model.mItemHeight);
                Text.padding(this.model.mSpace);
                Text.pop();
            }, (item: string) => item);
            ForEach.pop();
        }
        If.pop();
        If.create();
        if (!this.model.isCyslic) {
            If.branchId(0);
            ForEach.create("3", this, ObservedObject.GetRawObject(this.YearsArray), (solarYearItem: SolarCalendar) => {
                Text.create((solarYearItem.year).toString());
                Text.fontSize(this.model.mItemTextSize);
                Text.height(this.model.mItemHeight);
                Text.fontColor(this.model.mItemTextColor);
                Text.fontFamily(this.model.mFontFamily);
                Text.padding(this.model.mSpace);
                Text.pop();
            }, (solarYearItem: SolarCalendar) => solarYearItem.year.toString());
            ForEach.pop();
        }
        else if (this.model.mVisibleItem < this.YearsArray.length) {
            If.branchId(1);
            ForEach.create("5", this, ObservedObject.GetRawObject(Array.from(new Array(3).keys())), (item: number) => {
                ForEach.create("4", this, ObservedObject.GetRawObject(this.YearsArray), (solarYearItem: SolarCalendar) => {
                    Text.create((solarYearItem.year).toString());
                    Text.fontSize(this.model.mItemTextSize);
                    Text.height(this.model.mItemHeight);
                    Text.fontColor(this.model.mItemTextColor);
                    Text.fontFamily(this.model.mFontFamily);
                    Text.padding(this.model.mSpace);
                    Text.pop();
                }, (solarYearItem: SolarCalendar) => solarYearItem.year.toString());
                ForEach.pop();
            }, (item: string) => item);
            ForEach.pop();
        }
        else {
            If.branchId(2);
            ForEach.create("7", this, ObservedObject.GetRawObject(Array.from(new Array(Math.ceil(this.model.mVisibleItem / this.YearsArray.length) * 3).keys())), (item: number) => {
                ForEach.create("6", this, ObservedObject.GetRawObject(this.YearsArray), (solarYearItem: SolarCalendar) => {
                    Text.create((solarYearItem.year).toString());
                    Text.fontSize(this.model.mItemTextSize);
                    Text.height(this.model.mItemHeight);
                    Text.fontColor(this.model.mItemTextColor);
                    Text.fontFamily(this.model.mFontFamily);
                    Text.padding(this.model.mSpace);
                    Text.pop();
                }, (solarYearItem: SolarCalendar) => solarYearItem.year.toString());
                ForEach.pop();
            }, (item: string) => item);
            ForEach.pop();
        }
        If.pop();
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
        Scroll.create(this.scrollerYearColor);
        Scroll.height(this.model.mItemHeight);
        Scroll.enabled(false);
        Scroll.backgroundColor('#E5DEEB');
        Scroll.scrollBar(BarState.Off);
        Column.create();
        If.create();
        if (!this.model.isCyslic) {
            If.branchId(0);
            ForEach.create("9", this, ObservedObject.GetRawObject(this.YearsArray), (solarYearItem: SolarCalendar) => {
                Text.create((solarYearItem.year).toString());
                Text.fontSize(this.model.mItemTextSize);
                Text.height(this.model.mItemHeight);
                Text.fontColor(this.model.mSelectedItemTextColor);
                Text.fontFamily(this.model.mFontFamily);
                Text.padding(this.model.mSpace);
                Text.pop();
            }, (solarYearItem: SolarCalendar) => solarYearItem.year.toString());
            ForEach.pop();
        }
        else if (this.model.mVisibleItem < this.YearsArray.length) {
            If.branchId(1);
            ForEach.create("11", this, ObservedObject.GetRawObject(Array.from(new Array(3).keys())), (item: number) => {
                ForEach.create("10", this, ObservedObject.GetRawObject(this.YearsArray), (solarYearItem: SolarCalendar) => {
                    Text.create((solarYearItem.year).toString());
                    Text.fontSize(this.model.mItemTextSize);
                    Text.height(this.model.mItemHeight);
                    Text.fontColor(this.model.mSelectedItemTextColor);
                    Text.fontFamily(this.model.mFontFamily);
                    Text.padding(this.model.mSpace);
                    Text.pop();
                }, (solarYearItem: SolarCalendar) => solarYearItem.year.toString());
                ForEach.pop();
            }, (item: string) => item);
            ForEach.pop();
        }
        else {
            If.branchId(2);
            ForEach.create("13", this, ObservedObject.GetRawObject(Array.from(new Array(Math.ceil(this.model.mVisibleItem / this.YearsArray.length) * 3).keys())), (item: number) => {
                ForEach.create("12", this, ObservedObject.GetRawObject(this.YearsArray), (solarYearItem: SolarCalendar) => {
                    Text.create((solarYearItem.year).toString());
                    Text.fontSize(this.model.mItemTextSize);
                    Text.height(this.model.mItemHeight);
                    Text.fontColor(this.model.mSelectedItemTextColor);
                    Text.fontFamily(this.model.mFontFamily);
                    Text.padding(this.model.mSpace);
                    Text.pop();
                }, (solarYearItem: SolarCalendar) => solarYearItem.year.toString());
                ForEach.pop();
            }, (item: string) => item);
            ForEach.pop();
        }
        If.pop();
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
        Stack.create();
        Scroll.create(this.scrollerMonth);
        Scroll.height(this.model.mWheelHeight);
        Scroll.backgroundColor('#E5DEEB');
        Scroll.scrollBar(BarState.Off);
        Scroll.onScroll((xOffset: number, yOffset: number) => {
            this.model.scrollInit(this.scrollerMonth, this.computeMonthFirst, this.model.mFirstSelectMonthPosition, this, "computeMonthFirst"); //初始位置选择
            let mOffset: number = this.scrollerMonth.currentOffset().yOffset;
            this.model.mHalfItemCount = (this.model.mVisibleItem - 1) / 2;
            this.lastMonthPosition = yOffset == 0 ? this.lastMonthPosition : yOffset;
            if (this.model.isCyslic) {
                this.scrollerMonthColor.scrollTo({
                    xOffset: 0,
                    yOffset: mOffset + this.model.mHalfItemCount * this.model.mItemHeight,
                });
            }
            else {
                this.scrollerMonthColor.scrollTo({
                    xOffset: 0,
                    yOffset: mOffset,
                });
            }
        });
        Scroll.onScrollStop(() => {
            let scrollOffset = this.scrollerMonth.currentOffset().yOffset % this.model.mItemHeight;
            if (scrollOffset > 1) {
                if (this.lastMonthPosition <= 0) { // 小于0，向下滑动，大于0是，是向上滑动
                    this.model.solarLatestMonthIndex = ((this.scrollerMonth.currentOffset()
                        .yOffset - scrollOffset) / this.model.mItemHeight) % this.YearsArray[this.model.solarLatestYearIndex].monthAndDay.length;
                    this.scrollerMonth.scrollTo({
                        xOffset: 0,
                        yOffset: this.scrollerMonth.currentOffset().yOffset - scrollOffset,
                        animation: { duration: 100, curve: Curve.Ease }
                    });
                }
                else {
                    this.model.solarLatestMonthIndex = ((this.scrollerMonth.currentOffset()
                        .yOffset - scrollOffset) / this.model.mItemHeight + 1) % this.YearsArray[this.model.solarLatestYearIndex].monthAndDay.length;
                    this.scrollerMonth.scrollTo({
                        xOffset: 0,
                        yOffset: this.scrollerMonth.currentOffset().yOffset + this.model.mItemHeight - scrollOffset,
                        animation: { duration: 100, curve: Curve.Ease }
                    });
                }
                if (this.model.solarLatestMonthIndex <= (this.YearsArray[this.model.solarLatestYearIndex].monthAndDay.length - this.model.mHalfItemCount)) {
                    this.model.solarLatestMonthIndex = this.model.solarLatestMonthIndex + this.model.mHalfItemCount;
                }
                else if (this.model.solarLatestMonthIndex > this.YearsArray[this.model.solarLatestYearIndex].monthAndDay.length - 1) {
                    this.model.solarLatestMonthIndex = this.YearsArray[this.model.solarLatestYearIndex].monthAndDay.length - 1;
                }
                else {
                    this.model.solarLatestMonthIndex = this.model.solarLatestMonthIndex + this.model.mHalfItemCount - this.YearsArray[this.model.solarLatestYearIndex].monthAndDay.length;
                }
                // 处理 所选月份的天数小于之前INDEX
                let dayLength: number = this.YearsArray[this.model.solarLatestYearIndex].monthAndDay[(this.model.solarLatestMonthIndex + this.model.mHalfItemCount) % 12].days.length - 1;
                if (this.model.solarLatestDayIndex > dayLength) {
                    this.model.solarLatestDayIndex = dayLength;
                }
            }
            if (this.model.isCyslic) {
                this.yearChange = (this.model.solarLatestYearIndex + this.model.mHalfItemCount) % this.YearsArray.length;
                this.model.mDate = this.YearsArray[this.yearChange].year + "-" + this.YearsArray[this.yearChange].monthAndDay[(this.model.solarLatestMonthIndex + this.model.mHalfItemCount) % 12].month + "-" + this.YearsArray[this.yearChange].monthAndDay[(this.model.solarLatestMonthIndex + this.model.mHalfItemCount) % 12].days[this.dayChange];
            }
            else {
                this.model.mDate = this.YearsArray[this.model.solarLatestYearIndex].year + "-" + this.YearsArray[this.model.solarLatestYearIndex].monthAndDay[this.model.solarLatestMonthIndex].month + "-" + this.YearsArray[this.model.solarLatestYearIndex].monthAndDay[this.model.solarLatestMonthIndex].days[this.model.solarLatestDayIndex];
            }
        });
        Scroll.onScrollEdge((side: Edge) => {
            if (this.model.isCyslic) {
                let scollerBack: number = Math.ceil((this.model.mVisibleItem / this.YearsArray[this.model.solarLatestYearIndex].monthAndDay.length * 3) / 2 + 1) * this.YearsArray[this.model.solarLatestYearIndex].monthAndDay.length * this.model.mItemHeight;
                if (side.valueOf() === 0) {
                    this.scrollerMonth.scrollTo({
                        xOffset: 0,
                        yOffset: scollerBack,
                        animation: { duration: 0, curve: Curve.Ease }
                    });
                }
                // 向下滚动
                if (side.valueOf() === 2) {
                    this.scrollerMonth.scrollTo({
                        xOffset: 0,
                        yOffset: scollerBack - (2 * this.model.mHalfItemCount + 1) * this.model.mItemHeight,
                        animation: { duration: 0, curve: Curve.Ease }
                    });
                }
            }
        });
        Column.create();
        Column.width(ADAPTWIDTH);
        Column.alignItems(this.model.mAlignMonth);
        If.create();
        if (!this.model.isCyslic) {
            If.branchId(0);
            ForEach.create("14", this, ObservedObject.GetRawObject(Array.from(new Array(this.model.mHalfItemCount).keys())), (item: number) => {
                Text.create("");
                Text.fontSize(this.model.mItemTextSize);
                Text.height(this.model.mItemHeight);
                Text.padding(this.model.mSpace);
                Text.pop();
            }, (item: string) => item);
            ForEach.pop();
        }
        If.pop();
        If.create();
        if (!this.model.isCyslic) {
            If.branchId(0);
            ForEach.create("15", this, ObservedObject.GetRawObject(this.YearsArray[this.model.solarLatestYearIndex].monthAndDay), (monthAndDay: MonthAndDay) => {
                Text.create(monthAndDay.month.toString());
                Text.fontSize(this.model.mItemTextSize);
                Text.height(this.model.mItemHeight);
                Text.fontColor(this.model.mItemTextColor);
                Text.fontFamily(this.model.mFontFamily);
                Text.padding(this.model.mSpace);
                Text.pop();
            }, (monthAndDay: MonthAndDay) => monthAndDay.month.toString());
            ForEach.pop();
        }
        else if (this.model.mVisibleItem < this.YearsArray[this.model.solarLatestYearIndex].monthAndDay.length) {
            If.branchId(1);
            ForEach.create("17", this, ObservedObject.GetRawObject(Array.from(new Array(3).keys())), (item: number) => {
                ForEach.create("16", this, ObservedObject.GetRawObject(this.YearsArray[this.model.solarLatestYearIndex].monthAndDay), (monthAndDay: MonthAndDay) => {
                    Text.create(monthAndDay.month.toString());
                    Text.fontSize(this.model.mItemTextSize);
                    Text.height(this.model.mItemHeight);
                    Text.fontColor(this.model.mItemTextColor);
                    Text.fontFamily(this.model.mFontFamily);
                    Text.padding(this.model.mSpace);
                    Text.pop();
                }, (monthAndDay: MonthAndDay) => monthAndDay.month.toString());
                ForEach.pop();
            }, (item: string) => item);
            ForEach.pop();
        }
        else {
            If.branchId(2);
            ForEach.create("19", this, ObservedObject.GetRawObject(Array.from(new Array(Math.ceil(this.model.mVisibleItem / this.YearsArray[this.model.solarLatestYearIndex].monthAndDay.length) * 3).keys())), (item: number) => {
                ForEach.create("18", this, ObservedObject.GetRawObject(this.YearsArray[this.model.solarLatestYearIndex].monthAndDay), (monthAndDay: MonthAndDay) => {
                    Text.create(monthAndDay.month.toString());
                    Text.fontSize(this.model.mItemTextSize);
                    Text.height(this.model.mItemHeight);
                    Text.fontColor(this.model.mItemTextColor);
                    Text.fontFamily(this.model.mFontFamily);
                    Text.padding(this.model.mSpace);
                    Text.pop();
                }, (monthAndDay: MonthAndDay) => monthAndDay.month.toString());
                ForEach.pop();
            }, (item: string) => item);
            ForEach.pop();
        }
        If.pop();
        If.create();
        if (!this.model.isCyslic) {
            If.branchId(0);
            ForEach.create("20", this, ObservedObject.GetRawObject(Array.from(new Array(this.model.mHalfItemCount).keys())), (item: number) => {
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
        Scroll.create(this.scrollerMonthColor);
        Scroll.height(this.model.mItemHeight);
        Scroll.enabled(false);
        Scroll.backgroundColor('#E5DEEB');
        Scroll.scrollBar(BarState.Off);
        Column.create();
        If.create();
        if (!this.model.isCyslic) {
            If.branchId(0);
            ForEach.create("21", this, ObservedObject.GetRawObject(this.YearsArray[this.model.solarLatestYearIndex].monthAndDay), (monthAndDay: MonthAndDay) => {
                Text.create(monthAndDay.month.toString());
                Text.fontSize(this.model.mItemTextSize);
                Text.height(this.model.mItemHeight);
                Text.fontColor(this.model.mSelectedItemTextColor);
                Text.fontFamily(this.model.mFontFamily);
                Text.padding(this.model.mSpace);
                Text.pop();
            }, (monthAndDay: MonthAndDay) => monthAndDay.month.toString());
            ForEach.pop();
        }
        else if (this.model.mVisibleItem < this.YearsArray[this.model.solarLatestYearIndex].monthAndDay.length) {
            If.branchId(1);
            ForEach.create("23", this, ObservedObject.GetRawObject(Array.from(new Array(3).keys())), (item: number) => {
                ForEach.create("22", this, ObservedObject.GetRawObject(this.YearsArray[this.model.solarLatestYearIndex].monthAndDay), (monthAndDay: MonthAndDay) => {
                    Text.create(monthAndDay.month.toString());
                    Text.fontSize(this.model.mItemTextSize);
                    Text.height(this.model.mItemHeight);
                    Text.fontColor(this.model.mSelectedItemTextColor);
                    Text.fontFamily(this.model.mFontFamily);
                    Text.padding(this.model.mSpace);
                    Text.pop();
                }, (monthAndDay: MonthAndDay) => monthAndDay.month.toString());
                ForEach.pop();
            }, (item: string) => item);
            ForEach.pop();
        }
        else {
            If.branchId(2);
            ForEach.create("25", this, ObservedObject.GetRawObject(Array.from(new Array(Math.ceil(this.model.mVisibleItem / this.YearsArray[this.model.solarLatestYearIndex].monthAndDay.length) * 3).keys())), (item: number) => {
                ForEach.create("24", this, ObservedObject.GetRawObject(this.YearsArray[this.model.solarLatestYearIndex].monthAndDay), (monthAndDay: MonthAndDay) => {
                    Text.create(monthAndDay.month.toString());
                    Text.fontSize(this.model.mItemTextSize);
                    Text.height(this.model.mItemHeight);
                    Text.fontColor(this.model.mSelectedItemTextColor);
                    Text.fontFamily(this.model.mFontFamily);
                    Text.padding(this.model.mSpace);
                    Text.pop();
                }, (monthAndDay: MonthAndDay) => monthAndDay.month.toString());
                ForEach.pop();
            }, (item: string) => item);
            ForEach.pop();
        }
        If.pop();
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
        Stack.create();
        Scroll.create(this.scrollerDay);
        Scroll.height(this.model.mWheelHeight);
        Scroll.backgroundColor('#E5DEEB');
        Scroll.scrollBar(BarState.Off);
        Scroll.onScroll((xOffset: number, yOffset: number) => {
            this.model.scrollInit(this.scrollerDay, this.computeDayFirst, this.model.mFirstSelectDayPosition, this, "computeDayFirst"); //初始位置选择
            let mOffset: number = this.scrollerDay.currentOffset().yOffset;
            this.model.mHalfItemCount = (this.model.mVisibleItem - 1) / 2;
            this.lastDayPosition = yOffset == 0 ? this.lastDayPosition : yOffset;
            if (this.model.isCyslic) {
                this.scrollerDayColor.scrollTo({
                    xOffset: 0,
                    yOffset: mOffset + this.model.mHalfItemCount * this.model.mItemHeight,
                });
            }
            else {
                this.scrollerDayColor.scrollTo({
                    xOffset: 0,
                    yOffset: mOffset,
                });
            }
        });
        Scroll.onScrollStop(() => {
            let scrollOffset: number = this.scrollerDay.currentOffset().yOffset % this.model.mItemHeight;
            if (scrollOffset > 1) {
                if (this.lastDayPosition <= 0) { // 小于0，向下滑动，大于0是，是向上滑动
                    this.model.solarLatestDayIndex = ((this.scrollerDay.currentOffset()
                        .yOffset - scrollOffset) / this.model.mItemHeight) % this.YearsArray[this.model.solarLatestYearIndex].monthAndDay[this.model.solarLatestMonthIndex].days.length;
                    this.scrollerDay.scrollTo({
                        xOffset: 0,
                        yOffset: this.scrollerDay.currentOffset().yOffset - scrollOffset,
                        animation: { duration: 100, curve: Curve.Ease }
                    });
                }
                else {
                    this.model.solarLatestDayIndex = ((this.scrollerDay.currentOffset()
                        .yOffset - scrollOffset) / this.model.mItemHeight + 1) % this.YearsArray[this.model.solarLatestYearIndex].monthAndDay[this.model.solarLatestMonthIndex].days.length;
                    this.scrollerDay.scrollTo({
                        xOffset: 0,
                        yOffset: this.scrollerDay.currentOffset().yOffset + this.model.mItemHeight - scrollOffset,
                        animation: { duration: 100, curve: Curve.Ease }
                    });
                }
            }
            if (this.model.isCyslic) {
                this.yearChange = (this.model.solarLatestYearIndex + this.model.mHalfItemCount) % this.YearsArray.length;
                this.dayChange = (this.model.solarLatestDayIndex + this.model.mHalfItemCount) % this.YearsArray[this.yearChange].monthAndDay[(this.model.solarLatestMonthIndex + this.model.mHalfItemCount) % 12].days.length;
                this.model.mDate = this.YearsArray[this.yearChange].year + "-" + this.YearsArray[this.yearChange].monthAndDay[(this.model.solarLatestMonthIndex + this.model.mHalfItemCount) % 12].month + "-" + this.YearsArray[this.yearChange].monthAndDay[this.model.solarLatestMonthIndex].days[this.dayChange];
            }
            else {
                this.model.mDate = this.YearsArray[this.model.solarLatestYearIndex].year + "-" + this.YearsArray[this.model.solarLatestYearIndex].monthAndDay[this.model.solarLatestMonthIndex].month + "-" + this.YearsArray[this.model.solarLatestYearIndex].monthAndDay[this.model.solarLatestMonthIndex].days[this.model.solarLatestDayIndex];
            }
        });
        Scroll.onScrollEdge((side: Edge) => {
            if (this.model.isCyslic) {
                let scollerBack: number = Math.ceil((this.model.mVisibleItem / this.YearsArray[this.model.solarLatestYearIndex].monthAndDay[this.model.solarLatestMonthIndex].days.length * 3) / 2 + 1) * this.YearsArray[this.model.solarLatestYearIndex].monthAndDay[this.model.solarLatestMonthIndex].days.length * this.model.mItemHeight;
                if (side.valueOf() === 0) {
                    this.scrollerDay.scrollTo({
                        xOffset: 0,
                        yOffset: scollerBack,
                        animation: { duration: 0, curve: Curve.Ease }
                    });
                }
                // 向下滚动
                if (side.valueOf() === 2) {
                    this.scrollerDay.scrollTo({
                        xOffset: 0,
                        yOffset: scollerBack - (2 * this.model.mHalfItemCount + 1) * this.model.mItemHeight,
                        animation: { duration: 0, curve: Curve.Ease }
                    });
                }
            }
        });
        Column.create();
        Column.width(ADAPTWIDTH);
        Column.alignItems(this.model.mAlignDay);
        If.create();
        if (!this.model.isCyslic) {
            If.branchId(0);
            ForEach.create("26", this, ObservedObject.GetRawObject(Array.from(new Array(this.model.mHalfItemCount).keys())), (item: number) => {
                Text.create("");
                Text.fontSize(this.model.mItemTextSize);
                Text.height(this.model.mItemHeight);
                Text.padding(this.model.mSpace);
                Text.pop();
            }, (item: string) => item);
            ForEach.pop();
        }
        If.pop();
        If.create();
        if (!this.model.isCyslic) {
            If.branchId(0);
            ForEach.create("27", this, ObservedObject.GetRawObject(this.YearsArray[this.model.solarLatestYearIndex].monthAndDay[this.model.solarLatestMonthIndex].days), (day: number) => {
                Text.create(day.toString());
                Text.fontSize(this.model.mItemTextSize);
                Text.height(this.model.mItemHeight);
                Text.fontColor(this.model.mItemTextColor);
                Text.fontFamily(this.model.mFontFamily);
                Text.padding(this.model.mSpace);
                Text.pop();
            }, (day: number) => day.toString());
            ForEach.pop();
        }
        else if (this.model.mVisibleItem < this.YearsArray[this.model.solarLatestYearIndex].monthAndDay[this.model.solarLatestMonthIndex].days.length) {
            If.branchId(1);
            ForEach.create("29", this, ObservedObject.GetRawObject(Array.from(new Array(3).keys())), (item: number) => {
                ForEach.create("28", this, ObservedObject.GetRawObject(this.YearsArray[this.model.solarLatestYearIndex].monthAndDay[this.model.solarLatestMonthIndex].days), (day: number) => {
                    Text.create(day.toString());
                    Text.fontSize(this.model.mItemTextSize);
                    Text.height(this.model.mItemHeight);
                    Text.fontColor(this.model.mItemTextColor);
                    Text.fontFamily(this.model.mFontFamily);
                    Text.padding(this.model.mSpace);
                    Text.pop();
                }, (day: number) => day.toString());
                ForEach.pop();
            }, (item: string) => item);
            ForEach.pop();
        }
        else {
            If.branchId(2);
            ForEach.create("31", this, ObservedObject.GetRawObject(Array.from(new Array(Math.ceil(this.model.mVisibleItem / this.YearsArray[this.model.solarLatestYearIndex].monthAndDay[this.model.solarLatestMonthIndex].days.length) * 3).keys())), (item: number) => {
                ForEach.create("30", this, ObservedObject.GetRawObject(this.YearsArray[this.model.solarLatestYearIndex].monthAndDay[this.model.solarLatestMonthIndex].days), (day: number) => {
                    Text.create(day.toString());
                    Text.fontSize(this.model.mItemTextSize);
                    Text.height(this.model.mItemHeight);
                    Text.fontColor(this.model.mItemTextColor);
                    Text.fontFamily(this.model.mFontFamily);
                    Text.padding(this.model.mSpace);
                    Text.pop();
                }, (day: number) => day.toString());
                ForEach.pop();
            }, (item: string) => item);
            ForEach.pop();
        }
        If.pop();
        If.create();
        if (!this.model.isCyslic) {
            If.branchId(0);
            ForEach.create("32", this, ObservedObject.GetRawObject(Array.from(new Array(this.model.mHalfItemCount).keys())), (item: number) => {
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
        Scroll.create(this.scrollerDayColor);
        Scroll.height(this.model.mItemHeight);
        Scroll.enabled(false);
        Scroll.backgroundColor('#E5DEEB');
        Scroll.scrollBar(BarState.Off);
        Column.create();
        If.create();
        if (!this.model.isCyslic) {
            If.branchId(0);
            ForEach.create("33", this, ObservedObject.GetRawObject(this.YearsArray[this.model.solarLatestYearIndex].monthAndDay[this.model.solarLatestMonthIndex].days), (day: number) => {
                Text.create(day.toString());
                Text.fontSize(this.model.mItemTextSize);
                Text.height(this.model.mItemHeight);
                Text.fontColor(this.model.mSelectedItemTextColor);
                Text.fontFamily(this.model.mFontFamily);
                Text.padding(this.model.mSpace);
                Text.pop();
            }, (day: number) => day.toString());
            ForEach.pop();
        }
        else if (this.model.mVisibleItem < this.YearsArray[this.model.solarLatestYearIndex].monthAndDay[this.model.solarLatestMonthIndex].days.length) {
            If.branchId(1);
            ForEach.create("35", this, ObservedObject.GetRawObject(Array.from(new Array(3).keys())), (item: number) => {
                ForEach.create("34", this, ObservedObject.GetRawObject(this.YearsArray[this.model.solarLatestYearIndex].monthAndDay[this.model.solarLatestMonthIndex].days), (day: number) => {
                    Text.create(day.toString());
                    Text.fontSize(this.model.mItemTextSize);
                    Text.height(this.model.mItemHeight);
                    Text.fontColor(this.model.mSelectedItemTextColor);
                    Text.fontFamily(this.model.mFontFamily);
                    Text.padding(this.model.mSpace);
                    Text.pop();
                }, (day: number) => day.toString());
                ForEach.pop();
            }, (item: string) => item);
            ForEach.pop();
        }
        else {
            If.branchId(2);
            ForEach.create("37", this, ObservedObject.GetRawObject(Array.from(new Array(Math.ceil(this.model.mVisibleItem / this.YearsArray[this.model.solarLatestYearIndex].monthAndDay[this.model.solarLatestMonthIndex].days.length) * 3).keys())), (item: number) => {
                ForEach.create("36", this, ObservedObject.GetRawObject(this.YearsArray[this.model.solarLatestYearIndex].monthAndDay[this.model.solarLatestMonthIndex].days), (day: number) => {
                    Text.create(day.toString());
                    Text.fontSize(this.model.mItemTextSize);
                    Text.height(this.model.mItemHeight);
                    Text.fontColor(this.model.mSelectedItemTextColor);
                    Text.fontFamily(this.model.mFontFamily);
                    Text.padding(this.model.mSpace);
                    Text.pop();
                }, (day: number) => day.toString());
                ForEach.pop();
            }, (item: string) => item);
            ForEach.pop();
        }
        If.pop();
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
namespace WheelDatePicker {
    export class Model {
        computeEnd: boolean = false;
        mTextHeight: number = 30;
        mSpace: number = 5;
        mItemHeight: number = this.mTextHeight + 2 * this.mSpace;
        mVisibleItem: number = 7;
        mWheelHeight: number = this.mItemHeight * this.mVisibleItem;
        mCenterY: number = this.mWheelHeight / 2;
        mItemTextSize: number = 16;
        mItemTextColor: string = "#536D8A";
        mTextMaxHeight: number = 30;
        mSelectedItemTextColor: string = "#FAFAaa";
        mIndicatorSize: number = 2;
        mIndicatorColor: string = "red";
        mCurtainColor: string = "#FFFFFF";
        mHalfItemCount: number = (this.mVisibleItem - 1) / 2;
        mFontFamily: string = '';
        isCyslic: boolean = true;
        hasIndicator: boolean = true;
        hasAtmospheric: boolean = true;
        hasCurtain: boolean = true;
        mFirstSelectYearPosition: number = this.mHalfItemCount;
        mFirstSelectMonthPosition: number = this.mHalfItemCount;
        mFirstSelectDayPosition: number = this.mHalfItemCount;
        mAlignDay: HorizontalAlign = HorizontalAlign.Center;
        mAlignMonth: HorizontalAlign = HorizontalAlign.Center;
        mAlignYear: HorizontalAlign = HorizontalAlign.Center;
        mData: Array<number> = [];
        yearRangeStart: number = 1972;
        yearRangeEnd: number = 2022;
        solarLatestYearIndex: number = 0;
        solarLatestMonthIndex: number = 0;
        solarLatestDayIndex: number = 0;
        mDate: string = (this.yearRangeStart + this.mFirstSelectYearPosition + this.mHalfItemCount) + '-' + (this.mFirstSelectMonthPosition + this.mHalfItemCount + 1) + '-' + (this.mFirstSelectDayPosition + this.mHalfItemCount + 1);
        constructor() {
        }
        setData(mData: string[]): Model {
            throw new Error("You can not invoke setData in WheelDatePicker");
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
        setFontFamily(fontFamily: string): Model {
            this.mFontFamily = fontFamily;
            return this;
        }
        getFontFamily(): string {
            return this.mFontFamily;
        }
        getItemAlignYear(): HorizontalAlign {
            return this.mAlignYear;
        }
        setItemAlignYear(align: HorizontalAlign): Model {
            this.mAlignYear = align;
            return this;
        }
        getItemAlignMonth(): HorizontalAlign {
            return this.mAlignMonth;
        }
        setItemAlignMonth(align: HorizontalAlign): Model {
            this.mAlignMonth = align;
            return this;
        }
        getItemAlignDay(): HorizontalAlign {
            return this.mAlignDay;
        }
        setItemAlignDay(align: HorizontalAlign): Model {
            this.mAlignDay = align;
            return this;
        }
        getYearStart(): number {
            return this.yearRangeStart;
        }
        setYearStart(yearStart: number) {
            this.yearRangeStart = yearStart;
            return this;
        }
        getYearEnd(): number {
            return this.yearRangeEnd;
        }
        setYearEnd(yearEnd: number) {
            this.yearRangeEnd = yearEnd;
            return this;
        }
        getSelectedYear(): number {
            return this.mFirstSelectYearPosition;
        }
        setSelectedYear(mFirstSelectYearPosition: number): Model {
            this.mFirstSelectYearPosition = mFirstSelectYearPosition;
            return this;
        }
        getCurrentYear(): number {
            return this.solarLatestYearIndex;
        }
        getSelectedMonth(): number {
            return this.mFirstSelectMonthPosition;
        }
        setSelectedMonth(mFirstSelectMonthPosition: number): Model {
            this.mFirstSelectMonthPosition = mFirstSelectMonthPosition;
            return this;
        }
        getCurrentMonth(): number {
            return this.solarLatestMonthIndex;
        }
        getSelectedDay(): number {
            return this.mFirstSelectDayPosition;
        }
        setSelectedDay(mFirstSelectDayPosition: number): Model {
            this.mFirstSelectDayPosition = mFirstSelectDayPosition;
            return this;
        }
        getCurrentDay(): number {
            return this.solarLatestDayIndex;
        }
        setYearAndMonth(mYear: number, mMonth: number) {
            this.mFirstSelectYearPosition = mYear;
            this.mFirstSelectMonthPosition = mMonth;
            return this;
        }
        getYear(): number {
            return this.getSelectedYear() + this.yearRangeStart + 1;
        }
        setYear(FirstSelectPosition: number) {
            this.setSelectedYear(FirstSelectPosition);
        }
        getMonth(): number {
            return this.getSelectedMonth() + 1;
        }
        setMonth(FirstSelectPosition: number) {
            this.setSelectedMonth(FirstSelectPosition);
        }
        getCurrentDate(): string {
            return this.mDate;
        }
        updateVisibleItemCount() {
            this.solarLatestYearIndex = this.mFirstSelectYearPosition;
            this.solarLatestMonthIndex = this.mFirstSelectMonthPosition;
            this.solarLatestDayIndex = this.mFirstSelectDayPosition;
            if (this.mVisibleItem < 2)
                return;
            if (this.mVisibleItem % 2 == 0)
                this.mVisibleItem += 1;
            this.mWheelHeight = this.mVisibleItem * this.mItemHeight;
            this.mCenterY = this.mWheelHeight / 2;
        }
        scrollInit(scroller: Scroller, computeEnd: boolean, mFirstSelectPosition: number, that: any, name1: string) {
            if (!computeEnd) {
                that[name1] = true;
                scroller.scrollTo({
                    xOffset: 0,
                    yOffset: this.mItemHeight * mFirstSelectPosition,
                    animation: { duration: 1, curve: Curve.Ease }
                });
            }
        }
    }
}
export default WheelDatePicker;
