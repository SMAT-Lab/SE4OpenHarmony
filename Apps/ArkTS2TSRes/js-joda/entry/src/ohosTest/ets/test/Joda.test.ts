let __generate__Id: number = 0;
function generateId(): string {
    return "Joda.test_" + ++__generate__Id;
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
import { ChronoField, ChronoUnit, DateTimeFormatter, LocalDate, LocalDateTime, LocalTime, Period, TemporalAdjusters } from '@js-joda/core';
import { describe, expect, it } from '@ohos/hypium';
const BASE_COUNT: number = 2000;
export default function jodaTest22() {
    describe('JsJodaTest1', () => {
        it('assertLocalDate_parse', 0, () => {
            let startTime0 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_parse startTime:' + startTime0 + "us");
            let a = '2022-07-21';
            let b = LocalDate.parse("2022-07-21").toString();
            let endTime0 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_parse endTime:' + endTime0 + "us");
            let averageTime0 = endTime0 - startTime0;
            console.info('appInfoTest xts assertLocalDate_parse averageTime:' + averageTime0 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalDate.parse("2022-07-21");
            }
            endTime(startTime, 'assertLocalDate_parse');
            expect(a).assertEqual(b);
        });
        it('assertLocalDate_dayOfMonth', 0, () => {
            let startTime1 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_dayOfMonth startTime:' + startTime1 + "us");
            let a = '21';
            let b = LocalDate.parse("2022-07-21").dayOfMonth().toString();
            let endTime1 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_dayOfMonth endTime:' + endTime1 + "us");
            let averageTime1 = endTime1 - startTime1;
            console.info('appInfoTest xts assertLocalDate_dayOfMonth averageTime:' + averageTime1 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalDate.parse("2022-07-21").dayOfMonth().toString();
            }
            endTime(startTime, 'assertLocalDate_dayOfMonth');
            expect(a).assertEqual(b);
        });
        it('assertLocalDate_month', 0, () => {
            let startTime2 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_month startTime:' + startTime2 + "us");
            let a = 'JULY';
            let b = LocalDate.parse("2022-07-21").month().toString();
            let endTime2 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_month endTime:' + endTime2 + "us");
            let averageTime2 = endTime2 - startTime2;
            console.info('appInfoTest xts assertLocalDate_month averageTime:' + averageTime2 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalDate.parse("2022-07-21").month().toString();
            }
            endTime(startTime, 'assertLocalDate_month');
            expect(a).assertEqual(b);
        });
        it('assertLocalDate_monthValue', 0, () => {
            let startTime3 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_monthValue startTime:' + startTime3 + "us");
            let a = '7';
            let b = LocalDate.parse("2022-07-21").monthValue().toString();
            let endTime3 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_monthValue endTime:' + endTime3 + "us");
            let averageTime3 = endTime3 - startTime3;
            console.info('appInfoTest xts assertLocalDate_monthValue averageTime:' + averageTime3 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalDate.parse("2022-07-21").monthValue().toString();
            }
            endTime(startTime, 'assertLocalDate_monthValue');
            expect(a).assertEqual(b);
        });
        it('assertLocalDate_year', 0, () => {
            let startTime4 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_year startTime:' + startTime4 + "us");
            let a = '2022';
            let b = LocalDate.parse("2022-07-21").year().toString();
            let endTime4 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_year endTime:' + endTime4 + "us");
            let averageTime4 = endTime4 - startTime4;
            console.info('appInfoTest xts assertLocalDate_year averageTime:' + averageTime4 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalDate.parse("2022-07-21").year().toString();
            }
            endTime(startTime, 'assertLocalDate_year');
            expect(a).assertEqual(b);
        });
        it('assertLocalDate_dayOfWeek', 0, () => {
            let startTime5 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_dayOfWeek startTime:' + startTime5 + "us");
            let a = 'THURSDAY';
            let b = LocalDate.parse("2022-07-21").dayOfWeek().toString();
            let endTime5 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_dayOfWeek endTime:' + endTime5 + "us");
            let averageTime5 = endTime5 - startTime5;
            console.info('appInfoTest xts assertLocalDate_dayOfWeek averageTime:' + averageTime5 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalDate.parse("2022-07-21").dayOfWeek().toString();
            }
            endTime(startTime, 'assertLocalDate_dayOfWeek');
            expect(a).assertEqual(b);
        });
        it('assertLocalDate_dayOfWeekValue', 0, () => {
            let startTime6 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_dayOfWeekValue startTime:' + startTime6 + "us");
            let a = '4';
            let b = LocalDate.parse("2022-07-21").dayOfWeek().value().toString();
            let endTime6 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_dayOfWeekValue endTime:' + endTime6 + "us");
            let averageTime6 = endTime6 - startTime6;
            console.info('appInfoTest xts assertLocalDate_dayOfWeekValue averageTime:' + averageTime6 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalDate.parse("2022-07-21").dayOfWeek().value().toString();
            }
            endTime(startTime, 'assertLocalDate_dayOfWeekValue');
            expect(a).assertEqual(b);
        });
        it('assertLocalDate_dayOfYear', 0, () => {
            let startTime7 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_dayOfYear startTime:' + startTime7 + "us");
            let a = '202';
            let b = LocalDate.parse("2022-07-21").dayOfYear().toString();
            let endTime7 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_dayOfYear endTime:' + endTime7 + "us");
            let averageTime7 = endTime7 - startTime7;
            console.info('appInfoTest xts assertLocalDate_dayOfYear averageTime:' + averageTime7 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalDate.parse("2022-07-21").dayOfYear().toString();
            }
            endTime(startTime, 'assertLocalDate_dayOfYear');
            expect(a).assertEqual(b);
        });
        it('assertLocalDate_isLeapYear', 0, () => {
            let startTime8 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_isLeapYear startTime:' + startTime8 + "us");
            let a = false;
            let b = LocalDate.parse("2022-07-21").isLeapYear();
            let endTime8 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_isLeapYear endTime:' + endTime8 + "us");
            let averageTime8 = endTime8 - startTime8;
            console.info('appInfoTest xts assertLocalDate_isLeapYear averageTime:' + averageTime8 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalDate.parse("2022-07-21").isLeapYear();
            }
            endTime(startTime, 'assertLocalDate_isLeapYear');
            expect(a).assertEqual(b);
        });
        it('assertLocalDate_lengthOfMonth', 0, () => {
            let startTime9 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_lengthOfMonth startTime:' + startTime9 + "us");
            let a = '31';
            let b = LocalDate.parse("2022-07-21").lengthOfMonth().toString();
            let endTime9 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_lengthOfMonth endTime:' + endTime9 + "us");
            let averageTime9 = endTime9 - startTime9;
            console.info('appInfoTest xts assertLocalDate_lengthOfMonth averageTime:' + averageTime9 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalDate.parse("2022-07-21").lengthOfMonth().toString();
            }
            endTime(startTime, 'assertLocalDate_lengthOfMonth');
            expect(a).assertEqual(b);
        });
        it('assertLocalDate_lengthOfYear', 0, () => {
            let startTime10 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_lengthOfYear startTime:' + startTime10 + "us");
            let a = '365';
            let b = LocalDate.parse("2022-07-21").lengthOfYear().toString();
            let endTime10 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_lengthOfYear endTime:' + endTime10 + "us");
            let averageTime10 = endTime10 - startTime10;
            console.info('appInfoTest xts assertLocalDate_lengthOfYear averageTime:' + averageTime10 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalDate.parse("2022-07-21").lengthOfYear().toString();
            }
            endTime(startTime, 'assertLocalDate_lengthOfYear');
            expect(a).assertEqual(b);
        });
        it('assertLocalDate_ALIGNED_WEEK_OF_YEAR', 0, () => {
            let startTime11 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_ALIGNED_WEEK_OF_YEAR startTime:' + startTime11 + "us");
            let a = '29';
            let b = LocalDate.parse("2022-07-21").get(ChronoField.ALIGNED_WEEK_OF_YEAR).toString();
            let endTime11 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_ALIGNED_WEEK_OF_YEAR endTime:' + endTime11 + "us");
            let averageTime11 = endTime11 - startTime11;
            console.info('appInfoTest xts assertLocalDate_ALIGNED_WEEK_OF_YEAR averageTime:' + averageTime11 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalDate.parse("2022-07-21").get(ChronoField.ALIGNED_WEEK_OF_YEAR).toString();
            }
            endTime(startTime, 'assertLocalDate_ALIGNED_WEEK_OF_YEAR');
            expect(a).assertEqual(b);
        });
        it('assertLocalDate_plusDays', 0, () => {
            let startTime12 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_plusDays startTime:' + startTime12 + "us");
            let a = '2023-07-22';
            let b = LocalDate.parse("2022-07-21").plusDays(366).toString();
            let endTime12 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_plusDays endTime:' + endTime12 + "us");
            let averageTime12 = endTime12 - startTime12;
            console.info('appInfoTest xts assertLocalDate_plusDays averageTime:' + averageTime12 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalDate.parse("2022-07-21").plusDays(366).toString();
            }
            endTime(startTime, 'assertLocalDate_plusDays');
            expect(a).assertEqual(b);
        });
        it('assertLocalDate_minusDays', 0, () => {
            let startTime13 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_minusDays startTime:' + startTime13 + "us");
            let a = '2021-07-20';
            let b = LocalDate.parse("2022-07-21").minusDays(366).toString();
            let endTime13 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_minusDays endTime:' + endTime13 + "us");
            let averageTime13 = endTime13 - startTime13;
            console.info('appInfoTest xts assertLocalDate_minusDays averageTime:' + averageTime13 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalDate.parse("2022-07-21").minusDays(366).toString();
            }
            endTime(startTime, 'assertLocalDate_minusDays');
            expect(a).assertEqual(b);
        });
        it('assertLocalDate_plusMonths', 0, () => {
            let startTime14 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_plusMonths startTime:' + startTime14 + "us");
            let a = '2023-07-21';
            let b = LocalDate.parse("2022-07-21").plusMonths(12).toString();
            let endTime14 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_plusMonths endTime:' + endTime14 + "us");
            let averageTime14 = endTime14 - startTime14;
            console.info('appInfoTest xts assertLocalDate_plusMonths averageTime:' + averageTime14 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalDate.parse("2022-07-21").plusMonths(12).toString();
            }
            endTime(startTime, 'assertLocalDate_plusMonths');
            expect(a).assertEqual(b);
        });
        it('assertLocalDate_minusMonths', 0, () => {
            let startTime15 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_minusMonths startTime:' + startTime15 + "us");
            let a = '2021-07-21';
            let b = LocalDate.parse("2022-07-21").minusMonths(12).toString();
            let endTime15 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_minusMonths endTime:' + endTime15 + "us");
            let averageTime15 = endTime15 - startTime15;
            console.info('appInfoTest xts assertLocalDate_minusMonths averageTime:' + averageTime15 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalDate.parse("2022-07-21").minusMonths(12).toString();
            }
            endTime(startTime, 'assertLocalDate_minusMonths');
            expect(a).assertEqual(b);
        });
        it('assertLocalDate_plusWeeks', 0, () => {
            let startTime16 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_plusWeeks startTime:' + startTime16 + "us");
            let a = '2022-08-18';
            let b = LocalDate.parse("2022-07-21").plusWeeks(4).toString();
            let endTime16 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_plusWeeks endTime:' + endTime16 + "us");
            let averageTime16 = endTime16 - startTime16;
            console.info('appInfoTest xts assertLocalDate_plusWeeks averageTime:' + averageTime16 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalDate.parse("2022-07-21").plusWeeks(4).toString();
            }
            endTime(startTime, 'assertLocalDate_plusWeeks');
            expect(a).assertEqual(b);
        });
        it('assertLocalDate_minusWeeks', 0, () => {
            let startTime17 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_minusWeeks startTime:' + startTime17 + "us");
            let a = '2022-06-23';
            let b = LocalDate.parse("2022-07-21").minusWeeks(4).toString();
            let endTime17 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_minusWeeks endTime:' + endTime17 + "us");
            let averageTime17 = endTime17 - startTime17;
            console.info('appInfoTest xts assertLocalDate_minusWeeks averageTime:' + averageTime17 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalDate.parse("2022-07-21").minusWeeks(4).toString();
            }
            endTime(startTime, 'assertLocalDate_minusWeeks');
            expect(a).assertEqual(b);
        });
        it('assertLocalDate_plusYears', 0, () => {
            let startTime18 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_plusYears startTime:' + startTime18 + "us");
            let a = '2023-07-21';
            let b = LocalDate.parse("2022-07-21").plusYears(1).toString();
            let endTime18 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_plusYears endTime:' + endTime18 + "us");
            let averageTime18 = endTime18 - startTime18;
            console.info('appInfoTest xts assertLocalDate_plusYears averageTime:' + averageTime18 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalDate.parse("2022-07-21").plusYears(1).toString();
            }
            endTime(startTime, 'assertLocalDate_plusYears');
            expect(a).assertEqual(b);
        });
        it('assertLocalDate_minusYears', 0, () => {
            let startTime19 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_minusYears startTime:' + startTime19 + "us");
            let a = '2021-07-21';
            let b = LocalDate.parse("2022-07-21").minusYears(1).toString();
            let endTime19 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_minusYears endTime:' + endTime19 + "us");
            let averageTime19 = endTime19 - startTime19;
            console.info('appInfoTest xts assertLocalDate_minusYears averageTime:' + averageTime19 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalDate.parse("2022-07-21").minusYears(1).toString();
            }
            endTime(startTime, 'assertLocalDate_minusYears');
            expect(a).assertEqual(b);
        });
        it('assertLocalDate_plus', 0, () => {
            let startTime20 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_plus startTime:' + startTime20 + "us");
            let a = '2022-08-24';
            let b = LocalDate.parse("2022-07-21").plus(Period.ofMonths(1).plusDays(3)).toString();
            let endTime20 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_plus endTime:' + endTime20 + "us");
            let averageTime20 = endTime20 - startTime20;
            console.info('appInfoTest xts assertLocalDate_plus averageTime:' + averageTime20 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalDate.parse("2022-07-21").plus(Period.ofMonths(1).plusDays(3)).toString();
            }
            endTime(startTime, 'assertLocalDate_plus');
            expect(a).assertEqual(b);
        });
        it('assertLocalDate_minus', 0, () => {
            let startTime21 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_minus startTime:' + startTime21 + "us");
            let a = '2022-06-18';
            let b = LocalDate.parse("2022-07-21").minus(Period.ofMonths(1).plusDays(3)).toString();
            let endTime21 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_minus endTime:' + endTime21 + "us");
            let averageTime21 = endTime21 - startTime21;
            console.info('appInfoTest xts assertLocalDate_minus averageTime:' + averageTime21 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalDate.parse("2022-07-21").minus(Period.ofMonths(1).plusDays(3)).toString();
            }
            endTime(startTime, 'assertLocalDate_minus');
            expect(a).assertEqual(b);
        });
        it('assertLocalDate_withDayOfMonth', 0, () => {
            let startTime22 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_withDayOfMonth startTime:' + startTime22 + "us");
            let a = '2022-07-01';
            let b = LocalDate.parse("2022-07-21").withDayOfMonth(1).toString();
            let endTime22 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_withDayOfMonth endTime:' + endTime22 + "us");
            let averageTime22 = endTime22 - startTime22;
            console.info('appInfoTest xts assertLocalDate_withDayOfMonth averageTime:' + averageTime22 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalDate.parse("2022-07-21").withDayOfMonth(1).toString();
            }
            endTime(startTime, 'assertLocalDate_withDayOfMonth');
            expect(a).assertEqual(b);
        });
        it('assertLocalDate_withDayOfYear', 0, () => {
            let startTime23 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_withDayOfYear startTime:' + startTime23 + "us");
            let a = '2021-02-11';
            let b = LocalDate.parse("2021-07-21").withDayOfYear(42).toString();
            let endTime23 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_withDayOfYear endTime:' + endTime23 + "us");
            let averageTime23 = endTime23 - startTime23;
            console.info('appInfoTest xts assertLocalDate_withDayOfYear averageTime:' + averageTime23 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalDate.parse("2021-07-21").withDayOfYear(42).toString();
            }
            endTime(startTime, 'assertLocalDate_withDayOfYear');
            expect(a).assertEqual(b);
        });
        it('assertLocalDate_withMonth_withDayOfMonth', 0, () => {
            let startTime24 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_withMonth_withDayOfMonth startTime:' + startTime24 + "us");
            let a = '2021-01-01';
            let b = LocalDate.parse("2021-07-21").withMonth(1).withDayOfMonth(1).toString();
            let endTime24 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_withMonth_withDayOfMonth endTime:' + endTime24 + "us");
            let averageTime24 = endTime24 - startTime24;
            console.info('appInfoTest xts assertLocalDate_withMonth_withDayOfMonth averageTime:' + averageTime24 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalDate.parse("2021-07-21").withMonth(1).withDayOfMonth(1).toString();
            }
            endTime(startTime, 'assertLocalDate_withMonth_withDayOfMonth');
            expect(a).assertEqual(b);
        });
        it('assertLocalDate_withYear', 0, () => {
            let startTime25 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_withYear startTime:' + startTime25 + "us");
            let a = '0001-07-21';
            let b = LocalDate.parse("2021-07-21").withYear(1).toString();
            let endTime25 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_withYear endTime:' + endTime25 + "us");
            let averageTime25 = endTime25 - startTime25;
            console.info('appInfoTest xts assertLocalDate_withYear averageTime:' + averageTime25 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalDate.parse("2021-07-21").withYear(1).toString();
            }
            endTime(startTime, 'assertLocalDate_withYear');
            expect(a).assertEqual(b);
        });
        it('assertLocalDate_isAfter', 0, () => {
            let startTime26 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_isAfter startTime:' + startTime26 + "us");
            let mDate1 = LocalDate.parse('2022-07-25');
            let mDate2 = mDate1.plusDays(2);
            let endTime26 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_isAfter endTime:' + endTime26 + "us");
            let averageTime26 = endTime26 - startTime26;
            console.info('appInfoTest xts assertLocalDate_isAfter averageTime:' + averageTime26 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalDate.parse('2022-07-25').plusDays(2);
            }
            endTime(startTime, 'assertLocalDate_isAfter');
            expect(false).assertEqual(mDate1.isAfter(mDate2));
        });
        it('assertLocalDate_isBefore', 0, () => {
            let startTime27 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_isBefore startTime:' + startTime27 + "us");
            let mDate1 = LocalDate.parse('2022-07-25');
            let mDate2 = mDate1.plusDays(2);
            let endTime27 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_isBefore endTime:' + endTime27 + "us");
            let averageTime27 = endTime27 - startTime27;
            console.info('appInfoTest xts assertLocalDate_isBefore averageTime:' + averageTime27 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalDate.parse('2022-07-25').plusDays(2);
            }
            endTime(startTime, 'assertLocalDate_isBefore');
            expect(true).assertEqual(mDate1.isBefore(mDate2));
        });
        it('assertLocalDate_with', 0, () => {
            let startTime28 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_with startTime:' + startTime28 + "us");
            let mDate1 = LocalDate.parse('2022-07-25');
            let mDate2 = '2022-07-31';
            let endTime28 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDate_with endTime:' + endTime28 + "us");
            let averageTime28 = endTime28 - startTime28;
            console.info('appInfoTest xts assertLocalDate_with averageTime:' + averageTime28 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalDate.parse('2022-07-25');
            }
            endTime(startTime, 'assertLocalDate_with');
            expect(mDate2).assertEqual(mDate1.with(TemporalAdjusters.lastDayOfMonth()).toString());
        });
        it('assertLocalTime_of', 0, () => {
            let startTime29 = new Date().getTime();
            console.info('appInfoTest xts assertLocalTime_of startTime:' + startTime29 + "us");
            let mDate1 = '23:55:42';
            let mDate2 = LocalTime.of(23, 55, 42).toString();
            let endTime29 = new Date().getTime();
            console.info('appInfoTest xts assertLocalTime_of endTime:' + endTime29 + "us");
            let averageTime29 = endTime29 - startTime29;
            console.info('appInfoTest xts assertLocalTime_of averageTime:' + averageTime29 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalTime.of(23, 55, 42).toString();
            }
            endTime(startTime, 'assertLocalTime_of');
            expect(mDate1).assertEqual(mDate2);
        });
        it('assertLocalTime_ofSecondDay', 0, () => {
            let startTime30 = new Date().getTime();
            console.info('appInfoTest xts assertLocalTime_ofSecondDay startTime:' + startTime30 + "us");
            let mDate1 = '01:01:06';
            let mDate2 = LocalTime.ofSecondOfDay(3666).toString();
            let endTime30 = new Date().getTime();
            console.info('appInfoTest xts assertLocalTime_ofSecondDay endTime:' + endTime30 + "us");
            let averageTime30 = endTime30 - startTime30;
            console.info('appInfoTest xts assertLocalTime_ofSecondDay averageTime:' + averageTime30 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalTime.ofSecondOfDay(3666).toString();
            }
            endTime(startTime, 'assertLocalTime_ofSecondDay');
            expect(mDate1).assertEqual(mDate2);
        });
        it('assertLocalTime_ofSecondDay1', 0, () => {
            let startTime31 = new Date().getTime();
            console.info('appInfoTest xts assertLocalTime_ofSecondDay1 startTime:' + startTime31 + "us");
            let mDate1 = '01:01:06';
            let mDate2 = LocalTime.ofSecondOfDay(3666).toString();
            let endTime31 = new Date().getTime();
            console.info('appInfoTest xts assertLocalTime_ofSecondDay1 endTime:' + endTime31 + "us");
            let averageTime31 = endTime31 - startTime31;
            console.info('appInfoTest xts assertLocalTime_ofSecondDay1 averageTime:' + averageTime31 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalTime.ofSecondOfDay(3666).toString();
            }
            endTime(startTime, 'assertLocalTime_ofSecondDay1');
            expect(mDate1).assertEqual(mDate2);
        });
        it('assertLocalTime_truncatedTo', 0, () => {
            let startTime32 = new Date().getTime();
            console.info('appInfoTest xts assertLocalTime_truncatedTo startTime:' + startTime32 + "us");
            let mDate1 = '23:55:42';
            let mDate2 = LocalTime.parse('23:55:42.123').truncatedTo(ChronoUnit.SECONDS).toString();
            let endTime32 = new Date().getTime();
            console.info('appInfoTest xts assertLocalTime_truncatedTo endTime:' + endTime32 + "us");
            let averageTime32 = endTime32 - startTime32;
            console.info('appInfoTest xts assertLocalTime_truncatedTo averageTime:' + averageTime32 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalTime.parse('23:55:42.123').truncatedTo(ChronoUnit.SECONDS).toString();
            }
            endTime(startTime, 'assertLocalTime_truncatedTo');
            expect(mDate1).assertEqual(mDate2);
        });
        it('assertLocalTime_hour', 0, () => {
            let startTime33 = new Date().getTime();
            console.info('appInfoTest xts assertLocalTime_hour startTime:' + startTime33 + "us");
            let mDate1 = '23';
            let mDate2 = LocalTime.parse('23:55:42.123').hour().toString();
            let endTime33 = new Date().getTime();
            console.info('appInfoTest xts assertLocalTime_hour endTime:' + endTime33 + "us");
            let averageTime33 = endTime33 - startTime33;
            console.info('appInfoTest xts assertLocalTime_hour averageTime:' + averageTime33 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalTime.parse('23:55:42.123').hour().toString();
            }
            endTime(startTime, 'assertLocalTime_hour');
            expect(mDate1).assertEqual(mDate2);
        });
        it('assertLocalTime_minute', 0, () => {
            let startTime34 = new Date().getTime();
            console.info('appInfoTest xts assertLocalTime_minute startTime:' + startTime34 + "us");
            let mDate1 = '55';
            let mDate2 = LocalTime.parse('23:55:42.123').minute().toString();
            let endTime34 = new Date().getTime();
            console.info('appInfoTest xts assertLocalTime_minute endTime:' + endTime34 + "us");
            let averageTime34 = endTime34 - startTime34;
            console.info('appInfoTest xts assertLocalTime_minute averageTime:' + averageTime34 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalTime.parse('23:55:42.123').minute().toString();
            }
            endTime(startTime, 'assertLocalTime_minute');
            expect(mDate1).assertEqual(mDate2);
        });
        it('assertLocalTime_second', 0, () => {
            let startTime35 = new Date().getTime();
            console.info('appInfoTest xts assertLocalTime_second startTime:' + startTime35 + "us");
            let mDate1 = '42';
            let mDate2 = LocalTime.parse('23:55:42.123').second().toString();
            let endTime35 = new Date().getTime();
            console.info('appInfoTest xts assertLocalTime_second endTime:' + endTime35 + "us");
            let averageTime35 = endTime35 - startTime35;
            console.info('appInfoTest xts assertLocalTime_second averageTime:' + averageTime35 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalTime.parse('23:55:42.123').second().toString();
            }
            endTime(startTime, 'assertLocalTime_second');
            expect(mDate1).assertEqual(mDate2);
        });
        it('assertLocalTime_second_of_day', 0, () => {
            let startTime36 = new Date().getTime();
            console.info('appInfoTest xts assertLocalTime_second_of_day startTime:' + startTime36 + "us");
            let mDate1 = '86142';
            let mDate2 = LocalTime.parse('23:55:42.123').get(ChronoField.SECOND_OF_DAY).toString();
            let endTime36 = new Date().getTime();
            console.info('appInfoTest xts assertLocalTime_second_of_day endTime:' + endTime36 + "us");
            let averageTime36 = endTime36 - startTime36;
            console.info('appInfoTest xts assertLocalTime_second_of_day averageTime:' + averageTime36 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalTime.parse('23:55:42.123').get(ChronoField.SECOND_OF_DAY).toString();
            }
            endTime(startTime, 'assertLocalTime_second_of_day');
            expect(mDate1).assertEqual(mDate2);
        });
        it('assertLocalTime_HOUR_OF_AMPM', 0, () => {
            let startTime37 = new Date().getTime();
            console.info('appInfoTest xts assertLocalTime_HOUR_OF_AMPM startTime:' + startTime37 + "us");
            let mDate1 = '11';
            let mDate2 = LocalTime.parse('23:55:42.123').get(ChronoField.HOUR_OF_AMPM).toString();
            let endTime37 = new Date().getTime();
            console.info('appInfoTest xts assertLocalTime_HOUR_OF_AMPM endTime:' + endTime37 + "us");
            let averageTime37 = endTime37 - startTime37;
            console.info('appInfoTest xts assertLocalTime_HOUR_OF_AMPM averageTime:' + averageTime37 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalTime.parse('23:55:42.123').get(ChronoField.HOUR_OF_AMPM).toString();
            }
            endTime(startTime, 'assertLocalTime_HOUR_OF_AMPM');
            expect(mDate1).assertEqual(mDate2);
        });
        it('assertLocalTime_plusHours', 0, () => {
            let startTime38 = new Date().getTime();
            console.info('appInfoTest xts assertLocalTime_plusHours startTime:' + startTime38 + "us");
            let mDate1 = '23:55:42';
            let mDate2 = LocalTime.parse('11:55:42').plusHours(12).toString();
            let endTime38 = new Date().getTime();
            console.info('appInfoTest xts assertLocalTime_plusHours endTime:' + endTime38 + "us");
            let averageTime38 = endTime38 - startTime38;
            console.info('appInfoTest xts assertLocalTime_plusHours averageTime:' + averageTime38 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalTime.parse('11:55:42').plusHours(12).toString();
            }
            endTime(startTime, 'assertLocalTime_plusHours');
            expect(mDate1).assertEqual(mDate2);
        });
        it('assertLocalTime_plusMinutes', 0, () => {
            let startTime39 = new Date().getTime();
            console.info('appInfoTest xts assertLocalTime_plusMinutes startTime:' + startTime39 + "us");
            let mDate1 = '12:25:42';
            let mDate2 = LocalTime.parse('11:55:42').plusMinutes(30).toString();
            let endTime39 = new Date().getTime();
            console.info('appInfoTest xts assertLocalTime_plusMinutes endTime:' + endTime39 + "us");
            let averageTime39 = endTime39 - startTime39;
            console.info('appInfoTest xts assertLocalTime_plusMinutes averageTime:' + averageTime39 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalTime.parse('11:55:42').plusMinutes(30).toString();
            }
            endTime(startTime, 'assertLocalTime_plusMinutes');
            expect(mDate1).assertEqual(mDate2);
        });
        it('assertLocalTime_plusSeconds', 0, () => {
            let startTime40 = new Date().getTime();
            console.info('appInfoTest xts assertLocalTime_plusSeconds startTime:' + startTime40 + "us");
            let mDate1 = '11:56:12';
            let mDate2 = LocalTime.parse('11:55:42').plusSeconds(30).toString();
            let endTime40 = new Date().getTime();
            console.info('appInfoTest xts assertLocalTime_plusSeconds endTime:' + endTime40 + "us");
            let averageTime40 = endTime40 - startTime40;
            console.info('appInfoTest xts assertLocalTime_plusSeconds averageTime:' + averageTime40 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalTime.parse('11:55:42').plusSeconds(30).toString();
            }
            endTime(startTime, 'assertLocalTime_plusSeconds');
            expect(mDate1).assertEqual(mDate2);
        });
        it('assertLocalTime_withHour', 0, () => {
            let startTime41 = new Date().getTime();
            console.info('appInfoTest xts assertLocalTime_withHour startTime:' + startTime41 + "us");
            let mDate1 = '01:55:42';
            let mDate2 = LocalTime.parse('11:55:42').withHour(1).toString();
            let endTime41 = new Date().getTime();
            console.info('appInfoTest xts assertLocalTime_withHour endTime:' + endTime41 + "us");
            let averageTime41 = endTime41 - startTime41;
            console.info('appInfoTest xts assertLocalTime_withHour averageTime:' + averageTime41 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalTime.parse('11:55:42').withHour(1).toString();
            }
            endTime(startTime, 'assertLocalTime_withHour');
            expect(mDate1).assertEqual(mDate2);
        });
        it('assertLocalTime_withMinute', 0, () => {
            let startTime42 = new Date().getTime();
            console.info('appInfoTest xts assertLocalTime_withMinute startTime:' + startTime42 + "us");
            let mDate1 = '11:01:42';
            let mDate2 = LocalTime.parse('11:55:42').withMinute(1).toString();
            let endTime42 = new Date().getTime();
            console.info('appInfoTest xts assertLocalTime_withMinute endTime:' + endTime42 + "us");
            let averageTime42 = endTime42 - startTime42;
            console.info('appInfoTest xts assertLocalTime_withMinute averageTime:' + averageTime42 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalTime.parse('11:55:42').withMinute(1).toString();
            }
            endTime(startTime, 'assertLocalTime_withMinute');
            expect(mDate1).assertEqual(mDate2);
        });
        it('assertLocalTime_withSecond', 0, () => {
            let startTime43 = new Date().getTime();
            console.info('appInfoTest xts assertLocalTime_withSecond startTime:' + startTime43 + "us");
            let mDate1 = '11:55:01';
            let mDate2 = LocalTime.parse('11:55:42').withSecond(1).toString();
            let endTime43 = new Date().getTime();
            console.info('appInfoTest xts assertLocalTime_withSecond endTime:' + endTime43 + "us");
            let averageTime43 = endTime43 - startTime43;
            console.info('appInfoTest xts assertLocalTime_withSecond averageTime:' + averageTime43 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalTime.parse('11:55:42').withSecond(1).toString();
            }
            endTime(startTime, 'assertLocalTime_withSecond');
            expect(mDate1).assertEqual(mDate2);
        });
        it('assertLocalDateTime_format', 0, () => {
            let startTime44 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDateTime_format startTime:' + startTime44 + "us");
            let mDate1 = '4/28/2018';
            let mDate2 = LocalDateTime.parse('2018-04-28T12:34')
                .format(DateTimeFormatter.ofPattern('M/d/yyyy')).toString();
            console.info("b==============" + mDate2);
            let endTime44 = new Date().getTime();
            console.info('appInfoTest xts assertLocalDateTime_format endTime:' + endTime44 + "us");
            let averageTime44 = endTime44 - startTime44;
            console.info('appInfoTest xts assertLocalDateTime_format averageTime:' + averageTime44 + "us");
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                LocalDateTime.parse('2018-04-28T12:34')
                    .format(DateTimeFormatter.ofPattern('M/d/yyyy')).toString();
            }
            endTime(startTime, 'assertLocalDateTime_format');
            expect(mDate1).assertEqual(mDate2);
        });
    });
}
function endTime(startTime: number, tag: string) {
    let endTime: number = new Date().getTime();
    let averageTime = ((endTime - startTime) * 1000 / BASE_COUNT);
    console.info(tag + " startTime: " + endTime);
    console.info(tag + " endTime: " + endTime);
    console.log(tag + " averageTime: " + averageTime + "μs");
}
