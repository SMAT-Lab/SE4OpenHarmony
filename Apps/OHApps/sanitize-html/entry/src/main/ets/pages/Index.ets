/**
 * MIT License
 *
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

import router from '@ohos.router';

@Entry
@Component
struct Index {
  @State message: string = 'Hello World'

  build() {
    Row() {
      Column({ space: 10 }) {
        Button('jump to allowed tag')
          .height('5%')
          .onClick(() => {
            router.push({ url: 'pages/allowed_tags' })
          })

        Button('jump to allowed attributes')
          .height('5%')
          .onClick(() => {
            router.push({ url: 'pages/allowed_attributes' })
          })

        Button('jump to allowed schemes')
          .height('5%')
          .onClick(() => {
            router.push({ url: 'pages/allowed_schemes' })
          })

        Button('jump to allowed schemes by tags')
          .height('5%')
          .onClick(() => {
            router.push({ url: 'pages/allowed_schemes_by_tags' })
          })

        Button('jump to allowed schemes applied to attr')
          .height('5%')
          .onClick(() => {
            router.push({ url: 'pages/allowed_scheme_applied_to_attr' })
          })

        Button('jump to allowed self closing tags')
          .height('5%')
          .onClick(() => {
            router.push({ url: 'pages/allowed_self_closing_tags' })
          })

        Button('jump to sanitize html page1')
          .height('5%')
          .onClick(() => {
            router.push({ url: 'pages/sanitize_html_options1' })
          })

        Button('jump to sanitize html page2')
          .height('5%')
          .onClick(() => {
            router.push({ url: 'pages/sanitize_html_options2' })
          })

        Button('jump to sanitize html page3')
          .height('5%')
          .onClick(() => {
            router.push({ url: 'pages/sanitize_html_options3' })
          })
      }
      .width('100%')
    }
    .height('100%')
  }
}