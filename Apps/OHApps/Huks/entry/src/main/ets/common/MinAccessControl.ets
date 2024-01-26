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
export struct MinAccessControl {
  @State cipherTextinfo: string = ''
  @State plainTextinfo: string = ''
  @State inputPassword: string = ''
  huksModel: HuksModel = new HuksModel()

  build() {
    Stack({ alignContent: Alignment.Center }) {
      Column() {
        GridRow() {
          GridCol({ span: { xs: 12, sm: 12, md: 12, lg: 12 } }) {
            Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
              List() {
                ListItem() {
                  Row() {
                    Text($r('app.string.input_save_password'))
                      .fontSize(16)
                      .textAlign(TextAlign.Start)
                      .lineHeight(22)
                  }
                  .backgroundColor(0xFFFFFF)
                  .width('100%')
                  .height('52vp')
                  .padding({ top: 4, left: 12, right: 12 })
                }

                ListItem() {
                  Row() {
                    TextInput()
                      .enableKeyboardOnFocus(false)
                      .margin(4)
                      .width('90%')
                      .id('passwordInput')
                      .fontSize(16)
                      .textAlign(TextAlign.Start)
                      .onChange((value: string) => {
                        this.inputPassword = value
                      })
                  }
                  .backgroundColor(0xFFFFFF)
                  .width('100%')
                  .height('48vp')
                  .padding({ left: 12, right: 12 })
                }
              }
              .width('100%')
              .height('100%')
              .borderRadius(16)
            }
          }
        }
        .height('100vp')
        .margin({ left: 12, right: 12, bottom: 12 })

        GridRow() {
          GridCol({ span: { xs: 12, sm: 12, md: 12, lg: 12 } }) {
            Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
              Column() {
                Row() {
                  Text($r('app.string.cipher_text'))
                    .fontSize(16)
                    .textAlign(TextAlign.Start)
                    .fontWeight(500)
                    .lineHeight(22)
                }
                .padding({ left: 12, right: 12 })
                .width('100%')
                .height('48vp')

                Row() {
                  Text() {
                    Span(this.cipherTextinfo)
                      .fontSize(16)
                      .fontWeight(400)
                      .fontColor(0x808080)
                      .fontColor('#182431')
                  }.textAlign(TextAlign.Start)
                  .id('cipherTextinfo')
                }
                .padding({ left: 12, right: 12, bottom: 4 })
                .width('100%')
                .height('52vp')
              }
              .borderRadius(16)
              .width('100%')
              .height('100')
              .backgroundColor(0xFFFFFF)
            }
          }
        }
        .height('100vp')
        .margin({ left: 12, right: 12, bottom: 12 })

        GridRow() {
          GridCol({ span: { xs: 12, sm: 12, md: 12, lg: 12 } }) {
            Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
              Column() {
                Row() {
                  Text($r('app.string.plain_text'))
                    .fontSize(16)
                    .textAlign(TextAlign.Start)
                    .fontWeight(500)
                    .lineHeight(22)
                }
                .padding({ left: 12, right: 12 })
                .width('100%')
                .height('48vp')

                Row() {
                  Text() {
                    Span(this.plainTextinfo)
                      .fontSize(16)
                      .fontWeight(400)
                      .fontColor(0x808080)
                      .fontColor('#182431')
                  }.textAlign(TextAlign.Start)
                  .id('plainTextinfo')
                }
                .padding({ left: 12, right: 12, bottom: 4 })
                .width('100%')
                .height('52vp')
              }
              .borderRadius(16)
              .width('100%')
              .height('100')
              .backgroundColor(0xFFFFFF)
            }
          }
        }
        .height('100vp')
        .margin({ left: 12, right: 12, bottom: 12 })

        Column() {
          GridRow() {
            GridCol({ span: { xs: 12, sm: 12, md: 12, lg: 12 } }) {
              Column() {
                Button() {
                  Text($r('app.string.save_password')).fontSize(16).fontWeight(500)
                    .lineHeight(22)
                    .fontColor('#FFFFFF')
                }
                .id('save_password')
                .borderRadius(20)
                .type(ButtonType.Capsule)
                .width('100%')
                .height('40vp')
                .margin({ bottom: 16 })
                .backgroundColor('#007DFF')
                .onClick(() => {
                  if (this.inputPassword === '') {
                    prompt.showToast({
                      message: 'This message is null.'
                    })
                  } else {
                    this.huksModel.encryptDataUseSm4(this.inputPassword, (result: string) => {
                      Logger.info(TAG, `this result = ${result}`)
                      this.cipherTextinfo = `${result}`
                    })
                  }
                });

                Button() {
                  Text($r('app.string.read_password')).fontSize(16).fontWeight(500)
                    .lineHeight(22)
                    .fontColor('#FFFFFF')
                }
                .borderRadius(20)
                .id('read_password')
                .type(ButtonType.Capsule)
                .margin({ left: 24, right: 24 })
                .width('100%')
                .height('40vp')
                .backgroundColor('#007DFF')
                .onClick(() => {

                  if (this.inputPassword === '') {
                    prompt.showToast({
                      message: 'This message is null.'
                    })
                  } else {
                    this.huksModel.decryptDataUseSm4((result: string) => {
                      Logger.info(TAG, `this result = ${result}`)
                      this.plainTextinfo = `${result}`
                    })
                  }

                });
              }
            }
          }.margin({ left: 24, right: 24 })
        }.width('100%').height('296vp').justifyContent(FlexAlign.End)
      }
      .width('100%')
      .height('100%')
    }
  }
}

