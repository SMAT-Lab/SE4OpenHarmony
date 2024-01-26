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
import pako  from 'pako';
import { GlobalContext } from './GlobalContext';
import { onTypeOf8,onTypeOf10,onTypeOf11 } from "./IntertfaceData"
export default function GzipSpecialsTest() {
  // fromCharCode, but understands right > 0xffff values
  let a2s = (array: Uint8Array):string => {
    return String.fromCharCode(...array);
  }

  let Z_SYNC_FLUSH:pako.constants = pako.constants.Z_SYNC_FLUSH;
  describe('gzipspecialsTest', () => {
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

    it('Readcustomheaders',0, () => {

        let context:Context = GlobalContext.getContext().getObject("context") as Context
        context.createModuleContext('entry_test').resourceManager.getMediaContent($r('app.media.gzip_headers').id).then(data=>{

        const inflator:pako.Inflate = new pako.Inflate();
        inflator.push(data);
        expect(inflator.header.name).assertEqual('test name');
        expect(inflator.header.comment).assertEqual('test comment');
        expect(a2s(inflator.header.extra)).assertEqual('test extra');
      });
    });

    it('Writecustomheaders', 1, () => {
      const data = '           ';

      const deflator:pako.Deflate = new pako.Deflate(onTypeOf11(true,true,1234567,15,'test name','test comment', [ 4, 5, 6 ]));
      deflator.push(data, true);

      const inflator:pako.Inflate = new pako.Inflate(onTypeOf10('string'));
      inflator.push(deflator.result);

      expect(inflator.err).assertEqual(0);
      expect(inflator.result).assertEqual(data);

      const header: pako.Inflate = inflator.header;
      expect(header.time).assertEqual(1234567);
      expect(header.os).assertEqual(15);
      expect(header.name).assertEqual('test name');
      expect(header.comment).assertEqual('test comment');
      expect(header.extra).assertDeepEquals(new Uint8Array([ 4, 5, 6 ]));
    });

    // zlib需要node依赖 目前无法测试
    // it('ReadstreamwithSYNCmarksmultistreamsourcefile1',2, () => {
    //   globalThis.resourceManager.getMediaContent($r('app.media.gzip-joined').id).then(data=>{
    //     expect(pako.ungzip(data)).assertDeepEquals(new Uint8Array(zlib.gunzipSync(data))
    //     );
    //   });
    // });
    // zlib需要node依赖 目前无法测试
    // it.skip('Read stream with SYNC marks (multistream source, file 2)', () => {
    //   const data = fs.readFileSync(path.join(__dirname, 'fixtures/gzip-joined-bgzip.gz'));
    //   assert.deepStrictEqual(
    //     // Currently fails with this chunk size
    //     pako.ungzip(data, { chunkSize: 16384 }),
    //     new Uint8Array(zlib.gunzipSync(data))
    //   );
    // });
    it('WritewithZ_SYNC_FLUSH',2, () => {
      const deflator:pako.Deflate = new pako.Deflate(onTypeOf8(true));
      let count = 0;
      deflator.onData =  (chunk:Uint8Array) => {
        deflator.chunks.push(chunk);
        count++;
      };
      deflator.push('12345', Z_SYNC_FLUSH);
      deflator.push('67890', true);
      const flushed:pako.deflator = deflator.result;
      const normal:string = pako.gzip('1234567890');
      expect(count).assertEqual(2);
      expect(pako.ungzip(flushed)).assertDeepEquals(pako.ungzip(normal))
      expect(flushed.length > normal.length).assertTrue()
    });

  })
}











