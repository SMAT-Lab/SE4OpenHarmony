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
struct MultiInstance {
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
  private audioRenderers = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
  private paths=[globalThis.pathDir + '/test_44100_2.wav',globalThis.pathDir + '/safe_and_sound_32.wav',globalThis.pathDir + '/test_44100_2.wav',globalThis.pathDir + '/safe_and_sound_32.wav',globalThis.pathDir + '/test_44100_2.wav',globalThis.pathDir + '/safe_and_sound_32.wav',
    globalThis.pathDir + '/test_44100_2.wav',globalThis.pathDir + '/safe_and_sound_32.wav',globalThis.pathDir + '/test_44100_2.wav',globalThis.pathDir + '/safe_and_sound_32.wav',globalThis.pathDir + '/test_44100_2.wav',globalThis.pathDir + '/safe_and_sound_32.wav',
    globalThis.pathDir + '/test_44100_2.wav',globalThis.pathDir + '/safe_and_sound_32.wav',globalThis.pathDir + '/test_44100_2.wav',globalThis.pathDir + '/safe_and_sound_32.wav',globalThis.pathDir + '/test_44100_2.wav']
  @State returnMsg: string = `hello`

  @State bufferSize: number = 0
  private arr=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
  private writeArr=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  aboutToAppear() {

  }
  async onBackPress(){
    if (this.audioRenderers[0] !== null) {
       await this.audioRenderers[0].release()
    }
    if (this.audioRenderers[1] !== null) {
       await this.audioRenderers[1].release()
    }
    if (this.audioRenderers[2] !== null) {
      await this.audioRenderers[2].release()
    }
    if (this.audioRenderers[3] !== null) {
      await this.audioRenderers[3].release()
    }
    if (this.audioRenderers[4] !== null) {
      await this.audioRenderers[4].release()
    }
    if (this.audioRenderers[5] !== null) {
      await this.audioRenderers[5].release()
    }
    if (this.audioRenderers[6] !== null) {
      await this.audioRenderers[6].release()
    }
    if (this.audioRenderers[7] !== null) {
      await this.audioRenderers[7].release()
    }
    if (this.audioRenderers[8] !== null) {
      await this.audioRenderers[8].release()
    }
    if (this.audioRenderers[9] !== null) {
      await this.audioRenderers[9].release()
    }
    if (this.audioRenderers[10] !== null) {
      await this.audioRenderers[10].release()
    }
    if (this.audioRenderers[11] !== null) {
      await this.audioRenderers[11].release()
    }
    if (this.audioRenderers[12] !== null) {
      await this.audioRenderers[12].release()
    }
    if (this.audioRenderers[13] !== null) {
      await this.audioRenderers[13].release()
    }
    if (this.audioRenderers[14] !== null) {
      await this.audioRenderers[14].release()
    }
    if (this.audioRenderers[15] !== null) {
      await this.audioRenderers[15].release()
    }
    if (this.audioRenderers[16] !== null) {
      await this.audioRenderers[16].release()
    }
    if (this.audioRenderers[17] !== null) {
      await this.audioRenderers[17].release()
    }

  }
  createAudioRenderer(index) {
    if (this.audioRenderers[index] !== null) {
      this.returnMsg = `audioRenderer ${index} Created already,don't create anymore`
      return
    }
    let _this = this
    audio.createAudioRenderer(this.audioRendererOptions, async (err, data) => {
      if (err) {
        _this.returnMsg = `audioRenderer ${index} Created : Error: ${JSON.stringify(err)}`
      } else {
        _this.audioRenderers[index] = data;
        _this.returnMsg = `audioRenderer ${index} Created : SUCCESS,state:${_this.audioRenderers[index].state}\n`
      }
    })
  }

  rendererStart(index) {
    if (this.audioRenderers[index] == null) {
      this.returnMsg = `audioRenderer ${index} instance had not created,dont‘t allow to start\n`
      return
    }
    let _this = this
    this.audioRenderers[index].start((err) => {
      if (err) {
        _this.returnMsg = `audioRenderer ${index} start : Error: ${JSON.stringify(err)}\n`
      } else {
        _this.returnMsg = `audioRenderer ${index} start : SUCCESS,state:${_this.audioRenderers[index].state}\n`
      }
    });
  }

  getBufferSize(index) {
    if (this.audioRenderers[index] == null) {
      this.returnMsg = `audioRenderer ${index} instance had not created,dont‘t allow to getBufferSize`
      return
    }
    let _this = this
    _this.audioRenderers[index].getBufferSize((err, bufferSize) => {
      if (err) {
        _this.returnMsg = `audioRenderer ${index} getBufferSize : Error: ${JSON.stringify(err)}\n`
      } else {
        _this.returnMsg = `audioRenderer ${index} getBufferSize : SUCCESS,bufferSize:${bufferSize},state:${_this.audioRenderers[index].state}\n`
        _this.bufferSize = bufferSize
      }
    });
  }

  async writeRenderer(index) {
    if(this.writeArr[index]==1){
      this.returnMsg += `audioRenderer ${index} write already clicked`
      return
    }
    if (this.audioRenderers[index] == null) {
      this.returnMsg += `audioRenderer ${index} instance had not created,dont‘t allow to read\n`
      return
    }
    if (this.bufferSize == 0) {
      this.bufferSize = await this.audioRenderers[index].getBufferSize()
    }

    this.writeArr[index]=1

    let _this = this
    let path = this.paths[index]
    try {
      let stat = await fs.stat(path);
      let len = stat.size % this.bufferSize == 0 ? Math.floor(stat.size / this.bufferSize) : Math.floor(stat.size / this.bufferSize + 1);
      let file = await fs.open(path, 0o0);
      let buf = new ArrayBuffer(this.bufferSize);
      this.returnMsg = `audioRenderer ${index} write start.......... \n`;
      while(true){
        for (let i = 0;i < len; i++) {
          let options = {
            offset: i * this.bufferSize,
            length: this.bufferSize
          }
          let readsize = await fs.read(file.fd, buf, options);
          let writeSize = await new Promise((resolve,reject)=>{
            _this.audioRenderers[index].write(buf,(err,writeSize)=>{
              if(err){
                reject(err)
              }else{
                resolve(writeSize)
              }
            })
          })
        }
      }
      _this.returnMsg += `audioRenderer ${index} write end, state:${_this.audioRenderers[index].state}\n`
    } catch (err) {
      this.returnMsg += `audioRenderer ${index} write : Error: ${JSON.stringify(err)}\n`
    }
  }

  stopRenderer(index) {
    if (this.audioRenderers[index] == null) {
      this.returnMsg = `audioRenderer ${index} instance had not created,dont‘t allow to stop\n`
      return
    }
    let _this = this
    _this.audioRenderers[index].stop((err) => {
      if (err) {
        _this.returnMsg = `audioRenderer ${index} stop : Error: ${JSON.stringify(err)}\n`
      } else {
        _this.returnMsg = `audioRenderer ${index} stop : SUCCESS,state:${_this.audioRenderers[index].state}\n`
      }
    })
  }

  pauseRenderer(index) {
    if (this.audioRenderers[index] == null) {
      this.returnMsg = `audioRenderer ${index} instance had not created,dont‘t allow to pause\n`
      return
    }
    let _this = this
    _this.audioRenderers[index].pause((err) => {
      if (err) {
        _this.returnMsg = `audioRenderer ${index} pause : Error: ${JSON.stringify(err)}\n`
      } else {
        _this.returnMsg = `audioRenderer ${index} pause : SUCCESS,state:${_this.audioRenderers[index].state}\n`
      }
    })
  }

  setAudioEffectNone(index) {
    if (this.audioRenderers[index] == null) {
      this.returnMsg = `audioRenderer ${index} instance had not created,dont‘t allow to set audioEffectNone\n`
      return
    }
    let _this = this
    _this.audioRenderers[index].setAudioEffectMode(audio.AudioEffectMode.EFFECT_NONE).then(() => {
      _this.returnMsg = `audioRenderer ${index} setAudioEffectNone : SUCCESS\n`
    }).catch((err) => {
      _this.returnMsg = `audioRenderer ${index} setAudioEffectNone : Error: ${JSON.stringify(err)}\n`
    });
  }
  setAudioEffectDefault(index) {
    if (this.audioRenderers[index] == null) {
      this.returnMsg = `audioRenderer ${index} instance had not created,dont‘t allow to set audioEffectNone\n`
      return
    }
    let _this = this
    _this.audioRenderers[index].setAudioEffectMode(audio.AudioEffectMode.EFFECT_DEFAULT).then(() => {
      _this.returnMsg = `audioRenderer ${index} setAudioEffectDefault : SUCCESS\n`
    }).catch((err) => {
      _this.returnMsg = `audioRenderer ${index} setAudioEffectDefault : Error: ${JSON.stringify(err)}\n`
    });
  }

  getAudioEffectMode(index) {
    if (this.audioRenderers[index] == null) {
      this.returnMsg = `audioRenderer ${index} instance had not created,dont‘t allow to set audioEffectNone\n`
      return
    }
    let _this = this
    _this.audioRenderers[index].getAudioEffectMode().then((effectmode) => {
      _this.returnMsg = `audioRenderer ${index} getAudioEffectMode : SUCCESS,AudioEffectMode:${effectmode}\n`
    }).catch((err) => {
      _this.returnMsg = `audioRenderer ${index} getAudioEffectMode : Error: ${JSON.stringify(err)}\n`
    });
  }


  releaseRenderer(index) {
    if (this.audioRenderers[index] == null) {
      this.returnMsg = `audioRenderer ${index} instance had not created,dont‘t allow to release\n`
      return
    }
    let _this = this
    _this.audioRenderers[index].release((err) => {
      if (err) {
        _this.returnMsg = `audioRenderer ${index} release : Error: ${JSON.stringify(err)}\n`
      } else {
        _this.returnMsg = `audioRenderer ${index} release SUCCESS,state:${_this.audioRenderers[index].state}\n`
        _this.audioRenderers[index] = null
        _this.writeArr[index]=0
      }
    })
  }

  build() {
    Column() {
      Row() {
        Column() {
          Text("【音频渲染-多实例】返回数据：").fontWeight(FontWeight.Bolder).position({ x: 10, y: 5 }).fontSize(18)
          Text(this.returnMsg).position({ x: 10, y: 30 }).fontSize(14)
        }.width('98%').height(120).backgroundColor(Color.Orange).position({ x: '1%' })
      }.position({ x: 0, y: 0 }).width('100%').zIndex(999)

      Scroll() {
        Column() {
          ForEach(this.arr, (item: number) => {
            Row() {
              Button() {
                Text("createAudioRenderer").fontSize(22).fontColor(Color.Blue)
              }.width('80%').height(60).backgroundColor(Color.Pink).onClick(() => {
                this.createAudioRenderer(item)
              })

              Button() {
                Text("start").fontSize(22).fontColor(Color.Blue)
              }.width('20%').height(60).backgroundColor(Color.Pink).onClick(() => {
                this.rendererStart(item)
              })
            }.margin({ top: 10 }).width('100%')


            Row() {
              Button() {
                Text("write").fontSize(22).fontColor(Color.Blue)
              }.width('49%').height(60).backgroundColor(Color.Pink).onClick(() => {
                this.writeRenderer(item)
              })

              Button() {
                Text("pause").fontSize(22).fontColor(Color.Blue)
              }.width('49%').height(60).backgroundColor(Color.Pink).onClick(() => {
                this.pauseRenderer(item)
              })
            }.margin({ top: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)
            Row() {
              Button() {
                Text("setAudioEffectNone").fontSize(22).fontColor(Color.Blue)
              }.width('49%').height(60).backgroundColor(Color.Pink).onClick(() => {
                this.setAudioEffectNone(item)
              })

              Button() {
                Text("setAudioEffectDefault").fontSize(22).fontColor(Color.Blue)
              }.width('49%').height(60).backgroundColor(Color.Pink).onClick(() => {
                this.setAudioEffectDefault(item)
              })
            }.margin({ top: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

            Row() {
              Button() {
                Text("stop").fontSize(22).fontColor(Color.Blue)
              }.width('49%').height(60).backgroundColor(Color.Pink).onClick(() => this.stopRenderer(item))

              Button() {
                Text("getAudioEffectMode").fontSize(22).fontColor(Color.Blue)
              }.width('49%').height(60).backgroundColor(Color.Pink).onClick(() => this.getAudioEffectMode(item))
            }.margin({ top: 10, bottom: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

            Row() {
              Button() {
                Text("release").fontSize(22).fontColor(Color.Blue)
              }.width('100%').height(60).backgroundColor(Color.Pink).onClick(() => {
                this.releaseRenderer(item)
              })


            }.margin({ top: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)
            Divider().strokeWidth(10).color(Color.Blue)
          }, (item: number) => item.toString())
        }.width('100%')
      }.margin({ top: 130 }).width('100%')

    }
  }
}