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

import prompt from '@ohos.promptAction'
import Logger from '../model/Logger'
import { HuksModel } from '../model/HuksModel'

const TAG: string = '[HUKS]'

@Component
export struct OldKey {
  @State cipherTextInfo: string = ''
  @State plainTextInfo: string = ''
  @State message: string = ''
  private huksModel: HuksModel = new HuksModel()

  build() {
    Stack({alignContent:Alignment.Center}) {
      Column() {
        Text($r('app.string.input_message')).fontSize(20).margin({ left: 1, top:1 })
        TextInput()
          .enableKeyboardOnFocus(false)
          .margin(4)
          .width('90%')
          .id('encryptionInput')
          .onChange((value: string) => {
            this.message = value
          })

        Row() {
          Button($r('app.string.send_message'))
            .margin(10)
            .fontSize(20)
            .width('45%')
            .height('6%')
            .id('encryptionBtn')
            .onClick(() => {
              if (this.message === '') {
                prompt.showToast({
                  message: 'This message is null.'
                })
              } else {
                this.huksModel.encryptDataUserOldKey(this.message, (result: string) => {
                  Logger.info(TAG, `this result = ${result}`)
                  this.cipherTextInfo = `${result}`
                })
              }
            })
        }

        Text(this.cipherTextInfo)
          .id('encryptionInfo')
          .fontSize(18)
          .width('85%')
          .height('25%')
          .border({ width: 2, color: Color.Black })
          .margin(10)

        Row() {
          Button($r('app.string.recieve_message'))
            .margin(10)
            .fontSize(20)
            .width('45%')
            .height('6%')
            .id('decryptionBtn')
            .onClick(() => {
              if (this.message === '') {
                prompt.showToast({
                  message: 'This message is null.'
                })
              } else {
                this.huksModel.decryptDataUserOldKey((result: string) => {
                  Logger.info(TAG, `this result = ${result}`)
                  this.plainTextInfo = `${result}`
                })
              }
            })
          Button($r('app.string.import_key'))
            .margin(10)
            .fontSize(20)
            .width('45%')
            .height('6%')
            .id('importKeyBtn')
            .onClick(() => {
                this.huksModel.importKey()
            })
        }

        Text(this.plainTextInfo)
          .id('decryptionInfo')
          .fontSize(18)
          .width('85%')
          .height('25%')
          .border({ width: 2, color: Color.Black })
          .margin(10)
      }
    }
    .width('100%')
    .height('100%')
  }
}