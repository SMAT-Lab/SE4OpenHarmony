let __generate__Id: number = 0;
function generateId(): string {
    return "Inflate.test_" + ++__generate__Id;
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
import { GlobalContext } from './GlobalContext';
import { onTypeOf1, onTypeOf2, onTypeOf3, onTypeOf4, onTypeOf5, onTypeOf6, onTypeOf7, onTypeOf8 } from './IntertfaceData';
import { testInflate } from './pako/helpers';
import { Sample } from "./Sample";
export default function InflateTest() {
    // fromCharCode, but understands right > 0xffff values
    describe('inflateTest', () => {
        beforeAll(() => {
        });
        let samples = new Sample();
        beforeEach(() => {
            let name = [
                'blank',
                'lorem',
                'lorem_cat',
                'lorem_en_100k',
                'lorem_utf_100k'
            ];
            let nameRes = [
                $r('app.media.blank'),
                $r('app.media.lorem'),
                $r('app.media.lorem_cat'),
                $r('app.media.lorem_en_100k'),
                $r('app.media.lorem_utf_100k'),
            ];
            for (let i = 0; i < nameRes.length; i++) {
                let context: Context = GlobalContext.getContext().getObject("context") as Context;
                context.createModuleContext('entry_test').resourceManager.getMediaContent(nameRes[i].id).then(uint8 => {
                    samples[name[i]] = uint8;
                });
            }
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
        it('Forceusemaxwindowsizebydefault', 0, () => {
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            context.createModuleContext('entry_test').resourceManager.getMediaContent($r('app.media.bad_wbits1').id).then(uint81 => {
                context.createModuleContext('entry_test').resourceManager.getMediaContent($r('app.media.bad_wbits').id).then(uint82 => {
                    expect(pako.inflate(uint81)).assertDeepEquals(new Uint8Array(uint82));
                });
            });
            // it('shouldthrowonthewrongdictionary',1, () => {
            //   // const zCompressed = helpers.deflateSync('world', { dictionary: Buffer.from('hello') });
            //   const zCompressed = new Uint8Array([ 120, 187, 6, 44, 2, 21, 43, 207, 47, 202, 73, 1, 0, 6, 166, 2, 41 ]);
            //
            //   try {
            //     let func = function () {
            //       pako.inflate(zCompressed, {
            //         dictionary: 'world'
            //       });
            //     };
            //     func();
            //   }catch (err){
            //     expect(err).assertContain(/need dictionary/)
            //   }
            //   ;
            // //
            // //   assert.throws(function () {
            // //     pako.inflate(zCompressed, { dictionary: 'world' });
            // //   }, /need dictionary/);
            // });
            it('trivialdictionary', 2, () => {
                const dict: string = 'abcdefghijklmnoprstuvwxyz';
                interface dictionaryType {
                    dictionary: string;
                }
                let dictionaryData: dictionaryType = { dictionary: dict };
                testInflate(samples, dictionaryData, dictionaryData);
            });
            it('spdydictionary', 3, () => {
                let context: Context = GlobalContext.getContext().getObject("context") as Context;
                context.createModuleContext('entry_test').resourceManager.getMediaContent($r('app.media.spdy_dict').id).then(uint8 => {
                    let spdyDict: Uint8Array = uint8;
                    testInflate(samples, onTypeOf1(spdyDict), onTypeOf1(spdyDict));
                });
            });
            // it('shouldthrowifdirectoryisnotsuppliedtorawinflate',4, () => {
            //   const dict = 'abcdefghijklmnoprstuvwxyz';
            //   assert.throws(function () {
            //     testInflate(samples, onTypeOf3(true), { raw: true, dictionary: dict });
            //   });
            // });
            it('testsrawinflatewithspdydictionary', 5, () => {
                let context: Context = GlobalContext.getContext().getObject("context") as Context;
                context.createModuleContext('entry_test').resourceManager.getMediaContent($r('app.media.spdy_dict').id).then(uint8 => {
                    let spdyDict: Uint8Array = uint8;
                    testInflate(samples, onTypeOf2(true, spdyDict), onTypeOf2(true, spdyDict));
                });
            });
            it('testsdictionaryasUint8Array', 6, () => {
                const dict = new Uint8Array(100);
                for (let i = 0; i < 100; i++)
                    dict[i] = Math.random() * 256;
                testInflate(samples, onTypeOf1(dict), onTypeOf1(dict));
            });
            it('testsdictionaryasArrayBuffer', 7, () => {
                const dict = new Uint8Array(100);
                for (let i = 0; i < 100; i++)
                    dict[i] = Math.random() * 256;
                testInflate(samples, onTypeOf1(dict.buffer), onTypeOf1(dict));
            });
            // Since difference is only in rwapper, test for store/fast/slow methods are enough
            it('level9', 8, () => {
                testInflate(samples, onTypeOf3(true), onTypeOf4(9, true));
            });
            it('level8', 9, () => {
                testInflate(samples, onTypeOf3(true), onTypeOf4(8, true));
            });
            it('level7', 10, () => {
                testInflate(samples, onTypeOf3(true), onTypeOf4(7, true));
            });
            it('level6', 11, () => {
                testInflate(samples, onTypeOf3(true), onTypeOf4(6, true));
            });
            it('level5', 12, () => {
                testInflate(samples, onTypeOf3(true), onTypeOf4(5, true));
            });
            it('level4', 13, () => {
                testInflate(samples, onTypeOf3(true), onTypeOf4(4, true));
            });
            it('level3', 14, () => {
                testInflate(samples, onTypeOf3(true), onTypeOf4(3, true));
            });
            it('level2', 15, () => {
                testInflate(samples, onTypeOf3(true), onTypeOf4(2, true));
            });
            it('level1', 16, () => {
                testInflate(samples, onTypeOf3(true), onTypeOf4(1, true));
            });
            it('level0', 17, () => {
                testInflate(samples, onTypeOf3(true), onTypeOf4(0, true));
            });
            it('Z_DEFAULT_STRATEGY', 18, () => {
                testInflate(samples, new Object(), onTypeOf5(0));
            });
            it('Z_FILTERED', 19, () => {
                testInflate(samples, new Object(), onTypeOf5(1));
            });
            it('Z_HUFFMAN_ONLY', 20, () => {
                testInflate(samples, new Object(), onTypeOf5(2));
            });
            it('Z_RLE', 21, () => {
                testInflate(samples, new Object(), onTypeOf5(3));
            });
            it('Z_FIXED', 22, () => {
                testInflate(samples, new Object(), onTypeOf5(4));
            });
            it('windowBits15', 23, () => {
                testInflate(samples, new Object(), onTypeOf6(15));
            });
            it('windowBits14', 24, () => {
                testInflate(samples, new Object(), onTypeOf6(14));
            });
            it('windowBits13', 25, () => {
                testInflate(samples, new Object(), onTypeOf6(13));
            });
            it('windowBits12', 26, () => {
                testInflate(samples, new Object(), onTypeOf6(12));
            });
            it('windowBits11', 27, () => {
                testInflate(samples, new Object(), onTypeOf6(11));
            });
            it('windowBits10', 28, () => {
                testInflate(samples, new Object(), onTypeOf6(10));
            });
            it('windowBits9', 29, () => {
                testInflate(samples, new Object(), onTypeOf6(9));
            });
            it('windowBits8', 30, () => {
                testInflate(samples, new Object(), onTypeOf6(8));
            });
            it('level9', 31, () => {
                testInflate(samples, new Object(), onTypeOf7(9));
            });
            it('level8', 32, () => {
                testInflate(samples, new Object(), onTypeOf7(8));
            });
            it('level7', 33, () => {
                testInflate(samples, new Object(), onTypeOf7(7));
            });
            it('level6', 34, () => {
                testInflate(samples, new Object(), onTypeOf7(6));
            });
            it('level5', 35, () => {
                testInflate(samples, new Object(), onTypeOf7(5));
            });
            it('level4', 36, () => {
                testInflate(samples, new Object(), onTypeOf7(4));
            });
            it('level3', 37, () => {
                testInflate(samples, new Object(), onTypeOf7(3));
            });
            it('level2', 38, () => {
                testInflate(samples, new Object(), onTypeOf7(2));
            });
            it('level1', 39, () => {
                testInflate(samples, new Object(), onTypeOf7(1));
            });
            it('level0', 40, () => {
                testInflate(samples, new Object(), onTypeOf7(0));
            });
            it('withautodetect', 41, () => {
                testInflate(samples, new Object(), onTypeOf8(true));
            });
            it('withmethodsetdirectly', 42, () => {
                testInflate(samples, onTypeOf6(16), onTypeOf8(true));
            });
            it('inflatenooptions', 43, () => {
                testInflate(samples, new Object(), new Object());
            });
            it('inflaterawnooptions', 44, () => {
                testInflate(samples, onTypeOf3(true), onTypeOf3(true));
            });
            // it('inflaterawfromcompressedsamples',45, () => {
            //
            //   let name =[
            //     'KW_Rocketry_1',
            //     'shapefile',
            //     'sheet2',
            //     'sheet3',
            //     'sheet4'
            //   ]
            //
            //
            //   let nameRes = [
            //   $r('app.media.KW_Rocketry_1'),
            //   $r('app.media.shapefile'),
            //   $r('app.media.sheet2'),
            //   $r('app.media.sheet3'),
            //   $r('app.media.sheet4'),
            //   ]
            //
            //   var sampleTemp = new Object();
            //   for (let i=0; i<nameRes.length; i++){
            //     globalThis.resourceManager.getMediaContent(nameRes[i].id).then(uint8=>{
            //       sampleTemp[name[i]] = uint8;
            //       const pako_result = pako.inflateRaw(sampleTemp[name[i]]);
            //       // zlib属于node依赖暂无法测试
            //       const zlib_result = zlib.inflateRawSync(sampleTemp[name[i]]);
            //
            //       expect(pako_result).assertDeepEquals(zlib_result);
            //
            //     });
            //   }
            // });
        });
    });
}
