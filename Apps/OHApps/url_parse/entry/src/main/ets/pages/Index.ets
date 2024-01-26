/**
 * Copyright (C) 2024 Huawei Device Co., Ltd.
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
 * */

import * as URLParse from "url-parse"

const url:ESObject = new URLParse('https://www.example.com:8080/path?param1=value1&param2=value2#section');

@Entry
@Component
struct Index {
  @State tostring: string = ''

  build() {
    Row() {
      Column() {
        Text('Protocol:' + url.protocol
          + '\n\nHostname:' + url.hostname
          + '\n\nPort:' + url.port
          + '\n\nPathname:' + url.pathname
          + '\n\nQuery:' + JSON.stringify(url.query)
          + '\n\nHash:' + url.hash
          + '\n\nHost:' + url.host+'\n\n'
        )
        Button('set And toString').onClick(() => {
          url.set('protocol', 'https');
          url.set('query', 'newParam=value');
          this.tostring = url.toString()
        })
          .fontSize(16)
          .fontWeight(FontWeight.Bold)
        Text('\n\nUpdated URL:' + this.tostring)
      }
      .width('100%')
    }
    .height('100%')
  }
}