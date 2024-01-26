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


@Entry
@Component
struct ScrollExample {
  scroller: Scroller = new Scroller();
  private arr: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  private ListArr: String[] = ["test1", "test2", "test3", "test4", "test5", "test6", "test7", "test8", "test9", "test10", "test11"];

  build() {
    Row() {
      Column() {
        Stack({ alignContent: Alignment.TopStart }) {
          Scroll(this.scroller) {
            Column() {
              ForEach(this.arr, (item: number) => {
                Text(item.toString())
                  .width('90%')
                  .height(50)
                  .backgroundColor(0xFFFFFF)
                  .borderRadius(15)
                  .fontSize(16)
                  .textAlign(TextAlign.Center)
                  .margin({ top: 10 })
                  .id("scroller_item_text")
              }, (item: string) => item)
            }.width('100%')
          }
          .id("scroll_test")
          .scrollable(ScrollDirection.Vertical) // 滚动方向纵向
          .scrollBar(BarState.On) // 滚动条常驻显示
          .scrollBarColor(Color.Gray) // 滚动条颜色
          .scrollBarWidth(30) // 滚动条宽度
          .edgeEffect(EdgeEffect.None)
          .onScroll((xOffset: number, yOffset: number) => {
            console.info(xOffset + ' ' + yOffset);
          })
          .onScrollEdge((side: Edge) => {
            console.info('To the edge');
          })
          .onScrollEnd(() => {
            console.info('Scroll Stop');
          })

          Button('scroll 150')
            .onClick(() => { // 点击后下滑指定距离150.0vp
              this.scroller.scrollBy(0, 150);
            })
            .margin({ top: 10, left: 20 })
          Button('back top')
            .onClick(() => { // 点击后回到顶部
              this.scroller.scrollEdge(Edge.Top);
            })
            .margin({ top: 110, left: 20 })
          Button('next page')
            .onClick(() => { // 点击后滑到下一页
              this.scroller.scrollPage({ next: true });
            })
            .margin({ top: 170, left: 20 })
        }.width('100%').height('30%').backgroundColor(0xDCDCDC)

        Stack({ alignContent: Alignment.TopStart }) {
          List({ space: 20, initialIndex: 0 }) {
            ForEach(this.ListArr, (item: string) => {
              ListItem() {
                Text('' + item)
                  .id("list_item_text")
                  .width('100%')
                  .height(100)
                  .fontSize(16)
                  .textAlign(TextAlign.Center)
                  .borderRadius(10)
                  .backgroundColor(0xFFFFFF)
              }
            }, (item: string) => item)
          }

          Button('scroll 150')
            .onClick(() => { // 点击后下滑指定距离150.0vp
              this.scroller.scrollBy(0, 150);
            })
            .margin({ top: 10, left: 20 })
          Button('back top')
            .onClick(() => { // 点击后回到顶部
              this.scroller.scrollEdge(Edge.Top);
            })
            .margin({ top: 110, left: 20 })
          Button('next page')
            .onClick(() => { // 点击后滑到下一页
              this.scroller.scrollPage({ next: true });
            })
            .margin({ top: 170, left: 20 })
        }.width('100%').height('30%').backgroundColor(0xDCDCDC)
      }
    }.height("100%").alignItems(VerticalAlign.Top)
  }
}
