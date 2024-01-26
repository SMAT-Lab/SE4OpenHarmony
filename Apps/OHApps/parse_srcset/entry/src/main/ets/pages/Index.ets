/**
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import * as parseSrcset from 'parse-srcset'
@Entry
@Component
struct Index {
  @State message: string = 'Test'
  @State public result: string = ''
  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
        Button('parse')
          .width('90%')
          .height(50)
          .margin({
            bottom: 10
          })
          .onClick(() => {
            this.parseClick()
          })
        Text("结果 :" + this.result)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .margin({ top: "30px" })
      }
      .width('100%')
    }
    .height('100%')
  }
  parseClick(){
    this.result = JSON.stringify(parseSrcset('&#x9;&#x9;data:,a&#x9;&#x9;1x&#x9;&#x9'));
  }
}