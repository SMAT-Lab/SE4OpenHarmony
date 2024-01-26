/*
 * Copyright 2023 Unionman Technology Co., Ltd.
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
import fs from '@ohos.file.fs';
import { TitleBar } from '../../common/TitleBar'
import { AvailableWifi } from '../../common/AvailableWifi'
import wifi from '@ohos.wifiManager'
import Logger from '../../model/Logger'
import { WifiModel, WifiType } from '../../model/WifiModel'

const TAG = 'wifi'

@Entry
@Component
export struct wifiSample {
  private wifiModel: WifiModel = new WifiModel()
  private linkedInfo: wifi.WifiLinkedInfo = null
  @State isLinked: boolean = false
  @State isSwitchOn: boolean = false

  // 扫描wifi
  async scan() {
    // 获取有关Wi-Fi连接的信息,存入linkedInfo
    await this.getLinkedInfo()
    // 不停地扫描wifi
    let result: Array<WifiType> = await this.wifiModel.getScanInfos()
    if (this.isSwitchOn) {
      AppStorage.SetOrCreate('wifiList', result)
      setTimeout(async () => {
        await this.scan()
      }, 3000)
    }
  }

  // 获取有关Wi-Fi连接的信息,存入linkedInfo
  async getLinkedInfo() {
    try {
      let wifiLinkedInfo = await wifi.getLinkedInfo()
      if (wifiLinkedInfo === null || wifiLinkedInfo.bssid === '') {
        this.isLinked = false
        this.linkedInfo = null
        return
      }
      this.isLinked = true
      this.linkedInfo = wifiLinkedInfo
    } catch (err) {
      Logger.info(`getLinkedInfo failed err is ${JSON.stringify(err)}`)
    }
  }

  // 监听wifi的变化
  addListener() {
    // 连接状态改变时，修改连接信息
    wifi.on('wifiConnectionChange', async state => {
      Logger.info(TAG, `wifiConnectionChange: ${state}`)
      await this.getLinkedInfo()
    })
    // wifi状态改变时，先清空wifi列表，然后判断是否是开启状态，如果是就扫描
    wifi.on('wifiStateChange', state => {
      Logger.info(TAG, `wifiStateLisener state: ${state}`)
      AppStorage.SetOrCreate('wifiList', [])
      if (state === 1) { // 1: wifi is enable, 0:wifi is disable
        this.scan()
      }
    })
  }

  aboutToAppear() {
    // 如果wifi是开的，就记录下状态，然后扫描wifi，并获取连接信息
    if (wifi.isWifiActive()) {
      Logger.info(TAG, 'wifi is active')
      this.isSwitchOn = true
      wifi.scan()
      this.scan()
      this.getLinkedInfo()
    }
    // 启动监听
    this.addListener()
  }

  build() {
    Column() {
      TitleBar({ title: 'wifi测试' })
      Scroll() {
        Column() {
          Toggle({ type: ToggleType.Switch, isOn: this.isSwitchOn })
            .id('switch')
            .onChange((isOn: boolean) => {
              Logger.info(`LSQ: wifi swtich is: ${isOn}`)
              AppStorage.SetOrCreate('wifiList', [])
              try {
                // 如果是打开状态，记录状态，打开网络，开始扫描
                if (isOn) {
                  this.isSwitchOn = true
                  wifi.enableWifi()
                  return
                } else {
                  // 记录状态，断开网络禁用网络
                  this.isSwitchOn = false
                  this.isLinked = false
                  wifi.disconnect()
                  wifi.disableWifi()
                }
              } catch (error) {
                Logger.error(TAG, `failed,code:${JSON.stringify(error.code)},message:${JSON.stringify(error.message)}`)
              }
            })
        }
      }
      .width('100%')
      .padding({ left: 16, right: 16 })

      if (this.isLinked && this.isSwitchOn) {
        Column() {
          Text($r('app.string.connected'))
            .fontSize(22)
            .width('100%')
          Row() {
            Text(this.linkedInfo.ssid)
              .fontSize(20)
              .fontColor(Color.Black)
              .layoutWeight(1)
            Text($r('app.string.connected'))
              .fontSize(18)
              .fontColor(Color.Black)
          }
          .width('100%')
          .padding(10)
          .margin({ left: 16, right: 16 })
          .border({ radius: 15, color: Color.Gray, width: 1 })
          .backgroundColor(Color.White)
        }
        .width('100%')
        .padding({ left: 16, right: 16 })
      }

      if (this.isSwitchOn) {
        AvailableWifi({ linkedInfo: this.linkedInfo })
      }
    }
    .width('100%')
    .constraintSize({ minHeight: '100%' })
  }
}
