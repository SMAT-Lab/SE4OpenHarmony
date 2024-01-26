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
class filter {
  tagName: ESObject = 0
  attribs: ESObject = 0
  text: string = ''
}
@Entry
@Component
struct Sanitize_html_options3 {
  @State sanitizeResult: string = 'sanitizeResult: ';

  build() {
    Row() {
      Column({ space: 10 }) {
        Button(`set script tag's hostname`)
          .height('5%')
          .onClick(() => {
            let html = '<script src="https://www.unauthorized.com/lib.js"></script>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
              allowedTags: ['script'],
              allowVulnerableTags: true,
              allowedAttributes: {
                script: ['src']
              },
              allowedScriptHostnames: ['www.unauthorized.com']
            });
          })

        Button(`set script tag's domain`)
          .height('5%')
          .onClick(() => {
            let html = '<script src="https://www.safe.authorized.com/lib.js"></script>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
              allowedTags: ['script'],
              allowedAttributes: {
                script: ['src']
              },
              allowedScriptDomains: ['authorized.com']
            });
          })

        Button('text filter')
          .height('5%')
          .onClick(() => {
            this.sanitizeResult = 'sanitizeResult: ' + sanitize('<a href="http://somelink">some text</a>', {
              transformTags: {
                a:  (tagNameParams:ESObject, attribsParams:ESObject):filter=> {
                  return {
                    tagName: tagNameParams,
                    attribs: attribsParams,
                    text: 'some text need"to<be>filtered'
                  };
                }
              },
              textFilter:  (text:ESObject, tagName:ESObject):ESObject=> {
                return text.replace(new RegExp('\s','g'), '_');
              }
            });
          })

        Button(`exclusive Filter`)
          .height('5%')
          .onClick(() => {
            let html = '<p>This is <a href="http://www.linux.org"></a><br/>Linux</p>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
              exclusiveFilter:  (frame:ESObject)=> {
                return frame.tag === 'a' && !frame.text.trim();
              }
            });
          })

        Button('set nonTextTags')
          .height('5%')
          .onClick(() => {
            let html = '<notty>sssss</notty><p>drop text and tags between the disallowed tag</p>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
              nonTextTags: ['notty']
            });
          })

        Button('transform tag without new attr')
          .height('5%')
          .onClick(() => {
            this.sanitizeResult = 'sanitizeResult: ' + sanitize('<ol><li>Hello world</li></ol>', {
              transformTags: {
                ol: 'ul'
              }
            });
          })

        Button('transform tag with new attribute')
          .height('5%')
          .onClick(() => {
            this.sanitizeResult = 'sanitizeResult: ' + sanitize('<ol><li>Hello world</li></ol>', {
              transformTags: {
                ol: sanitize.simpleTransform('ul', {
                  class: 'foo',
                  name: 'newAttrName'
                })
              },
              allowedAttributes: {
                ul: ['class', 'name']
              }
            })
          })

        Button(`recognizeCDATA: true`)
          .height('5%')
          .onClick(() => {
            let html = '<?doctype/html><script type="text/javascript">var name = "react";</script><div id = "htmlparser2" class="html">abc</div><![CDATA[hello react.js]]>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
              parser: {
                recognizeCDATA: true
              }
            });
          })

        Button(`recognizeCDATA: false`)
          .height('5%')
          .onClick(() => {
            let html = '<?doctype/html><script type="text/javascript">var name = "react";</script><div id = "htmlparser2" class="html">abc</div><![CDATA[hello react.js]]>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
              parser: {
                recognizeCDATA: false
              }
            });
          })

        Text(this.sanitizeResult)
          .fontSize(15)
          .fontWeight(FontWeight.Bold)
      }
      .width('100%')
    }
    .height('100%')
  }
}