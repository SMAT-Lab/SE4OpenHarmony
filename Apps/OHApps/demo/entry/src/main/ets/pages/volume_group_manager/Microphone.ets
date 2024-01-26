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
struct Microphone {
  @State returnMsg: string = 'Hello World'
  @State mute: boolean = false;
  private audioVolumeGroupManager = null;
  @State onMute: boolean = false;
  @State isOnClickedState: string = "unclicked";

  aboutToAppear() {

    let audioManager = audio.getAudioManager();
    let audioVolumeManager = audioManager.getVolumeManager();
    let groupid = audio.DEFAULT_VOLUME_GROUP_ID;
    let _this = this;
    audioVolumeManager.getVolumeGroupManager(groupid, (err, value) => {
      if (err) {
        _this.returnMsg = "getVolumeGroupManager failed. err:" + JSON.stringify(err);
        return;
      }
      _this.returnMsg += "getVolumeGroupManager success";
      _this.audioVolumeGroupManager = value;
    });
  }

  build() {
    Row() {
      Row() {
        Column() {
          Text("【麦克风】返回数据：").fontWeight(FontWeight.Bolder).position({ x: 10, y: 5 }).fontSize(18)
          Text(this.returnMsg).position({ x: 10, y: 30 }).fontSize(14)
        }.width('98%').height(70).backgroundColor(Color.Orange).position({ x: '1%' })
      }.position({ x: 0, y: 0 }).width('100%');

      Column() {
        Row() {
          Text("是否静音").fontSize(24)
          Radio({ value: 'mute1', group: "muteGroup" }).onChange((isChecked) => {
            if (isChecked) {
              this.mute = true;
            } else {
              this.mute = false;
            }
          }).checked(this.mute == true)
          Text("静音").fontSize(18)

          Radio({ value: 'mute2', group: "muteGroup" }).onChange((isChecked) => {
            if (isChecked) {
              this.mute = false;
            } else {
              this.mute = true;
            }
          }).checked(this.mute == false)
          Text("取消静音").fontSize(18)
        }

        Row() {
          Text("静音数据：" + this.mute).fontSize(24)
        }

        Button("on('micStateChange')")
          .fontSize(18)
          .height(60)
          .width('80%')
          .margin({ top: 10 })
          .onClick(() => {
            this.isOnClickedState = "clicked";
            let _this = this;
            this.audioVolumeGroupManager.on('micStateChange', (micStateChange) => {
              _this.onMute = micStateChange.mute;
              _this.isOnClickedState = "clicked_callback"
            });
          })

        Column() {
          if (this.isOnClickedState == "clicked") {
            Text("监听已触发").fontSize(18)
          } else if (this.isOnClickedState == "unclicked") {
            Text("监听尚未触发").fontSize(18)
          } else if (this.isOnClickedState == "clicked_callback") {
            Text("收到的回调数据" + this.onMute).fontSize(18)
          }

        }

        Button("setMicrophoneMute-callback")
          .fontSize(18)
          .height(60)
          .width('80%')
          .margin({ top: 10 })
          .onClick(() => {
            let _this = this;
            this.audioVolumeGroupManager.setMicrophoneMute(this.mute, (err) => {
              if (err) {
                _this.returnMsg = "setMicrophoneMute-callback err:" + JSON.stringify(err)
                return;
              }
              _this.returnMsg = "setMicrophoneMute-callback SUCCESS"
            });
          })

        Button("setMicrophoneMute-promise")
          .fontSize(18)
          .height(60)
          .width('80%')
          .margin({ top: 10 })
          .onClick(() => {
            let _this = this;
            this.audioVolumeGroupManager.setMicrophoneMute(this.mute)
              .then(() => {
                _this.returnMsg = "setMicrophoneMute-promise SUCCESS"
              }).catch(err => {
              _this.returnMsg = "setMicrophoneMute-promise err:" + JSON.stringify(err)
            });
          })

        Button("setMicMute-promise")
          .fontSize(18)
          .height(60)
          .width('80%')
          .margin({ top: 10 })
          .onClick(() => {
            let _this = this;
            this.audioVolumeGroupManager.setMicMute(this.mute)
              .then(() => {
                _this.returnMsg = "setMicMute-promise SUCCESS"
              }).catch(err => {
                _this.returnMsg = "setMicMute-promise err:" + JSON.stringify(err)
              });
          })

        Button("isMicrophoneMute-callback")
          .fontSize(18)
          .height(60)
          .width('80%')
          .margin({ top: 10 })
          .onClick(() => {
            let _this = this;
            this.audioVolumeGroupManager.isMicrophoneMute((err, value) => {
              if (err) {
                _this.returnMsg = "setMicrophoneMute-callback err:" + JSON.stringify(err)
                return;
              }
              _this.returnMsg = "isMicrophoneMute-callback SUCCESS,返回值：" + value
            });
          })

        Button("isMicrophoneMute-promise")
          .fontSize(18)
          .height(60)
          .width('80%')
          .margin({ top: 10 })
          .onClick(() => {
            let _this = this;
            this.audioVolumeGroupManager.isMicrophoneMute()
              .then((value) => {
                _this.returnMsg = "isMicrophoneMute-promise SUCCESS,返回值：" + value
              }).catch(err => {
              _this.returnMsg = "isMicrophoneMute-promise err:" + JSON.stringify(err)
            })
          })
      }
      .height('90%')
      .margin({ top: 80 })
      .justifyContent(FlexAlign.Center)
      .alignItems(HorizontalAlign.Center)
      .width('100%')

    }
    .height('100%').width('100%');

  }
}