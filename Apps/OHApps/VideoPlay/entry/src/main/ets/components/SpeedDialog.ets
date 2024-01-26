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

const ZERO = 0; // 倍速列表索引
const ONE = 1; // 倍速列表索引
const TWO = 2; // 倍速列表索引
const THREE = 3; // 倍速列表索引

@CustomDialog
export struct SpeedDialog {
  @State speedList: Resource[] = [$r('app.string.video_speed_1_0X'), $r('app.string.video_speed_1_25X'), $r('app.string.video_speed_1_75X'), $r('app.string.video_speed_2_0X')];
  @Link speedSelect: number; // 当前选择项的索引
  @StorageLink('avPlayManage') avPlayManage: avPlayManage = new avPlayManage();
  private controller: CustomDialogController;

  build() {
    Column() {
      Text($r('app.string.dialog_play_speed'))
        .fontSize($r('app.float.size_20'))
        .width("90%")
        .fontColor(Color.Black)
        .textAlign(TextAlign.Start)
        .margin({ top: $r('app.float.size_20'), bottom: $r('app.float.size_12') })

      List() {
        ForEach(this.speedList, (item: Resource, index) => {
          ListItem() {
            Column() {
              Row() {
                Text(item)
                  .fontSize($r('app.float.size_16'))
                  .fontColor(Color.Black)
                  .fontWeight(FontWeight.Medium)
                  .textAlign(TextAlign.Center)
                Blank()
                Image(this.speedSelect == index ? $r('app.media.ic_radio_selected') : $r('app.media.ic_radio'))
                  .width($r('app.float.size_24'))
                  .height($r('app.float.size_24'))
                  .objectFit(ImageFit.Contain)
              }
              .width('100%')

              if (index != this.speedList.length - ONE) {
                Divider()
                  .vertical(false)
                  .strokeWidth(1)
                  .margin({ top: $r('app.float.size_10') })
                  .color($r('app.color.speed_dialog'))
                  .width('100%')
              }
            }
            .width("90%")
          }
          .width("100%")
          .height($r('app.float.size_48'))
          .onClick(() => {
            this.speedSelect = index;
            AppStorage.setOrCreate('speedName', this.speedList[this.speedSelect]);
            AppStorage.setOrCreate('speedIndex', this.speedSelect);
            this.controller.close();
            switch (this.speedSelect) {
              case ZERO:
                this.avPlayManage.videoSpeedOne();
                break;
              case ONE:
                this.avPlayManage.videoSpeedOnePointTwentyFive();
                break;
              case TWO:
                this.avPlayManage.videoSpeedOnePointSeventyFive();
                break;
              case THREE:
                this.avPlayManage.videoSpeedTwo();
                break;
            }
          })
        })
      }
      .width("100%")
      .margin({
        top: $r('app.float.size_12')
      })

      Row() {
        Text($r('app.string.dialog_cancel'))
          .fontSize($r('app.float.size_16'))
          .fontColor('#0A59F7')
          .fontWeight(FontWeight.Medium)
          .layoutWeight(1)
          .textAlign(TextAlign.Center)
          .onClick(() => {
            this.controller.close()
          })
      }
      .alignItems(VerticalAlign.Center)
      .height($r('app.float.size_50'))
      .padding({ bottom: $r('app.float.size_5') })
      .width("100%")
    }
    .alignItems(HorizontalAlign.Center)
    .width("90%")
    .borderRadius($r('app.float.size_24'))
    .backgroundColor(Color.White)
  }
}