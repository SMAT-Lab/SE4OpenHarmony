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

import router from '@ohos.router';
import Logger from '../utils/Logger';
import AVPlayerModel from '../model/AVPlayerModel';
import Constant from '../utils/Constant';
import emitter from '@ohos.events.emitter';

const TAG: string = '[VideoComponent]';

@Component
export default struct VideoComponent {
  private xComponentController: XComponentController = new XComponentController();
  private avPlayerModel: AVPlayerModel = new AVPlayerModel(getContext(this));
  @State surfaceId: string = '-1';
  @State selectTopIndex: number = 4; // 顶部选择索引
  @State isLike: boolean = false; // 是否喜欢
  @State isCollect: boolean = false; // 是否收藏
  @State isPlay: boolean = true; // 是否播放

  aboutToAppear() {
    // 监听暂停事件，当有其他音乐播放时当前播放
    emitter.on({ eventId: Constant.EVENT_PAUSED_INDEX }, data => {
      Logger.info(TAG, `emitter on data = ${JSON.stringify(data)}`)
      Logger.info(TAG, `emitter on data this.isPlay= ${JSON.stringify(this.isPlay)}`)
      if (this.isPlay) {
        this.avPlayerModel.paused();
        this.isPlay = false;
      }
    });
  }

  build() {
    Column() {
      Stack() {
        XComponent({
          id: 'xComponentId',
          type: 'surface',
          controller: this.xComponentController
        })
          .onLoad(() => {
            Logger.info(TAG, 'onLoad is called')
            // 设置XComponent创建的曲面宽为640vp，高为480vp
            this.xComponentController.setXComponentSurfaceSize({ surfaceWidth: 640, surfaceHeight: 480 })
            this.surfaceId = this.xComponentController.getXComponentSurfaceId()
            Logger.info(TAG, `onLoad surfaceId: ${this.surfaceId}`)
            this.avPlayerModel.avPlayerFdSrcDemo(Constant.TEST_NAME_DEMO_VIDEO, this.surfaceId)
          })
          .height('100%')
          .width('100%')

        Column() {
          Row({space:28}) {
            Image($r('app.media.app_icon'))
              .width(30)
              .height(30)
              .objectFit(ImageFit.Contain)
            Text($r('app.string.Stroll'))
              .height('100%')
              .fontColor(this.selectTopIndex === 0 ? $r('app.color.COLOR_FFFFFF') : $r('app.color.COLOR_CCFFFFFF'))
              .fontSize(22)
              .fontFamily($r('app.string.Font_family_medium'))
              .onClick(e => {
                this.selectTopIndex = 0;
              })
            Text($r('app.string.Experience'))
              .height('100%')
              .fontColor(this.selectTopIndex === 1 ? $r('app.color.COLOR_FFFFFF') : $r('app.color.COLOR_CCFFFFFF'))
              .fontSize(22)
              .fontFamily($r('app.string.Font_family_medium'))
              .onClick(e => {
                this.selectTopIndex = 1;
              })
            Text($r('app.string.Attention'))
              .height('100%')
              .fontColor(this.selectTopIndex === 2 ? $r('app.color.COLOR_FFFFFF') : $r('app.color.COLOR_CCFFFFFF'))
              .fontSize(22)
              .fontFamily($r('app.string.Font_family_medium'))
              .onClick(e => {
                this.selectTopIndex = 2;
              })
            Text($r('app.string.Store'))
              .height('100%')
              .fontColor(this.selectTopIndex === 3 ? $r('app.color.COLOR_FFFFFF') : $r('app.color.COLOR_CCFFFFFF'))
              .fontSize(22)
              .fontFamily($r('app.string.Font_family_medium'))
              .onClick(e => {
                this.selectTopIndex = 3;
              })
            Text($r('app.string.Recommend'))
              .height('100%')
              .fontColor(this.selectTopIndex === 4 ? $r('app.color.COLOR_FFFFFF') : $r('app.color.COLOR_CCFFFFFF'))
              .fontSize(22)
              .fontFamily($r('app.string.Font_family_medium'))
              .onClick(e => {
                this.selectTopIndex = 4;
              })
            Row(){
              Image($r('app.media.app_icon'))
                .id('search')
                .width(30)
                .height(30)
                .objectFit(ImageFit.Contain)
            }
            .width(40)
            .height(50)
            .justifyContent(FlexAlign.Center)
            .onClick(e => {
              Logger.info(TAG, `search_white onClick`);
              emitter.emit({ eventId: Constant.EVENT_PAUSED_INDEX });
              router.pushUrl({url: 'appsampled/pages/SearchPage'})
            })
          }
          .width('100%')
          .height('8%')
          .justifyContent(FlexAlign.Center)

          Blank()

          Row() {
            Column() {
              Text($r('app.string.UserNick'))
                .height(30)
                .fontColor($r('app.color.COLOR_FFFFFF'))
                .fontSize(22)
                .fontFamily($r('app.string.Font_family_medium'))
                .margin({ left: 15, bottom: 10  })
              Text($r('app.string.TikContent'))
                .fontColor($r('app.color.COLOR_E6FFFFFF'))
                .fontSize(20)
                .fontFamily($r('app.string.Font_family_regular'))
                .margin({ left: 15, bottom: 20 })
            }
            .width('85%')
            .height('100%')
            .alignItems(HorizontalAlign.Start)
            .justifyContent(FlexAlign.End)

            Column({space: 10}) {
              Stack(){
                Image($r('app.media.app_icon'))
                  .width(60)
                  .height(60)
                  .objectFit(ImageFit.Contain)
                  .borderRadius(30)
                  .border({color: $r('app.color.COLOR_FFFFFF'), width: 2})
                Image($r('app.media.app_icon'))
                  .width(20)
                  .height(20)
                  .objectFit(ImageFit.Contain)
                  .borderRadius(10)
                  .offset({y: 10})
              }
              .width(60)
              .height(60)
              .margin({bottom: 10})
              .alignContent(Alignment.Bottom)

              Column(){
                Image(this.isLike ? $r('app.media.app_icon') : $r('app.media.app_icon'))
                  .width(35)
                  .height(35)
                  .objectFit(ImageFit.Contain)
                  .onClick(e=>{
                    this.isLike = !this.isLike;
                    Logger.info(TAG, `isLike= ${this.isLike}`);
                  })
                Text($r('app.string.Num',"273.1"))
                  .width(60)
                  .height(20)
                  .fontColor($r('app.color.COLOR_E6FFFFFF'))
                  .fontSize(14)
                  .fontFamily($r('app.string.Font_family_regular'))
                  .textAlign(TextAlign.Center)
              }
              .width(60)
              .height(60)
              .alignItems(HorizontalAlign.Center)

              this.Item($r('app.media.app_icon'),$r('app.string.Num','36.3'),()=> {
                Logger.info(TAG, 'ic_message');
              })

              Column(){
                Image(this.isCollect ? $r('app.media.app_icon') : $r('app.media.app_icon'))
                  .width(35)
                  .height(35)
                  .objectFit(ImageFit.Contain)
                  .onClick(e=>{
                    this.isCollect = !this.isCollect;
                    Logger.info(TAG, `isCollect= ${this.isCollect}`);
                  })
                Text($r('app.string.Num','18.9'))
                  .width(60)
                  .height(20)
                  .fontColor($r('app.color.COLOR_E6FFFFFF'))
                  .fontSize(14)
                  .fontFamily($r('app.string.Font_family_regular'))
                  .textAlign(TextAlign.Center)
              }
              .width(60)
              .height(60)
              .alignItems(HorizontalAlign.Center)

              this.Item($r('app.media.app_icon'),$r('app.string.Num','40.2'),()=> {
                Logger.info(TAG, 'ic_transmit');
              })
              Column(){
                Image($r('app.media.app_icon'))
                  .width(20)
                  .height(20)
                  .objectFit(ImageFit.Contain)
              }
              .width(50)
              .height(50)
              .justifyContent(FlexAlign.Center)
              .borderRadius(25)
              .margin({bottom: 20})
              .backgroundColor($r('app.color.COLOR_FFFFFF'))
            }
            .width('15%')
            .height('100%')
          }
          .width('100%')
          .height('60%')
        }
        .width('100%')
        .height('100%')

        Column(){
          if (!this.isPlay){
            Image($r('app.media.app_icon'))
              .width(640)
              .height(64)
              .objectFit(ImageFit.Contain)
              .opacity(0.6)
          }
        }
        .id('video_action')
        .width('60%')
        .height('70%')
        .justifyContent(FlexAlign.Center)
        .onClick(e=>{
          if (this.isPlay) {
            this.avPlayerModel.paused();
          } else {
            this.avPlayerModel.play();
          }
          this.isPlay = !this.isPlay;
        })
      }
      .width('100%')
      .height('100%')
      .alignContent(Alignment.Center)
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.COLOR_000000'))
  }

  @Builder
  Item(img: Resource, num: Resource, callback: Function) {
    Column() {
      Image(img)
        .width(35)
        .height(35)
        .objectFit(ImageFit.Contain)
        .onClick(e => {
          callback();
        })
      Text(num)
        .width(60)
        .height(20)
        .fontColor($r('app.color.COLOR_E6FFFFFF'))
        .fontSize(14)
        .fontFamily($r('app.string.Font_family_regular'))
        .textAlign(TextAlign.Center)
    }
    .width(60)
    .height(60)
    .alignItems(HorizontalAlign.Center)
  }

}