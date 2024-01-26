interface Title_Params {
    currentYear?: number;
    currentMonth?: number;
    goToday?: () => void;
}
interface CalendarView_Params {
    currentYear?: number;
    currentMonth?: number;
    daysData?: Day[];
    calendar?;
    toDayY?: number;
    toDayM?: number;
    toDayD?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Calendar_" + ++__generate__Id;
}
/*
* Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
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
import I18n from '@ohos.i18n';
import TitleBar from '../component/TitleBar';
const WEEK_TITLE = [$r('app.string.monday'), $r('app.string.tuesday'), $r('app.string.wednesday'),
    $r('app.string.thursday'), $r('app.string.friday'), $r('app.string.saturday'),
    $r('app.string.sunday')];
interface Day {
    isCurrentMonth: boolean;
    isToday: boolean;
    date: number;
}
;
class CalendarView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentYear = new ObservedPropertySimple(0, this, "currentYear");
        this.__currentMonth = new ObservedPropertySimple(0, this, "currentMonth");
        this.__daysData = new ObservedPropertyObject([], this, "daysData");
        this.calendar = I18n.getCalendar('en-US');
        this.toDayY = this.calendar.get('year');
        this.toDayM = this.calendar.get('month');
        this.toDayD = this.calendar.get('date');
        this.updateWithValueParams(params);
        this.declareWatch("currentMonth", this.refreshData);
    }
    updateWithValueParams(params: CalendarView_Params) {
        if (params.currentYear !== undefined) {
            this.currentYear = params.currentYear;
        }
        if (params.currentMonth !== undefined) {
            this.currentMonth = params.currentMonth;
        }
        if (params.daysData !== undefined) {
            this.daysData = params.daysData;
        }
        if (params.calendar !== undefined) {
            this.calendar = params.calendar;
        }
        if (params.toDayY !== undefined) {
            this.toDayY = params.toDayY;
        }
        if (params.toDayM !== undefined) {
            this.toDayM = params.toDayM;
        }
        if (params.toDayD !== undefined) {
            this.toDayD = params.toDayD;
        }
    }
    aboutToBeDeleted() {
        this.__currentYear.aboutToBeDeleted();
        this.__currentMonth.aboutToBeDeleted();
        this.__daysData.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentYear: ObservedPropertySimple<number>;
    get currentYear() {
        return this.__currentYear.get();
    }
    set currentYear(newValue: number) {
        this.__currentYear.set(newValue);
    }
    private __currentMonth: ObservedPropertySimple<number>;
    get currentMonth() {
        return this.__currentMonth.get();
    }
    set currentMonth(newValue: number) {
        this.__currentMonth.set(newValue);
    }
    private __daysData: ObservedPropertyObject<Day[]>;
    get daysData() {
        return this.__daysData.get();
    }
    set daysData(newValue: Day[]) {
        this.__daysData.set(newValue);
    }
    private calendar;
    private toDayY: number;
    private toDayM: number;
    private toDayD: number;
    refreshData() {
        this.daysData = [];
        this.calendar.set(this.currentYear, this.currentMonth, 1);
        let currentMonthStartWeek = this.calendar.get('day_of_week');
        let currentMonthJulianDay = this.calendar.get('julian_day');
        let preYear = this.currentMonth - 1 >= 0 ? this.currentYear : this.currentYear - 1;
        let preMonth = this.currentMonth - 1 >= 0 ? this.currentMonth - 1 : 11;
        this.calendar.set(preYear, preMonth, 1);
        let preMonthJulianDay = this.calendar.get('julian_day');
        let nextYear = this.currentMonth + 1 < 12 ? this.currentYear : this.currentYear + 1;
        let nextMonth = this.currentMonth + 1 < 12 ? this.currentMonth + 1 : 0;
        this.calendar.set(nextYear, nextMonth, 1);
        let nextMonthJulianDay = this.calendar.get('julian_day');
        let preMonthDays = currentMonthJulianDay - preMonthJulianDay;
        let currentMonthDays = nextMonthJulianDay - currentMonthJulianDay;
        this.calendar.set(this.currentYear, this.currentMonth, currentMonthDays);
        let currentMonthEndWeek = this.calendar.get('day_of_week');
        for (let index = preMonthDays - ((currentMonthStartWeek + 5) % 7) + 1; index <= preMonthDays; index++) {
            this.daysData.push({
                isCurrentMonth: false,
                isToday: false,
                date: index
            });
        }
        for (let index = 1; index <= currentMonthDays; index++) {
            this.daysData.push({
                isCurrentMonth: true,
                isToday: this.toDayY === this.currentYear && this.toDayM === this.currentMonth && index === this.toDayD,
                date: index
            });
        }
        for (let index = 1; index <= (8 - currentMonthEndWeek) % 7; index++) {
            this.daysData.push({
                isCurrentMonth: false,
                isToday: false,
                date: index
            });
        }
    }
    aboutToAppear() {
        this.currentYear = this.toDayY;
        this.currentMonth = this.toDayM;
    }
    render() {
        Column.create();
        Column.backgroundColor(Color.White);
        let earlierCreatedChild_2: TitleBar = (this && this.findChildById) ? this.findChildById("2") as TitleBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new TitleBar("2", this, { hasBackPress: true, title: $r('app.string.calendar') }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                hasBackPress: true, title: $r('app.string.calendar')
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: Title = (this && this.findChildById) ? this.findChildById("3") as Title : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new Title("3", this, {
                currentYear: this.__currentYear,
                currentMonth: this.__currentMonth,
                goToday: () => {
                    if (this.currentYear === this.toDayY && this.currentMonth === this.toDayM) {
                        return;
                    }
                    this.currentYear = this.toDayY;
                    this.currentMonth = this.toDayM;
                }
            }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                goToday: () => {
                    if (this.currentYear === this.toDayY && this.currentMonth === this.toDayM) {
                        return;
                    }
                    this.currentYear = this.toDayY;
                    this.currentMonth = this.toDayM;
                }
            });
            View.create(earlierCreatedChild_3);
        }
        Flex.create({ wrap: FlexWrap.Wrap });
        Flex.padding({ left: 24, right: 24 });
        Flex.width('100%');
        ForEach.create("5", this, ObservedObject.GetRawObject(WEEK_TITLE), (item: Resource, index) => {
            Flex.create({ justifyContent: FlexAlign.SpaceBetween });
            Flex.width('100%');
            Flex.margin({ top: 16 });
            ForEach.create("4", this, ObservedObject.GetRawObject(this.daysData.slice(index * WEEK_TITLE.length, (index + 1) * WEEK_TITLE.length)), (day: Day) => {
                Text.create(`${day.date}`);
                Text.height(24);
                Text.width(24);
                Text.textAlign(TextAlign.Center);
                Text.fontSize(14);
                Text.fontColor(day.isToday ? Color.White : Color.Black);
                Text.backgroundColor(day.isToday ? Color.Blue : '');
                Text.borderRadius(20);
                Text.opacity(day.isCurrentMonth ? 1.0 : 0.2);
                Text.pop();
            });
            ForEach.pop();
            Flex.pop();
        });
        ForEach.pop();
        Flex.pop();
        Column.pop();
    }
}
class Title extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentYear = new SynchedPropertySimpleTwoWay(params.currentYear, this, "currentYear");
        this.__currentMonth = new SynchedPropertySimpleTwoWay(params.currentMonth, this, "currentMonth");
        this.goToday = (): void => { };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Title_Params) {
        if (params.goToday !== undefined) {
            this.goToday = params.goToday;
        }
    }
    aboutToBeDeleted() {
        this.__currentYear.aboutToBeDeleted();
        this.__currentMonth.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentYear: SynchedPropertySimpleTwoWay<number>;
    get currentYear() {
        return this.__currentYear.get();
    }
    set currentYear(newValue: number) {
        this.__currentYear.set(newValue);
    }
    private __currentMonth: SynchedPropertySimpleTwoWay<number>;
    get currentMonth() {
        return this.__currentMonth.get();
    }
    set currentMonth(newValue: number) {
        this.__currentMonth.set(newValue);
    }
    private goToday: () => void;
    render() {
        Column.create();
        Row.create();
        Row.width('100%');
        Row.height(56);
        Row.create();
        Row.margin({ left: 5 });
        Row.height('100%');
        Row.aspectRatio(1);
        Row.justifyContent(FlexAlign.Center);
        Row.onClick(() => {
            this.currentYear = this.currentMonth - 1 >= 0 ? this.currentYear : this.currentYear - 1;
            this.currentMonth = this.currentMonth - 1 >= 0 ? this.currentMonth - 1 : 11;
        });
        Image.create($r('app.media.ic_public_small_left'));
        Image.id('pre_month');
        Image.height(24);
        Image.width(12);
        Row.pop();
        Text.create(`${this.currentYear}-${this.currentMonth + 1 >= 10 ? '' : '0'}${this.currentMonth + 1}`);
        Text.fontSize(16);
        Text.fontColor(Color.Black);
        Text.pop();
        Row.create();
        Row.height('100%');
        Row.aspectRatio(1);
        Row.justifyContent(FlexAlign.Center);
        Row.onClick(() => {
            this.currentYear = this.currentMonth + 1 < 12 ? this.currentYear : this.currentYear + 1;
            this.currentMonth = this.currentMonth + 1 < 12 ? this.currentMonth + 1 : 0;
        });
        Image.create($r('app.media.ic_public_small_right'));
        Image.id('next_month');
        Image.height(24);
        Image.width(12);
        Row.pop();
        Blank.create();
        Blank.pop();
        Row.create();
        Row.height('100%');
        Row.aspectRatio(1);
        Row.onClick(() => {
            this.goToday();
        });
        Text.create($r('app.string.today'));
        Text.id('today');
        Text.fontColor(Color.Blue);
        Text.fontSize(16);
        Text.padding({ right: 24 });
        Text.pop();
        Row.pop();
        Row.pop();
        Flex.create({ justifyContent: FlexAlign.SpaceBetween });
        Flex.width('100%');
        Flex.padding({ left: 24, right: 24 });
        ForEach.create("6", this, ObservedObject.GetRawObject(WEEK_TITLE), (str: Resource) => {
            Text.create(str);
            Text.fontSize(14);
            Text.fontColor(Color.Black);
            Text.opacity(0.5);
            Text.height(24);
            Text.width(24);
            Text.textAlign(TextAlign.Center);
            Text.pop();
        });
        ForEach.pop();
        Flex.pop();
        Column.pop();
    }
}
loadDocument(new CalendarView("1", undefined, {}));
