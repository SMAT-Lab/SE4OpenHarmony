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

import sanitizeHtml from 'sanitize-html';
import prompt from '@ohos.prompt';

@Entry
@Component
struct Allowed_scheme_applied_to_attr {
  private schemeAppliedToAttr: string[] = sanitizeHtml.defaults.allowedSchemesAppliedToAttributes;
  @State private attrName: string = '';
  @State private schemeName: string = '';
  @State private sanitizeResult: string = 'sanitizeResult: ';
  private controller: TextInputController = new TextInputController();

  build() {
    Row() {
      Column({ space: 10 }) {
        Text(this.schemeAppliedToAttr.toString())
          .fontSize(25)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: 'input attribute name.', controller: this.controller })
          .onChange((value: string) => {
            this.attrName = value;
          })

        TextInput({ placeholder: 'input scheme name.', controller: this.controller })
          .onChange((value: string) => {
            this.schemeName = value;
          })

        Button('default sanitize html')
          .height('5%')
          .onClick(() => {
            if (!this.attrName || !this.schemeName) {
              prompt.showToast({ message: 'please input attribute or scheme name' })
              return;
            }
            let html = '<a ' + this.attrName + '="' + this.schemeName + '://www.baidu.com">inner text </a>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitizeHtml(html);
          })

        Button('cover default attributes')
          .height('5%')
          .onClick(() => {
            if (!this.attrName || !this.schemeName) {
              prompt.showToast({ message: 'please input attribute or scheme name' })
              return;
            }
            sanitizeHtml.defaults.allowedSchemesAppliedToAttributes = [this.attrName];
            let html = '<a ' + this.attrName + '="' + this.schemeName + '://www.baidu.com">inner text </a>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitizeHtml(html, {
              allowedAttributes: {
                a: [this.attrName]
              }
            });
          })

        Button('cover attr by options')
          .height('5%')
          .onClick(() => {
            if (!this.attrName || !this.schemeName) {
              prompt.showToast({ message: 'please input attribute or scheme name' })
              return;
            }
            let html = '<a ' + this.attrName + '="' + this.schemeName + '://www.baidu.com">inner text </a>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitizeHtml(html, {
              allowedAttributes: {
                a: [this.attrName]
              },
              allowedSchemesAppliedToAttributes: [this.attrName]
            });
          })

        Button('add scheme applied for attribute')
          .height('5%')
          .onClick(() => {
            if (!this.attrName || !this.schemeName) {
              prompt.showToast({ message: 'please input attribute or scheme name' })
              return;
            }
            let attributesArray:ESObject = sanitizeHtml.defaults.allowedSchemesAppliedToAttributes;
            let attrIndex:ESObject = attributesArray.indexOf(this.attrName);
            if (attrIndex === -1) {
              attributesArray.push(this.attrName)
            } else {
              prompt.showToast({ message: 'the attribute already exist' })
              return;
            }
            let html = '<a ' + this.attrName + '="' + this.schemeName + '://www.baidu.com">inner text </a>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitizeHtml(html, {
              allowedAttributes: {
                a: [this.attrName]
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