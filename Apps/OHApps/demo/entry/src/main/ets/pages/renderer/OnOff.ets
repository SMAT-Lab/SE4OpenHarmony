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
struct OnOff {
  private audioRendererOptions  = {
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
  @State returnMsg: string = `hello`
  @State onReturnMsg: string = `hello`
  @State onMarkReachReturnMsg: string = `hello`
  @State onPeriodReachReturnMsg: string = `hello`
  @State bufferSize: number = 0
  @State path: string = globalThis.pathDir + '/test_44100_2.wav';
  @State markReachFrame: number = 1000
  @State periodReachFrame: number = 1000
  private audioManager = null;
  private audioStreamManager = null;

  aboutToAppear() {
    this.audioManager = audio.getAudioManager();
    this.audioStreamManager = this.audioManager.getStreamManager()
  }

  onMarkReach() {
    if (this.audioRenderer == null) {
      this.returnMsg = `audioRenderer instance had not created,dont‘t allow to onMarkReach `
      return
    }
    let _this = this
    _this.onMarkReachReturnMsg = "markReach 已监听"
    _this.audioRenderer.on('markReach', _this.markReachFrame, (position) => {
      if (position == _this.markReachFrame) {
        _this.onMarkReachReturnMsg = `ON Triggered successfully markReachFrame:${_this.markReachFrame} `
      }
    })
  }

  offMarkReach() {
    if (this.audioRenderer == null) {
      this.onMarkReachReturnMsg = `audioRenderer instance had not created,dont‘t allow to offMarkReach `
      return
    }
    this.audioRenderer.off('markReach');
    this.onMarkReachReturnMsg = "markReach 已取消监听"
  }

  onPeriodReach() {
    if (this.audioRenderer == null) {
      this.returnMsg = `AudioCapturer instance had not created,dont‘t allow to onPeriodReach `
      return
    }

    let _this = this
    _this.onPeriodReachReturnMsg = "periodReach 已监听"
    _this.audioRenderer.on('periodReach', _this.periodReachFrame, (position) => {
      if (position == _this.periodReachFrame) {
        _this.onPeriodReachReturnMsg = `ON Triggered successfully periodReachFrame:${_this.periodReachFrame} `
      }
    });
  }

  offPeriodReach() {
    if (this.audioRenderer == null) {
      this.returnMsg = `audioRenderer instance had not created,dont‘t allow to PeriodReach `
      return
    }
    this.audioRenderer.off('periodReach');
    this.onPeriodReachReturnMsg = "periodReach 已取消监听"
  }

  onStateChange() {
    if (this.audioRenderer == null) {
      this.returnMsg = `audioRenderer instance had not created,dont‘t allow to PeriodReach `
      return
    }
    let _this = this
    _this.onReturnMsg ="stateChange 已监听"
    _this.audioRenderer.on('stateChange', (state) => {
      _this.onReturnMsg = `audio capturer state is: ${state}`
    });
  }

  onAudioRendererChange(){
    let _this = this
    _this.returnMsg = `onAudioRendererChange 注册成功\n`
    this.audioStreamManager.on('audioRendererChange',  (AudioRendererChangeInfoArray) => {
      _this.returnMsg = `AudioRendererChangeInfoArray : ${JSON.stringify(AudioRendererChangeInfoArray)}\n`
    });

  }

  offAudioRendererChange(){
    let _this = this
    this.audioStreamManager.off('audioRendererChange');
    _this.returnMsg = `off audioRendererChange success \n`

  }

  createAudioRenderer() {
    if (this.audioRenderer !== null) {
      this.returnMsg = `audioRenderer Created already,don't create anymore`
      return
    }
    let _this = this
    audio.createAudioRenderer(this.audioRendererOptions, async (err, data) => {
      if (err) {
        _this.returnMsg = `audioRenderer Created : Error: ${JSON.stringify(err)}`
      } else {
        _this.audioRenderer = data;
        _this.returnMsg = `audioRenderer Created : SUCCESS,state:${_this.audioRenderer.state}\n`
        _this.onReturnMsg="无监听"
        _this.onPeriodReachReturnMsg="无监听"
        _this.onMarkReachReturnMsg="无监听"
      }
    })
  }

  rendererStart() {
    if (this.audioRenderer == null) {
      this.returnMsg = `audioRenderer instance had not created,dont‘t allow to start\n`
      return
    }
    let _this = this
    this.audioRenderer.start((err) => {
      if (err) {
        _this.returnMsg = `audioRenderer start : Error: ${JSON.stringify(err)}\n`
      } else {
        _this.returnMsg = `audioRenderer start : SUCCESS,state:${_this.audioRenderer.state}\n`
      }
    });
  }

  getBufferSize() {
    if (this.audioRenderer == null) {
      this.returnMsg = `audioRenderer instance had not created,dont‘t allow to getBufferSize`
      return
    }
    let _this = this
    _this.audioRenderer.getBufferSize((err, bufferSize) => {
      if (err) {
        _this.returnMsg = `audioRenderer getBufferSize : Error: ${JSON.stringify(err)}\n`
      } else {
        _this.returnMsg = `audioRenderer getBufferSize : SUCCESS,bufferSize:${bufferSize},state:${_this.audioRenderer.state}\n`
        _this.bufferSize = bufferSize
      }
    });
  }

  async writeRenderer() {
    if (this.audioRenderer == null) {
      this.returnMsg += `audioRenderer instance had not created,dont‘t allow to read\n`
      return
    }
    if (this.bufferSize == 0) {
      this.bufferSize = await this.audioRenderer.getBufferSize()
    }

    let _this = this
    let path = this.path
    try {
      let stat = await fs.stat(path);
      let len = stat.size % this.bufferSize == 0 ? Math.floor(stat.size / this.bufferSize) : Math.floor(stat.size / this.bufferSize + 1);
      let file = await fs.open(path, 0o0);
      let buf = new ArrayBuffer(this.bufferSize);
      this.returnMsg = `audioRenderer write start.......... \n`;
      while(true){
        for (let i = 0;i < len; i++) {
          let options = {
            offset: i * this.bufferSize,
            length: this.bufferSize
          }
          let readsize = await fs.read(file.fd, buf, options);
          let writeSize = await new Promise((resolve,reject)=>{
            this.audioRenderer.write(buf,(err,writeSize)=>{
              if(err){
                reject(err)
              }else{
                resolve(writeSize)
              }
            })
          })
        }
      }
      this.returnMsg += `audioRenderer write end. \n`;
      _this.returnMsg += `audioRenderer read end, state:${_this.audioRenderer.state}\n`
    } catch (err) {
      this.returnMsg += `audioRenderer write : Error: ${JSON.stringify(err)}\n`
    }
  }

  stopRenderer() {
    if (this.audioRenderer == null) {
      this.returnMsg = `audioRenderer instance had not created,dont‘t allow to stop\n`
      return
    }
    let _this = this
    _this.audioRenderer.stop((err) => {
      if (err) {
        _this.returnMsg = `audioRenderer stop : Error: ${JSON.stringify(err)}\n`
      } else {
        _this.returnMsg = `audioRenderer stop : SUCCESS,state:${_this.audioRenderer.state}\n`
      }
    })
  }

  pauseRenderer() {
    if (this.audioRenderer == null) {
      this.returnMsg = `audioRenderer instance had not created,dont‘t allow to pause\n`
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
      this.returnMsg = `audioRenderer instance had not created,dont‘t allow to release\n`
      return
    }
    let _this = this
    _this.audioRenderer.release((err) => {
      if (err) {
        _this.returnMsg = `audioRenderer release : Error: ${JSON.stringify(err)}\n`
      } else {
        _this.returnMsg = `audioRenderer release SUCCESS,state:${_this.audioRenderer.state}\n`
        _this.audioRenderer = null
      }
    })
  }

  build() {
    Column() {
      Row() {
        Column() {
          Text("【音频渲染-监听】返回数据：").fontWeight(FontWeight.Bolder).position({ x: 10, y: 5 }).fontSize(18)
          Text(this.returnMsg).position({ x: 10, y: 30 }).fontSize(14)
        }.width('98%').height(120).backgroundColor(Color.Orange).position({ x: '1%' })
      }.position({ x: 0, y: 0 }).width('100%').zIndex(999)

      Scroll() {
        Column() {
          Text("markReach").fontSize(24)
          Row() {
            Slider({
              value: this.markReachFrame,
              min: 0,
              max: 10000,
              step: 1000,
              style: SliderStyle.InSet
            })
              .blockColor('#191970')
              .trackColor('#ADD8E6')
              .selectedColor('#4169E1')
              .showTips(true)
              .onChange((value: number, mode: SliderChangeMode) => {
                this.markReachFrame = value;
                console.info('value:' + value + 'mode:' + mode.toString());
              })
              .width('80%')
            Text(this.markReachFrame.toFixed(0)).fontSize(24)
          }

          Row() {
            Button() {
              Text("on('markReach')").fontSize(22).fontColor(Color.White)
            }.width('71%').height(60).onClick(() => this.onMarkReach())

            Button() {
              Text("off").fontSize(22).fontColor(Color.White)
            }.width('29%').height(60).onClick(() => this.offMarkReach())
          }.margin({ top: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

          Text(this.onMarkReachReturnMsg).fontSize(24)

          Text("periodReach").fontSize(24).margin({ top: 30 })
          Row() {
            Slider({
              value: this.periodReachFrame,
              min: 0,
              max: 10000,
              step: 1000,
              style: SliderStyle.InSet
            })
              .blockColor('#191970')
              .trackColor('#ADD8E6')
              .selectedColor('#4169E1')
              .showTips(true)
              .onChange((value: number, mode: SliderChangeMode) => {
                this.periodReachFrame = value;
                console.info('value:' + value + 'mode:' + mode.toString());
              })
              .width('80%')
            Text(this.periodReachFrame.toFixed(0)).fontSize(24)
          }

          Row() {
            Button() {
              Text("on('periodReach')").fontSize(22).fontColor(Color.White)
            }.width('71%').height(60).onClick(() => this.onPeriodReach())

            Button() {
              Text("off").fontSize(22).fontColor(Color.White)
            }.width('29%').height(60).onClick(() => this.offPeriodReach())
          }.margin({ top: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

          Text(this.onPeriodReachReturnMsg).fontSize(24)

          Row() {
            Button() {
              Text("on('stateChange')").fontSize(22).fontColor(Color.White)
            }.width('100%').height(60).onClick(() => {
              this.onStateChange()
            })
          }.margin({ top: 30 }).width('100%')

          Row() {
            Button() {
              Text("onAudioRendererChange").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => {
              this.onAudioRendererChange()
            })

            Button() {
              Text("offAudioRendererChange").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => {
              this.offAudioRendererChange()
            })

          }.margin({ top: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)


          Row() {
            Button() {
              Text("createAudioRenderer").fontSize(22).fontColor(Color.Blue)
            }.width('80%').height(60).backgroundColor(Color.Pink).onClick(() => {
              this.createAudioRenderer()
            })

            Button() {
              Text("start").fontSize(22).fontColor(Color.Blue)
            }.width('20%').height(60).backgroundColor(Color.Pink).onClick(() => {
              this.rendererStart()
            })
          }.margin({ top: 10 }).width('100%')

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

        }.width('100%')
      }.margin({ top: 130 }).width('100%')
    }
  }
}