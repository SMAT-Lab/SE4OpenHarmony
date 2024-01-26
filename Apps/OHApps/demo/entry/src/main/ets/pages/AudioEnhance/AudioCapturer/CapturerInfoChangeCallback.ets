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

@Entry
@Component
struct CapturerInfoChangeCallback {
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
  private audioVolumeGroupManager = null;

  async onBackPress() {
    if (this.audioCapturer == null) {
      this.returnMsg += `audioCapturer instance had not created\n`
      return
    }
    await this.audioCapturer.release()
    this.audioCapturer = null
  }

  aboutToAppear() {
    let audioManager = audio.getAudioManager();
    let audioVolumeManager = audioManager.getVolumeManager();
    let groupid = audio.DEFAULT_VOLUME_GROUP_ID;
    let _this = this;
    audioVolumeManager.getVolumeGroupManager(groupid, (err, value) => {
      if (err) {
        _this.returnMsg = "getVolumeGroupManager failed. err:" + JSON.stringify(err);
        return;
      }
      _this.returnMsg += "getVolumeGroupManager success";
      _this.audioVolumeGroupManager = value;
    });
  }

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

  capturerStart() {
    if (this.audioCapturer == null) {
      this.returnMsg = `AudioCapturer instance had not created,dont allow to start\n`
      return
    }
    let _this = this
    if (_this.audioCapturer.state != 2) {
      this.audioCapturer.start()
        .then(() => {
          _this.returnMsg = `AudioCapturer start : SUCCESS,state:${_this.audioCapturer.state}\n`
        })
        .catch(err => {
          _this.returnMsg = `AudioCapturer start : Error: ${JSON.stringify(err)}\n`
        })
    } else {
      _this.returnMsg = `AudioCapturer is started, Do not click repeatedly\n`
    }
  }

  stopCapturer() {
    if (this.audioCapturer == null) {
      this.returnMsg = `AudioCapturer instance had not created,dont‘t allow to stop\n`
      return
    }
    let _this = this
    if (_this.audioCapturer.state != 3) {
      _this.audioCapturer.stop()
        .then(() => {
          _this.returnMsg = `AudioCapturer stop : SUCCESS,state:${_this.audioCapturer.state}\n`
        })
        .catch(err => {
          _this.returnMsg = `AudioCapturer stop : Error: ${JSON.stringify(err)}\n`
        })
    } else {
      _this.returnMsg = `AudioCapturer is stopped, Do not click repeatedly\n`
    }
  }

  releaseCapturer() {
    if (this.audioCapturer == null) {
      this.returnMsg = `AudioCapturer instance had not created,dont‘t allow to release\n`
      return
    }
    let _this = this
    if (_this.audioCapturer.state != 4) {
      _this.audioCapturer.release()
        .then(() => {
          _this.returnMsg = `AudioCapturer release SUCCESS,state:${_this.audioCapturer.state}\n`
          _this.audioCapturer = null
        })
        .catch(err => {
          _this.returnMsg = `AudioCapturer release : Error: ${JSON.stringify(err)}\n`
        })
    } else {
      _this.returnMsg = `AudioCapturer is released, Do not click repeatedly\n`
    }
  }

  getCapturerChangeInfo(CapturerChangeInfo) {
    let str = ``;
    let Info = CapturerChangeInfo;

    str += `nStreamId:${Info.streamId}, ClientUid:${Info.clientUid}, State:${Info.capturerState}, Muted:${Info.muted}
              Source:${Info.capturerInfo.source}, Flag:${Info.capturerInfo.capturerFlags},\n`;
    for (let j = 0; j < Info.deviceDescriptors.length; j++) {
      let descriptor = Info.deviceDescriptors[j];
      str += `__deviceDescriptors_${j}\n`;
      str += `Id:${descriptor.id}, Type:${descriptor.deviceType}, Role:${descriptor.deviceRole},
                Name:${descriptor.name}, Address:${descriptor.address}, SampleRates:${descriptor.sampleRates[0]},
                ChannelCounts:${descriptor.channelCounts[0]}, ChannelMask:${descriptor.channelMasks[0]},
                EncodingType:${descriptor.encodingTypes[0]}\n`;
    }
    return str;
  }

  setMicrophoneMute() {
    let _this = this;
    this.audioVolumeGroupManager.setMicrophoneMute(true, (err) => {
      if (err) {
        _this.returnMsg = "setMicrophoneMute-true err:" + JSON.stringify(err)
        return;
      }
      _this.returnMsg = "setMicrophoneMute-true SUCCESS"
    });
  }

  callback1 = (callback) => {
    this.returnCallbackMsg1 = this.getCapturerChangeInfo(callback);
  }
  callback2 = (callback) => {
    this.returnCallbackMsg2 = this.getCapturerChangeInfo(callback);
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
          Text(this.returnMsg).fontWeight(FontWeight.Bolder).position({ x: 10, y: 370 }).fontSize(18)
        }.width('98%').height(410).backgroundColor(Color.Orange).position({ x: '1%', y: 70 })
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

            Button() {
              Text("start AudioCapturer").fontSize(22).fontColor(Color.Blue)
            }.width('49%').height(40).onClick(() => {
              this.capturerStart()
            }).backgroundColor(Color.Pink)
          }.margin({ top: 5, bottom: 5 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Button() {
              Text("stop AudioCapturer").fontSize(22).fontColor(Color.Blue)
            }.width('49%').height(40).onClick(() => {
              this.stopCapturer()
            }).backgroundColor(Color.Pink)

            Button() {
              Text("release AudioCapturer").fontSize(22).fontColor(Color.Blue)
            }.width('49%').height(40).onClick(() => {
              this.releaseCapturer()
              this.callbackStatus1 = '未注册\n'
              this.callbackStatus2 = '未注册\n'
              this.returnCallbackMsg1 = ''
              this.returnCallbackMsg2 = ''
            }).backgroundColor(Color.Pink)
          }.margin({ top: 5, bottom: 5 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Button() {
              Text("监听Callback1").fontSize(20).fontColor(Color.White).textAlign(TextAlign.Center)
            }.width('50%').height(40).margin({ top: 5 })
            .onClick(() => {
              if (this.audioCapturer == null) {
                this.returnMsg = `audioCapturer instance had not created,dont‘t allow to listener device change\n`
                return
              }

              let _this = this;
              this.audioCapturer.on('audioCapturerChange', this.callback1);
              _this.callbackStatus1 = 'Callback1监听中.....\n'
            })

            Button() {
              Text("监听Callback2").fontSize(20).fontColor(Color.White).textAlign(TextAlign.Center)
            }.width('50%').height(40).margin({ top: 5 })
            .onClick(() => {
              if (this.audioCapturer == null) {
                this.returnMsg = `audioCapturer instance had not created,dont‘t allow to listener device change\n`
                return
              }

              let _this = this;
              this.audioCapturer.on('audioCapturerChange', this.callback2);
              _this.callbackStatus2 = 'Callback2监听中.....\n'
            })
          }.margin({ top: 5, bottom: 5 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Button() {
              Text("取消Callback1").fontSize(20).fontColor(Color.White).textAlign(TextAlign.Center)
            }.width('50%').height(40).margin({ top: 5 })
            .onClick(() => {
              if (this.audioCapturer == null) {
                this.returnMsg = `audioCapturer instance had not created,dont‘t allow to listener device change\n`
                return
              }
              let _this = this;
              this.audioCapturer.off('audioCapturerChange', this.callback1);
              _this.callbackStatus1 = '已取消Callback1注册\n'
              _this.returnCallbackMsg1 = ''
            })

            Button() {
              Text("取消Callback2").fontSize(20).fontColor(Color.White).textAlign(TextAlign.Center)
            }.width('50%').height(40).margin({ top: 5 })
            .onClick(() => {
              if (this.audioCapturer == null) {
                this.returnMsg = `audioCapturer instance had not created,dont‘t allow to listener device change\n`
                return
              }
              let _this = this;
              this.audioCapturer.off('audioCapturerChange', this.callback2);
              _this.callbackStatus2 = '已取消Callback2注册\n'
              _this.returnCallbackMsg2 = ''
            })
          }.margin({ top: 5, bottom: 5 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Button() {
              Text("取消所有监听").fontSize(20).fontColor(Color.White).textAlign(TextAlign.Center)
            }.width('98%').height(40).margin({ top: 5 })
            .onClick(() => {
              if (this.audioCapturer == null) {
                this.returnMsg = `audioCapturer instance had not created,dont‘t allow to listener device change\n`
                return
              }
              let _this = this;
              this.audioCapturer.off('audioCapturerChange');
              _this.callbackStatus1 = '未注册\n'
              _this.callbackStatus2 = '未注册\n'
              _this.returnCallbackMsg1 = ''
              _this.returnCallbackMsg2 = ''
            })
          }.margin({ top: 5, bottom: 5 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Button() {
              Text("设置录音静音").fontSize(22).fontColor(Color.Blue)
            }.width('49%').height(40).onClick(() => {
              this.setMicrophoneMute()
            }).backgroundColor(Color.Pink)

            Button() {
              Text("取消录音静音").fontSize(22).fontColor(Color.Blue)
            }.width('49%').height(40).onClick(() => {
              let _this = this;
              this.audioVolumeGroupManager.setMicrophoneMute(false, (err) => {
                if (err) {
                  _this.returnMsg = "setMicrophoneMute-false err:" + JSON.stringify(err)
                  return;
                }
                _this.returnMsg = "setMicrophoneMute-false SUCCESS"
              });
            }).backgroundColor(Color.Pink)
          }.width('100%')

        }.width('100%')
      }.margin({ top: 490 }).width('100%')
    }
  }
}