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

import { DataModel, BookModel }  from '../model/DataModel'
import TitleBar from '../common/TitleBar'
import { MainPage } from '@ohos/search'

@Entry
@Component
struct Index {
  @State changeValue: string = ''
  @State books: BookModel[] = new DataModel().getAllData()
  private controller: SearchController = new SearchController()

  @Builder
  BookItem(image: Resource, title: string, introduction: string) {
    Row() {
      Image(image)
        .width(80)
        .height(120)
      Column() {
        Text(title)
          .fontColor(Color.Black)
          .fontSize(25)
        Text(introduction)
          .fontColor(Color.Gray)
          .fontSize(25)
      }
      .layoutWeight(1)
      .margin({ left: 10 })
      .alignItems(HorizontalAlign.Start)
    }
    .padding(10)
    .margin({ left: 10, right: 10 })
    .backgroundColor(Color.White)
    .borderRadius(10)
  }

  build() {
    Column() {
      TitleBar()
      MainPage({ textInfo: $changeValue, customizeFunction: () => {
        this.books = new DataModel().query(this.changeValue)
      } })
      List({ space: 10 }) {
        ForEach(this.books, (item: BookModel) => {
          ListItem() {
            this.BookItem(item.image, item.title, item.introduction)
          }
        }, (item: BookModel) => item.title)
      }
      .width('100%')
      .height('100%')
      .layoutWeight(1)
      .margin({ bottom: 20 })
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F5F5')
  }
}