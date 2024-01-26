/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import postcss from '@ohos/postcss'
import Input from '@ohos/postcss/src/main/ets/components/lib/input';
import tokenizer from '../../../../../library/src/main/ets/components/lib/tokenize'
export default function tokenizeTest() {
  describe('TokenizeTest', () => {
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

    let tokenize: (css?: ESObject, opts?: ESObject)=> void = (css?: ESObject, opts?: ESObject): ESObject[]=> {
      let processor = tokenizer(new Input(css), opts)
      let tokens: ESObject[] = [];
      while (!processor.endOfFile()) {
        tokens.push(processor.nextToken())
      }
      return tokens
    }


    it('ignore_unclosed_per_token_request',0, () => {
      let tokn: (css: ESObject, opts: ESObject) => void = (css: ESObject, opts: ESObject): ESObject[] => {
        let processor = tokenizer(new Input(css), opts)
        let tokens: ESObject[] = []
        while (!processor.endOfFile()) {
          tokens.push(processor.nextToken({ ignoreUnclosed: true }))
        }
        return tokens
      }

      let css = "How's it going ("
      let tokens = tokn(css, {})
      let expected = [
        ['word', 'How', 0, 2],
        ['string', "'s", 3, 4],
        ['space', ' '],
        ['word', 'it', 6, 7],
        ['space', ' '],
        ['word', 'going', 9, 13],
        ['space', ' '],
        ['(', '(', 15]
      ]

      expect(JSON.stringify(tokens)).assertEqual(JSON.stringify(expected))
    })

    it('provides_correct_position',0, () => {
      let css = 'Three tokens'
      let processor: ESObject = tokenizer(new postcss.Input(css))
      expect(processor.position()).assertEqual(0)
      processor.nextToken()
      expect(processor.position()).assertEqual(5)
      processor.nextToken()
      expect(processor.position()).assertEqual(6)
      processor.nextToken()
      expect(processor.position()).assertEqual(12)
      processor.nextToken()
      expect(processor.position()).assertEqual(12)
    })
  })
}