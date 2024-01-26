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
import Processor from '@ohos/postcss/src/main/ets/components/lib/processor'
export default function resultTest() {
  let processor = new Processor()
  let root = new postcss.Root()
  describe('resultTest', () => {
    it('test01',0, () => {
      let result = new postcss.Result(processor, root, {})
      result.css = 'a{}'
      expect(`${result}`).assertDeepEquals(result.css)
    })
    it('test02',0, () => {
      let css = postcss.parse('a{}')
      let result = new postcss.Result(processor, css, {})
      result.warn('TT', { node: css.first })

      expect(result.messages[0].toString()).assertDeepEquals('<css input>:1:1: TT')
    })
    it('test03',0, () => {
      let result = new postcss.Result(processor, root, {})
      result.messages = [
        { type: 'warning', text: 'a' },
        { type: 'custom' },
        { type: 'warning', text: 'b' }
      ]
      expect(result.warnings()).assertDeepEquals([
        { type: 'warning', text: 'a' },
        { type: 'warning', text: 'b' }
      ])
    })
  })
}