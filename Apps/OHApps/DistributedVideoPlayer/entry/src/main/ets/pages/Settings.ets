/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 *
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
 *
 */

import router from '@ohos.router';
import preferences from '@ohos.data.preferences';
import deviceManager from '@ohos.distributedHardware.deviceManager';
import { RemoteDeviceModel } from '../model/RemoteDeviceModel';
import Logger from '../model/Logger';

const TAG: string = 'Setting';
const PREFERENCES_NAME = 'setting';
let preferenceSetting: preferences.Preferences = null;

@Entry
@Component
struct Setting {
  @State deviceLists: Array<deviceManager.DeviceInfo> = []
  @StorageLink('continuationMode') @Watch('continuationModeChange') continuationMode: string = 'continuation'
  private remoteDeviceModel: RemoteDeviceModel = new RemoteDeviceModel()

  async aboutToAppear() {
    preferenceSetting = await preferences.getPreferences(globalThis.context, PREFERENCES_NAME)
    this.remoteDeviceModel.registerDeviceListCallback(() => {
      Logger.info(TAG, 'registerDeviceListCallback, callback entered')
      this.deviceLists = this.remoteDeviceModel.deviceLists
      Logger.info(TAG, `deviceLists.length${this.deviceLists.length}`)
    })
  }

  async continuationModeChange() {
    await preferenceSetting.put('continuationMode', this.continuationMode)
    await preferenceSetting.flush()
  }

  build() {
    Column() {
      Row() {
        Image($r("app.media.ic_back"))
          .id("settings_back")
          .width('8%')
          .height('50%')
          .margin({ right: 4 })
          .objectFit(ImageFit.Contain)
          .onClick(() => {
            router.back()
          })

        Text('设置')
          .fontColor(Color.White)
          .fontFamily('HarmonyHeiTi')
          .fontSize(20)
          .maxLines(1)
      }
      .width('100%')
      .height('8%')
      .constraintSize({ minHeight: 50 })
      .padding({ left: 10, right: 10 })

      Row({ space: 10 }) {
        Text('流转模式')
          .fontColor(Color.White)
          .fontFamily('HarmonyHeiTi')
          .fontSize(20)

        Blank()

        Radio({ value: 'continuation', group: 'continuationMode' })
          .id("continuation")
          .checked(this.continuationMode == 'continuation' ? true : false)
          .height(25)
          .width(25)
          .onChange((isChecked: boolean) => {
            if (isChecked) {
              this.continuationMode = 'continuation'
            }
          })

        Text('跨端迁移')
          .fontColor(Color.White)
          .fontFamily('HarmonyHeiTi')
          .fontSize(20)

        Radio({ value: 'synchronization', group: 'continuationMode' })
          .id("synchronization")
          .checked(this.continuationMode == 'synchronization' ? true : false)
          .height(25)
          .width(25)
          .onChange((isChecked: boolean) => {
            if (isChecked) {
              this.continuationMode = 'synchronization'
            }
          })

        Text('多端协同')
          .fontColor(Color.White)
          .fontFamily('HarmonyHeiTi')
          .fontSize(20)
      }
      .width('100%')
      .height(100)
      .padding(10)
      .borderRadius(20)
      .backgroundColor('#464646')
      .alignItems(VerticalAlign.Center)

      Row() {
        Text('认证设备管理')
          .fontSize(16)
          .fontColor(Color.White)
      }
      .width('100%')
      .padding(10)

      Scroll() {
        Column() {
          ForEach(this.deviceLists, (item: deviceManager.DeviceInfo) => {
            Row() {
              Text(item.deviceName)
                .height('100%')
                .fontSize(20)
                .fontColor(Color.White)
                .fontFamily('HarmonyHeiTi')

              Blank()

              Button('解除认证')
                .onClick(() => {
                  this.remoteDeviceModel.unAuthenticateDevice(item)
                })
            }
            .width('100%')
            .height(80)
            .padding(10)
            .borderRadius(20)
            .backgroundColor('#464646')
            .alignItems(VerticalAlign.Center)
          })
        }
        .constraintSize({ minHeight: '100%' })
      }
    }
    .width('100%')
    .height('100%')
    .padding(10)
    .backgroundColor('#7F000000')
  }
}