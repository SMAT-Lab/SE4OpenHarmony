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
import avplayer from 'libavplayerndk.so'
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry'
import fs from '@ohos.file.fs'
import { BusinessError } from '@ohos.base';
import Utils from './Utils';

function getContext(): Context {
  let abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator();
  let context = abilityDelegator.getAppContext();
  return context;
}

export default function AVPlayerNdkTest() {
  describe('AVPlayerTest', () => {

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
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_CREATE_0100
     * @tc.name       : testOhAvPlayerCreate001
     * @tc.desc       : test OH_AVPlayer_Create
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerCreate001', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerCreate();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_SETURLSOURCE_0100
     * @tc.name       : testOhAvPlayerSetURLSource001
     * @tc.desc       : test OH_AVPlayer_SetURLSource
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerSetURLSource001', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerSetURLSourceAbnormalOne();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_SETURLSOURCE_0300
     * @tc.name       : testOhAvPlayerSetURLSource003
     * @tc.desc       : test OH_AVPlayer_SetURLSource
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerSetURLSource003', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerSetURLSourceAbnormalTwo();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_SETFDSOURCE_0100
     * @tc.name       : testOhAvPlayerSetFDSource001
     * @tc.desc       : test OH_AVPlayer_SetFDSource
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerSetFDSource001', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerSetFDSource();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_SETFDSOURCE_0200
     * @tc.name       : testOhAvPlayerSetFDSource002
     * @tc.desc       : test OH_AVPlayer_SetFDSource
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerSetFDSource002', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerSetFDSourceAbnormalOne();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_SETFDSOURCE_0300
     * @tc.name       : testOhAvPlayerSetFDSource003
     * @tc.desc       : test OH_AVPlayer_SetFDSource
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerSetFDSource003', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerSetFDSourceAbnormalTwo();
      expect(result).assertEqual(0);
      done();
    });
    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_SETFDSOURCE_0400
     * @tc.name       : testOhAvPlayerSetFDSource004
     * @tc.desc       : test OH_AVPlayer_SetFDSource
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerSetFDSource004', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerSetFDSourceAbnormalThree();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_PREPARE_0100
     * @tc.name       : testOhAvPlayerPrepare001
     * @tc.desc       : test OH_AVPlayer_Prepare
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerPrepare001', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerPrepare(1, 1, 1);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_PREPARE_0200
     * @tc.name       : testOhAvPlayerPrepare002
     * @tc.desc       : test OH_AVPlayer_Prepare
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerPrepare002', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerPrepare(0, 1, 0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_PREPARE_0300
     * @tc.name       : testOhAvPlayerPrepare003
     * @tc.desc       : test OH_AVPlayer_Prepare
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerPrepare003', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerPrepare(0, 0, 0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_PLAY_0100
     * @tc.name       : testOhAvPlayerPlay001
     * @tc.desc       : test OH_AVPlayer_Play
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerPlay001', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerPlay(1, 1, 1, 1);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_PLAY_0200
     * @tc.name       : testOhAvPlayerPlay002
     * @tc.desc       : test OH_AVPlayer_Play
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerPlay002', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerPlay(0, 0, 1, 0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_PLAY_0300
     * @tc.name       : testOhAvPlayerPlay003
     * @tc.desc       : test OH_AVPlayer_Play
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerPlay003', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerPlay(1, 0, 1, 0);
      expect(result).assertEqual(0);
      done();
    });
    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_PLAY_0400
     * @tc.name       : testOhAvPlayerPlay004
     * @tc.desc       : test OH_AVPlayer_Play
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerPlay004', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerPlay(0, 0, 0, 0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_PAUSE_0100
     * @tc.name       : testOhAvPlayerPause001
     * @tc.desc       : test OH_AVPlayer_Pause
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerPause001', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerPause(1, 1, 1, 1, 1);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_PAUSE_0200
     * @tc.name       : testOhAvPlayerPause002
     * @tc.desc       : test OH_AVPlayer_Pause
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerPause002', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerPause(0, 0, 0, 1, 0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_PAUSE_0300
     * @tc.name       : testOhAvPlayerPause003
     * @tc.desc       : test OH_AVPlayer_Pause
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerPause003', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerPause(1, 0, 0, 1, 0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_PAUSE_0400
     * @tc.name       : testOhAvPlayerPause004
     * @tc.desc       : test OH_AVPlayer_Pause
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerPause004', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerPause(1, 1, 0, 1, 0);
      expect(result).assertEqual(0);
      done();
    });
    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_PAUSE_0500
     * @tc.name       : testOhAvPlayerPause005
     * @tc.desc       : test OH_AVPlayer_Pause
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerPause005', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerPause(0, 0, 0, 0, 0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_STOP_0100
     * @tc.name       : testOhAvPlayerStop001
     * @tc.desc       : test OH_AVPlayer_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerStop001', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerStop(1, 1, 1, 1);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_STOP_0200
     * @tc.name       : testOhAvPlayerStop002
     * @tc.desc       : test OH_AVPlayer_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerStop002', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerStop(0, 0, 1, 0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_STOP_0300
     * @tc.name       : testOhAvPlayerStop003
     * @tc.desc       : test OH_AVPlayer_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerStop003', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerStop(1, 0, 1, 0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_STOP_0400
     * @tc.name       : testOhAvPlayerStop004
     * @tc.desc       : test OH_AVPlayer_Stop
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerStop004', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerStop(0, 0, 0, 0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_RESET_0100
     * @tc.name       : testOhAvPlayerReset001
     * @tc.desc       : test OH_AVPlayer_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerReset001', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerReset(1, 1, 1, 0, 0, 1, 1);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_RESET_0200
     * @tc.name       : testOhAvPlayerReset002
     * @tc.desc       : test OH_AVPlayer_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerReset002', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerReset(1, 1, 1, 1, 0, 1, 1);
      expect(result).assertEqual(0);
      done();
    });
    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_RESET_0300
     * @tc.name       : testOhAvPlayerReset003
     * @tc.desc       : test OH_AVPlayer_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerReset003', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerReset(1, 1, 1, 0, 1, 1, 1);
      expect(result).assertEqual(0);
      done();
    });
    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_RESET_0400
     * @tc.name       : testOhAvPlayerReset004
     * @tc.desc       : test OH_AVPlayer_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvPlayerReset004', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerReset(1, 0, 0, 0, 0, 1, 1);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_RESET_0500
     * @tc.name       : testOhAvPlayerReset005
     * @tc.desc       : test OH_AVPlayer_Reset
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvPlayerReset005', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerReset(0, 0, 0, 0, 0, 0, 0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_RELEASE_0100
     * @tc.name       : testOhAvPlayerRelease001
     * @tc.desc       : test OH_AVPlayer_Release
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerRelease001', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerRelease();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_RELEASE_0200
     * @tc.name       : testOhAvPlayerRelease002
     * @tc.desc       : test OH_AVPlayer_Release
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerRelease002', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerReleaseAbnormalOne();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_RELEASESYNC_0100
     * @tc.name       : testOhAvPlayerReleaseSync001
     * @tc.desc       : test OH_AVPlayer_ReleaseSync
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerReleaseSync001', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerReleaseSync();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_RELEASESYNC_0200
     * @tc.name       : testOhAvPlayerReleaseSync002
     * @tc.desc       : test OH_AVPlayer_ReleaseSync
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerReleaseSync002', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerReleaseSyncAbnormalOne();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_SETVOLUME_0100
     * @tc.name       : testOhAvPlayerSetVolume001
     * @tc.desc       : test OH_AVPlayer_SetVolume
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerSetVolume001', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerSetVolume();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_SETVOLUME_0200
     * @tc.name       : testOhAvPlayerSetVolume002
     * @tc.desc       : test OH_AVPlayer_SetVolume
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerSetVolume002', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerSetVolumeAbnormalOne();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_SEEK_0100
     * @tc.name       : testOhAvPlayerSeek001
     * @tc.desc       : test OH_AVPlayer_Seek
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerSeek001', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerSeek();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_SEEK_0200
     * @tc.name       : testOhAvPlayerSeek002
     * @tc.desc       : test OH_AVPlayer_Seek
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerSeek002', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerSeekAbnormalOne();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_GETCURRENTTIME_0100
     * @tc.name       : testOhAvPlayerGetCurrentTime001
     * @tc.desc       : test OH_AVPlayer_GetCurrentTime
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerGetCurrentTime001', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerGetCurrentTime();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_GETCURRENTTIME_0200
     * @tc.name       : testOhAvPlayerGetCurrentTime002
     * @tc.desc       : test OH_AVPlayer_GetCurrentTime
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerGetCurrentTime002', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerGetCurrentTimeAbnormalOne();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_GETVIDEOWIDTH_0100
     * @tc.name       : testOhAvPlayerGetVideoWidth001
     * @tc.desc       : test OH_AVPlayer_GetVideoWidth
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerGetVideoWidth001', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerGetVideoWidth();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_GETVIDEOWIDTH_0200
     * @tc.name       : testOhAvPlayerGetVideoWidth002
     * @tc.desc       : test OH_AVPlayer_GetVideoWidth
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerGetVideoWidth002', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerGetVideoWidthAbnormalOne();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_GETVIDEOHEIGHT_0100
     * @tc.name       : testOhAvPlayerGetVideoHeight001
     * @tc.desc       : test OH_AVPlayer_GetVideoHeight
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerGetVideoHeight001', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerGetVideoHeight();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_GETVIDEOHEIGHT_0200
     * @tc.name       : testOhAvPlayerGetVideoHeight002
     * @tc.desc       : test OH_AVPlayer_GetVideoHeight
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerGetVideoHeight002', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerGetVideoHeightAbnormalOne();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_SETPLAYBACKSPEED_0100
     * @tc.name       : testOhAvPlayerSetPlaybackSpeed001
     * @tc.desc       : test OH_AVPlayer_SetPlaybackSpeed
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerSetPlaybackSpeed001', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerSetPlaybackSpeed();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_SETPLAYBACKSPEED_0200
     * @tc.name       : testOhAvPlayerSetPlaybackSpeed002
     * @tc.desc       : test OH_AVPlayer_SetPlaybackSpeed
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerSetPlaybackSpeed002', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerSetPlaybackSpeedAbnormalOne();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_GETPLAYBACKSPEED_0100
     * @tc.name       : testOhAvPlayerGetPlaybackSpeed001
     * @tc.desc       : test OH_AVPlayer_GetPlaybackSpeed
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerGetPlaybackSpeed001', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerGetPlaybackSpeed();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_GETPLAYBACKSPEED_0200
     * @tc.name       : testOhAvPlayerGetPlaybackSpeed002
     * @tc.desc       : test OH_AVPlayer_GetPlaybackSpeed
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerGetPlaybackSpeed002', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerGetPlaybackSpeedAbnormalOne();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_SELECTBITRATE_0100
     * @tc.name       : testOhAvPlayerSelectBitRate001
     * @tc.desc       : test OH_AVPlayer_SelectBitRate
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerSelectBitRate001', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerSelectBitRate();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_SELECTBITRATE_0200
     * @tc.name       : testOhAvPlayerSelectBitRate002
     * @tc.desc       : test OH_AVPlayer_SelectBitRate
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerSelectBitRate002', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerSelectBitRateAbnormalOne();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_SETVIDEOSURFACE_0100
     * @tc.name       : testOhAvPlayerSetVideoSurface001
     * @tc.desc       : test OH_AVPlayer_SetVideoSurface
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerSetVideoSurface001', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerSetVideoSurface();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_SETVIDEOSURFACE_0200
     * @tc.name       : testOhAvPlayerSetVideoSurface002
     * @tc.desc       : test OH_AVPlayer_SetVideoSurface
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerSetVideoSurface002', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerSetVideoSurfaceAbnormalOne();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_SETVIDEOSURFACE_0300
     * @tc.name       : testOhAvPlayerSetVideoSurface003
     * @tc.desc       : test OH_AVPlayer_SetVideoSurface
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerSetVideoSurface003', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerSetVideoSurfaceAbnormalTwo();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_SETVIDEOSURFACE_0100
     * @tc.name       : testOhAvPlayerSetVideoSurface004
     * @tc.desc       : test OH_AVPlayer_SetVideoSurface
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerSetVideoSurface004', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerSetVideoSurfaceAbnormalThree();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_GETDURATION_0100
     * @tc.name       : testOhAvPlayerGetDuration001
     * @tc.desc       : test OH_AVPlayer_GetDuration
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerGetDuration001', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerGetDuration();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_GETDURATION_0200
     * @tc.name       : testOhAvPlayerGetDuration002
     * @tc.desc       : test OH_AVPlayer_GetDuration
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerGetDuration002', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerGetDurationAbnormalOne();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_GETSTATE_0100
     * @tc.name       : testOhAvPlayerGetState001
     * @tc.desc       : test OH_AVPlayer_GetState
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvPlayerGetState001', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerGetState(1, 1, 1, 1, 1);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_GETSTATE_0200
     * @tc.name       : testOhAvPlayerGetState002
     * @tc.desc       : test OH_AVPlayer_GetState
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvPlayerGetState002', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerGetState(1, 0, 0, 1, 1);
      expect(result).assertEqual(0);
      done();
    });
    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_GETSTATE_0300
     * @tc.name       : testOhAvPlayerGetState003
     * @tc.desc       : test OH_AVPlayer_GetState
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvPlayerGetState003', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerGetState(1, 1, 0, 1, 1);
      expect(result).assertEqual(0);
      done();
    });
    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_GETSTATE_0400
     * @tc.name       : testOhAvPlayerGetState004
     * @tc.desc       : test OH_AVPlayer_GetState
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOhAvPlayerGetState004', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerGetState(0, 0, 0, 0, 0);
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_ISPLAYING_0100
     * @tc.name       : testOhAvPlayerIsPlaying001
     * @tc.desc       : test OH_AVPlayer_IsPlaying
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerIsPlaying001', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerIsPlaying();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_ISPLAYING_0200
     * @tc.name       : testOhAvPlayerIsPlaying002
     * @tc.desc       : test OH_AVPlayer_IsPlaying
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerIsPlaying002', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerIsPlayingAbnormalOne();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_ISLOOPING_0100
     * @tc.name       : testOhAvPlayerIsLooping001
     * @tc.desc       : test OH_AVPlayer_IsLooping
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerIsLooping001', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerIsLooping();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_ISLOOPING_0200
     * @tc.name       : testOhAvPlayerIsLooping002
     * @tc.desc       : test OH_AVPlayer_IsLooping
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerIsLooping002', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerIsLoopingAbnormalOne();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_SETLOOPING_0100
     * @tc.name       : testOhAvPlayerSetLooping001
     * @tc.desc       : test OH_AVPlayer_SetLooping
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerSetLooping001', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerSetLooping();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_SETLOOPING_0200
     * @tc.name       : testOhAvPlayerSetLooping002
     * @tc.desc       : test OH_AVPlayer_SetLooping
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerSetLooping002', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerSetLoopingAbnormalOne();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_SETPLAYERCALLBACK_0100
     * @tc.name       : testOhAvPlayerSetPlayerCallback001
     * @tc.desc       : test OH_AVPlayer_SetPlayerCallback
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerSetPlayerCallback001', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerSetPlayerCallback();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_SETPLAYERCALLBACK_0200
     * @tc.name       : testOhAvPlayerSetPlayerCallback002
     * @tc.desc       : test OH_AVPlayer_SetPlayerCallback
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerSetPlayerCallback002', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerSetPlayerCallbackAbnormalOne();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_SETPLAYERCALLBACK_0300
     * @tc.name       : testOhAvPlayerSetPlayerCallback003
     * @tc.desc       : test OH_AVPlayer_SetPlayerCallback
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerSetPlayerCallback003', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerSetPlayerCallbackAbnormalTwo();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_SETPLAYERCALLBACK_0400
     * @tc.name       : testOhAvPlayerSetPlayerCallback004
     * @tc.desc       : test OH_AVPlayer_SetPlayerCallback
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerSetPlayerCallback004', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerSetPlayerCallbackAbnormalThree();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_SELECTTRACK_0100
     * @tc.name       : testOhAvPlayerSelectTrack001
     * @tc.desc       : test OH_AVPlayer_SelectTrack
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerSelectTrack001', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerSelectTrack();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_SELECTTRACK_0200
     * @tc.name       : testOhAvPlayerSelectTrack002
     * @tc.desc       : test OH_AVPlayer_SelectTrack
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerSelectTrack002', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerSelectTrackAbnormalOne();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_DESELECTTRACK_0100
     * @tc.name       : testOhAvPlayerDeselectTrack001
     * @tc.desc       : test OH_AVPlayer_DeselectTrack
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerDeselectTrack001', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerDeselectTrack();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_DESELECTTRACK_0200
     * @tc.name       : testOhAvPlayerDeselectTrack002
     * @tc.desc       : test OH_AVPlayer_DeselectTrack
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerDeselectTrack002', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerDeselectTrackAbnormalOne();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_GETCURRENTTRACK_0100
     * @tc.name       : testOhAvPlayerGetCurrentTrack001
     * @tc.desc       : test OH_AVPlayer_GetCurrentTrack
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerGetCurrentTrack001', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerGetCurrentTrack();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_MULTIMEIDA_AVPLAYER_NDK_GETCURRENTTRACK_0200
     * @tc.name       : testOhAvPlayerGetCurrentTrack002
     * @tc.desc       : test OH_AVPlayer_GetCurrentTrack
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 0
     */
    it('testOhAvPlayerGetCurrentTrack002', 0, async (done: Function) => {
      let result: number = avplayer.AvPlayerGetCurrentTrackAbnormalOne();
      expect(result).assertEqual(0);
      done();
    });
  })
}
