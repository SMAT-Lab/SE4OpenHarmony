interface TimePickerComponent_Params {
    currentThis?;
    selectValue?: string;
    confirmValue?: string;
    model?: TimePickerComponent.Model;
    dialogController?: CustomDialogController;
}
interface CustomDialogExample_Params {
    currentThis?: ESObject;
    controller?: CustomDialogController;
    cancel?: () => void;
    confirm?: () => void;
    confirmValue?: string;
    timePickerModel?: TimePickerComponent.Model;
    calendarType?: boolean;
    solarLatestYearIndex?: number;
    solarLatestMonthIndex?: number;
    solarLatestDayIndex?: number;
    YearsArray?: ESObject[];
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
    scrollerYear?: Scroller;
    scrollerMonth?: Scroller;
    scrollerDay?: Scroller;
    solarYearsArray?: SolarCalendar[];
    lunarYearsArray?: LunarCalendar[];
    array?;
    endIndex?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TimePickerComponent_" + ++__generate__Id;
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
import { DividerType, deviceWidth } from './Constant';
import { initializeSolarCalendar, SolarCalendar, MonthAndDay } from './SolarCalendar';
import { initializeLunarCalendar, LunarCalendar, LunarMonthAndDay } from './LunarCalendar';
class CustomDialogExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.currentThis = undefined;
        this.controller = undefined;
        this.cancel = () => { };
        this.confirm = () => { };
        this.confirmValue = "";
        this.timePickerModel = new TimePickerComponent.Model();
        this.__calendarType = new ObservedPropertySimple(this.timePickerModel.calendarType, this, "calendarType");
        this.__solarLatestYearIndex = new ObservedPropertySimple(0, this, "solarLatestYearIndex");
        this.__solarLatestMonthIndex = new ObservedPropertySimple(0, this, "solarLatestMonthIndex");
        this.__solarLatestDayIndex = new ObservedPropertySimple(0, this, "solarLatestDayIndex");
        this.__YearsArray = new ObservedPropertyObject([], this, "YearsArray");
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
        this.scrollerYear = new Scroller();
        this.scrollerMonth = new Scroller();
        this.scrollerDay = new Scroller();
        this.solarYearsArray = [];
        this.lunarYearsArray = [];
        this.array = [1, 2, 3];
        this.endIndex = 0;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomDialogExample_Params) {
        if (params.currentThis !== undefined) {
            this.currentThis = params.currentThis;
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
        if (params.confirmValue !== undefined) {
            this.confirmValue = params.confirmValue;
        }
        if (params.timePickerModel !== undefined) {
            this.timePickerModel = params.timePickerModel;
        }
        if (params.calendarType !== undefined) {
            this.calendarType = params.calendarType;
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
        if (params.YearsArray !== undefined) {
            this.YearsArray = params.YearsArray;
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
        if (params.scrollerYear !== undefined) {
            this.scrollerYear = params.scrollerYear;
        }
        if (params.scrollerMonth !== undefined) {
            this.scrollerMonth = params.scrollerMonth;
        }
        if (params.scrollerDay !== undefined) {
            this.scrollerDay = params.scrollerDay;
        }
        if (params.solarYearsArray !== undefined) {
            this.solarYearsArray = params.solarYearsArray;
        }
        if (params.lunarYearsArray !== undefined) {
            this.lunarYearsArray = params.lunarYearsArray;
        }
        if (params.array !== undefined) {
            this.array = params.array;
        }
        if (params.endIndex !== undefined) {
            this.endIndex = params.endIndex;
        }
    }
    aboutToBeDeleted() {
        this.__calendarType.aboutToBeDeleted();
        this.__solarLatestYearIndex.aboutToBeDeleted();
        this.__solarLatestMonthIndex.aboutToBeDeleted();
        this.__solarLatestDayIndex.aboutToBeDeleted();
        this.__YearsArray.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private currentThis: any;
    private controller?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private cancel: () => void;
    private confirm: () => void;
    private confirmValue: string;
    private timePickerModel: TimePickerComponent.Model;
    private __calendarType: ObservedPropertySimple<boolean>;
    get calendarType() {
        return this.__calendarType.get();
    }
    set calendarType(newValue: boolean) {
        this.__calendarType.set(newValue);
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
    private __YearsArray: ObservedPropertyObject<any[]>;
    get YearsArray() {
        return this.__YearsArray.get();
    }
    set YearsArray(newValue: any[]) {
        this.__YearsArray.set(newValue);
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
    private scrollerYear: Scroller;
    private scrollerMonth: Scroller;
    private scrollerDay: Scroller;
    private solarYearsArray: SolarCalendar[];
    private lunarYearsArray: LunarCalendar[];
    private array;
    private endIndex: number;
    public aboutToAppear() {
        this.solarYearsArray = initializeSolarCalendar(this.timePickerModel.yearRangeStart, this.timePickerModel.yearRangeEnd);
        this.lunarYearsArray = initializeLunarCalendar(this.timePickerModel.yearRangeStart, this.timePickerModel.yearRangeEnd);
        this.calendarType = this.timePickerModel.calendarType;
        this.YearsArray = this.timePickerModel.calendarType ? this.lunarYearsArray : this.solarYearsArray;
        if (this.timePickerModel.defaultSelection[0] != null && this.timePickerModel.defaultSelection[0] != "0") {
            this.YearsArray.forEach((val: any, idx: number) => {
                if (this.timePickerModel.defaultSelection[0] == val.year.toString()) { // select init value
                    this.solarLatestYearIndex = idx;
                }
            });
        }
        if (this.timePickerModel.defaultSelection[1] != null && this.timePickerModel.defaultSelection[1] != "0") {
            this.YearsArray[this.solarLatestYearIndex].monthAndDay.forEach((val: any, idx: number) => {
                if (this.timePickerModel.defaultSelection[1] == val.month.toString()) {
                    this.solarLatestMonthIndex = idx;
                }
            });
        }
        if (this.timePickerModel.defaultSelection[2] != null && this.timePickerModel.defaultSelection[2] != "0") {
            this.YearsArray[this.solarLatestYearIndex].monthAndDay[this.solarLatestMonthIndex].days.forEach((val: number, idx: number) => {
                if (this.timePickerModel.defaultSelection[2] == val.toString()) {
                    this.solarLatestDayIndex = idx;
                }
            });
        }
    }
    render() {
        Column.create();
        Column.margin({ bottom: 0 });
        Column.alignItems(HorizontalAlign.End);
        Column.backgroundColor(Color.White);
        Flex.create({ justifyContent: FlexAlign.SpaceBetween });
        Flex.backgroundColor("#7CDCDC");
        Flex.margin({ bottom: 0 });
        Button.createWithLabel(this.timePickerModel.cancelButtonFont);
        Button.height(this.buttonHeight);
        Button.fontSize(this.timePickerModel.titleFontSize);
        Button.backgroundColor(this.timePickerModel.buttonBackgroundColor);
        Button.fontColor(this.timePickerModel.cancelButtonColor);
        Button.onClick(() => {
            if (this.controller) {
                this.controller.close();
                this.cancel();
            }
        });
        Button.pop();
        Column.create();
        Row.create();
        If.create();
        if (this.calendarType) {
            If.branchId(0);
            Image.create($r('app.media.checkbox_select'));
            Image.height(15);
            Image.width(15);
            Image.onClick(() => {
                this.calendarType = false;
                this.YearsArray = this.solarYearsArray;
            });
        }
        else {
            If.branchId(1);
            Image.create($r('app.media.checkbox_unselect'));
            Image.onClick(() => {
                this.calendarType = true;
                this.YearsArray = this.lunarYearsArray;
            });
            Image.height(15);
            Image.width(15);
        }
        If.pop();
        Text.create("农历");
        Text.height(this.buttonHeight);
        Text.fontSize(this.timePickerModel.titleFontSize);
        Text.fontColor(this.timePickerModel.titleFontColor);
        Text.pop();
        Row.pop();
        Column.pop();
        Button.createWithLabel(this.timePickerModel.confirmButtonFont);
        Button.height(this.buttonHeight);
        Button.fontSize(this.timePickerModel.titleFontSize);
        Button.backgroundColor(this.timePickerModel.buttonBackgroundColor);
        Button.fontColor(this.timePickerModel.confirmButtonColor);
        Button.onClick(() => {
            let selectYear: any = this.YearsArray[this.solarLatestYearIndex].year;
            let selectMonth: any = this.YearsArray[this.solarLatestYearIndex].monthAndDay[this.solarLatestMonthIndex].month;
            let daysArray: any = this.YearsArray[this.solarLatestYearIndex].monthAndDay[this.solarLatestMonthIndex].days;
            if (daysArray.length < (this.solarLatestDayIndex + 1)) {
                this.solarLatestDayIndex = daysArray.length - 1;
            }
            let selectDay: any = daysArray[this.solarLatestDayIndex];
            this.confirmValue = selectYear + '/' + selectMonth + '/' + selectDay;
            if (this.controller !== undefined) {
                this.controller.close();
            }
            this.confirm();
        });
        Button.pop();
        Flex.pop();
        Stack.create({ alignContent: Alignment.TopStart });
        Stack.height(this.timePickerModel.popupWindowHeight);
        If.create();
        if (this.timePickerModel.dividerType == DividerType.FILL) {
            If.branchId(0);
            Divider.create();
            Divider.vertical(false);
            Divider.strokeWidth(this.timePickerModel.dividerLineStroke);
            Divider.color(this.timePickerModel.dividerLineColor);
            Divider.lineCap(LineCapStyle.Round);
            Divider.margin({ top: this.timePickerModel.textHeight * 3 });
            Divider.create();
            Divider.vertical(false);
            Divider.strokeWidth(this.timePickerModel.dividerLineStroke);
            Divider.color(this.timePickerModel.dividerLineColor);
            Divider.lineCap(LineCapStyle.Round);
            Divider.margin({ top: this.timePickerModel.textHeight * 2 });
        }
        else if (this.timePickerModel.dividerType == DividerType.CIRCLE) {
            If.branchId(1);
            Row.create({ space: 10 });
            Row.margin({ top: this.timePickerModel.textHeight * 2 });
            Row.justifyContent(FlexAlign.Center);
            Row.width("100%");
            Ellipse.create({ width: "31%", height: this.timePickerModel.textHeight });
            Ellipse.fillOpacity(0);
            Ellipse.stroke(this.timePickerModel.dividerLineColor);
            Ellipse.strokeWidth(this.timePickerModel.dividerLineStroke);
            Ellipse.create({ width: "31%", height: this.timePickerModel.textHeight });
            Ellipse.fillOpacity(0);
            Ellipse.stroke(this.timePickerModel.dividerLineColor);
            Ellipse.strokeWidth(this.timePickerModel.dividerLineStroke);
            Ellipse.create({ width: "31%", height: this.timePickerModel.textHeight });
            Ellipse.fillOpacity(0);
            Ellipse.stroke(this.timePickerModel.dividerLineColor);
            Ellipse.strokeWidth(this.timePickerModel.dividerLineStroke);
            Row.pop();
        }
        else if (this.timePickerModel.dividerType == DividerType.WRAP) {
            If.branchId(2);
            Row.create();
            Row.justifyContent(FlexAlign.SpaceAround);
            Row.width("100%");
            ForEach.create("2", this, ObservedObject.GetRawObject(this.array), (index: number) => {
                Column.create();
                Column.width(this.timePickerModel.columnDividerWidth);
                Divider.create();
                Divider.vertical(false);
                Divider.strokeWidth(this.timePickerModel.dividerLineStroke);
                Divider.color(this.timePickerModel.dividerLineColor);
                Divider.lineCap(LineCapStyle.Round);
                Divider.margin({ top: this.timePickerModel.textHeight * 2 });
                Divider.create();
                Divider.vertical(false);
                Divider.strokeWidth(this.timePickerModel.dividerLineStroke);
                Divider.color(this.timePickerModel.dividerLineColor);
                Divider.lineCap(LineCapStyle.Round);
                Divider.margin({ top: this.timePickerModel.textHeight * 1 });
                Column.pop();
            }, (index: number) => index.toString());
            ForEach.pop();
            Row.pop();
        }
        If.pop();
        Row.create();
        Column.create();
        Column.width("33%");
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
        ForEach.create("3", this, ObservedObject.GetRawObject(this.YearsArray), (solarYearItem: SolarCalendar | LunarCalendar) => {
            ListItem.create();
            Text.create((solarYearItem.year).toString());
            Text.fontSize(this.timePickerModel.fontSize);
            Text.height(this.timePickerModel.textHeight);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
            ListItem.pop();
        }, (solarYearItem: SolarCalendar | LunarCalendar) => solarYearItem.year.toString());
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
        Column.pop();
        // 月
        Column.create();
        // 月
        Column.width('33%');
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
        ForEach.create("4", this, ObservedObject.GetRawObject(this.YearsArray[this.solarLatestYearIndex].monthAndDay), (monthAndDay: MonthAndDay) => {
            ListItem.create();
            Text.create(monthAndDay.month.toString());
            Text.fontSize(this.timePickerModel.fontSize);
            Text.height(this.timePickerModel.textHeight);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
            ListItem.pop();
        });
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
        // 月
        Column.pop();
        // 日
        Column.create();
        // 日
        Column.width('33%');
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
            if (scrollDayOffset > 1) {
                // 滑动过后，计算滑动距离，保持选择项在红色线之内
                // 小于0，向下滑动，大于0是，是向上滑动
                if (this.lastDayPosition > dayCurrentOffset) {
                    this.solarLatestDayIndex = (dayCurrentOffset - scrollDayOffset) / this.timePickerModel.textHeight;
                }
                else {
                    this.solarLatestDayIndex = (dayCurrentOffset - scrollDayOffset) / this.timePickerModel.textHeight + 1;
                }
                //防止滑动到底部时，继续滑动，从容导致计算的solarLatestDayIndex错误
                console.info("liqi======this.solarLatestDayIndex====" + this.solarLatestDayIndex);
                console.info("liqi======this.solarLatestDayIndex222====" + (this.YearsArray[this.solarLatestYearIndex].monthAndDay[this.solarLatestMonthIndex].days.length - 1));
                if (this.solarLatestDayIndex > (this.YearsArray[this.solarLatestYearIndex].monthAndDay[this.solarLatestMonthIndex].days.length - 1)) {
                    this.solarLatestDayIndex = this.YearsArray[this.solarLatestYearIndex].monthAndDay[this.solarLatestMonthIndex].days.length - 1;
                }
                console.info("liqi======this.solarLatestDayIndex3333====" + this.solarLatestDayIndex);
                this.scrollerDay.scrollTo({
                    xOffset: 0,
                    yOffset: this.solarLatestDayIndex * this.timePickerModel.textHeight,
                    animation: { duration: 1000, curve: Curve.Ease }
                });
                //this.scrollerDay.scrollToIndex(this.solarLatestDayIndex)
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
        ForEach.create("5", this, ObservedObject.GetRawObject(this.YearsArray[this.solarLatestYearIndex].monthAndDay[this.solarLatestMonthIndex].days), (day: number | string) => {
            ListItem.create();
            Text.create(day.toString());
            Text.fontSize(this.timePickerModel.fontSize);
            Text.height(this.timePickerModel.textHeight);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
            ListItem.pop();
        }, (day: number | string) => day.toString());
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
        // 日
        Column.pop();
        Row.pop();
        Stack.pop();
        Column.pop();
    }
}
class TimePickerComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.currentThis = this;
        this.__selectValue = new ObservedPropertySimple("", this, "selectValue");
        this.confirmValue = "";
        this.__model = new ObservedPropertyObject(new TimePickerComponent.Model(), this, "model");
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomDialogExample("6", this, {
                    currentThis: this.currentThis,
                    cancel: this.onCancel,
                    confirm: this.onAccept,
                    timePickerModel: this.model,
                    confirmValue: this.confirmValue
                });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            cancel: this.existApp,
            autoCancel: true,
            alignment: DialogAlignment.Bottom
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TimePickerComponent_Params) {
        if (params.currentThis !== undefined) {
            this.currentThis = params.currentThis;
        }
        if (params.selectValue !== undefined) {
            this.selectValue = params.selectValue;
        }
        if (params.confirmValue !== undefined) {
            this.confirmValue = params.confirmValue;
        }
        if (params.model !== undefined) {
            this.model = params.model;
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
    private __model: ObservedPropertyObject<TimePickerComponent.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: TimePickerComponent.Model) {
        this.__model.set(newValue);
    }
    private dialogController: CustomDialogController;
    // 时间
    onCancel() {
        console.info('Callback when the city second button is clicked');
    }
    onAccept() {
        this.currentThis.selectValue = this.confirmValue;
    }
    existApp() {
        console.info('Click the callback in the blank area');
    }
    render() {
        //设置Stack的对齐方式为底部起始端对齐，Stack默认为居中对齐。设置Stack构造参数alignContent为Alignment.BottomStart。
        // 其中Alignment和FontWeight一样，都是框架提供的内置枚举类型
        Column.create();
        Column.create();
        Column.alignItems(HorizontalAlign.Center);
        Column.width("100%");
        Row.create();
        Row.alignItems(VerticalAlign.Top);
        Row.margin({ top: this.model.pickerSpace });
        Text.create(this.selectValue.length > 0 ? this.selectValue : '时间选择器');
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
        //设置Stack的对齐方式为底部起始端对齐，Stack默认为居中对齐。设置Stack构造参数alignContent为Alignment.BottomStart。
        // 其中Alignment和FontWeight一样，都是框架提供的内置枚举类型
        Column.pop();
    }
}
namespace TimePickerComponent {
    export class Model {
        text: string = '';
        dividerLineColor: Color = Color.Red;
        dividerLineStroke: number = 1;
        areaIsShow: boolean = false;
        columnWidth: string = '50%';
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
        calendarType: boolean = false;
        autoCancel: boolean = false;
        defaultSelection: string[] = [];
        dividerType?: DividerType = DividerType.FILL;
        columnDividerWidth: number = px2vp(deviceWidth * 0.3);
        lineSpacingMultiplier: number = 0;
        popupWindowHeight: number = 250;
        textHeight: number = 50;
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
        setDefaultSelection(defaultSelection: string[]): Model {
            this.defaultSelection = defaultSelection;
            return this;
        }
        setAutoCancel(autoCancel: boolean): Model {
            this.autoCancel = autoCancel;
            return this;
        }
        setCalendarType(calendarType: boolean): Model {
            this.calendarType = calendarType;
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
        setAreaIsShow(bool: boolean): Model {
            this.areaIsShow = bool;
            if (bool) { //根据区是否显示控制省、市的宽度
                this.columnWidth = '33%';
            }
            else {
                this.columnWidth = '50%';
            }
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
export default TimePickerComponent;
