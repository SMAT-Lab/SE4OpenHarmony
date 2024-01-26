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

import { deviceInfos } from '../../model/deviceInfos';
import deviceInfo from '@ohos.deviceInfo'
import statvfs from '@ohos.file.statvfs'
import systemparameter from '@ohos.systemParameterEnhance'
import { TitleBar } from '../../common/TitleBar'

export class btn {
  btnName: string = ''
  isPass: boolean = false
}


@Entry
@Component
export struct deviceInformationtest {
  @State infValue: string[] = [];
  private message: string = '设备信息';
  private infName: string[] = ['系统版本：', '系统软件API版本：',  '设备类型：', 'cpu频率：',
    'cpu型号：', '内存容量：', '存储容量：', '剩余存储容量：','已使用存储容量：','设备厂家名称：','外部产品系列：','产品系列：'];
  bytesToMB(bytes) {  return bytes / (1024 * 1024);}
async aboutToAppear() {
  let filesDir = globalThis.settingsAbilityContext.filesDir;
  // 存储容量
  let stoCapacityBite = await statvfs.getTotalSize(filesDir);
  let freeCapacityBite = await statvfs.getFreeSize(filesDir);
  this.infValue.push(deviceInfo.osFullName);
  this.infValue.push(await systemparameter.get('const.ohos.apiversion'));
  this.infValue.push(deviceInfo.deviceType);
  this.infValue.push("rk3566 rgo_am64v8a");
  this.infValue.push("rk3566 rgo_am64v8a");
  this.infValue.push("rk3566 rgo_am64v8a");
  this.infValue.push(this.bytesToMB(stoCapacityBite).toFixed(0) + 'M');
  this.infValue.push(this.bytesToMB(freeCapacityBite).toFixed(0) + 'M');
  this.infValue.push(this.bytesToMB(stoCapacityBite - freeCapacityBite).toFixed(0) + 'M');
  this.infValue.push(deviceInfo.manufacture);
  this.infValue.push(deviceInfo.marketName);
  this.infValue.push(deviceInfo.productSeries);

}

build() {
    Column() {
      TitleBar({ title: '设备信息' })
      Scroll() {
        Column() {
          ForEach(this.infName, (item, index) => { // ForEach语法，循环创建GridItem
            Row() {
              Text(item)
                .fontSize(20)
                .height(50)
                .textAlign(TextAlign.Start)
                .width('50%')
              Text(this.infValue[index])
                .fontSize(20)
                .height(50)
                .textAlign(TextAlign.Start)
                .width('50%')
            }
            .borderWidth({ bottom: 2 })
            .padding({ left: 30, right: 30 })
            .width('100%')
          })
          Column()
            .margin({ bottom: 90 })
        }
.width('100%')
  .constraintSize({ minHeight: '100%' })
}
}
}
}
