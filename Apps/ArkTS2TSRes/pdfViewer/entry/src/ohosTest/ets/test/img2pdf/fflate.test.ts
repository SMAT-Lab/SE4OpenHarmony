let __generate__Id: number = 0;
function generateId(): string {
    return "fflate.test_" + ++__generate__Id;
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
import Buffer from '@ohos.buffer';
import { deflateSync, inflateSync, gzipSync, gunzipSync, zlibSync, unzlibSync, zipSync, unzipSync, strToU8, strFromU8, compressSync, decompressSync } from '@ohos/img2pdf/src/main/ets/components/fflate/browser';
import { Options } from './interface';
const BASE_COUNT: number = 2000;
export default function fflateTest() {
    describe('FflateTest', () => {
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
        it('deflate_and_inflate_plain', 0, () => {
            const text = 'Hello, world!';
            let uint = new Uint8Array(Buffer.from(text).buffer);
            let options: Options = {
                level: 9
            };
            const compressed: Uint8Array | Uint32Array | Uint16Array = deflateSync(uint, options);
            const decompressed: Array<number> = inflateSync(compressed, undefined);
            expect(decompressed).assertDeepEquals(uint);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                inflateSync(compressed, undefined);
            }
            endTime(startTime, 'deflate_and_inflate_plain');
        });
        it('deflate_and_inflate_binary', 0, () => {
            const data = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
            let options: Options = {
                level: 9
            };
            const compressed: Uint8Array | Uint32Array | Uint16Array = deflateSync(data, options);
            const decompressed: Array<number> = inflateSync(compressed, undefined);
            expect(decompressed).assertDeepEquals(data);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                inflateSync(compressed, undefined);
            }
            endTime(startTime, 'deflate_and_inflate_binary');
        });
        it('gzip_and_ungzip_plain', 0, () => {
            const text = 'Hello, world!';
            let uint = new Uint8Array(Buffer.from(text).buffer);
            let options: Options = {
                level: 9
            };
            const compressed: Uint8Array | Uint32Array | Uint16Array = gzipSync(uint, options);
            const decompressed: Array<number> = gunzipSync(compressed, undefined);
            expect(decompressed).assertDeepEquals(uint);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                gunzipSync(compressed, undefined);
            }
            endTime(startTime, 'gzip_and_ungzip_plain');
        });
        it('gzip_and_ungzip_binary', 0, () => {
            const data = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
            let options: Options = {
                level: 9
            };
            const compressed: Uint8Array | Uint32Array | Uint16Array = gzipSync(data, options);
            const decompressed: Array<number> = gunzipSync(compressed, undefined);
            expect(decompressed).assertDeepEquals(data);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                gunzipSync(compressed, undefined);
            }
            endTime(startTime, 'deflate_and_inflate_binary');
        });
        it('zlib_and_unzlib_plain', 0, () => {
            const text = 'Hello, world!';
            let uint = new Uint8Array(Buffer.from(text).buffer);
            let options: Options = {
                level: 9
            };
            const compressed: Uint8Array | Uint32Array | Uint16Array = zlibSync(uint, options);
            const decompressed: Array<number> = unzlibSync(compressed, undefined);
            expect(decompressed).assertDeepEquals(uint);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                unzlibSync(compressed, undefined);
            }
            endTime(startTime, 'zlib_and_unzlib_plain');
        });
        it('zlib_and_unzlib_binary', 0, () => {
            const data = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
            let options: Options = {
                level: 9
            };
            const compressed: Uint8Array | Uint32Array | Uint16Array = zlibSync(data, options);
            const decompressed: Array<number> = unzlibSync(compressed, undefined);
            expect(decompressed).assertDeepEquals(data);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                unzlibSync(compressed, undefined);
            }
            endTime(startTime, 'zlib_and_unzlib_binary');
        });
        it('zip_and_unzip_plain', 0, () => {
            const text = 'Hello, world!';
            let files: Options = {
                tmp: new Uint8Array(Buffer.from(text).buffer)
            };
            let options: Options = {
                level: 9
            };
            const zippedData: Uint8Array | Uint32Array | Uint16Array = zipSync(files, options);
            const unzippedFiles: Options = unzipSync(zippedData, undefined);
            expect(files).assertDeepEquals(unzippedFiles);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                unzipSync(zippedData, undefined);
            }
            endTime(startTime, 'zip_and_unzip_plain');
        });
        it('zip_and_unzip_binary', 0, () => {
            let testFiles: Options = {
                tmp: new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
            };
            let options: Options = {
                level: 9
            };
            const compressed: Uint8Array | Uint32Array | Uint16Array = zipSync(testFiles, options);
            const decompressed: Options = unzipSync(compressed, undefined);
            expect(decompressed).assertDeepEquals(testFiles);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                unzipSync(compressed, undefined);
            }
            endTime(startTime, 'zip_and_unzip_binary');
        });
        it('strToU8_and_strFromU8_plain', 0, () => {
            const buf: Uint8Array = strToU8('Hello world!', false);
            let options: Options = {
                level: 9
            };
            const compressedString: string = strFromU8(compressSync(buf, options), true);
            const decompressed: Array<number> = decompressSync(strToU8(compressedString, true), undefined);
            const origText: string = strFromU8(decompressed, true);
            expect(origText).assertEqual('Hello world!');
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                strFromU8(decompressed, true);
            }
            endTime(startTime, 'strToU8_and_strFromU8_plain');
        });
        it('compressSync_and_decompressSync_binary', 0, () => {
            const buf: Uint8Array = strToU8('Hello world!', false);
            let options: Options = {
                level: 6,
                mem: 8
            };
            const compressed: Uint8Array | Uint32Array | Uint16Array = compressSync(buf, options);
            const decompressed: Array<number> = decompressSync(compressed, undefined);
            const origText: string = strFromU8(decompressed, true);
            expect(origText).assertEqual('Hello world!');
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                decompressSync(compressed, undefined);
            }
            endTime(startTime, 'compressSync_and_decompressSync_binary');
        });
    });
}
function endTime(startTime: number, tag: string) {
    let endTime: number = new Date().getTime();
    let averageTime = ((endTime - startTime) * 1000 / BASE_COUNT);
    console.info(tag + ":endTime:" + endTime);
    console.log(tag + ":averageTime:" + averageTime + "μs");
}
