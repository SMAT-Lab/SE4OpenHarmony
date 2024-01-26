/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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

import avPlayManage from '../videomanager/AvPlayManager';
import media from '@ohos.multimedia.media';
import display from '@ohos.display';
import emitter from '@ohos.events.emitter';
import { VideoOperate } from '../components/VideoOperate';
import { ExitVideo } from '../components/ExitVideo';
import { timeConvert } from '../utils/TimeUtils';
import { VideoPanel } from '../components/VideoPanel';
import { GlobalContext } from '../utils/GlobalContext';

const PROPORTION = 0.99; // 占屏幕比例
const SURFACEW = 0.9; // 表面宽比例
const SURFACEH = 1.78; // 表面高比例
const TIMEOUT = 0; // 定时器编号
const SET_TIME_OUT = 8000; // 间隔8s
const SET_INTERVAL = 100; // interval间隔时间

class innerInfo{
  eventId: number = 0
  priority: emitter.EventPriority = 0
}

let innerEventFalse: innerInfo = {
  eventId: 1,
  priority: emitter.EventPriority.HIGH
};

let innerEventTrue: innerInfo = {
  eventId: 2,
  priority: emitter.EventPriority.HIGH
};

let innerEventWH: innerInfo = {
  eventId: 3,
  priority: emitter.EventPriority.HIGH
};

@Entry
@Component
struct Index {
  private surfaceId: string = ''; 
  private timeout: number = 0; // 定时器编号
  private xComponentController: XComponentController = new XComponentController();
  @State avPlayManage: avPlayManage = new avPlayManage();
  @State isSwiping: boolean = false; // 用户滑动过程中
  @State isClickScreen: boolean = false; // 是否点击
  @State flag: boolean = true; // 暂停播放
  @State XComponentFlag: boolean = false;
  @State speedSelect: number = 0; // 倍速选择
  @State videoListSelect: number = 0; // 视频列表选择
  @State durationTime: number = 0; // 视频总时长
  @State currentTime: number = 0; // 视频当前时间
  @State surfaceW: number = 0;
  @State surfaceH: number = 0;
  @State show: boolean = false; // videoPanel组件是否弹出
  @State videoSelect: number = 0; // 视频列表选择
  @State percent: number = 0;
  @State windowWidth: number = 300;
  @State windowHeight: number = 300;
  @StorageLink('videoName') videoName: Resource = $r('app.string.video_res_1');
  @StorageLink('videoIndex') videoIndex: number = 0; // 视频索引
  setTimer(): void {
    let that = this;
    this.timeout = setTimeout(() => {
      that.isClickScreen = false; // 隐藏操作面板
    }, SET_TIME_OUT); // 8秒后隐藏
  }

  clearTimer(): void {
    if (this.timeout !== TIMEOUT) {
      clearTimeout(this.timeout);
      this.timeout = TIMEOUT;
    }
  }

  aboutToAppear() {
    this.windowWidth = display.getDefaultDisplaySync().width;
    this.windowHeight = display.getDefaultDisplaySync().height;
    this.surfaceW = (GlobalContext.getContext().getObject('windowWidth') as number) * SURFACEW;
    this.surfaceH = this.surfaceW / SURFACEH;
    this.flag = true;
    AppStorage.setOrCreate('avPlayManage', this.avPlayManage);
  }

  aboutToDisappear() {
    this.avPlayManage.videoRelease();
    emitter.off(innerEventFalse.eventId);
  }

  onPageHide() {
    this.avPlayManage.videoPause();
    this.flag = false;
  }

  onPageShow() {
    emitter.on(innerEventTrue, (res) => {
      if (res.data) {
        this.flag = res.data.flag;
        this.XComponentFlag = res.data.flag;
      }
    });
    emitter.on(innerEventFalse, (res) => {
      if (res.data) {
        this.flag = res.data.flag;
      }
    });
    emitter.on(innerEventWH, (res) => {
      if (res.data) {
        this.windowWidth = res.data.width;
        this.windowHeight = res.data.height;
        this.setVideoWH();
      }
    });

    if (this.flag == false) {
      this.clearTimer();
    }
  }

  setVideoWH(): void {
    if (this.percent >= 1) { // 横向视频
      this.surfaceW = Math.round(this.windowWidth * PROPORTION);
      this.surfaceH = Math.round(this.surfaceW / this.percent);
    } else { // 纵向视频
      this.surfaceH = Math.round(this.windowHeight * PROPORTION);
      this.surfaceW = Math.round(this.surfaceH * this.percent);
    }
  }

  @Builder
  CoverXComponent() {
    XComponent({ // 装载视频容器
      id: 'xComponent',
      type: 'surface',
      controller: this.xComponentController
    })
      .visibility(this.XComponentFlag ? Visibility.Visible : Visibility.Hidden)
      .onLoad(() => {
        this.surfaceId = this.xComponentController.getXComponentSurfaceId();
        this.avPlayManage.initPlayer(this.surfaceId, (avPlayer: media.AVPlayer) => {
          this.percent = avPlayer.width / avPlayer.height;
          this.setVideoWH();
          this.durationTime = this.avPlayManage.getDurationTime();
          setInterval(() => { // 更新当前时间
            if (!this.isSwiping) {
              this.currentTime = this.avPlayManage.getCurrentTime();
            }
          }, SET_INTERVAL);
        })
      })
      .height(`${this.surfaceH}px`)
      .width(`${this.surfaceW}px`)
  }

  build() {
    Stack() {
      Column() {
        this.CoverXComponent()
      }
      .align(Alignment.TopStart)
      .margin({ top: $r('app.float.size_80') })
      .id('Video')
      .justifyContent(FlexAlign.Center)

      Text()
        .height(`${this.surfaceH}px`)
        .width(`${this.surfaceW}px`)
        .margin({ top: $r('app.float.size_80') })
        .backgroundColor(Color.Black)
        .opacity($r('app.float.size_zero_five'))
        .visibility(this.isSwiping ? Visibility.Visible : Visibility.Hidden)

      VideoPanel({ show: $show, videoSelect: $videoSelect })
        .zIndex(3)

      Row() {
        Text(timeConvert(this.currentTime))
          .fontSize($r('app.float.size_24'))
          .opacity($r('app.float.size_1'))
          .fontColor($r("app.color.slider_selected"))
        Text("/" + timeConvert(this.durationTime))
          .fontSize($r('app.float.size_24'))
          .opacity($r('app.float.size_1'))
          .fontColor(Color.White)
      }
      .margin({ top: $r('app.float.size_80') })
      .visibility(this.isSwiping ? Visibility.Visible : Visibility.Hidden)

      Column() {
        Row() {
          // 返回
          ExitVideo()
        }
        .width('100%')
        .justifyContent(FlexAlign.Start)

        Blank()

        Column() {
          // 进度条
          VideoOperate({
            flag: $flag,
            avPlayManage: $avPlayManage,
            currentTime: $currentTime,
            durationTime: $durationTime,
            isSwiping: $isSwiping,
            XComponentFlag: $XComponentFlag
          })
            .width('100%')

          Row() {
            Image($r('app.media.ic_video_view_list'))
              .width($r('app.float.size_32'))
              .height($r('app.float.size_32'))
              .margin({ left: $r('app.float.size_30') })
            Text(this.videoName)
              .fontSize($r('app.float.size_20'))
              .fontColor(Color.White)
              .fontWeight(FontWeight.Regular)
              .margin({ left: $r('app.float.size_10') })
            Blank()
            Column() {
              Image($r('app.media.ic_video_list_up'))
                .width($r('app.float.size_30'))
                .height($r('app.float.size_20'))
            }
            .margin({ right: $r('app.float.size_25') })
          }
          .id('Choose')
          .margin({ top: $r('app.float.size_10') })
          .width('100%')
          .height($r('app.float.size_50'))
          .backgroundColor($r('app.color.video_play'))
          .borderRadius({ topLeft: $r('app.float.size_45'), topRight: $r('app.float.size_45') })
          .alignItems(VerticalAlign.Center)
          .onClick(() => {
            this.show = !this.show;
            this.videoSelect = this.videoIndex;
          })
        }
        .justifyContent(FlexAlign.Center)
      }
      .onTouch((event) => {
        if (event.type == TouchType.Down) {
          this.isClickScreen = true;
          this.clearTimer();
        } else if (event.type == TouchType.Up) {
          this.setTimer();
        } else if (event.type == TouchType.Move) {
          this.isClickScreen = true;
          this.clearTimer();
        }
      })
      .visibility(this.isClickScreen ? Visibility.Visible : Visibility.Hidden)
      .width('100%')
      .height('100%')
    }
    .onClick(() => {
      this.isClickScreen = !this.isClickScreen;
      if (this.isClickScreen) {
        this.setTimer();
      } else {
        this.clearTimer();
      }
    })
    .backgroundColor(Color.Black)
    .height('100%')
    .width('100%')
  }
}