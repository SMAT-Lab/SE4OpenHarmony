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
struct RendererStream {
  @State renderIndex: number = 0;
  @State returnMsg: string = 'Hello World'
  private volumeTypeSelectList = [];
  private contentTypeSelectList = [];
  private streamUsageSelectList = [];
  @State selectedVolumeType: number = 0;
  private audioStreamManager = audio.getAudioManager().getStreamManager();
  @State onReturnMsg: string = ""
  @State selectedVolumeTypeKey: string = "";
  @State selectedContentTypeKey: string = "CONTENT_TYPE_MUSIC";
  @State selectedStreamUsageKey: string = "STREAM_USAGE_MEDIA";
  private audioRenderer = null;
  private audioRendererOptions = {
    streamInfo: {
      samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_44100,
      channels: audio.AudioChannel.CHANNEL_2,
      sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
      encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
    },
    rendererInfo: {
      content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
      usage: audio.StreamUsage.STREAM_USAGE_VOICE_COMMUNICATION,
      rendererFlags: 0
    }
  }
  //content_type@stream_usage:stream_type
  private streamMap = {
    'CONTENT_TYPE_UNKNOWN@STREAM_USAGE_UNKNOWN': 'STREAM_MUSIC',
    'CONTENT_TYPE_UNKNOWN@STREAM_USAGE_MEDIA': 'STREAM_MUSIC',
    'CONTENT_TYPE_UNKNOWN@STREAM_USAGE_VOICE_COMMUNICATION': 'STREAM_MUSIC',
    'CONTENT_TYPE_UNKNOWN@STREAM_USAGE_VOICE_ASSISTANT': 'STREAM_MUSIC',
    'CONTENT_TYPE_UNKNOWN@STREAM_USAGE_NOTIFICATION_RINGTONE': 'STREAM_MUSIC',

    'CONTENT_TYPE_SPEECH@STREAM_USAGE_UNKNOWN': 'STREAM_MUSIC',
    'CONTENT_TYPE_SPEECH@STREAM_USAGE_MEDIA': 'STREAM_VOICE_ASSISTANT',
    'CONTENT_TYPE_SPEECH@STREAM_USAGE_VOICE_COMMUNICATION': 'STREAM_VOICE_CALL',
    'CONTENT_TYPE_SPEECH@STREAM_USAGE_VOICE_ASSISTANT': 'STREAM_VOICE_ASSISTANT',
    'CONTENT_TYPE_SPEECH@STREAM_USAGE_NOTIFICATION_RINGTONE': 'STREAM_MUSIC',

    'CONTENT_TYPE_MUSIC@STREAM_USAGE_UNKNOWN': 'STREAM_MUSIC',
    'CONTENT_TYPE_MUSIC@STREAM_USAGE_MEDIA': 'STREAM_MUSIC',
    'CONTENT_TYPE_MUSIC@STREAM_USAGE_VOICE_COMMUNICATION': 'STREAM_MUSIC',
    'CONTENT_TYPE_MUSIC@STREAM_USAGE_VOICE_ASSISTANT': 'STREAM_VOICE_ASSISTANT',
    'CONTENT_TYPE_MUSIC@STREAM_USAGE_NOTIFICATION_RINGTONE': 'STREAM_RING',

    'CONTENT_TYPE_MOVIE@STREAM_USAGE_UNKNOWN': 'STREAM_MEDIA',
    'CONTENT_TYPE_MOVIE@STREAM_USAGE_MEDIA': 'STREAM_MEDIA',
    'CONTENT_TYPE_MOVIE@STREAM_USAGE_VOICE_COMMUNICATION': 'STREAM_MUSIC',
    'CONTENT_TYPE_MOVIE@STREAM_USAGE_VOICE_ASSISTANT': 'STREAM_MUSIC',
    'CONTENT_TYPE_MOVIE@STREAM_USAGE_NOTIFICATION_RINGTONE': 'STREAM_MUSIC',

    'CONTENT_TYPE_SONIFICATION@STREAM_USAGE_UNKNOWN': 'STREAM_NOTIFICATION',
    'CONTENT_TYPE_SONIFICATION@STREAM_USAGE_MEDIA': 'STREAM_NOTIFICATION',
    'CONTENT_TYPE_SONIFICATION@STREAM_USAGE_VOICE_COMMUNICATION': 'STREAM_MUSIC',
    'CONTENT_TYPE_SONIFICATION@STREAM_USAGE_VOICE_ASSISTANT': 'STREAM_MUSIC',
    'CONTENT_TYPE_SONIFICATION@STREAM_USAGE_NOTIFICATION_RINGTONE': 'STREAM_MUSIC',

    'CONTENT_TYPE_RINGTONE@STREAM_USAGE_UNKNOWN': 'STREAM_RING',
    'CONTENT_TYPE_RINGTONE@STREAM_USAGE_MEDIA': 'STREAM_RING',
    'CONTENT_TYPE_RINGTONE@STREAM_USAGE_VOICE_COMMUNICATION': 'STREAM_MUSIC',
    'CONTENT_TYPE_RINGTONE@STREAM_USAGE_VOICE_ASSISTANT': 'STREAM_MUSIC',
    'CONTENT_TYPE_RINGTONE@STREAM_USAGE_NOTIFICATION_RINGTONE': 'STREAM_RING',

    'CONTENT_TYPE_ULTRASONIC@STREAM_USAGE_SYSTEM': 'STREAM_ULTRASONIC',
    'CONTENT_TYPE_SPEECH@STREAM_USAGE_ACCESSIBILITY': 'STREAM_ACCESSIBILITY',
    'CONTENT_TYPE_MUSIC@STREAM_USAGE_ALARM': 'STREAM_ALARM',


  }

  getVolumeType(contentType, streamUsage) {
    let streamType = this.streamMap[contentType + '@'+streamUsage];
    this.selectedVolumeTypeKey = this.volumeMap[streamType];
    if (!this.selectedVolumeTypeKey) {
      this.selectedVolumeTypeKey = this.volumeMap['STREAM_MUSIC'];
    }
  }
  //stream_type:volume_type
  private volumeMap = {
    'STREAM_RING': 'RINGTONE',
    'STREAM_MUSIC': 'MEDIA',
    'STREAM_VOICE_CALL': 'VOICE_CALL',
    'STREAM_VOICE_ASSISTANT': 'VOICE_ASSISTANT',
    'STREAM_ALL': 'ALL',
    'STREAM_ALARM ': 'ALARM',
    'STREAM_ACCESSIBILITY': 'ACCESSIBILITY',
    'STREAM_ULTRASONIC': 'ULTRASONIC',
  }

  aboutToAppear() {
    for (let key in audio.AudioVolumeType) {
      this.volumeTypeSelectList.push({ value: key })
    }

    for (let key in audio.ContentType) {
      if (key === "CONTENT_TYPE_SONIFICATION") {
        continue;
      }
      this.contentTypeSelectList.push({ value: key })
    }
    for (let key in audio.StreamUsage) {
      this.streamUsageSelectList.push({ value: key })
    }

    this.getVolumeType(this.selectedContentTypeKey, this.selectedStreamUsageKey)

  }

  getInfoArray(AudioRendererChangeInfoArray) {

    if (AudioRendererChangeInfoArray.length > 0) {
      console.log(JSON.stringify(AudioRendererChangeInfoArray))
      let str = ``;
      for (let i = 0; i < AudioRendererChangeInfoArray.length; i++) {
        let Info = AudioRendererChangeInfoArray[i];
        str += `第${i}条\nStreamId:${Info.streamId},ClientUid:${Info.clientUid},Source:${Info.rendererInfo.source},Flag:${Info.rendererInfo.rendererFlags},State:${Info.rendererState}\n`;
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
          Text("【渲染流管理】返回数据：").fontWeight(FontWeight.Bolder).position({ x: 10, y: 5 }).fontSize(18)
          Text(this.returnMsg).position({ x: 10, y: 30 }).fontSize(14)
        }.width('98%').height(200).backgroundColor(Color.Orange).position({ x: '1%' })
      }.width('100%').zIndex(999);
      Scroll() {


        Column() {
          Button() {
            Text("getCurrentAudioRendererInfoArray callback")
              .fontSize(20)
              .fontColor(Color.White)
              .textAlign(TextAlign.Center)
          }.width('100%').height(60)
          .onClick(() => {
            let _this = this;
            this.audioStreamManager.getCurrentAudioRendererInfoArray(async (err, AudioRendererChangeInfoArray) => {
              console.info('getCurrentAudioRendererInfoArray **** Get Callback Called ****');
              if (err) {
                _this.returnMsg = "getCurrentAudioRendererInfoArray :ERROR:" + JSON.stringify(err);
              } else {
                _this.returnMsg = _this.getInfoArray(AudioRendererChangeInfoArray);
              }
            });
          })

          Button() {
            Text("getCurrentAudioRendererInfoArray promise")
              .fontSize(20)
              .fontColor(Color.White)
              .textAlign(TextAlign.Center)
          }.width('100%').height(60).margin({ top: 10 })
          .onClick(() => {
            let _this = this;
            this.audioStreamManager.getCurrentAudioRendererInfoArray()
              .then((AudioRendererChangeInfoArray) => {
                _this.returnMsg = _this.getInfoArray(AudioRendererChangeInfoArray);
              }).catch((err) => {
              _this.returnMsg = "getCurrentAudioRendererInfoArray :ERROR:" + JSON.stringify(err);
            })
          })

          Row() {
            Button() {
              Text("on('audioRendererChange')").fontSize(20).fontColor(Color.White).textAlign(TextAlign.Center)
            }.width('80%').height(60).margin({ top: 10 })
            .onClick(() => {
              let _this = this;
              this.audioStreamManager.on('audioRendererChange', (AudioRendererChangeInfoArray) => {
                _this.onReturnMsg = '\n收到回调啦\n' + _this.getInfoArray(AudioRendererChangeInfoArray);
              });
            })

            Button() {
              Text("off").fontSize(20).fontColor(Color.White).textAlign(TextAlign.Center)
            }.width('20%').height(60).margin({ top: 10 })
            .onClick(() => {
              let _this = this;
              this.audioStreamManager.off('audioRendererChange');
              _this.onReturnMsg = '监听已取消\n'
            })
          }.width('100%')

          Row() {
            Button() {
              Text("getAudioEffectInfoArray callback").fontSize(20).fontColor(Color.White).textAlign(TextAlign.Center)
            }.width('49%').height(60).margin({ top: 10 })
            .onClick(() => {
              let _this = this;
              this.audioStreamManager.getAudioEffectInfoArray(audio.StreamUsage[this.selectedStreamUsageKey], async (err, audioEffectInfoArray) => {
                if (err) {
                  _this.returnMsg = '\n收到回调啦\n' +`getAudioEffectInfoArray :ERROR: ${err}`
                  return;
                } else {
                  _this.returnMsg = '\n收到回调啦\n' +`The effect modes are: ${audioEffectInfoArray}`
                }
              });

            })

            Button() {
              Text("getAudioEffectInfoArray promise").fontSize(20).fontColor(Color.White).textAlign(TextAlign.Center)
            }.width('49%').height(60).margin({ top: 10 })
            .onClick(() => {
              let _this = this;
              this.audioStreamManager.getAudioEffectInfoArray(audio.StreamUsage[this.selectedStreamUsageKey]).then((audioEffectInfoArray) => {

                _this.returnMsg = '\n收到回调啦\n' +`The effect modes are: ${audioEffectInfoArray}`
              }).catch((err) => {
                _this.returnMsg = '\n收到回调啦\n' +`getAudioEffectInfoArray :ERROR: ${err}`
                return;
              });
            })
          }.width('100%')



          Row() {
            Text(this.onReturnMsg).fontSize(14)
          }.width('100%')

          Row() {

            Select(this.contentTypeSelectList)
              .value(this.selectedContentTypeKey)
              .onSelect(async (index, value) => {
                this.selectedContentTypeKey = value;
                this.getVolumeType(this.selectedContentTypeKey, this.selectedStreamUsageKey)
              })
          }.width('100%')

          Row() {

            Select(this.streamUsageSelectList)
              .value(this.selectedStreamUsageKey)
              .onSelect(async (index, value) => {
                this.selectedStreamUsageKey = value;
                this.getVolumeType(this.selectedContentTypeKey, this.selectedStreamUsageKey)
              })
          }.width('100%')

          Row() {
            Text("音频流类型").fontSize(20).margin({ left: 10 })
            Text(this.selectedVolumeTypeKey).fontSize(20).margin({ left: 10 }).fontWeight(FontWeight.Bold)
          }.width('100%')

          Row() {
            Button() {
              Text("isActive callback").fontSize(18).fontColor(Color.White).textAlign(TextAlign.Center)
            }.width('50%').height(60).margin({ top: 10 })
            .onClick(() => {
              let _this = this;
              this.audioStreamManager.isActive(audio.AudioVolumeType[this.selectedVolumeTypeKey], (err, value) => {
                if (err) {
                  _this.returnMsg = "isActive callback ERROR:" + JSON.stringify(err);
                  return;
                }
                _this.returnMsg = "isActive callback SUCCESS 返回值：" + value;
              });

            })

            Button() {
              Text("isActive promise").fontSize(18).fontColor(Color.White).textAlign(TextAlign.Center)
            }.width('50%').height(60).margin({ top: 10 })
            .onClick(() => {
              let _this = this;
              this.audioStreamManager.isActive(audio.AudioVolumeType[this.selectedVolumeTypeKey]).then(value => {
                _this.returnMsg = "isActive promise SUCCESS 返回值：" + value;
              }).catch(err => {
                _this.returnMsg = "isActive promise ERROR:" + JSON.stringify(err);
              });
            })
          }

          Row() {
            Button("createAudioRenderer")
              .fontSize(20)
              .height(40)
              .backgroundColor(Color.Pink)
              .fontColor(Color.Blue)
              .onClick(() => {
                if (this.renderIndex > 0) {
                  this.returnMsg += "AudioRenderer Created already,please don't create it again "
                  return
                }
                let _this = this;
                this.audioRendererOptions.rendererInfo.content = audio.ContentType[this.selectedContentTypeKey]
                this.audioRendererOptions.rendererInfo.usage = audio.StreamUsage[this.selectedStreamUsageKey]
                _this.returnMsg = "AudioRenderer audioRendererOptions:" + JSON.stringify(this.audioRendererOptions);
                audio.createAudioRenderer(this.audioRendererOptions, (err, data) => {
                  if (err) {
                    _this.returnMsg += "AudioRenderer Created Error:" + JSON.stringify(err);
                  } else {
                    _this.returnMsg += `AudioRenderer Created: Success: SUCCESS,返回值：${JSON.stringify(data)}`;
                    _this.audioRenderer = data;
                    _this.renderIndex++;
                  }
                });
              })
            Button("start")
              .fontSize(20)
              .height(40)
              .backgroundColor(Color.Pink)
              .fontColor(Color.Blue)
              .onClick(async () => {
                try {
                  await this.audioRenderer.start();
                  this.returnMsg += `AudioRenderer Start Success\n`
                } catch (err) {
                  this.returnMsg += `AudioRenderer Start Error:${JSON.stringify(err)}`
                }
              })
          }.height(40).margin({ top: 10 })

          Row() {
            Button("write")
              .fontSize(20)
              .height(40)
              .backgroundColor(Color.Pink)
              .fontColor(Color.Blue)
              .onClick(async () => {
                try {
                  let bufferSize = await this.audioRenderer.getBufferSize();
                  this.returnMsg += `bufferSize:${bufferSize}\n`
                  let path = globalThis.pathDir + '/test_44100_2.wav';
                  this.returnMsg += `path:${path}\n`
                  let stat = await fs.stat(path);
                  this.returnMsg += `stat:${JSON.stringify(stat)}\n`;
                  this.returnMsg += `size:${stat.size}\n`;
                  let len = stat.size % bufferSize == 0 ? Math.floor(stat.size / bufferSize) : Math.floor(stat.size / bufferSize + 1);

                  let file = await fs.open(path, 0o0);
                  this.returnMsg += `fd:${file.fd}\n`;

                  let buf = new ArrayBuffer(bufferSize);
                  this.returnMsg += `audioRenderer write start.......... \n`;
                  for (let i = 0;i < len; i++) {
                    let options = {
                      offset: i * bufferSize,
                      length: bufferSize
                    }
                    let readsize = await fs.read(file.fd, buf, options);
                    let writeSize = await this.audioRenderer.write(buf);
                  }
                  this.returnMsg += `audioRenderer write end. \n`;
                } catch (err) {
                  this.returnMsg += `AudioRenderer write Error:${JSON.stringify(err)}`
                }
              })
            Button("pause")
              .fontSize(20)
              .height(40)
              .backgroundColor(Color.Pink)
              .fontColor(Color.Blue)
              .onClick(async () => {
                try {
                  await this.audioRenderer.pause();
                  this.returnMsg += `audioRenderer pause Success \n`;
                } catch (err) {
                  this.returnMsg += `AudioRenderer Pause Error:${JSON.stringify(err)}`
                }
              })
          }.height(40).margin({ top: 10 })

          Row() {
            Button("stop")
              .fontSize(20)
              .height(40)
              .backgroundColor(Color.Pink)
              .fontColor(Color.Blue)
              .onClick(async () => {
                try {
                  await this.audioRenderer.stop();
                  this.returnMsg += `audioRenderer stop Success \n`;
                } catch (err) {
                  this.returnMsg += `AudioRenderer Stop Error:${JSON.stringify(err)}`
                }
              })
            Button("release")
              .fontSize(20)
              .height(40)
              .backgroundColor(Color.Pink)
              .fontColor(Color.Blue)
              .onClick(async () => {
                try {
                  await this.audioRenderer.release();
                  this.returnMsg += `audioRenderer release Success \n`;
                  this.renderIndex = 0;
                } catch (err) {
                  this.returnMsg += `AudioRenderer release Error:${JSON.stringify(err)}`
                }
              })
          }.height(40).margin({ top: 10 })

        }.width('100%').margin({ top: 210 });
      }.width('100%')

    }.height('100%').width('100%')
    .height('100%').width('100%')

  }
}