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

@Entry
@Component
struct CommunicationDevice {
  @State returnMsg: string = 'Hello World'
  @State onReturnMsg: string = 'Hello World'
  private audioRoutingManager = null
  private CommunicationDeviceTypeList = []
  @State selectedCommunicationDeviceKey: string = "请选择"
  @State selectedCommunicationDeviceVal: number = 0
  @State active: boolean = false

  aboutToAppear() {
    let audioManager = audio.getAudioManager();
    this.audioRoutingManager = audioManager.getRoutingManager();
    for (let key in audio.CommunicationDeviceType) {
      this.CommunicationDeviceTypeList.push({ value: key })
    }
  }

  setCommunicationDeviceCallback() {
    if (this.selectedCommunicationDeviceKey == "请选择") {
      prompt.showToast({
        message: '请选择通讯设备',
        duration: 2000,
      })
      return;
    }

    let _this = this;
    this.audioRoutingManager.setCommunicationDevice(this.selectedCommunicationDeviceVal, this.active, (err) => {
      if (err) {
        _this.returnMsg = `setCommunicationDevice callback Failed error ${JSON.stringify(err)}`
        return;
      }
      _this.returnMsg = `setCommunicationDevice callback Success`
    })
  }

  setCommunicationDevicePromise() {
    if (this.selectedCommunicationDeviceKey == "请选择") {
      prompt.showToast({
        message: '请选择通讯设备',
        duration: 2000,
      })
      return;
    }
    let _this = this;
    this.audioRoutingManager.setCommunicationDevice(this.selectedCommunicationDeviceVal, this.active)
      .then(() => {
        _this.returnMsg = `setCommunicationDevice promise Success`
      }).catch(err => {
      _this.returnMsg = `setCommunicationDevice promise Failed error ${JSON.stringify(err)}`
    })
  }

  isCommunicationDeviceActiveCallback() {
    let _this = this;
    this.audioRoutingManager.isCommunicationDeviceActive(this.selectedCommunicationDeviceVal, (err, value) => {
      if (err) {
        _this.returnMsg = `isCommunicationDeviceActive callback Failed error ${JSON.stringify(err)}`
        return;
      }
      _this.returnMsg = `isCommunicationDeviceActive callback SUccess,返回值: ${value}`
    });
  }

  isCommunicationDeviceActivePromise() {
    let _this = this;
    this.audioRoutingManager.isCommunicationDeviceActive(this.selectedCommunicationDeviceVal)
      .then(value => {
        _this.returnMsg = `isCommunicationDeviceActive promise SUccess,返回值: ${value}`
      }).catch(err => {
      _this.returnMsg = `isCommunicationDeviceActive promise Failed error ${JSON.stringify(err)}`
    })
  }

  build() {
    Column() {
      Row() {
        Column() {
          Text("【路由管理-通讯设备】返回数据：").fontWeight(FontWeight.Bolder).position({ x: 10, y: 5 }).fontSize(18)
          Text(this.returnMsg).position({ x: 10, y: 30 }).fontSize(14)
        }.width('98%').height(120).backgroundColor(Color.Orange).position({ x: '1%' })
      }.position({ x: 0, y: 0 }).width('100%').zIndex(999)

      Scroll() {
        Column() {
          Row() {
            Text("通讯设备：").fontSize(24)
            Select(this.CommunicationDeviceTypeList).value(this.selectedCommunicationDeviceKey)
              .onSelect((index, value) => {
                this.selectedCommunicationDeviceVal = audio.CommunicationDeviceType[value]
                this.selectedCommunicationDeviceKey = value;
              }).height(80)
          }.margin({ top: 10 })

          Row() {
            Text("是否激活").fontSize(24)
            Radio({ value: 'active1', group: "activeGroup" }).onChange((isChecked) => {
              if (isChecked) {
                this.active = true;
              } else {
                this.active = false;
              }
            }).checked(this.active == true)
            Text("激活").fontSize(18)

            Radio({ value: 'active2', group: "activeGroup" }).onChange((isChecked) => {
              if (isChecked) {
                this.active = false;
              } else {
                this.active = true;
              }
            }).checked(this.active == false)
            Text("取消激活").fontSize(18)
          }

          Row() {
            Text("激活数据：" + this.active).fontSize(24)
          }

          Row() {
            Button() {
              Text("setCommunicationDevice callback").fontSize(22).fontColor(Color.White).textAlign(TextAlign.Center)
            }.width('90%').height(80).onClick(() => this.setCommunicationDeviceCallback())
          }.margin({ top: 10 })

          Row() {
            Button() {
              Text("setCommunicationDevice promise").fontSize(22).fontColor(Color.White).textAlign(TextAlign.Center)
            }.width('90%').height(80).onClick(() => this.setCommunicationDevicePromise())
          }.margin({ top: 10 })

          Row() {
            Button() {
              Text("isCommunicationDeviceActive callback")
                .fontSize(22)
                .fontColor(Color.White)
                .textAlign(TextAlign.Center)
            }.width('90%').height(80).onClick(() => this.isCommunicationDeviceActiveCallback())
          }.margin({ top: 10 })

          Row() {
            Button() {
              Text("isCommunicationDeviceActive promise")
                .fontSize(22)
                .fontColor(Color.White)
                .textAlign(TextAlign.Center)
            }.width('90%').height(80).onClick(() => this.isCommunicationDeviceActivePromise())
          }.margin({ top: 10 })

        }.width('100%')
      }.margin({ top: 130 }).width('100%')

    }
  }
}