/*
 * MIT License
 *
 * Copyright (C) 2024 Huawei Device Co., Ltd.
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

import seedrandom from 'seedrandom'

@Entry
@Component
struct Index {
  @State value1: string = ''
  @State value2: string = ''
  @State value3: string = ''
  @State value4: string = ''
  @State value5: string = ''

  build() {
    Column () {
      Button('Click', { type: ButtonType.Capsule, stateEffect: true })
        .backgroundColor(0x317aff)
        .width('50%')
        .height(60)
        .margin({ bottom: 30, top: 50 })
        .onClick(() => {
          let rng1: ESObject = seedrandom('hello.');
          this.value1 = rng1();

          let rng2: ESObject = seedrandom('hello.', { global: true });
          this.value2 = Math.random().toString()

          let rng3: ESObject = seedrandom();
          this.value3 = rng3();

          let rng4: ESObject = seedrandom('added entropy.', { entropy: true });
          this.value4 = rng4();

          let rng5: ESObject = seedrandom.xor4096('hello.');
          this.value5 = rng5();
        })

      Column() {
        Text("种子值: 'hello.'")
          .fontSize(20)
          .margin({ bottom: 10 })
        Text("随机数序列: " +this.value1)
          .fontSize(20)
          .margin({ bottom: 20 })

        Text("种子值: 'hello.', { global: true }")
          .fontSize(20)
          .margin({ bottom: 10 })
        Text("random随机数: " +this.value2)
          .fontSize(20)
          .margin({ bottom: 20 })

        Text("种子值: ' '")
          .fontSize(20)
          .margin({ bottom: 10 })
        Text("随机数序列: " +this.value3)
          .fontSize(20)
          .margin({ bottom: 20 })

        Text("种子值: 'added entropy.', { entropy: true }")
          .fontSize(20)
          .margin({ bottom: 10 })
        Text("随机数序列: " +this.value4)
          .fontSize(20)
          .margin({ bottom: 20 })

        Text("PRNG: xor4096; 种子值: 'hello.'")
          .fontSize(20)
          .margin({ bottom: 10 })
        Text("随机数序列:" +this.value5)
          .fontSize(20)
          .margin({ bottom: 20 })
      }
      .width('100%')
      .alignItems(HorizontalAlign.Start)
    }
    .width('100%')
  }
}