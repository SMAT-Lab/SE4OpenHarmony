/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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

import { describe, expect, it } from '@ohos/hypium'
import nativebuffer from 'libnativebuffer.so'

export default function nativeBufferTest() {
  describe('NativeBufferTest', () => {
    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_NATIVE_BUFFER_OH_NATIVE_BUFFER_ALLOC_0100
     * @tc.name       : testOHNativeBufferAlloc001
     * @tc.desc       : test OH_NativeBuffer_Alloc
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHNativeBufferAlloc001', 0, async (done: Function) => {
      let result: number = nativebuffer.oHNativeBufferAlloc();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_NATIVE_BUFFER_OH_NATIVE_BUFFER_REFERENCE_0100
     * @tc.name       : testOHNativeBufferReference001
     * @tc.desc       : test OH_NativeBuffer_Reference
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHNativeBufferReference001', 0, async (done: Function) => {
      let result: number = nativebuffer.oHNativeBufferReference();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_NATIVE_BUFFER_OH_NATIVE_BUFFER_UNREFERENCE_0100
     * @tc.name       : testOHNativeBufferUnreference001
     * @tc.desc       : test OH_NativeBuffer_Unreference
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHNativeBufferUnreference001', 0, async (done: Function) => {
      let result: number = nativebuffer.oHNativeBufferUnreference();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_NATIVE_BUFFER_OH_NATIVE_BUFFER_GETCONFIG_0100
     * @tc.name       : testOHNativeBufferGetConfig001
     * @tc.desc       : test OH_NativeBuffer_GetConfig
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHNativeBufferGetConfig001', 0, async (done: Function) => {
      let result: number = nativebuffer.oHNativeBufferGetConfig();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_NATIVE_BUFFER_OH_NATIVE_BUFFER_MAP_0100
     * @tc.name       : testOHNativeBufferMap001
     * @tc.desc       : test OH_NativeBuffer_Map
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHNativeBufferMap001', 0, async (done: Function) => {
      let result: number = nativebuffer.oHNativeBufferMap();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_NATIVE_BUFFER_OH_NATIVE_BUFFER_UNMAP_0100
     * @tc.name       : testOHNativeBufferUnmap001
     * @tc.desc       : test OH_NativeBuffer_Unmap
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHNativeBufferUnmap001', 0, async (done: Function) => {
      let result: number = nativebuffer.oHNativeBufferUnmap();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_NATIVE_BUFFER_OH_NATIVE_BUFFER_GETSEQNUM_0100
     * @tc.name       : testOHNativeBufferGetSeqNum001
     * @tc.desc       : test OH_NativeBuffer_GetSeqNum
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHNativeBufferGetSeqNum001', 0, async (done: Function) => {
      let result: number = nativebuffer.oHNativeBufferGetSeqNum();
      expect(result).assertEqual(0);
      done();
    });


    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_NATIVE_BUFFER_OH_NATIVE_BUFFER_ALLOC_0200
     * @tc.name       : testOHNativeBufferAlloc002
     * @tc.desc       : test OH_NativeBuffer_Alloc
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHNativeBufferAlloc002', 0, async (done: Function) => {
      let result: number = nativebuffer.oHNativeBufferAllocAbnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_NATIVE_BUFFER_OH_NATIVE_BUFFER_REFERENCE_0200
     * @tc.name       : testOHNativeBufferReference002
     * @tc.desc       : test OH_NativeBuffer_Reference
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHNativeBufferReference002', 0, async (done: Function) => {
      let result: number = nativebuffer.oHNativeBufferReferenceAbnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_NATIVE_BUFFER_OH_NATIVE_BUFFER_UNREFERENCE_0200
     * @tc.name       : testOHNativeBufferUnreference002
     * @tc.desc       : test OH_NativeBuffer_Unreference
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHNativeBufferUnreference002', 0, async (done: Function) => {
      let result: number = nativebuffer.oHNativeBufferUnreferenceAbnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_NATIVE_BUFFER_OH_NATIVE_BUFFER_MAP_0200
     * @tc.name       : testOHNativeBufferMap002
     * @tc.desc       : test OH_NativeBuffer_Map
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHNativeBufferMap002', 0, async (done: Function) => {
      let result: number = nativebuffer.oHNativeBufferMapAbnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_NATIVE_BUFFER_OH_NATIVE_BUFFER_UNMAP_0200
     * @tc.name       : testOHNativeBufferUnmap002
     * @tc.desc       : test OH_NativeBuffer_Unmap
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHNativeBufferUnmap002', 0, async (done: Function) => {
      let result: number = nativebuffer.oHNativeBufferUnmapAbnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_NATIVE_BUFFER_OH_NATIVE_BUFFER_GETSEQNUM_0200
     * @tc.name       : testOHNativeBufferGetSeqNum002
     * @tc.desc       : test OH_NativeBuffer_GetSeqNum
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHNativeBufferGetSeqNum002', 0, async (done: Function) => {
      let result: number = nativebuffer.oHNativeBufferGetSeqNumAbnormal();
      expect(result).assertEqual(-1);
      done();
    });

  })
}
