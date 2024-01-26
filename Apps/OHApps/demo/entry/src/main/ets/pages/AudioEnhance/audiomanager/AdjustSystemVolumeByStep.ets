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
struct AdjustSystemVolumeByStep {
  private audioRendererOptions = {
    streamInfo: {
      samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_44100,
      channels: audio.AudioChannel.CHANNEL_2,
      sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
      encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
    },
    rendererInfo: {
      content: audio.ContentType.CONTENT_TYPE_SPEECH,
      usage: audio.StreamUsage.STREAM_USAGE_VOICE_COMMUNICATION,
      rendererFlags: 0
    }
  }
  private audioRenderer = null
  @State returnMsg: string = ''
  private audioVolumeGroupManager = null;
  @State selectedVolumeTypeKey: string = "请选择"
  @State selectedVolumeType: number = -1; //音量类型
  private volumeTypeSelectList = []
  @State selectedVolume: number = 0; //音量大小
  @State minVolume: number = 0;
  @State maxVolume: number = 15;
  private audioVolumeManager = null;
  private audioManager = null;
  @State path: string = globalThis.pathDir + '/test_44100_2.wav';
  @State selectedContentTypeKey: string = "CONTENT_TYPE_MUSIC"
  @State selectedStreamUsageKey: string = "STREAM_USAGE_MEDIA"
  @State volumeAdjustzUp: number = 0;
  @State volumeAdjustDown: number = 1;
  private renderInfo = {
    'RINGTONE': {
      main: {
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_RINGTONE,
        rendererFlags: 0
      },
      info: {
        selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey: 'STREAM_USAGE_RINGTONE'
      }
    },
    'MEDIA': {
      main: {
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
        rendererFlags: 0
      },
      info: {
        selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey: 'STREAM_USAGE_MEDIA'
      }
    },
    'VOICE_CALL': {
      main: {
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_VOICE_COMMUNICATION,
        rendererFlags: 0
      },
      info: {
        selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey: 'STREAM_USAGE_VOICE_COMMUNICATION'
      }
    },
    'VOICE_ASSISTANT': {
      main: {
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_VOICE_ASSISTANT,
        rendererFlags: 0
      },
      info: {
        selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey: 'STREAM_USAGE_VOICE_ASSISTANT'
      }
    },
    'ALL': {
      main: {
        content: audio.ContentType.CONTENT_TYPE_SPEECH,
        usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
        rendererFlags: 0
      },
      info: {
        selectedContentTypeKey: 'CONTENT_TYPE_SPEECH',
        selectedStreamUsageKey: 'STREAM_USAGE_MEDIA'
      }
    },
    'ALARM': {
      main: {
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_ALARM,
        rendererFlags: 0
      },
      info: {
        selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey: 'STREAM_USAGE_ALARM'
      }
    },
    'ACCESSIBILITY': {
      main: {
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_ACCESSIBILITY,
        rendererFlags: 0
      },
      info: {
        selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey: 'STREAM_USAGE_ACCESSIBILITY'
      }
    },
    'ULTRASONIC': {
      main: {
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_ULTRASONIC,
        rendererFlags: 0
      },
      info: {
        selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey: 'STREAM_USAGE_ULTRASONIC'
      }
    },
    '_MUSIC': {
      main: {
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_MUSIC,
        rendererFlags: 0
      },
      info: {
        selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey: 'STREAM_USAGE_MUSIC'
      }
    },
    '_MESSAGE': {
      main: {
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_VOICE_MESSAGE,
        rendererFlags: 0
      },
      info: {
        selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey: 'STREAM_USAGE_VOICE_MESSAGE'
      }
    },
    '_NOTIFICATION': {
      main: {
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_NOTIFICATION,
        rendererFlags: 0
      },
      info: {
        selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey: 'STREAM_USAGE_NOTIFICATION'
      }
    }
  ,
    '_SYSTEM': {
      main: {
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_SYSTEM,
        rendererFlags: 0
      },
      info: {
        selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey: 'STREAM_USAGE_SYSTEM'
      }
    },
    '_MOVIE': {
      main: {
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_MOVIE,
        rendererFlags: 0
      },
      info: {
        selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey: 'STREAM_USAGE_MOVIE'
      }
    },
    '_UNKNOWN': {
      main: {
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_UNKNOWN,
        rendererFlags: 0
      },
      info: {
        selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey: 'STREAM_USAGE_UNKNOWN'
      }
    }
  ,
    '_GAME': {
      main: {
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_GAME,
        rendererFlags: 0
      },
      info: {
        selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey: 'STREAM_USAGE_GAME'
      }
    },
    '_AUDIOBOOK': {
      main: {
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_AUDIOBOOK,
        rendererFlags: 0
      },
      info: {
        selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey: 'STREAM_USAGE_AUDIOBOOK'
      }
    },
    '_NAVIGATION': {
      main: {
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_NAVIGATION,
        rendererFlags: 0
      },
      info: {
        selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey: 'STREAM_USAGE_NAVIGATION'
      }
    }
  ,
    '_DTMF': {
      main: {
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_DTMF,
        rendererFlags: 0
      },
      info: {
        selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey: 'STREAM_USAGE_DTMF'
      }
    },
    '_ENFORCED_TONE': {
      main: {
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_ENFORCED_TONE,
        rendererFlags: 0
      },
      info: {
        selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey: 'STREAM_USAGE_ENFORCED_TONE'
      }
    }

  }

  async aboutToAppear() {
    for (let key in audio.AudioVolumeType) {
      this.volumeTypeSelectList.push({ value: key })
    }
    this.volumeTypeSelectList.push({ value: '_MUSIC' })
    this.volumeTypeSelectList.push({ value: '_MESSAGE' })
    this.volumeTypeSelectList.push({ value: '_NOTIFICATION' })
    this.volumeTypeSelectList.push({ value: '_SYSTEM' })
    this.volumeTypeSelectList.push({ value: '_MOVIE' })
    this.volumeTypeSelectList.push({ value: '_UNKNOWN' })
    this.volumeTypeSelectList.push({ value: '_GAME' })
    this.volumeTypeSelectList.push({ value: '_AUDIOBOOK' })
    this.volumeTypeSelectList.push({ value: '_NAVIGATION' })
    this.volumeTypeSelectList.push({ value: '_DTMF' })
    this.volumeTypeSelectList.push({ value: '_ENFORCED_TONE' })

    this.audioManager = audio.getAudioManager();
    this.audioVolumeManager = this.audioManager.getVolumeManager();
    let groupid = audio.DEFAULT_VOLUME_GROUP_ID;
    let _this = this;
    this.audioVolumeManager.getVolumeGroupManager(groupid, (err, value) => {
      if (err) {
        _this.returnMsg = "getVolumeGroupManager failed. err:" + JSON.stringify(err);
        _this.returnMsg += "groupid:" + groupid;
        return;
      }
      _this.returnMsg += "getVolumeGroupManager success";
      _this.audioVolumeGroupManager = value;
    });
  }

  async onBackPress() {
    if (this.audioRenderer !== null) {
      await this.audioRenderer.release()
      this.audioRenderer = null
    }
  }

  async renderPlay() {

    if (this.audioRenderer !== null) {
      await this.audioRenderer.release()
      this.audioRenderer = null
    }
    this.returnMsg = `audioRendererOptions ${JSON.stringify(this.audioRendererOptions)} \n`
    console.log(`audioRendererOptions ${JSON.stringify(this.audioRendererOptions)} \n`)

    try {
      this.audioRenderer = await audio.createAudioRenderer(this.audioRendererOptions)
      this.returnMsg = `audioRenderer create success \n`
    } catch (err) {
      this.returnMsg = `audioRenderer create : Error: ${JSON.stringify(err)}\n`
      return
    }
    let bufferSize
    try {
      bufferSize = await this.audioRenderer.getBufferSize()
      this.returnMsg = `audioRenderer getBufferSize success,bufferSize:${bufferSize} \n`
      await this.audioRenderer.start()
      this.returnMsg = `audioRenderer start success \n`
    } catch (err) {
      this.returnMsg = `audioRenderer start : Error: ${JSON.stringify(err)}\n`
      return
    }
    let path = this.path
    try {
      this.returnMsg = `path:${path}\n`
      let stat = await fs.stat(path);
      this.returnMsg = `stat:${JSON.stringify(stat)}\n`;
      this.returnMsg = `size:${stat.size}\n`;
      let len = stat.size % bufferSize == 0 ? Math.floor(stat.size / bufferSize) : Math.floor(stat.size / bufferSize + 1);

      let file = await fs.open(path, 0o0);
      this.returnMsg = `fd:${file.fd}\n`;

      let buf = new ArrayBuffer(bufferSize);
      this.returnMsg = `audioRenderer write start.......... \n`;
      for (let i = 0;i < len; i++) {
        if (this.audioRenderer.state > 2) {
          return;
        }
        let options = {
          offset: i * bufferSize,
          length: bufferSize
        }
        let readsize = await fs.read(file.fd, buf, options);
        let writeSize = await this.audioRenderer.write(buf);
      }
      this.returnMsg = `audioRenderer write end. \n`;
    } catch (err) {
      this.returnMsg = `audioRenderer write : Error: ${JSON.stringify(err)}\n`
    }

    await this.audioRenderer.release()
    this.audioRenderer = null

  }

  async getVolumeRange() {
    this.minVolume = await this.audioVolumeGroupManager.getMinVolume(this.selectedVolumeType);
    this.maxVolume = await this.audioVolumeGroupManager.getMaxVolume(this.selectedVolumeType);
    this.returnMsg = "minVolume:" + this.minVolume + "; maxVolume:" + this.maxVolume;
  }

  build() {

    Row() {
      Row() {
        Column() {
          Text("【音量】返回数据：").fontWeight(FontWeight.Bolder).position({ x: 10, y: 5 }).fontSize(18)
          Text(this.returnMsg).position({ x: 10, y: 30 }).fontSize(14)
        }
        .width('98%')
        .height(70)
        .backgroundColor(Color.Orange)
        .position({ x: '1%' })
        .zIndex(999)
      }.position({ x: 0, y: 0 }).width('100%');
      Scroll() {

        Column() {
          Column() {
            Row() {
              Select(this.volumeTypeSelectList)
                .value(this.selectedVolumeTypeKey)
                .onSelect(async (index, value) => {
                  this.selectedVolumeType = audio.AudioVolumeType[value];
                  this.selectedVolumeTypeKey = value;

                  this.audioRendererOptions.rendererInfo = this.renderInfo[this.selectedVolumeTypeKey].main
                  this.selectedStreamUsageKey = this.renderInfo[this.selectedVolumeTypeKey].info.selectedStreamUsageKey
                  this.selectedContentTypeKey = this.renderInfo[this.selectedVolumeTypeKey].info.selectedContentTypeKey

                  this.getVolumeRange();
                  if (this.audioRenderer !== null) {
                    await this.audioRenderer.release()
                    this.audioRenderer = null
                  }
                  this.renderPlay()

                })
            }

            if (this.selectedVolumeTypeKey !== "请选择") {

              Divider().strokeWidth(1).color(Color.Blue).margin({ bottom: 20 })
              Row() {
                Text("音量").fontSize(20)
                Slider({
                  value: this.selectedVolume,
                  min: this.minVolume,
                  max: this.maxVolume,
                  step: 1,
                  style: SliderStyle.InSet
                })
                  .blockColor('#191970')
                  .trackColor('#ADD8E6')
                  .selectedColor('#4169E1')
                  .showTips(true)
                  .onChange((value: number, mode: SliderChangeMode) => {
                    this.selectedVolume = value;
                    console.info('value:' + value + 'mode:' + mode.toString());
                  })
                  .width('80%')
                Text(this.selectedVolume.toFixed(0)).fontSize(24)
              }

              Text(`${this.selectedContentTypeKey}`).fontSize(16).lineHeight(40)
              Text(`${this.selectedStreamUsageKey}`).fontSize(16).lineHeight(40)
            }

          }.width('100%')

          Divider().strokeWidth(10).color(Color.Blue).margin({ top: 20 })

          Column() {
            Row() {
              Button() {
                Text("setVolume callback").fontSize(20).fontColor(Color.White)
              }.width('40%').height(60).margin({ right: 10 })
              .onClick(() => {
                if (this.selectedVolumeType == -1) {
                  this.returnMsg = "请选择音频流类型"
                  return
                }
                let _this = this;
                _this.returnMsg = this.selectedVolumeType.toString() + ',' + this.selectedVolume.toString()
                this.audioVolumeGroupManager.setVolume(this.selectedVolumeType, this.selectedVolume, (err, data) => {
                  if (err) {
                    _this.returnMsg = 'setVolumeCallback:' + JSON.stringify(err);
                    return;
                  }
                  _this.returnMsg = "setVolumeCallback:SUCCESS " + data;
                })
              })

              Button() {
                Text("setVolume promise").fontSize(20).fontColor(Color.White)
              }.width('40%').height(60)
              .onClick(async () => {
                if (this.selectedVolumeType == -1) {
                  this.returnMsg = "请选择音频流类型"
                  return
                }
                let _this = this;
                this.audioVolumeGroupManager.setVolume(this.selectedVolumeType, this.selectedVolume)
                  .then((err, data) => {
                    _this.returnMsg = "setVolumePromise:SUCCESS " + data;
                  })
                  .catch(err => {
                    _this.returnMsg = 'setVolumePromise err:' + JSON.stringify(err);
                  })
              })
            }

            Row() {
              Button() {
                Text("adjustSystemVolumeByStep_UP Callback").fontSize(20).fontColor(Color.White)
              }.width('49%').height(60).margin({ right: 10 })
              .onClick(() => {
                if (this.selectedVolumeType == -1) {
                  this.returnMsg = "请选择音频流类型"
                  return
                }
                let _this = this;
                this.audioVolumeGroupManager.adjustSystemVolumeByStep(this.selectedVolumeType, this.volumeAdjustzUp, (err, value) => {
                  if (err) {
                    _this.returnMsg = 'adjustSystemVolumeByStep_UP Callback err:' + JSON.stringify(err);
                    return;
                  }
                  _this.returnMsg = "adjustSystemVolumeByStep_UP Callback:SUCCESS 返回值 " + value;
                })
              })

              Button() {
                Text("adjustSystemVolumeByStep_UP Promise").fontSize(20).fontColor(Color.White)
              }.width('49%').height(60).margin({ right: 10 })
              .onClick(() => {
                if (this.selectedVolumeType == -1) {
                  this.returnMsg = "请选择音频流类型"
                  return
                }
                let _this = this;
                this.audioVolumeGroupManager.adjustSystemVolumeByStep(this.selectedVolumeType, this.volumeAdjustzUp)
                  .then(value => {
                    _this.returnMsg = "adjustSystemVolumeByStep_UP Promise:SUCCESS 返回值 " + value;
                  })
                  .catch((err) => {
                    _this.returnMsg = 'adjustSystemVolumeByStep_UP Promise err:' + JSON.stringify(err);
                  })
              })
            }.margin({ top: 10 })

            Row() {
              Button() {
                Text("adjustSystemVolumeByStep_DOWN Callback").fontSize(20).fontColor(Color.White)
              }.width('49%').height(60).margin({ right: 10 })
              .onClick(() => {
                if (this.selectedVolumeType == -1) {
                  this.returnMsg = "请选择音频流类型"
                  return
                }
                let _this = this;
                this.audioVolumeGroupManager.adjustSystemVolumeByStep(this.selectedVolumeType, this.volumeAdjustDown, (err, value) => {
                  if (err) {
                    _this.returnMsg = 'adjustSystemVolumeByStep_DOWN Callback err:' + JSON.stringify(err);
                    return;
                  }
                  _this.returnMsg = "adjustSystemVolumeByStep_DOWN Callback:SUCCESS 返回值 " + value;
                })
              })

              Button() {
                Text("adjustSystemVolumeByStep_DOWN Promise").fontSize(20).fontColor(Color.White)
              }.width('49%').height(60).margin({ right: 10 })
              .onClick(() => {
                if (this.selectedVolumeType == -1) {
                  this.returnMsg = "请选择音频流类型"
                  return
                }
                let _this = this;
                this.audioVolumeGroupManager.adjustSystemVolumeByStep(this.selectedVolumeType, this.volumeAdjustDown)
                  .then(value => {
                    _this.returnMsg = "adjustSystemVolumeByStep_DOWN Promise:SUCCESS 返回值 " + value;
                  })
                  .catch((err) => {
                    _this.returnMsg = 'adjustSystemVolumeByStep_DOWN Promise err:' + JSON.stringify(err);
                  })
              })
            }.margin({ top: 10 })

            Row() {
              Button() {
                Text("getVolume callback").fontSize(20).fontColor(Color.White)
              }.width('40%').height(60).margin({ right: 10 })
              .onClick((event) => {
                if (this.selectedVolumeType == -1) {
                  this.returnMsg = "请选择音频流类型"
                  return
                }
                let _this = this;
                this.audioVolumeGroupManager.getVolume(this.selectedVolumeType, (err, value) => {
                  if (err) {
                    _this.returnMsg = 'getVolumeCallback:' + JSON.stringify(err);
                  }
                  _this.returnMsg = "getVolumeCallback:SUCCESS,返回值:" + value
                })
              })

              Button() {
                Text("getVolume promise").fontSize(20).fontColor(Color.White)
              }.width('40%').height(60)
              .onClick((event) => {
                if (this.selectedVolumeType == -1) {
                  this.returnMsg = "请选择音频流类型"
                  return
                }
                let _this = this;
                this.audioVolumeGroupManager.getVolume(this.selectedVolumeType).then((value) => {
                  _this.returnMsg = "getVolumePromise:SUCCESS,返回值:" + value
                }).catch(err => {
                  _this.returnMsg = 'getVolumePromise:' + JSON.stringify(err);
                })
              })
            }.margin({ top: 10 })

          }.width('100%').margin({ top: 20 })
        }
      }.width('100%').margin({ top: 80 })
    }
    .height('100%').width('100%');

  }
}