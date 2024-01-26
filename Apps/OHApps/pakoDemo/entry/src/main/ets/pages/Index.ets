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

import router from '@ohos.router';

@Entry
@Component
struct Index {
  @State message: string = 'Hello World'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)

        Button('跳转到 gzip', { type: ButtonType.Normal, stateEffect: true })
          .borderRadius(8)
          .margin(20)
          .fontSize(15)
          .fontWeight(FontWeight.Bold)
          .margin({ top: 32 })
          .padding({ left: 10 })
          .width('150')
          .height('50')
          .onClick((event?: ClickEvent) => {
            router.pushUrl({ url: "pages/Gzip" })
          })

        Button('跳转到 deflateDemo', { type: ButtonType.Normal, stateEffect: true })
          .borderRadius(8)
          .margin(20)
          .fontSize(15)
          .fontWeight(FontWeight.Bold)
          .margin({ top: 32 })
          .padding({ left: 10 })
          .width('150')
          .height('50')
          .onClick((event?: ClickEvent) => {
            router.pushUrl({ url: "pages/DeflateDemo" })
          })

        Button('跳转到 pakoTest', { type: ButtonType.Normal, stateEffect: true })
          .borderRadius(8)
          .margin(20)
          .fontSize(15)
          .fontWeight(FontWeight.Bold)
          .margin({ top: 32 })
          .padding({ left: 10 })
          .width('150')
          .height('50')
          .onClick((event?: ClickEvent) => {
            router.pushUrl({ url: "pages/PakoTest" })
          })
      }
      .width('100%')
    }
    .height('100%')
  }
}
