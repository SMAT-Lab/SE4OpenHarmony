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
struct AllowedAttributes {
  private default_allows: ESObject = sanitize.defaults.allowedAttributes;
  @State private attributeName: string = '';
  @State private sanitizeResult: string = 'sanitizeResult: ';

  aboutToAppear() {
  }

  build() {
    Row() {
      Column({ space: 10 }) {
        Text(JSON.stringify(this.default_allows))
          .fontSize(25)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: 'input attribute name.', controller: new TextInputController() })
          .margin({
            top: 10
          })
          .onChange((value: string) => {
            this.attributeName = value;
          })

        Button('default sanitize html')
          .height('5%')
          .onClick(() => {
            if (!this.attributeName) {
              prompt.showToast({ message: 'please input attribute name' })
              return;
            }
            let html = '<a ' + this.attributeName + '="test">inner text </' + this.attributeName + '>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html);
          })

        Button('cover all default attribute')
          .height('5%')
          .onClick(() => {
            if (!this.attributeName) {
              prompt.showToast({ message: 'please input attribute name' })
              return;
            }
            sanitize.defaults.allowedAttributes = { a: [this.attributeName],img:[this.attributeName] };
            let html = '<a ' + this.attributeName + '="test">inner text </' + this.attributeName + '>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html);
          })

        Button('cover attributes by options')
          .height('5%')
          .onClick(() => {
            if (!this.attributeName) {
              prompt.showToast({ message: 'please input attribute name' })
              return;
            }
            let html = '<a ' + this.attributeName + '="test">inner text </' + this.attributeName + '>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
              allowedAttributes: { a: ['a', 'b', 'c', 'd'] }
            });
          })

        Button('add allowed attribute for all')
          .height('5%')
          .onClick(() => {
            if (!this.attributeName) {
              prompt.showToast({ message: 'please input attribute name' })
              return;
            }
            let defaultsCommonValue:ESObject = sanitize.defaults.allowedAttributes['*'];
            if (typeof defaultsCommonValue === 'object' && Array.isArray(defaultsCommonValue)) {
              let attrIndex = defaultsCommonValue.indexOf(this.attributeName);
              if (attrIndex != -1) {
                prompt.showToast({ message: 'the attribute name already exist' })
                return;
              }
              defaultsCommonValue.push(this.attributeName);
            } else {
              sanitize.defaults.allowedAttributes['*'] = [this.attributeName];
            }
            let html = '<a ' + this.attributeName + '="test">inner text </' + this.attributeName + '>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html);
          })

        Button('not check attribute : false')
          .height('5%')
          .onClick(() => {
            if (!this.attributeName) {
              prompt.showToast({ message: 'please input attribute name' })
              return;
            }
            let html = '<a ' + this.attributeName + '="test">inner text </' + this.attributeName + '>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, { allowedAttributes: false });
          })

        Button('not check attribute : undefined')
          .height('5%')
          .onClick(() => {
            if (!this.attributeName) {
              prompt.showToast({ message: 'please input attribute name' })
              return;
            }
            let html = '<a ' + this.attributeName + '="test">inner text </' + this.attributeName + '>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, { allowedAttributes: undefined });
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