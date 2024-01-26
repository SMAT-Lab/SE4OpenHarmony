let __generate__Id: number = 0;
function generateId(): string {
    return "LunarTimeUtil_" + ++__generate__Id;
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
// 一个月最多31天
const MaxDay: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
const nStr1: string[] = ['l', '正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
const Gan: string[] = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const Zhi: string[] = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const Animals: string[] = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
const lunarInfo: number[] = [
    0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
    0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
    0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
    0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
    0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
    0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
    0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
    0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
    0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
    0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
    0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
    0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
    0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
    0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
    0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,
    0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4,
    0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0,
    0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160,
    0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252,
    0x0d520
];
/**
 * 传回农历
 *
 * @param y 年的总天数
 * @return 农历
 */
export function lYearDays(y: number): number {
    let i: number;
    let sum: number = 348;
    for (i = 0x8000; i > 0x8; i >>= 1) {
        if ((lunarInfo[y - 1900] & i) != 0)
            sum += 1;
    }
    return (sum + leapDays(y));
}
/**
 * 传回农历
 *
 * @param y 年闰月的天数
 * @return 农历
 */
export function leapDays(y: number): number {
    if (leapMonth(y) != 0) {
        if ((lunarInfo[y - 1900] & 0x10000) != 0)
            return 30;
        else
            return 29;
    }
    else
        return 0;
}
/**
 * 传回农历
 *
 * @param y 年闰哪个月 1-12 , 没闰传回 0
 * @return 农历
 */
export function leapMonth(y: number): number {
    return (lunarInfo[y - 1900] & 0xf);
}
/**
 * 传回农历 y
 *
 * @param y y年m月的总天数
 * @param m y年m月的总天数
 * @return 农历
 */
export function monthDays(y: number, m: any): number {
    if ((lunarInfo[y - 1900] & (0x10000 >> m)) == 0) {
        return 29;
    }
    else {
        return 30;
    }
}
/**
 * 传回农历
 *
 * @param y 年的生肖
 * @return
 */
export function AnimalsYear(y: number): string {
    return Animals[(y - 4) % 12];
}
/**
 * 传入
 *
 * @param num 月日的offset 传回干支,0是甲子
 * @return 干支
 */
export function cyclicalm(num: number): string {
    return (Gan[num % 10] + Zhi[num % 12]);
}
/**
 * 传入 offset 传回干支
 *
 * @param y 0是甲子
 * @return 干支
 */
export function cyclical(y: number): string {
    let num: number = y - 1900 + 36;
    return (cyclicalm(num));
}
/**
 * 传出y年m月d日对应的农历.year0 .month1 .day2 .yearCyl3 .monCyl4 .dayCyl5 .isLeap6
 *
 * @param y 年
 * @param m 月
 * @param d 日
 * @return y年m月d日对应的农历
 */
export function calElement(y: number, m: number, d: number): number[] {
    const nongDate: number[] = [0, 0, 0, 0, 0, 0, 0];
    let i: number = 0;
    let temp: number = 0;
    let leap: number = 0;
    let baseDate: number = new Date(0 + 1900, 0, 31).getTime();
    let objDate: number = new Date(y, m - 1, d).getTime();
    let offset: number = (objDate - baseDate) / 86400000;
    nongDate[5] = offset + 40;
    nongDate[4] = 14;
    for (i = 1900; i < 2100 && offset > 0; i++) {
        temp = lYearDays(i);
        offset -= temp;
        nongDate[4] += 12;
    }
    if (offset < 0) {
        offset += temp;
        i--;
        nongDate[4] -= 12;
    }
    nongDate[0] = i;
    nongDate[3] = i - 1864;
    leap = leapMonth(i); // 闰哪个月
    nongDate[6] = 0;
    for (i = 1; i < 13 && offset > 0; i++) {
        // 闰月
        if (leap > 0 && i == (leap + 1) && nongDate[6] == 0) {
            --i;
            nongDate[6] = 1;
            temp = leapDays(nongDate[0]);
        }
        else {
            temp = monthDays(nongDate[0], i);
        }
        // 解除闰月
        if (nongDate[6] == 1 && i == (leap + 1))
            nongDate[6] = 0;
        offset -= temp;
        if (nongDate[6] == 0)
            nongDate[4]++;
    }
    if (offset == 0 && leap > 0 && i == leap + 1) {
        if (nongDate[6] == 1) {
            nongDate[6] = 0;
        }
        else {
            nongDate[6] = 1;
            --i;
            --nongDate[4];
        }
    }
    if (offset < 0) {
        offset += temp;
        --i;
        --nongDate[4];
    }
    nongDate[1] = i;
    nongDate[2] = offset + 1;
    return nongDate;
}
export function getChinaDate(day: number): String {
    let a: String = "";
    if (day == 10)
        return "初十";
    if (day == 20)
        return "二十";
    if (day == 30)
        return "三十";
    let two: number = (day - day % 10) / 10;
    if (two == 0) {
        a = "初";
    }
    if (two == 1) {
        a = "十";
    }
    if (two == 2) {
        a = "廿";
    }
    if (two == 3) {
        a = "三";
    }
    let one: number = day % 10;
    if (one == 1) {
        a = a + "一";
    }
    if (one == 2) {
        a = a + "二";
    }
    if (one == 3) {
        a = a + "三";
    }
    if (one == 4) {
        a = a + "四";
    }
    if (one == 5) {
        a = a + "五";
    }
    if (one == 6) {
        a = a + "六";
    }
    if (one == 7) {
        a = a + "七";
    }
    if (one == 8) {
        a = a + "八";
    }
    if (one == 9) {
        a = a + "九";
    }
    return a;
}
export function oneDay(year: number, month: number, day: number): string {
    let date: Date = new Date();
    //today : Calendar = Calendar.getInstance(Locale.SIMPLIFIED_CHINESE);
    let l: number[] = calElement(year, month, day);
    let sToday: string = '';
    try {
        sToday = sToday + (" 农历") + cyclical(year) + '(' + AnimalsYear(year) + ")年" + nStr1[l[1]] + "月" + getChinaDate((l[2]));
        return sToday.toString();
    }
    finally {
        sToday = '';
    }
}
/**
 * @param lunarYear 农历年份
 * @return String of Ganzhi: 甲子年
 * 甲乙丙丁戊己庚辛壬癸
 * 子丑寅卯辰巳无为申酉戌亥
 */
export function getLunarYearText(lunarYear: number): string {
    return Gan[(lunarYear - 4) % 10] + Zhi[(lunarYear - 4) % 12] + "年";
}
/**
 * 获取year年的所有月份
 *
 * @param year 年
 * @return 月份列表
 */
export function getMonths(year: number): string[] {
    let resultMonths: string[] = [];
    let baseMonths: string[] = [];
    let nStr1Index: number = 1;
    nStr1.forEach(item => {
        if (nStr1Index < nStr1.length) {
            baseMonths.push(nStr1[nStr1Index] + "月");
            nStr1Index = nStr1Index + 1;
        }
    });
    if (leapMonth(year) != 0) {
        baseMonths.forEach(item => {
            if (item.indexOf(nStr1[leapMonth(year)]) > -1) {
                resultMonths.push(item);
                resultMonths.push("闰" + nStr1[leapMonth(year)] + "月");
            }
            else {
                resultMonths.push(item);
            }
        });
        return resultMonths;
    }
    else {
        return baseMonths;
    }
}
/**
 * 获取year年的所有月份
 *
 * @param year 年
 * @return 月份列表
 */
export function getMonthsNumber(year: number): number[] {
    let resultMonths: number[] = [];
    let baseMonths: number[] = [];
    let nStr1Index: number = 1;
    nStr1.forEach(item => {
        if (nStr1Index < nStr1.length) {
            baseMonths.push(nStr1Index);
            nStr1Index = nStr1Index + 1;
        }
    });
    if (leapMonth(year) != 0) {
        baseMonths.forEach(item => {
            if (nStr1[item].indexOf(nStr1[leapMonth(year)]) > -1) {
                resultMonths.push(item);
                resultMonths.push(leapMonth(year));
            }
            else {
                resultMonths.push(item);
            }
        });
        return resultMonths;
    }
    else {
        return baseMonths;
    }
}
/**
 * 获取每月农历显示名称
 *
 * @param maxDay 天
 * @return 名称列表
 */
export function getLunarDays(maxDay: number): any {
    let days: any = [];
    MaxDay.forEach(item => {
        if (maxDay > 0) {
            if (item <= maxDay) {
                days.push(getChinaDate(item));
            }
        }
    });
    return days;
}
