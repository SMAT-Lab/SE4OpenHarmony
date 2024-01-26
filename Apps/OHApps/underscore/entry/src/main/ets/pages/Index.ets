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

import router from '@ohos.router'

@Entry
@Component
struct Index {

  build() {
    Row() {
      Column() {
        Button('Collection Test').backgroundColor(0x2788D9)
          .onClick((event: ClickEvent) => {
            let path = 'pages/Collections'
            router.pushUrl({
              url: path,
            });
          }).margin(5).width(200);
        Button('Arrays Test').backgroundColor(0x2788D9)
          .onClick((event: ClickEvent) => {
            let path = 'pages/Arrays'
            router.pushUrl({
              url: path,
            });
          }).margin(5).width(200);
        Button('Functions Test').backgroundColor(0x2788D9)
          .onClick((event: ClickEvent) => {
            let path = 'pages/Functions'
            router.pushUrl({
              url: path,
            });
          }).margin(5).width(200);
        Button('Objects Test').backgroundColor(0x2788D9)
          .onClick((event: ClickEvent) => {
            let path = 'pages/Objects'
            router.pushUrl({
              url: path,
            });
          }).margin(5).width(200);
        Button('Utility Test').backgroundColor(0x2788D9)
          .onClick((event: ClickEvent) => {
            let path = 'pages/Utility'
            router.pushUrl({
              url: path,
            });
          }).margin(5).width(200);
        Button('Chaining Test').backgroundColor(0x2788D9)
          .onClick((event: ClickEvent) => {
            let path = 'pages/Chaining'
            router.pushUrl({
              url: path,
            });
          }).margin(5).width(200);
      }
      .width('100%')
    }
    .height('100%')
  }
}