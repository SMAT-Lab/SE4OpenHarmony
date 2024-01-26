/*
 * MIT License
 *
 * Copyright (C) 2024 Huawei Device Co., Ltd.
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

import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import typed from 'typed-function'

export default function conversionTest() {
  describe('ActsConversionTest', () => {
    // Defines a test suite. Two parameters are supported: test suite name and test suite function.
    beforeAll(() => {
      // Presets an action, which is performed only once before all test cases of the test suite start.
      // This API supports only one parameter: preset action function.
    })

    beforeEach(() => {
      // Presets an action, which is performed before each unit test case starts.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: preset action function.
      let convertBool: (b: number) => number = (b: number): number => {
        return +b
      }
      typed.addConversions([
        { from: 'boolean', to: 'number', convert: convertBool },
        { from: 'boolean', to: 'string', convert: (x: number) => { return x + '' } },
        { from: 'number', to: 'string', convert: (x: number) => { return x + '' } },
        {
          from: 'string',
          to: 'Date',
          convert: (x: number) => {
            const d = new Date(x)
            return isNaN(d.valueOf()) ? undefined : d
          },
          fallible: true
        }
      ])
    })
    afterEach(() => {
      // Presets a clear action, which is performed after each unit test case ends.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: clear action function.
      typed.clearConversions()
    })
    afterAll(() => {
      // Presets a clear action, which is performed after all test cases of the test suite end.
      // This API supports only one parameter: clear action function.
    })
    it('create',0, () => {
      let typed1: ESObject = typed.create()
      expect(typed.create).assertEqual(typed1.create)
    })

    it('clearConversions',0, () => {
      typed.clearConversions()
      typed.addConversions([
        { from: 'boolean', to: 'string', convert: (x: string) => { return x + '' } },
        { from: 'boolean', to: 'number', convert: (x: number) => { return x + 0 } }
      ])
      let fn: ESObject = typed({
        'string | number': (a: string | number) => {
          return a
        }
      })
      expect(fn(true)).assertEqual('true')
    })

    it('addConversions',0, () => {
      typed.clearConversions()
      typed.addConversions([
        { from: 'boolean', to: 'number', convert: (x: number) => { return x + 0 } },
        { from: 'boolean', to: 'string', convert: (x: string) => { return x + '' } }
      ])
      let fn: ESObject = typed({
        'string | number': (a: string | number) => {
          return a
        }
      })
      expect(fn(true)).assertEqual(1)
    })

    it('convert',0, () => {
      expect(typed.convert(2, 'string')).assertEqual('2')
    })
  })
}