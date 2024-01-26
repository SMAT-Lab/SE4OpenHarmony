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
struct Picture {
  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start }) {
      Column() {
        Text("GIF")
          .fontSize(25)
          .padding(10)
          .width("100%")
          .textAlign(TextAlign.Center)
          .border({ width: "2px", color: "#000000" })
          .onClick(() => {
            router.pushUrl({
              url: "pages/GifSample"
            })
          })
        Text("ICO")
          .fontSize(25)
          .padding(10)
          .width("100%")
          .textAlign(TextAlign.Center)
          .border({ width: "2px", color: "#000000" })
          .onClick(() => {
            router.pushUrl({
              url: "pages/IcoSample"
            })
          })
        Text("PCX")
          .fontSize(25)
          .padding(10)
          .width("100%")
          .textAlign(TextAlign.Center)
          .border({ width: "2px", color: "#000000" })
          .onClick(() => {
            router.pushUrl({
              url: "pages/PcxSample"
            })
          })
        Text("PNG")
          .fontSize(25)
          .padding(10)
          .width("100%")
          .textAlign(TextAlign.Center)
          .border({ width: "2px", color: "#000000" })
          .onClick(() => {
            router.pushUrl({
              url: "pages/PngSample"
            })
          })
        Text("Bmp")
          .fontSize(25)
          .padding(10)
          .width("100%")
          .textAlign(TextAlign.Center)
          .border({ width: "2px", color: "#000000" })
          .onClick(() => {
            router.pushUrl({
              url: "pages/BmpSample"
            })
          })
        Text("WEBP")
          .fontSize(25)
          .padding(10)
          .width("100%")
          .textAlign(TextAlign.Center)
          .border({ width: "2px", color: "#000000" })
          .onClick(() => {
            router.pushUrl({
              url: "pages/WebpSample" })
          })
        Text("JPG")
          .fontSize(25)
          .padding(10)
          .width("100%")
          .textAlign(TextAlign.Center)
          .border({ width: "2px", color: "#000000" })
          .onClick(() => {
            router.pushUrl({
              url: "pages/JpgSample"
            })
          })
        Text("PSD")
          .fontSize(25)
          .padding(10)
          .width("100%")
          .textAlign(TextAlign.Center)
          .border({ width: "2px", color: "#000000" })
          .onClick(() => {
            router.pushUrl({
              url: "pages/PsdSample"
            })
          })
      }

    }
    .width('100%')
    .height('100%')
  }
}
