/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import router from '@ohos.router';
@Entry
@Component
struct Index {

  build() {
    Row() {
      Column() {
        Button("@lazyInject")
          .fontSize(30)
          .height(60)
          .width('100%')
          .fontColor(Color.White)
          .fontWeight(FontWeight.Bold)
          .onClick((event: ClickEvent) => {
            router.pushUrl({ url:  "pages/LazyInjectPage" });
          })
        Button("@lazyInjectNamed")
          .fontSize(30)
          .height(60)
          .width('100%')
          .margin(20)
          .fontColor(Color.White)
          .fontWeight(FontWeight.Bold)
          .onClick((event: ClickEvent) => {
            router.pushUrl({ url:  "pages/LazyInjectNamedPage" });
          })
        Button("@lazyInjectTagged")
          .fontSize(30)
          .height(60)
          .margin(20)
          .width('100%')
          .fontColor(Color.White)
          .fontWeight(FontWeight.Bold)
          .onClick((event: ClickEvent) => {
            router.pushUrl({ url:  "pages/LazyInjectTaggedPage" });
          })
        Button("@lazyMultiInject")
          .fontSize(30)
          .height(60)
          .margin(20)
          .width('100%')
          .fontColor(Color.White)
          .fontWeight(FontWeight.Bold)
          .onClick((event: ClickEvent) => {
            router.pushUrl({ url:  "pages/LazyMultiInjectPage" });
          })
      }
      .width('100%')
    }
    .height('100%')
  }
}