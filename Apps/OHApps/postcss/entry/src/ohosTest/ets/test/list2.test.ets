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
export default function list2Test() {
  describe('list2Test', () => {
    it('test01',0, () => {
      expect(postcss.list.space('a b')).assertDeepEquals(['a', 'b'])
    })

    it('test02',0, () => {
      expect(postcss.list.space(' a  b ')).assertDeepEquals(['a', 'b'])
    })

    it('test03',0, () => {
      expect(postcss.list.space('"a b\\"" \'\'')).assertDeepEquals(['"a b\\""', "''"])
    })

    it('test04',0, () => {
      expect(postcss.list.space('f( )) a( () )')).assertDeepEquals(['f( ))', 'a( () )'])
    })

    it('test05',0, () => {
      expect(postcss.list.space('a\\ b')).assertDeepEquals(['a\\ b'])
    })

    it('test06',0, () => {
      let space = postcss.list.space
      expect(space('a b')).assertDeepEquals(['a', 'b'])
    })

    it('test07',0, () => {
      expect(postcss.list.comma('a, b')).assertDeepEquals(['a', 'b'])
    })

    it('test08',0, () => {
      expect(postcss.list.comma('a, b,')).assertDeepEquals(['a', 'b', ''])
    })

    it('test09',0, () => {
      expect(postcss.list.comma('"a,b\\"", \'\'')).assertDeepEquals(['"a,b\\""', "''"])
    })

    it('test10',0, () => {
      expect(postcss.list.comma('f(,)), a(,(),)')).assertDeepEquals(['f(,))', 'a(,(),)'])
    })

    it('test11',0, () => {
      expect(postcss.list.comma('a\\, b')).assertDeepEquals(['a\\, b'])
    })

    it('test12',0, () => {
      let comma = postcss.list.comma
      expect(comma('a, b')).assertDeepEquals(['a', 'b'])
    })

  })
}