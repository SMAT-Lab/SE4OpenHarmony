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
import audio from '@ohos.multimedia.audio'

@Entry
@Component
struct TonePlayer {
  build() {

    Row() {
      Row() {
        Text("TonePlayer").fontColor(Color.White).fontSize(28).textAlign(TextAlign.Center).width('100%')
      }.position({ x: 0, y: 0 }).width('100%').height(60).backgroundColor(Color.Orange)

      Column() {
        Row() {
          Button() {
            Text("播放 callback").fontSize(22).fontColor(Color.White)
          }.height(80).width('90%')
          .onClick(() => {
            router.push({ url: 'pages/toneplayer/TonePlayerCallback' })
          })

        }.margin({ bottom: 10, top: 40 })

        Row() {
          Button() {
            Text("播放 promise").fontSize(22).fontColor(Color.White)
          }.height(80).width('90%')
          .onClick(() => {
            router.push({ url: 'pages/toneplayer/TonePlayerPromise' })
          })
        }.margin({ bottom: 10})

      }.width('100%').position({ x: 0, y: 70 }).height('100%')
    }
    .height('100%').width('100%');
  }
}