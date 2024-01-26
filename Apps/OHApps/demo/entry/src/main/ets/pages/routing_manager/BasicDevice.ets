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

@Entry
@Component
struct BasicDevice {
  @State returnMsg: string = 'Hello World'
  @State onReturnMsg: string = ''
  private selectDeviceFlagList = []
  @State selectedDeviceFlagKey: string = "请选择设备类型"
  @State selectedDeviceFlag: number = 0
  private audioRoutingManager = null
  private audioDeviceDescriptors = []
  private InputDeviceDescriptors = []
  private OutputDeviceDescriptors = []
  private selectInputDeviceList = []
  private selectOutputDeviceList = []
  @State selectedInputIndex: number = 0
  @State selectedOutputIndex: number = 0
  @State tag: number = -1

  aboutToAppear() {
    let audioManager = audio.getAudioManager();
    this.audioRoutingManager = audioManager.getRoutingManager();
    for (let key in audio.DeviceFlag) {
      this.selectDeviceFlagList.push({ value: key })
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

  getDeviceTypeNameByValue(value) {
    for (let key in audio.DeviceType) {
      if (audio.DeviceType[key] == value) {
        return key;
      }
    }
  }

  getDevicesCallback() {
    if (this.selectedDeviceFlagKey == "请选择设备类型") {
      this.returnMsg = `请选择设备类型`
      return
    }
    let _this = this;
    this.audioRoutingManager.getDevices(this.selectedDeviceFlag, (err, value) => {
      if (err) {
        _this.returnMsg = `getDevices callback Failed err:${JSON.stringify(err)}`
        return
      }
      _this.audioDeviceDescriptors = value
      _this.returnMsg = `getDevices callback Success 返回值:${JSON.stringify(value)}`
    })
  }

  getDevicesPromise() {
    if (this.selectedDeviceFlagKey == "请选择设备类型") {
      this.returnMsg = `请选择设备类型`
      return
    }
    let _this = this;
    this.audioRoutingManager.getDevices(this.selectedDeviceFlag)
      .then(value => {
        _this.audioDeviceDescriptors = value;
        _this.returnMsg = `getDevices promise Success 返回值:${JSON.stringify(value)}`
      }).catch(err => {
      _this.returnMsg = `getDevices promise Failed err:${JSON.stringify(err)}`
    })
  }

  onDeviceChange() {
    let _this = this
    _this.onReturnMsg = `监听已监听\n deviceFlag:${this.selectedDeviceFlag}`
    this.audioRoutingManager.on('deviceChange', this.selectedDeviceFlag, (deviceChanged) => {
      _this.onReturnMsg = "on 收到回调了：" + JSON.stringify(deviceChanged);
    })
  }

  offDeviceChange() {
    this.audioRoutingManager.off('deviceChange', (deviceChanged) => {
      let _this = this
      _this.onReturnMsg = "off 已触发"
      _this.onReturnMsg = "off 收到回调了：" + JSON.stringify(deviceChanged);
    })
  }

  selectInputDeviceCallback() {
    let _this = this;
    if (this.InputDeviceDescriptors.length == 0) {
      _this.returnMsg = `没有输入设备类`
      return
    }
    let inputAudioDeviceDescriptor = this.InputDeviceDescriptors.filter((value, index) => {
      return index == _this.selectedInputIndex
    })
    if (inputAudioDeviceDescriptor.length == 0) {
      _this.returnMsg = `尚未选择输入设备`
      return
    }
    this.audioRoutingManager.selectInputDevice(inputAudioDeviceDescriptor, (err) => {
      if (err) {
        _this.returnMsg = `selectInputDevice callback Failed err:${JSON.stringify(err)}`
      } else {
        _this.returnMsg = `selectInputDevice callback Success`
      }
    })
  }

  selectInputDevicePromise() {
    let _this = this;
    if (this.InputDeviceDescriptors.length == 0) {
      _this.returnMsg = `没有输入设备类`
      return
    }
    let inputAudioDeviceDescriptor = this.InputDeviceDescriptors.filter((value, index) => {
      return index == _this.selectedInputIndex
    })

    if (inputAudioDeviceDescriptor.length == 0) {
      _this.returnMsg = `尚未选择输入设备`
      return
    }
    this.audioRoutingManager.selectInputDevice(inputAudioDeviceDescriptor)
      .then(() => {
        _this.returnMsg = `selectInputDevice promise Success`
      }).catch(err => {
      _this.returnMsg = `selectInputDevice promise Failed err:${JSON.stringify(err)}`
    })
  }

  selectOutputDeviceCallback() {
    let _this = this;
    if (this.OutputDeviceDescriptors.length == 0) {
      _this.returnMsg = `没有输出设备类`
      return
    }
    let outputAudioDeviceDescriptor = this.OutputDeviceDescriptors.filter((value, index) => {
      return index == _this.selectedOutputIndex
    })
    if (outputAudioDeviceDescriptor.length == 0) {
      _this.returnMsg = `尚未选择输出设备`
      return
    }
    this.audioRoutingManager.selectOutputDevice(outputAudioDeviceDescriptor, (err) => {
      if (err) {
        _this.returnMsg = `selectOutputDevice callback Failed err:${JSON.stringify(err)}`
      } else {
        _this.returnMsg = `selectOutputDevice callback Success`
      }
    })
  }

  selectOutputDevicePromise() {
    let _this = this;
    if (this.OutputDeviceDescriptors.length == 0) {
      _this.returnMsg = `没有输出设备类`
      return
    }
    let outputAudioDeviceDescriptor = this.OutputDeviceDescriptors.filter((value, index) => {
      return index == _this.selectedOutputIndex
    })
    if (outputAudioDeviceDescriptor.length == 0) {
      _this.returnMsg = `尚未选择输出设备`
      return
    }
    this.audioRoutingManager.selectOutputDevice(outputAudioDeviceDescriptor)
      .then(() => {
        _this.returnMsg = `selectOutputDevice promise Success`
      }).catch(err => {
      _this.returnMsg = `selectOutputDevice promise Failed err:${JSON.stringify(err)}`
    })
  }

  build() {
    Column() {
      Row() {
        Column() {
          Text("【路由管理】返回数据：").fontWeight(FontWeight.Bolder).position({ x: 10, y: 5 }).fontSize(18)
          Text(this.returnMsg).position({ x: 10, y: 30 }).fontSize(14)
        }.width('98%').height(120).backgroundColor(Color.Orange).position({ x: '1%' })
      }.position({ x: 0, y: 0 }).width('100%').zIndex(999)

      Scroll() {
        Column() {
          Row() {
            Select(this.selectDeviceFlagList).value(this.selectedDeviceFlagKey)
              .onSelect((index, value) => {
                this.selectedDeviceFlag = audio.DeviceFlag[value]
                this.selectedDeviceFlagKey = value;
              })
          }.margin({ top: 10 })

          Row() {
            Button() {
              Text("getDevices callback").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60)
            .onClick(() => this.getDevicesCallback())

            Button() {
              Text("getDevices promise").fontSize(22).fontColor(Color.White)
            }.width('49%').height(60)
            .onClick(() => this.getDevicesPromise())

          }.margin({ top: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Button() {
              Text("on('deviceChange')").fontSize(22).fontColor(Color.White)
            }.width('69%').height(40).onClick(() => this.onDeviceChange())

            Button() {
              Text("off").fontSize(22).fontColor(Color.White)
            }.width('29%').height(40).onClick(() => this.offDeviceChange())

          }.margin({ top: 10 }).width('100%').justifyContent(FlexAlign.SpaceBetween)

          Row() {
            Text("尚未监听" + this.onReturnMsg).fontSize(20).lineHeight(34)
          }

          if (this.tag == 2) {
            Row() {
              Text("输入设备").fontSize(20).margin({ left: 10 })
              Select(this.selectInputDeviceList).value(this.selectInputDeviceList[this.selectedInputIndex].value)
                .onSelect((index, value) => {
                  this.selectedInputIndex = index;
                })
            }.margin({ top: 10 }).width('100%')

            Row() {
              Button() {
                Text("selectInputDevice callback").fontSize(20).fontColor(Color.White)
              }.width('100%').height(60).onClick(() => this.selectInputDeviceCallback())
            }.margin({ top: 10 }).width('100%')

            Row() {
              Button() {
                Text("selectInputDevice promise").fontSize(20).fontColor(Color.White)
              }.width('100%').height(60).onClick(() => this.selectInputDevicePromise())
            }.margin({ top: 10 }).width('100%')
          }

          if (this.tag == 1) {
            Row() {
              Text("输出设备").fontSize(20).margin({ left: 10 })
              Select(this.selectOutputDeviceList).value(this.selectOutputDeviceList[this.selectedOutputIndex].value)
                .onSelect((index, value) => {
                  this.selectedOutputIndex = index;
                })
            }.margin({ top: 10 }).width('100%')

            Row() {
              Button() {
                Text("selectOutputDevice callback").fontSize(20).fontColor(Color.White)
              }.width('100%').height(60).onClick(() => this.selectOutputDeviceCallback())
            }.margin({ top: 10 }).width('100%')

            Row() {
              Button() {
                Text("selectOutputDevice promise").fontSize(20).fontColor(Color.White)
              }.width('100%').height(60).onClick(() => this.selectOutputDevicePromise())
            }.margin({ top: 10 }).width('100%')
          }

        }.width('100%')
      }.margin({ top: 130 }).width('100%')

    }
  }
}