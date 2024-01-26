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

import { VideoDetailInfo } from '../appsampled/data/SearchResult';
import AVPlayerModel from '../model/AVPlayerModel'
import Constant from '../utils/Constant';
import Logger from '../utils/Logger';

const TAG: string = '[SearchPlayVideoComponent]';

@Component
export default struct SearchPlayVideoComponent {
  private videoDetailInfo?: VideoDetailInfo;
  private xComponentController: XComponentController = new XComponentController();
  private avPlayerModel: AVPlayerModel = new AVPlayerModel(getContext(this));
  @State surfaceId: string = '-1';
  @State isPlay: boolean = false;
  @State isInit: boolean = false;

  aboutToAppear() {
    // 监听暂停事件，当有其他音乐播放时当前播放
    emitter.on({ eventId: Constant.EVENT_PAUSED_VIDEO }, data => {
      Logger.info(TAG, `emitter on data = ${JSON.stringify(data)}`)
      if (data) {
        // 拿出传过来的ID
        let videoDetailId: number = data.data?.videoDetailId;
        Logger.info(TAG, `emitter on data videoId= ${JSON.stringify(videoDetailId)}`)
        // 不与当前ID相同则暂停，规避自身也会暂停的问题
        if (videoDetailId && videoDetailId !== this.videoDetailInfo?.videoDetailId) {
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
    Column() {
      // 作者信息
      Row({ space: 8 }) {
        Image($r('app.media.app_icon'))
          .width(48)
          .height(48)
          .objectFit(ImageFit.Contain)
          .borderRadius(24)
        Column({ space: 5 }) {
          Text(this.videoDetailInfo?.videoDetailAuthorName)
            .height(18)
            .fontColor($r('app.color.COLOR_FFFFFF'))
            .fontSize(18)
            .fontFamily($r('app.string.Font_family_medium'))
            .textAlign(TextAlign.Start)
          Text(this.videoDetailInfo?.videoDetailTime)
            .height(18)
            .fontColor($r('app.color.COLOR_CCFFFFFF'))
            .fontSize(14)
            .fontFamily($r('app.string.Font_family_regular'))
            .textAlign(TextAlign.Start)
        }
        .height(80)
        .justifyContent(FlexAlign.Center)
        .alignItems(HorizontalAlign.Start)

        Blank()
        Image($r('app.media.app_icon'))
          .width(22)
          .height(30)
          .objectFit(ImageFit.Contain)
          .margin({ right: 5 })
      }
      .width('100%')
      .height(70)

      // 视频Title
      Column({ space: 5 }) {
        Text(this.videoDetailInfo?.videoDetailTitle)
          .fontColor($r('app.color.COLOR_FFFFFF'))
          .fontSize(18)
          .fontFamily($r('app.string.Font_family_regular'))
          .textAlign(TextAlign.Start)
          .textOverflow({ overflow: TextOverflow.Ellipsis })
        Text(this.videoDetailInfo?.videoDetailLabel)
          .fontColor($r('app.color.COLOR_EEC934'))
          .fontSize(18)
          .maxLines(3)
          .fontFamily($r('app.string.Font_family_regular'))
          .textAlign(TextAlign.Start)
          .textOverflow({ overflow: TextOverflow.Ellipsis })
      }
      .width('100%')
      .height(60)
      .justifyContent(FlexAlign.Center)
      .alignItems(HorizontalAlign.Start)

      // 视频
      Stack() {
        XComponent({
          id: 'xComponentId',
          type: 'surface',
          controller: this.xComponentController
        })
          .onLoad(() => {
            Logger.info(TAG, 'onLoad is called')
            this.xComponentController.setXComponentSurfaceSize({ surfaceWidth: 640, surfaceHeight: 480 })
            this.surfaceId = this.xComponentController.getXComponentSurfaceId()
            Logger.info(TAG, `onLoad surfaceId: ${this.surfaceId}`)
          })
          .height('100%')
          .width('100%')
          .borderRadius(14)
        Row() {
          Image(this.isPlay ? $r('app.media.app_icon') : $r('app.media.app_icon'))
            .width(24)
            .height(24)
            .objectFit(ImageFit.Contain)
        }
        .width(56)
        .height(56)
        .justifyContent(FlexAlign.Center)
        .onClick(e => {
          Logger.info(TAG, `onClick this.isPlay= ${JSON.stringify(this.isPlay)}`)
          // 播放的视频点击则暂停
          if (this.isPlay) {
            this.avPlayerModel.paused();
          } else {
            // 播放当前视频时发送事件暂停其他视频播放事件
            emitter.emit({ eventId: Constant.EVENT_PAUSED_VIDEO }, {
              data: {
                'videoDetailId': this.videoDetailInfo?.videoDetailId
              }
            });

            // 第一次点击播放先初始化音乐
            if (!this.isInit) {
              this.avPlayerModel.avPlayerFdSrcDemo(this.videoDetailInfo?.videoDetail, this.surfaceId);
              this.isInit = !this.isInit;
            } else {
              Logger.info(TAG, `onClick Play= ${JSON.stringify(this.isInit)}`)
              // 初始化过的直接播放
              this.avPlayerModel.play();
            }
          }
          this.isPlay = !this.isPlay;
        })
      }
      .width('100%')
      .height(300)
      .alignContent(Alignment.BottomEnd)

      // 视频点赞等信息
      Row() {
        this.Item($r('app.media.app_icon'), this.videoDetailInfo?.videoDetailLike)
        this.Item($r('app.media.app_icon'), this.videoDetailInfo?.videoDetailComment)
        this.Item($r('app.media.app_icon'), this.videoDetailInfo?.videoDetailCollect)
        this.Item($r('app.media.app_icon'), this.videoDetailInfo?.videoDetailTransmit)
      }
      .width('100%')
      .height(50)
      .padding({ left: 10, right: 10 })
      .justifyContent(FlexAlign.SpaceBetween)

      // 视频具体评论信息
      Row({ space: 8 }) {
        Image($r('app.media.app_icon'))
          .width(36)
          .height(36)
          .objectFit(ImageFit.Contain)
          .borderRadius(18)
        Column({ space: 5 }) {
          Text(this.videoDetailInfo?.commenterName)
            .height(18)
            .fontColor($r('app.color.COLOR_FFFFFF'))
            .fontSize(18)
            .fontFamily($r('app.string.Font_family_medium'))
            .textAlign(TextAlign.Start)
          Text(this.videoDetailInfo?.commenterContent)
            .height(18)
            .fontColor($r('app.color.COLOR_CCFFFFFF'))
            .fontSize(14)
            .fontFamily($r('app.string.Font_family_regular'))
            .textAlign(TextAlign.Start)
        }
        .height(60)
        .justifyContent(FlexAlign.Center)
        .alignItems(HorizontalAlign.Start)

        Blank()
        Column() {
          Image($r('app.media.app_icon'))
            .width(22)
            .height(30)
            .objectFit(ImageFit.Contain)
          Text(this.videoDetailInfo?.commenterLike)
            .height(18)
            .fontColor($r('app.color.COLOR_CCFFFFFF'))
            .fontSize(14)
            .fontFamily($r('app.string.Font_family_regular'))
            .textAlign(TextAlign.Start)
        }
        .width(48)
        .height(48)
        .justifyContent(FlexAlign.Center)
      }
      .width('100%')
      .height(70)
      .padding({ left: 10, right: 10 })
    }
    .width('100%')
    .height(550)
    .backgroundColor($r('app.color.COLOR_151724'))
  }

  @Builder
  Item(img: Resource, num: string) {
    Row({ space: 8 }) {
      Image($r('app.media.app_icon'))
        .width(24)
        .height(24)
        .objectFit(ImageFit.Contain)
      Text(num)
        .fontColor($r('app.color.COLOR_FFFFFF'))
        .fontSize(16)
        .fontFamily($r('app.string.Font_family_regular'))
        .textAlign(TextAlign.Center)
    }
    .width(64)
    .height(48)
    .justifyContent(FlexAlign.Center)
  }
}