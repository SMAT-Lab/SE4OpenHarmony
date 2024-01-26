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

import systemTime from '@ohos.systemDateTime';
import { ListModel } from '../model/ListModel';
import thermal from '@ohos.thermal';
import { ThermalUtil } from '../util/ThermalUtil';
import promptAction from '@ohos.promptAction';

@Extend(Text) function fancy() {
  .height(50)
  .fontSize(16)
  .fontWeight(500)
}

@Component
export struct Thermal {
  @State table: ListModel[] = [
    new ListModel('Thermal level', ThermalUtil.getLevel),
    new ListModel('Callback level', undefined),
    new ListModel('Last callback time', undefined)
  ];

  aboutToAppear() {
    this.initThermal();
  }

  aboutToDisappear() {
    ThermalUtil.unregisterThermalLevelCallback();
  }

  build() {
    List() {
      ForEach(this.table, (item: ListModel) => {
        ListItem() {
          Row() {
            Text(item.title)
              .fontSize(20)
              .fontWeight(FontWeight.Medium)
              .fontColor($r("app.color.list_title"))
              .textAlign(TextAlign.Start)
            Blank()
            Text(item.getValue())
              .fontSize(18)
              .fontWeight(FontWeight.Medium)
              .fontColor($r("app.color.list_sub_content"))
              .textAlign(TextAlign.End)
          }
          .padding({ left: 16, right: 16 })
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
    .borderRadius(20)
    .backgroundColor($r("app.color.white"))
    .margin({
      top: 16,
      bottom: 16,
      left: 4,
      right: 4
    })
    .width('100%')
  }

  initThermal() {
    const INDEX_0 = 0;
    const INDEX_1 = 1;
    ThermalUtil.registerThermalLevelCallback((level: number) => {
      this.table[INDEX_0] = new ListModel('Thermal level', undefined, ThermalUtil.getLevel());
      this.table[INDEX_1] = new ListModel('Callback level', undefined, ThermalUtil.getStrLevel(level));
      this.getCurrentTime();
      if (level === thermal.ThermalLevel.WARNING) {
        try {
          promptAction.showToast({
            message: $r('app.string.thermal_warning'),
            duration: 2000,
          });
        } catch (error) {
          console.error(`showToast args error code is ${error?.code}, message is ${error?.message}`);
        }
      }
    })
  }

  getCurrentTime() {
    const INDEX_2 = 2;
    systemTime.getCurrentTime().then((date: number) => {
      this.table[INDEX_2] = new ListModel('Last callback time', undefined, ThermalUtil.timestampToTime(date));
    })
  }
}