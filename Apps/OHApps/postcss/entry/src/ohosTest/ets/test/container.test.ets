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
import {Rule} from '@ohos/postcss/src/main/ets/components/lib/postcss'
export default function containerTest() {
  describe('containerTest', () => {
    let example =
      'a { a: 1; b: 2 }' +
        '/* a */' +
        '@keyframes anim {' +
        '/* b */' +
        'to { c: 3 }' +
        '}' +
        '@media all and (min-width: 100) {' +
        'em { d: 4 }' +
        '@page {' +
        'e: 5;' +
        '/* c */' +
        '}' +
        '}'
    it('test01',0, () => {
      let rule = postcss.parse('a { a: 1; b: 2 }').first as Rule
      rule.push(new postcss.Declaration({ prop: 'c', value: '3' }))
      expect(rule.toString()).assertDeepEquals('a { a: 1; b: 2; c: 3 }')
      expect(rule.last?.raws.before).assertUndefined()
    })
    it('test02',0, () => {
      let rule = postcss.parse('a { a: 1; b: 2 }').first as Rule
      let indexes: number[] = []

      let result = rule.each((decl, i) => {
        indexes.push(i)
        expect(decl).assertDeepEquals(rule.nodes[i])
      })
      expect(result).assertUndefined()
      expect(indexes).assertDeepEquals([0, 1])
    })
    it('test03',0, () => {
      let rule = postcss.parse('a { a: 1; b: 2 }').first as Rule
      let size = 0

      rule.each(() => {
        rule.prepend({ prop: 'color', value: 'aqua' })
        size += 1
      })
      expect(size).assertDeepEquals(2)
    })
    it('test04',0, () => {
      let rule = postcss.parse('a { a: 1; b: 2 }').first as Rule
      let size = 0

      rule.each(decl => {
        if (decl.type === 'decl' && decl.prop === 'a') {
          rule.insertBefore(decl, { prop: 'c', value: '3' })
        }
        size += 1
      })
      expect(size).assertDeepEquals(2)
    })
    it('test05',0, () => {
      let rule = postcss.parse('a { a: 1; b: 2 }').first as Rule
      let size = 0

      rule.each((decl, i) => {
        if (decl.type === 'decl' && decl.prop === 'a') {
          rule.insertBefore(i + 1, { prop: 'c', value: '3' })
        }
        size += 1
      })

      expect(size).assertDeepEquals(3)
    })
    it('test06',0, () => {
      let rule = postcss.parse('a { a: 1; b: 2 }').first as Rule
      let size = 0

      rule.each((decl, i) => {
        rule.insertAfter(i - 1, { prop: 'c', value: '3' })
        size += 1
      })

      expect(size).assertDeepEquals(2)
    })
    it('test07',0, () => {
      let rule = postcss.parse('a { a: 1; b: 2 }').first as Rule
      let size = 0

      rule.each((decl, i) => {
        if (decl.type === 'decl' && decl.prop === 'a') {
          rule.insertAfter(i, { prop: 'c', value: '3' })
        }
        size += 1
      })

      expect(size).assertDeepEquals(3)
    })
    it('test08',0, () => {
      let rule = postcss.parse('a { a: 1; b: 2 }').first as Rule
      let size = 0

      rule.each(() => {
        rule.removeChild(0)
        size += 1
      })
      expect(size).assertDeepEquals(2)
    })
    it('test09',0, () => {
      let rule = postcss.parse('a { a: 1; b: 2 }').first as Rule
      let indexes: number[] = []

      let result = rule.each((decl, i) => {
        indexes.push(i)
        return false
      })

      expect(result).assertDeepEquals(false)
      expect(indexes).assertDeepEquals([0])
    })
    it('test10',0, () => {
      let rule = postcss.parse('a { a: 1; b: 2 }').first as Rule
      let props: string[] = []

      rule.each(decl => {
        if (decl.type === 'decl') {
          props.push(decl.prop)
          rule.nodes = [rule.last as ESObject, rule.first as ESObject]
        }
      })

      expect(props).assertDeepEquals(['a', 'a'])
    })
    it('test11',0, () => {
      let types: string[] = []
      let indexes: number[] = []

      let result = postcss.parse(example).walk((node, i) => {
        types.push(node.type)
        indexes.push(i)
      })

      expect(result).assertUndefined()
      expect(types).assertDeepEquals([
        'rule',
        'decl',
        'decl',
        'comment',
        'atrule',
        'comment',
        'rule',
        'decl',
        'atrule',
        'rule',
        'decl',
        'atrule',
        'decl',
        'comment'
      ])
      expect(indexes).assertDeepEquals([0, 0, 1, 1, 2, 0, 1, 0, 3, 0, 0, 1, 0, 1])
    })
    it('test12',0, () => {
      let indexes: number[] = []

      let result = postcss.parse(example).walk((decl, i) => {
        indexes.push(i)
        return false
      })

      expect(result).assertDeepEquals(false)
      expect(indexes).assertDeepEquals([0])
    })
    it('test13',0, () => {
      let indexes: number[] = []

      let result = postcss.parse(example).walkDecls((decl, i) => {
        indexes.push(i)
        return false
      })

      expect(result).assertDeepEquals(false)
      expect(indexes).assertDeepEquals([0])
    })
    it('test14',0, () => {
      let props: string[] = []
      let indexes: number[] = []

      let result = postcss.parse(example).walkDecls((decl, i) => {
        props.push(decl.prop)
        indexes.push(i)
      })

      expect(result).assertUndefined()
      expect(props).assertDeepEquals(['a', 'b', 'c', 'd', 'e'])
      expect(indexes).assertDeepEquals([0, 1, 0, 0, 0])
    })
    it('test15',0, () => {
      let size = 0
      postcss.parse(example).walkDecls((decl, i) => {
        decl.parent?.removeChild(i)
        size += 1
      })
      expect(size).assertDeepEquals(5)
    })
    it('test16',0, () => {
      let css = postcss.parse('@page{a{one:1}}b{one:1;two:2}')
      let size = 0

      css.walkDecls('one', decl => {
        expect(decl.prop).assertDeepEquals('one')
        size += 1
      })

      expect(size).assertDeepEquals(2)
    })
    it('test17',0, () => {
      let css = postcss.parse('@page{a{one:1}}b{one:1;two:2}')
      let size = 0

      css.walkDecls('one', () => {
        size += 1
        return false
      })

      expect(size).assertDeepEquals(1)
    })
    it('test18',0, () => {
      let css = postcss.parse('@page{a{one:1}}b{one-x:1;two:2}')
      let size = 0

      css.walkDecls(new RegExp('one(-x)?'), () => {
        size += 1
      })
      expect(size).assertDeepEquals(2)
    })
    it('test19',0, () => {
      let css = postcss.parse('@page{a{one:1}}b{one-x:1;two:2}')
      let size = 0

      css.walkDecls(new RegExp('one(-x)?'), () => {
        size += 1
        return false
      })

      expect(size).assertDeepEquals(1)
    })
    it('test20',0, () => {
      let texts: string[] = []
      let indexes: number[] = []

      let result = postcss.parse(example).walkComments((comment, i) => {
        texts.push(comment.text)
        indexes.push(i)
      })

      expect(result).assertUndefined()
      expect(texts).assertDeepEquals(['a', 'b', 'c'])
      expect(indexes).assertDeepEquals([1, 0, 1])
    })
    it('test21',0, () => {
      let size = 0
      postcss.parse(example).walkComments((comment, i) => {
        comment.parent?.removeChild(i)
        size += 1
      })
      expect(size).assertDeepEquals(3)
    })
    it('test22',0, () => {
      let indexes: number[] = []

      let result = postcss.parse(example).walkComments((comment, i) => {
        indexes.push(i)
        return false
      })

      expect(result).assertDeepEquals(false)
      expect(indexes).assertDeepEquals([1])
    })
    it('test23',0, () => {
      let selectors: string[] = []
      let indexes: number[] = []

      let result = postcss.parse(example).walkRules((rule, i) => {
        selectors.push(rule.selector)
        indexes.push(i)
      })

      expect(result).assertUndefined()
      expect(selectors).assertDeepEquals(['a', 'to', 'em'])
      expect(indexes).assertDeepEquals([0, 1, 0])
    })
    it('test24',0, () => {
      let size = 0
      postcss.parse(example).walkRules((rule, i) => {
        rule.parent?.removeChild(i)
        size += 1
      })
      expect(size).assertDeepEquals(3)
    })
    it('test25',0, () => {
      let indexes: number[] = []

      let result = postcss.parse(example).walkRules((rule, i) => {
        indexes.push(i)
        return false
      })

      expect(result).assertDeepEquals(false)
      expect(indexes).assertDeepEquals([0])
    })
    it('test26',0, () => {
      let size = 0
      postcss.parse('a{}b{}a{}').walkRules('a', rule => {
        expect(rule.selector).assertDeepEquals('a')
        size += 1
      })
      expect(size).assertDeepEquals(2)
    })
    it('test27',0, () => {
      let size = 0
      postcss.parse('a{}b{}a{}').walkRules('a', () => {
        size += 1
        return false
      })
      expect(size).assertDeepEquals(1)
    })
    it('test28',0, () => {
      let size = 0
      postcss.parse('a{}a b{}b a{}').walkRules(new RegExp('^a'), rule => {
        size += 1
      })
      expect(size).assertDeepEquals(2)
    })
    it('test29',0, () => {
      let size = 0
      postcss.parse('a{}b a{}b a{}').walkRules(new RegExp('^a'), () => {
        size += 1
        return false
      })
      expect(size).assertDeepEquals(1)
    })
    it('test30',0, () => {
      let names: string[] = []
      let indexes: number[] = []

      let result = postcss.parse(example).walkAtRules((atrule, i) => {
        names.push(atrule.name)
        indexes.push(i)
      })

      expect(result).assertUndefined()
      expect(names).assertDeepEquals(['keyframes', 'media', 'page'])
      expect(indexes).assertDeepEquals([2, 3, 1])
    })
    it('test31',0, () => {
      let size = 0
      postcss.parse(example).walkAtRules((atrule, i) => {
        atrule.parent?.removeChild(i)
        size += 1
      })
      expect(size).assertDeepEquals(3)
    })
    it('test32',0, () => {
      let indexes: number[] = []

      let result = postcss.parse(example).walkAtRules((atrule, i) => {
        indexes.push(i)
        return false
      })

      expect(result).assertDeepEquals(false)
      expect(indexes).assertDeepEquals([2])
    })
    it('test33',0, () => {
      let css = postcss.parse('@page{@page 2{}}@media print{@page{}}')
      let size = 0

      css.walkAtRules('page', atrule => {
        expect(atrule.name).assertDeepEquals('page')
        size += 1
      })

      expect(size).assertDeepEquals(3)
    })
    it('test34',0, () => {
      let size = 0
      postcss.parse('@page{@page{@page{}}}').walkAtRules('page', () => {
        size += 1
        return false
      })
      expect(size).assertDeepEquals(1)
    })
    it('test35',0, () => {
      let css = postcss.parse('@page{@page 2{}}@media print{@pages{}}')
      let size = 0

      css.walkAtRules(new RegExp('page'), () => {
        size += 1
      })

      expect(size).assertDeepEquals(3)
    })
    it('test36',0, () => {
      let size = 0
      postcss.parse('@page{@pages{@page{}}}').walkAtRules(new RegExp('page'), () => {
        size += 1
        return false
      })
      expect(size).assertDeepEquals(1)
    })
    it('test37',0, () => {
      let rule = postcss.parse('a { a: 1; b: 2 }').first as Rule
      rule.append({ prop: 'c', value: '3' })
      expect(rule.toString()).assertDeepEquals('a { a: 1; b: 2; c: 3 }')
      expect(rule.last?.raws.before).assertDeepEquals(' ')
    })
    it('test38',0, () => {
      let rule = postcss.parse('a { a: 1; b: 2 }').first as Rule
      rule.append({ prop: 'c', value: '3' }, { prop: 'd', value: '4' })
      expect(rule.toString()).assertDeepEquals('a { a: 1; b: 2; c: 3; d: 4 }')
      expect(rule.last?.raws.before).assertDeepEquals(' ')
    })
    it('test39',0, () => {
      let rule = postcss.parse('a { a: 1; b: 2 }').first as Rule
      rule.append({ prop: 'c', value: '3' })
      expect(rule.toString()).assertDeepEquals('a { a: 1; b: 2; c: 3 }')
    })
    it('test42',0, () => {
      let root = new postcss.Root()
      root.append({ text: 'ok' })
      expect(root.first?.toString()).assertDeepEquals('/* ok */')
    })
    it('test43',0, () => {
      let css = postcss.parse('a {}')
      css.append(postcss.parse('b {}'))
      expect(css.toString()).assertDeepEquals('a {}b {}')
    })
    it('test45',0, () => {
      let a = postcss.parse('a{ z-index: 1 }')
      let b = postcss.parse('b{ width: 1px; height: 2px }')
      let aRule = a.first as Rule
      let bRule = b.first as Rule

      aRule.append(bRule.nodes)
      expect(a.toString()).assertDeepEquals('a{ z-index: 1; width: 1px; height: 2px }')
      expect(b.toString()).assertDeepEquals('b{ }')
    })
    it('test46',0, () => {
      let a = postcss.parse('a{}')
      let b = postcss.parse('b{}')

      b.append(a.first as Rule)
      let bLast = b.last as Rule
      bLast.selector = 'b a'

      expect(a.toString()).assertDeepEquals('')
      expect(b.toString()).assertDeepEquals('b{}b a{}')
    })
    it('test47',0, () => {
      let rule = postcss.parse('a { a: 1; b: 2 }').first as Rule
      rule.prepend({ prop: 'c', value: '3' })
      expect(rule.toString()).assertDeepEquals('a { c: 3; a: 1; b: 2 }')
      expect(rule.first?.raws.before).assertDeepEquals(' ')
    })
    it('test48',0, () => {
      let rule = postcss.parse('a { a: 1; b: 2 }').first as Rule
      rule.prepend({ prop: 'c', value: '3' }, { prop: 'd', value: '4' })
      expect(rule.toString()).assertDeepEquals('a { c: 3; d: 4; a: 1; b: 2 }')
      expect(rule.first?.raws.before).assertDeepEquals(' ')
    })
    it('test49',0, () => {
      let rule = postcss.parse('a { a: 1; b: 2 }').first as Rule
      rule.prepend({ prop: 'c', value: '3' })
      expect(rule.toString()).assertDeepEquals('a { c: 3; a: 1; b: 2 }')
    })
    it('test50',0, () => {
      let css = postcss.parse('a {}')
      css.prepend(postcss.parse('b {}'))
      expect(css.toString()).assertDeepEquals('b {}\na {}')
    })
    it('test53',0, () => {
      let root = postcss.parse('')
      root.prepend(new postcss.Rule({ selector: 'a' }))
      expect(root.toString()).assertDeepEquals('a {}')
    })
    it('test54',0, () => {
      let rule = postcss.parse('a { a: 1; b: 2 }').first as Rule
      rule.insertBefore(1, { prop: 'c', value: '3' })
      expect(rule.toString()).assertDeepEquals('a { a: 1; c: 3; b: 2 }')
      expect(rule.nodes[1].raws.before).assertDeepEquals(' ')
    })
    it('test55',0, () => {
      let rule = postcss.parse('a { a: 1; b: 2 }').first as Rule
      rule.insertBefore(rule.nodes[1], { prop: 'c', value: '3' })
      expect(rule.toString()).assertDeepEquals('a { a: 1; c: 3; b: 2 }')
    })
    it('test56',0, () => {
      let rule = postcss.parse('a { a: 1; b: 2 }').first as Rule
      rule.insertBefore(1, { prop: 'c', value: '3' })
      expect(rule.toString()).assertDeepEquals('a { a: 1; c: 3; b: 2 }')
    })
    it('test57',0, () => {
      let a = postcss.parse('a{ color: red; z-index: 1 }')
      let b = postcss.parse('b{ width: 1; height: 2 }')
      let aRule = a.first as Rule
      let bRule = b.first as Rule

      aRule.insertBefore(1, bRule.nodes)
      expect(a.toString()).assertDeepEquals('a{ color: red; width: 1; height: 2; z-index: 1 }')
    })
    it('test58',0, () => {
      let rule = postcss.parse('a { a: 1; b: 2 }').first as Rule
      rule.insertAfter(0, { prop: 'c', value: '3' })
      expect(rule.toString()).assertDeepEquals('a { a: 1; c: 3; b: 2 }')
      expect(rule.nodes[1].raws.before).assertDeepEquals(' ')
    })
  })
}