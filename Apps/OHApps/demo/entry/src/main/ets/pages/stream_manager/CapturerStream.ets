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
struct CapturerStream {
  @State returnMsg: string = 'Hello World'
  private audioCapturer = null;
  @State index: number = 0;
  @State selectedVolumeType: number = 0;
  private audioStreamManager = audio.getAudioManager().getStreamManager();
  @State onReturnMsg: string = ""
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

  getInfoArray(AudioCapturerChangeInfoArray) {

    if (AudioCapturerChangeInfoArray != null) {
      console.log(JSON.stringify(AudioCapturerChangeInfoArray))
      let str = ``;
      for (let i = 0; i < AudioCapturerChangeInfoArray.length; i++) {
        let Info = AudioCapturerChangeInfoArray[i];
        str += `第${i}条\nStreamId:${Info.streamId},ClientUid:${Info.clientUid},Source:${Info.capturerInfo.source},Flag:${Info.capturerInfo.capturerFlags},State:${Info.capturerState}\n`;
        for (let j = 0; j < Info.deviceDescriptors.length; j++) {
          let descriptor = Info.deviceDescriptors[j];
          str += `__deviceDescriptors_${j}\n`;
          str += `Id:${descriptor.id},Type:${descriptor.deviceType},Role:${descriptor.deviceRole},Name:${descriptor.name},Address:${descriptor.address},SampleRates:${descriptor.sampleRates[0]},ChannelCounts:${descriptor.channelCounts[0]},ChannelMask:${descriptor.channelMasks},EncodingType:${descriptor.encodingType}\n`;
        }
      }
      return str;
    }
    return "没有数据"
  }

  build() {
    Column() {
      Row() {
        Column() {
          Text("【采集流管理】返回数据：").fontWeight(FontWeight.Bolder).position({ x: 10, y: 5 }).fontSize(18)
          Text(this.returnMsg).position({ x: 10, y: 30 }).fontSize(14)
        }.width('98%').height(180).backgroundColor(Color.Orange).position({ x: '1%' })
      }.width('100%');

      Column() {
        Button() {
          Text("getCurrentAudioCapturerInfoArray callback")
            .fontSize(20)
            .fontColor(Color.White)
            .textAlign(TextAlign.Center)
        }.width('100%').height(60)
        .onClick(() => {
          let _this = this;
          this.audioStreamManager.getCurrentAudioCapturerInfoArray(async (err, AudioCapturerChangeInfoArray) => {
            console.info('getCurrentAudioCapturerInfoArray **** Get Callback Called ****');
            if (err) {
              _this.returnMsg = "getCurrentAudioCapturerInfoArray :ERROR:" + JSON.stringify(err);
            } else {
              _this.returnMsg = _this.getInfoArray(AudioCapturerChangeInfoArray);
            }
          });
        })

        Button() {
          Text("getCurrentAudioCapturerInfoArray promise")
            .fontSize(20)
            .fontColor(Color.White)
            .textAlign(TextAlign.Center)
        }.width('100%').height(60).margin({ top: 10 })
        .onClick(() => {
          let _this = this;
          this.audioStreamManager.getCurrentAudioCapturerInfoArray()
            .then((AudioCapturerChangeInfoArray) => {
              _this.returnMsg = _this.getInfoArray(AudioCapturerChangeInfoArray);
            }).catch((err) => {
            _this.returnMsg = "getCurrentAudioCapturerInfoArray :ERROR:" + JSON.stringify(err);
          })
        })

        Row() {
          Button() {
            Text("on('audioCapturerChange')").fontSize(20).fontColor(Color.White).textAlign(TextAlign.Center)
          }.width('80%').height(60).margin({ top: 10 })
          .onClick(() => {
            let _this = this;
            _this.onReturnMsg = '监听已触发\n'
            this.audioStreamManager.on('audioCapturerChange', (AudioCapturerChangeInfoArray) => {
              _this.onReturnMsg = '收到回调啦\n' + _this.getInfoArray(AudioCapturerChangeInfoArray);
            });
          })

          Button() {
            Text("off").fontSize(20).fontColor(Color.White).textAlign(TextAlign.Center)
          }.width('20%').height(60).margin({ top: 10 })
          .onClick(() => {
            let _this = this;
            this.audioStreamManager.off('audioCapturerChange');
            _this.onReturnMsg = '监听已取消\n'
          })
        }


        Text("ON 监听数据\n" + this.onReturnMsg).fontSize(14).margin({ top: 10 })

        Row() {
          Button("createAudioCapturer")
            .fontSize(20)
            .height(40)
            .backgroundColor(Color.Pink)
            .fontColor(Color.Blue)
            .onClick(() => {
              let _this = this;
              if (_this.index > 0) {
                _this.returnMsg = `Capturer create already Success.`
                return;
              }
              console.log(JSON.stringify(this.audioCapturerOptions))
              audio.createAudioCapturer(this.audioCapturerOptions, (err, data) => {
                if (err) {
                  _this.returnMsg = `createAudioCapturer err:${JSON.stringify(err)}}`
                } else {
                  _this.returnMsg = `createAudioCapturer Success:${JSON.stringify(data)}}`
                  _this.audioCapturer = data;
                  _this.index++;
                }
              });
            })
          Button("start")
            .fontSize(20)
            .height(40)
            .backgroundColor(Color.Pink)
            .fontColor(Color.Blue)
            .onClick(() => {
              let _this = this;
              this.audioCapturer.start((err) => {
                if (err) {
                  _this.returnMsg = `Capturer start failed err:${JSON.stringify(err)}}`
                } else {
                  _this.returnMsg = `Capturer start success.`
                }
              });
            })
        }.height(40).margin({ top: 10 })

        Row() {
          Button("read")
            .fontSize(20)
            .height(40)
            .backgroundColor(Color.Pink)
            .fontColor(Color.Blue)
            .onClick(async () => {
              try {
                let bufferSize = await this.audioCapturer.getBufferSize();
                this.returnMsg = `bufferSize:${bufferSize}\n`
                this.returnMsg += `Capturer read start...\n`
                for (let i = 0;i < 10; i++) {
                  let ArrayBuffer = await this.audioCapturer.read(bufferSize, true)
                  this.returnMsg += `${JSON.stringify(ArrayBuffer)}--`
                }
                this.returnMsg += `Capturer read end...\n`
              } catch (err) {
                this.returnMsg = `Capturer read failed err:${JSON.stringify(err)}`
              }
            })
          Button("stop")
            .fontSize(20)
            .height(40)
            .backgroundColor(Color.Pink)
            .fontColor(Color.Blue)
            .onClick(async () => {
              try {
                await this.audioCapturer.stop();
                this.returnMsg += `Capturer stop success \n`
              } catch (err) {
                this.returnMsg = `Capturer stop failed err:${JSON.stringify(err)}}`
              }
            })
        }.height(40).margin({ top: 10 })

        Row() {
          Button("release")
            .fontSize(20)
            .height(40)
            .backgroundColor(Color.Pink)
            .fontColor(Color.Blue)
            .onClick(async () => {
              try {
                await this.audioCapturer.release();
                this.returnMsg += `Capturer release success \n`
                this.index = 0;
              } catch (err) {
                this.returnMsg = `Capturer release failed err:${JSON.stringify(err)}}`
              }
            })
        }.height(40).margin({ top: 10 })
      }.width('100%').margin({ top: 190 });
    }
    .height('100%').width('100%')
  }
}