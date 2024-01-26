/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


// Page title bar
@Component
export struct TitleBar {
  private title: string | Resource | undefined = undefined

  build() {
    Row() {
      Text(this.title)
        .fontSize(24)
        .fontWeight(700)
        .lineHeight(32)
        .margin({ left: 24 })
        .fontColor('#182431')
    }
    .width('100%')
    .height(70)
    .backgroundColor($r('app.color.title_bar_background'))
  }
}