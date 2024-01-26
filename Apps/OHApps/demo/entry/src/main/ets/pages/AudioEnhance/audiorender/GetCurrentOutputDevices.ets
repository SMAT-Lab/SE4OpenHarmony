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
import audio from '@ohos.multimedia.audio'
import fs from '@ohos.file.fs';

@Entry
@Component
struct GetCurrentOutputDevices {
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
  @State volume: number = 0
  @State rate: number = 0
  @State minVolume: number = 0
  @State maxVolume: number = 0
  @State path: string = globalThis.pathDir + '/test_44100_2.wav';
  @State isWrite: boolean = false

  async onBackPress() {
    if (this.audioRenderer !== null) {
      await this.audioRenderer.release()
    }
  }

  async createRender() {
    this.returnMsg = ``
    if (this.audioRenderer != null) {
      this.returnMsg += `audioRenderer instance had created, Do not click repeatedly\n`
      return
    } else {
      try {
        this.audioRenderer = await audio.createAudioRenderer(this.audioRendererOptions)
        this.returnMsg += `audioRenderer create success \n`
      } catch (err) {
        this.returnMsg += `audioRenderer create : Error: ${JSON.stringify(err)}\n`
        return
      }
    }
  }

  async renderPlay() {
    this.returnMsg = ``
    if (this.audioRenderer == null) {
      await this.createRender()
    } else {
      if (this.isWrite == false) {
        await this.audioRenderer.release()
        this.audioRenderer = null
        await this.createRender();
      }
    }
    if (this.isWrite == true) {
      this.returnMsg += `不要重复点击 播放音乐 按钮 \n`
      return
    }
    this.isWrite = true
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
      this.returnMsg += `audioRenderer write : Error: ${JSON.stringify(err)}\n`
    }
    this.isWrite = false
  }

  getCurrentOutputDevicesCallback() {
    if (this.audioRenderer == null) {
      this.returnMsg += `audioRenderer instance had not created,dont‘t allow to getCurrentOutputDevicesCallback\n`
      return
    }
    let _this = this
    this.audioRenderer.getCurrentOutputDevices((err, deviceInfo) => {
      if (err) {
        _this.returnMsg = `audioRenderer getCurrentOutputDevices callback : Error: ${JSON.stringify(err)}\n`
      } else {
        _this.returnMsg = `audioRenderer getCurrentOutputDevices callback : Success,返回值：` + _this.getInfoArray(deviceInfo)
      }
    })
  }

  getInfoArray(deviceInfo) {
    let str = ``;
    for (let i = 0; i < deviceInfo.length; i++) {
      let descriptor = deviceInfo[i];
      str += `第${i}条\nId:${descriptor.id}, Type:${descriptor.deviceType}, Role:${descriptor.deviceRole}, Name:${descriptor.name},
      Address:${descriptor.address}, SampleRates:${descriptor.sampleRates[0]}, ChannelCounts:${descriptor.channelCounts[0]},
      ChannelMask:${descriptor.channelMasks[0]}, EncodingType:${descriptor.encodingTypes[0]}\n`;
    }
    return str;
  }

  getCurrentOutputDevicesPromise() {
    if (this.audioRenderer == null) {
      this.returnMsg += `audioRenderer instance had not created,dont‘t allow to getCurrentOutputDevicesCallback\n`
      return
    }
    let _this = this
    this.audioRenderer.getCurrentOutputDevices()
      .then(AudioDeviceDescriptor => {
        _this.returnMsg = `audioRenderer getCurrentOutputDevicesCallback promise : Success,返回值：` + _this.getInfoArray(AudioDeviceDescriptor)
      })
      .catch(err => {
        _this.returnMsg = `audioRenderer getCurrentOutputDevicesCallback promise : Error: ${JSON.stringify(err)}\n`
      })
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
              Text("创建AudioRender").fontSize(22).fontColor(Color.Blue)
            }.width('49%').height(60).onClick(() => this.createRender()).backgroundColor(Color.Pink)

            Button() {
              Text("播放音乐").fontSize(22).fontColor(Color.Blue)
            }.width('49%').height(60).onClick(() => this.renderPlay()).backgroundColor(Color.Pink)
          }.margin({ top: 20, bottom: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Button() {
              Text("getCurrentOutputDevices callback").fontSize(22).fontColor(Color.Blue)
            }.width('49%').height(60).onClick(() => this.getCurrentOutputDevicesCallback())

            Button() {
              Text("getCurrentOutputDevices promise").fontSize(22).fontColor(Color.Blue)
            }.width('49%').height(60).onClick(() => this.getCurrentOutputDevicesPromise())
          }.margin({ top: 20, bottom: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

        }.width('100%')
      }.margin({ top: 230 }).width('100%')
    }
  }
}