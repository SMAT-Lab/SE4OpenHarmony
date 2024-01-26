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
struct Swipe {
  @State message: string = 'Hello World Swipe'
  private swiperController: SwiperController = new SwiperController()
  private result = ["jsunit", "uitest", "arkUI", "tdd"]
  private scroller: Scroller = new Scroller()
  private arr: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  // private data: MyDataSource = new MyDataSource([])
  build() {
    Row() {
      Column() {
        Button() {
          Text('next page')
            .fontSize(25)
            .fontWeight(FontWeight.Bold)
        }

        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .id("swiper_text")
        Swiper(this.swiperController) {
          ForEach(this.result, (item: string) => {
            Text(item)
              .width('90%')
              .height(160)
              .backgroundColor(0xAFEEEE)
              .textAlign(TextAlign.Center)
              .fontSize(30)
          }, (item: string) => item)
        }
        .id("swiper")
        .cachedCount(2)
        .index(0)
        .autoPlay(false)
        .interval(4000)
        .indicator(true)
        .loop(true)
        .duration(500)
        .itemSpace(0)
        .curve(Curve.Linear)
        .onChange((index: number) => {
          this.message = this.result[index];
          console.info(index.toString())
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

        Column() {
          List({ space: 20, initialIndex: 0 }) {
            ForEach(this.arr, (item: number) => {
              ListItem() {
                Text('' + item)
                  .width('100%')
                  .height(100)
                  .fontSize(16)
                  .textAlign(TextAlign.Center)
                  .borderRadius(10)
                  .backgroundColor("#CC0000")
              }
            }, (item: string) => item)
          }
          .listDirection(Axis.Vertical) // 排列方向
          .divider({ strokeWidth: 2, color: 0xFFFFFF, startMargin: 20, endMargin: 20 }) // 每行之间的分界线
          .edgeEffect(EdgeEffect.None) // 滑动到边缘无效果
          .chainAnimation(false) // 联动特效关闭
          .onScrollIndex((firstIndex: number, lastIndex: number) => {
            console.info('first' + firstIndex)
            console.info('last' + lastIndex)
          })
        }.height("300").width("100%").backgroundColor("#99FF33")
      }
      .width('100%')
    }.alignItems(VerticalAlign.Top)
    .height('100%')
  }
}