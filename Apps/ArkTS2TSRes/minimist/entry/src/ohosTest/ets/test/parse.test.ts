let __generate__Id: number = 0;
function generateId(): string {
    return "parse.test_" + ++__generate__Id;
}
/**
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * */
import { describe, it, expect } from '@ohos/hypium';
import parse from 'minimist';
export default function parseTest() {
    describe('minimist_parse', () => {
        it('flag_boolean', 0, () => {
            let argv: any = parse(['-t', 'moo'], { boolean: 't', string: "_" });
            expect(argv).assertDeepEquals({ t: true, _: ['moo'] });
            expect(typeof argv.t).assertEqual('boolean');
        });
        it('flag_boolean_value', 0, () => {
            let argv: any = parse(['--verbose', 'false', 'moo', '-t', 'true'], {
                boolean: ['t', 'verbose'], string: "_",
                default: {
                    verbose: true
                }
            });
            expect(argv).assertDeepEquals({
                verbose: false,
                t: true,
                _: ['moo']
            });
            expect(typeof argv.verbose).assertEqual('boolean');
            expect(typeof argv.t).assertEqual('boolean');
        });
        it('stringArgs', 0, () => {
            let s: any = parse(['  ', '  '], {
                string: '_', boolean: "t"
            })._;
            expect(s.length).assertEqual(2);
            expect(typeof s[0]).assertEqual('string');
            expect(s[0]).assertEqual('  ');
            expect(typeof s[1]).assertEqual('string');
            expect(s[1]).assertEqual('  ');
        });
    });
}
