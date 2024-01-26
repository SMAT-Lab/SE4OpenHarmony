
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
 
 import CommonConstants from '../common/constants/CommonConstants'

@Component
export struct AddTitle {
  @Link clickAble: boolean;
  back: (event) => void;
  save: (event) => void;

  build() {
    Row() {
      Row() {
        Image($r('app.media.icon_back'))
          .width(24)
          .height(24)
      }.padding({ left: 2, right: 17, top: 10, bottom: 10 })
      .onClick((e) => {
        this.back(e)
      })

      Text($r('app.string.add_notebook'))
        .fontSize(CommonConstants.FONT_SIZE_29)
      Blank()
      Button($r('app.string.save'))
        .fontSize(CommonConstants.FONT_SIZE_22)
        .backgroundColor(this.clickAble ? $r('app.color.theme') : $r('app.color.button_disable'))
        .height(44)
        .borderRadius(7)
        .padding({
          left: 14,
          right: 14,
        })
        .margin({ bottom: 4 })
        .enabled(this.clickAble)
        .onClick((e) => {
          this.save(e)
        })
        .type(ButtonType.Normal)
    }
    .width(CommonConstants.FULL_WIDTH)
    .height(54)
    .margin({
      top: 19
    })
  }
}