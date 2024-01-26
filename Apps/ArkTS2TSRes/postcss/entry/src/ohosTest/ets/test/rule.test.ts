let __generate__Id: number = 0;
function generateId(): string {
    return "rule.test_" + ++__generate__Id;
}
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import postcss from '@ohos/postcss';
export default function ruleTest() {
    describe('RuleTest', () => {
        // Defines a test suite. Two parameters are supported: test suite name and test suite function.
        beforeAll(() => {
            // Presets an action, which is performed only once before all test cases of the test suite start.
            // This API supports only one parameter: preset action function.
        });
        beforeEach(() => {
            // Presets an action, which is performed before each unit test case starts.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: preset action function.
        });
        afterEach(() => {
            // Presets a clear action, which is performed after each unit test case ends.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: clear action function.
        });
        afterAll(() => {
            // Presets a clear action, which is performed after all test cases of the test suite end.
            // This API supports only one parameter: clear action function.
        });
        it('initializes_with_properties', 0, () => {
            let rule = new postcss.Rule({ selector: 'a' });
            expect(rule.selector).assertEqual('a');
        });
        it('returns_array_in_selectors', 0, () => {
            let rule = new postcss.Rule({ selector: 'a,b' });
            expect(JSON.stringify(rule.selectors)).assertEqual('["a","b"]');
        });
        it('trims_selectors', 0, () => {
            let rule = new postcss.Rule({ selector: '.a\n, .b  , .c' });
            expect(JSON.stringify(rule.selectors)).assertEqual('[".a",".b",".c"]');
        });
        it('is_smart_about_selectors_commas', 0, () => {
            let rule = new postcss.Rule({
                selector: "[foo='a, b'], a:-moz-any(:focus, [href*=','])"
            });
            expect(JSON.stringify(rule.selectors)).assertEqual(`["[foo='a, b']","a:-moz-any(:focus, [href*=','])"]`);
        });
        it('receive_array_in_selectors', 0, () => {
            let rule = new postcss.Rule({ selector: 'i, b' });
            rule.selectors = ['em', 'strong'];
            expect(rule.selector).assertEqual('em, strong');
        });
        it('saves_separator_in_selectors', 0, () => {
            let rule = new postcss.Rule({ selector: 'i,\nb' });
            rule.selectors = ['em', 'strong'];
            expect(rule.selector).assertEqual('em,\nstrong');
        });
        it('uses_between_to_detect_separator_in_selectors', 0, () => {
            let rule = new postcss.Rule({ selector: 'b', raws: { between: '' } });
            rule.selectors = ['b', 'strong'];
            expect(rule.selector).assertEqual('b,strong');
        });
        it('uses_space_in_separator_be_default_in_selectors', 0, () => {
            let rule = new postcss.Rule({ selector: 'b' });
            rule.selectors = ['b', 'strong'];
            expect(rule.selector).assertEqual('b, strong');
        });
        it('selectors_works_in_constructor', 0, () => {
            let rule = new postcss.Rule({ selectors: ['a', 'b'] });
            expect(rule.selector).assertEqual('a, b');
        });
        it('inserts_default_spaces', 0, () => {
            let rule = new postcss.Rule({ selector: 'a' });
            expect(rule.toString()).assertEqual('a {}');
            rule.append({ prop: 'color', value: 'black' });
            expect(rule.toString()).assertEqual('a {\n    color: black\n}');
        });
        it('clones_spaces_from_another_rule', 0, () => {
            let root = postcss.parse('b{\n  }');
            let rule = new postcss.Rule({ selector: 'em' });
            root.append(rule);
            expect(root.toString()).assertEqual('b{\n  }\nem{\n  }');
        });
        it('uses_different_spaces_for_empty_rules', 0, () => {
            let root = postcss.parse('a{}\nb{\n a:1\n}');
            let rule = new postcss.Rule({ selector: 'em' });
            root.append(rule);
            expect(root.toString()).assertEqual('a{}\nb{\n a:1\n}\nem{}');
            rule.append({ prop: 'top', value: '0' });
            expect(root.toString()).assertEqual('a{}\nb{\n a:1\n}\nem{\n top:0\n}');
        });
    });
}
