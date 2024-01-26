let __generate__Id: number = 0;
function generateId(): string {
    return "BeflateCover.test_" + ++__generate__Id;
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
import pako from 'pako';
import { deflateInit, deflateSetHeader, deflate, deflateEnd } from './utils';
import { ZStream } from './utils';
import { GlobalContext } from './GlobalContext';
import { onTypeOf13, onTypeOf14, onTypeOf15, onTypeOf5 } from './IntertfaceData';
export default function BeflateCoverTest() {
    // fromCharCode, but understands right > 0xffff values
    describe('BeflateCoverTest', () => {
        let long_sample: string | Uint8Array;
        let c: pako.constants = pako.constants;
        beforeAll(() => {
        });
        beforeEach(() => {
            // globalThis.resourceManager.getMediaContent($r('app.media.lorem_en_100k').id).then((uint8:Uint8Array)=>{
            //   console.log("dodoTag= uint8 length"+uint8.byteLength);
            //   long_sample  = uint8
            // });
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
        let short_sample = 'hello world';
        it('stored', 0, () => {
            testDeflate(short_sample, onTypeOf13(0, 200), 0);
            testDeflate(short_sample, onTypeOf13(0, 10), 5);
        });
        it('fast', 1, () => {
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            testDeflate(short_sample, onTypeOf13(1, 10), 5);
            context.createModuleContext('entry_test').resourceManager.getMediaContent($r('app.media.lorem_en_100k').id).then((uint8: Uint8Array) => {
                long_sample = uint8;
                testDeflate(long_sample, onTypeOf14(1, 1, 10), 0);
            });
        });
        it('slow', 2, () => {
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            testDeflate(short_sample, onTypeOf13(4, 10), 5);
            context.createModuleContext('entry_test').resourceManager.getMediaContent($r('app.media.lorem_en_100k').id).then((uint8: Uint8Array) => {
                long_sample = uint8;
                testDeflate(long_sample, onTypeOf14(9, 1, 10), 0);
            });
        });
        it('rle', 3, () => {
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            testDeflate(short_sample, onTypeOf5(3), 0);
            testDeflate(short_sample, onTypeOf15(3, 10), 5);
            context.createModuleContext('entry_test').resourceManager.getMediaContent($r('app.media.lorem_en_100k').id).then((uint8: Uint8Array) => {
                long_sample = uint8;
                testDeflate(long_sample, onTypeOf15(3, 10), 0);
            });
        });
        it('huffman', 4, () => {
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            testDeflate(short_sample, onTypeOf5(2), 0);
            testDeflate(short_sample, onTypeOf15(2, 10), 5);
            context.createModuleContext('entry_test').resourceManager.getMediaContent($r('app.media.lorem_en_100k').id).then((uint8: Uint8Array) => {
                long_sample = uint8;
                testDeflate(long_sample, onTypeOf15(2, 10), 0);
            });
        });
        //in port checking input parameters was removed
        it('inflatebadparameters', 5, () => {
            let ret: string;
            let deflate1: Object = deflate;
            ret = deflate(null, 0);
            expect(ret).assertDeepEquals(c.Z_STREAM_ERROR);
            let strm: ZStream = new ZStream();
            //
            ret = deflateInit(null);
            expect(ret).assertDeepEquals(c.Z_STREAM_ERROR);
            ret = deflateInit(strm, 6);
            expect(ret).assertDeepEquals(c.Z_OK);
            ret = deflateSetHeader(null);
            expect(ret).assertDeepEquals(c.Z_STREAM_ERROR);
            strm.state.wrap = 1;
            ret = deflateSetHeader(strm, null);
            expect(ret).assertDeepEquals(c.Z_STREAM_ERROR);
            strm.state.wrap = 2;
            ret = deflateSetHeader(strm, null);
            expect(ret).assertDeepEquals(c.Z_OK);
            ret = deflate(strm, c.Z_FINISH);
            expect(ret).assertDeepEquals(c.Z_BUF_ERROR);
            ret = deflateEnd(null);
            expect(ret).assertDeepEquals(c.Z_STREAM_ERROR);
            //BS_NEED_MORE
            strm.state.status = 5;
            ret = deflateEnd(strm);
            expect(ret).assertDeepEquals(c.Z_STREAM_ERROR);
        });
    });
}
function testDeflate(data: string | Uint8Array, opts: object, flush: number): void {
    let deflator: pako.Deflate = new pako.Deflate(opts);
    deflator.push(data, flush);
    deflator.push(data, true);
    let errcode: Error = deflator.err;
    expect(errcode).assertEqual(0);
}
