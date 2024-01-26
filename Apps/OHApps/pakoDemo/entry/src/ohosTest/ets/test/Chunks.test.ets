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
import { GlobalContext } from './GlobalContext';
import { testChunk } from './utils'

export default function ChunksTest() {
  // fromCharCode, but understands right > 0xffff values

  describe('chunksTest', () =>{
    beforeAll(() => {

    })

    beforeEach(() => {

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

    let randomBuf:(size:number) =>  Uint8Array = (size) => {
      const buf = new Uint8Array(size);
      for (let i = 0; i < size; i++) {
        buf[i] = Math.round(Math.random() * 256);
      }
      return buf;
    }

    it('deflate100bby1bchunk', 0, () => {
      const buf: Uint8Array = randomBuf(100);
      const deflated: Uint8Array = pako.deflate(buf);
      let result: Pako = testChunk(buf, deflated, new pako.Deflate(), 1)
      expect(result.result).assertDeepEquals(deflated)
      expect(result.flushCount).assertEqual(result.expFlushCount)
    });

    it('deflate20000bby10bchunk', 1, () => {
      const buf: Uint8Array = randomBuf(20000);
      const deflated: Uint8Array = pako.deflate(buf);
      let result: Pako = testChunk(buf, deflated,new pako.Deflate(), 10);
      expect(result.result).assertDeepEquals(deflated)
      expect(result.flushCount).assertEqual(result.expFlushCount)
    });

    it('inflate100bresultby1bchunk', 2, () => {
      const buf: Uint8Array = randomBuf(100);
      const deflated: Uint8Array = pako.deflate(buf);
      let result: Pako = testChunk(deflated, buf, new pako.Inflate(), 1);
      expect(result.result).assertDeepEquals(buf)
      expect(result.flushCount).assertEqual(result.expFlushCount)
    });


    // 测试失败
    it('inflate20000bresultby10bchunk', 3, () => {
      const buf: Uint8Array = randomBuf(20000);
      const deflated: Uint8Array = pako.deflate(buf);
      let result: Pako = testChunk(deflated, buf, new pako.Inflate(), 10);
      expect(result.result).assertDeepEquals(buf)
      expect(result.flushCount).assertEqual(result.expFlushCount)
    });

    // 测试失败
    it('deflateend', 4, () => {
       let context:Context = GlobalContext.getContext().getObject("context") as Context
      // const data = samples['lorem_utf_100k'];
        context.createModuleContext('entry_test').resourceManager.getMediaContent($r('app.media.lorem_utf_100k').id).then(data => {
        console.log("dodoTag data =" + data.byteLength)
        const deflator:pako.Deflate = new pako.Deflate();
        deflator.push(data);
        deflator.push([], true);
        expect(deflator.result).assertDeepEquals(pako.deflate(data))
      });


    });

    it('inflateend', 5, () => {
        let context:Context = GlobalContext.getContext().getObject("context") as Context
        context.createModuleContext('entry_test').resourceManager.getMediaContent($r('app.media.lorem_utf_100k').id).then(data => {
        const inflator: pako.Inflate = new pako.Inflate();
        inflator.push(data);
        expect(inflator.result).assertDeepEquals(pako.inflate(data))
      });
    });


    it('shouldbeokonbufferborder', 6, () => {
      let i:number;
      const data = new Uint8Array(1024 * 1 + 1);

      for (i = 0; i < data.length; i++) {
        data[i] = Math.floor(Math.random() * 255.999);
      }

      const deflated:pako.deflate = pako.deflate(data);

      const inflator: pako.Inflate= new pako.Inflate();

      for (i = 0; i < deflated.length; i++) {
        inflator.push(deflated.subarray(i, i + 1), false);

      }

      inflator.push(new Uint8Array(0));


      expect(data).assertDeepEquals(inflator.result)
      // expect(1).assertEqual(1)
    });

  })
}

interface Pako {
  result?: Uint8Array,
  flushCount?: number,
  expFlushCount?: number
}




