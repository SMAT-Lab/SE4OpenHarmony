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

import audio from '@ohos.multimedia.audio'

@Entry
@Component
struct Ringer {
  @State returnMsg: string = 'Hello World'
  @State message1: string = 'Hello World1'
  private audioVolumeGroupManager = null;
  private ringerModeSelectList = [];
  @State selectedRingerMode: number = -1;
  @State selectedRingerModeKey: string = '请选择';
  @State changedRingerMode: number = -1;
  @State isOnClickedState: string = "unclicked"

  onPageShow(){

  }
  aboutToAppear() {
    let _this = this;
    for (let key in audio.AudioRingMode) {
      this.ringerModeSelectList.push({ value: key })
    }
    let audioManager = audio.getAudioManager();
    let audioVolumeManager = audioManager.getVolumeManager();
    let groupid = audio.DEFAULT_VOLUME_GROUP_ID;

    audioVolumeManager.getVolumeGroupManager(groupid, (err, value) => {
      if (err) {
        _this.returnMsg = "getVolumeGroupManager failed. err:" + JSON.stringify(err);
        return;
      }
      _this.returnMsg = "getVolumeGroupManager success \n";
      _this.audioVolumeGroupManager = value;


    });


  }

  build() {
    Row() {
      Row() {
        Column() {
          Text("【铃声】返回数据：").fontWeight(FontWeight.Bolder).position({ x: 10, y: 5 }).fontSize(18)
          Text(this.returnMsg).position({ x: 10, y: 30 }).fontSize(14)
        }.width('98%').height(70).backgroundColor(Color.Orange).position({ x: '1%' })
      }.position({ x: 0, y: 0 }).width('100%');

      Column() {

        Row() {

          Select(this.ringerModeSelectList)
            .value(this.selectedRingerModeKey)
            .onSelect((index, value) => {
              console.log('value='+value)
              this.selectedRingerMode = audio.AudioRingMode[value];
              this.selectedRingerModeKey=value
            }).font({size:22,weight: 800})
        }.align(Alignment.Start)

        Row() {
          Text("铃声模式数据：" + this.selectedRingerMode).fontSize(20).margin({ left: 10 })
        }.align(Alignment.Start)

        Row() {
          Button("on('ringerModeChange')").width('100%').fontSize(20).height(80).onClick(() => {
            this.isOnClickedState = "clicked"
            let _this = this;
            this.audioVolumeGroupManager.on('ringerModeChange', (ringerMode) => {
              _this.changedRingerMode = ringerMode;
              _this.isOnClickedState = "clicked_callback"
            });
          })
        }.width('100%').margin({ top: 20 })

        Row() {
          if (this.isOnClickedState == "unclicked") {
            Text("监听尚未触发").fontSize(20).margin({ left: 10, top: 5 })
          } else if (this.isOnClickedState == "clicked") {
            Text("监听已触发：尚未收到回调").fontSize(20).margin({ left: 10, top: 5 })
          } else if (this.isOnClickedState == "clicked_callback") {
            Text("监听铃声变更数据：" + this.changedRingerMode).fontSize(20).margin({ left: 10, top: 5 })
          }

        }.align(Alignment.Start).width('100%')

        Column() {
          Button("setRingerMode callback")
            .width('80%')
            .margin({ right: 10 })
            .height(80)
            .margin({ top: 10 })
            .fontSize(20)
            .onClick(() => {
              let _this = this;
              this.audioVolumeGroupManager.setRingerMode(this.selectedRingerMode, (err) => {
                if (err) {
                  _this.returnMsg = "setRingerMode callback:" + JSON.stringify(err);
                  return;
                }
                _this.returnMsg = "setRingerMode callback:SUCCESS"
              });
            })
          Button("setRingerMode promise")
            .width('80%')
            .margin({ right: 10 })
            .height(80)
            .margin({ top: 10 })
            .fontSize(20)
            .onClick(() => {
              let _this = this;
              this.audioVolumeGroupManager.setRingerMode(this.selectedRingerMode).then(() => {
                _this.returnMsg = "setRingerMode promise:SUCCESS"
              }).catch(err => {
                _this.returnMsg = "setRingerMode promise:" + JSON.stringify(err);
              });
            })
        }.width('100%').justifyContent(FlexAlign.Center).margin({ top: 20 })

        Column() {
          Button("getRingerMode callback")
            .width('80%')
            .margin({ right: 10 })
            .height(80)
            .margin({ top: 10 })
            .fontSize(20)
            .onClick(() => {
              let _this = this;
              this.audioVolumeGroupManager.getRingerMode((err, value) => {
                if (err) {
                  _this.returnMsg = "getRingerMode callback:" + JSON.stringify(err);
                  return;
                }
                _this.returnMsg = "getRingerMode callback:SUCCESS,返回值[AudioRingMode]:" + value
              });
            })
          Button("getRingerMode promise")
            .width('80%')
            .margin({ right: 10 })
            .height(80)
            .margin({ top: 10 })
            .fontSize(20)
            .onClick(() => {
              let _this = this;
              this.audioVolumeGroupManager.getRingerMode()
                .then(value => {
                  _this.returnMsg = "getRingerMode promise:SUCCESS,返回值[AudioRingMode]:" + value
                }).catch(err => {
                _this.returnMsg = "getRingerMode promise:" + JSON.stringify(err);
              });
            })
        }.width('100%').justifyContent(FlexAlign.Center)
      }.height('90%').width('100%').margin({ top: 70 });
    }
    .height('100%').width('100%');
  }
}