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
import router from '@ohos.router';

function routerfun(url: string) {
  let options: router.RouterOptions = {
    url: url
  }
  router.pushUrl(options)
}

@Entry
@Component
struct Index {
  scroller: Scroller = new Scroller()
  @State message: string = 'mathjs test'
  @State crcalc: string = 'crcalc test'
  @State ejmlMatrix: string = 'ejmlMatrix test'
  @State ejmlMathjs: string = 'ejmlMathjs test'
  @State jafama: string = 'jafama test'

  build() {
    Scroll(this.scroller) {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)

        Text(this.crcalc)
          .fontSize(16)
          .padding(8)
          .margin({ top: 32 })
          .fontWeight(FontWeight.Bold)
          .border({ width: 2, color: '#535353', radius: 6 })
          .onClick(() => {
            try {
              routerfun('crcalc/crcalc')
            } catch (err) {
              console.log('errerrcrcalc ' + err)
            }
          })

        Text(this.ejmlMatrix)
          .fontSize(16)
          .padding(8)
          .margin({ top: 32 })
          .fontWeight(FontWeight.Bold)
          .border({ width: 2, color: '#535353', radius: 6 })
          .onClick(() => {
            try {
              routerfun('ejml/ejml')
            } catch (err) {
              console.log('errerrejml ' + err)
            }
          })

        Text(this.ejmlMathjs)
          .fontSize(20)
          .padding(8)
          .margin({ top: 32 })
          .fontWeight(FontWeight.Bold)
          .border({ width: 2, color: '#535353', radius: 6 })
          .onClick(() => {
            try {
              routerfun('ejml/ejmlMathjs')
            } catch (err) {
              console.log('errerrejmlMathjs ' + err)
            }
          })

        Text(this.jafama)
          .fontSize(16)
          .padding(8)
          .margin({ top: 32 })
          .fontWeight(FontWeight.Bold)
          .border({ width: 2, color: '#535353', radius: 6 })
          .onClick(() => {
            try {
              routerfun('jafama/jafama')
            } catch (err) {
              console.log('errerrjafama ' + err)
            }
          })

        Text(this.message)
          .fontSize(16)
          .padding(8)
          .margin({ top: 32 })
          .fontWeight(FontWeight.Bold)
          .border({ width: 2, color: '#535353', radius: 6 })
          .onClick(() => {
            try {
              routerfun('mathjs/mathjs')
            } catch (err) {
              console.log('errerrmathjs ' + err)
            }
          })


      }
      .width('100%')
    }
    .scrollable(ScrollDirection.Vertical)
    .scrollBar(BarState.On)
    .scrollBarColor(Color.Gray)
    .scrollBarWidth(30)
    .onScroll((xOffset: number, yOffset: number) => {
      console.info(xOffset + ' ' + yOffset)
    })
    .onScrollEdge((side: Edge) => {
      console.info('To the edge')
    })
    .onScrollEnd(() => {
      console.info('Scroll Stop')
    })
  }
}