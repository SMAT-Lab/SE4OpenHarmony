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

import { deviceInfos } from './model/deviceInfos';
import statvfs from '@ohos.file.statvfs';

export class btn {
  btnName: string = ''
  isPass: boolean = false
}


@Component
export struct deviceInformationtest {
  @State infValue: string[] = []
  private message: string = '设备信息'
  private infName: string[] = ['系统版本：', '系统软件API版本：', '硬件版本号：', '设备类型：', '产品版本：', 'cpu频率：', 'cpu型号：', '内存容量：', '存储容量：', '剩余存储容量：']
  private myDeviceInfos: deviceInfos = new deviceInfos()

  async aboutToAppear() {
    await this.myDeviceInfos.init()
    this.infValue.push(this.myDeviceInfos.osFullName)
    this.infValue.push(this.myDeviceInfos.sdkApiVersion)
    this.infValue.push(this.myDeviceInfos.hardwareModel)
    this.infValue.push(this.myDeviceInfos.displayVersion)
    this.infValue.push(this.myDeviceInfos.deviceType)
    this.infValue.push(this.myDeviceInfos.cpuFrequency)
    this.infValue.push(this.myDeviceInfos.cpuModule)
    this.infValue.push(this.myDeviceInfos.memCapacity)
    this.infValue.push(this.myDeviceInfos.stoCapacity)
    this.infValue.push(this.myDeviceInfos.freeCapacity)
  }

  build() {
    Scroll() {
      Column() {
        Text(this.message)
          .fontSize(30)
          .margin({ bottom: 20 })
        ForEach(this.infName, (item, index) => { // ForEach语法，循环创建GridItem
          Text(this.infName[index] + this.infValue[index])
            .fontSize(20)
            .width('100%')
            .textAlign(TextAlign.Center)
        })
      }
      .width('100%')
      .constraintSize({ minHeight: '100%' })
    }
  }
}
