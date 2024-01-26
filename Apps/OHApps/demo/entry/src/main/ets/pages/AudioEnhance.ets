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

  build() {
    Row() {
      Column() {
        Button() {
          Text("音频流播放功能增强").fontSize(30).fontColor(Color.White)
        }.width('100%')
        .margin({ bottom: 40 })
        .height(60)
        .onClick(() => {
          router.pushUrl({ url: 'pages/AudioEnhance/AudioRendererEnhance' })
        })

        Button() {
          Text("音频流录制功能增强").fontSize(30).fontColor(Color.White)
        }.width('100%')
        .margin({ bottom: 40 })
        .height(60)
        .onClick(() => {
          router.pushUrl({ url: 'pages/AudioEnhance/AudioCapturerEnhance' })
        })

        Button() {
          Text("音频策略管理功能增强").fontSize(30).fontColor(Color.White)
        }.width('100%')
        .margin({ bottom: 40 })
        .height(60)
        .onClick(() => {
          router.pushUrl({ url: 'pages/AudioEnhance/AudioManagerEnhance' })
        })

        Button() {
          Text("麦克风信息管理").fontSize(30).fontColor(Color.White)
        }.width('100%')
        .margin({ bottom: 40 })
        .height(60)
        .onClick(() => {
          router.pushUrl({ url: 'pages/AudioEnhance/MicrophoneEnhance' })
        })
      }.width('90%')
      .margin('5%')

    }
    .height('100%').width('100%');

  }
}
