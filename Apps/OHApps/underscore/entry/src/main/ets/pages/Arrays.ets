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

import { first, last, union, indexOf, range } from 'underscore'

@Entry
@Component
struct Array {
  @State firstResult: string = ''
  @State lastResult: string = ''
  @State unionResult: string = ''
  @State indexOfResult: string = ''
  @State rangeResult: string = ''

  build() {
    Column () {
      Button('Click', { type: ButtonType.Capsule, stateEffect: true })
        .backgroundColor(0x317aff)
        .width('50%')
        .height(60)
        .margin({ bottom: 30, top: 50 })
        .onClick(() => {
          this.firstResult = first([5, 4, 3, 2, 1]); //5
          this.lastResult = last([5, 4, 3, 2, 1]); //1
          this.unionResult = union([1, 2, 3], [101, 2, 1, 10], [2, 1]); //1,2,3,101,10
          this.indexOfResult = indexOf([1, 2, 3], 2); //1
          this.rangeResult = range(10); //0,1,2,3,4,5,6,7,8,9
        })

      Column() {
        Text('数据：[5, 4, 3, 2, 1]')
          .fontSize(20)
          .margin({ bottom: 10 })
        Text('first: ' + this.firstResult)
          .fontSize(25)
          .margin({ bottom: 10 })
        Text('last: ' + this.lastResult)
          .fontSize(25)
          .margin({ bottom: 30 })

        Text('数据：[1, 2, 3], [101, 2, 1, 10], [2, 1]')
          .fontSize(20)
          .margin({ bottom: 10 })
        Text('union: ' + this.unionResult)
          .fontSize(25)
          .margin({ bottom: 30 })

        Text('数据：[1, 2, 3], 2')
          .fontSize(20)
          .margin({ bottom: 10 })
        Text('indexOf: ' + this.indexOfResult)
          .fontSize(25)
          .margin({ bottom: 30 })

        Text('数据：10')
          .fontSize(20)
          .margin({ bottom: 10 })
        Text('range: ' + this.rangeResult)
          .fontSize(25)
          .margin({ bottom: 30 })
      }
      .width('100%')
      .alignItems(HorizontalAlign.Start)
    }
    .width('100%')
  }
}