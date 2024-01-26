/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
      Column() {
        Button("图片", { type: ButtonType.Normal, stateEffect: true })
          .borderRadius(8).width("70%").height("8%").margin("2%")
          .onClick(() => {
            router.pushUrl({
              url: "pages/Picture"
            })
          })

        Button("音频", { type: ButtonType.Normal, stateEffect: true })
          .borderRadius(8).width("70%").height("8%").margin("2%")
          .onClick(() => {
            router.pushUrl({
              url: "pages/Audio"
            })
          })

        Button("视频", { type: ButtonType.Normal, stateEffect: true })
          .borderRadius(8).width("70%").height("8%").margin("2%")
          .onClick(() => {
            router.push({
              url: "pages/Videos"
            })
          })
        Button("其他", { type: ButtonType.Normal, stateEffect: true })
          .borderRadius(8).width("70%").height("8%").margin("2%")
          .onClick(() => {
            router.pushUrl({
              url: "pages/OtherSample"
            })
          })
      }
    }
    .width('100%')
    .height('100%')
  }
}
