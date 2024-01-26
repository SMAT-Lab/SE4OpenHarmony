/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import router from '@ohos.router';
import promptAction from '@ohos.promptAction';
import LoginController from '../../controller/LoginController';
import LoginResult from '../../data/LoginResult';
import Logger from '../../utils/Logger';
import { getStringData } from '../../utils/ResourceDataHandle';
import { BusinessError } from '@ohos.base';

const TAG: string = '[Login]';

@Entry
@Component
struct Login {
  private loginController: LoginController = new LoginController();
  @State phoneNumber: string = getStringData($r('app.string.login_phone_input')); // 13111111111
  @State password: string = getStringData($r('app.string.login_pass_input')); // 123456
  @State isLoginSuccess: boolean = false;
  @State isPass: boolean = false;

  build() {
    Column() {
      Row() {
        Image($r('app.media.icon'))
          .width(24)
          .height(24)
        Blank()
        Text($r('app.string.login_help'))
          .fontSize(16)
      }
      .padding({ left: 24, right: 24 })
      .width('100%')
      .height('8%')

      Row() {
        Text($r('app.string.login_welcome'))
          .fontSize(32)
          .padding({ top: 30 })
      }
      .width('75%')
      .height('16%')

      Row() {
        Column() {
          Row() {
            Text($r('app.string.login_86'))
              .fontColor($r('app.color.login_86'))
              .fontSize(18)
            Image($r('app.media.icon'))
              .width(18)
              .height(18)
              .objectFit(ImageFit.Contain)
              .margin({ left: 8 })
            TextInput({ placeholder: $r('app.string.login_phone') })
              .enableKeyboardOnFocus(false)
              .width('75%')
              .margin({ left: 16 })
              .padding({ left: 0 })
              .maxLength(11)
              .placeholderFont({ size: 24 })
              .fontSize(24)
              .placeholderColor($r('app.color.login_input'))
              .type(InputType.PhoneNumber)
              .borderRadius(0)
              .backgroundColor(Color.White)
              .onChange((value: string) => {
                this.phoneNumber = value;
                if (this.password !== '' && this.phoneNumber !== '') {
                  this.isPass = true;
                }else {
                  this.isPass = false;
                }
              })
            Blank()
            Image($r('app.media.icon'))
              .width(24)
              .height(24)
              .objectFit(ImageFit.Contain)
              .margin({ right: 10 })
          }
          .layoutWeight(1)
          .width('100%')

          Row() {
            Divider()
              .strokeWidth(1)
              .color($r('app.color.login_divider'))
          }
          .width('100%')
        }
      }
      .width('75%')
      .height('9%')

      Row() {
        Column() {
          Row() {
            TextInput({ placeholder: $r('app.string.login_pass') })
              .focusable(true)
              .padding({ left: 0 })
              .maxLength(11)
              .placeholderFont({ size: 24 })
              .placeholderColor($r('app.color.login_input'))
              .type(InputType.Password)
              .borderRadius(0)
              .style(TextInputStyle.Inline)
              .backgroundColor(Color.White)
              .onChange((value: string) => {
                this.password = value;
                if (this.password !== '' && this.phoneNumber !== '') {
                  this.isPass = true;
                }else {
                  this.isPass = false;
                }
              })
          }
          .layoutWeight(1)
          .width('100%')

          Row() {
            Divider()
              .strokeWidth(1)
              .color($r('app.color.login_divider'))
          }
          .width('100%')
        }
      }
      .width('75%')
      .height('9%')

      Row() {
        Radio({ value: 'Radio1', group: 'radioGroup' })
          .checked(true)
        Text($r('app.string.login_agree'))
          .fontSize(16)
          .margin({ left: 12 })
      }
      .margin({ top: 50 })
      .width('75%')
      .height('5%')

      Row() {
        Button($r('app.string.login_login'), { type: ButtonType.Normal })
          .borderRadius(8)
          .fontSize(18)
          .fontWeight(6)
          .fontColor(this.isPass ? $r('app.color.login_button_font_color_yes') : $r('app.color.login_button_font_color_no')) // #47370E
          .backgroundColor(this.isPass ? $r('app.color.login_button_bg_yes') : $r('app.color.login_button_bg_no')) // #FECF05
          .width('100%')
          .height('100%')
          .onClick(() => {
            Logger.info(TAG,`phone=${this.phoneNumber},password=${this.password}`);
            this.loginController.login(this.phoneNumber, this.password).then(res => {
              Logger.info(TAG, `login then: ${JSON.stringify(res)}`);
              // 提示服务端返回的登录信息
              promptAction.showToast({ message: res.message, duration: 1000, bottom: 500 });
              setTimeout(() => {
                if (res.code === 200) {
                  let data: LoginResult = res.data;
                  Logger.info(TAG, `login success: ${JSON.stringify(data.token)}`);
                  // 存储用户信息, 包括token
                  AppStorage.setOrCreate('userInfo', data)
                  // 跳转页面
                  router.pushUrl({ url: 'pages/Index' });
                  return;
                }
                Logger.info(TAG, `login failed: ${JSON.stringify(res)}`);
              }, 800);
            }).catch((err: BusinessError) => {
              Logger.info(TAG, `login err: ${JSON.stringify(err)}`);
              promptAction.showToast({ message: $r('app.string.Connection_timesout'), duration: 1000, bottom: 500 });
            })
          })
          .id('login')
      }
      .margin({ top: 18 })
      .width('75%')
      .height('8%')

      Row() {
        Text($r('app.string.login_captcha'))
          .fontSize(16)
        Blank()
        Text($r('app.string.login_question'))
          .fontSize(16)
      }
      .margin({ top: 24 })
      .width('75%')
      .height('8%')
    }
    .width('100%')
    .height('100%')
  }
}