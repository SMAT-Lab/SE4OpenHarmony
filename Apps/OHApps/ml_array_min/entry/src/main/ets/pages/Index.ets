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

import { isAnyArray } from "is-any-array"
import min from "ml-array-min"

@Entry
@Component
struct Index {
  private arr: Array<number> = [1, 2, 3];
  private inputStr: string = '';
  @State result: string = '';

  build() {
    Row() {
      Column() {

        TextInput({ placeholder: '请输入数组 如： [1,2,3]' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .width('80%')
          .onChange((value) => {
            this.inputStr = value;
          })

        Text('无输入默认值为 [1,2,3]')
          .fontSize(20)
          .fontWeight(FontWeight.Normal)
          .margin({ top: 10 })

        Text('获取最小值方式一：')
          .fontSize(30)
          .height(50)
          .fontWeight(FontWeight.Bold)
          .margin({ top: 10 })
          .onClick((ev) => {
            let tmpArr: number[] = [];
            if (this.inputStr) {
              try {
                tmpArr = JSON.parse(this.inputStr)
              } catch (e) {
                this.result = '请输入有效数据'
              }
            } else {
              tmpArr = this.arr;
            }

            if (isAnyArray(tmpArr) && tmpArr.length > 0) {
              this.result = min(tmpArr).toString()
            } else {
              this.result = '请输入有效数据'
            }
          })

        Text('获取最小值方式二：')
          .fontSize(30)
          .height(50)
          .fontWeight(FontWeight.Bold)
          .margin({ top: 10 })
          .onClick((ev) => {
            let tmpArr: number[] = [];
            if (this.inputStr) {
              try {
                tmpArr = JSON.parse(this.inputStr)
              } catch (e) {
                this.result = '请输入有效数据'
              }
            } else {
              tmpArr = this.arr;
            }

            if (isAnyArray(tmpArr) && tmpArr.length > 0) {
              this.result = min(tmpArr, { fromIndex: 0, toIndex: tmpArr.length }).toString()
            } else {
              this.result = '请输入有效数据'
            }
          })

        Text('结果: ' + this.result)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .margin({ top: 10 })

      }
      .width('100%')
    }
    .height('100%')
  }
}