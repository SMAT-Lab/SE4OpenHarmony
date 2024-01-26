/*
 * MIT License
 *
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import {
  keys,
  allKeys,
  values,
  mapObject,
  pairs,
  invert,
  create,
  functions,
  findKey,
  extend,
  pick,
  omit,
  defaults,
  clone,
  tap,
  has,
  property,
  propertyOf,
  matcher,
  isEqual,
  isMatch,
  isEmpty,
  isElement,
  isArray,
  isObject,
  isArguments,
  isFunction,
  isString,
  isNumber,
  isFinite,
  isBoolean,
  isDate,
  isRegExp,
  isError,
  isSymbol,
  isMap,
  isWeakMap,
  isSet,
  isWeakSet,
  isNaN,
  isNull,
  isUndefined,
  reduce,
  map,
  methods,
  extendOwn,
  assign,
  each,
  identity,
  get
} from 'underscore'

export default function objectsTest() {
  describe('ObjectTest', () => {
    // Defines a test suite. Two parameters are supported: test suite name and test suite function.
    beforeAll(() => {
      // Presets an action, which is performed only once before all test cases of the test suite start.
      // This API supports only one parameter: preset action function.
    })
    beforeEach(() => {
      // Presets an action, which is performed before each unit test case starts.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: preset action function.
    })
    afterEach(() => {
      // Presets a clear action, which is performed after each unit test case ends.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: clear action function.
    })
    afterAll(() => {
      // Presets a clear action, which is performed after all test cases of the test suite end.
      // This API supports only one parameter: clear action function.
    })
    it('assertContain', 0, () => {
      // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
      hilog.info(0x0000, 'testTag', '%{public}s', 'it begin');
      let a = 'abc'
      let b = 'b'
      // Defines a variety of assertion methods, which are used to declare expected boolean conditions.
      expect(a).assertContain(b)
      expect(a).assertEqual(a)
    })
    it('test01', 0, () => {
      expect(keys({
        one: 1, two: 2
      })).assertDeepEquals(['one', 'two'])
    })
    it('test48', 0, () => {
      expect(keys({
        one: 2, two: 2
      })).assertDeepEquals(['one', 'two'])
    })
    it('test49', 0, () => {
      expect(keys({
        one: 3, two: 2
      })).assertDeepEquals(['one', 'two'])
    })
    it('test50', 0, () => {
      expect(keys({
        one: 2, two: 5
      })).assertDeepEquals(['one', 'two'])
    })
    it('test51', 0, () => {
      expect(keys({
        one: 1, two: 5
      })).assertDeepEquals(['one', 'two'])
    })
    it('test02', 0, () => {
      expect(allKeys({
        one: 1, two: 2
      })).assertDeepEquals(['one', 'two'])
    })
    it('test52', 0, () => {
      expect(allKeys({
        one: 3, two: 2
      })).assertDeepEquals(['one', 'two'])
    })
    it('test53', 0, () => {
      expect(allKeys({
        one: 2, two: 2
      })).assertDeepEquals(['one', 'two'])
    })
    it('test54', 0, () => {
      expect(allKeys({
        one: 2, two: 6
      })).assertDeepEquals(['one', 'two'])
    })
    it('test55', 0, () => {
      expect(allKeys({
        one: 4, two: 6
      })).assertDeepEquals(['one', 'two'])
    })
    it('test03', 0, () => {
      expect(values({
        one: 1, two: 2
      })).assertDeepEquals([1, 2])
    })
    it('test56', 0, () => {
      expect(values({
        one: 1, two: 3
      })).assertDeepEquals([1, 3])
    })
    it('test57', 0, () => {
      expect(values({
        one: 2, two: 3
      })).assertDeepEquals([2, 3])
    })
    it('test58', 0, () => {
      expect(values({
        one: 4, two: 3
      })).assertDeepEquals([4, 3])
    })
    it('test59', 0, () => {
      expect(values({
        one: 4, two: 1
      })).assertDeepEquals([4, 1])
    })
    it('test04', 0, () => {
      expect(pairs({
        one: 1, two: 2
      })).assertDeepEquals([['one', 1], ['two', 2]])
    })
    it('test60', 0, () => {
      expect(pairs({
        one: 2, two: 2
      })).assertDeepEquals([['one', 2], ['two', 2]])
    })
    it('test61', 0, () => {
      expect(pairs({
        one: 3, two: 2
      })).assertDeepEquals([['one', 3], ['two', 2]])
    })
    it('test62', 0, () => {
      expect(pairs({
        one: 3, two: 4
      })).assertDeepEquals([['one', 3], ['two', 4]])
    })
    it('test63', 0, () => {
      expect(pairs({
        one: 3, two: 5
      })).assertDeepEquals([['one', 3], ['two', 5]])
    })
    it('test05', 0, () => {
      expect(keys(invert({
        first: 'Moe', second: 'Larry', third: 'Curly'
      }))).assertDeepEquals(['Moe', 'Larry', 'Curly'])
    })
    it('test64', 0, () => {
      expect(keys(invert({
        first: 'More', second: 'Larry', third: 'Curly'
      }))).assertDeepEquals(['More', 'Larry', 'Curly'])
    })
    it('test65', 0, () => {
      expect(keys(invert({
        first: 'More', second: 'hi', third: 'Curly'
      }))).assertDeepEquals(['More', 'hi', 'Curly'])
    })
    it('test66', 0, () => {
      expect(keys(invert({
        first: 'More', second: 'hi', third: 'pi'
      }))).assertDeepEquals(['More', 'hi', 'pi'])
    })
    it('test67', 0, () => {
      expect(keys(invert({
        first: 'More', second: 'hi', third: 'pie'
      }))).assertDeepEquals(['More', 'hi', 'pie'])
    })
    it('test06', 0, () => {
      expect(functions({
        a: 'dash', b: map, c: new RegExp('yo'), d: reduce
      })).assertDeepEquals(['b', 'd'])
    })
    it('test68', 0, () => {
      expect(functions({
        a: 'data', b: map, c: new RegExp('yo'), d: reduce
      })).assertDeepEquals(['b', 'd'])
    })
    it('test69', 0, () => {
      expect(functions({
        a: 'hi', b: map, c: new RegExp('yo'), d: reduce
      })).assertDeepEquals(['b', 'd'])
    })
    it('test70', 0, () => {
      expect(functions({
        a: 'he', b: map, c: new RegExp('yo'), d: reduce
      })).assertDeepEquals(['b', 'd'])
    })
    it('test71', 0, () => {
      expect(functions({
        a: 'your', b: map, c: new RegExp('yo'), d: reduce
      })).assertDeepEquals(['b', 'd'])
    })
    it('test07', 0, () => {
      expect(methods).assertDeepEquals(functions)
    })
    it('test08', 0, () => {
      expect(extend({}, {
        a: 'b'
      }).a).assertDeepEquals('b')
    })
    it('test72', 0, () => {
      expect(extend({}, {
        a: 'c'
      }).a).assertDeepEquals('c')
    })
    it('test73', 0, () => {
      expect(extend({}, {
        a: 'd'
      }).a).assertDeepEquals('d')
    })
    it('test74', 0, () => {
      expect(extend({}, {
        a: 'e'
      }).a).assertDeepEquals('e')
    })
    it('test75', 0, () => {
      expect(extend({}, {
        a: 'f'
      }).a).assertDeepEquals('f')
    })
    it('test09', 0, () => {
      expect(extendOwn({}, {
        a: 'b'
      }).a).assertDeepEquals('b')
    })
    it('test76', 0, () => {
      expect(extendOwn({}, {
        a: 'c'
      }).a).assertDeepEquals('c')
    })
    it('test77', 0, () => {
      expect(extendOwn({}, {
        a: 'd'
      }).a).assertDeepEquals('d')
    })
    it('test78', 0, () => {
      expect(extendOwn({}, {
        a: 'e'
      }).a).assertDeepEquals('e')
    })
    it('test79', 0, () => {
      expect(extendOwn({}, {
        a: 'f'
      }).a).assertDeepEquals('f')
    })
    it('test10', 0, () => {
      expect(assign).assertDeepEquals(extendOwn)
    })
    it('test11', 0, () => {
      let result: ESObject;
      result = pick({
        a: 1, b: 2, c: 3
      }, 'a', 'c');
      expect(result).assertDeepEquals({
        a: 1, c: 3
      })
    })
    it('test80', 0, () => {
      let result: ESObject;
      result = pick({
        a: 2, b: 2, c: 3
      }, 'a', 'c');
      expect(result).assertDeepEquals({
        a: 2, c: 3
      })
    })
    it('test81', 0, () => {
      let result: ESObject;
      result = pick({
        a: 4, b: 2, c: 3
      }, 'a', 'c');
      expect(result).assertDeepEquals({
        a: 4, c: 3
      })
    })
    it('test82', 0, () => {
      let result: ESObject;
      result = pick({
        a: 5, b: 2, c: 3
      }, 'a', 'c');
      expect(result).assertDeepEquals({
        a: 5, c: 3
      })
    })
    it('test83', 0, () => {
      let result: ESObject;
      result = pick({
        a: 5, b: 2, c: 1
      }, 'a', 'c');
      expect(result).assertDeepEquals({
        a: 5, c: 1
      })
    })
    it('test12', 0, () => {
      let result: ESObject;
      result = omit({
        a: 1, b: 2, c: 3
      }, 'b');
      expect(result).assertDeepEquals({
        a: 1, c: 3
      })
    })
    it('test84', 0, () => {
      let result: ESObject;
      result = omit({
        a: 2, b: 2, c: 3
      }, 'b');
      expect(result).assertDeepEquals({
        a: 2, c: 3
      })
    })
    it('test85', 0, () => {
      let result: ESObject;
      result = omit({
        a: 2, b: 2, c: 1
      }, 'b');
      expect(result).assertDeepEquals({
        a: 2, c: 1
      })
    })
    it('test86', 0, () => {
      let result: ESObject;
      result = omit({
        a: 2, b: 1, c: 1
      }, 'b');
      expect(result).assertDeepEquals({
        a: 2, c: 1
      })
    })
    it('test87', 0, () => {
      let result: ESObject;
      result = omit({
        a: 4, b: 1, c: 1
      }, 'b');
      expect(result).assertDeepEquals({
        a: 4, c: 1
      })
    })
    it('test14', 0, () => {
      expect(clone(void 0)).assertDeepEquals(void 0)
    })
    it('test92', 0, () => {
      expect(clone(void 1)).assertDeepEquals(void 1)
    })
    it('test93', 0, () => {
      expect(clone(void 2)).assertDeepEquals(void 2)
    })
    it('test94', 0, () => {
      expect(clone(void 3)).assertDeepEquals(void 3)
    })
    it('test95', 0, () => {
      expect(clone(void 4)).assertDeepEquals(void 4)
    })
    it('test15', 0, () => {
      each(['foo', null, void 0, 1], (val: ESObject) => {
        expect(create(val)).assertDeepEquals({})
      });
    })
    it('test96', 0, () => {
      each(['foo', null, void 2, 1], (val: ESObject) => {
        expect(create(val)).assertDeepEquals({})
      });
    })
    it('test97', 0, () => {
      each(['foo', null, void 2, null], (val: ESObject) => {
        expect(create(val)).assertDeepEquals({})
      });
    })
    it('test98', 0, () => {
      each(['foo', null, void 2, undefined], (val: ESObject) => {
        expect(create(val)).assertDeepEquals({})
      });
    })
    it('test99', 0, () => {
      each(['foo', null, void 4, undefined], (val: ESObject) => {
        expect(create(val)).assertDeepEquals({})
      });
    })
    it('test16', 0, () => {
      expect(isEqual(null, null)).assertDeepEquals(true)
    })
    it('test100', 0, () => {
      expect(isEqual(1, 1)).assertDeepEquals(true)
    })
    it('test101', 0, () => {
      expect(isEqual(2, 2)).assertDeepEquals(true)
    })
    it('test102', 0, () => {
      expect(isEqual(3, 3)).assertDeepEquals(true)
    })
    it('test103', 0, () => {
      expect(isEqual(4, 4)).assertDeepEquals(true)
    })
    it('test17', 0, () => {
      expect(isEmpty([])).assertDeepEquals(true)
    })
    it('test104', 0, () => {
      expect(isEmpty([1])).assertDeepEquals(false)
    })
    it('test105', 0, () => {
      expect(isEmpty([2])).assertDeepEquals(false)
    })
    it('test106', 0, () => {
      expect(isEmpty([3])).assertDeepEquals(false)
    })
    it('test107', 0, () => {
      expect(isEmpty([4])).assertDeepEquals(false)
    })
    it('test18', 0, () => {
      expect(isElement('div')).assertDeepEquals(false)
    })
    it('test108', 0, () => {
      expect(isElement('ab')).assertDeepEquals(false)
    })
    it('test109', 0, () => {
      expect(isElement('12')).assertDeepEquals(false)
    })
    it('test110', 0, () => {
      expect(isElement(null)).assertDeepEquals(false)
    })
    it('test111', 0, () => {
      expect(isElement(undefined)).assertDeepEquals(false)
    })
    it('test19', 0, () => {
      expect(isArguments('string')).assertDeepEquals(false)
    })
    it('test222', 0, () => {
      expect(isArguments('we')).assertDeepEquals(false)
    })
    it('test112', 0, () => {
      expect(isArguments('he')).assertDeepEquals(false)
    })
    it('test113', 0, () => {
      expect(isArguments(null)).assertDeepEquals(false)
    })
    it('test114', 0, () => {
      expect(isArguments(undefined)).assertDeepEquals(false)
    })
    it('test20', 0, () => {
      expect(isObject(arguments)).assertDeepEquals(true)
    })
    it('test115', 0, () => {
      expect(isObject(null)).assertDeepEquals(false)
    })
    it('test116', 0, () => {
      expect(isObject('ab')).assertDeepEquals(false)
    })
    it('test117', 0, () => {
      expect(isObject(undefined)).assertDeepEquals(false)
    })
    it('test118', 0, () => {
      expect(isObject('')).assertDeepEquals(false)
    })
    it('test21', 0, () => {
      expect(isArray(void 0)).assertDeepEquals(false)
    })
    it('test119', 0, () => {
      expect(isArray(void 1)).assertDeepEquals(false)
    })
    it('test120', 0, () => {
      expect(isArray(void 2)).assertDeepEquals(false)
    })
    it('test121', 0, () => {
      expect(isArray('ab')).assertDeepEquals(false)
    })
    it('test122', 0, () => {
      expect(isArray(null)).assertDeepEquals(false)
    })
    it('test22', 0, () => {
      expect(isString([1, 2, 3].join(', '))).assertDeepEquals(true)
    })
    it('test123', 0, () => {
      expect(isString([2, 2, 3].join(', '))).assertDeepEquals(true)
    })
    it('test124', 0, () => {
      expect(isString([2, 5, 3].join(', '))).assertDeepEquals(true)
    })
    it('test125', 0, () => {
      expect(isString([2, 5, 1].join(', '))).assertDeepEquals(true)
    })
    it('test126', 0, () => {
      expect(isString([2, 4, 1].join(', '))).assertDeepEquals(true)
    })
    it('test23', 0, () => {
      expect(isSymbol(0)).assertDeepEquals(false)
    })
    it('test127', 0, () => {
      expect(isSymbol(1)).assertDeepEquals(false)
    })
    it('test128', 0, () => {
      expect(isSymbol(null)).assertDeepEquals(false)
    })
    it('test129', 0, () => {
      expect(isSymbol(undefined)).assertDeepEquals(false)
    })
    it('test130', 0, () => {
      expect(isSymbol(3)).assertDeepEquals(false)
    })
    it('test24', 0, () => {
      expect(isNumber('string')).assertDeepEquals(false)
    })
    it('test131', 0, () => {
      expect(isNumber('ab')).assertDeepEquals(false)
    })
    it('test132', 0, () => {
      expect(isNumber(null)).assertDeepEquals(false)
    })
    it('test133', 0, () => {
      expect(isNumber(undefined)).assertDeepEquals(false)
    })
    it('test134', 0, () => {
      expect(isNumber(1)).assertDeepEquals(true)
    })
    it('test25', 0, () => {
      expect(isBoolean(2)).assertDeepEquals(false)
    })
    it('test135', 0, () => {
      expect(isBoolean(null)).assertDeepEquals(false)
    })
    it('test136', 0, () => {
      expect(isBoolean(undefined)).assertDeepEquals(false)
    })
    it('test137', 0, () => {
      expect(isBoolean(1)).assertDeepEquals(false)
    })
    it('test138', 0, () => {
      expect(isBoolean(true)).assertDeepEquals(true)
    })
    it('test26', 0, () => {
      expect(isMap('string')).assertDeepEquals(false)
    })
    it('test139', 0, () => {
      expect(isMap(null)).assertDeepEquals(false)
    })
    it('test140', 0, () => {
      expect(isMap(undefined)).assertDeepEquals(false)
    })
    it('test141', 0, () => {
      expect(isMap(true)).assertDeepEquals(false)
    })
    it('test142', 0, () => {
      expect(isMap(1)).assertDeepEquals(false)
    })
    it('test27', 0, () => {
      expect(isWeakMap('string')).assertDeepEquals(false)
    })
    it('test143', 0, () => {
      expect(isWeakMap(null)).assertDeepEquals(false)
    })
    it('test144', 0, () => {
      expect(isWeakMap(undefined)).assertDeepEquals(false)
    })
    it('test145', 0, () => {
      expect(isWeakMap(true)).assertDeepEquals(false)
    })
    it('test146', 0, () => {
      expect(isWeakMap(1)).assertDeepEquals(false)
    })
    it('test28', 0, () => {
      expect(isSet('string')).assertDeepEquals(false)
    })
    it('test147', 0, () => {
      expect(isSet(null)).assertDeepEquals(false)
    })
    it('test148', 0, () => {
      expect(isSet(undefined)).assertDeepEquals(false)
    })
    it('test149', 0, () => {
      expect(isSet(true)).assertDeepEquals(false)
    })
    it('test150', 0, () => {
      expect(isSet(1)).assertDeepEquals(false)
    })
    it('test29', 0, () => {
      expect(isWeakSet('string')).assertDeepEquals(false)
    })
    it('test151', 0, () => {
      expect(isWeakSet(null)).assertDeepEquals(false)
    })
    it('test152', 0, () => {
      expect(isWeakSet(undefined)).assertDeepEquals(false)
    })
    it('test153', 0, () => {
      expect(isWeakSet(true)).assertDeepEquals(false)
    })
    it('test154', 0, () => {
      expect(isWeakSet(1)).assertDeepEquals(false)
    })
    it('test30', 0, () => {
      expect(isFunction(void 0)).assertDeepEquals(false)
    })
    it('test155', 0, () => {
      expect(isFunction(undefined)).assertDeepEquals(false)
    })
    it('test156', 0, () => {
      expect(isFunction(null)).assertDeepEquals(false)
    })
    it('test157', 0, () => {
      expect(isFunction(true)).assertDeepEquals(false)
    })
    it('test158', 0, () => {
      expect(isFunction(1)).assertDeepEquals(false)
    })
    it('test31', 0, () => {
      expect(isDate(100)).assertDeepEquals(false)
    })
    it('test159', 0, () => {
      expect(isDate(null)).assertDeepEquals(false)
    })
    it('test160', 0, () => {
      expect(isDate(undefined)).assertDeepEquals(false)
    })
    it('test161', 0, () => {
      expect(isDate(true)).assertDeepEquals(false)
    })
    it('test162', 0, () => {
      expect(isDate('12')).assertDeepEquals(false)
    })
    it('test32', 0, () => {
      expect(isRegExp(identity)).assertDeepEquals(false)
    })
    it('test163', 0, () => {
      expect(isRegExp(undefined)).assertDeepEquals(false)
    })
    it('test164', 0, () => {
      expect(isRegExp(null)).assertDeepEquals(false)
    })
    it('test165', 0, () => {
      expect(isRegExp(true)).assertDeepEquals(false)
    })
    it('test166', 0, () => {
      expect(isRegExp(1)).assertDeepEquals(false)
    })
    it('test33', 0, () => {
      expect(isFinite(void 0)).assertDeepEquals(false)
    })
    it('test167', 0, () => {
      expect(isFinite(null)).assertDeepEquals(false)
    })
    it('test168', 0, () => {
      expect(isFinite(undefined)).assertDeepEquals(false)
    })
    it('test169', 0, () => {
      expect(isFinite(true)).assertDeepEquals(false)
    })
    it('test170', 0, () => {
      expect(isFinite(1)).assertDeepEquals(true)
    })
    it('test34', 0, () => {
      expect(isNaN(void 0)).assertDeepEquals(false)
    })
    it('test171', 0, () => {
      expect(isNaN(undefined)).assertDeepEquals(false)
    })
    it('test172', 0, () => {
      expect(isNaN(null)).assertDeepEquals(false)
    })
    it('test173', 0, () => {
      expect(isNaN(true)).assertDeepEquals(false)
    })
    it('test174', 0, () => {
      expect(isNaN(1)).assertDeepEquals(false)
    })
    it('test35', 0, () => {
      expect(isNull(void 0)).assertDeepEquals(false)
    })
    it('test175', 0, () => {
      expect(isNull(null)).assertDeepEquals(true)
    })
    it('test176', 0, () => {
      expect(isNull(undefined)).assertDeepEquals(false)
    })
    it('test177', 0, () => {
      expect(isNull(true)).assertDeepEquals(false)
    })
    it('test178', 0, () => {
      expect(isNull(1)).assertDeepEquals(false)
    })
    it('test36', 0, () => {
      expect(isUndefined(1)).assertDeepEquals(false)
    })
    it('test179', 0, () => {
      expect(isUndefined(undefined)).assertDeepEquals(true)
    })
    it('test180', 0, () => {
      expect(isUndefined(null)).assertDeepEquals(false)
    })
    it('test223', 0, () => {
      expect(isUndefined(true)).assertDeepEquals(false)
    })
    it('test181', 0, () => {
      expect(isUndefined('a')).assertDeepEquals(false)
    })
    it('test37', 0, () => {
      expect(isError(1)).assertDeepEquals(false)
    })
    it('test182', 0, () => {
      expect(isError(null)).assertDeepEquals(false)
    })
    it('test183', 0, () => {
      expect(isError(undefined)).assertDeepEquals(false)
    })
    it('test184', 0, () => {
      expect(isError(true)).assertDeepEquals(false)
    })
    it('test185', 0, () => {
      expect(isError('a')).assertDeepEquals(false)
    })
    it('test38', 0, () => {
      let intercepted = null;
      let interceptor = (obj: ESObject) => {
        intercepted = obj;
      };
      let returned: ESObject = tap(1, interceptor);
      expect(returned).assertDeepEquals(1)
    })
    it('test186', 0, () => {
      let intercepted = null;
      let interceptor = (obj: ESObject) => {
        intercepted = obj;
      };
      let returned: ESObject = tap(2, interceptor);
      expect(returned).assertDeepEquals(2)
    })
    it('test187', 0, () => {
      let intercepted = null;
      let interceptor = (obj: ESObject) => {
        intercepted = obj;
      };
      let returned: ESObject = tap(null, interceptor);
      expect(returned).assertDeepEquals(null)
    })
    it('test188', 0, () => {
      let intercepted = null;
      let interceptor = (obj: ESObject) => {
        intercepted = obj;
      };
      let returned: ESObject = tap(true, interceptor);
      expect(returned).assertDeepEquals(true)
    })
    it('test189', 0, () => {
      let intercepted = null;
      let interceptor = (obj: ESObject) => {
        intercepted = obj;
      };
      let returned: ESObject = tap(undefined, interceptor);
      expect(returned).assertDeepEquals(undefined)
    })
    it('test39', 0, () => {
      expect(has({
        foo: 'bar', func: () => {
        }
      }, 'foo')).assertDeepEquals(true)
    })
    it('test190', 0, () => {
      expect(has({
        foo: null, func: () => {
        }
      }, 'foo')).assertDeepEquals(true)
    })
    it('test191', 0, () => {
      expect(has({
        foo: undefined, func: () => {
        }
      }, 'foo')).assertDeepEquals(true)
    })
    it('test192', 0, () => {
      expect(has({
        foo: true, func: () => {
        }
      }, 'foo')).assertDeepEquals(true)
    })
    it('test193', 0, () => {
      expect(has({
        foo: 1, func: () => {
        }
      }, 'foo')).assertDeepEquals(true)
    })
    it('test40', 0, () => {
      expect(get({
        name: 'moe'
      }, 'name')).assertDeepEquals('moe')
    })
    it('test194', 0, () => {
      expect(get({
        name: null
      }, 'name')).assertDeepEquals(null)
    })
    it('test195', 0, () => {
      expect(get({
        name: undefined
      }, 'name')).assertDeepEquals(undefined)
    })
    it('test196', 0, () => {
      expect(get({
        name: true
      }, 'name')).assertDeepEquals(true)
    })
    it('test197', 0, () => {
      expect(get({
        name: 1
      }, 'name')).assertDeepEquals(1)
    })
    it('test41', 0, () => {
      expect(property('name')({
        name: 'moe'
      })).assertDeepEquals('moe')
    })
    it('test198', 0, () => {
      expect(property('name')({
        name: null
      })).assertDeepEquals(null)
    })
    it('test199', 0, () => {
      expect(property('name')({
        name: undefined
      })).assertDeepEquals(undefined)
    })
    it('test200', 0, () => {
      expect(property('name')({
        name: true
      })).assertDeepEquals(true)
    })
    it('test201', 0, () => {
      expect(property('name')({
        name: 1
      })).assertDeepEquals(1)
    })
    it('test42', 0, () => {
      let stoogeRanks: ESObject = propertyOf({
        curly: 2, moe: 1, larry: 3
      });
      expect(stoogeRanks('curly')).assertDeepEquals(2)
    })
    it('test202', 0, () => {
      let stoogeRanks: ESObject = propertyOf({
        curly: null, moe: 1, larry: 3
      });
      expect(stoogeRanks('curly')).assertDeepEquals(null)
    })
    it('test203', 0, () => {
      let stoogeRanks: ESObject = propertyOf({
        curly: undefined, moe: 1, larry: 3
      });
      expect(stoogeRanks('curly')).assertDeepEquals(undefined)
    })
    it('test204', 0, () => {
      let stoogeRanks: ESObject = propertyOf({
        curly: true, moe: 1, larry: 3
      });
      expect(stoogeRanks('curly')).assertDeepEquals(true)
    })
    it('test205', 0, () => {
      let stoogeRanks: ESObject = propertyOf({
        curly: 'a', moe: 1, larry: 3
      });
      expect(stoogeRanks('curly')).assertDeepEquals('a')
    })
    it('test43', 0, () => {
      expect(isMatch({
        name: 'Moe Howard', hair: true
      }, {
        hair: true
      })).assertDeepEquals(true)
    })
    it('test206', 0, () => {
      expect(isMatch({
        name: 'Moe Howard', hair: null
      }, {
        hair: null
      })).assertDeepEquals(true)
    })
    it('test207', 0, () => {
      expect(isMatch({
        name: 'Moe Howard', hair: undefined
      }, {
        hair: undefined
      })).assertDeepEquals(true)
    })
    it('test208', 0, () => {
      expect(isMatch({
        name: 'Moe Howard', hair: 1
      }, {
        hair: 1
      })).assertDeepEquals(true)
    })
    it('test209', 0, () => {
      expect(isMatch({
        name: 'Moe Howard', hair: 'a'
      }, {
        hair: 'a'
      })).assertDeepEquals(true)
    })
    it('test44', 0, () => {
      expect(matcher({
        hair: true
      })({
        name: 'Moe Howard', hair: true
      })).assertDeepEquals(true)
    })
    it('test210', 0, () => {
      expect(matcher({
        hair: null
      })({
        name: 'Moe Howard', hair: null
      })).assertDeepEquals(true)
    })
    it('test211', 0, () => {
      expect(matcher({
        hair: undefined
      })({
        name: 'Moe Howard', hair: undefined
      })).assertDeepEquals(true)
    })
    it('test212', 0, () => {
      expect(matcher({
        hair: 1
      })({
        name: 'Moe Howard', hair: 1
      })).assertDeepEquals(true)
    })
    it('test213', 0, () => {
      expect(matcher({
        hair: 'a'
      })({
        name: 'Moe Howard', hair: 'a'
      })).assertDeepEquals(true)
    })
    it('test46', 0, () => {
      expect(findKey({
        a: {
          a: 0, b: 0
        },
        b: {
          a: 1, b: 1
        },
        c: {
          a: 2, b: 2
        }
      }, (obj: ESObject) => {
        return obj.a === 0;
      })).assertDeepEquals('a')
    })
    it('test214', 0, () => {
      expect(findKey({
        a: {
          a: 0, b: 0
        },
        b: {
          a: 1, b: 1
        },
        c: {
          a: 2, b: 2
        }
      }, (obj: ESObject) => {
        return obj.a === 1;
      })).assertDeepEquals('b')
    })
    it('test215', 0, () => {
      expect(findKey({
        a: {
          a: 0, b: 0
        },
        b: {
          a: 1, b: 1
        },
        c: {
          a: 2, b: 2
        }
      }, (obj: ESObject) => {
        return obj.a === 2;
      })).assertDeepEquals('c')
    })
    it('test216', 0, () => {
      expect(findKey({
        a: {
          a: 0, b: 0
        },
        b: {
          a: 1, b: 1
        },
        c: {
          a: null, b: 2
        }
      }, (obj: ESObject) => {
        return obj.a === null;
      })).assertDeepEquals('c')
    })
    it('test217', 0, () => {
      expect(findKey({
        a: {
          a: 0, b: 0
        },
        b: {
          a: 1, b: 1
        },
        c: {
          a: true, b: 2
        }
      }, (obj: ESObject) => {
        return obj.a === true;
      })).assertDeepEquals('c')
    })
    it('test47', 0, () => {
      expect(mapObject({
        a: 1, b: 2
      }, (val: number) => {
        return val * 2;
      })).assertDeepEquals({
        a: 2, b: 4
      })
    })
    it('test218', 0, () => {
      expect(mapObject({
        a: 2, b: 2
      }, (val: number) => {
        return val * 2;
      })).assertDeepEquals({
        a: 4, b: 4
      })
    })
    it('test219', 0, () => {
      expect(mapObject({
        a: 3, b: 2
      }, (val: number) => {
        return val * 2;
      })).assertDeepEquals({
        a: 6, b: 4
      })
    })
    it('test220', 0, () => {
      expect(mapObject({
        a: 3, b: 1
      }, (val: number) => {
        return val * 2;
      })).assertDeepEquals({
        a: 6, b: 2
      })
    })
    it('test221', 0, () => {
      expect(mapObject({
        a: 0, b: 1
      }, (val: number) => {
        return val * 2;
      })).assertDeepEquals({
        a: 0, b: 2
      })
    })
  })
}