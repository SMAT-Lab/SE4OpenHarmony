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

import { commonButton } from './commonButton';
import wifi from '@ohos.wifiManager';
import prompt from '@ohos.prompt';
import { WifiModel, WifiType } from '../../model/WifiModel'
import Logger from '../../model/Logger'
import WifiDataSource from '../../model/BasicDataSource'

const TAG = 'AvailableWiFi'
let self = null

@Component
export struct wifiButton {
  // interface:1，表示是WIFI 2.4G interface:2，表示是WIFI 5G
  @State interface: number = 1;
  @State backColor: Color = Color.Red;
  @State btnName: string = "WIFI 2.4G";
  @State isSwitchOn: boolean = false;
  @StorageLink('wifiList') @Watch('wifiListRefresh') wifiList: Array<wifi.WifiScanInfo> = []
  @State wifiDataResource: WifiDataSource = new WifiDataSource(this.wifiList)
  @State isLinked: boolean = false
  private intervalID;
  private wifiModel = new WifiModel()
  private linkedInfo: wifi.WifiLinkedInfo = null

  aboutToDisappear() {
    clearInterval(this.intervalID);
  }

  aboutToAppear() {
    if (this.interface == 2) {
      this.btnName = "WIFI 5G";
    }

    self = this

    if (wifi.isWifiActive()) {
      Logger.log(TAG, 'wifi is active')
      this.isSwitchOn = true
      wifi.scan()
      this.scan()
      this.getLinkedInfo()
    }
    // 启动监听
    this.addListener()
    if (!wifi.isWifiActive()) {
      wifi.enableWifi()
    }

  }

  onAccept(scanInfo, psw) {
    Logger.info(TAG, 'connect wifi')
    self.wifiModel.connectNetwork(scanInfo, psw)

  }

  wifiListRefresh() {
    this.wifiDataResource['dataArray'] = this.wifiList
    this.wifiDataResource.notifyDataReload()
  }

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
      Logger.log(TAG, `wifiConnectionChange: ${state}`)
      await this.getLinkedInfo()
    })
    // wifi状态改变时，先清空wifi列表，然后判断是否是开启状态，如果是就扫描
    wifi.on('wifiStateChange', state => {
      Logger.log(TAG, `wifiStateLisener state: ${state}`)
      AppStorage.SetOrCreate('wifiList', [])
      if (state === 1) { // 1: wifi is enable, 0:wifi is disable
        this.scan()
      }
    })
  }

  build() {
    commonButton({
      backColor: $backColor,
      btnName: $btnName,
    })
  }
}