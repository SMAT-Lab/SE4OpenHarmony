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
  private audioCapturerOptions = {
    streamInfo: {
      samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_44100,
      channels: audio.AudioChannel.CHANNEL_2,
      sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
      encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
    },
    capturerInfo: {
      source: audio.SourceType.SOURCE_TYPE_MIC,
      capturerFlags: 0
    }
  }
  private audioCapturers = [null,null]
  private audioRenderers=[null,null]
  private paths=["",""]
  @State returnMsg: string = `hello`

  @State bufferSize: number = 0
  @State isBlockingRead: boolean = true

  @State markReachFrame: number = 1000
  @State periodReachFrame: number = 1000
  private arr=[0,1]
  aboutToAppear() {

  }
  createAudioCapturer(index) {
    if (this.audioCapturers[index] !== null) {
      this.returnMsg = `AudioCapturer ${index} Created already,don't create anymore`
      return
    }
    let _this = this
    audio.createAudioCapturer(this.audioCapturerOptions, async (err, data) => {
      if (err) {
        _this.returnMsg = `AudioCapturer ${index} Created : Error: ${JSON.stringify(err)}`
      } else {
        _this.audioCapturers[index] = data;
        _this.returnMsg = `AudioCapturer ${index} Created : SUCCESS,state:${_this.audioCapturers[index].state}\n`
      }
    })
  }

  capturerStart(index) {
    if (this.audioCapturers[index] == null) {
      this.returnMsg = `AudioCapturer ${index} instance had not created,dont‘t allow to start\n`
      return
    }
    let _this = this
    this.audioCapturers[index].start((err) => {
      if (err) {
        _this.returnMsg = `AudioCapturer ${index} start : Error: ${JSON.stringify(err)}\n`
      } else {
        _this.returnMsg = `AudioCapturer ${index} start : SUCCESS,state:${_this.audioCapturers[index].state}\n`
      }
    });
  }

  async readCapturer(indexc) {
    if (this.audioCapturers[indexc] == null) {
      this.returnMsg = `AudioCapturer ${indexc} instance had not created,dont‘t allow to read\n`
      return
    }
    if (this.bufferSize == 0) {
      this.bufferSize = await this.audioCapturers[indexc].getBufferSize()
    }

    let _this = this
    //READ 5S
    let start = new Date().getTime()
    let end = new Date().getTime()
    let buffer = null

    _this.returnMsg += `AudioCapturer${indexc}  read start.....\n `

    let path = globalThis.pathDir + `/test_capturer_${new Date().getTime()}_${this.audioCapturerOptions.streamInfo.samplingRate}_${this.audioCapturerOptions.streamInfo.channels}.pcm`;
    _this.paths[indexc] = path
    try {
      await fs.open(path, 0o100);
      this.returnMsg += "文件创建成功，"
    } catch (err) {
      this.returnMsg += `文件创建失败 err：${JSON.stringify(err)}`
      return
    }

    let file
    try {
      file = await fs.open(path, 0o2);
      this.returnMsg += "文件以读写模式打开成功"
    } catch (err) {
      this.returnMsg += `文件以读写模式打开失败 err：${JSON.stringify(err)}`
      return
    }

    this.returnMsg += `fd:${file.fd}\n`;
    let index = 0;
    while (end - start <= 5000) {
      try {
        buffer = await new Promise((resolve, reject) => {
          _this.audioCapturers[indexc].read(_this.bufferSize, _this.isBlockingRead, async (err, buffer) => {
            if (err) {
              reject(err)
            } else {
              resolve(buffer)
            }
          })
        })
        let options = {
          offset: index * _this.bufferSize,
          length: _this.bufferSize
        }
        let writeLen = await fs.write(file.fd, buffer, options)
        index++

      } catch (err) {
        _this.returnMsg = `AudioCapturer ${index} read : Error: ${JSON.stringify(err)}\n`
      }
      end = new Date().getTime()
    }
    _this.returnMsg = `AudioCapturer ${index} read end, state:${_this.audioCapturers[indexc].state}\n`
  }

  stopCapturer(index) {
    if (this.audioCapturers[index] == null) {
      this.returnMsg = `AudioCapturer instance had not created,dont‘t allow to stop\n`
      return
    }
    let _this = this
    _this.audioCapturers[index].stop((err) => {
      if (err) {
        _this.returnMsg = `AudioCapturer ${index} stop : Error: ${JSON.stringify(err)}\n`
      } else {
        _this.returnMsg = `AudioCapturer ${index} stop : SUCCESS,state:${_this.audioCapturers[index].state}\n`
      }
    })
  }

  releaseCapturer(index) {
    if (this.audioCapturers[index] == null) {
      this.returnMsg = `AudioCapturer ${index} instance had not created,dont‘t allow to release\n`
      return
    }
    let _this = this
    _this.audioCapturers[index].release((err) => {
      if (err) {
        _this.returnMsg = `AudioCapturer ${index} release : Error: ${JSON.stringify(err)}\n`
      } else {
        _this.returnMsg = `AudioCapturer ${index} release SUCCESS,state:${_this.audioCapturers[index].state}\n`
        _this.audioCapturers[index] = null
      }
    })
  }

  async renderPlay(index) {
    if(this.paths[index]==""){
      this.returnMsg += `AudioCapturer ${index} 尚未录音\n`
      return
    }
    let audioRendererOptions = {
      streamInfo: this.audioCapturerOptions.streamInfo,
      rendererInfo: {
        content: audio.ContentType.CONTENT_TYPE_RINGTONE,
        usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
        rendererFlags: 0
      }
    }
    this.returnMsg = `audioRendererOptions ${JSON.stringify(audioRendererOptions)} \n`
    try {
      this.audioRenderers[index] = await audio.createAudioRenderer(audioRendererOptions)
      this.returnMsg += `audioRenderer ${index} create success \n`
    } catch (err) {
      this.returnMsg += `audioRenderer ${index} create : Error: ${JSON.stringify(err)}\n`
      return
    }
    let bufferSize
    try {
      bufferSize = await this.audioRenderers[index].getBufferSize()
      this.returnMsg += `audioRenderer getBufferSize success,bufferSize:${bufferSize} \n`
      await this.audioRenderers[index].start()
      this.returnMsg += `audioRenderer ${index} start success \n`
    } catch (err) {
      this.returnMsg += `audioRenderer ${index} start : Error: ${JSON.stringify(err)}\n`
      return
    }


    let path = this.paths[index]
    try {
      this.returnMsg += `path:${path}\n`
      let stat = await fs.stat(path);
      this.returnMsg += `stat:${JSON.stringify(stat)}\n`;
      this.returnMsg += `size:${stat.size}\n`;
      let len = stat.size % bufferSize == 0 ? Math.floor(stat.size / bufferSize) : Math.floor(stat.size / bufferSize + 1);

      let file = await fs.open(path, 0o0);
      this.returnMsg += `fd:${file.fd}\n`;

      let buf = new ArrayBuffer(bufferSize);
      this.returnMsg += `audioRenderer ${index} write start.......... \n`;
      for (let i = 0;i < len; i++) {
        let options = {
          offset: i * bufferSize,
          length: bufferSize
        }
        let readsize = await fs.read(file.fd, buf, options);
        let writeSize = await this.audioRenderers[index].write(buf);
      }
      this.returnMsg += `audioRenderer ${index} write end. \n`;
    } catch (err) {
      this.returnMsg += `audioRenderer ${index} write : Error: ${JSON.stringify(err)}\n`
    }

    await this.audioRenderers[index].release()
  }

  build() {
    Column() {
      Row() {
        Column() {
          Text("【音频录制-多实例】返回数据：").fontWeight(FontWeight.Bolder).position({ x: 10, y: 5 }).fontSize(18)
          Text(this.returnMsg).position({ x: 10, y: 30 }).fontSize(14)
        }.width('98%').height(120).backgroundColor(Color.Orange).position({ x: '1%' })
      }.position({ x: 0, y: 0 }).width('100%').zIndex(999)

      Scroll() {
        Column() {
          ForEach(this.arr, (item: number) => {
            Row() {
              Button() {
                Text("createAudioCapturer").fontSize(22).fontColor(Color.Blue)
              }.width('80%').height(60).backgroundColor(Color.Pink).onClick(() => {
                this.createAudioCapturer(item)
              })

              Button() {
                Text("start").fontSize(22).fontColor(Color.Blue)
              }.width('20%').height(60).backgroundColor(Color.Pink).onClick(() => {
                this.capturerStart(item)
              })
            }.margin({ top: 10 }).width('100%')


            Row() {
              Button() {
                Text("read").fontSize(22).fontColor(Color.Blue)
              }.width('100%').height(60).backgroundColor(Color.Pink).onClick(() => {
                this.readCapturer(item)
              })
            }.margin({ top: 10 }).width('100%')

            Row() {
              Button() {
                Text("stop").fontSize(22).fontColor(Color.Blue)
              }.width('49%').height(60).backgroundColor(Color.Pink).onClick(() => this.stopCapturer(item))

              Button() {
                Text("release").fontSize(22).fontColor(Color.Blue)
              }.width('49%').height(60).backgroundColor(Color.Pink).onClick(() => this.releaseCapturer(item))
            }.margin({ top: 10, bottom: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

            Row() {
              Button() {
                Text("播放录音数据").fontSize(22).fontColor(Color.Blue)
              }.width('100%').height(60).backgroundColor(Color.Pink)
              .onClick(()=>this.renderPlay(item))

            }.margin({ top: 10, bottom: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

            Divider().strokeWidth(10).color(Color.Blue)
          }, (item: number) => item.toString())




        }.width('100%')
      }.margin({ top: 130 }).width('100%')

    }
  }
}