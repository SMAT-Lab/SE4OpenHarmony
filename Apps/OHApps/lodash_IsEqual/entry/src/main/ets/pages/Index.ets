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

import isEqual from 'lodash.isequal';

@Entry
@Component
struct Index {
  @State message: string = '比较得结果是：'

  build() {
    Row() {
      Scroll() {
        Column() {
          Flex({
            alignItems: ItemAlign.Start,
            justifyContent: FlexAlign.Start,
            alignContent: FlexAlign.Start,
            direction: FlexDirection.Column
          }) {
            Text(this.message)
              .fontSize(20)
              .fontWeight(FontWeight.Bold)
              .width('100%')
              .padding(10)
              .backgroundColor(Color.Red)
              .fontColor(Color.White)
            Text('数字类型比较')
              .fontSize(20)
              .fontWeight(FontWeight.Bold)
              .width('100%')
              .height(50)
              .margin({
                top: 20
              })
              .backgroundColor(Color.Blue)
              .fontColor(Color.White)
              .onClick(() => {
                this.numberDataTypeisEqual()
              })
            Text('字符串类型比较')
              .fontSize(20)
              .fontWeight(FontWeight.Bold)
              .width('100%')
              .height(50)
              .margin({
                top: 20
              })
              .backgroundColor(Color.Blue)
              .fontColor(Color.White)
              .onClick(() => {
                this.stringDataTypeisEqual()
              })
            Text('布尔类型比较')
              .fontSize(20)
              .fontWeight(FontWeight.Bold)
              .width('100%')
              .height(50)
              .margin({
                top: 20
              })
              .backgroundColor(Color.Blue)
              .fontColor(Color.White)
              .onClick(() => {
                this.boolDataTypeisEqual()
              })
            Text('数组类型比较')
              .fontSize(20)
              .fontWeight(FontWeight.Bold)
              .width('100%')
              .height(50)
              .margin({
                top: 20
              })
              .backgroundColor(Color.Blue)
              .fontColor(Color.White)
              .onClick(() => {
                this.arrayDataTypeisEqual()
              })
            Text('对象类型比较')
              .fontSize(20)
              .fontWeight(FontWeight.Bold)
              .width('100%')
              .height(50)
              .margin({
                top: 20
              })
              .backgroundColor(Color.Blue)
              .fontColor(Color.White)
              .onClick(() => {
                this.objectDataTypeisEqual()
              })
          }

        }
        .width('100%')
      }.width('100%')
      .height('100%')
    }
    .height('100%')
  }

  numberDataTypeisEqual() {
    let a = 1
    let b = 1
    let res: boolean = isEqual(a, b)
    this.message = 'a = ' + a + ' b= ' + b
      + '\r\na和b比较结果\r\n' + res + '\r\n'

    a = 1
    b = 2
    res = isEqual(a, b)
    this.message = 'a = ' + a + ' b= ' + b
      + '\r\na和b比较结果\r\n' + res + '\r\n'

    a = 1.1
    b = 2.1
    res = isEqual(a, b)
    this.message = 'a = ' + a + ' b= ' + b
      + '\r\na和b比较结果\r\n' + res + '\r\n'

    a = 1.1
    b = 1.1
    res = isEqual(a, b)
    this.message = 'a = ' + a + ' b= ' + b
      + '\r\na和b比较结果\r\n' + res + '\r\n'

  }

  stringDataTypeisEqual() {
    let a = "'abc'"
    let b = "'abc'"
    let res: boolean = isEqual(a, b)
    this.message = 'a = ' + a + ' b= ' + b
      + '\r\na和b比较结果\r\n' + res + '\r\n'

    a = "'abcd'"
    b = "'abc'"
    res = isEqual(a, b)
    this.message = 'a = ' + a + ' b= ' + b
      + '\r\na和b比较结果\r\n' + res + '\r\n'
  }

  boolDataTypeisEqual() {
    let a = false
    let b = false
    let res: boolean = isEqual(a, b)
    this.message = 'a = ' + a + ' b= ' + b
      + '\r\na和b比较结果\r\n' + res + '\r\n'
    a = false
    b = true
    res = isEqual(a, b)
    this.message = 'a = ' + a + ' b= ' + b
      + '\r\na和b比较结果\r\n' + res + '\r\n'
  }

  arrayDataTypeisEqual() {
    let a = [1, 2]
    let b = [1, 2]
    let res: boolean = isEqual(a, b)
    this.message = 'a = [' + a + '] b= [' + b + ']'
      + '\r\na和b比较结果\r\n' + res + '\r\n'

    a = [1, 2]
    b = [1, 3]
    res = isEqual(a, b)
    this.message = 'a = [' + a + '] b= [' + b + ']'
      + '\r\na和b比较结果\r\n' + res + '\r\n'
  }

  objectDataTypeisEqual() {
    class Temp {
      no: number
      name: string

      constructor(no: number, name: string) {
        this.no = no
        this.name = name
      }
    }

    let a = new Temp(1, 'xiaoming')
    let b = new Temp(2, 'xiaoming')
    let res: boolean = isEqual(a, b)
    this.message = this.message + '\r\n'
      + 'a = [' + a + '] b= [' + b + ']'
      + '\r\na和b比较结果\r\n' + res + '\r\n'

    a = new Temp(1, 'xiaoming')
    b = new Temp(1, 'xiaoming')
    res = isEqual(a, b)
    this.message = 'a = [' + a + '] b= [' + b + ']'
      + '\r\na和b比较结果\r\n' + res + '\r\n'
  }
}