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

import { optionList, OptionListType } from '../model/SongList'

@Component
export default struct PlayListCover {
  @State imgHeight: number = 0
  @StorageProp('coverMargin') coverMargin: number = 0
  @StorageProp('currentBreakpoint') currentBreakpoint: string = 'sm'
  @StorageProp('fontSize') fontSize: number = 0

  @Builder
  CoverImage() {
    Stack({ alignContent: Alignment.BottomStart }) {
      Image($r('app.media.pic_album'))
        .width(this.currentBreakpoint == 'sm' ? '120vp' : '170vp')
        .height(this.currentBreakpoint == 'sm' ? '120vp' : '170vp')
        .borderRadius(8)
        .onAreaChange((oldArea: Area, newArea: Area) => {
          this.imgHeight = newArea.height as number
        })
      Text($r('app.string.collection_num'))
        .letterSpacing(1)
        .fontColor('#fff')
        .fontSize(this.fontSize - 4)
        .translate({ x: 10, y: '-100%' })
    }
  }

  @Builder
  CoverIntroduction() {
    Column() {
      Text($r('app.string.list_name'))
        .opacity(0.9)
        .fontWeight(500)
        .fontColor('#556B89')
        .fontSize(this.fontSize + 2)
        .margin({ bottom: 10 })

      Text($r('app.string.playlist_Introduction'))
        .opacity(0.6)
        .width('170vp')
        .fontWeight(400)
        .fontColor('#556B89')
        .fontSize(this.fontSize - 2)
    }
    .width('100%')
    .height(this.currentBreakpoint === 'sm' ? this.imgHeight : 70)
    .alignItems(HorizontalAlign.Start)
    .justifyContent(FlexAlign.Center)
    .padding({ left: this.currentBreakpoint === 'sm' ? 20 : 0 })
    .margin({
      top: this.currentBreakpoint === 'sm' ? 0 : 50,
      bottom: this.currentBreakpoint === 'sm' ? 0 : 20
    })
  }

  @Builder
  CoverOptions() {
    Flex({ justifyContent: FlexAlign.SpaceBetween }) {
      ForEach(optionList, (item: OptionListType) => {
        Column({ space: 4 }) {
          Image(item.image).height(30).width(30)
          Text(item.text)
            .fontColor('#556B89')
            .fontSize(this.fontSize - 1)
        }
      })
    }
    .height(70)
    .padding({
      left: this.currentBreakpoint === 'sm' ? 20 : 0,
      right: this.currentBreakpoint === 'sm' ? 20 : 0
    })
  }

  build() {
    if (this.currentBreakpoint === 'sm') {
      Column() {
        GridRow() {
          GridCol({ span: { sm: 4, md: 10 }, offset: { sm: 0, md: 1, lg: 1 } }) {
            this.CoverImage()
          }

          GridCol({ span: { sm: 8, md: 10 }, offset: { sm: 0, md: 2, lg: 2 } }) {
            this.CoverIntroduction()
          }

          GridCol({ span: { sm: 12, md: 10 }, offset: { sm: 0, md: 2, lg: 2 } }) {
            this.CoverOptions()
          }.padding({
            top: this.currentBreakpoint === 'sm' ? 15 : 0,
            bottom: this.currentBreakpoint === 'sm' ? 15 : 0
          })
        }
        .margin({ left: this.coverMargin, right: this.coverMargin })
        .padding({ top: this.currentBreakpoint === 'sm' ? 50 : 70 })
      }
    } else {
      Column() {
        GridRow() {
          GridCol({ span: { sm: 4, md: 10 }, offset: { sm: 0, md: 1, lg: 1 } }) {
            this.CoverImage()
          }

          GridCol({ span: { sm: 8, md: 10 }, offset: { sm: 0, md: 2, lg: 2 } }) {
            this.CoverIntroduction()
          }

          GridCol({ span: { sm: 12, md: 10 }, offset: { sm: 0, md: 2, lg: 2 } }) {
            this.CoverOptions()
          }.margin({
            top: this.currentBreakpoint === 'sm' ? 15 : 60,
            bottom: this.currentBreakpoint === 'sm' ? 15 : 0
          })
        }
        .margin({ left: this.coverMargin, right: this.coverMargin })
        .padding({ top: this.currentBreakpoint === 'sm' ? 50 : 70 })
      }
      .height('100%')
    }
  }
}