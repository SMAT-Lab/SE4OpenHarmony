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
struct SetVolumeWithRamp {
  private audioRenderer = null
  @State returnMsg: string = ``
  private streamUsageList = []
  @State streamUsage: number = 1
  @State selectedStreamUsageKey: string = "STREAM_USAGE_MEDIA"
  private audioRendererOptions = {
    streamInfo: {
      samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_44100,
      channels: audio.AudioChannel.CHANNEL_2,
      sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
      encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
    },
    rendererInfo: {
      content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
      usage: this.streamUsage,
      rendererFlags: 0
    }
  }

  public pathValueList = []
  public pathList: string[] = ['/2ch_16bit_1.wav', '/safe_and_sound_32.wav']
  @State selectedPathKey: string = "/2ch_16bit_1.wav"
  public selectedpath: string = globalThis.pathDir +  '/2ch_16bit_1.wav'

  @State volume: number = 0

  public directionValueList = []
  public directionList: number[] = [0, 1, 5, 10, 15, 25, 50, 100, 200, 1000, 2000];
  public selectedDirection: number = 1000
  @State selectedDirectionKey: string = "1000"

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  aboutToAppear() {
    for (var i = 0; i < this.directionList.length; i++) {
      var key = this.directionList[i].toString();
      this.directionValueList.push({ value: key });
    }

    for (var i = 0; i < this.pathList.length; i++) {
      var key = this.pathList[i].toString();
      this.pathValueList.push({ value: key });
    }

    for (let key in audio.StreamUsage) {
      this.streamUsageList.push({ value: key })
    }
  }

  async onBackPress() {
    if (this.audioRenderer == null) {
      return
    }
    await this.audioRenderer.release()
    this.audioRenderer = null
  }

  createRenderer() {
    if (this.audioRenderer != null) {
      this.returnMsg = `audioRenderer instance had created,dont‘t allow to create\n`
      return
    }
    audio.createAudioRenderer(this.audioRendererOptions,(err, data) => {
      if (err) {
        this.returnMsg = `audioRenderer create : Error: ${JSON.stringify(err)}\n`
      } else {
        this.audioRenderer = data;
        this.returnMsg = `audioRenderer create : SUCCESS \n`
      }
    })
  }

  async startRenderer() {
    try {
      let path = this.selectedpath
      this.returnMsg += `path:${path}\n`
      let stat = await fs.stat(path);
      this.returnMsg += `stat:${JSON.stringify(stat)}\n`;
      let file = await fs.open(path, 0o0);
      this.returnMsg += `fd:${file.fd}\n`; //open file

      await this.sleep(1000);

      await this.audioRenderer.start((err)=>{
        if (err) {
          this.returnMsg += `audioRenderer start : Error: ${JSON.stringify(err)}\n`
        } else {
          this.returnMsg += `audioRenderer start success \n`
        }
      })
      let bufferSize
      await this.audioRenderer.getBufferSize((err, data)=> {
        if (err) {
          this.returnMsg += `audioRenderer getBufferSize : Error: ${JSON.stringify(err)}\n`
        } else {
          bufferSize = data;
          this.returnMsg += `audioRenderer getBufferSize success,bufferSize:${bufferSize} \n` // start,mode,buffersize
        }
      })
      await this.sleep(1000);

      let buf = new ArrayBuffer(bufferSize);
      this.returnMsg += `audioRenderer write start.......... \n`
      let len = stat.size % bufferSize == 0 ? Math.floor(stat.size / bufferSize) : Math.floor(stat.size / bufferSize + 1);
      for (let i = 0;i < len; i++) {
        let options = {
          offset: i * bufferSize,
          length: bufferSize
        }
        await fs.read(file.fd, buf, options);
        await this.audioRenderer.write(buf);
      }
      this.returnMsg += `audioRenderer write end.......... \n`
      await this.audioRenderer.drain((err) => {
        if (err) {
          this.returnMsg += `audioRenderer drain : Error: ${JSON.stringify(err)}\n`
        } else {
          this.returnMsg += `audioRenderer drain : SUCCESS\n`
        }
      })
    } catch(error) {
      this.returnMsg += `callbackPlay err ${JSON.stringify(error)} \n`
    }
  }

  stopRenderer() {
    if (this.audioRenderer == null) {
      this.returnMsg = `audioRenderer instance had not created,dont‘t allow to stop\n`
      return
    }
    this.audioRenderer.stop((err) => {
      if (err) {
        this.returnMsg  = `audioRenderer stop : Error: ${JSON.stringify(err)}\n`
      } else {
        this.returnMsg = `audioRenderer stop : SUCCESS \n`
      }
    })
  }

  releaseRenderer() {
    if (this.audioRenderer == null) {
      this.returnMsg = `audioRenderer instance had not created,dont‘t allow to release\n`
      return
    }
    this.audioRenderer.release((err) => {
      if (err) {
        this.returnMsg = `audioRenderer release : Error: ${JSON.stringify(err)}\n`
      } else {
        this.returnMsg = `audioRenderer release SUCCESS\n`
        this.audioRenderer = null
      }
    })
  }

  async setVolumeWithRamp() {
    let volume: number = this.volume;
    let direction: number = this.selectedDirection;
    try {
      this.audioRenderer.setVolumeWithRamp(volume, direction);
      this.returnMsg = `audioRenderer setVolumeWithRamp SUCCESS\n`
    }catch (error) {
      this.returnMsg = `audioRenderer setVolumeWithRamp : Error: ${JSON.stringify(error)}\n`
    }
  }

  async setVolume() {
    let volume: number = this.volume;
    try {
      this.audioRenderer.setVolume(volume);
      this.returnMsg = `audioRenderer setVolume ${volume} SUCCESS\n`
    }catch (error) {
      this.returnMsg = `audioRenderer setVolume ${volume} : Error: ${JSON.stringify(error)}\n`
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
          Text("set_音量选择(0.0-1.0)").fontSize(24).margin({ top: 30 })
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
            Text("set_时长选择:").fontSize(24)
            Select(this.directionValueList).value(this.selectedDirectionKey)
              .onSelect((index, value) => {
                this.selectedDirectionKey = value
                console.log(`selectedDirectionKey: ${value}`)
                this.selectedDirection = this.directionList[index]
                console.log(`selectedDirection: ${this.selectedDirection}`)
              }).font({ size: 22 })
          }.margin({ top: 15, bottom: 10 }).width('80%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Text("片源选择:").fontSize(24)
            Select(this.pathValueList).value(this.selectedPathKey)
              .onSelect((index, value) => {
                this.selectedPathKey = value
                console.log(`selectedPathKey: ${value}`)
                this.selectedpath = globalThis.pathDir + this.pathList[index]
                console.log(`path: ${this.selectedpath}`)
              }).font({ size: 22 })
          }.margin({ top: 15, bottom: 10 }).width('80%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Text("音频流选择:").fontSize(24)
            Select(this.streamUsageList).value(this.selectedStreamUsageKey)
              .onSelect((index, value) => {
                this.selectedStreamUsageKey = value
                this.streamUsage = audio.StreamUsage[value]
                console.log(`streamUsage: ${this.streamUsage}`)
              }).font({ size: 22 })
          }.margin({ top: 20, bottom: 10 }).width('80%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Button() {
              Text("setVolumeWithRamp同步接口").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => this.setVolumeWithRamp())

            Button() {
              Text("setVolume").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => this.setVolume())
          }.margin({ top: 20, bottom: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Button() {
              Text("create").fontSize(22).fontColor(Color.Blue)
            }.width('49%').height(60).backgroundColor(Color.Pink).onClick(() => this.createRenderer())
            Button() {
              Text("start").fontSize(22).fontColor(Color.Blue)
            }.width('49%').height(60).backgroundColor(Color.Pink).onClick(() => this.startRenderer())
          }.margin({ top: 20, bottom: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Button() {
              Text("stop").fontSize(22).fontColor(Color.Blue)
            }.width('49%').height(60).backgroundColor(Color.Pink).onClick(() => this.stopRenderer())

            Button() {
              Text("release").fontSize(22).fontColor(Color.Blue)
            }.width('49%').height(60).backgroundColor(Color.Pink).onClick(() => this.releaseRenderer())
          }.margin({ top: 20, bottom: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

          Divider().strokeWidth(10).color(Color.Blue)
        }.width('100%')
      }.margin({ top: 230 }).width('100%')
    }
  }
}
