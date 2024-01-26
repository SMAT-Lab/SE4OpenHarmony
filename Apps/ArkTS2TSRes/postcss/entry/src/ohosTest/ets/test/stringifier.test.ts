let __generate__Id: number = 0;
function generateId(): string {
    return "stringifier.test_" + ++__generate__Id;
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
import Stringifier from '../../../../../library/src/main/ets/components/lib/stringifier';
export default function stringifierTest() {
    describe('StringifierTest', () => {
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
        let str: any;
        beforeAll(() => {
            str = new Stringifier();
        });
        it('uses_node_raw', 0, () => {
            let rule = new postcss.Rule({ selector: 'a', raws: { between: '\n' } });
            expect(str.raw(rule, 'between', 'beforeOpen')).assertEqual('\n');
        });
        it('hacks_before_for_nodes_without_parent', 0, () => {
            let rule = new postcss.Rule({ selector: 'a' });
            expect(str.raw(rule, 'before')).assertEqual('');
        });
        it('hacks_before_for_first_node', 0, () => {
            let root = new postcss.Root();
            root.append(new postcss.Rule({ selector: 'a' }));
            expect(str.raw(root.first, 'before')).assertEqual('');
        });
        it('hacks_before_for_first_decl', 0, () => {
            let decl = new postcss.Declaration({ prop: 'color', value: 'black' });
            expect(str.raw(decl, 'before')).assertEqual('');
            let rule = new postcss.Rule({ selector: 'a' });
            rule.append(decl);
            expect(str.raw(decl, 'before')).assertEqual('\n    ');
        });
        it('uses_defaults_without_parent', 0, () => {
            let rule = new postcss.Rule({ selector: 'a' });
            expect(str.raw(rule, 'between', 'beforeOpen')).assertEqual(' ');
        });
        it('uses_defaults_for_unique_node', 0, () => {
            let root = new postcss.Root();
            root.append(new postcss.Rule({ selector: 'a' }));
            expect(str.raw(root.first, 'between', 'beforeOpen')).assertEqual(' ');
        });
        it('clones_raw_from_first_node', 0, () => {
            let root = new postcss.Root();
            root.append(new postcss.Rule({ selector: 'a', raws: { between: '' } }));
            root.append(new postcss.Rule({ selector: 'b' }));
            expect(str.raw(root.last, 'between', 'beforeOpen')).assertEqual('');
        });
        it('indents_by_default', 0, () => {
            let root: any = new postcss.Root();
            root.append(new postcss.AtRule({ name: 'page' }));
            root.first.append(new postcss.Rule({ selector: 'a' }));
            root.first.first.append({ prop: 'color', value: 'black' });
            expect(root.toString()).assertEqual('@page {\n' + '    a {\n' + '        color: black\n' + '    }\n' + '}');
        });
        it('clones_style', 0, () => {
            let compress: any = postcss.parse('@page{ a{ } }');
            let spaces: any = postcss.parse('@page {\n  a {\n  }\n}');
            compress.first.first.append({ prop: 'color', value: 'black' });
            expect(compress.toString()).assertEqual('@page{ a{ color: black } }');
            spaces.first.first.append({ prop: 'color', value: 'black' });
            expect(spaces.toString()).assertEqual('@page {\n  a {\n    color: black\n  }\n}');
        });
        it('clones_indent', 0, () => {
            let root: any = postcss.parse('a{\n}');
            root.first.append({ text: 'a' });
            root.first.append({ text: 'b', raws: { before: '\n\n ' } });
            expect(root.toString()).assertEqual('a{\n\n /* a */\n\n /* b */\n}');
        });
        it('clones_declaration_before_for_comment', 0, () => {
            let root: any = postcss.parse('a{\n}');
            root.first.append({ text: 'a' });
            root.first.append({
                prop: 'a',
                value: '1',
                raws: { before: '\n\n ' }
            });
            expect(root.toString()).assertEqual('a{\n\n /* a */\n\n a: 1\n}');
        });
        it('clones_indent_by_types', 0, () => {
            let css: any = postcss.parse('a {\n  *color: black\n}\n\nb {\n}');
            css.append(new postcss.Rule({ selector: 'em' }));
            css.last.append({ prop: 'z-index', value: '1' });
            expect(css.last.first.raw('before')).assertEqual('\n  ');
        });
        it('ignores_non_space_symbols_in_indent_cloning', 0, () => {
            let css: any = postcss.parse('a {\n  color: black\n}\n\nb {\n}');
            css.append(new postcss.Rule({ selector: 'em' }));
            css.last.append({ prop: 'z-index', value: '1' });
            expect(css.last.raw('before')).assertEqual('\n\n');
            expect(css.last.first.raw('before')).assertEqual('\n  ');
        });
        it('clones_indent_by_before_and_after', 0, () => {
            let css: any = postcss.parse('@page{\n\n a{\n  color: black}}');
            css.first.append(new postcss.Rule({ selector: 'b' }));
            css.first.last.append({ prop: 'z-index', value: '1' });
            expect(css.first.last.raw('before')).assertEqual('\n\n ');
            expect(css.first.last.raw('after')).assertEqual('');
        });
        it('clones_semicolon_only_from_rules_with_children', 0, () => {
            let css = postcss.parse('a{}b{one:1;}');
            expect(str.raw(css.first, 'semicolon')).assertEqual(true);
        });
        it('clones_only_spaces_in_between', 0, () => {
            let css: any = postcss.parse('a{one/**/:1}');
            css.first.append({ prop: 'two', value: '2' });
            expect(css.toString()).assertEqual('a{one/**/:1;two:2}');
        });
        it('handles_nested_roots', 0, () => {
            let root = new postcss.Root();
            let subRoot = new postcss.Root();
            subRoot.append(new postcss.AtRule({ name: 'foo' }));
            root.append(subRoot);
            expect(root.toString()).assertEqual('@foo');
        });
        it('handles_root', 0, () => {
            let root = new postcss.Root();
            root.append(new postcss.AtRule({ name: 'foo' }));
            let s = root.toString();
            expect(s).assertEqual('@foo');
        });
        it('handles_root_with_after', 0, () => {
            let root = new postcss.Root({ raws: { after: '   ' } });
            root.append(new postcss.AtRule({ name: 'foo' }));
            let s = root.toString();
            expect(s).assertEqual('@foo   ');
        });
        it('pass_nodes_to_document', 0, () => {
            let root = new postcss.Root();
            let document = postcss.document({ nodes: [root] });
            expect(document.toString()).assertEqual('');
        });
        it('handles_document_with_one_root', 0, () => {
            let root = new postcss.Root();
            root.append(new postcss.AtRule({ name: 'foo' }));
            let document = postcss.document();
            document.append(root);
            let s = document.toString();
            expect(s).assertEqual('@foo');
        });
        it('handles_document_with_one_root_and_after_raw', 0, () => {
            let document = postcss.document();
            let root = new postcss.Root({ raws: { after: '   ' } });
            root.append(new postcss.AtRule({ name: 'foo' }));
            document.append(root);
            let s = document.toString();
            expect(s).assertEqual('@foo   ');
        });
        it('handles_document_with_one_root_and_before_and_after', 0, () => {
            let document = postcss.document();
            let root = new postcss.Root({ raws: { after: 'AFTER' } });
            root.append(new postcss.AtRule({ name: 'foo' }));
            document.append(root);
            let s = document.toString();
            expect(s).assertEqual('@fooAFTER');
        });
        it('handles_document_with_three_roots_without_raws', 0, () => {
            let root1 = new postcss.Root();
            root1.append(new postcss.AtRule({ name: 'foo' }));
            let root2 = new postcss.Root();
            root2.append(new postcss.Rule({ selector: 'a' }));
            let root3 = new postcss.Root();
            root3.append(new postcss.Declaration({ prop: 'color', value: 'black' }));
            let document = postcss.document();
            document.append(root1);
            document.append(root2);
            document.append(root3);
            let s = document.toString();
            expect(s).assertEqual('@fooa {}color: black');
        });
        it('handles_document_with_three_roots_with_before_and_after_raws', 0, () => {
            let root1 = new postcss.Root({ raws: { after: 'AFTER_ONE' } });
            root1.append(new postcss.Rule({ selector: 'a.one' }));
            let root2 = new postcss.Root({ raws: { after: 'AFTER_TWO' } });
            root2.append(new postcss.Rule({ selector: 'a.two' }));
            let root3 = new postcss.Root({ raws: { after: 'AFTER_THREE' } });
            root3.append(new postcss.Rule({ selector: 'a.three' }));
            let document = postcss.document();
            document.append(root1);
            document.append(root2);
            document.append(root3);
            let s = document.toString();
            expect(s).assertEqual('a.one {}AFTER_ONEa.two {}AFTER_TWOa.three {}AFTER_THREE');
        });
    });
}
