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
  OrientationUtil,
  StandardGSYVideoModel,
  StandardGSYVideoPlayer
} from '@ohos/gsyvideoplayer';
import router from '@ohos.router';
import Window from '@ohos.window';
import display from '@ohos.display';
import { DanmakuVideoPlayer } from './DanmakuVideoPlayer';

let mDirection = 0;
let screenWidth = 0;

@Entry
@Component
struct DanmakuVideoDemo {
  @State screenHeight: string = '30%';
  videoModel: StandardGSYVideoModel = new StandardGSYVideoModel();
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
        DanmakuVideoPlayer({
          videoModel: this.videoModel
        }).height(this.screenHeight)

      }.width('100%')
    }
  }

  async aboutToAppear() {
    this.videoModel.setUrl(this.videoUrl, false);
    this.videoModel.setTitle("这是测试视频的标题");
    this.videoModel.setBackClickListener(this.backClickListener);
    this.videoModel.setFullClickListener(this.fullClickListener);
    this.videoModel.setCoverImage($r('app.media.app_icon'));
    mDirection = this.getDirection();
    screenWidth = px2vp(display.getDefaultDisplaySync().width);
  }

  aboutToDisappear() {
    let player = GlobalContext.getContext().getObject("currentPlayer") as BaseVideoPlayer;
    if (player) {
      player.stop();
    }
  }

  onPageShow() {
    let player = GlobalContext.getContext().getObject("currentPlayer") as BaseVideoPlayer;
    if (player) {
      player.resumePlay();
    }
  }

  onPageHide() {
    let player = GlobalContext.getContext().getObject("currentPlayer") as BaseVideoPlayer;
    if (player) {
      player.pause();
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
