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
import { ViewCodeText } from '../../../commoncomponents/ViewCodeText';
import { startSpecifiedAbility } from '../../../utils/StartAbilityUtils';

// 声明一个上下文信息
const CONTEXT: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;

@Component
export default struct ApplyGlobalDataSyncCode {
  // 和Ability1、Ability2页面双向同步内容字体大小
  @StorageLink('contentFontSize') contentFontSize: number = 18;
  // 和Ability1、Ability2页面双向同步夜间模式状态
  @StorageLink('currentModelStatus') currentModelStatus: boolean = true;
  // 初始化字体大小最小值
  private minFontSize: number = 10;

  build() {
    Column({ space: 10 }) {
      // 查看源码
      ViewCodeText({ webSrc: $rawfile('ApplyGlobalDataSyncCode.ets.html') })
      Row() {
        Text($r('app.string.nightmode'))
          .fontSize(this.contentFontSize)
          .fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.tips_font_color'))
        // 开发控制夜间模式
        Toggle({ type: ToggleType.Switch, isOn: this.currentModelStatus })
          .id('applyGlobalDataSyncCode')
          .selectedColor(Color.Blue)
          .switchPointColor(Color.White)
          .onChange((isOn: boolean) => {
            // 更新控制夜间模式状态的变量数据，@StorageLink和@StorageLink关联的数据变量刷新
            this.currentModelStatus = isOn;
            AppStorage.setOrCreate<boolean>('currentModelStatus', this.currentModelStatus);
          })
      }.justifyContent(FlexAlign.SpaceAround)
      .width('70%')
      .border({ radius: 50, color: Color.Grey, width: $r('app.float.border_width') })

      Text($r('app.string.nightmode_text'))
        .fontSize(this.contentFontSize)
        .fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.tips_font_color'))
        .textAlign(TextAlign.Center)
      // slider滑动模块控制字体大小
      Column() {
        Text($r('app.string.fontSize_text'))
          .fontSize(this.contentFontSize)
          .fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.tips_font_color'))
          .width('100%')
          .textAlign(TextAlign.Center)
        Row() {
          Text(`${this.minFontSize}`)
            .fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.tips_font_color'))
            .fontSize($r('app.float.tips_font_size'))
          Slider({
            value: this.contentFontSize,
            min: this.minFontSize, // 字体大小最小值
            max: 30, // 字体大小最大值
            style: SliderStyle.OutSet
          })
            .showTips(true)
            .onChange((value: number, mode: SliderChangeMode) => {
              // 更新控制字体大小状态的变量数据，@StorageLink和@StorageProp关联的数据变量刷新
              this.contentFontSize = value;
              AppStorage.setOrCreate<number>('contentFontSize', this.contentFontSize);
            })
          // toFixed(0)将滑动条返回值处理为整数精度
          Text(this.contentFontSize.toFixed(0))
            .fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.tips_font_color'))
            .fontSize($r('app.float.tips_font_size'))
        }
        .width('80%')
      }.margin({ top: 50 })

      Text($r('app.string.fontSize_singlesync_textone'))
        .fontSize(this.contentFontSize)
        .fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.tips_font_color'))
        .width('100%')
        .textAlign(TextAlign.Center)
      Button() {
        Text($r('app.string.enter_abilityone'))
          .fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.button_text_color'))
          .fontSize(this.contentFontSize)
          .width('60%')
          .textAlign(TextAlign.Center)
      }
      .id('enterAbilityOne')
      .type(ButtonType.Capsule)
      .backgroundColor($r('app.color.button_background_color'))
      .padding($r('app.float.page_padding'))
      .onClick(() => {
        startSpecifiedAbility(CONTEXT, 'StoragePropAbility');
      })

      Button() {
        Text($r('app.string.enter_abilitytwo'))
          .fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.button_text_color'))
          .fontSize(this.contentFontSize)
          .width('60%')
          .textAlign(TextAlign.Center)
      }
      .id('enterAbilityTwo')
      .type(ButtonType.Capsule)
      .backgroundColor($r('app.color.button_background_color'))
      .padding($r('app.float.page_padding'))
      .onClick(() => {
        startSpecifiedAbility(CONTEXT, 'StorageLinkAbility');
      })
    }.padding($r('app.float.page_padding'))
  }
}