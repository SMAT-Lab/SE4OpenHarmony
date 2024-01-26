let __generate__Id: number = 0;
function generateId(): string {
    return "declaration.test_" + ++__generate__Id;
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
import { Rule } from '@ohos/postcss/src/main/ets/components/lib/postcss';
export default function declarationTest() {
    describe('declarationTest', () => {
        it('test01', 0, () => {
            let decl = new postcss.Declaration({ prop: 'color', value: 'black' });
            expect(decl.prop).assertDeepEquals('color');
            expect(decl.value).assertDeepEquals('black');
        });
        it('test02', 0, () => {
            let decl = new postcss.Declaration({ prop: 'color', value: 'black' });
            decl.important = true;
            expect(decl.toString()).assertDeepEquals('color: black !important');
        });
        it('test03', 0, () => {
            let decl = new postcss.Declaration({ prop: 'color', value: 'black' });
            let rule = new postcss.Rule({ selector: 'a' });
            rule.append(decl);
            expect(rule.toString()).assertDeepEquals('a {\n    color: black\n}');
        });
        it('test04', 0, () => {
            let root = postcss.parse('a{color:black}');
            let rule = root.first as Rule;
            let decl = new postcss.Declaration({ prop: 'margin', value: '0' });
            rule.append(decl);
            expect(root.toString()).assertDeepEquals('a{color:black;margin:0}');
        });
        it('test05', 0, () => {
            let decl = new postcss.Declaration({ prop: 'color', value: '1' });
            expect(decl.value).assertDeepEquals('1');
        });
        it('test06', 0, () => {
            let prop = new postcss.Declaration({ prop: '--color', value: 'black' });
            expect(prop.variable).assertDeepEquals(true);
            let sass = new postcss.Declaration({ prop: '$color', value: 'black' });
            expect(sass.variable).assertDeepEquals(true);
            let decl = new postcss.Declaration({ prop: 'color', value: 'black' });
            expect(decl.variable).assertDeepEquals(false);
        });
    });
}
