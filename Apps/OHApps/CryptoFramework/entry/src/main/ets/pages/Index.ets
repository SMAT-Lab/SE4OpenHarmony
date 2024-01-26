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

import { Encrypt } from '../tab/Encrypt'
import { Decrypt } from '../tab/Decrypt'
import { Sign } from '../tab/Sign'
import { Verify } from '../tab/Verify'

@Entry
@Component
struct Index {
  @State fontColor: string = '#182431'
  @State selectedFontColor: string = '#007DFF'
  @State currentIndex: number = 0
  private controller: TabsController = new TabsController()

  @Builder TabBuilder(index: number, name: Resource) {
    Column() {
      Text(name)
        .id(index.toString())
        .fontColor(this.currentIndex === index ? this.selectedFontColor : this.fontColor)
        .fontSize(16)
        .fontWeight(this.currentIndex === index ? 500 : 400)
        .lineHeight(22)
        .textAlign(TextAlign.Center)
        .margin({ top: 18, left: 8, right: 8 })
      Divider()
        .strokeWidth(2)
        .color('#007DFF')
        .width('32vp')
        .opacity(this.currentIndex === index ? 1 : 0)
        .margin({ bottom: 8 })
    }
  }

  build() {
    Column() {
      Text($r('app.string.module_desc'))
        .fontSize(24)
        .fontWeight(700)
        .textAlign(TextAlign.Start)
        .margin({ left: 24, right: 24, bottom: 11, top: 12 })
        .fontColor('#182431')
        .lineHeight(33)
        .alignSelf(ItemAlign.Start)

      Tabs({ barPosition: BarPosition.Start, controller: this.controller }) {
        TabContent() {
          Encrypt()
        }.tabBar(this.TabBuilder(0, $r('app.string.encrypt')))

        TabContent() {
          Decrypt()
        }.tabBar(this.TabBuilder(1, $r('app.string.decrypt')))

        TabContent() {
          Sign()
        }.tabBar(this.TabBuilder(2, $r('app.string.sign')))

        TabContent() {
          Verify();
        }.tabBar(this.TabBuilder(3, $r('app.string.verify')))
      }
      .vertical(false)
      .barMode(BarMode.Fixed)
      .barWidth(360)
      .barHeight(56)
      .animationDuration(400)
      .onChange((index: number) => {
        this.currentIndex = index
      })
      .backgroundColor('#F1F3F5')
    }.width('100%')
    .height('100%')
  }
}
