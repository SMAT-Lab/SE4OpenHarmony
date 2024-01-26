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

import { each, map, reduce, filter, invoke } from 'underscore'

@Entry
@Component
struct Collections {
  @State eachResult: string = ''
  @State mapResult: string = ''
  @State reduceResult: string = ''
  @State filterResult: string = ''
  @State invokeResult: string = ''

  build() {
    Column() {
      Button('Click', { type: ButtonType.Capsule, stateEffect: true })
        .backgroundColor(0x317aff)
        .width('50%')
        .height(60)
        .margin({ bottom: 30, top: 50 })
        .onClick(() => {
          this.eachResult = each([1, 2, 3], () => {
          }); //1,2,3
          this.mapResult = map([1, 2, 3], (num: ESObject) => {
            return num * 3;
          }); //3,6,9
          this.reduceResult = reduce([1, 2, 3], (memo: ESObject, num: ESObject): ESObject => {
            return memo + num;
          }, 0); //6
          this.filterResult = filter([1, 2, 3, 4, 5, 6], (num: ESObject) => {
            return num % 2 == 0;
          }); //2,4,6
          this.invokeResult = invoke([[5, 1, 7], [3, 2, 1]], 'sort'); //1,5,7,1,2,3
        })

      Column() {
        Text('数据：[1, 2, 3]')
          .fontSize(20)
          .margin({ bottom: 10 })
        Text('each: ' + this.eachResult)
          .fontSize(25)
          .margin({ bottom: 10 })
        Text('map(return num * 3): ' + this.mapResult)
          .fontSize(25)
          .margin({ bottom: 10 })
        Text('reduce(return memo + num): ' + this.reduceResult)
          .fontSize(25)
          .margin({ bottom: 30 })

        Text('数据：[1, 2, 3, 4, 5, 6]')
          .fontSize(20)
          .margin({ bottom: 10 })
        Text('filter(return num % 2 == 0): ' + this.filterResult)
          .fontSize(25)
          .margin({ bottom: 30 })

        Text('数据：[[5, 1, 7], [3, 2, 1]], sort')
          .fontSize(20)
          .margin({ bottom: 10 })
        Text('invoke: ' + this.invokeResult)
          .fontSize(25)
          .margin({ bottom: 30 })
      }
      .width('100%')
      .alignItems(HorizontalAlign.Start)
    }
    .width('100%')
  }
}