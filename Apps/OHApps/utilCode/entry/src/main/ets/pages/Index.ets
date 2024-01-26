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

import router from '@ohos.router';
@Entry
@Component
struct Index {
  @State message: string = 'Hello World'

  build() {
    Column() {
      Row() {
        Button('缓存测试')
          .fontSize(18)
          .margin({ left: 18 })
          .onClick(() => {
            router.pushUrl({ url: 'pages/CachePage' })
          })

        Button('坐标测试')
          .fontSize(18)
          .margin({ left: 18 })
          .onClick(() => {
            router.pushUrl({ url: 'pages/GcoordPage' })
          })

        Button('颜色测试')
          .fontSize(18)
          .margin({ left: 18 })
          .onClick(() => {
            router.pushUrl({ url: 'pages/ColorDemo' })
          })

      }

      Row() {

        Button('时间测试')
          .fontSize(18)
          .margin({ left: 18 })
          .onClick(() => {
            router.pushUrl({ url: 'pages/TimePage' })
          })

        Button('图片测试')
          .fontSize(18)
          .margin({ left: 18 })
          .onClick(() => {
            router.pushUrl({ url: 'pages/PicturePage' })
          })

        Button('国家码测试')
          .fontSize(18)
          .margin({ left: 18 })
          .onClick(() => {
            router.pushUrl({ url: 'pages/CountryPage' })
          })

      }
      .margin({ top: 18 })


      Button('温度测试')
        .fontSize(18)
        .margin({ left: 18 })
        .onClick(() => {
          router.pushUrl({ url: 'pages/TempPage' })
        })
        .margin({ top: 18 })

    }
    .padding({ top: 18, bottom: 18 })
  }

}