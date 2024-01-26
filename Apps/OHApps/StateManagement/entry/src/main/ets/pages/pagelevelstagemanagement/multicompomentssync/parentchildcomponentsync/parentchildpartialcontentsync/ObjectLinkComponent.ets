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

import { ClassObject } from './ParentChildPartialContentSyncCode';
import { ViewCodeText } from '../../../../../commoncomponents/ViewCodeText';

@Component
export struct ObjectLinkComponent {
  // 使用@ObjectLink修饰，与父组件中元素同步
  @ObjectLink childObjectData: ClassObject;

  build() {
    Column({ space: 10 }) {
      // 点击查看源码
      ViewCodeText({ webSrc: $rawfile('ObjectLinkComponent.ets.html') })

      Text($r('app.string.partial_sync_text'))
        .fontColor($r('app.color.tips_font_color'))
        .fontSize($r('app.float.tips_font_size'))
        .width('100%')
        .textAlign(TextAlign.Start)
      Row() {
        Text(this.childObjectData.elementType)
          .fontColor($r('app.color.tips_font_color'))
          .fontSize($r('app.float.tips_font_size'))
          .textAlign(TextAlign.Center)
          .layoutWeight(1)
        TextInput({ text: this.childObjectData.attributeType })
          .fontSize(20)
          .layoutWeight(1)
          .id('childAttribute')
          .onChange((value: string) => {
            // 子组件对象属性更新，父元素同步
            this.childObjectData.attributeType = value;
          })
      }
      .justifyContent(FlexAlign.SpaceAround)
    }
    .border({ radius: $r('app.float.component_radius'), color: Color.Blue, width: $r('app.float.border_width') })
    .padding(10)
  }
}