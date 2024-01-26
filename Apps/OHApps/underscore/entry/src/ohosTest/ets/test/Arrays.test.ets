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
  first,
  initial,
  last,
  rest,
  compact,
  flatten,
  without,
  union,
  intersection,
  difference,
  uniq,
  zip,
  unzip,
  object,
  chunk,
  indexOf,
  lastIndexOf,
  sortedIndex,
  findIndex,
  findLastIndex,
  range,
  head,
  take,
  tail,
  drop,
  unique,
  transpose
} from 'underscore'

export default function arraysTest() {
  describe('ArraysTest', () => {
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
      expect(first([1, 2, 3])).assertEqual(1)
    })
    it('test41', 0, () => {
      expect(first([1, 2, 3, 4])).assertEqual(1)
    })
    it('test42', 0, () => {
      expect(first([1, 2, 3, 4, 5])).assertEqual(1)
    })
    it('test43', 0, () => {
      expect(first([1, 3, 3, 4, 5])).assertEqual(1)
    })
    it('test44', 0, () => {
      expect(first([1, 3, 2, 4, 5])).assertEqual(1)
    })
    it('test02', 0, () => {
      expect(head).assertEqual(first)
    })
    it('test03', 0, () => {
      expect(take).assertEqual(first)
    })
    it('test04', 0, () => {
      let numbers = [1, 2, 3, 4];
      expect(rest(numbers)).assertDeepEquals([2, 3, 4])
    })
    it('test45', 0, () => {
      let numbers = [2, 3, 4];
      expect(rest(numbers)).assertDeepEquals([3, 4])
    })
    it('test46', 0, () => {
      let numbers = [2, 3, 4, 1];
      expect(rest(numbers)).assertDeepEquals([3, 4, 1])
    })
    it('test47', 0, () => {
      let numbers = [2, 3, 4, 1, 1];
      expect(rest(numbers)).assertDeepEquals([3, 4, 1, 1])
    })
    it('test48', 0, () => {
      let numbers = [2, 3, 4, 1, 1, 3];
      expect(rest(numbers)).assertDeepEquals([3, 4, 1, 1, 3])
    })
    it('test05', 0, () => {
      expect(tail).assertEqual(rest)
    })
    it('test06', 0, () => {
      expect(drop).assertEqual(rest)
    })
    it('test07', 0, () => {
      expect(initial([1, 2, 3, 4, 5])).assertDeepEquals([1, 2, 3, 4])
    })
    it('test49', 0, () => {
      expect(initial([2, 2, 3, 4, 5])).assertDeepEquals([2, 2, 3, 4])
    })
    it('test50', 0, () => {
      expect(initial([2, 1, 3, 4, 5])).assertDeepEquals([2, 1, 3, 4])
    })
    it('test51', 0, () => {
      expect(initial([2, 1, 3, 2, 5])).assertDeepEquals([2, 1, 3, 2])
    })
    it('test08', 0, () => {
      expect(initial([1, 2, 3, 4], 2)).assertDeepEquals([1, 2])
    })
    it('test09', 0, () => {
      expect(last([1, 2, 3])).assertDeepEquals(3)
    })
    it('test10', 0, () => {
      expect(last([1, 2, 3], 0)).assertDeepEquals([])
    })
    it('test52', 0, () => {
      expect(last([2, 2, 3], 0)).assertDeepEquals([])
    })
    it('test53', 0, () => {
      expect(last([2, 2, 2], 0)).assertDeepEquals([])
    })
    it('test54', 0, () => {
      expect(last([2, 1, 2], 0)).assertDeepEquals([])
    })
    it('test11', 0, () => {
      expect(compact([1, false, null, 0, '', void 0, 1, 2])).assertDeepEquals([1, 1, 2])
    })
    it('test12', 0, () => {
      expect(flatten(null)).assertDeepEquals([])
    })
    it('test13', 0, () => {
      expect(flatten(void 0)).assertDeepEquals([])
    })
    it('test55', 0, () => {
      expect(flatten(void 1)).assertDeepEquals([])
    })
    it('test56', 0, () => {
      expect(flatten(void 2)).assertDeepEquals([])
    })
    it('test57', 0, () => {
      expect(flatten(void 3)).assertDeepEquals([])
    })
    it('test14', 0, () => {
      let list = [1, 2, 1, 0, 3, 1, 4];
      expect(without(list, 0, 1)).assertDeepEquals([2, 3, 4])
    })
    it('test58', 0, () => {
      let list = [1, 1, 1, 0, 3, 1, 4];
      expect(without(list, 0, 1)).assertDeepEquals([3, 4])
    })
    it('test59', 0, () => {
      let list = [2, 1, 1, 0, 3, 1, 4];
      expect(without(list, 0, 1)).assertDeepEquals([2, 3, 4])
    })
    it('test60', 0, () => {
      let list = [2, 1, 1, 1, 3, 1, 4];
      expect(without(list, 0, 1)).assertDeepEquals([2, 3, 4])
    })
    it('test61', 0, () => {
      let list = [2, 0, 1, 1, 3, 1, 4];
      expect(without(list, 0, 1)).assertDeepEquals([2, 3, 4])
    })
    it('test16', 0, () => {
      let numbers = [10, 20, 30, 30, 30, 40, 50, 60];
      let indexFor35: number = sortedIndex(numbers, 35);
      expect(indexFor35).assertDeepEquals(5)
    })
    it('test65', 0, () => {
      let numbers = [20, 20, 30, 30, 30, 40, 50, 60];
      let indexFor35: number = sortedIndex(numbers, 35);
      expect(indexFor35).assertDeepEquals(5)
    })
    it('test66', 0, () => {
      let numbers = [20, 10, 30, 30, 30, 40, 50, 60];
      let indexFor35: number = sortedIndex(numbers, 35);
      expect(indexFor35).assertDeepEquals(5)
    })
    it('test67', 0, () => {
      let numbers = [20, 10, 20, 30, 30, 40, 50, 60];
      let indexFor35: number = sortedIndex(numbers, 35);
      expect(indexFor35).assertDeepEquals(5)
    })
    it('test17', 0, () => {
      let numbers = [10, 20, 30, 30, 30, 40, 50, 60];
      let indexFor30: number = sortedIndex(numbers, 30);
      expect(indexFor30).assertDeepEquals(2)
    })
    it('test18', 0, () => {
      let list = [1, 2, 1, 3, 1, 4];
      expect(uniq(list)).assertDeepEquals([1, 2, 3, 4])
    })
    it('test19', 0, () => {
      let list = [1, 1, 1, 2, 2, 3];
      expect(uniq(list, true)).assertDeepEquals([1, 2, 3])
    })
    it('test68', 0, () => {
      let list = [2, 1, 1, 1, 2, 3];
      expect(uniq(list, true)).assertDeepEquals([2, 1, 2, 3])
    })
    it('test69', 0, () => {
      let list = [1, 2, 1, 1, 2, 3];
      expect(uniq(list, true)).assertDeepEquals([1, 2, 1, 2, 3])
    })
    it('test70', 0, () => {
      let list = [0, 2, 1, 1, 2, 3];
      expect(uniq(list, true)).assertDeepEquals([0, 2, 1, 2, 3])
    })
    it('test20', 0, () => {
      expect(unique).assertDeepEquals(uniq)
    })
    it('test21', 0, () => {
      let stooges = ['moe', 'curly', 'larry'], leaders = ['moe', 'groucho'];
      expect(intersection(stooges, leaders)).assertDeepEquals(['moe'])
    })
    it('test71', 0, () => {
      let stooges = ['moe', 'curlyhe', 'larry'], leaders = ['moe', 'groucho'];
      expect(intersection(stooges, leaders)).assertDeepEquals(['moe'])
    })
    it('test72', 0, () => {
      let stooges = ['moe', 'curlyhe', 'larry'], leaders = ['moe', 'groucholy'];
      expect(intersection(stooges, leaders)).assertDeepEquals(['moe'])
    })
    it('test73', 0, () => {
      let stooges = ['moe', 'move', 'larry'], leaders = ['moe', 'groucholy'];
      expect(intersection(stooges, leaders)).assertDeepEquals(['moe'])
    })
    it('test74', 0, () => {
      let stooges = ['moe', 'move', 'lazy'], leaders = ['moe', 'groucholy'];
      expect(intersection(stooges, leaders)).assertDeepEquals(['moe'])
    })
    it('test22', 0, () => {
      let result: number[] = intersection([2, 4, 3, 1], [1, 2, 3]);
      expect(result).assertDeepEquals([2, 3, 1])
    })
    it('test23', 0, () => {
      let result: number[] = union([1, 2, 3], [2, 30, 1], [1, 40]);
      expect(result).assertDeepEquals([1, 2, 3, 30, 40])
    })
    it('test24', 0, () => {
      let result: number[] = union([1, 2, 3], [2, 30, 1], [1, 40, [1]]);
      expect(result).assertDeepEquals([1, 2, 3, 30, 40, [1]])
    })
    it('test75', 0, () => {
      let result: number[] = union([1, 2, 3], [2, 30, 1], [1, 40, [2]]);
      expect(result).assertDeepEquals([1, 2, 3, 30, 40, [2]])
    })
    it('test76', 0, () => {
      let result: number[] = union([1, 2, 3], [2, 30, 1], [1, 40, [3]]);
      expect(result).assertDeepEquals([1, 2, 3, 30, 40, [3]])
    })
    it('test77', 0, () => {
      let result: number[] = union([1, 2, 3], [2, 30, 1], [1, 40, [4]]);
      expect(result).assertDeepEquals([1, 2, 3, 30, 40, [4]])
    })
    it('test25', 0, () => {
      let result: number[] = difference([1, 2, 3], [2, 30, 40]);
      expect(result).assertDeepEquals([1, 3])
    })
    it('test26', 0, () => {
      let result: number[] = difference([1, 2, 3], [2, 30, 40, [1]]);
      expect(result).assertDeepEquals([1, 3])
    })
    it('test78', 0, () => {
      let result: number[] = difference([1, 2, 3], [2, 30, 40, [2]]);
      expect(result).assertDeepEquals([1, 3])
    })
    it('test79', 0, () => {
      let result: number[] = difference([1, 2, 3], [2, 30, 40, [3]]);
      expect(result).assertDeepEquals([1, 3])
    })
    it('test80', 0, () => {
      let result: number[] = difference([1, 2, 3], [2, 30, 40, [4]]);
      expect(result).assertDeepEquals([1, 3])
    })
    it('test27', 0, () => {
      let names = ['moe', 'larry', 'curly'], ages = [30, 40, 50], leaders = [true];
      expect(zip(names, ages, leaders)).assertDeepEquals([
        ['moe', 30, true],
        ['larry', 40, void 0],
        ['curly', 50, void 0]
      ])
    })
    it('test81', 0, () => {
      let names = ['moe', 'larry', 'curly'], ages = [20, 40, 50], leaders = [true];
      expect(zip(names, ages, leaders)).assertDeepEquals([
        ['moe', 20, true],
        ['larry', 40, void 0],
        ['curly', 50, void 0]
      ])
    })
    it('test82', 0, () => {
      let names = ['moe', 'larry', 'curly'], ages = [20, 10, 50], leaders = [true];
      expect(zip(names, ages, leaders)).assertDeepEquals([
        ['moe', 20, true],
        ['larry', 10, void 0],
        ['curly', 50, void 0]
      ])
    })
    it('test83', 0, () => {
      let names = ['moe', 'larry', 'curly'], ages = [20, 10, 20], leaders = [true];
      expect(zip(names, ages, leaders)).assertDeepEquals([
        ['moe', 20, true],
        ['larry', 10, void 0],
        ['curly', 20, void 0]
      ])
    })
    it('test84', 0, () => {
      let names = ['moe', 'larry', 'curly'], ages = [60, 10, 20], leaders = [true];
      expect(zip(names, ages, leaders)).assertDeepEquals([
        ['moe', 60, true],
        ['larry', 10, void 0],
        ['curly', 20, void 0]
      ])
    })
    it('test28', 0, () => {
      expect(unzip(null)).assertDeepEquals([])
    })
    it('test29', 0, () => {
      expect(unzip([['a', 'b'], [1, 2]])).assertDeepEquals([['a', 1], ['b', 2]])
    })
    it('test85', 0, () => {
      expect(unzip([['a', 'b'], [2, 2]])).assertDeepEquals([['a', 2], ['b', 2]])
    })
    it('test86', 0, () => {
      expect(unzip([['a', 'b'], [2, 3]])).assertDeepEquals([['a', 2], ['b', 3]])
    })
    it('test87', 0, () => {
      expect(unzip([['a', 'b'], [0, 3]])).assertDeepEquals([['a', 0], ['b', 3]])
    })
    it('test30', 0, () => {
      expect(object(['moe', 'larry', 'curly'], [30, 40, 50])).assertDeepEquals({
        moe: 30, larry: 40, curly: 50
      })
    })
    it('test88', 0, () => {
      expect(object(['moe', 'larry', 'curly'], [10, 40, 50])).assertDeepEquals({
        moe: 10, larry: 40, curly: 50
      })
    })
    it('test89', 0, () => {
      expect(object(['moe', 'larry', 'curly'], [20, 40, 50])).assertDeepEquals({
        moe: 20, larry: 40, curly: 50
      })
    })
    it('test90', 0, () => {
      expect(object(['moe', 'larry', 'curly'], [50, 40, 50])).assertDeepEquals({
        moe: 50, larry: 40, curly: 50
      })
    })
    it('test91', 0, () => {
      expect(object(['moe', 'larry', 'curly'], [50, 20, 50])).assertDeepEquals({
        moe: 50, larry: 20, curly: 50
      })
    })
    it('test31', 0, () => {
      expect(transpose).assertDeepEquals(unzip)
    })
    it('test32', 0, () => {
      let numbers = [1, 2, 3];
      expect(indexOf(numbers, 2)).assertDeepEquals(1)
    })
    it('test33', 0, () => {
      expect(indexOf([1, 2, 1, 1], 1)).assertDeepEquals(0)
    })
    it('test92', 0, () => {
      expect(indexOf([2, 2, 1, 1], 1)).assertDeepEquals(2)
    })
    it('test93', 0, () => {
      expect(indexOf([2, 1, 1, 1], 2)).assertDeepEquals(0)
    })
    it('test94', 0, () => {
      expect(indexOf([0, 1, 2, 2], 2)).assertDeepEquals(2)
    })
    it('test34', 0, () => {
      let numbers = [1, 0, 1];
      expect(lastIndexOf(numbers, 1)).assertDeepEquals(2)
    })
    it('test95', 0, () => {
      let numbers = [1, 1, 1];
      expect(lastIndexOf(numbers, 1)).assertDeepEquals(2)
    })
    it('test96', 0, () => {
      let numbers = [1, 3, 1];
      expect(lastIndexOf(numbers, 1)).assertDeepEquals(2)
    })
    it('test97', 0, () => {
      let numbers = [2, 3, 1];
      expect(lastIndexOf(numbers, 1)).assertDeepEquals(2)
    })
    it('test98', 0, () => {
      let numbers = [4, 3, 1];
      expect(lastIndexOf(numbers, 1)).assertDeepEquals(2)
    })
    it('test35', 0, () => {
      expect(findIndex([
        {
          a: 0, b: 0
        },
        {
          a: 1, b: 1
        },
        {
          a: 2, b: 2
        },
        {
          a: 0, b: 0
        }
      ], (obj: ESObject) => {
        return obj.a === 0;
      })).assertDeepEquals(0)
    })
    it('test99', 0, () => {
      expect(findIndex([
        {
          a: 1, b: 0
        },
        {
          a: 1, b: 1
        },
        {
          a: 2, b: 2
        },
        {
          a: 0, b: 0
        }
      ], (obj: ESObject) => {
        return obj.a === 0;
      })).assertDeepEquals(3)
    })
    it('test100', 0, () => {
      expect(findIndex([
        {
          a: 3, b: 0
        },
        {
          a: 1, b: 1
        },
        {
          a: 2, b: 2
        },
        {
          a: 0, b: 0
        }
      ], (obj: ESObject) => {
        return obj.a === 0;
      })).assertDeepEquals(3)
    })
    it('test101', 0, () => {
      expect(findIndex([
        {
          a: 2, b: 0
        },
        {
          a: 1, b: 1
        },
        {
          a: 2, b: 2
        },
        {
          a: 0, b: 0
        }
      ], (obj: ESObject) => {
        return obj.a === 0;
      })).assertDeepEquals(3)
    })
    it('test102', 0, () => {
      expect(findIndex([
        {
          a: 3, b: 0
        },
        {
          a: 1, b: 1
        },
        {
          a: 2, b: 2
        },
        {
          a: 0, b: 0
        }
      ], (obj: ESObject) => {
        return obj.a === 0;
      })).assertDeepEquals(3)
    })
    it('test36', 0, () => {
      expect(findLastIndex([
        {
          a: 0, b: 0
        },
        {
          a: 1, b: 1
        },
        {
          a: 2, b: 2
        },
        {
          a: 0, b: 0
        }
      ], (obj: ESObject) => {
        return obj.a === 0;
      })).assertDeepEquals(3)
    })
    it('test103', 0, () => {
      expect(findLastIndex([
        {
          a: 1, b: 0
        },
        {
          a: 1, b: 1
        },
        {
          a: 2, b: 2
        },
        {
          a: 0, b: 0
        }
      ], (obj: ESObject) => {
        return obj.a === 0;
      })).assertDeepEquals(3)
    })
    it('test104', 0, () => {
      expect(findLastIndex([
        {
          a: 1, b: 0
        },
        {
          a: 2, b: 1
        },
        {
          a: 2, b: 2
        },
        {
          a: 0, b: 0
        }
      ], (obj: ESObject) => {
        return obj.a === 0;
      })).assertDeepEquals(3)
    })
    it('test105', 0, () => {
      expect(findLastIndex([
        {
          a: 1, b: 0
        },
        {
          a: 2, b: 1
        },
        {
          a: 1, b: 2
        },
        {
          a: 0, b: 0
        }
      ], (obj: ESObject) => {
        return obj.a === 0;
      })).assertDeepEquals(3)
    })
    it('test106', 0, () => {
      expect(findLastIndex([
        {
          a: 1, b: 0
        },
        {
          a: 3, b: 1
        },
        {
          a: 1, b: 2
        },
        {
          a: 0, b: 0
        }
      ], (obj: ESObject) => {
        return obj.a === 0;
      })).assertDeepEquals(3)
    })
    it('test37', 0, () => {
      expect(range(0)).assertDeepEquals([])
    })
    it('test38', 0, () => {
      expect(range(4)).assertDeepEquals([0, 1, 2, 3])
    })
    it('test107', 0, () => {
      expect(range(5)).assertDeepEquals([0, 1, 2, 3, 4])
    })
    it('test108', 0, () => {
      expect(range(6)).assertDeepEquals([0, 1, 2, 3, 4, 5])
    })
    it('test109', 0, () => {
      expect(range(3)).assertDeepEquals([0, 1, 2])
    })
    it('test39', 0, () => {
      expect(chunk([], 2)).assertDeepEquals([])
    })
    it('test40', 0, () => {
      expect(chunk([1, 2, 3], 0)).assertDeepEquals([])
    })
    it('test110', 0, () => {
      expect(chunk([1, 2, 3], 2)).assertDeepEquals([[1, 2], [3]])
    })
    it('test111', 0, () => {
      expect(chunk([1, 2, 3], 1)).assertDeepEquals([[1], [2], [3]])
    })
    it('test112', 0, () => {
      expect(chunk([], 1)).assertDeepEquals([])
    })
  })
}