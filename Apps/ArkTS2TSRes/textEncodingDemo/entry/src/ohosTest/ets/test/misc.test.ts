let __generate__Id: number = 0;
function generateId(): string {
    return "misc.test_" + ++__generate__Id;
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
import { TextEncoder, TextDecoder } from 'text-encoding';
interface fatalObjType {
    fatal: boolean;
}
interface ignoreBOMType {
    ignoreBOM: boolean;
}
interface badStringsType {
    input: string;
    expected: string;
}
interface encodingsType {
    label: string;
    encoding: string;
}
interface streamType {
    stream: boolean;
}
interface casesType {
    encoding: string;
    encoded: number[];
}
interface NONSTANDARD_allowLegacyEncodingType {
    NONSTANDARD_allowLegacyEncoding: boolean;
}
export default function miscTest() {
    describe('miscTest', () => {
        let THE_ENCODING = ['utf-8'];
        let LEGACY_ENCODINGS = [
            'ibm866', 'iso-8859-2', 'iso-8859-3', 'iso-8859-4', 'iso-8859-5',
            'iso-8859-6', 'iso-8859-7', 'iso-8859-8', 'iso-8859-10',
            'iso-8859-13', 'iso-8859-14', 'iso-8859-15', 'iso-8859-16', 'koi8-r',
            'koi8-u', 'macintosh', 'windows-874', 'windows-1250', 'windows-1251',
            'windows-1252', 'windows-1253', 'windows-1254', 'windows-1255',
            'windows-1256', 'windows-1257', 'windows-1258', 'x-mac-cyrillic',
            'gbk', 'gb18030', 'big5', 'euc-jp', 'iso-2022-jp', 'shift_jis',
            'euc-kr', 'utf-16le', 'utf-16be'
        ];
        let ASCII_SUPERSETS = THE_ENCODING.concat(LEGACY_ENCODINGS)
            .filter((e) => {
            return e !== 'utf-16le' && e !== 'utf-16be';
        });
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
        it('misctest', 0, () => {
            expect(new RegExp("/\[native code\]/").test(String(TextDecoder))).assertFalse();
        });
        it('Attributes', 1, () => {
            let textEncoder: TextEncoder = new TextEncoder();
            let textDecoder: TextDecoder = new TextDecoder();
            let fatalObj: fatalObjType = {
                fatal: true
            };
            let ignoreBOM: ignoreBOMType = {
                ignoreBOM: true
            };
            expect(textEncoder.encoding !== undefined).assertTrue();
            expect(new TextEncoder().encoding).assertEqual('utf-8');
            expect(textDecoder.encoding !== undefined).assertTrue();
            expect(new TextDecoder().encoding).assertEqual('utf-8');
            expect(new TextDecoder('utf-16le').encoding).assertEqual('utf-16le');
            expect(textDecoder.fatal !== undefined).assertTrue();
            expect(new TextDecoder('utf-8').fatal).assertFalse();
            expect(new TextDecoder('utf-8', fatalObj).fatal).assertTrue();
            expect(textDecoder.ignoreBOM !== undefined).assertTrue();
            expect(new TextDecoder('utf-8').ignoreBOM).assertFalse();
            expect(new TextDecoder('utf-8', ignoreBOM).ignoreBOM).assertTrue();
        });
        it('baddata', 2, () => {
            let badStrings: Array<badStringsType> = [
                {
                    input: '\ud800', expected: '\ufffd'
                },
                {
                    input: '\udc00', expected: '\ufffd'
                },
                {
                    input: 'abc\ud800def', expected: 'abc\ufffddef'
                },
                {
                    input: 'abc\udc00def', expected: 'abc\ufffddef'
                },
                {
                    input: '\udc00\ud800', expected: '\ufffd\ufffd'
                } // Wrong order
            ];
            badStrings.forEach((t) => {
                let encoded: Uint8Array = new TextEncoder().encode(t.input);
                let decoded: string = new TextDecoder().decode(encoded);
                expect(t.expected).assertEqual(decoded);
            });
        });
        it('EncodingNamesAreCaseInsensitive', 3, () => {
            let encodings: Array<encodingsType> = [
                {
                    label: 'utf-8', encoding: 'utf-8'
                },
                {
                    label: 'utf-16', encoding: 'utf-16le'
                },
                {
                    label: 'utf-16le', encoding: 'utf-16le'
                },
                {
                    label: 'utf-16be', encoding: 'utf-16be'
                },
                {
                    label: 'ascii', encoding: 'windows-1252'
                },
                {
                    label: 'iso-8859-1', encoding: 'windows-1252'
                }
            ];
            encodings.forEach((test) => {
                expect(new TextDecoder(test.label.toLowerCase()).encoding).assertEqual(test.encoding);
                expect(new TextDecoder(test.label.toUpperCase()).encoding).assertEqual(test.encoding);
            });
        });
        it('ByteOrderMarks', 4, () => {
            let utf8_bom = [0xEF, 0xBB, 0xBF];
            let utf8 = [0x7A, 0xC2, 0xA2, 0xE6, 0xB0, 0xB4, 0xF0, 0x9D, 0x84, 0x9E, 0xF4, 0x8F, 0xBF, 0xBD];
            let utf16le_bom = [0xff, 0xfe];
            let utf16le = [0x7A, 0x00, 0xA2, 0x00, 0x34, 0x6C, 0x34, 0xD8, 0x1E, 0xDD, 0xFF, 0xDB, 0xFD, 0xDF];
            let utf16be_bom = [0xfe, 0xff];
            let utf16be = [0x00, 0x7A, 0x00, 0xA2, 0x6C, 0x34, 0xD8, 0x34, 0xDD, 0x1E, 0xDB, 0xFF, 0xDF, 0xFD];
            let string = 'z\xA2\u6C34\uD834\uDD1E\uDBFF\uDFFD'; // z, cent, CJK water, G-Clef, Private-use character
            // missing BOMs
            expect(new TextDecoder('utf-8').decode(new Uint8Array(utf8))).assertEqual(string);
            expect(new TextDecoder('utf-16le').decode(new Uint8Array(utf16le))).assertEqual(string);
            expect(new TextDecoder('utf-16be').decode(new Uint8Array(utf16be))).assertEqual(string);
            // matching BOMs
            expect(new TextDecoder('utf-8').decode(new Uint8Array(utf8_bom.concat(utf8)))).assertEqual(string);
            expect(new TextDecoder('utf-16le').decode(new Uint8Array(utf16le_bom.concat(utf16le)))).assertEqual(string);
            expect(new TextDecoder('utf-16be').decode(new Uint8Array(utf16be_bom.concat(utf16be)))).assertEqual(string);
            // matching BOMs split
            let decoder8: TextDecoder = new TextDecoder('utf-8');
            let stream: streamType = { stream: true };
            expect(decoder8.decode(new Uint8Array(utf8_bom.slice(0, 1)), stream)).assertEqual('');
            expect(decoder8.decode(new Uint8Array(utf8_bom.slice(1).concat(utf8)))).assertEqual(string);
            expect(decoder8.decode(new Uint8Array(utf8_bom.slice(0, 2)), stream)).assertEqual('');
            expect(decoder8.decode(new Uint8Array(utf8_bom.slice(2).concat(utf8)))).assertEqual(string);
            let decoder16le: TextDecoder = new TextDecoder('utf-16le');
            expect(decoder16le.decode(new Uint8Array(utf16le_bom.slice(0, 1)), stream)).assertEqual('');
            expect(decoder16le.decode(new Uint8Array(utf16le_bom.slice(1).concat(utf16le)))).assertEqual(string);
            let decoder16be: TextDecoder = new TextDecoder('utf-16be');
            expect(decoder16be.decode(new Uint8Array(utf16be_bom.slice(0, 1)), stream)).assertEqual('');
            expect(decoder16be.decode(new Uint8Array(utf16be_bom.slice(1).concat(utf16be)))).assertEqual(string);
            // mismatching BOMs
            let resultutf8 = new TextDecoder('utf-8').decode(new Uint8Array(utf16le_bom.concat(utf8))) == string;
            expect(resultutf8).assertFalse();
            // expect(new TextDecoder('utf-8').decode(new Uint8Array(utf16be_bom.concat(utf8)))).assertnotEqual(string);
            let resultutf16le = new TextDecoder('utf-16le').decode(new Uint8Array(utf8_bom.concat(utf16le))) == string;
            expect(resultutf16le).assertFalse();
            // assert_not_equals(new TextDecoder('utf-16le').decode(new Uint8Array(utf8_bom.concat(utf16le))), string);
            let resultutf16lebom = new TextDecoder('utf-16le').decode(new Uint8Array(utf16be_bom.concat(utf16le))) == string;
            expect(resultutf16lebom).assertFalse();
            // assert_not_equals(new TextDecoder('utf-16le').decode(new Uint8Array(utf16be_bom.concat(utf16le))), string);
            // assert_not_equals(new TextDecoder('utf-16be').decode(new Uint8Array(utf8_bom.concat(utf16be))), string);
            // assert_not_equals(new TextDecoder('utf-16be').decode(new Uint8Array(utf16le_bom.concat(utf16be))), string);
            // ignore BOMs
            let ignoreBOM: ignoreBOMType = {
                ignoreBOM: true
            };
            expect(new TextDecoder('utf-8', ignoreBOM)
                .decode(new Uint8Array(utf8_bom.concat(utf8)))).assertEqual('\uFEFF' + string);
            expect(new TextDecoder('utf-16le', ignoreBOM)
                .decode(new Uint8Array(utf16le_bom.concat(utf16le)))).assertEqual('\uFEFF' + string);
            expect(new TextDecoder('utf-16be', ignoreBOM)
                .decode(new Uint8Array(utf16be_bom.concat(utf16be)))).assertEqual('\uFEFF' + string);
        });
        it('EncodingNames', 5, () => {
            expect(new TextDecoder('utf-8').encoding).assertEqual('utf-8'); // canonical case
            expect(new TextDecoder('UTF-16').encoding).assertEqual('utf-16le'); // canonical case and name
            expect(new TextDecoder('UTF-16BE').encoding).assertEqual('utf-16be'); // canonical case and name
            expect(new TextDecoder('iso8859-1').encoding).assertEqual('windows-1252'); // canonical case and name
            expect(new TextDecoder('iso-8859-1').encoding).assertEqual('windows-1252'); // canonical case and name
        });
        it('StreamingDecode', 6, () => {
            let string: string = '\x00123ABCabc\x80\xFF\u0100\u1000\uFFFD\uD800\uDC00\uDBFF\uDFFF';
            let cases: Array<casesType> = [
                {
                    encoding: 'utf-8',
                    encoded: [0, 49, 50, 51, 65, 66, 67, 97, 98, 99, 194, 128, 195, 191, 196,
                        128, 225, 128, 128, 239, 191, 189, 240, 144, 128, 128, 244, 143,
                        191, 191]
                },
                {
                    encoding: 'utf-16le',
                    encoded: [0, 0, 49, 0, 50, 0, 51, 0, 65, 0, 66, 0, 67, 0, 97, 0, 98, 0,
                        99, 0, 128, 0, 255, 0, 0, 1, 0, 16, 253, 255, 0, 216, 0, 220,
                        255, 219, 255, 223]
                },
                {
                    encoding: 'utf-16be',
                    encoded: [0, 0, 0, 49, 0, 50, 0, 51, 0, 65, 0, 66, 0, 67, 0, 97, 0, 98, 0,
                        99, 0, 128, 0, 255, 1, 0, 16, 0, 255, 253, 216, 0, 220, 0, 219,
                        255, 223, 255]
                }
            ];
            let stream: streamType = { stream: true };
            cases.forEach((c) => {
                for (let len = 1; len <= 5; ++len) {
                    let out: string = '', decoder: TextDecoder = new TextDecoder(c.encoding);
                    for (let i = 0; i < c.encoded.length; i += len) {
                        let sub: Array<number> = [];
                        for (let j = i; j < c.encoded.length && j < i + len; ++j) {
                            sub.push(c.encoded[j]);
                        }
                        out += decoder.decode(new Uint8Array(sub), stream);
                    }
                    out += decoder.decode();
                    expect(out).assertEqual(string);
                }
            });
        });
        it('ShiftJISDecode', 7, () => {
            let jis: number[] = [0x82, 0xC9, 0x82, 0xD9, 0x82, 0xF1];
            let expected: string = '\u306B\u307B\u3093'; // Nihon
            expect(new TextDecoder('shift_jis').decode(new Uint8Array(jis))).assertEqual(expected);
        });
        it('SupersetsOfASCIIdecodeASCIIcorrectly', 8, () => {
            ASCII_SUPERSETS.forEach((encoding) => {
                let string: string = '', bytes: Array<number> = [];
                for (let i = 0; i < 128; ++i) {
                    // Encodings that have escape codes in 0x00-0x7F
                    if (encoding === 'iso-2022-jp' &&
                        (i === 0x0E || i === 0x0F || i === 0x1B))
                        continue;
                    string += String.fromCharCode(i);
                    bytes.push(i);
                }
                let ascii_encoded: Uint8Array = new TextEncoder().encode(string);
                expect(new TextDecoder(encoding).decode(ascii_encoded)).assertEqual(string);
            });
        });
        it('notEncode', 9, () => {
            LEGACY_ENCODINGS.forEach((encoding) => {
                expect(new TextDecoder(encoding).encoding).assertEqual(encoding);
                expect(new TextEncoder(encoding).encoding).assertEqual('utf-8');
            });
        });
        it('GB180302000', 10, () => {
            // Regression test for https://github.com/whatwg/encoding/issues/22
            expect(new TextDecoder('gb18030').decode(new Uint8Array([
                0xA8, 0xBC,
                0x81, 0x35, 0xF4, 0x37
            ]))).assertEqual('\u1E3F\uE7C7');
        });
        let NONSTANDARD_allowLegacyEncoding: NONSTANDARD_allowLegacyEncodingType = { NONSTANDARD_allowLegacyEncoding: true };
        ['utf-16le', 'utf-16be'].forEach((encoding, index) => {
            it(`NONSTANDARD${index}`, 11, () => {
                let encoder: TextEncoder = new TextEncoder(encoding, NONSTANDARD_allowLegacyEncoding);
                let decoder: TextDecoder = new TextDecoder(encoding);
                let sample: string = "z\xA2\u6C34\uD834\uDD1E\uDBFF\uDFFD";
                expect(decoder.decode(encoder.encode(sample))).assertEqual(sample);
            });
        });
    });
}
