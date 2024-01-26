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
struct RendererInterruptRenderer {
  private audioRendererOptions  = [
    {
      streamInfo: {
        samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_44100,
        channels: audio.AudioChannel.CHANNEL_2,
        sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
        encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
      },
      rendererInfo: {
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_VOICE_COMMUNICATION,
        rendererFlags: 0
      }
    },
    {
      streamInfo: {
        samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_44100,
        channels: audio.AudioChannel.CHANNEL_2,
        sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
        encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
      },
      rendererInfo: {
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_VOICE_COMMUNICATION,
        rendererFlags: 0
      }
    }
  ]
  private audioRenderers = [null,null]
  private AudioRendererType = []
  private paths=[globalThis.pathDir + '/test_44100_2.wav',globalThis.pathDir + '/safe_and_sound_32.wav']
  @State returnMsg: string = `hello`
  @State onReturnMsgs: Array<string> = [`hello`,`hello`]
  @State bufferSize: number = 0
  private arr=[0,1]
  @State modes:Array<number>=[1,1]
  @State selectedContentTypeKeys: Array<string> = ["CONTENT_TYPE_MUSIC","CONTENT_TYPE_MUSIC"]
  @State selectedStreamUsageKeys: Array<string> = ["STREAM_USAGE_MEDIA","STREAM_USAGE_MEDIA"]
  private volumeTypeList = []
  @State selectedVolumeTypeKeys: Array<string> = ["请选择流类型","请选择流类型"]

  private writeArr=[0,0]

  private renderInfo = {
    'MUSIC_1': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_UNKNOWN,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_MUSIC',
        selectedStreamUsageKey:'STREAM_USAGE_UNKNOWN'
      }
    },
    'MUSIC_2': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_MUSIC,
        usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_MUSIC',
        selectedStreamUsageKey:'STREAM_USAGE_MEDIA'
      }
    },
    'MUSIC_3': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey:'STREAM_USAGE_MEDIA'
      }
    },
    'MUSIC_4': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_MUSIC,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey:'STREAM_USAGE_MUSIC'
      }
    },
    'VOICE_CALL_1': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_SPEECH,
        usage: audio.StreamUsage.STREAM_USAGE_VOICE_COMMUNICATION,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_SPEECH',
        selectedStreamUsageKey:'STREAM_USAGE_VOICE_COMMUNICATION'
      }
    },
    'VOICE_CALL_2': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_VOICE_COMMUNICATION,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey:'STREAM_USAGE_VOICE_COMMUNICATION'
      }
    },
    'SYSTEM': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_SYSTEM,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey:'STREAM_USAGE_SYSTEM'
      }
    },
    'RING_1': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_MUSIC,
        usage: audio.StreamUsage.STREAM_USAGE_NOTIFICATION_RINGTONE,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_MUSIC',
        selectedStreamUsageKey:'STREAM_USAGE_NOTIFICATION_RINGTONE'
      }
    },
    'RING_2': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_SONIFICATION,
        usage: audio.StreamUsage.STREAM_USAGE_NOTIFICATION_RINGTONE,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_SONIFICATION',
        selectedStreamUsageKey:'STREAM_USAGE_NOTIFICATION_RINGTONE'
      }
    },
    'RING_3': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_RINGTONE,
        usage: audio.StreamUsage.STREAM_USAGE_UNKNOWN,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_RINGTONE',
        selectedStreamUsageKey:'STREAM_USAGE_UNKNOWN'
      }
    },
    'RING_4': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_RINGTONE,
        usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_RINGTONE',
        selectedStreamUsageKey:'STREAM_USAGE_MEDIA'
      }
    },
    'RING_5': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_RINGTONE,
        usage: audio.StreamUsage.STREAM_USAGE_NOTIFICATION_RINGTONE,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_RINGTONE',
        selectedStreamUsageKey:'STREAM_USAGE_NOTIFICATION_RINGTONE'
      }
    },
    'RING_6': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_NOTIFICATION_RINGTONE,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey:'STREAM_USAGE_NOTIFICATION_RINGTONE'
      }
    },
    'RING_7': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_RINGTONE,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey:'STREAM_USAGE_RINGTONE'
      }
    },
    'MOVIE_1': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_MOVIE,
        usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_MOVIE',
        selectedStreamUsageKey:'STREAM_USAGE_MEDIA'
      }
    },
    'MOVIE_2': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_MOVIE,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey:'STREAM_USAGE_MOVIE'
      }
    },
    'GAME': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_GAME,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey:'STREAM_USAGE_GAME'
      }
    },
    'SPEECH_1': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_SPEECH,
        usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_SPEECH',
        selectedStreamUsageKey:'STREAM_USAGE_MEDIA'
      }
    },
    'SPEECH_2': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_AUDIOBOOK,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey:'STREAM_USAGE_AUDIOBOOK'
      }
    },
    'ALARM_1': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_MUSIC,
        usage: audio.StreamUsage.STREAM_USAGE_ALARM,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_MUSIC',
        selectedStreamUsageKey:'STREAM_USAGE_ALARM'
      }
    },
    'ALARM_2': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_ALARM,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey:'STREAM_USAGE_ALARM'
      }
    },
    'NOTIFICATION_1': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_SONIFICATION,
        usage: audio.StreamUsage.STREAM_USAGE_UNKNOWN,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_SONIFICATION',
        selectedStreamUsageKey:'STREAM_USAGE_UNKNOWN'
      }
    },
    'NOTIFICATION_2': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_SONIFICATION,
        usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_SONIFICATION',
        selectedStreamUsageKey:'STREAM_USAGE_MEDIA'
      }
    },
    'NOTIFICATION_3': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_NOTIFICATION,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey:'STREAM_USAGE_NOTIFICATION'
      }
    },
    'ACCESSIBILITY_1': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_SPEECH,
        usage: audio.StreamUsage.STREAM_USAGE_ACCESSIBILITY,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_SPEECH',
        selectedStreamUsageKey:'STREAM_USAGE_ACCESSIBILITY'
      }
    },
    'ACCESSIBILITY_2': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_ACCESSIBILITY,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey:'STREAM_USAGE_ACCESSIBILITY'
      }
    },

    'DTMF': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_DTMF,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey:'STREAM_USAGE_DTMF'
      }
    },

    'VOICE_ASSISTANT_1': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_SPEECH,
        usage: audio.StreamUsage.STREAM_USAGE_VOICE_ASSISTANT,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_SPEECH',
        selectedStreamUsageKey:'STREAM_USAGE_VOICE_ASSISTANT'
      }
    },
    'VOICE_ASSISTANT_2': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_MUSIC,
        usage: audio.StreamUsage.STREAM_USAGE_VOICE_ASSISTANT,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_MUSIC',
        selectedStreamUsageKey:'STREAM_USAGE_VOICE_ASSISTANT'
      }
    },
    'VOICE_ASSISTANT_3': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_VOICE_ASSISTANT,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey:'STREAM_USAGE_VOICE_ASSISTANT'
      }
    },
    'ULTRASONIC': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_ULTRASONIC,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey:'STREAM_USAGE_ULTRASONIC'
      }
    },
    'ENFORCED': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_ENFORCED_TONE,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey:'STREAM_USAGE_ENFORCED_TONE'
      }
    },
    'NAVIGATION': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_NAVIGATION,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey:'STREAM_USAGE_NAVIGATION'
      }
    },
    'MESSAGE': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
        usage: audio.StreamUsage.STREAM_USAGE_VOICE_MESSAGE,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_UNKNOWN',
        selectedStreamUsageKey:'STREAM_USAGE_VOICE_MESSAGE'
      }
    },
    'ALL': {
      main:{
        content: audio.ContentType.CONTENT_TYPE_SPEECH,
        usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
        rendererFlags: 0
      },
      info:{
        selectedContentTypeKey:'CONTENT_TYPE_SPEECH',
        selectedStreamUsageKey:'STREAM_USAGE_MEDIA'
      }
    },

  }

  //@State mode:number=1
  aboutToAppear() {
//    for (let key in AudioRendererType) {
//      this.volumeTypeList.push({ value: key })
//    }
    //实际volumetype没有，这三个流类型与music的流类型策略一致
    this.volumeTypeList.push({ value: 'MUSIC_1' })
    this.volumeTypeList.push({ value: 'MUSIC_2' })
    this.volumeTypeList.push({ value: 'MUSIC_3' })
    this.volumeTypeList.push({ value: 'MUSIC_4' })
    this.volumeTypeList.push({ value: 'VOICE_CALL_1' })
    this.volumeTypeList.push({ value: 'VOICE_CALL_2' })
    this.volumeTypeList.push({ value: 'SYSTEM' })
    this.volumeTypeList.push({ value: 'RING_1' })
    this.volumeTypeList.push({ value: 'RING_2' })
    this.volumeTypeList.push({ value: 'RING_3' })
    this.volumeTypeList.push({ value: 'RING_4' })
    this.volumeTypeList.push({ value: 'RING_5' })
    this.volumeTypeList.push({ value: 'RING_6' })
    this.volumeTypeList.push({ value: 'RING_7' })
    this.volumeTypeList.push({ value: 'MOVIE_1' })
    this.volumeTypeList.push({ value: 'MOVIE_2' })
    this.volumeTypeList.push({ value: 'GAME' })
    this.volumeTypeList.push({ value: 'SPEECH_1' })
    this.volumeTypeList.push({ value: 'SPEECH_2' })
    this.volumeTypeList.push({ value: 'ALARM_1' })
    this.volumeTypeList.push({ value: 'ALARM_2' })
    this.volumeTypeList.push({ value: 'NOTIFICATION_1' })
    this.volumeTypeList.push({ value: 'NOTIFICATION_2' })
    this.volumeTypeList.push({ value: 'NOTIFICATION_3' })
    this.volumeTypeList.push({ value: 'ACCESSIBILITY_1' })
    this.volumeTypeList.push({ value: 'ACCESSIBILITY_2' })
    this.volumeTypeList.push({ value: 'DTMF' })
    this.volumeTypeList.push({ value: 'VOICE_ASSISTANT_1' })
    this.volumeTypeList.push({ value: 'VOICE_ASSISTANT_2' })
    this.volumeTypeList.push({ value: 'VOICE_ASSISTANT_3' })
    this.volumeTypeList.push({ value: 'ULTRASONIC' })
    this.volumeTypeList.push({ value: 'ENFORCED' })
    this.volumeTypeList.push({ value: 'NAVIGATION' })
    this.volumeTypeList.push({ value: 'MESSAGE' })
    this.volumeTypeList.push({ value: 'ALL' })


  }
  async onBackPress(){
    if (this.audioRenderers[0] !== null) {
       await this.audioRenderers[0].release()
    }
    if (this.audioRenderers[1] !== null) {
       await this.audioRenderers[1].release()
    }
  }
  createAudioRenderer(index) {
    if(this.selectedVolumeTypeKeys[index]=="请选择流类型"){
      this.returnMsg += `audioRenderer ${index}  请选择流类型\n`
      return
    }
    if (this.audioRenderers[index] !== null) {
      this.returnMsg = `audioRenderer ${index} Created already,don't create anymore`
      return
    }
    let _this = this
    audio.createAudioRenderer(this.audioRendererOptions[index], async (err, data) => {
      console.error("this.audioRendererOptions----------"+index+"------:"+JSON.stringify(this.audioRendererOptions[index]))
      if (err) {
        _this.returnMsg = `audioRenderer ${index} Created : Error: ${JSON.stringify(err)}`
      } else {
        _this.audioRenderers[index] = data;
        _this.returnMsg += `audioRenderer ${index} Created : SUCCESS,state:${_this.audioRenderers[index].state}\n`
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
          await this.audioRenderers[index].write(buf)

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

  setInterruptModeCallback(index){
    if (this.audioRenderers[index] == null) {
      this.returnMsg = `audioRenderer ${index} instance had not created,dont‘t allow to setInterruptModeCallback\n`
      return
    }
    let mode = this.modes[index];
    let _this = this
    this.audioRenderers[index].setInterruptMode(mode, (err, data)=>{
      if(err){
        _this.returnMsg = `audioRenderer ${index} setInterruptMode callback : Error: ${JSON.stringify(err)}\n`
      }
      _this.returnMsg = `audioRenderer ${index} setInterruptMode callback : Success\n`
    });
  }

  setInterruptModePromise(index){
    if (this.audioRenderers[index] == null) {
      this.returnMsg = `audioRenderer ${index} instance had not created,dont‘t allow to setInterruptModePromise\n`
      return
    }
    let mode = this.modes[index];
    let _this = this
    this.audioRenderers[index].setInterruptMode(mode)
      .then(()=>{
        _this.returnMsg = `audioRenderer ${index} setInterruptMode promise : Success\n`
      })
      .catch(err=>{
        _this.returnMsg = `audioRenderer ${index} setInterruptMode promise : Error: ${JSON.stringify(err)}\n`
      })
  }

  onInterrupt(index){

    if (this.audioRenderers[index] == null) {
      this.returnMsg = `audioRenderer ${index} instance had not created,dont‘t allow to onInterrupt \n`
      return
    }
    let _this = this
    _this.onReturnMsgs[index]=`已监听`
    this.audioRenderers[index].on('audioInterrupt', async(interruptEvent) => {
      //console.log('interruptEvent:'+JSON.stringify(interruptEvent))
      _this.onReturnMsgs[index]=JSON.stringify(interruptEvent)
      if(interruptEvent.hintType==2||interruptEvent.hintType==3){
        await _this.audioRenderers[index].pause()
      }else if(interruptEvent.hintType==1){
        await _this.audioRenderers[index].start()
      }

    })
  }

  offInterrupt(index) {

    if (this.audioRenderers[index] == null) {
      this.returnMsg = `audioRenderer ${index} instance had not created,dont‘t allow to offInterrupt \n`
      return
    }
    let _this = this
    _this.onReturnMsgs[index] = `已取消监听`
    this.audioRenderers[index].off('audioInterrupt')
  }


  build() {
    Column() {
      Row() {
        Column() {
          Text("【音频渲染-音频打断】返回数据：").fontWeight(FontWeight.Bolder).position({ x: 10, y: 5 }).fontSize(18)
          Text(this.returnMsg).position({ x: 10, y: 30 }).fontSize(14)
        }.width('98%').height(120).backgroundColor(Color.Orange).position({ x: '1%' })
      }.position({ x: 0, y: 0 }).width('100%').zIndex(999)

      Scroll() {
        Column() {
          ForEach(this.arr, (item: number) => {
            Row() {
              Select(this.volumeTypeList).value(this.selectedVolumeTypeKeys[item])
                .onSelect((index, value) => {
                  this.selectedVolumeTypeKeys[item] = value
                  this.audioRendererOptions[item].rendererInfo=this.renderInfo[this.selectedVolumeTypeKeys[item]].main
                  this.selectedStreamUsageKeys[item]=this.renderInfo[this.selectedVolumeTypeKeys[item]].info.selectedStreamUsageKey
                  this.selectedContentTypeKeys[item]=this.renderInfo[this.selectedVolumeTypeKeys[item]].info.selectedContentTypeKey
                })
            }.margin({ top: 20 })
            if(this.selectedVolumeTypeKeys[item]!=="请选择流类型"){
              Text(this.selectedContentTypeKeys[item]).fontSize(16).lineHeight(40)
              Text(this.selectedStreamUsageKeys[item]).fontSize(16).lineHeight(40)
            }
            Divider().strokeWidth(2).color(Color.Blue)

            Row() {
              Text("焦点模式").fontSize(24)
              Radio({ value: `mute${item}1`, group: `modeGroup${item}` }).onChange((isChecked) => {
                if (isChecked) {
                  this.modes[item] = 0;
                } else {
                  this.modes[item] = 1;
                }
              }).checked(this.modes[item] == 0)
              Text("共享焦点").fontSize(18)

              Radio({ value: `mute${item}2`, group: `modeGroup${item}`  }).onChange((isChecked) => {
                if (isChecked) {
                  this.modes[item] = 1;
                } else {
                  this.modes[item] = 0;
                }
              }).checked(this.modes[item] == 1)
              Text("独立焦点").fontSize(18)
            }
            Text(`焦点数据：${this.modes[item]}`).fontSize(24)
            Row() {
              Button() {
                Text("setInterruptMode callback").fontSize(22).fontColor(Color.White)
              }.width('49%').height(60).onClick(() => {
                 this.setInterruptModeCallback(item)
              })

              Button() {
                Text("setInterruptMode promise").fontSize(22).fontColor(Color.White)
              }.width('49%').height(60).onClick(() => {
                this.setInterruptModePromise(item)
              })
            }.margin({ top: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

            Row() {
              Button() {
                Text("onInterrupt").fontSize(22).fontColor(Color.White)
              }.width('49%').height(60).onClick(() => {
                this.onInterrupt(item)
              })
              Button() {
                Text("offInterrupt").fontSize(22).fontColor(Color.White)
              }.width('49%').height(60).onClick(() => {
                this.offInterrupt(item)
              })
            }.margin({ top: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

            Text(this.onReturnMsgs[item]).fontSize(22)

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
                Text("stop").fontSize(22).fontColor(Color.Blue)
              }.width('49%').height(60).backgroundColor(Color.Pink).onClick(() => this.stopRenderer(item))

              Button() {
                Text("release").fontSize(22).fontColor(Color.Blue)
              }.width('49%').height(60).backgroundColor(Color.Pink).onClick(() => this.releaseRenderer(item))
            }.margin({ top: 10, bottom: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)
            Divider().strokeWidth(10).color(Color.Blue)
          }, (item: number) => item.toString())
        }.width('100%')
      }.margin({ top: 130 }).width('100%')

    }
  }
}