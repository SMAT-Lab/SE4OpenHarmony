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
struct AudioFocus {
  build() {
    Row() {
      Row() {
        Text("音频焦点").fontColor(Color.White).fontSize(28).textAlign(TextAlign.Center).width('100%')
      }.position({ x: 0, y: 0 }).width('100%').height(60).backgroundColor(Color.Orange)
      Column() {

        Button() {
          Text("Renderer-Renderer").fontSize(30).fontColor(Color.White)
        }.width('100%')
        .margin({ bottom: 40 })
        .height(100)
        .onClick(() => {
          router.push({ url: 'pages/focus/RendererInterruptRenderer' })
        })

        Button() {
          Text("avplayer-avplayer").fontSize(30).fontColor(Color.White)
        }.width('100%')
        .margin({ bottom: 40 })
        .height(100)
        .onClick(() => {
          router.push({ url: 'pages/focus/AvplayerInterruptAvplayer' })
        })


        Button() {
          Text("Capturer-Capturer").fontSize(30).fontColor(Color.White)
        }.width('100%')
        .margin({ bottom: 40 })
        .height(100)
        .onClick(() => {
          router.push({ url: 'pages/focus/CapturerInterruptCapturer' })
        })



        Button() {
          Text("Capturer-Renderer").fontSize(30).fontColor(Color.White)
        }.width('100%')
        .margin({ bottom: 40 })
        .height(100)
        .onClick(() => {
          router.push({ url: 'pages/focus/CapturerInterruptRenderer' })
        })



      }.width('90%')
      .margin('5%')

    }
    .height('100%').width('100%');

  }
}