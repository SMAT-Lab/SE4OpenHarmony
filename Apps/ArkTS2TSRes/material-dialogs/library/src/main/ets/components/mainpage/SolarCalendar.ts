let __generate__Id: number = 0;
function generateId(): string {
    return "SolarCalendar_" + ++__generate__Id;
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
import { getArray } from "./util/utils";
export function initializeSolarCalendar(rangeStart: number, rangeEnd: number): Array<SolarCalendar> {
    let YearsDataArray: Array<SolarCalendar> = [];
    let chinaYearRange: ChinaYearRange = new ChinaYearRange(rangeStart, rangeEnd);
    let yearIndex: number = chinaYearRange.startYear;
    if (chinaYearRange.startYear > chinaYearRange.endYear) {
        console.info("Time range error");
    }
    else {
        YearsMaxRange.forEach((item: number) => {
            if (yearIndex <= chinaYearRange.endYear) {
                let MonthAndDayArray: Array<MonthAndDay> = [];
                MonthJson.forEach((monthItem: number | string) => {
                    let days = getArray(Array(monthDays(yearIndex, Number(monthItem))));
                    let formatDays: Array<number | string> = [];
                    days.forEach((dayItem: number) => {
                        if ((dayItem + 1) < 10) {
                            formatDays.push('0' + (dayItem + 1));
                        }
                        else {
                            formatDays.push((dayItem + 1));
                        }
                    });
                    if (monthItem < 10) {
                        monthItem = '0' + monthItem;
                    }
                    MonthAndDayArray.push(new MonthAndDay(monthItem.toString(), formatDays));
                });
                YearsDataArray.push(new SolarCalendar(yearIndex, MonthAndDayArray));
                yearIndex = yearIndex + 1;
            }
        });
    }
    return YearsDataArray;
}
// 设置的年份最大范围为50年
const YearsMaxRange: number[] = getArray(Array(50));
class ChinaYearRange {
    startYear: number;
    endYear: number;
    constructor(startYear: number, endYear: number) {
        this.startYear = startYear;
        this.endYear = endYear;
    }
}
export class SolarCalendar {
    year: number;
    monthAndDay: Array<MonthAndDay>;
    constructor(year: number, month: Array<MonthAndDay>) {
        this.year = year;
        this.monthAndDay = month;
    }
}
export class MonthAndDay {
    month: string;
    days: Array<number | string>;
    constructor(month: string, days: Array<number | string>) {
        this.month = month;
        this.days = days;
    }
}
const MonthJson: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
function monthDays(year: number, month: number): number {
    if (month == 1) {
        return 31;
    }
    if (month == 2) {
        if (year % 4 == 0) { //闰年
            return 29;
        }
        else {
            return 28;
        }
    }
    if (month == 3) {
        return 31;
    }
    if (month == 4) {
        return 30;
    }
    if (month == 5) {
        return 31;
    }
    if (month == 6) {
        return 30;
    }
    if (month == 7) {
        return 31;
    }
    if (month == 8) {
        return 31;
    }
    if (month == 9) {
        return 30;
    }
    if (month == 10) {
        return 31;
    }
    if (month == 11) {
        return 30;
    }
    if (month == 12) {
        return 31;
    }
    return 0;
}
