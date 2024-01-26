let __generate__Id: number = 0;
function generateId(): string {
    return "util_" + ++__generate__Id;
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
import { getKeys } from '../tools/getKeysTest';
import image from '@ohos.multimedia.image';
let tag = "inversify-demo： ";
function diff(obj1: any, obj2: any) {
    let o1 = obj1 instanceof Object;
    let o2 = obj2 instanceof Object;
    // 判断是不是对象
    if (!o1 || !o2) {
        return obj1 === obj2;
    }
    //Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,
    //例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
    }
    let objKeys: string[] = getKeys(obj1);
    objKeys.forEach((o) => {
        let t1 = obj1[o] instanceof Object;
        let t2 = obj2[o] instanceof Object;
        if (t1 && t2) {
            if (!diff(obj1[o], obj2[o])) {
                return false;
            }
        }
        else if (obj1[o] !== obj2[o]) {
            return false;
        }
        return;
    });
    return true;
}
export const it = (name: any, func: any) => {
    _it(name, 0, func);
};
export const describe: any = _describe;
export const beforeAll: any = _beforeAll;
export const beforeEach: any = _beforeEach;
export const afterEach: any = _afterEach;
export const afterAll: any = _afterAll;
export const expect = (source: any) => {
    let result1: any = {};
    let result3: any = {
        throw() {
            try {
                source();
            }
            catch (err) {
                _expect(1).assertEqual(2);
                return;
            }
            _expect(1).assertEqual(1);
        },
        eql(value: any) {
            _expect(source != value).assertTrue();
        }
    };
    let result5: any = {
        equal(value: any) {
            _expect(source == value).assertFalse();
        }
    };
    let result6: any = {
        equal(value: any) {
            _expect(diff(source, value)).assertTrue();
        }
    };
    let result7: any = {
        a(value: any) {
            _expect(typeof source === value).assertTrue();
        },
        an(value: any) {
            _expect(typeof source === value).assertTrue();
        },
        instanceof(value: any) {
            _expect(source instanceof value).assertTrue();
        },
        instanceOf(value: any) {
            _expect(source instanceof value).assertTrue();
        },
        eql(value: any) {
            _expect(source).assertEqual(value);
        },
        equal(value: any) {
            _expect(source).assertEqual(value);
        },
    };
    let result4: any = {
        equals(value: any) {
            _expect(source).assertEqual(value);
        },
        match(value: any) {
            _expect(value.test(source)).assertTrue();
        },
        contain(value: any) {
            _expect(source.includes(value)).assertTrue();
        },
        not: result5,
        deep: result6,
        equal(value: any) {
            _expect(source).assertEqual(value);
        },
        eql(value: any) {
            _expect(source).assertEqual(value);
        },
        be: result7,
        eq(value: any) {
            _expect(source).assertEqual(value);
        },
        throw(value?: any) {
            if (!value) {
                try {
                    source();
                }
                catch (err) {
                    _expect(1).assertEqual(1);
                    return;
                }
                _expect(1).assertEqual(2);
            }
            else {
                try {
                    source && source();
                }
                catch (err) {
                    _expect(err.message).assertEqual(value);
                    console.log(tag + "expect(" + err.message + ").throw(" + value + ")");
                }
            }
        },
    };
    let result2: any = {
        to: result3,
        eql(value: any) {
            _expect(source === value).assertFalse();
        },
        equal(value: any) {
            _expect(source === value).assertFalse();
        },
        equals(value: any) {
            _expect(source === value).assertFalse();
        },
    };
    return result1 = {
        instanceof(value: any) {
            _expect(source instanceof value).assertTrue();
        },
        instanceOf(value: any) {
            _expect(source instanceof value).assertTrue();
        },
        not: result2,
        equal(value: any) {
            _expect(source).assertEqual(value);
        },
        equals(value: any) {
            _expect(source).assertEqual(value);
        },
        eql(value: any) {
            _expect(source).assertEqual(value);
        },
        eq(value: any) {
            _expect(source).assertEqual(value);
        },
        to: result4
    };
};
