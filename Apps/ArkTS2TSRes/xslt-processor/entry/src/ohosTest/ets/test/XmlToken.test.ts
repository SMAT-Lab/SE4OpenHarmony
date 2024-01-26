let __generate__Id: number = 0;
function generateId(): string {
    return "XmlToken.test_" + ++__generate__Id;
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
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@ohos/hypium';
import { XML10_ATT_VALUE, XML10_ENTITY_REF, XML10_NAME, XML10_VERSION_INFO, XML11_ATT_VALUE, XML11_ENTITY_REF, XML11_NAME, XML11_VERSION_INFO, XML_CHAR_REF, XML_NC_NAME } from 'xslt-processor/src/xmltoken.js';
export default function xmlTokenTest() {
    describe('XmlTokenTest', () => {
        // Test if regexp matches the str and RegExp.exec returns exactly the match.
        const assertOk = (comment: any, regexp: any, str?: any, match?: any) => {
            //      assert.notEqual(regexp.exec(str), null, comment);
            expect(regexp.exec(str)![0]).assertEqual(match);
            expect(regexp.test(str)).assertTrue();
        };
        // Test if regexp doesn't match the str.
        const assertNg = (comment: any, regexp: any, str?: any) => {
            expect(regexp.exec(str)).assertEqual(null);
            expect(!regexp.test(str)).assertTrue();
        };
        // Concat chars in various way and test them with regexp.
        const doTestXmlName = (comment: string, regexp: RegExp, okFirstChars: string[], ngFirstChars: string[], okSecondChars: string[], ngSecondChars: string[]) => {
            const okSecondString: string = okSecondChars.join('');
            for (let i = 0; i < okFirstChars.length; i++) {
                assertOk(`${comment} with ok #${i}`, regexp, okFirstChars[i], okFirstChars[i]);
                assertOk(`${comment} with ok #${i} + oks`, regexp, okFirstChars[i] + okSecondString, okFirstChars[i] + okSecondString);
                for (let j = 0; j < okSecondChars.length; j++) {
                    assertOk(`${comment} with ok #${i} + ok #${j}`, regexp, okFirstChars[i] + okSecondChars[j], okFirstChars[i] + okSecondChars[j]);
                    assertOk(`${comment} with ok #${i} + ok #${j} + oks`, regexp, okFirstChars[i] + okSecondChars[j] + okSecondString, okFirstChars[i] + okSecondChars[j] + okSecondString);
                    const k = (i + j) % ngSecondChars.length;
                    assertOk(`${comment} with ok #${i} + ok #${j} + ng #${k}`, regexp, okFirstChars[i] + okSecondChars[j] + ngSecondChars[k], okFirstChars[i] + okSecondChars[j]);
                }
                let j = i % ngSecondChars.length;
                assertOk(`${comment} with ok #${i} + ng #${j}`, regexp, okFirstChars[i] + ngSecondChars[j], okFirstChars[i]);
                assertOk(`${comment} with ok #${i} + oks + ng #${j}`, regexp, okFirstChars[i] + okSecondString + ngSecondChars[j], okFirstChars[i] + okSecondString);
            }
            for (let i = 0; i < ngFirstChars.length; i++) {
                assertNg(`${comment} with ng #${i}`, regexp, ngFirstChars[i]);
                // It doesn't make sense to test with ngFirstChars[i] + okSecondChars[j].
                for (let j = 0; j < ngSecondChars.length; j++) {
                    assertNg(`${comment} with ng #${i} + ng #${j}`, regexp, ngFirstChars[i] + ngSecondChars[j]);
                }
            }
        };
        // Test strings for XML10_ATTRIBUTE and XML11_ATTRIBUTE testing.
        const okAttValues = [
            '""',
            '"foo"',
            '"&lt;foobar"',
            '"foo&lt;bar"',
            '"foobar&lt;"',
            '"&gt;foobar"',
            '"foo&gt;bar"',
            '"foobar&gt;"',
            '"&amp;foobar"',
            '"foo&amp;bar"',
            '"foobar&amp;"',
            '"&quot;foobar"',
            '"foo&quot;bar"',
            '"foobar&quot;"',
            '"\'foobar"',
            '"foo\'bar"',
            '"foobar\'"',
            '"&lt;&amp;&quot;&apos;\'"',
            '"&#102;&#111;&#111;"',
            '"&#x66;&#x6f;&#x6f;"',
            '"&lt;f&#111;&#x6f;>"',
            '"&:foo;"',
            '"&_foo;"',
            '"&foo-bar.baz:quux_;"',
            '"foo&\u30a8\u30f3\u30c6\u30a3\u30c6\u30a3\u540d;bar"',
            "''",
            "'foo'",
            "'&lt;foobar'",
            "'foo&lt;bar'",
            "'foobar&lt;'",
            "'&gt;foobar'",
            "'foo&gt;bar'",
            "'foobar&gt;'",
            "'&amp;foobar'",
            "'foo&amp;bar'",
            "'foobar&amp;'",
            "'&apos;foobar'",
            "'foo&apos;bar'",
            "'foobar&apos;'",
            "'\"foobar'",
            "'foo\"bar'",
            "'foobar\"'",
            "'&lt;&gt;&amp;&quot;&apos;\"'",
            "'&#102;&#111;&#111;'",
            "'&#x66;&#x6f;&#x6f;'",
            "'&lt;f&#111;&#x6f;>'",
            "'&:foo;'",
            "'&_foo;'",
            "'&foo-bar.baz:quux_;'",
            "'foo&\u30a8\u30f3\u30c6\u30a3\u30c6\u30a3\u540d;bar'"
        ];
        const ngAttValues = [
            '',
            'foo',
            'foo"',
            '"foo',
            '"foo\'',
            '"<foobar"',
            '"foo<bar"',
            '"foobar<"',
            '"&foobar"',
            '"foo&bar"',
            '"foobar&"',
            '"&-foo;"',
            '"&.foo;"',
            "",
            "foo",
            "foo'",
            "'foo",
            "'foo\"",
            "'<foobar'",
            "'foo<bar'",
            "'foobar<'",
            "'&foobar'",
            "'foo&bar'",
            "'foobar&'",
            "'&-foo;'",
            "'&.foo;'" // Entity name must be a valid XML10_NAME
        ];
        const ngAttValues2 = [
            '""foobar"', '""',
            '"foo"bar"', '"foo"',
            '"foobar""', '"foobar"',
            "''foobar'", "''",
            "'foo'bar'", "'foo'",
            "'foobar''", "'foobar'"
        ];
        const edgeAttValues = [
            '"&\u0131\u0132;foo"',
            '"f&\u0132\u0133;oo"',
            '"fo&\u0133\u0134;o"',
            '"foo&\u0131\u0132\u0133\u0134;bar"',
            '"baz&\u3001\u3030\u4d00\u9fff;quux"',
            "'&\u0131\u0132;foo'",
            "'f&\u0132\u0133;oo'",
            "'fo&\u0133\u0134;o'",
            "'foo&\u0131\u0132\u0133\u0134;bar'",
            "'baz&\u3001\u3030\u4d00\u9fff;quux'"
        ];
        it('handles_XML10_VERSION_INFO_and_XML11_VERSION_INFO', 0, () => {
            const okVersion10 = [
                ' version="1.0"',
                ' version  =   "1.0"',
                '\tversion\t\t=\t\t\t"1.0"',
                '\rversion\r\r=\r\r\r"1.0"',
                '\nversion\n\n=\n\n\n"1.0"',
                '\r\nversion\r\n\r\n=\r\n\r\n\r\n"1.0"',
                '\n\rversion\n\r\n\r=\n\r\n\r\n\r"1.0"',
                ' \t\r\n \t\n\rversion \r\t\n \r\n\t= \n\t\r \n\r\t"1.0"',
                " version='1.0'",
                " version  =   '1.0'",
                "\tversion\t\t=\t\t\t'1.0'",
                "\rversion\r\r=\r\r\r'1.0'",
                "\nversion\n\n=\n\n\n'1.0'",
                "\r\nversion\r\n\r\n=\r\n\r\n\r\n'1.0'",
                "\n\rversion\n\r\n\r=\n\r\n\r\n\r'1.0'",
                "\t \r\n\t \n\rversion\t\r \n\t\r\n =\t\n \r\t\n\r '1.0'"
            ];
            const ngVersion10 = [
                'version="1.0"',
                ' Version="1.0"',
                ' VERSION="1.0"',
                ' version"1.0"',
                ' version "1.0"',
                ' version\t"1.0"',
                ' version+"1.0"',
                ' version-"1.0"',
                ' version=1.0',
                ' version="1.1"',
                ' version="1"',
                ' version="10"',
                ' version="100"',
                ' version="1-0"',
                ' version="1_0"' // Must be '1.0'
            ];
            const okVersion11 = [
                ' version="1.1"',
                ' version  =   "1.1"',
                '\tversion\t\t=\t\t\t"1.1"',
                '\rversion\r\r=\r\r\r"1.1"',
                '\nversion\n\n=\n\n\n"1.1"',
                '\r\nversion\r\n\r\n=\r\n\r\n\r\n"1.1"',
                '\n\rversion\n\r\n\r=\n\r\n\r\n\r"1.1"',
                '\r \t\n\r \n\tversion\r\t \n\r\t\n =\r\n \t\r\n\t "1.1"',
                " version='1.1'",
                " version  =   '1.1'",
                "\tversion\t\t=\t\t\t'1.1'",
                "\rversion\r\r=\r\r\r'1.1'",
                "\nversion\n\n=\n\n\n'1.1'",
                "\r\nversion\r\n\r\n=\r\n\r\n\r\n'1.1'",
                "\n\rversion\n\r\n\r=\n\r\n\r\n\r'1.1'",
                "\n \t\r\n \r\tversion\n\t \r\n\t\r =\n\r \t\n\r\t '1.1'"
            ];
            const ngVersion11 = [
                'version="1.1"',
                ' Version="1.1"',
                ' VERSION="1.1"',
                ' version"1.1"',
                ' version "1.1"',
                ' version\t"1.1"',
                ' version+"1.1"',
                ' version-"1.1"',
                ' version=1.1',
                ' version="1.0"',
                ' version="1"',
                ' version="11"',
                ' version="111"',
                ' version="1-1"',
                ' version="1_1"' // Must be '1.1'
            ];
            let regexp = new RegExp(XML10_VERSION_INFO);
            for (let i = 0; i < okVersion10.length; i++) {
                assertOk(`XML10_VERSION_INFO with ok #${i}`, regexp, okVersion10[i], okVersion10[i]);
            }
            for (let i = 0; i < ngVersion10.length; i++) {
                assertNg(`XML10_VERSION_INFO with ng #${i}`, regexp, ngVersion10[i]);
            }
            regexp = new RegExp(XML11_VERSION_INFO);
            for (let i = 0; i < okVersion11.length; i++) {
                assertOk(`XML11_VERSION_INFO with ok #${i}`, regexp, okVersion11[i], okVersion11[i]);
            }
            for (let i = 0; i < ngVersion11.length; i++) {
                assertNg(`XML11_VERSION_INFO with ng #${i}`, regexp, ngVersion11[i]);
            }
        });
        it('handles_XML_CHAR_REF_correctly', 0, () => {
            const okCharRef = [
                '&#0;',
                '&#9;',
                '&#32;',
                '&#34;',
                '&#38;',
                '&#39;',
                '&#60;',
                '&#62;',
                '&#65;',
                '&#100;',
                '&#9999;',
                '&#65536;',
                '&#0123456789;',
                '&#9876543210;',
                '&#314159265358979323846264338327950;',
                '&#x0;',
                '&#x9;',
                '&#xA;',
                '&#xF;',
                '&#xa;',
                '&#xf;',
                '&#x20;',
                '&#x22;',
                '&#x26;',
                '&#x27;',
                '&#x3c;',
                '&#x3e;',
                '&#x41;',
                '&#xAA;',
                '&#xBb;',
                '&#xcC;',
                '&#xdd;',
                '&#x100;',
                '&#x9999;',
                '&#xaaaa;',
                '&#xffff;',
                '&#xcafebabe;',
                '&#x0123456789ABCDEFabcdef;',
                '&#xfedcbaFEDCBA9876543210;'
            ];
            const ngCharRef = [
                '&0;',
                '#0;',
                'x0;',
                '&#;',
                '&#/;',
                '&#0',
                '&#9',
                '&#0:',
                '&#9:',
                '&# 0;',
                '&#0 ;',
                '&# 0 ;',
                '&#A;',
                '&#F;',
                '&#0A;',
                '&#9F;',
                '&#0F;',
                '&#9A;',
                '&#:;',
                '&#x;',
                '&#x/;',
                '&#x0',
                '&#x9',
                '&#xA',
                '&#xF',
                '&#xa',
                '&#xf',
                '&#x0:',
                '&#x9:',
                '&#xA:',
                '&#xF:',
                '&#xa:',
                '&#xf:',
                '&#x 0',
                '&#x0 ',
                '&#x 0 ',
                '&#x:;',
                '&#x@;',
                '&#xG;',
                '&#x`;',
                '&#xg;' // Must be 0-9A-Fa-f
            ];
            const regexp = new RegExp(XML_CHAR_REF);
            for (let i = 0; i < okCharRef.length; i++) {
                assertOk(`XML_CHAR_REF with ok #${i}`, regexp, okCharRef[i], okCharRef[i]);
            }
            for (let i = 0; i < ngCharRef.length; i++) {
                assertNg(`XML_CHAR_REF with ng #${i}`, regexp, ngCharRef[i]);
            }
        });
        it('handles_XML10_ENTITY_REF_and_XML11_ENTITY_REF_XML10_NAME_and_XML11_NAME_correctly', 0, () => {
            const okEntityRef = [
                '&lt;',
                '&gt;',
                '&amp;',
                '&aps;',
                '&quot;',
                '&nbsp;',
                '&copy;',
                '&reg;',
                '&Agrave;',
                '&ETH;',
                '&lArr;',
                '&there4;',
                '&foo;',
                '&:foo;',
                '&_foo;',
                '&foo-bar.baz:quux_;',
                '&\u30a8\u30f3\u30c6\u30a3\u30c6\u30a3\u540d;' // Japanese entity name
            ];
            const ngEntityRef = [
                'lt;',
                '&gt',
                '& amp;',
                '&aps ;',
                '& quot ;',
                '&-foo;',
                '&.foo;' // Entity name must not start with '.'
            ];
            const edgeEntityRef = [
                '&\u0131\u0132;',
                '&\u0132\u0133;',
                '&\u0133\u0134;',
                '&\u0131\u0132\u0133\u0134;',
                '&\u3001\u3030\u4d00\u9fff\ufffd;'
            ];
            const regexp10 = new RegExp(XML10_ENTITY_REF);
            for (let i = 0; i < okEntityRef.length; i++) {
                assertOk(`XML10_ENTITY_REF with ok #${i}`, regexp10, okEntityRef[i], okEntityRef[i]);
            }
            for (let i = 0; i < ngEntityRef.length; i++) {
                assertNg(`XML10_ENTITY_REF with ng #${i}`, regexp10, ngEntityRef[i]);
            }
            const regexp11 = new RegExp(XML11_ENTITY_REF);
            for (let i = 0; i < okEntityRef.length; i++) {
                assertOk(`XML11_ENTITY_REF with ok #${i}`, regexp11, okEntityRef[i], okEntityRef[i]);
            }
            for (let i = 0; i < ngEntityRef.length; i++) {
                assertNg(`XML11_ENTITY_REF with ng #${i}`, regexp11, ngEntityRef[i]);
            }
            for (let i = 0; i < edgeEntityRef.length; i++) {
                assertNg(`XML10_ENTITY_REF with edge #${i}`, regexp10, edgeEntityRef[i]);
                assertOk(`XML11_ENTITY_REF with edge #${i}`, regexp11, edgeEntityRef[i], edgeEntityRef[i]);
            }
        });
        it('handles_XML10_NAME_correctly', 0, () => {
            // Test XML10_NAME including XML10_LETTER, XML10_NAME_CHAR, XML10_BASE_CHAR,
            // XML10_IDEOGRAPHIC, XML10_DIGIT, XML10_COMBINING_CHAR and XML10_EXTENDER.
            const okFirstChars = [
                '\u003a',
                '\u0041',
                '\u005a',
                '\u005f',
                '\u0061',
                '\u007a',
                '\u00c0',
                '\u00d6',
                '\u00d8',
                '\u00f6',
                '\u00f8',
                '\u00ff',
                '\u0100',
                '\u4e00',
                '\u9fa5',
                '\uac00',
                '\ud7a3' // XML10_BASE_CHAR
            ];
            const ngFirstChars = [
                '\u002d',
                '\u002e',
                '\u0030',
                '\u0039',
                '\u003b',
                '\u0040',
                '\u005b',
                '\u005e',
                '\u0060',
                '\u007b',
                '\u00b7',
                '\u00bf',
                '\u00d7',
                '\u00f7',
                '\u0300',
                '\u0660',
                '\u0f29',
                '\u309a',
                '\u30fe',
                '\u4dff',
                '\u9fa6',
                '\uabff',
                '\ud7a4' // Edge char for XML10_BASE_CHAR
            ];
            const okSecondChars = [
                '\u002d',
                '\u002e',
                '\u0030',
                '\u0039',
                '\u003a',
                '\u0041',
                '\u005a',
                '\u005f',
                '\u0061',
                '\u007a',
                '\u00b7',
                '\u00c0',
                '\u00d6',
                '\u00d8',
                '\u00f6',
                '\u00f8',
                '\u00ff',
                '\u0100',
                '\u0300',
                '\u0660',
                '\u0f29',
                '\u309a',
                '\u30fe',
                '\u4e00',
                '\u9fa5',
                '\uac00',
                '\ud7a3' // XML10_BASE_CHAR
            ];
            const ngSecondChars = [
                '\u0040',
                '\u005b',
                '\u0060',
                '\u007b',
                '\u00b6',
                '\u00bf',
                '\u00d7',
                '\u00f7',
                '\u02ff',
                '\u309b',
                '\u30ff',
                '\u4dff',
                '\u9fa6',
                '\uabff',
                '\ud7a4' // Edge char for XML10_BASE_CHAR
            ];
            doTestXmlName('XML10_NAME', new RegExp(XML10_NAME), okFirstChars, ngFirstChars, okSecondChars, ngSecondChars);
        });
        it('handles_XML10_ATTRIBUTE_including_XML10_ATT_VALUE_and_XML10_REFERENCE_correctly', 0, () => {
            // A difference from testXml11Attribute() is that tests with edge cases
            // should fail here.
            const regexp = new RegExp(XML10_ATT_VALUE);
            for (let i = 0; i < okAttValues.length; i++) {
                assertOk(`XML10_ATT_VALUE with ok #${i}`, regexp, okAttValues[i], okAttValues[i]);
            }
            for (let i = 0; i < ngAttValues.length; i++) {
                assertNg(`XML10_ATT_VALUE with ng #${i}`, regexp, ngAttValues[i]);
            }
            for (let i = 0; i < ngAttValues2.length; i += 2) {
                assertOk(`XML10_ATT_VALUE with ng2 #${i / 2}`, regexp, ngAttValues2[i], ngAttValues2[i + 1]);
            }
            for (let i = 0; i < edgeAttValues.length; i++) {
                assertNg(`XML10_ATT_VALUE with ng2 #${i}`, regexp, edgeAttValues[i]);
            }
        });
        it('handles_XML11_NAME_including_XML11_NAME_START_CHAR_and_XML11_NAME_CHAR_correctly', 0, () => {
            const okFirstChars = [
                '\u003a',
                '\u0041',
                '\u005a',
                '\u005f',
                '\u0061',
                '\u007a',
                '\u00c0',
                '\u00d6',
                '\u00d8',
                '\u00f6',
                '\u00f8',
                '\u02ff',
                '\u0370',
                '\u037d',
                '\u037f',
                '\u1fff',
                '\u200c',
                '\u200d',
                '\u2070',
                '\u218f',
                '\u2c00',
                '\u2fef',
                '\u3001',
                '\ud7ff',
                '\uf900',
                '\ufdcf',
                '\ufdf0',
                '\ufffd' // XML11_NAME_START_CHAR
            ];
            const ngFirstChars = [
                '\u002d',
                '\u002e',
                '\u0030',
                '\u0039',
                '\u003b',
                '\u0040',
                '\u005b',
                '\u005e',
                '\u0060',
                '\u007b',
                '\u00b7',
                '\u00bf',
                '\u00d7',
                '\u00f7',
                '\u0300',
                '\u036f',
                '\u037e',
                '\u2000',
                '\u200b',
                '\u200e',
                '\u203f',
                '\u2040',
                '\u206f',
                '\u2190',
                '\u2bff',
                '\u2ff0',
                '\u3000',
                '\ud800',
                '\uf8ff',
                '\ufdd0',
                '\ufdef',
                '\uffff' // Non XML11_NAME_START_CHAR
            ];
            const okSecondChars = [
                '\u002d',
                '\u002e',
                '\u0030',
                '\u0039',
                '\u003a',
                '\u0041',
                '\u005a',
                '\u005f',
                '\u0061',
                '\u007a',
                '\u00b7',
                '\u00c0',
                '\u00d6',
                '\u00d8',
                '\u00f6',
                '\u00f8',
                '\u02ff',
                '\u0300',
                '\u036f',
                '\u0370',
                '\u037d',
                '\u037f',
                '\u1fff',
                '\u200c',
                '\u200d',
                '\u203f',
                '\u2040',
                '\u2070',
                '\u218f',
                '\u2c00',
                '\u2fef',
                '\u3001',
                '\ud7ff',
                '\uf900',
                '\ufdcf',
                '\ufdf0',
                '\ufffd' // XML11_NAME_START_CHAR
            ];
            const ngSecondChars = [
                '\u003b',
                '\u0040',
                '\u005b',
                '\u005e',
                '\u0060',
                '\u007b',
                '\u00bf',
                '\u00d7',
                '\u00f7',
                '\u037e',
                '\u2000',
                '\u200b',
                '\u200e',
                '\u206f',
                '\u2190',
                '\u2bff',
                '\u2ff0',
                '\u3000',
                '\ud800',
                '\uf8ff',
                '\ufdd0',
                '\ufdef',
                '\uffff' // Non XML11_NAME_START_CHAR
            ];
            doTestXmlName('XML11_NAME', new RegExp(XML11_NAME), okFirstChars, ngFirstChars, okSecondChars, ngSecondChars);
        });
        it('handles_XML11_ATTRIBUTE_including_XML11_ATT_VALUE_and_XML11_REFERENCE_correctly', 0, () => {
            // A difference from testXml10Attribute() is that tests with edge cases
            // should succeed here.
            const regexp = new RegExp(XML11_ATT_VALUE);
            for (let i = 0; i < okAttValues.length; i++) {
                assertOk(`XML11_ATT_VALUE with ok #${i}`, regexp, okAttValues[i], okAttValues[i]);
            }
            for (let i = 0; i < ngAttValues.length; i++) {
                assertNg(`XML11_ATT_VALUE with ng #${i}`, regexp, ngAttValues[i]);
            }
            for (let i = 0; i < ngAttValues2.length; i += 2) {
                assertOk(`XML11_ATT_VALUE with ng2 #${i / 2}`, regexp, ngAttValues2[i], ngAttValues2[i + 1]);
            }
            for (let i = 0; i < edgeAttValues.length; i++) {
                assertOk(`XML11_ATT_VALUE with ng2 #${i}`, regexp, edgeAttValues[i], edgeAttValues[i]);
            }
        });
        it('handles_XML_NC_NAME_including_XML_NC_NAME_CHAR_correctly', 0, () => {
            // One difference from testXml10Name() is that ':' is invalid here.
            const okFirstChars = [
                '\u0041',
                '\u005a',
                '\u005f',
                '\u0061',
                '\u007a',
                '\u00c0',
                '\u00d6',
                '\u00d8',
                '\u00f6',
                '\u00f8',
                '\u00ff',
                '\u0100',
                '\u4e00',
                '\u9fa5',
                '\uac00',
                '\ud7a3' // XML10_BASE_CHAR
            ];
            const ngFirstChars = [
                '\u002d',
                '\u002e',
                '\u0030',
                '\u0039',
                '\u003a',
                '\u0040',
                '\u005b',
                '\u0060',
                '\u007b',
                '\u00b7',
                '\u00bf',
                '\u00d7',
                '\u00f7',
                '\u0660',
                '\u0300',
                '\u0f29',
                '\u309a',
                '\u30fe',
                '\u4dff',
                '\u9fa6',
                '\uabff',
                '\ud7a4' // Edge char for XML10_BASE_CHAR
            ];
            const okSecondChars = [
                '\u002d',
                '\u002e',
                '\u0030',
                '\u0039',
                '\u0041',
                '\u005a',
                '\u005f',
                '\u0061',
                '\u007a',
                '\u00b7',
                '\u00c0',
                '\u00d6',
                '\u00d8',
                '\u00f6',
                '\u00f8',
                '\u00ff',
                '\u0100',
                '\u0300',
                '\u309a',
                '\u30fe',
                '\u0660',
                '\u0f29',
                '\u4e00',
                '\u9fa5',
                '\uac00',
                '\ud7a3' // XML10_BASE_CHAR
            ];
            const ngSecondChars = [
                '\u003a',
                '\u0040',
                '\u005b',
                '\u0060',
                '\u007b',
                '\u00b6',
                '\u00bf',
                '\u00d7',
                '\u00f7',
                '\u02ff',
                '\u309b',
                '\u30ff',
                '\u4dff',
                '\u9fa6',
                '\uabff',
                '\ud7a4' // Edge char for XML10_BASE_CHAR
            ];
            doTestXmlName('XML_NC_NAME', new RegExp(XML_NC_NAME), okFirstChars, ngFirstChars, okSecondChars, ngSecondChars);
        });
    });
}
