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
import { IndexTitle } from '../view/Title'
import { NotebookItem } from '../view/NotebookItem'

@Entry
@Component
struct Index {
  @State noteInfoList: NoteInfo[] = []; // 笔记信息列表

  build() {
    Column() {
      Column() {
        // 记事本标题
        IndexTitle()

        // 笔记数量
        Text((this.noteInfoList.length + '条笔记'))
          .fontSize(CommonConstants.FONT_SIZE_19)
          .width('100%')
          .fontColor($r('app.color.black_40'))

        // 搜索
        Stack() {
          Image($r("app.media.icon_search"))
            .width(19)
            .height(19)
            .margin({ left: 14 })
          TextInput({
            placeholder: $r('app.string.search')
          })
            .placeholderColor($r('app.color.black_30'))
            .fontSize(CommonConstants.FONT_SIZE_19)
            .padding({
              left: 43
            })
            .backgroundColor($r('app.color.black_3'))
            .height(48)
            .borderRadius(48)
            .width('100%')
            .onChange((search) => {
              // todo 搜索笔记
            })
        }
        .width(CommonConstants.FULL_WIDTH)
        .height(48)
        .borderRadius(48)
        .margin({
          top: 29,
          bottom: 19
        })
        .alignContent(Alignment.Start)

        // 笔记列表
        List({ space: 0, initialIndex: 0 }) {
          ForEach(this.noteInfoList, (item, index) => {
            ListItem() {
              NotebookItem({
                noteInfo: item,
                click: (id) => {
                  // todo 点击笔记，跳转至详情页
                },
                delete: (id) => {
                  // todo 删除笔记
                }
              })
            }
          })
        }
        .width(CommonConstants.FULL_WIDTH)
        .height(CommonConstants.FULL_HEIGHT)
        .layoutWeight(1)
      }
      .width(CommonConstants.FULL_WIDTH)
      .height(CommonConstants.FULL_HEIGHT)
      .padding({ left: CommonConstants.MARGIN_1, right: CommonConstants.MARGIN_1 })
      .backgroundColor($r('app.color.background'))

      // 新增笔记
      Image($r("app.media.icon_add"))
        .width(96)
        .height(96)
        .position({
          x: '60%', y: '80%'
        })
        .onClick(() => {
          // todo 点击按钮，跳转至新增页面
        })
    }
    .width(CommonConstants.FULL_WIDTH)
    .height(CommonConstants.FULL_HEIGHT)
  }

  // 生命周期函数
  aboutToAppear(): void {
    this.refreshData()
  }

  // 生命周期函数
  onPageShow(): void {
    this.refreshData()
  }

  // 查询笔记数据
  refreshData() {
    // todo 查询笔记数据
    // 为了展示页面效果添加的临时数据
    this.noteInfoList = [
      {
        id: 1,
        title: "标题1",
        content: "我是内容1",
        date: "03/20",
        imageArr: ""
      },
      {
        id: 2,
        title: "标题2",
        content: "我是内容2",
        date: "02/21",
        imageArr: ""
      }
    ]
  }
}