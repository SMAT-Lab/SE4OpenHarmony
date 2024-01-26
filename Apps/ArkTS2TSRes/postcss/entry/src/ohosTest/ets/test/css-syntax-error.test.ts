let __generate__Id: number = 0;
function generateId(): string {
    return "css-syntax-error.test_" + ++__generate__Id;
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
import { ProcessOptions, CssSyntaxError } from '@ohos/postcss/src/main/ets/components/lib/postcss';
function isSyntaxError(e: any): boolean {
    return e instanceof Error && e.name === 'CssSyntaxError' && e instanceof postcss.CssSyntaxError;
}
async function catchError(cb: () => Promise<any>): Promise<CssSyntaxError> {
    try {
        await cb();
    }
    catch (e) {
        if (isSyntaxError(e)) {
            return e;
        }
        else {
            throw new Error(e);
        }
    }
    throw new Error('Error was not thrown');
}
function parseError(css: string, opts?: any): CssSyntaxError {
    try {
        postcss.parse(css, opts);
    }
    catch (e) {
        if (isSyntaxError(e)) {
            return e;
        }
        else {
            throw new Error(e);
        }
    }
    throw new Error('Error was not thrown');
}
export default function cssTest() {
    describe('cssTest', () => {
        it('test01', 0, () => {
            let error = parseError('a {\n  content: "\n}');
            expect(error instanceof postcss.CssSyntaxError).assertDeepEquals(true);
            expect(error.name).assertDeepEquals('CssSyntaxError');
            expect(error.message).assertDeepEquals('<css input>:2:12: Unclosed string');
            expect(error.reason).assertDeepEquals('Unclosed string');
            expect(error.line).assertDeepEquals(2);
            expect(error.column).assertDeepEquals(12);
            expect(error.source).assertDeepEquals('a {\n  content: "\n}');
            expect(error.input).assertDeepEquals({
                line: error.line,
                column: error.column,
                source: error.source
            });
        });
        it('test02', 0, () => {
            let error = parseError('a {');
            error.source = undefined;
            expect(error.toString()).assertDeepEquals('CssSyntaxError: <css input>:1:1: Unclosed block');
        });
        it('test03', 0, () => {
            let decl = postcss.decl({ prop: 'color', value: 'black' });
            let error = decl.error('Test');
            expect(error.toString()).assertDeepEquals('CssSyntaxError: <css input>: Test');
        });
    });
}
