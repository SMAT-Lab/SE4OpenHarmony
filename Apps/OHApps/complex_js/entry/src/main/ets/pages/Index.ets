/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { Complex } from "complex.js"

@Entry
@Component
struct Index {
  @State result: string = '';

  build() {
    Row() {
      Column() {
        Text('new Complex("99.3+8i").mul({re: 3, im: 9}).div(4.9).sub(3, 2)')
          .fontSize(30)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            let c = new Complex("99.3+8i");
            let r = c.mul({re: 3, im: 9}).div(4.9).sub(3, 2);
            this.result = r.toString();
          })
        Text("结果："+this.result)
          .margin({top: 15})
          .fontSize(30)
      }
      .width('100%')
    }
    .height('100%')
  }
}