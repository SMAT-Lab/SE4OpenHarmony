let __generate__Id: number = 0;
function generateId(): string {
    return "parse.test_" + ++__generate__Id;
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
import { Declaration, AtRule, Root, Rule } from '@ohos/postcss/src/main/ets/components/lib/postcss';
export default function parseTest() {
    describe('parseTest', () => {
        it('test01', 0, () => {
            let css = postcss.parse('\uFEFF@host { a {\f} }');
            expect(css.nodes[0].raws.before).assertDeepEquals('');
        });
        it('test02', 0, () => {
            let css = postcss.parse('\uFEFF@host { a {\f} }');
            expect(css.first?.source?.input.hasBOM).assertDeepEquals(true);
        });
        it('test03', 0, () => {
            let css = postcss.parse('@host { a {\f} }');
            expect(css.first?.source?.input.hasBOM).assertDeepEquals(false);
        });
        it('test04', 0, () => {
            let css = postcss.parse('a {}', { from: 'http://example.com/a.css' });
            expect(css.first?.source?.input.file).assertDeepEquals('http://example.com/a.css');
            expect(css.first?.source?.input.from).assertDeepEquals('http://example.com/a.css');
        });
        it('test06', 0, () => {
            let root = postcss.parse('a { p: ()) }');
            let a = root.first as Rule;
            let decl = a.first as Declaration;
            expect(decl.value).assertDeepEquals('())');
        });
        it('test07', 0, () => {
            let root = postcss.parse(':root { --x { color: pink; }; }');
            let rule = root.first as Rule;
            let prop = rule.first as Rule;
            expect(prop.selector).assertDeepEquals('--x');
        });
        it('test08', 0, () => {
            let root = postcss.parse('a { :one: 1 }');
            let a = root.first as Rule;
            let prop = a.first as Declaration;
            expect(prop.raws.before).assertDeepEquals(' :');
        });
        it('test09', 0, () => {
            expect(postcss.parse('a { };;').toString()).assertDeepEquals('a { };;');
        });
    });
}
