let __generate__Id: number = 0;
function generateId(): string {
    return "postcss.test_" + ++__generate__Id;
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
import { Root, PluginCreator } from "@ohos/postcss/src/main/ets/components/lib/postcss";
import Processor from '@ohos/postcss/src/main/ets/components/lib/processor';
export default function postCssTest() {
    describe('postCssTest', () => {
        it('test01', 0, () => {
            let processor = postcss();
            expect(processor instanceof Processor).assertDeepEquals(true);
            expect(processor.plugins).assertDeepEquals([]);
        });
        it('test02', 0, () => {
            let a = (): void => { };
            let b = (): void => { };
            expect(postcss(a, b).plugins).assertDeepEquals([a, b]);
        });
        it('test03', 0, () => {
            let a = (): void => { };
            let b = (): void => { };
            expect(postcss([a, b]).plugins).assertDeepEquals([a, b]);
        });
        it('test04', 0, () => {
            let a = (): void => { };
            let b = (): void => { };
            let c = (): void => { };
            let other = postcss([a, b]);
            expect(postcss([other, c]).plugins).assertDeepEquals([a, b, c]);
        });
        it('test05', 0, () => {
            let a = (): void => { };
            let b = (): void => { };
            let c = (): void => { };
            let other = postcss([a, b]);
            let meta = (() => other) as PluginCreator<void>;
            meta.postcss = true;
            expect(postcss([other, c]).plugins).assertDeepEquals([a, b, c]);
        });
        it('test06', 0, () => {
            expect(postcss.parse('').type).assertDeepEquals('root');
        });
        it('test07', 0, () => {
            expect(typeof postcss.stringify).assertDeepEquals('function');
        });
        it('test08', 0, () => {
            let root = postcss.root({ raws: { after: '\n' } });
            let comment = postcss.comment({ text: 'Example' });
            let media = postcss.atRule({ name: 'media', params: 'screen' });
            let rule = postcss.rule({ selector: 'a' });
            let decl = postcss.decl({ prop: 'color', value: 'black' });
            root.append(comment);
            rule.append(decl);
            media.append(rule);
            root.append(media);
            expect(root.toString()).assertDeepEquals('/* Example */\n' +
                '@media screen {\n' +
                '    a {\n' +
                '        color: black\n' +
                '    }\n' +
                '}\n');
        });
        it('test09', 0, () => {
            let document = postcss.document();
            let root = postcss.root({ raws: { after: '\n' } });
            let comment = postcss.comment({ text: 'Example' });
            let media = postcss.atRule({ name: 'media', params: 'screen' });
            let rule = postcss.rule({ selector: 'a' });
            let decl = postcss.decl({ prop: 'color', value: 'black' });
            root.append(comment);
            rule.append(decl);
            media.append(rule);
            root.append(media);
            document.append(root);
            expect(document.toString()).assertDeepEquals('/* Example */\n' +
                '@media screen {\n' +
                '    a {\n' +
                '        color: black\n' +
                '    }\n' +
                '}\n');
        });
        it('test10', 0, () => {
            expect(postcss.list.space('a b')).assertDeepEquals(['a', 'b']);
        });
        it('test11', 0, () => {
            expect(postcss.list.space('a b')).assertDeepEquals(['a', 'b']);
        });
    });
}
