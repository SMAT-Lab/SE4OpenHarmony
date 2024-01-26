let __generate__Id: number = 0;
function generateId(): string {
    return "NativeAvdemuxerNdk.test_" + ++__generate__Id;
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
import { describe, it, expect, beforeAll, beforeEach } from "@ohos/hypium";
var nativeavdemuxer = globalThis.requireNapi("nativeavdemuxerndk", true);
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import Utils from './Utils';
import { BusinessError } from '@ohos.base';
import fs from '@ohos.file.fs';
function getContext(): Context {
    let abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator();
    let context = abilityDelegator.getAppContext();
    return context;
}
export default function nativeavdemuxerNdkTest() {
    describe('MuslNativeAvdemuxerNdkTest', () => {
        beforeAll(async () => {
            let context = getContext();
            let dir = context.filesDir + "/";
            try {
                let ml_face_model_file = dir + "demo1.mp4";
                context.resourceManager.getRawFileContent("demo1.mp4", (error, model_buffer) => {
                    if (error) {
                        console.log(`[rawfile_copy_to_sandbox] demo.mp4 is
              copy failed:${error.code}, message: ${error.message}.`);
                    }
                    else {
                        let file = fs.openSync(ml_face_model_file, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
                        fs.writeSync(file.fd, model_buffer.buffer);
                        fs.closeSync(file);
                        console.log("[rawfile_copy_to_sandbox] demo.mp4 is copy success");
                    }
                });
            }
            catch (error) {
                console.info("[rawfile_copy_to_sandbox] getRawFileDescriptor api run failed" + error);
            }
            console.info("[rawfile_copy_to_sandbox] sandbox path:" + dir);
            await Utils.sleep(2000);
        });
        beforeEach(async () => {
            let dir = getContext().filesDir + "/";
            let ml_face_model = dir + "demo1.mp4";
            await fs.stat(ml_face_model).then(async (res) => {
                if (res) {
                    console.info("MindSporeDemo demo.mp4 file exists");
                    console.info(`MindSporeDemo demo.mp4 size:${res.size}`);
                }
            }).catch((err: BusinessError) => {
                console.info("MindSporeDemo demo.mp4 file does not exists! access failed with error message: " +
                    err.message + ", error code: " + err.code);
            });
            await Utils.sleep(2000);
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVDEMUXER_OH_AVDEMUXER_READSAMPLE_0100
         * @tc.name       : testOHAVDemuxerReadSample001
         * @tc.desc       : test OH_AVDemuxer_ReadSample
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testOHAVDemuxerReadSample001', 0, async (done: Function) => {
            let result: number = nativeavdemuxer.oHAVDemuxerReadSample();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVDEMUXER_OH_AVDEMUXER_CREATEWITHSOURCE_0100
         * @tc.name       : testOHAVDemuxerCreateWithSource001
         * @tc.desc       : test OH_AVDemuxer_CreateWithSource
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testOHAVDemuxerCreateWithSource001', 0, async (done: Function) => {
            let result: number = nativeavdemuxer.oHAVDemuxerCreateWithSource();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVDEMUXER_OH_AVDEMUXER_DESTROY_0100
         * @tc.name       : testOHAVDemuxerDestroy001
         * @tc.desc       : test OH_AVDemuxer_Destroy
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testOHAVDemuxerDestroy001', 0, async (done: Function) => {
            let result: number = nativeavdemuxer.oHAVDemuxerDestroy();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVDEMUXER_OH_AVDEMUXER_UNSELECTTRACKBYID_0100
         * @tc.name       : testOHAVDemuxerUnselectTrackByID001
         * @tc.desc       : test OH_AVDemuxer_UnselectTrackByID
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testOHAVDemuxerUnselectTrackByID001', 0, async (done: Function) => {
            let result: number = nativeavdemuxer.oHAVDemuxerUnselectTrackByID();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVDEMUXER_OH_AVDEMUXER_SEEKTOTIME_0100
         * @tc.name       : testOHAVDemuxerSeekToTime001
         * @tc.desc       : test OH_AVDemuxer_SeekToTime
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testOHAVDemuxerSeekToTime001', 0, async (done: Function) => {
            let result: number = nativeavdemuxer.oHAVDemuxerSeekToTime();
            expect(result).assertEqual(0);
            done();
        });
        /**
         * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVDEMUXER_OH_AVDEMUXER_SELECTTRACKBYID_0100
         * @tc.name       : testOHAVDemuxerSelectTrackByID001
         * @tc.desc       : test OH_AVDemuxer_SelectTrackByID
         * @tc.size       : MediumTest
         * @tc.type       : Function
         * @tc.level      : Level 1
         */
        it('testOHAVDemuxerSelectTrackByID001', 0, async (done: Function) => {
            let result: number = nativeavdemuxer.oHAVDemuxerSelectTrackByID();
            expect(result).assertEqual(0);
            done();
        });
    });
}
