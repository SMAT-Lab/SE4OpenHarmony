/* Copyright 2023 Unionman Technology Co., Ltd.
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

import promptAction from '@ohos.promptAction';
import logger from '../Model/Logger';
import { TitleBar } from '../Commom/TitleBar';
import bluetoothManager from '@ohos.bluetoothManager';
import Bluetooth from './Bluetooth'

const TAG: string = 'UM_BLE Index'

export class BleFoundInformation {
  BleAddress: string = ''
  BleInfoName: string = ''
  BleRssi: number = 0

  constructor() {
  }
}

@Entry
@Component
struct Index {
  // 蓝牙开关标识位
  @State isOn: boolean = false
  // BLE配对设备列表
  @State deviceBleList: Array<BleFoundInformation> = []
  // BLE设备发现列表
  @State discoveryBleList: Array<BleFoundInformation> = []
  //蓝牙开标识
  enable: any = false
  //蓝牙关标识
  disable: any = false

  //扫描一次
  BLEScan: number = 1
  BLEDevice: any
  BleOnflag: boolean = true
  intervalId: number = -1
  handlerClickButton = () => {
    globalThis.abilityContext.terminateSelf()
  }


  // 搜索BLE蓝牙设备
  foundDevices() {
    // BLE设备发现上报事件，data为蓝牙设备集合
    bluetoothManager.BLE.on('BLEDeviceFind', (data) => {
      logger.info(TAG, `Begin to start foundDevices`)
      if (data !== null && data.length > 0) {
        // if (this.discoveryBleList.indexOf(data[0]) === -1) {
        let BleTmpInfo: BleFoundInformation = new BleFoundInformation()
        BleTmpInfo.BleAddress = data[0].deviceId
        // 读取广播包，解析广播包，得到设备名字，并存入设备列表
        var i = 0;
        var x = data[0].data[i]
        var y = data[0].data[i + 1]
        while (y != 0x09 && i + x + 2 < data[0].data.byteLength) {
          i = i + x + 1
          x = data[0].data[i]
          y = data[0].data[i+1]
        }

        let arr = data[0].data.slice(i + 2, i + x + 1)

        var BLEName = ""
        for (let j = 0;j < arr.byteLength; j++) {
          BLEName += String.fromCharCode(arr[j])
        }
        logger.info(TAG, `BLEName = ` + JSON.stringify(BLEName))
        BleTmpInfo.BleInfoName = BLEName
        BleTmpInfo.BleRssi = data[0].rssi
        //将发现的设备存入discoveryBleList
        this.discoveryBleList.push(BleTmpInfo)
        logger.info(TAG, ` BleTmpInfo Address ` + JSON.stringify(BleTmpInfo.BleAddress))
        logger.info(TAG, ` BleTmpInfo BleInfoName ` + JSON.stringify(BleTmpInfo.BleInfoName))
        logger.info(TAG, ` BleTmpInfo BleRssi ` + JSON.stringify(BleTmpInfo.BleRssi))
        logger.info(TAG, ` discoveryBleList ` + JSON.stringify(this.discoveryBleList))

        // }
      }
    })

    // 设置蓝牙BLE扫描模式（根据名字扫描）
    bluetoothManager.BLE.startBLEScan(
      [{
        deviceId: "C0:00:00:03:EE:FE",
      }],
      {
        interval: 7000,
        dutyMode: bluetoothManager.ScanDuty.SCAN_MODE_LOW_POWER,
        matchMode: bluetoothManager.MatchMode.MATCH_MODE_AGGRESSIVE,
      }
    )
  }

  async aboutToAppear() {
    // 获取蓝牙状态
    let state = bluetoothManager.getState()
    // 蓝牙打开，搜索附件蓝牙设备
    if (state === bluetoothManager.BluetoothState.STATE_ON) {
      this.isOn = true
      this.foundDevices()
    }
    if (state === bluetoothManager.BluetoothState.STATE_OFF) {
      this.isOn = false
    }

    // 重复调用,更新蓝牙设备列表
    this.intervalId = setInterval(() => {
      this.discoveryBleList = []
    }, 7000)

  }

  initBluetooth() {
    // 打开蓝牙
    bluetoothManager.on('stateChange', (data) => {
      logger.info(TAG, `enter on stateChange`)
      if (data === bluetoothManager.BluetoothState.STATE_ON) {
        this.foundDevices()
        logger.info(TAG, ` enter BluetoothState.STATE_ON`)
      }
      if (data === bluetoothManager.BluetoothState.STATE_OFF) {
        logger.info(TAG, ` enter BluetoothState.STATE_OFF`)
        this.discoveryBleList = []
      }
      logger.info(TAG, ` BluetoothState = ${JSON.stringify(data)}`)
    })

    bluetoothManager.enableBluetooth()
  }

  build() {
    Column() {
      TitleBar({ handlerClickButton: this.handlerClickButton })
      Scroll() {
        Column() {
          Row() {
            Column() {
              Text($r('app.string.bluetooth'))
                .fontSize(30)
                .margin({ top: 20 })
                .alignSelf(ItemAlign.Start)
              if (true == this.isOn) {
                Text($r('app.string.discovery'))
                  .fontSize(20)
                  .alignSelf(ItemAlign.Start)
              }
            }

            Blank()

            Column() {
              Toggle({ type: ToggleType.Switch, isOn: this.isOn })
                .selectedColor('#ff2982ea')
                .key('toggleBtn')
                .onChange((isOn: boolean) => {
                  if (isOn) {
                    this.isOn = true
                    this.initBluetooth()
                  } else {
                    this.isOn = false
                    bluetoothManager.BLE.off('BLEDeviceFind', () => {
                      logger.info(TAG, "取消BLE设备发现订阅！")
                    })
                    bluetoothManager.BLE.stopBLEScan()
                    bluetoothManager.disableBluetooth()
                    this.discoveryBleList = []
                    if (this.disable == true) {
                      promptAction.showToast({
                        message: 'Close bluetooth  ' + this.disable,
                        duration: 2000,
                      });
                    }
                  }
                })
            }
          }
          .width('90%')

          if (this.isOn) {
            Divider()
              .vertical(false)
              .strokeWidth(10)
              .color('#ffece7e7')
              .lineCap(LineCapStyle.Butt)
              .margin('1%')

            Divider()
              .vertical(false)
              .strokeWidth(10)
              .color('#ffece7e7')
              .lineCap(LineCapStyle.Butt)
              .margin('1%')


            Text("BLE配对设备列表")
              .fontSize(25)
              .fontColor('#ff565555')
              .margin({ left: '5%', bottom: '2%' })
              .alignSelf(ItemAlign.Start)

            ForEach(this.deviceBleList, (item) => {
              Row() {
                Text("配对设备名字: " + item.BleInfoName)
                  .fontSize(20)
                Text("配对设备MAC: " + item.BleAddress)
                  .fontSize(20)
                Button("断开")
                  .alignSelf(ItemAlign.Center)
                  .onClick(() => {
                    AlertDialog.show({
                      title: $r('app.string.disconnect'),
                      message: '此操作将会断开该设备的连接',
                      primaryButton: {
                        value: $r('app.string.cancel'),
                        action: () => {
                        }
                      },
                      secondaryButton: {
                        value: $r('app.string.confirm'),
                        action: () => {
                          let BLEdisConnect = this.BLEDevice.disconnect()
                          if (BLEdisConnect) {
                            logger.info(`connectState BLEdisConnect = ${JSON.stringify(BLEdisConnect)},断开连接`)
                            this.deviceBleList.pop()
                          }
                        }
                      }
                    })
                  })
              }
              .alignSelf(ItemAlign.Start)
              .width('100%')
              .height(50)
              .margin({ left: '5%', top: '1%' })

              Divider()
                .vertical(false)
                .color('#ffece7e7')
                .lineCap(LineCapStyle.Butt)
                .margin('1%')
            })
            Divider()
              .vertical(false)
              .strokeWidth(10)
              .color('#ffece7e7')
              .lineCap(LineCapStyle.Butt)
              .margin('1%')
            Text("BLE设备列表")
              .fontSize(25)
              .fontColor('#ff565555')
              .margin({ left: '5%', bottom: '2%' })
              .alignSelf(ItemAlign.Start)

            ForEach(this.discoveryBleList, (item) => {
              Row() {
                Button("连接")
                  .alignSelf(ItemAlign.Center)
                  .onClick(() => {
                    //订阅BEL状态变化
                    if (this.BleOnflag) {
                      //只创建一个GattClient对象
                      this.BleOnflag = false
                      this.BLEDevice = bluetoothManager.BLE.createGattClientDevice(item.BleAddress);
                      let deviceName = this.BLEDevice.getDeviceName((err, data) => {
                        logger.info(TAG, ' device name err ' + JSON.stringify(err));
                        logger.info(TAG, ' device name' + JSON.stringify(data));
                      })
                      this.BLEDevice.on('BLEConnectionStateChange', (data) => {
                        logger.info(TAG, 'bluetooth connectState state changed');
                        let connectState = data.state;
                        if (connectState === 0) {
                          logger.info(TAG, `connectState = ${JSON.stringify(connectState)},断开连接`)
                          promptAction.showToast({
                            message: '断开连接',
                            duration: 2000,
                          });
                          this.deviceBleList.pop()
                        } else if (connectState == 2) {
                          logger.info(TAG, `connectState = ${JSON.stringify(connectState)},连接成功`)
                          promptAction.showToast({
                            message: '连接成功',
                            duration: 2000,
                          });
                          // 添加连接成功的设备
                          this.deviceBleList.push(item)
                          // 订阅获取设备的服务
                          Bluetooth.getServices()
                        } else if (connectState == 1) {
                          logger.info(TAG, `connectState = ${JSON.stringify(connectState)},正在连接`)
                        } else {
                          logger.info(TAG, `connectState = ${JSON.stringify(connectState)},正在断连`)
                        }
                        logger.info(TAG, `connectState = ${JSON.stringify(connectState)}`);
                      })
                    }
                    // 连接蓝牙
                    this.BLEDevice.connect()
                  })
                Text(" Name: " + item.BleInfoName)
                  .fontSize(20)
                Text(" MAC: " + item.BleAddress)
                  .fontSize(20)
                Text(" Rssi: " + item.BleRssi)
                  .fontSize(20)
              }
              .alignSelf(ItemAlign.Start)
              .width('100%')
              .height(50)
              .margin({ left: '5%', top: '1%' })

              Divider()
                .vertical(false)
                .color('#ffece7e7')
                .lineCap(LineCapStyle.Butt)
                .margin('1%')
            })

            Divider()
              .vertical(false)
              .strokeWidth(10)
              .color('#ffece7e7')
              .lineCap(LineCapStyle.Butt)
              .margin('1%')

          }
        }
      }
      .constraintSize({ maxHeight: '85%' })
    }
  }
}