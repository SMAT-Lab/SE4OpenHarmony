/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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

import prompt from '@ohos.promptAction'
import router from '@ohos.router'
import mediaQuery from '@ohos.mediaquery'
import mediaLibrary from '@ohos.multimedia.mediaLibrary'
import { logger } from '../util/Logger'

const TAG: string = 'ChoicePhoto'

@Component
export struct ChoicePhoto {
  @State whichShow: boolean[] = [true, false]
  @State medias: Array<mediaLibrary.FileAsset> = []
  @State choiceShow: Array<Resource> = [$r('app.string.choice_photo'), $r('app.string.choice_video')]
  @State taskShow: Array<Resource> = [$r('app.media.photo'), $r('app.media.video')]
  @State textShow: Array<Resource> = [$r('app.string.photograph'), $r('app.string.take_video')]
  @State isShowChoices: Array<boolean> = new Array(this.medias.length).fill(false)
  @State @Watch('choiceChange') choiceMedias: Array<mediaLibrary.FileAsset> = []
  @State mediaUris: Array<string> = []
  @State isChoice: boolean = false
  @State nextText: string = ''
  @State isLand: boolean = false
  private mediaLibraryInstance: mediaLibrary.MediaLibrary = mediaLibrary.getMediaLibrary(getContext(this))
  private listener = mediaQuery.matchMediaSync('screen and (min-aspect-ratio: 1.5) or (orientation: landscape)')

  onLand(mediaQueryResult: mediaQuery.MediaQueryResult) {
    if (mediaQueryResult.matches) {
      this.isLand = true
    } else {
      this.isLand = false
    }
  }

  choiceChange() {
    if (this.choiceMedias.length > 0) {
      this.isChoice = true
    } else {
      this.isChoice = false
    }
  }

  @Builder
  showChoiceBuild(backGround: string, showNumber: number) {
    Column() {
      Text(showNumber === 0 ? '' : `${showNumber}`)
        .fontSize(14)
        .fontColor(Color.White)
        .height(20)
        .margin({ top: 2 })
    }
    .width(24)
    .height(24)
    .margin({ top: 6, right: 6 })
    .borderRadius(15)
    .border({ width: 1, style: BorderStyle.Solid, color: Color.White })
    .backgroundColor(backGround)
  }

  async getFileAssetsFromType(mediaType: mediaLibrary.MediaType) {
    logger.info(TAG, `getFileAssetsFromType`)
    let context = getContext(this) as Context
    let mediaLibraryInstance = mediaLibrary.getMediaLibrary(context)
    if (!mediaLibraryInstance) {
      return
    }
    logger.info(TAG, `mediaLibraryInstance = ${JSON.stringify(mediaLibraryInstance)}`)
    let fileKeyObj = mediaLibrary.FileKey
    let fetchOp: mediaLibrary.MediaFetchOptions = {
      selections: `${fileKeyObj.MEDIA_TYPE}=?`,
      selectionArgs: [`${mediaType}`],
    }
    let fetchFileResult = await mediaLibraryInstance.getFileAssets(fetchOp)
    logger.info(TAG, `fetchFileResult = ${JSON.stringify(fetchFileResult)} , ${fetchFileResult.getCount()}`)
    if (fetchFileResult && fetchFileResult.getCount() > 0) {
      this.medias = await fetchFileResult.getAllObject()
    }
    logger.info(TAG, `this.medias = ${JSON.stringify(this.medias)}`)
  }

  convertContext(context: Context): Context {
    return context
  }

  async convertResourceToString(resource: Resource): Promise<string> {
    return await this.convertContext(getContext(this)).resourceManager.getString(resource.id)
  }

  async aboutToAppear() {
    logger.info(TAG, `aboutToAppear`)
    this.listener.on('change', this.onLand)
    this.nextText = await this.convertResourceToString($r('app.string.next'))
    this.getFileAssetsFromType(mediaLibrary.MediaType.IMAGE)
  }

  getMaxHeight(): ConstraintSizeOptions {
    if (!this.isLand && this.isChoice) {
      return { maxHeight: '64%' }
    } else if (!this.isLand && !this.isChoice) {
      return { maxHeight: '75%' }
    } else if (this.isLand && this.isChoice) {
      return { maxHeight: '62%' }
    } else if (this.isLand && !this.isChoice) {
      return { maxHeight: '73%' }
    }
    return { maxHeight: '73%' }
  }

  build() {
    Column() {
      Row() {
        Image($r('app.media.back'))
          .width(44)
          .height(24)
          .objectFit(ImageFit.Contain)
          .onClick(() => {
            router.back()
          })

        Text($r('app.string.recently_added'))
          .fontColor(Color.Black)
          .fontSize(22)
          .margin({ left: 120 })
          .textAlign(TextAlign.Center)

        Image($r('app.media.drop_down'))
          .width(30)
          .height(32)
          .objectFit(ImageFit.Contain)

        Blank()

        Button(`${this.nextText} ${this.isChoice === true ? `(${this.choiceMedias.length})` : ''}`)
          .fontSize(20)
          .height(32)
          .backgroundColor(this.isChoice === true ? '#E92F4F' : '#fffa8e8e')
          .margin({ right: 10 })
          .borderRadius(20)
          .onClick(() => {
            if (this.isChoice === false) {
              return
            }
            this.mediaUris = this.choiceMedias.map((item: mediaLibrary.FileAsset) => {
              return item.uri
            })
            router.push({
              url: 'pages/EditPages',
              params: { mediaUris: this.mediaUris, isLand: this.isLand }

            })
          })
      }
      .width('100%')
      .height(35)
      .padding({ left: 14 })
      .margin({ top: 20 })

      Column() {
        Row() {
          ForEach(this.choiceShow, (item: Resource, index?: number) => {
            Column() {
              if (index !== undefined) {
                Text(item)
                  .fontSize(20)
                  .fontWeight(500)
                  .fontColor(this.whichShow[index] === true ? '#0000000' : '#99182431')
                  .onClick(() => {
                    this.whichShow.fill(false)
                    if (this.whichShow.length > index) {
                      if (index) {
                        this.whichShow[index] = true
                      }
                    }
                    this.medias = []
                    if (index == 0) {
                      this.getFileAssetsFromType(mediaLibrary.MediaType.IMAGE)
                    } else {
                      prompt.showDialog({ message: $r('app.string.user_tip') })
                      this.choiceMedias = []
                      this.isShowChoices = new Array(this.medias.length).fill(false)
                    }
                  })
                if (this.whichShow[index]) {
                  Divider()
                    .vertical(false)
                    .strokeWidth(3)
                    .color('#ffff0000')
                    .lineCap(LineCapStyle.Round)
                    .width('40%')
                    .margin({ top: 4 })
                }
              }
            }.width('30%')
          })
        }
        .margin({ top: 20 })
      }

      Scroll() {
        Column() {
          Grid() {
            ForEach(this.medias, (item: mediaLibrary.FileAsset, index?: number) => {
              GridItem() {
                Stack({ alignContent: Alignment.TopEnd }) {
                  Image(item.uri)
                    .width('100%')
                    .height('100%')
                    .borderRadius(10)
                    .objectFit(ImageFit.Fill)
                  if (index !== undefined && this.isShowChoices[index]) {
                    this.showChoiceBuild('#e92f4f', this.choiceMedias.indexOf(item) + 1)
                  } else {
                    this.showChoiceBuild('#ffb7b4b4', 0)
                  }
                }
                .width('100%')
                .height('100%')
                .onClick(() => {
                  if (index !== undefined) {
                    this.isShowChoices[index] = !this.isShowChoices[index]
                    if (this.isShowChoices[index]) {
                      if (this.choiceMedias.length > 5) {
                        prompt.showDialog({ message: $r('app.string.choice_number') })
                        this.isShowChoices[index] = !this.isShowChoices[index]
                        return
                      }
                      this.choiceMedias.push(item)
                    } else {
                      if (this.choiceMedias.indexOf(item) != -1) {
                        this.choiceMedias.splice(this.choiceMedias.indexOf(item), 1)
                      }
                    }
                  }
                })
              }.aspectRatio(1)

            })
          }
          .columnsTemplate('1fr 1fr 1fr 1fr')
          .columnsGap(8)
          .rowsGap(8)
        }
        .height('100%')
        .width('95%')
        .margin({ top: 8 })
      }
      .margin({ top: 20 })
      .width('100%')
      .constraintSize(this.getMaxHeight())
      .backgroundColor('#fff5f3f3')

      if (this.isChoice) {
        Grid() {
          ForEach(this.choiceMedias, (item: mediaLibrary.FileAsset, index?: number) => {
            GridItem() {
              Stack({ alignContent: Alignment.TopEnd }) {
                Image(item.uri)
                  .width('100%')
                  .height(70)
                  .borderRadius(10)
                Image($r('app.media.delete'))
                  .width(20)
                  .height(20)
                  .margin({ top: 5, right: 5 })
                  .onClick(() => {
                    if (index !== undefined) {
                      for (let i = 0;i < this.medias.length; i++) {
                        if (this.choiceMedias[index] && this.isShowChoices.length > i && this.medias[i] === this.choiceMedias[index]) {
                          this.isShowChoices[i] = false
                        }
                      }
                      this.choiceMedias.splice(index, 1)
                    }
                  })
              }
              .width('100%')
            }
          })
        }
        .columnsTemplate('1fr 1fr 1fr 1fr 1fr 1fr')
        .columnsGap(8)
        .rowsGap(8)
        .margin({ top: 8 })
        .width('95%')
        .height(70)

        Divider()
          .vertical(false)
          .strokeWidth(1)
          .color('#ffd9d5d6')
          .lineCap(LineCapStyle.Round)
          .width('100%')
          .margin({ top: 8 })
      }

      Row() {
        ForEach(this.taskShow, (item: Resource, index?: number) => {
          if (index !== undefined) {
            Column() {
              Image(item)
                .width(30)
                .height(30)

              Text(this.textShow[index])
                .fontSize(14)
                .fontColor('#99182431')
                .margin({ top: 2 })
            }.width('50%')
          }
        })
      }
      .margin({ top: 8 })
    }
  }
}