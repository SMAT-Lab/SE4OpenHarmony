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

@Component
export default struct Title {
  private titleText: string | Resource = $r('app.string.EntryAbility_label');
  private hasBack: boolean = false;
  private isIndex: boolean = true;

  aboutToAppear() {
    this.hasBack = Number(router.getLength()) > 0;
  }

  build() {
    Row() {
      Row({ space: 16 }) {
        if (this.hasBack) {
          Image(this.isIndex ? $r('app.media.ic_back') : $r('app.media.ic_back_black'))
            .id('back')
            .width(24)
            .height('100%')
            .objectFit(ImageFit.Contain)
            .onClick(() => {
              router.back();
              AppStorage.Set('isRefresh', true);
            })
        }
        Text(this.titleText)
          .layoutWeight(1)
          .fontColor(this.isIndex ? $r('app.color.COLOR_FFFFFF') : $r('app.color.COLOR_E6000000'))
          .fontSize(20)
          .fontFamily($r('app.string.font_family'))
      }
      .width('40%')
      .height('100%')
      .margin({ left: 26, right: 18 })

      Blank()


    }
    .height('8%')
    .width('100%')
    .alignItems(VerticalAlign.Center)
    .constraintSize({ minHeight: 70 })
    .backgroundColor(this.isIndex ? $r('app.color.COLOR_000000') : $r('app.color.COLOR_F1F3F5'))
  }
}