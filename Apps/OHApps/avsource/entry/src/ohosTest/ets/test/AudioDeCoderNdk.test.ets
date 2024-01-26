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
import audiodecoderxdlndk from 'libaudiodecoderxdlndk.so'

export default function audioDeCoderNdkTest() {
  describe('AvcodecAudioDecoderTest', () => {

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_CREATEBYMINE_0100
     * @tc.name       : testOhAudioDecoderCreateByMine001
     * @tc.desc       : test OH_AudioDecoder_CreateByMime
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAudioDecoderCreateByMine001', 0, async (done: Function) => {
      expect(audiodecoderxdlndk.OH_AudioDecoder_CreateByMime()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_CREATEBYNAME_0100
     * @tc.name       : testOhAudioDecoderCreateByName001
     * @tc.desc       : test OH_AudioDecoder_CreateByName
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAudioDecoderCreateByName001', 0, async (done: Function) => {
      expect(audiodecoderxdlndk.OH_AudioDecoder_CreateByName()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_DESTROY_0100
     * @tc.name       : testOhAudioDecoderDestroy001
     * @tc.desc       : test OH_AudioDecoder_Destroy
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAudioDecoderDestroy001', 0, async (done: Function) => {
      expect(audiodecoderxdlndk.OH_AudioDecoder_Destroy()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_SETCALLBACK_0100
     * @tc.name       : testOhAudioDecoderSetCallback001
     * @tc.desc       : test OH_AudioDecoder_SetCallback
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAudioDecoderSetCallback001', 0, async (done: Function) => {
      expect(audiodecoderxdlndk.OH_AudioDecoder_SetCallback()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_CONFIGURE_0100
     * @tc.name       : testOhAudioDecoderConfigure001
     * @tc.desc       : test OH_AudioDecoder_Configure
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAudioDecoderConfigure001', 0, async (done: Function) => {
      expect(audiodecoderxdlndk.OH_AudioDecoder_Configure()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_PREPARE_0100
     * @tc.name       : testOhAudioDecoderPrepare001
     * @tc.desc       : test OH_AudioDecoder_Prepare
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAudioDecoderPrepare001', 0, async (done: Function) => {
      expect(audiodecoderxdlndk.OH_AudioDecoder_Prepare()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_START_0100
     * @tc.name       : testOhAudioDecoderStart001
     * @tc.desc       : test OH_AudioDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAudioDecoderStart001', 0, async (done: Function) => {
      expect(audiodecoderxdlndk.OH_AudioDecoder_Start()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_STOP_0100
     * @tc.name       : testOhAudioDecoderStop001
     * @tc.desc       : test OH_AudioDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAudioDecoderStop001', 0, async (done: Function) => {
      expect(audiodecoderxdlndk.OH_AudioDecoder_Stop()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_FLUSH_0100
     * @tc.name       : testOhAudioDecoderFlush001
     * @tc.desc       : test OH_AudioDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAudioDecoderFlush001', 0, async (done: Function) => {
      expect(audiodecoderxdlndk.OH_AudioDecoder_Flush()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_RESET_0100
     * @tc.name       : testOhAudioDecoderReset001
     * @tc.desc       : test OH_AudioDecoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAudioDecoderReset001', 0, async (done: Function) => {
      expect(audiodecoderxdlndk.OH_AudioDecoder_Reset()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_GETOUTPUTDESCRIPTION_0100
     * @tc.name       : testOhAudioDecoderGetOutputDescription001
     * @tc.desc       : test OH_AudioDecoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAudioDecoderGetOutputDescription001', 0, async (done: Function) => {
      expect(audiodecoderxdlndk.OH_AudioDecoder_GetOutputDescription()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_SETPARAMETER_0100
     * @tc.name       : testOhAudioDecoderSetParameter001
     * @tc.desc       : test OH_AudioDecoder_SetParameter
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAudioDecoderSetParameter001', 0, async (done: Function) => {
      expect(audiodecoderxdlndk.OH_AudioDecoder_SetParameter()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_ISVALID_0100
     * @tc.name       : testOhAudioDecoderIsValid001
     * @tc.desc       : test OH_AudioDecoder_IsValid
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAudioDecoderIsValid001', 0, async (done: Function) => {
      expect(audiodecoderxdlndk.OH_AudioDecoder_IsValid()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_CREATEBYNAME_0200
     * @tc.name       : testOHAudioDecoderCreateByName002
     * @tc.desc       : test OH_AudioDecoder_CreateByName
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAudioDecoderCreateByName002', 0, async (done: Function) => {
      let result: number = audiodecoderxdlndk.OHAudioDecoderCreateByNameAnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_CREATEBYNAME_0300
     * @tc.name       : testOHAudioDecoderCreateByName003
     * @tc.desc       : test OH_AudioDecoder_CreateByName
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAudioDecoderCreateByName003', 0, async (done: Function) => {
      let result: number = audiodecoderxdlndk.OHAudioDecoderCreateByNameBnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_CREATEBYNAME_0400
     * @tc.name       : testOHAudioDecoderCreateByName004
     * @tc.desc       : test OH_AudioDecoder_CreateByName
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAudioDecoderCreateByName004', 0, async (done: Function) => {
      let result: number = audiodecoderxdlndk.OHAudioDecoderCreateByNameCnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_DESTROY_0200
     * @tc.name       : testOHAudioDecoderDestroy002
     * @tc.desc       : test OH_AudioDecoder_Destroy
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAudioDecoderDestroy002', 0, async (done: Function) => {
      let result: number = audiodecoderxdlndk.OHAudioDecoderDestroyAnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_DESTROY_0300
     * @tc.name       : testOHAudioDecoderDestroy003
     * @tc.desc       : test OH_AudioDecoder_Destroy
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAudioDecoderDestroy003', 0, async (done: Function) => {
      let result: number = audiodecoderxdlndk.OHAudioDecoderDestroyBnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_DESTROY_0400
     * @tc.name       : testOHAudioDecoderDestroy004
     * @tc.desc       : test OH_AudioDecoder_Destroy
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAudioDecoderDestroy004', 0, async (done: Function) => {
      let result: number = audiodecoderxdlndk.OHAudioDecoderDestroyCnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_START_0200
     * @tc.name       : testOHAudioDecoderStart002
     * @tc.desc       : test OH_AudioDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAudioDecoderStart002', 0, async (done: Function) => {
      let result: number = audiodecoderxdlndk.OHAudioDecoderStartAnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_START_0300
     * @tc.name       : testOHAudioDecoderStart003
     * @tc.desc       : test OH_AudioDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAudioDecoderStart003', 0, async (done: Function) => {
      let result: number = audiodecoderxdlndk.OHAudioDecoderStartBnormal();
      expect(result).assertEqual(0);
      done();
    });

     /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_START_0400
     * @tc.name       : testOHAudioDecoderStart004
     * @tc.desc       : test OH_AudioDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAudioDecoderStart004', 0, async (done: Function) => {
      let result: number = audiodecoderxdlndk.OHAudioDecoderStartCnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_STOP_0200
     * @tc.name       : testOHAudioDecoderStop002
     * @tc.desc       : test OH_AudioDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAudioDecoderStop002', 0, async (done: Function) => {
      let result: number = audiodecoderxdlndk.OHAudioDecoderStopAnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_STOP_0300
     * @tc.name       : testOHAudioDecoderStop003
     * @tc.desc       : test OH_AudioDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAudioDecoderStop003', 0, async (done: Function) => {
      let result: number = audiodecoderxdlndk.OHAudioDecoderStopBnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_STOP_0400
     * @tc.name       : testOHAudioDecoderStop004
     * @tc.desc       : test OH_AudioDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAudioDecoderStop004', 0, async (done: Function) => {
      let result: number = audiodecoderxdlndk.OHAudioDecoderStopCnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_FLUSH_0200
     * @tc.name       : testOHAudioDecoderFlush002
     * @tc.desc       : test OH_AudioDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAudioDecoderFlush002', 0, async (done: Function) => {
      let result: number = audiodecoderxdlndk.OHAudioDecoderFlushAnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_FLUSH_0300
     * @tc.name       : testOHAudioDecoderFlush003
     * @tc.desc       : test OH_AudioDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAudioDecoderFlush003', 0, async (done: Function) => {
      let result: number = audiodecoderxdlndk.OHAudioDecoderFlushBnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_FLUSH_0400
     * @tc.name       : testOHAudioDecoderFlush004
     * @tc.desc       : test OH_AudioDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAudioDecoderFlush004', 0, async (done: Function) => {
      let result: number = audiodecoderxdlndk.OHAudioDecoderFlushCnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_RESET_0200
     * @tc.name       : testOHAudioDecoderReset002
     * @tc.desc       : test OH_AudioDecoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAudioDecoderReset002', 0, async (done: Function) => {
      let result: number = audiodecoderxdlndk.OHAudioDecoderResetAnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_RESET_0300
     * @tc.name       : testOHAudioDecoderReset003
     * @tc.desc       : test OH_AudioDecoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAudioDecoderReset003', 0, async (done: Function) => {
      let result: number = audiodecoderxdlndk.OHAudioDecoderResetBnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_RESET_0400
     * @tc.name       : testOHAudioDecoderReset004
     * @tc.desc       : test OH_AudioDecoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAudioDecoderReset004', 0, async (done: Function) => {
      let result: number = audiodecoderxdlndk.OHAudioDecoderResetCnormal();
      expect(result).assertEqual(-1);
      done();
    });

     /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_GETOUTPUTDESCRIPTION_0200
     * @tc.name       : testOHAudioDecoderGetOutputDescription002
     * @tc.desc       : test OH_AudioDecoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAudioDecoderGetOutputDescription002', 0, async (done: Function) => {
      let result: number = audiodecoderxdlndk.OHAudioDecoderGetOutputDescriptionAnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_GETOUTPUTDESCRIPTION_0300
     * @tc.name       : testOHAudioDecoderGetOutputDescription003
     * @tc.desc       : test OH_AudioDecoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAudioDecoderGetOutputDescription003', 0, async (done: Function) => {
      let result: number = audiodecoderxdlndk.OHAudioDecoderGetOutputDescriptionBnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_GETOUTPUTDESCRIPTION_0400
     * @tc.name       : testOHAudioDecoderGetOutputDescription004
     * @tc.desc       : test OH_AudioDecoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAudioDecoderGetOutputDescription004', 0, async (done: Function) => {
      let result: number = audiodecoderxdlndk.OHAudioDecoderGetOutputDescriptionCnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_SETPARAMETER_0200
     * @tc.name       : testOHAudioDecoderSetParameter002
     * @tc.desc       : test OH_AudioDecoder_SetParameter
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAudioDecoderSetParameter002', 0, async (done: Function) => {
      let result: number = audiodecoderxdlndk.OHAudioDecoderSetParameterAnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_SETPARAMETER_0300
     * @tc.name       : testOHAudioDecoderSetParameter003
     * @tc.desc       : test OH_AudioDecoder_SetParameter
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAudioDecoderSetParameter003', 0, async (done: Function) => {
      let result: number = audiodecoderxdlndk.OHAudioDecoderSetParameterBnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_SETPARAMETER_0400
     * @tc.name       : testOHAudioDecoderSetParameter004
     * @tc.desc       : test OH_AudioDecoder_SetParameter
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAudioDecoderSetParameter004', 0, async (done: Function) => {
      let result: number = audiodecoderxdlndk.OHAudioDecoderSetParameterCnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_ISVALID_0200
     * @tc.name       : testOHAudioDecoderIsValid002
     * @tc.desc       : test OH_AudioDecoder_IsValid
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAudioDecoderIsValid002', 0, async (done: Function) => {
      let result: number = audiodecoderxdlndk.OHAudioDecoderIsValidAnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_ISVALID_0300
     * @tc.name       : testOHAudioDecoderIsValid003
     * @tc.desc       : test OH_AudioDecoder_IsValid
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAudioDecoderIsValid003', 0, async (done: Function) => {
      let result: number = audiodecoderxdlndk.OHAudioDecoderIsValidBnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AUDIODECODER_OH_AUDIODECODER_ISVALID_0400
     * @tc.name       : testOHAudioDecoderIsValid004
     * @tc.desc       : test OH_AudioDecoder_IsValid
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAudioDecoderIsValid004', 0, async (done: Function) => {
      let result: number = audiodecoderxdlndk.OHAudioDecoderIsValidCnormal();
      expect(result).assertEqual(-1);
      done();
    });
  })
}
