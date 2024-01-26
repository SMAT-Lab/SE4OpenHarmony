let __generate__Id: number = 0;
function generateId(): string {
    return "node.test_" + ++__generate__Id;
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
import { AnyNode, AtRule, Root, Rule, CssSyntaxError, Declaration, parse, Result, Plugin, Document } from '@ohos/postcss/src/main/ets/components/lib/postcss';
function stringify(node: AnyNode, builder: (str: string) => void): void {
    if (node.type === 'rule') {
        builder(node.selector);
    }
}
export default function nodeTest() {
    describe('nodeTest', () => {
        it('test01', 0, () => {
            let rule = new postcss.Rule({ selector: 'a' });
            let error = rule.error('Test');
            expect(error.message).assertDeepEquals('<css input>: Test');
        });
        it('test02', 0, () => {
            let root = postcss.parse('a { b: c }');
            let a = root.first as Rule;
            let b = a.first as Declaration;
            let error = b.error('Bad semicolon', { index: 1 });
            expect(error.showSourceCode(false)).assertDeepEquals('> 1 | a { b: c }\n' + '    |      ^');
        });
        it('test03', 0, () => {
            let root = postcss.parse('a { color: x red }');
            let a = root.first as Rule;
            let color = a.first as Declaration;
            let error = color.error('Wrong color', { word: 'x' });
            expect(error.showSourceCode(false)).assertDeepEquals('> 1 | a { color: x red }\n' + '    |            ^');
        });
        it('test04', 0, () => {
            let root = postcss.parse('a { color: red\n           x }');
            let a = root.first as Rule;
            let color = a.first as Declaration;
            let error = color.error('Wrong color', { word: 'x' });
            expect(error.showSourceCode(false)).assertDeepEquals('  1 | a { color: red\n' + '> 2 |            x }\n' + '    |            ^');
        });
        it('test05', 0, () => {
            let rule = new postcss.Rule({ selector: 'a' });
            rule.append({ prop: 'color', value: 'black' });
            rule.append({ prop: 'width', value: '1px' });
            rule.append({ prop: 'height', value: '1px' });
            let node = new postcss.Declaration({ prop: 'min-width', value: '1px' });
            let width = rule.nodes[1];
            let result = width.replaceWith(node);
            expect(result).assertDeepEquals(width);
            expect(rule.toString()).assertDeepEquals('a {\n' +
                '    color: black;\n' +
                '    min-width: 1px;\n' +
                '    height: 1px\n' +
                '}');
        });
        it('test06', 0, () => {
            let root = new postcss.Root();
            root.append(new postcss.AtRule({ name: 'import', params: '"a.css"' }));
            let a = new postcss.Root();
            a.append(new postcss.Rule({ selector: 'a' }));
            a.append(new postcss.Rule({ selector: 'b' }));
            root.first?.replaceWith(a);
            expect(root.toString()).assertDeepEquals('a {}\nb {}');
        });
        it('test07', 0, () => {
            let css = postcss.parse('a{one:1;two:2}');
            let a = css.first as Rule;
            let one = a.first as Declaration;
            let result = one.replaceWith({ prop: 'fix', value: 'fixed' });
            expect(result.prop).assertDeepEquals('one');
            expect(result.parent).assertUndefined();
            expect(css.toString()).assertDeepEquals('a{fix:fixed;two:2}');
        });
        it('test08', 0, () => {
            class b {
                prop: string = '';
                value: string = '';
            }
            let css = postcss.parse('a{one:1;two:2}');
            let a = css.first as Rule;
            let one = a.first as Declaration;
            let beforeDecl: b = { prop: 'fix1', value: 'fixedOne' };
            let afterDecl: b = { prop: 'fix2', value: 'fixedTwo' };
            one.replaceWith(beforeDecl, one, afterDecl);
            expect(css.toString()).assertDeepEquals('a{fix1:fixedOne;one:1;fix2:fixedTwo;two:2}');
        });
        it('test09', 0, () => {
            expect(new postcss.Rule({ selector: 'a' }).toString(stringify)).assertDeepEquals('a');
        });
        it('test10', 0, () => {
            expect(new postcss.Rule({ selector: 'a' }).toString({ stringify })).assertDeepEquals('a');
        });
        it('test11', 0, () => {
            let decl = new postcss.Declaration({ prop: 'white-space', value: 'overflow-wrap' });
            expect(decl.prop).assertDeepEquals('white-space');
            expect(decl.value).assertDeepEquals('overflow-wrap');
            decl.assign({ prop: 'word-wrap', value: 'break-word' });
            expect(decl.prop).assertDeepEquals('word-wrap');
            expect(decl.value).assertDeepEquals('break-word');
        });
        it('test12', 0, () => {
            let rule = new postcss.Rule({ selector: 'a' });
            rule.append({ prop: 'color', value: '/**/black' });
            let clone = rule.clone();
            expect(clone.parent).assertUndefined();
            expect(rule.first?.parent).assertDeepEquals(rule);
            expect(clone.first?.parent).assertDeepEquals(clone);
        });
        it('test13', 0, () => {
            let rule = new postcss.Rule({ selector: 'a' });
            let clone = rule.clone({ selector: 'b' });
            expect(clone.selector).assertDeepEquals('b');
        });
        it('test14', 0, () => {
            let css = postcss.parse('@page 1{a{color:black;}}');
            expect(css.clone().toString()).assertDeepEquals('@page 1{a{color:black;}}');
        });
        it('test15', 0, () => {
            let rule = new postcss.Rule({ selector: 'a', raws: { after: '' } });
            rule.append({ prop: 'z-index', value: '1', raws: { before: '' } });
            let result = rule.first?.cloneBefore({ value: '2' } as any);
            expect(result).assertDeepEquals(rule.first);
            expect(rule.toString()).assertDeepEquals('a {z-index: 2;z-index: 1}');
        });
        it('test16', 0, () => {
            let rule = new postcss.Rule({ selector: 'a', raws: { after: '' } });
            rule.append({ prop: 'z-index', value: '1', raws: { before: '' } });
            let result = rule.first?.cloneAfter({ value: '2' } as any);
            expect(result).assertDeepEquals(rule.last);
            expect(rule.toString()).assertDeepEquals('a {z-index: 1;z-index: 2}');
        });
        it('test19', 0, () => {
            let css = postcss.parse('a{one:1;two:2}');
            let a = css.first as Rule;
            expect(a.first?.next()).assertDeepEquals(a.last);
            expect(a.last?.next()).assertUndefined();
        });
        it('test20', 0, () => {
            let css = postcss.parse('');
            expect(css.next()).assertUndefined();
        });
        it('test21', 0, () => {
            let css = postcss.parse('a{one:1;two:2}');
            let a = css.first as Rule;
            expect(a.last?.prev()).assertDeepEquals(a.first);
            expect(a.first?.prev()).assertUndefined();
        });
        it('test22', 0, () => {
            let css = postcss.parse('');
            expect(css.prev()).assertUndefined();
        });
        it('test23', 0, () => {
            let rule = new postcss.Rule({ selector: 'a' });
            rule.append({ prop: 'color', value: 'b' });
            let json: any = rule.toJSON() as any;
            expect(json.parent).assertUndefined();
            expect(json.nodes[0].parent).assertUndefined();
            expect(JSON.stringify(rule)).assertDeepEquals('{"raws":{},"selector":"a","type":"rule","nodes":[' +
                '{"raws":{},"prop":"color","value":"b","type":"decl"}' +
                '],"inputs":[]}');
        });
        it('test24', 0, () => {
            let root: any = new postcss.Root() as any;
            root._cache = [1];
            root._hack = {
                toJSON() {
                    return 'hack';
                }
            };
            expect(root.toJSON()).assertDeepEquals({
                type: 'root',
                nodes: [],
                raws: {},
                _hack: 'hack',
                inputs: [],
                _cache: [1]
            });
        });
        it('test25', 0, () => {
            let rule = new postcss.Rule({ selector: 'a' });
            expect(rule.raw('before')).assertDeepEquals('');
        });
        it('test26', 0, () => {
            let css = postcss.parse('@page{a{color:black}}');
            let page = css.first as AtRule;
            let a = page.first as Rule;
            let color = a.first as Declaration;
            expect(color.root()).assertDeepEquals(css);
        });
        it('test27', 0, () => {
            let rule = new postcss.Rule({ selector: 'a' });
            rule.append({ prop: 'color', value: 'black' });
            expect(rule.first?.root()).assertDeepEquals(rule);
        });
        it('test28', 0, () => {
            let rule = new postcss.Rule({ selector: 'a' });
            expect(rule.root()).assertDeepEquals(rule);
        });
        it('test29', 0, () => {
            let css = postcss.parse('@page{a{color:black}}');
            css.cleanRaws();
            expect(css.toString()).assertDeepEquals('@page {\n    a {\n        color: black\n    }\n}');
            let page = css.first as AtRule;
            let a = page.first as Rule;
            let color = a.first as Declaration;
            expect(page.raws.before).assertUndefined();
            expect(color.raws.before).assertUndefined();
            expect(page.raws.between).assertUndefined();
            expect(color.raws.between).assertUndefined();
            expect(page.raws.after).assertUndefined();
        });
        it('test31', 0, () => {
            let css = postcss.parse('a {  one: X  }');
            let a = css.first as Rule;
            let one = a.first as Declaration;
            expect(one.positionInside(6)).assertDeepEquals({ line: 1, column: 12 });
        });
        it('test32', 0, () => {
            let css = postcss.parse('a {\n  one: X}');
            let a = css.first as Rule;
            let one = a.first as Declaration;
            expect(one.positionInside(6)).assertDeepEquals({ line: 2, column: 9 });
        });
        it('test33', 0, () => {
            let css = postcss.parse('a {\n\tone: 1\n\t\tX\n3}');
            let a = css.first as Rule;
            let one = a.first as Declaration;
            expect(one.positionInside(10)).assertDeepEquals({ line: 3, column: 4 });
        });
    });
}
