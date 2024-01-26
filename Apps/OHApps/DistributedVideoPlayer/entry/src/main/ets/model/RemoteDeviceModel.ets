/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 *
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
 *
 */

import Logger from './Logger';
import promptAction from '@ohos.promptAction';
import deviceManager from '@ohos.distributedHardware.deviceManager';

const TAG = 'RemoteDeviceModel';
const RANDOM: number = 65536;
let SUBSCRIBE_ID = 100;

export class RemoteDeviceModel {
  public deviceLists: Array<deviceManager.DeviceInfo> = []
  public discoverLists: Array<deviceManager.DeviceInfo> = []
  private callback: () => void = null
  private authCallback: (device: deviceManager.DeviceInfo) => void = null
  private deviceManager: deviceManager.DeviceManager = undefined

  constructor() {
  }

  registerDeviceListCallback(callback) {
    if (typeof (this.deviceManager) !== 'undefined') {
      this.registerDeviceListCallbackImplement(callback)
      return
    }
    Logger.info(TAG, 'deviceManager.createDeviceManager begin')
    try {
      deviceManager.createDeviceManager("com.unionman.distributedvideoplayer", (error, value) => {
        if (error) {
          Logger.error(TAG, `createDeviceManager failed.${error}`)
          return
        }
        this.deviceManager = value
        this.registerDeviceListCallbackImplement(callback)
        Logger.info(TAG, `createDeviceManager callback returned, error= ${error} value= ${JSON.stringify(value)}`)
      })
    } catch (error) {
      Logger.error(TAG, `createDeviceManager throw error, code=${error.code} message=${error.message}`)
    }
    Logger.info(TAG, 'deviceManager.createDeviceManager end')
  }

  deviceStateChangeActionOffline(device) {
    if (this.deviceLists.length <= 0) {
      this.callback()
      return
    }
    for (let j = 0; j < this.deviceLists.length; j++) {
      if (this.deviceLists[j].deviceId === device.deviceId) {
        this.deviceLists[j] = device
        break
      }
    }
    Logger.info(TAG, `offline, device list= ${JSON.stringify(this.deviceLists)}`)
    this.callback()
  }

  changeStateOnline(device) {
    this.deviceLists[this.deviceLists.length] = device
    Logger.debug(TAG, `online, device list= ${JSON.stringify(this.deviceLists)}`)
    this.callback()
  }

  registerDeviceListCallbackImplement(callback) {
    Logger.info(TAG, 'registerDeviceListCallback')
    this.callback = callback
    if (this.deviceManager === undefined) {
      Logger.error(TAG, 'deviceManager has not initialized')
      this.callback()
      return
    }
    Logger.info(TAG, 'getTrustedDeviceListSync begin')
    try {
      let list = this.deviceManager.getTrustedDeviceListSync()
      Logger.info(TAG, `getTrustedDeviceListSync end, deviceList= ${JSON.stringify(list)}`)
      if (typeof (list) != 'undefined' && typeof (list.length) != 'undefined') {
        this.deviceLists = list
      }
    } catch (error) {
      Logger.error(TAG, `getTrustedDeviceListSync throw error, code=${error.code} message=${error.message}`)
    }

    this.callback()
    Logger.info(TAG, `callback finished devices = ${JSON.stringify(this.deviceLists)}`)
    try {
      this.deviceManager.on('deviceStateChange', (data) => {
        if (data === null) {
          return
        }
        Logger.info(TAG, `deviceStateChange data= ${JSON.stringify(data)}`)
        switch (data.action) {
          case deviceManager.DeviceStateChangeAction.ONLINE:
            this.changeStateOnline(data.device)
            break;
          case deviceManager.DeviceStateChangeAction.READY:
            this.discoverLists = []
            this.deviceLists.push(data.device)
            this.callback()
            try {
              let list = this.deviceManager.getTrustedDeviceListSync()
              if (typeof (list) !== 'undefined' && typeof (list.length) !== 'undefined') {
                this.deviceLists = list
              }
            } catch (error) {
              Logger.error(TAG, `getTrustedDeviceListSync throw error, code=${error.code} message=${error.message}`)
            }
            this.callback()
            break;
          case deviceManager.DeviceStateChangeAction.OFFLINE:
          case deviceManager.DeviceStateChangeAction.CHANGE:
            this.deviceStateChangeActionOffline(data.device)
            try {
              let list = this.deviceManager.getTrustedDeviceListSync()
              if (typeof (list) !== 'undefined' && typeof (list.length) !== 'undefined') {
                this.deviceLists = list
              }
            } catch (error) {
              Logger.error(TAG, `getTrustedDeviceListSync throw error, code=${error.code} message=${error.message}`)
            }
            this.callback()
            break
          default:
            break
        }
      })
      this.deviceManager.on('deviceFound', (data) => {
        if (data === null) {
          return
        }
        Logger.info(TAG, `deviceFound data=${JSON.stringify(data)}`)
        this.deviceFound(data)
      })
      this.deviceManager.on('discoverFail', (data) => {
        Logger.info(TAG, `discoverFail data= ${JSON.stringify(data)}`)
      })
      this.deviceManager.on('serviceDie', () => {
        Logger.error(TAG, 'serviceDie')
      })
    } catch (error) {
      Logger.error(TAG, `on throw error, code=${error.code} message=${error.message}`)
    }
    this.startDeviceDiscovery()
  }

  deviceFound(data) {
    for (var i = 0;i < this.discoverLists.length; i++) {
      if (this.discoverLists[i].deviceId === data.device.deviceId) {
        Logger.info(TAG, 'device founded ignored')
        return
      }
    }
    this.discoverLists[this.discoverLists.length] = data.device
    Logger.info(TAG, `deviceFound self.discoverList= ${JSON.stringify(this.discoverLists)}`)
    this.callback()
  }

  /**
   * 通过SUBSCRIBE_ID搜索分布式组网内的设备
   */
  startDeviceDiscovery() {
    // 生成发现标识，随机数确保每次调用发现接口的标识不一致,且SUBSCRIBE_ID在0到65536之间
    SUBSCRIBE_ID = Math.floor(RANDOM * Math.random())
    let info = {
      subscribeId: SUBSCRIBE_ID, // 发现标识，用于标识不同的发现周期
      mode: 0xAA, // 主动模式
      medium: 2, // WiFi发现类型
      freq: 2, // 高频率
      isSameAccount: false, // 是否同账号
      isWakeRemote: true, // 是否唤醒设备
      capability: 0 // DDMP能力
    }
    Logger.info(TAG, `startDeviceDiscovery ${SUBSCRIBE_ID}`)
    // 当有设备发现时，通过deviceFound回调通知给应用程序
    try {
      this.deviceManager.startDeviceDiscovery(info)
    } catch (error) {
      Logger.error(TAG, `startDeviceDiscovery throw error, code=${error.code} message=${error.message}`)
    }
  }

  authenticateDevice(device, callBack) {
    Logger.info(TAG, `authenticateDevice ${JSON.stringify(device)}`)
    for (let i = 0; i < this.discoverLists.length; i++) {
      if (this.discoverLists[i].deviceId !== device.deviceId) {
        continue
      }
      let extraInfo = {
        'targetPkgName': 'com.unionman.distributedvideoplayer',
        'appName': 'Distributed VideoPlayer',
        'appDescription': 'Distributed VideoPlayer',
        'business': '0'
      }
      let authParam = {
        'authType': 1, //认证类型： 1 - 无账号PIN码认证
        'appIcon': '',
        'appThumbnail': '',
        'extraInfo': extraInfo
      }
      try {
        this.deviceManager.authenticateDevice(device, authParam, (err, data) => {
          if (err) {
            Logger.error(TAG, `authenticateDevice error: ${JSON.stringify(err)}`)
            this.authCallback = null
            return
          }
          Logger.info(TAG, `authenticateDevice succeed: ${JSON.stringify(data)}`)
          this.authCallback = callBack
          if (this.authCallback !== null) {
            this.authCallback(device)
            this.authCallback = null
          }
        })
      } catch (error) {
        Logger.error(TAG, `authenticateDevice throw error, code=${error.code} message=${error.message}`)
      }
    }
  }

  unAuthenticateDevice(device) {
    try {
      this.deviceManager.unAuthenticateDevice(device);
      promptAction.showToast({ message: '解除中，请稍后...', duration: 3000 })
    } catch (err) {
      Logger.error(TAG, "unAuthenticateDevice errCode:" + err.code + ",errMessage:" + err.message);
    }
  }
}