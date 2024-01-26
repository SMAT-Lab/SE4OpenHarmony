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

import { photoType } from '../model/dataType'

@Component
export struct PhotoContent {
  @State photoList: photoType[] = [
    new photoType($r('app.string.picture'), 1234, $r('app.media.P1')),
    new photoType($r('app.string.video'), 12, $r('app.media.P2')),
    new photoType($r('app.string.collect'), 7, $r('app.media.P3')),
    new photoType($r('app.string.newAlbum'), 11, $r('app.media.P4')),
    new photoType($r('app.string.avatar'), 223, $r('app.media.P5')),
    new photoType($r('app.string.address'), 125, $r('app.media.P6')),
    new photoType($r('app.string.category'), 234, $r('app.media.P7')),
    new photoType($r('app.string.pictureType'), 22, $r('app.media.P8')),
  ]
  @State columnsTemplate: string = '1fr 1fr 1fr'
  @Link @Watch('onStateChange') sideBarStatus: boolean
  @LocalStorageProp('currentBreakPoint') currentBreakPoint: string = 'sm'

  aboutToAppear() {
    this.columnsTemplate = this.currentBreakPoint === 'sm' ? '1fr 1fr 1fr 1fr' : '1fr 1fr 1fr'
  }

  onStateChange() {
    animateTo({ duration: 300 }, () => {
      if (this.sideBarStatus === true && this.currentBreakPoint !== 'sm') {
        this.columnsTemplate = '1fr 1fr 1fr'
      } else {
        this.columnsTemplate = '1fr 1fr 1fr 1fr'
      }
    })
  }

  build() {
    Column() {
      Row() {
        Text($r('app.string.album')).fontSize(20).fontWeight(FontWeight.Medium)
          .margin({ left: this.sideBarStatus ? 0 : 36 })
        Blank()
        Image($r('app.media.add')).width(24).aspectRatio(1)
        Image($r('app.media.more')).width(24).aspectRatio(1).margin({ left: 24 })
      }.height(56).width('100%')

      Grid() {
        ForEach(this.photoList, (item: photoType) => {
          GridItem() {
            Column() {
              Image(item.src).width('100%').aspectRatio(1).borderRadius(12)
              Column() {
                Text(item.name).margin({ top: 8 }).fontSize(14).fontWeight(FontWeight.Regular)
                Text(item.count.toString()).fontSize(12).fontWeight(FontWeight.Regular)
              }.width('100%').alignItems(HorizontalAlign.Start).padding({ left: 8, right: 8 })
            }
          }
        })
      }.columnsTemplate(this.columnsTemplate)
      .columnsGap(22)
      .rowsGap(17)
      .margin({ top: 7 })
    }.padding({ left: 24, right: 18 })
  }
}