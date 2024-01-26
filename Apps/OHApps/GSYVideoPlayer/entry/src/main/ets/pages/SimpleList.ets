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
  StandardForListGSYVideoPlayer,
  StandardGSYVideoModel
} from '@ohos/gsyvideoplayer';

@Entry
@Component
struct SimpleList {
  @State screenHeight: string = '30%';
  private videoModels: Array<StandardGSYVideoModel> = [];
  private items: Array<string> = ['http://1251017968.vod2.myqcloud.com/3eb04eefvodtransgzp1251017968/8782b1285285890810009576163/v.f30.mp4', 'http://video.chinanews.com/flv/2019/04/23/400/111773_web.mp4',
    'http://1251017968.vod2.myqcloud.com/3eb04eefvodtransgzp1251017968/8782b1285285890810009576163/v.f30.mp4', 'http://video.chinanews.com/flv/2019/04/23/400/111773_web.mp4',
    'http://1251017968.vod2.myqcloud.com/3eb04eefvodtransgzp1251017968/8782b1285285890810009576163/v.f30.mp4', 'http://video.chinanews.com/flv/2019/04/23/400/111773_web.mp4',
    'http://1251017968.vod2.myqcloud.com/3eb04eefvodtransgzp1251017968/8782b1285285890810009576163/v.f30.mp4', 'http://video.chinanews.com/flv/2019/04/23/400/111773_web.mp4']

  build() {
    List({ space: 3 }) {
      ForEach(this.videoModels, (item: StandardGSYVideoModel) => {
        ListItem() {
          Row() {
            StandardForListGSYVideoPlayer({
              videoModel: item
            }).height(this.screenHeight)
          }.margin({ left: 10, right: 10 })
        }
      })
    }
  }

  async aboutToAppear() {
    for (let i = 0; i < this.items.length; i++) {
      let model = new StandardGSYVideoModel();
      model.setUrl(this.items[i], false);
      model.setTitle("这是测试视频的标题");
      model.setCoverImage($r('app.media.app_icon'));
      this.videoModels[i] = model;
    }
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
}
