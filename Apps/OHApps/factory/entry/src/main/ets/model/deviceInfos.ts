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
// @ts-ignore
import deviceinfonapi from '@ohos.deviceinfonapi'

export class deviceInfos {
  public osFullName; // 系统版本
  public sdkApiVersion; // 系统软件API版本
  public deviceType; // 设备类型
  public cpuFrequency; // cpu频率
  public cpuModule; // cpu型号
  public memCapacity; // 内存容量
  public stoCapacity; // 存储容量
  public usedCapacity; // 已使用存储容量
  public freeCapacity; // 剩余容量
  public manufacture;// 设备厂家名称
  public marketName;// 外部产品系列
  public productSeries;// 产品系列

  constructor() {

  }
  bytesToMB(bytes) {  return bytes / (1024 * 1024);}
  async init(){
    this.osFullName = deviceInfo.osFullName;
    this.sdkApiVersion = await systemparameter.get('const.ohos.apiversion');
    this.deviceType = deviceInfo.deviceType;
    this.cpuFrequency = (await deviceinfonapi.get_cpu_frequency()/1000).toFixed(0).toString()+ 'MHZ';
    this.cpuModule = await systemparameter.get('const.product.cpu.abilist');
    // 内存容量
    this.memCapacity = this.bytesToMB(await deviceinfonapi.get_mem_capacity()).toFixed(0) + 'M';
    let filesDir = globalThis.context.filesDir;
    // 存储容量
    let stoCapacityBite = await statvfs.getTotalSize(filesDir);
    this.stoCapacity = this.bytesToMB(stoCapacityBite).toFixed(0) + 'M';
    // 剩余容量
    let freeCapacityBite = await statvfs.getFreeSize(filesDir);
    this.freeCapacity = this.bytesToMB(freeCapacityBite).toFixed(0) + 'M';
    this.usedCapacity = this.bytesToMB(stoCapacityBite - freeCapacityBite).toFixed(0) + 'M';
    this.manufacture = deviceInfo.manufacture;
    this.marketName = deviceInfo.marketName;
    this.productSeries = deviceInfo.productSeries;

  }
}
