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
struct GetCurrentAudioCapturerChangeInfo {
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
  @State returnMsg: string = ``
  private sourceTypeList = []
  @State selectedSourceTypeKey: string = "SOURCE_TYPE_MIC"

  aboutToAppear() {
    for (let key in audio.SourceType) {
      this.sourceTypeList.push({ value: key })
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

  capturerStart() {
    if (this.audioCapturer == null) {
      this.returnMsg += `AudioCapturer instance had not created,dont‘t allow to start\n`
      return
    }
    let _this = this
    if (_this.audioCapturer.state != 2) {
      this.audioCapturer.start()
        .then(() => {
          _this.returnMsg += `AudioCapturer start : SUCCESS,state:${_this.audioCapturer.state}\n`
        })
        .catch(err => {
          _this.returnMsg += `AudioCapturer start : Error: ${JSON.stringify(err)}\n`
        })
    } else {
      _this.returnMsg = `AudioCapturer is started, Do not click repeatedly\n`
    }
  }

  stopCapturer() {
    if (this.audioCapturer == null) {
      this.returnMsg += `AudioCapturer instance had not created,dont‘t allow to stop\n`
      return
    }
    let _this = this
    if (_this.audioCapturer.state != 3) {
      _this.audioCapturer.stop()
        .then(() => {
          _this.returnMsg += `AudioCapturer stop : SUCCESS,state:${_this.audioCapturer.state}\n`
        })
        .catch(err => {
          _this.returnMsg += `AudioCapturer stop : Error: ${JSON.stringify(err)}\n`
        })
    } else {
      _this.returnMsg = `AudioCapturer is stopped, Do not click repeatedly\n`
    }
  }

  releaseCapturer() {
    if (this.audioCapturer == null) {
      this.returnMsg += `AudioCapturer instance had not created,dont‘t allow to release\n`
      return
    }
    let _this = this
    if (_this.audioCapturer.state != 4) {
      _this.audioCapturer.release()
        .then(() => {
          _this.returnMsg += `AudioCapturer release SUCCESS,state:${_this.audioCapturer.state}\n`
          _this.audioCapturer = null
        })
        .catch(err => {
          _this.returnMsg += `AudioCapturer release : Error: ${JSON.stringify(err)}\n`
        })
    } else {
      _this.returnMsg = `AudioCapturer is released, Do not click repeatedly\n`
    }
  }

  getCurrentAudioCapturerChangeInfo() {
    if (this.audioCapturer == null) {
      this.returnMsg += `audioCapturer instance had not created,dont‘t allow to getCurrentAudioCapturerChangeInfo\n`
      return
    }
    let _this = this
    try {
      let changeInfo = this.audioCapturer.getCurrentAudioCapturerChangeInfo();
      _this.returnMsg = `getCurrentAudioCapturerChangeInfo : 返回值:` + _this.getCapturerChangeInfo(changeInfo);
    } catch (error) {
      _this.returnMsg = `audioCapturer getCurrentAudioCapturerChangeInfo callback : Error: ${JSON.stringify(error)}\n`
    }
  }

  getCapturerChangeInfo(CapturerChangeInfo) {
    let str = ``;
    let Info = CapturerChangeInfo;
    str += `StreamId: ${Info.streamId}, ClientUid: ${Info.clientUid}, State: ${Info.capturerState},Source: ${Info.capturerInfo.source}, Flag: ${Info.capturerInfo.capturerFlags}, \n`;
    for (let j = 0; j < Info.deviceDescriptors.length; j++) {
      let descriptor = Info.deviceDescriptors[j];
      str += `__deviceDescriptors_${j}\n`;
      str += `Id: ${descriptor.id}, Type:${descriptor.deviceType}, Role: ${descriptor.deviceRole}, Name: ${descriptor.name}, Address: ${descriptor.address}, SampleRates: ${descriptor.sampleRates[0]}, 
      ChannelCounts: ${descriptor.channelCounts[0]}, ChannelMask: ${descriptor.channelMasks[0]}, EncodingType:${descriptor.encodingTypes[0]}\n`;
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
            Text("selectedSourceType:").fontSize(20)
            Select(this.sourceTypeList).value(this.selectedSourceTypeKey)
              .onSelect((index, value) => {
                this.selectedSourceTypeKey = value
                this.audioCapturerOptions.capturerInfo.source = audio.SourceType[value]
              })
          }.margin({ top: 10 })

          Row() {
            Button() {
              Text("创建AudioCapturer").fontSize(22).fontColor(Color.Blue)
            }.width('49%').height(60).onClick(() => this.createCapturer()).backgroundColor(Color.Pink)

            Button() {
              Text("release capturer").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => this.releaseCapturer())

          }.margin({ top: 20, bottom: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Button() {
              Text("start promise").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => {
              this.capturerStart()
            })

            Button() {
              Text("stop promise").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => this.stopCapturer())

          }.margin({ top: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Button() {
              Text("getCurrentAudioCapturerChangeInfo 同步接口").fontSize(22).fontColor(Color.Blue)
            }.width('98%').height(60).onClick(() => this.getCurrentAudioCapturerChangeInfo())

          }.margin({ top: 20, bottom: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

        }.width('100%')
      }.margin({ top: 230 }).width('100%')
    }
  }
}
