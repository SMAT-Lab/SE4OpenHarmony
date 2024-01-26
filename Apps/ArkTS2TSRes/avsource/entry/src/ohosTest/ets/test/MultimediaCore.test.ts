let __generate__Id: number = 0;
function generateId(): string {
    return "MultimediaCore.test_" + ++__generate__Id;
}
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
import { describe, expect, it } from '@ohos/hypium';
var MultimediaCore = globalThis.requireNapi("multimediaCore", true);
export default function audioDecoderTest() {
    describe('MultimediaCoreTest', () => {
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_0100
         * @tc.name       : testMultimediaCoreAVFormatCreate001
         * @tc.desc       : OH_AVFormat_Create Interface testing
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 0
         */
        it('testMultimediaCoreAVFormatCreate001', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatCreate();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_0200
         * @tc.name       : testMultimediaCoreAVFormatCreateAudioFormat001
         * @tc.desc       : test OH_AVFormat_CreateAudioFormat
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatCreateAudioFormat001', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatCreateAudioFormatOne();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_0300
         * @tc.name       : testMultimediaCoreAVFormatCreateAudioFormat002
         * @tc.desc       : test OH_AVFormat_CreateAudioFormat
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatCreateAudioFormat002', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatCreateAudioFormatTwo();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_0400
         * @tc.name       : testMultimediaCoreAVFormatCreateVideoFormat001
         * @tc.desc       : test OH_AVFormat_CreateVideoFormat
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatCreateVideoFormat001', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatCreateVideoFormatOne();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_0500
         * @tc.name       : testMultimediaCoreAVFormatCreateVideoFormat002
         * @tc.desc       : test OH_AVFormat_CreateVideoFormat
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatCreateVideoFormat002', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatCreateVideoFormatTwo();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_0600
         * @tc.name       : testCoreMultimediaCoreAVFormatCopy001
         * @tc.desc       : test OH_AVFormat_Copy
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testCoreMultimediaCoreAVFormatCopy001', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatCopyOne();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_0700
         * @tc.name       : testCoreMultimediaCoreAVFormatCopy002
         * @tc.desc       : test OH_AVFormat_Copy
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testCoreMultimediaCoreAVFormatCopy002', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatCopyTwo();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_0800
         * @tc.name       : testCoreMultimediaCoreAVFormatCopy003
         * @tc.desc       : test OH_AVFormat_Copy
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testCoreMultimediaCoreAVFormatCopy003', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatCopyThree();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_0900
         * @tc.name       : testCoreMultimediaCoreAVFormatDestroy001
         * @tc.desc       : test OH_AVFormat_Destroy
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testCoreMultimediaCoreAVFormatDestroy001', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatDestroy();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1000
         * @tc.name       : testCoreMultimediaCoreAVFormatDumpInfo001
         * @tc.desc       : test OH_AVFormat_DumpInfo
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testCoreMultimediaCoreAVFormatDumpInfo001', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatDumpInfoOne();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1100
         * @tc.name       : testCoreMultimediaCoreAVFormatDumpInfo002
         * @tc.desc       : test OH_AVFormat_DumpInfo
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testCoreMultimediaCoreAVFormatDumpInfo002', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatDumpInfoTwo();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1200
         * @tc.name       : testMultimediaCoreAVFormatGetBuffer001
         * @tc.desc       : test OH_AVFormat_GetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatGetBuffer001', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatGetBufferOne();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1300
         * @tc.name       : testMultimediaCoreAVFormatGetBuffer002
         * @tc.desc       : test OH_AVFormat_GetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatGetBuffer002', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatGetBufferTwo();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1400
         * @tc.name       : testMultimediaCoreAVFormatGetBuffer003
         * @tc.desc       : test OH_AVFormat_GetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatGetBuffer003', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatGetBufferThree();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1500
         * @tc.name       : testMultimediaCoreAVFormatGetBuffer004
         * @tc.desc       : test OH_AVFormat_GetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatGetBuffer004', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatGetBufferFour();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1600
         * @tc.name       : testMultimediaCoreAVFormatGetBuffer005
         * @tc.desc       : test OH_AVFormat_GetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatGetBuffer005', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatGetBufferFive();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1700
         * @tc.name       : testMultimediaCoreAVFormatGetDoubleValue001
         * @tc.desc       : test OH_AVFormat_GetDoubleValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatGetDoubleValue001', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatGetDoubleValueOne();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1800
         * @tc.name       : testMultimediaCoreAVFormatGetDoubleValue002
         * @tc.desc       : test OH_AVFormat_GetDoubleValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatGetDoubleValue002', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatGetDoubleValueTwo();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1900
         * @tc.name       : testMultimediaCoreAVFormatGetDoubleValue003
         * @tc.desc       : test OH_AVFormat_GetDoubleValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatGetDoubleValue003', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatGetDoubleValueThree();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_2000
         * @tc.name       : testMultimediaCoreAVFormatGetDoubleValue004
         * @tc.desc       : test OH_AVFormat_GetDoubleValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatGetDoubleValue004', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatGetDoubleValueFour();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_2100
         * @tc.name       : testMultimediaCoreAVFormatGetDoubleValue005
         * @tc.desc       : test OH_AVFormat_GetDoubleValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatGetDoubleValue005', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatGetDoubleValueFive();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_2200
         * @tc.name       : testMultimediaCoreAVFormatGetFloatValue001
         * @tc.desc       : test OH_AVFormat_GetFloatValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatGetFloatValue001', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatGetFloatValueOne();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_2300
         * @tc.name       : testMultimediaCoreAVFormatGetFloatValue002
         * @tc.desc       : test OH_AVFormat_GetFloatValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatGetFloatValue002', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatGetFloatValueTwo();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_2400
         * @tc.name       : testMultimediaCoreAVFormatGetFloatValue003
         * @tc.desc       : test OH_AVFormat_GetFloatValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatGetFloatValue003', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatGetFloatValueThree();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_2500
         * @tc.name       : testMultimediaCoreAVFormatGetFloatValue004
         * @tc.desc       : test OH_AVFormat_GetFloatValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatGetFloatValue004', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatGetFloatValueFour();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_2600
         * @tc.name       : testMultimediaCoreAVFormatGetFloatValue005
         * @tc.desc       : test OH_AVFormat_GetFloatValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatGetFloatValue005', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatGetFloatValueFive();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_2700
         * @tc.name       : testMultimediaCoreAVFormatGetIntValue001
         * @tc.desc       : test OH_AVFormat_GetIntValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatGetIntValue001', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatGetIntValueOne();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_2800
         * @tc.name       : testMultimediaCoreAVFormatGetIntValue002
         * @tc.desc       : test OH_AVFormat_GetIntValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatGetIntValue002', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatGetIntValueTwo();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_2900
         * @tc.name       : testMultimediaCoreAVFormatGetIntValue003
         * @tc.desc       : test OH_AVFormat_GetIntValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatGetIntValue003', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatGetIntValueThree();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_3000
         * @tc.name       : testMultimediaCoreAVFormatGetIntValue004
         * @tc.desc       : test OH_AVFormat_GetIntValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatGetIntValue004', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatGetIntValueFour();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_3100
         * @tc.name       : testMultimediaCoreAVFormatGetIntValue005
         * @tc.desc       : test OH_AVFormat_GetIntValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatGetIntValue005', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatGetIntValueFive();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_3200
         * @tc.name       : testMultimediaCoreAVFormatGetLongValue001
         * @tc.desc       : test OH_AVFormat_GetLongValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatGetLongValue001', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatGetLongValueOne();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_3300
         * @tc.name       : testMultimediaCoreAVFormatGetLongValue002
         * @tc.desc       : test OH_AVFormat_GetLongValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatGetLongValue002', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatGetLongValueTwo();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_3400
         * @tc.name       : testMultimediaCoreAVFormatGetLongValue003
         * @tc.desc       : test OH_AVFormat_GetLongValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatGetLongValue003', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatGetLongValueThree();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_3500
         * @tc.name       : testMultimediaCoreAVFormatGetLongValue004
         * @tc.desc       : test OH_AVFormat_GetLongValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatGetLongValue004', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatGetLongValueFour();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_3600
         * @tc.name       : testMultimediaCoreAVFormatGetLongValue005
         * @tc.desc       : test OH_AVFormat_GetLongValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatGetLongValue005', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatGetLongValueFive();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_3700
         * @tc.name       : testMultimediaCoreAVFormatGetStringValue001
         * @tc.desc       : test OH_AVFormat_GetStringValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatGetStringValue001', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatGetStringValueOne();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_3800
         * @tc.name       : testMultimediaCoreAVFormatGetStringValue002
         * @tc.desc       : test OH_AVFormat_GetStringValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatGetStringValue002', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatGetStringValueTwo();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_3900
         * @tc.name       : testMultimediaCoreAVFormatGetStringValue003
         * @tc.desc       : test OH_AVFormat_GetStringValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatGetStringValue003', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatGetStringValueThree();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_4000
         * @tc.name       : testMultimediaCoreAVFormatGetStringValue004
         * @tc.desc       : test OH_AVFormat_GetStringValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatGetStringValue004', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatGetStringValueFour();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_4100
         * @tc.name       : testMultimediaCoreAVFormatGetStringValue005
         * @tc.desc       : test OH_AVFormat_GetStringValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatGetStringValue005', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatGetStringValueFive();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_4200
         * @tc.name       : testCoreMultimediaCoreAVFormatSetBuffer001
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testCoreMultimediaCoreAVFormatSetBuffer001', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferOne();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_4300
         * @tc.name       : testCoreMultimediaCoreAVFormatSetBuffer002
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testCoreMultimediaCoreAVFormatSetBuffer002', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferTwo();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_4400
         * @tc.name       : testCoreMultimediaCoreAVFormatSetBuffer003
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testCoreMultimediaCoreAVFormatSetBuffer003', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferThree();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_4500
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer004
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer004', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferFour();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_5600
         * @tc.name       : testMultimediaCoreAVFormatSetDoubleValue001
         * @tc.desc       : test OH_AVFormat_SetDoubleValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetDoubleValue001', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetDoubleValueOne();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_4700
         * @tc.name       : testMultimediaCoreAVFormatSetDoubleValue002
         * @tc.desc       : test OH_AVFormat_SetDoubleValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetDoubleValue002', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetDoubleValueTwo();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_4800
         * @tc.name       : testMultimediaCoreAVFormatSetDoubleValue003
         * @tc.desc       : test OH_AVFormat_SetDoubleValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetDoubleValue003', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetDoubleValueThree();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_4900
         * @tc.name       : testMultimediaCoreAVFormatSetFloatValue001
         * @tc.desc       : test OH_AVFormat_SetFloatValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetFloatValue001', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetFloatValueOne();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_5000
         * @tc.name       : testMultimediaCoreAVFormatSetFloatValue002
         * @tc.desc       : test OH_AVFormat_SetFloatValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetFloatValue002', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetFloatValueTwo();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_5100
         * @tc.name       : testMultimediaCoreAVFormatSetFloatValue003
         * @tc.desc       : test OH_AVFormat_SetFloatValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetFloatValue003', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetFloatValueThree();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_5200
         * @tc.name       : testMultimediaCoreAVFormatSetIntValue001
         * @tc.desc       : test OH_AVFormat_SetIntValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetIntValue001', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetIntValueOne();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_5300
         * @tc.name       : testMultimediaCoreAVFormatSetIntValue002
         * @tc.desc       : test OH_AVFormat_SetIntValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetIntValue002', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetIntValueTwo();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_5300
         * @tc.name       : testMultimediaCoreAVFormatSetIntValue003
         * @tc.desc       : test OH_AVFormat_SetIntValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetIntValue003', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetIntValueThree();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_5500
         * @tc.name       : testMultimediaCoreAVFormatSetLongValue001
         * @tc.desc       : test OH_AVFormat_SetLongValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetLongValue001', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetLongValueOne();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_5600
         * @tc.name       : testMultimediaCoreAVFormatSetLongValue002
         * @tc.desc       : test OH_AVFormat_SetLongValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetLongValue002', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetLongValueTwo();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_5700
         * @tc.name       : testMultimediaCoreAVFormatSetLongValue003
         * @tc.desc       : test OH_AVFormat_SetLongValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetLongValue003', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetLongValueThree();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_5800
         * @tc.name       : testMultimediaCoreAVFormatSetStringValue001
         * @tc.desc       : test OH_AVFormat_SetStringValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetStringValue001', 0, async (done: Function) => {
            let result: number = MultimediaCore.MultimediaCoreAVFormatSetStringValueOne();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_5900
         * @tc.name       : testMultimediaCoreAVFormatSetStringValue002
         * @tc.desc       : test OH_AVFormat_SetStringValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetStringValue002', 0, async (done: Function) => {
            let result: number = MultimediaCore.MultimediaCoreAVFormatSetStringValueTwo();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_6000
         * @tc.name       : testMultimediaCoreAVFormatSetStringValue003
         * @tc.desc       : test OH_AVFormat_SetStringValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetStringValue003', 0, async (done: Function) => {
            let result: number = MultimediaCore.MultimediaCoreAVFormatSetStringValueThree();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_6100
         * @tc.name       : testMultimediaCoreAVFormatSetStringValue004
         * @tc.desc       : test OH_AVFormat_SetStringValue
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetStringValue004', 0, async (done: Function) => {
            let result: number = MultimediaCore.MultimediaCoreAVFormatSetStringValueFour();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_6200
         * @tc.name       : testMultimediaCoreAVMemoryCreate001
         * @tc.desc       : test OH_AVMemory_Create
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVMemoryCreate001', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVMemoryCreateOne();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_6300
         * @tc.name       : testMultimediaCoreAVMemoryCreate002
         * @tc.desc       : test OH_AVMemory_Create
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVMemoryCreate002', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVMemoryCreateTwo();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_6400
         * @tc.name       : testMultimediaCoreAVMemoryDestroy001
         * @tc.desc       : test OH_AVMemory_Destroy
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVMemoryDestroy001', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVMemoryDestroyOne();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_6500
         * @tc.name       : testMultimediaCoreAVMemoryDestroy002
         * @tc.desc       : test OH_AVMemory_Destroy
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVMemoryDestroy002', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVMemoryDestroyTwo();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_6600
         * @tc.name       : testMultimediaCoreAVMemoryGetAddr001
         * @tc.desc       : test OH_AVMemory_GetAddr
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVMemoryGetAddr001', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVMemoryGetAddrOne();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_6700
         * @tc.name       : testMultimediaCoreAVMemoryGetAddr002
         * @tc.desc       : test OH_AVMemory_GetAddr
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVMemoryGetAddr002', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVMemoryGetAddrTwo();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_6800
         * @tc.name       : testMultimediaCoreAVMemoryGetSize001
         * @tc.desc       : test OH_AVMemory_GetSize
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVMemoryGetSize001', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVMemoryGetSizeOne();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_6900
         * @tc.name       : testMultimediaCoreAVMemoryGetSize002
         * @tc.desc       : test OH_AVMemory_GetSize
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVMemoryGetSize002', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVMemoryGetSizeTwo();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_0100
         * @tc.name       : testCoreMultimediaCoreAVFormatCreateAudioFormat001
         * @tc.desc       : test OH_AVFormat_CreateAudioFormat
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testCoreMultimediaCoreAVFormatCreateAudioFormat001', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatCreateAudioFormatAVC();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_0200
         * @tc.name       : testCoreMultimediaCoreAVFormatCreateAudioFormat002
         * @tc.desc       : test OH_AVFormat_CreateAudioFormat
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testCoreMultimediaCoreAVFormatCreateAudioFormat002', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatCreateAudioFormatVORBIS();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_0300
         * @tc.name       : testMultimediaCoreAVFormatCreateAudioFormat003
         * @tc.desc       : test OH_AVFormat_CreateAudioFormat
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatCreateAudioFormat003', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatCreateAudioFormatVORBISMPEG();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_0400
         * @tc.name       : testCoreMultimediaCoreAVFormatCreateVideoFormat001
         * @tc.desc       : test OH_AVFormat_CreateVideoFormat
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testCoreMultimediaCoreAVFormatCreateVideoFormat001', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatCreateVideoFormatHEVC();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_0500
         * @tc.name       : testCoreMultimediaCoreAVFormatCreateVideoFormat002
         * @tc.desc       : test OH_AVFormat_CreateVideoFormat
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testCoreMultimediaCoreAVFormatCreateVideoFormat002', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatCreateVideoFormatMPEG4();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_0600
         * @tc.name       : testMultimediaCoreAVFormatDestroy001
         * @tc.desc       : test OH_AVFormat_Destroy
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatDestroy001', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatDestroyVideoHEVC();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_0700
         * @tc.name       : testMultimediaCoreAVFormatDestroy002
         * @tc.desc       : test OH_AVFormat_Destroy
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatDestroy002', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatDestroyVideoMPEG4();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_0800
         * @tc.name       : testMultimediaCoreAVFormatDestroy003
         * @tc.desc       : test OH_AVFormat_Destroy
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatDestroy003', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatDestroyAudioFLAC();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_0900
         * @tc.name       : testMultimediaCoreAVFormatDestroy004
         * @tc.desc       : test OH_AVFormat_Destroy
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatDestroy004', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatDestroyAudioAAC();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_1000
         * @tc.name       : testMultimediaCoreAVFormatDestroy005
         * @tc.desc       : test OH_AVFormat_Destroy
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatDestroy005', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatDestroyAudioVORBIS();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_1100
         * @tc.name       : testMultimediaCoreAVFormatDestroy006
         * @tc.desc       : test OH_AVFormat_Destroy
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatDestroy006', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatDestroyAudioMPEG();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_1200
         * @tc.name       : testMultimediaCoreAVFormatCopy001
         * @tc.desc       : test OH_AVFormat_Copy
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatCopy001', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatCopyVideoHEVC();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_1300
         * @tc.name       : testMultimediaCoreAVFormatCopy002
         * @tc.desc       : test OH_AVFormat_Copy
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatCopy002', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatCopyVideoMPEG4();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_1400
         * @tc.name       : testMultimediaCoreAVFormatCopy003
         * @tc.desc       : test OH_AVFormat_Copy
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatCopy003', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatCopyAudioAAC();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_1500
         * @tc.name       : testMultimediaCoreAVFormatCopy004
         * @tc.desc       : test OH_AVFormat_Copy
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatCopy004', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatCopyAudioFLAC();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_1600
         * @tc.name       : testMultimediaCoreAVFormatCopy005
         * @tc.desc       : test OH_AVFormat_Copy
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatCopy005', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatCopyAudioVORBIS();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_1700
         * @tc.name       : testMultimediaCoreAVFormatCopy006
         * @tc.desc       : test OH_AVFormat_Copy
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatCopy006', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatCopyAudioMPEG();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_1800
         * @tc.name       : testMultimediaCoreAVFormatDumpInfo001
         * @tc.desc       : test OH_AVFormat_DumpInfo
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatDumpInfo001', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatDumpInfoARTIST();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_1900
         * @tc.name       : testMultimediaCoreAVFormatDumpInfo002
         * @tc.desc       : test OH_AVFormat_DumpInfo
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatDumpInfo002', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatDumpInfoALBUM();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_2000
         * @tc.name       : testMultimediaCoreAVFormatDumpInfo003
         * @tc.desc       : test OH_AVFormat_DumpInfo
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatDumpInfo003', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatDumpInfoALBUMARTIST();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_2100
         * @tc.name       : testMultimediaCoreAVFormatDumpInfo004
         * @tc.desc       : test OH_AVFormat_DumpInfo
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatDumpInfo004', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatDumpInfoDATE();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_2200
         * @tc.name       : testMultimediaCoreAVFormatDumpInfo005
         * @tc.desc       : test OH_AVFormat_DumpInfo
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatDumpInfo005', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatDumpInfoCOMMENT();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_2300
         * @tc.name       : testMultimediaCoreAVFormatDumpInfo006
         * @tc.desc       : test OH_AVFormat_DumpInfo
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatDumpInfo006', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatDumpInfoGENRE();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_2400
         * @tc.name       : testMultimediaCoreAVFormatDumpInfo007
         * @tc.desc       : test OH_AVFormat_DumpInfo
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatDumpInfo007', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatDumpInfoCOPYRIGHT();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_2500
         * @tc.name       : testMultimediaCoreAVFormatDumpInfo008
         * @tc.desc       : test OH_AVFormat_DumpInfo
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatDumpInfo008', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatDumpInfoLANGUAGE();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_2600
         * @tc.name       : testMultimediaCoreAVFormatDumpInfo009
         * @tc.desc       : test OH_AVFormat_DumpInfo
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatDumpInfo009', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatDumpInfoDESCRIPTION();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_2700
         * @tc.name       : testMultimediaCoreAVFormatDumpInfo010
         * @tc.desc       : test OH_AVFormat_DumpInfo
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatDumpInfo010', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatDumpInfoLYRICS();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_2800
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer001
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer001', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(1);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_2900
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer002
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer002', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(2);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_2900
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer003
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer003', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(3);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_3000
         * @tc.name       : testCoreMultimediaCoreAVFormatSetBuffer004
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testCoreMultimediaCoreAVFormatSetBuffer004', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(4);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_3100
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer005
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer005', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(5);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_3200
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer006
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer006', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(6);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_3300
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer007
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer007', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(7);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_3400
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer008
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer008', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(8);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_3500
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer009
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer009', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(9);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_3600
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer010
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer010', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(10);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_3700
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer011
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer011', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(11);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_3800
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer012
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer012', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(12);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_3900
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer013
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer013', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(13);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_4000
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer014
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer014', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(14);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_4100
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer015
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer015', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(15);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_4200
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer016
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer016', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(16);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_4300
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer017
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer017', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(17);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_4400
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer018
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer018', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(18);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_4500
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer019
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer019', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(19);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_4600
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer020
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer020', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(20);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_4700
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer021
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer021', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(21);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_4800
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer022
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer022', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(22);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_4900
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer023
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer023', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(23);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_5000
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer024
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer024', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(24);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_5100
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer025
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer025', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(25);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_5200
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer026
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer026', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(26);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_5300
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer027
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer027', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(27);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_5400
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer028
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer028', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(28);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_5500
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer029
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer029', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(29);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_5600
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer030
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer030', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(30);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_5700
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer031
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer031', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(31);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_5800
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer032
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer032', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(32);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_5900
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer033
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer033', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(33);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_6000
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer034
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer034', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(34);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_6100
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer035
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer035', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(35);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_6200
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer036
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer036', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(36);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_6300
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer037
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer037', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(37);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_6400
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer038
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer038', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(38);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_6500
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer039
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer039', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(39);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_6600
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer040
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer040', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(40);
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_CORE_1_6700
         * @tc.name       : testMultimediaCoreAVFormatSetBuffer041
         * @tc.desc       : test OH_AVFormat_SetBuffer
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testMultimediaCoreAVFormatSetBuffer041', 0, async (done: Function) => {
            let result: number = MultimediaCore.multimediaCoreAVFormatSetBufferAll(41);
            expect(result).assertEqual(0);
            done();
        });
    });
}
