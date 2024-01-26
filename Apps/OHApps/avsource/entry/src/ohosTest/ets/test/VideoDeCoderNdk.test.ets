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
import videodecoderndk from 'libvideodecoderndk.so'

export default function videoDeCoderNdkTest() {
  describe('AvcodecVideoDecoderTest', () => {

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_CREATEBYMIME_0100
     * @tc.name       : testOHVideoDecoderCreateByMime001
     * @tc.desc       : test OH_VideoDecoder_CreateByMime
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderCreateByMime001', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderCreateByMime();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_CREATEBYNAME_0100
     * @tc.name       : testOHVideoDecoderCreateByName001
     * @tc.desc       : test OH_VideoDecoder_CreateByName
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderCreateByName001', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderCreateByName();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_DESTROY_0100
     * @tc.name       : testOHVideoDecoderDestroy001
     * @tc.desc       : test OH_VideoDecoder_Destroy
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderDestroy001', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderDestroy();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_SETCALLBACK_0100
     * @tc.name       : testOHVideoDecoderSetCallback001
     * @tc.desc       : test OH_VideoDecoder_SetCallback
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderSetCallback001', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderSetCallback();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_CONFIGURE_0100
     * @tc.name       : testOHVideoDecoderConfigure001
     * @tc.desc       : test OH_VideoDecoder_Configure
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderConfigure001', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderConfigure();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_PREPARE_0100
     * @tc.name       : testOHVideoDecoderPrepare001
     * @tc.desc       : test OH_VideoDecoder_Prepare
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderPrepare001', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderPrepare();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_START_0100
     * @tc.name       : testOHVideoDecoderStart001
     * @tc.desc       : test OH_VideoDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStart001', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStart(1,1,1,1,1,1);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_START_0200
     * @tc.name       : testOHVideoDecoderStart002
     * @tc.desc       : test OH_VideoDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStart002', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStart(2,1,1,1,1,1);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_START_0300
     * @tc.name       : testOHVideoDecoderStart003
     * @tc.desc       : test OH_VideoDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStart003', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStart(1,1,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_START_0400
     * @tc.name       : testOHVideoDecoderStart004
     * @tc.desc       : test OH_VideoDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStart004', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStart(1,1,1,0,1,0);
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_START_0500
     * @tc.name       : testOHVideoDecoderStart005
     * @tc.desc       : test OH_VideoDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStart005', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStart(1,1,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_START_0600
     * @tc.name       : testOHVideoDecoderStart006
     * @tc.desc       : test OH_VideoDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStart006', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStart(1,1,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_START_0700
     * @tc.name       : testOHVideoDecoderStart007
     * @tc.desc       : test OH_VideoDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStart007', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStart(1,1,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_START_0800
     * @tc.name       : testOHVideoDecoderStart008
     * @tc.desc       : test OH_VideoDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStart008', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStart(1,1,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_START_0900
     * @tc.name       : testOHVideoDecoderStart009
     * @tc.desc       : test OH_VideoDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStart009', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStart(1,1,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_START_1000
     * @tc.name       : testOHVideoDecoderStart010
     * @tc.desc       : test OH_VideoDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStart010', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStart(1,0,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_START_1100
     * @tc.name       : testOHVideoDecoderStart011
     * @tc.desc       : test OH_VideoDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStart011', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStart(1,0,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_START_1200
     * @tc.name       : testOHVideoDecoderStart012
     * @tc.desc       : test OH_VideoDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStart012', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStart(1,0,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_START_1300
     * @tc.name       : testOHVideoDecoderStart013
     * @tc.desc       : test OH_VideoDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStart013', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStart(1,0,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_START_1400
     * @tc.name       : testOHVideoDecoderStart014
     * @tc.desc       : test OH_VideoDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStart014', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStart(1,0,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_START_1500
     * @tc.name       : testOHVideoDecoderStart015
     * @tc.desc       : test OH_VideoDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStart015', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStart(1,0,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_START_1600
     * @tc.name       : testOHVideoDecoderStart016
     * @tc.desc       : test OH_VideoDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStart016', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStart(1,0,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_START_1700
     * @tc.name       : testOHVideoDecoderStart017
     * @tc.desc       : test OH_VideoDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStart017', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStart(1,0,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_START_1800
     * @tc.name       : testOHVideoDecoderStart018
     * @tc.desc       : test OH_VideoDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStart018', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStart(0,1,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_START_1900
     * @tc.name       : testOHVideoDecoderStart019
     * @tc.desc       : test OH_VideoDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStart019', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStart(0,1,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_START_2000
     * @tc.name       : testOHVideoDecoderStart020
     * @tc.desc       : test OH_VideoDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStart020', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStart(0,1,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_START_2100
     * @tc.name       : testOHVideoDecoderStart021
     * @tc.desc       : test OH_VideoDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStart021', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStart(0,1,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_START_2200
     * @tc.name       : testOHVideoDecoderStart022
     * @tc.desc       : test OH_VideoDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStart022', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStart(0,1,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_START_2300
     * @tc.name       : testOHVideoDecoderStart023
     * @tc.desc       : test OH_VideoDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStart023', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStart(0,1,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_START_2400
     * @tc.name       : testOHVideoDecoderStart024
     * @tc.desc       : test OH_VideoDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStart024', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStart(0,1,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_START_2500
     * @tc.name       : testOHVideoDecoderStart025
     * @tc.desc       : test OH_VideoDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStart025', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStart(0,1,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_START_2600
     * @tc.name       : testOHVideoDecoderStart026
     * @tc.desc       : test OH_VideoDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStart026', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStart(0,0,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_START_2700
     * @tc.name       : testOHVideoDecoderStart027
     * @tc.desc       : test OH_VideoDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStart027', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStart(0,0,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_START_2800
     * @tc.name       : testOHVideoDecoderStart028
     * @tc.desc       : test OH_VideoDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStart028', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStart(0,0,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_START_2900
     * @tc.name       : testOHVideoDecoderStart029
     * @tc.desc       : test OH_VideoDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStart029', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStart(0,0,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_START_3000
     * @tc.name       : testOHVideoDecoderStart030
     * @tc.desc       : test OH_VideoDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStart030', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStart(0,0,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_START_3100
     * @tc.name       : testOHVideoDecoderStart031
     * @tc.desc       : test OH_VideoDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStart031', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStart(0,0,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_START_3200
     * @tc.name       : testOHVideoDecoderStart032
     * @tc.desc       : test OH_VideoDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStart032', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStart(0,0,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_START_3300
     * @tc.name       : testOHVideoDecoderStart033
     * @tc.desc       : test OH_VideoDecoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStart033', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStart(0,0,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_0100
     * @tc.name       : testOHVideoDecoderStop001
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop001', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(1,1,1,1,1,1,1);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_0200
     * @tc.name       : testOHVideoDecoderStop002
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop002', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(2,1,1,1,1,1,1);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_0300
     * @tc.name       : testOHVideoDecoderStop003
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop003', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(1,1,1,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_0400
     * @tc.name       : testOHVideoDecoderStop004
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop004', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(1,1,1,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_0500
     * @tc.name       : testOHVideoDecoderStop005
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop005', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(1,1,1,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_0600
     * @tc.name       : testOHVideoDecoderStop006
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop006', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(1,1,1,0,1,1,0);
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_0700
     * @tc.name       : testOHVideoDecoderStop007
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop007', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(1,1,1,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_0800
     * @tc.name       : testOHVideoDecoderStop008
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop008', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(1,1,1,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_0900
     * @tc.name       : testOHVideoDecoderStop009
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop009', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(1,1,1,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_1000
     * @tc.name       : testOHVideoDecoderStop010
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop010', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(1,1,0,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_1100
     * @tc.name       : testOHVideoDecoderStop011
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop011', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(1,1,0,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_1200
     * @tc.name       : testOHVideoDecoderStop012
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop012', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(1,1,0,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_1300
     * @tc.name       : testOHVideoDecoderStop013
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop013', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(1,1,0,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_1400
     * @tc.name       : testOHVideoDecoderStop014
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop014', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(1,1,0,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_1500
     * @tc.name       : testOHVideoDecoderStop015
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop015', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(1,1,0,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_1600
     * @tc.name       : testOHVideoDecoderStop016
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop016', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(1,1,0,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_1700
     * @tc.name       : testOHVideoDecoderStop017
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop017', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(1,1,0,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_1800
     * @tc.name       : testOHVideoDecoderStop018
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop018', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(1,0,1,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_1900
     * @tc.name       : testOHVideoDecoderStop019
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop019', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(1,0,1,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_2000
     * @tc.name       : testOHVideoDecoderStop020
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop020', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(1,0,1,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_2100
     * @tc.name       : testOHVideoDecoderStop021
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop021', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(1,0,1,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_2200
     * @tc.name       : testOHVideoDecoderStop022
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop022', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(1,0,1,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_2300
     * @tc.name       : testOHVideoDecoderStop023
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop023', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(1,0,1,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_2400
     * @tc.name       : testOHVideoDecoderStop024
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop024', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(1,0,1,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_2500
     * @tc.name       : testOHVideoDecoderStop025
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop025', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(1,0,1,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_2600
     * @tc.name       : testOHVideoDecoderStop026
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop026', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(1,0,0,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_2700
     * @tc.name       : testOHVideoDecoderStop027
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop027', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(1,0,0,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_2800
     * @tc.name       : testOHVideoDecoderStop028
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop028', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(1,0,0,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_2900
     * @tc.name       : testOHVideoDecoderStop029
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop029', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(1,0,0,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_3000
     * @tc.name       : testOHVideoDecoderStop030
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop030', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(1,0,0,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_3100
     * @tc.name       : testOHVideoDecoderStop031
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop031', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(1,0,0,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_3200
     * @tc.name       : testOHVideoDecoderStop032
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop032', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(1,0,0,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_3300
     * @tc.name       : testOHVideoDecoderStop033
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop033', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(1,0,0,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_3400
     * @tc.name       : testOHVideoDecoderStop034
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop034', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(0,1,1,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_3500
     * @tc.name       : testOHVideoDecoderStop035
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop035', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(0,1,1,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_3600
     * @tc.name       : testOHVideoDecoderStop036
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop036', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(0,1,1,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_3700
     * @tc.name       : testOHVideoDecoderStop037
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop037', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(0,1,1,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_3800
     * @tc.name       : testOHVideoDecoderStop038
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop038', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(0,1,1,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_3900
     * @tc.name       : testOHVideoDecoderStop039
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop039', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(0,1,1,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_4000
     * @tc.name       : testOHVideoDecoderStop040
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop040', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(0,1,1,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_4100
     * @tc.name       : testOHVideoDecoderStop041
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop041', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(0,1,1,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_4200
     * @tc.name       : testOHVideoDecoderStop042
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop042', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(0,1,0,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_4300
     * @tc.name       : testOHVideoDecoderStop043
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop043', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(0,1,0,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_4400
     * @tc.name       : testOHVideoDecoderStop044
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop044', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(0,1,0,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_4500
     * @tc.name       : testOHVideoDecoderStop045
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop045', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(0,1,0,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_4600
     * @tc.name       : testOHVideoDecoderStop046
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop046', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(0,1,0,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_4700
     * @tc.name       : testOHVideoDecoderStop047
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop047', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(0,1,0,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_4800
     * @tc.name       : testOHVideoDecoderStop048
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop048', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(0,1,0,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_4900
     * @tc.name       : testOHVideoDecoderStop049
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop049', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(0,1,0,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_5000
     * @tc.name       : testOHVideoDecoderStop050
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop050', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(0,0,1,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_5100
     * @tc.name       : testOHVideoDecoderStop051
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop051', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(0,0,1,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_5200
     * @tc.name       : testOHVideoDecoderStop052
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop052', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(0,0,1,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_5300
     * @tc.name       : testOHVideoDecoderStop053
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop053', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(0,0,1,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_5400
     * @tc.name       : testOHVideoDecoderStop054
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop054', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(0,0,1,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_5500
     * @tc.name       : testOHVideoDecoderStop055
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop055', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(0,0,1,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_5600
     * @tc.name       : testOHVideoDecoderStop056
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop056', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(0,0,1,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_5700
     * @tc.name       : testOHVideoDecoderStop057
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop057', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(0,0,1,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_5800
     * @tc.name       : testOHVideoDecoderStop058
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop058', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(0,0,0,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_5900
     * @tc.name       : testOHVideoDecoderStop059
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop059', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(0,0,0,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_6000
     * @tc.name       : testOHVideoDecoderStop060
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop060', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(0,0,0,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_6100
     * @tc.name       : testOHVideoDecoderStop061
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop061', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(0,0,0,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_6200
     * @tc.name       : testOHVideoDecoderStop062
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop062', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(0,0,0,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_6300
     * @tc.name       : testOHVideoDecoderStop063
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop063', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(0,0,0,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_6400
     * @tc.name       : testOHVideoDecoderStop064
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop064', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(0,0,0,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_STOP_6500
     * @tc.name       : testOHVideoDecoderStop065
     * @tc.desc       : test OH_VideoDecoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderStop065', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderStop(0,0,0,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_0100
     * @tc.name       : testOHVideoDecoderFlush001
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush001', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(1,1,1,1,1,1,1);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_0200
     * @tc.name       : testOHVideoDecoderFlush002
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush002', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(2,1,1,1,1,1,1);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_0300
     * @tc.name       : testOHVideoDecoderFlush003
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush003', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(1,1,1,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_0400
     * @tc.name       : testOHVideoDecoderFlush004
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush004', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(1,1,1,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_0500
     * @tc.name       : testOHVideoDecoderFlush005
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush005', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(1,1,1,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_0600
     * @tc.name       : testOHVideoDecoderFlush006
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush006', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(1,1,1,0,1,1,0);
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_0700
     * @tc.name       : testOHVideoDecoderFlush007
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush007', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(1,1,1,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_0800
     * @tc.name       : testOHVideoDecoderFlush008
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush008', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(1,1,1,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_0900
     * @tc.name       : testOHVideoDecoderFlush009
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush009', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(1,1,1,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_1000
     * @tc.name       : testOHVideoDecoderFlush010
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush010', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(1,1,0,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_1100
     * @tc.name       : testOHVideoDecoderFlush011
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush011', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(1,1,0,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_1200
     * @tc.name       : testOHVideoDecoderFlush012
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush012', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(1,1,0,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_1300
     * @tc.name       : testOHVideoDecoderFlush013
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush013', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(1,1,0,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_1400
     * @tc.name       : testOHVideoDecoderFlush014
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush014', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(1,1,0,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_1500
     * @tc.name       : testOHVideoDecoderFlush015
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush015', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(1,1,0,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_1600
     * @tc.name       : testOHVideoDecoderFlush016
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush016', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(1,1,0,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_1700
     * @tc.name       : testOHVideoDecoderFlush017
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush017', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(1,1,0,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_1800
     * @tc.name       : testOHVideoDecoderFlush018
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush018', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(1,0,1,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_1900
     * @tc.name       : testOHVideoDecoderFlush019
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush019', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(1,0,1,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_2000
     * @tc.name       : testOHVideoDecoderFlush020
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush020', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(1,0,1,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_2100
     * @tc.name       : testOHVideoDecoderFlush021
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush021', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(1,0,1,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_2200
     * @tc.name       : testOHVideoDecoderFlush022
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush022', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(1,0,1,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_2300
     * @tc.name       : testOHVideoDecoderFlush023
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush023', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(1,0,1,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_2400
     * @tc.name       : testOHVideoDecoderFlush024
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush024', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(1,0,1,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_2500
     * @tc.name       : testOHVideoDecoderFlush025
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush025', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(1,0,1,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_2600
     * @tc.name       : testOHVideoDecoderFlush026
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush026', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(1,0,0,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_2700
     * @tc.name       : testOHVideoDecoderFlush027
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush027', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(1,0,0,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_2800
     * @tc.name       : testOHVideoDecoderFlush028
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush028', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(1,0,0,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_2900
     * @tc.name       : testOHVideoDecoderFlush029
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush029', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(1,0,0,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_3000
     * @tc.name       : testOHVideoDecoderFlush030
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush030', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(1,0,0,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_3100
     * @tc.name       : testOHVideoDecoderFlush031
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush031', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(1,0,0,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_3200
     * @tc.name       : testOHVideoDecoderFlush032
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush032', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(1,0,0,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_3300
     * @tc.name       : testOHVideoDecoderFlush033
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush033', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(1,0,0,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_3400
     * @tc.name       : testOHVideoDecoderFlush034
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush034', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(0,1,1,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_3500
     * @tc.name       : testOHVideoDecoderFlush035
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush035', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(0,1,1,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_3600
     * @tc.name       : testOHVideoDecoderFlush036
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush036', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(0,1,1,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_3700
     * @tc.name       : testOHVideoDecoderFlush037
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush037', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(0,1,1,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_3800
     * @tc.name       : testOHVideoDecoderFlush038
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush038', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(0,1,1,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_3900
     * @tc.name       : testOHVideoDecoderFlush039
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush039', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(0,1,1,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_4000
     * @tc.name       : testOHVideoDecoderFlush040
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush040', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(0,1,1,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_4100
     * @tc.name       : testOHVideoDecoderFlush041
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush041', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(0,1,1,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_4200
     * @tc.name       : testOHVideoDecoderFlush042
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush042', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(0,1,0,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_4300
     * @tc.name       : testOHVideoDecoderFlush043
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush043', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(0,1,0,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_4400
     * @tc.name       : testOHVideoDecoderFlush044
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush044', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(0,1,0,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_4500
     * @tc.name       : testOHVideoDecoderFlush045
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush045', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(0,1,0,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_4600
     * @tc.name       : testOHVideoDecoderFlush046
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush046', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(0,1,0,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_4700
     * @tc.name       : testOHVideoDecoderFlush047
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush047', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(0,1,0,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_4800
     * @tc.name       : testOHVideoDecoderFlush048
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush048', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(0,1,0,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_4900
     * @tc.name       : testOHVideoDecoderFlush049
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush049', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(0,1,0,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_5000
     * @tc.name       : testOHVideoDecoderFlush050
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush050', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(0,0,1,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_5100
     * @tc.name       : testOHVideoDecoderFlush051
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush051', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(0,0,1,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_5200
     * @tc.name       : testOHVideoDecoderFlush052
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush052', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(0,0,1,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_5300
     * @tc.name       : testOHVideoDecoderFlush053
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush053', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(0,0,1,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_5400
     * @tc.name       : testOHVideoDecoderFlush054
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush054', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(0,0,1,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_5500
     * @tc.name       : testOHVideoDecoderFlush055
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush055', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(0,0,1,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_5600
     * @tc.name       : testOHVideoDecoderFlush056
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush056', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(0,0,1,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_5700
     * @tc.name       : testOHVideoDecoderFlush057
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush057', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(0,0,1,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_5800
     * @tc.name       : testOHVideoDecoderFlush058
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush058', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(0,0,0,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_5900
     * @tc.name       : testOHVideoDecoderFlush059
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush059', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(0,0,0,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_6000
     * @tc.name       : testOHVideoDecoderFlush060
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush060', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(0,0,0,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_6100
     * @tc.name       : testOHVideoDecoderFlush061
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush061', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(0,0,0,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_6200
     * @tc.name       : testOHVideoDecoderFlush062
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush062', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(0,0,0,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_6300
     * @tc.name       : testOHVideoDecoderFlush063
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush063', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(0,0,0,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_6400
     * @tc.name       : testOHVideoDecoderFlush064
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush064', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(0,0,0,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_FLUSH_6500
     * @tc.name       : testOHVideoDecoderFlush065
     * @tc.desc       : test OH_VideoDecoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderFlush065', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderFlush(0,0,0,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_RESET_0100
     * @tc.name       : testOHVideoDecoderReset001
     * @tc.desc       : test OH_VideoDecoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderReset001', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderReset();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_GETOUTPUTDESCRIPTION_0100
     * @tc.name       : testOHVideoDecoderGetOutputDescription001
     * @tc.desc       : test OH_VideoDecoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderGetOutputDescription001', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderGetOutputDescription();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_SETPARAMETER_0100
     * @tc.name       : testOHVideoDecoderSetParameter001
     * @tc.desc       : test OH_VideoDecoder_SetParameter
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderSetParameter001', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderSetParameter();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEODECODER_OH_VIDEODECODER_ISVALID_0100
     * @tc.name       : testOHVideoDecoderIsValid001
     * @tc.desc       : test OH_VideoDecoder_IsValid
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoDecoderIsValid001', 0, async (done: Function) => {
      let result: number = videodecoderndk.oHVideoDecoderIsValid();
      expect(result).assertEqual(0);
      done();
    });

  })
}
