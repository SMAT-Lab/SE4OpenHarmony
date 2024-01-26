/**
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

import { getString } from '@ohos/common';
import {
  BatteryInfo,
  RunningLockManager,
  PowerManager,
  SettingsManager,
  Thermal,
  UsbManager,
  StationaryManager
} from '@ohos/capabilities';

@Component
export struct Capabilities {
  @StorageLink('selectedLabel') selectedLabel: string = '';
  @State label: string = '';

  aboutToAppear() {
    // StorageLink会触发多次刷新，用State接收
    this.label = this.selectedLabel;
  }

  build() {
    Column() {
      // 此处根据选中的菜单，显示对应的页面内容
      if (this.label === getString($r('app.string.battery_info'))) {
        BatteryInfo()
      } else if (this.label === getString($r('app.string.running_lock'))) {
        RunningLockManager()
      } else if (this.label === getString($r('app.string.power_manager'))) {
        PowerManager()
      } else if (this.label === getString($r('app.string.settings'))) {
        SettingsManager()
      } else if (this.label === getString($r('app.string.stationary'))) {
        StationaryManager()
      } else if (this.label === getString($r('app.string.thermal'))) {
        Thermal()
      } else if (this.label === getString($r('app.string.usb_manager'))) {
        UsbManager()
      }
    }
    .padding({ left: 12, right: 12 })
  }
}