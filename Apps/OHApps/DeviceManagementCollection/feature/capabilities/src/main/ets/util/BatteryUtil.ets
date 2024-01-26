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

import batteryInfo from '@ohos.batteryInfo';

export class BatteryUtil {
  static batterySOC() {
    return batteryInfo.batterySOC + '';
  }

  static chargingStatus() {
    let value = 'NONE';
    switch (batteryInfo.chargingStatus) {
      case batteryInfo.BatteryChargeState.NONE:
        value = 'NONE';
        break
      case batteryInfo.BatteryChargeState.ENABLE:
        value = 'ENABLE';
        break
      case batteryInfo.BatteryChargeState.DISABLE:
        value = 'DISABLE';
        break
      case batteryInfo.BatteryChargeState.FULL:
        value = 'FULL';
        break
      default:
        break
    }
    return value;
  }

  static healthStatus() {
    let value = 'UNKNOWN';
    switch (batteryInfo.healthStatus) {
      case batteryInfo.BatteryHealthState.UNKNOWN:
        value = 'UNKNOWN';
        break
      case batteryInfo.BatteryHealthState.GOOD:
        value = 'GOOD';
        break
      case batteryInfo.BatteryHealthState.OVERVOLTAGE:
        value = 'OVERVOLTAGE';
        break
      case batteryInfo.BatteryHealthState.OVERHEAT:
        value = 'OVERHEAT';
        break
      case batteryInfo.BatteryHealthState.COLD:
        value = 'COLD';
        break
      case batteryInfo.BatteryHealthState.DEAD:
        value = 'DEAD';
        break
      default:
        break
    }
    return value;
  }

  static pluggedType() {
    let value = 'NONE';
    switch (batteryInfo.pluggedType) {
      case batteryInfo.BatteryPluggedType.NONE:
        value = 'NONE';
        break
      case batteryInfo.BatteryPluggedType.AC:
        value = 'AC';
        break
      case batteryInfo.BatteryPluggedType.USB:
        value = 'USB';
        break
      case batteryInfo.BatteryPluggedType.WIRELESS:
        value = 'WIRELESS';
        break
      default:
        break
    }
    return value;
  }

  static voltage() {
    return batteryInfo.voltage + "(μV)";
  }

  static technology() {
    return batteryInfo.technology;
  }

  static batteryTemperature() {
    return (batteryInfo.batteryTemperature / 10).toFixed(2) + "(℃)";
  }

  static isBatteryPresent() {
    return batteryInfo.isBatteryPresent ? 'TRUE' : 'FALSE';
  }

  static batteryCapacityLevel() {
    let value = 'NONE';
    switch (batteryInfo.batteryCapacityLevel) {
      case batteryInfo.BatteryCapacityLevel.LEVEL_FULL:
        value = 'LEVEL_FULL';
        break
      case batteryInfo.BatteryCapacityLevel.LEVEL_HIGH:
        value = 'LEVEL_HIGH';
        break
      case batteryInfo.BatteryCapacityLevel.LEVEL_NORMAL:
        value = 'LEVEL_NORMAL';
        break
      case batteryInfo.BatteryCapacityLevel.LEVEL_LOW:
        value = 'LEVEL_LOW';
        break
      case batteryInfo.BatteryCapacityLevel.LEVEL_CRITICAL:
        value = 'LEVEL_CRITICAL';
        break
      default:
        break
    }
    return value;
  }
}