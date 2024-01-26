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
import prompt from '@ohos.prompt'
import fs from '@ohos.file.fs';

@Entry
@Component
struct OutputDeviceByFilter {
  @State returnMsg: string = 'Hello World'
  @State onReturnMsg: string = 'Hello World'
  private audioStreamManager = audio.getAudioManager().getStreamManager()
  private audioRendererInfoArray = []
  private audioRoutingManager = null
  @State selectedCommunicationDeviceKey: string = "请选择设备类型"
  @State selectedCommunicationDeviceVal: number = 0
  @State active: boolean = false
  private audioDeviceDescriptors = []
  private outputDeviceList = [{ value: '无数据' }]
  @State deviceTag: number = -1
  @State streamTag: number = -1
  @State selectedOutputDeviceIndex: number = 0
  private audioRendererOptions1 = {
    streamInfo: {
      samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_44100,
      channels: audio.AudioChannel.CHANNEL_2,
      sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
      encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
    },
    rendererInfo: {
      content: audio.ContentType.CONTENT_TYPE_MUSIC,
      usage: audio.StreamUsage.STREAM_USAGE_NOTIFICATION_RINGTONE,
      rendererFlags: 0
    }
  }
  private audioRendererOptions2 = {
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
  private fileName1 = 'test_44100_2.wav'
  private fileName2 = 'safe_and_sound_32.wav'
  private streamIdList = [{ value: "无数据" }]
  private audioRendererFilterList = []
  @State selectedStreamIndex: number = 0

  aboutToAppear() {
    let audioManager = audio.getAudioManager();
    this.audioRoutingManager = audioManager.getRoutingManager();
  }
  onBackPress(){

  }

  async createaudioRenderStream(fileName, audioRendererOptions) {
    let audioRenderer = null
    let bufferSize
    try {
      audioRenderer = await audio.createAudioRenderer(audioRendererOptions);
      this.audioRendererInfoArray = await this.audioStreamManager.getCurrentAudioRendererInfoArray()
      console.log(`this.audioRendererInfoArray:${JSON.stringify(this.audioRendererInfoArray)}`)
      this.audioRendererFilterList = []
      this.streamIdList = []
      for (let i = 0;i < this.audioRendererInfoArray.length; i++) {
        let audioRendererInfo = this.audioRendererInfoArray[i];
        this.streamIdList.push({ value: "音频流ID:" + audioRendererInfo.streamId })
        let option = {
          uid: audioRendererInfo.clientUid,
          rendererId: audioRendererInfo.streamId
        }
        this.audioRendererFilterList.push(option)
      }
      if (this.streamIdList.length > 1) {
        this.streamTag = 1
      }
    } catch (err) {
      this.returnMsg = `createAudioRenderer Error: ${JSON.stringify(err)}`
      return;
    }

    try {
      await audioRenderer.start();
      bufferSize = await audioRenderer.getBufferSize();
    } catch (err) {
      this.returnMsg = `start Error: ${JSON.stringify(err)}`
      return;
    }

    try {
      let path = globalThis.pathDir + '/' + fileName;
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
          let writeSize = await audioRenderer.write(buf);
        }
      this.returnMsg += `audioRenderer write end. \n`;
    } catch (err) {
      this.returnMsg += `AudioRenderer write Error:${JSON.stringify(err)}`
      return;
    }

    try {
      await audioRenderer.stop()
      await audioRenderer.release()
    } catch (err) {
      this.returnMsg = `start Error: ${JSON.stringify(err)}`
      return;
    }
  }

  getDeviceTypeNameByValue(value) {
    for (let key in audio.DeviceType) {
      if (audio.DeviceType[key] == value) {
        return key;
      }
    }
  }

  getDeviceList(deviceDescriptors) {
    let deviceList = [];
    for (let i = 0;i < deviceDescriptors.length; i++) {
      let deviceTypeName = this.getDeviceTypeNameByValue(deviceDescriptors[i].deviceType)
      deviceList.push({ value: deviceTypeName })
    }
    return deviceList;
  }

  async getOutputAudioDevices() {
    try {
      this.audioDeviceDescriptors = await this.audioRoutingManager.getDevices(audio.DeviceFlag.OUTPUT_DEVICES_FLAG);
      this.returnMsg = `getOutputAudioDevices Success1: ${JSON.stringify(this.audioDeviceDescriptors)}`
      this.outputDeviceList = this.getDeviceList(this.audioDeviceDescriptors)
      if (this.outputDeviceList.length > 0) {
        this.deviceTag = 1
      }
      // this.returnMsg = `getOutputAudioDevices SUccess2: ${JSON.stringify(this.outputDeviceList)}`
    } catch (err) {
      this.returnMsg = `getOutputAudioDevices Error: ${JSON.stringify(err)}`
    }
  }

  selectOutputDeviceByFilterCallback() {
    if (this.audioDeviceDescriptors.length == 0) {
      this.returnMsg = `没有输出设备类`
      return
    }
    let outputAudioDeviceDescriptor = this.audioDeviceDescriptors.filter((value, index) => {
      return index == this.selectedOutputDeviceIndex
    })
    if (outputAudioDeviceDescriptor.length == 0) {
      this.returnMsg = `尚未选择输出设备`
      return
    }
    if (this.audioRendererFilterList.length == 0) {
      this.returnMsg = `尚未生成流ID组`
      return
    }
    let outputAudioRendererFilter = this.audioRendererFilterList[this.selectedStreamIndex]
    this.returnMsg = `audioDeviceDescriptors: ${JSON.stringify(outputAudioDeviceDescriptor)}\n`
    this.returnMsg += `filter: ${JSON.stringify(outputAudioRendererFilter)}\n`

    let _this = this;
    this.audioRoutingManager.selectOutputDeviceByFilter(outputAudioRendererFilter, outputAudioDeviceDescriptor, (err) => {
      if (err) {
        _this.returnMsg += `selectOutputDeviceByFilter callback Error: ${JSON.stringify(err)}\n`
      } else {
        _this.returnMsg += `selectOutputDeviceByFilter callback Success`
      }
    });
  }

  selectOutputDeviceByFilterPromise() {
    if (this.audioDeviceDescriptors.length == 0) {
      this.returnMsg = `没有输出设备类`
      return
    }
    let outputAudioDeviceDescriptor = this.audioDeviceDescriptors.filter((value, index) => {
      return index == this.selectedOutputDeviceIndex
    })
    if (outputAudioDeviceDescriptor.length == 0) {
      this.returnMsg = `尚未选择输出设备`
      return
    }
    if (this.audioRendererFilterList.length == 0) {
      this.returnMsg = `尚未生成流ID组`
      return
    }
    let outputAudioRendererFilter = this.audioRendererFilterList[this.selectedStreamIndex]
    this.returnMsg = `audioDeviceDescriptors: ${JSON.stringify(outputAudioDeviceDescriptor)}\n`
    this.returnMsg += `filter: ${JSON.stringify(outputAudioRendererFilter)}\n`

    let _this = this;
    this.audioRoutingManager.selectOutputDeviceByFilter(outputAudioRendererFilter, outputAudioDeviceDescriptor)
      .then(() => {
        _this.returnMsg += `selectOutputDeviceByFilter promise Success`
      }).catch(err => {
      _this.returnMsg += `selectOutputDeviceByFilter promise Error: ${JSON.stringify(err)}\n`
    })
  }

  build() {
    Column() {
      Row() {
        Column() {
          Text("【路由管理-过滤输出设备】返回数据：").fontWeight(FontWeight.Bolder).position({ x: 10, y: 5 }).fontSize(18)
          Text(this.returnMsg).position({ x: 10, y: 30 }).fontSize(14)
        }.width('98%').height(220).backgroundColor(Color.Orange).position({ x: '1%' })
      }.position({ x: 0, y: 0 }).width('100%').zIndex(999)

      Scroll() {
        Column() {
          Row() {
            Button() {
              Text("获取输出设备").fontSize(24).fontColor(Color.Blue).textAlign(TextAlign.Center)
            }.width('90%').height(80).onClick(() => this.getOutputAudioDevices()).backgroundColor(Color.Pink)
          }.margin({ top: 10 })

          Row() {
            Button() {
              Text("audioRender1").fontSize(24).fontColor(Color.Blue).textAlign(TextAlign.Center)
            }
            .width('90%')
            .height(80)
            .onClick(() => this.selectOutputDeviceByFilterCallback())
            .backgroundColor(Color.Pink)
            .onClick(() => this.createaudioRenderStream(this.fileName1, this.audioRendererOptions1))
          }.margin({ top: 10 })

          Row() {
            Button() {
              Text("audioRender2").fontSize(24).fontColor(Color.Blue).textAlign(TextAlign.Center)
            }
            .width('90%')
            .height(80)
            .onClick(() => this.selectOutputDeviceByFilterCallback())
            .backgroundColor(Color.Pink)
            .onClick(() => this.createaudioRenderStream(this.fileName2, this.audioRendererOptions2))
          }.margin({ top: 10 })

          Row(){
            Text("audioRender1 和 audioRender2 都触发后，方可生成流ID组").fontSize(16).fontColor(Color.Blue)
          }.margin({ top: 10 }).width('80%')

          if (this.deviceTag > 0) {
            Row() {
              Text("输出设备：").fontSize(26)
              Select(this.outputDeviceList).value(this.outputDeviceList[this.selectedOutputDeviceIndex].value)
                .onSelect((index, value) => {
                  this.selectedOutputDeviceIndex = index
                })
            }.margin({ top: 10 }).width('100%').justifyContent(FlexAlign.Center)
          }

          if (this.streamTag > 0) {
            Row() {
              Text("流ID：").fontSize(26)
              Select(this.streamIdList).value(this.streamIdList[this.selectedStreamIndex].value)
                .onSelect((index, value) => {
                  this.selectedStreamIndex = index
                })
            }.margin({ top: 10 }).width('100%').justifyContent(FlexAlign.Center)
          }

          Row() {
            Button() {
              Text("selectOutputDeviceByFilter callback")
                .fontSize(22)
                .fontColor(Color.White)
                .textAlign(TextAlign.Center)
            }.width('90%').height(80).onClick(() => this.selectOutputDeviceByFilterCallback())
          }.margin({ top: 10 })

          Row() {
            Button() {
              Text("selectOutputDeviceByFilter promise").fontSize(22).fontColor(Color.White).textAlign(TextAlign.Center)
            }.width('90%').height(80).onClick(() => this.selectOutputDeviceByFilterPromise())
          }.margin({ top: 10 })

        }.width('100%')
      }.margin({ top: 230 }).width('100%')
    }
  }
}