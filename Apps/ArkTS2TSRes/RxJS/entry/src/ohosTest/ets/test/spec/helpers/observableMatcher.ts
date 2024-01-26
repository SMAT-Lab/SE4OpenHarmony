let __generate__Id: number = 0;
function generateId(): string {
    return "observableMatcher_" + ++__generate__Id;
}
/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
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
import { expect } from '@ohos/hypium';
function stringify(x: any): string {
    return JSON.stringify(x, (key: string, value: any): any => {
        if (Array.isArray(value)) {
            return '[' + value
                .map((i: any) => {
                return '\n\t' + stringify(i);
            }) + '\n]';
        }
        return value;
    })
        .replace(new RegExp('\\\\\"', 'g'), '"')
        .replace(new RegExp('\\\\t', 'g'), '\t')
        .replace(new RegExp('\\\\n', 'g'), '\n');
}
function deleteErrorNotificationStack(marble: any): any {
    const notification: any = marble;
    if (notification) {
        const kind: any = notification.kind;
        const error: any = notification.error;
        if (kind === 'E' && error instanceof Error) {
            notification.error = { name: error.name, message: error.message };
        }
    }
    return marble;
}
export function observableMatcher(actual: any, expected: any) {
    let deepEqual = (obj1: any, obj2: any) => {
        // 判断基本数据类型是否相等
        if (obj1 === obj2) {
            return true;
        }
        // 判断对象是否为 null
        if (obj1 === null || obj2 === null) {
            return false;
        }
        // 判断对象类型是否相等
        if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
            return false;
        }
        // 获取对象的属性名数组
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        // 判断属性数量是否相等
        if (keys1.length !== keys2.length) {
            return false;
        }
        // 递归比较对象的属性值
        for (let key of keys1) {
            if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
                return false;
            }
        }
        return true;
    };
    if (Array.isArray(actual) && Array.isArray(expected)) {
        actual = actual.map<any>(deleteErrorNotificationStack);
        expected = expected.map<any>(deleteErrorNotificationStack);
        const passed: any = deepEqual(actual, expected);
        if (passed) {
            return;
        }
        let message = '\nExpected \n';
        actual.forEach((x: any) => message += `\t${stringify(x)}\n`);
        message += '\t\nto deep equal \n';
        expected.forEach((x: any) => message += `\t${stringify(x)}\n`);
        expect(passed).assertEqual(message);
    }
    else {
        expect(actual).assertEqual(expected);
    }
}
