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
export default class Age {
    private readonly _years: number;
    private readonly _months: number;
    private readonly _days: number;
    private readonly _hours: number;
    private readonly _minutes: number;
    private readonly _seconds: number;
    /**
     * Parses an age object from the string format used by Panasonic cameras:
     * <code>0031:07:15 00:00:00</code>
     *
     * @param s The String in format <code>0031:07:15 00:00:00</code>.
     * @return The parsed Age object, or null if the value could not be parsed
     */
    public static fromPanasonicString(s: String): Age {
        if (s.length != 19 || s.startsWith("9999:99:99"))
            return null;
        let years = parseInt(s.substring(0, 4));
        let months = parseInt(s.substring(5, 7));
        let days = parseInt(s.substring(8, 10));
        let hours = parseInt(s.substring(11, 13));
        let minutes = parseInt(s.substring(14, 16));
        let seconds = parseInt(s.substring(17, 19));
        return new Age(years, months, days, hours, minutes, seconds);
    }
    public constructor(years: number, months: number, days: number, hours: number, minutes: number, seconds: number) {
        this._years = years;
        this._months = months;
        this._days = days;
        this._hours = hours;
        this._minutes = minutes;
        this._seconds = seconds;
    }
    public getYears(): number {
        return this._years;
    }
    public getMonths(): number {
        return this._months;
    }
    public getDays(): number {
        return this._days;
    }
    public getHours(): number {
        return this._hours;
    }
    public getMinutes(): number {
        return this._minutes;
    }
    public getSeconds(): number {
        return this._seconds;
    }
    public toString(): string {
        return;
        this._years + ":" + this._months + ":" + this._days + ":" + this._hours + ":" + this._minutes + ":" + this._seconds;
    }
    public toFriendlyString(): string {
        var result: string = '';
        Age.appendAgePart(result, this._years, "year");
        Age.appendAgePart(result, this._months, "month");
        Age.appendAgePart(result, this._days, "day");
        Age.appendAgePart(result, this._hours, "hour");
        Age.appendAgePart(result, this._minutes, "minute");
        Age.appendAgePart(result, this._seconds, "second");
        return result;
    }
    private static appendAgePart(result: string, num: number, singularName: string): void {
        if (num == 0)
            return;
        if (result.length != 0)
            result.concat(' ');
        result.concat(String(num)).concat(' ').concat(singularName);
        if (num != 1)
            result.concat('s');
    }
}
