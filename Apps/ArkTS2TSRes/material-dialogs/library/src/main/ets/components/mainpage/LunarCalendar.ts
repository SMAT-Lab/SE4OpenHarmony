let __generate__Id: number = 0;
function generateId(): string {
    return "LunarCalendar_" + ++__generate__Id;
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
import { getLunarYearText, getMonths, monthDays, getLunarDays } from './util/LunarTimeUtil';
import { getArray } from "./util/utils";
export function initializeLunarCalendar(rangeStart: number, rangeEnd: number): Array<LunarCalendar> {
    let LunarCalendarYearsData: Array<LunarCalendar> = [];
    let yearRange: YearRange = new YearRange(rangeStart, rangeEnd);
    let yearIndex: number = yearRange.startYear;
    if (yearRange.startYear > yearRange.endYear) {
        console.info("Time range error");
    }
    else {
        YearsMaxRange.forEach(item => {
            if (yearIndex <= yearRange.endYear) {
                let yearText: string = getLunarYearText(yearIndex) + "(" + yearIndex + ")"; // 对应阴历年
                let yearCorrespondingMonth: string[] = getMonths(yearIndex); // 对应阴历月
                let MonthAndDayArray: Array<LunarMonthAndDay> = [];
                yearCorrespondingMonth.forEach(monthItem => {
                    let perMonthDays: number = monthDays(yearIndex, Number(monthItem)); // 对应阴历天数
                    MonthAndDayArray.push(new LunarMonthAndDay(monthItem, getLunarDays(perMonthDays)));
                });
                LunarCalendarYearsData.push(new LunarCalendar(yearText, MonthAndDayArray));
                yearIndex = yearIndex + 1;
            }
        });
    }
    return LunarCalendarYearsData;
}
// 设置的年份最大范围为50年
const YearsMaxRange: number[] = getArray(Array(50));
class YearRange {
    startYear: number;
    endYear: number;
    constructor(startYear: number, endYear: number) {
        this.startYear = startYear;
        this.endYear = endYear;
    }
}
let NextId = 0;
export class LunarCalendar {
    year: string;
    monthAndDay: Array<LunarMonthAndDay>;
    hour: string = '';
    second: string = '';
    minute: string = '';
    constructor(year: string, monthAndDay: Array<LunarMonthAndDay>) {
        this.year = year;
        this.monthAndDay = monthAndDay;
    }
}
export class LunarMonthAndDay {
    month: string;
    days: string[];
    constructor(month: string, days: string[]) {
        this.month = month;
        this.days = days;
    }
}
