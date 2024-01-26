interface ShowTimePickerViewLib_Params {
    showTimePickerModel?: ShowTimePickerViewLib.Model;
    solarYearsArray?: SolarCalendar[];
    imageState?: boolean;
    YearsArray?: ESObject[];
    solarLatestYearIndex?: number;
    solarLatestMonthIndex?: number;
    solarLatestDayIndex?: number;
    showTimePickerView?: boolean;
    firstYearInsert?: boolean;
    firstMonthInsert?: boolean;
    firstDayInsert?: boolean;
    lastYearPosition?: number;
    lastMonthPosition?: number;
    lastDayPosition?: number;
    caculatorYear?: number;
    caculatorMonth?: number;
    caculatorDay?: number;
    buttonHeight?: number;
    array?;
    scrollerYear?: Scroller;
    scrollerMonth?: Scroller;
    scrollerDay?: Scroller;
    showText?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ShowTimePickerViewLib_" + ++__generate__Id;
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
import { initializeProvinceOnStartup, Province, CityAndArea } from './Province';
import router from '@ohos.router';
import { showToast, setTimeOut } from './ShowToast';
import { DividerType } from './Constant';
import { initializeSolarCalendar, SolarCalendar, MonthAndDay } from './SolarCalendar';
class ShowTimePickerViewLib extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.showTimePickerModel = new ShowTimePickerViewLib.Model();
        this.solarYearsArray = initializeSolarCalendar(this.showTimePickerModel.yearRangeStart, this.showTimePickerModel.yearRangeEnd);
        this.__imageState = new ObservedPropertySimple(false, this, "imageState");
        this.__YearsArray = new ObservedPropertyObject(this.solarYearsArray, this, "YearsArray");
        this.__solarLatestYearIndex = new ObservedPropertySimple(0, this, "solarLatestYearIndex");
        this.__solarLatestMonthIndex = new ObservedPropertySimple(0, this, "solarLatestMonthIndex");
        this.__solarLatestDayIndex = new ObservedPropertySimple(0, this, "solarLatestDayIndex");
        this.__showTimePickerView = new ObservedPropertySimple(false, this, "showTimePickerView");
        this.firstYearInsert = true;
        this.firstMonthInsert = true;
        this.firstDayInsert = true;
        this.lastYearPosition = 0;
        this.lastMonthPosition = 0;
        this.lastDayPosition = 0;
        this.caculatorYear = 1;
        this.caculatorMonth = 1;
        this.caculatorDay = 1;
        this.buttonHeight = 50;
        this.array = [1, 2, 3];
        this.scrollerYear = new Scroller();
        this.scrollerMonth = new Scroller();
        this.scrollerDay = new Scroller();
        this.__showText = new ObservedPropertySimple("显示时间选择器", this, "showText");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ShowTimePickerViewLib_Params) {
        if (params.showTimePickerModel !== undefined) {
            this.showTimePickerModel = params.showTimePickerModel;
        }
        if (params.solarYearsArray !== undefined) {
            this.solarYearsArray = params.solarYearsArray;
        }
        if (params.imageState !== undefined) {
            this.imageState = params.imageState;
        }
        if (params.YearsArray !== undefined) {
            this.YearsArray = params.YearsArray;
        }
        if (params.solarLatestYearIndex !== undefined) {
            this.solarLatestYearIndex = params.solarLatestYearIndex;
        }
        if (params.solarLatestMonthIndex !== undefined) {
            this.solarLatestMonthIndex = params.solarLatestMonthIndex;
        }
        if (params.solarLatestDayIndex !== undefined) {
            this.solarLatestDayIndex = params.solarLatestDayIndex;
        }
        if (params.showTimePickerView !== undefined) {
            this.showTimePickerView = params.showTimePickerView;
        }
        if (params.firstYearInsert !== undefined) {
            this.firstYearInsert = params.firstYearInsert;
        }
        if (params.firstMonthInsert !== undefined) {
            this.firstMonthInsert = params.firstMonthInsert;
        }
        if (params.firstDayInsert !== undefined) {
            this.firstDayInsert = params.firstDayInsert;
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
        if (params.caculatorYear !== undefined) {
            this.caculatorYear = params.caculatorYear;
        }
        if (params.caculatorMonth !== undefined) {
            this.caculatorMonth = params.caculatorMonth;
        }
        if (params.caculatorDay !== undefined) {
            this.caculatorDay = params.caculatorDay;
        }
        if (params.buttonHeight !== undefined) {
            this.buttonHeight = params.buttonHeight;
        }
        if (params.array !== undefined) {
            this.array = params.array;
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
        if (params.showText !== undefined) {
            this.showText = params.showText;
        }
    }
    aboutToBeDeleted() {
        this.__imageState.aboutToBeDeleted();
        this.__YearsArray.aboutToBeDeleted();
        this.__solarLatestYearIndex.aboutToBeDeleted();
        this.__solarLatestMonthIndex.aboutToBeDeleted();
        this.__solarLatestDayIndex.aboutToBeDeleted();
        this.__showTimePickerView.aboutToBeDeleted();
        this.__showText.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private showTimePickerModel: ShowTimePickerViewLib.Model;
    private solarYearsArray: SolarCalendar[];
    private __imageState: ObservedPropertySimple<boolean>;
    get imageState() {
        return this.__imageState.get();
    }
    set imageState(newValue: boolean) {
        this.__imageState.set(newValue);
    }
    private __YearsArray: ObservedPropertyObject<any[]>;
    get YearsArray() {
        return this.__YearsArray.get();
    }
    set YearsArray(newValue: any[]) {
        this.__YearsArray.set(newValue);
    }
    private __solarLatestYearIndex: ObservedPropertySimple<number>;
    get solarLatestYearIndex() {
        return this.__solarLatestYearIndex.get();
    }
    set solarLatestYearIndex(newValue: number) {
        this.__solarLatestYearIndex.set(newValue);
    }
    private __solarLatestMonthIndex: ObservedPropertySimple<number>;
    get solarLatestMonthIndex() {
        return this.__solarLatestMonthIndex.get();
    }
    set solarLatestMonthIndex(newValue: number) {
        this.__solarLatestMonthIndex.set(newValue);
    }
    private __solarLatestDayIndex: ObservedPropertySimple<number>;
    get solarLatestDayIndex() {
        return this.__solarLatestDayIndex.get();
    }
    set solarLatestDayIndex(newValue: number) {
        this.__solarLatestDayIndex.set(newValue);
    }
    private __showTimePickerView: ObservedPropertySimple<boolean>;
    get showTimePickerView() {
        return this.__showTimePickerView.get();
    }
    set showTimePickerView(newValue: boolean) {
        this.__showTimePickerView.set(newValue);
    }
    private firstYearInsert: boolean;
    private firstMonthInsert: boolean;
    private firstDayInsert: boolean;
    private lastYearPosition: number;
    private lastMonthPosition: number;
    private lastDayPosition: number;
    private caculatorYear: number;
    private caculatorMonth: number;
    private caculatorDay: number;
    private buttonHeight: number;
    private array;
    private scrollerYear: Scroller;
    private scrollerMonth: Scroller;
    private scrollerDay: Scroller;
    private __showText: ObservedPropertySimple<string>;
    get showText() {
        return this.__showText.get();
    }
    set showText(newValue: string) {
        this.__showText.set(newValue);
    }
    render() {
        Column.create();
        Column.alignItems(HorizontalAlign.Center);
        Column.width("100%");
        Row.create();
        Row.alignItems(VerticalAlign.Top);
        Row.margin({ top: 10 });
        Text.create(this.showText);
        Text.height(this.buttonHeight);
        Text.fontSize(this.showTimePickerModel.titleFontSize);
        Text.fontColor(this.showTimePickerModel.titleFontColor);
        Text.backgroundColor(Color.Gray);
        Text.width("90%");
        Text.textAlign(TextAlign.Center);
        Text.onClick(() => {
            this.showTimePickerView = !this.showTimePickerView;
            if (this.showTimePickerView) { //再次打开，将index置为0
                this.solarLatestYearIndex = 0;
                this.solarLatestMonthIndex = 0;
                this.solarLatestDayIndex = 0;
            }
        });
        Text.pop();
        Row.pop();
        If.create();
        if (this.showTimePickerView) {
            If.branchId(0);
            Row.create();
            Row.margin({ top: 10 });
            Flex.create({ justifyContent: FlexAlign.SpaceBetween });
            Flex.backgroundColor("#7CDCDC");
            Flex.margin({ bottom: 0 });
            Button.createWithLabel(this.showTimePickerModel.cancelButtonFont);
            Button.height(this.buttonHeight);
            Button.fontSize(this.showTimePickerModel.titleFontSize);
            Button.backgroundColor(this.showTimePickerModel.buttonBackgroundColor);
            Button.fontColor(this.showTimePickerModel.cancelButtonColor);
            Button.margin({ left: 10 });
            Button.onClick(() => {
                router.back();
            });
            Button.pop();
            Button.createWithLabel(this.showTimePickerModel.confirmButtonFont);
            Button.fontSize(this.showTimePickerModel.titleFontSize);
            Button.backgroundColor(this.showTimePickerModel.buttonBackgroundColor);
            Button.fontColor(this.showTimePickerModel.confirmButtonColor);
            Button.onClick(() => {
                let selectYear: any = this.YearsArray[this.solarLatestYearIndex].year;
                let selectMonth: any = this.YearsArray[this.solarLatestYearIndex].monthAndDay[this.solarLatestMonthIndex].month;
                let daysArray: any = this.YearsArray[this.solarLatestYearIndex].monthAndDay[this.solarLatestMonthIndex].days;
                if (daysArray.length < (this.solarLatestDayIndex + 1)) {
                    this.solarLatestDayIndex = daysArray.length - 1;
                }
                let selectDay: any = daysArray[this.solarLatestDayIndex];
                this.showText = selectYear + "-" + selectMonth + "-" + selectDay;
            });
            Button.pop();
            Flex.pop();
            Row.pop();
            Stack.create({ alignContent: Alignment.TopStart });
            Stack.width('100%');
            Stack.height('100%');
            Stack.align(Alignment.Center);
            If.create();
            if (this.showTimePickerModel.dividerType == DividerType.FILL) {
                If.branchId(0);
                Divider.create();
                Divider.vertical(false);
                Divider.strokeWidth(this.showTimePickerModel.dividerLineStroke);
                Divider.color(this.showTimePickerModel.dividerLineColor);
                Divider.lineCap(LineCapStyle.Round);
                Divider.margin({ top: this.showTimePickerModel.textHeight * 2 });
                Divider.create();
                Divider.vertical(false);
                Divider.strokeWidth(this.showTimePickerModel.dividerLineStroke);
                Divider.color(this.showTimePickerModel.dividerLineColor);
                Divider.lineCap(LineCapStyle.Round);
                Divider.margin({ top: this.showTimePickerModel.textHeight * 3 });
            }
            else if (this.showTimePickerModel.dividerType == DividerType.CIRCLE) {
                If.branchId(1);
                Circle.create({ width: "30%", height: this.showTimePickerModel.textHeight });
                Circle.fillOpacity(0);
                Circle.stroke(this.showTimePickerModel.dividerLineColor);
                Circle.strokeWidth(this.showTimePickerModel.dividerLineStroke);
                Circle.margin({ left: this.showTimePickerModel.columnLeftWidth[0], top: this.showTimePickerModel.textHeight * 2 });
                Circle.create({ width: "30%", height: this.showTimePickerModel.textHeight });
                Circle.fillOpacity(0);
                Circle.stroke(this.showTimePickerModel.dividerLineColor);
                Circle.strokeWidth(this.showTimePickerModel.dividerLineStroke);
                Circle.margin({ left: this.showTimePickerModel.columnLeftWidth[1], top: this.showTimePickerModel.textHeight * 2 });
                Circle.create({ width: "30%", height: this.showTimePickerModel.textHeight });
                Circle.fillOpacity(0);
                Circle.stroke(this.showTimePickerModel.dividerLineColor);
                Circle.strokeWidth(this.showTimePickerModel.dividerLineStroke);
                Circle.margin({ left: this.showTimePickerModel.columnLeftWidth[2], top: this.showTimePickerModel.textHeight * 2 });
            }
            else if (this.showTimePickerModel.dividerType == DividerType.WRAP) {
                If.branchId(2);
                ForEach.create("2", this, ObservedObject.GetRawObject(this.array), (index: number) => {
                    Divider.create();
                    Divider.vertical(false);
                    Divider.strokeWidth(this.showTimePickerModel.dividerLineStroke);
                    Divider.color(this.showTimePickerModel.dividerLineColor);
                    Divider.lineCap(LineCapStyle.Round);
                    Divider.margin({ left: this.showTimePickerModel.columnLeftWidth[index], top: this.showTimePickerModel.textHeight * 2 });
                    Divider.width("30%");
                    Divider.create();
                    Divider.vertical(false);
                    Divider.strokeWidth(this.showTimePickerModel.dividerLineStroke);
                    Divider.color(this.showTimePickerModel.dividerLineColor);
                    Divider.lineCap(LineCapStyle.Round);
                    Divider.margin({ left: this.showTimePickerModel.columnLeftWidth[index], top: this.showTimePickerModel.textHeight * 3 });
                    Divider.width("30%");
                }, (index: number) => index.toString());
                ForEach.pop();
            }
            If.pop();
            Row.create();
            Row.height(this.showTimePickerModel.popupWindowHeight);
            Scroll.create(this.scrollerYear);
            Scroll.scrollBar(BarState.Off);
            Scroll.onScroll((xOffset: number, yOffset: number) => {
                this.lastYearPosition = yOffset == 0 ? this.lastYearPosition : yOffset;
                if (this.firstYearInsert) { //首次进入，用于初始化位置
                    if (this.showTimePickerModel.defaultSelection[0] != null) {
                        this.YearsArray.forEach((val: any, idx: number) => {
                            if (this.showTimePickerModel.defaultSelection[0] == val.year) {
                                this.scrollerYear.scrollTo({ xOffset: 0, yOffset: idx * this.showTimePickerModel.textHeight, animation: { duration: 1, curve: Curve.Ease } });
                                this.solarLatestYearIndex = idx;
                            }
                        });
                    }
                    this.firstYearInsert = false;
                }
            });
            Scroll.onScrollStop(() => {
                // 滑动过后，计算滑动距离，保持选择项在红色线之内
                let scrollYearOffset = this.scrollerYear.currentOffset().yOffset % this.showTimePickerModel.textHeight;
                if (scrollYearOffset > 1) {
                    if (this.lastYearPosition <= 0) { // 小于0，向下滑动，大于0是，是向上滑动
                        // 获取选中的年
                        this.solarLatestYearIndex = (this.scrollerYear.currentOffset().yOffset - scrollYearOffset) / this.showTimePickerModel.textHeight;
                        this.scrollerYear.scrollTo({ xOffset: 0, yOffset: this.scrollerYear.currentOffset().yOffset
                                - scrollYearOffset, animation: { duration: 2000, curve: Curve.Ease } });
                    }
                    else {
                        this.solarLatestYearIndex = (this.scrollerYear.currentOffset().yOffset - scrollYearOffset)
                            / this.showTimePickerModel.textHeight + 1;
                        this.scrollerYear.scrollTo({ xOffset: 0, yOffset: this.scrollerYear.currentOffset().yOffset
                                + this.showTimePickerModel.textHeight - scrollYearOffset, animation: { duration: 2000, curve: Curve.Ease } });
                    }
                }
            });
            Scroll.onScrollEdge((side: Edge) => {
                this.solarLatestYearIndex = this.scrollerYear.currentOffset().yOffset / this.showTimePickerModel.textHeight;
            });
            Column.create();
            Column.width("32%");
            // 年
            Text.create(" ");
            // 年
            Text.fontSize(this.showTimePickerModel.fontSize);
            // 年
            Text.height(this.showTimePickerModel.textHeight);
            // 年
            Text.pop();
            Text.create(" ");
            Text.fontSize(this.showTimePickerModel.fontSize);
            Text.height(this.showTimePickerModel.textHeight);
            Text.pop();
            ForEach.create("3", this, ObservedObject.GetRawObject(this.YearsArray), (solarYearItem: SolarCalendar) => {
                Text.create((solarYearItem.year).toString());
                Text.fontSize(this.showTimePickerModel.fontSize);
                Text.height(this.showTimePickerModel.textHeight);
                Text.pop();
            }, (day: number) => day.toString());
            ForEach.pop();
            Text.create(" ");
            Text.fontSize(this.showTimePickerModel.fontSize);
            Text.height(this.showTimePickerModel.textHeight);
            Text.pop();
            Text.create(" ");
            Text.fontSize(this.showTimePickerModel.fontSize);
            Text.height(this.showTimePickerModel.textHeight);
            Text.pop();
            Column.pop();
            Scroll.pop();
            Column.create();
            Column.width("2%");
            Divider.create();
            Divider.vertical(true);
            Divider.color(Color.Gray);
            Divider.height(this.showTimePickerModel.textHeight * 5);
            Divider.strokeWidth(0.5);
            Column.pop();
            // 月
            Scroll.create(this.scrollerMonth);
            // 月
            Scroll.scrollBar(BarState.Off);
            // 月
            Scroll.onScroll((xOffset: number, yOffset: number) => {
                this.lastMonthPosition = yOffset == 0 ? this.lastMonthPosition : yOffset;
                if (this.firstMonthInsert) { //首次进入，用于初始化位置
                    if (this.showTimePickerModel.defaultSelection[1] != null) {
                        this.YearsArray[this.solarLatestYearIndex].monthAndDay.forEach((val: any, idx: number) => {
                            if (this.showTimePickerModel.defaultSelection[1] == val.month) {
                                this.scrollerMonth.scrollTo({ xOffset: 0, yOffset: idx * this.showTimePickerModel.textHeight, animation: { duration: 1, curve: Curve.Ease } });
                                //为初始化值设置index
                                this.solarLatestMonthIndex = idx;
                            }
                        });
                    }
                    this.firstMonthInsert = false;
                }
            });
            // 月
            Scroll.onScrollStop(() => {
                let scrollMonthOffset = this.scrollerMonth.currentOffset().yOffset % this.showTimePickerModel.textHeight;
                // 滑动过后，计算滑动距离，保持选择项在红色线之内
                if (scrollMonthOffset > 1) {
                    if (this.lastMonthPosition <= 0) { // 小于0，向下滑动，大于0是，是向上滑动
                        this.solarLatestMonthIndex = (this.scrollerMonth.currentOffset().yOffset - scrollMonthOffset)
                            / this.showTimePickerModel.textHeight;
                        this.scrollerMonth.scrollTo({ xOffset: 0, yOffset: this.scrollerMonth.currentOffset().yOffset
                                - scrollMonthOffset, animation: { duration: 2000, curve: Curve.Ease } });
                    }
                    else {
                        this.solarLatestMonthIndex = (this.scrollerMonth.currentOffset().yOffset - scrollMonthOffset)
                            / this.showTimePickerModel.textHeight + 1;
                        //计算选择的 月
                        this.scrollerMonth.scrollTo({ xOffset: 0, yOffset: this.scrollerMonth.currentOffset().yOffset
                                + this.showTimePickerModel.textHeight - scrollMonthOffset, animation: { duration: 2000, curve: Curve.Ease } });
                    }
                    // 处理 所选月份的天数小于之前INDEX
                    let dayLength = this.YearsArray[this.solarLatestYearIndex].monthAndDay[this.solarLatestMonthIndex].days.length - 1;
                    if (this.solarLatestDayIndex > dayLength) {
                        this.solarLatestDayIndex = dayLength;
                    }
                }
            });
            // 月
            Scroll.onScrollEdge((side: Edge) => {
                this.solarLatestMonthIndex = this.scrollerMonth.currentOffset().yOffset / this.showTimePickerModel.textHeight;
            });
            Column.create();
            Column.width('32%');
            Text.create(" ");
            Text.fontSize(this.showTimePickerModel.fontSize);
            Text.height(this.showTimePickerModel.textHeight);
            Text.pop();
            Text.create(" ");
            Text.fontSize(this.showTimePickerModel.fontSize);
            Text.height(this.showTimePickerModel.textHeight);
            Text.pop();
            //  月
            ForEach.create("4", this, ObservedObject.GetRawObject(this.YearsArray[this.solarLatestYearIndex].monthAndDay), (monthAndDay: MonthAndDay) => {
                Text.create(monthAndDay.month.toString());
                Text.fontSize(this.showTimePickerModel.fontSize);
                Text.height(this.showTimePickerModel.textHeight);
                Text.pop();
            }, (day: number) => day.toString());
            //  月
            ForEach.pop();
            Text.create(" ");
            Text.fontSize(this.showTimePickerModel.fontSize);
            Text.height(this.showTimePickerModel.textHeight);
            Text.pop();
            Text.create(" ");
            Text.fontSize(this.showTimePickerModel.fontSize);
            Text.height(this.showTimePickerModel.textHeight);
            Text.pop();
            Column.pop();
            // 月
            Scroll.pop();
            Column.create();
            Column.width("2%");
            Divider.create();
            Divider.vertical(true);
            Divider.color(Color.Gray);
            Divider.height(this.showTimePickerModel.textHeight * 5);
            Divider.strokeWidth(0.5);
            Column.pop();
            // 日
            Scroll.create(this.scrollerDay);
            // 日
            Scroll.scrollBar(BarState.Off);
            // 日
            Scroll.onScroll((xOffset: number, yOffset: number) => {
                this.lastDayPosition = yOffset == 0 ? this.lastMonthPosition : yOffset;
                if (this.firstDayInsert) { //首次进入，用于初始化位置
                    if (this.showTimePickerModel.defaultSelection[2] != null) {
                        this.YearsArray[this.solarLatestYearIndex].monthAndDay[this.solarLatestMonthIndex].days.forEach((val: number, idx: number) => {
                            if (this.showTimePickerModel.defaultSelection[2] == val) {
                                this.scrollerDay.scrollTo({ xOffset: 0, yOffset: idx * this.showTimePickerModel.textHeight, animation: { duration: 1, curve: Curve.Ease } });
                                this.solarLatestDayIndex = idx;
                            }
                        });
                    }
                    this.firstDayInsert = false;
                }
            });
            // 日
            Scroll.onScrollStop(() => {
                let scrollDayOffset = this.scrollerDay.currentOffset().yOffset % this.showTimePickerModel.textHeight;
                // 滑动过后，计算滑动距离，保持选择项在红色线之内
                // 小于0，向下滑动，大于0是，是向上滑动
                if (scrollDayOffset > 1) {
                    if (this.lastDayPosition <= 0) {
                        this.scrollerDay.scrollTo({ xOffset: 0, yOffset: this.scrollerDay.currentOffset().yOffset
                                - scrollDayOffset, animation: { duration: 2000, curve: Curve.Ease } });
                        this.solarLatestDayIndex = (this.scrollerDay.currentOffset().yOffset - scrollDayOffset) / this.showTimePickerModel.textHeight;
                    }
                    else {
                        this.scrollerDay.scrollTo({ xOffset: 0, yOffset: this.scrollerDay.currentOffset().yOffset + this.showTimePickerModel.textHeight
                                - scrollDayOffset, animation: { duration: 2000, curve: Curve.Ease } });
                        this.solarLatestDayIndex = (this.scrollerDay.currentOffset().yOffset - scrollDayOffset) / this.showTimePickerModel.textHeight + 1;
                    }
                }
            });
            // 日
            Scroll.onScrollEdge((side: Edge) => {
                this.solarLatestDayIndex = this.scrollerDay.currentOffset().yOffset / this.showTimePickerModel.textHeight;
            });
            Column.create();
            Column.width('32%');
            Text.create(" ");
            Text.fontSize(this.showTimePickerModel.fontSize);
            Text.height(this.showTimePickerModel.textHeight);
            Text.pop();
            Text.create(" ");
            Text.fontSize(this.showTimePickerModel.fontSize);
            Text.height(this.showTimePickerModel.textHeight);
            Text.pop();
            // 阳历 日
            ForEach.create("5", this, ObservedObject.GetRawObject(this.YearsArray[this.solarLatestYearIndex].monthAndDay[this.solarLatestMonthIndex].days), (day: any) => {
                Text.create(day.toString());
                Text.fontSize(this.showTimePickerModel.fontSize);
                Text.height(this.showTimePickerModel.textHeight);
                Text.pop();
            }, (day: number) => day.toString());
            // 阳历 日
            ForEach.pop();
            Text.create(" ");
            Text.fontSize(this.showTimePickerModel.fontSize);
            Text.height(this.showTimePickerModel.textHeight);
            Text.pop();
            Text.create(" ");
            Text.fontSize(this.showTimePickerModel.fontSize);
            Text.height(this.showTimePickerModel.textHeight);
            Text.pop();
            Column.pop();
            // 日
            Scroll.pop();
            Row.pop();
            Stack.pop();
        }
        If.pop();
        Column.pop();
    }
}
namespace ShowTimePickerViewLib {
    export class Model {
        text: string = '';
        dividerLineColor: Color = Color.Red;
        dividerLineStroke: number = 1;
        fontSize: number = 30;
        fontColor: Color = Color.Black;
        titleFontSize: number = 20;
        titleFontColor: Color = Color.Black;
        cancelButtonFont: string = "cancel";
        confirmButtonFont: string = "confirm";
        cancelButtonColor: Color = Color.Green;
        confirmButtonColor: Color = Color.Green;
        color: string = '';
        onclick: Function = () => { };
        yearRangeStart: number = 2010;
        yearRangeEnd: number = 2030;
        pickerSpace: number = 15;
        buttonBackgroundColor: string = "#7CDCDC";
        defaultSelection: any[] = [];
        dividerType?: DividerType = DividerType.FILL;
        lineSpacingMultiplier: number = 0;
        popupWindowHeight: number = 250;
        textHeight: number = 50;
        columnLeftWidth: string[] = ["1%", "35%", "69%"];
        setLineSpacingMultiplier(lineSpacingMultiplier: number): Model {
            if (lineSpacingMultiplier > 50) {
                lineSpacingMultiplier = 50;
            }
            this.lineSpacingMultiplier = lineSpacingMultiplier;
            this.textHeight = 50 + lineSpacingMultiplier;
            this.popupWindowHeight = this.textHeight * 5;
            return this;
        }
        setDividerType(dividerType: DividerType): Model {
            this.dividerType = dividerType;
            return this;
        }
        setDefaultSelection(defaultSelection: any[]): Model {
            this.defaultSelection = defaultSelection;
            return this;
        }
        setButtonBackgroundColor(buttonBackgroundColor: string): Model {
            this.buttonBackgroundColor = buttonBackgroundColor;
            return this;
        }
        setPickerSpace(pickerSpace: number): Model {
            this.pickerSpace = pickerSpace;
            return this;
        }
        setYearRangeStart(yearRangeStart: number): Model {
            this.yearRangeStart = yearRangeStart;
            return this;
        }
        setYearRangeEnd(yearRangeEnd: number): Model {
            this.yearRangeEnd = yearRangeEnd;
            return this;
        }
        setDividerLineStroke(dividerLineStroke: number): Model {
            if (0 < dividerLineStroke && dividerLineStroke <= 5) {
                this.dividerLineStroke = dividerLineStroke;
            }
            else {
                dividerLineStroke = 2;
            }
            return this;
        }
        setDividerLineColor(color: Color): Model {
            this.dividerLineColor = color;
            return this;
        }
        setFontSize(fontSize: number): Model {
            this.fontSize = fontSize;
            return this;
        }
        setFontColor(fontColor: Color): Model {
            this.fontColor = fontColor;
            return this;
        }
        setTitleFontSize(titleFontSize: number): Model {
            this.titleFontSize = titleFontSize;
            return this;
        }
        setTitleFontColor(titleFontColor: Color): Model {
            this.titleFontColor = titleFontColor;
            return this;
        }
        setCancelButtonFont(cancelButtonFont: string): Model {
            this.cancelButtonFont = cancelButtonFont;
            return this;
        }
        setConfirmButtonFont(confirmButtonFont: string): Model {
            this.confirmButtonFont = confirmButtonFont;
            return this;
        }
        setCancelButtonColor(cancelButtonColor: Color): Model {
            this.cancelButtonColor = cancelButtonColor;
            return this;
        }
        setConfirmButtonColor(confirmButtonColor: Color): Model {
            this.confirmButtonColor = confirmButtonColor;
            return this;
        }
        withText(text: string): Model {
            this.text = text;
            return this;
        }
        withClick(callback: (event?: ClickEvent) => void): Model {
            this.onclick = callback;
            return this;
        }
    }
}
export default ShowTimePickerViewLib;
