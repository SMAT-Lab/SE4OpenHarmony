let __generate__Id: number = 0;
function generateId(): string {
    return "Joda_en-us.test_" + ++__generate__Id;
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
import { Locale, WeekFields } from '@ohos/localeenus';
import { describe, expect, it } from '@ohos/hypium';
const BASE_COUNT: number = 2000;
export default function jodaEnUsTest() {
    describe('JsJodaEnUs', () => {
        it('language', 0, () => {
            try {
                let startTime0 = new Date().getTime();
                console.info('JsJodaEnUs xts language startTime:' + startTime0 + "us");
                let languageParam: string = new Locale("Chinese", "", "").language();
                let endTime0 = new Date().getTime();
                console.info('JsJodaEnUs xts language endTime:' + endTime0 + "us");
                let averageTime0 = endTime0 - startTime0;
                console.info('JsJodaEnUs xts language averageTime:' + averageTime0 + "us");
                let startTime = new Date().getTime();
                for (let index = 0; index < BASE_COUNT; index++) {
                    new Locale("Chinese", "", "").language();
                }
                endTime(startTime, 'language');
                expect(languageParam).assertEqual("Chinese");
            }
            catch (e) {
                console.info(e);
            }
        });
        it('country', 0, () => {
            try {
                let startTime0 = new Date().getTime();
                console.info('JsJodaEnUs xts country startTime:' + startTime0 + "us");
                let chinaParam: string = new Locale("Chinese", "china", "").country();
                let endTime0 = new Date().getTime();
                console.info('JsJodaEnUs xts country endTime:' + endTime0 + "us");
                let averageTime0 = endTime0 - startTime0;
                console.info('JsJodaEnUs xts country averageTime:' + averageTime0 + "us");
                let startTime = new Date().getTime();
                for (let index = 0; index < BASE_COUNT; index++) {
                    new Locale("Chinese", "china", "").country();
                }
                endTime(startTime, 'country');
                expect(chinaParam).assertEqual("china");
            }
            catch (e) {
                console.info(e);
            }
        });
        it('localeString', 0, () => {
            try {
                let startTime0 = new Date().getTime();
                console.info('JsJodaEnUs xts localeString startTime:' + startTime0 + "us");
                let localeStringParam: string = new Locale("Chinese", "china", "localeString").localeString();
                let endTime0 = new Date().getTime();
                console.info('JsJodaEnUs xts localeString endTime:' + endTime0 + "us");
                let averageTime0 = endTime0 - startTime0;
                console.info('JsJodaEnUs xts localeString averageTime:' + averageTime0 + "us");
                let startTime = new Date().getTime();
                for (let index = 0; index < BASE_COUNT; index++) {
                    new Locale("Chinese", "china", "localeString").localeString();
                }
                endTime(startTime, 'localeString');
                expect(localeStringParam).assertEqual("localeString");
            }
            catch (e) {
                console.info(e);
            }
        });
        it('localeToString', 0, () => {
            try {
                let startTime0 = new Date().getTime();
                console.info('JsJodaEnUs xts toString startTime:' + startTime0 + "us");
                let toStringParam: string = new Locale("Chinese", "china", "localeString").toString();
                let endTime0 = new Date().getTime();
                console.info('JsJodaEnUs xts toString endTime:' + endTime0 + "us");
                let averageTime0 = endTime0 - startTime0;
                console.info('JsJodaEnUs xts toString averageTime:' + averageTime0 + "us");
                let startTime = new Date().getTime();
                for (let index = 0; index < BASE_COUNT; index++) {
                    new Locale("Chinese", "china", "localeString").toString();
                }
                endTime(startTime, 'localeToString');
                expect(toStringParam).assertEqual("Locale[localeString]");
            }
            catch (e) {
            }
        });
        it('localeEquals', 0, () => {
            try {
                let startTime0 = new Date().getTime();
                console.info('JsJodaEnUs xts localeEquals startTime:' + startTime0 + "us");
                let equalsResult: boolean = new Locale("Chinese", "china", "localeString").equals("");
                let endTime0 = new Date().getTime();
                console.info('JsJodaEnUs xts localeEquals endTime:' + endTime0 + "us");
                let averageTime0 = endTime0 - startTime0;
                console.info('JsJodaEnUs xts localeEquals averageTime:' + averageTime0 + "us");
                let startTime = new Date().getTime();
                for (let index = 0; index < BASE_COUNT; index++) {
                    new Locale("Chinese", "china", "localeString").equals("");
                }
                endTime(startTime, 'localeEquals');
                expect(equalsResult).assertEqual(false);
            }
            catch (e) {
                console.info(e);
            }
        });
        it('firstDayOfWeek', 0, () => {
            try {
                let startTime0 = new Date().getTime();
                console.info('JsJodaEnUs xts firstDayOfWeek startTime:' + startTime0 + "us");
                let firstDayOfWeek: String = WeekFields.SUNDAY_START.firstDayOfWeek().name();
                let endTime0 = new Date().getTime();
                console.info('JsJodaEnUs xts firstDayOfWeek endTime:' + endTime0 + "us");
                let averageTime0 = endTime0 - startTime0;
                console.info('JsJodaEnUs xts firstDayOfWeek averageTime:' + averageTime0 + "us");
                let startTime = new Date().getTime();
                for (let index = 0; index < BASE_COUNT; index++) {
                    WeekFields.SUNDAY_START.firstDayOfWeek().name();
                }
                endTime(startTime, 'firstDayOfWeek');
                expect(firstDayOfWeek).assertEqual("SUNDAY");
            }
            catch (e) {
                console.info(e);
            }
        });
        it('minimalDaysInFirstWeek', 0, () => {
            try {
                let startTime0 = new Date().getTime();
                console.info('JsJodaEnUs xts minimalDaysInFirstWeek startTime:' + startTime0 + "us");
                let minimalDaysInFirstWeek: number = WeekFields.SUNDAY_START.minimalDaysInFirstWeek();
                let endTime0 = new Date().getTime();
                console.info('JsJodaEnUs xts minimalDaysInFirstWeek endTime:' + endTime0 + "us");
                let averageTime0 = endTime0 - startTime0;
                console.info('JsJodaEnUs xts minimalDaysInFirstWeek averageTime:' + averageTime0 + "us");
                let startTime = new Date().getTime();
                for (let index = 0; index < BASE_COUNT; index++) {
                    WeekFields.SUNDAY_START.minimalDaysInFirstWeek();
                }
                endTime(startTime, 'minimalDaysInFirstWeek');
                expect(minimalDaysInFirstWeek).assertEqual(1);
            }
            catch (e) {
                console.info(e);
            }
        });
        it('dayOfWeek', 0, () => {
            try {
                let startTime0 = new Date().getTime();
                console.info('JsJodaEnUs xts dayOfWeek startTime:' + startTime0 + "us");
                let dayOfWeek: string = WeekFields.SUNDAY_START.dayOfWeek().name();
                let endTime0 = new Date().getTime();
                console.info('JsJodaEnUs xts dayOfWeek endTime:' + endTime0 + "us");
                let averageTime0 = endTime0 - startTime0;
                console.info('JsJodaEnUs xts dayOfWeek averageTime:' + averageTime0 + "us");
                let startTime = new Date().getTime();
                for (let index = 0; index < BASE_COUNT; index++) {
                    WeekFields.SUNDAY_START.dayOfWeek().name();
                }
                endTime(startTime, 'dayOfWeek');
                expect(dayOfWeek).assertEqual("DayOfWeek");
            }
            catch (e) {
                console.info(e);
            }
        });
        it('weekOfMonth', 0, () => {
            try {
                let startTime0 = new Date().getTime();
                console.info('JsJodaEnUs xts weekOfMonth startTime:' + startTime0 + "us");
                let weekOfMonth: string = WeekFields.SUNDAY_START.weekOfMonth().name();
                let endTime0 = new Date().getTime();
                console.info('JsJodaEnUs xts weekOfMonth endTime:' + endTime0 + "us");
                let averageTime0 = endTime0 - startTime0;
                console.info('JsJodaEnUs xts weekOfMonth averageTime:' + averageTime0 + "us");
                let startTime = new Date().getTime();
                for (let index = 0; index < BASE_COUNT; index++) {
                    WeekFields.SUNDAY_START.weekOfMonth().name();
                }
                endTime(startTime, 'weekOfMonth');
                expect(weekOfMonth).assertEqual("WeekOfMonth");
            }
            catch (e) {
                console.info(e);
            }
        });
        it('weekOfYear', 0, () => {
            try {
                let startTime0 = new Date().getTime();
                console.info('JsJodaEnUs xts weekOfYear startTime:' + startTime0 + "us");
                let weekOfYear: string = WeekFields.SUNDAY_START.weekOfYear().name();
                let endTime0 = new Date().getTime();
                console.info('JsJodaEnUs xts weekOfYear endTime:' + endTime0 + "us");
                let averageTime0 = endTime0 - startTime0;
                console.info('JsJodaEnUs xts weekOfYear averageTime:' + averageTime0 + "us");
                let startTime = new Date().getTime();
                for (let index = 0; index < BASE_COUNT; index++) {
                    WeekFields.SUNDAY_START.weekOfYear().name();
                }
                endTime(startTime, 'weekOfYear');
                expect(weekOfYear).assertEqual("WeekOfYear");
            }
            catch (e) {
                console.info(e);
            }
        });
        it('weekOfWeekBasedYear', 0, () => {
            try {
                let startTime0 = new Date().getTime();
                console.info('JsJodaEnUs xts weekOfWeekBasedYear startTime:' + startTime0 + "us");
                let weekOfWeekBasedYear: string = WeekFields.SUNDAY_START.weekOfWeekBasedYear().name();
                let endTime0 = new Date().getTime();
                console.info('JsJodaEnUs xts weekOfWeekBasedYear endTime:' + endTime0 + "us");
                let averageTime0 = endTime0 - startTime0;
                console.info('JsJodaEnUs xts weekOfWeekBasedYear averageTime:' + averageTime0 + "us");
                let startTime = new Date().getTime();
                for (let index = 0; index < BASE_COUNT; index++) {
                    WeekFields.SUNDAY_START.weekOfWeekBasedYear().name();
                }
                endTime(startTime, 'weekOfWeekBasedYear');
                expect(weekOfWeekBasedYear).assertEqual("WeekOfWeekBasedYear");
            }
            catch (e) {
                console.info(e);
            }
        });
        it('weekBasedYear', 0, () => {
            try {
                let startTime0 = new Date().getTime();
                console.info('JsJodaEnUs xts weekBasedYear startTime:' + startTime0 + "us");
                let weekBasedYear: string = WeekFields.SUNDAY_START.weekBasedYear().name();
                let endTime0 = new Date().getTime();
                console.info('JsJodaEnUs xts weekBasedYear endTime:' + endTime0 + "us");
                let averageTime0 = endTime0 - startTime0;
                console.info('JsJodaEnUs xts weekBasedYear averageTime:' + averageTime0 + "us");
                let startTime = new Date().getTime();
                for (let index = 0; index < BASE_COUNT; index++) {
                    WeekFields.SUNDAY_START.weekBasedYear().name();
                }
                endTime(startTime, 'weekBasedYear');
                expect(weekBasedYear).assertEqual("WeekBasedYear");
            }
            catch (e) {
                console.info(e);
            }
        });
        it('equals', 0, () => {
            try {
                let startTime0 = new Date().getTime();
                console.info('JsJodaEnUs xts equals startTime:' + startTime0 + "us");
                let equalsParam: boolean = WeekFields.SUNDAY_START.equals(2);
                let endTime0 = new Date().getTime();
                console.info('JsJodaEnUs xts equals endTime:' + endTime0 + "us");
                let averageTime0 = endTime0 - startTime0;
                console.info('JsJodaEnUs xts equals averageTime:' + averageTime0 + "us");
                let startTime = new Date().getTime();
                for (let index = 0; index < BASE_COUNT; index++) {
                    WeekFields.SUNDAY_START.equals(2);
                }
                endTime(startTime, 'equals');
                expect(equalsParam).assertEqual(false);
            }
            catch (e) {
                console.info(e);
            }
        });
        it('hashCode', 0, () => {
            try {
                let startTime0 = new Date().getTime();
                console.info('JsJodaEnUs xts hashCode startTime:' + startTime0 + "us");
                let hashCodeParam: number = WeekFields.SUNDAY_START.hashCode();
                let endTime0 = new Date().getTime();
                console.info('JsJodaEnUs xts hashCode endTime:' + endTime0 + "us");
                let averageTime0 = endTime0 - startTime0;
                console.info('JsJodaEnUs xts hashCode averageTime:' + averageTime0 + "us");
                let startTime = new Date().getTime();
                for (let index = 0; index < BASE_COUNT; index++) {
                    WeekFields.SUNDAY_START.hashCode();
                }
                endTime(startTime, 'hashCode');
                expect(hashCodeParam).assertEqual(43);
            }
            catch (e) {
                console.info(e);
            }
        });
        it('toString', 0, () => {
            try {
                let startTime0 = new Date().getTime();
                console.info('JsJodaEnUs xts toString startTime:' + startTime0 + "us");
                let toStringParam: string = WeekFields.SUNDAY_START.toString();
                let endTime0 = new Date().getTime();
                console.info('JsJodaEnUs xts toString endTime:' + endTime0 + "us");
                let averageTime0 = endTime0 - startTime0;
                console.info('JsJodaEnUs xts toString averageTime:' + averageTime0 + "us");
                let startTime = new Date().getTime();
                for (let index = 0; index < BASE_COUNT; index++) {
                    WeekFields.SUNDAY_START.toString();
                }
                endTime(startTime, 'toString');
                expect(toStringParam).assertEqual("WeekFields[SUNDAY,1]");
            }
            catch (e) {
                console.info(e);
            }
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
