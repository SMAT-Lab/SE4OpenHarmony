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

@Entry
@Component
struct Index {
  build() {
    Column() {
      Row() {
        Text($r('app.string.index_title'))
          .fontSize(18)
          .fontColor(Color.White)
      }
      .height(60)
      .width('100%')
      .padding({ left: 20 })
      .backgroundColor($r('app.color.title_bg'))

      Column({ space: 20 }) {
        Text($r('app.string.title'))
          .fontSize(20)

        Text($r('app.string.content1'))
          .fontSize(20)

        Text($r('app.string.content2'))
          .fontSize(20)
      }
      .alignItems(HorizontalAlign.Start)
      .padding(20)
    }
  }
}