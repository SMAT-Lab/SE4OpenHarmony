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
struct SingleInstancePromise {
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
  private audioEffectMode = null
  private audioManager = null;
  private audioStreamManager = null;
  private samplingRateList = []
  @State selectedSamplingRateKey: string = "SAMPLE_RATE_44100"
  private channelsList = []
  @State selectedChannelKey: string = "CHANNEL_2"
  private sampleFormatList = []
  @State selectedsampleFormatKey: string = "SAMPLE_FORMAT_S16LE"
  private encodingTypeList = []
  @State selectedEncodingTypeKey: string = "ENCODING_TYPE_RAW"
  private contentTypeList = []
  @State selectedContentTypeKey: string = "CONTENT_TYPE_SPEECH"
  private streamUsageList = []
  @State selectedStreamUsageKey: string = "STREAM_USAGE_VOICE_COMMUNICATION"
  private AudioEffectModeList = []
  @State selectedAudioEffectModeKey: string = "EFFECT_DEFAULT"
  @State returnMsg: string = `hello`
  @State bufferSize: number = 0
  @State isBlockingRead: boolean = true
  @State path: string = globalThis.pathDir + '/test_44100_2.wav'
  @State isWrite:boolean=false
  aboutToAppear() {

    for (let key in audio.AudioSamplingRate) {
      this.samplingRateList.push({ value: key })
    }
    for (let key in audio.AudioChannel) {
      this.channelsList.push({ value: key })
    }
    for (let key in audio.AudioSampleFormat) {
      this.sampleFormatList.push({ value: key })
    }
    for (let key in audio.AudioEncodingType) {
      this.encodingTypeList.push({ value: key })
    }
    for (let key in audio.ContentType) {
      this.contentTypeList.push({ value: key })
    }
    for (let key in audio.StreamUsage) {
      this.streamUsageList.push({ value: key })
    }
    for (let key in audio.AudioEffectMode) {
      this.AudioEffectModeList.push({ value: key })
    }

    this.audioManager = audio.getAudioManager();
    this.audioStreamManager = this.audioManager.getStreamManager()

  }

  async onBackPress(){
    if(this.audioRenderer!==null){
      await this.audioRenderer.release()
    }
  }

  createAudioRenderer() {
    if (this.audioRenderer !== null) {
      this.returnMsg = `audioRenderer Created already,don't create anymore`
      return
    }
    let _this = this
    audio.createAudioRenderer(this.audioRendererOptions)
      .then(data => {
        _this.audioRenderer = data;
        _this.returnMsg = `audioRenderer Created : SUCCESS,state:${_this.audioRenderer.state}\n`
      }).catch(err => {
      _this.returnMsg = `audioRenderer Created : Error: ${JSON.stringify(err)}`
    })
  }

  onAudioRendererChange(){
    //    if (this.audioRenderer == null) {
    //      this.returnMsg = `audioRenderer instance had not created,dont‘t allow to start\n`
    //      return
    //    }

    let _this = this
    _this.returnMsg = `onAudioRendererChange 注册成功\n`
    this.audioStreamManager.on('audioRendererChange',  (AudioRendererChangeInfoArray) => {
      _this.returnMsg = `AudioRendererChangeInfoArray : ${JSON.stringify(AudioRendererChangeInfoArray)}\n`
    });

  }

  offAudioRendererChange(){
    //    if (this.audioRenderer == null) {
    //      this.returnMsg = `audioRenderer instance had not created,dont‘t allow to start\n`
    //      return
    //    }
    let _this = this
    this.audioStreamManager.off('audioRendererChange');
    _this.returnMsg = `off audioRendererChange success \n`

  }
  rendererStart() {
    if (this.audioRenderer == null) {
      this.returnMsg = `audioRenderer instance had not created,dont‘t allow to start\n`
      return
    }
    let _this = this
    this.audioRenderer.start()
      .then(() => {
        _this.returnMsg = `audioRenderer start : SUCCESS,state:${_this.audioRenderer.state}\n`
      }).catch(err => {
      _this.returnMsg = `audioRenderer start : Error: ${JSON.stringify(err)}\n`
    })
  }

  getBufferSize() {
    if (this.audioRenderer == null) {
      this.returnMsg = `audioRenderer instance had not created,dont‘t allow to getBufferSize`
      return
    }
    let _this = this
    _this.audioRenderer.getBufferSize()
      .then(bufferSize => {
        _this.returnMsg = `audioRenderer getBufferSize : SUCCESS,bufferSize:${bufferSize},state:${_this.audioRenderer.state}\n`
        _this.bufferSize = bufferSize
      }).catch(err => {
      _this.returnMsg = `audioRenderer getBufferSize : Error: ${JSON.stringify(err)}\n`
    })
  }

  async writeRenderer() {
    if (this.audioRenderer == null) {
      this.returnMsg += `audioRenderer instance had not created,dont‘t allow to read\n`
      return
    }
    if(this.isWrite===true){
      this.returnMsg += `不要重复点击write按钮 \n`
      return
    }
    this.isWrite=true

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
      while (true) {
        for (let i = 0;i < len; i++) {
          let options = {
            offset: i * this.bufferSize,
            length: this.bufferSize
          }
          let readsize = await fs.read(file.fd, buf, options)
          let writeSize = await this.audioRenderer.write(buf)
        }
      }
      this.returnMsg += `audioRenderer write end. \n`;
      _this.returnMsg += `audioRenderer read end, state:${_this.audioRenderer.state}\n`
    } catch (err) {
      this.returnMsg += `audioRenderer write : Error: ${JSON.stringify(err)}\n`
    }
  }

  drainRenderer(){
    if (this.audioRenderer == null) {
      this.returnMsg = `audioRenderer instance had not created,dont‘t allow to drain\n`
      return
    }
    let _this = this
    _this.audioRenderer.drain()
      .then(()=>{
        _this.returnMsg = `audioRenderer drain : SUCCESS,state:${_this.audioRenderer.state}\n`
      })
      .catch(err=>{
        _this.returnMsg = `audioRenderer drain : Error: ${JSON.stringify(err)}\n`
      })
  }

  stopRenderer() {
    if (this.audioRenderer == null) {
      this.returnMsg = `audioRenderer instance had not created,dont‘t allow to stop\n`
      return
    }
    let _this = this
    _this.audioRenderer.stop()
      .then(() => {
        _this.returnMsg = `audioRenderer stop : SUCCESS,state:${_this.audioRenderer.state}\n`
      })
      .catch(err => {
        _this.returnMsg = `audioRenderer stop : Error: ${JSON.stringify(err)}\n`
      })
  }

  pauseRenderer() {
    if (this.audioRenderer == null) {
      this.returnMsg = `audioRenderer instance had not created,dont‘t allow to pause\n`
      return
    }
    let _this = this
    _this.audioRenderer.pause()
      .then(() => {
        _this.returnMsg = `audioRenderer pause : SUCCESS,state:${_this.audioRenderer.state}\n`
      })
      .catch(err => {
        _this.returnMsg = `audioRenderer pause : Error: ${JSON.stringify(err)}\n`
      })
  }
  setAudioEffectMode() {
    if (this.audioRenderer == null) {
      this.returnMsg = `audioRenderer instance had not created,dont‘t allow to setAudioEffectMode\n`
      return
    }
    let _this = this

    _this.audioRenderer.setAudioEffectMode(this.audioEffectMode).then(() => {
      _this.returnMsg = `audioRenderer setAudioEffectMode : SUCCESS,AudioEffectMode:${this.audioEffectMode}\n`
    }).catch((err) => {
      _this.returnMsg = `audioRenderer setAudioEffectMode : Error: ${JSON.stringify(err)}\n`
    });
  }

  getAudioEffectMode() {
    if (this.audioRenderer == null) {
      this.returnMsg = `audioRenderer instance had not created,dont‘t allow to setAudioEffectMode\n`
      return
    }
    let _this = this

    _this.audioRenderer.getAudioEffectMode().then((effectmode) => {
      _this.returnMsg = `audioRenderer getAudioEffectMode : SUCCESS,AudioEffectMode:${effectmode}\n`
    }).catch((err) => {
      _this.returnMsg = `audioRenderer getAudioEffectMode : Error: ${JSON.stringify(err)}\n`
    });
  }

  releaseRenderer() {
    if (this.audioRenderer == null) {
      this.returnMsg = `audioRenderer instance had not created,dont‘t allow to release\n`
      return
    }
    let _this = this
    _this.audioRenderer.release()
      .then(() => {
        _this.returnMsg = `audioRenderer release SUCCESS,state:${_this.audioRenderer.state}\n`
        _this.audioRenderer = null
        _this.isWrite=false
      })
      .catch(err => {
        _this.returnMsg = `audioRenderer release : Error: ${JSON.stringify(err)}\n`
      })
  }
  getCurrentAudioRendererInfoArray(){
    //    if (this.audioRenderer == null) {
    //      this.returnMsg += `audioRenderer instance had not created,dont‘t allow to getRendererInfo\n`
    //      return
    //    }
    let _this = this
    this.audioStreamManager.getCurrentAudioRendererInfoArray(async (err, AudioRendererChangeInfoArray) => {
      console.info('getCurrentAudioRendererInfoArray **** Get Callback Called ****');
      if (err) {
        _this.returnMsg = `getCurrentAudioRendererInfoArray :ERROR: ${err}`;
      } else {
        if (AudioRendererChangeInfoArray != null) {
          _this.returnMsg = `getCurrentAudioRendererInfoArray :SUCCESS: ${JSON.stringify(AudioRendererChangeInfoArray)}`
        }
      }
    });
  }

  getRendererInfo() {
    if (this.audioRenderer == null) {
      this.returnMsg += `audioRenderer instance had not created,dont‘t allow to getRendererInfo\n`
      return
    }
    let _this = this
    _this.audioRenderer.getRendererInfo()
      .then(rendererInfo => {
        _this.returnMsg = `audioRenderer getRendererInfo : Success: ${JSON.stringify(rendererInfo)}`
      })
      .catch(err => {
        _this.returnMsg = `audioRenderer getRendererInfo : Error: ${JSON.stringify(err)}`
      })
  }

  getStreamInfo() {
    if (this.audioRenderer == null) {
      this.returnMsg += `audioRenderer instance had not created,dont‘t allow to getStreamInfo\n`
      return
    }
    let _this = this
    _this.audioRenderer.getStreamInfo()
      .then(streamInfo => {
        _this.returnMsg = `audioRenderer getStreamInfo : Success: ${JSON.stringify(streamInfo)}`
      })
      .catch(err => {
        _this.returnMsg = `audioRenderer getStreamInfo : Error: ${JSON.stringify(err)}`
      })
  }

  getAudioTime() {
    if (this.audioRenderer == null) {
      this.returnMsg += `audioRenderer instance had not created,dont‘t allow to getAudioTime\n`
      return
    }
    let _this = this
    _this.audioRenderer.getAudioTime()
      .then(timestamp => {
        _this.returnMsg = `audioRenderer getAudioTime Current timestamp: ${JSON.stringify(timestamp)}`
      })
      .catch(err => {
        _this.returnMsg = `audioRenderer getAudioTime : Error: ${JSON.stringify(err)}`
      })
  }

  getAudioStreamId() {
    if (this.audioRenderer == null) {
      this.returnMsg += `audioRenderer instance had not created,dont‘t allow to getAudioStreamId\n`
      return
    }
    let _this = this
    _this.audioRenderer.getAudioStreamId()
      .then(streamid => {
        _this.returnMsg = `audioRenderer GetStreamId: ${streamid}`
      })
      .catch(err => {
        _this.returnMsg = `audioRenderer GetStreamId : Error: ${JSON.stringify(err)}`
      })
  }

  build() {
    Column() {
      Row() {
        Column() {
          Text("【音频渲染-单实例-Promise】返回数据：").fontWeight(FontWeight.Bolder).position({ x: 10, y: 5 }).fontSize(18)
          Text(this.returnMsg).position({ x: 10, y: 30 }).fontSize(14)
        }.width('98%').height(300).backgroundColor(Color.Orange).position({ x: '1%' })
      }.position({ x: 0, y: 0 }).width('100%').zIndex(999)

      Scroll() {
        Column() {
          Row() {
            Select(this.samplingRateList).value(this.selectedSamplingRateKey)
              .onSelect((index, value) => {
                this.selectedSamplingRateKey = value
                this.audioRendererOptions.streamInfo.samplingRate = audio.AudioSamplingRate[value]

              }).font({ size: 22 })
          }.margin({ top: 0 })

          Row() {
            Select(this.channelsList).value(this.selectedChannelKey)
              .onSelect((index, value) => {
                this.selectedChannelKey = value
                this.audioRendererOptions.streamInfo.channels = audio.AudioChannel[value]
              })
          }.margin({ top: 10 })

          Row() {
            Select(this.sampleFormatList).value(this.selectedsampleFormatKey)
              .onSelect((index, value) => {
                this.selectedsampleFormatKey = value
                this.audioRendererOptions.streamInfo.sampleFormat = audio.AudioSampleFormat[value]
              })
          }.margin({ top: 10 })

          Row() {
            Select(this.encodingTypeList).value(this.selectedEncodingTypeKey)
              .onSelect((index, value) => {
                this.selectedEncodingTypeKey = value
                this.audioRendererOptions.streamInfo.encodingType = audio.AudioEncodingType[value]
              })
          }.margin({ top: 10 })
          Divider().strokeWidth(6).color(Color.Blue)

          Row() {
            Select(this.contentTypeList).value(this.selectedContentTypeKey)
              .onSelect((index, value) => {
                this.selectedContentTypeKey = value
                this.audioRendererOptions.rendererInfo.content = audio.ContentType[value]
              })
          }.margin({ top: 10 })

          Row() {
            Select(this.streamUsageList).value(this.selectedStreamUsageKey)
              .onSelect((index, value) => {
                this.selectedStreamUsageKey = value
                this.audioRendererOptions.rendererInfo.usage = audio.StreamUsage[value]
              })
          }.margin({ top: 10 })
          Row() {
            Select(this.AudioEffectModeList).value(this.selectedAudioEffectModeKey)
              .onSelect((index, value) => {
                this.selectedAudioEffectModeKey = value
                this.audioEffectMode = audio.AudioEffectMode[value]
              })
          }.margin({ top: 10 })


          Row() {
            Button() {
              Text("createAudioRenderer callback").fontSize(22).fontColor(Color.White)
            }.width('100%').height(60).onClick(() => {
              this.createAudioRenderer()
            })
          }.margin({ top: 10 }).width('100%')

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
              Text("start callback").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => {
              this.rendererStart()
            })

            Button() {
              Text("getBufferSize callback").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => {
              this.getBufferSize()
            })

          }.margin({ top: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)


          Row() {
            Button() {
              Text("write callback").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => {
              this.writeRenderer()
            })

            Button() {
              Text("drain callback").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => {
              this.drainRenderer()
            })

          }.margin({ top: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Button() {
              Text("pause callback").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => {
              this.pauseRenderer()
            })
            Button() {
              Text("stop callback").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => this.stopRenderer())


          }.margin({ top: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Button() {
              Text("setAudioEffectMode callback").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => {
              this.setAudioEffectMode()
            })
            Button() {
              Text("getAudioEffectMode callback").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => this.getAudioEffectMode())


          }.margin({ top: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)


          Row() {
            Button() {
              Text("release callback").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => this.releaseRenderer())

            Button() {
              Text("getCurrentAudioRendererInfoArray").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => this.getCurrentAudioRendererInfoArray())
          }.margin({ top: 10 }).width('100%')


          Row() {
            Button() {
              Text("getRendererInfo callback").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => this.getRendererInfo())

            Button() {
              Text("getStreamInfo callback").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => this.getStreamInfo())
          }.margin({ top: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Button() {
              Text("getAudioStreamId callback").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => this.getAudioStreamId())

            Button() {
              Text("getAudioTime callback").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => this.getAudioTime())
          }.margin({ top: 10, bottom: 20 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

        }.width('100%')
      }.margin({ top: 310 }).width('100%')
    }
  }
}