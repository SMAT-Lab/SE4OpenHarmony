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

import { random, escape, now } from 'underscore'

@Entry
@Component
struct Utility {
  @State randomResult: string = ''
  @State nowResult: string = ''
  @State escapeResult: string = ''

  build() {
    Column () {
      Button('Click', { type: ButtonType.Capsule, stateEffect: true })
        .backgroundColor(0x317aff)
        .width('50%')
        .height(60)
        .margin({ bottom: 30, top: 50 })
        .onClick(() => {
          this.randomResult = random(0, 100);
          this.nowResult = now();
        })

      Column() {
        Text('随机数范围：0 ~ 100')
          .fontSize(20)
          .margin({ bottom: 10 })
        Text('random: ' + this.randomResult)
          .fontSize(25)
          .margin({ bottom: 20 })

        Text('时间戳')
          .fontSize(20)
          .margin({ bottom: 10 })
        Text('now: ' + this.nowResult)
          .fontSize(25)
          .margin({ bottom: 50 })
      }
      .width('100%')
      .alignItems(HorizontalAlign.Start)

      Button('Click', { type: ButtonType.Capsule, stateEffect: true })
        .backgroundColor(0x317aff)
        .width('50%')
        .height(60)
        .margin({ bottom: 30, top: 50 })
        .onClick(() => {
          this.escapeResult = escape('Curly, Larry &amp; Moe'); //Curly, Larry &amp;amp; Moe
        })

      Column() {
        Text('数据：Curly, Larry &amp; Moe')
          .fontSize(20)
          .margin({ bottom: 10 })
        Text('escape: ' + this.escapeResult)
          .fontSize(25)
          .margin({ bottom: 30 })
      }
      .width('100%')
      .alignItems(HorizontalAlign.Start)
    }
    .width('100%')
  }
}