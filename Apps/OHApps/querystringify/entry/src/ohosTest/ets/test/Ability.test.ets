/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import qs from 'querystringify'
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

    it('parse', 0, () => {
      expect(JSON.stringify(qs.parse('?foo=bar'))).assertEqual('{"foo":"bar"}')
      expect(JSON.stringify(qs.parse('foo=bar&bar=foo'))).assertEqual('{"foo":"bar","bar":"foo"}')
      expect(JSON.stringify(qs.parse('foo&bar=foo'))).assertEqual('{"foo":"","bar":"foo"}')
      expect(JSON.stringify(qs.parse('#foo=bar'))).assertEqual('{"#foo":"bar"}')
    })

    it('stringify', 0, () => {
      expect(qs.stringify({
        foo: 'bar'
      }, '#')).assertEqual("#foo=bar")
      expect(qs.stringify({
        foo: ''
      }, '&')).assertEqual("&foo=")

    })
    let obj: ESObject = {
      foo: 'bar',
      bar: 'foo'
    };

    it('is_exposed_as_method',0, () => {
      expect(typeof qs.stringify).assertEqual('function');
    });

    it('transforms_an_object',0, () => {
      expect(qs.stringify(obj)).assertEqual('foo=bar&bar=foo');
    });

    it('can_prefix_with_custom_things',0, () => {
      expect(qs.stringify(obj, '&')).assertEqual('&foo=bar&bar=foo');
    });


    it('works_with_object_keys_with_empty_string_values',0, () => {
      expect(qs.stringify({ foo: '' })).assertEqual('foo=');
    });

    it('works_with_nulled_objects',0, () => {
      let obj: ESObject = {};

      obj.foo='bar';
      expect(qs.stringify(obj)).assertEqual('foo=bar');
    });

    it('transforms_undefined_into_nothing',0, () => {
      expect(qs.stringify({ foo: undefined })).assertEqual('foo=');
    });


    it('transforms_null_into_nothing',0, () => {
      expect(qs.stringify({ foo: null })).assertEqual('foo=');
    });

    it('is_exposed_as_method_parse',0, () => {
      expect(typeof qs.parse).assertEqual('function');
    });

    it('will_parse_a_querystring_to_an_object',0, () => {
      let obj: ESObject = qs.parse('foo=bar');

      expect(typeof obj).assertEqual('object');
      expect(obj.foo).assertEqual('bar');
    });

    it('will_also_work_if_querystring_is_prefixed_with',0, () => {
      let obj: ESObject = qs.parse('?foo=bar&shizzle=mynizzle');

      expect(typeof obj).assertEqual('object');
      expect(obj.foo).assertEqual('bar');
      expect(obj.shizzle).assertEqual('mynizzle');
    });

    it('does_not_overide_prototypes',0, () => {
      let obj: ESObject = qs.parse('?toString&__proto__=lol');

      expect(typeof obj).assertEqual('object');
      expect(typeof obj.toString).assertEqual('function');
    });

    it('works_with_querystring_parameters_without_values',0, () => {
      let obj: ESObject = qs.parse('?foo&bar=&shizzle=mynizzle');

      expect(typeof obj).assertEqual('object');
      expect(obj.foo).assertEqual('');
      expect(obj.bar).assertEqual('');
      expect(obj.shizzle).assertEqual('mynizzle');
    });

    it('decodes_plus_signs',0, () => {
      let obj: ESObject = qs.parse('foo+bar=baz+qux');

      expect(typeof obj).assertEqual('object');
      expect(obj['foo bar']).assertEqual('baz qux');

      obj = qs.parse('foo+bar=baz%2Bqux');

      expect(typeof obj).assertEqual('object');
      expect(obj['foo bar']).assertEqual('baz+qux');
    });

    it('does_not_throw_on_invalid_input',0, () => {
      let obj: ESObject = qs.parse('?%&');

      expect(typeof obj).assertEqual('object');
    });

    it('does_not_include_invalid_output',0, () => {
      let obj: ESObject = qs.parse('?%&');

      expect(typeof obj).assertEqual('object');
      expect(JSON.stringify(obj)).assertEqual('{}');
    });
  })
}