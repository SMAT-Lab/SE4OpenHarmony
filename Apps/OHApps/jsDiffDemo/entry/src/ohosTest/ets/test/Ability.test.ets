/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import {
  diffChars,
  diffWords,
  diffWordsWithSpace,
  diffLines,
  diffTrimmedLines,
  diffSentences,
  diffCss,
  diffJson,
  diffArrays,
  createPatch,
  createTwoFilesPatch,
  structuredPatch,
  parsePatch,
  convertChangesToXML,
  canonicalize,
  merge,
  convertChangesToDMP,
} from 'diff'

import { Options, Data, Params, Patch } from './interface'
import { getKeys, getResult } from './utils'

export default function abilityTest() {
  describe('jsDiffTest', () => {
    //-----------------------------------diffChars-------------------------------------------------
    it('diffChars_should_diff_chars', 0, () => {
      const diffResult: Data[] = diffChars('New Value.', 'New ValueMoreData.');
      expect(convertChangesToXML(diffResult)).assertEqual('New Value<ins>MoreData</ins>.');
    })
    it('diffChars_is_considered_when_there_is_no_difference', 0, () => {
      let options: Options = {
        ignoreCase: true
      }
      const diffResult: Data[] = diffChars('New Value.', 'New value.', options);
      expect(convertChangesToXML(diffResult)).assertEqual('New value.');
    })
    it('diffChars_is_considered_when_there_is_a_difference', 0, () => {
      let options: Options = {
        ignoreCase: true
      }
      const diffResult: Data[] = diffChars('New Values.', 'New value.', options);
      expect(convertChangesToXML(diffResult)).assertEqual('New value<del>s</del>.');
    })

    //-----------------------------------diffWords-------------------------------------------------
    it('diffWords_width_whitespace', 0, () => {
      const diffResult: Data[] = diffWords('New Value', 'New  ValueMoreData');
      expect(convertChangesToXML(diffResult)).assertEqual('New  <del>Value</del><ins>ValueMoreData</ins>');
    })
    it('diffWords_multiple_whitespace_value', 0, () => {
      const diffResult: Data[] = diffWords('New Value  ', 'New  ValueMoreData ');
      expect(convertChangesToXML(diffResult)).assertEqual('New  <del>Value</del><ins>ValueMoreData</ins> ');
    })
    it('diffWords_on_word_boundaries', 0, () => {
      let diffResult: Data[] = diffWords('New :Value:Test', 'New  ValueMoreData ');
      expect(convertChangesToXML(diffResult)).assertEqual('New  <del>:Value:Test</del><ins>ValueMoreData </ins>');

      diffResult = diffWords('New Value:Test', 'New  Value:MoreData ');
      expect(convertChangesToXML(diffResult)).assertEqual('New  Value:<del>Test</del><ins>MoreData </ins>');

      diffResult = diffWords('New Value-Test', 'New  Value:MoreData ');
      expect(convertChangesToXML(diffResult)).assertEqual('New  Value<del>-Test</del><ins>:MoreData </ins>');

      diffResult = diffWords('New Value', 'New  Value:MoreData ');
      expect(convertChangesToXML(diffResult)).assertEqual('New  Value<ins>:MoreData </ins>');
    })
    it('diffWords_identity_or_empty_or_identical_content', 0, () => {
      const diffResult: Data[] = diffWords('New Value', 'New Value');
      expect(convertChangesToXML(diffResult)).assertEqual('New Value');
      const diffResult_empty: Data[] = diffWords('', '');
      expect(convertChangesToXML(diffResult_empty)).assertEqual('');
      const diffResult_identical: Data[] = diffWords('New Value', 'New  Value');
      expect(convertChangesToXML(diffResult_identical)).assertEqual('New  Value');

    })
    it('diffWords_Empty_diffs', 0, () => {
      const diffResult: Data[] = diffWords('New Value', '');
      expect(diffResult.length).assertEqual(1);
      expect(convertChangesToXML(diffResult)).assertEqual('<del>New Value</del>');
      const diffResult_old_content: Data[] = diffWords('', 'New Value');
      expect(convertChangesToXML(diffResult_old_content)).assertEqual('<ins>New Value</ins>');
      const diffResult_anchor_value: Data[] = diffWords('New Value New Value', 'Value Value New New');
      expect(convertChangesToXML(diffResult_anchor_value))
        .assertEqual('<del>New</del><ins>Value</ins> Value New <del>Value</del><ins>New</ins>');
    })

    it('diffWords_should_include_count_with_identity_cases', 0, () => {
      let diff1: Data[] = [{
        value: 'foo', count: 1
      }]
      let diff2: Data[] = [{
        value: 'foo bar', count: 3
      }]
      expect(diffWords('foo', 'foo')).assertDeepEquals(diff1);
      expect(diffWords('foo bar', 'foo bar')).assertDeepEquals(diff2);
    })
    it('diffWords_should_include_count_with_empty_cases', 0, () => {
      let diff1: Data = {
        value: 'foo', count: 1, removed: true
      }
      diff1.added = undefined

      let diff2: Data = {
        value: 'foo bar', count: 3, removed: true
      }
      diff2.added = undefined
      let diff3: Data = {
        value: 'foo', count: 1, added: true
      }
      diff3.removed = undefined
      let diff4: Data = {
        value: 'foo bar', count: 3, added: true
      }
      diff4.removed = undefined
      expect(diffWords('foo', '')).assertDeepEquals([diff1]);
      expect(diffWords('foo bar', '')).assertDeepEquals([diff2]);
      expect(diffWords('', 'foo')).assertDeepEquals([diff3]);
      expect(diffWords('', 'foo bar')).assertDeepEquals([diff4]);
    })
    it('diffWords_ignore_whitespace', 0, () => {
      let diff1: Data[] = [{
        count: 5, value: 'hase igel fuchs'
      }]
      let diff2: Data[] = [{
        count: 5, value: 'hase igel fuchs\n'
      }]
      let diff3: Data[] = [{
        count: 5, value: 'hase igel fuchs\n'
      }]
      let diff4: Data[] = [{
        count: 5, value: 'hase igel\nfuchs'
      }]
      let diff5: Data[] = [{
        count: 5, value: 'hase igel fuchs'
      }]
      expect(diffWords('hase igel fuchs', 'hase igel fuchs')).assertDeepEquals(diff1);
      expect(diffWords('hase igel fuchs', 'hase igel fuchs\n')).assertDeepEquals(diff2);
      expect(diffWords('hase igel fuchs\n', 'hase igel fuchs')).assertDeepEquals(diff3);
      expect(diffWords('hase igel fuchs', 'hase igel\nfuchs')).assertDeepEquals(diff4);
      expect(diffWords('hase igel\nfuchs', 'hase igel fuchs')).assertDeepEquals(diff5);
    })
    it('diffWords_whitespace_with_flag', 0, () => {
      let options: Options = {
        ignoreWhitespace: false
      }
      const diffResult: Data[] = diffWords('New Value', 'New  ValueMoreData', options);
      expect(convertChangesToXML(diffResult)).assertEqual('New<del> Value</del><ins>  ValueMoreData</ins>');
    })
    it('diffWords_with_only_whitespace', 0, () => {
      let diffResult: Data[] = diffWords('', ' ');
      expect(convertChangesToXML(diffResult)).assertEqual('<ins> </ins>');
      diffResult = diffWords(' ', '');
      expect(convertChangesToXML(diffResult)).assertEqual('<del> </del>');
    })
    it('diffWords_async_whitespace', 0, () => {
      diffWords('New Value', 'New  ValueMoreData', (err: string | undefined, diffResult: Data[]) => {
        expect(err).assertUndefined();
        expect(convertChangesToXML(diffResult)).assertEqual('New  <del>Value</del><ins>ValueMoreData</ins>');
      });
    })

    it('diffWords_async_multiple_whitespace_values', 0, () => {
      diffWords('New Value  ', 'New  ValueMoreData ', (err: string | undefined, diffResult: Data[]) => {
        expect(err).assertUndefined();
        expect(convertChangesToXML(diffResult)).assertEqual('New  <del>Value</del><ins>ValueMoreData</ins> ');
      });
    })

    it('diffWords_async_boundary', 0, () => {
      diffWords('New :Value:Test', 'New  ValueMoreData ', (err: string | undefined, diffResult: Data[]) => {
        expect(err).assertUndefined();
        expect(convertChangesToXML(diffResult)).assertEqual('New  <del>:Value:Test</del><ins>ValueMoreData </ins>');
      });
    })

    it('diffWords_async_handle_empty', 0, () => {
      diffWords('', '', (err: string | undefined, diffResult: Data[]) => {
        expect(err).assertUndefined();
        expect(convertChangesToXML(diffResult)).assertEqual('');
      });
    })

    it('diffWords_async_identical_content', 0, () => {
      diffWords('New Value', '', (err: string | undefined, diffResult: Data[]) => {
        expect(err).assertUndefined();
        expect(convertChangesToXML(diffResult)).assertEqual('<del>New Value</del>');
      });
    })

    it('diffWords_async_empty_new_content', 0, () => {
      diffWords('New Value', 'New  Value', (err: string | undefined, diffResult: Data[]) => {
        expect(err).assertUndefined();
        expect(convertChangesToXML(diffResult)).assertEqual('New  Value');
      });
    })

    it('diffWords_async_empty_old_content', 0, () => {
      diffWords('', 'New Value', (err: string | undefined, diffResult: Data[]) => {
        expect(convertChangesToXML(diffResult)).assertEqual('<ins>New Value</ins>');
      });
    })

    it('diffWords_async_no_anchor_value', 0, () => {
      diffWords('New Value New Value', 'Value Value New New', (err: string | undefined, diffResult: Data[]) => {
        expect(convertChangesToXML(diffResult))
          .assertEqual('<del>New</del><ins>Value</ins> Value New <del>Value</del><ins>New</ins>');
      });
    })

    //-----------------------------------diffWordsWithSpace-------------------------------------------------
    it('diffWordsWithSpace_diff_whitespace', 0, () => {
      const diffResult: Data[] = diffWordsWithSpace('New Value', 'New  ValueMoreData');
      expect(convertChangesToXML(diffResult)).assertEqual('New<del> Value</del><ins>  ValueMoreData</ins>');
    })

    it('diffWordsWithSpace_multiple_whitespace_values', 0, () => {
      const diffResult: Data[] = diffWordsWithSpace('New Value  ', 'New  ValueMoreData ');
      expect(convertChangesToXML(diffResult)).assertEqual('New<ins>  ValueMoreData</ins> <del>Value  </del>');
    })

    it('diffWordsWithSpace_inserts_values_in_parenthesis', 0, () => {
      const diffResult: Data[] = diffWordsWithSpace('()', '(word)');
      expect(convertChangesToXML(diffResult)).assertEqual('(<ins>word</ins>)')
    })

    it('diffWordsWithSpace_inserts_values_in_brackets', 0, () => {
      const diffResult: Data[] = diffWordsWithSpace('[]', '[word]');
      expect(convertChangesToXML(diffResult)).assertEqual('[<ins>word</ins>]');
    })
    it('diffWordsWithSpace_inserts_values_in_curly_braces', 0, () => {
      const diffResult: Data[] = diffWordsWithSpace('{}', '{word}');
      expect(convertChangesToXML(diffResult)).assertEqual('{<ins>word</ins>}');
    })

    it('diffWordsWithSpace_inserts_values_in_quotes', 0, () => {
      const diffResult: Data[] = diffWordsWithSpace("''", "'word'");
      expect(convertChangesToXML(diffResult)).assertEqual("'<ins>word</ins>'");
    })
    it('diffWordsWithSpace_inserts_values_in_double_quotes', 0, () => {
      const diffResult: Data[] = diffWordsWithSpace('""', '"word"');
      expect(convertChangesToXML(diffResult)).assertEqual('&quot;<ins>word</ins>&quot;');
    })
    it('diffWordsWithSpace_threat_newline_as_separate_token', 0, () => {
      // #180
      const diffResult1: Data[] = diffWordsWithSpace('foo\nbar', 'foo\n\n\nbar');
      expect(convertChangesToXML(diffResult1)).assertEqual('foo\n<ins>\n\n</ins>bar');
      // #211
      const diffResult2: Data[] = diffWordsWithSpace('A\n\nB\n', 'A\nB\n');
      expect(convertChangesToXML(diffResult2)).assertEqual('A\n<del>\n</del>B\n');
    })

    it('diffWordsWithSpace_async_operations', 0, () => {
      diffWordsWithSpace('New Value  ', 'New  ValueMoreData ', (err: string | undefined, diffResult: Data[]) => {
        expect(convertChangesToXML(diffResult)).assertEqual('New<ins>  ValueMoreData</ins> <del>Value  </del>');
      });
    })
    it('diffWordsWithSpace_case_insensitivity', 0, () => {
      let options: Options = {
        ignoreCase: true
      }
      const diffResult: Data[] = diffWordsWithSpace('new value', 'New  ValueMoreData', options);
      expect(convertChangesToXML(diffResult)).assertEqual('New<del> value</del><ins>  ValueMoreData</ins>');
      const diffResult_no_difference: Data[] = diffWordsWithSpace('new value', 'New Value', options);
      expect(convertChangesToXML(diffResult_no_difference)).assertEqual('New Value');
    })
    //-----------------------------------diffLines-------------------------------------------------
    it('diffLines_should_diff_lines', 0, () => {
      const diffResult: Data[] = diffLines(
        'line\nold value\nline',
        'line\nnew value\nline');
      expect(convertChangesToXML(diffResult)).assertEqual('line\n<del>old value\n</del><ins>new value\n</ins>line');
      const diffResult1: Data[] = diffLines(
        'line\nvalue\nline',
        'line\nvalue\nline');
      expect(convertChangesToXML(diffResult1)).assertEqual('line\nvalue\nline');
      const diffResult2: Data[] = diffLines(
        'line\nvalue \nline',
        'line\nvalue\nline');
      expect(convertChangesToXML(diffResult2)).assertEqual('line\n<del>value \n</del><ins>value\n</ins>line');
      const diffResult3: Data[] = diffLines(
        'line\r\nold value \r\nline',
        'line\r\nnew value\r\nline');
      expect(convertChangesToXML(diffResult3))
        .assertEqual('line\r\n<del>old value \r\n</del><ins>new value\r\n</ins>line');
      const diffResult4: Data[] = diffLines(
        'line\n\nold value \n\nline',
        'line\n\nnew value\n\nline');
      expect(convertChangesToXML(diffResult4))
        .assertEqual('line\n\n<del>old value \n</del><ins>new value\n</ins>\nline');
      const diffResult5: Data[] = diffLines(
        'line\n\nold value \n\nline',
        '');
      expect(convertChangesToXML(diffResult5)).assertEqual('<del>line\n\nold value \n\nline</del>');

      let options: Options = {
        newlineIsToken: true
      }
      let diff1: Data = {
        value: 'restaurant', count: 1
      }
      let diff2: Data = {
        value: '\n', count: 1, added: true
      }
      diff2.removed = undefined
      let diff3: Data = {
        value: '\nhello', count: 2, added: true
      }
      diff3.removed = undefined
      expect(diffLines('restaurant', 'restaurant\n', options)).assertDeepEquals([diff1, diff2]);
      expect(diffLines('restaurant', 'restaurant\nhello', options)).assertDeepEquals([diff1, diff3]);
    })

    //-----------------------------------diffTrimmedLines-------------------------------------------------
    it('diffTrimmedLines', 0, () => {
      const diffResult: Data[] = diffTrimmedLines(
        'line\nold value\nline',
        'line\nnew value\nline');
      expect(convertChangesToXML(diffResult)).assertEqual('line\n<del>old value\n</del><ins>new value\n</ins>line');
      const diffResult1: Data[] = diffTrimmedLines(
        'line\nvalue\nline',
        'line\nvalue\nline');
      expect(convertChangesToXML(diffResult1)).assertEqual('line\nvalue\nline');
      const diffResult2: Data[] = diffTrimmedLines(
        'line\nvalue \nline',
        'line\nvalue\nline');
      expect(convertChangesToXML(diffResult2)).assertEqual('line\nvalue\nline');
      const diffResult3: Data[] = diffTrimmedLines(
        'line\r\nold value \r\nline',
        'line\r\nnew value\r\nline');
      expect(convertChangesToXML(diffResult3))
        .assertEqual('line\r\n<del>old value\r\n</del><ins>new value\r\n</ins>line');
    })

    //-----------------------------------diffSentences-------------------------------------------------
    it('diffSentences', 0, () => {
      const diffResult: Data[] = diffSentences('New Value.', 'New ValueMoreData.');
      expect(convertChangesToXML(diffResult)).assertEqual('<del>New Value.</del><ins>New ValueMoreData.</ins>');
      const diffResult1: Data[] = diffSentences('Here im. Rock you like old man.', 'Here im. Rock you like hurricane.');
      expect(convertChangesToXML(diffResult1))
        .assertEqual('Here im. <del>Rock you like old man.</del><ins>Rock you like hurricane.</ins>');
    })

    //-----------------------------------diffCss-------------------------------------------------
    it('diffCss_should_diff_css', 0, () => {
      const diffResult: Data[] = diffCss(
        '.test,#value .test{margin-left:50px;margin-right:-40px}',
        '.test2, #value2 .test {\nmargin-top:50px;\nmargin-right:-400px;\n}');
      expect(convertChangesToXML(diffResult)).assertEqual(
        '<del>.test</del><ins>.test2</ins>,<del>#value</del> <ins>#value2 </ins>.test<ins> </ins>{'
          + '<del>margin-left</del><ins>\nmargin-top</ins>:50px;<ins>\n</ins>'
          + 'margin-right:<del>-40px</del><ins>-400px;\n</ins>}');
    })

    //-----------------------------------diffJson-------------------------------------------------
    it('diffJson_should_accept_objects', 0, () => {
      let param1: Params = {
        a: 123, b: 456, c: 789
      }
      let param2: Params = {
        a: 123, b: 456
      }
      let diff1: Data = {
        count: 3, value: '{\n  "a": 123,\n  "b": 456,\n'
      }
      let diff2: Data = {
        count: 1, value: '  "c": 789\n', removed: true
      }
      diff2.added = undefined
      let diff3: Data = {
        count: 1, value: '}'
      }
      expect(diffJson(param1, param2)).assertDeepEquals([diff1, diff2, diff3]);
    })

    it('diffJson_should_accept_objects_with_different_order', 0, () => {
      let param1: Params = {
        a: 123, b: 456, c: 789
      }
      let param2: Params = {
        b: 456, a: 123
      }
      let diff1: Data = {
        count: 3, value: '{\n  "a": 123,\n  "b": 456,\n'
      }
      let diff2: Data = {
        count: 1, value: '  "c": 789\n', removed: true
      }
      diff2.added = undefined
      let diff3: Data = {
        count: 1, value: '}'
      }
      expect(diffJson(param1, param2)).assertDeepEquals([diff1, diff2, diff3]);
    })

    it('diffJson_should_accept_objects_with_nested_structures', 0, () => {
      let c1: Options = {
        foo: 'bar'
      }
      let param1: Params = {
        a: 123, b: 456, c: [1, 2, c1, 4]
      }
      let param2: Params = {
        a: 123, b: 456, c: [1, c1, 4]
      }
      let diff1: Data = {
        count: 5, value: '{\n  "a": 123,\n  "b": 456,\n  "c": [\n    1,\n'
      }
      let diff2: Data = {
        count: 1, value: '    2,\n', removed: true
      }
      diff2.added = undefined
      let diff3: Data = {
        count: 6, value: '    {\n      "foo": "bar"\n    },\n    4\n  ]\n}'
      }
      expect(diffJson(param1, param2)).assertDeepEquals([diff1, diff2, diff3]);
    })

    it('diffJson_should_accept_dates', 0, () => {
      let param1: Params = {
        a: new Date(123), b: new Date(456), c: new Date(789)
      }
      let param2: Params = {
        a: new Date(124), b: new Date(456)
      }
      let diff1: Data = {
        count: 1, value: '{\n'
      }
      let diff2: Data = {
        count: 1, value: '  "a": "1970-01-01T00:00:00.123Z",\n', removed: true
      }
      diff2.added = undefined
      let diff3: Data = {
        count: 1, value: '  "a": "1970-01-01T00:00:00.124Z",\n', added: true
      }
      diff3.removed = undefined
      let diff4: Data = {
        count: 1, value: '  "b": "1970-01-01T00:00:00.456Z",\n'
      }
      let diff5: Data = {
        count: 1, value: '  "c": "1970-01-01T00:00:00.789Z"\n', removed: true
      }
      diff5.added = undefined
      let diff6: Data = {
        count: 1, value: '}'
      }
      expect(diffJson(param1, param2)).assertDeepEquals([diff1, diff2, diff3, diff4, diff5, diff6]);
    })

    it('diffJson_should_accept_undefined_key', 0, () => {
      let param1: Params = {
        a: 123, b: 456
      }
      param1.c = null
      let param2: Params = {
        a: 123, b: 456
      }
      let param3: Params = {
        a: 123, b: 456
      }
      param3.c = undefined
      let diff1: Data = {
        count: 3, value: '{\n  "a": 123,\n  "b": 456,\n'
      }
      let diff2: Data = {
        count: 1, value: '  "c": null\n', removed: true
      }
      diff2.added = undefined
      let diff3: Data = {
        count: 1, value: '}'
      }
      let diff4: Data = {
        count: 4, value: '{\n  "a": 123,\n  "b": 456\n}'
      }
      let options: Options = {
        undefinedReplacement: false
      }
      options.undefinedReplacement = null
      expect(diffJson(param1, param2)).assertDeepEquals([diff1, diff2, diff3]);
      expect(diffJson(param3, param2)).assertDeepEquals([diff4]);
      expect(diffJson(param1, param2, options)).assertDeepEquals([diff1, diff2, diff3]);
    })

    it('diffJson_should_accept_already_stringified_JSON', 0, () => {
      let param1: Params = {
        a: 123, b: 456, c: 789
      }
      let param2: Params = {
        a: 123, b: 456
      }
      let diff1: Data = {
        count: 3, value: '{\n  "a": 123,\n  "b": 456,\n'
      }
      let diff2: Data = {
        count: 1, value: '  "c": 789\n', removed: true
      }
      diff2.added = undefined
      let diff3: Data = {
        count: 1, value: '}'
      }
      expect(diffJson(JSON.stringify(param1, undefined, '  '), JSON.stringify(param2, undefined, '  ')))
        .assertDeepEquals([diff1, diff2, diff3]);
    })

    it('diffJson_should_ignore_trailing_comma_on_the_previous', 0, () => {
      let param1: Params = {
        a: 123, b: 456, c: 789
      }
      let param2: Params = {
        a: 123, b: 456
      }
      const diffResult: Data[] = diffJson(param1, param2);
      expect(convertChangesToXML(diffResult))
        .assertDeepEquals('{\n  &quot;a&quot;: 123,\n  &quot;b&quot;: 456,\n<del>  &quot;c&quot;: 789\n</del>}');
    })

    it('diffJson_should_ignore_the_missing_trailing_comma_on_the_last_line', 0, () => {
      let param1: Params = {
        a: 123, b: 456, c: 789
      }
      let param2: Params = {
        a: 123, b: 456
      }
      const diffResult: Data[] = diffJson(param2, param1);
      expect(convertChangesToXML(diffResult))
        .assertEqual('{\n  &quot;a&quot;: 123,\n  &quot;b&quot;: 456,\n<ins>  &quot;c&quot;: 789\n</ins>}');
    })
    it('diffJson_should_accept_a_custom_JSON.stringify_replacer_function', 0, () => {
      let params1: Params = {
        a: 123
      }
      let params2: Params = {
        a: new RegExp("foo")
      }
      let params3: Params = {
        a: new RegExp("foo", "gi")
      }
      let params4: Params = {
        a: new Error('ohaider')
      }
      let params5: Params = {
        a: [new Error('ohaider')]
      }
      let diff1: Data = {
        count: 1, value: '{\n'
      }
      let diff2: Data = {
        count: 1, value: '  "a": 123\n', removed: true
      }
      diff2.added = undefined
      let diff3: Data = {
        count: 1, value: '  "a": {}\n', added: true
      }
      diff3.removed = undefined
      let diff4: Data = {
        count: 1, value: '}'
      }
      let diff5: Data = {
        count: 1, value: '  "a": "/foo/gi"\n', added: true
      }
      diff5.removed = undefined
      let diff6: Data = {
        count: 1, value: '  "a": "Error: ohaider"\n', added: true
      }
      diff6.removed = undefined
      let diff7: Data = {
        count: 3, value: '  "a": [\n    "Error: ohaider"\n  ]\n', added: true
      }
      diff7.removed = undefined
      let options1: Options = {
        stringifyReplacer: (k: Params, v: Params) => v instanceof RegExp ? v.toString() : v
      }
      let options2: Options = {
        stringifyReplacer: (k: Params, v: Params) => v instanceof Error ? `${v.name}: ${v.message}` : v
      }
      let s: Data[] = diffJson(params1, params2);
      expect(s).assertDeepEquals([diff1, diff2, diff3, diff4]);

      expect(diffJson(params1, params3, options1)).assertDeepEquals([diff1, diff2, diff5, diff4]);

      expect(diffJson(params1, params4, options2)).assertDeepEquals([diff1, diff2, diff6, diff4]);

      expect(diffJson(params1, params5, options2)).assertDeepEquals([diff1, diff2, diff7, diff4]);
    })
    //-----------------------------------diffArrays-------------------------------------------------
    it('diffArrays_should_diff_arrays', 0, () => {
      const a: Params = {
        a: 0
      }, b: Params = {
        b: 1
      }, c: Params = {
        c: 2
      };
      let diff1: Data = {
        count: 1, value: [a]
      }
      let diff2: Data = {
        count: 1, value: [c], added: true
      }
      diff2.removed = undefined
      let diff3: Data = {
        count: 1, value: [b]
      }
      let diff4: Data = {
        count: 1, value: [c], removed: true
      }
      diff4.added = undefined
      const diffResult: Data[] = diffArrays([a, b, c], [a, c, b]);
      let result = [diff1, diff2, diff3, diff4]
      expect(result).assertDeepEquals(diffResult)
    })

    it('diffArrays_should_diff_falsey_values', 0, () => {
      const a: boolean = false;
      const b: number = 0;
      const c: string = '';
      const arrayA: Array<boolean | number | string> = [c, b, a, b, a, c];
      const arrayB: Array<boolean | number | string> = [a, b, c, a, b, b, a];
      const diffResult: Data[] = diffArrays(arrayA, arrayB)

      let diff1: Data = {
        count: 2, value: [a, b], added: true
      }
      diff1.removed = undefined
      let diff2: Data = {
        count: 1, value: [c]
      }
      let diff3: Data = {
        count: 1, value: [b], removed: true
      }
      diff3.added = undefined
      let diff4: Data = {
        count: 2, value: [a, b]
      }
      let diff5: Data = {
        count: 1, value: [b], added: true
      }
      diff5.removed = undefined
      let diff6: Data = {
        count: 1, value: [a]
      }
      let diff7: Data = {
        count: 1, value: [c], removed: true
      }
      diff7.added = undefined
      let result = [diff1, diff2, diff3, diff4, diff5, diff6, diff7]
      expect(result).assertDeepEquals(diffResult)
    })

    it('diffArrays_should_diff_arrays_with_comparato', 0, () => {
      const a: Params = {
        a: 0
      }, b: Params = {
        a: 1
      }, c: Params = {
        a: 2
      }, d: Params = {
        a: 3
      };

      let options: Options = {
        comparator: comparator
      }
      const diffResult: Data[] = diffArrays([a, b, c], [a, b, d], options);

      let diff1: Data = {
        count: 2, value: [a, b]
      }
      let diff2: Data = {
        count: 1, value: [c], removed: true
      }
      diff2.added = undefined
      let diff3: Data = {
        count: 1, value: [d], added: true
      }
      diff3.removed = undefined
      let result = [diff1, diff2, diff3]
      expect(result).assertDeepEquals(diffResult)
    })

    it('diffArrays_returns_correct_deep_result_for_identical_inputs', 0, () => {
      const value: number[] = [0, 1, 2];
      let diff: Data = {
        count: value.length, value: value
      }
      const expected = [diff];
      const input = value.slice();
      const diffResult: Data[] = diffArrays(input, input);
      expect(diffResult).assertDeepEquals(expected);
    })

    it('createPatch', 0, () => {
      expect(createPatch('test', 'line2\nline3\nline5\n', 'line2\nline3\nline4\nline5\n', 'header1', 'header2'))
        .assertEqual(
          'Index: test\n'
            + '===================================================================\n'
            + '--- test\theader1\n'
            + '+++ test\theader2\n'
            + '@@ -1,3 +1,4 @@\n'
            + ' line2\n'
            + ' line3\n'
            + '+line4\n'
            + ' line5\n');
    })
    it('createTwoFilesPatch', 0, () => {
      const expectedResult =
        '===================================================================\n'
          + '--- foo\n'
          + '+++ bar\n';
      const diffResult: string = createTwoFilesPatch('foo', 'bar', '', '');
      expect(diffResult).assertEqual(expectedResult);
    })

    it('structuredPatch', 0, () => {
      const res: Patch | undefined = structuredPatch(
        'oldfile', 'newfile',
        'line2\nline3\nline4\n', 'line2\nline3\nline5',
        'header1', 'header2'
      );
      const result: Patch = {
        oldFileName: 'oldfile',
        newFileName: 'newfile',
        oldHeader: 'header1',
        newHeader: 'header2',
        hunks: [{
          oldStart: 1,
          oldLines: 3,
          newStart: 1,
          newLines: 3,
          lines: [' line2', ' line3', '-line4', '+line5', '\\ No newline at end of file']
        }]
      };
      expect(JSON.stringify(res)).assertEqual(JSON.stringify(result));
    })

    it('parsePatch', 0, () => {
      let result = getResult()
      const patch: Patch[] = parsePatch(
        'Index: test\n'
          + '===================================================================\n'
          + '--- test\theader1\n'
          + '+++ test\theader2\n'
          + '@@ -1,3 +1,4 @@\n'
          + ' line2\n'
          + ' line3\n'
          + '+line4\n'
          + ' line5\n');
      expect(JSON.stringify(result)).assertEqual(JSON.stringify(patch))
    })

    it('convertChangesToXML', 0, () => {
      const result = "<del>beep</del><ins>beepboob</ins> <del>boop   afff测试</del><ins>2022真热</ins>样本<del>one1</del><ins> e </ins>"
      const one = 'beep boop   afff测试样本one1';
      const other = 'beepboob 2022真热样本 e ';
      const diff: Data[] = diffWords(one, other);
      const patch: string = convertChangesToXML(diff);
      expect(result).assertEqual(patch)
    })

    it('convertChangesToDMP', 0, () => {
      const diffResult: Data[] = diffWords('New Value  ', 'New  ValueMoreData ');
      expect(JSON.stringify(convertChangesToDMP(diffResult)))
        .assertEqual(JSON.stringify([[0, 'New  '], [-1, 'Value'], [1, 'ValueMoreData'], [0, ' ']]));
    })

    it('merge', 0, () => {
      let result: Patch = {
        hunks: [
          {
            oldStart: 1,
            oldLines: 2,
            newStart: 1,
            newLines: 4,
            lines: [
              ' foo',
              '+bar',
              ' baz',
              '+bat'
            ]
          }
        ]
      }
      expect(JSON.stringify(merge('foo\nbar\nbaz\n', 'foo\nbaz\nbat\n', 'foo\nbaz\n')))
        .assertEqual(JSON.stringify(result));
    })

    //-----------------------------------canonicalize-------------------------------------------------
    it('canonicalize_should_put_the_keys_in_canonical_order', 0, () => {
      let param: Params = {
        b: 456, a: 123
      }
      let result: Params = canonicalize(param, null, null);
      expect(getKeys(result)).assertDeepEquals(['a', 'b']);
    })

    it('canonicalize_should_dive_into_nested_objects', 0, () => {
      let param1: Params = {
        d: 123, c: 456
      }
      let param2: Params = {
        b: 456, a: param1
      }
      const canonicalObj: Params = canonicalize(param2, null, null);
      expect(getKeys(canonicalObj.a as Params)).assertDeepEquals(['c', 'd']);
    })
    it('canonicalize_should_dive_into_nested_arrays', 0, () => {
      let param1: Params = {
        d: 123, c: 456
      }
      let param2: Params = {
        b: 456, a: [789, param1]
      }
      const canonicalObj: Params = canonicalize(param2, null, null);
      if(canonicalObj.a !== undefined) {
        expect(getKeys(canonicalObj.a[1] as Params)).assertDeepEquals(['c', 'd']);
      }
    })
    it('canonicalize_should_handle_circular_references_correctly', 0, () => {
      const obj: Params = {
        b: 456
      };
      obj.a = obj;
      const canonicalObj: Params = canonicalize(obj, null, null);
      expect(getKeys(canonicalObj)).assertDeepEquals(['a', 'b']);
      expect(getKeys(canonicalObj.a as Params)).assertDeepEquals(['a', 'b']);
    })
  })
}

function comparator(left: Params, right: Params): boolean {
  return left.a === right.a;
}