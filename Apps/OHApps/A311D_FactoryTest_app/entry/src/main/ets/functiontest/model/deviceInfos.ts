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

import deviceInfo from '@ohos.deviceInfo'
import statvfs from '@ohos.file.statvfs'
import systemparameter from '@ohos.systemParameterEnhance'

export class deviceInfos {
  public osFullName; // 系统版本
  public sdkApiVersion; // 系统软件API版本
  public hardwareModel; // 硬件版本号
  public deviceType; // 设备类型
  public displayVersion; // 产品版本
  public cpuFrequency; // cpu频率
  public cpuModule; // cpu型号
  public memCapacity; // 内存容量
  public stoCapacity; // 存储容量
  public freeCapacity; // 剩余容量
  constructor() {

  }
  bytesToMB(bytes) {  return bytes / (1024 * 1024);}
  async init(){
    this.osFullName = deviceInfo.osFullName;
    this.sdkApiVersion = deviceInfo.sdkApiVersion;
    this.hardwareModel = deviceInfo.hardwareProfile;
    this.deviceType = deviceInfo.deviceType;
    this.displayVersion = deviceInfo.displayVersion;
    // this.cpuFrequency = ;
    this.cpuModule = await systemparameter.get('const.product.cpu.abilist');
    // // 内存容量
    // this.memCapacity = ;
    let path = "/dev";
    // 存储容量
    let ret = await statvfs.getTotalSize(path);
    this.stoCapacity = this.bytesToMB(ret).toFixed(2) + 'M';
    // 剩余容量
    ret = await statvfs.getFreeSize(path);
    this.freeCapacity = this.bytesToMB(ret).toFixed(2) + 'M';
  }
}
