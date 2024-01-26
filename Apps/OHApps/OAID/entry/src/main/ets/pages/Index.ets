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
import preferences from '@ohos.data.preferences';
import abilityAccessCtrl from '@ohos.abilityAccessCtrl';
import identifier from '@ohos.identifier.oaid';
import rpc from '@ohos.rpc';
import { BusinessError } from '@ohos.base';
import { CommonConstants } from '../common/CommonConstants';
import UserPrivacyDialog from '../view/UserPrivacyDialog';
import Logger from '../util/Logger';

const TAG: string = 'Index';

@Entry
@Component
struct Index {
  @State message: string = '';
  @State buttonStatus: boolean = true;
  contexts: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;
  dialogController: CustomDialogController = new CustomDialogController({
    builder: UserPrivacyDialog(
      {
        cancel: () => {
          this.exitApp();
        }
      }),
    cancel: () => {
      this.exitApp();
    },
    autoCancel: false,
    alignment: DialogAlignment.Bottom,
    offset: { dx: $r('app.float.offset_dx'), dy: $r('app.float.offset_dy') }
  });

  onConfirm() {
    let preference = preferences.getPreferences(this.contexts, 'OAID');
    preference.then((res) => {
      res.put('isPrivate', true).then(() => {
        res.flush();
        Logger.info('SplashPage', 'isPrivacy is put success');
      }).catch((err: Error) => {
        Logger.error('SplashPage', 'isPrivacy put failed. Cause:' + JSON.stringify(err));
      });
    })
  }

  exitApp() {
    this.contexts.terminateSelf();
  }

  requestPermissions() {
    // Trigger the dynamic authorization dialog box to request the user to authorize the ad tracking permission.
    const atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
    try {
      let context = getContext(this) as common.Context;
      atManager.requestPermissionsFromUser(context, ['ohos.permission.APP_TRACKING_CONSENT']).then((data) => {
        if (data.authResults[0] == 0) {
          Logger.info(TAG, 'request permission success');
          this.onConfirm();
        } else {
          Logger.error(TAG, `user rejected`);
          this.onConfirm();
          this.exitApp();
        }
      }).catch((err: BusinessError) => {
        Logger.error(TAG, `request permission failed, error message: ${err.message}`);
      })
    } catch (err) {
      Logger.error(TAG, `catch err->${JSON.stringify(err)}`);
    }
  }

  checkAccessToken() {
    // Determine the authorization status.
    let callerTokenId: number = rpc.IPCSkeleton.getCallingTokenId();
    let atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
    try {
      atManager.checkAccessToken(callerTokenId, 'ohos.permission.APP_TRACKING_CONSENT')
        .then((data: abilityAccessCtrl.GrantStatus) => {
          if (data == -1) { // Permission forbidden
            this.dialogController.open();
          }
          Logger.info(TAG, `checkAccessToken success, data->${JSON.stringify(data)}`);
        })
        .catch((err: BusinessError) => {
          Logger.error(TAG, `checkAccessToken fail, err->${JSON.stringify(err)}`);
        });
    } catch (err) {
      Logger.error(TAG, `checkAccessToken catch err->${JSON.stringify(err)}`);
    }
  }

  aboutToAppear() {
    let preference = preferences.getPreferences(this.contexts, 'OAID');
    preference.then((res) => {
      res.get('isPrivate', false).then((isPrivate) => {
        if (isPrivate === true) {
          this.checkAccessToken();
        } else {
          this.requestPermissions();
        }
      });
    });
  }

  build() {
    Column() {
      Navigation() {
        Column() {
          Text($r('app.string.OAID_text'))
            .fontSize($r('app.float.text_font_size'))
            .fontColor(Color.Gray)
            .padding({
              top: $r('app.float.text_padding_top'),
              left: $r('app.float.text_padding_left'),
              bottom: $r('app.float.text_padding_bottom')
            })
            .width(CommonConstants.TEXT_WIDTH)

          Row() {
            TextArea({ text: 'OAID: ' + this.message })
              .backgroundColor(Color.White)
              .fontFamily('HarmonyHeiTi')
              .fontWeight(FontWeight.Normal)
              .fontColor(Color.Black)
              .focusable(false)
              .fontSize($r('app.float.textArea_font_size'))
              .height($r('app.float.textArea_height'))
              .padding({
                top: $r('app.float.textArea_padding_top'),
                right: $r('app.float.textArea_padding_right'),
                left: $r('app.float.textArea_padding_left'),
                bottom: $r('app.float.textArea_padding_bottom')
              })
              .width(CommonConstants.TEXTAREA_WIDTH)
          }
          .margin({
            right: $r('app.float.textArea_margin_right'),
            left: $r('app.float.textArea_margin_left'),
            bottom: $r('app.float.textArea_margin_bottom')
          })

          Blank()

          Button($r('app.string.button_name'), { stateEffect: this.buttonStatus })
            .backgroundColor(this.buttonStatus ? $r('app.color.button_color') : $r('app.color.button_disabled_color'))
            .fontSize($r('app.float.button_font_size'))
            .fontColor(Color.White)
            .height($r('app.float.button_height'))
            .margin({ bottom: $r('app.float.button_margin_bottom') })
            .width(CommonConstants.BOTTOM_WIDTH)
            .onClick(() => {
              try {
                identifier.getOAID((err: BusinessError, data) => {
                  if (err.code) {
                    Logger.error(TAG, `get oaid failed, code: ${err.code}, message: ${err.message}`);
                  } else {
                    this.message = data;
                    this.buttonStatus = false;
                    Logger.info(TAG, `get oaid by callback success`);
                  }
                });
              } catch (err) {
                Logger.error(TAG, `get oaid catch error, code: ${err?.code}, message: ${err?.message}`);
              }
            })
        }
        .height(CommonConstants.COLUMN_HEIGHT)
      }
      .hideBackButton(true)
      .titleMode(NavigationTitleMode.Mini)
      .title($r('app.string.navigation_title'))
      .mode(NavigationMode.Stack)
      .backgroundColor($r('app.color.background_color'))
    }
  }
}