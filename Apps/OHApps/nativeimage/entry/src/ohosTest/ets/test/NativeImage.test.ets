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
import nativeimage from 'libnativeimage.so'

export default function nativeImageTest() {
  describe('NativeImageTest', () => {
    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_NATIVE_IMAGE_OH_NATIVEIMAGE_CREATE001
     * @tc.name       : testOHNativeImageCreate001
     * @tc.desc       : test OH_NativeImage_Create
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHNativeImageCreate001', 0, async (done: Function) => {
      let result: number = nativeimage.oHNativeImageCreate();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_NATIVE_IMAGE_OH_NATIVEIMAGE_ACQUIRENATIVEWINDOW001
     * @tc.name       : testOHNativeImageAcquireNativeWindow001
     * @tc.desc       : test OH_NativeImage_AcquireNativeWindow
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHNativeImageAcquireNativeWindow001', 0, async (done: Function) => {
      let result: number = nativeimage.oHNativeImageAcquireNativeWindow();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_NATIVE_IMAGE_OH_NATIVEIMAGE_ACQUIRENATIVEWINDOW002
     * @tc.name       : testOHNativeImageAcquireNativeWindow002
     * @tc.desc       : test OH_NativeImage_AcquireNativeWindow
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHNativeImageAcquireNativeWindow002', 0, async (done: Function) => {
      let result: number = nativeimage.oHNativeImageAcquireNativeWindowAbnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_NATIVE_IMAGE_OH_NATIVEIMAGE_ATTACHCONTEXT001
     * @tc.name       : testOHNativeImageAttachContext001
     * @tc.desc       : test OH_NativeImageAttachContext
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHNativeImageAttachContext001', 0, async (done: Function) => {
      let result: number = nativeimage.oHNativeImageAttachContext();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_NATIVE_IMAGE_OH_NATIVEIMAGE_ATTACHCONTEXT002
     * @tc.name       : testOHNativeImageAttachContext002
     * @tc.desc       : test OH_NativeImageAttachContext
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHNativeImageAttachContext002', 0, async (done: Function) => {
      let result: number = nativeimage.oHNativeImageAttachContextAbnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_NATIVE_IMAGE_OH_NATIVEIMAGE_DETACHCONTEXT001
     * @tc.name       : testOHNativeImageDetachContext001
     * @tc.desc       : test OH_NativeImage_DetachContext
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHNativeImageDetachContext001', 0, async (done: Function) => {
      let result: number = nativeimage.oHNativeImageDetachContext();
      expect(result).assertEqual(0);
      done();
    });
   /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_NATIVE_IMAGE_OH_NATIVEIMAGE_DETACHCONTEXT002
     * @tc.name       : testOHNativeImageDetachContext002
     * @tc.desc       : test OH_NativeImage_DetachContext
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHNativeImageDetachContext002', 0, async (done: Function) => {
      let result: number = nativeimage.oHNativeImageDetachContextAbnormal();
      expect(result).assertEqual(-1);
      done();
    });



    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_NATIVE_IMAGE_OH_NATIVEIMAGE_UPDATESURFACEIMAGE001
     * @tc.name       : testOHNativeImageUpdateSurfaceImage001
     * @tc.desc       : test OH_NativeImage_UpdateSurfaceImage
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHNativeImageUpdateSurfaceImage001', 0, async (done: Function) => {
      let result: number = nativeimage.oHNativeImageUpdateSurfaceImage();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_NATIVE_IMAGE_OH_NATIVEIMAGE_UPDATESURFACEIMAGE002
     * @tc.name       : testOHNativeImageUpdateSurfaceImage002
     * @tc.desc       : test OH_NativeImage_UpdateSurfaceImage
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHNativeImageUpdateSurfaceImage002', 0, async (done: Function) => {
      let result: number = nativeimage.oHNativeImageUpdateSurfaceImageAbnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_NATIVE_IMAGE_OH_NATIVEIMAGE_GETTIMESTAMP001
     * @tc.name       : testOHNativeImageGetTimestamp001
     * @tc.desc       : test OH_NativeImage_GetTimestamp
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHNativeImageGetTimestamp001', 0, async (done: Function) => {
      let result: number = nativeimage.oHNativeImageGetTimestamp();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_NATIVE_IMAGE_OH_NATIVEIMAGE_GETTRANSFORMMATRIX001
     * @tc.name       : testOHNativeImageGetTransformMatrix001
     * @tc.desc       : test OH_NativeImage_GetTransformMatrix
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHNativeImageGetTransformMatrix001', 0, async (done: Function) => {
      let result: number = nativeimage.oHNativeImageGetTransformMatrix();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_NATIVE_IMAGE_OH_NATIVEIMAGE_GETTRANSFORMMATRIX002
     * @tc.name       : testOHNativeImageGetTransformMatrix002
     * @tc.desc       : test OH_NativeImage_GetTransformMatrix
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHNativeImageGetTransformMatrix002', 0, async (done: Function) => {
      let result: number = nativeimage.oHNativeImageGetTransformMatrixAbnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_NATIVE_IMAGE_OH_NATIVEIMAGE_DESTROY001
     * @tc.name       : testOHNativeImageDestroy001
     * @tc.desc       : test OH_NativeImage_Destroy
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHNativeImageDestroy001', 0, async (done: Function) => {
      let result: number = nativeimage.oHNativeImageDestroy();
      expect(result).assertEqual(0);
      done();
    });
  })
}
