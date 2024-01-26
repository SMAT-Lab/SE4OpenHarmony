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

import Title from '../component/TitleComponent';
import { SelectComponent } from '../component/SelectComponent';


const TAG: string = '[Setting]';

@Entry
@Component
struct Setting {
  @State dataList: Resource[][] = [[$r('app.string.notEnabled'), $r('app.string.support_90_rotate'), $r('app.string.support_180_rotate'), $r('app.string.support_270_rotate')],
    [$r('app.string.notEnabled'), $r('app.string.1920_1080'), $r('app.string.1280_720'), $r('app.string.800_600')]];
  @State title: Resource[] = [$r('app.string.angle_of_rotation'), $r('app.string.recording_resolution')];
  @State selectType: number = 0; // 打开弹窗时传入的类型 0：旋转角度  1：分辨率
  @StorageLink('selectType_0') rotationSelected: number = 0; // 子组件返回的确定选择的旋转角度索引
  @StorageLink('selectType_1') resolutionSelected: number = 0; // 子组件返回的确定选择的分辨率索引

  @State select: number = 0; // 与子组件当前选项同步的变量


  private selectDialog: CustomDialogController = new CustomDialogController({
    builder: SelectComponent({
      dataList: this.dataList[this.selectType],
      title: this.title[this.selectType],
      selectType: $selectType
    }),
    alignment: DialogAlignment.Bottom,
    offset: { dx: 0, dy: -20 }
  });

  build() {
    Column() {
      Title({ isIndex: false, titleText: $r('app.string.setting') })
      Row() {
        Text($r('app.string.angle_of_rotation'))
          .fontColor($r('app.color.COLOR_E6000000'))
          .fontFamily($r('app.string.font_family'))
          .fontSize(16)
          .margin({ left: 12 })
        Blank()
        Text(this.dataList[0][this.rotationSelected])
          .fontColor($r('app.color.COLOR_99000000'))
          .fontFamily($r('app.string.font_family_Regular'))
          .fontSize(14)
        Image($r('app.media.right'))
          .width(12)
          .height(24)
          .objectFit(ImageFit.Contain)
          .margin({ left: 4, right: 12 })
      }
      .id('rotation')
      .width('90%')
      .height(56)
      .margin({ top: 12 })
      .borderRadius(16)
      .backgroundColor(Color.White)
      .onClick(e => {
        // 指定打开角度旋转弹窗
        this.selectType = 0;
        this.selectDialog.open();
      })

      Row() {
        Text($r('app.string.size'))
          .fontColor($r('app.color.COLOR_E6000000'))
          .fontFamily($r('app.string.font_family'))
          .fontSize(16)
          .margin({ left: 12 })
        Blank()
        Text(this.dataList[1][this.resolutionSelected])
          .fontColor($r('app.color.COLOR_99000000'))
          .fontFamily($r('app.string.font_family_Regular'))
          .fontSize(14)
        Image($r('app.media.right'))
          .width(12)
          .height(24)
          .objectFit(ImageFit.Contain)
          .margin({ left: 4, right: 12 })
      }
      .id('resolution')
      .width('90%')
      .height(56)
      .margin({ top: 12 })
      .borderRadius(16)
      .backgroundColor(Color.White)
      .onClick(e => {
        // 指定打开分辨率弹窗
        this.selectType = 1;
        this.selectDialog.open();
      })
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.COLOR_F1F3F5'))
  }
}