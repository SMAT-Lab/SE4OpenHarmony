/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import { SequentialByteArrayReader } from '@ohos/metadata-extractor';

export default function SequentialAccessTest() {

  describe('SequentialAccessTest',  () =>{
    it('testGetInt8',0, ()=>  {
              let buffer:Int8Array = Int8Array.of(0x00, 0x01, 127, -1);
      let reader:SequentialByteArrayReader= new SequentialByteArrayReader(buffer)
        expect(0).assertEqual(reader.getInt8());
        expect(1).assertEqual(reader.getInt8());
        expect(127).assertEqual(reader.getInt8());
        expect(-1).assertEqual(reader.getInt8());

    })
    it('testGetUInt8',0, ()=>  {
      let buffer:Int8Array = Int8Array.of(0x00, 0x01, 127, 255);
      let reader:SequentialByteArrayReader= new SequentialByteArrayReader(buffer)
      expect(0).assertEqual(reader.getUInt8());
      expect(1).assertEqual(reader.getUInt8());
      expect(127).assertEqual(reader.getUInt8());
      expect(255).assertEqual(reader.getUInt8());

    })
    it('testGetInt16',0, ()=>  {
      let buffer:Int8Array = Int8Array.of(0x00, 0x01, 127, -1);
      let reader:SequentialByteArrayReader= new SequentialByteArrayReader(buffer)
      expect(1).assertEqual(reader.getInt16());
    })

  })
}