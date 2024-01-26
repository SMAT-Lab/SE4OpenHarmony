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

import router from '@ohos.router'

@Entry
@Component
struct Index {
  build() {
    Column() {
      Column() {
        Button('A+B+C').onClick(() => {
          router.pushUrl({ url: "Application/MailBox" })
        }).type(ButtonType.Normal).borderRadius(5).width(100).id('caseOne')

        Button('A+C').onClick(() => {
          router.pushUrl({ url: "Application/PhotoAlbum" })
        }).type(ButtonType.Normal).borderRadius(5).width(100).id('caseTwo')

        Button('B+C').onClick(() => {
          router.pushUrl({ url: "Application/Settings" })
        }).type(ButtonType.Normal).borderRadius(5).width(100).id('caseThree')
      }.width('100%').height('50%').justifyContent(FlexAlign.SpaceAround)
    }.width('100%').height('100%')
  }
}