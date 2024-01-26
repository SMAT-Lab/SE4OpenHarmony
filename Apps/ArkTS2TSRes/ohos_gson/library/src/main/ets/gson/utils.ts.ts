/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
export function isPrimitive(value: Object): boolean {
    if (typeof value === 'string' || typeof value === 'boolean' || typeof value === 'number') {
        return true;
    }
    else {
        return false;
    }
}
export function isNumberByReg(val: string): boolean {
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if (regPos.test(val) || regNeg.test(val)) {
        return true;
    }
    else {
        return false;
    }
}
export function isNumber(val: string): boolean {
    return !isNaN(Number(val));
}
export function isOneNum(val: string): boolean {
    if (val === '0'
        || val === '1'
        || val === '2'
        || val === '3'
        || val === '4'
        || val === '5'
        || val === '6'
        || val === '7'
        || val === '8'
        || val === '9') {
        return true;
    }
    else {
        return false;
    }
}
export function containsField(object: Object, field: string) {
    if (object instanceof Array) {
        for (let item of object) {
            if (item === field) {
                return true;
            }
        }
    }
    else {
        for (let key in object) {
            if (key == field) {
                return true;
            }
        }
    }
    return false;
}
export function getString(buffer: Array<string>, start: number, len: number): string {
    let result = [];
    if (buffer != null && start >= 0 && start + len <= buffer.length) {
        result = buffer.slice(start, start + len);
    }
    return result.join("");
}
export function isBlank(cs: string): boolean {
    if (cs == null || cs.length == 0) {
        return true;
    }
    for (let i = 0; i < cs.length; i++) {
        if (!isWhitespace(cs.charAt(i))) {
            return false;
        }
    }
    return true;
}
export function countMatches(str: string, ch: string) {
    if (isEmpty(str) || ch == null || ch.length != 1) {
        return 0;
    }
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (ch == str.charAt(i)) {
            count++;
        }
    }
    return count;
}
export function removeStart(str: string, remove: string) {
    if (isEmpty(str) || isEmpty(remove)) {
        return str;
    }
    if (str.startsWith(remove)) {
        return str.substring(remove.length);
    }
    return str;
}
export function removeEnd(str: string, remove: string) {
    if (isEmpty(str) || isEmpty(remove)) {
        return str;
    }
    if (str.endsWith(remove)) {
        return str.substring(0, str.length - remove.length);
    }
    return str;
}
export function arrayRemove<T>(list: Array<T>, remove: T): boolean {
    if (list == null || list.length == 0 || remove == null) {
        return false;
    }
    let index = list.indexOf(remove);
    if (index != -1) {
        list.splice(index, 1);
        return true;
    }
    else {
        return false;
    }
}
export function arrayCopy<T>(src: Array<T>, srcPos: number, des: Array<T>, desPos: number, len: number): boolean {
    if (len <= 0 || srcPos + len > src.length || desPos + len > src.length) {
        return;
    }
    for (let i = 0; i < len; i++) {
        des[i + desPos] = src[i + srcPos];
    }
}
export function isEmpty(cs: string) {
    return cs == null || cs.length == 0;
}
export function getDefaultLocale() {
    return 'zh_CN.UTF-8/UTF-8';
}
export function isWhitespace(cs: string): boolean {
    if (cs == null) {
        return false;
    }
    let sz: number = cs.length;
    for (let i = 0; i < sz; i++) {
        if (cs.charAt(i) != ' ' && cs.charAt(i) != '\t' && cs.charAt(i) != '\n' && cs.charAt(i) != '\r') {
            return false;
        }
    }
    return true;
}
export function compareArray<T>(a: Array<T>, b: Array<T>): boolean {
    if (a == null || b == null) {
        return false;
    }
    if (a.length == b.length && a.toString() == b.toString()) {
        return true;
    }
    return false;
}
export function compareType(a: Object, b: Object): boolean {
    let aProps = Object.getOwnPropertyNames(a);
    let bProps = Object.getOwnPropertyNames(b);
    if (aProps.length != bProps.length) {
        return false;
    }
    for (let i in aProps) {
        if (bProps.indexOf(aProps[i]) == -1) {
            return false;
        }
    }
    return true;
}
export function dateFormat(dateTime: Date | number, formatString: string): string {
    if (dateTime == null || formatString == null) {
        return null;
    }
    let date: Date = null;
    if (dateTime instanceof Date) {
        date = dateTime;
    }
    else {
        date = new Date(dateTime);
    }
    var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds()
    };
    if (/(Y+|y+)/.test(formatString)) {
        formatString = formatString.replace(RegExp.$1, (date.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(formatString)) {
            formatString = formatString.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return formatString;
}
