/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
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
  build() {
    Row() {
      Column() {
        Row() {
          Text($r('app.string.text_concern'))
            .fontSize(24)
          Text($r('app.string.text_translation'))
            .fontSize(24)
        }
        .margin({ top: 8 })
        .justifyContent(FlexAlign.SpaceBetween)
        .width('30%')
        .height('5%')

        Row() {
          Image($r('app.media.icon'))
            .width(30)
            .height(30)
            .margin({ left: 20 })
            .onClick(() => {
              router.pushUrl({
                url: 'pages/cameraPage/CameraPage'
              }, router.RouterMode.Single);
            })
            .id('sweep')
          Divider()
            .height('60%')
            .color($r('app.color.index_driver'))
            .strokeWidth(3)
            .vertical(true)
            .margin({ left: 15 })
          Text($r('app.string.index_nike'))
            .fontSize(20)
            .fontWeight(FontWeight.Medium)
            .margin({ left: 15 })
          Blank()
          Image($r('app.media.icon'))
            .width(40)
            .height(40)
            .margin({ right: 15, top: 5 })
          Button($r('app.string.index_search'))
            .fontSize(24)
            .width(100)
            .height('90%')
            .backgroundColor($r('app.color.index_search'))
            .margin({ right: 2 })
        }
        .margin({ top: 5, bottom: 10 })
        .width('95%')
        .height('7%')
        .backgroundColor(Color.White)
        .borderRadius(24)

        Scroll() {
          Column() {
            Row() {
              Image($r('app.media.icon'))
                .height(200)
                .width('40%')

              Image($r('app.media.icon'))
                .height(200)
                .width('40%')
            }
            .width('100%')
            .justifyContent(FlexAlign.SpaceAround)

            Row() {
              Image($r('app.media.icon'))
                .height(200)
                .width('40%')

              Image($r('app.media.icon'))
                .height(200)
                .width('40%')
            }
            .margin({ top: 12 })
            .width('100%')
            .justifyContent(FlexAlign.SpaceAround)

            Row() {
              Image($r('app.media.icon'))
                .height(200)
                .width('40%')

              Image($r('app.media.icon'))
                .height(200)
                .width('40%')
            }
            .margin({ top: 12 })
            .width('100%')
            .justifyContent(FlexAlign.SpaceAround)

            Row() {
              Image($r('app.media.icon'))
                .height(200)
                .width('40%')

              Image($r('app.media.icon'))
                .height(200)
                .width('40%')
            }
            .margin({ top: 12 })
            .width('100%')
            .justifyContent(FlexAlign.SpaceAround)

            Row() {
              Image($r('app.media.icon'))
                .height(200)
                .width('40%')

              Image($r('app.media.icon'))
                .height(200)
                .width('40%')
            }
            .margin({ top: 12 })
            .width('100%')
            .justifyContent(FlexAlign.SpaceAround)

            Row() {
              Image($r('app.media.icon'))
                .height(200)
                .width('40%')

              Image($r('app.media.icon'))
                .height(200)
                .width('40%')
            }
            .margin({ top: 12 })
            .width('100%')
            .justifyContent(FlexAlign.SpaceAround)

            Row() {
              Image($r('app.media.icon'))
                .height(200)
                .width('40%')

              Image($r('app.media.icon'))
                .height(200)
                .width('40%')
            }
            .margin({ top: 12 })
            .width('100%')
            .justifyContent(FlexAlign.SpaceAround)
          }
        }
        .width('100%')
        .height('100%')
        .padding(8)
        .margin({ left: 12, right: 12, top: 4, bottom: 180 })
        .backgroundColor(Color.White)
        .borderRadius(8)

        Column() {
          Row() {
            Image($r('app.media.icon'))
              .height(38)
              .width(38)
            Image($r('app.media.icon'))
              .height(38)
              .width(38)
            Image($r('app.media.icon'))
              .height(38)
              .width(38)
            Image($r('app.media.icon'))
              .height(38)
              .width(38)
            Image($r('app.media.icon'))
              .height(38)
              .width(38)
          }
          .margin({ top: 12 })
          .width('100%')
          .justifyContent(FlexAlign.SpaceAround)

          Row() {
            Text($r('app.string.index_index_text'))
            Text($r('app.string.index_video'))
            Text($r('app.string.index_message'))
            Text($r('app.string.index_shopping'))
            Text($r('app.string.index_me'))
          }
          .margin({ top: 8, bottom: 8 })
          .width('100%')
          .justifyContent(FlexAlign.SpaceAround)
        }
        .position({ y: '90%' })
        .backgroundColor(Color.White)
      }
      .backgroundColor($r('app.color.index_bg'))
      .height('100%')
      .width('100%')
    }
    .height('100%')
  }
}