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
struct Setting {
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
  @State path: string = globalThis.pathDir + '/test_44100_2.wav';
  @State volume: number = 0
  @State rate: number = 0

 async onBackPress(){
   if (this.audioRenderer == null) {
     this.returnMsg += `audioRenderer instance had not created\n`
     return
   }
    await this.audioRenderer.release()
   this.audioRenderer=null
  }

  setRenderRateCallback(){
    if (this.audioRenderer == null) {
      this.returnMsg += `audioRenderer instance had not created,dont‘t allow to setRenderRateCallback\n`
      return
    }
    let _this=this
    this.audioRenderer.setRenderRate(this.rate, (err) => {
      if (err) {
        _this.returnMsg = `audioRenderer setRenderRate callback : Error: ${JSON.stringify(err)}`
      } else {
        _this.returnMsg = `audioRenderer setRenderRate callback : Success`
      }
    })
  }

  setRenderRatePromise(){
    if (this.audioRenderer == null) {
      this.returnMsg += `audioRenderer instance had not created,dont‘t allow to setRenderRateCallback\n`
      return
    }
    let _this=this
    this.audioRenderer.setRenderRate(this.rate)
      .then(()=>{
        _this.returnMsg = `audioRenderer setRenderRate promise : Success`
      })
      .catch(err=>{
        _this.returnMsg = `audioRenderer setRenderRate promise : Error: ${JSON.stringify(err)}`
      })
  }

  getRenderRateCallback(){
    if (this.audioRenderer == null) {
      this.returnMsg += `audioRenderer instance had not created,dont‘t allow to setRenderRateCallback\n`
      return
    }
    let _this=this
    this.audioRenderer.getRenderRate((err, renderrate) => {
      if (err) {
        _this.returnMsg = `audioRenderer getRenderRate callback : Error: ${JSON.stringify(err)}`
      } else {
        _this.returnMsg = `audioRenderer getRenderRate callback : Success,返回值：${renderrate}`
      }
    })
  }

  getRenderRatePromise(){
    if (this.audioRenderer == null) {
      this.returnMsg += `audioRenderer instance had not created,dont‘t allow to setRenderRateCallback\n`
      return
    }
    let _this=this
    this.audioRenderer.getRenderRate()
      .then(renderrate=>{
        _this.returnMsg = `audioRenderer getRenderRate promise : Success,返回值：${renderrate}`
      })
      .catch(err=>{
        _this.returnMsg = `audioRenderer getRenderRate promise : Error: ${JSON.stringify(err)}`
      })

  }

  setVolumeCallback(){
    if (this.audioRenderer == null) {
      this.returnMsg += `audioRenderer instance had not created,dont‘t allow to setRenderRateCallback\n`
      return
    }
    let _this=this
    this.audioRenderer.setVolume(this.volume,(err)=>{
      if(err){
        _this.returnMsg = `audioRenderer setVolume callback : Error: ${JSON.stringify(err)}`
      }else{
        _this.returnMsg = `audioRenderer setVolume callback : Success`
      }
    })
  }

  setVolumePromise(){
    if (this.audioRenderer == null) {
      this.returnMsg += `audioRenderer instance had not created,dont‘t allow to setRenderRateCallback\n`
      return
    }
    let _this=this
    this.audioRenderer.setVolume(this.volume).then(()=>{
      _this.returnMsg = `audioRenderer setVolume promise : Success`
    }).catch((err) => {
      _this.returnMsg = `audioRenderer setVolume promise : Error: ${JSON.stringify(err)}`
    })
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
      while(true){
        for (let i = 0;i < len; i++) {
          let options = {
            offset: i * bufferSize,
            length: bufferSize
          }
          let readsize = await fs.read(file.fd, buf, options);
          let writeSize = await this.audioRenderer.write(buf);
        }
      }
      this.returnMsg += `audioRenderer write end. \n`;
    } catch (err) {
      this.returnMsg += `audioRenderer write : Error: ${JSON.stringify(err)}\n`
    }
  }

  build() {
    Column() {
      Row() {
        Column() {
          Text("【音频渲染-设置】返回数据：").fontWeight(FontWeight.Bolder).position({ x: 10, y: 5 }).fontSize(18)
          Text(this.returnMsg).position({ x: 10, y: 30 }).fontSize(14)
        }.width('98%').height(120).backgroundColor(Color.Orange).position({ x: '1%' })
      }.position({ x: 0, y: 0 }).width('100%').zIndex(999)

      Scroll() {
        Column() {
          Text("播放速度设置").fontSize(24)
          Row() {
            Slider({
              value: this.rate,
              min: 0,
              max: 2,
              step: 1,
              style: SliderStyle.InSet
            })
              .blockColor('#191970')
              .trackColor('#ADD8E6')
              .selectedColor('#4169E1')
              .showTips(true)
              .onChange((value: number, mode: SliderChangeMode) => {
                this.rate = value;
                console.info('value:' + value + 'mode:' + mode.toString());
              })
              .width('80%')
            Text(this.rate.toFixed(0)).fontSize(24)
          }

          Row() {
            Button() {
              Text("setRenderRate callback").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => this.setRenderRateCallback())

            Button() {
              Text("setRenderRate promise").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => this.setRenderRatePromise())
          }.margin({ top: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Button() {
              Text("getRenderRate callback").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => this.getRenderRateCallback())

            Button() {
              Text("getRenderRate promise").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => this.getRenderRatePromise())
          }.margin({ top: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)



          Text("音量设置").fontSize(24).margin({ top: 30 })
          Row() {
            Slider({
              value: this.volume,
              min: 0,
              max: 1,
              step: 0.1,
              style: SliderStyle.InSet
            })
              .blockColor('#191970')
              .trackColor('#ADD8E6')
              .selectedColor('#4169E1')
              .showTips(true)
              .onChange((value: number, mode: SliderChangeMode) => {
                this.volume = value;
                console.info('value:' + value + 'mode:' + mode.toString());
              })
              .width('80%')
            Text(this.volume.toFixed(1)).fontSize(24)
          }

          Row() {
            Button() {
              Text("setVolume callback").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => this.setVolumeCallback())

            Button() {
              Text("setVolume promise").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => this.setVolumePromise())
          }.margin({ top: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Button() {
              Text("播放音乐").fontSize(22).fontColor(Color.Blue)
            }.width('100%').height(60).onClick(() => this.renderPlay()).backgroundColor(Color.Pink)

          }.margin({ top: 20, bottom: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)
        }.width('100%')
      }.margin({ top: 130 }).width('100%')
    }
  }
}