/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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

import thermal from '@ohos.thermal';

export class ThermalUtil {
  static getLevel(): string {
    return ThermalUtil.getStrLevel(thermal.getLevel());
  }

  static getStrLevel(level: Number) {
    let value = "NONE";
    switch (level) {
      case thermal.ThermalLevel.COOL:
        value = 'COOL 0';
        break
      case thermal.ThermalLevel.NORMAL:
        value = 'NORMAL 1';
        break
      case thermal.ThermalLevel.WARM:
        value = 'WARM 2';
        break
      case thermal.ThermalLevel.HOT:
        value = 'HOT 3';
        break
      case thermal.ThermalLevel.OVERHEATED:
        value = 'OVERHEATED 4';
        break
      case thermal.ThermalLevel.WARNING:
        value = 'WARNING 5';
        break
      case thermal.ThermalLevel.EMERGENCY:
        value = 'EMERGENCY 6';
        break
      default:
        break
    }
    return value
  }

  static registerThermalLevelCallback(callback: (level: number) => void) {
    thermal.registerThermalLevelCallback(callback);
  }

  static unregisterThermalLevelCallback() {
    thermal.unregisterThermalLevelCallback();
  }

  static timestampToTime(timestamp: number) {
    let date = new Date(timestamp);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()) + ' ';
    let h = (date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()) + ':';
    let m = (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()) + ':';
    let s = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds();
    return (Y + M + D + h + m + s) + '';
  }
}