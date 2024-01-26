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

import { describe, it, expect } from "@ohos/hypium"
import audioencoderxdlndk from 'libaudioencoderxdlndk.so'

export default function audioEnCoderNdkTest() {
  describe('MuslAudioEnCoderXdlTest', () => {

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIOENCODER_OH_AUDIOENCODER_CREATEBYMINE_0100
     * @tc.name       : testOhAudioEncoderCreateByMine001
     * @tc.desc       : test OH_AudioEncoder_CreateByMime
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAudioEncoderCreateByMime001', 0, async (done: Function) => {
      expect(audioencoderxdlndk.OH_AudioEncoder_CreateByMime()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIOENCODER_OH_AUDIOENCODER_CREATEBYNAME_0100
     * @tc.name       : testOhAudioEncoderCreateByName001
     * @tc.desc       : test OH_AudioEncoder_CreateByName
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAudioEncoderCreateByName001', 0, async (done: Function) => {
      expect(audioencoderxdlndk.OH_AudioEncoder_CreateByName()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIOENCODER_OH_AUDIOENCODER_DESTROY_0100
     * @tc.name       : testOhAudioEncoderDestroy001
     * @tc.desc       : test OH_AudioEncoder_Destroy
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAudioEncoderDestroy001', 0, async (done: Function) => {
      expect(audioencoderxdlndk.OH_AudioEncoder_Destroy()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIOENCODER_OH_AUDIOENCODER_SETCALLBACK_0100
     * @tc.name       : testOhAudioEncoderSetCallback001
     * @tc.desc       : test OH_AudioEncoder_SetCallback
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAudioEncoderSetCallback001', 0, async (done: Function) => {
      expect(audioencoderxdlndk.OH_AudioEncoder_SetCallback()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIOENCODER_OH_AUDIOENCODER_CONFIGURE_0100
     * @tc.name       : testOhAudioEncoderConfigure001
     * @tc.desc       : test OH_AudioEncoder_Configure
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAudioEncoderConfigure001', 0, async (done: Function) => {
      expect(audioencoderxdlndk.OH_AudioEncoder_Configure()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIOENCODER_OH_AUDIOENCODER_PREPARE_0100
     * @tc.name       : testOhAudioEncoderPrepare001
     * @tc.desc       : test OH_AudioEncoder_Prepare
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAudioEncoderPrepare001', 0, async (done: Function) => {
      expect(audioencoderxdlndk.OH_AudioEncoder_Prepare()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIOENCODER_OH_AUDIOENCODER_START_0100
     * @tc.name       : testOhAudioEncoderStart001
     * @tc.desc       : test OH_AudioEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAudioEncoderStart001', 0, async (done: Function) => {
      expect(audioencoderxdlndk.OH_AudioEncoder_Start()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIOENCODER_OH_AUDIOENCODER_STOP_0100
     * @tc.name       : testOhAudioEncoderStop001
     * @tc.desc       : test OH_AudioEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAudioEncoderStop001', 0, async (done: Function) => {
      expect(audioencoderxdlndk.OH_AudioEncoder_Stop()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIOENCODER_OH_AUDIOENCODER_FLUSH_0100
     * @tc.name       : testOhAudioEncoderFlush001
     * @tc.desc       : test OH_AudioEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAudioEncoderFlush001', 0, async (done: Function) => {
      expect(audioencoderxdlndk.OH_AudioEncoder_Flush()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIOENCODER_OH_AUDIOENCODER_RESET_0100
     * @tc.name       : testOhAudioEncoderReset001
     * @tc.desc       : test OH_AudioEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAudioEncoderReset001', 0, async (done: Function) => {
      expect(audioencoderxdlndk.OH_AudioEncoder_Reset()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIOENCODER_OH_AUDIOENCODER_GETOUTPUTDESCRIPTION_0100
     * @tc.name       : testOhAudioEncoderGetOutputDescription001
     * @tc.desc       : test OH_AudioEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAudioEncoderGetOutputDescription001', 0, async (done: Function) => {
      expect(audioencoderxdlndk.OH_AudioEncoder_GetOutputDescription()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIOENCODER_OH_AUDIOENCODER_SETPARAMETER_0100
     * @tc.name       : testOhAudioEncoderSetParameter001
     * @tc.desc       : test OH_AudioEncoder_SetParameter
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAudioEncoderSetParameter001', 0, async (done: Function) => {
      expect(audioencoderxdlndk.OH_AudioEncoder_SetParameter()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIOENCODER_OH_AUDIOENCODER_ISVALID_0100
     * @tc.name       : testOhAudioEncoderIsValid001
     * @tc.desc       : test OH_AudioEncoder_IsValid
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAudioEncoderIsValid001', 0, async (done: Function) => {
      expect(audioencoderxdlndk.OH_AudioEncoder_IsValid()).assertEqual(0);
      done();
    });
  })
}
