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
export function initializeSolarCalendar(rangeStart: number, rangeEnd: number): Array<SolarCalendar> {
    let YearsDataArray: Array<SolarCalendar> = [];
    let chinaYearRange: ChinaYearRange = new ChinaYearRange(rangeStart, rangeEnd);
    let yearIndex: number = chinaYearRange.startYear;
    if (chinaYearRange.startYear > chinaYearRange.endYear) {
        console.info("Time range error");
    }
    else {
        for (let index = 0; index < 50; index++) {
            if (yearIndex < chinaYearRange.endYear) {
                let MonthAndDayArray: Array<MonthAndDay> = [];
                MonthJson.forEach(monthItem => {
                    let days: number[] = [];
                    for (let index = 0; index < monthDays(yearIndex, monthItem); index++) {
                        days.push(index);
                    }
                    //let days = [...Array(monthDays(yearIndex, monthItem)).keys()]
                    let formatDays: string[] = [];
                    days.forEach(dayItem => {
                        if ((dayItem + 1) < 10) {
                            formatDays.push('0' + (dayItem + 1));
                        }
                        else {
                            formatDays.push((dayItem + 1).toString());
                        }
                    });
                    if (Number(monthItem) < 10) {
                        monthItem = '0' + monthItem;
                    }
                    MonthAndDayArray.push(new MonthAndDay(monthItem, formatDays));
                });
                YearsDataArray.push(new SolarCalendar(index, yearIndex, MonthAndDayArray));
                yearIndex = yearIndex + 1;
            }
        }
    }
    return YearsDataArray;
}
class ChinaYearRange {
    startYear: number;
    endYear: number;
    constructor(startYear: number, endYear: number) {
        this.startYear = startYear;
        this.endYear = endYear;
    }
}
export class SolarCalendar {
    index: number;
    year: number;
    monthAndDay: Array<MonthAndDay>;
    constructor(index: number, year: number, month: Array<MonthAndDay>) {
        this.index = index;
        this.year = year;
        this.monthAndDay = month;
    }
}
export class MonthAndDay {
    month: string;
    days: string[];
    constructor(month: string, days: string[]) {
        this.month = month;
        this.days = days;
    }
}
const MonthJson: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
function monthDays(year: number, month: string): number {
    if (month == '1' || month == '3' || month == '5' || month == '7' || month == '8' || month == '10' || month == '12') {
        return 31;
    }
    else if (month == '2') {
        //闰年和平年的判断
        if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) {
            return 29;
        }
        else {
            return 28;
        }
    }
    else if (month == '4' || month == '6' || month == '9' || month == '11') {
        return 30;
    }
    else {
        console.error("Invalid month value!");
        return -1;
    }
}
