let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
}
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import adler32 from 'adler-32';
let o = "foo bar baz٪☃🍣";
let m = "foobar";
for (let i = 0; i != 11; ++i)
    m += m;
let m1 = m + m, m2 = m1 + m1, m3 = m2 + m2, m4 = m3 + m3;
let M1 = m + "𝑹" + m, M2 = M1 + "𝐀" + M1, M3 = M2 + "𝓜" + M2, M4 = M3 + "𝙖" + M3;
let bits = [
    ["Wikipedia", 300286872, 1],
    ["foo bar baz", 398066679, 1],
    ["foo bar baz٪", 570688890],
    ["foo bar baz٪☃", 919275383],
    [m, -747910882, 1],
    [m1, 1286443594, 1],
    [m2, 812328098, 1],
    [m3, -1124316861, 1],
    [m4, -357657979, 1],
    [M1, -792947423],
    [M2, -1841877779],
    [M3, 869751957],
    [M4, -1344947227],
    [o, 1543572022],
    [o + o, -2076896149],
    [o + o + o, 2023497376]
];
export default function abilityTest() {
    describe('adler32Test', () => {
        beforeAll(() => {
        });
        beforeEach(() => {
        });
        afterEach(() => {
        });
        afterAll(() => {
        });
        it('buf_function_test', 0, () => {
            let pam = [
                1, 23, 56, 2, 43, 98, 15, 87, 56, 120
            ];
            let result = 130417142;
            let adler32Result = adler32.buf(pam);
            expect(result).assertEqual(adler32Result);
        });
        it('bstr_function_test', 0, () => {
            let pam = "SheetJS";
            let result = 176947863;
            let adler32Result = adler32.bstr(pam);
            expect(result).assertEqual(adler32Result);
        });
        it('bstr_ucs_2function_test', 0, () => {
            let pam = "\u2603";
            let result = 262148;
            let adler32Result = adler32.bstr(pam);
            expect(result).assertEqual(adler32Result);
        });
        it('str_function_test', 0, () => {
            let pam = "foo bar baz٪☃🍣";
            let result = 1543572022;
            let adler32Result = adler32.str(pam);
            expect(result).assertEqual(adler32Result);
        });
        it('version_function_test', 0, () => {
            let result = "1.3.1";
            let adler32Result = adler32.version;
            expect(result).assertEqual(adler32Result);
        });
    });
    describe('adler32Test_example', () => {
        for (let p = 0; p < bits.length; p++) {
            let i = bits[p];
            let msg: string | number = i[0], l: number = i[0].toString().length;
            if (l > 20) {
                msg = i[0].toString().substr(0, 5) + "...(" + l + ")..." + i[0].toString().substr(-5);
            }
            ;
            if (l > 100) {
                return;
            }
            it(msg.toString(), 0, () => {
                if (i[2] === 1) {
                    expect(Number(i[1]) | 0).assertEqual(adler32.bstr(i[0].toString()));
                }
                expect(Number(i[1]) | 0).assertEqual(adler32.str(i[0].toString()));
                let len: number = new String(i[0]).length, step = len < 20000 ? 1 : len < 50000 ? Math.ceil(len / 20000) : Math.ceil(len / 2000);
                for (let x = 0; x < len; x += step) {
                    if (i[0].toString().charCodeAt(x) >= 0xD800 && i[0].toString().charCodeAt(x) < 0xE000)
                        continue;
                    if (i[2] === 1) {
                        let bstradl = adler32.bstr(i[0].toString().substr(x), adler32.bstr(i[0].toString().substr(0, x)));
                        expect(Number(i[1]) | 0).assertEqual(bstradl);
                    }
                    let stradl = adler32.str(i[0].toString().substr(x), adler32.str(i[0].toString().substr(0, x)));
                    expect(Number(i[1]) | 0).assertEqual(stradl);
                }
            });
        }
    });
}
