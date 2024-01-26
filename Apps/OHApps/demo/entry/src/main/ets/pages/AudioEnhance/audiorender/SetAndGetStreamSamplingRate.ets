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
struct SetAndGetStreamSamplingRate {
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
  @State returnMsg: string = ``
  @State rate: number = 0
  @State path: string = globalThis.pathDir + '/test_44100_2.wav';
  private samplingRateList = []
  @State samplerate: number = 44100
  @State selectedSamplingRateKey: string = "SAMPLE_RATE_44100"

  aboutToAppear() {
    for (let key in audio.AudioSamplingRate) {
      this.samplingRateList.push({ value: key })
    }
  }

  async onBackPress() {
    if (this.audioRenderer == null) {
      this.returnMsg += `audioRenderer instance had not created\n`
      return
    }
    await this.audioRenderer.release()
    this.audioRenderer = null
  }

  async renderPlay() {
    try {
      this.audioRenderer = await audio.createAudioRenderer(this.audioRendererOptions)
      this.returnMsg += `audioRenderer create success \n`
    } catch (err) {
      this.returnMsg += `audioRenderer create : Error: ${JSON.stringify(err)}\n`
      return
    }
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
      }
      // }
      this.returnMsg += `audioRenderer write end. \n`;
    } catch (err) {
      this.returnMsg += `audioRenderer write : Error: ${JSON.stringify(err)}\n`
    }
  }

  setRendererSamplingRatePromise() {
    if (this.audioRenderer == null) {
      this.returnMsg = `audioRenderer instance had not created,dont‘t allow to setRendererSamplingRate\n`
      return
    }
    let _this = this
    _this.audioRenderer.setRendererSamplingRate(_this.samplerate)
      .then(() => {
        _this.returnMsg = `audioRenderer setRendererSamplingRatePromise promise : Success`
      })
      .catch(err => {
        _this.returnMsg = `audioRenderer setRendererSamplingRatePromise promise : Error: ${JSON.stringify(err)}`
      })
  }

  setRendererSamplingRateCallback() {
    if (this.audioRenderer == null) {
      this.returnMsg = `audioRenderer instance had not created,dont‘t allow to setRendererSamplingRate\n`
      return
    }
    let _this = this
    _this.audioRenderer.setRendererSamplingRate(_this.samplerate, (err) => {
      if (err) {
        _this.returnMsg = `audioRenderer setRendererSamplingRate : Error: ${JSON.stringify(err)}\n`
      } else {
        _this.returnMsg = `audioRenderer setRendererSamplingRate : SUCCESS\n`
      }
    })
  }

  getRendererSamplingRatePromise() {
    if (this.audioRenderer == null) {
      this.returnMsg = `audioRenderer instance had not created,dont‘t allow to getRendererSamplingRate\n`
      return
    }
    let _this = this
    _this.audioRenderer.getRendererSamplingRate()
      .then(samplerate => {
        _this.returnMsg = `audioRenderer getRendererSamplingRate promise : Success,返回值：${samplerate}`
      })
      .catch(err => {
        _this.returnMsg = `audioRenderer getRendererSamplingRate promise : Error: ${JSON.stringify(err)}`
      })
  }

  getRendererSamplingRateCallback() {
    if (this.audioRenderer == null) {
      this.returnMsg = `audioRenderer instance had not created,dont‘t allow to getRendererSamplingRate\n`
      return
    }
    let _this = this
    _this.audioRenderer.getRendererSamplingRate((err, data) => {
      if (err) {
        _this.returnMsg = `audioRenderer getRendererSamplingRate : Error: ${JSON.stringify(err)}\n`
      } else {
        _this.returnMsg = `audioRenderer getRendererSamplingRate : SUCCESS,data:${JSON.stringify(data)}\n`
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
            Button() {
              Text("创建AudioRender").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => this.createRender()).backgroundColor(Color.Pink)

            Button() {
              Text("播放音乐").fontSize(22).fontColor(Color.Blue)
            }.width('49%').height(60).onClick(() => this.renderPlay()).backgroundColor(Color.Pink)
          }.margin({ top: 20, bottom: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Text("采样率选择:").fontSize(24)
            Select(this.samplingRateList).value(this.selectedSamplingRateKey)
              .onSelect((index, value) => {
                this.selectedSamplingRateKey = value
                this.samplerate = audio.AudioSamplingRate[value]
              }).font({ size: 22 })
          }.margin({ top: 20, bottom: 10 }).width('80%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Button() {
              Text("设置stream播放速率promise").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => this.setRendererSamplingRatePromise())

            Button() {
              Text("获取stream播放速率promise").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => this.getRendererSamplingRatePromise())
          }.margin({ top: 20, bottom: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Button() {
              Text("设置stream播放速率Callback").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => this.setRendererSamplingRateCallback())

            Button() {
              Text("获取stream播放速率Callback").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => this.getRendererSamplingRateCallback())
          }.margin({ top: 20, bottom: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)
        }.width('100%')
      }.margin({ top: 230 }).width('100%')
    }
  }
}
