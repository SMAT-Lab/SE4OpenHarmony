/*
* Copyright (c) 2023 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License")
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

import router from '@ohos.router';

@Entry
@Component
struct Mouse {
  @State message: string = 'Hello World'
  private scroller: Scroller = new Scroller()
  private arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18.19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
  @State count: number = 0;
  @State hoverText: string = 'jump'
  @State hoverMsg: string = 'hoverText'

  build() {
    Row() {
      Column() {
        Button() {
          Text(this.hoverMsg)
            .id("hoverText")
            .fontSize(25)
            .fontWeight(FontWeight.Bold)
        }
        .id("hover_bt")
        .onHover((isHover: boolean) => {
          if (isHover) {
            this.hoverMsg = 'hover'
          }
        })

        Button() {
          Text(this.hoverText)
            .id("mouse_test_result")
            .fontSize(25)
            .fontWeight(FontWeight.Bold)
        }
        .id("mouse_test")
        .type(ButtonType.Capsule)
        .margin({ top: 20 })
        .onHover((isHover: boolean) => {
          if (isHover) {
            this.hoverText = 'hover'
          }
        })
        .onMouse((event: MouseEvent) => {
          switch (event.button) {
            case MouseButton.Left:
              this.hoverText = 'left'
              break
            case MouseButton.Right:
              this.hoverText = 'right'
              break
            case MouseButton.Middle:
              this.hoverText = 'middle'
              break
          }
        })

        Column() {
          Scroll(this.scroller) {
            Flex({ direction: FlexDirection.Column }) {
              ForEach(this.arr, (item: number) => {
                Row() {
                  Text(item.toString())
                    .width('90%')
                    .height(100)
                    .id("scroll_item")
                    .backgroundColor('#3366CC')
                    .borderRadius(15)
                    .fontSize(16)
                    .textAlign(TextAlign.Center)
                    .margin({ top: 5 })
                }
              }, (item: string) => item)
            }.margin({ right: 10 })
          }.id("scroll_test")
          .scrollBar(BarState.Off)
          .scrollable(ScrollDirection.Vertical)
        }.height("300").width("100%")
      }
      .width('100%').height("100%").alignItems(HorizontalAlign.Start).backgroundColor("#800000")
    }
    .height('100%').backgroundColor("#FF3333")
  }
}