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

import { beforeAll, beforeEach, describe, expect, it } from '@ohos/hypium'
import mediaavsourcendk from 'libmediaavsourcendk.so'
import fs from '@ohos.file.fs';
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry'
import Utils from './Utils';
import { BusinessError } from '@ohos.base';

function getContext(): Context {
  let abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator();
  let context = abilityDelegator.getAppContext();
  return context;
}

export default function mediaAvSourceNdkTest() {
  describe('AvcodecAVSourceTest', () => {

    beforeAll(async () => {
      let context = getContext()
      let dir = context.filesDir + "/";
      try {
        let ml_face_model_file = dir + "demo.mp4";
        context.resourceManager.getRawFileContent("demo.mp4", (error, model_buffer) => {
          if (error) {
            console.log(
              `[rawfile_copy_to_sandbox] demo.mp4 is
              copy failed:${error.code}, message: ${error.message}.`);
          } else {
            let file = fs.openSync(ml_face_model_file, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
            fs.writeSync(file.fd, model_buffer.buffer);
            fs.closeSync(file);
            console.log("[rawfile_copy_to_sandbox] demo.mp4 is copy success");
          }
        });
      } catch (error) {
        console.info("[rawfile_copy_to_sandbox] getRawFileDescriptor api run failed" + error);
      }

      console.info("[rawfile_copy_to_sandbox] sandbox path:" + dir);
      await Utils.sleep(2000)
    })

    beforeEach(async () => {
      let dir = getContext().filesDir + "/";

      let ml_face_model = dir + "demo.mp4";
      await fs.stat(ml_face_model).then(async (res) => {
        if (res) {
          console.info("demo.mp4 file exists");
          console.info(`demo.mp4 size:${res.size}`);
        }
      }).catch((err: BusinessError) => {
        console.info("MindSporeDemo demo.mp4 file does not exists! access failed with error message: " +
        err.message + ", error code: " + err.code);
      });
      await Utils.sleep(2000)
    })

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVSOURCE_OH_AVSOURCE_CREATEWITHURI_0100
     * @tc.name       : testOHAVSourceCreateWithURI001
     * @tc.desc       : test OH_AVSource_CreateWithURI
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAVSourceCreateWithURI001', 0, async (done: Function) => {
      expect(mediaavsourcendk.OH_AVSource_CreateWithURI()).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVSOURCE_OH_AVSOURCE_CREATEWITHFD_0100
     * @tc.name       : testOHAVSourceCreateWithFD001
     * @tc.desc       : test OH_AVSource_CreateWithFD
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAVSourceCreateWithFD001', 0, async (done: Function) => {
      expect(mediaavsourcendk.OH_AVSource_CreateWithFD()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVSOURCE_OH_AVSOURCE_DESTROY_0100
     * @tc.name       : testOHAVSourceDestroy001
     * @tc.desc       : test OH_AVSource_Destroy
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAVSourceDestroy001', 0, async (done: Function) => {
      expect(mediaavsourcendk.OH_AVSource_Destroy()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVSOURCE_OH_AVSOURCE_GETSOURCEFORMAT_0100
     * @tc.name       : testOHAVSourceGetSourceFormat001
     * @tc.desc       : test OH_AVSource_GetSourceFormat
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAVSourceGetSourceFormat001', 0, async (done: Function) => {
      expect(mediaavsourcendk.OH_AVSource_GetSourceFormat()).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEDIA_AV_CODEC_NATIVE_AVSOURCE_OH_AVSOURCE_GETTRACKFORMAT_0100
     * @tc.name       : testOHAVSourceGetTrackFormat001
     * @tc.desc       : test OH_AVSource_GetTrackFormat
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHAVSourceGetTrackFormat001', 0, async (done: Function) => {
      expect(mediaavsourcendk.OH_AVSource_GetTrackFormat()).assertEqual(0);
      done();
    });

  })
}
