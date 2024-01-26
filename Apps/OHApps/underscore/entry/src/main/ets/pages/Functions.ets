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

import { delay, once, after, compose } from 'underscore'

@Entry
@Component
struct Utility {
  @State delayResult: string = ''
  @State onceResult: string = ''
  @State afterResult: string = ''
  @State composeResult: string = ''

  build() {
    Column() {
      Button('Click', { type: ButtonType.Capsule, stateEffect: true })
        .backgroundColor(0x317aff)
        .width('50%')
        .height(60)
        .margin({ bottom: 30, top: 50 })
        .onClick(() => {
          let delayed: boolean = false;
          this.delayResult = delay(() => {
            delayed = true;
          }, 100);
        })

      Column() {
        Text('delay 从零开始，每次值 +1')
          .fontSize(20)
          .margin({ bottom: 10 })
        Text('delay: ' + this.delayResult)
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
          let num: number = 0;
          let increment: ESObject = once(() => {
            return ++num;
          })
          this.onceResult = increment(); //1

          let testAfter = (afterAmount: ESObject, timesCalled: ESObject) => {
            let afterCalled = 0;
            let after1: ESObject = after(afterAmount, () => {
              afterCalled++;
            });
            while (timesCalled--) after1();
            return afterCalled;
          };
          this.afterResult = testAfter(5, 5).toString() //1

          let greet = (name: ESObject) => {
            return "hi: " + name;
          };
          let exclaim = (statement: ESObject) => {
            return statement.toUpperCase() + "!";
          };
          let welcome: ESObject = compose(greet, exclaim);
          this.composeResult = welcome('moe'); //'hi: MOE!
        })

      Column() {
        Text('function：once(() => {})')
          .fontSize(20)
          .margin({ bottom: 10 })
        Text('once: ' + this.onceResult)
          .fontSize(25)
          .margin({ bottom: 30 })

        Text('function：after(afterAmount, () => {})')
          .fontSize(20)
          .margin({ bottom: 10 })
        Text('after: ' + this.afterResult)
          .fontSize(25)
          .margin({ bottom: 30 })

        Text('function：compose(a, b)')
          .fontSize(20)
          .margin({ bottom: 10 })
        Text('compose: ' + this.composeResult)
          .fontSize(25)
          .margin({ bottom: 30 })
      }
      .width('100%')
      .alignItems(HorizontalAlign.Start)
    }
    .width('100%')
  }
}