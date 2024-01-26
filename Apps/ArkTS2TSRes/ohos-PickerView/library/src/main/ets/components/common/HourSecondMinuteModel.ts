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
export function initializeHourAndSecondAndMinute(): Array<HourAndSecondAndMinute> {
    let PickerArray: Array<HourAndSecondAndMinute> = [];
    let hourResult: string[] = [];
    let secondResult: string[] = [];
    let minuteResult: string[] = [];
    let hourArray: number[] = arrayTraversal(24);
    let minuteArray: number[] = arrayTraversal(60);
    let secondArray: number[] = arrayTraversal(60);
    hourArray.forEach(index => {
        if (index < 10) {
            hourResult.push('0' + index);
        }
        else {
            hourResult.push(index.toString());
        }
    });
    minuteArray.forEach(index => {
        if (index < 10) {
            minuteResult.push('0' + index);
        }
        else {
            minuteResult.push(index.toString());
        }
    });
    secondArray.forEach(index => {
        if (index < 10) {
            secondResult.push('0' + index);
        }
        else {
            secondResult.push(index.toString());
        }
    });
    PickerArray.push(new HourAndSecondAndMinute(hourResult, secondResult, minuteResult));
    return PickerArray;
}
export function arrayTraversal(length: number) {
    let arr: number[] = [];
    for (let i = 1; i < length; i++) {
        arr[i] = i;
    }
    return arr;
}
let NextId = 0;
export class HourAndSecondAndMinute {
    id: string;
    hour: any[];
    minute: any[];
    second: any[];
    constructor(hour: any[], minute: any[], second: any[]) {
        this.id = `${NextId++}`;
        this.hour = hour;
        this.minute = minute;
        this.second = second;
    }
}
