let __generate__Id: number = 0;
function generateId(): string {
    return "classMIME.test_" + ++__generate__Id;
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it as _it, expect, diff } from '../utils/utils';
import mime from "mime";
import Mime from "mime/Mime";
import { result1, result2, result3, result4, result5, result6 } from "../utils/model";
export default function classMIMETest() {
    describe('classMIMETest', () => {
        _it('new constructor()', () => {
            let mime = new Mime({
                'text/a': ['a', 'a1']
            }, {
                'text/b': ['b', 'b1']
            });
            expect(JSON.stringify(mime["_types"])).to.equal(JSON.stringify({
                a: 'text/a',
                a1: 'text/a',
                b: 'text/b',
                b1: 'text/b',
            }));
            expect(JSON.stringify(mime["_extensions"])).to.equal(JSON.stringify(result2));
        });
        _it('define()', () => {
            let mime = new Mime({
                'text/a': ['a']
            }, {
                'text/b': ['b']
            });
            expect(JSON.stringify(mime["_types"])).to.equal(JSON.stringify(result3));
        });
        _it('define() types', () => {
            let mime = new Mime({
                'text/a': ['*b']
            }, {
                'text/b': ['b']
            });
            expect(JSON.stringify(mime["_types"])).to.equal(JSON.stringify(result5));
            expect(JSON.stringify(mime["_extensions"])).to.equal(JSON.stringify(result6));
        });
        _it('case-insensitive', () => {
            const mime = new Mime({
                'TEXT/UPPER': ['UP'],
                'text/lower': ['low'],
            });
            expect(mime.getType('test.up')).to.equal("text/upper");
            expect(mime.getType('test.UP')).to.equal("text/upper");
            expect(mime.getType('test.low')).to.equal("text/lower");
            expect(mime.getType('test.LOW')).to.equal("text/lower");
        });
        _it('getType()', () => {
            // Upper/lower case
            expect(mime.getType('text.txt')).to.equal("text/plain");
            expect(mime.getType('TEXT.TXT')).to.equal("text/plain");
            // Bare extension
            expect(mime.getType('txt')).to.equal("text/plain");
            expect(mime.getType('.txt')).to.equal("text/plain");
            expect(mime.getType('.bogus')).to.equal(null);
            expect(mime.getType('bogus')).to.equal(null);
            // Non-sensical
            expect(mime.getType(null)).to.equal(null);
            expect(mime.getType(undefined)).to.equal(null);
            // File paths
            expect(mime.getType('dir/text.txt')).to.equal('text/plain');
            expect(mime.getType('dir\\text.txt')).to.equal('text/plain');
            expect(mime.getType('.text.txt')).to.equal('text/plain');
            expect(mime.getType('.txt')).to.equal('text/plain');
            expect(mime.getType('txt')).to.equal('text/plain');
            expect(mime.getType('/path/to/page.html')).to.equal('text/html');
            expect(mime.getType('c:\\path\\to\\page.html')).to.equal('text/html');
            expect(mime.getType('page.html')).to.equal('text/html');
            expect(mime.getType('path/to/page.html')).to.equal('text/html');
            expect(mime.getType('path\\to\\page.html')).to.equal('text/html');
            expect(mime.getType('/txt')).to.equal(null);
            expect(mime.getType('\\txt')).to.equal(null);
            expect(mime.getType('text.nope')).to.equal(null);
            expect(mime.getType('/path/to/file.bogus')).to.equal(null);
            expect(mime.getType('/path/to/json')).to.equal(null);
            expect(mime.getType('/path/to/.json')).to.equal(null);
            expect(mime.getType('/path/to/.config.json')).to.equal('application/json');
            expect(mime.getType('.config.json')).to.equal('application/json');
        });
        _it('getExtension()', () => {
            expect(mime.getExtension('text/html')).to.equal('html');
            expect(mime.getExtension(' text/html')).to.equal('html');
            expect(mime.getExtension('text/html ')).to.equal('html');
            expect(mime.getExtension('application/x-bogus')).to.equal(null);
            expect(mime.getExtension('bogus')).to.equal(null);
            expect(mime.getExtension(null)).to.equal(null);
            expect(mime.getExtension(undefined)).to.equal(null);
        });
    });
}
