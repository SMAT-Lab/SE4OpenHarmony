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
struct AudioVolumeGroupManager {
  private audioManager = null;

  aboutToAppear() {
    this.audioManager = audio.getAudioManager()
  }

  build() {

    Row() {
      Row() {
        Text("管理音频组音量").fontColor(Color.White).fontSize(28).textAlign(TextAlign.Center).width('100%')
      }.position({ x: 0, y: 0 }).width('100%').height(60).backgroundColor(Color.Orange)

      Column() {
        Row() {
          Button() {
            Text("音量").fontSize(20).fontColor(Color.White)
          }.height(80).width(80).margin({ right: 40 })
          .onClick(() => {
            router.push({ url: 'pages/volume_group_manager/Volume' })
          })

        }.margin({ bottom: 40, top: 40 })


        Row() {
          Button() {
            Text("铃声").fontSize(20).fontColor(Color.White)
          }.height(80).width(80).margin({ right: 40 })
          .onClick(() => {
            router.push({ url: 'pages/volume_group_manager/Ringer' })
          })

          Button() {
            Text("麦克风").fontSize(20).fontColor(Color.White)
          }.height(80).width(80)
          .onClick(() => {
            router.push({ url: 'pages/volume_group_manager/Microphone' })
          })
        }
      }.width('100%').position({ x: 0, y: 70 }).height('100%')

    }
    .height('100%').width('100%');

  }
}