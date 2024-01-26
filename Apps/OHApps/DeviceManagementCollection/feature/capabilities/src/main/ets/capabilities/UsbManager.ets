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

import { DeviceAttribute } from '../model/DeviceAttribute';
import { DeviceCustomDialog } from '../components/usbmanager/DeviceCustomDialog';
import { DeviceList } from '../components/usbmanager/DeviceList';
import { createUsbSubscribe, cancelUsbSubscribe, getDeviceList } from '../util/UsbManagerUtil';

@Component
export struct UsbManager {
  @State isListener: boolean = false;
  @State isRefreshing: boolean = false;
  @Provide('devicesList') devices: Array<DeviceAttribute> = [];
  @State device: DeviceAttribute = new DeviceAttribute();
  private dialogController: CustomDialogController = new CustomDialogController({
    builder: DeviceCustomDialog({ device: this.device }),
    autoCancel: true,
    cancel: () => {}
  });

  build() {
    Column({ space: 12 }) {
      Row() {
        Text($r('app.string.usb_listener'))
          .fontSize(20)
          .fontWeight(FontWeight.Medium)
        Blank()
        Toggle({ type: ToggleType.Switch, isOn: this.isListener })
          .onChange((isOn: boolean) => {
            this.isListener = !this.isListener
            this.listenerSwitch(this.isListener)
          })
      }
      .backgroundColor($r("app.color.white"))
      .borderRadius(20)
      .padding({ left: 16, right: 16 })
      .width('100%')
      .height(60)


      DeviceList({
        isRefreshing: $isRefreshing,
        device: $device,
        getDeviceList: () => {
          this.devices = getDeviceList();
        },
        openDialog: () => {
          this.dialogController.open();
        }
      })
    }
    .width('100%')
    .height('100%')
    .padding(16)
  }

  @Builder
  SingleAttribute(title: Resource, info: string) {
    Row() {
      Text(title)
        .fontSize(20)
        .width('100')
        .fontWeight(FontWeight.Bold)

      Text(info)
        .fontSize(20)
        .layoutWeight(1)
        .textAlign(TextAlign.Start)
    }
    .margin({ top: 10 })
    .alignSelf(ItemAlign.Start)
  }

  listenerSwitch(isListener: boolean) {
    if (isListener) {
      this.devices = getDeviceList();
      createUsbSubscribe(() => {
        this.devices = getDeviceList();
      })
    } else {
      cancelUsbSubscribe();
    }
  }
}