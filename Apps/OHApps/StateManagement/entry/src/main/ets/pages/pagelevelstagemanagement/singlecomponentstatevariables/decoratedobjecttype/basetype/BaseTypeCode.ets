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

import { ViewCodeText } from '../../../../../commoncomponents/ViewCodeText'

@Component
export struct BaseTypeCode {
  @State circleColor: Resource = $r('app.color.circle_pink');

  build() {
    Column({ space: 10 }) {
      // 点击查看源码
      ViewCodeText({webSrc: $rawfile('BaseTypeCode.ets.html')})

      Text($r('app.string.base_type_tip_text'))
        .fontColor($r('app.color.tips_font_color'))
        .fontSize($r('app.float.tips_font_size'))
        .width('100%')
        .textAlign(TextAlign.Center)
      Circle()
        .size({ width: $r('app.float.circle_size'), height: $r('app.float.circle_size') })
        .fill(this.circleColor)
      Button() {
        Text(this.circleColor.id === $r('app.color.circle_pink')
          .id ? $r('app.string.set_to_blue') : $r('app.string.set_to_pink'))
          .fontColor($r('app.color.button_text_color'))
          .fontSize($r('app.float.button_text_size'))
          .width('100%')
          .textAlign(TextAlign.Center)
      }
      .id('circleColorBtn')
      .height($r('app.float.button_height'))
      .type(ButtonType.Capsule)
      .backgroundColor($r('app.color.button_background_color'))
      .onClick(() => {
        if (this.circleColor.id === $r('app.color.circle_pink').id) {
          this.circleColor = $r('app.color.circle_blue');
        } else {
          this.circleColor = $r('app.color.circle_pink');
        }
      })
    }
    .padding(10)
    .border({ radius: $r('app.float.component_radius'), color: Color.Grey, width: $r('app.float.border_width') })
  }
}