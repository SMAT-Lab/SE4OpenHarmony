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

@Component
export struct NotebookItem {
  @State selectId: number = -1; // 选中笔记项ID
  @State noteInfo: NoteInfo = { // 笔记信息
    id: 1,
    title: "",
    content: "",
    date: "",
    imageArr: ""
  }
  delete: (id) => void;
  click: (id) => void

  build() {
    Stack() {
      Column() {
        Image(this.noteInfo.imageArr.length > 5 ? JSON.parse(this.noteInfo.imageArr)[0] : "")
          .width(48)
          .height(48)
          .position({ x: 0, y: 7 })
          .visibility(this.noteInfo.imageArr.length > 5 ? Visibility.Visible : Visibility.None)

        Text(this.noteInfo.title.length == 0 ? '暂无标题' : this.noteInfo.title)
          .fontSize(CommonConstants.FONT_SIZE_19)
          .margin({ left: this.noteInfo.imageArr.length > 5 ? 48 + 19 : 0 })
          .maxLines(1)

        Row() {
          Image($r("app.media.icon_time"))
            .width(19)
            .height(19)
          Text(this.noteInfo.date.substr(5, 5) + ' | ' + this.noteInfo.content)
            .fontSize(CommonConstants.FONT_SIZE_19)
            .fontColor($r('app.color.black_40'))
            .margin({ left: 8, right: 12 })
            .maxLines(1)
        }
        .width(CommonConstants.FULL_WIDTH)
        .margin({ bottom: 4, left: this.noteInfo.imageArr.length > 5 ? 48 + 19 : 0 })
      }
      .padding(23)
      .backgroundColor($r('app.color.item_bg'))
      .width(CommonConstants.FULL_WIDTH)
      .alignItems(HorizontalAlign.Start)
      .justifyContent(FlexAlign.SpaceBetween)
      .borderRadius(12)
      .height(108)
      .onClick((e) => {
        this.click(this.noteInfo.id)
      })

      // 删除按钮
      Row() {
        Image($r('app.media.icon_delete_white'))
          .width(28)
          .height(28)
      }
      .borderRadius({ topRight: 12, bottomRight: 12 })
      .width(58)
      .height(108)
      .padding({ left: 15, right: 15, top: 40, bottom: 40 })
      .backgroundColor($r('app.color.delete_bg'))
      .visibility(this.selectId == this.noteInfo.id ? Visibility.Visible : Visibility.None)
      .onClick((e) => {
        this.delete(this.noteInfo.id)
        this.selectId = -1
      })
    }
    .height(108)
    .width(CommonConstants.FULL_WIDTH)
    .margin({ bottom: 14 })
    .alignContent(Alignment.TopEnd)
    .gesture(
      //水平侧滑事件
      PanGesture({ distance: 20, direction: PanDirection.Horizontal })
        .onActionUpdate((event: GestureEvent) => {
          if (event.offsetX < -20) {
            this.selectId = this.noteInfo.id
          } else {
            this.selectId = -1
          }
        })
    )
  }
}