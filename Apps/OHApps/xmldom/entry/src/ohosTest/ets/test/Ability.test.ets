/**
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 * */

import { DOMParser, XMLSerializer, DOMImplementation } from '@xmldom/xmldom'
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'

export default function abilityTest() {
  describe('ActsAbilityTest', () => {
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

    it('parseFromString', 0, () => {
      const options: ESObject = {
        locator: {} as ESObject
      }
      const it = new DOMParser(options)
      it.parseFromString('<xml/>')
      const expected: ESObject = {
        lineNumber: 1,
        columnNumber: 1,
      }
      expect(JSON.stringify(options.locator)).assertContain(JSON.stringify(expected))

    })

    it('serializeToString', 0, () => {
      const input = `<xml xmlns='<&"' xmlns:attr='"&<'><test attr:test=""/></xml>`
      const doc = new DOMParser().parseFromString(input)
      let docStr = new XMLSerializer().serializeToString(doc)
      expect(docStr).assertEqual(`<xml xmlns="&lt;&amp;&quot;" xmlns:attr="&quot;&amp;&lt;"><test attr:test=""/></xml>`)
    })

    it('DOMImplementation', 0, () => {
      const impl = new DOMImplementation()
      const doctype = impl.createDocumentType('test', '', '')
      const doc = impl.createDocument(null, '', doctype)
      expect(doc.doctype).assertEqual(doctype)
      expect(doctype.ownerDocument).assertEqual(doc)
      expect(doc.childNodes.item(0)).assertEqual(doctype)
    })

    it('function_with_two_args_receives_key_and_message',0, () => {
      const errors: ESObject = {}
      const parser = new DOMParser({
        // currently needs to be a `function` to make the test work,
        // `jest.fn()` or using `() => {}` doesn't work
        errorHandler: (key: ESObject, msg: ESObject) => {
          errors[key] = msg
        },
      })

      parser.parseFromString("<xml attr=value/>", "text/xml")
      expect(errors['warning']!='').assertTrue()

      parser.parseFromString("<doc a1=></doc>", "text/xml")
      expect(errors['error']!='').assertTrue()

      parser.parseFromString('<xml a="1" a="2"></xml>', 'text/xml')
      expect(errors['fatalError']!='').assertTrue()
    })

    it('can_properly_set_clone', 0, () => {
      const doc1 = new DOMParser().parseFromString(
        "<doc1 attr1='1' attr2='a2'>text1<child>text2</child></doc1>",
        'text/xml'
      )
      const doc1s = new XMLSerializer().serializeToString(doc1)
      const n = doc1.cloneNode(true)
      expect(n.toString()).assertEqual(doc1s.toString())
    })

    it('can_properly_import', 0, () => {
      const doc1 = new DOMParser().parseFromString("<doc2 attr='2'/>")
      const doc2 = new DOMParser().parseFromString(
        "<doc1 attr1='1' attr2='a2'>text1<child>text2</child></doc1>",
        'text/xml'
      )

      const doc3 = new DOMParser().parseFromString(
        "<doc2 attr='2'><doc1 attr1='1' attr2='a2'>text1<child>text2</child></doc1></doc2>"
      )
      const n = doc1.importNode(doc2.documentElement, true)
      doc1.documentElement.appendChild(n)
      expect(doc1.toString()).assertEqual(doc3.toString())
      expect(doc2.toString()).not().assertEqual(doc3.toString())
    })

    it('can_properly_set_attribute', 0, () => {
      const root = new DOMParser().parseFromString(
        '<xml/>',
        'text/xml'
      ).documentElement
      root.setAttribute('a', '1')
      expect(root.getAttribute("a")).assertEqual('1')

      root.setAttribute('b', '2')
      root.setAttribute('a', '1')
      root.setAttribute('a', '1')
      root.setAttribute('a', '1')
      expect(root.attributes.length).assertEqual(2)
    })

    it('can_properly_set_ns_attribute', 0, () => {
      const root = new DOMParser().parseFromString(
        "<xml xmlns:a='a' xmlns:b='b' xmlns='e'><child/></xml>",
        'text/xml'
      ).documentElement

      root.setAttributeNS('a', 'a:a', '1')
      root.setAttributeNS('b', 'b:b', '2')
      root.setAttributeNS('b', 'b:a', '1')
      expect(root.attributes.length).assertEqual(6)
      root.setAttribute('a', '1')
      root.setAttributeNS('b', 'b:b', '2')
      expect(root.attributes.length).assertEqual(7)

    })

    it('can_properly_override_attribute', 0, () => {
      const root = new DOMParser().parseFromString(
        "<xml xmlns:a='a' xmlns:b='b' xmlns='e'><child/></xml>",
        'text/xml'
      ).documentElement
      root.setAttributeNS('a', 'a:a', '1')
      expect(root.attributes.length).assertEqual(4)
    })

    it('properly_supports_attribute_namespace', 0, () => {
      const root = new DOMParser().parseFromString(
        "<xml xmlns:a='a' xmlns:b='b' a:b='e'></xml>",
        'text/xml'
      ).documentElement
      expect(root.getAttributeNS('a', 'b')).assertEqual('e')
    })
  })
}