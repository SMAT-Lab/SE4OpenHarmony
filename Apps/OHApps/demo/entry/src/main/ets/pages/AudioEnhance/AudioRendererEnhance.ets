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
          Text("音频流获取最大最小音量").fontSize(30).fontColor(Color.White)
        }.width('100%')
        .margin({ bottom: 40 })
        .height(55)
        .onClick(() => {
          router.pushUrl({ url: 'pages/AudioEnhance/audiorender/GetStreamVolume' })
        })

        Button() {
          Text("获取当次播放欠载音频帧数量").fontSize(30).fontColor(Color.White)
        }.width('100%')
        .margin({ bottom: 40 })
        .height(55)
        .onClick(() => {
          router.pushUrl({ url: 'pages/AudioEnhance/audiorender/GetUnderflowCount' })
        })

        Button() {
          Text("支持设置和读取播放速率和音调").fontSize(30).fontColor(Color.White)
        }.width('100%')
        .margin({ bottom: 40 })
        .height(55)
        .onClick(() => {
          router.pushUrl({ url: 'pages/AudioEnhance/audiorender/SetAndGetStreamSamplingRate' })
        })

        Button() {
          Text("获取音频流输出设备描述符").fontSize(30).fontColor(Color.White)
        }.width('100%')
        .margin({ bottom: 40 })
        .height(55)
        .onClick(() => {
          router.pushUrl({ url: 'pages/AudioEnhance/audiorender/GetCurrentOutputDevices' })
        })

        Button() {
          Text("注册和去注册音频设备监听").fontSize(30).fontColor(Color.White)
        }.width('100%')
        .margin({ bottom: 40 })
        .height(55)
        .onClick(() => {
          router.pushUrl({ url: 'pages/AudioEnhance/audiorender/DeviceChangeCallback' })
        })

        Button() {
          Text("设置播放声道数据处理").fontSize(30).fontColor(Color.White)
        }.width('100%')
        .margin({ bottom: 40 })
        .height(55)
        .onClick(() => {
          router.pushUrl({ url: 'pages/AudioEnhance/audiorender/SetChannelBlendMode' })
        })

        Button() {
          Text("设置渐变音量模式").fontSize(30).fontColor(Color.White)
        }.width('100%')
        .margin({ bottom: 40 })
        .height(55)
        .onClick(() => {
          router.pushUrl({ url: 'pages/AudioEnhance/audiorender/SetVolumeWithRamp' })
        })

        Button() {
          Text("多实例").fontSize(30).fontColor(Color.White)
        }.width('100%')
        .margin({ bottom: 40 })
        .height(55)
        .onClick(() => {
          router.pushUrl({ url: 'pages/AudioEnhance/audiorender/AudioRenderMultiInstance' })
        })

      }.width('90%')
      .margin('5%')
    }
    .height('100%').width('100%');

  }
}