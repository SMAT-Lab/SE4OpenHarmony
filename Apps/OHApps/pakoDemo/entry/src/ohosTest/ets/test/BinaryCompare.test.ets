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

import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import pako from 'pako';
import buffer from '@ohos.buffer';
import { GlobalContext } from './GlobalContext';
import { onTypeOf1, onTypeOf12, onTypeOf16, onTypeOf5, onTypeOf6, onTypeOf7 } from './IntertfaceData';


export default function BinaryCmpareTest() {
  // fromCharCode, but understands right > 0xffff values

  describe('binarycompareTest', () => {

    beforeAll( () => {

    })
    let sample:Uint8Array;
    let testSample = (pako_method: Function, sample: Uint8Array, options: object, resid: number | string): void => {
        let context:Context = GlobalContext.getContext().getObject("context") as Context
        context.createModuleContext('entry_test').resourceManager.getMediaContent(resid as number).then(uint8 => {
        let zlib_result: Uint8Array = uint8;
        let pako_result: Uint8Array = pako_method(sample, options);
        // One more hack: gzip header contains OS code, that can vary.
        // Override OS code if requested. For simplicity, we assume it on fixed
        // position (= no additional gzip headers used)
        if (options) zlib_result[9] = pako_result[9];

        expect(pako_result).assertDeepEquals(new Uint8Array(zlib_result))

      });

    }

    beforeEach(() =>{
      let context:Context = GlobalContext.getContext().getObject("context") as Context
      context.createModuleContext('entry_test').resourceManager.getMediaContent($r('app.media.lorem_en_100k').id).then(uint8 => {
        sample = uint8;
      });
    })
    afterEach(() => {
      // Presets a clear action, which is performed after each unit test case ends.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: clear action function.
    })
    afterAll(() => {
      // Presets a clear action, which is performed after all test cases of the test suite end.
      // This API supports only one parameter: clear action function.
    })

    it('deflatenooptions', 0, () => {
      testSample(pako.deflate, sample, new Object(), $r('app.media.deflate').id);
    });

    it('deflaterawnooptions', 1, () => {
      testSample(pako.deflateRaw, sample, new Object(), $r('app.media.deflateRaw').id);
    });

    // OS code in header can vary. Use hack flag to ignore it.
    it('gzipnooptions', 2, () => {
      testSample(pako.gzip, sample, onTypeOf16(true), $r('app.media.gzip').id);
    });


    it('level9', 3, () => {
      testSample(pako.deflate, sample,onTypeOf7(9), $r('app.media.deflate_level_9').id);
    });
    it('level8', 4, () => {
      testSample(pako.deflate, sample, onTypeOf7(8), $r('app.media.deflate_level_8').id);
    });
    it('level7', 5, () => {
      testSample(pako.deflate, sample, onTypeOf7(7), $r('app.media.deflate_level_7').id);
    });
    it('level6', 6, () => {
      testSample(pako.deflate, sample, onTypeOf7(6), $r('app.media.deflate_level_6').id);
    });
    it('level5', 7, () => {
      testSample(pako.deflate, sample, onTypeOf7(5), $r('app.media.deflate_level_5').id);
    });
    it('level4', 8, () => {
      testSample(pako.deflate, sample, onTypeOf7(4), $r('app.media.deflate_level_4').id);
    });
    it('level3', 9, () => {
      testSample(pako.deflate, sample, onTypeOf7(3), $r('app.media.deflate_level_3').id);
    });
    it('level2', 10, () => {
      testSample(pako.deflate, sample,onTypeOf7(2), $r('app.media.deflate_level_2').id);
    });
    it('level1', 11, () => {
      testSample(pako.deflate, sample, onTypeOf7(1), $r('app.media.deflate_level_1').id);
    });
    it('levelfu1implicitdefault', 12, () => {
      testSample(pako.deflate, sample,onTypeOf7(-1), $r('app.media.deflate_level_fu1').id);
    });

    it('windowBits15', 13, () => {
      testSample(pako.deflate, sample,onTypeOf6(15), $r('app.media.deflate_windowBits_15').id);
    });
    it('windowBits14', 14, () => {
      testSample(pako.deflate, sample,onTypeOf6(14), $r('app.media.deflate_windowBits_14').id);
    });
    it('windowBits13', 15, () => {
      testSample(pako.deflate, sample,onTypeOf6(13), $r('app.media.deflate_windowBits_13').id);
    });
    it('windowBits12', 16, () => {
      testSample(pako.deflate, sample,onTypeOf6(12), $r('app.media.deflate_windowBits_12').id);
    });
    it('windowBits11', 17, () => {
      testSample(pako.deflate, sample,onTypeOf6(11), $r('app.media.deflate_windowBits_11').id);
    });
    it('windowBits10', 18, () => {
      testSample(pako.deflate, sample, onTypeOf6(10), $r('app.media.deflate_windowBits_10').id);
    });
    it('windowBits9', 19, () => {
      testSample(pako.deflate, sample,onTypeOf6(9), $r('app.media.deflate_windowBits_9').id);
    });
    it('windowBits8', 20, () => {
      testSample(pako.deflate, sample,onTypeOf6(8), $r('app.media.deflate_windowBits_8').id);
    });
    it('windowBitsfu15implicitraw', 21, () => {
      testSample(pako.deflate, sample, onTypeOf6(-15), $r('app.media.deflate_windowBits_15').id);
    });


    it('memLevel9', 22, () => {
      testSample(pako.deflate, sample, onTypeOf12(9), $r('app.media.deflate_memLevel_9').id);
    });
    it('memLevel8', 23, () => {
      testSample(pako.deflate, sample, onTypeOf12(8), $r('app.media.deflate_memLevel_8').id);
    });
    it('memLevel7', 24, () => {
      testSample(pako.deflate, sample, onTypeOf12(7), $r('app.media.deflate_memLevel_7').id);
    });
    it('memLevel6', 25, () => {
      testSample(pako.deflate, sample,onTypeOf12(6), $r('app.media.deflate_memLevel_6').id);
    });
    it('memLevel5', 26, () => {
      testSample(pako.deflate, sample, onTypeOf12(5), $r('app.media.deflate_memLevel_5').id);
    });
    it('memLevel4', 27, () => {
      testSample(pako.deflate, sample,onTypeOf12(4), $r('app.media.deflate_memLevel_4').id);
    });
    it('memLevel3', 28, () => {
      testSample(pako.deflate, sample, onTypeOf12(3), $r('app.media.deflate_memLevel_3').id);
    });
    it('memLevel2', 29, () => {
      testSample(pako.deflate, sample, onTypeOf12(2), $r('app.media.deflate_memLevel_2').id);
    });
    it('memLevel1', 30, () => {
      testSample(pako.deflate, sample,onTypeOf12(1), $r('app.media.deflate_memLevel_1').id);
    });


    it('Z_DEFAULT_STRATEGY', 31, () => {
      testSample(pako.deflate, sample, onTypeOf5(0), $r('app.media.deflate_strategy_0').id);
    });
    it('Z_FILTERED', 32, () => {
      testSample(pako.deflate, sample, onTypeOf5(1), $r('app.media.deflate_strategy_1').id);
    });
    it('Z_HUFFMAN_ONLY', 33, () => {
      testSample(pako.deflate, sample,onTypeOf5(2), $r('app.media.deflate_strategy_2').id);
    });
    it('Z_RLE', 34, () => {
      testSample(pako.deflate, sample, onTypeOf5(3), $r('app.media.deflate_strategy_3').id);
    });
    it('Z_FIXED', 35, () => {
      testSample(pako.deflate, sample,onTypeOf5(4), $r('app.media.deflate_strategy_4').id);
    });

    // Since difference is only in wrapper, test for store/fast/slow methods are enough
    it('DeflateRAWlevel4', 36, () => {
      testSample(pako.deflateRaw, sample, onTypeOf7(4), $r('app.media.deflateRaw_level_4').id);
    });
    it('DeflateRAWlevel1', 37, () => {
      testSample(pako.deflateRaw, sample,onTypeOf7(1), $r('app.media.deflateRaw_level_1').id);
    });
    it('trivialdictionary', 38, () => {
      const dict = buffer.from('abcdefghijklmnoprstuvwxyz').buffer;
      testSample(pako.deflate, sample, onTypeOf1(dict), $r('app.media.deflate_dictionary_trivial').id);
    });

    it('spdydictionary', 39, () => {
      let spdyDict:Uint8Array;
      let context:Context = GlobalContext.getContext().getObject("context") as Context
        context.createModuleContext('entry_test').resourceManager.getMediaContent($r('app.media.spdy_dict').id).then(uint8 => {
        spdyDict = uint8;
        testSample(pako.deflate, sample, onTypeOf1(spdyDict), 'deflate_dictionary=spdy.bin');
      });
    });
  })
}



