let __generate__Id: number = 0;
function generateId(): string {
    return "my_hypium_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import { describe as _describe, beforeAll as _beforeAll, beforeEach as _beforeEach, afterEach as _afterEach, afterAll as _afterAll, it as _it, expect as _expect } from '@ohos/hypium';
import { expectFunction } from './TestExpect';
export const it = (testSuiteName: string, callback: Function): Function => {
    return _it(testSuiteName, 0, callback);
};
export const describe: Function = _describe;
export const beforeAll: Function = _beforeAll;
export const beforeEach: Function = _beforeEach;
export const afterEach: Function = _afterEach;
export const afterAll: Function = _afterAll;
export const expect: Function = (value: any): any => {
    return expectFunction(_expect, value);
};
export function diff(obj1: any, obj2: any) {
    log(`当前比较对象 (1): ${JSON.stringify(obj1)}   (2): ${JSON.stringify(obj2)}`);
    let o1: boolean = obj1 instanceof Object;
    let o2: boolean = obj2 instanceof Object;
    // 判断是不是对象
    if (!o1 || !o2) {
        return obj1 === obj2;
    }
    // Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,
    // 例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
    }
    let objKeys = Object.keys(obj1);
    for (let i = 0; i < objKeys.length; i++) {
        let t1 = obj1[objKeys[i]] instanceof Object;
        let t2 = obj2[objKeys[i]] instanceof Object;
        if (t1 && t2) {
            if (!diff(obj1[objKeys[i]], obj2[objKeys[i]])) {
                return false;
            }
        }
        else if (obj1[objKeys[i]] !== obj2[objKeys[i]]) {
            return false;
        }
    }
    return true;
}
export function log(message: string) {
    console.log(`dudu---${message}`);
}
