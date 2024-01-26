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
 
 import CommonConstants from '../common/constants/CommonConstants'
import NoteInfo from '../common/bean/NoteInfo'
import { DetailTitle } from '../view/DetailTitle'

@Entry
@Component
struct PageDetail {
  @State noteInfo: NoteInfo  = { // 笔记信息
    id: 1,
    title: "",
    content: "",
    date: "",
    imageArr: ''
  }

  build() {
    Column() {
      DetailTitle({
        back: () => {
          // todo 跳转到编辑页面
        },
        edit: () => {
          // todo 跳转到编辑页面
        }
      })
      Scroll() {
        Column() {
          Text(this.noteInfo.date + " | " + (this.noteInfo.content.length) + '字')
            .margin({
              top: 34
            })
            .fontColor($r('app.color.black_40'))
            .fontSize(CommonConstants.FONT_SIZE_17)

          Text(this.noteInfo.title.length == 0 ? '暂无标题' : this.noteInfo.title)
            .margin({
              top: 29
            })
            .fontColor(this.noteInfo.title.length == 0 ? $r('app.color.black_40') : $r('app.color.black'))
            .fontSize(CommonConstants.FONT_SIZE_29)

          Text(this.noteInfo.content)
            .margin({
              top: 35, bottom: 10
            })
            .fontSize(CommonConstants.FONT_SIZE_19)
          List({ space: 10, initialIndex: 0 }) {
            ForEach(this.noteInfo.imageArr.length > 5 ? JSON.parse(this.noteInfo.imageArr) : [""], (item) => {
              ListItem() {
                Image(item)
                  .width(CommonConstants.FULL_WIDTH)
              }
            })
          }
          .width(CommonConstants.FULL_WIDTH)
          .height(CommonConstants.FULL_HEIGHT)
          .enabled(false)
        }
        .alignItems(HorizontalAlign.Start)
      }.scrollable(ScrollDirection.Vertical)
      .layoutWeight(1)
      .scrollBar(BarState.Off)
    }
    .width(CommonConstants.FULL_WIDTH)
    .height(CommonConstants.FULL_HEIGHT)
    .padding({ left: CommonConstants.MARGIN_2, right: CommonConstants.MARGIN_1 })
    .backgroundColor($r('app.color.background'))
  }
}