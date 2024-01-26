/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
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

import power from '@ohos.power';
import { getStringArray } from '@ohos/common';

let powerModes: Array<power.DevicePowerMode> = [
power.DevicePowerMode.MODE_NORMAL,
power.DevicePowerMode.MODE_POWER_SAVE,
power.DevicePowerMode.MODE_PERFORMANCE,
power.DevicePowerMode.MODE_EXTREME_POWER_SAVE
];

export class PowerManagerUtil {

  static isActive(): boolean {
    return power.isActive();
  }

  /**
   MODE_NORMAL  600  表示标准模式，默认值。
   MODE_POWER_SAVE  601  表示省电模式。
   MODE_PERFORMANCE  602  表示性能模式。
   MODE_EXTREME_POWER_SAVE  603  表示超级省电模式。
   */
  static async getPowerModeName(): Promise<string> {
    let powerModeNames = await getStringArray($r('app.strarray.power_mode'))
    switch (power.getPowerMode()) {
      case powerModes[0]:
        return powerModeNames[0];
      case powerModes[1]:
        return powerModeNames[1];
      case powerModes[2]:
        return powerModeNames[2];
      case powerModes[3]:
        return powerModeNames[3];
      default:
        return ''
    }
  }
}