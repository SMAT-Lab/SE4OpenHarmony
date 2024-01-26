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
export default function atRuleTest() {
  describe('atRuleTest', () => {
    it('test01',0, () => {
      let rule = new postcss.AtRule({ name: 'encoding', params: '"utf-8"' })
      expect(rule.name).assertDeepEquals('encoding')
    })
    it('test02',0, () => {
      let rule = new postcss.AtRule({ name: 'encoding', params: '"utf-8"' })
      expect(rule.params).assertDeepEquals('"utf-8"')
    })
    it('test03',0, () => {
      let rule = new postcss.AtRule({ name: 'encoding', params: '"utf-8"' })
      expect(rule.toString()).assertDeepEquals('@encoding "utf-8"')
    })
    it('test04',0, () => {
      let rule = new postcss.AtRule()
      expect(rule.nodes).assertUndefined()
    })
    it('test05',0, () => {
      let rule = new postcss.AtRule({ name: 'page', params: 1, nodes: [] })
      expect(rule.toString()).assertDeepEquals('@page 1 {}')
    })
  })
}