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
  identity,
  constant,
  noop,
  times,
  random,
  uniqueId,
  escape,
  unescape,
  result,
  now,
  template,
  toPath,
  range,
  every,
  uniq,
} from 'underscore'

export default function utilityTest() {
  describe('UtilityTest', () => {
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
      expect(identity({
        name: 'moe'
      })).assertDeepEquals({
        name: 'moe'
      })
    })
    it('test13', 0, () => {
      expect(identity({
        name: 'hi'
      })).assertDeepEquals({
        name: 'hi'
      })
    })
    it('test14', 0, () => {
      expect(identity({
        name: 'me'
      })).assertDeepEquals({
        name: 'me'
      })
    })
    it('test15', 0, () => {
      expect(identity({
        name: null
      })).assertDeepEquals({
        name: null
      })
    })
    it('test16', 0, () => {
      expect(identity({
        name: undefined
      })).assertDeepEquals({
        name: undefined
      })
    })
    it('test02', 0, () => {
      expect(constant({
        name: 'moe'
      })()).assertDeepEquals({
        name: 'moe'
      })
    })
    it('test17', 0, () => {
      expect(constant({
        name: null
      })()).assertDeepEquals({
        name: null
      })
    })
    it('test18', 0, () => {
      expect(constant({
        name: undefined
      })()).assertDeepEquals({
        name: undefined
      })
    })
    it('test19', 0, () => {
      expect(constant({
        name: true
      })()).assertDeepEquals({
        name: true
      })
    })
    it('test20', 0, () => {
      expect(constant({
        name: 1
      })()).assertDeepEquals({
        name: 1
      })
    })
    it('test03', 0, () => {
      expect(noop('curly', 'larry', 'moe')).assertDeepEquals(void 0)
    })
    it('test21', 0, () => {
      expect(noop(null, 'larry', 'moe')).assertDeepEquals(void 0)
    })
    it('test22', 0, () => {
      expect(noop(undefined, 'larry', 'moe')).assertDeepEquals(void 0)
    })
    it('test23', 0, () => {
      expect(noop(true, 'larry', 'moe')).assertDeepEquals(void 0)
    })
    it('test24', 0, () => {
      expect(noop(1, 'larry', 'moe')).assertDeepEquals(void 0)
    })
    it('test04', 0, () => {
      let key = 'xyz';
      let path = [key];
      expect(toPath(key)).assertDeepEquals(path)
    })
    it('test25', 0, () => {
      let key = null;
      let path = [key];
      expect(toPath(key)).assertDeepEquals(path)
    })
    it('test26', 0, () => {
      let key = undefined;
      let path = [key];
      expect(toPath(key)).assertDeepEquals(path)
    })
    it('test27', 0, () => {
      let key = true;
      let path = [key];
      expect(toPath(key)).assertDeepEquals(path)
    })
    it('test28', 0, () => {
      let key = 1;
      let path = [key];
      expect(toPath(key)).assertDeepEquals(path)
    })
    it('test05', 0, () => {
      let array: number = range(1000);
      let min = Math.pow(2, 31);
      let max = Math.pow(2, 62);
      expect(every(array, () => {
        return random(min, max) >= min;
      })).assertDeepEquals(true)
    })
    it('test29', 0, () => {
      let array: number = range(1000);
      let min = Math.pow(2, 21);
      let max = Math.pow(2, 62);
      expect(every(array, () => {
        return random(min, max) >= min;
      })).assertDeepEquals(true)
    })
    it('test30', 0, () => {
      let array: number = range(1000);
      let min = Math.pow(2, 12);
      let max = Math.pow(2, 62);
      expect(every(array, () => {
        return random(min, max) >= min;
      })).assertDeepEquals(true)
    })
    it('test31', 0, () => {
      let array: number = range(1000);
      let min = Math.pow(2, 32);
      let max = Math.pow(2, 62);
      expect(every(array, () => {
        return random(min, max) >= min;
      })).assertDeepEquals(true)
    })
    it('test32', 0, () => {
      let array: number = range(1000);
      let min = Math.pow(2, 37);
      let max = Math.pow(2, 62);
      expect(every(array, () => {
        return random(min, max) >= min;
      })).assertDeepEquals(true)
    })
    it('test06', 0, () => {
      let diff = now() - new Date().getTime();
      expect(diff <= 0 && diff > -5).assertDeepEquals(true)
    })
    it('test33', 0, () => {
      let diff = now() - new Date().getTime();
      expect(diff <= 0 && diff > -4).assertDeepEquals(true)
    })
    it('test34', 0, () => {
      let diff = now() - new Date().getTime();
      expect(diff <= 0 && diff > -3).assertDeepEquals(true)
    })
    it('test35', 0, () => {
      let diff = now() - new Date().getTime();
      expect(diff <= 0 && diff > -2).assertDeepEquals(true)
    })
    it('test36', 0, () => {
      let diff = now() - new Date().getTime();
      expect(diff <= 0 && diff > -1).assertDeepEquals(true)
    })
    it('test37', 0, () => {
      let ids = [1, 2], i = 0;
      while (i++ < 100) ids.push(uniqueId());
      expect(uniq(ids).length).assertDeepEquals(ids.length)
    })
    it('test38', 0, () => {
      let ids = [1], i = 0;
      while (i++ < 100) ids.push(uniqueId());
      expect(uniq(ids).length).assertDeepEquals(ids.length)
    })
    it('test39', 0, () => {
      let ids = ['a', 'b'], i = 0;
      while (i++ < 100) ids.push(uniqueId());
      expect(uniq(ids).length).assertDeepEquals(ids.length)
    })
    it('test40', 0, () => {
      let ids = ['a'], i = 0;
      while (i++ < 100) ids.push(uniqueId());
      expect(uniq(ids).length).assertDeepEquals(ids.length)
    })
    it('test09', 0, () => {
      expect(escape(null)).assertDeepEquals('')
    })
    it('test45', 0, () => {
      expect(escape(undefined)).assertDeepEquals('')
    })
    it('test46', 0, () => {
      expect(escape(true)).assertDeepEquals('true')
    })
    it('test47', 0, () => {
      expect(escape(1)).assertDeepEquals('1')
    })
    it('test48', 0, () => {
      expect(escape('a')).assertDeepEquals('a')
    })
    it('test10', 0, () => {
      let string = 'Curly & Moe';
      expect(unescape(null)).assertDeepEquals('')
    })
    it('test49', 0, () => {
      let string = 'Curly & Moe';
      expect(unescape(undefined)).assertDeepEquals('')
    })
    it('test50', 0, () => {
      let string = 'Curly & Moe';
      expect(unescape(true)).assertDeepEquals('true')
    })
    it('test51', 0, () => {
      let string = 'Curly & Moe';
      expect(unescape(1)).assertDeepEquals('1')
    })
    it('test52', 0, () => {
      let string = 'Curly & Moe';
      expect(unescape('a')).assertDeepEquals('a')
    })
    it('test11', 0, () => {
      let source: ESObject;
      try {
        template('<b><%= if x %></b>');
      } catch (ex) {
        source = ex.source;
      }
      expect(new RegExp('__p').test(source)).assertDeepEquals(true)
    })
    it('test53', 0, () => {
      let source: ESObject;
      try {
        template('<b><%= if show %></b>');
      } catch (ex) {
        source = ex.source;
      }
      expect(new RegExp('__p').test(source)).assertDeepEquals(true)
    })
    it('test54', 0, () => {
      let source: ESObject;
      try {
        template('<b><%= if hi %></b>');
      } catch (ex) {
        source = ex.source;
      }
      expect(new RegExp('__p').test(source)).assertDeepEquals(true)
    })
    it('test55', 0, () => {
      let source: ESObject;
      try {
        template('<b><%= if we %></b>');
      } catch (ex) {
        source = ex.source;
      }
      expect(new RegExp('__p').test(source)).assertDeepEquals(true)
    })
    it('test56', 0, () => {
      let source: ESObject;
      try {
        template('<b><%= if 123 %></b>');
      } catch (ex) {
        source = ex.source;
      }
      expect(new RegExp('__p').test(source)).assertDeepEquals(true)
    })
  })
}