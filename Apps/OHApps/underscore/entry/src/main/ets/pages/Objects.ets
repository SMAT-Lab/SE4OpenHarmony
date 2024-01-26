/*
 * MIT License
 *
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

import { keys, values, pairs, extend, clone } from 'underscore'

@Entry
@Component
struct Objects {
  @State keysResult: string = ''
  @State valuesResult: string = ''
  @State pairsResult: string = ''
  @State extendResult: string = ''
  @State cloneResult: string = ''

  build() {
    Column() {
      Button('Click', { type: ButtonType.Capsule, stateEffect: true })
        .backgroundColor(0x317aff)
        .width('50%')
        .height(60)
        .margin({ bottom: 30, top: 50 })
        .onClick(() => {
          this.keysResult = keys({ one: 1, two: 2, three: 3 }); //one,two,three
          this.valuesResult = values({ one: 1, two: 2, three: 3 }); //1,2,3
          this.pairsResult = pairs({ one: 1, two: 2, three: 3 }); //one,1,two,2,three,3
          this.extendResult = extend({}, { a: 'b' }).a; //b
          this.cloneResult = clone({ name: 'moe' }).name; //moe
        })

      Column() {
        Text('数据：{ one: 1, two: 2, three: 3 }')
          .fontSize(20)
          .margin({ bottom: 10 })
        Text('keys: ' + this.keysResult)
          .fontSize(25)
          .margin({ bottom: 10 })
        Text('values: ' + this.valuesResult)
          .fontSize(25)
          .margin({ bottom: 10 })
        Text('pairs: ' + this.pairsResult)
          .fontSize(25)
          .margin({ bottom: 30 })

        Text('数据：{}, { a: b }')
          .fontSize(20)
          .margin({ bottom: 10 })
        Text('extend: ' + this.extendResult)
          .fontSize(25)
          .margin({ bottom: 30 })

        Text('数据：{ name: moe }')
          .fontSize(20)
          .margin({ bottom: 10 })
        Text('clone: ' + this.cloneResult)
          .fontSize(25)
          .margin({ bottom: 30 })
      }
      .width('100%')
      .alignItems(HorizontalAlign.Start)
    }
    .width('100%')
  }
}