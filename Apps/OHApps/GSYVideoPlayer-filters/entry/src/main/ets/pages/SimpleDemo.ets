/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import {
  BaseVideoPlayer,
  GlobalContext,
  LogUtils,
  OrientationUtil,
  StandardGSYVideoModel,
  StandardGSYVideoPlayer
} from '@ohos/gsyvideoplayer';
import router from '@ohos.router';
import Window from '@ohos.window';
import display from '@ohos.display';
import promptAction from '@ohos.promptAction';
import systemDateTime from '@ohos.systemDateTime';
let mDirection = 0;
let screenWidth = 0;

@Entry
@Component
struct SimpleDemo {
  @State cropHint: string = '视频裁剪中...'
  @State screenHeight: string = '30%';
  videoModel: StandardGSYVideoModel = new StandardGSYVideoModel();
  dialogController: CustomDialogController = new CustomDialogController({
    builder: CustomDialogExample({
      textValue: $cropHint
    }),
    autoCancel: false,
    alignment: DialogAlignment.Center,
    offset: { dx: 0, dy: 0 },
    customStyle: false
  })
  backClickListener: () => void = () => {
    if (screenWidth < 1000 && mDirection == 1) {
      this.changeOrientation();
    }
    router.back();
  }
  fullClickListener: () => void = () => {
    this.changeOrientation();
  }
  private videoUrl = "http://1251017968.vod2.myqcloud.com/3eb04eefvodtransgzp1251017968/8782b1285285890810009576163/v.f30.mp4"

  build() {
    Row() {
      Column() {
        StandardGSYVideoPlayer({
          videoModel: this.videoModel
        }).height(this.screenHeight)

        Button("点击截图").onClick(() => {
          let player = GlobalContext.getContext().getObject("currentPlayer") as BaseVideoPlayer;
          if (player) {
            this.testSetFramePerformance();
            let path = getContext(this).cacheDir + "/test.jpeg";
            player.saveFrame(path, {
              shotResult(code: number) {
                promptAction.showToast({
                  message: code == 0 ? "截图操作成功" : "截图操作失败"
                });
              }
            })
          }
        })

        Button("startGif").onClick(() => {
          let player = GlobalContext.getContext().getObject("currentPlayer") as BaseVideoPlayer;
          if (player) {
            let path = getContext(this).cacheDir + "/tempGif";
            let sStartGifTime = systemDateTime.getTime(true) / 1000;
            player.startGif(path);
            let eStartGifTime = systemDateTime.getTime(true) / 1000;
            let aStartGifTime = eStartGifTime - sStartGifTime;
            LogUtils.getInstance().LOGI('startGifTime:' + aStartGifTime + 'us');
            promptAction.showToast({
              message: "开始gif截图"
            });
          }
        })

        Button("stopGif").onClick(() => {
          let player = GlobalContext.getContext().getObject("currentPlayer") as BaseVideoPlayer;
          if (player) {
            this.dialogController.open();
            let path = getContext(this).cacheDir + "/gifTest.gif";
            let that = this;
            let sStopGifTime = systemDateTime.getTime(true) / 1000;
            player.stopGif(path, {
              gifResult(code: number) {
                that.dialogController.close();
                promptAction.showToast({
                  message: code == 0 ? "gif截图成功" : "gif截图失败"
                });
              }
            })
            let eStopGifTime = systemDateTime.getTime(true) / 1000;
            let aStopGifTime = eStopGifTime - sStopGifTime;
            LogUtils.getInstance().LOGI('stopGifTime:' + aStopGifTime + 'us');
          }
        })

      }.width('100%')
    }
  }

  async aboutToAppear() {
    this.testModelPerformance();
    this.videoModel.setUrl(this.videoUrl, false);
    this.videoModel.setTitle("这是测试视频的标题");
    this.videoModel.setBackClickListener(this.backClickListener);
    this.videoModel.setFullClickListener(this.fullClickListener);
    this.videoModel.setCoverImage($r('app.media.app_icon'));
    mDirection = this.getDirection();
    screenWidth = px2vp(display.getDefaultDisplaySync().width);
  }
  
  private testSetFramePerformance() {
    let player = GlobalContext.getContext().getObject("currentPlayer") as BaseVideoPlayer;
    if (player) {
      let path = getContext(this).cacheDir + "/test.jpeg";
      let sFrameTime = systemDateTime.getTime(true) / 1000;
      for (let i = 0; i < 10; i++) {
        player.saveFrame(path, {
          shotResult(code: number) {
          }
        })
      }
      let eFrameTime = systemDateTime.getTime(true) / 1000;
      let aFrameTime = (eFrameTime - sFrameTime) / 10;
      LogUtils.getInstance().LOGI('setFrameTime:' + aFrameTime + 'us');
      
    }
  }

  private testModelPerformance() {
    let sTime = systemDateTime.getTime(true) / 1000;
    for (let i = 0; i < 2000; i++) {
      this.videoModel.setUrl(this.videoUrl, false);
    }
    let endTime = systemDateTime.getTime(true) / 1000;
    let aTime = (endTime - sTime) / 2000;
    LogUtils.getInstance().LOGI('setUrlTime:' + aTime + 'us');

    sTime = systemDateTime.getTime(true) / 1000;
    for (let i = 0; i < 2000; i++) {
      this.videoModel.setTitle("这是测试视频的标题");
    }
    endTime = systemDateTime.getTime(true) / 1000;
    aTime = (endTime - sTime) / 2000;
    LogUtils.getInstance().LOGI('setTitleTime:' + aTime + 'us');

    sTime = systemDateTime.getTime(true) / 1000;
    for (let i = 0; i < 2000; i++) {
      this.videoModel.setBackClickListener(this.backClickListener);
    }
    endTime = systemDateTime.getTime(true) / 1000;
    aTime = (endTime - sTime) / 2000;
    LogUtils.getInstance().LOGI('setBackClickListenerTime:' + aTime + 'us');

    sTime = systemDateTime.getTime(true) / 1000;
    for (let i = 0; i < 2000; i++) {
      this.videoModel.setFullClickListener(this.fullClickListener);
    }
    endTime = systemDateTime.getTime(true) / 1000;
    aTime = (endTime - sTime) / 2000;
    LogUtils.getInstance().LOGI('setFullClickListenerTime:' + aTime + 'us');

    sTime = systemDateTime.getTime(true) / 1000;
    for (let i = 0; i < 2000; i++) {
      this.videoModel.setCoverImage($r('app.media.app_icon'));
    }
    endTime = systemDateTime.getTime(true) / 1000;
    aTime = (endTime - sTime) / 2000;
    LogUtils.getInstance().LOGI('setCoverImageTime:' + aTime + 'us');
  }

  aboutToDisappear() {
    let player = GlobalContext.getContext().getObject("currentPlayer") as BaseVideoPlayer;
    if (player) {
      let sTime = systemDateTime.getTime(true) / 1000;
      player.stop();
      let endTime = systemDateTime.getTime(true) / 1000;
      let aTime = endTime - sTime;
      LogUtils.getInstance().LOGI('stopTime:' + aTime + 'us');
    }
  }

  onPageShow() {
    let player = GlobalContext.getContext().getObject("currentPlayer") as BaseVideoPlayer;
    if (player) {
      let sTime = systemDateTime.getTime(true) / 1000;
      player.resumePlay();
      let endTime = systemDateTime.getTime(true) / 1000;
      let aTime = endTime - sTime;
      LogUtils.getInstance().LOGI('resumePlayTime:' + aTime + 'us');
    }
  }

  onPageHide() {
    let player = GlobalContext.getContext().getObject("currentPlayer") as BaseVideoPlayer;
    if (player) {
      let sTime = systemDateTime.getTime(true) / 1000;
      player.pause();
      let endTime = systemDateTime.getTime(true) / 1000;
      let aTime = endTime - sTime;
      LogUtils.getInstance().LOGI('pauseTime:' + aTime + 'us');
    }
  }

  onBackPress() {
    if (screenWidth < 1000 && mDirection == 1) {
      this.changeOrientation();
    }
    let player = GlobalContext.getContext().getObject("currentPlayer") as BaseVideoPlayer;
    if (player) {
      player.stop();
    }
  }

  private getDirection(): number {
    return getContext().getApplicationContext().resourceManager.getConfigurationSync().direction;
  }

  private changeOrientation() {
    if (screenWidth > 1000) {
      if (mDirection == 0) {
        this.screenHeight = '100%';
        mDirection = 1;
      } else {
        this.screenHeight = '30%';
        mDirection = 0;
      }
    } else {
      if (mDirection == 0) {
        OrientationUtil.changeOrientation(getContext(), Window.Orientation.LANDSCAPE_INVERTED);
        this.screenHeight = '100%';
        mDirection = 1;
      } else {
        OrientationUtil.changeOrientation(getContext(), Window.Orientation.PORTRAIT);
        this.screenHeight = '30%';
        mDirection = 0;
      }
    }
  }
}

@CustomDialog
struct CustomDialogExample {
  controller: CustomDialogController
  @Link textValue: string

  build() {
    Stack() {
      Column() {
        LoadingProgress()
          .color(Color.Blue)
          .width(100)
      }
    }.width(200)
    .height(200)

    // dialog默认的borderRadius为24vp，如果需要使用border属性，请和borderRadius属性一起使用。
  }
}