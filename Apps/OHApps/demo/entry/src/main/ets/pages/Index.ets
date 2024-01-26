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
          Text("音频管理").fontSize(30).fontColor(Color.White)
        }.width('100%')
        .margin({ bottom: 40 })
        .height(60)
        .onClick(() => {
          router.pushUrl({ url: 'pages/AudioManager' })
        })

        Button() {
          Text("音频录制").fontSize(30).fontColor(Color.White)
        }.width('100%')
        .margin({ bottom: 40 })
        .height(60)
        .onClick(() => {
          router.pushUrl({ url: 'pages/AudioCapturer' })
        })

        Button() {
          Text("音频渲染").fontSize(30).fontColor(Color.White)
        }.width('100%')
        .margin({ bottom: 40 })
        .height(60)
        .onClick(() => {
          router.pushUrl({ url: 'pages/AudioRenderer' })
        })

        Button() {
          Text("分布式音频").fontSize(30).fontColor(Color.White)
        }.width('100%')
        .margin({ bottom: 40 })
        .height(60)
        .onClick(() => {
          router.pushUrl({ url: 'pages/DistributedAudio' })
        })

        Button() {
          Text("DTMF播放器").fontSize(30).fontColor(Color.White)
        }.width('100%')
        .margin({ bottom: 40 })
        .height(60)
        .onClick(() => {
          router.pushUrl({ url: 'pages/TonePlayer' })
        })

        Button() {
          Text("音频焦点").fontSize(30).fontColor(Color.White)
        }.width('100%')
        .margin({ bottom: 40 })
        .height(60)
        .onClick(() => {
          router.pushUrl({ url: 'pages/AudioFocus' })
        })

        Button() {
          Text("音频框架增强").fontSize(30).fontColor(Color.White)
        }.width('100%')
        .margin({ bottom: 10 })
        .height(60)
        .onClick(() => {
          router.pushUrl({ url: 'pages/AudioEnhance' })
        })

      }.width('90%')
      .margin('5%')

    }
    .height('100%').width('100%');

  }
}