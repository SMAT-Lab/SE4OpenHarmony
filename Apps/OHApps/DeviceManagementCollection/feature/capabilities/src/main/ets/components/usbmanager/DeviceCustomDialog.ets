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
import { Component } from '@ohos.UiTest';

import { DeviceAttribute } from '../../model/DeviceAttribute';

@Preview
@CustomDialog
export struct DeviceCustomDialog {
  private device: DeviceAttribute = new DeviceAttribute();
  private controller?: CustomDialogController;

  build() {
    Column() {
      Column() {
        Text(`${this.device.manufacturerName} ${this.device.productName}`)
          .width('100%')
          .fontSize(26)
          .margin({ top: 22, bottom: 22 })
          .fontWeight(FontWeight.Medium)
          .textAlign(TextAlign.Center)

        List() {
          ListItem() {
            this.SingleAttribute($r('app.string.bus_address'), this.device.busAddress.toString());
          }
          ListItem() {
            this.SingleAttribute($r('app.string.device_address'), this.device.deviceAddress.toString());
          }
          ListItem() {
            this.SingleAttribute($r('app.string.serial'), this.device.serial);
          }
          ListItem() {
            this.SingleAttribute($r('app.string.device_name'), this.device.name);
          }
          ListItem() {
            this.SingleAttribute($r('app.string.manufacturer_name'), this.device.manufacturerName);
          }
          ListItem() {
            this.SingleAttribute($r('app.string.product_name'), this.device.productName);
          }
          ListItem() {
            this.SingleAttribute($r('app.string.version'), this.device.version);
          }
          ListItem() {
            this.SingleAttribute($r('app.string.vendor_id'), this.device.vendorId.toString());
          }
          ListItem() {
            this.SingleAttribute($r('app.string.product_id'), this.device.productId.toString());
          }
          ListItem() {
            this.SingleAttribute($r('app.string.device_class'), this.device.clazz.toString());
          }
        }
        .scrollBar(BarState.Off)
        .divider({
          strokeWidth: px2vp(1),
          color: $r("app.color.divider")
        })
        .width('100%')
        .backgroundColor($r("app.color.white"))
        .borderRadius(20)

      }
      .margin({
        left: 32,
        right: 32,
        bottom: 72
      })
      .layoutWeight(1)

      Text($r('app.string.confirm'))
        .fontSize(20)
        .height(62)
        .margin({ top: 8, bottom: 8 })
        .fontColor($r("sys.color.ohos_id_color_activated"))
        .onClick(() => {
          this.controller?.close();
        })
    }
  }

  @Builder
  SingleAttribute(title: Resource, info: string) {
    Row() {
      Text(title)
        .fontSize(20)
        .fontColor($r("app.color.list_content"))
        .fontWeight(FontWeight.Medium)
        .layoutWeight(1)

      Text(info)
        .fontSize(18)
        .fontColor($r("app.color.list_sub_content"))
        .fontWeight(FontWeight.Regular)
    }
    .height(48)
    .alignSelf(ItemAlign.Start)
  }
}