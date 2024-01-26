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

import Imap, { inspect } from '@ohos/node-imap'
import promptAction from '@ohos.promptAction'
import router from '@ohos.router'
import socket from '@ohos.net.socket'


@Entry
@Component
struct Index {
  @State message: string = 'Hello World'

  build() {
    Column() {
      Button('跳转登录页')
        .fontSize(20)
        .height(50)
        .visibility(Visibility.Hidden)
        .margin({ top: 150 })
        .onClick(()=>{
          router.pushUrl({
            url: 'pages/LoginPage'
          })
        })
      Button('跳转测试页')
        .fontSize(20)
        .height(50)
        .margin({ top: 150 })
        .onClick(()=>{
          router.pushUrl({
            url: 'pages/TestInterfacePage'
          })
        })

      Button('跳转压力测试页')
        .fontSize(20)
        .height(50)
		    .visibility(Visibility.Hidden)
        .margin({ top: 150 })
        .onClick(()=>{
          router.pushUrl({
            url: 'pages/PressTestPage'
          })
        })
    }
    .width('100%')

  }
}