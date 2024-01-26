/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
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
import promptAction from '@ohos.promptAction';
import router from '@ohos.router';
import Logger from '../../utils/Logger';
import LoginController from '../../controller/LoginController';
import LoginResult from '../data/LoginResult';
import User from '../data/User';
import { BusinessError } from '@ohos.base';

const TAG: string = '[Login]';

@Entry
@Component
struct Login {
  private loginController: LoginController = new LoginController();
  @State phoneNumber: string = '13111111111';
  @State password: string = '123456';
  @State isLoginSuccess: boolean = false;

  pageTransition() {
    // 登录页面从底部滑入滑出
    PageTransitionEnter({ type: RouteType.Push, duration: 300 })
      .slide(SlideEffect.Bottom)
    PageTransitionExit({ type: RouteType.Pop, duration: 300 })
      .slide(SlideEffect.Bottom)
  }

  build() {
    Column() {
      Row() {
        Text($r('app.string.LoginByPhone'))
          .height('100%')
          .fontColor($r('app.color.COLOR_E6000000'))
          .fontSize(24)
          .fontFamily($r('app.string.Font_family_medium'))
      }
      .width('80%')
      .height('8%')
      .margin({ bottom: 10 })
      .justifyContent(FlexAlign.Start)

      Column({ space: 10 }) {
        Stack() {
          TextInput({ placeholder: $r('app.string.Input_phone') })
            .width('100%')
            .height(50)
            .borderRadius(5)
            .type(InputType.PhoneNumber)
            .onChange(value => {
              this.phoneNumber = value;
            })
        }
        .width('80%')
        .height(50)

        TextInput({ placeholder: $r('app.string.Input_password') })
          .width('80%')
          .height(50)
          .borderRadius(5)
          .type(InputType.Password)
          .onChange(value => {
            this.password = value;
          })
        Row() {
          Image($r('app.media.app_icon'))
            .width(240)
            .height(25)
            .objectFit(ImageFit.Contain)
        }
        .width('80%')
        .height(20)
        .justifyContent(FlexAlign.Start)

        Text($r('app.string.Login'))
          .id('login')
          .width('80%')
          .height(50)
          .borderRadius(10)
          .textAlign(TextAlign.Center)
          .backgroundColor($r('app.color.COLOR_FF785F'))
          .fontColor($r('app.color.COLOR_FFFFFF'))
          .fontSize(20)
          .fontFamily($r('app.string.Font_family_medium'))
          .onClick(e => {
            this.loginController.login(this.phoneNumber, this.password).then(res => {
              Logger.info(TAG, `login then: ${JSON.stringify(res)}`);
              // 提示服务端返回的登录信息
              promptAction.showToast({ message: res.getMessage(), duration: 1000, bottom: 500 });
              setTimeout(() => {
                if (res.getCode() === 200) {
                  let data: LoginResult = res.getData();
                  Logger.info(TAG, `login success: ${JSON.stringify(data.getToken())}`);
                  // 存储用户信息, 包括token
                  AppStorage.setOrCreate("userInfo", data);

                  // 分别存储当前用户和对端用户的用户名和头像
                  if (data.getUsername() === '13111111111') {
                    let currUser = new User(data.getUsername(), $r('app.media.app_icon'))
                    let oppositeUser = new User('13122222222', $r('app.media.app_icon'))
                    AppStorage.setOrCreate("currentUser", currUser);
                    AppStorage.setOrCreate("oppositeUser", oppositeUser);
                  } else {
                    let currentUser = new User(data.getUsername(), $r('app.media.app_icon'))
                    let oppositeUser = new User('13111111111', $r('app.media.app_icon'))
                    AppStorage.setOrCreate("currentUser", currentUser);
                    AppStorage.setOrCreate("oppositeUser", oppositeUser);
                  }

                  // 跳转页面
                  router.pushUrl({ url: 'pages/Index' });
                  return;
                }
                Logger.info(TAG, `login failed: ${JSON.stringify(res)}`);
              }, 800)
            }).catch((err: BusinessError)=> {
              Logger.info(TAG, `login err: ${JSON.stringify(err)}`);
              promptAction.showToast({ message: $r('app.string.Connection_timesout'), duration: 1000, bottom: 500 });
            })
          })

      }
      .width('100%')
      .height('92%')
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.COLOR_FFFFFF'))
  }
}