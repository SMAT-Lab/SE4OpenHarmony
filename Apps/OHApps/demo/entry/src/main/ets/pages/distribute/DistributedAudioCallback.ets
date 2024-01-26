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
import { AxisValue } from '@ohos.multimodalInput.mouseEvent';
import avsession from '@ohos.multimedia.avsession';

@Entry
@Component
struct DistributedAudioCallback {
  private audioRendererOptions  = {
    streamInfo: {
      samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_44100,
      channels: audio.AudioChannel.CHANNEL_1,
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
  @State bufferSize: number = 0
  @State isBlockingRead: boolean = true
  private tag: String = 'qlw'
  @State isWrite:boolean=false

  private fd: number = undefined
  // @ts-ignore
  private offset: number = undefined
  private length: number = undefined
  private audioManager: audio.AudioManager = undefined
  private audioRoutingManager: audio.AudioRoutingManager = undefined
  private audioVolumeManager: audio.AudioVolumeManager = undefined
  private audioVolumeGroupManager: audio.AudioVolumeGroupManager = undefined
  @State networkIdList: Array<SelectOption> = []
  @State selectedNetworkIdKey: string = "networkId"
  @State groupIdList: Array<SelectOption> = []
  @State selectedGroupIdKey: string = 'groupId'
  @State volumeTypeList: Array<SelectOption> = []
  @State selectedVolumeType: number = -1
  @State selectedVolumeTypeKey: string = 'volumeType'
  @State selectVolumeKey: string = 'volume'
  @State selectedVolumeAudioManager: number = 0; //音量大小
  @State selectedVolumeVolumeGroupManager: number = 0; //音量大小
  @State minVolumeVolumeGroupManager: number = 0;
  @State maxVolumeVolumeGroupManager: number = 15;
  @State minVolumeAudioManager: number = 0;
  @State maxVolumeAudioManager: number = 15;
  @State selectedContentTypeKey: string = "CONTENT_TYPE_MUSIC"
  @State selectedStreamUsageKey: string = "STREAM_USAGE_MEDIA"
  private muteList = [
  { value: false + '' },
  { value: true + '' }
]
  @State selectedMuteValue: boolean = false
  @State selectedMuteKey: string = 'muteFlag'
  private renderInfo = {
    'RINGTONE': {
      main: {
        content: audio.ContentType.CONTENT_TYPE_RINGTONE,
        usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
        rendererFlags: 0
      },
      info: {
        selectedContentTypeKey: 'CONTENT_TYPE_RINGTONE',
        selectedStreamUsageKey: 'STREAM_USAGE_MEDIA'
      }
    },
    'MEDIA': {
      main: {
        content: audio.ContentType.CONTENT_TYPE_MUSIC,
        usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
        rendererFlags: 0
      },
      info: {
        selectedContentTypeKey: 'CONTENT_TYPE_MUSIC',
        selectedStreamUsageKey: 'STREAM_USAGE_MEDIA'
      }
    },
    'VOICE_CALL': {
      main: {
        content: audio.ContentType.CONTENT_TYPE_SPEECH,
        usage: audio.StreamUsage.STREAM_USAGE_VOICE_COMMUNICATION,
        rendererFlags: 0
      },
      info: {
        selectedContentTypeKey: 'CONTENT_TYPE_SPEECH',
        selectedStreamUsageKey: 'STREAM_USAGE_VOICE_COMMUNICATION'
      }
    },
    'VOICE_ASSISTANT': {
      main: {
        content: audio.ContentType.CONTENT_TYPE_SPEECH,
        usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
        rendererFlags: 0
      },
      info: {
        selectedContentTypeKey: 'CONTENT_TYPE_SPEECH',
        selectedStreamUsageKey: 'STREAM_USAGE_MEDIA'
      }
    },
    'ALL': {
      main: {
        content: audio.ContentType.CONTENT_TYPE_SPEECH,
        usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
        rendererFlags: 0
      },
      info: {
        selectedContentTypeKey: 'CONTENT_TYPE_SPEECH',
        selectedStreamUsageKey: 'STREAM_USAGE_MEDIA'
      }
    },
    'ALARM': {
      main: {
        content: audio.ContentType.CONTENT_TYPE_MUSIC,
        usage: audio.StreamUsage.STREAM_USAGE_ALARM,
        rendererFlags: 0
      },
      info: {
        selectedContentTypeKey: 'CONTENT_TYPE_MUSIC',
        selectedStreamUsageKey: 'STREAM_USAGE_ALARM'
      }
    },
    'ACCESSIBILITY': {
      main: {
        content: audio.ContentType.CONTENT_TYPE_SPEECH,
        usage: audio.StreamUsage.STREAM_USAGE_ACCESSIBILITY,
        rendererFlags: 0
      },
      info: {
        selectedContentTypeKey: 'CONTENT_TYPE_SPEECH',
        selectedStreamUsageKey: 'STREAM_USAGE_ACCESSIBILITY'
      }
    },
   'ULTRASONIC': {
     main: {
       content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
       usage: audio.StreamUsage.STREAM_USAGE_ULTRASONIC,
       rendererFlags: 0
     },
     info: {
       selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
       selectedStreamUsageKey: 'STREAM_USAGE_ULTRASONIC'
     }
   }
  }
  @State deviceList: Array<SelectOption> = []
  @State selectedDeviceKey: string = 'deviceType'
  @State selectedDevice: number = -1
  @State deviceRoleList: Array<SelectOption> = []
  @State selectedRoleKey: string = 'deviceRole'
  @State selectedRole: number = -1

  scroller: Scroller = new Scroller()

  async onBackPress(){
    if(this.audioRenderer!==null){
      await this.audioRenderer.release()
    }
    // @ts-ignore
    if(this.volumeTypeList != []){
      this.volumeTypeList = []
    }
    // @ts-ignore
    if(this.networkIdList != []){
      this.networkIdList = []
    }
    // @ts-ignore
    if(this.groupIdList != []){
      this.groupIdList = []
    }
  }

  async aboutToAppear(){
    this.networkIdList.push({ value: audio.LOCAL_NETWORK_ID })
    console.info(`${this.tag} networkIdList 1 : ${JSON.stringify(this.networkIdList)}`)
    this.groupIdList.push({value: String(audio.DEFAULT_VOLUME_GROUP_ID)})
    console.info(`${this.tag} groupIdList 1 : ${JSON.stringify(this.groupIdList)}`)
    console.info(`${this.tag} LOCAL_NETWORK_ID : ${audio.LOCAL_NETWORK_ID}`)
    console.info(`${this.tag} DEFAULT_VOLUME_GROUP_ID : ${audio.DEFAULT_VOLUME_GROUP_ID}`)
    for (let key in audio.AudioVolumeType){
      this.volumeTypeList.push({ value: key })
    }
    console.info(`${this.tag} muteList : ${JSON.stringify(this.muteList)}`)
    for(let key in audio.DeviceType){
      if(key != 'MAX' && key != "NONE"){
        this.deviceList.push({value: key})
      }

    }
    console.info(`${this.tag} deviceList : ${JSON.stringify(this.deviceList)}`)
    for (let key in audio.DeviceRole){
      if (key == "INPUT_DEVICE" || key == "OUTPUT_DEVICE"){
        this.deviceRoleList.push({value: key})
      }

    }
    console.info(`${this.tag} deviceRoleList : ${JSON.stringify(this.deviceRoleList)}`)

    await this.createAVsession()
    this.audioManager = audio.getAudioManager()
    this.audioRoutingManager = this.audioManager.getRoutingManager()
    this.audioVolumeManager = this.audioManager.getVolumeManager()
    try{
      let outputAudioDeviceDescriptor = await this.audioRoutingManager.getDevices(audio.DeviceFlag.DISTRIBUTED_OUTPUT_DEVICES_FLAG)
      console.info(`${this.tag} goutputAudioDeviceDescriptor networkId: ${outputAudioDeviceDescriptor[0].networkId}`)
      this.networkIdList.push({ value: outputAudioDeviceDescriptor[0].networkId })
      console.info(`${this.tag} networkIdList 2 : ${JSON.stringify(this.networkIdList)}`)
      this.audioVolumeManager.getVolumeGroupInfos(outputAudioDeviceDescriptor[0].networkId, (err, data) => {
        if (err){
          this.returnMsg += `getVolumeGroupInfos err code: ${err.code}, err message:${err.message}\n`
        }
        this.returnMsg += `getVolumeGroupInfos success:` + JSON.stringify(data) + `\n`
        this.groupIdList.push({value: String(data[0].groupId)})
        console.info(`${this.tag} groupIdList 2 : ${JSON.stringify(this.groupIdList)}`)
      })
    }catch(err){
      console.info(`${this.tag} getDevices err : ${JSON.stringify(err)}`)
    }

  }

  async createAVsession(){
    try{
      // @ts-ignore
      let av = await avsession.createAVSession(globalThis.abilityContext, 'createNewSession', 'audio')
      console.info(`createAVsession success:` + JSON.stringify(av))
    }catch (err){
      console.info(`createAVsession err:` + JSON.stringify(err))
    }
  }

  createAudioRenderer() {
    if (this.audioRenderer !== null) {
      this.returnMsg = `audioRenderer Created already,don't create anymore`
      return
    }
    let _this = this
    audio.createAudioRenderer(this.audioRendererOptions, async (err, data) => {
      if (err) {
        _this.returnMsg = `audioRenderer Created : Error: ${JSON.stringify(err)}`
      } else {
        _this.audioRenderer = data;
        _this.returnMsg = `audioRenderer Created : SUCCESS,state:${_this.audioRenderer.state}\n`
      }
    })
  }

  rendererStart() {
    if (this.audioRenderer == null) {
      this.returnMsg = `audioRenderer instance had not created,dont‘t allow to start\n`
      return
    }
    let _this = this
    this.audioRenderer.start((err) => {
      if (err) {
        _this.returnMsg = `audioRenderer start : Error: ${JSON.stringify(err)}\n`
      } else {
        _this.returnMsg = `audioRenderer start : SUCCESS,state:${_this.audioRenderer.state}\n`
      }
    });
    try{
      globalThis.abilityContext.resourceManager.getRawFd("StarWars10s-1C-44100-2SW.wav").then(value => {
        this.fd = value.fd
        this.offset = value.offset
        this.length = value.length
        this.returnMsg += `getRawFd fd: ${this.fd}, offset: ${this.offset}, length: ${this.length}\n`
        console.info(`${this.tag} getRawFd success: fd: ${this.fd}, offset: ${this.offset}, length: ${this.length}`)
      }).catch(err => {
        this.returnMsg += `getRawFd fail err: ${err}, message: ${err.message}, code: ${err.code}\n`;
        console.info(`${this.tag} getRawFd fail err: ${err}, message: ${err.message}, code: ${err.code}`)
      })
    }catch(err){
      console.info(`${this.tag} getRawFd fail err1: ${err}, message: ${err.message}, code: ${err.code}`)
    }
  }

  getBufferSize() {
    if (this.audioRenderer == null) {
      this.returnMsg = `audioRenderer instance had not created,dont‘t allow to getBufferSize`
      return
    }
    let _this = this
    _this.audioRenderer.getBufferSize((err, bufferSize) => {
      if (err) {
        _this.returnMsg = `audioRenderer getBufferSize : Error: ${JSON.stringify(err)}\n`
      } else {
        _this.returnMsg = `audioRenderer getBufferSize : SUCCESS,bufferSize:${bufferSize},state:${_this.audioRenderer.state}\n`
        _this.bufferSize = bufferSize
      }
    });
  }

  async onInterrupt(){

    if (this.audioRenderer == null) {
      this.returnMsg = `audioRenderer  instance had not created,dont‘t allow to onInterrupt \n`
      return
    }
    let _this = this
    _this.returnMsg=`已监听`
    this.audioRenderer.on('audioInterrupt', async(interruptEvent) => {
      //console.log('interruptEvent:'+JSON.stringify(interruptEvent))
      _this.returnMsg=JSON.stringify(interruptEvent)
      if(interruptEvent.hintType==2||interruptEvent.hintType==3){
        await _this.audioRenderer.pause()
      }else if(interruptEvent.hintType==1){
        await _this.audioRenderer.start()
      }

    })
  }


  async writeRenderer() {
    if (this.audioRenderer == null) {
      this.returnMsg += `audioRenderer instance had not created,dont‘t allow to read\n`
      return
    }
    if(this.isWrite===true){
      this.returnMsg += `不要重复点击write按钮 \n`
      return
    }
    this.isWrite=true

    if (this.bufferSize == 0) {
      this.bufferSize = await this.audioRenderer.getBufferSize()
    }

    let _this = this
    try {
      let len = this.length % this.bufferSize == 0 ? Math.floor(this.length / this.bufferSize) : Math.floor(this.length / this.bufferSize + 1);
      let buf = new ArrayBuffer(this.bufferSize);
      this.returnMsg = `audioRenderer write start.......... \n`
      while(true){
        for (let i = 0;i < len; i++) {
          let options = {
            offset: i * this.bufferSize  + this.offset,
            length: this.bufferSize
          }
          await fs.read(this.fd, buf, options)
          let writeSize = await new Promise((resolve,reject)=>{
            this.audioRenderer.write(buf,(err,writeSize)=>{
              if(err){
                reject(err)
              }else{
                resolve(writeSize)
              }
            })
          })
        }
      }
      _this.returnMsg += `audioRenderer write end, state:${_this.audioRenderer.state}\n`
    } catch (err) {
      this.returnMsg += `audioRenderer write : Error: ${JSON.stringify(err)}\n`
      console.info(`${this.tag} audioRenderer write err: ${err}, message: ${err.message}, code: ${err.code}`)
    }
  }

  drainRenderer(){
    if (this.audioRenderer == null) {
      this.returnMsg = `audioRenderer instance had not created,dont‘t allow to drain\n`
      return
    }
    let _this = this
    _this.audioRenderer.drain((err) => {
      if (err) {
        _this.returnMsg = `audioRenderer drain : Error: ${JSON.stringify(err)}\n`
      } else {
        _this.returnMsg = `audioRenderer drain : SUCCESS,state:${_this.audioRenderer.state}\n`
      }
    })
  }

  stopRenderer() {
    if (this.audioRenderer == null) {
      this.returnMsg = `audioRenderer instance had not created,dont‘t allow to stop\n`
      return
    }
    let _this = this
    _this.audioRenderer.stop((err) => {
      if (err) {
        _this.returnMsg = `audioRenderer stop : Error: ${JSON.stringify(err)}\n`
      } else {
        _this.returnMsg = `audioRenderer stop : SUCCESS,state:${_this.audioRenderer.state}\n`
      }
    })
  }

  pauseRenderer() {
    if (this.audioRenderer == null) {
      this.returnMsg = `audioRenderer instance had not created,dont‘t allow to pause\n`
      return
    }
    let _this = this
    _this.audioRenderer.pause((err) => {
      if (err) {
        _this.returnMsg = `audioRenderer pause : Error: ${JSON.stringify(err)}\n`
      } else {
        _this.returnMsg = `audioRenderer pause : SUCCESS,state:${_this.audioRenderer.state}\n`
      }
    })
  }

  releaseRenderer() {
    if (this.audioRenderer == null) {
      this.returnMsg = `audioRenderer instance had not created,dont‘t allow to release\n`
      return
    }
    let _this = this
    _this.audioRenderer.release((err) => {
      if (err) {
        _this.returnMsg = `audioRenderer release : Error: ${JSON.stringify(err)}\n`
      } else {
        _this.returnMsg = `audioRenderer release SUCCESS,state:${_this.audioRenderer.state}\n`
        _this.audioRenderer = null
        _this.isWrite=false
      }
    })
  }

  async selectOutputDeviceDistributed(){
    let outputAudioDeviceDescriptor = await this.audioRoutingManager.getDevices(audio.DeviceFlag.DISTRIBUTED_OUTPUT_DEVICES_FLAG)
    this.returnMsg += `selectOutputDevice DISTRIBUTED_OUTPUT_DEVICES_FLAG:` + JSON.stringify(outputAudioDeviceDescriptor) + `\n`
    this.audioRoutingManager.selectOutputDevice(outputAudioDeviceDescriptor, (err, data) => {
      if (err){
        this.returnMsg += `selectOutputDevice DISTRIBUTED_OUTPUT_DEVICES_FLAG err code: ${err.code}, err message:${err.message}\n`
      }
      this.returnMsg += `selectOutputDevice DISTRIBUTED_OUTPUT_DEVICES_FLAG success\n`
    })
  }

  selectOutputDeviceByFilterLocal(){
    let audioDeviceDescriptorsLocal
    this.audioRoutingManager.getDevices(audio.DeviceFlag.OUTPUT_DEVICES_FLAG, (err, data) => {
      if (err){
        this.returnMsg += `getDevices OUTPUT_DEVICES_FLAG err code: ${err.code}, err message:${err.message}\n`
      }
      audioDeviceDescriptorsLocal = data
      this.returnMsg += `getDevices OUTPUT_DEVICES_FLAG success: ${JSON.stringify(audioDeviceDescriptorsLocal)}\n`
    })
    let outputAudioRendererFilter = {
      rendererInfo: this.renderInfo[this.selectedVolumeTypeKey].main,
      rendererId: 0 };
    this.audioRoutingManager.selectOutputDeviceByFilter(outputAudioRendererFilter, audioDeviceDescriptorsLocal, (err) => {
      if (err){
        this.returnMsg += `selectOutputDeviceByFilter err code: ${err.code}, err message:${err.message}\n`
      }
      this.returnMsg += `selectOutputDeviceByFilter success\n`
    })
  }

  selectOutputDeviceByFilterDistributed(){
    let audioDeviceDescriptorsDistributed
    this.audioRoutingManager.getDevices(audio.DeviceFlag.DISTRIBUTED_OUTPUT_DEVICES_FLAG, (err, data) => {
      if (err){
        this.returnMsg += `getDevices OUTPUT_DEVICES_FLAG err code: ${err.code}, err message:${err.message}\n`
      }
      audioDeviceDescriptorsDistributed = data
      this.returnMsg += `getDevices OUTPUT_DEVICES_FLAG success: ${JSON.stringify(audioDeviceDescriptorsDistributed)}\n`
    })
    let outputAudioRendererFilter = {
      rendererInfo: this.renderInfo[this.selectedVolumeTypeKey].main,
      rendererId: 0 };
    this.audioRoutingManager.selectOutputDeviceByFilter(outputAudioRendererFilter, audioDeviceDescriptorsDistributed, (err) => {
      if (err){
        this.returnMsg += `selectOutputDeviceByFilter err code: ${err.code}, err message:${err.message}\n`
      }
      this.returnMsg += `selectOutputDeviceByFilter success\n`
    })
  }


  async selectOutputDeviceLocal(){
    let outputAudioDeviceDescriptor = await this.audioRoutingManager.getDevices(audio.DeviceFlag.OUTPUT_DEVICES_FLAG)
    this.returnMsg += `selectOutputDevice OUTPUT_DEVICES_FLAG:` + JSON.stringify(outputAudioDeviceDescriptor) + `\n`
    this.audioRoutingManager.selectOutputDevice(outputAudioDeviceDescriptor, (err, data) => {
      if (err){
        this.returnMsg += `selectOutputDevice OUTPUT_DEVICES_FLAG err code: ${err.code}, err message:${err.message}\n`
      }
      this.returnMsg += `selectOutputDevice OUTPUT_DEVICES_FLAG success\n`
    })
  }

  async selectOutputDevice(){
    let outputAudioDeviceDescriptor = [{
      deviceRole: this.selectedRole,
      deviceType: this.selectedDevice,
      id: 1,
      name: "",
      address: "",
      sampleRates: [44100],
      channelCounts: [1],
      channelMasks: [0],
      networkId: audio.LOCAL_NETWORK_ID,
      interruptGroupId: 1,
      volumeGroupId: 1,
      displayName: "HUAWEI MATE 40"
    }]
    try{
      this.audioRoutingManager.selectOutputDevice(outputAudioDeviceDescriptor, (err, data) => {
        if (err){
          console.info(`${this.tag} selectOutputDevice err code: ${err.code}, err message:${err.message}`)
          this.returnMsg += `selectOutputDevice: ${err.code}, err message:${err.message}\n`
        }else{
          console.info(`${this.tag} selectOutputDevice success`)
          this.returnMsg += `selectOutputDevice success\n`
        }

      })
    }catch(err){
      console.info(`${this.tag} selectOutputDevice err code: ${err.code}, err message:${err.message}`)
      this.returnMsg += `selectOutputDevice: ${err.code}, err message:${err.message}\n`
    }

  }

  async selectOutputDeviceByFilter(){
    try{
      let outputAudioDeviceDescriptor = [{
        deviceRole: this.selectedRole,
        deviceType: this.selectedDevice,
        id: 3,
        name: "",
        address: "",
        sampleRates: [0],
        channelCounts: [0],
        channelMasks: [0],
        networkId: this.selectedNetworkIdKey,
        interruptGroupId: 2,
        volumeGroupId: 2,
        displayName: ""
      }]

      let audioDeviceDescriptorsDistributed
      this.audioRoutingManager.getDevices(audio.DeviceFlag.DISTRIBUTED_OUTPUT_DEVICES_FLAG, (err, data) => {
        if (err){
          this.returnMsg += `getDevices DISTRIBUTED_OUTPUT_DEVICES_FLAG err code: ${err.code}, err message:${err.message}\n`
        }
        audioDeviceDescriptorsDistributed = data
        this.returnMsg += `getDevices DISTRIBUTED_OUTPUT_DEVICES_FLAG success: ${JSON.stringify(audioDeviceDescriptorsDistributed)}\n`
        console.info(`${this.tag} getDevices DISTRIBUTED_OUTPUT_DEVICES_FLAG audioDeviceDescriptorsDistributed:${JSON.stringify(audioDeviceDescriptorsDistributed)}`)
      })

      outputAudioDeviceDescriptor[0].id = audioDeviceDescriptorsDistributed


      console.info(`${this.tag} getDevices DISTRIBUTED_OUTPUT_DEVICES_FLAG outputAudioDeviceDescriptor1 ${JSON.stringify(outputAudioDeviceDescriptor)}`)

      let outputAudioRendererFilter = {
        rendererInfo: this.renderInfo[this.selectedVolumeTypeKey].main,
        rendererId: 0 };
      this.audioRoutingManager.selectOutputDeviceByFilter(outputAudioRendererFilter, audioDeviceDescriptorsDistributed, (err, data) => {
        if (err){
          console.info(`${this.tag} selectOutputDeviceByFilter err code: ${err.code}, err message:${err.message}`)
          this.returnMsg += `selectOutputDeviceByFilter selectedRole:${this.selectedRole},selectedDevice: ${this.selectedDevice} err code: ${err.code}, err message:${err.message}\n`
        }else{
          console.info(`${this.tag} selectOutputDeviceByFilter success`)
          this.returnMsg += `selectOutputDeviceByFilter selectedRole:${this.selectedRole},selectedDevice: ${this.selectedDevice} success\n`
        }

      })
    }catch(err){
      console.info(`${this.tag} selectOutputDeviceByFilter err code: ${err.code}, err message:${err.message}`)
    }

  }

  async selectInputDeviceLocal(){
    try{
      let inputAudioDeviceDescriptor = [{
        deviceRole: this.selectedRole,
        deviceType: this.selectedDevice,
        id: 2,
        name: "",
        address: "",
        sampleRates: [44100],
        channelCounts: [2],
        channelMasks: [0],
        networkId: audio.LOCAL_NETWORK_ID,
        interruptGroupId: 1,
        volumeGroupId: 1,
        displayName: "HUAWEI MATE 40"
      }]
      let audioDeviceDescriptors
      this.audioRoutingManager.getDevices(audio.DeviceFlag.INPUT_DEVICES_FLAG, (err, data) => {
        if (err){
          this.returnMsg += `getDevices INPUT_DEVICES_FLAG err code: ${err.code}, err message:${err.message}\n`
        }
        audioDeviceDescriptors = data
        this.returnMsg += `getDevices INPUT_DEVICES_FLAG success: ${JSON.stringify(audioDeviceDescriptors)}\n`
        console.info(`${this.tag} selectInputDevice audioDeviceDescriptors ${JSON.stringify(audioDeviceDescriptors)}`)
      })
      console.info(`${this.tag} selectInputDevice inputAudioDeviceDescriptor ${JSON.stringify(inputAudioDeviceDescriptor)}`)

      this.audioRoutingManager.selectInputDevice(inputAudioDeviceDescriptor, (err, data) => {
        if (err){
          console.info(`${this.tag} selectInputDevice err code: ${err.code}, err message:${err.message}`)
          this.returnMsg += `selectInputDevice err code: ${err.code}, err message:${err.message}\n`
        }else{
          console.info(`${this.tag} selectInputDevice success`)
          this.returnMsg += `selectInputDevice  success\n`
        }
      })
    }catch(err){
      console.info(`${this.tag} selectInputDevice err code: ${err.code}, err message:${err.message}`)
    }

  }

  getVolumeGroupInfos(){
    let _this = this
    this.audioVolumeManager.getVolumeGroupInfos(this.selectedNetworkIdKey, (err, data) => {
      if (err){
        _this.returnMsg += `getVolumeGroupInfos err code: ${err.code}, err message:${err.message}\n`
      }
      _this.returnMsg += `getVolumeGroupInfos success:` + JSON.stringify(data) + `\n`
    })
  }

  getVolumeGroupManager(){
    this.audioVolumeManager.getVolumeGroupManager(Number(this.selectedGroupIdKey), (err, data) => {
      if (err){
        this.returnMsg += `getVolumeGroupManager err code: ${err.code}, err message:${err.message}\n`
      }
      this.returnMsg += `getVolumeGroupManager success:` + JSON.stringify(data) + `\n`
      this.audioVolumeGroupManager = data
    })
  }

  async getVolumeRange() {
    this.minVolumeVolumeGroupManager = await this.audioVolumeGroupManager.getMinVolume(this.selectedVolumeType);
    this.maxVolumeVolumeGroupManager = await this.audioVolumeGroupManager.getMaxVolume(this.selectedVolumeType);
    this.returnMsg = `minVolumeVolumeGroupManager: ${this.minVolumeVolumeGroupManager}; maxVolumeVolumeGroupManager: ${this.maxVolumeVolumeGroupManager}\n`;
  }

  async getVolumeRangeAudioManager() {
    this.minVolumeAudioManager = await this.audioManager.getMinVolume(this.selectedVolumeType);
    this.maxVolumeAudioManager = await this.audioManager.getMaxVolume(this.selectedVolumeType);
    this.returnMsg = `minVolumeAudioManager: ${this.minVolumeAudioManager}; maxVolumeAudioManager: ${this.maxVolumeAudioManager} \n`;
  }

  setVolumeAudioManager(){
    this.audioManager.setVolume(this.selectedVolumeType, this.selectedVolumeAudioManager, (err, data) => {
      if(err){
        this.returnMsg = `setVolume(AudioManager) ${this.selectedVolumeAudioManager} err: ${JSON.stringify(err)}`;
      }else{
        this.returnMsg = `setVolume(AudioManager) ${this.selectedVolumeAudioManager} success`;
      }
    })
  }

  getVolumeAudioManager(){
    this.audioManager.getVolume(this.selectedVolumeType, (err, data) => {
      if(err){
        this.returnMsg = `getVolume(AudioManager) ${this.selectedVolumeAudioManager} err: ${JSON.stringify(err)}`;
      }else{
        this.returnMsg = `getVolume(AudioManager) ${this.selectedVolumeAudioManager} success: ${data}`;
      }
    })
  }

  setVolumeVolumeGroupManager(){
    this.audioVolumeGroupManager.setVolume(this.selectedVolumeType, this.selectedVolumeVolumeGroupManager, (err, data) => {
      if(err){
        this.returnMsg = `setVolume ${this.selectedVolumeVolumeGroupManager} err: ${JSON.stringify(err)}`;
      }else{
        this.returnMsg = `setVolume ${this.selectedVolumeVolumeGroupManager} success`;
      }
    })
  }

  getVolumeVolumeGroupManager(){
    this.audioVolumeGroupManager.getVolume(this.selectedVolumeType, (err, data) => {
      if(err){
        this.returnMsg = `getVolume VolumeGroupManager ${this.selectedVolumeVolumeGroupManager} err: ${JSON.stringify(err)}`;
      }else{
        this.returnMsg = `getVolume VolumeGroupManager ${this.selectedVolumeVolumeGroupManager} success: ${data}`;
      }
    })
  }

  onVolumeChange(){
    this.audioVolumeManager.on('volumeChange',(err) => {
      if(err){
        this.returnMsg = `onVolumeChange audioVolumeManager  err: ${JSON.stringify(err)}`;
      }else{
        this.returnMsg = `onVolumeChange audioVolumeManager success`;
      }
    })
  }

  muteVolumeGroupManager(){
    this.audioVolumeGroupManager.mute(this.selectedVolumeType, this.selectedMuteValue, (err, data) => {
      if(err){
        this.returnMsg = `mute(${this.selectedMuteValue}) audioVolumeGroupManager  err: ${JSON.stringify(err)}`;
      }else{
        this.returnMsg = `mute(${this.selectedMuteValue}) audioVolumeGroupManager success`;
      }
    })
  }

  isMuteVolumeGroupManager(){
    this.audioVolumeGroupManager.isMute(this.selectedVolumeType, (err, data) => {
      if(err){
        this.returnMsg = `isMute audioVolumeGroupManager  err: ${JSON.stringify(err)}`;
      }else{
        this.returnMsg = `isMute audioVolumeGroupManager success: ${data}`;
      }
    })
  }


  build() {
    Column() {
      Row() {
        Column() {
          Text("【分布式投播(ALL)-Callback】返回数据：").fontWeight(FontWeight.Bolder).position({ x: 10, y: 5 }).fontSize(18)
          Text(this.returnMsg).position({ x: 10, y: 30 }).fontSize(14)
        }.width('98%').height(300).backgroundColor(Color.Orange).position({ x: '1%' })
      }.position({ x: 0, y: 0 }).width('100%').zIndex(999)

      Scroll() {
        Column() {
          Row() {
            Select(this.volumeTypeList).value(this.selectedVolumeTypeKey)
              .onSelect(async (index, value) => {
                this.selectedVolumeType = audio.AudioVolumeType[value];
                this.selectedVolumeTypeKey = value;
                this.audioRendererOptions.rendererInfo = this.renderInfo[this.selectedVolumeTypeKey].main
                this.selectedStreamUsageKey = this.renderInfo[this.selectedVolumeTypeKey].info.selectedStreamUsageKey
                this.selectedContentTypeKey = this.renderInfo[this.selectedVolumeTypeKey].info.selectedContentTypeKey
                if(this.audioRenderer!==null){
                  await this.audioRenderer.release()
                  this.audioRenderer = null
                  this.isWrite=false
                }
                this.getVolumeRangeAudioManager();
              }).font({ size: 22 })
          }.margin({ top: 10 })

          if (this.selectedVolumeTypeKey !== "volumeType") {
            Divider().strokeWidth(1).color(Color.Blue).margin({ bottom: 20 })
            Row() {
              Text("音量").fontSize(20)
              Slider({
                value: this.selectedVolumeAudioManager,
                min: this.minVolumeAudioManager,
                max: this.maxVolumeAudioManager,
                step: 1,
                style: SliderStyle.InSet
              })
                .blockColor('#191970')
                .trackColor('#ADD8E6')
                .selectedColor('#4169E1')
                .showTips(true)
                .onChange((value: number, mode: SliderChangeMode) => {
                  this.selectedVolumeAudioManager = Number(value.toFixed(0));
                  console.info(`${this.tag} value: ${value}, mode: ${mode.toString()}`)
                })
                .width('80%')
              Text(this.selectedVolumeAudioManager.toFixed(0)).fontSize(24)
            }

            Text(`${this.selectedContentTypeKey}`).fontSize(16).lineHeight(40)
            Text(`${this.selectedStreamUsageKey}`).fontSize(16).lineHeight(40)
          }

          Row() {
            Button() {
              Text("setVolume audioManager callback").fontSize(22).fontColor(Color.White)
            }.width('100%').height(60).onClick(() => this.setVolumeAudioManager())
          }.margin({ top: 10 }).width('100%')

          Row() {
            Button() {
              Text("getVolume audioManager callback").fontSize(22).fontColor(Color.White)
            }.width('100%').height(60).onClick(() => this.getVolumeAudioManager())
          }.margin({ top: 10 }).width('100%')

          Row() {
            Button() {
              Text("createAudioRenderer callback").fontSize(22).fontColor(Color.White)
            }.width('100%').height(60).onClick(() => {
              this.createAudioRenderer()
            })
          }.margin({ top: 10 }).width('100%')

          Row() {
            Button() {
              Text("start callback").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => {
              this.rendererStart()
            })

            Button() {
              Text("getBufferSize callback").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => {
              this.getBufferSize()
            })

          }.margin({ top: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Button() {
              Text("write callback").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => {
              this.writeRenderer()
            })

            Button() {
              Text("drain callback").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => {
              this.drainRenderer()
            })
          }.margin({ top: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Button() {
              Text("pause callback").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => {
              this.pauseRenderer()
            })
            Button() {
              Text("stop callback").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60).onClick(() => this.stopRenderer())
          }.margin({ top: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Button() {
              Text("onInterrupt").fontSize(22).fontColor(Color.White)
            }.width('100%').height(60).onClick(() => this.onInterrupt())
          }.margin({ top: 10 }).width('100%')

          Row() {
            Button() {
              Text("release callback").fontSize(22).fontColor(Color.White)
            }.width('100%').height(60).onClick(() => this.releaseRenderer())
          }.margin({ top: 10 }).width('100%')

          Row() {
            Button() {
              Text("selectOutputDeviceDistributed callback").fontSize(22).fontColor(Color.White)
            }.width('100%').height(60).onClick(() => this.selectOutputDeviceDistributed())
          }.margin({ top: 10 }).width('100%')

          Row() {
            Button() {
              Text("selectOutputDeviceLocal callback").fontSize(22).fontColor(Color.White)
            }.width('100%').height(60).onClick(() => this.selectOutputDeviceLocal())
          }.margin({ top: 10 }).width('100%')

          Row() {
            Button() {
              Text("selectOutputDeviceByFilterLocal callback").fontSize(22).fontColor(Color.White)
            }.width('100%').height(60).onClick(() => this.selectOutputDeviceByFilterLocal())
          }.margin({ top: 10 }).width('100%')

          Row() {
            Button() {
              Text("selectOutputDeviceByFilterDistributed callback").fontSize(22).fontColor(Color.White)
            }.width('100%').height(60).onClick(() => this.selectOutputDeviceByFilterDistributed())
          }.margin({ top: 10 }).width('100%')


          Row() {
            Select(this.networkIdList).value(this.selectedNetworkIdKey)
              .onSelect((index, value) => {
                this.selectedNetworkIdKey = value
              }).font({ size: 22 })
          }.margin({ top: 10 })

          Row() {
            Button() {
              Text("getVolumeGroupInfos callback").fontSize(22).fontColor(Color.White)
            }.width('100%').height(60).onClick(() => this.getVolumeGroupInfos())
          }.margin({ top: 10 }).width('100%')

          Row() {
            Select(this.groupIdList).value(this.selectedGroupIdKey)
              .onSelect((index, value) => {
                this.selectedGroupIdKey = value
              }).font({ size: 22 })
          }.margin({ top: 10 })

          Row() {
            Button() {
              Text("getVolumeGroupManager callback").fontSize(22).fontColor(Color.White)
            }.width('100%').height(60).onClick(() => {
              this.getVolumeGroupManager()
              this.getVolumeRange()
            })
          }.margin({ top: 10 }).width('100%')

          Row() {
            Text(this.selectedVolumeTypeKey).fontSize(22)

          }.margin({ top: 10 })

          if (this.selectedVolumeTypeKey !== "volumeType") {
            Divider().strokeWidth(1).color(Color.Blue).margin({ bottom: 20 })
            Row() {
              Text("音量").fontSize(20)
              Slider({
                value: this.selectedVolumeVolumeGroupManager,
                min: this.minVolumeVolumeGroupManager,
                max: this.maxVolumeVolumeGroupManager,
                step: 1,
                style: SliderStyle.InSet
              })
                .blockColor('#191970')
                .trackColor('#ADD8E6')
                .selectedColor('#4169E1')
                .showTips(true)
                .onChange((value: number, mode: SliderChangeMode) => {
                  this.selectedVolumeVolumeGroupManager = Number(value.toFixed(0));
                  console.info(`${this.tag} value: ${value}, mode: ${mode.toString()}`)
                })
                .width('80%')
              Text(this.selectedVolumeVolumeGroupManager.toFixed(0)).fontSize(24)
            }
          }

          Row() {
            Button() {
              Text("setVolume audioVolumeGroupManager callback").fontSize(22).fontColor(Color.White)
            }.width('100%').height(60).onClick(() => this.setVolumeVolumeGroupManager())
          }.margin({ top: 10 }).width('100%')

          Row() {
            Button() {
              Text("getVolume audioVolumeGroupManager callback").fontSize(22).fontColor(Color.White)
            }.width('100%').height(60).onClick(() => this.getVolumeVolumeGroupManager())
          }.margin({ top: 10 }).width('100%')

          Row() {
            Select(this.muteList).value(this.selectedMuteKey)
              .onSelect((index, value) => {
                this.selectedMuteKey = value
                this.selectedMuteValue = (value === "true")
              }).font({ size: 22 })
          }.margin({ top: 10 })

          Row() {
            Button() {
              Text("mute audioVolumeGroupManager callback").fontSize(22).fontColor(Color.White)
            }.width('100%').height(60).onClick(() => this.muteVolumeGroupManager())
          }.margin({ top: 10 }).width('100%')

          Row() {
            Button() {
              Text("isMute audioVolumeGroupManager callback").fontSize(22).fontColor(Color.White)
            }.width('100%').height(60).onClick(() => this.isMuteVolumeGroupManager())
          }.margin({ top: 10 }).width('100%')


          Row() {
            Button() {
              Text("onVolumeChange audioVolumeManager callback").fontSize(22).fontColor(Color.White)
            }.width('100%').height(60).onClick(() => this.onVolumeChange())
          }.margin({ top: 10 }).width('100%')

          Divider().strokeWidth(1).color(Color.Blue).margin({ top: 10 })

          Row() {
            Select(this.deviceList).value(this.selectedDeviceKey)
              .onSelect((index, value) => {
                this.selectedDeviceKey = value
                this.selectedDevice = audio.DeviceType[value]
                console.info(`${this.tag} DeviceType : ${audio.DeviceType[value]}`)
                console.info(`${this.tag} selectedDevice : ${this.selectedDevice}`)

              }).font({ size: 22 })
          }.margin({ top: 10 })

          Row() {
            Select(this.deviceRoleList).value(this.selectedRoleKey)
              .onSelect((index, value) => {
                this.selectedRoleKey = value
                this.selectedRole = audio.DeviceRole[value]
                console.info(`${this.tag} DeviceRole : ${audio.DeviceRole[value]}`)
                console.info(`${this.tag} deviceRoleList : ${this.selectedRole}`)

              }).font({ size: 22 })
          }.margin({ top: 10 })

          Row() {
            Button() {
              Text("selectoutputDevice callback").fontSize(22).fontColor(Color.White)
            }.width('100%').height(60).onClick(() => this.selectOutputDevice())
          }.margin({ top: 10 }).width('100%')

          Row() {
            Button() {
              Text("selectoutputDeviceByFilter callback").fontSize(22).fontColor(Color.White)
            }.width('100%').height(60).onClick(() => this.selectOutputDeviceByFilter())
          }.margin({ top: 10 }).width('100%')

          Row() {
            Button() {
              Text("selectInputDeviceLocal callback").fontSize(22).fontColor(Color.White)
            }.width('100%').height(60).onClick(() => this.selectInputDeviceLocal())
          }.margin({ top: 10 }).width('100%')

        }.width('100%')
      }.margin({ top: 310 }).width('100%')
    }
  }
}