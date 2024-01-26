/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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

import promptAction from '@ohos.promptAction'
import router from '@ohos.router'
import fs from '@ohos.file.fs';
import GlobalObj from '../GlobalObj'
@Entry
@Component
struct CommandPage {
  @State message: string = 'Hello World'
  @State from: string = ''
  @State to: string = ''
  @State cc: string = ''
  @State bcc: string = ''
  @State subject: string = ''
  @State listData: Array<string> = []
  @State mailType: string = '@qq.com'
  @State textValue: string = ''
  @State inputValue: string = 'click me'

  async aboutToDisappear() {
    await GlobalObj?.getInstance()?.getClient()?.QUIT()
  }

  showToast(text: string, name = '测试') {
    console.log(`zdy---${name}--->${text}`)
    promptAction.showToast({
      message: text,
      duration: 2000,
      bottom: 50
    })
  }

  aboutToAppear() {
    let params = router.getParams()
    let testParam = params as Record<string,Object>
    if (testParam && testParam['sendCount'] && typeof testParam['sendCount'] === 'string') {
      this.from = testParam['sendCount'];
    }
  }

  build() {
    Row() {
      Column() {
        Scroll() {
          Flex({
            alignItems: ItemAlign.Center,
            justifyContent: FlexAlign.Center,
            alignContent: FlexAlign.Center,
            direction: FlexDirection.Row
          }) {
            Flex({
              alignItems: ItemAlign.Start,
              justifyContent: FlexAlign.Start,
              alignContent: FlexAlign.Start,
              direction: FlexDirection.Row
            }) {
              Button('STAT命令')
                .margin(20)
                .height(50)
                .backgroundColor(Color.Blue)
                .fontColor(Color.White)
                .onClick(() => {
                  this.sendMail()
                })
                .margin({ top: 10 })

              Button('LIST命令')
                .margin(20)
                .height(50)
                .backgroundColor(Color.Blue)
                .fontColor(Color.White)
                .onClick(() => {
                  this.sendMail()
                })
                .margin({ top: 10 })
              Button('TOP命令')
                .margin(20)
                .height(50)
                .backgroundColor(Color.Blue)
                .fontColor(Color.White)
                .onClick(() => {
                  this.sendMail()
                })
                .margin({ top: 10 })
              Button('UIDL命令')
                .margin(20)
                .height(50)
                .backgroundColor(Color.Blue)
                .fontColor(Color.White)
                .onClick(() => {
                  this.sendMail()
                })
                .margin({ top: 10 })
              Button('LAST命令')
                .margin(20)
                .height(50)
                .backgroundColor(Color.Blue)
                .fontColor(Color.White)
                .onClick(() => {
                  this.sendMail()
                })
                .margin({ top: 10 })

              Button('NOOP命令')
                .margin(20)
                .height(50)
                .backgroundColor(Color.Blue)
                .fontColor(Color.White)
                .onClick(() => {
                  this.sendMail()
                })
                .margin({ top: 10 })

              Button('DELE命令')
                .margin(20)
                .height(50)
                .backgroundColor(Color.Blue)
                .fontColor(Color.White)
                .onClick(() => {
                  this.sendMail()
                })
                .margin({ top: 10 })

              Button('RSET命令')
                .margin(20)
                .height(50)
                .backgroundColor(Color.Blue)
                .fontColor(Color.White)
                .onClick(() => {
                  this.sendMail()
                })
                .margin({ top: 10 })

              Button('RETR命令')
                .margin(20)
                .height(50)
                .backgroundColor(Color.Blue)
                .fontColor(Color.White)
                .onClick(() => {
                  this.sendMail()
                })
                .margin({ top: 10 })

              Button('QUIT命令')
                .margin(20)
                .height(50)
                .backgroundColor(Color.Blue)
                .fontColor(Color.White)
                .onClick(() => {
                  this.sendMail()
                })
                .margin({ top: 10 })
            }.layoutWeight(1).height('100%')


            List({ space: 10, initialIndex: 0 }) {
              ForEach(this.listData, (item: string, index: number) => {
                ListItem() {
                  Text(item)
                    .fontSize(14)
                    .padding(5)
                    .textAlign(TextAlign.Center)
                }
                .borderWidth(2)
                .borderColor(Color.Gray)
              }, (item: string, index: number) => item)
            }
            .edgeEffect(EdgeEffect.None)
            .chainAnimation(false)
            .layoutWeight(2)
            .height('100%')
            .listDirection(Axis.Horizontal)

          }
        }.width('100%')
        .height('100%')
      }
      .width('100%')
    }
    .height('100%')
  }

  async sendMail() {
    try {
      if (GlobalObj?.getInstance()?.getClient()) {

      } else {
        this.showToast('账号未登录，请需重新登录', 'sendmail-smtp')
      }

    } catch (err) {
      this.showToast(`邮件发送出错：${err.message}`, 'sendmail-smtp')
    }
  }
}