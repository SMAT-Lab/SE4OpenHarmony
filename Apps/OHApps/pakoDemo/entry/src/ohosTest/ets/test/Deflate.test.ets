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
import buffer from '@ohos.buffer';
import { GlobalContext } from './GlobalContext';
import { onTypeOf1, onTypeOf12 } from './IntertfaceData';


export default function DeflateTest() {
  // fromCharCode, but understands right > 0xffff values

  describe('deflateTest', () => {
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

    it('handlesmultiplepushes', 0, () => {
      const dict = buffer.from('abcd');
      const deflate: pako.Deflate= new pako.Deflate(onTypeOf1(dict));

      deflate.push(buffer.from('hello').buffer, false);
      deflate.push(buffer.from('hello').buffer, false);
      deflate.push(buffer.from(' world').buffer, true);

      const uncompressed:string = pako.inflate(buffer.from(deflate.result), onTypeOf1(dict));
      expect(new Uint8Array(buffer.from('hellohello world').buffer)).assertDeepEquals(uncompressed)

    });


    it('issue78',1, () => {
        let context:Context = GlobalContext.getContext().getObject("context") as Context
        context.createModuleContext('entry_test').resourceManager.getMediaContent($r('app.media.issue_78').id).then(data=>{

        const deflatedPakoData:string = pako.deflate(data,  onTypeOf12(1));
        const inflatedPakoData:string = pako.inflate(deflatedPakoData);
        expect(data.length).assertEqual(inflatedPakoData.length);
      });

    });

  })
}




