let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
}
/**
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * */
import * as URL from "url-parse";
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
const parse: any = URL;
export default function abilityTest() {
    describe('ActsAbilityTest', () => {
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
        it('url_correctly', 0, () => {
            const url = 'https://www.example.com/path/to/page.html?query=test#hash';
            const parsedUrl: any = new URL(url);
            expect(parsedUrl.protocol).assertEqual('https:');
            expect(parsedUrl.host).assertEqual('www.example.com');
            expect(parsedUrl.pathname).assertEqual('/path/to/page.html');
            expect(parsedUrl.query).assertEqual('?query=test');
            expect(parsedUrl.hash).assertEqual('#hash');
            expect(parsedUrl.toString()).assertEqual(url);
        });
        it('parameters_correctly', 0, () => {
            const url = 'https://www.example.com/path/to/page.html?query=test&page=1&sort=asc';
            const parsedUrl: any = new URL(url);
            expect(parsedUrl.query).assertEqual("?query=test&page=1&sort=asc");
        });
        it('array_format_correctly', 0, () => {
            const url = 'https://www.example.com/path/to/page.html?colors=red,green,blue';
            const parsedUrl: any = new URL(url);
            expect(parsedUrl.query).assertEqual("?colors=red,green,blue");
        });
        it('exposes_the_location_function', 0, () => {
            expect(typeof parse.location).assertEqual('function');
        });
        it('exposes_the_extractProtocol_function', 0, () => {
            expect(typeof parse.extractProtocol).assertEqual('function');
        });
        it('is_a_function', 0, () => {
            expect(typeof parse.trimLeft).assertEqual('function');
        });
        it('removes_control_characters_on_the_left', 0, () => {
            let i = 0;
            let prefix = '';
            for (; i < 33; i++) {
                prefix = String.fromCharCode(i);
                expect(parse.trimLeft(prefix + prefix + 'lol')).assertEqual('lol');
            }
        });
        it('extracts_the_protocol_data', 0, () => {
            expect(parse.extractProtocol('http://example.com')).assertDeepEquals({
                slashes: true,
                protocol: 'http:',
                rest: 'example.com',
                slashesCount: 2
            });
        });
        it('extracts_the_protocol_data_for_nothing', 0, () => {
            expect(parse.extractProtocol('')).assertDeepEquals({
                slashes: false,
                protocol: '',
                rest: '',
                slashesCount: 0
            });
        });
        it('correctly_resolves_paths', 0, () => {
            expect(parse.extractProtocol('/foo')).assertDeepEquals({
                slashes: false,
                protocol: '',
                rest: '/foo',
                slashesCount: 1
            });
            expect(parse.extractProtocol('//foo/bar')).assertDeepEquals({
                slashes: true,
                protocol: '',
                rest: '//foo/bar',
                slashesCount: 2
            });
        });
        it('does_not_truncate_the_input_string', 0, () => {
            let input = 'foo\x0bbar\x0cbaz\u2028qux\u2029';
            expect(parse.extractProtocol(input)).assertDeepEquals({
                slashes: false,
                protocol: '',
                rest: input,
                slashesCount: 0
            });
        });
        it('trimsLeft', 0, () => {
            expect(parse.extractProtocol('\x0b\x0c javascript://foo')).assertDeepEquals({
                slashes: true,
                protocol: 'javascript:',
                rest: 'foo',
                slashesCount: 2
            });
        });
        it('removes_CR_HT_and_LF', 0, () => {
            expect(parse.extractProtocol('jav\n\rasc\nript\r:/\t/fo\no')).assertDeepEquals({
                slashes: true,
                protocol: 'javascript:',
                rest: 'foo',
                slashesCount: 2
            });
        });
        it('parses_the_query_string_into_an_object', 0, () => {
            let url = 'http://google.com/?foo=bar';
            let data: any = parse(url, true);
            expect(typeof data.query).assertEqual('object');
            expect(data.query.foo).assertEqual('bar');
            url = 'http://google.com/';
            data = parse(url, true);
            expect(typeof data.query).assertEqual('object');
        });
        it('does_not_add_question_mark_to_href_if_query_string_is_empty', 0, () => {
            let url = 'http://google.com/';
            let data: any = parse(url, true);
            expect(data.href).assertEqual(url);
        });
        it('allows_a_custom_function_as_parser', 0, () => {
            let url = 'http://google.com/?foo=bar';
            let data: any = parse(url, () => {
                return '1337';
            });
            expect(data.query).assertEqual('1337');
        });
        it('allows_a_custom_stringify_function', 0, () => {
            let url = 'http://google.com/?foo=bar';
            let data: any = parse(url, true);
            let str: string = data.toString(() => {
                return 'lolcakes';
            });
            expect(str).assertEqual('http://google.com/?lolcakes');
        });
        it('allows_a_custom_location_object', 0, () => {
            let url = '/foo?foo=bar';
            let data: any = parse(url, parse('http://google.com'));
            expect(data.href).assertEqual('http://google.com/foo?foo=bar');
        });
        it('converts_hostname_to_lowercase', 0, () => {
            let url = 'HTTP://fOo.eXaMPle.com';
            expect(parse(url).hostname).assertEqual('foo.example.com');
        });
        it('does_not_lowercase_the_path', 0, () => {
            let url = 'HTTP://X.COM/Y/Z';
            expect(parse(url).pathname).assertEqual('/Y/Z');
        });
        it('removes_default_port_numbers', 0, () => {
            let url = 'http://example.com:80';
            let parsed: any = parse(url);
            expect(parsed.port).assertEqual('');
            expect(parsed.pathname).assertEqual('/');
            expect(parsed.host).assertEqual('example.com');
            expect(parsed.hostname).assertEqual('example.com');
            expect(parsed.href).assertEqual('http://example.com/');
        });
        it('understands_an_as_pathname', 0, () => {
            let url = 'http://example.com:80/';
            let parsed: any = parse(url);
            expect(parsed.port).assertEqual('');
            expect(parsed.username).assertEqual('');
            expect(parsed.password).assertEqual('');
            expect(parsed.pathname).assertEqual('/');
            expect(parsed.host).assertEqual('example.com');
            expect(parsed.hostname).assertEqual('example.com');
            expect(parsed.href).assertEqual('http://example.com/');
        });
        it('correctly_parses_pathnames_for_relative_paths', 0, () => {
            let url = '/dataApi/PROD/ws';
            let parsed: any = parse(url, 'http://localhost:3000/PROD/trends');
            expect(parsed.pathname).assertEqual('/dataApi/PROD/ws');
            url = '/sections/?project=default';
            parsed = parse(url, 'http://example.com/foo/bar');
            expect(parsed.pathname).assertEqual('/sections/');
            expect(parsed.hostname).assertEqual('example.com');
            expect(parsed.href).assertEqual('http://example.com/sections/?project=default');
        });
        it('does_not_care_about_spaces', 0, () => {
            let url = 'http://x.com/path?that\'s#all, folks';
            let parsed: any = parse(url);
            expect(parsed.port).assertEqual('');
            expect(parsed.username).assertEqual('');
            expect(parsed.password).assertEqual('');
            expect(parsed.pathname).assertEqual('/path');
            expect(parsed.hash).assertEqual('#all, folks');
            expect(parsed.query).assertEqual('?that\'s');
            expect(parsed.host).assertEqual('x.com');
            expect(parsed.hostname).assertEqual('x.com');
        });
        it('accepts_in_the_url', 0, () => {
            let url = 'http://x.y.com+a/b/c';
            let parsed: any = parse(url);
            expect(parsed.protocol).assertEqual('http:');
            expect(parsed.host).assertEqual('x.y.com+a');
            expect(parsed.hostname).assertEqual('x.y.com+a');
            expect(parsed.pathname).assertEqual('/b/c');
        });
        it('ignores_in_pathnames', 0, () => {
            let url = 'http://google.com:80\\@yahoo.com/#what\\is going on';
            let parsed: any = parse(url);
            expect(parsed.port).assertEqual('');
            expect(parsed.username).assertEqual('');
            expect(parsed.password).assertEqual('');
            expect(parsed.hostname).assertEqual('google.com');
            expect(parsed.hash).assertEqual('#what\\is going on');
            parsed = parse('http://yolo.com\\what-is-up.com');
            expect(parsed.pathname).assertEqual('/what-is-up.com');
        });
        it('correctly_ignores_multiple_slashes', 0, () => {
            let url = '////what-is-up.com';
            let parsed: any = parse(url, parse('http://google.com'));
            expect(parsed.host).assertEqual('what-is-up.com');
            expect(parsed.href).assertEqual('http://what-is-up.com/');
            url = '\\\\\\\\what-is-up.com';
            parsed = parse(url, parse('http://google.com'));
            expect(parsed.host).assertEqual('what-is-up.com');
            expect(parsed.href).assertEqual('http://what-is-up.com/');
        });
        it('ignores_slashes_after_the_protocol_for_special_URLs', 0, () => {
            let url = 'https:\\/github.com/foo/bar';
            let parsed: any = parse(url);
            expect(parsed.host).assertEqual('github.com');
            expect(parsed.hostname).assertEqual('github.com');
            expect(parsed.pathname).assertEqual('/foo/bar');
            expect(parsed.slashes).assertTrue();
            expect(parsed.href).assertEqual('https://github.com/foo/bar');
            url = 'https:/\\/\\/\\github.com/foo/bar';
            parsed = parse(url);
            expect(parsed.host).assertEqual('github.com');
            expect(parsed.hostname).assertEqual('github.com');
            expect(parsed.pathname).assertEqual('/foo/bar');
            expect(parsed.slashes).assertTrue();
            expect(parsed.href).assertEqual('https://github.com/foo/bar');
            url = 'https:/github.com/foo/bar';
            parsed = parse(url);
            expect(parsed.host).assertEqual('github.com');
            expect(parsed.pathname).assertEqual('/foo/bar');
            expect(parsed.slashes).assertTrue();
            expect(parsed.href).assertEqual('https://github.com/foo/bar');
            url = 'https:\\github.com/foo/bar';
            parsed = parse(url);
            expect(parsed.host).assertEqual('github.com');
            expect(parsed.pathname).assertEqual('/foo/bar');
            expect(parsed.slashes).assertTrue();
            expect(parsed.href).assertEqual('https://github.com/foo/bar');
            url = 'https:github.com/foo/bar';
            parsed = parse(url);
            expect(parsed.host).assertEqual('github.com');
            expect(parsed.pathname).assertEqual('/foo/bar');
            expect(parsed.slashes).assertTrue();
            expect(parsed.href).assertEqual('https://github.com/foo/bar');
            url = 'https:github.com/foo/bar';
            parsed = parse(url);
            expect(parsed.host).assertEqual('github.com');
            expect(parsed.pathname).assertEqual('/foo/bar');
            expect(parsed.slashes).assertTrue();
            expect(parsed.href).assertEqual('https://github.com/foo/bar');
        });
        it('does_not_readd_slashes_to_href_if_there_is_no_protocol', 0, () => {
            let parsed: any = parse('//example.com', {});
            expect(parsed.pathname).assertEqual('//example.com');
            expect(parsed.href).assertEqual('//example.com');
        });
        it('generates_an_origin_property', 0, () => {
            let url = 'http://google.com:80/pathname';
            let parsed: any = parse(url);
            expect(parsed.origin).assertEqual('http://google.com');
        });
        it('is_lowercased', 0, () => {
            let url = 'HTTP://gOogle.cOm:80/pathname';
            let parsed: any = parse(url);
            expect(parsed.origin).assertEqual('http://google.com');
        });
        it('sets_null_if_no_hostname_is_specified', 0, () => {
            let url = 'http://';
            let parsed: any = parse(url, {});
            expect(parsed.origin).assertEqual('null');
        });
        it('is_null_for_non_special_URLs', 0, () => {
            let o: any = parse('foo://example.com/pathname');
            expect(o.hostname).assertEqual('example.com');
            expect(o.pathname).assertEqual('/pathname');
            expect(o.origin).assertEqual('null');
        });
        it('converts_protocol_to_lowercase', 0, () => {
            let url = 'HTTP://example.com';
            expect(parse(url).protocol).assertEqual('http:');
        });
        it('correctly_adds_to_protocol_in_final_url_string', 0, () => {
            let data: any = parse('google.com/foo', {});
            data.set('protocol', 'https');
            expect(data.href).assertEqual('https://google.com/foo');
            data = parse('http://google.com/foo');
            data.set('protocol', 'https:');
            expect(data.href).assertEqual('https://google.com/foo');
        });
        it('updates_the_host_when_updating_hostname', 0, () => {
            let data: any = parse('http://google.com:808/?foo=bar');
            expect(data.set('hostname', 'yahoo.com')).assertEqual(data);
            expect(data.hostname).assertEqual('yahoo.com');
            expect(data.host).assertEqual('yahoo.com:808');
            expect(data.port).assertEqual('808');
            expect(data.href).assertEqual('http://yahoo.com:808/?foo=bar');
        });
        it('updates_slashes_when_updating_protocol', 0, () => {
            let data: any = parse('sip:alice@atlanta.com');
            expect(data.set('protocol', 'https')).assertEqual(data);
            expect(data.href).assertEqual('https://alice@atlanta.com');
            expect(data.set('protocol', 'mailto', false)).assertEqual(data);
            expect(data.href).assertEqual('mailto://alice@atlanta.com');
        });
        it('unsets_the_port_when_port_is_missing_IPv6', 0, () => {
            let data: any = parse('http://google.com/?foo=bar');
            expect(data.set('host', '[56h7::1]')).assertEqual(data);
            expect(data.hostname).assertEqual('[56h7::1]');
            expect(data.host).assertEqual('[56h7::1]');
            expect(data.port).assertEqual('');
            expect(data.href).assertEqual('http://[56h7::1]/?foo=bar');
        });
        it('unsets_the_port_when_the_port_is_missing_from_host', 0, () => {
            let data: any = parse('http://google.com:8000/?foo=bar');
            expect(data.set('host', 'yahoo.com')).assertEqual(data);
            expect(data.hostname).assertEqual('yahoo.com');
            expect(data.host).assertEqual('yahoo.com');
            expect(data.port).assertEqual('');
            expect(data.href).assertEqual('http://yahoo.com/?foo=bar');
        });
        it('should_correctly_handle_relative_URLs', 0, () => {
            const urlString = '/path/to/resource';
            const parsedUrl: any = new URL(urlString);
            expect(parsedUrl.protocol).assertEqual('');
            expect(parsedUrl.hostname).assertEqual('');
            expect(parsedUrl.port).assertEqual('');
            expect(parsedUrl.pathname).assertEqual('/path/to/resource');
            expect(parsedUrl.query).assertEqual('');
            expect(parsedUrl.hash).assertEqual('');
        });
    });
}
