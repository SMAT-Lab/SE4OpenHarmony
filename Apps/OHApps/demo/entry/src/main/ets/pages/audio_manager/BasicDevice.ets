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

@Entry
@Component
struct AudioManagerAudioRouterManager {
  @State returnMsg: string = 'Hello World'
  private selectDeviceFlagList = []
  @State selectedDeviceFlag: number = 0
  private audioRoutingManager = null
  @State selectedDeviceFlagKey: string = "请选择设备类型"
  @State audioManagerObj: audio.AudioManager = null
  @State onReturnMsg: string = ''

  aboutToAppear() {
    this.audioManagerObj = audio.getAudioManager();
    for (let key in audio.DeviceFlag) {
      this.selectDeviceFlagList.push({ value: key })
    }
  }

  getDevicesCallback() {
    if (this.selectedDeviceFlagKey == "请选择设备类型") {
      this.returnMsg = `请选择设备类型`
      return
    }
    this.audioManagerObj.getDevices(this.selectedDeviceFlag, (err, value) => {
      if (err) {
        this.returnMsg = `getDevices callback Failed err:${JSON.stringify(err)}`
        return
      }
      this.returnMsg = `getDevices callback Success 返回值:${JSON.stringify(value)}`
    })
  }

  getDevicesPromise() {
    if (this.selectedDeviceFlagKey == "请选择设备类型") {
      this.returnMsg = `请选择设备类型`
      return
    }
    this.audioManagerObj.getDevices(this.selectedDeviceFlag)
      .then(value => {
        this.returnMsg = `getDevices promise Success 返回值:${JSON.stringify(value)}`
      }).catch(err => {
      this.returnMsg = `getDevices promise Failed err:${JSON.stringify(err)}`
    })
  }

  onDeviceChange() {
    let _this = this
    _this.onReturnMsg = `监听已监听\n deviceFlag:${this.selectedDeviceFlag}`
    this.audioManagerObj.on('deviceChange', (deviceChanged) => {
      _this.onReturnMsg = "on 收到回调了：" + JSON.stringify(deviceChanged);
    })
  }

  offDeviceChange() {
    this.onReturnMsg = "off 已触发"
    this.audioManagerObj.off('deviceChange');
  }

  build() {
    Column() {
      Row() {
        Column() {
          Text("【路由管理】返回数据：").fontWeight(FontWeight.Bolder).position({ x: 10, y: 5 }).fontSize(18)
          Text(this.returnMsg).position({ x: 10, y: 30 }).fontSize(14)
        }.width('98%').height(120).backgroundColor(Color.Orange).position({ x: '1%' })
      }.position({ x: 0, y: 0 }).width('100%').zIndex(999)

      Column() {
        Select(this.selectDeviceFlagList).value(this.selectedDeviceFlagKey)
          .onSelect((index, value) => {
            this.selectedDeviceFlag = audio.DeviceFlag[value]
            this.selectedDeviceFlagKey = value;
          })
      }.margin({ top: 130 }).width('100%')

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
    }
    .height('100%')
  }
}