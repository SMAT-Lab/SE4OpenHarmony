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
import { ConsumeDescendentComponent } from './ConsumeDescendentComponent';
import { ViewCodeText } from '../../../../commoncomponents/ViewCodeText';
import { getResourceString } from '../../../../utils/ResourceUtils';

const CONTEXT: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;

@Component
export struct ProvideGrandfatherComponent {
  @State selectColors: ColorType[] = COLOR_SELECT_DATA;
  // 初始化爷组件@Provide的原型颜色
  @Provide consumeCircleColor: Resource = $r('app.color.circle_blue');
  // 初始化Select组件的Index
  @Provide currentSelectIndex: number = 0;

  build() {
    Column() {
      // 点击查看源码
      ViewCodeText({ webSrc:  $rawfile('ProvideGrandfatherComponent.ets.html') })
      Text($r('app.string.deepnest_parent_titletwo'))
        .fontSize($r('app.float.tips_font_size'))
        .fontColor($r('app.color.tips_font_color'))
        .width('100%')
        .textAlign(TextAlign.Center)
        .margin({ top: 10 })
      Row() {
        Select(this.selectColors)
          .selected(this.currentSelectIndex)
          .value(getResourceString(CONTEXT, this.selectColors[this.currentSelectIndex].value))
          .fontColor($r('app.color.button_text_color'))
          .font({ size: $r('app.float.tips_font_size') })
          .selectedOptionFont({ size: $r('app.float.tips_font_size') })
          .optionFont({ size: $r('app.float.tips_font_size') })
          .id('grandfatherCompB')
          .onSelect((index: number) => {
            // 爷组件@Provide声明的数据页面更新，孙组件@Consume关联的变量同步更新
            this.currentSelectIndex = index;
            this.consumeCircleColor = this.selectColors[index].color;
          })
        Circle()
          .size({ width: $r('app.float.circle_size'), height: $r('app.float.circle_size') })
          .fill(this.consumeCircleColor)
      }.justifyContent(FlexAlign.SpaceAround)
      .width('100%')
      .margin({ bottom: 6 })
      // 子组件
      ConsumeChildComp()
    }.padding(10)
    .border({ radius: $r('app.float.component_radius'), color: Color.Grey, width: $r('app.float.border_width') })
  }
}

@Component
struct ConsumeChildComp {

  build() {
    Column() {
      Text($r('app.string.deepnest_child_titletwo'))
        .fontColor($r('app.color.tips_font_color'))
        .fontSize($r('app.float.button_text_size'))
        .width('100%')
        .textAlign(TextAlign.Center)
        .height($r('app.float.button_height'))
      // 双向同步孙组件
      ConsumeDescendentComponent()
    }
    .padding(10)
    .border({ radius: $r('app.float.component_radius'), color: Color.Blue, width: $r('app.float.border_width') })
  }
}