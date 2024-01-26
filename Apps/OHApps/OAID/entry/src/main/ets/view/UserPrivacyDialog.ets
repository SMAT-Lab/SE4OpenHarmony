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
import Want from '@ohos.app.ability.Want';
import { BusinessError } from '@ohos.base';
import { CommonConstants } from '../common/CommonConstants';
import Logger from '../util/Logger';

@Extend(Text)
function descStyle() {
  .fontWeight(FontWeight.Normal)
  .width(CommonConstants.DESC_STYLE_WIDTH)
  .lineHeight($r('app.float.descStyle_line_height'))
  .margin({ top: $r('app.float.descStyle_margin_top') })
}

@CustomDialog
export default struct UserPrivacyDialog {
  controller: CustomDialogController = new CustomDialogController({ builder: '' });
  cancel: Function = () => {
  };
  confirm: Function = () => {
  };

  // The application information page is displayed.
  startSettingsAppInfoAbilityExplicit(): void {
    let context = getContext(this) as common.UIAbilityContext;
    let want: Want = {
      bundleName: 'com.huawei.hmos.settings',
      abilityName: 'com.huawei.hmos.settings.AppInfoAbility',
      action: 'action.settings.app.info',
      parameters: {
        settingsParamBundleName: 'com.example.OAID'
      }
    };
    context.startAbility(want)
      .catch((err: BusinessError) => {
        Logger.error(`Failed to startAbility. Code: ${err.code}, message: ${err.message}`);
      });
  }

  build() {
    Column() {
      Text($r('app.string.description_tips'))
        .descStyle()
        .fontSize($r('app.float.blackText_font_size'))
      Text($r('app.string.functional_requirement'))
        .descStyle()
        .fontSize($r('app.float.descStyle_font_size'))
        .opacity(CommonConstants.TEXT_OPACITY)
      Row() {
        Button($r('app.string.quit'))
          .backgroundColor(Color.White)
          .fontColor($r('app.color.button_color'))
          .onClick(() => {
            this.controller.close();
            this.cancel();
          })
        Divider()
          .vertical(true)
          .height($r('app.float.divider_height'))
          .opacity(CommonConstants.DIVIDER_OPACITY)
        Button($r('app.string.redirect'))
          .backgroundColor(Color.White)
          .fontColor($r('app.color.button_color'))
          .onClick(() => {
            this.startSettingsAppInfoAbilityExplicit();
            this.cancel();
          })
      }
      .width(CommonConstants.WINDOWS_BOTTOM_WIDTH)
      .margin({ top: $r('app.float.buttons_margin_bottom') })
      .justifyContent(FlexAlign.SpaceEvenly)
    }
    .padding($r('app.float.windows_padding'))
  }
}