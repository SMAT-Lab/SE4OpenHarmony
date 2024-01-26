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
struct AudioVolumeManager {
  @State returnMsg: string = 'Hello World'
  private audioVolumeManager = null;
  @State isOnClickedState: string = "unclicked";

  aboutToAppear() {
    let audioManager = audio.getAudioManager();
    this.audioVolumeManager = audioManager.getVolumeManager();
  }

  build() {
    Column() {
      Row() {
        Column() {
          Text("【音量管理者】返回数据：").fontWeight(FontWeight.Bolder).position({ x: 10, y: 5 }).fontSize(18)
          Text(this.returnMsg).position({ x: 10, y: 30 }).fontSize(14)
        }.width('98%').height(120).backgroundColor(Color.Orange).position({ x: '1%' })
      }.position({ x: 0, y: 0 }).width('100%')

      Column() {
        Button("getVolumeGroupInfos callback")
          .width('90%')
          .fontSize(18)
          .height(60)
          .onClick(() => {
            let _this = this;
            this.audioVolumeManager.getVolumeGroupInfos(audio.LOCAL_NETWORK_ID, (err, value) => {
              if (err) {
                _this.returnMsg = "getVolumeGroupInfos callback err:" + JSON.stringify(err)
                return;
              }
              _this.returnMsg = "getVolumeGroupInfos callback SUCCESS:" + JSON.stringify(value)
            });
          })
          .margin({ bottom: 10 })

        Button("getVolumeGroupInfos promise")
          .width('90%')
          .fontSize(18)
          .height(60)
          .onClick(() => {
            let _this = this;
            this.audioVolumeManager.getVolumeGroupInfos(audio.LOCAL_NETWORK_ID)
              .then(value => {
                _this.returnMsg = "getVolumeGroupInfos promise SUCCESS:" + JSON.stringify(value)
              }).catch(err => {
              _this.returnMsg = "getVolumeGroupInfos promise err:" + JSON.stringify(err)
            })
          })
          .margin({ bottom: 10 })

        Button("getVolumeGroupManager callback")
          .width('90%')
          .fontSize(18)
          .height(60)
          .onClick(() => {
            let _this = this;
            this.audioVolumeManager.getVolumeGroupManager(audio.DEFAULT_VOLUME_GROUP_ID, (err, value) => {
              if (err) {
                _this.returnMsg = "getVolumeGroupManager callback err:" + JSON.stringify(err)
                return;
              }
              _this.returnMsg = "getVolumeGroupManager callback SUCCESS:" + JSON.stringify(value)
            });
          })
          .margin({ bottom: 10 })

        Button("getVolumeGroupManager callback")
          .width('90%')
          .fontSize(18)
          .height(60)
          .onClick(() => {
            let _this = this;
            this.audioVolumeManager.getVolumeGroupManager(audio.DEFAULT_VOLUME_GROUP_ID)
              .then(value => {
                _this.returnMsg = "getVolumeGroupManager promise SUCCESS:" + JSON.stringify(value)
              }).catch(err => {
              _this.returnMsg = "getVolumeGroupManager promise err:" + JSON.stringify(err)
            })
          })
          .margin({ bottom: 10 })
      }.margin({ top: 130 }).width('100%').justifyContent(FlexAlign.Center);
    }
    .height('100%').width('100%');

  }
}