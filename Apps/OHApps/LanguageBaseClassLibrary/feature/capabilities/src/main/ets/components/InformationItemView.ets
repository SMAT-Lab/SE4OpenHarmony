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

import { Information } from '../model/Information';
import { DeleteView } from './DeleteView';
import { getString } from '@ohos/common';

@Component
export struct InformationItemView {
  @ObjectLink information: Information;
  private deleteAction: (event?: ClickEvent) => void = () => {};
  private index: number = 0;

  build() {
    Row() {
      Row() {
        Column() {
          Text(this.information.name)
            .fontColor($r('app.color.text_color_primary'))
            .fontSize(16)
          Text(this.information.phone)
            .fontColor($r('app.color.text_color_second'))
            .fontSize(14)
            .margin({ top: 5 })
        }

        Blank()
        Text(`${this.information.age}${getString($r('app.string.old'))}`)
          .fontColor($r('app.color.text_color_second'))
          .fontSize(12)
      }
      .height(72)
      .layoutWeight(1)
      .padding({ left: 16, right: 15 })
      .margin({ right: 12 })
      .backgroundColor($r('app.color.bg_white'))
      .borderRadius(16)

      DeleteView({ enable: this.information.clickAble })
        .id(`delete${this.index}`)
        .enabled(this.information.clickAble)
        .onClick(this.deleteAction)
    }
    .padding({ left: 12 })
    .width('100%')
    .margin({ top: 12, right: 12 })
  }
}