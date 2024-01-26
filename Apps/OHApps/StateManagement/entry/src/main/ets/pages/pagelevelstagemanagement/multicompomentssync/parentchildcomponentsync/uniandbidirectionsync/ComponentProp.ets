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

import { COLOR_DATA } from './UniAndBidirectionSyncCode';
import { ViewCodeText } from '../../../../../commoncomponents/ViewCodeText';

@Component
export struct ChildCompProp {
  // 圆形颜色，和父组件中的状态变量单向同步，只支持基础类型
  @Prop circleColor: string;

  build() {
    Column({ space: 10 }) {
      // 点击查看源码
      ViewCodeText({ webSrc: $rawfile('ComponentProp.ets.html') })
      Text($r('app.string.child_component'))
        .fontSize($r('app.float.tips_font_size'))
        .width('100%')
        .textAlign(TextAlign.Start)
        .margin(10)
      Text($r('app.string.single_direction_sync_tips'))
        .fontColor($r('app.color.tips_font_color'))
        .fontSize($r('app.float.tips_font_size'))
        .width('100%')
        .textAlign(TextAlign.Center)
      // 绑定@Link变量的Circle组件
      Circle()
        .size({ width: $r('app.float.circle_size'), height: $r('app.float.circle_size') })
        .fill(this.circleColor)
      Button() {
        Text($r('app.string.single_direction_sync_btn'))
          .fontColor($r('app.color.button_text_color'))
          .fontSize($r('app.float.button_text_size'))
          .width('100%')
          .textAlign(TextAlign.Center)
      }
      .id('blueColorBtn')
      .height($r('app.float.button_height'))
      .type(ButtonType.Capsule)
      .backgroundColor($r('app.color.button_background_color'))
      .onClick(() => {
        // 点击更新子组件@Prop声明的变量，此子组件更新，父组件以及@Link声明的子组件变量不同步
        this.circleColor = COLOR_DATA.Blue;
      })
    }
    .padding(10)
    .border({ radius: $r('app.float.component_radius'), color: Color.Blue, width: $r('app.float.border_width') })
  }
}