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

import { ListModel } from '../model/ListModel';
import { BatteryUtil } from '../util/BatteryUtil';

@Extend(Text) function fancy() {
  .height(50)
  .fontSize(16)
  .fontWeight(500)
}

@Component
export struct BatteryInfo {
  @State table: ListModel[] = [
    new ListModel('Battery SOC', BatteryUtil.batterySOC),
    new ListModel('Charging Status', BatteryUtil.chargingStatus),
    new ListModel('Health Status', BatteryUtil.healthStatus),
    new ListModel('Plugged Type', BatteryUtil.pluggedType),
    new ListModel('Voltage', BatteryUtil.voltage),
    new ListModel('Technology', BatteryUtil.technology),
    new ListModel('Battery Temperature', BatteryUtil.batteryTemperature),
    new ListModel('Battery Present', BatteryUtil.isBatteryPresent),
    new ListModel('Battery Capacity Level', BatteryUtil.batteryCapacityLevel)
  ];

  build() {
    List() {
      ForEach(this.table, (item: ListModel) => {
        ListItem() {
          Row() {
            Text(item.title)
              .textAlign(TextAlign.Start)
              .fontSize(20)
              .fontWeight(FontWeight.Medium)
              .fontColor($r("app.color.list_title"))
            Blank()
            Text(item.getValue())
              .textAlign(TextAlign.End)
              .fontSize(18)
              .fontWeight(FontWeight.Regular)
              .fontColor($r("app.color.list_sub_content"))
          }
          .padding({
            left: 16,
            right: 16
          })
          .height(62)
          .width('100%')
        }
      })
    }
    .divider({
      strokeWidth: px2vp(1),
      color: $r("app.color.divider"),
      startMargin: 16,
      endMargin: 16
    })
    .margin({
      top: 16,
      bottom: 16,
      left: 4,
      right: 4
    })
    .width('100%')
    .backgroundColor($r("app.color.white"))
    .borderRadius(20)
  }
}