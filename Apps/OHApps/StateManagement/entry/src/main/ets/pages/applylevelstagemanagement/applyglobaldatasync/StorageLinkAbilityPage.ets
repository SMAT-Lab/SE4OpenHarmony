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


import { CodeView } from '../../../commoncomponents/CodeView';
import { ViewCodeText } from '../../../commoncomponents//ViewCodeText';
import { TitleBarDark } from '../../../commoncomponents/TitleBarDark';
import { TitleBar } from '../../../commoncomponents/TitleBar';

@Entry
@Component
struct StorageLinkAbilityPage {
  @State title: Resource = $r('app.string.abilitytwo_page');
  // 判断是否关联ability的变量
  @State isAbility: boolean = true;
  // 和主页、Ability1页面双向同步夜间模式状态
  @StorageLink('currentModelStatus') currentModelStatus: boolean = true;
  // 和主页、Ability1页面双向同步内容字体大小
  @StorageLink('contentFontSize') contentFontSize: number = 18;

  build() {
    Column() {
      if (this.currentModelStatus) {
        TitleBarDark({ title: $title, isAbility: true })
      } else {
        TitleBar({ title: $title, isAbility: true })
      }
      CodeView({ title: $title, isShowTitle: false }) {
        Column({ space: 30 }) {
          // 查看源码
          ViewCodeText({ webSrc: $rawfile('StorageLinkAbilityPage.ets.html') })
          Text($r('app.string.both_data_binding'))
            .fontSize(this.contentFontSize)
            .fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.tips_font_color'))
            .width('100%')
            .textAlign(TextAlign.Center)
          Text($r('app.string.single_data_binding'))
            .fontSize(this.contentFontSize)
            .fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.tips_font_color'))
            .width('100%')
            .textAlign(TextAlign.Center)
          Button() {
            Text(this.currentModelStatus ? $r('app.string.close_nightmode') : $r('app.string.start_nightmode'))
              .fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.button_text_color'))
              .fontSize(this.contentFontSize)
              .width('60%')
              .textAlign(TextAlign.Center)
          }
          .id('storageLinkAbilityPage')
          .type(ButtonType.Capsule)
          .backgroundColor($r('app.color.button_background_color'))
          .padding($r('app.float.page_padding'))
          .onClick(() => {
            // 更新控制夜间模式状态的变量数据，@StorageLink和@StorageProp关联的数据变量刷新
            this.currentModelStatus = !this.currentModelStatus;
          })

          Text($r('app.string.nigntmode_both_binding'))
            .fontSize(this.contentFontSize)
            .fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.tips_font_color'))
            .width('100%')
            .textAlign(TextAlign.Center)
        }
        .padding($r('app.float.page_padding'))
      }
    }.width('100%')
    .height('100%')
    .backgroundColor(this.currentModelStatus ? $r('app.color.nightnode_color') : $r('app.color.background_shallow_grey'))
  }

  aboutToDisappear(): void {
    AppStorage.setOrCreate('sideBarShow', false);
  }
}