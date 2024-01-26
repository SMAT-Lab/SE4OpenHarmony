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

import { timeConvert } from '../utils/TimeUtils';
import avPlayManage from '../videomanager/AvPlayManager';
import { SpeedDialog } from '../components/SpeedDialog';

@Component
export struct VideoOperate {
  @State videoList: Resource[] = [$r('app.string.video_res_1'), $r('app.string.video_res_2'), $r('app.string.video_res_3')];
  @State speedSelect: number = 0; // 倍速选择
  @Link currentTime: number;
  @Link durationTime: number;
  @Link isSwiping: boolean;
  @Link avPlayManage: avPlayManage;
  @Link flag: boolean;
  @Link XComponentFlag: boolean;
  @StorageLink('speedIndex') speedIndex: number = 0; // 倍速索引
  @StorageLink('sliderWidth') sliderWidth: string = '';
  @StorageLink('speedName') speedName: Resource = $r('app.string.video_speed_1_0X');
  private dialogController: CustomDialogController = new CustomDialogController({
    builder: SpeedDialog({ speedSelect: $speedSelect }),
    alignment: DialogAlignment.Bottom,
    offset: { dx: $r('app.float.size_zero'), dy: $r('app.float.size_down_20') }
  });

  build() {
    Row() {
      Row() {
        Image(this.flag ? $r("app.media.ic_video_play") : $r("app.media.ic_video_pause")) // 暂停/播放
          .id('play')
          .width($r('app.float.size_40'))
          .height($r('app.float.size_40'))
          .onClick(() => {
            if (this.flag) {
              this.avPlayManage.videoPause();
              this.flag = false;
            } else {
              this.avPlayManage.videoPlay();
              this.flag = true;
            }
          })

        // 左侧时间
        Text(timeConvert(this.currentTime))
          .fontColor(Color.White)
          .textAlign(TextAlign.End)
          .fontWeight(FontWeight.Regular)
          .margin({ left: $r('app.float.size_10') })
      }

      Row() {
        Slider({
          value: this.currentTime,
          min: 0,
          max: this.durationTime,
          style: SliderStyle.OutSet
        })
          .id('Slider')
          .blockColor(Color.White)
          .trackColor(Color.Gray)
          .selectedColor($r("app.color.slider_selected"))
          .showTips(false)
          .onChange((value: number, mode: SliderChangeMode) => {
            if (mode == SliderChangeMode.Begin) {
              this.isSwiping = true;
              this.avPlayManage.videoPause();
            }
            this.avPlayManage.videoSeek(value);
            this.currentTime = value;
            if (mode == SliderChangeMode.End) {
              this.isSwiping = false;
              this.flag = true;
              this.avPlayManage.videoPlay();
            }
          })
      }
      .layoutWeight(1)

      Row() {
        // 右侧时间
        Text(timeConvert(this.durationTime))
          .fontColor(Color.White)
          .fontWeight(FontWeight.Regular)

        Button(this.speedName, { type: ButtonType.Normal })
          .border({ width: $r('app.float.size_1'), color: Color.White })
          .width($r('app.float.size_75'))
          .height($r('app.float.size_40'))
          .fontSize($r('app.float.size_15'))
          .borderRadius($r('app.float.size_24') )
          .fontColor(Color.White)
          .backgroundColor(Color.Black)
          .opacity($r('app.float.size_1') )
          .margin({ left: $r('app.float.size_10')  })
          .id('Speed')
          .onClick(() => {
            this.speedSelect = this.speedIndex;
            this.dialogController.open();
          })
      }
    }
    .justifyContent(FlexAlign.Center)
    .padding({ left: $r('app.float.size_25'), right: $r('app.float.size_30') })
    .width('100%')
  }
}