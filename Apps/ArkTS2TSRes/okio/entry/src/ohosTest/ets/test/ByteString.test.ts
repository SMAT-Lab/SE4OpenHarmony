let __generate__Id: number = 0;
function generateId(): string {
    return "ByteString.test_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@ohos/hypium';
import { ByteString } from '@ohos/okio';
import buffer from '@ohos.buffer';
interface Data {
    data;
    Base64: () => Data;
    Hex: () => Data;
    md5: () => Data;
}
interface ByteStringObj {
    ByteString: (str: string) => ByteStringObj;
    decodeBase64: (str: string) => Data;
    decodeHex: (str: string) => Data;
    encodeUtf8: (str: string) => Data;
    of: (arr: string[]) => Data;
    toAsciiLowercase: (arr: string[]) => Data;
    toAsciiUppercase: (arr: string[]) => Data;
    toByteArray: () => string;
    internalArray: () => string;
    hashCode: () => number;
}
let byteStringObj: ByteStringObj;
export default function byteStringTest() {
    describe('byrtStringTest', () => {
        beforeAll(() => {
        });
        beforeEach(() => {
            byteStringObj = new ByteString.ByteString('');
        });
        afterEach(() => {
        });
        afterAll(() => {
        });
        it('decodeBase64', 0, () => {
            let str = '';
            if (byteStringObj.decodeBase64('SGVsbG8gd29ybGQ=') && byteStringObj.decodeBase64('SGVsbG8gd29ybGQ=').data as string && byteStringObj.decodeBase64('SGVsbG8gd29ybGQ=').data instanceof Int8Array) {
                str = buffer.from(byteStringObj.decodeBase64('SGVsbG8gd29ybGQ=').data.buffer).toString("utf8");
            }
            expect(str).assertEqual('Hello world');
        });
        it('decodeHex', 0, () => {
            let str = '';
            if (byteStringObj.decodeHex('3B67E4EB') && byteStringObj.decodeHex('3B67E4EB').data as string && byteStringObj.decodeHex('3B67E4EB').data instanceof Int8Array) {
                str = buffer.from(byteStringObj.decodeHex('3B67E4EB').data.buffer).toString('utf8');
            }
            expect(str).assertEqual(';gäë');
        });
        it('encodeUtf8', 0, () => {
            let str = '';
            if (byteStringObj.encodeUtf8('Hello Word #4 ❤ （!!!∑(ﾟДﾟノ)ノ） ') && byteStringObj.encodeUtf8('Hello Word #4 ❤ （!!!∑(ﾟДﾟノ)ノ） ').data as string && byteStringObj.encodeUtf8('Hello Word #4 ❤ （!!!∑(ﾟДﾟノ)ノ） ').data instanceof Int8Array) {
                str = buffer.from(byteStringObj.encodeUtf8('Hello Word #4 ❤ （!!!∑(ﾟДﾟノ)ノ） ').data.buffer).toString('utf8');
            }
            // Hello Word #4 &#x2764; &#xFF08;!!!&#x2211;(&#xFF9F;&#x0414;&#xFF9F;&#x30CE;)&#x30CE;&#xFF09; TODO encodeUtf8的值不正确 需要处理
            expect(str)
                .assertEqual("Hello Word #4 ❤ （!!!∑(ﾟДﾟノ)ノ） ");
        });
        it('byteStringObjOf', 0, () => {
            let str = '';
            if (byteStringObj.of(['hello', 'world']) && byteStringObj.of(['hello', 'world']).data as string && byteStringObj.of(['hello', 'world']).data instanceof Array) {
                for (let i = 0; i < byteStringObj.of(['hello', 'world']).data.length; i++) {
                    str += byteStringObj.of(['hello', 'world']).data[i];
                }
            }
            expect(str).assertEqual('helloworld');
        });
        it('toAsciiLowercase', 0, () => {
            let str = '';
            if (byteStringObj.toAsciiLowercase(['HELLO WORLD']) && byteStringObj.toAsciiLowercase(['HELLO WORLD']).data as string && byteStringObj.toAsciiLowercase(['HELLO WORLD']).data instanceof Array) {
                for (let i = 0; i < byteStringObj.toAsciiLowercase(['HELLO WORLD']).data.length; i++) {
                    str += String.fromCharCode(byteStringObj.toAsciiLowercase(['HELLO WORLD']).data[i]);
                }
            }
            expect(str).assertEqual('hello world');
        });
        it('toAsciiUppercase', 0, () => {
            let str = '';
            if (byteStringObj.toAsciiUppercase(['hello world']) && byteStringObj.toAsciiUppercase(['hello world']).data as string && byteStringObj.toAsciiUppercase(['hello world']).data instanceof Array) {
                for (let i = 0; i < byteStringObj.toAsciiUppercase(['hello world']).data.length; i++) {
                    str += String.fromCharCode(byteStringObj.toAsciiUppercase(['hello world']).data[i]);
                }
            }
            expect(str).assertEqual('HELLO WORLD');
        });
        it('toByteArray', 0, () => {
            byteStringObj = new ByteString.ByteString('hello world');
            expect(byteStringObj.toByteArray()).assertEqual('hello world');
        });
        it('internalArray', 0, () => {
            byteStringObj = new ByteString.ByteString('hello world');
            expect(byteStringObj.internalArray()).assertEqual('hello world');
        });
        it('hashCode', 0, () => {
            byteStringObj = new ByteString.ByteString('hello world');
            expect(byteStringObj.hashCode()).assertEqual(1923188771);
        });
        it('compareToOther', 0, () => {
            expect(new ByteString.ByteString('a').compareToOther(new ByteString.ByteString('cadsd'))).assertEqual(-1);
        });
        it('getSize', 0, () => {
            let inputData = 'abcdesgsd213';
            expect(new ByteString.ByteString(inputData).getSize()).assertEqual(12);
        });
        it('encodeUtf8Base64', 0, () => {
            expect(byteStringObj.encodeUtf8('Hello World').Base64()).assertEqual('SGVsbG8gV29ybGQ=');
        });
        it('encodeUtf8Hex', 0, () => {
            expect(byteStringObj.encodeUtf8('Hello World').Hex()).assertEqual('48656c6c6f20576f726c64');
        });
        it('encodeUtf8Md5Hex', 0, () => {
            expect(byteStringObj.encodeUtf8('Hello World test test').md5().Hex()).assertEqual('4218c51d52aa0edc46cd2e9ccedbe785');
        });
    });
}
