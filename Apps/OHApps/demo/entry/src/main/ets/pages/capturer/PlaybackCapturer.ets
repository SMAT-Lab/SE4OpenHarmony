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
import common from '@ohos.app.ability.common'

const MAX_RENDER_NUM = 19
const RENDER_MEDIA_IDX = 0
const RENDER_ALARM_IDX = 1
const RENDER_ASS_IDX = 2
const RENDER_VOICE_IDX = 3
const RENDER_UNKNOWN_IDX = 4
const RENDER_MUSIC_IDX = 5
const RENDER_VOICE_MESSAGE_IDX = 6
const RENDER_RINGTONE_IDX = 7
const RENDER_NOTIFICATION_IDX = 8
const RENDER_ACCESSIBILITY_IDX = 9
const RENDER_SYSTEM_IDX = 10
const RENDER_GAME_IDX = 11
const RENDER_AUDIOBOOK_IDX = 12
const RENDER_NAVIGATION_IDX = 13
const RENDER_DTMF_IDX = 14
const RENDER_ENFORCED_TONE_IDX = 15
const RENDER_ULTRASONIC_IDX = 16
const RENDER_NOTIFICATION_RINGTONE_IDX = 17
const RENDER_MOVIE_IDX = 18


@Entry
@Component

struct PlaybackCapturer {

  private audioCapturerOptions = {
    streamInfo: {
      samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_44100,
      channels: audio.AudioChannel.CHANNEL_2,
      sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
      encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
    },
    capturerInfo: {
      source: 2,
      capturerFlags: 0
    },
    playbackCaptureConfig: {
      filterOptions: {
        usages: [audio.StreamUsage.STREAM_USAGE_MEDIA]
      }
    }
  }
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
    },
    privacyType: 1
  }
  @State returnMsg: string = `hello`
  @State  StreamText : string  = 'getStreamInfo'
  private capturer_ = null
  private renderers_ = [null, null, null, null,null, null, null, null,null, null, null, null,null, null, null, null,null, null, null]
  private capRender_ = null;
  private rendererSelectState_ = [0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0]
  private rendererPrivacy_ = [0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0]
  private capturerFilter_ = [0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0]
  @State renderStateList_: Array<number> = [0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0]
  @State recordState_: number = 0
  @State recordSec: number = 0
  @State capRenderState_: number = 0
  @State capRenderText_: string = '播放录音数据'
  private streamUsageList = []
  @State selectedStreamUsageKey: Array<String> = []
  private samplingRateList = []
  @State selectedSamplingRateKey: string = "SAMPLE_RATE_44100"
  private channelsList = []
  @State selectedChannelKey: string = "CHANNEL_2"
  private sampleFormatList = []
  @State selectedSampleFormatKey: string = "SAMPLE_FORMAT_S16LE"
  private encodingTypeList = []
  @State selectedEncodingTypeKey: string = "ENCODING_TYPE_RAW"

  private capturerPath = ''
  @State recordText: string = '音频录制'
  private SUPPORT_STREAM_USAGE = [
      audio.StreamUsage.STREAM_USAGE_MEDIA,
      audio.StreamUsage.STREAM_USAGE_ALARM,
      audio.StreamUsage.STREAM_USAGE_VOICE_ASSISTANT,
      audio.StreamUsage.STREAM_USAGE_VOICE_COMMUNICATION,
      audio.StreamUsage.STREAM_USAGE_UNKNOWN,
      audio.StreamUsage.STREAM_USAGE_MUSIC,
      audio.StreamUsage.STREAM_USAGE_VOICE_MESSAGE,

      audio.StreamUsage.STREAM_USAGE_RINGTONE,
      audio.StreamUsage.STREAM_USAGE_NOTIFICATION,
      audio.StreamUsage.STREAM_USAGE_ACCESSIBILITY,
      audio.StreamUsage.STREAM_USAGE_SYSTEM,
      audio.StreamUsage.STREAM_USAGE_GAME,
      audio.StreamUsage.STREAM_USAGE_AUDIOBOOK,
      audio.StreamUsage.STREAM_USAGE_NAVIGATION,
      audio.StreamUsage.STREAM_USAGE_DTMF,
      audio.StreamUsage.STREAM_USAGE_ENFORCED_TONE,
      audio.StreamUsage.STREAM_USAGE_NOTIFICATION_RINGTONE,
      audio.StreamUsage.STREAM_USAGE_ULTRASONIC,
      audio.StreamUsage.STREAM_USAGE_MOVIE,

  ]


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
    for (let key in audio.StreamUsage) {
      this.streamUsageList.push({ value: key })
    }
  }

  async CreateRendersByIndex(idx: number, usage) {
    if (idx < 0 || idx >= MAX_RENDER_NUM) {
      return
    }
    this.audioRendererOptions.privacyType = this.rendererPrivacy_[idx]
    this.audioRendererOptions.rendererInfo.usage = usage
    this.renderers_[idx] = await audio.createAudioRenderer(this.audioRendererOptions)
    this.renderers_[idx].on('stateChange', (state) => {
      console.log('renderStateList, index= ' + idx + ' changed to ' + state)
      this.returnMsg = `renderStateList, index=  ${idx}  changed to  ${state}`
      this.renderStateList_[idx] = state
    })
  }

  async CreateAndStartSelectRenders() {
    let isCanPlay = false
    for (let i = 0;i < this.rendererSelectState_.length; i++) {
      if (this.rendererSelectState_[i] === 1) {
        isCanPlay = true
        break;
      }
    }

    if (!isCanPlay) {
      console.log('请选择至少一项流类型')
      this.returnMsg =`请选择至少一项流类型`
      return;
    }


    this.audioCapturerOptions.playbackCaptureConfig.filterOptions.usages = []
    setTimeout(async () => {
      if (this.rendererSelectState_[RENDER_MEDIA_IDX] == 1) {
        // create AudioRender instance of STREAM_USAGE_MEDIA
        await this.CreateRendersByIndex(RENDER_MEDIA_IDX, audio.StreamUsage.STREAM_USAGE_MEDIA)
        await this.Play(RENDER_MEDIA_IDX, 'safe_and_sound_32.wav')
      }
    }, 0)

    setTimeout(async () => {
      if (this.rendererSelectState_[RENDER_ALARM_IDX] == 1) {
        // create AudioRender instance of STREAM_USAGE_ALARM
        await this.CreateRendersByIndex(RENDER_ALARM_IDX, audio.StreamUsage.STREAM_USAGE_ALARM)
        await this.Play(RENDER_ALARM_IDX, 'test_44100_2.wav')
      }
    }, 0)

    setTimeout(async () => {
      if (this.rendererSelectState_[RENDER_ASS_IDX] == 1) {
        // create AudioRender instance of STREAM_USAGE_SYSTEM
       await this.CreateRendersByIndex(RENDER_ASS_IDX, audio.StreamUsage.STREAM_USAGE_VOICE_ASSISTANT)
        await this.Play(RENDER_ASS_IDX, 'safe_and_sound_32.wav')
      }
    }, 0)

    setTimeout(async () => {
      if (this.rendererSelectState_[RENDER_VOICE_IDX] == 1) {
        // create AudioRender instance of STREAM_USAGE_VOICE_COMMUNICATION
       await this.CreateRendersByIndex(RENDER_VOICE_IDX, audio.StreamUsage.STREAM_USAGE_VOICE_COMMUNICATION)
        await this.Play(RENDER_VOICE_IDX, 'test_44100_2.wav')
      }
    }, 0)

    setTimeout(async () => {
      if (this.rendererSelectState_[RENDER_UNKNOWN_IDX] == 1) {
        // create AudioRender instance of STREAM_USAGE_VOICE_COMMUNICATION
        await this.CreateRendersByIndex(RENDER_UNKNOWN_IDX, audio.StreamUsage.STREAM_USAGE_UNKNOWN)
        await this.Play(RENDER_UNKNOWN_IDX, 'safe_and_sound_32.wav')
      }
    }, 0)

    setTimeout(async () => {
      if (this.rendererSelectState_[RENDER_MUSIC_IDX] == 1) {
        // create AudioRender instance of STREAM_USAGE_VOICE_COMMUNICATION
        await this.CreateRendersByIndex(RENDER_MUSIC_IDX, audio.StreamUsage.STREAM_USAGE_MUSIC)
        await this.Play(RENDER_MUSIC_IDX, 'test_44100_2.wav')
      }
    }, 0)

    setTimeout(async () => {
      if (this.rendererSelectState_[RENDER_VOICE_MESSAGE_IDX] == 1) {
        // create AudioRender instance of STREAM_USAGE_VOICE_COMMUNICATION
        await this.CreateRendersByIndex(RENDER_VOICE_MESSAGE_IDX, audio.StreamUsage.STREAM_USAGE_VOICE_MESSAGE)
        await this.Play(RENDER_VOICE_MESSAGE_IDX, 'safe_and_sound_32.wav')
      }
    }, 0)

    setTimeout(async () => {
      if (this.rendererSelectState_[RENDER_RINGTONE_IDX] == 1) {
        // create AudioRender instance of STREAM_USAGE_VOICE_COMMUNICATION
        await this.CreateRendersByIndex(RENDER_RINGTONE_IDX, audio.StreamUsage.STREAM_USAGE_RINGTONE)
        await this.Play(RENDER_RINGTONE_IDX, 'test_44100_2.wav')
      }
    }, 0)

    setTimeout(async () => {
      if (this.rendererSelectState_[RENDER_NOTIFICATION_IDX] == 1) {
        // create AudioRender instance of STREAM_USAGE_VOICE_COMMUNICATION
        await this.CreateRendersByIndex(RENDER_NOTIFICATION_IDX, audio.StreamUsage.STREAM_USAGE_NOTIFICATION)
        await this.Play(RENDER_NOTIFICATION_IDX, 'safe_and_sound_32.wav')
      }
    }, 0)

    setTimeout(async () => {
      if (this.rendererSelectState_[RENDER_ACCESSIBILITY_IDX] == 1) {
        // create AudioRender instance of STREAM_USAGE_VOICE_COMMUNICATION
        await this.CreateRendersByIndex(RENDER_ACCESSIBILITY_IDX, audio.StreamUsage.STREAM_USAGE_ACCESSIBILITY)
        await this.Play(RENDER_ACCESSIBILITY_IDX, 'test_44100_2.wav')
      }
    }, 0)

    setTimeout(async () => {
      if (this.rendererSelectState_[RENDER_SYSTEM_IDX] == 1) {
        // create AudioRender instance of STREAM_USAGE_VOICE_COMMUNICATION
        await this.CreateRendersByIndex(RENDER_SYSTEM_IDX, audio.StreamUsage.STREAM_USAGE_SYSTEM)
        await this.Play(RENDER_SYSTEM_IDX, 'safe_and_sound_32.wav')
      }
    }, 0)

    setTimeout(async () => {
      if (this.rendererSelectState_[RENDER_GAME_IDX] == 1) {
        // create AudioRender instance of STREAM_USAGE_VOICE_COMMUNICATION
        await this.CreateRendersByIndex(RENDER_GAME_IDX, audio.StreamUsage.STREAM_USAGE_GAME)
        await this.Play(RENDER_GAME_IDX, 'test_44100_2.wav')
      }
    }, 0)

    setTimeout(async () => {
      if (this.rendererSelectState_[RENDER_AUDIOBOOK_IDX] == 1) {
        // create AudioRender instance of STREAM_USAGE_VOICE_COMMUNICATION
        await this.CreateRendersByIndex(RENDER_AUDIOBOOK_IDX, audio.StreamUsage.STREAM_USAGE_AUDIOBOOK)
        await this.Play(RENDER_AUDIOBOOK_IDX, 'safe_and_sound_32.wav')
      }
    }, 0)

    setTimeout(async () => {
      if (this.rendererSelectState_[RENDER_NAVIGATION_IDX] == 1) {
        // create AudioRender instance of STREAM_USAGE_VOICE_COMMUNICATION
        await this.CreateRendersByIndex(RENDER_NAVIGATION_IDX, audio.StreamUsage.STREAM_USAGE_NAVIGATION)
        await this.Play(RENDER_NAVIGATION_IDX, 'test_44100_2.wav')
      }
    }, 0)

    setTimeout(async () => {
      if (this.rendererSelectState_[RENDER_DTMF_IDX] == 1) {
        // create AudioRender instance of STREAM_USAGE_VOICE_COMMUNICATION
        await this.CreateRendersByIndex(RENDER_DTMF_IDX, audio.StreamUsage.STREAM_USAGE_DTMF)
        await this.Play(RENDER_DTMF_IDX, 'safe_and_sound_32.wav')
      }
    }, 0)

    setTimeout(async () => {
      if (this.rendererSelectState_[RENDER_ENFORCED_TONE_IDX] == 1) {
        // create AudioRender instance of STREAM_USAGE_VOICE_COMMUNICATION
        await this.CreateRendersByIndex(RENDER_ENFORCED_TONE_IDX, audio.StreamUsage.STREAM_USAGE_ENFORCED_TONE)
        await this.Play(RENDER_ENFORCED_TONE_IDX, 'test_44100_2.wav')
      }
    }, 0)

    setTimeout(async () => {
      if (this.rendererSelectState_[RENDER_ULTRASONIC_IDX] == 1) {
        // create AudioRender instance of STREAM_USAGE_VOICE_COMMUNICATION
        await this.CreateRendersByIndex(RENDER_ULTRASONIC_IDX, audio.StreamUsage.STREAM_USAGE_ULTRASONIC)
        await this.Play(RENDER_ULTRASONIC_IDX, 'safe_and_sound_32.wav')
      }
    }, 0)

    setTimeout(async () => {
      if (this.rendererSelectState_[RENDER_NOTIFICATION_RINGTONE_IDX] == 1) {
        // create AudioRender instance of STREAM_USAGE_VOICE_COMMUNICATION
        await this.CreateRendersByIndex(RENDER_NOTIFICATION_RINGTONE_IDX, audio.StreamUsage.STREAM_USAGE_NOTIFICATION_RINGTONE)
        await this.Play(RENDER_NOTIFICATION_RINGTONE_IDX, 'test_44100_2.wav')
      }
    }, 0)

    setTimeout(async () => {
      if (this.rendererSelectState_[RENDER_MOVIE_IDX] == 1) {
        // create AudioRender instance of STREAM_USAGE_VOICE_COMMUNICATION
        await this.CreateRendersByIndex(RENDER_MOVIE_IDX, audio.StreamUsage.STREAM_USAGE_MOVIE)
        await this.Play(RENDER_MOVIE_IDX, 'safe_and_sound_32.wav')
      }
    }, 0)

  }

  async PlayStop() {
    for (let i = 0;i < this.rendererSelectState_.length; i++) {
      if (this.renderers_[i] !== null) {
        await this.renderers_[i].release()
        this.renderers_[i] = null
      }
    }
  }

  async Play(idx, pathName) {
    let path = globalThis.pathDir + '/' + pathName;
    await this.renderers_[idx].start();
    let bufferSize = await this.renderers_[idx].getBufferSize()
    let _this = this
    try {
      let stat = await fs.stat(path);
      let len = stat.size % bufferSize == 0 ? Math.floor(stat.size / bufferSize) : Math.floor(stat.size / bufferSize + 1);
      let file = await fs.open(path, 0o0);
      let buf = new ArrayBuffer(bufferSize);
      //this.returnMsg = `audioRenderer write start.......... \n`;
      console.log(`audioRenderer ${idx} write start.......... \n`)
      this.returnMsg = `audioRenderer ${idx} write start.......... \n`
      while (true) {
        if (this.renderStateList_[idx] === audio.AudioState.STATE_RELEASED) {
          break
        }
        for (let i = 0;i < len; i++) {
          if (this.renderStateList_[idx] === audio.AudioState.STATE_RELEASED) {
            break
          }
          let options = {
            offset: i * bufferSize,
            length: bufferSize
          }
          let readsize = await fs.read(file.fd, buf, options);
          let writeSize = await new Promise((resolve, reject) => {
            this.renderers_[idx].write(buf, (err, writeSize) => {
              if (err) {
                reject(err)
              } else {
                resolve(writeSize)
              }
            })
          })
        }
      }
      console.log(`audioRenderer ${idx} write end. \n`)
      this.returnMsg = `audioRenderer ${idx} write end. \n`
      console.log(`audioRenderer ${idx} read end, state:${this.renderers_[idx].state}\n`)
      this.returnMsg =`audioRenderer ${idx} read end, state:${this.renderers_[idx].state}\n`
      //      this.returnMsg += `audioRenderer write end. \n`;
      //      _this.returnMsg += `audioRenderer read end, state:${this.renderers_[idx].state}\n`
    } catch (err) {
      console.error(`audioRenderer write : Error: ${JSON.stringify(err)}\n`)
      this.returnMsg =`audioRenderer write : Error: ${JSON.stringify(err)}\n`
      //this.returnMsg += `audioRenderer write : Error: ${JSON.stringify(err)}\n`
    }
  }

  async startRecord() {
    let isCanRec = false
    this.capRenderText_ = "播放录音数据"
    for (let i = 0;i < this.renderStateList_.length; i++) {
      if (this.renderStateList_[i] === audio.AudioState.STATE_RUNNING) {
        isCanRec = true
        break;
      }
    }

    if (!isCanRec) {
      console.log('没有正在播放的流')
      this.returnMsg =`没有正在播放的流`
      return;
    }

    this.audioCapturerOptions.playbackCaptureConfig.filterOptions.usages = []
    for (let i = 0; i < MAX_RENDER_NUM; i++) {
      if (this.capturerFilter_[i] === 1) {
        this.audioCapturerOptions.playbackCaptureConfig.filterOptions.usages.push(this.SUPPORT_STREAM_USAGE[i])
        console.log('ZLMDBG capturer filter add usage:' + this.SUPPORT_STREAM_USAGE[i])
        this.returnMsg =`ZLMDBG capturer filter add usage: ${this.SUPPORT_STREAM_USAGE[i]} `
      }
    }
    try {
      console.log(`this.audioCapturerOptions=${JSON.stringify(this.audioCapturerOptions)}`)
      this.returnMsg = `this.audioCapturerOptions=${JSON.stringify(this.audioCapturerOptions)}`
      this.capturer_ = await audio.createAudioCapturer(this.audioCapturerOptions);
      if (this.capturer_ === null) {
        console.log('createAudioCapturer failed.')
        this.returnMsg =`createAudioCapturer failed`
        return;
      } else {
        this.capturer_.on('stateChange', (state) => {
          console.log('recordState changed to ' + state)
          this.returnMsg =`recordState changed to :  ${state}`
          this.recordState_ = state
        })
        await this.capturer_.start()
        this.recordText = '正在录制中，点击可停止，最长录制30s'
        await this.readCapturer()
      }

      await this.stopRecord()
      //录制结束后，关闭音频资源播放
//      for (let i = 0;i < this.rendererSelectState_.length; i++) {
//        if (this.rendererSelectState_[i] === 1) {
//          await this.renderers_[i].release()
//        }
//      }
    } catch (err) {
      console.log(`startRecord err = ${JSON.stringify(err)}`)
      this.returnMsg =  `startRecord err = ${JSON.stringify(err)}`
    }
  }

  async stopRecord() {
    try {
//      await this.capturer_.stop()
      await this.capturer_.release()
      await this.PlayStop()
      this.capturer_ = null
      this.recordText = '音频录制'
    } catch (err) {
      console.log(`stopRecord err = ${JSON.stringify(err)}`)
      this.returnMsg = `stopRecord err = ${JSON.stringify(err)}`
    }
  }

  async readCapturer() {
    let bufferSize = await this.capturer_.getBufferSize()

    let _this = this
    //READ 5S
    let start = new Date().getTime()
    let end = new Date().getTime()
    let buffer = null

    console.log('AudioCapturer read start.....')
    this.returnMsg = `AudioCapturer read start.....`

    let path = globalThis.pathDir + `/test_capturer_${new Date().getTime()}_${this.audioCapturerOptions.streamInfo.samplingRate}_${this.audioCapturerOptions.streamInfo.channels}.pcm`;
    this.capturerPath = path;
    try {
      await fs.open(path, 0o100);
      //this.returnMsg += "文件创建成功，"
      console.log("文件创建成功")
      this.returnMsg =`文件创建成功`
    } catch (err) {
      console.log(`文件创建失败 err：${JSON.stringify(err)}`)
      this.returnMsg =`文件创建失败 err：${JSON.stringify(err)}`
      //this.returnMsg += `文件创建失败 err：${JSON.stringify(err)}`
      return
    }

    let file
    try {
      file = await fs.open(path, 0o2);
      console.log("文件以读写模式打开成功")

      this.returnMsg = "文件以读写模式打开成功"
    } catch (err) {
      //this.returnMsg +=
      console.log(`文件以读写模式打开失败 err：${JSON.stringify(err)}`)
      this.returnMsg =`文件以读写模式打开失败 err：${JSON.stringify(err)}`
      return
    }

    this.returnMsg += `fd:${file.fd}\n`;
    let index = 0;
    while (end - start <= 5000 * 6) {
      if (_this.capturer_.state === audio.AudioState.STATE_STOPPED) {
        break;
      }
      try {
        buffer = await new Promise((resolve, reject) => {
          _this.capturer_.read(bufferSize, true, async (err, buffer) => {
            if (err) {
              reject(err)
            } else {
              resolve(buffer)
            }
          })
        })
        let options = {
          offset: index * bufferSize,
          length: bufferSize
        }
        let writeLen = await fs.write(file.fd, buffer, options)
        index++

      } catch (err) {
        console.log(`AudioCapturer read : Error: ${JSON.stringify(err)}\n`)
         _this.returnMsg = `AudioCapturer read : Error: ${JSON.stringify(err)}\n`
      }
      end = new Date().getTime()
    }

//    await _this.capturer_.release()
//    console.log(`AudioCapturer read end, state:${_this.capturer_.state}\n`)
    //_this.returnMsg = `AudioCapturer read end, state:${_this.capturer_.state}\n`

  }

  async playRecordDataStop() {
    if (this.capRender_ != null) {
      await this.capRender_.release()
      this.capRender_ = null;
    }
    this.capRenderState_ = 0
    this.capRenderText_ = "播放录音数据"
  }

  async playRecordData() {
    let _this = this
    _this.playRecordDataStop()
    if (this.capturerPath == "") {
      console.log(`AudioCapturer  尚未录音\n`)
      this.returnMsg =`AudioCapturer  尚未录音\n`
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
    console.log(`playRecordData audioRendererOptions ${JSON.stringify(audioRendererOptions)} \n`)

    try {
      _this.capRender_ = await audio.createAudioRenderer(audioRendererOptions)
      console.log(`playRecordData audioRenderer  create success \n`)
      this.returnMsg =`playRecordData audioRenderer  create success \n`
    } catch (err) {
      console.log(`playRecordData audioRenderer  create : Error: ${JSON.stringify(err)}\n`)
      this.returnMsg = `playRecordData audioRenderer  create : Error: ${JSON.stringify(err)}\n`
      return
    }
    let bufferSize
    try {
      bufferSize = await _this.capRender_.getBufferSize()
      await _this.capRender_.start()
      console.log(`playRecordData audioRenderer  start success \n`)
      this.returnMsg = `playRecordData audioRenderer  start success \n`
      _this.capRenderState_ = 1
      _this.capRenderText_ = "正在播放录音数据"
    } catch (err) {
      console.log(`playRecordData audioRenderer  start : Error: ${JSON.stringify(err)}\n`)
      this.returnMsg =`playRecordData audioRenderer  start : Error: ${JSON.stringify(err)}\n`
      return
    }


    let path = this.capturerPath
    try {
      console.log(`path:${path}\n`)
      let stat = await fs.stat(path);
      console.log(`stat:${JSON.stringify(stat)}\n`)
      console.log(`size:${stat.size}`)
      let len = stat.size % bufferSize == 0 ? Math.floor(stat.size / bufferSize) : Math.floor(stat.size / bufferSize + 1);

      let file = await fs.open(path, 0o0);
      console.log(`fd:${file.fd}\n`)
      let buf = new ArrayBuffer(bufferSize);
      console.log(`audioRenderer  write start.......... \n`)
      this.returnMsg =`audioRenderer  write start.......... \n`

      for (let i = 0;i < len; i++) {
        let options = {
          offset: i * bufferSize,
          length: bufferSize
        }
        let readsize = await fs.read(file.fd, buf, options);
        let writeSize = await _this.capRender_.write(buf);
      }
      console.log(`audioRenderer  write end. \n`)
      this.returnMsg=`audioRenderer  write end. \n`
    } catch (err) {
      console.log(`audioRenderer  write : Error: ${JSON.stringify(err)}\n`)
      this.returnMsg=`audioRenderer  write : Error: ${JSON.stringify(err)}\n`
    }
    await _this.capRender_.release()
    _this.capRender_ = null
    _this.capRenderState_ = 0
    _this.capRenderText_ = "播放结束"
  }

  async getStreamInfo(){
    try {

      await this.capturer_.getStreamInfo((err, streamInfo) => {
        if (err) {
          this.returnMsg = `getstreamInfo err = ${JSON.stringify(err)}`
          console.error('Failed to get stream info');
        } else {
          this.returnMsg = `streamInfo : ${JSON.stringify(streamInfo)}`
          console.info('Capturer GetStreamInfo:');
          console.info(`Capturer sampling rate: ${streamInfo.samplingRate}`);
          console.info(`Capturer channel: ${streamInfo.channels}`);
          console.info(`Capturer format: ${streamInfo.sampleFormat}`);
          console.info(`Capturer encoding type: ${streamInfo.encodingType}`);
        }
      });


      this.StreamText = 'getStreamInfo'
    } catch (err) {
      console.log(`getstreamInfo err = ${JSON.stringify(err)}`)
      this.returnMsg = `getstreamInfo err = ${JSON.stringify(err)}`
    }
  }


  build() {
    Column() {
//      Row() {
//        Column() {
//          Text("【音频内录】").fontWeight(FontWeight.Bolder).position({ x: 10, y: 5 }).fontSize(18)
//        }.width('98%').height(40).backgroundColor(Color.Orange).position({ x: '1%' })
//      }.position({ x: 0, y: 0 }).width('100%').zIndex(999)

      Row() {
        Column() {
          Text("【音频内录】:").fontWeight(FontWeight.Bolder).position({ x: 10, y: 5 }).fontSize(18)
          Text(this.returnMsg).position({ x: 10, y: 30 }).fontSize(14)
        }.width('98%').height(120).backgroundColor(Color.Orange).position({ x: '1%' })
      }.position({ x: 0, y: 0 }).width('100%').zIndex(999)

      Scroll() {
        Column() {
          Row() {
//             全选按钮
            Flex({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
              CheckboxGroup({ group: 'checkboxGroup' })
                .selectedColor('#007DFF')
                .onChange((itemName: CheckboxGroupResult) => {
                  console.info("checkbox group content" + JSON.stringify(itemName))
                })
              Text('Select All').fontSize(14).lineHeight(20).fontColor('#182431').fontWeight(500)
            }
          }.margin({ top: 60 }).width('100%')

          Row() {
            // 选项1:STREAM_USAGE_MEDIA
            Flex({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
              Checkbox({ name: 'CheckBox_media', group: 'checkboxGroup' })
                .selectedColor('#007DFF')
                .onChange((value: boolean) => {
                  console.info('Checkbox1 change is' + value)
                  if (value) {
                    this.rendererSelectState_[RENDER_MEDIA_IDX] = 1;
                  } else {
                    this.rendererSelectState_[RENDER_MEDIA_IDX] = 0;
                  }
                })
              Text('MEDIA').fontSize(12).lineHeight(20).fontColor('#182431').fontWeight(500)

              Select([{ value: '0' }, { value: '1' }])
                .value('privacy(def:0)')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.rendererPrivacy_[RENDER_MEDIA_IDX] = index
                })
                .margin({ left: 5 })

              Select([{ value: '0' }, { value: '1' }])
                .value('capturer?')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.capturerFilter_[RENDER_MEDIA_IDX] = index
                })
                .margin({ left: 5 })
            }.margin({ left: 28 })
          }

          Row() {
            // 选项2:STREAM_USAGE_ALARM
            Flex({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
              Checkbox({ name: 'CheckBox_alarm', group: 'checkboxGroup' })
                .selectedColor('#007DFF')
                .onChange((value: boolean) => {
                  console.info('Checkbox2 change is' + value)
                  if (value) {
                    this.rendererSelectState_[RENDER_ALARM_IDX] = 1;
                  } else {
                    this.rendererSelectState_[RENDER_ALARM_IDX] = 0;
                  }
                })
              Text('ALARM').fontSize(12).lineHeight(20).fontColor('#182431').fontWeight(500)

              Select([{ value: '0' }, { value: '1' }])
                .value('privacy(def:0)')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.rendererPrivacy_[RENDER_ALARM_IDX] = index
                })
                .margin({ left: 5 })

              Select([{ value: '0' }, { value: '1' }])
                .value('capturer?')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.capturerFilter_[RENDER_ALARM_IDX] = index
                })
                .margin({ left: 5 })
            }.margin({ left: 28 })
          }

          Row() {
            // 选项3:STREAM_USAGE_VOICE_ASSISTANT
            Flex({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
              Checkbox({ name: 'CheckBox_ass', group: 'checkboxGroup' })
                .selectedColor('#007DFF')
                .onChange((value: boolean) => {
                  console.info('Checkbox2 change is' + value)
                  if (value) {
                    this.rendererSelectState_[RENDER_ASS_IDX] = 1;
                  } else {
                    this.rendererSelectState_[RENDER_ASS_IDX] = 0;
                  }
                })
              Text('VOICE_ASSISTANT').fontSize(12).lineHeight(20).fontColor('#182431').fontWeight(500)

              Select([{ value: '0' }, { value: '1' }])
                .value('privacy(def:0)')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.rendererPrivacy_[RENDER_ASS_IDX] = index
                })
                .margin({ left: 5 })

              Select([{ value: '0' }, { value: '1' }])
                .value('capturer?')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.capturerFilter_[RENDER_ASS_IDX] = index
                })
                .margin({ left: 5 })
            }.margin({ left: 28 })
          }

          Row() {
            // 选项4:STREAM_USAGE_VOICE_COMMUNICATION
            Flex({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
              Checkbox({ name: 'CheckBox_voice', group: 'checkboxGroup' })
                .selectedColor('#007DFF')
                .onChange((value: boolean) => {
                  console.info('Checkbox2 change is' + value)
                  if (value) {
                    this.rendererSelectState_[RENDER_VOICE_IDX] = 1;
                  } else {
                    this.rendererSelectState_[RENDER_VOICE_IDX] = 0;
                  }
                })
              Text('VOICE_CALL').fontSize(12).lineHeight(20).fontColor('#182431').fontWeight(500)

              Select([{ value: '0' }, { value: '1' }])
                .value('privacy(def:0)')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.rendererPrivacy_[RENDER_VOICE_IDX] = index
                })
                .margin({ left: 5 })

              Select([{ value: '0' }, { value: '1' }])
                .value('capturer?')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.capturerFilter_[RENDER_VOICE_IDX] = index
                })
                .margin({ left: 5 })
            }.margin({ left: 28 })
          }
          Row() {
            // 选项5:STREAM_USAGE_UNKNOWN
            Flex({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
              Checkbox({ name: 'CheckBox_voice', group: 'checkboxGroup' })
                .selectedColor('#007DFF')
                .onChange((value: boolean) => {
                  console.info('Checkbox2 change is' + value)
                  if (value) {
                    this.rendererSelectState_[RENDER_UNKNOWN_IDX] = 1;
                  } else {
                    this.rendererSelectState_[RENDER_UNKNOWN_IDX] = 0;
                  }
                })
              Text('UNKNOWN').fontSize(12).lineHeight(20).fontColor('#182431').fontWeight(500)

              Select([{ value: '0' }, { value: '1' }])
                .value('privacy(def:0)')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.rendererPrivacy_[RENDER_UNKNOWN_IDX] = index
                })
                .margin({ left: 5 })

              Select([{ value: '0' }, { value: '1' }])
                .value('capturer?')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.capturerFilter_[RENDER_UNKNOWN_IDX] = index
                })
                .margin({ left: 5 })
            }.margin({ left: 28 })
          }
          Row() {
            // 选项6:STREAM_USAGE_MUSIC
            Flex({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
              Checkbox({ name: 'CheckBox_voice', group: 'checkboxGroup' })
                .selectedColor('#007DFF')
                .onChange((value: boolean) => {
                  console.info('Checkbox2 change is' + value)
                  if (value) {
                    this.rendererSelectState_[RENDER_MUSIC_IDX] = 1;
                  } else {
                    this.rendererSelectState_[RENDER_MUSIC_IDX] = 0;
                  }
                })
              Text('MUSIC').fontSize(12).lineHeight(20).fontColor('#182431').fontWeight(500)

              Select([{ value: '0' }, { value: '1' }])
                .value('privacy(def:0)')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.rendererPrivacy_[RENDER_MUSIC_IDX] = index
                })
                .margin({ left: 5 })

              Select([{ value: '0' }, { value: '1' }])
                .value('capturer?')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.capturerFilter_[RENDER_MUSIC_IDX] = index
                })
                .margin({ left: 5 })
            }.margin({ left: 28 })
          }
          Row() {
            // 选项7:STREAM_USAGE_VOICE_MESSAGE
            Flex({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
              Checkbox({ name: 'CheckBox_voice', group: 'checkboxGroup' })
                .selectedColor('#007DFF')
                .onChange((value: boolean) => {
                  console.info('Checkbox2 change is' + value)
                  if (value) {
                    this.rendererSelectState_[RENDER_VOICE_MESSAGE_IDX] = 1;
                  } else {
                    this.rendererSelectState_[RENDER_VOICE_MESSAGE_IDX] = 0;
                  }
                })
              Text('VOICE_MESSAGE').fontSize(12).lineHeight(20).fontColor('#182431').fontWeight(500)

              Select([{ value: '0' }, { value: '1' }])
                .value('privacy(def:0)')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.rendererPrivacy_[RENDER_VOICE_MESSAGE_IDX] = index
                })
                .margin({ left: 5 })

              Select([{ value: '0' }, { value: '1' }])
                .value('capturer?')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.capturerFilter_[RENDER_VOICE_MESSAGE_IDX] = index
                })
                .margin({ left: 5 })
            }.margin({ left: 28 })
          }
          Row() {
            // 选项8:STREAM_USAGE_RINGTONE
            Flex({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
              Checkbox({ name: 'CheckBox_voice', group: 'checkboxGroup' })
                .selectedColor('#007DFF')
                .onChange((value: boolean) => {
                  console.info('Checkbox2 change is' + value)
                  if (value) {
                    this.rendererSelectState_[RENDER_RINGTONE_IDX] = 1;
                  } else {
                    this.rendererSelectState_[RENDER_RINGTONE_IDX] = 0;
                  }
                })
              Text('RINGTONE').fontSize(12).lineHeight(20).fontColor('#182431').fontWeight(500)

              Select([{ value: '0' }, { value: '1' }])
                .value('privacy(def:0)')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.rendererPrivacy_[RENDER_RINGTONE_IDX] = index
                })
                .margin({ left: 5 })

              Select([{ value: '0' }, { value: '1' }])
                .value('capturer?')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.capturerFilter_[RENDER_RINGTONE_IDX] = index
                })
                .margin({ left: 5 })
            }.margin({ left: 28 })
          }
          Row() {
            // 选项9:STREAM_USAGE_NOTIFICATION
            Flex({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
              Checkbox({ name: 'CheckBox_voice', group: 'checkboxGroup' })
                .selectedColor('#007DFF')
                .onChange((value: boolean) => {
                  console.info('Checkbox2 change is' + value)
                  if (value) {
                    this.rendererSelectState_[RENDER_NOTIFICATION_IDX] = 1;
                  } else {
                    this.rendererSelectState_[RENDER_NOTIFICATION_IDX] = 0;
                  }
                })
              Text('NOTIFICATION').fontSize(12).lineHeight(20).fontColor('#182431').fontWeight(500)

              Select([{ value: '0' }, { value: '1' }])
                .value('privacy(def:0)')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.rendererPrivacy_[RENDER_NOTIFICATION_IDX] = index
                })
                .margin({ left: 5 })

              Select([{ value: '0' }, { value: '1' }])
                .value('capturer?')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.capturerFilter_[RENDER_NOTIFICATION_IDX] = index
                })
                .margin({ left: 5 })
            }.margin({ left: 28 })
          }
          Row() {
            // 选项10:STREAM_USAGE_ACCESSIBILITY
            Flex({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
              Checkbox({ name: 'CheckBox_voice', group: 'checkboxGroup' })
                .selectedColor('#007DFF')
                .onChange((value: boolean) => {
                  console.info('Checkbox2 change is' + value)
                  if (value) {
                    this.rendererSelectState_[RENDER_ACCESSIBILITY_IDX] = 1;
                  } else {
                    this.rendererSelectState_[RENDER_ACCESSIBILITY_IDX] = 0;
                  }
                })
              Text('ACCESSIBILITY').fontSize(12).lineHeight(20).fontColor('#182431').fontWeight(500)

              Select([{ value: '0' }, { value: '1' }])
                .value('privacy(def:0)')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.rendererPrivacy_[RENDER_ACCESSIBILITY_IDX] = index
                })
                .margin({ left: 5 })

              Select([{ value: '0' }, { value: '1' }])
                .value('capturer?')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.capturerFilter_[RENDER_ACCESSIBILITY_IDX] = index
                })
                .margin({ left: 5 })
            }.margin({ left: 28 })
          }

          Row() {
            // 选项11:STREAM_USAGE_SYSTEM
            Flex({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
              Checkbox({ name: 'CheckBox_voice', group: 'checkboxGroup' })
                .selectedColor('#007DFF')
                .onChange((value: boolean) => {
                  console.info('Checkbox2 change is' + value)
                  if (value) {
                    this.rendererSelectState_[RENDER_SYSTEM_IDX] = 1;
                  } else {
                    this.rendererSelectState_[RENDER_SYSTEM_IDX] = 0;
                  }
                })
              Text('SYSTEM').fontSize(12).lineHeight(20).fontColor('#182431').fontWeight(500)

              Select([{ value: '0' }, { value: '1' }])
                .value('privacy(def:0)')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.rendererPrivacy_[RENDER_SYSTEM_IDX] = index
                })
                .margin({ left: 5 })

              Select([{ value: '0' }, { value: '1' }])
                .value('capturer?')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.capturerFilter_[RENDER_SYSTEM_IDX] = index
                })
                .margin({ left: 5 })
            }.margin({ left: 28 })
          }

          Row() {
            // 选项12:STREAM_USAGE_GAME
            Flex({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
              Checkbox({ name: 'CheckBox_voice', group: 'checkboxGroup' })
                .selectedColor('#007DFF')
                .onChange((value: boolean) => {
                  console.info('Checkbox2 change is' + value)
                  if (value) {
                    this.rendererSelectState_[RENDER_GAME_IDX] = 1;
                  } else {
                    this.rendererSelectState_[RENDER_GAME_IDX] = 0;
                  }
                })
              Text('GAME').fontSize(12).lineHeight(20).fontColor('#182431').fontWeight(500)

              Select([{ value: '0' }, { value: '1' }])
                .value('privacy(def:0)')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.rendererPrivacy_[RENDER_GAME_IDX] = index
                })
                .margin({ left: 5 })

              Select([{ value: '0' }, { value: '1' }])
                .value('capturer?')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.capturerFilter_[RENDER_GAME_IDX] = index
                })
                .margin({ left: 5 })
            }.margin({ left: 28 })
          }

          Row() {
            // 选项13:STREAM_USAGE_AUDIOBOOK
            Flex({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
              Checkbox({ name: 'CheckBox_voice', group: 'checkboxGroup' })
                .selectedColor('#007DFF')
                .onChange((value: boolean) => {
                  console.info('Checkbox2 change is' + value)
                  if (value) {
                    this.rendererSelectState_[RENDER_AUDIOBOOK_IDX] = 1;
                  } else {
                    this.rendererSelectState_[RENDER_AUDIOBOOK_IDX] = 0;
                  }
                })
              Text('AUDIOBOOK').fontSize(12).lineHeight(20).fontColor('#182431').fontWeight(500)

              Select([{ value: '0' }, { value: '1' }])
                .value('privacy(def:0)')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.rendererPrivacy_[RENDER_AUDIOBOOK_IDX] = index
                })
                .margin({ left: 5 })

              Select([{ value: '0' }, { value: '1' }])
                .value('capturer?')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.capturerFilter_[RENDER_AUDIOBOOK_IDX] = index
                })
                .margin({ left: 5 })
            }.margin({ left: 28 })
          }

          Row() {
            // 选项14:STREAM_USAGE_NAVIGATION
            Flex({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
              Checkbox({ name: 'CheckBox_voice', group: 'checkboxGroup' })
                .selectedColor('#007DFF')
                .onChange((value: boolean) => {
                  console.info('Checkbox2 change is' + value)
                  if (value) {
                    this.rendererSelectState_[RENDER_NAVIGATION_IDX] = 1;
                  } else {
                    this.rendererSelectState_[RENDER_NAVIGATION_IDX] = 0;
                  }
                })
              Text('NAVIGATION').fontSize(12).lineHeight(20).fontColor('#182431').fontWeight(500)

              Select([{ value: '0' }, { value: '1' }])
                .value('privacy(def:0)')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.rendererPrivacy_[RENDER_NAVIGATION_IDX] = index
                })
                .margin({ left: 5 })

              Select([{ value: '0' }, { value: '1' }])
                .value('capturer?')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.capturerFilter_[RENDER_NAVIGATION_IDX] = index
                })
                .margin({ left: 5 })
            }.margin({ left: 28 })
          }

          Row() {
            // 选项15:STREAM_USAGE_DTMF
            Flex({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
              Checkbox({ name: 'CheckBox_voice', group: 'checkboxGroup' })
                .selectedColor('#007DFF')
                .onChange((value: boolean) => {
                  console.info('Checkbox2 change is' + value)
                  if (value) {
                    this.rendererSelectState_[RENDER_DTMF_IDX] = 1;
                  } else {
                    this.rendererSelectState_[RENDER_DTMF_IDX] = 0;
                  }
                })
              Text('DTMF').fontSize(12).lineHeight(20).fontColor('#182431').fontWeight(500)

              Select([{ value: '0' }, { value: '1' }])
                .value('privacy(def:0)')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.rendererPrivacy_[RENDER_DTMF_IDX] = index
                })
                .margin({ left: 5 })

              Select([{ value: '0' }, { value: '1' }])
                .value('capturer?')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.capturerFilter_[RENDER_DTMF_IDX] = index
                })
                .margin({ left: 5 })
            }.margin({ left: 28 })
          }

          Row() {
            // 选项16:STREAM_USAGE_ENFORCED_TONE
            Flex({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
              Checkbox({ name: 'CheckBox_voice', group: 'checkboxGroup' })
                .selectedColor('#007DFF')
                .onChange((value: boolean) => {
                  console.info('Checkbox2 change is' + value)
                  if (value) {
                    this.rendererSelectState_[RENDER_ENFORCED_TONE_IDX] = 1;
                  } else {
                    this.rendererSelectState_[RENDER_ENFORCED_TONE_IDX] = 0;
                  }
                })
              Text('ENFORCED_TONE').fontSize(12).lineHeight(20).fontColor('#182431').fontWeight(500)

              Select([{ value: '0' }, { value: '1' }])
                .value('privacy(def:0)')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.rendererPrivacy_[RENDER_ENFORCED_TONE_IDX] = index
                })
                .margin({ left: 5 })

              Select([{ value: '0' }, { value: '1' }])
                .value('capturer?')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.capturerFilter_[RENDER_ENFORCED_TONE_IDX] = index
                })
                .margin({ left: 5 })
            }.margin({ left: 28 })
          }

          Row() {
            // 选项17:STREAM_USAGE_ULTRASONIC
            Flex({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
              Checkbox({ name: 'CheckBox_voice', group: 'checkboxGroup' })
                .selectedColor('#007DFF')
                .onChange((value: boolean) => {
                  console.info('Checkbox2 change is' + value)
                  if (value) {
                    this.rendererSelectState_[RENDER_ULTRASONIC_IDX] = 1;
                  } else {
                    this.rendererSelectState_[RENDER_ULTRASONIC_IDX] = 0;
                  }
                })
              Text('ULTRASONIC').fontSize(12).lineHeight(20).fontColor('#182431').fontWeight(500)

              Select([{ value: '0' }, { value: '1' }])
                .value('privacy(def:0)')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.rendererPrivacy_[RENDER_ULTRASONIC_IDX] = index
                })
                .margin({ left: 5 })

              Select([{ value: '0' }, { value: '1' }])
                .value('capturer?')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.capturerFilter_[RENDER_ULTRASONIC_IDX] = index
                })
                .margin({ left: 5 })
            }.margin({ left: 28 })
          }

          Row() {
//             选项18:STREAM_USAGE_NOTIFICATION_RINGTONE
            Flex({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
              Checkbox({ name: 'CheckBox_voice', group: 'checkboxGroup' })
                .selectedColor('#007DFF')
                .onChange((value: boolean) => {
                  console.info('Checkbox2 change is' + value)
                  if (value) {
                    this.rendererSelectState_[RENDER_NOTIFICATION_RINGTONE_IDX] = 1;
                  } else {
                    this.rendererSelectState_[RENDER_NOTIFICATION_RINGTONE_IDX] = 0;
                  }
                })
              Text('NOTIFICATION_RINGTONE').fontSize(12).lineHeight(20).fontColor('#182431').fontWeight(500)

              Select([{ value: '0' }, { value: '1' }])
                .value('privacy(def:0)')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.rendererPrivacy_[RENDER_NOTIFICATION_RINGTONE_IDX] = index
                })
                .margin({ left: 5 })

              Select([{ value: '0' }, { value: '1' }])
                .value('capturer?')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.capturerFilter_[RENDER_NOTIFICATION_RINGTONE_IDX] = index
                })
                .margin({ left: 5 })
            }.margin({ left: 28 })
          }

          Row() {
            // 选项19:STREAM_USAGE_MOVIE
            Flex({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
              Checkbox({ name: 'CheckBox_voice', group: 'checkboxGroup' })
                .selectedColor('#007DFF')
                .onChange((value: boolean) => {
                  console.info('Checkbox2 change is' + value)
                  if (value) {
                    this.rendererSelectState_[RENDER_MOVIE_IDX] = 1;
                  } else {
                    this.rendererSelectState_[RENDER_MOVIE_IDX] = 0;
                  }
                })
              Text('MOVIE').fontSize(12).lineHeight(20).fontColor('#182431').fontWeight(500)

              Select([{ value: '0' }, { value: '1' }])
                .value('privacy(def:0)')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.rendererPrivacy_[RENDER_MOVIE_IDX] = index
                })
                .margin({ left: 5 })

              Select([{ value: '0' }, { value: '1' }])
                .value('capturer?')
                .font({ size: 16, weight: 200 })
                .fontColor('#ff0b3f75')
                .selectedOptionFont({ size: 12, weight: 100 })
                .optionFont({ size: 12, weight: 400 })
                .onSelect((index: number) => {
                  console.info('Select:' + index)
                  this.capturerFilter_[RENDER_MOVIE_IDX] = index
                })
                .margin({ left: 5 })
            }.margin({ left: 28 })
          }

          Row() {
            Button() {
              Text("音频播放").fontSize(18).fontColor(Color.White)
            }.width('40%').height(60).onClick(() => {
              this.CreateAndStartSelectRenders()
            }).margin({ left: 10 })
            Button() {
              Text("停止播放").fontSize(18).fontColor(Color.White)
            }.width('40%').height(60).onClick(() => {
              this.PlayStop()
            }).margin({ right: 10 })
          }.justifyContent(FlexAlign.SpaceBetween).width('100%').margin({ top: 10 })


          Divider().strokeWidth(6).color(Color.Gray).margin({ top: 10 })
          Row() {
            Text("录制参数").fontSize(12).lineHeight(20).fontColor('#182431').fontWeight(500)
          }

          Row() {
            Flex({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
              Select(this.samplingRateList).value(this.selectedSamplingRateKey)
                .onSelect((index, value) => {
                  this.selectedSamplingRateKey = value
                  this.audioCapturerOptions.streamInfo.samplingRate = audio.AudioSamplingRate[value]
                })
                .font({ size: 12 })
                .selectedOptionFont({ size: 12, weight: 100 })
            }.margin({ left: 24 })
          }

          Row() {
            Flex({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
              Select(this.channelsList).value(this.selectedChannelKey)
                .onSelect((index, value) => {
                  this.selectedChannelKey = value
                  this.audioCapturerOptions.streamInfo.channels = audio.AudioChannel[value]
                })
                .font({ size: 12 })
                .selectedOptionFont({ size: 12, weight: 100 })
            }
          }.margin({ left: 24 })

          Row() {
            Flex({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
              Select(this.sampleFormatList).value(this.selectedSampleFormatKey)
                .onSelect((index, value) => {
                  this.selectedSampleFormatKey = value
                  this.audioCapturerOptions.streamInfo.sampleFormat = audio.AudioSampleFormat[value]
                })
                .font({ size: 12 })
                .selectedOptionFont({ size: 12, weight: 100 })
            }
          }.margin({ left: 24 })

          Row() {
            Flex({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
              Select(this.encodingTypeList).value(this.selectedEncodingTypeKey)
                .onSelect((index, value) => {
                  this.selectedEncodingTypeKey = value
                  this.audioCapturerOptions.streamInfo.encodingType = audio.AudioEncodingType[value]
                })
                .font({ size: 12 })
                .selectedOptionFont({ size: 12, weight: 100 })
            }
          }.margin({ left: 24 })

          Divider().strokeWidth(6).color(Color.Gray).margin({ top: 10 })

          Row() {
            Button() {
              Text(this.recordText).fontSize(18).fontColor(Color.White)
            }.width('100%').height(60).onClick(() => {
              if (this.capturer_ === null) {
                this.startRecord()
              }
              if (this.capturer_ !== null && this.recordState_ === audio.AudioState.STATE_RUNNING) {
                this.stopRecord()
              }
            })
          }.justifyContent(FlexAlign.SpaceBetween).width('100%').margin({ top: 10 })

          Row() {
            Button() {
              Text(this.StreamText).fontSize(18).fontColor(Color.White)
            }.width('100%').height(60).onClick(() => {
              if (this.capturer_ === null) {
                this.startRecord()
              }
              if (this.capturer_ !== null && this.recordState_ === audio.AudioState.STATE_RUNNING) {
                this.getStreamInfo()
              }
            })
          }.justifyContent(FlexAlign.SpaceBetween).width('100%').margin({ top: 10 })

          Row() {
            Button() {
              Text(this.capRenderText_).fontSize(18).fontColor(Color.White)
            }.width('100%').height(60).onClick(() => {
              if (this.capRender_ === null) {
                this.playRecordData()
              }
              if (this.capRender_ !== null && this.capRenderState_ === 1) {
                this.playRecordDataStop()
              }
            })
          }.justifyContent(FlexAlign.SpaceBetween).width('100%').margin({ top: 10 })

        }
      }.margin({ top: 50 }).width('100%')
    }.backgroundColor('#F1F3F5')
  }
}