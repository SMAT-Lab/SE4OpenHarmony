/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import audio from '@ohos.multimedia.audio'
import fs from '@ohos.file.fs';

@Entry
@Component
struct GetAvailableMicrophones {
  private audioCapturerOptions = {
    streamInfo: {
      samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_44100,
      channels: audio.AudioChannel.CHANNEL_2,
      sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
      encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
    },
    capturerInfo: {
      source: audio.SourceType.SOURCE_TYPE_MIC,
      capturerFlags: 0
    }
  }
  private audioCapturer = null
  private audioRoutingManager = null;
  private audioManager = null;
  @State returnMsg: string = ``
  @State volume: number = 0
  @State rate: number = 0
  @State minVolume: number = 0
  @State maxVolume: number = 0
  @State path: string = globalThis.pathDir + '/test_44100_2.wav';
  @State isWrite: boolean = false

  async aboutToAppear() {
    this.audioManager = audio.getAudioManager();
    if (this.audioManager != null) {
      this.returnMsg = `getAudioManger : PASS`;
      this.audioRoutingManager = this.audioManager.getRoutingManager();
      this.returnMsg += `getRoutingManager : PASS`;
    } else {
      this.returnMsg += `getAudioManger : FAIL`;
    }
  }

  async onBackPress() {
    if (this.audioCapturer !== null) {
      await this.audioCapturer.release()
    }
  }

  async createCapturer() {
    this.returnMsg = ``
    if (this.audioCapturer != null) {
      this.returnMsg += `audioCapturer instance had created, Do not click repeatedly\n`
      return
    } else {
      try {
        this.audioCapturer = await audio.createAudioCapturer(this.audioCapturerOptions)
        this.returnMsg += `audioCapturer create success \n`
      } catch (err) {
        this.returnMsg += `i create : Error: ${JSON.stringify(err)}\n`
        return
      }
    }
  }

  getAvailableMicrophones() {
    let _this = this
    try {
      let microphoneInfo = this.audioRoutingManager.getAvailableMicrophones();
      _this.returnMsg = `audioCapturer getAvailableMicrophones : 返回值：` + _this.getMicrophoneInfoArray(microphoneInfo)
    } catch (error) {
      _this.returnMsg = `audioCapturer getAvailableMicrophones : Error: ${JSON.stringify(error)}\n`
    }
  }

  getMicrophoneInfoArray(microphoneInfo) {
    let str = ``;
    for (let i = 0; i < microphoneInfo.length; i++) {
      let descriptor = microphoneInfo[i];
      str += `descriptor_${i}_  Id:${descriptor.id}, Type:${descriptor.deviceType}, GroupId:${descriptor.groupId}, Sensitivity:${descriptor.sensitivity},
          Position.x:${descriptor.position.x}, Position.y:${descriptor.position.y}, Position.z:${descriptor.position.z},
          Orientation.x:${descriptor.orientation.x}, Orientation.y:${descriptor.orientation.y}, Orientation.z:${descriptor.orientation.z} `;
    }
    return str;
  }

  build() {
    Column() {
      Row() {
        Column() {
          Text("返回数据：").fontWeight(FontWeight.Bolder).position({ x: 10, y: 5 }).fontSize(18)
          Text(this.returnMsg).position({ x: 10, y: 30 }).fontSize(14)
        }.width('98%').height(220).backgroundColor(Color.Orange).position({ x: '1%' })
      }.position({ x: 0, y: 0 }).width('100%').zIndex(999)

      Scroll() {
        Column() {
          Row() {
            Button() {
              Text("创建AudioCapturer").fontSize(22).fontColor(Color.Blue)
            }.width('98%').height(60).onClick(() => this.createCapturer()).backgroundColor(Color.Pink)
          }.margin({ top: 20, bottom: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Button() {
              Text("getCurrentMicrophones 同步接口").fontSize(22).fontColor(Color.Blue)
            }.width('98%').height(60).onClick(() => this.getAvailableMicrophones())
          }.margin({ top: 20, bottom: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

        }.width('100%')
      }.margin({ top: 230 }).width('100%')
    }
  }
}