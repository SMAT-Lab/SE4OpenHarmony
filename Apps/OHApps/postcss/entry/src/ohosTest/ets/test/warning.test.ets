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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import postcss from '@ohos/postcss'

export default function warningTest() {
  describe('WarningTest', () => {
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

    it('outputs_simple_warning',0,  () => {
      let warning = new postcss.Warning('text');
      expect(warning.toString()).assertEqual('text');
    })

    it('outputs_warning_with_plugin',0, () => {
      let warning = new postcss.Warning('text', { plugin: 'plugin' })
      expect(warning.toString()).assertEqual('plugin: text')
    })

    it('outputs_warning_with_position',0, () => {
      let root = postcss.parse('a{}')
      let warning = new postcss.Warning('text', { node: root.first })
      expect(warning.toString()).assertEqual('<css input>:1:1: text')
    })
    //
    it('generates_warning_without_source',0, () => {
      let node: ESObject = postcss.decl({ prop: 'color', value: 'black' })
      let warning = new postcss.Warning('text', { node })
      expect(warning.toString()).assertEqual('<css input>: text')
    })

    it('has_line_and_column_is_undefined_by_default',0, () => {
      let warning = new postcss.Warning('text')
      expect(warning.line).assertUndefined()
      expect(warning.column).assertUndefined()
    })

    it('gets_position_from_node',0, () => {
      let root = postcss.parse('a{}')
      let warning = new postcss.Warning('text', { node: root.first })
      expect(warning.line).assertEqual(1)
      expect(warning.column).assertEqual(1)
    })

    it('gets_position_from_word',0, () => {
      let root = postcss.parse('a b{}')
      let warning = new postcss.Warning('text', { node: root.first, word: 'b' })
      expect(warning.line).assertEqual(1)
      expect(warning.column).assertEqual(3)
    })

    it('gets_position_from_index',0, () => {
      let root = postcss.parse('a b{}')
      let warning = new postcss.Warning('text', { node: root.first, index: 2 })
      expect(warning.line).assertEqual(1)
      expect(warning.column).assertEqual(3)
    })
  })
}
