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
struct SetChannelBlendMode {
  private audioRendererOptions = {
    streamInfo: {
      samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_44100,
      channels: audio.AudioChannel.CHANNEL_2,
      sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
      encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
    },
    rendererInfo: {
      content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
      usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
      rendererFlags: 0
    }
  }
  private audioRenderer = null
  @State returnMsg: string = ``
  private channelBlendModeList = []
  @State channelBlendMode: number = 0
  @State selectedChannelBlendModeKey: string = 'MODE_DEFAULT'
  public pathValueList = []
  public pathList: string[] = ['/2ch_16bit.wav', '/3ch_16bit.wav', '/4ch_16bit.wav', '/5ch_16bit.wav', '/6ch_16bit.wav', '/7ch_16bit.wav', '/8ch_16bit.wav']
  @State selectedPathKey: string = "/2ch_16bit.wav"
  public selectedpath: string = globalThis.pathDir + '/2ch_16bit.wav'

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  aboutToAppear() {
    for (var key in audio.ChannelBlendMode) {
      console.info(`aboutToAppear channelBlendModeList: ${audio.ChannelBlendMode[key]}`);
      this.channelBlendModeList.push({ value: key })
    }

    for (var i = 0; i < this.pathList.length; i++) {
      var key = this.pathList[i].toString();
      this.pathValueList.push({ value: key });
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
    audio.createAudioRenderer(this.audioRendererOptions, (err, data) => {
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

      await this.audioRenderer.start((err) => {
        if (err) {
          this.returnMsg += `audioRenderer start : Error: ${JSON.stringify(err)}\n`
        } else {
          this.returnMsg += `audioRenderer start success \n`
        }
      })

      let bufferSize
      await this.audioRenderer.getBufferSize((err, data) => {
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
          this.returnMsg = `audioRenderer drain : Error: ${JSON.stringify(err)}\n`
        } else {
          this.returnMsg = `audioRenderer drain : SUCCESS\n`
        }
      })
    } catch (error) {
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
        this.returnMsg = `audioRenderer stop : Error: ${JSON.stringify(err)}\n`
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

  async setChannelBlendMode() {
    try {
      this.audioRenderer.setChannelBlendMode(this.channelBlendMode);
      this.returnMsg += `audioRenderer setChannelBlendMode SUCCESS\n`
    } catch (error) {
      this.returnMsg += `audioRenderer setChannelBlendMode : Error: ${JSON.stringify(error)}\n`
    }
  }

  async callbackPlay() {
    try {
      let path = this.selectedpath
      this.returnMsg += `path:${path}\n`
      let stat = await fs.stat(path);
      this.returnMsg += `stat:${JSON.stringify(stat)}\n`;
      let file = await fs.open(path, 0o0);
      this.returnMsg += `fd:${file.fd}\n`; //open file
      await audio.createAudioRenderer(this.audioRendererOptions).then((data) => {
        this.audioRenderer = data;
        this.returnMsg += `audioRenderer createAudioRenderer success \n`
      }).catch((err) => {
        console.info(`audioRenderer create err ${JSON.stringify(err)}`);
      })

      await this.setChannelBlendMode();
      await this.sleep(1000);

      await this.audioRenderer.start((err) => {
        if (err) {
          this.returnMsg += `audioRenderer start : Error: ${JSON.stringify(err)}\n`
        } else {
          this.returnMsg += `audioRenderer start success \n`
        }
      })
      let bufferSize
      await this.audioRenderer.getBufferSize((err, data) => {
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
          this.returnMsg = `audioRenderer drain : Error: ${JSON.stringify(err)}\n`
        } else {
          this.returnMsg = `audioRenderer drain : SUCCESS\n`
        }
      })
      await this.sleep(1000);
      await this.audioRenderer.stop((err) => {
        if (err) {
          this.returnMsg += `audioRenderer stop : Error: ${JSON.stringify(err)}\n`
        } else {
          this.returnMsg += `audioRenderer stop : SUCCESS\n`
        }
      })
      await this.audioRenderer.release((err) => {
        if (err) {
          this.returnMsg += `audioRenderer release : Error: ${JSON.stringify(err)}\n`
        } else {
          this.returnMsg += `audioRenderer release : SUCCESS\n`
        }
      })
    } catch (error) {
      this.returnMsg += `callbackPlay err ${JSON.stringify(error)} \n`
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
            Text("混合模式选择:").fontSize(24)
            Select(this.channelBlendModeList).value(this.selectedChannelBlendModeKey)
              .onSelect((index, value) => {
                this.selectedChannelBlendModeKey = value
                console.info(`Select selectedChannelBlendModeKey: ${this.selectedChannelBlendModeKey}`)
                console.info(`Select value: ${value}`)
                this.channelBlendMode = audio.ChannelBlendMode[value]
                console.info(`Select channelBlendMode: ${audio.ChannelBlendMode[value]}`)
              }).font({ size: 22 })
          }.margin({ top: 20, bottom: 10 }).width('80%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Text("多声道片源选择:").fontSize(24)
            Select(this.pathValueList).value(this.selectedPathKey)
              .onSelect((index, value) => {
                this.selectedPathKey = value
                console.log(`selectedPathKey: ${value}`)
                this.selectedpath = globalThis.pathDir + this.pathList[index]
                console.log(`path: ${this.selectedpath}`)
              }).font({ size: 22 })
          }.margin({ top: 20, bottom: 10 }).width('80%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Button() {
              Text("setChannelBlendMode").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => this.setChannelBlendMode())

            Button() {
              Text("同步方式触发混合模式并播放").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => this.callbackPlay())

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
