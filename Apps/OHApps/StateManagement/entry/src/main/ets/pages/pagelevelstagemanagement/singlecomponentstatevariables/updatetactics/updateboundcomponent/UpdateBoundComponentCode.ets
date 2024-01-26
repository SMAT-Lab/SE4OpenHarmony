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

import { ViewCodeText } from '../../../../../commoncomponents/ViewCodeText';

@Component
export struct UpdateBoundComponentCode {
  // 组件内状态变量
  @State titleName: string = 'title';
  // 组件内private变量
  private content: string = 'content';
  // 组件内变量更新的次数
  private updateCount: number = 0;

  build() {
    Column({ space: 10 }) {
      // 点击查看源码
      ViewCodeText({webSrc: $rawfile('UpdateBoundComponentCode.ets.html')})

      Column() {
        Text($r('app.string.only_update_state'))
          .fontColor($r('app.color.tips_font_color'))
          .fontSize($r('app.float.tips_font_size'))
          .width('100%')
        Row() {
          Text($r('app.string.only_update_title'))
            .fontColor($r('app.color.button_text_color'))
            .fontSize($r('app.float.button_text_size'))
          Text(`${this.titleName}`) // titleName为状态变量，绑定Text组件
            .fontColor($r('app.color.button_text_color'))
            .fontSize(20)
        }
        .width('100%')
        .margin(10)

        Text($r('app.string.only_update_private'))
          .fontColor($r('app.color.tips_font_color'))
          .fontSize($r('app.float.tips_font_size'))
          .width('100%')
          .margin({ top: 20 })
        Row() {
          Text($r('app.string.only_update_content'))
            .fontColor($r('app.color.button_text_color'))
            .fontSize($r('app.float.button_text_size'))
          Text(`${this.content}`) // content为private，绑定Text组件
            .fontColor($r('app.color.button_text_color'))
            .fontSize(20)
        }
        .width('100%')
        .margin(10)
      }
      .width('100%')
      .padding(10)
      .justifyContent(FlexAlign.SpaceAround)
      .backgroundColor($r('app.color.component_background_pink'))

      Column() {
        Button($r('app.string.update_title_content'))
          .onClick(() => {
            // 点击更新@State和Private声明的变量，更新策略为：@State和Private的数据发生变化，@State变量绑定的组件更新，Private变量绑定的组件不更新。
            this.updateCount++;
            this.content = `content ${this.updateCount}`;
            this.titleName = `title ${this.updateCount}`;
          })
          .id('titleAndContentBtn')
          .width('100%')
          .height($r('app.float.button_height'))
          .fontColor($r('app.color.button_text_color'))
          .fontSize($r('app.float.button_text_size'))
          .type(ButtonType.Capsule)
          .backgroundColor($r('app.color.button_background_color'))
        Text($r('app.string.only_update_state_components'))
          .fontColor($r('app.color.tips_font_color'))
          .fontSize($r('app.float.button_text_size'))
          .margin({ top: 30 })
      }.width('100%')
    }
    .padding(10)
    .border({ radius: $r('app.float.component_radius'), color: Color.Grey, width: $r('app.float.border_width') })
  }
}