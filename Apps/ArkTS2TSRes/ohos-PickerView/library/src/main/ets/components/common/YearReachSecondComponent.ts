interface YearReachSecondComponent_Params {
    currentThis?;
    selectValue?: string;
    confirmValue?: string;
    model?: YearReachSecondComponent.Model;
    dialogController?: CustomDialogController;
}
interface CustomDialogExample_Params {
    currentThis?: ESObject;
    firstYearInsert?: boolean;
    firstMonthInsert?: boolean;
    firstDayInsert?: boolean;
    firstHourInsert?: boolean;
    firstSecondInsert?: boolean;
    firstMinuteInsert?: boolean;
    confirmValue?: string;
    controller?: CustomDialogController;
    cancel?: () => void;
    confirm?: () => void;
    timePickerModel?: YearReachSecondComponent.Model;
    imageState?: boolean;
    solarLatestYearIndex?: number;
    solarLatestMonthIndex?: number;
    solarLatestDayIndex?: number;
    hourIndex?: number;
    secondIndex?: number;
    minuteIndex?: number;
    solarYearsArray?: SolarCalendar[];
    YearsArray?: SolarCalendar[];
    hourAndSecondAndMinuteArray?: HourAndSecondAndMinute[];
    lastYearPosition?: number;
    lastMonthPosition?: number;
    lastDayPosition?: number;
    caculatorYear?: number;
    caculatorMonth?: number;
    caculatorDay?: number;
    buttonHeight?: number;
    scrollerYear?: Scroller;
    scrollerYearForList?: Scroller;
    scrollerMonth?: Scroller;
    scrollerDay?: Scroller;
    scrollerFirst?: Scroller;
    scrollerSecond?: Scroller;
    scrollerThird?: Scroller;
    lastHourPosition?: number;
    lastSecondPosition?: number;
    lastMinutePosition?: number;
    marginLeft?: number;
    hourArray?: ESObject[];
    minuteArray?: ESObject[];
    secondArray?: ESObject[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "YearReachSecondComponent_" + ++__generate__Id;
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
import { initializeHourAndSecondAndMinute, HourAndSecondAndMinute } from './HourSecondMinuteModel';
import { DividerType, DateType } from './Constant';
class Param {
    index: number = 0;
    data: string | number = "";
    constructor(index: number, data: string | number) {
        this.index = index;
        this.data = data;
    }
}
class CustomDialogExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.currentThis = undefined;
        this.firstYearInsert = true;
        this.firstMonthInsert = true;
        this.firstDayInsert = true;
        this.firstHourInsert = true;
        this.firstSecondInsert = true;
        this.firstMinuteInsert = true;
        this.confirmValue = "";
        this.controller = undefined;
        this.cancel = () => { };
        this.confirm = () => { };
        this.__timePickerModel = new SynchedPropertyObjectTwoWay(params.timePickerModel, this, "timePickerModel");
        this.__imageState = new ObservedPropertySimple(false, this, "imageState");
        this.__solarLatestYearIndex = new ObservedPropertySimple(0, this, "solarLatestYearIndex");
        this.__solarLatestMonthIndex = new ObservedPropertySimple(0, this, "solarLatestMonthIndex");
        this.__solarLatestDayIndex = new ObservedPropertySimple(0, this, "solarLatestDayIndex");
        this.hourIndex = 0;
        this.secondIndex = 0;
        this.minuteIndex = 0;
        this.solarYearsArray = initializeSolarCalendar(this.timePickerModel.yearRangeStart, this.timePickerModel.yearRangeEnd);
        this.__YearsArray = new ObservedPropertyObject(this.solarYearsArray, this, "YearsArray");
        this.hourAndSecondAndMinuteArray = initializeHourAndSecondAndMinute();
        this.lastYearPosition = 0;
        this.lastMonthPosition = 0;
        this.lastDayPosition = 0;
        this.caculatorYear = 1;
        this.caculatorMonth = 1;
        this.caculatorDay = 1;
        this.buttonHeight = 50;
        this.scrollerYear = new Scroller();
        this.scrollerYearForList = new Scroller();
        this.scrollerMonth = new Scroller();
        this.scrollerDay = new Scroller();
        this.scrollerFirst = new Scroller();
        this.scrollerSecond = new Scroller();
        this.scrollerThird = new Scroller();
        this.lastHourPosition = 0;
        this.lastSecondPosition = 0;
        this.lastMinutePosition = 0;
        this.marginLeft = 12;
        this.__hourArray = new ObservedPropertyObject(this.hourAndSecondAndMinuteArray[0].hour, this, "hourArray");
        this.__minuteArray = new ObservedPropertyObject(this.hourAndSecondAndMinuteArray[0].minute, this, "minuteArray");
        this.__secondArray = new ObservedPropertyObject(this.hourAndSecondAndMinuteArray[0].second, this, "secondArray");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomDialogExample_Params) {
        if (params.currentThis !== undefined) {
            this.currentThis = params.currentThis;
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
        if (params.firstHourInsert !== undefined) {
            this.firstHourInsert = params.firstHourInsert;
        }
        if (params.firstSecondInsert !== undefined) {
            this.firstSecondInsert = params.firstSecondInsert;
        }
        if (params.firstMinuteInsert !== undefined) {
            this.firstMinuteInsert = params.firstMinuteInsert;
        }
        if (params.confirmValue !== undefined) {
            this.confirmValue = params.confirmValue;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.cancel !== undefined) {
            this.cancel = params.cancel;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
        if (params.imageState !== undefined) {
            this.imageState = params.imageState;
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
        if (params.hourIndex !== undefined) {
            this.hourIndex = params.hourIndex;
        }
        if (params.secondIndex !== undefined) {
            this.secondIndex = params.secondIndex;
        }
        if (params.minuteIndex !== undefined) {
            this.minuteIndex = params.minuteIndex;
        }
        if (params.solarYearsArray !== undefined) {
            this.solarYearsArray = params.solarYearsArray;
        }
        if (params.YearsArray !== undefined) {
            this.YearsArray = params.YearsArray;
        }
        if (params.hourAndSecondAndMinuteArray !== undefined) {
            this.hourAndSecondAndMinuteArray = params.hourAndSecondAndMinuteArray;
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
        if (params.scrollerYear !== undefined) {
            this.scrollerYear = params.scrollerYear;
        }
        if (params.scrollerYearForList !== undefined) {
            this.scrollerYearForList = params.scrollerYearForList;
        }
        if (params.scrollerMonth !== undefined) {
            this.scrollerMonth = params.scrollerMonth;
        }
        if (params.scrollerDay !== undefined) {
            this.scrollerDay = params.scrollerDay;
        }
        if (params.scrollerFirst !== undefined) {
            this.scrollerFirst = params.scrollerFirst;
        }
        if (params.scrollerSecond !== undefined) {
            this.scrollerSecond = params.scrollerSecond;
        }
        if (params.scrollerThird !== undefined) {
            this.scrollerThird = params.scrollerThird;
        }
        if (params.lastHourPosition !== undefined) {
            this.lastHourPosition = params.lastHourPosition;
        }
        if (params.lastSecondPosition !== undefined) {
            this.lastSecondPosition = params.lastSecondPosition;
        }
        if (params.lastMinutePosition !== undefined) {
            this.lastMinutePosition = params.lastMinutePosition;
        }
        if (params.marginLeft !== undefined) {
            this.marginLeft = params.marginLeft;
        }
        if (params.hourArray !== undefined) {
            this.hourArray = params.hourArray;
        }
        if (params.minuteArray !== undefined) {
            this.minuteArray = params.minuteArray;
        }
        if (params.secondArray !== undefined) {
            this.secondArray = params.secondArray;
        }
    }
    aboutToBeDeleted() {
        this.__timePickerModel.aboutToBeDeleted();
        this.__imageState.aboutToBeDeleted();
        this.__solarLatestYearIndex.aboutToBeDeleted();
        this.__solarLatestMonthIndex.aboutToBeDeleted();
        this.__solarLatestDayIndex.aboutToBeDeleted();
        this.__YearsArray.aboutToBeDeleted();
        this.__hourArray.aboutToBeDeleted();
        this.__minuteArray.aboutToBeDeleted();
        this.__secondArray.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private currentThis: any;
    private firstYearInsert: boolean;
    private firstMonthInsert: boolean;
    private firstDayInsert: boolean;
    private firstHourInsert: boolean;
    private firstSecondInsert: boolean;
    private firstMinuteInsert: boolean;
    private confirmValue: string;
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private cancel: () => void;
    private confirm: () => void;
    private __timePickerModel: SynchedPropertySimpleOneWay<YearReachSecondComponent.Model>;
    get timePickerModel() {
        return this.__timePickerModel.get();
    }
    set timePickerModel(newValue: YearReachSecondComponent.Model) {
        this.__timePickerModel.set(newValue);
    }
    private __imageState: ObservedPropertySimple<boolean>;
    get imageState() {
        return this.__imageState.get();
    }
    set imageState(newValue: boolean) {
        this.__imageState.set(newValue);
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
    private hourIndex: number;
    private secondIndex: number;
    private minuteIndex: number;
    private solarYearsArray: SolarCalendar[];
    private __YearsArray: ObservedPropertyObject<SolarCalendar[]>;
    get YearsArray() {
        return this.__YearsArray.get();
    }
    set YearsArray(newValue: SolarCalendar[]) {
        this.__YearsArray.set(newValue);
    }
    private hourAndSecondAndMinuteArray: HourAndSecondAndMinute[];
    private lastYearPosition: number;
    private lastMonthPosition: number;
    private lastDayPosition: number;
    private caculatorYear: number;
    private caculatorMonth: number;
    private caculatorDay: number;
    private buttonHeight: number;
    private scrollerYear: Scroller;
    private scrollerYearForList: Scroller;
    private scrollerMonth: Scroller;
    private scrollerDay: Scroller;
    private scrollerFirst: Scroller;
    private scrollerSecond: Scroller;
    private scrollerThird: Scroller;
    private lastHourPosition: number;
    private lastSecondPosition: number;
    private lastMinutePosition: number;
    private marginLeft: number;
    private __hourArray: ObservedPropertyObject<any[]>;
    get hourArray() {
        return this.__hourArray.get();
    }
    set hourArray(newValue: any[]) {
        this.__hourArray.set(newValue);
    }
    private __minuteArray: ObservedPropertyObject<any[]>;
    get minuteArray() {
        return this.__minuteArray.get();
    }
    set minuteArray(newValue: any[]) {
        this.__minuteArray.set(newValue);
    }
    private __secondArray: ObservedPropertyObject<any[]>;
    get secondArray() {
        return this.__secondArray.get();
    }
    set secondArray(newValue: any[]) {
        this.__secondArray.set(newValue);
    }
    aboutToAppear() {
        //计算默认年的索引
        if (this.timePickerModel.defaultSelection[0] && this.timePickerModel.defaultSelection[0] != "0") {
            this.YearsArray.forEach((val: SolarCalendar, idx: number) => {
                if (this.timePickerModel.defaultSelection[0] == val.year.toString()) {
                    this.solarLatestYearIndex = idx;
                }
            });
        }
        //计算默认月的索引
        if (this.timePickerModel.defaultSelection[1] && this.timePickerModel.defaultSelection[1] != "0") {
            this.YearsArray[this.solarLatestYearIndex].monthAndDay.forEach((val: any, idx: number) => {
                if (this.timePickerModel.defaultSelection[1] == val.month) {
                    this.solarLatestMonthIndex = idx;
                }
            });
        }
        //计算默认日的索引
        if (this.timePickerModel.defaultSelection[2] && this.timePickerModel.defaultSelection[2] != "0") {
            this.YearsArray[this.solarLatestYearIndex].monthAndDay[this.solarLatestMonthIndex].days.forEach((val: string, idx: number) => {
                if (this.timePickerModel.defaultSelection[2] == val) {
                    this.solarLatestDayIndex = idx;
                }
            });
        }
        //计算默认时的索引
        if (this.timePickerModel.defaultSelection[3] && this.timePickerModel.defaultSelection[3] != "0") {
            this.hourArray.forEach((val: string, idx: number) => {
                if (this.timePickerModel.defaultSelection[3] == val) {
                    this.hourIndex = idx;
                }
            });
        }
        //计算默认分的索引
        if (this.timePickerModel.defaultSelection[4] && this.timePickerModel.defaultSelection[4] != "0") {
            this.secondArray.forEach((val: string, idx: number) => {
                if (this.timePickerModel.defaultSelection[4] == val) {
                    this.minuteIndex = idx;
                }
            });
        }
        //计算默认秒的索引
        if (this.timePickerModel.defaultSelection[5] && this.timePickerModel.defaultSelection[5] != "0") {
            this.minuteArray.forEach((val: string, idx: number) => {
                if (this.timePickerModel.defaultSelection[5] == val) {
                    this.secondIndex = idx;
                }
            });
        }
    }
    render() {
        Column.create();
        Column.margin({ bottom: 5 });
        Column.backgroundColor(Color.White);
        Column.width("90%");
        Flex.create({ justifyContent: FlexAlign.SpaceBetween });
        Flex.backgroundColor("#7CDCDC");
        Flex.margin({ bottom: 0 });
        Button.createWithLabel(this.timePickerModel.cancelButtonFont);
        Button.height(this.buttonHeight);
        Button.fontSize(this.timePickerModel.titleFontSize);
        Button.backgroundColor(this.timePickerModel.buttonBackgroundColor);
        Button.fontColor(this.timePickerModel.cancelButtonColor);
        Button.onClick(() => {
            this.controller.close();
            this.cancel();
        });
        Button.pop();
        Button.createWithLabel(this.timePickerModel.confirmButtonFont);
        Button.height(this.buttonHeight);
        Button.fontSize(this.timePickerModel.titleFontSize);
        Button.backgroundColor(this.timePickerModel.buttonBackgroundColor);
        Button.fontColor(this.timePickerModel.confirmButtonColor);
        Button.onClick(() => {
            this.confirmValue = '';
            let selectYear: any = this.YearsArray[this.solarLatestYearIndex].year;
            let selectMonth: any = this.YearsArray[this.solarLatestYearIndex].monthAndDay[this.solarLatestMonthIndex].month;
            let daysArray: any = this.YearsArray[this.solarLatestYearIndex].monthAndDay[this.solarLatestMonthIndex].days;
            if (daysArray.length < (this.solarLatestDayIndex + 1)) {
                this.solarLatestDayIndex = daysArray.length - 1;
            }
            let selectDay: any = daysArray[this.solarLatestDayIndex];
            let selectHour: any = this.hourArray[this.hourIndex];
            let selectMinute: any = this.minuteArray[this.minuteIndex];
            let selectSecond: any = this.secondArray[this.secondIndex];
            if (this.timePickerModel.dateType[0]) {
                this.confirmValue = selectYear;
            }
            if (this.timePickerModel.dateType[1]) {
                if (this.timePickerModel.dateType[0]) {
                    this.confirmValue = this.confirmValue + '/';
                }
                this.confirmValue = this.confirmValue + selectMonth;
            }
            if (this.timePickerModel.dateType[2]) {
                if (this.timePickerModel.dateType[0] || this.timePickerModel.dateType[1]) {
                    this.confirmValue = this.confirmValue + '/';
                }
                this.confirmValue = this.confirmValue + selectDay;
            }
            if (this.timePickerModel.dateType[3]) {
                this.confirmValue = this.confirmValue + ' ' + selectHour;
            }
            if (this.timePickerModel.dateType[4]) {
                if (this.timePickerModel.dateType[3]) {
                    this.confirmValue = this.confirmValue + '/';
                }
                this.confirmValue = this.confirmValue + selectMinute;
            }
            if (this.timePickerModel.dateType[5]) {
                if (this.timePickerModel.dateType[3] || this.timePickerModel.dateType[4]) {
                    this.confirmValue = this.confirmValue + '/';
                }
                this.confirmValue = this.confirmValue + selectSecond;
            }
            this.controller.close();
            this.confirm();
        });
        Button.pop();
        Flex.pop();
        Stack.create({ alignContent: Alignment.BottomStart });
        If.create();
        if (this.timePickerModel.dividerType == DividerType.FILL) {
            If.branchId(0);
            Divider.create();
            Divider.vertical(false);
            Divider.strokeWidth(this.timePickerModel.dividerLineStroke);
            Divider.color(this.timePickerModel.dividerLineColor);
            Divider.lineCap(LineCapStyle.Round);
            Divider.margin({ bottom: this.timePickerModel.textHeight * 3 });
            Divider.create();
            Divider.vertical(false);
            Divider.strokeWidth(this.timePickerModel.dividerLineStroke);
            Divider.color(this.timePickerModel.dividerLineColor);
            Divider.lineCap(LineCapStyle.Round);
            Divider.margin({ bottom: this.timePickerModel.textHeight * 2 });
        }
        else if (this.timePickerModel.dividerType == DividerType.CIRCLE) {
            If.branchId(1);
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceAround);
            //ForEach([...Array(this.timePickerModel.showTotalColumn).keys()],
            ForEach.create("2", this, ObservedObject.GetRawObject(this.timePickerModel.sum_numbers(this.timePickerModel.showTotalColumn)), (index: number) => {
                Ellipse.create({ width: 50, height: 50 });
                Ellipse.fillOpacity(0);
                Ellipse.stroke(this.timePickerModel.dividerLineColor);
                Ellipse.strokeWidth(this.timePickerModel.dividerLineStroke);
                Ellipse.margin({
                    bottom: this.timePickerModel.textHeight * 2
                });
            }, (index: number) => index.toString());
            //ForEach([...Array(this.timePickerModel.showTotalColumn).keys()],
            ForEach.pop();
            Row.pop();
        }
        else if (this.timePickerModel.dividerType == DividerType.WRAP) {
            If.branchId(2);
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceAround);
            //ForEach([...Array(this.timePickerModel.showTotalColumn).keys()],
            ForEach.create("3", this, ObservedObject.GetRawObject(this.timePickerModel.sum_numbers(this.timePickerModel.showTotalColumn)), () => {
                Column.create();
                Divider.create();
                Divider.vertical(false);
                Divider.strokeWidth(this.timePickerModel.dividerLineStroke);
                Divider.color(this.timePickerModel.dividerLineColor);
                Divider.lineCap(LineCapStyle.Round);
                Divider.margin({
                    bottom: this.timePickerModel.textHeight * 1
                });
                Divider.width(this.timePickerModel.columnDividerWidth[0]);
                Divider.create();
                Divider.vertical(false);
                Divider.strokeWidth(this.timePickerModel.dividerLineStroke);
                Divider.color(this.timePickerModel.dividerLineColor);
                Divider.lineCap(LineCapStyle.Round);
                Divider.margin({
                    bottom: this.timePickerModel.textHeight * 2
                });
                Divider.width(this.timePickerModel.columnDividerWidth[0]);
                Column.pop();
            }, (index: number) => JSON.stringify(index));
            //ForEach([...Array(this.timePickerModel.showTotalColumn).keys()],
            ForEach.pop();
            Row.pop();
        }
        If.pop();
        Row.create();
        Row.height(this.timePickerModel.popUpWindowHeight);
        If.create();
        if (this.timePickerModel.dateType[0]) {
            If.branchId(0);
            //Scroll(this.scrollerYear) {
            Column.create();
            //Scroll(this.scrollerYear) {
            Column.width(this.timePickerModel.columnWidth[0]);
            // 年
            List.create({ space: 0, initialIndex: this.solarLatestYearIndex, scroller: this.scrollerYear });
            // 年
            List.scrollBar(BarState.Off);
            // 年
            List.onReachStart(() => {
                this.solarLatestYearIndex = 0;
            });
            // 年
            List.onReachEnd(() => {
                this.solarLatestYearIndex = this.YearsArray.length - 1;
            });
            // 年
            List.onScrollStop(() => {
                // 滑动过后，计算滑动距离，保持选择项在红色线之内
                let yearCurrentOffset: number = this.scrollerYear.currentOffset().yOffset;
                let scrollYearOffset = yearCurrentOffset % this.timePickerModel.textHeight;
                if (scrollYearOffset > 1) {
                    if (this.lastYearPosition > yearCurrentOffset) { // 小于0，向下滑动，大于0是，是向上滑动
                        // 获取选中的年
                        this.solarLatestYearIndex = (yearCurrentOffset - scrollYearOffset) / this.timePickerModel.textHeight;
                    }
                    else {
                        this.solarLatestYearIndex = (yearCurrentOffset - scrollYearOffset) / this.timePickerModel.textHeight + 1;
                    }
                    if (this.solarLatestYearIndex > (this.YearsArray.length - 1)) {
                        this.solarLatestYearIndex = this.YearsArray.length - 1;
                    }
                    this.scrollerYear.scrollTo({
                        xOffset: 0,
                        yOffset: this.solarLatestYearIndex * this.timePickerModel.textHeight,
                        animation: { duration: 1000, curve: Curve.Ease }
                    });
                    this.lastYearPosition = yearCurrentOffset;
                }
            });
            ListItem.create();
            Text.create(" ");
            Text.fontSize(this.timePickerModel.fontSize);
            Text.height(this.timePickerModel.textHeight);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
            ListItem.pop();
            ListItem.create();
            Text.create(" ");
            Text.fontSize(this.timePickerModel.fontSize);
            Text.height(this.timePickerModel.textHeight);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
            ListItem.pop();
            ForEach.create("4", this, ObservedObject.GetRawObject(this.YearsArray), (solarYearItem: SolarCalendar) => {
                ListItem.create();
                Text.create((solarYearItem.year).toString() + this.timePickerModel.yearLable);
                Text.fontSize(this.timePickerModel.fontSize);
                Text.height(this.timePickerModel.textHeight);
                Text.width('100%');
                Text.textAlign(TextAlign.Center);
                Text.pop();
                ListItem.pop();
            }, (solarYearItem: SolarCalendar) => solarYearItem.year.toString());
            ForEach.pop();
            ListItem.create();
            Text.create(" ");
            Text.fontSize(this.timePickerModel.fontSize);
            Text.height(this.timePickerModel.textHeight);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
            ListItem.pop();
            ListItem.create();
            Text.create(" ");
            Text.fontSize(this.timePickerModel.fontSize);
            Text.height(this.timePickerModel.textHeight);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
            ListItem.pop();
            // 年
            List.pop();
            //Scroll(this.scrollerYear) {
            Column.pop();
        }
        If.pop();
        If.create();
        // 月
        if (this.timePickerModel.dateType[1]) {
            If.branchId(0);
            Column.create();
            Column.width(this.timePickerModel.columnWidth[1]);
            List.create({ space: 0, initialIndex: this.solarLatestMonthIndex, scroller: this.scrollerMonth });
            List.scrollBar(BarState.Off);
            List.onReachStart(() => {
                this.solarLatestMonthIndex = 0;
            });
            List.onReachEnd(() => {
                this.solarLatestMonthIndex = this.YearsArray[this.solarLatestYearIndex].monthAndDay.length - 1;
            });
            List.onScrollStop(() => {
                let monthCurrentOffset: number = this.scrollerMonth.currentOffset().yOffset;
                let scrollMonthOffset = monthCurrentOffset % this.timePickerModel.textHeight;
                // 滑动过后，计算滑动距离，保持选择项在红色线之内
                if (scrollMonthOffset > 1) {
                    if (this.lastMonthPosition > monthCurrentOffset) { // 小于0，向下滑动，大于0是，是向上滑动
                        this.solarLatestMonthIndex = (monthCurrentOffset - scrollMonthOffset) / this.timePickerModel.textHeight;
                    }
                    else {
                        this.solarLatestMonthIndex = (monthCurrentOffset - scrollMonthOffset) / this.timePickerModel.textHeight + 1;
                    }
                    if (this.solarLatestMonthIndex > (this.YearsArray[this.solarLatestYearIndex].monthAndDay.length - 1)) {
                        this.solarLatestMonthIndex = this.YearsArray[this.solarLatestYearIndex].monthAndDay.length - 1;
                    }
                    this.scrollerMonth.scrollTo({
                        xOffset: 0,
                        yOffset: this.solarLatestMonthIndex * this.timePickerModel.textHeight,
                        animation: { duration: 1000, curve: Curve.Ease }
                    });
                    // 处理 所选月份的天数小于之前INDEX
                    let dayLength = this.YearsArray[this.solarLatestYearIndex].monthAndDay[this.solarLatestMonthIndex].days.length - 1;
                    if (this.solarLatestDayIndex > dayLength) {
                        this.solarLatestDayIndex = dayLength;
                    }
                    this.lastMonthPosition = monthCurrentOffset;
                }
            });
            ListItem.create();
            Text.create(" ");
            Text.fontSize(this.timePickerModel.fontSize);
            Text.height(this.timePickerModel.textHeight);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
            ListItem.pop();
            ListItem.create();
            Text.create(" ");
            Text.fontSize(this.timePickerModel.fontSize);
            Text.height(this.timePickerModel.textHeight);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
            ListItem.pop();
            ForEach.create("5", this, ObservedObject.GetRawObject(this.YearsArray[this.solarLatestYearIndex].monthAndDay), (monthAndDay: MonthAndDay) => {
                ListItem.create();
                Text.create(monthAndDay.month.toString() + this.timePickerModel.monthLable);
                Text.fontSize(this.timePickerModel.fontSize);
                Text.height(this.timePickerModel.textHeight);
                Text.width('100%');
                Text.textAlign(TextAlign.Center);
                Text.pop();
                ListItem.pop();
            }, (monthAndDay: MonthAndDay) => monthAndDay.month);
            ForEach.pop();
            ListItem.create();
            Text.create(" ");
            Text.fontSize(this.timePickerModel.fontSize);
            Text.height(this.timePickerModel.textHeight);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
            ListItem.pop();
            ListItem.create();
            Text.create(" ");
            Text.fontSize(this.timePickerModel.fontSize);
            Text.height(this.timePickerModel.textHeight);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
            ListItem.pop();
            List.pop();
            Column.pop();
        }
        If.pop();
        If.create();
        // 日
        if (this.timePickerModel.dateType[2]) {
            If.branchId(0);
            Column.create();
            Column.width(this.timePickerModel.columnWidth[2]);
            List.create({ space: 0, initialIndex: this.solarLatestDayIndex, scroller: this.scrollerDay });
            List.scrollBar(BarState.Off);
            List.onReachStart(() => {
                this.solarLatestDayIndex = 0;
            });
            List.onReachEnd(() => {
                this.solarLatestDayIndex = this.YearsArray[this.solarLatestYearIndex].monthAndDay[this.solarLatestMonthIndex].days.length - 1;
            });
            List.onScrollStop(() => {
                let dayCurrentOffset: number = this.scrollerDay.currentOffset().yOffset;
                let scrollDayOffset = dayCurrentOffset % this.timePickerModel.textHeight;
                // 滑动过后，计算滑动距离，保持选择项在红色线之内
                // 小于0，向下滑动，大于0时，是向上滑动
                if (scrollDayOffset > 1) {
                    if (this.lastDayPosition > dayCurrentOffset) {
                        this.solarLatestDayIndex = (dayCurrentOffset - scrollDayOffset) / this.timePickerModel.textHeight;
                    }
                    else {
                        this.solarLatestDayIndex = (dayCurrentOffset - scrollDayOffset) / this.timePickerModel.textHeight + 1;
                    }
                    if (this.solarLatestDayIndex > (this.YearsArray[this.solarLatestYearIndex].monthAndDay[this.solarLatestMonthIndex].days.length - 1)) {
                        this.solarLatestDayIndex = this.YearsArray[this.solarLatestYearIndex].monthAndDay[this.solarLatestMonthIndex].days.length - 1;
                    }
                    console.info("liqi======this.solarLatestDayIndex3333====" + this.solarLatestDayIndex);
                    this.scrollerDay.scrollTo({
                        xOffset: 0,
                        yOffset: this.solarLatestDayIndex * this.timePickerModel.textHeight,
                        animation: { duration: 1000, curve: Curve.Ease }
                    });
                    this.lastDayPosition = dayCurrentOffset;
                }
            });
            ListItem.create();
            Text.create(" ");
            Text.fontSize(this.timePickerModel.fontSize);
            Text.height(this.timePickerModel.textHeight);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
            ListItem.pop();
            ListItem.create();
            Text.create(" ");
            Text.fontSize(this.timePickerModel.fontSize);
            Text.height(this.timePickerModel.textHeight);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
            ListItem.pop();
            ForEach.create("6", this, ObservedObject.GetRawObject(this.YearsArray[this.solarLatestYearIndex].monthAndDay[this.solarLatestMonthIndex].days), (day: string) => {
                ListItem.create();
                Text.create(day + this.timePickerModel.dayLable);
                Text.fontSize(this.timePickerModel.fontSize);
                Text.height(this.timePickerModel.textHeight);
                Text.width('100%');
                Text.textAlign(TextAlign.Center);
                Text.pop();
                ListItem.pop();
            }, (day: number) => day.toString());
            ForEach.pop();
            ListItem.create();
            Text.create(" ");
            Text.fontSize(this.timePickerModel.fontSize);
            Text.height(this.timePickerModel.textHeight);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
            ListItem.pop();
            ListItem.create();
            Text.create(" ");
            Text.fontSize(this.timePickerModel.fontSize);
            Text.height(this.timePickerModel.textHeight);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
            ListItem.pop();
            List.pop();
            Column.pop();
        }
        If.pop();
        If.create();
        //时
        if (this.timePickerModel.dateType[3]) {
            If.branchId(0);
            //Scroll(this.scrollerFirst) {
            Column.create();
            //Scroll(this.scrollerFirst) {
            Column.width(this.timePickerModel.columnWidth[3]);
            List.create({ space: 0, initialIndex: this.hourIndex, scroller: this.scrollerFirst });
            List.scrollBar(BarState.Off);
            List.onReachStart(() => {
                this.hourIndex = 0;
            });
            List.onReachEnd(() => {
                this.hourIndex = this.hourArray.length - 1;
            });
            List.onScrollStop(() => {
                let hourCurrentOffset: number = this.scrollerFirst.currentOffset().yOffset;
                let scrollProvinceOffset = hourCurrentOffset % this.timePickerModel.textHeight;
                if (scrollProvinceOffset > 1) {
                    if (this.lastHourPosition > hourCurrentOffset) { // 小于0，向下滑动，大于0是，是向上滑动
                        this.hourIndex = (hourCurrentOffset - scrollProvinceOffset) / this.timePickerModel.textHeight;
                    }
                    else {
                        this.hourIndex = (hourCurrentOffset - scrollProvinceOffset) / this.timePickerModel.textHeight + 1;
                    }
                    if (this.hourIndex > (this.hourArray.length - 1)) {
                        this.hourIndex = this.hourArray.length - 1;
                    }
                    this.scrollerFirst.scrollTo({
                        xOffset: 0,
                        yOffset: this.hourIndex * this.timePickerModel.textHeight,
                        animation: { duration: 1000, curve: Curve.Ease }
                    });
                    this.lastHourPosition = hourCurrentOffset;
                }
            });
            ListItem.create();
            Text.create(" ");
            Text.fontSize(this.timePickerModel.fontSize);
            Text.height(this.timePickerModel.textHeight);
            Text.pop();
            ListItem.pop();
            ListItem.create();
            Text.create(" ");
            Text.fontSize(this.timePickerModel.fontSize);
            Text.height(this.timePickerModel.textHeight);
            Text.pop();
            ListItem.pop();
            ForEach.create("7", this, ObservedObject.GetRawObject(this.hourArray.map((item1: number, index1: number) => {
                return new Param(index1 + 1, item1);
            })), (item: Param) => {
                ListItem.create();
                Text.create(`${item.data}` + this.timePickerModel.hourLable);
                Text.fontSize(this.timePickerModel.fontSize);
                Text.fontColor(this.timePickerModel.fontColor);
                Text.height(this.timePickerModel.textHeight);
                Text.width('100%');
                Text.textAlign(TextAlign.Center);
                Text.pop();
                ListItem.pop();
            }, (item: Param) => item.index.toString());
            ForEach.pop();
            ListItem.create();
            Text.create(' ');
            Text.height(this.timePickerModel.textHeight);
            Text.pop();
            ListItem.pop();
            ListItem.create();
            Text.create(' ');
            Text.height(this.timePickerModel.textHeight);
            Text.pop();
            ListItem.pop();
            List.pop();
            //Scroll(this.scrollerFirst) {
            Column.pop();
        }
        If.pop();
        If.create();
        //分
        if (this.timePickerModel.dateType[4]) {
            If.branchId(0);
            //Scroll(this.scrollerSecond) {
            Column.create();
            //Scroll(this.scrollerSecond) {
            Column.width(this.timePickerModel.columnWidth[4]);
            // 分
            List.create({ space: 0, initialIndex: this.minuteIndex, scroller: this.scrollerSecond });
            // 分
            List.scrollBar(BarState.Off);
            // 分
            List.onReachStart(() => {
                this.minuteIndex = 0;
            });
            // 分
            List.onReachEnd(() => {
                this.minuteIndex = this.minuteArray.length - 1;
            });
            // 分
            List.onScrollStop(() => {
                // 滑动过后，计算滑动距离，保持选择项在红色线之内
                let secondCurrentOffset: number = this.scrollerSecond.currentOffset().yOffset;
                let scrollSecondOffset = secondCurrentOffset % this.timePickerModel.textHeight;
                if (scrollSecondOffset > 1) {
                    if (this.lastSecondPosition > secondCurrentOffset) { // 小于0，向下滑动，大于0是，是向上滑动
                        this.minuteIndex = (secondCurrentOffset - scrollSecondOffset) / this.timePickerModel.textHeight;
                    }
                    else {
                        this.minuteIndex = (secondCurrentOffset - scrollSecondOffset) / this.timePickerModel.textHeight + 1;
                    }
                    if (this.minuteIndex > (this.minuteArray.length - 1)) {
                        this.minuteIndex = this.minuteArray.length - 1;
                    }
                    this.scrollerSecond.scrollTo({
                        xOffset: 0,
                        yOffset: this.minuteIndex * this.timePickerModel.textHeight,
                        animation: { duration: 1000, curve: Curve.Ease }
                    });
                    this.lastSecondPosition = secondCurrentOffset;
                }
            });
            ListItem.create();
            Text.create(" ");
            Text.fontSize(this.timePickerModel.fontSize);
            Text.height(this.timePickerModel.textHeight);
            Text.pop();
            ListItem.pop();
            ListItem.create();
            Text.create(" ");
            Text.fontSize(this.timePickerModel.fontSize);
            Text.height(this.timePickerModel.textHeight);
            Text.pop();
            ListItem.pop();
            ForEach.create("8", this, ObservedObject.GetRawObject(this.minuteArray.map((item1: number, index1: number) => {
                return new Param(index1 + 1, item1);
            })), (item: Param) => {
                ListItem.create();
                Text.create(`${item.data}` + this.timePickerModel.secondLable);
                Text.fontSize(this.timePickerModel.fontSize);
                Text.fontColor(this.timePickerModel.fontColor);
                Text.height(this.timePickerModel.textHeight);
                Text.width('100%');
                Text.textAlign(TextAlign.Center);
                Text.pop();
                ListItem.pop();
            }, (item: Param) => item.index.toString());
            ForEach.pop();
            ListItem.create();
            Text.create(' ');
            Text.height(this.timePickerModel.textHeight);
            Text.pop();
            ListItem.pop();
            ListItem.create();
            Text.create(' ');
            Text.height(this.timePickerModel.textHeight);
            Text.pop();
            ListItem.pop();
            // 分
            List.pop();
            //Scroll(this.scrollerSecond) {
            Column.pop();
        }
        If.pop();
        If.create();
        //秒
        if (this.timePickerModel.dateType[5]) {
            If.branchId(0);
            //Scroll(this.scrollerThird) {
            Column.create();
            //Scroll(this.scrollerThird) {
            Column.width(this.timePickerModel.columnWidth[5]);
            // 秒
            List.create({ space: 0, initialIndex: this.secondIndex, scroller: this.scrollerThird });
            // 秒
            List.scrollBar(BarState.Off);
            // 秒
            List.onReachStart(() => {
                this.secondIndex = 0;
            });
            // 秒
            List.onReachEnd(() => {
                this.secondIndex = this.secondArray.length - 1;
            });
            // 秒
            List.onScrollStop(() => {
                let minuteCurrentOffset: number = this.scrollerThird.currentOffset().yOffset;
                let scrollMinuteOffset: number = minuteCurrentOffset % this.timePickerModel.textHeight; //取余
                if (scrollMinuteOffset > 1) {
                    if (this.lastMinutePosition > minuteCurrentOffset) { // 小于0，向下滑动，大于0是，是向上滑动
                        this.secondIndex = (minuteCurrentOffset - scrollMinuteOffset) / this.timePickerModel.textHeight;
                    }
                    else {
                        this.secondIndex = (minuteCurrentOffset - scrollMinuteOffset) / this.timePickerModel.textHeight + 1;
                    }
                    if (this.secondIndex > (this.secondArray.length - 1)) {
                        this.secondIndex = this.secondArray.length - 1;
                    }
                    this.scrollerThird.scrollTo({
                        xOffset: 0,
                        yOffset: this.secondIndex * this.timePickerModel.textHeight,
                        animation: { duration: 1000, curve: Curve.Ease }
                    });
                    this.lastMinutePosition = minuteCurrentOffset;
                }
            });
            ListItem.create();
            Text.create(" ");
            Text.fontSize(this.timePickerModel.fontSize);
            Text.height(this.timePickerModel.textHeight);
            Text.pop();
            ListItem.pop();
            ListItem.create();
            Text.create(" ");
            Text.fontSize(this.timePickerModel.fontSize);
            Text.height(this.timePickerModel.textHeight);
            Text.pop();
            ListItem.pop();
            ForEach.create("9", this, ObservedObject.GetRawObject(this.secondArray.map((item1: number, index1: number) => {
                return new Param(index1 + 1, item1);
            })), (item: Param) => {
                ListItem.create();
                Text.create(`${item.data}` + this.timePickerModel.minuteLable);
                Text.fontSize(this.timePickerModel.fontSize);
                Text.fontColor(this.timePickerModel.fontColor);
                Text.height(this.timePickerModel.textHeight);
                Text.width('100%');
                Text.textAlign(TextAlign.Center);
                Text.pop();
                ListItem.pop();
            }, (item: Param) => item.index.toString());
            ForEach.pop();
            ListItem.create();
            Text.create(' ');
            Text.height(this.timePickerModel.textHeight);
            Text.pop();
            ListItem.pop();
            ListItem.create();
            Text.create(' ');
            Text.height(this.timePickerModel.textHeight);
            Text.pop();
            ListItem.pop();
            // 秒
            List.pop();
            //Scroll(this.scrollerThird) {
            Column.pop();
        }
        If.pop();
        Row.pop();
        Stack.pop();
        Column.pop();
    }
}
class YearReachSecondComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.currentThis = this;
        this.__selectValue = new ObservedPropertySimple("", this, "selectValue");
        this.confirmValue = "";
        this.__model = new SynchedPropertyObjectTwoWay(params.model, this, "model");
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomDialogExample("10", this, {
                    currentThis: this.currentThis,
                    cancel: this.onCancel,
                    confirm: this.onAccept,
                    timePickerModel: this.__model,
                    confirmValue: this.confirmValue
                });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            cancel: this.existApp,
            autoCancel: true,
            alignment: DialogAlignment.Bottom,
            customStyle: true
            //offset:{dx: 0, dy:150}
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: YearReachSecondComponent_Params) {
        if (params.currentThis !== undefined) {
            this.currentThis = params.currentThis;
        }
        if (params.selectValue !== undefined) {
            this.selectValue = params.selectValue;
        }
        if (params.confirmValue !== undefined) {
            this.confirmValue = params.confirmValue;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__selectValue.aboutToBeDeleted();
        this.__model.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private currentThis;
    private __selectValue: ObservedPropertySimple<string>;
    get selectValue() {
        return this.__selectValue.get();
    }
    set selectValue(newValue: string) {
        this.__selectValue.set(newValue);
    }
    private confirmValue: string;
    private __model: SynchedPropertySimpleOneWay<YearReachSecondComponent.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: YearReachSecondComponent.Model) {
        this.__model.set(newValue);
    }
    private dialogController: CustomDialogController;
    // 时间
    onCancel() {
        console.info('Callback when the first button is clicked');
    }
    onAccept() {
        this.currentThis.selectValue = this.confirmValue;
        console.info('Callback when the second button is clicked');
    }
    existApp() {
        console.info('Click the callback in the blank area');
    }
    render() {
        Column.create();
        Column.alignItems(HorizontalAlign.Center);
        Column.width("100%");
        Row.create();
        Row.alignItems(VerticalAlign.Top);
        Row.margin({ top: this.model.pickerSpace });
        Text.create(this.selectValue.length > 0 ? this.selectValue : '时间(年到秒)选择器');
        Text.height(50);
        Text.fontSize(20);
        Text.fontColor(Color.Black);
        Text.backgroundColor(Color.Gray);
        Text.width("90%");
        Text.textAlign(TextAlign.Center);
        Text.onClick(() => {
            this.dialogController.open();
        });
        Text.pop();
        Row.pop();
        Column.pop();
    }
}
namespace YearReachSecondComponent {
    export class Model {
        text: string = '';
        dividerLineColor: Color = Color.Red;
        dividerLineStroke: number = 1;
        areaIsShow: boolean = false;
        fontSize: number = 30;
        fontColor: Color = Color.Black;
        titleFontSize: number = 30;
        titleFontColor: Color = Color.Black;
        cancelButtonFont: string = "cancel";
        confirmButtonFont: string = "confirm";
        cancelButtonColor: Color = Color.Green;
        confirmButtonColor: Color = Color.Green;
        onclick: Function = () => { };
        yearRangeStart: number = 2010;
        yearRangeEnd: number = 2030;
        pickerSpace: number = 15;
        buttonBackgroundColor: string = "#7CDCDC";
        yearLable: string = '';
        monthLable: string = '';
        dayLable: string = '';
        hourLable: string = '';
        secondLable: string = '';
        minuteLable: string = '';
        defaultSelection: string[] = [];
        dividerType?: DividerType = DividerType.FILL;
        dateType: boolean[] = [true, true, true, true, true, true];
        columnWidth: string[] = ["20%", "16%", "16%", "16%", "16%", "16%"];
        lineSpacingMultiplier: number = 0;
        popUpWindowHeight: number = 250;
        textHeight: number = 50;
        showTotalColumn: number = 0;
        wrapMarginLeft: string[] = [];
        columnDividerWidth: string[] = [];
        setLineSpacingMultiplier(lineSpacingMultiplier: number): Model {
            if (lineSpacingMultiplier > 50) {
                lineSpacingMultiplier = 50;
            }
            this.lineSpacingMultiplier = lineSpacingMultiplier;
            this.textHeight = 50 + lineSpacingMultiplier;
            this.popUpWindowHeight = this.textHeight * 5;
            return this;
        }
        sum_numbers(numbers: number): number[] {
            let res: number[] = [];
            for (let n = 0; n < numbers; n++) {
                res.push(n);
            }
            return res;
        }
        setDateType(dateType: boolean[]): Model {
            this.columnWidth = [];
            this.dateType = dateType;
            dateType.forEach((item: boolean) => {
                if (item) {
                    this.showTotalColumn = this.showTotalColumn + 1;
                }
            });
            console.info("this.showTotalColumn" + this.showTotalColumn);
            if (this.showTotalColumn == 0) { // 确保显示一个
                this.dateType = [true, false, false, false, false, false];
                this.showTotalColumn = 1;
                this.dateType.forEach((item: boolean) => {
                    if (item) {
                        this.columnWidth.push("100%");
                    }
                    else {
                        this.columnWidth.push("0%");
                    }
                });
                this.columnDividerWidth.push("30%");
            }
            else if (this.showTotalColumn == 1) {
                dateType.forEach((item: boolean) => {
                    if (item) {
                        this.columnWidth.push("100%");
                    }
                    else {
                        this.columnWidth.push("0%");
                    }
                });
                this.columnDividerWidth.push("30%");
            }
            else if (this.showTotalColumn == 2) {
                dateType.forEach((item: boolean) => {
                    if (item) {
                        this.columnWidth.push("50%");
                    }
                    else {
                        this.columnWidth.push("0%");
                    }
                });
                this.columnDividerWidth.push("30%");
            }
            else if (this.showTotalColumn == 3) {
                dateType.forEach((item: boolean) => {
                    if (item) {
                        this.columnWidth.push("33%");
                    }
                    else {
                        this.columnWidth.push("0%");
                    }
                });
                this.columnDividerWidth.push("20%");
            }
            else if (this.showTotalColumn == 4) {
                dateType.forEach((item: boolean) => {
                    if (item) {
                        this.columnWidth.push("25%");
                    }
                    else {
                        this.columnWidth.push("0%");
                    }
                });
                this.columnDividerWidth.push("18%");
            }
            else if (this.showTotalColumn == 5) {
                dateType.forEach((item: boolean) => {
                    if (item) {
                        this.columnWidth.push("20%");
                    }
                    else {
                        this.columnWidth.push("0%");
                    }
                });
                this.columnDividerWidth.push("16%");
            }
            else if (this.showTotalColumn == 6) {
                this.columnWidth = ["17%", "17%", "17%", "17%", "16%", "16%"];
                this.columnDividerWidth.push("16%");
            }
            return this;
        }
        setDividerType(dividerType: DividerType): Model {
            this.dividerType = dividerType;
            return this;
        }
        setYearLable(yearLable: string): Model {
            this.yearLable = yearLable;
            return this;
        }
        setMonthLable(monthLable: string): Model {
            this.monthLable = monthLable;
            return this;
        }
        setDayLable(dayLable: string): Model {
            this.dayLable = dayLable;
            return this;
        }
        setHourLable(hourLable: string): Model {
            this.hourLable = hourLable;
            return this;
        }
        setSecondLable(secondLable: string): Model {
            this.secondLable = secondLable;
            return this;
        }
        setMinuteLable(minuteLable: string): Model {
            this.minuteLable = minuteLable;
            return this;
        }
        setDefaultSelection(defaultSelection: string[]): Model {
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
        constructor(dividerLineStroke?: number) {
            if (dividerLineStroke) {
                this.dividerLineStroke = dividerLineStroke;
                console.log("in Builder constructor");
            }
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
export default YearReachSecondComponent;
