/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import emitter from '@ohos.events.emitter';
import Logger from '../utils/Logger';
import { AudioInfo } from '../appsampled/data/SearchResult';
import AVPlayerModel from '../model/AVPlayerModel'
import Constant from '../utils/Constant';

const TAG: string = '[SearchPlayMusicComponent]';

@Component
export default struct SearchPlayMusicComponent {
  private audioInfo?: AudioInfo;
  private avPlayerModel: AVPlayerModel = new AVPlayerModel(getContext(this));
  @State isCollect: boolean = false;
  @State isPlay: boolean = false;
  @State isInit: boolean = false;

  aboutToAppear() {
    // 监听暂停事件，当有其他音乐播放时当前播放
    emitter.on({ eventId: Constant.EVENT_PAUSED_AUDIO }, data => {
      Logger.info(TAG, `emitter on data = ${JSON.stringify(data)}`)
      if (data) {
        // 拿出传过来的ID
        let audioId: number = data.data?.audioId;
        Logger.info(TAG, `emitter on data audioId= ${JSON.stringify(audioId)}`)
        // 不与当前ID相同则暂停，规避自身也会暂停的问题
        if (audioId && audioId !== this.audioInfo?.audioId) {
          Logger.info(TAG, `emitter on data this.isPlay= ${JSON.stringify(this.isPlay)}`)
          if (this.isPlay) {
            this.avPlayerModel.paused();
            this.isPlay = false;
          }
        }
      }
    });
  }

  build() {
    Row() {
      // 音乐头像
      Stack() {
        Image($r('app.media.app_icon'))
          .width(74)
          .height(74)
          .objectFit(ImageFit.Contain)
          .borderRadius(10)
        Image(this.isPlay ? $r('app.media.app_icon') : $r('app.media.app_icon'))
          .width(26)
          .height(26)
          .objectFit(ImageFit.Contain)
      }
      .id(`musicID_${this.audioInfo?.audioId}`)
      .width(74)
      .height(74)
      .margin({ right: 12 })
      .alignContent(Alignment.Center)
      .onClick(e => {
        // 播放的音乐点击则暂停
        if (this.isPlay) {
          this.avPlayerModel.paused();
        } else {
          // 播放当前音乐时发送事件暂停其他音乐播放事件
          emitter.emit({ eventId: Constant.EVENT_PAUSED_AUDIO }, {
            data: {
              'audioId': this.audioInfo?.audioId
            }
          });
          // 第一次点击播放先初始化音乐
          if (!this.isInit) {
            this.avPlayerModel.avPlayerFdSrcDemo(this.audioInfo?.audio);
            this.isInit = !this.isInit;
          } else {
            // 初始化过的直接播放
            this.avPlayerModel.play();
          }
        }
        this.isPlay = !this.isPlay;
      })

      // 音乐信息
      Column({ space: 2 }) {
        Row({ space: 2 }) {
          Image($r('app.media.app_icon'))
            .width(18)
            .height(18)
            .objectFit(ImageFit.Contain)
            .borderRadius(10)
          Text(this.audioInfo?.audioName)
            .height(18)
            .fontColor($r('app.color.COLOR_FFFFFF'))
            .fontSize(16)
            .fontFamily($r('app.string.Font_family_medium'))
            .textAlign(TextAlign.Start)
        }
        .height(30)

        Text(this.audioInfo?.audioAuthorName)
          .height(18)
          .fontColor($r('app.color.COLOR_CCFFFFFF'))
          .fontSize(14)
          .fontFamily($r('app.string.Font_family_regular'))
          .textAlign(TextAlign.Start)

        Row({ space: 5 }) {
          Text(this.audioInfo?.audioTime)
            .height(18)
            .fontColor($r('app.color.COLOR_CCFFFFFF'))
            .fontSize(14)
            .fontFamily($r('app.string.Font_family_regular'))
            .textAlign(TextAlign.Start)
          Text()
            .width(2)
            .height(2)
            .backgroundColor($r('app.color.COLOR_CCFFFFFF'))
            .borderRadius(1)
          Text(this.audioInfo?.audioNum)
            .height(18)
            .fontColor($r('app.color.COLOR_CCFFFFFF'))
            .fontSize(14)
            .fontFamily($r('app.string.Font_family_regular'))
            .textAlign(TextAlign.Center)
        }
        .height(20)
      }
      .height(70)
      .alignItems(HorizontalAlign.Start)

      Blank()

      Column() {
        Image(this.isCollect ? $r('app.media.app_icon') : $r('app.media.app_icon'))
          .width(20)
          .height(20)
          .objectFit(ImageFit.Contain)
          .margin({ right: 12 })
      }
      .width(40)
      .height(40)
      .justifyContent(FlexAlign.Center)
      .alignItems(HorizontalAlign.Center)
      .onClick(e => {
        this.isCollect = !this.isCollect;
      })
    }
    .height(90)
    .width('100%')
  }
}