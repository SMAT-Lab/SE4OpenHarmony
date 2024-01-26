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
import videoencoderndk from 'libvideoencoderndk.so'

export default function videoEnCoderNdkTest() {
  describe('AvcodecVideoEncoderTest', () => {

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_CREATEBYMIME_0100
     * @tc.name       : testOHVideoEncoderCreateByMime001
     * @tc.desc       : test OH_VideoEncoder_CreateByMime
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderCreateByMime001', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderCreateByMime();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_CREATEBYMIME_0200
     * @tc.name       : testOHVideoEncoderCreateByMime002
     * @tc.desc       : test OH_VideoEncoder_CreateByMime
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderCreateByMime002', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderCreateByMimeHEVC();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_CREATEBYMIME_0300
     * @tc.name       : testOHVideoEncoderCreateByMime003
     * @tc.desc       : test OH_VideoEncoder_CreateByMime
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderCreateByMime003', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderCreateByMimeAbnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_CREATEBYNAME_0100
     * @tc.name       : testOHVideoEncoderCreateByName001
     * @tc.desc       : test OH_VideoEncoder_CreateByName
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderCreateByName001', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderCreateByName();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_CREATEBYNAME_0200
     * @tc.name       : testOHVideoEncoderCreateByName002
     * @tc.desc       : test OH_VideoEncoder_CreateByName
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderCreateByName002', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderCreateByNameHEVC();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_CREATEBYNAME_0300
     * @tc.name       : testOHVideoEncoderCreateByName003
     * @tc.desc       : test OH_VideoEncoder_CreateByName
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderCreateByName003', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderCreateByNameAbnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_DESTROY_0100
     * @tc.name       : testOHVideoEncoderDestroy001
     * @tc.desc       : test OH_VideoEncoder_Destroy
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderDestroy001', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderDestroy();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_DESTROY_0200
     * @tc.name       : testOHVideoEncoderDestroy002
     * @tc.desc       : test OH_VideoEncoder_Destroy
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderDestroy002', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderDestroyHEVC();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_DESTROY_0300
     * @tc.name       : testOHVideoEncoderDestroy003
     * @tc.desc       : test OH_VideoEncoder_Destroy
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderDestroy003', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderDestroyAbnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_SETCALLBACK_0100
     * @tc.name       : testOHVideoEncoderSetCallback001
     * @tc.desc       : test OH_VideoEncoder_SetCallback
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderSetCallback001', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderSetCallback();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_SETCALLBACK_0200
     * @tc.name       : testOHVideoEncoderSetCallback002
     * @tc.desc       : test OH_VideoEncoder_SetCallback
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderSetCallback002', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderSetCallbackHEVC();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_SETCALLBACK_0300
     * @tc.name       : testOHVideoEncoderSetCallback003
     * @tc.desc       : test OH_VideoEncoder_SetCallback
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderSetCallback003', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderSetCallbackAbnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_CONFIGURE_0100
     * @tc.name       : testOHVideoEncoderConfigure001
     * @tc.desc       : test OH_VideoEncoder_Configure
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderConfigure001', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderConfigure();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_CONFIGURE_0200
     * @tc.name       : testOHVideoEncoderConfigure002
     * @tc.desc       : test OH_VideoEncoder_Configure
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderConfigure002', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderConfigureHEVC();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_CONFIGURE_0300
     * @tc.name       : testOHVideoEncoderConfigure003
     * @tc.desc       : test OH_VideoEncoder_Configure
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderConfigure003', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderConfigureAbnormal1();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_CONFIGURE_0400
     * @tc.name       : testOHVideoEncoderConfigure004
     * @tc.desc       : test OH_VideoEncoder_Configure
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderConfigure004', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderConfigureAbnormal2();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_CONFIGURE_0500
     * @tc.name       : testOHVideoEncoderConfigure005
     * @tc.desc       : test OH_VideoEncoder_Configure
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderConfigure005', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderConfigureAbnormal3();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_CONFIGURE_0600
     * @tc.name       : testOHVideoEncoderConfigure006
     * @tc.desc       : test OH_VideoEncoder_Configure
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderConfigure006', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderConfigureAbnormal4();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_CONFIGURE_0700
     * @tc.name       : testOHVideoEncoderConfigure007
     * @tc.desc       : test OH_VideoEncoder_Configure
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderConfigure007', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderConfigureAbnormal5();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_CONFIGURE_0800
     * @tc.name       : testOHVideoEncoderConfigure008
     * @tc.desc       : test OH_VideoEncoder_Configure
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderConfigure008', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderConfigureAbnormal6();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_CONFIGURE_0900
     * @tc.name       : testOHVideoEncoderConfigure009
     * @tc.desc       : test OH_VideoEncoder_Configure
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderConfigure009', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderConfigureAbnormal7();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_PREPARE_0100
     * @tc.name       : testOHVideoEncoderPrepare001
     * @tc.desc       : test OH_VideoEncoder_Prepare
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderPrepare001', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderPrepare();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_PREPARE_0200
     * @tc.name       : testOHVideoEncoderPrepare002
     * @tc.desc       : test OH_VideoEncoder_Prepare
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderPrepare002', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderPrepareHEVC();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_PREPARE_0300
     * @tc.name       : testOHVideoEncoderPrepare003
     * @tc.desc       : test OH_VideoEncoder_Prepare
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderPrepare003', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderPrepareAbnormal1();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_PREPARE_0300
     * @tc.name       : testOHVideoEncoderPrepare003
     * @tc.desc       : test OH_VideoEncoder_Prepare
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderPrepare004', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderPrepareAbnormal2();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_PREPARE_0300
     * @tc.name       : testOHVideoEncoderPrepare003
     * @tc.desc       : test OH_VideoEncoder_Prepare
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderPrepare005', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderPrepareAbnormal3();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_PREPARE_0300
     * @tc.name       : testOHVideoEncoderPrepare003
     * @tc.desc       : test OH_VideoEncoder_Prepare
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderPrepare006', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderPrepareAbnormal4();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_PREPARE_0300
     * @tc.name       : testOHVideoEncoderPrepare003
     * @tc.desc       : test OH_VideoEncoder_Prepare
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderPrepare007', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderPrepareAbnormal5();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_PREPARE_0300
     * @tc.name       : testOHVideoEncoderPrepare003
     * @tc.desc       : test OH_VideoEncoder_Prepare
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderPrepare008', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderPrepareAbnormal6();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_PREPARE_0300
     * @tc.name       : testOHVideoEncoderPrepare003
     * @tc.desc       : test OH_VideoEncoder_Prepare
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderPrepare009', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderPrepareAbnormal7();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_PREPARE_0300
     * @tc.name       : testOHVideoEncoderPrepare003
     * @tc.desc       : test OH_VideoEncoder_Prepare
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderPrepare010', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderPrepareAbnormal8();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_PREPARE_0300
     * @tc.name       : testOHVideoEncoderPrepare003
     * @tc.desc       : test OH_VideoEncoder_Prepare
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderPrepare011', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderPrepareAbnormal9();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_PREPARE_0300
     * @tc.name       : testOHVideoEncoderPrepare003
     * @tc.desc       : test OH_VideoEncoder_Prepare
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderPrepare012', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderPrepareAbnormal10();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_PREPARE_0300
     * @tc.name       : testOHVideoEncoderPrepare003
     * @tc.desc       : test OH_VideoEncoder_Prepare
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderPrepare013', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderPrepareAbnormal11();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_PREPARE_0300
     * @tc.name       : testOHVideoEncoderPrepare003
     * @tc.desc       : test OH_VideoEncoder_Prepare
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderPrepare014', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderPrepareAbnormal12();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_PREPARE_0300
     * @tc.name       : testOHVideoEncoderPrepare003
     * @tc.desc       : test OH_VideoEncoder_Prepare
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderPrepare015', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderPrepareAbnormal13();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_PREPARE_0300
     * @tc.name       : testOHVideoEncoderPrepare003
     * @tc.desc       : test OH_VideoEncoder_Prepare
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderPrepare016', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderPrepareAbnormal14();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_PREPARE_0300
     * @tc.name       : testOHVideoEncoderPrepare003
     * @tc.desc       : test OH_VideoEncoder_Prepare
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderPrepare017', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderPrepareAbnormal15();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_START_0100
     * @tc.name       : testOHVideoEncoderStart001
     * @tc.desc       : test OH_VideoEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStart001', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStart(1,1,1,1,1,1);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_START_0200
     * @tc.name       : testOHVideoEncoderStart002
     * @tc.desc       : test OH_VideoEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStart002', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStart(2,1,1,1,1,1);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_START_0300
     * @tc.name       : testOHVideoEncoderStart003
     * @tc.desc       : test OH_VideoEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStart003', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStart(1,1,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_START_0400
     * @tc.name       : testOHVideoEncoderStart004
     * @tc.desc       : test OH_VideoEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStart004', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStart(1,1,1,0,1,0);
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_START_0500
     * @tc.name       : testOHVideoEncoderStart005
     * @tc.desc       : test OH_VideoEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStart005', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStart(1,1,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_START_0600
     * @tc.name       : testOHVideoEncoderStart006
     * @tc.desc       : test OH_VideoEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStart006', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStart(1,1,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_START_0700
     * @tc.name       : testOHVideoEncoderStart007
     * @tc.desc       : test OH_VideoEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStart007', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStart(1,1,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_START_0800
     * @tc.name       : testOHVideoEncoderStart008
     * @tc.desc       : test OH_VideoEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStart008', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStart(1,1,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_START_0900
     * @tc.name       : testOHVideoEncoderStart009
     * @tc.desc       : test OH_VideoEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStart009', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStart(1,1,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_START_1000
     * @tc.name       : testOHVideoEncoderStart010
     * @tc.desc       : test OH_VideoEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStart010', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStart(1,0,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_START_1100
     * @tc.name       : testOHVideoEncoderStart011
     * @tc.desc       : test OH_VideoEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStart011', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStart(1,0,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_START_1200
     * @tc.name       : testOHVideoEncoderStart012
     * @tc.desc       : test OH_VideoEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStart012', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStart(1,0,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_START_1300
     * @tc.name       : testOHVideoEncoderStart013
     * @tc.desc       : test OH_VideoEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStart013', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStart(1,0,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_START_1400
     * @tc.name       : testOHVideoEncoderStart014
     * @tc.desc       : test OH_VideoEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStart014', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStart(1,0,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_START_1500
     * @tc.name       : testOHVideoEncoderStart015
     * @tc.desc       : test OH_VideoEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStart015', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStart(1,0,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_START_1600
     * @tc.name       : testOHVideoEncoderStart016
     * @tc.desc       : test OH_VideoEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStart016', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStart(1,0,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_START_1700
     * @tc.name       : testOHVideoEncoderStart017
     * @tc.desc       : test OH_VideoEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStart017', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStart(1,0,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_START_1800
     * @tc.name       : testOHVideoEncoderStart018
     * @tc.desc       : test OH_VideoEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStart018', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStart(0,1,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_START_1900
     * @tc.name       : testOHVideoEncoderStart019
     * @tc.desc       : test OH_VideoEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStart019', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStart(0,1,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_START_2000
     * @tc.name       : testOHVideoEncoderStart020
     * @tc.desc       : test OH_VideoEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStart020', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStart(0,1,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_START_2100
     * @tc.name       : testOHVideoEncoderStart021
     * @tc.desc       : test OH_VideoEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStart021', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStart(0,1,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_START_2200
     * @tc.name       : testOHVideoEncoderStart022
     * @tc.desc       : test OH_VideoEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStart022', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStart(0,1,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_START_2300
     * @tc.name       : testOHVideoEncoderStart023
     * @tc.desc       : test OH_VideoEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStart023', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStart(0,1,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_START_2400
     * @tc.name       : testOHVideoEncoderStart024
     * @tc.desc       : test OH_VideoEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStart024', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStart(0,1,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_START_2500
     * @tc.name       : testOHVideoEncoderStart025
     * @tc.desc       : test OH_VideoEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStart025', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStart(0,1,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_START_2600
     * @tc.name       : testOHVideoEncoderStart026
     * @tc.desc       : test OH_VideoEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStart026', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStart(0,0,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_START_2700
     * @tc.name       : testOHVideoEncoderStart027
     * @tc.desc       : test OH_VideoEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStart027', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStart(0,0,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_START_2800
     * @tc.name       : testOHVideoEncoderStart028
     * @tc.desc       : test OH_VideoEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStart028', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStart(0,0,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_START_2900
     * @tc.name       : testOHVideoEncoderStart029
     * @tc.desc       : test OH_VideoEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStart029', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStart(0,0,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_START_3000
     * @tc.name       : testOHVideoEncoderStart030
     * @tc.desc       : test OH_VideoEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStart030', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStart(0,0,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_START_3100
     * @tc.name       : testOHVideoEncoderStart031
     * @tc.desc       : test OH_VideoEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStart031', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStart(0,0,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_START_3200
     * @tc.name       : testOHVideoEncoderStart032
     * @tc.desc       : test OH_VideoEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStart032', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStart(0,0,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_START_3300
     * @tc.name       : testOHVideoEncoderStart033
     * @tc.desc       : test OH_VideoEncoder_Start
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStart033', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStart(0,0,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_0100
     * @tc.name       : testOHVideoEncoderStop001
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop001', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(1,1,1,1,1,1,1);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_0200
     * @tc.name       : testOHVideoEncoderStop002
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop002', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(2,1,1,1,1,1,1);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_0300
     * @tc.name       : testOHVideoEncoderStop003
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop003', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(1,1,1,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_0400
     * @tc.name       : testOHVideoEncoderStop004
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop004', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(1,1,1,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_0500
     * @tc.name       : testOHVideoEncoderStop005
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop005', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(1,1,1,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_0600
     * @tc.name       : testOHVideoEncoderStop006
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop006', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(1,1,1,0,1,1,0);
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_0700
     * @tc.name       : testOHVideoEncoderStop007
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop007', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(1,1,1,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_0800
     * @tc.name       : testOHVideoEncoderStop008
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop008', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(1,1,1,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_0900
     * @tc.name       : testOHVideoEncoderStop009
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop009', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(1,1,1,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_1000
     * @tc.name       : testOHVideoEncoderStop010
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop010', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(1,1,0,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_1100
     * @tc.name       : testOHVideoEncoderStop011
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop011', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(1,1,0,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_1200
     * @tc.name       : testOHVideoEncoderStop012
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop012', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(1,1,0,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_1300
     * @tc.name       : testOHVideoEncoderStop013
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop013', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(1,1,0,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_1400
     * @tc.name       : testOHVideoEncoderStop014
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop014', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(1,1,0,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_1500
     * @tc.name       : testOHVideoEncoderStop015
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop015', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(1,1,0,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_1600
     * @tc.name       : testOHVideoEncoderStop016
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop016', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(1,1,0,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_1700
     * @tc.name       : testOHVideoEncoderStop017
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop017', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(1,1,0,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_1800
     * @tc.name       : testOHVideoEncoderStop018
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop018', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(1,0,1,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_1900
     * @tc.name       : testOHVideoEncoderStop019
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop019', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(1,0,1,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_2000
     * @tc.name       : testOHVideoEncoderStop020
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop020', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(1,0,1,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_2100
     * @tc.name       : testOHVideoEncoderStop021
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop021', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(1,0,1,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_2200
     * @tc.name       : testOHVideoEncoderStop022
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop022', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(1,0,1,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_2300
     * @tc.name       : testOHVideoEncoderStop023
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop023', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(1,0,1,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_2400
     * @tc.name       : testOHVideoEncoderStop024
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop024', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(1,0,1,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_2500
     * @tc.name       : testOHVideoEncoderStop025
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop025', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(1,0,1,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_2600
     * @tc.name       : testOHVideoEncoderStop026
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop026', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(1,0,0,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_2700
     * @tc.name       : testOHVideoEncoderStop027
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop027', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(1,0,0,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_2800
     * @tc.name       : testOHVideoEncoderStop028
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop028', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(1,0,0,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_2900
     * @tc.name       : testOHVideoEncoderStop029
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop029', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(1,0,0,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_3000
     * @tc.name       : testOHVideoEncoderStop030
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop030', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(1,0,0,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_3100
     * @tc.name       : testOHVideoEncoderStop031
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop031', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(1,0,0,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_3200
     * @tc.name       : testOHVideoEncoderStop032
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop032', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(1,0,0,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_3300
     * @tc.name       : testOHVideoEncoderStop033
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop033', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(1,0,0,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_3400
     * @tc.name       : testOHVideoEncoderStop034
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop034', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(0,1,1,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_3500
     * @tc.name       : testOHVideoEncoderStop035
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop035', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(0,1,1,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_3600
     * @tc.name       : testOHVideoEncoderStop036
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop036', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(0,1,1,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_3700
     * @tc.name       : testOHVideoEncoderStop037
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop037', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(0,1,1,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_3800
     * @tc.name       : testOHVideoEncoderStop038
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop038', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(0,1,1,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_3900
     * @tc.name       : testOHVideoEncoderStop039
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop039', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(0,1,1,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_4000
     * @tc.name       : testOHVideoEncoderStop040
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop040', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(0,1,1,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_4100
     * @tc.name       : testOHVideoEncoderStop041
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop041', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(0,1,1,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_4200
     * @tc.name       : testOHVideoEncoderStop042
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop042', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(0,1,0,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_4300
     * @tc.name       : testOHVideoEncoderStop043
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop043', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(0,1,0,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_4400
     * @tc.name       : testOHVideoEncoderStop044
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop044', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(0,1,0,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_4500
     * @tc.name       : testOHVideoEncoderStop045
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop045', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(0,1,0,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_4600
     * @tc.name       : testOHVideoEncoderStop046
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop046', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(0,1,0,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_4700
     * @tc.name       : testOHVideoEncoderStop047
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop047', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(0,1,0,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_4800
     * @tc.name       : testOHVideoEncoderStop048
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop048', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(0,1,0,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_4900
     * @tc.name       : testOHVideoEncoderStop049
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop049', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(0,1,0,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_5000
     * @tc.name       : testOHVideoEncoderStop050
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop050', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(0,0,1,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_5100
     * @tc.name       : testOHVideoEncoderStop051
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop051', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(0,0,1,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_5200
     * @tc.name       : testOHVideoEncoderStop052
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop052', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(0,0,1,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_5300
     * @tc.name       : testOHVideoEncoderStop053
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop053', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(0,0,1,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_5400
     * @tc.name       : testOHVideoEncoderStop054
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop054', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(0,0,1,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_5500
     * @tc.name       : testOHVideoEncoderStop055
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop055', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(0,0,1,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_5600
     * @tc.name       : testOHVideoEncoderStop056
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop056', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(0,0,1,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_5700
     * @tc.name       : testOHVideoEncoderStop057
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop057', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(0,0,1,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_5800
     * @tc.name       : testOHVideoEncoderStop058
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop058', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(0,0,0,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_5900
     * @tc.name       : testOHVideoEncoderStop059
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop059', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(0,0,0,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_6000
     * @tc.name       : testOHVideoEncoderStop060
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop060', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(0,0,0,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_6100
     * @tc.name       : testOHVideoEncoderStop061
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop061', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(0,0,0,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_6200
     * @tc.name       : testOHVideoEncoderStop062
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop062', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(0,0,0,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_6300
     * @tc.name       : testOHVideoEncoderStop063
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop063', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(0,0,0,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_6400
     * @tc.name       : testOHVideoEncoderStop064
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop064', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(0,0,0,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_STOP_6500
     * @tc.name       : testOHVideoEncoderStop065
     * @tc.desc       : test OH_VideoEncoder_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderStop065', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderStop(0,0,0,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_0100
     * @tc.name       : testOHVideoEncoderFlush001
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush001', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(1,1,1,1,1,1,1);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_0200
     * @tc.name       : testOHVideoEncoderFlush002
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush002', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(2,1,1,1,1,1,1);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_0300
     * @tc.name       : testOHVideoEncoderFlush003
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush003', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(1,1,1,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_0400
     * @tc.name       : testOHVideoEncoderFlush004
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush004', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(1,1,1,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_0500
     * @tc.name       : testOHVideoEncoderFlush005
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush005', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(1,1,1,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_0600
     * @tc.name       : testOHVideoEncoderFlush006
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush006', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(1,1,1,0,1,1,0);
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_0700
     * @tc.name       : testOHVideoEncoderFlush007
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush007', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(1,1,1,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_0800
     * @tc.name       : testOHVideoEncoderFlush008
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush008', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(1,1,1,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_0900
     * @tc.name       : testOHVideoEncoderFlush009
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush009', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(1,1,1,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_1000
     * @tc.name       : testOHVideoEncoderFlush010
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush010', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(1,1,0,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_1100
     * @tc.name       : testOHVideoEncoderFlush011
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush011', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(1,1,0,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_1200
     * @tc.name       : testOHVideoEncoderFlush012
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush012', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(1,1,0,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_1300
     * @tc.name       : testOHVideoEncoderFlush013
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush013', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(1,1,0,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_1400
     * @tc.name       : testOHVideoEncoderFlush014
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush014', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(1,1,0,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_1500
     * @tc.name       : testOHVideoEncoderFlush015
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush015', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(1,1,0,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_1600
     * @tc.name       : testOHVideoEncoderFlush016
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush016', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(1,1,0,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_1700
     * @tc.name       : testOHVideoEncoderFlush017
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush017', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(1,1,0,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_1800
     * @tc.name       : testOHVideoEncoderFlush018
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush018', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(1,0,1,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_1900
     * @tc.name       : testOHVideoEncoderFlush019
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush019', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(1,0,1,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_2000
     * @tc.name       : testOHVideoEncoderFlush020
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush020', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(1,0,1,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_2100
     * @tc.name       : testOHVideoEncoderFlush021
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush021', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(1,0,1,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_2200
     * @tc.name       : testOHVideoEncoderFlush022
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush022', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(1,0,1,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_2300
     * @tc.name       : testOHVideoEncoderFlush023
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush023', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(1,0,1,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_2400
     * @tc.name       : testOHVideoEncoderFlush024
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush024', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(1,0,1,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_2500
     * @tc.name       : testOHVideoEncoderFlush025
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush025', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(1,0,1,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_2600
     * @tc.name       : testOHVideoEncoderFlush026
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush026', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(1,0,0,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_2700
     * @tc.name       : testOHVideoEncoderFlush027
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush027', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(1,0,0,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_2800
     * @tc.name       : testOHVideoEncoderFlush028
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush028', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(1,0,0,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_2900
     * @tc.name       : testOHVideoEncoderFlush029
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush029', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(1,0,0,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_3000
     * @tc.name       : testOHVideoEncoderFlush030
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush030', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(1,0,0,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_3100
     * @tc.name       : testOHVideoEncoderFlush031
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush031', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(1,0,0,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_3200
     * @tc.name       : testOHVideoEncoderFlush032
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush032', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(1,0,0,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_3300
     * @tc.name       : testOHVideoEncoderFlush033
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush033', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(1,0,0,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_3400
     * @tc.name       : testOHVideoEncoderFlush034
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush034', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(0,1,1,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_3500
     * @tc.name       : testOHVideoEncoderFlush035
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush035', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(0,1,1,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_3600
     * @tc.name       : testOHVideoEncoderFlush036
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush036', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(0,1,1,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_3700
     * @tc.name       : testOHVideoEncoderFlush037
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush037', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(0,1,1,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_3800
     * @tc.name       : testOHVideoEncoderFlush038
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush038', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(0,1,1,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_3900
     * @tc.name       : testOHVideoEncoderFlush039
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush039', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(0,1,1,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_4000
     * @tc.name       : testOHVideoEncoderFlush040
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush040', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(0,1,1,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_4100
     * @tc.name       : testOHVideoEncoderFlush041
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush041', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(0,1,1,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_4200
     * @tc.name       : testOHVideoEncoderFlush042
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush042', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(0,1,0,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_4300
     * @tc.name       : testOHVideoEncoderFlush043
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush043', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(0,1,0,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_4400
     * @tc.name       : testOHVideoEncoderFlush044
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush044', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(0,1,0,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_4500
     * @tc.name       : testOHVideoEncoderFlush045
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush045', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(0,1,0,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_4600
     * @tc.name       : testOHVideoEncoderFlush046
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush046', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(0,1,0,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_4700
     * @tc.name       : testOHVideoEncoderFlush047
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush047', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(0,1,0,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_4800
     * @tc.name       : testOHVideoEncoderFlush048
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush048', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(0,1,0,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_4900
     * @tc.name       : testOHVideoEncoderFlush049
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush049', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(0,1,0,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_5000
     * @tc.name       : testOHVideoEncoderFlush050
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush050', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(0,0,1,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_5100
     * @tc.name       : testOHVideoEncoderFlush051
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush051', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(0,0,1,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_5200
     * @tc.name       : testOHVideoEncoderFlush052
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush052', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(0,0,1,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_5300
     * @tc.name       : testOHVideoEncoderFlush053
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush053', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(0,0,1,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_5400
     * @tc.name       : testOHVideoEncoderFlush054
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush054', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(0,0,1,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_5500
     * @tc.name       : testOHVideoEncoderFlush055
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush055', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(0,0,1,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_5600
     * @tc.name       : testOHVideoEncoderFlush056
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush056', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(0,0,1,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_5700
     * @tc.name       : testOHVideoEncoderFlush057
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush057', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(0,0,1,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_5800
     * @tc.name       : testOHVideoEncoderFlush058
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush058', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(0,0,0,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_5900
     * @tc.name       : testOHVideoEncoderFlush059
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush059', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(0,0,0,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_6000
     * @tc.name       : testOHVideoEncoderFlush060
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush060', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(0,0,0,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_6100
     * @tc.name       : testOHVideoEncoderFlush061
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush061', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(0,0,0,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_6200
     * @tc.name       : testOHVideoEncoderFlush062
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush062', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(0,0,0,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_6300
     * @tc.name       : testOHVideoEncoderFlush063
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush063', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(0,0,0,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_6400
     * @tc.name       : testOHVideoEncoderFlush064
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush064', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(0,0,0,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_FLUSH_6500
     * @tc.name       : testOHVideoEncoderFlush065
     * @tc.desc       : test OH_VideoEncoder_Flush
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderFlush065', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderFlush(0,0,0,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_0100
     * @tc.name       : testOHVideoEncoderReset001
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset001', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(1,1,1,1,1,1,1);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_0200
     * @tc.name       : testOHVideoEncoderReset002
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset002', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(2,1,1,1,1,1,1);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_0300
     * @tc.name       : testOHVideoEncoderReset003
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset003', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(1,1,1,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_0400
     * @tc.name       : testOHVideoEncoderReset004
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset004', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(1,1,1,1,0,1,0);
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_0500
     * @tc.name       : testOHVideoEncoderReset005
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset005', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(1,1,1,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_0600
     * @tc.name       : testOHVideoEncoderReset006
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset006', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(1,1,1,0,1,1,0);
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_0700
     * @tc.name       : testOHVideoEncoderReset007
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset007', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(1,1,1,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_0800
     * @tc.name       : testOHVideoEncoderReset008
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset008', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(1,1,1,0,0,1,0);
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_0900
     * @tc.name       : testOHVideoEncoderReset009
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset009', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(1,1,1,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_1000
     * @tc.name       : testOHVideoEncoderReset010
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset010', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(1,1,0,1,1,1,0);
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_1100
     * @tc.name       : testOHVideoEncoderReset011
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset011', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(1,1,0,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_1200
     * @tc.name       : testOHVideoEncoderReset012
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset012', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(1,1,0,1,0,1,0);
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_1300
     * @tc.name       : testOHVideoEncoderReset013
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset013', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(1,1,0,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_1400
     * @tc.name       : testOHVideoEncoderReset014
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset014', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(1,1,0,0,1,1,0);
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_1500
     * @tc.name       : testOHVideoEncoderReset015
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset015', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(1,1,0,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_1600
     * @tc.name       : testOHVideoEncoderReset016
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset016', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(1,1,0,0,0,1,0);
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_1700
     * @tc.name       : testOHVideoEncoderReset017
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset017', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(1,1,0,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_1800
     * @tc.name       : testOHVideoEncoderReset018
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset018', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(1,0,1,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_1900
     * @tc.name       : testOHVideoEncoderReset019
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset019', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(1,0,1,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_2000
     * @tc.name       : testOHVideoEncoderReset020
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset020', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(1,0,1,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_2100
     * @tc.name       : testOHVideoEncoderReset021
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset021', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(1,0,1,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_2200
     * @tc.name       : testOHVideoEncoderReset022
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset022', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(1,0,1,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_2300
     * @tc.name       : testOHVideoEncoderReset023
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset023', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(1,0,1,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_2400
     * @tc.name       : testOHVideoEncoderReset024
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset024', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(1,0,1,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_2500
     * @tc.name       : testOHVideoEncoderReset025
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset025', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(1,0,1,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_2600
     * @tc.name       : testOHVideoEncoderReset026
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset026', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(1,0,0,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_2700
     * @tc.name       : testOHVideoEncoderReset027
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset027', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(1,0,0,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_2800
     * @tc.name       : testOHVideoEncoderReset028
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset028', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(1,0,0,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_2900
     * @tc.name       : testOHVideoEncoderReset029
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset029', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(1,0,0,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_3000
     * @tc.name       : testOHVideoEncoderReset030
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset030', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(1,0,0,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_3100
     * @tc.name       : testOHVideoEncoderReset031
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset031', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(1,0,0,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_3200
     * @tc.name       : testOHVideoEncoderReset032
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset032', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(1,0,0,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_3300
     * @tc.name       : testOHVideoEncoderReset033
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset033', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(1,0,0,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_3400
     * @tc.name       : testOHVideoEncoderReset034
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset034', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(0,1,1,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_3500
     * @tc.name       : testOHVideoEncoderReset035
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset035', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(0,1,1,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_3600
     * @tc.name       : testOHVideoEncoderReset036
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset036', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(0,1,1,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_3700
     * @tc.name       : testOHVideoEncoderReset037
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset037', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(0,1,1,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_3800
     * @tc.name       : testOHVideoEncoderReset038
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset038', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(0,1,1,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_3900
     * @tc.name       : testOHVideoEncoderReset039
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset039', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(0,1,1,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_4000
     * @tc.name       : testOHVideoEncoderReset040
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset040', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(0,1,1,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_4100
     * @tc.name       : testOHVideoEncoderReset041
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset041', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(0,1,1,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_4200
     * @tc.name       : testOHVideoEncoderReset042
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset042', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(0,1,0,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_4300
     * @tc.name       : testOHVideoEncoderReset043
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset043', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(0,1,0,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_4400
     * @tc.name       : testOHVideoEncoderReset044
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset044', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(0,1,0,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_4500
     * @tc.name       : testOHVideoEncoderReset045
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset045', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(0,1,0,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_4600
     * @tc.name       : testOHVideoEncoderReset046
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset046', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(0,1,0,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_4700
     * @tc.name       : testOHVideoEncoderReset047
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset047', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(0,1,0,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_4800
     * @tc.name       : testOHVideoEncoderReset048
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset048', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(0,1,0,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_4900
     * @tc.name       : testOHVideoEncoderReset049
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset049', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(0,1,0,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_5000
     * @tc.name       : testOHVideoEncoderReset050
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset050', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(0,0,1,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_5100
     * @tc.name       : testOHVideoEncoderReset051
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset051', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(0,0,1,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_5200
     * @tc.name       : testOHVideoEncoderReset052
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset052', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(0,0,1,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_5300
     * @tc.name       : testOHVideoEncoderReset053
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset053', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(0,0,1,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_5400
     * @tc.name       : testOHVideoEncoderReset054
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset054', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(0,0,1,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_5500
     * @tc.name       : testOHVideoEncoderReset055
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset055', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(0,0,1,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_5600
     * @tc.name       : testOHVideoEncoderReset056
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset056', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(0,0,1,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_5700
     * @tc.name       : testOHVideoEncoderReset057
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset057', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(0,0,1,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_5800
     * @tc.name       : testOHVideoEncoderReset058
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset058', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(0,0,0,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_5900
     * @tc.name       : testOHVideoEncoderReset059
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset059', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(0,0,0,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_6000
     * @tc.name       : testOHVideoEncoderReset060
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset060', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(0,0,0,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_6100
     * @tc.name       : testOHVideoEncoderReset061
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset061', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(0,0,0,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_6200
     * @tc.name       : testOHVideoEncoderReset062
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset062', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(0,0,0,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_6300
     * @tc.name       : testOHVideoEncoderReset063
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset063', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(0,0,0,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_6400
     * @tc.name       : testOHVideoEncoderReset064
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset064', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(0,0,0,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_RESET_6500
     * @tc.name       : testOHVideoEncoderReset065
     * @tc.desc       : test OH_VideoEncoder_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderReset065', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderReset(0,0,0,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_0100
     * @tc.name       : testOHVideoEncoderGetOutputDescription001
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription001', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(1,1,1,1,1,1,1);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_0200
     * @tc.name       : testOHVideoEncoderGetOutputDescription002
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription002', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(2,1,1,1,1,1,1);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_0300
     * @tc.name       : testOHVideoEncoderGetOutputDescription003
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription003', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(1,1,1,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_0400
     * @tc.name       : testOHVideoEncoderGetOutputDescription004
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription004', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(1,1,1,1,0,1,0);
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_0500
     * @tc.name       : testOHVideoEncoderGetOutputDescription005
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription005', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(1,1,1,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_0600
     * @tc.name       : testOHVideoEncoderGetOutputDescription006
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription006', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(1,1,1,0,1,1,0);
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_0700
     * @tc.name       : testOHVideoEncoderGetOutputDescription007
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription007', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(1,1,1,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_0800
     * @tc.name       : testOHVideoEncoderGetOutputDescription008
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription008', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(1,1,1,0,0,1,0);
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_0900
     * @tc.name       : testOHVideoEncoderGetOutputDescription009
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription009', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(1,1,1,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_1000
     * @tc.name       : testOHVideoEncoderGetOutputDescription010
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription010', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(1,1,0,1,1,1,0);
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_1100
     * @tc.name       : testOHVideoEncoderGetOutputDescription011
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription011', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(1,1,0,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_1200
     * @tc.name       : testOHVideoEncoderGetOutputDescription012
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription012', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(1,1,0,1,0,1,0);
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_1300
     * @tc.name       : testOHVideoEncoderGetOutputDescription013
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription013', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(1,1,0,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_1400
     * @tc.name       : testOHVideoEncoderGetOutputDescription014
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription014', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(1,1,0,0,1,1,0);
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_1500
     * @tc.name       : testOHVideoEncoderGetOutputDescription015
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription015', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(1,1,0,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_1600
     * @tc.name       : testOHVideoEncoderGetOutputDescription016
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription016', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(1,1,0,0,0,1,0);
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_1700
     * @tc.name       : testOHVideoEncoderGetOutputDescription017
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription017', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(1,1,0,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_1800
     * @tc.name       : testOHVideoEncoderGetOutputDescription018
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription018', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(1,0,1,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_1900
     * @tc.name       : testOHVideoEncoderGetOutputDescription019
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription019', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(1,0,1,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_2000
     * @tc.name       : testOHVideoEncoderGetOutputDescription020
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription020', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(1,0,1,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_2100
     * @tc.name       : testOHVideoEncoderGetOutputDescription021
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription021', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(1,0,1,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_2200
     * @tc.name       : testOHVideoEncoderGetOutputDescription022
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription022', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(1,0,1,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_2300
     * @tc.name       : testOHVideoEncoderGetOutputDescription023
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription023', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(1,0,1,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_2400
     * @tc.name       : testOHVideoEncoderGetOutputDescription024
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription024', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(1,0,1,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_2500
     * @tc.name       : testOHVideoEncoderGetOutputDescription025
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription025', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(1,0,1,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_2600
     * @tc.name       : testOHVideoEncoderGetOutputDescription026
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription026', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(1,0,0,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_2700
     * @tc.name       : testOHVideoEncoderGetOutputDescription027
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription027', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(1,0,0,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_2800
     * @tc.name       : testOHVideoEncoderGetOutputDescription028
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription028', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(1,0,0,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_2900
     * @tc.name       : testOHVideoEncoderGetOutputDescription029
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription029', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(1,0,0,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_3000
     * @tc.name       : testOHVideoEncoderGetOutputDescription030
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription030', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(1,0,0,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_3100
     * @tc.name       : testOHVideoEncoderGetOutputDescription031
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription031', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(1,0,0,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_3200
     * @tc.name       : testOHVideoEncoderGetOutputDescription032
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription032', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(1,0,0,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_3300
     * @tc.name       : testOHVideoEncoderGetOutputDescription033
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription033', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(1,0,0,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_3400
     * @tc.name       : testOHVideoEncoderGetOutputDescription034
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription034', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(0,1,1,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_3500
     * @tc.name       : testOHVideoEncoderGetOutputDescription035
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription035', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(0,1,1,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_3600
     * @tc.name       : testOHVideoEncoderGetOutputDescription036
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription036', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(0,1,1,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_3700
     * @tc.name       : testOHVideoEncoderGetOutputDescription037
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription037', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(0,1,1,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_3800
     * @tc.name       : testOHVideoEncoderGetOutputDescription038
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription038', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(0,1,1,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_3900
     * @tc.name       : testOHVideoEncoderGetOutputDescription039
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription039', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(0,1,1,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_4000
     * @tc.name       : testOHVideoEncoderGetOutputDescription040
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription040', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(0,1,1,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_4100
     * @tc.name       : testOHVideoEncoderGetOutputDescription041
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription041', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(0,1,1,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_4200
     * @tc.name       : testOHVideoEncoderGetOutputDescription042
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription042', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(0,1,0,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_4300
     * @tc.name       : testOHVideoEncoderGetOutputDescription043
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription043', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(0,1,0,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_4400
     * @tc.name       : testOHVideoEncoderGetOutputDescription044
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription044', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(0,1,0,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_4500
     * @tc.name       : testOHVideoEncoderGetOutputDescription045
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription045', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(0,1,0,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_4600
     * @tc.name       : testOHVideoEncoderGetOutputDescription046
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription046', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(0,1,0,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_4700
     * @tc.name       : testOHVideoEncoderGetOutputDescription047
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription047', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(0,1,0,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_4800
     * @tc.name       : testOHVideoEncoderGetOutputDescription048
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription048', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(0,1,0,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_4900
     * @tc.name       : testOHVideoEncoderGetOutputDescription049
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription049', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(0,1,0,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_5000
     * @tc.name       : testOHVideoEncoderGetOutputDescription050
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription050', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(0,0,1,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_5100
     * @tc.name       : testOHVideoEncoderGetOutputDescription051
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription051', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(0,0,1,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_5200
     * @tc.name       : testOHVideoEncoderGetOutputDescription052
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription052', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(0,0,1,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_5300
     * @tc.name       : testOHVideoEncoderGetOutputDescription053
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription053', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(0,0,1,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_5400
     * @tc.name       : testOHVideoEncoderGetOutputDescription054
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription054', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(0,0,1,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_5500
     * @tc.name       : testOHVideoEncoderGetOutputDescription055
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription055', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(0,0,1,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_5600
     * @tc.name       : testOHVideoEncoderGetOutputDescription056
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription056', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(0,0,1,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_5700
     * @tc.name       : testOHVideoEncoderGetOutputDescription057
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription057', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(0,0,1,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_5800
     * @tc.name       : testOHVideoEncoderGetOutputDescription058
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription058', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(0,0,0,1,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_5900
     * @tc.name       : testOHVideoEncoderGetOutputDescription059
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription059', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(0,0,0,1,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_6000
     * @tc.name       : testOHVideoEncoderGetOutputDescription060
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription060', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(0,0,0,1,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_6100
     * @tc.name       : testOHVideoEncoderGetOutputDescription061
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription061', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(0,0,0,1,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_6200
     * @tc.name       : testOHVideoEncoderGetOutputDescription062
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription062', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(0,0,0,0,1,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_6300
     * @tc.name       : testOHVideoEncoderGetOutputDescription063
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription063', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(0,0,0,0,1,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_6400
     * @tc.name       : testOHVideoEncoderGetOutputDescription064
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription064', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(0,0,0,0,0,1,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETOUTPUTDESCRIPTION_6500
     * @tc.name       : testOHVideoEncoderGetOutputDescription065
     * @tc.desc       : test OH_VideoEncoder_GetOutputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetOutputDescription065', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetOutputDescription(0,0,0,0,0,0,0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_SETPARAMETER_0100
     * @tc.name       : testOHVideoEncoderSetParameter001
     * @tc.desc       : test OH_VideoEncoder_SetParameter
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderSetParameter001', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderSetParameter();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_SETPARAMETER_0200
     * @tc.name       : testOHVideoEncoderSetParameter002
     * @tc.desc       : test OH_VideoEncoder_SetParameter
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderSetParameter002', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderSetParameterHEVC();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_SETPARAMETER_0300
     * @tc.name       : testOHVideoEncoderSetParameter003
     * @tc.desc       : test OH_VideoEncoder_SetParameter
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderSetParameter003', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderSetParameterAbnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETINPUTDESCRIPTION_0100
     * @tc.name       : testOHVideoEncoderGetInputDescription001
     * @tc.desc       : test OH_VideoEncoder_GetInputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetInputDescription001', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetInputDescription();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETINPUTDESCRIPTION_0200
     * @tc.name       : testOHVideoEncoderGetInputDescription002
     * @tc.desc       : test OH_VideoEncoder_GetInputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetInputDescription002', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetInputDescriptionHEVC();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_GETINPUTDESCRIPTION_0300
     * @tc.name       : testOHVideoEncoderGetInputDescription003
     * @tc.desc       : test OH_VideoEncoder_GetInputDescription
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderGetInputDescription003', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderGetInputDescriptionAbnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_ISVALID_0100
     * @tc.name       : testOHVideoEncoderIsValid001
     * @tc.desc       : test OH_VideoEncoder_IsValid
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderIsValid001', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderIsValid();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_ISVALID_0200
     * @tc.name       : testOHVideoEncoderIsValid002
     * @tc.desc       : test OH_VideoEncoder_IsValid
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderIsValid002', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderIsValidHEVC();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_VIDEOENCODER_OH_VIDEOENCODER_ISVALID_0300
     * @tc.name       : testOHVideoEncoderIsValid003
     * @tc.desc       : test OH_VideoEncoder_IsValid
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHVideoEncoderIsValid003', 0, async (done: Function) => {
      let result: number = videoencoderndk.oHVideoEncoderIsValidAbnormal();
      expect(result).assertEqual(0);
      done();
    });
  })
}
