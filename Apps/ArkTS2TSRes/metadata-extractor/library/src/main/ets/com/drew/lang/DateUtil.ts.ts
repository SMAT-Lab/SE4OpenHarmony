/*
Copyright (c) 2022 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
class DateUtil {
    private static _daysInMonth365: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    /**
     * The offset (in milliseconds) to add to a MP4 date/time integer value to
     * align with Java's Epoch.
     */
    private static readonly EPOCH_1_JAN_1904: number = -2082844800000;
    public static isValidDate(year: number, month: number, day: number): boolean {
        if (year < 1 || year > 9999 || month < 0 || month > 11) {
            return false;
        }
        let daysInMonth: number = DateUtil._daysInMonth365[month];
        if (month == 1) {
            let isLeapYear: boolean = year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
            if (isLeapYear) {
                daysInMonth++;
            }
            return day >= 1 && day <= daysInMonth;
        }
    }
    public static isValidTime(hours: number, minutes: number, seconds: number): boolean {
        return hours >= 0 && hours < 24
            && minutes >= 0 && minutes < 60
            && seconds >= 0 && seconds < 60;
    }
    public static get1Jan1904EpochDate(seconds: number): Date {
        return new Date((seconds * 1000) + DateUtil.EPOCH_1_JAN_1904);
    }
}
export default DateUtil;
