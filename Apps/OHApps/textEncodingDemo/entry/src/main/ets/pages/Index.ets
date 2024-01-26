/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import { TextEncoder,TextDecoder } from 'text-encoding';
@Entry
@Component
struct Index {
  scroller: Scroller = new Scroller()
  @State message: string = '点我'
  @State encode: string = '0'
  @State deco: string = '0'
  build() {
    Stack({ alignContent: Alignment.TopStart }) {
      Scroll(this.scroller) {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(()=>{
            let content:string = 'ABCDEFGHIJKabcdefj123456+/AA==!@';

            let uInt8:Uint8Array = new TextEncoder().encode(content)
            this.encode = uInt8.toString()
            this.deco = new TextDecoder().decode(uInt8)
          })

        Text("TextEncoder: "+ this.encode)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)

        Text("TextDecoder: "+ this.deco)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)

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
    .height('100%')
  }
}