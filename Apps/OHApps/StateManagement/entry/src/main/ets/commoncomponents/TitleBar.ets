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

import router from '@ohos.router';
import common from '@ohos.app.ability.common';
import { startSpecifiedAbility } from '../utils/StartAbilityUtils';

//声明一个上下文信息
const CONTEXT: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;

@Component
export struct TitleBar {
  @Link title: Resource;
  private isAbility: boolean = false;

  build() {
    Column() {
      Row() {
        Button() {
          Image($r('app.media.ic_back'))
            .size({ width: $r('app.float.icon_back_size'), height: $r('app.float.icon_back_size') })
        }
        .backgroundColor($r('app.color.background_shallow_grey'))
        .id('titleBar')
        .onClick(() => {
          this.isAbility ? startSpecifiedAbility(CONTEXT, 'EntryAbility') : router.back();
        })

        Text(this.title)
          .fontSize($r('app.float.title_font_size'))
          .margin({ left: $r('app.float.title_margin') })
      }
      .width('100%')
      .padding($r('app.float.page_padding'))

      Divider()
        .width('100%')
        .height($r('app.float.divider_height'))
        .color($r('app.color.divider_color'))
        .margin({ bottom: 12 })
    }
    .width('100%')
  }
}