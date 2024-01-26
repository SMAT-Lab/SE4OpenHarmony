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
import prompt from '@ohos.prompt';

@Entry
@Component
struct Allowed_schemes_by_tag {
  private allowedSchemeByTag: object = sanitize.defaults.allowedSchemesByTag;
  @State private tagName: string = '';
  @State private schemeName: string = '';
  @State private sanitizeResult: string = 'sanitizeResult: ';
  private controller: TextInputController = new TextInputController();

  build() {
    Row() {
      Column({ space: 10 }) {
        Text(JSON.stringify(this.allowedSchemeByTag))
          .fontSize(25)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: 'input tag name.', controller: this.controller })
          .onChange((value: string) => {
            this.tagName = value;
          })

        TextInput({ placeholder: 'input scheme name.', controller: this.controller })
          .onChange((value: string) => {
            this.schemeName = value;
          })

        Button('default scheme sanitize html')
          .height('5%')
          .onClick(() => {
            if (!this.tagName || !this.schemeName) {
              prompt.showToast({ message: 'please input scheme name' })
              return;
            }
            let html = '<' + this.tagName + ' href="' + this.schemeName + '://www.baidu.com">inner text </' + this.tagName + '>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html);
          })

        Button('add default scheme for tag')
          .height('5%')
          .onClick(() => {
            if (!this.tagName || !this.schemeName) {
              prompt.showToast({ message: 'please input tag name' })
              return;
            }
            sanitize.defaults.allowedSchemesByTag['a'] = ['sms', 'data'];
            let html = '<' + this.tagName + ' href="' + this.schemeName + '://www.baidu.com">inner text </' + this.tagName + '>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html);
          })

        Button('cover scheme for tag by options')
          .height('5%')
          .onClick(() => {
            if (!this.tagName || !this.schemeName) {
              prompt.showToast({ message: 'please input tag name' })
              return;
            }
            let html = '<' + this.tagName + ' href="' + this.schemeName + '://www.baidu.com">inner text </' + this.tagName + '>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
              allowedSchemesByTag: {
                a: ['sms1', 'data1']
              }
            });
          })

        Text(this.sanitizeResult)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
      }
      .width('100%')
    }
    .height('100%')
  }
}