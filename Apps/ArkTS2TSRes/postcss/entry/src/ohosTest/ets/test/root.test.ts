let __generate__Id: number = 0;
function generateId(): string {
    return "root.test_" + ++__generate__Id;
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import postcss from '@ohos/postcss';
export default function rootTest() {
    describe('RootTest', () => {
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
        it('append_sets_new_line_between_rules_in_multiline_files', 0, () => {
            let a = postcss.parse('a {}\n\na {}\n');
            let b = postcss.parse('b {}\n');
            expect(a.append(b).toString()).assertDeepEquals('a {}\n\na {}\n\nb {}\n');
        });
        it('fixes_spaces_on_removing_first_rule', 0, () => {
            let css = postcss.parse('a{}\nb{}\n');
            if (!css.first)
                throw new Error('No nodes were parsed');
            css.first.remove();
            expect(css.toString()).assertDeepEquals('b{}\n');
        });
        it('keeps_spaces_on_moving_root', 0, () => {
            let css1 = postcss.parse('a{}\nb{}\n');
            let css2 = postcss.parse('');
            css2.append(css1);
            expect(css2.toString()).assertDeepEquals('a{}\nb{}');
            let css3 = postcss.parse('\n');
            css3.append(css2.nodes);
            expect(css3.toString()).assertDeepEquals('a{}\nb{}\n');
        });
    });
}
