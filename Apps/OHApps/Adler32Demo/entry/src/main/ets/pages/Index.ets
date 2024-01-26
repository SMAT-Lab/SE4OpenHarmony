/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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

import adler32 from 'adler-32'

@Entry
@Component
struct Index {
  @State btrBtn: string = 'byte数组输入'
  @State utrBtn: string = 'ucs-2字符串输入'
  @State strBtn: string = 'js正常字符串（utf-8）输入'
  @State vtrBtn: string = '获取adler32js版本号'
  @State message: string = ''

  build() {
    Row() {
      Column() {
        Text("输出结果："+this.message)
          .fontSize(13)
          .fontWeight(FontWeight.Bold)
          .margin({ bottom: 50 })
        Text(this.btrBtn)
          .width('90%')
          .height(50)
          .backgroundColor(0xEEEEEE)
          .borderRadius(15)
          .fontSize(13)
          .textAlign(TextAlign.Center)
          .margin({ top: 10 })
          .onClick(() => {
            let pam = [
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,

              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,

              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,

              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,

              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 8, 9, 10,
              1, 2, 4, 5, 6, 7, 0, 0
            ];
            let result = adler32.buf(pam)
            this.message = result + "";
          })
        Text(this.utrBtn)
          .width('90%')
          .height(50)
          .backgroundColor(0xEEEEEE)
          .borderRadius(15)
          .fontSize(13)
          .textAlign(TextAlign.Center)
          .margin({ top: 10 })
          .onClick(() => {
            let pam = "SheetJS";
            let result = adler32.bstr(pam)

            let s = adler32.buf([83, 104]);// 17825980  "Sh"
            s = adler32.str("eet", s);  // 95486458  "Sheet"
            result=adler32.bstr("JS", s );

            this.message = result + "";
          })

        Text(this.strBtn)
          .width('90%')
          .height(50)
          .backgroundColor(0xEEEEEE)
          .borderRadius(15)
          .fontSize(13)
          .textAlign(TextAlign.Center)
          .margin({ top: 10 })
          .onClick(() => {
            let par = "foo bar baz٪☃🍣";
            let result = adler32.str(par);
            this.message = result + "";
          })

        Text(this.vtrBtn)
          .width('90%')
          .height(50)
          .backgroundColor(0xEEEEEE)
          .borderRadius(15)
          .fontSize(13)
          .textAlign(TextAlign.Center)
          .margin({ top: 10 })
          .onClick(() => {
            this.message =adler32.version;
          })
      }
      .width('100%')
    }
    .height('100%')
  }
}