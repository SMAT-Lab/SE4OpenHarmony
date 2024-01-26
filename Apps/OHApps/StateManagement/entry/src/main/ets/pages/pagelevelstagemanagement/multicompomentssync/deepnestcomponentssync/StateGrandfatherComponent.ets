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
import { LinkDescendentComponent } from './LinkDescendentComponent';
import ColorType from '../model/ColorType';
import { COLOR_SELECT_DATA } from '../data/ColorData';
import { getResourceString } from '../../../../utils/ResourceUtils';
import { ViewCodeText } from '../../../../commoncomponents/ViewCodeText';

// 声明一个上下文变量
const CONTEXT: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;

@Component
export struct StateGrandfatherComponent {
  // 初始化爷组件@State的圆形颜色
  @State circleColor: Resource = $r('app.color.circle_blue');
  // 初始化一个颜色数组
  @State selectColors: ColorType[] = COLOR_SELECT_DATA;
  // 初始化当前select组件的index
  @State currentSelectIndex: number = 0;

  build() {
    Column({ space: 10 }) {
      // 点击查看源码
      ViewCodeText({ webSrc: $rawfile('StateGrandfatherComponent.ets.html') })
      Text($r('app.string.deepnest_parent_titleone'))
        .fontSize($r('app.float.tips_font_size'))
        .fontColor($r('app.color.tips_font_color'))
        .width('100%')
        .textAlign(TextAlign.Center)
      Row() {
        Select(this.selectColors)
          .selected(this.currentSelectIndex)
          .value(getResourceString(CONTEXT, this.selectColors[this.currentSelectIndex].value))
          .fontColor($r('app.color.button_text_color'))
          .font({ size: $r('app.float.tips_font_size') })
          .selectedOptionFont({ size: $r('app.float.tips_font_size') })
          .optionFont({ size: $r('app.float.tips_font_size') })
          .id('grandfatherCompA')
          .onSelect((index: number) => {
            // 爷组件@State声明的数据页面更新，孙组件@Link关联的变量同步更新
            this.currentSelectIndex = index;
            this.circleColor = this.selectColors[index].color;
          })
        Circle()
          .size({ width: $r('app.float.circle_size'), height: $r('app.float.circle_size') })
          .fill(this.circleColor)
      }.justifyContent(FlexAlign.SpaceAround)
      .width('100%')
      // 双向同步子组件
      LinkChildComp({ circleColor: $circleColor, currentSelectIndex: $currentSelectIndex })
    }.padding(10)
    .border({ radius: $r('app.float.component_radius'), color: Color.Grey, width: $r('app.float.border_width') })
  }
}

@Component
struct LinkChildComp {
  // 和父组件和子组件双向同步圆形颜色
  @Link circleColor: Resource;
  // 和父组件和子组件双向同步Select的Index值
  @Link currentSelectIndex: number;

  build() {
    Column() {
      Text($r('app.string.deepnest_child_titleone'))
        .fontColor($r('app.color.tips_font_color'))
        .fontSize($r('app.float.button_text_size'))
        .width('100%')
        .textAlign(TextAlign.Center)
        .height($r('app.float.button_height'))
      // 双向同步孙组件
      LinkDescendentComponent({
        circleColor: $circleColor,
        currentSelectIndex: $currentSelectIndex
      })
    }
    .padding(10)
    .border({ radius: $r('app.float.component_radius'), color: Color.Blue, width: $r('app.float.border_width') })
  }
}