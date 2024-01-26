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
struct AllowedTags {
  private default_allows: string[] = sanitize.defaults.allowedTags;
  @State private tagName: string = '';
  @State private sanitizeResult: string = 'sanitizeResult: ';

  aboutToAppear() {
  }

  build() {
    Row() {
      Column({ space: 10 }) {
        Text(this.default_allows.toString())
          .fontSize(25)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: 'input tag name.', controller: new TextInputController() })
          .onChange((value: string) => {
            this.tagName = value;
          })

        Button('default attr sanitize html')
          .height('5%')
          .onClick(() => {
            if (!this.tagName) {
              prompt.showToast({ message: 'please input tag name' })
              return;
            }
            let html = '<' + this.tagName + '>inner text </' + this.tagName + '>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html);
          })

        Button('Cover all default allowed tags')
          .height('5%')
          .onClick(() => {
            if (!this.tagName) {
              prompt.showToast({ message: 'please input tag name' })
              return;
            }
            sanitize.defaults.allowedTags = ['img', 'iframe'];
            let html = '<' + this.tagName + '>inner text </' + this.tagName + '>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html);
          })

        Button('Cover allowed tags by options')
          .height('5%')
          .onClick(() => {
            if (!this.tagName) {
              prompt.showToast({ message: 'please input tag name' })
              return;
            }
            let html = '<' + this.tagName + '>inner text </' + this.tagName + '>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
              allowedTags: ['tag1', 'tag2']
            });
          })

        Button('Add default allowed tag')
          .height('5%')
          .onClick(() => {
            if (!this.tagName) {
              prompt.showToast({ message: 'please input tag name' })
              return;
            }
            let index:ESObject = sanitize.defaults.allowedTags.indexOf(this.tagName);
            if (index != -1) {
              prompt.showToast({ message: 'the tag name already exist' })
              return;
            }
            sanitize.defaults.allowedTags.push(this.tagName);
            let html = '<' + this.tagName + '>inner text </' + this.tagName + '>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html);
          })

        Button('not check tag : false')
          .height('5%')
          .onClick(() => {
            if (!this.tagName) {
              prompt.showToast({ message: 'please input tag name' })
              return;
            }
            let html = '<' + this.tagName + '>inner text </' + this.tagName + '>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, { allowedTags: false });
          })

        Button('not check tag : undefined')
          .height('5%')
          .onClick(() => {
            if (!this.tagName) {
              prompt.showToast({ message: 'please input tag name' })
              return;
            }
            let html = '<' + this.tagName + '>inner text </' + this.tagName + '>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, { allowedTags: undefined });
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