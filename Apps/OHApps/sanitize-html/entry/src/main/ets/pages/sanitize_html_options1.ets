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

import sanitize from 'sanitize-html';

@Entry
@Component
struct Sanitize_html_options {
  @State private sanitizeResult: string = 'sanitizeResult: ';

  build() {
    Row() {
      Column({ space: 10 }) {
        Button('add allowed tag:img')
          .height('5%')
          .onClick(() => {
            let html = '<img src="http://www.baidu.com">';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
              allowedTags: sanitize.defaults.allowedTags.concat(['img'])
            });
          })

        Button('set allowed attribute:id')
          .height('5%')
          .onClick(() => {
            let html = '<a href="http://www.baidu.com" id="alink">';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
              allowedAttributes: {
                a: ['href', 'id']
              }
            });
          })

        Button('set allowed scheme')
          .height('5%')
          .onClick(() => {
            let html = '<img href="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==">';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
              allowedTags: false,
              allowedAttributes: false,
              allowedSchemes: ['sms', 'data']
            });
          })

        Button('set allowed scheme by tag')
          .height('5%')
          .onClick(() => {
            let html = '<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==">';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
              allowedTags: false,
              allowedAttributes: false,
              allowedSchemesByTag: {
                img: ['data']
              }
            });
          })

        Button('set allowed scheme applied to attr')
          .height('5%')
          .onClick(() => {
            let html = '<img custom="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==">';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
              allowedTags: false,
              allowedAttributes: false,
              allowedSchemes: ['sms', 'data'],
              allowedSchemesAppliedToAttributes: ['custom']
            });
          })

        Button('set selfClosing tag')
          .height('5%')
          .onClick(() => {
            let html = '<a href="https://www.baidu.com"></a><p>drop text and tags between the disallowed tag</p>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
              selfClosing: ['a']
            });
          })

        Button('disallowedTagsMode default:discard')
          .onClick(() => {
            let html = '<div>drop disallowed tag and its all child tag <sss src="http://www.baidu.com">sss tag inner text<p> allowed tag</p></sss></div>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
              disallowedTagsMode: 'discard'
            });
          })

        Button('disallowedTagsMode escape')
          .height('5%')
          .onClick(() => {
            let html = '<div>escape disallowed tag not its child tag <sss src="http://www.baidu.com">sss tag inner text<sss>ssssssss</sss><p> allowed tag</p></sss></div>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
              disallowedTagsMode: 'escape'
            });
          })

        Button('disallowedTagsMode recursiveEscape')
          .onClick(() => {
            let html = '<div>escape disallowed tag and its all child tag <sss src="http://www.baidu.com">sss tag inner text<p> allowed tag</p></sss></div>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
              disallowedTagsMode: 'recursiveEscape'
            });
          })

        Text(this.sanitizeResult)
          .fontSize(25)
          .fontWeight(FontWeight.Bold)
      }
      .width('100%')
    }
    .height('100%')
  }
}