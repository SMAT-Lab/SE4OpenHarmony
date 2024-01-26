/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License")
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
struct Click {
  @State message: string = 'Hello World'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .id("result_text")
        Button("singleClick")
          .id("click_bt")
          .onClick(() => {
            this.message = "singleClick"
          })
        Button() {
          Text('Click twice')
            .fontSize(25)
            .fontWeight(FontWeight.Bold)
        }
        .type(ButtonType.Capsule)
        .margin({ top: 20 })
        .gesture(
          TapGesture({ count: 2 })
            .onAction(() => {
              router.pushUrl({ url: 'pages/Third' })
            })
        )
        .gesture(
          LongPressGesture({ repeat: false })
            .onAction((event: GestureEvent) => {
              router.pushUrl({ url: 'pages/Fourth' })
            })
        )
      }
      .width('100%')
    }
    .height('100%')
  }
}