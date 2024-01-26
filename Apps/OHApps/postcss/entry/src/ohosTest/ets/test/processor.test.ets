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
import {
  Result,
  Node,
  Root,
  PluginCreator,
} from '@ohos/postcss/src/main/ets/components/lib/postcss'
import LazyResult from '@ohos/postcss/src/main/ets/components/lib/lazy-result'
import Processor from '@ohos/postcss/src/main/ets/components/lib/processor'

let beforeFix = new Processor([
  (root: Root) => {
    root.walkRules(rule => {
      if (!rule.selector.match(new RegExp('::(before|after)'))) return
      if (!rule.some(i => i.type === 'decl' && i.prop === 'content')) {
        rule.prepend({ prop: 'content', value: '""' })
      }
    })
  }
])
export default function processorTest() {

  describe('processorTest', () => {
    it('test01',0, () => {
      let a = (): void => {}
      let processor = new Processor()
      processor.use(a)
      expect(processor.plugins).assertDeepEquals([a])
    })
    it('test02',0, () => {
      let a = (): void => {}
      let processor = new Processor()
      processor.use({ postcss: a })
      expect(processor.plugins).assertDeepEquals([a])
    })
    it('test03',0, () => {
      let a = (): void => {}
      let obj: ESObject = () => {}
      obj.postcss = a
      let processor = new Processor()
      processor.use(obj)
      expect(processor.plugins).assertDeepEquals([a])
    })
    it('test04',0, () => {
      let a = (): void => {}
      let processor = new Processor()
      let other = new Processor([a])
      processor.use(other)
      expect(processor.plugins).assertDeepEquals([a])
    })
    it('test05',0, () => {
      let a = (): void => {}
      let processor = new Processor()
      let other = new Processor([a])
      processor.use({ postcss: other })
      expect(processor.plugins).assertDeepEquals([a])
    })
    it('test06',0, () => {
      let a = (): void => {}
      let b = (): void => {}
      let processor = new Processor()
      expect(processor.use(a).use(b).plugins).assertDeepEquals([a, b])
    })
    it('test07',0, () => {
      let result = beforeFix.process('a::before{top:0}')
      expect(result.css).assertDeepEquals('a::before{content:"";top:0}')
    })
    it('test08',0, () => {
      let root = postcss.parse('a::before{top:0}')
      let result = beforeFix.process(root)
      expect(result.css).assertDeepEquals('a::before{content:"";top:0}')
    })
    it('test09',0, () => {
      let result = new Processor([() => {}]).process('a::before{top:0}')
      result = beforeFix.process(result)
      expect(result.css).assertDeepEquals('a::before{content:"";top:0}')
    })
    it('test10',0, () => {
      let one = new Processor([() => {}]).process('a{}', {
        from: 'a.css',
        to: 'b.css',
        map: { inline: false }
      })
      let two = new Processor([() => {}]).process(one, { to: 'c.css' })
      expect(two.map.toJSON().sources).assertDeepEquals(['a.css'])
    })
    it('test12',0, () => {
      let processor = new Processor([
        (css, result) => {
          result.root = new postcss.Root()
        }
      ])
      expect(processor.process('a {}').css).assertDeepEquals('')
    })
    it('test13',0, () => {
      let result = new Processor([() => {}]).process('a{}')
      expect(result instanceof LazyResult).assertDeepEquals(true)
      expect(result.css).assertDeepEquals('a{}')
      expect(result.toString()).assertDeepEquals('a{}')
    })
    it('test14',0, () => {
      expect(
        typeof new Processor([
          (css: Root) => {
            expect(css instanceof postcss.Root).assertDeepEquals(true)
          }
        ]).process('a {}').css
      ).assertDeepEquals('string')
    })
    it('test15',0, () => {
      let plugin1 = (css: Root, result: Result): void => {
        expect(result.lastPlugin).assertDeepEquals(plugin1)
      }
      let plugin2 = (css: Root, result: Result): void => {
        expect(result.lastPlugin).assertDeepEquals(plugin2)
      }
    })
    it('test16',0, () => {
      let a = (): void => {}
      let processor = new Processor()
      let other = (() => {
        return new Processor([a])
      }) as PluginCreator<void>
      other.postcss = true
      processor.use(other)
      expect(processor.plugins).assertDeepEquals([a])
    })
    it('test17',0, () => {
      let a = (): void => {}
      let processor = new Processor()
      let other = (() => {
        return new Processor([a])
      }) as PluginCreator<void>
      other.postcss = true
      processor.use(other)
      expect(processor.plugins).assertDeepEquals([a])
    })
  })
}