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

import common from '@ohos.app.ability.common';
import ColorType from '../model/ColorType';
import { COLOR_SELECT_DATA } from '../data/ColorData';
import { getResourceString } from '../../../../utils/ResourceUtils';
import { ViewCodeText } from '../../../../commoncomponents/ViewCodeText';

const CONTEXT: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;

@Component
export struct LinkDescendentComponent {
  @State selectColors: ColorType[] = COLOR_SELECT_DATA;
  // 和父组件和爷组件双向同步圆形颜色
  @Link circleColor: Resource;
  // 和父组件和爷组件双向同步Select的Index值
  @Link currentSelectIndex: number;

  build() {
    Column() {
      // 点击查看源码
      ViewCodeText({ webSrc: $rawfile('LinkDescendentComponent.ets.html') })
      Row() {
        Select(this.selectColors)
          .selected(this.currentSelectIndex)
          .value(getResourceString(CONTEXT, this.selectColors[this.currentSelectIndex].value))
          .fontColor($r('app.color.button_text_color'))
          .font({ size: $r('app.float.tips_font_size') })
          .selectedOptionFont({ size: $r('app.float.tips_font_size') })
          .optionFont({ size: $r('app.float.tips_font_size') })
          .id('grandsonCompA')
          .onSelect((index: number) => {
            // 孙组件@Link组件数据页面更新，爷组件同步更新
            this.currentSelectIndex = index;
            this.circleColor = this.selectColors[index].color;
          })
        Circle()
          .size({ width: $r('app.float.circle_size'), height: $r('app.float.circle_size') })
          .fill(this.circleColor)
      }.justifyContent(FlexAlign.SpaceAround)
      .width('100%')
      .margin({ bottom: 6 })

      Text($r('app.string.deepnest_descendent_titleone'))
        .fontColor($r('app.color.tips_font_color'))
        .fontSize($r('app.float.button_text_size'))
        .width('100%')
        .textAlign(TextAlign.Center)
    }
    .padding(10)
    .border({ radius: $r('app.float.component_radius'), color: Color.Red, width: $r('app.float.border_width') })
  }
}