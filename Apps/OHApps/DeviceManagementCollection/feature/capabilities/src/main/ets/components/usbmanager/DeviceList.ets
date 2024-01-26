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

import { DeviceAttribute } from '../../model/DeviceAttribute';

@Component
export struct DeviceList {
  @Link isRefreshing: boolean;
  @Link device: DeviceAttribute;
  @Consume('devicesList') devices: Array<DeviceAttribute>;
  public getDeviceList: () => void = () => {
  };
  public openDialog: () => void = () => {
  };

  build() {
    Column() {
      Text($r('app.string.device_list'))
        .fontSize(16)
        .fontColor($r('app.color.list_sub_content'))
        .fontWeight(FontWeight.Medium)
        .margin({
          left: 16,
          top: 24,
          bottom: 12
        })
        .width('100%')

      Refresh({ refreshing: this.isRefreshing, offset: 120, friction: 100 }) {
        List() {
          ForEach(this.devices, (item: DeviceAttribute, index: number) => {
            ListItem() {
              Text(`${item.manufacturerName} ${item.productName}`)
                .height(60)
                .fontSize(20)
                .fontWeight(FontWeight.Medium)
                .width('100%')
                .fontColor($r("app.color.black"))
                .backgroundColor($r("app.color.white"))
                .padding({ left: 16, right: 16 })
            }
            .onClick(() => {
              this.device = this.devices[index]
              this.openDialog()
            })
          })
        }
        .width('100%')
        .borderRadius(20)
        .divider({
          strokeWidth: px2vp(1),
          color: $r("app.color.divider"),
          startMargin: 16,
          endMargin: 16
        })
      }
      .width('100%')
      .margin({ bottom: 20 })
      .layoutWeight(1)
      .onRefreshing(() => {
        this.isRefreshing = true;
        this.getDeviceList();
        setTimeout(() => {
          this.isRefreshing = false;
        }, 1000)
      })
    }
    .width('100%')
    .layoutWeight(1)
    .borderRadius(20)
    .backgroundColor($r('app.color.list_background'))
  }
}