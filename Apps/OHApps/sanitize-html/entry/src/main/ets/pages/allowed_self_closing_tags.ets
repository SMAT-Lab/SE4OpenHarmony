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
struct Self_closing_tags {
  @State message: string = 'Hello World'
  private tags: string[] = sanitize.defaults.selfClosing;
  @State private tagName: string = '';
  @State private sanitizeResult: string = 'sanitizeResult: ';

  build() {
    Row() {
      Column({ space: 10 }) {
        Text(this.tags.toString())
          .fontSize(25)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: 'input tag name.', controller: new TextInputController() })
          .onChange((value: string) => {
            this.tagName = value;
          })

        Button('default self sanitize html')
          .height('5%')
          .onClick(() => {
            if (!this.tagName) {
              prompt.showToast({ message: 'please input tag name' })
              return;
            }
            let html = '<' + this.tagName + ' name="selfClosingTag">';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
              allowedTags: false,
              allowedAttributes: false
            });
          })

        Button('cover default self closing tag')
          .height('5%')
          .onClick(() => {
            if (!this.tagName) {
              prompt.showToast({ message: 'please input tag name' })
              return;
            }
            sanitize.defaults.selfClosing = [this.tagName];
            let html = '<' + this.tagName + ' name="selfClosingTag">';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
              allowedTags: false,
              allowedAttributes: false
            });
          })

        Button('cover self closing tag by options')
          .height('5%')
          .onClick(() => {
            if (!this.tagName) {
              prompt.showToast({ message: 'please input tag name' })
              return;
            }
            let html = '<' + this.tagName + ' name="selfClosingTag">';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
              allowedTags: false,
              allowedAttributes: false,
              selfClosing: [this.tagName]
            });
          })

        Button('add self closing tag')
          .height('5%')
          .onClick(() => {
            if (!this.tagName) {
              prompt.showToast({ message: 'please input tag name' })
              return;
            }
            let index:ESObject = sanitize.defaults.selfClosing.indexOf(this.tagName);
            if (index != -1) {
              prompt.showToast({ message: 'the tag name already exist' })
              return;
            }
            sanitize.defaults.selfClosing.push(this.tagName);
            let html = '<' + this.tagName + ' name="selfClosingTag">';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
              allowedTags: false,
              allowedAttributes: false
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