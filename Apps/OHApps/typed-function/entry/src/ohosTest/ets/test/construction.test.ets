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

export default function constructionTest() {
  describe('ActsConstructionTest', () => {
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
    it('create',0, () => {
      let typed1: ESObject = typed.create()
      expect(typed.create).assertEqual(typed1.create)
    })

    it('createCount',0, () => {
      let saveCount: ESObject = typed.createCount
      typed({ number: () => true })
      expect(1).assertEqual(typed.createCount - saveCount)
    })

    it('clear',0, () => {
      let typed1: ESObject = typed.create()
      expect(typed1.clear()).assertUndefined()
    })

    it('findType',0, () => {
      let typed1: ESObject = typed.create()
      typed1.clear()
      typed1.addType({ name: 'number', test: (n: number) => typeof n === 'number' })
      expect(0).assertEqual(typed1._findType('number').index)
    })

    it('referToSelf',0, () => {
      let fn: ESObject = typed({
        number: (value: number) => {
          return 'number:' + value
        },
        string: typed.referToSelf((self: ESObject) => {
          return (value: string): ESObject => {
            return self(parseInt(value, 10))
          }
        })
      })
      expect('number:2').assertEqual(fn('2'))
    })
  })
}