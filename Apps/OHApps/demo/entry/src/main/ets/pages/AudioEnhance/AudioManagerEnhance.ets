/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import router from '@ohos.router';

@Entry
@Component
struct Index {
  @State message: string = 'Hello World'
  @State message1: string = 'Hello World1'

  build() {
    Row() {
      Column() {
        Button() {
          Text("音量曲线").fontSize(30).fontColor(Color.White)
        }.width('110%')
        .margin({ bottom: 40 })
        .height(60)
        .onClick(() => {
          router.pushUrl({ url: 'pages/AudioEnhance/audiomanager/Configuration' })
        })

        Button() {
          Text("支持获取固定音量模式开关").fontSize(30).fontColor(Color.White)
        }.width('110%')
        .margin({ bottom: 40 })
        .height(60)
        .onClick(() => {
          router.pushUrl({ url: 'pages/AudioEnhance/audiomanager/IsVolumeUnadjustable' })
        })

        Button() {
          Text("支持单步调节系统音量").fontSize(30).fontColor(Color.White)
        }.width('110%')
        .margin({ bottom: 40 })
        .height(60)
        .onClick(() => {
          router.pushUrl({ url: 'pages/AudioEnhance/audiomanager/AdjustVolumeByStep' })
        })

        Button() {
          Text("支持单步调节系统音量(指定流)").fontSize(30).fontColor(Color.White)
        }.width('110%')
        .margin({ bottom: 40 })
        .height(60)
        .onClick(() => {
          router.pushUrl({ url: 'pages/AudioEnhance/audiomanager/AdjustSystemVolumeByStep' })
        })

        Button() {
          Text("支持获取音量增益db值").fontSize(30).fontColor(Color.White)
        }.width('110%')
        .margin({ bottom: 40 })
        .height(60)
        .onClick(() => {
          router.pushUrl({ url: 'pages/AudioEnhance/audiomanager/GetSystemVolumeInDb' })
        })

      }.width('90%')
      .margin('5%')
    }
    .height('100%').width('100%');

  }
}