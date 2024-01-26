/*
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
 */

import { TinyEmitter } from "tiny-emitter";
import  emitter  from "tiny-emitter/instance";

@Entry
@Component
struct Index {
  @State result: string = '';
  @State result1: string = '';

  build() {
    Row() {
      Column() {
        Text("Emitter.on()")
          .fontSize(30)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            console.log('test page click')
            let mEmitter: TinyEmitter = new TinyEmitter();
            mEmitter.on('some-event', (arg1: string, arg2: string, arg3: string) => {
              this.result = 'arg1:'+arg1+',arg2:'+arg2+',arg3:'+arg3;
            });
            mEmitter.emit('some-event', 'arg1 value', 'arg2 value', 'arg3 value');
            console.log('test page click result:'+this.result)
          })
        Text('结果: ' + this.result)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .margin({ top: 10 })

        Text("emitter.on()")
          .fontSize(30)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            console.log('test page click')
            emitter.on('some-event', (arg1: string, arg2: string, arg3: string) => {
              this.result1 = 'arg1:'+arg1+',arg2:'+arg2+',arg3:'+arg3;
            });
            emitter.emit('some-event', 'arg1 value', 'arg2 value', 'arg3 value');
            console.log('test page click result:'+this.result1)
          })
        Text('结果: ' + this.result1)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .margin({ top: 10 })
      }
      .width('100%')
    }
    .height('100%')
  }
}