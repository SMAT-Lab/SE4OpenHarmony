let __generate__Id: number = 0;
function generateId(): string {
    return "HourSecondMinuteModel_" + ++__generate__Id;
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
export function initializeHourAndSecondAndMinute(): Array<HourAndSecondAndMinute> {
    let PickerArray: Array<HourAndSecondAndMinute> = [];
    let hourResult: Array<number | string> = [];
    let secondResult: Array<number | string> = [];
    let minuteResult: Array<number | string> = [];
    let hourArray: number[] = getArray(Array(24));
    let secondArray: number[] = getArray(Array(60));
    let minuteArray: number[] = getArray(Array(60));
    hourArray.forEach(index => {
        if (index < 10) {
            hourResult.push('0' + index);
        }
        else {
            hourResult.push(index);
        }
    });
    secondArray.forEach(index => {
        if (index < 10) {
            secondResult.push('0' + index);
        }
        else {
            secondResult.push(index);
        }
    });
    minuteArray.forEach(index => {
        if (index < 10) {
            minuteResult.push('0' + index);
        }
        else {
            minuteResult.push(index);
        }
    });
    PickerArray.push(new HourAndSecondAndMinute(hourResult, secondResult, minuteResult));
    return PickerArray;
}
let NextId = 0;
export class HourAndSecondAndMinute {
    id: string;
    hour: Array<number | string>;
    second: Array<number | string>;
    minute: Array<number | string>;
    constructor(hour: Array<number | string>, second: Array<number | string>, minute: Array<number | string>) {
        this.id = `${NextId++}`;
        this.hour = hour;
        this.second = second;
        this.minute = minute;
    }
}
