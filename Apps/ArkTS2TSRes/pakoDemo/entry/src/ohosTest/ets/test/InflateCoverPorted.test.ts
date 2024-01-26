let __generate__Id: number = 0;
function generateId(): string {
    return "InflateCoverPorted.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import { inflate, inflateEnd } from './utils';
import { inflate_table } from './utils';
import pako from 'pako';
import { onTypeOf6, onTypeOf9 } from './IntertfaceData';
export default function InflateCoverPortedTest() {
    // fromCharCode, but understands right > 0xffff values
    describe('inflatecoverportedTest', () => {
        let c: pako.constants = pako.constants;
        beforeAll(() => {
        });
        beforeEach(() => {
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
        let h2b = (hex: string) => {
            return hex.split(' ').map((hx) => {
                return Number.parseInt(hx, 16);
            });
        };
        //step argument from original tests is missing because it have no effect
        //we have similar behavior in chunks.js tests
        let testInflate = (hex: string, wbits: number, status: number) => {
            let inflator: pako.Inflate;
            try {
                inflator = new pako.Inflate(onTypeOf6(wbits));
            }
            catch (e) {
                return;
            }
            inflator.push(new Uint8Array(h2b(hex)));
            expect(inflator.err).assertDeepEquals(status);
        };
        it('inflatebadparameters', 0, () => {
            let ret: number = inflate(null, 0);
            expect(ret).assertDeepEquals(c.Z_STREAM_ERROR);
            ret = inflateEnd(null);
            expect(ret).assertDeepEquals(c.Z_STREAM_ERROR);
        });
        it('badgzipmethod', 1, () => {
            testInflate('1f 8b 0 0', 31, c.Z_DATA_ERROR);
        });
        it('badgzipflags', 2, () => {
            testInflate('1f 8b 8 80', 31, c.Z_DATA_ERROR);
        });
        it('badzlibmethod', 3, () => {
            testInflate('77 85', 15, c.Z_DATA_ERROR);
        });
        it('setwindowsizefromheader', 4, () => {
            testInflate('8 99', 0, c.Z_OK);
        });
        it('badzlibwindowsize', 5, () => {
            testInflate('78 9c', 8, c.Z_DATA_ERROR);
        });
        it('checkadler32', 6, () => {
            testInflate('78 9c 63 0 0 0 1 0 1', 15, c.Z_OK);
        });
        it('badheadercrc', 7, () => {
            testInflate('1f 8b 8 1e 0 0 0 0 0 0 1 0 0 0 0 0 0', 47, c.Z_DATA_ERROR);
        });
        it('checkgziplength', 8, () => {
            testInflate('1f 8b 8 2 0 0 0 0 0 0 1d 26 3 0 0 0 0 0 0 0 0 0', 47, c.Z_OK);
        });
        it('badzlibheadercheck', 9, () => {
            testInflate('78 90', 47, c.Z_DATA_ERROR);
        });
        it('needdictionary', 10, () => {
            testInflate('8 b8 0 0 0 1', 8, c.Z_NEED_DICT);
        });
        it('computeadler32', 11, () => {
            testInflate('78 9c 63 0', 15, c.Z_OK);
        });
        it('invalidstoredblocklengths', 12, () => {
            testInflate('0 0 0 0 0', -15, c.Z_DATA_ERROR);
        });
        it('fixed', 13, () => {
            testInflate('3 0', -15, c.Z_OK);
        });
        it('invalidblocktype', 14, () => {
            testInflate('6', -15, c.Z_DATA_ERROR);
        });
        it('stored', 15, () => {
            testInflate('1 1 0 fe ff 0', -15, c.Z_OK);
        });
        it('toomanylengthordistancesymbols', 16, () => {
            testInflate('fc 0 0', -15, c.Z_DATA_ERROR);
        });
        it('invalidcodelengthsset', 17, () => {
            testInflate('4 0 fe ff', -15, c.Z_DATA_ERROR);
        });
        it('invalidbitlengthrepeat1', 18, () => {
            testInflate('4 0 24 49 0', -15, c.Z_DATA_ERROR);
        });
        it('invalidbitlengthrepeat2', 19, () => {
            testInflate('4 0 24 e9 ff ff', -15, c.Z_DATA_ERROR);
        });
        it('invalidcodemissingendofblock', 20, () => {
            testInflate('4 0 24 e9 ff 6d', -15, c.Z_DATA_ERROR);
        });
        it('invalidliterallengthsset', 21, () => {
            testInflate('4 80 49 92 24 49 92 24 71 ff ff 93 11 0', -15, c.Z_DATA_ERROR);
        });
        it('invalidliterallengthcode', 22, () => {
            testInflate('4 80 49 92 24 49 92 24 f b4 ff ff c3 84', -15, c.Z_DATA_ERROR);
        });
        it('invaliddistancecode', 23, () => {
            testInflate('2 7e ff ff', -15, c.Z_DATA_ERROR);
        });
        it('invaliddistancetoofarback', 24, () => {
            testInflate('c c0 81 0 0 0 0 0 90 ff 6b 4 0', -15, c.Z_DATA_ERROR);
        });
        it('incorrectdatacheck', 25, () => {
            testInflate('1f 8b 8 0 0 0 0 0 0 0 3 0 0 0 0 1', 47, c.Z_DATA_ERROR);
        });
        it('incorrectlengthcheck', 26, () => {
            testInflate('1f 8b 8 0 0 0 0 0 0 0 3 0 0 0 0 0 0 0 0 1', 47, c.Z_DATA_ERROR);
        });
        it('pull17', 27, () => {
            testInflate('5 c0 21 d 0 0 0 80 b0 fe 6d 2f 91 6c', -15, c.Z_OK);
        });
        it('longcode', 28, () => {
            testInflate('5 e0 81 91 24 cb b2 2c 49 e2 f 2e 8b 9a 47 56 9f fb fe ec d2 ff 1f', -15, c.Z_OK);
        });
        it('lengthextra', 29, () => {
            testInflate('ed c0 1 1 0 0 0 40 20 ff 57 1b 42 2c 4f', -15, c.Z_OK);
        });
        it('longdistanceandextra', 30, () => {
            testInflate('ed cf c1 b1 2c 47 10 c4 30 fa 6f 35 1d 1 82 59 3d fb be 2e 2a fc f c', -15, c.Z_OK);
        });
        it('windowend', 31, () => {
            testInflate('ed c0 81 0 0 0 0 80 a0 fd a9 17 a9 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 6', -15, c.Z_OK);
        });
        it('inflatefastTYPEreturn', 31, () => {
            testInflate('2 8 20 80 0 3 0', -15, c.Z_OK);
        });
        it('windowwrap', 32, () => {
            testInflate('63 18 5 40 c 0', -8, c.Z_OK);
        });
        it('inflatetablenotenougherrors', 33, () => {
            let ret: Function, bits: number, next: Array<number>, table: Array<number> = [], lens: Array<number> = [], work: Array<number | string> = [];
            const DISTS = 2;
            /* we need to call inflate_table() directly in order to manifest not-
             enough errors, since zlib insures that enough is always enough */
            for (bits = 0; bits < 15; bits++) {
                lens[bits] = bits + 1;
            }
            lens[15] = 15;
            next = table;
            ret = inflate_table(DISTS, lens, 0, 16, next, 0, work, onTypeOf9(15));
            expect(ret).assertDeepEquals(1);
            next = table;
            ret = inflate_table(DISTS, lens, 0, 16, next, 0, work, onTypeOf9(1));
            expect(ret).assertDeepEquals(1);
        });
        it('fastlengthextrabits', 34, () => {
            testInflate('e5 e0 81 ad 6d cb b2 2c c9 01 1e 59 63 ae 7d ee fb 4d fd b5 35 41 68' +
                ' ff 7f 0f 0 0 0', -8, c.Z_DATA_ERROR);
        });
        it('fastdistanceextrabits', 35, () => {
            testInflate('25 fd 81 b5 6d 59 b6 6a 49 ea af 35 6 34 eb 8c b9 f6 b9 1e ef 67 49' +
                ' 50 fe ff ff 3f 0 0', -8, c.Z_DATA_ERROR);
        });
        it('fastinvalidliterallengthcode', 36, () => {
            testInflate('1b 7 0 0 0 0 0', -8, c.Z_DATA_ERROR);
        });
        it('fast2ndlevelcodesandtoofarback', 37, () => {
            testInflate('d c7 1 ae eb 38 c 4 41 a0 87 72 de df fb 1f b8 36 b1 38 5d ff ff 0', -8, c.Z_DATA_ERROR);
        });
        it('verycommoncase', 38, () => {
            testInflate('63 18 5 8c 10 8 0 0 0 0', -8, c.Z_OK);
        });
        it('contiguousandwraparoundwindow', 39, () => {
            testInflate('63 60 60 18 c9 0 8 18 18 18 26 c0 28 0 29 0 0 0', -8, c.Z_OK);
        });
        it('copydirectfromoutput', 40, () => {
            testInflate('63 0 3 0 0 0 0 0', -8, c.Z_OK);
        });
        // `inflatePrime` not implemented
        it('forcewindowallocation', 41, () => {
            testInflate('63 0', -15, c.Z_OK);
        });
        it('forcewindowreplacement', 42, () => {
            testInflate('63 18 5', -15, c.Z_OK);
        });
        it('forcesplitwindowupdate', 43, () => {
            testInflate('63 18 68 30 d0 0 0', -15, c.Z_OK);
        });
        it('usefixedblocks', 44, () => {
            testInflate('3 0', -15, c.Z_OK);
        });
        it('badwindowsize', 45, () => {
            testInflate('', -15, c.Z_OK);
        });
    });
}
