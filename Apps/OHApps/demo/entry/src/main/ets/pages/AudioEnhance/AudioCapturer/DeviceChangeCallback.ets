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

import router from '@ohos.router';
import audio from '@ohos.multimedia.audio'
import fs from '@ohos.file.fs';

@Entry
@Component
struct DeviceChangeCallback {
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
  @State returnMsg: string = `hello`
  @State onReturnMsg: string = `hello`
  @State callbackStatus1: string = `未注册`
  @State callbackStatus2: string = `未注册`
  @State returnCallbackMsg1: string = ``
  @State returnCallbackMsg2: string = ``

  createAudioCapturer() {
    if (this.audioCapturer !== null) {
      this.returnMsg = `AudioCapturer Created already,don't create anymore`
      return
    }
    let _this = this
    audio.createAudioCapturer(this.audioCapturerOptions, async (err, data) => {
      if (err) {
        _this.returnMsg = `AudioCapturer Created : Error: ${JSON.stringify(err)}`
      } else {
        _this.audioCapturer = data;
        _this.returnMsg = `AudioCapturer Created : SUCCESS,state:${_this.audioCapturer.state}\n`
        _this.onReturnMsg = "无监听"
      }
    })
  }

  async onBackPress() {
    if (this.audioCapturer == null) {
      this.returnMsg += `audioCapturer instance had not created\n`
      return
    }
    await this.audioCapturer.release()
    this.audioCapturer = null
  }

  getDeviceChangeInfo(DeviceChangeInfo) {
    let str = ``;
    for (let i = 0; i < DeviceChangeInfo.length; i++) {
      let descriptor = DeviceChangeInfo[i];
      str += `第${i}条\n Id:${descriptor.id},\nType:${descriptor.deviceType},\nRole:${descriptor.deviceRole},\nName:${descriptor.name},
      Address:${descriptor.address},\nSampleRates:${descriptor.sampleRates[0]},\nChannelCounts:${descriptor.channelCounts[0]},
      ChannelMask:${descriptor.channelMasks[0]},\nEncodingType:${descriptor.encodingTypes[0]}\n`;
    }
    return str;
  }

  callback1 = (callback) => {
    this.returnCallbackMsg1 = this.getDeviceChangeInfo(callback);
  }
  callback2 = (callback) => {
    this.returnCallbackMsg2 = this.getDeviceChangeInfo(callback);
  }

  build() {
    Column() {
      Row() {
        Column() {
          Text("Callback1状态：").fontWeight(FontWeight.Bolder).position({ x: 10, y: 5 }).fontSize(18)
          Text(this.callbackStatus1).fontWeight(FontWeight.Bolder).position({ x: 145, y: 5 }).fontSize(18)
          Text("Callback2状态：").fontWeight(FontWeight.Bolder).position({ x: 10, y: 30 }).fontSize(18)
          Text(this.callbackStatus2).fontWeight(FontWeight.Bolder).position({ x: 145, y: 30 }).fontSize(18)
        }.width('98%').height(65).backgroundColor(Color.Green).position({ x: '1%' })

        Column() {
          Text("Callback1返回值：").fontWeight(FontWeight.Bolder).position({ x: 10, y: 5 }).fontSize(18)
          Text(this.returnCallbackMsg1).position({ x: 10, y: 30 }).fontSize(14)
          Text("Callback2返回值：").fontWeight(FontWeight.Bolder).position({ x: 10, y: 200 }).fontSize(18)
          Text(this.returnCallbackMsg2).position({ x: 10, y: 230 }).fontSize(14)
          Text(this.returnMsg).fontWeight(FontWeight.Bolder).position({ x: 10, y: 390 }).fontSize(18)
        }.width('98%').height(430).backgroundColor(Color.Orange).position({ x: '1%', y: 70 })
      }.position({ x: 0, y: 3 }).width('100%').zIndex(999)

      Scroll() {
        Column() {
          Row() {
            Button() {
              Text("创建AudioCapturer").fontSize(22).fontColor(Color.Blue)
            }.width('49%').height(40).onClick(() => {
              this.createAudioCapturer()
              this.callbackStatus1 = '未注册\n'
              this.callbackStatus2 = '未注册\n'
              this.returnCallbackMsg1 = ''
              this.returnCallbackMsg2 = ''
            }).backgroundColor(Color.Pink)
          }.margin({ top: 5, bottom: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Button() {
              Text("监听Callback1").fontSize(20).fontColor(Color.White).textAlign(TextAlign.Center)
            }.width('50%').height(40).margin({ top: 10 })
            .onClick(() => {
              if (this.audioCapturer == null) {
                this.returnMsg = `audioCapturer instance had not created,dont‘t allow to listener device change\n`
                return
              }

              let _this = this;
              this.audioCapturer.on('inputDeviceChange', this.callback1);
              _this.callbackStatus1 = 'Callback1监听中.....\n'
            })

            Button() {
              Text("监听Callback2").fontSize(20).fontColor(Color.White).textAlign(TextAlign.Center)
            }.width('50%').height(40).margin({ top: 10 })
            .onClick(() => {
              if (this.audioCapturer == null) {
                this.returnMsg = `audioCapturer instance had not created,dont‘t allow to listener device change\n`
                return
              }

              let _this = this;
              this.audioCapturer.on('inputDeviceChange', this.callback2);
              _this.callbackStatus2 = 'Callback2监听中.....\n'
            })
          }.margin({ top: 5, bottom: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Button() {
              Text("取消Callback1").fontSize(20).fontColor(Color.White).textAlign(TextAlign.Center)
            }.width('50%').height(40).margin({ top: 10 })
            .onClick(() => {
              if (this.audioCapturer == null) {
                this.returnMsg = `audioCapturer instance had not created,dont‘t allow to listener device change\n`
                return
              }
              let _this = this;
              this.audioCapturer.off('inputDeviceChange', this.callback1);
              _this.callbackStatus1 = '已取消Callback1注册\n'
              _this.returnCallbackMsg1 = ''
            })

            Button() {
              Text("取消Callback2").fontSize(20).fontColor(Color.White).textAlign(TextAlign.Center)
            }.width('50%').height(40).margin({ top: 10 })
            .onClick(() => {
              if (this.audioCapturer == null) {
                this.returnMsg = `audioCapturer instance had not created,dont‘t allow to listener device change\n`
                return
              }
              let _this = this;
              this.audioCapturer.off('inputDeviceChange', this.callback2);
              _this.callbackStatus2 = '已取消Callback2注册\n'
              _this.returnCallbackMsg2 = ''
            })
          }.margin({ top: 5, bottom: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Button() {
              Text("取消所有监听").fontSize(20).fontColor(Color.White).textAlign(TextAlign.Center)
            }.width('100%').height(40).margin({ top: 5 })
            .onClick(() => {
              if (this.audioCapturer == null) {
                this.returnMsg = `audioCapturer instance had not created,dont‘t allow to listener device change\n`
                return
              }
              let _this = this;
              this.audioCapturer.off('inputDeviceChange');
              _this.callbackStatus1 = '未注册\n'
              _this.callbackStatus2 = '未注册\n'
              _this.returnCallbackMsg1 = ''
              _this.returnCallbackMsg2 = ''
            })
          }.width('100%')
        }.width('100%')
      }.margin({ top: 500 }).width('100%')
    }
  }
}