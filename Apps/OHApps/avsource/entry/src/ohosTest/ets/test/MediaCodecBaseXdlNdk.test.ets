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
import mediacodecbasexdlndk from 'libmediacodecbasexdlndk.so'

export default function mediaCodecBaseXdlNdkTest() {
  describe('MuslMediaCodecBaseXdlTest', () => {

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_0200
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange002
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange002', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeAnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_0300
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange003
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange003', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeBnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_0400
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange004
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange004', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeCnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_0500
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange005
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange005', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeDnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_0600
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange006
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange006', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeEnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_0700
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange007
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange007', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeFnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_0800
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange008
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange008', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeGnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_0900
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange009
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange009', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeHnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_1000
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange010
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange010', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeInormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_1100
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange011
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange011', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeJnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_1200
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange012
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange012', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeKnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_1300
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange013
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange013', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeLnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_1400
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange014
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange014', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeMnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_1500
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange015
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange015', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeNnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_1600
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange016
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange016', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeOnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_1700
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange017
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange017', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangePnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_1800
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange018
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange018', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeQnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_1900
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange019
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange019', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeRnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_2000
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange020
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange020', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeSnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_2100
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange021
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange021', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeTnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_2200
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange022
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange022', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeUnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_2300
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange023
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange023', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeVnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_2400
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange024
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange024', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeWnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_2500
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange025
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange025', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeXnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_2600
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange026
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange026', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeYnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_2700
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange027
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange027', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeZnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_2800
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange028
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange028', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeAAnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_2900
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange029
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange029', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeABnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_3000
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange030
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange030', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeACnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_1100
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange031
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange031', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeADnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_3200
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange032
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange032', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeAEnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_3300
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange033
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange033', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeAFnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_3400
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange034
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange034', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeAGnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_3500
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange035
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange035', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeAHnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_3600
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange036
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange036', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeAInormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_3700
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange037
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange037', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeAJnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_3800
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange038
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange038', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeAKnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_3900
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange039
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange039', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeALnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_4000
     * @tc.name       : testOHAvCapabilityGetEncoderQualityRange040
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderQualityRange040', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderQualityRangeAMnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_0200
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange002
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange002', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeAnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_0300
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange003
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange003', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeBnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_0400
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange004
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange004', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeCnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_0500
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange005
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange005', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeDnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_0600
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange006
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange006', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeEnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_0700
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange007
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange007', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeFnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_0800
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange008
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange008', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeGnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_0900
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange009
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange009', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeHnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_1000
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange010
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange010', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeInormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_1100
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange011
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange011', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeJnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_1200
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange012
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange012', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeKnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_1300
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange013
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange013', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeLnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_1400
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange014
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange014', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeMnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_1500
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange015
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange015', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeNnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_1600
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange016
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange016', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeOnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_1700
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange017
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange017', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangePnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_1800
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange018
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange018', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeQnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_1900
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange019
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange019', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeRnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_2000
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange020
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange020', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeSnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_2100
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange021
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange021', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeTnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_2200
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange022
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange022', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeUnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_2300
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange023
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange023', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeVnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_2400
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange024
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange024', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeWnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_2500
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange025
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange025', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeXnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_2600
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange026
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange026', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeYnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_2700
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange027
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange027', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeZnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_2800
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange028
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange028', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeAAnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_2900
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange029
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange029', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeABnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_3000
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange030
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange030', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeACnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_3100
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange031
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange031', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeADnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_3200
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange032
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange032', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeAEnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_3300
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange033
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange033', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeAFnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_3400
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange034
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange034', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeAGnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_3500
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange035
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange035', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeAHnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_3600
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange036
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange036', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeAInormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_3700
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange037
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange037', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeAJnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_3800
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange038
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange038', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeAKnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_3900
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange039
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange039', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeALnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_4000
     * @tc.name       : testOHAvCapabilityGetEncoderComplexityRange040
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetEncoderComplexityRange040', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetEncoderComplexityRangeAMnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOSUPPORTEDSAMPLERATES_0200
     * @tc.name       : testOHAvCapabilityGetAudioSupportedSampleRates002
     * @tc.desc       : test OH_AVCapability_GetAudioSupportedSampleRates
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioSupportedSampleRates002', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioSupportedSampleRatesAbnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOSUPPORTEDSAMPLERATES_0300
     * @tc.name       : testOHAvCapabilityGetAudioSupportedSampleRates003
     * @tc.desc       : test OH_AVCapability_GetAudioSupportedSampleRates
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioSupportedSampleRates003', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioSupportedSampleRatesAnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOSUPPORTEDSAMPLERATES_0400
     * @tc.name       : testOHAvCapabilityGetAudioSupportedSampleRates004
     * @tc.desc       : test OH_AVCapability_GetAudioSupportedSampleRates
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioSupportedSampleRates004', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioSupportedSampleRatesBnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOSUPPORTEDSAMPLERATES_0500
     * @tc.name       : testOHAvCapabilityGetAudioSupportedSampleRates005
     * @tc.desc       : test OH_AVCapability_GetAudioSupportedSampleRates
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioSupportedSampleRates005', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioSupportedSampleRatesCnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOSUPPORTEDSAMPLERATES_0600
     * @tc.name       : testOHAvCapabilityGetAudioSupportedSampleRates006
     * @tc.desc       : test OH_AVCapability_GetAudioSupportedSampleRates
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioSupportedSampleRates006', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioSupportedSampleRatesDnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOSUPPORTEDSAMPLERATES_0700
     * @tc.name       : testOHAvCapabilityGetAudioSupportedSampleRates007
     * @tc.desc       : test OH_AVCapability_GetAudioSupportedSampleRates
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioSupportedSampleRates007', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioSupportedSampleRatesEnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOSUPPORTEDSAMPLERATES_0800
     * @tc.name       : testOHAvCapabilityGetAudioSupportedSampleRates008
     * @tc.desc       : test OH_AVCapability_GetAudioSupportedSampleRates
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioSupportedSampleRates008', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioSupportedSampleRatesFnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOSUPPORTEDSAMPLERATES_0900
     * @tc.name       : testOHAvCapabilityGetAudioSupportedSampleRates009
     * @tc.desc       : test OH_AVCapability_GetAudioSupportedSampleRates
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioSupportedSampleRates009', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioSupportedSampleRatesGnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOSUPPORTEDSAMPLERATES_1000
     * @tc.name       : testOHAvCapabilityGetAudioSupportedSampleRates010
     * @tc.desc       : test OH_AVCapability_GetAudioSupportedSampleRates
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioSupportedSampleRates010', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioSupportedSampleRatesHnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOSUPPORTEDSAMPLERATES_1100
     * @tc.name       : testOHAvCapabilityGetAudioSupportedSampleRates011
     * @tc.desc       : test OH_AVCapability_GetAudioSupportedSampleRates
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioSupportedSampleRates011', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioSupportedSampleRatesInormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOSUPPORTEDSAMPLERATES_1200
     * @tc.name       : testOHAvCapabilityGetAudioSupportedSampleRates012
     * @tc.desc       : test OH_AVCapability_GetAudioSupportedSampleRates
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioSupportedSampleRates012', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioSupportedSampleRatesGnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOSUPPORTEDSAMPLERATES_1300
     * @tc.name       : testOHAvCapabilityGetAudioSupportedSampleRates013
     * @tc.desc       : test OH_AVCapability_GetAudioSupportedSampleRates
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioSupportedSampleRates013', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioSupportedSampleRatesKnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOSUPPORTEDSAMPLERATES_1400
     * @tc.name       : testOHAvCapabilityGetAudioSupportedSampleRates014
     * @tc.desc       : test OH_AVCapability_GetAudioSupportedSampleRates
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioSupportedSampleRates014', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioSupportedSampleRatesLnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOSUPPORTEDSAMPLERATES_1500
     * @tc.name       : testOHAvCapabilityGetAudioSupportedSampleRates015
     * @tc.desc       : test OH_AVCapability_GetAudioSupportedSampleRates
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioSupportedSampleRates015', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioSupportedSampleRatesMnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOSUPPORTEDSAMPLERATES_1600
     * @tc.name       : testOHAvCapabilityGetAudioSupportedSampleRates016
     * @tc.desc       : test OH_AVCapability_GetAudioSupportedSampleRates
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioSupportedSampleRates016', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioSupportedSampleRatesNnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOSUPPORTEDSAMPLERATES_1700
     * @tc.name       : testOHAvCapabilityGetAudioSupportedSampleRates017
     * @tc.desc       : test OH_AVCapability_GetAudioSupportedSampleRates
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioSupportedSampleRates017', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioSupportedSampleRatesOnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOSUPPORTEDSAMPLERATES_1800
     * @tc.name       : testOHAvCapabilityGetAudioSupportedSampleRates018
     * @tc.desc       : test OH_AVCapability_GetAudioSupportedSampleRates
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioSupportedSampleRates018', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioSupportedSampleRatesPnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOCHANNELCOUNTRANGE_0200
     * @tc.name       : testOHAvCapabilityGetAudioChannelCountRange002
     * @tc.desc       : test OH_AVCapafbility_GetAudioChannelCountRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioChannelCountRange002', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioChannelCountRangeAnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOCHANNELCOUNTRANGE_0300
     * @tc.name       : testOHAvCapabilityGetAudioChannelCountRange003
     * @tc.desc       : test OH_AVCapability_GetAudioChannelCountRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioChannelCountRange003', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioChannelCountRangeBnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOCHANNELCOUNTRANGE_0400
     * @tc.name       : testOHAvCapabilityGetAudioChannelCountRange004
     * @tc.desc       : test OH_AVCapability_GetAudioChannelCountRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioChannelCountRange004', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioChannelCountRangeCnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOCHANNELCOUNTRANGE_0500
     * @tc.name       : testOHAvCapabilityGetAudioChannelCountRange005
     * @tc.desc       : test OH_AVCapability_GetAudioChannelCountRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioChannelCountRange005', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioChannelCountRangeDnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOCHANNELCOUNTRANGE_0600
     * @tc.name       : testOHAvCapabilityGetAudioChannelCountRange006
     * @tc.desc       : test OH_AVCapability_GetAudioChannelCountRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioChannelCountRange006', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioChannelCountRangeEnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOCHANNELCOUNTRANGE_0700
     * @tc.name       : testOHAvCapabilityGetAudioChannelCountRange007
     * @tc.desc       : test OH_AVCapability_GetAudioChannelCountRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioChannelCountRange007', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioChannelCountRangeFnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOCHANNELCOUNTRANGE_0800
     * @tc.name       : testOHAvCapabilityGetAudioChannelCountRange008
     * @tc.desc       : test OH_AVCapability_GetAudioChannelCountRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioChannelCountRange008', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioChannelCountRangeGnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOCHANNELCOUNTRANGE_0900
     * @tc.name       : testOHAvCapabilityGetAudioChannelCountRange009
     * @tc.desc       : test OH_AVCapability_GetAudioChannelCountRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioChannelCountRange009', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioChannelCountRangeHnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOCHANNELCOUNTRANGE_1000
     * @tc.name       : testOHAvCapabilityGetAudioChannelCountRange010
     * @tc.desc       : test OH_AVCapability_GetAudioChannelCountRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioChannelCountRange010', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioChannelCountRangeInormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOCHANNELCOUNTRANGE_1100
     * @tc.name       : testOHAvCapabilityGetAudioChannelCountRange011
     * @tc.desc       : test OH_AVCapability_GetAudioChannelCountRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioChannelCountRange011', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioChannelCountRangeJnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOCHANNELCOUNTRANGE_1200
     * @tc.name       : testOHAvCapabilityGetAudioChannelCountRange012
     * @tc.desc       : test OH_AVCapability_GetAudioChannelCountRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioChannelCountRange012', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioChannelCountRangeKnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOCHANNELCOUNTRANGE_1300
     * @tc.name       : testOHAvCapabilityGetAudioChannelCountRange013
     * @tc.desc       : test OH_AVCapability_GetAudioChannelCountRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioChannelCountRange013', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioChannelCountRangeLnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOCHANNELCOUNTRANGE_1400
     * @tc.name       : testOHAvCapabilityGetAudioChannelCountRange014
     * @tc.desc       : test OH_AVCapability_GetAudioChannelCountRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioChannelCountRange014', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioChannelCountRangeMnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOCHANNELCOUNTRANGE_1500
     * @tc.name       : testOHAvCapabilityGetAudioChannelCountRange015
     * @tc.desc       : test OH_AVCapability_GetAudioChannelCountRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioChannelCountRange015', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioChannelCountRangeNnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOCHANNELCOUNTRANGE_1600
     * @tc.name       : testOHAvCapabilityGetAudioChannelCountRange016
     * @tc.desc       : test OH_AVCapability_GetAudioChannelCountRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioChannelCountRange016', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioChannelCountRangeOnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOCHANNELCOUNTRANGE_1700
     * @tc.name       : testOHAvCapabilityGetAudioChannelCountRange017
     * @tc.desc       : test OH_AVCapability_GetAudioChannelCountRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioChannelCountRange017', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioChannelCountRangePnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOCHANNELCOUNTRANGE_1800
     * @tc.name       : testOHAvCapabilityGetAudioChannelCountRange018
     * @tc.desc       : test OH_AVCapability_GetAudioChannelCountRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioChannelCountRange018', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioChannelCountRangeQnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOCHANNELCOUNTRANGE_1900
     * @tc.name       : testOHAvCapabilityGetAudioChannelCountRange019
     * @tc.desc       : test OH_AVCapability_GetAudioChannelCountRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioChannelCountRange019', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioChannelCountRangeRnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOCHANNELCOUNTRANGE_2000
     * @tc.name       : testOHAvCapabilityGetAudioChannelCountRange020
     * @tc.desc       : test OH_AVCapability_GetAudioChannelCountRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetAudioChannelCountRange020', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetAudioChannelCountRangeSnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETVIDEOWIDTHALIGNMENT_0200
     * @tc.name       : testOHAvCapabilityGetVideoWidthAlignment002
     * @tc.desc       : test OH_AVCapability_GetVideoWidthAlignment
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetVideoWidthAlignment002', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetVideoWidthAlignmentAnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETVIDEOWIDTHALIGNMENT_0300
     * @tc.name       : testOHAvCapabilityGetVideoWidthAlignment003
     * @tc.desc       : test OH_AVCapability_GetVideoWidthAlignment
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetVideoWidthAlignment003', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetVideoWidthAlignmentBnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETVIDEOWIDTHALIGNMENT_0400
     * @tc.name       : testOHAvCapabilityGetVideoWidthAlignment004
     * @tc.desc       : test OH_AVCapability_GetVideoWidthAlignment
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetVideoWidthAlignment004', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetVideoWidthAlignmentCnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETVIDEOWIDTHALIGNMENT_0500
     * @tc.name       : testOHAvCapabilityGetVideoWidthAlignment005
     * @tc.desc       : test OH_AVCapability_GetVideoWidthAlignment
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetVideoWidthAlignment005', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetVideoWidthAlignmentDnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETVIDEOWIDTHALIGNMENT_0600
     * @tc.name       : testOHAvCapabilityGetVideoWidthAlignment006
     * @tc.desc       : test OH_AVCapability_GetVideoWidthAlignment
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetVideoWidthAlignment006', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetVideoWidthAlignmentEnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETVIDEOWIDTHALIGNMENT_0700
     * @tc.name       : testOHAvCapabilityGetVideoWidthAlignment007
     * @tc.desc       : test OH_AVCapability_GetVideoWidthAlignment
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetVideoWidthAlignment007', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetVideoWidthAlignmentFnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETVIDEOWIDTHALIGNMENT_0800
     * @tc.name       : testOHAvCapabilityGetVideoWidthAlignment008
     * @tc.desc       : test OH_AVCapability_GetVideoWidthAlignment
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetVideoWidthAlignment008', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetVideoWidthAlignmentGnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETVIDEOWIDTHALIGNMENT_0900
     * @tc.name       : testOHAvCapabilityGetVideoWidthAlignment009
     * @tc.desc       : test OH_AVCapability_GetVideoWidthAlignment
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetVideoWidthAlignment009', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetVideoWidthAlignmentHnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETVIDEOWIDTHALIGNMENT_1000
     * @tc.name       : testOHAvCapabilityGetVideoWidthAlignment010
     * @tc.desc       : test OH_AVCapability_GetVideoWidthAlignment
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetVideoWidthAlignment010', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetVideoWidthAlignmentInormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETVIDEOWIDTHALIGNMENT_1100
     * @tc.name       : testOHAvCapabilityGetVideoWidthAlignment011
     * @tc.desc       : test OH_AVCapability_GetVideoWidthAlignment
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetVideoWidthAlignment011', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetVideoWidthAlignmentJnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETVIDEOWIDTHALIGNMENT_1200
     * @tc.name       : testOHAvCapabilityGetVideoWidthAlignment012
     * @tc.desc       : test OH_AVCapability_GetVideoWidthAlignment
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetVideoWidthAlignment012', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetVideoWidthAlignmentKnormal();
      expect(result).assertEqual(-1);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETVIDEOWIDTHALIGNMENT_1300
     * @tc.name       : testOHAvCapabilityGetVideoWidthAlignment013
     * @tc.desc       : test OH_AVCapability_GetVideoWidthAlignment
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetVideoWidthAlignment013', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetVideoWidthAlignmentLnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETVIDEOWIDTHALIGNMENT_1400
     * @tc.name       : testOHAvCapabilityGetVideoWidthAlignment014
     * @tc.desc       : test OH_AVCapability_GetVideoWidthAlignment
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAvCapabilityGetVideoWidthAlignment014', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetVideoWidthAlignmentMnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETVIDEOHEIGHTALIGNMENT_0200
     * @tc.name       : testOhAvCapabilityGetVideoHeightAlignment002
     * @tc.desc       : test OH_AVCapability_GetVideoHeightAlignment
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvCapabilityGetVideoHeightAlignment002', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetVideoHeightAlignmentAnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETVIDEOHEIGHTALIGNMENT_0300
     * @tc.name       : testOhAvCapabilityGetVideoHeightAlignment003
     * @tc.desc       : test OH_AVCapability_GetVideoHeightAlignment
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvCapabilityGetVideoHeightAlignment003', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetVideoHeightAlignmentBnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETVIDEOHEIGHTALIGNMENT_0400
     * @tc.name       : testOhAvCapabilityGetVideoHeightAlignment004
     * @tc.desc       : test OH_AVCapability_GetVideoHeightAlignment
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvCapabilityGetVideoHeightAlignment004', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetVideoHeightAlignmentCnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETVIDEOHEIGHTALIGNMENT_0500
     * @tc.name       : testOhAvCapabilityGetVideoHeightAlignment005
     * @tc.desc       : test OH_AVCapability_GetVideoHeightAlignment
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvCapabilityGetVideoHeightAlignment005', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetVideoHeightAlignmentDnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETVIDEOHEIGHTALIGNMENT_0600
     * @tc.name       : testOhAvCapabilityGetVideoHeightAlignment006
     * @tc.desc       : test OH_AVCapability_GetVideoHeightAlignment
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvCapabilityGetVideoHeightAlignment006', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetVideoHeightAlignmentEnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETVIDEOHEIGHTALIGNMENT_0700
     * @tc.name       : testOhAvCapabilityGetVideoHeightAlignment007
     * @tc.desc       : test OH_AVCapability_GetVideoHeightAlignment
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvCapabilityGetVideoHeightAlignment007', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetVideoHeightAlignmentFnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETVIDEOHEIGHTALIGNMENT_0800
     * @tc.name       : testOhAvCapabilityGetVideoHeightAlignment008
     * @tc.desc       : test OH_AVCapability_GetVideoHeightAlignment
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvCapabilityGetVideoHeightAlignment008', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetVideoHeightAlignmentGnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETVIDEOHEIGHTALIGNMENT_0900
     * @tc.name       : testOhAvCapabilityGetVideoHeightAlignment009
     * @tc.desc       : test OH_AVCapability_GetVideoHeightAlignment
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvCapabilityGetVideoHeightAlignment009', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetVideoHeightAlignmentHnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETVIDEOHEIGHTALIGNMENT_1000
     * @tc.name       : testOhAvCapabilityGetVideoHeightAlignment010
     * @tc.desc       : test OH_AVCapability_GetVideoHeightAlignment
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvCapabilityGetVideoHeightAlignment010', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetVideoHeightAlignmentInormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETVIDEOHEIGHTALIGNMENT_1100
     * @tc.name       : testOhAvCapabilityGetVideoHeightAlignment011
     * @tc.desc       : test OH_AVCapability_GetVideoHeightAlignment
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvCapabilityGetVideoHeightAlignment011', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetVideoHeightAlignmentJnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETVIDEOHEIGHTALIGNMENT_1200
     * @tc.name       : testOhAvCapabilityGetVideoHeightAlignment012
     * @tc.desc       : test OH_AVCapability_GetVideoHeightAlignment
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvCapabilityGetVideoHeightAlignment012', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetVideoHeightAlignmentKnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETVIDEOHEIGHTALIGNMENT_1300
     * @tc.name       : testOhAvCapabilityGetVideoHeightAlignment013
     * @tc.desc       : test OH_AVCapability_GetVideoHeightAlignment
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvCapabilityGetVideoHeightAlignment013', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetVideoHeightAlignmentLnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETVIDEOHEIGHTALIGNMENT_1400
     * @tc.name       : testOhAvCapabilityGetVideoHeightAlignment014
     * @tc.desc       : test OH_AVCapability_GetVideoHeightAlignment
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvCapabilityGetVideoHeightAlignment014', 0, async (done: Function) => {
      let result: number = mediacodecbasexdlndk.oHAvCapabilityGetVideoHeightAlignmentMnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERQUALITYRANGE_0100
     * @tc.name       : testOhAvCapabilityGetEncoderQualityRange001
     * @tc.desc       : test OH_AVCapability_GetEncoderQualityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvCapabilityGetEncoderQualityRange001', 0, async (done: Function) => {
      expect(mediacodecbasexdlndk.OH_AVCapability_GetEncoderQualityRange()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETENCODERCOMPLEXITYRANGE_0100
     * @tc.name       : testOhAvCapabilityGetEncoderComplexityRange001
     * @tc.desc       : test OH_AVCapability_GetEncoderComplexityRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvCapabilityGetEncoderComplexityRange001', 0, async (done: Function) => {
      expect(mediacodecbasexdlndk.OH_AVCapability_GetEncoderComplexityRange()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOSUPPORTEDSAMPLERATES_0100
     * @tc.name       : testOhAvCapabilityGetAudioSupportedSampleRates001
     * @tc.desc       : test OH_AVCapability_GetAudioSupportedSampleRates
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvCapabilityGetAudioSupportedSampleRates001', 0, async (done: Function) => {
      expect(mediacodecbasexdlndk.OH_AVCapability_GetAudioSupportedSampleRates()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETAUDIOCHANNELCOUNTRANGE_0100
     * @tc.name       : testOhAvCapabilityGetAudioChannelCountRange001
     * @tc.desc       : test OH_AVCapability_GetAudioChannelCountRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvCapabilityGetAudioChannelCountRange001', 0, async (done: Function) => {
      expect(mediacodecbasexdlndk.OH_AVCapability_GetAudioChannelCountRange()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETVIDEOWIDTHALIGNMENT_0100
     * @tc.name       : testOhAvCapabilityGetVideoWidthAlignment001
     * @tc.desc       : test OH_AVCapability_GetVideoWidthAlignment
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvCapabilityGetVideoWidthAlignment001', 0, async (done: Function) => {
      expect(mediacodecbasexdlndk.OH_AVCapability_GetVideoWidthAlignment()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETVIDEOHEIGHTALIGNMENT_0100
     * @tc.name       : testOhAvCapabilityGetVideoHeightAlignment001
     * @tc.desc       : test OH_AVCapability_GetVideoHeightAlignment
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvCapabilityGetVideoHeightAlignment001', 0, async (done: Function) => {
      expect(mediacodecbasexdlndk.OH_AVCapability_GetVideoHeightAlignment()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_AVCAPABILITY_OH_AVCODEC_GETCAPABILITY_0100
     * @tc.name       : testOhAvCodecGetCapability001
     * @tc.desc       : test OH_AVCodec_GetCapability
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvCodecGetCapability001', 0, async (done: Function) => {
      expect(mediacodecbasexdlndk.OH_AVCodec_GetCapability()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCODEC_GETCAPABILITYBYCATEGORY_0100
     * @tc.name       : testOhAvCodecGetCapabilityByCategory001
     * @tc.desc       : test OH_AVCodec_GetCapabilityByCategory
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvCodecGetCapabilityByCategory001', 0, async (done: Function) => {
      expect(mediacodecbasexdlndk.OH_AVCodec_GetCapabilityByCategory()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETVIDEOWIDTHRANGE_0100
     * @tc.name       : testOhAvCapabilityGetVideoWidthRange001
     * @tc.desc       : test OH_AVCapability_GetVideoWidthRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvCapabilityGetVideoWidthRange001', 0, async (done: Function) => {
      expect(mediacodecbasexdlndk.OH_AVCapability_GetVideoWidthRange()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETVIDEOHEIGHTRANGE_0100
     * @tc.name       : testOhAvCapabilityGetVideoHeightRange001
     * @tc.desc       : test OH_AVCapability_GetVideoHeightRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvCapabilityGetVideoHeightRange001', 0, async (done: Function) => {
      expect(mediacodecbasexdlndk.OH_AVCapability_GetVideoHeightRange()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_ISVIDEOSIZESUPPORTED_0100
     * @tc.name       : testOhAvCapabilityIsVideoSizeSupported001
     * @tc.desc       : test OH_AVCapability_IsVideoSizeSupported
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvCapabilityIsVideoSizeSupported001', 0, async (done: Function) => {
      expect(mediacodecbasexdlndk.OH_AVCapability_IsVideoSizeSupported()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETVIDEOFRAMERATERANGE_0100
     * @tc.name       : testOhAvCapabilityGetVideoFrameRateRange001
     * @tc.desc       : test OH_AVCapability_GetVideoFrameRateRange
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvCapabilityGetVideoFrameRateRange001', 0, async (done: Function) => {
      expect(mediacodecbasexdlndk.OH_AVCapability_GetVideoFrameRateRange()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETVIDEOFRAMERATERANGEFORSIZE_0100
     * @tc.name       : testOhAvCapabilityGetVideoFrameRateRangeForSize001
     * @tc.desc       : test OH_AVCapability_GetVideoFrameRateRangeForSize
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvCapabilityGetVideoFrameRateRangeForSize001', 0, async (done: Function) => {
      expect(mediacodecbasexdlndk.OH_AVCapability_GetVideoFrameRateRangeForSize()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_AREVIDEOSIZEANDFRAMERATESUPPORTED_0100
     * @tc.name       : testOhAvCapabilityAreVideoSizeAndFrameRateSupported001
     * @tc.desc       : test OH_AVCapability_AreVideoSizeAndFrameRateSupported
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvCapabilityAreVideoSizeAndFrameRateSupported001', 0, async (done: Function) => {
      expect(mediacodecbasexdlndk.OH_AVCapability_AreVideoSizeAndFrameRateSupported()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETVIDEOSUPPORTEDPIXELFORMATS_0100
     * @tc.name       : testOhAvCapabilityGetVideoSupportedPixelFormats001
     * @tc.desc       : test OH_AVCapability_GetVideoSupportedPixelFormats
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvCapabilityGetVideoSupportedPixelFormats001', 0, async (done: Function) => {
      expect(mediacodecbasexdlndk.OH_AVCapability_GetVideoSupportedPixelFormats()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETSUPPORTEDPROFILES_0100
     * @tc.name       : testOhAvCapabilityGetSupportedProfiles001
     * @tc.desc       : test OH_AVCapability_GetSupportedProfiles
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvCapabilityGetSupportedProfiles001', 0, async (done: Function) => {
      expect(mediacodecbasexdlndk.OH_AVCapability_GetSupportedProfiles()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCAPABILITY_OH_AVCAPABILITY_GETSUPPORTEDLEVELSFORPROFILE_0100
     * @tc.name       : testOhAvCapabilityGetSupportedLevelsForProfile001
     * @tc.desc       : test OH_AVCapability_GetSupportedLevelsForProfile
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvCapabilityGetSupportedLevelsForProfile001', 0, async (done: Function) => {
      expect(mediacodecbasexdlndk.OH_AVCapability_GetSupportedLevelsForProfile()).assertEqual(0);
      done();
    });

  })
}
