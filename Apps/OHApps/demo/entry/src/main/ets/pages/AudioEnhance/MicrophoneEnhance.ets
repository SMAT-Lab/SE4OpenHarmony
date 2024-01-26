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
          Text("获取可用麦克风配置").fontSize(30).fontColor(Color.White)
        }.width('100%')
        .margin({ bottom: 40 })
        .height(60)
        .onClick(() => {
          router.pushUrl({ url: 'pages/AudioEnhance/Microphone/GetAvailableMicrophones' })
        })

        Button() {
          Text("获取当前麦克风配置").fontSize(30).fontColor(Color.White)
        }.width('100%')
        .margin({ bottom: 40 })
        .height(60)
        .onClick(() => {
          router.pushUrl({ url: 'pages/AudioEnhance/Microphone/GetCurrentMicrophones' })
        })

      }.width('90%')
      .margin('5%')
    }
    .height('100%').width('100%');

  }
}