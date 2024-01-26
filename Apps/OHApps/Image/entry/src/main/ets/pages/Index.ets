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
import image from '@ohos.multimedia.image'
import { logger } from '@ohos/photomodify'
import { terminateSelf } from '../utils/utils'

const TAG: string = 'Index'


interface IsShowCamera extends Object {
  isShowCamera: boolean
}

@Entry
@Component
struct Index {
  @StorageLink('pixelMaps') pixelMaps: Array<image.PixelMap> = []
  @State isShowCamera: boolean = false
  @State isShowComment: boolean = true

  aboutToAppear() {
    logger.info(TAG, 'enter aboutToAppear')
    if (AppStorage.Get('pixelMaps') as boolean) {
      this.pixelMaps.push({} as image.PixelMap)
    }
    if (router.getParams() && (router.getParams() as IsShowCamera).isShowCamera) {
      this.isShowCamera = true
    }
  }

  build() {
    Column() {
      Row() {
        Image($r('app.media.back'))
          .width(46)
          .height(26)
          .objectFit(ImageFit.Contain)
          .onClick(() => {
            let context = getContext(this)
            terminateSelf(context)
          })

        Text($r('app.string.publish_comments'))
          .fontSize(22)
          .margin({ left: 130 })
          .textAlign(TextAlign.Center)

        Blank()

        Button($r('app.string.submit'))
          .fontSize(20)
          .height(32)
          .width(80)
          .backgroundColor('#E92F4F')
          .borderRadius(20)
          .margin({ right: 10 })
      }
      .width('100%')
      .height(32)
      .padding({ left: 14 })
      .margin({ top: 20 })

      Scroll() {
        Column() {
          Stack({ alignContent: Alignment.Top }) {
            Column() {
              Stack() {
                TextArea({ placeholder: $r('app.string.tip') })
                  .height(150)
                  .backgroundColor('#fffffff')
                  .onChange((value) => {
                    if (value.length === 0) {
                      this.isShowComment = true
                    } else {
                      this.isShowComment = false
                    }
                  })

                if (this.isShowComment) {
                  Image($r('app.media.comment'))
                    .height(20)
                    .width(20)
                    .margin({ top: 8, left: 16 })
                }
              }
              .alignContent(Alignment.TopStart)
              .margin({ top: 40 })

              if (this.isShowCamera) {
                Grid() {
                  ForEach(this.pixelMaps, (item: image.PixelMap, index?: number) => {
                    GridItem() {
                      if (index !== undefined && (index < this.pixelMaps.length - 1)) {
                        Image(item)
                          .width('100%')
                          .height(100)
                          .borderRadius(10)

                      } else {
                        Column() {
                          Image($r('app.media.photo'))
                            .height(40)
                            .width(40)
                            .onClick(() => {
                              router.push({
                                url: 'pages/ChoicePhotos'
                              })
                            })
                          Text($r('app.string.add_picture'))
                            .fontSize(13)
                        }
                        .alignItems(HorizontalAlign.Center)
                        .justifyContent(FlexAlign.Center)
                        .width('100%')
                        .height(100)
                        .borderRadius(10)
                        .backgroundColor('#F1F3F5')
                      }
                    }
                  })
                }
                .columnsTemplate('1fr 1fr 1fr 1fr')
                .columnsGap(8)
                .rowsGap(8)
                .margin({ top: 8 })
                .width('94%')
                .height(105 * (this.pixelMaps.length > 4 ? 2 : 1))
              } else {
                Column() {
                  Image($r('app.media.camera'))
                    .width(40)
                    .height(40)

                  Text($r('app.string.add_picture'))
                    .fontSize(16)
                }
                .onClick(() => {
                  router.push({
                    url: 'pages/ChoicePhotos'
                  })
                })
                .width('94%')
                .height(130)
                .margin({ top: 10 })
                .borderRadius(10)
                .justifyContent(FlexAlign.Center)
                .backgroundColor('#F1F3F5')
              }
              Text($r('app.string.anonymous_display'))
                .fontSize(15)
                .fontColor('#99182431')
                .alignSelf(ItemAlign.Start)
                .margin({ left: 16, top: 16 })
            }
            .width('100%')
            .height('100%')
            .margin({ top: 22 })
            .borderRadius(20)
            .backgroundColor('#fffffff')

            Image($r('app.media.commodity'))
              .width(44)
              .height(44)
          }
          .backgroundColor('#f1f3f5')
          .height('100%')
          .width('94%')
          .margin({ top: 10 })
        }
        .width('100%')
        .height(this.isShowCamera === false ? 380 : 300 + (this.pixelMaps.length / 4 > 1 ? 160 : 60))
      }
      .margin({ top: 20 })
      .constraintSize({ maxHeight: '94%', minHeight: '94%' })
      .backgroundColor('#f1f3f5')
    }
    .width('100%')
    .height('100%')
  }
}