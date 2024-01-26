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
import {
  describe as _describe,
  beforeAll as _beforeAll,
  beforeEach as _beforeEach,
  afterEach as _afterEach,
  afterAll as _afterAll,
  it as _it,
  expect as _expect
} from '@ohos/hypium'
import { getKeys } from '../tools/getKeysTest';
import image from '@ohos.multimedia.image';
let tag = "inversify-demo： "

function diff(obj1: ESObject, obj2: ESObject) {
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
        return false
      }
    } else if (obj1[o] !== obj2[o]) {
      return false;
    }
    return;
  })
  return true;
}

export const it =  (name:ESObject, func:ESObject)=> {
  _it(name, 0, func)
}

export const describe:ESObject = _describe;

export const beforeAll:ESObject = _beforeAll;

export const beforeEach:ESObject = _beforeEach;

export const afterEach:ESObject = _afterEach;

export const afterAll:ESObject = _afterAll;

export const expect =  (source:ESObject)=> {
  let  result1:ESObject={}
  let  result3:ESObject ={
    throw() {
      try {
        source()
      } catch (err) {
        _expect(1).assertEqual(2)
        return
      }
      _expect(1).assertEqual(1)

    },
    eql(value:ESObject) {
      _expect(source != value).assertTrue()
    }
  }
  let result5:ESObject={
    equal(value:ESObject) {
      _expect(source == value).assertFalse()
    }
  }
   let result6:ESObject={
     equal(value:ESObject) {
       _expect(diff(source, value)).assertTrue()
     }
   }
   let result7:ESObject={
     a(value:ESObject) {
       _expect(typeof source === value).assertTrue()
     },
     an(value:ESObject) {
       _expect(typeof source === value).assertTrue()
     },
     instanceof(value:ESObject) {
       _expect(source instanceof value).assertTrue()
     },
     instanceOf(value:ESObject) {
       _expect(source instanceof value).assertTrue()
     },
     eql(value:ESObject) {
       _expect(source).assertEqual(value);
     },
     equal(value:ESObject) {
       _expect(source).assertEqual(value);
     },
   }
  let  result4:ESObject ={
    equals(value:ESObject) {
      _expect(source).assertEqual(value);
    },
    match(value:ESObject) {
      _expect(value.test(source)).assertTrue()
    },
    contain(value:ESObject) {
      _expect(source.includes(value)).assertTrue()
    },
    not:result5,
    deep: result6,
    equal(value:ESObject) {
      _expect(source).assertEqual(value);
    },
    eql(value:ESObject) {
      _expect(source).assertEqual(value);
    },
    be:result7,
    eq(value:ESObject) {
      _expect(source).assertEqual(value);
    },
    throw(value?:ESObject) {
      if (!value) {
        try {
          source()
        } catch (err) {
          _expect(1).assertEqual(1)
          return
        }
        _expect(1).assertEqual(2)
      } else {
        try {
          source && source()
        } catch (err) {
          _expect(err.message).assertEqual(value)
          console.log(tag + "expect(" + err.message + ").throw(" + value + ")")
        }
      }

    },
  }
  let  result2:ESObject ={
    to:result3 ,
    eql(value:ESObject) {
      _expect(source === value).assertFalse()
    },
    equal(value:ESObject) {
      _expect(source === value).assertFalse()
    },
    equals(value:ESObject) {
      _expect(source === value).assertFalse()
    },
  }

  return  result1={
    instanceof(value:ESObject) {
      _expect(source instanceof value).assertTrue()
    },
    instanceOf(value:ESObject) {
      _expect(source instanceof value).assertTrue()
    },
    not:result2 ,
    equal(value:ESObject) {
      _expect(source).assertEqual(value);
    },
    equals(value:ESObject) {
      _expect(source).assertEqual(value);
    },
    eql(value:ESObject) {
      _expect(source).assertEqual(value);
    },
    eq(value:ESObject) {
      _expect(source).assertEqual(value);
    },
    to: result4
  }
};