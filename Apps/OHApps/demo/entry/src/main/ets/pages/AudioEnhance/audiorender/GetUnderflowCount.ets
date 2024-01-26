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
struct GetUnderflowCount {
  private audioRendererOptions = {
    streamInfo: {
      samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_44100,
      channels: audio.AudioChannel.CHANNEL_2,
      sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
      encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
    },
    rendererInfo: {
      content: audio.ContentType.CONTENT_TYPE_MUSIC,
      usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
      rendererFlags: 0
    }
  }
  private audioRenderer = null
  @State bufferSize: number = 0
  private writeArr = 0
  private streamTypeSelectList = []
  @State selectedVolumeTypeKey: string = "请选择"
  @State selectedContentTypeKey: string = "CONTENT_TYPE_MUSIC"
  @State selectedStreamUsageKey: string = "STREAM_USAGE_MEDIA"
  @State returnMsg: string = ``
  @State path: string = globalThis.pathDir + '/test_44100_2.wav';
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
      this.streamTypeSelectList.push({ value: key })
    }
    this.streamTypeSelectList.push({ value: '_MUSIC' })
    this.streamTypeSelectList.push({ value: '_MESSAGE' })
    this.streamTypeSelectList.push({ value: '_NOTIFICATION' })
    this.streamTypeSelectList.push({ value: '_SYSTEM' })
    this.streamTypeSelectList.push({ value: '_MOVIE' })
    this.streamTypeSelectList.push({ value: '_UNKNOWN' })
    this.streamTypeSelectList.push({ value: '_GAME' })
    this.streamTypeSelectList.push({ value: '_AUDIOBOOK' })
    this.streamTypeSelectList.push({ value: '_NAVIGATION' })
    this.streamTypeSelectList.push({ value: '_DTMF' })
    this.streamTypeSelectList.push({ value: '_ENFORCED_TONE' })
  };

  async onBackPress() {
    if (this.audioRenderer == null) {
      this.returnMsg += `audioRenderer instance had not created\n`
      return
    }
    await this.audioRenderer.release()
    this.audioRenderer = null
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async renderPlay() {

    let bufferSize
    try {
      bufferSize = await this.audioRenderer.getBufferSize()
      this.returnMsg += `audioRenderer getBufferSize success,bufferSize:${bufferSize} \n`
      await this.audioRenderer.start()
      this.returnMsg += `audioRenderer start success \n`
    } catch (err) {
      this.returnMsg += `audioRenderer start : Error: ${JSON.stringify(err)}\n`
      return
    }

    let path = this.path
    try {
      this.returnMsg += `path:${path}\n`
      let stat = await fs.stat(path);
      this.returnMsg += `stat:${JSON.stringify(stat)}\n`;
      this.returnMsg += `size:${stat.size}\n`;
      let len = stat.size % bufferSize == 0 ? Math.floor(stat.size / bufferSize) : Math.floor(stat.size / bufferSize + 1);

      let file = await fs.open(path, 0o0);
      this.returnMsg += `fd:${file.fd}\n`;

      let buf = new ArrayBuffer(bufferSize);
      this.returnMsg += `audioRenderer write start.......... \n`;
      // while(true){
      for (let i = 0;i < len; i++) {
        let options = {
          offset: i * bufferSize,
          length: bufferSize
        }
        let readsize = await fs.read(file.fd, buf, options);
        let writeSize = await this.audioRenderer.write(buf);
        if (i == len - 5) {
          this.sleep(3000);
        }
        if (i == len - 1) {
          this.sleep(1000);
        }
      }
      // }
      this.returnMsg += `audioRenderer write end. \n`;
    } catch (err) {
      this.returnMsg += `audioRenderer write : Error: ${JSON.stringify(err)}\n`
    }
  }

  rendererStart() {
    if (this.audioRenderer == null) {
      this.returnMsg = `audioRenderer  instance had not created,dont‘t allow to start\n`
      return
    }
    let _this = this
    this.audioRenderer.start((err) => {
      if (err) {
        _this.returnMsg = `audioRenderer  start : Error: ${JSON.stringify(err)}\n`
      } else {
        _this.returnMsg = `audioRenderer  start : SUCCESS,state:${_this.audioRenderer.state}\n`
      }
    });
  }

  getBufferSize() {
    if (this.audioRenderer == null) {
      this.returnMsg = `audioRenderer  instance had not created,dont‘t allow to getBufferSize`
      return
    }
    let _this = this
    _this.audioRenderer.getBufferSize((err, bufferSize) => {
      if (err) {
        _this.returnMsg = `audioRenderer  getBufferSize : Error: ${JSON.stringify(err)}\n`
      } else {
        _this.returnMsg = `audioRenderer getBufferSize : SUCCESS,bufferSize:${bufferSize},state:${_this.audioRenderer.state}\n`
        _this.bufferSize = bufferSize
      }
    });
  }

  async writeRenderer() {
    if (this.writeArr == 1) {
      this.returnMsg += `audioRenderer  write already clicked`
      return
    }
    if (this.audioRenderer == null) {
      this.returnMsg += `audioRenderer  instance had not created,dont‘t allow to read\n`
      return
    }
    if (this.bufferSize == 0) {
      this.bufferSize = await this.audioRenderer.getBufferSize()
    }

    this.writeArr = 1

    let _this = this
    let path = this.path
    try {
      let stat = await fs.stat(path);
      let len = stat.size % this.bufferSize == 0 ? Math.floor(stat.size / this.bufferSize) : Math.floor(stat.size / this.bufferSize + 1);
      let file = await fs.open(path, 0o0);
      let buf = new ArrayBuffer(this.bufferSize);
      this.returnMsg = `audioRenderer  write start.......... \n`;
      for (let i = 0;i < len; i++) {
        let options = {
          offset: i * this.bufferSize,
          length: this.bufferSize
        }
        let readsize = await fs.read(file.fd, buf, options);
        let writeSize = await new Promise((resolve, reject) => {
          _this.audioRenderer.write(buf, (err, writeSize) => {
            if (err) {
              reject(err)
            } else {
              resolve(writeSize)

              if (i == len - 1) {
                _this.sleep(1000);
              }


            }
          })
        })
      }
      _this.returnMsg += `audioRenderer  write end, state:${_this.audioRenderer.state}\n`
    } catch (err) {
      this.returnMsg += `audioRenderer  write : Error: ${JSON.stringify(err)}\n`
    }
  }

  async writeRendererOne() {


    let _this = this
    let path = this.path
    try {
      //      let stat = await fs.stat(path);
      //      let len = stat.size % this.bufferSize == 0 ? Math.floor(stat.size / this.bufferSize) : Math.floor(stat.size / this.bufferSize + 1);
      //      let file = await fs.open(path, 0o0);
      let buf = new ArrayBuffer(2048);
      this.returnMsg = `audioRenderer  write start.......... \n`;
      //      for (let i = 0;i < len; i++) {
      //        let options = {
      //          offset: i * this.bufferSize,
      //          length: this.bufferSize
      //        }
      //        let readsize = await fs.read(file.fd, buf, options);
      //        let writeSize = await new Promise((resolve,reject)=>{
      _this.audioRenderer.write(buf, (err, len) => {
        this.returnMsg = `drr audioRenderer  write len: ${len}`

        //            if(err){
        //              reject(err)
        //            }else{
        //              resolve(writeSize)
        //
        //              if(i == len -1){
        //                _this.sleep(1000);
        //              }
        //
        //
        //            }
      })
      //        })
      //      }
      _this.returnMsg += `audioRenderer  write end, state:${_this.audioRenderer.state}\n`
    } catch (err) {
      this.returnMsg += `audioRenderer  write : Error: ${JSON.stringify(err)}\n`
    }
  }

  stopRenderer() {
    if (this.audioRenderer == null) {
      this.returnMsg = `audioRenderer  instance had not created,dont‘t allow to stop\n`
      return
    }
    let _this = this
    _this.audioRenderer.stop((err) => {
      if (err) {
        _this.returnMsg = `audioRenderer  stop : Error: ${JSON.stringify(err)}\n`
      } else {
        _this.returnMsg = `audioRenderer  stop : SUCCESS,state:${_this.audioRenderer.state}\n`
      }
    })
  }

  pauseRenderer() {
    if (this.audioRenderer == null) {
      this.returnMsg = `audioRenderer  instance had not created,dont‘t allow to pause\n`
      return
    }
    let _this = this
    _this.audioRenderer.pause((err) => {
      if (err) {
        _this.returnMsg = `audioRenderer pause : Error: ${JSON.stringify(err)}\n`
      } else {
        _this.returnMsg = `audioRenderer pause : SUCCESS,state:${_this.audioRenderer.state}\n`
      }
    })
  }

  releaseRenderer() {
    if (this.audioRenderer == null) {
      this.returnMsg = `audioRenderer  instance had not created,dont‘t allow to release\n`
      return
    }
    let _this = this
    _this.audioRenderer.release((err) => {
      if (err) {
        _this.returnMsg = `audioRenderer  release : Error: ${JSON.stringify(err)}\n`
      } else {
        _this.returnMsg = `audioRenderer release SUCCESS,state:${_this.audioRenderer.state}\n`
        _this.audioRenderer = null
        _this.writeArr = 0
      }
    })
  }

  getUnderflowCountPromise() {
    if (this.audioRenderer == null) {
      this.returnMsg += `audioRenderer instance had not created,dont‘t allow to getUnderflowCountPromise\n`
      return
    }

    let _this = this
    this.audioRenderer.getUnderflowCount()
      .then(underflowCount => {
        _this.returnMsg = `audioRenderer getUnderflowCountPromise : Success, 返回值: ${underflowCount}`
      })
      .catch((err) => {
        _this.returnMsg = `audioRenderer getUnderflowCountPromise : Error: ${JSON.stringify(err)}`
      })
  }

  getUnderflowCountCallback() {
    if (this.audioRenderer == null) {
      this.returnMsg += `audioRenderer instance had not created,dont‘t allow to getUnderflowCountCallback\n`
      return
    }

    let _this = this
    this.audioRenderer.getUnderflowCount((err, underflowCount) => {
      if (err) {
        _this.returnMsg = `audioRenderer getUnderflowCountCallback  : Error: ${JSON.stringify(err)}`
      } else {
        _this.returnMsg = `audioRenderer getUnderflowCountCallback  : Success, 返回值: ${underflowCount}`
      }
    })
  }

  async createRender() {
    try {
      this.audioRenderer = await audio.createAudioRenderer(this.audioRendererOptions)
      this.returnMsg += `audioRenderer create success \n`
    } catch (err) {
      this.returnMsg += `audioRenderer create : Error: ${JSON.stringify(err)}\n`
      return
    }
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
            Select(this.streamTypeSelectList)
              .value(this.selectedVolumeTypeKey)
              .onSelect(async (index, value) => {
                //                this.selectedVolumeType = audio.AudioVolumeType[value];
                //                this.selectedVolumeTypeKey = value;

                this.audioRendererOptions.rendererInfo = this.renderInfo[this.selectedVolumeTypeKey].main
                this.selectedStreamUsageKey = this.renderInfo[this.selectedVolumeTypeKey].info.selectedStreamUsageKey
                this.selectedContentTypeKey = this.renderInfo[this.selectedVolumeTypeKey].info.selectedContentTypeKey

                //                this.getVolumeRange();
                if (this.audioRenderer !== null) {
                  await this.audioRenderer.release()
                  this.audioRenderer = null
                }
                //                this.renderPlay()

              })
          }

          Row() {
            Button() {
              Text("创建AudioRender").fontSize(22).fontColor(Color.Blue)
            }.width('49%').height(60).onClick(() => this.createRender()).backgroundColor(Color.Pink)

            Button() {
              Text("start").fontSize(22).fontColor(Color.Blue)
            }.width('49%').height(60).backgroundColor(Color.Pink).onClick(() => {
              this.rendererStart()
            })

            //            Button() {
            //              Text("播放音乐").fontSize(22).fontColor(Color.Blue)
            //            }.width('49%').height(60).onClick(() => this.renderPlay()).backgroundColor(Color.Pink)

          }.margin({ top: 20, bottom: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Button() {
              Text("write").fontSize(22).fontColor(Color.Blue)
            }.width('49%').height(60).backgroundColor(Color.Pink).onClick(() => {
              this.writeRenderer()
            })

            Button() {
              Text("pause").fontSize(22).fontColor(Color.Blue)
            }.width('49%').height(60).backgroundColor(Color.Pink).onClick(() => {
              this.pauseRenderer()
            })
          }.margin({ top: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Button() {
              Text("stop").fontSize(22).fontColor(Color.Blue)
            }.width('49%').height(60).backgroundColor(Color.Pink).onClick(() => this.stopRenderer())

            Button() {
              Text("release").fontSize(22).fontColor(Color.Blue)
            }.width('49%').height(60).backgroundColor(Color.Pink).onClick(() => this.releaseRenderer())
          }.margin({ top: 10, bottom: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Button() {
              Text("getUnderflowCount callback").fontSize(22).fontColor(Color.Blue)
            }.width('49%').height(60).onClick(() => this.getUnderflowCountCallback())

            Button() {
              Text("getUnderflowCount promise").fontSize(22).fontColor(Color.Blue)
            }.width('49%').height(60).onClick(() => this.getUnderflowCountPromise())
          }.margin({ top: 20, bottom: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Button() {
              Text("writeRendererOne").fontSize(22).fontColor(Color.Blue)
            }.width('100%').height(60).onClick(() => this.writeRendererOne())
          }.margin({ top: 20, bottom: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

        }.width('100%')
      }.margin({ top: 230 }).width('100%')
    }
  }
}