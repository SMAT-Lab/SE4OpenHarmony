/*
 * MIT License
 *
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

import typed from 'typed-function'

@Entry
@Component
struct Index {
  @State value1: string = ''
  @State value2: string = ''
  @State value3: string = ''
  @State value4: string = ''
  @State value5: string = ''
  @State value6: string = ''
  @State value7: string = ''

  build() {
    Column () {
      Button('Click', { type: ButtonType.Capsule, stateEffect: true })
        .backgroundColor(0x317aff)
        .width('50%')
        .height(60)
        .margin({ bottom: 30, top: 50 })
        .onClick(() => {
          let fn: ESObject = typed({
            string: (value: string) => {
              return 'string:' + value
            },
            number: (value: number) => {
              return 'number:' + value
            },
            boolean: (value: boolean) => {
              return 'boolean:' + value
            },
            'number,number': () => {
              return 'number,number'
            },
            'string,string': () => {
              return 'string,string'
            },
            'Array,string': () => {
              return 'Array,string'
            },
            'number,number,string': () => {
              return 'three'
            }
          });

          this.value1 = fn("foo");
          this.value2 = fn(123);
          this.value3 = fn(false);
          this.value4 = fn(12, 34);
          this.value5 = fn("foo", "bar");
          this.value6 = fn([],"foo");
          this.value7 = fn(11,22,"foo");
        })

      Column() {
        Text('类型：string; 输入值："foo"')
          .fontSize(20)
          .margin({ bottom: 10 })
        Text('返回: ' + this.value1)
          .fontSize(25)
          .margin({ bottom: 15 })

        Text('类型：number; 输入值：123')
          .fontSize(20)
          .margin({ bottom: 10 })
        Text('返回: ' + this.value2)
          .fontSize(25)
          .margin({ bottom: 15 })

        Text('类型：boolean; 输入值：false')
          .fontSize(20)
          .margin({ bottom: 10 })
        Text('返回: ' + this.value3)
          .fontSize(25)
          .margin({ bottom: 15 })

        Text('类型：number,number; 输入值：12,34')
          .fontSize(20)
          .margin({ bottom: 10 })
        Text('返回: ' + this.value4)
          .fontSize(25)
          .margin({ bottom: 15 })

        Text('类型：string,string; 输入值："foo", "bar"')
          .fontSize(20)
          .margin({ bottom: 10 })
        Text('返回: ' + this.value5)
          .fontSize(25)
          .margin({ bottom: 15 })

        Text('类型：Array,string; 输入值：[],"foo"')
          .fontSize(20)
          .margin({ bottom: 10 })
        Text('返回: ' + this.value6)
          .fontSize(25)
          .margin({ bottom: 15 })

        Text('类型：number,number,string; 输入值：11,22,"foo"')
          .fontSize(20)
          .margin({ bottom: 10 })
        Text('返回: ' + this.value7)
          .fontSize(25)
          .margin({ bottom: 15 })
      }
      .width('100%')
      .alignItems(HorizontalAlign.Start)
    }
    .width('100%')
  }
}