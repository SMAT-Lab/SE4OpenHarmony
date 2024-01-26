/**
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * */

import minimist from 'minimist'

@Entry
@Component
struct Index {

  build() {
    Row() {
      Column() {
        Text("['-b', '123'], { boolean: 'b', string: 'to' }\n").width('80%')
        Text("minimist:" + JSON.stringify(minimist(['-b', '123'], { boolean: 'b', string: "to" }))+"\n").width('80%')
        Text("['moo'], {boolean: ['t', 'verbose'], string: '_',default: { verbose: false, t: false }}\n").width('80%')
        Text("minimist:" + JSON.stringify(minimist(['moo'], {
          boolean: ['t', 'verbose'], string: "_",
          default: { verbose: false, t: false }
        }))+"\n").width('80%')
        Text("['moo', '--honk', 'cow', '-p', '55', '--tacos=good'], {boolean: true, string: '_'}\n").width('80%')
        Text("minimist:" + JSON.stringify(minimist(['moo', '--honk', 'cow', '-p', '55', '--tacos=good'], {
          boolean: true, string: "_"
        }))+"\n").width('80%')
        Text("['moo', '--honk', 'cow'], {boolean: true, string: 't'}\n").width('80%')
        Text("minimist:" + JSON.stringify(minimist(['moo', '--honk', 'cow'], {
          boolean: true, string: "t"
        }))+"\n").width('80%')
      }
      .height('90%')
      .width('100%')
    }
    .height('100%')
  }
}