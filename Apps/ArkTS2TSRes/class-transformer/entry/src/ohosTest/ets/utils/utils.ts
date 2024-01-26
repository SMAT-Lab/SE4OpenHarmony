let __generate__Id: number = 0;
function generateId(): string {
    return "utils_" + ++__generate__Id;
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
type AllType = string | number | boolean | Record<string, string> | (string | number)[] | (() => void);
export const it: (testSuiteName: string, callback: Function) => void = (testSuiteName: string, callback: Function) => {
    _it(testSuiteName, 0, callback);
};
export const describe: (testSuiteName: string, callback: Function) => void = _describe;
export const beforeAll: (callback: Function) => void = _beforeAll;
export const beforeEach: (callback: Function) => void = _beforeEach;
export const afterEach: (callback: Function) => void = _afterEach;
export const afterAll: (callback: Function) => void = _afterAll;
type Fn = (...args: Array<object | string | boolean | number | undefined>) => void;
interface MyExpectReturnToBe {
    a: Fn;
    null: Fn;
    ok: Fn;
    instanceof: Fn;
}
interface MyExpectReturnToHave {
    length: Fn;
}
interface MyExpectReturnTo {
    throw: (source: Fn | RegExp | number) => void;
    be: MyExpectReturnToBe;
    have: MyExpectReturnToHave;
    equal: Fn;
}
interface MyExpectReturnNot {
    toBeInstanceOf: (instance: Function) => void;
    toEqual: Fn;
    toHaveProperty: Fn;
    toBe: Fn;
    toThrow: Fn;
}
interface MyExpectReturn {
    to: MyExpectReturnTo;
    assertNull: () => void;
    toBe: Fn;
    toBeUndefined: Fn;
    toEqual: Fn;
    toBeInstanceOf: (instance: Function) => void;
    toHaveProperty: Fn;
    not: MyExpectReturnNot;
}
type MyExpect = (value: object | number | boolean | string | undefined) => MyExpectReturn;
export const expect: MyExpect = (value: any) => {
    const have: MyExpectReturnToHave = {
        length(source) {
            if (typeof value === "number" || typeof value === "boolean")
                return;
            _expect((value as Array<object>).length).assertEqual(source);
        }
    };
    const be: MyExpectReturnToBe = {
        a(source) {
            _expect(typeof value).assertEqual(source);
        },
        null() {
            _expect(value).assertNull();
        },
        ok() {
            _expect(!!value).assertTrue();
        },
        instanceof(source) {
            _expect(value instanceof (source as Function)).assertTrue();
        }
    };
    const to: MyExpectReturnTo = {
        throw(source) {
            try {
                typeof value === "function" && value();
                _expect(1).assertEqual(2);
            }
            catch (err) {
                if (source instanceof RegExp && source.test && (typeof source.test === "function")) {
                    _expect(source.test(err.message)).assertTrue();
                }
                else {
                    _expect(err.message).assertEqual(source);
                }
            }
        },
        be,
        have,
        equal(source) {
            _expect(value).assertEqual(source);
        },
    };
    const result: MyExpectReturn = {
        to,
        assertNull() {
            _expect(value).assertNull();
        },
        toBe(source) {
            _expect(diff(value, source)).assertEqual(true);
        },
        toBeUndefined() {
            _expect(value).assertUndefined();
        },
        toEqual(source) {
            // if(value instanceof Date && source instanceof Date){
            //     console.log(`class--判断时间`)
            //     _expect(diff(value.valueOf(),source.valueOf())).assertTrue();
            // }
            _expect(diff(value, source)).assertEqual(true);
        },
        toBeInstanceOf(source) {
            _expect(value instanceof (source as Function)).assertEqual(true);
        },
        toHaveProperty(source) {
            if (!value)
                return;
            _expect(!!value[source as string] as boolean).assertTrue();
        },
        not: {
            toBeInstanceOf(source) {
                _expect(value instanceof (source as Function)).assertEqual(false);
            },
            toEqual(source) {
                _expect(diff(value, source as object)).assertEqual(false);
            },
            toHaveProperty(source) {
                if (!value)
                    return;
                _expect(!!value[source as string]).assertFalse();
            },
            toBe(source) {
                _expect(diff(value, source as object)).assertEqual(false);
            },
            toThrow() {
                try {
                    if (typeof value != "function")
                        return;
                    value();
                }
                catch (err) {
                    _expect(1).assertEqual(2);
                }
            }
        },
    };
    return result;
};
// 简化代码 使用函数的方式判断是否为对象 且不为null
function isObject(obj: object | string | number | boolean | undefined) {
    return typeof obj === 'object' && obj !== null;
}
export function diff(obj1: object | string | number | boolean | undefined, obj2: object | string | number | boolean | undefined) {
    // 判断如果传入的不是对象类型的话 就直接返回两个值的比较
    if (!isObject(obj1) || !isObject(obj2)) {
        return obj1 === obj2;
    }
    // 判断是否传入同一个对象
    if (obj1 === obj2)
        return true;
    // 判断两个对象的键是否一致
    const K1 = (typeof obj1 === "object") && Object.keys(obj1);
    const K2 = (typeof obj2 === "object") && Object.keys(obj2);
    if ((K1 as Array<string>).length !== (K2 as Array<string>).length)
        return false;
    const obj1s: any = (typeof obj1 === "object") && Object.keys(obj1);
    for (let i = 0; i <= (obj1s as Array<string>).length - 1; i++) {
        // 判断当前的key是否为其本身的属性 而不是原型上的属性 for-in循环是会将原型上所有的属性都遍历一遍
        if (!!(obj1 as object)[obj1s[i]]) {
            // 递归调用 看res的结果
            const res = diff((obj1 as object)[obj1s[i]], (obj2 as object)[obj1s[i]]);
            if (!res) {
                return false;
            }
        }
    }
    return true;
}
