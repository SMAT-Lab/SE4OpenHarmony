/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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

import router from '@ohos.router'
import Logger from '../model/Logger'
import { AccountData } from '../model/AccountData'
import { AccountModel } from '../model/AccountModel'
import preferences from '@ohos.data.preferences'

const TAG: string = '[LoginInfo]'

@Component
export struct LoginInfo {
  @State name: string = '';
  @State password: string = '';
  @Prop bundleName: string;
  private storage: AccountData = new AccountData();
  private accountModel: AccountModel = new AccountModel();

  build() {
    Column() {
      Row() {
        Text($r('app.string.appname'))
          .margin(10)
          .fontSize(18)
          .width('20%')
          .textAlign(TextAlign.End)
        Text(this.bundleName)
          .margin(10)
          .width('55%')
          .fontSize(20)
          .textAlign(TextAlign.Center)
      }
      .margin({ top: '10%' })
      .padding({ left: 5 })

      Row() {
        Text($r('app.string.username'))
          .margin(10)
          .fontSize(18)
          .width('20%')
          .textAlign(TextAlign.End)

        TextInput({ placeholder: 'xxxxxxx' })
          .id('nameInput')
          .margin(10)
          .width('55%')
          .fontSize(20)
          .maxLength(20)
          .fontWeight(FontWeight.Bold)
          .placeholderFont({ size: 16, weight: FontWeight.Normal })
          .onChange((value: string) => {
            this.name = value
          })
      }
      .padding({ left: 5 })

      Row() {
        Text($r('app.string.password'))
          .margin(10)
          .fontSize(18)
          .width('20%')
          .textAlign(TextAlign.End)

        TextInput({ placeholder: 'xxxxxxx' })
          .id('passwordInput')
          .margin(10)
          .width('55%')
          .fontSize(20)
          .maxLength(20)
          .type(InputType.Password)
          .fontWeight(FontWeight.Bold)
          .placeholderFont({ size: 16, weight: FontWeight.Normal })
          .onChange((value: string) => {
            this.password = value
          })
      }
      .padding({ left: 5 })

      Button($r('app.string.register'))
        .id('register')
        .margin(10)
        .width('60%')
        .fontSize(20)
        .fontColor(Color.White)
        .type(ButtonType.Capsule)
        .onClick(() => {
          router.replaceUrl({
            url: 'pages/Register',
            params: {
              bundleName: this.bundleName
            }
          })
        })

      Button($r('app.string.login'))
        .id('login')
        .margin(10)
        .width('60%')
        .fontSize(20)
        .fontColor(Color.White)
        .type(ButtonType.Capsule)
        .onClick(async () => {
          let result: preferences.ValueType = await this.storage.getStorageValue(getContext(), this.name, this.bundleName);
          let effect: preferences.ValueType = await this.storage.getStorageValue(getContext(), this.bundleName, `${this.name}_${this.bundleName}`);
          if (this.name === '') {
            AlertDialog.show(
              {
                message: $r('app.string.blank'),
                confirm: {
                  value: $r('app.string.close'),
                  action: () => {
                    Logger.info(TAG, `AlertDialog enter`)
                  }
                },
                cancel: () => {
                  Logger.info(TAG, `AlertDialog close`)
                }
              })
          } else if (this.password === '') {
            AlertDialog.show(
              {
                message: $r('app.string.password_blank'),
                confirm: {
                  value: $r('app.string.close'),
                  action: () => {
                    Logger.info(TAG, `AlertDialog enter`)
                  }
                },
                cancel: () => {
                  Logger.info(TAG, `AlertDialog close`)
                }
              })
          } else if (result === this.password && effect === 'true') {
            let email: string = ''
            let signature: string = ''
            try {
              email = await this.accountModel.getAccountCredential(`${this.name}_${this.bundleName}`, `email_${this.bundleName}`)
              Logger.info(TAG, `getAccountCredential email is ${email}`)
            } catch (err) {
              email = ''
              Logger.info(TAG, `getAccountCredential failed err is ${JSON.stringify(err)}`)
            }
            try {
              signature = await this.accountModel.getAccountCredential(`${this.name}_${this.bundleName}`, `signature_${this.bundleName}`)
              Logger.info(TAG, `getAccountCredential signature is ${signature}`)
            } catch (err) {
              signature = ''
              Logger.info(TAG, `getAccountCredential failed err is ${JSON.stringify(err)}`)
            }
            router.replaceUrl({
              url: 'pages/Account',
              params: {
                email: email,
                username: this.name,
                signature: signature,
                bundleName: this.bundleName
              }
            })
          } else {
            AlertDialog.show(
              {
                message: $r('app.string.password_message'),
                confirm: {
                  value: $r('app.string.close'),
                  action: () => {
                    Logger.info(TAG, `AlertDialog enter`)
                  }
                },
                cancel: () => {
                  Logger.info(TAG, `AlertDialog close`)
                }
              })
          }
        })
    }
  }
}