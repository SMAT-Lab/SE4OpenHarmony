let __generate__Id: number = 0;
function generateId(): string {
    return "DB.test_" + ++__generate__Id;
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
export default function DBTest() {
    describe('DBTest', () => {
        _it('Specific types', () => {
            // Assortment of types we sanity check for good measure
            expect(mime.getType('html')).to.equal('text/html');
            expect(mime.getType('js')).to.equal('application/javascript');
            expect(mime.getType('json')).to.equal('application/json');
        });
        _it('Specific types other', () => {
            expect(mime.getType('rtf')).to.equal('application/rtf');
            expect(mime.getType('txt')).to.equal('text/plain');
        });
        _it('Specific types main', () => {
            expect(mime.getType('xml')).to.equal('application/xml');
            expect(mime.getType('wasm')).to.equal('application/wasm');
        });
        _it('Specific extensions', () => {
            expect(mime.getExtension('text/html;charset=UTF-8')).to.equal('html');
            expect(mime.getExtension('text/HTML; charset=UTF-8')).to.equal('html');
            expect(mime.getExtension('text/html; charset=UTF-8')).to.equal('html');
            expect(mime.getExtension('text/html; charset=UTF-8 ')).to.equal('html');
        });
        _it('Specific extensions one', () => {
            expect(mime.getExtension('text/html ; charset=UTF-8')).to.equal('html');
            expect(mime.getExtension(mime["_types"].text)).to.equal('txt');
            expect(mime.getExtension(mime["_types"].htm)).to.equal('html');
        });
        _it('Specific extensions two', () => {
            expect(mime.getExtension('application/octet-stream')).to.equal('bin');
            expect(mime.getExtension('application/octet-stream ')).to.equal('bin');
            expect(mime.getExtension(' text/html; charset=UTF-8')).to.equal('html');
        });
        _it('Specific extensions three', () => {
            expect(mime.getExtension('unrecognized')).to.equal(null);
            expect(mime.getExtension('text/xml')).to.equal("xml"); // See #180
        });
    });
}
