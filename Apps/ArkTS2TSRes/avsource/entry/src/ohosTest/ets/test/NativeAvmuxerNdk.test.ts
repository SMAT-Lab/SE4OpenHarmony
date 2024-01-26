let __generate__Id: number = 0;
function generateId(): string {
    return "NativeAvmuxerNdk.test_" + ++__generate__Id;
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
import { describe, it, expect } from "@ohos/hypium";
var nativeavmuxer = globalThis.requireNapi("nativeavmuxerndk", true);
export default function nativeavmuxerNdkTest() {
    describe('MuslNativeAvmuxerNdkTest', () => {
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVMUXER_OH_AVMUXER_CREATE_0100
         * @tc.name       : testOHAVMuxerCreate001
         * @tc.desc       : test OH_AVMuxer_Create
         * @tc.size       : MediumTestTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testOHAVMuxerCreate001', 0, async (done: Function) => {
            let result: number = nativeavmuxer.oHAVMuxerCreate();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVMUXER_OH_AVMUXER_SETROTATION_0100
         * @tc.name       : testOHAVMuxerSetRotation001
         * @tc.desc       : test OH_AVMuxer_SetRotation
         * @tc.size       : MediumTestTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testOHAVMuxerSetRotation001', 0, async (done: Function) => {
            let result: number = nativeavmuxer.oHAVMuxerSetRotation();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVMUXER_OH_AVMUXER_START_0100
         * @tc.name       : testOHAVMuxerStart001
         * @tc.desc       : test OH_AVMuxer_Start
         * @tc.size       : MediumTestTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testOHAVMuxerStart001', 0, async (done: Function) => {
            let result: number = nativeavmuxer.oHAVMuxerStart();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVMUXER_OH_AVMUXER_STOP_0100
         * @tc.name       : testOHAVMuxerStop001
         * @tc.desc       : test OH_AVMuxer_Stop
         * @tc.size       : MediumTestTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testOHAVMuxerStop001', 0, async (done: Function) => {
            let result: number = nativeavmuxer.oHAVMuxerStop();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVMUXER_OH_AVMUXER_WRITESAMPLE_0100
         * @tc.name       : testOHAVMuxerWriteSample001
         * @tc.desc       : test OH_AVMuxer_WriteSample
         * @tc.size       : MediumTestTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testOHAVMuxerWriteSample001', 0, async (done: Function) => {
            let result: number = nativeavmuxer.oHAVMuxerWriteSample();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVMUXER_OH_AVMUXER_ADDTRACK_0100
         * @tc.name       : testOHAVMuxerAddTrack001
         * @tc.desc       : test OH_AVMuxer_AddTrack
         * @tc.size       : MediumTestTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testOHAVMuxerAddTrack001', 0, async (done: Function) => {
            let result: number = nativeavmuxer.oHAVMuxerAddTrack();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVMUXER_OH_AVMUXER_DESTROY_0100
         * @tc.name       : testOHAVMuxerDestroy001
         * @tc.desc       : test OH_AVMuxer_Destroy
         * @tc.size       : MediumTestTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testOHAVMuxerDestroy001', 0, async (done: Function) => {
            let result: number = nativeavmuxer.oHAVMuxerDestroy();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AVMUXER_OH_AVMUXER_CREATE_0200
         * @tc.name       : testOHAVMuxerCreate002
         * @tc.desc       : test OH_AVMuxer_Create
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testOHAVMuxerCreate002', 0, async (done: Function) => {
            let result: number = nativeavmuxer.oHAVMuxerCreateAbnormal();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AVMUXER_OH_AVMUXER_SETROTATION_0200
         * @tc.name       : testOHAVMuxerSetRotation002
         * @tc.desc       : test OH_AVMuxer_SetRotation
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testOHAVMuxerSetRotation002', 0, async (done: Function) => {
            let result: number = nativeavmuxer.oHAVMuxerSetRotationAbnormal();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AVMUXER_OH_AVMUXER_START_0200
         * @tc.name       : testOHAVMuxerStart002
         * @tc.desc       : test OH_AVMuxer_Start
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testOHAVMuxerStart002', 0, async (done: Function) => {
            let result: number = nativeavmuxer.oHAVMuxerStartAbnormal();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AVMUXER_OH_AVMUXER_STOP_0200
         * @tc.name       : testOHAVMuxerStop002
         * @tc.desc       : test OH_AVMuxer_Stop
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testOHAVMuxerStop002', 0, async (done: Function) => {
            let result: number = nativeavmuxer.oHAVMuxerStopAbnormal();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AVMUXER_OH_AVMUXER_WRITESAMPLE_0200
         * @tc.name       : testOHAVMuxerWriteSample002
         * @tc.desc       : test OH_AVMuxer_WriteSample
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testOHAVMuxerWriteSample002', 0, async (done: Function) => {
            let result: number = nativeavmuxer.oHAVMuxerWriteSampleAbnormal();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AVMUXER_OH_AVMUXER_ADDTRACK_0200
         * @tc.name       : testOHAVMuxerAddTrack002
         * @tc.desc       : test OH_AVMuxer_AddTrack
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testOHAVMuxerAddTrack002', 0, async (done: Function) => {
            let result: number = nativeavmuxer.oHAVMuxerAddTrackAbnormal();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVCODEC_AVMUXER_OH_AVMUXER_DESTROY_0200
         * @tc.name       : testOHAVMuxerDestroy002
         * @tc.desc       : test OH_AVMuxer_Destroy
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testOHAVMuxerDestroy002', 0, async (done: Function) => {
            let result: number = nativeavmuxer.oHAVMuxerDestroyAbnormal();
            expect(result).assertEqual(0);
            done();
        });
    });
}
