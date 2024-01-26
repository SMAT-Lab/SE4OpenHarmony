/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import prompt from '@ohos.promptAction'
import Logger from '../model/Logger'
import { PswDialog } from './PswDialog'
import { WifiModel } from '../model/WifiModel'
import { WifiView } from './WifiView'
import WifiDataSource from './BasicDataSource'
import wifi from '@ohos.wifiManager'

const TAG = 'AvailableWiFi'
let self = null

@Component
export struct AvailableWifi {
  private wifiModel = new WifiModel()
  private linkedInfo: wifi.WifiLinkedInfo = null
  @StorageLink('wifiList') @Watch('wifiListRefresh') wifiList: Array<wifi.WifiScanInfo> = []
  @State wifiDataResource: WifiDataSource = new WifiDataSource(this.wifiList)
  @State scanInfo: wifi.WifiScanInfo = undefined
  private pswDialogController: CustomDialogController = new CustomDialogController({
    builder: PswDialog({ scanInfo: $scanInfo, action: this.onAccept }),
    autoCancel: true
  })

  build() {
    List() {
      ListItem() {
        Row() {
          Text($r('app.string.available_wlan'))
            .fontSize(22)
            .layoutWeight(1)
        }
        .id('validWlan')
        .width('100%')
      }

      LazyForEach(this.wifiDataResource, (item, index) => {
        ListItem() {
          WifiView({ wifi: item })
        }
        .id(`Wifi${index}`)
        .onClick(() => {
          Logger.info(TAG, 'wifi click')
          this.scanInfo = item
          if (this.linkedInfo !== null && item.ssid === this.linkedInfo.ssid) {
            prompt.showToast({ message: 'this wifi is connected' })
            return
          }
          if (item.securityType === 0 || item.securityType === 1) {
            this.wifiModel.connectNetwork(item, '')
            return
          }
          this.pswDialogController.open()
        })
      }, item => JSON.stringify(item))
    }
    .width('100%')
    .height('100%')
    .padding({ left: 16, right: 16 })
    .layoutWeight(1)
    .divider({ strokeWidth: 1, color: Color.Gray, startMargin: 10, endMargin: 10 })
    .margin({ top: 10 })
  }

  onAccept(scanInfo, psw) {
    Logger.info(TAG, 'connect wifi')
    self.wifiModel.connectNetwork(scanInfo, psw)
  }

  aboutToAppear() {
    self = this
  }

  wifiListRefresh() {
    this.wifiDataResource['dataArray'] = this.wifiList
    this.wifiDataResource.notifyDataReload()
  }
}