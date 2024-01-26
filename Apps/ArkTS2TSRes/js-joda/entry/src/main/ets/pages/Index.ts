interface Index_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/**
 * BSD License
 *
 * Copyright (c) 2023 Huawei Device Co., Ltd. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * * Neither the name Facebook nor the names of its contributors may be used to
 * endorse or promote products derived from this software without specific
 * prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
import { ChronoField, ChronoUnit, DayOfWeek, LocalDate, Month, Period, TemporalAdjusters, } from '@js-joda/core';
// import '@js-joda/timezone'
import router from '@ohos.router';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Scroll.create();
        Scroll.width('100%');
        Column.create();
        Button.createWithLabel('本地日期测试', { type: ButtonType.Capsule, stateEffect: true });
        Button.backgroundColor(0x317aff);
        Button.width(240);
        Button.onClick(() => {
            this.message = testLocalDate();
        });
        Button.pop();
        Text.create(this.message);
        Text.fontSize(20);
        Text.margin(10);
        Text.fontColor(Color.Blue);
        Text.pop();
        Button.createWithLabel('下一页', { type: ButtonType.Capsule, stateEffect: true });
        Button.backgroundColor(0x317aff);
        Button.width(240);
        Button.onClick(() => {
            router.push({ url: 'pages/second' });
        });
        Button.pop();
        Column.pop();
        Scroll.pop();
        Row.pop();
    }
}
// 测试本地日期
function testLocalDate(): string {
    // 获取当前日期
    console.log(LocalDate.now().toString());
    // 解析日期2022-07-21
    console.log(LocalDate.now().toString());
    let mDate = LocalDate.parse("2022-07-21");
    console.info(mDate.toString());
    // 当前日期时半月的第几天:21
    console.info(mDate.dayOfMonth().toString());
    // 当前月份:JULY
    console.info(mDate.month().toString());
    // 当前月份对应的值:7
    console.info(mDate.monthValue().toString());
    // 当前年份:2022
    console.info(mDate.year().toString());
    // 当前日期是周几:THURSDAY
    console.info(mDate.dayOfWeek().toString());
    // 当前日期是周几对应的值:4
    console.info(mDate.dayOfWeek().value().toString());
    // 当前日期是一年中的第几天:202
    console.info(mDate.dayOfYear().toString());
    // 当前年根是否为闰年:false
    console.log(mDate.isLeapYear() + '');
    // 当前月有多少天:31
    console.info(mDate.lengthOfMonth().toString());
    // 当前年有多少天:365
    console.info(mDate.lengthOfYear().toString());
    // 当前日期在一年中的第几周：29
    console.info(mDate.get(ChronoField.ALIGNED_WEEK_OF_YEAR).toString());
    // ******************************************日期计算******************************************
    // 当前日期加上366天:2023-07-22
    console.info(mDate.plusDays(366).toString());
    // 当前日期减去366天：2021-7-20
    console.info(mDate.minusDays(366).toString());
    // 当前日期添加12个月：2023-07-21
    console.info(mDate.plusMonths(12).toString());
    // 当前日期减去12个月：2021-07-21
    console.info(mDate.minusMonths(12).toString());
    // 当前日期添加4周：2022-08-18
    console.info(mDate.plusWeeks(4).toString());
    // 当前日期减去4周：2022-06-23
    console.info(mDate.minusWeeks(4).toString());
    // 当前日期添加一年：2023-07-21
    console.info(mDate.plusYears(1).toString());
    // 当前日期减去一年：2021-07-21
    console.info(mDate.minusYears(1).toString());
    // 当前日期加上一个月零3天：2022-08-24
    console.info(mDate.plus(Period.ofMonths(1).plusDays(3)).toString());
    // 当前日期减去一个月零3天：2022-06-18
    console.info(mDate.minus(Period.ofMonths(1).plusDays(3)).toString());
    // 当前日期设置为1号：2022-07-01
    console.info(mDate.withDayOfMonth(1).toString());
    // 当前月和日期设置成1：2022-01-01
    console.info(mDate.withMonth(1).withDayOfMonth(1).toString());
    // 当前月设置成指定月份，日期设置为1:2022-11-01
    console.info(mDate.withMonth(Month.NOVEMBER).withDayOfMonth(1).toString());
    // 当前月份设置为1:0001-07-21
    console.info(mDate.withYear(1).toString());
    // 当前月最后一天
    console.log(LocalDate.now()
        .plusMonths(1)
        .withDayOfMonth(1)
        .minusDays(1)
        .toString());
    // 本年的第42天：2022-02-11
    console.info(mDate.withDayOfYear(42).toString());
    let mDate1 = LocalDate.parse("2022-07-25");
    let mDate2 = mDate1.plusDays(2);
    // 判断两个日期前后：false true
    console.info(mDate1.isAfter(mDate2) + '');
    console.info(mDate1.isBefore(mDate2) + '');
    // 判断两个日期是否相等 false
    console.info(mDate1.equals(mDate2) + '');
    // 判断两个日期间的间隔时间：P2D
    console.info(mDate1.until(mDate2).toString());
    // 判断两个日期间的间隔时间：2
    console.info(mDate1.until(mDate2, ChronoUnit.DAYS).toString());
    // 获取测试月的第一天：2022-07-01
    console.info(mDate1.with(TemporalAdjusters.firstDayOfMonth()).toString());
    // 获取测试月的最后一天：2022-07-31
    console.info(mDate1.with(TemporalAdjusters.lastDayOfMonth()).toString());
    // 获取不小于测试日期的下一个周日日期：2022-07-31
    console.info(mDate1.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY)).toString());
    // 获取测试月份最后一个周日的日期：2022-07-31
    console.info(mDate1.with(TemporalAdjusters.lastInMonth(DayOfWeek.SUNDAY)).toString());
    return "解析给定日期： " + mDate.toString() + '\n' +
        "给定日期是当月第几天： " + mDate.dayOfMonth().toString() + '\n' +
        "给定日期月份： " + mDate.month().toString() + '\n' +
        "给定月份的值： " + mDate.monthValue().toString() + '\n' +
        "给定日期年份： " + mDate.year().toString() + '\n' +
        "给定日期是周几: " + mDate.dayOfWeek().toString() + '\n' +
        "给定日期是周几数字值： " + mDate.dayOfWeek().value().toString() + '\n' +
        "给定日期是一年中的第几天： " + mDate.dayOfYear().toString() + '\n' +
        "给定年份是否是闰年： " + mDate.isLeapYear() + '\n' +
        "给定月份有多少天： " + mDate.lengthOfMonth().toString() + '\n' +
        "给定年份有多少天： " + mDate.lengthOfYear().toString() + '\n' +
        "给定日期在一年中的第几周： " + mDate.get(ChronoField.ALIGNED_WEEK_OF_YEAR).toString() + '\n' +
        "给定日期加366天： " + mDate.plusDays(366).toString() + '\n' +
        "给定日期减去366天： " + mDate.minusDays(366).toString() + '\n' +
        "给定日期加上12个月： " + mDate.plusMonths(12).toString() + '\n' +
        "给定日期减去12个月： " + mDate.minusMonths(12).toString() + '\n' +
        "给定日期加上4周： " + mDate.plusWeeks(4).toString() + '\n' +
        "给定日期减去4周： " + mDate.minusWeeks(4).toString() + '\n' +
        "给定日期加上1年： " + mDate.plusYears(1).toString() + '\n' +
        "给定日期减去1年： " + mDate.minusYears(1).toString() + '\n' +
        "给定日期加上一个月零三天： " + mDate.plus(Period.ofMonths(1).plusDays(3)).toString() + '\n' +
        "给定日期减去一个月零三天： " + mDate.minus(Period.ofMonths(1).plusDays(3)).toString() + '\n' +
        "给定日期的日期设置成1： " + mDate.withDayOfMonth(1).toString() + '\n' +
        "给定日期的月份和日期设置成1： " + mDate.withMonth(1).withDayOfMonth(1).toString() + '\n' +
        "给定年份的第42天： " + mDate.withDayOfYear(42).toString() + '\n' +
        "给定月份的第一天： " + mDate.with(TemporalAdjusters.firstDayOfMonth()).toString() + '\n' +
        "获取当前日期： " + LocalDate.now().toString() + '\n' +
        "获取月份最后一天： " + LocalDate.now().plusMonths(1).withDayOfMonth(1).minusDays(1).toString();
}
loadDocument(new Index("1", undefined, {}));
