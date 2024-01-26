let __generate__Id: number = 0;
function generateId(): string {
    return "test_" + ++__generate__Id;
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
import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { soundex } from 'soundex-code';
import { getKeys } from './GetObject';
export default function soundexTest() {
    interface runDataType1 {
        blackberry: string;
        calculate: string;
        fox: string;
        jump: string;
        phonetics: string;
    }
    interface runDataType2 {
        Euler: string;
        Gauss: string;
        Hilbert: string;
        Knuth: string;
        Lloyd: string;
        Lukasiewicz: string;
        Ellery: string;
        Ghosh: string;
        Heilbronn: string;
        Kant: string;
        Ladd: string;
        Lissajous: string;
    }
    interface runDataType3 {
        Washington: string;
        Lee: string;
        Gutierrez: string;
        Pfister: string;
        Jackson: string;
        Tymczak: string;
        VanDeusen: string;
        Deusen: string;
        Ashcraft: string;
    }
    describe('soundexTest', () => {
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
        let tag = "soundecode:";
        let equal = (src: string, dst: string, info?: string) => {
            expect(src).assertEqual(dst);
            if (info) {
                console.log(tag + info);
            }
        };
        interface equalType {
            equal: (src: string, dst: string, info?: string) => void;
        }
        let assert: equalType = {
            equal: equal
        };
        const own: Function = Object.hasOwnProperty;
        /**
         * @param {Record<string, string>} tests
         */
        let run: (tests: Object) => void = (tests: Object) => {
            let index = 0;
            /** @type {string} */
            // let key
            let objKeys: string[] = getKeys(tests);
            for (let i = 0; i < objKeys.length; i++) {
                if (own(objKeys[i])) {
                    assert.equal(soundex(objKeys[i]), (tests as Record<string, string>).objKeys[i], String(++index));
                }
            }
        };
        it('api', 1, () => {
            assert.equal(soundex('PHONETICS'), soundex('phonetics'), 'case insensitive');
            assert.equal(soundex('PhoNeTicS'), soundex('phonetics'), 'case insensitive (2)');
            assert.equal(soundex('p'), 'P000', 'pad');
            assert.equal(soundex('pc'), 'P200', 'pad (2)');
            assert.equal(soundex('pcd'), 'P230', 'pad (3)');
            assert.equal(soundex('pcdl'), 'P234', 'pad (4)');
            assert.equal(soundex('pcdlm'), 'P234', 'pad (5)');
            assert.equal(soundex('pcdlmr'), 'P234', 'pad (6)');
            assert.equal(soundex('b', 2), 'B0', 'max-length argument (1)');
            assert.equal(soundex('bc', 2), 'B2', 'max-length argument (2)');
            assert.equal(soundex('bcd', 2), 'B2', 'max-length argument (3)');
            assert.equal(soundex('bcdl', 2), 'B2', 'max-length argument (4)');
            assert.equal(soundex('bcdlm', 2), 'B2', 'max-length argument (5)');
            assert.equal(soundex('bcdlmr', 2), 'B2', 'max-length argument (6)');
            assert.equal(soundex('b', 6), 'B000', 'max-length argument (7)');
            assert.equal(soundex('bc', 6), 'B200', 'max-length argument (8)');
            assert.equal(soundex('bcd', 6), 'B230', 'max-length argument (9)');
            assert.equal(soundex('bcdl', 6), 'B234', 'max-length argument (10)');
            assert.equal(soundex('bcdlm', 6), 'B2345', 'max-length argument (11)');
            assert.equal(soundex('bcdlmr', 6), 'B23456', 'max-length argument (12)');
            assert.equal(soundex('bcdlmrf', 6), 'B23456', 'max-length argument (13)');
            // Natural provides several unit tests. See:
            // <https://github.com/NaturalNode/natural>
            let runData: runDataType1 = {
                blackberry: 'B421',
                calculate: 'C424',
                fox: 'F200',
                jump: 'J510',
                phonetics: 'P532'
            };
            run(runData);
            // The PHP implementation, based on Knuths, gives several examples. See:
            // <https://php.net/manual/en/function.soundex.php>
            let runData2: runDataType2 = {
                Euler: 'E460',
                Gauss: 'G200',
                Hilbert: 'H416',
                Knuth: 'K530',
                Lloyd: 'L300',
                Lukasiewicz: 'L222',
                Ellery: 'E460',
                Ghosh: 'G200',
                Heilbronn: 'H416',
                Kant: 'K530',
                Ladd: 'L300',
                Lissajous: 'L222'
            };
            run(runData2);
            // The original implementation gives several examples. See:
            // <https://www.archives.gov/research/census/soundex.html>
            let runData3: runDataType3 = {
                Washington: 'W252',
                Lee: 'L000',
                Gutierrez: 'G362',
                Pfister: 'P236',
                Jackson: 'J250',
                Tymczak: 'T522',
                VanDeusen: 'V532',
                Deusen: 'D250',
                Ashcraft: 'A261'
            };
            run(runData3);
        });
    });
}
