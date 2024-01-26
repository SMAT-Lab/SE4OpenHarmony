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
struct AudioManager {
  private audioManager = null;

  aboutToAppear() {
    this.audioManager = audio.getAudioManager()
  }

  build() {

    Row() {
      Row() {
        Text("音频管理").fontColor(Color.White).fontSize(28).textAlign(TextAlign.Center).width('100%')
      }.position({ x: 0, y: 0 }).width('100%').height(60).backgroundColor(Color.Orange)

      Column() {

        Button() {
          Text("音量管理     AudioVolumeManager").fontSize(24).fontColor(Color.White).align(Alignment.Center).lineHeight(40)
        }.width('90%').height(90).margin({bottom:10,top:10})
        .onClick(() => {
          router.push({ url: 'pages/AudioVolumeManager' })
        })

        Button() {
          Text("音量组管理 AudioVolumeGroupManager").fontSize(24).fontColor(Color.White).align(Alignment.Center).lineHeight(40)
        }.width('90%').height(90).margin({bottom:10,top:10})
        .onClick(() => {
          router.push({ url: 'pages/AudioVolumeGroupManager' })
        })

        Button() {
          Text("音频流管理 AudioStreamManager").fontSize(24).fontColor(Color.White).align(Alignment.Center).lineHeight(40)
        }.width('90%').height(90).margin({bottom:10,top:10})
        .onClick(() => {
          router.push({ url: 'pages/AudioStreamManager' })
        })

        Button() {
          Text("音频路由管理 AudioRoutingManager").fontSize(24).fontColor(Color.White).align(Alignment.Center).lineHeight(40)
        }.width('90%').height(90).margin({bottom:10,top:10})
        .onClick(() => {
          router.push({ url: 'pages/AudioRoutingManager' })
        })

        Button() {
          Text("音频路由管理 AudioManager").fontSize(24).fontColor(Color.White).align(Alignment.Center).lineHeight(40)
        }.width('90%').height(90).margin({bottom:10,top:10})
        .onClick(() => {
          router.push({ url: 'pages/audio_manager/BasicDevice' })
        })

        Button() {
          Text("设置-音频场景/参数 AudioManager").fontSize(24).fontColor(Color.White).align(Alignment.Center).lineHeight(40)
        }.width('90%').height(90).margin({bottom:10,top:10})
        .onClick(() => {
          router.push({ url: 'pages/audio_manager/Settings' })
        })

      }.width('100%').position({ x: 0, y: 70 }).height('100%')

    }
    .height('100%').width('100%');

  }
}