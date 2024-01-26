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
import rescale from "ml-array-rescale"

const errHint: string = '请输入有效数据';
const min: number = 0;
const max: number = 2;

@Entry
@Component
struct Index {
  private arr: Array<number> = [1, 2, 3];
  private inputStr1: string = '';
  private inputStr2: string = '';
  private inputStr3: string = '';
  private inputStr4: string = '';
  private inputStr5: string = '';
  private inputStr6: string = '';
  private inputStr7: string = '';
  private inputStr8: string = '';
  @State result1: string = '';
  @State result2: string = '';
  @State result3: string = '';
  @State result4: string = '';
  @State result5: string = '';
  @State result6: string = '';
  @State result7: string = '';
  @State result8: string = '';

  private inputMin1 = "";
  private inputMin2 = "";
  private inputMin3 = "";
  private inputMax1 = "";
  private inputMax2 = "";
  private inputMax3 = "";

  build() {
    Scroll(){
      Row() {
        Column() {
          Text('rescale(array)使用示例')
            .fontSize(30)
            .fontWeight(FontWeight.Normal)
            .margin({ top: 10 })

          TextInput({ placeholder: '请输入数组 如： [1,2,3]' })
            // .placeholderFont({size: 20})
            .height(50)
            .fontSize("18vp")
            .margin({ top: 10 })
            .width('80%')
            .onChange((value) => {
              this.inputStr1 = value;
            })

          Text('无输入默认值为 [1,2,3]')
            .fontSize(20)
            .fontWeight(FontWeight.Normal)
            .margin({ top: 10 })

          Text('点击，运算')
            .fontSize(30)
            .height(50)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 10 })
            .onClick((ev) => {
              let tmpArr: Array<number> = [];
              if (this.inputStr1) {
                try {
                  tmpArr = JSON.parse(this.inputStr1)
                } catch (e) {
                  console.log('test page 1 e:'+e.message)
                  this.result1 = errHint
                  return;
                }
              } else {
                tmpArr = this.arr;
              }

              if (isAnyArray(tmpArr) && tmpArr.length > 0) {
                this.result1 = JSON.stringify(rescale(tmpArr))
              } else {
                this.result1 = errHint
              }
            })

          Text('结果: ' + this.result1)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 10 })


          Text('rescale(array, { outputArrray })使用示例')
            .fontSize(30)
            .fontWeight(FontWeight.Normal)
            .margin({ top: 30 })

          TextInput({ placeholder: '请输入数组 如： [1,2,3]' })
            .height(50)
            .fontSize("18vp")
              // .placeholderFont({size: 20})
            .margin({ top: 10 })
            .width('80%')
            .onChange((value) => {
              this.inputStr2 = value;
            })

          Text('无输入默认值为 [1,2,3]')
            .fontSize(20)
            .fontWeight(FontWeight.Normal)
            .margin({ top: 10 })

          Text('点击，运算')
            .fontSize(30)
            .height(50)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 10 })
            .onClick((ev) => {
              let tmpArr: Array<number> = [];
              if (this.inputStr2) {
                try {
                  tmpArr = JSON.parse(this.inputStr2)
                } catch (e) {
                  console.log('test page 2 e:'+e.message)
                  this.result2 = errHint
                  return;
                }
              } else {
                tmpArr = this.arr;
              }

              if (isAnyArray(tmpArr) && tmpArr.length > 0) {
                const output = new Array<number>(tmpArr.length);
                rescale(tmpArr, { output });
                this.result2 = JSON.stringify(output)
              } else {
                this.result2 = errHint
              }
            })

          Text('outputArrray结果: ' + this.result2)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 10 })


          Text('rescale(array, { output: array });使用示例')
            .fontSize(30)
            .fontWeight(FontWeight.Normal)
            .margin({ top: 30 })

          TextInput({ placeholder: '请输入数组 如： [1,2,3]' })
            .height(50)
            .fontSize("18vp")
              // .placeholderFont({size: 20})
            .margin({ top: 10 })
            .width('80%')
            .onChange((value) => {
              this.inputStr3 = value;
            })

          Text('无输入默认值为 [1,2,3]')
            .fontSize(20)
            .fontWeight(FontWeight.Normal)
            .margin({ top: 10 })

          Text('点击，运算')
            .fontSize(30)
            .height(50)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 10 })
            .onClick((ev) => {
              let tmpArr: Array<number> = [];
              if (this.inputStr3) {
                try {
                  tmpArr = JSON.parse(this.inputStr3)
                } catch (e) {
                  console.log('test page 3 e:'+e.message)
                  this.result3 = errHint
                  return;
                }
              } else {
                tmpArr = this.arr;
              }

              if (isAnyArray(tmpArr) && tmpArr.length > 0) {
                rescale(tmpArr, { output: tmpArr });
                this.result3 = JSON.stringify(tmpArr)
              } else {
                this.result3 = errHint
              }
            })

          Text('array结果: ' + this.result3)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 10 })


          Text('rescale(array, { min })使用示例')
            .fontSize(30)
            .fontWeight(FontWeight.Normal)
            .margin({ top: 30 })

          TextInput({ placeholder: '请输入数组 如： [1,2,3]' })
            .height(50)
            .fontSize("18vp")
              // .placeholderFont({size: 20})
            .margin({ top: 10 })
            .width('80%')
            .onChange((value) => {
              this.inputStr4 = value;
            })

          Text('无输入默认值为 [1,2,3]')
            .fontSize(20)
            .fontWeight(FontWeight.Normal)
            .margin({ top: 10 })

          TextInput({ placeholder: '请输入min值' })
            .height(50)
            .fontSize("18vp")
              // .placeholderFont({size: 20})
            .margin({ top: 10 })
            .width('80%')
            .onChange((value) => {
              this.inputMin1 = value;
            })

          Text('无输入min默认值为 '+min)
            .fontSize(20)
            .fontWeight(FontWeight.Normal)
            .margin({ top: 10 })

          Text('点击，运算')
            .fontSize(30)
            .height(50)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 10 })
            .onClick((ev) => {
              console.log('test page min 1')
              let tmpArr: Array<number> = [];
              let tmpMin: number;
              this.result4 = ''
              if (this.inputStr4) {
                console.log('test page min 2')
                try {
                  tmpArr = JSON.parse(this.inputStr4)
                } catch (e) {
                  console.log('test page 4 e:'+e.message)
                  this.result4 = errHint
                  return;
                }
              } else {
                console.log('test page min 3')
                tmpArr = this.arr;
              }

              if(!!this.inputMin1){
                console.log('test page min 4')
                try {
                  tmpMin = Number.parseInt(this.inputMin1)
                  console.log('test page min 4 tmpMin:'+tmpMin)
                } catch (e) {
                  console.log('test page min 5')
                  console.log('test page 5 e:'+e.message)
                  this.result4 = errHint
                  return;
                }
              } else {
                console.log('test page min 6')
                tmpMin = min;
              }
              console.log('test page min 7 '+tmpMin)
              if (isAnyArray(tmpArr) && tmpArr.length > 0 && (tmpMin || tmpMin == 0) && !!!this.result4 ) {
                console.log('test page min 8 tmpMin:'+tmpMin)
                try{
                  this.result4 = JSON.stringify(rescale(tmpArr, { min: tmpMin}))
                } catch (e) {
                  console.log('test page min 8 e:'+e.message)
                  this.result4 = e.message;
                }
              } else {
                console.log('test page min 9')
                this.result4 = errHint
              }
            })

          Text('结果: ' + this.result4)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 10 })


          Text('rescale(array, { max })使用示例')
            .fontSize(30)
            .fontWeight(FontWeight.Normal)
            .margin({ top: 30 })

          TextInput({ placeholder: '请输入数组 如： [1,2,3]' })
            .height(50)
            .fontSize("18vp")
              // .placeholderFont({size: 20})
            .margin({ top: 10 })
            .width('80%')
            .onChange((value) => {
              this.inputStr5 = value;
            })

          Text('无输入默认值为 [1,2,3]')
            .fontSize(20)
            .fontWeight(FontWeight.Normal)
            .margin({ top: 10 })

          TextInput({ placeholder: '请输入max值' })
            .height(50)
            .fontSize("18vp")
              // .placeholderFont({size: 20})
            .margin({ top: 10 })
            .width('80%')
            .onChange((value) => {
              this.inputMax1 = value;
            })

          Text('无输入max默认值为 '+max)
            .fontSize(20)
            .fontWeight(FontWeight.Normal)
            .margin({ top: 10 })

          Text('点击，运算')
            .fontSize(30)
            .height(50)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 10 })
            .onClick((ev) => {
              let tmpArr: Array<number> = [];
              let tmpMax: number;
              this.result5 = ''
              if (this.inputStr5) {
                try {
                  tmpArr = JSON.parse(this.inputStr5)
                } catch (e) {
                  console.log('test page 6 e:'+e.message)
                  this.result5 = errHint
                  return;
                }
              } else {
                tmpArr = this.arr;
              }

              if(!!this.inputMax1){
                try {
                  tmpMax = Number.parseInt(this.inputMax1)
                } catch (e) {
                  console.log('test page 7 e:'+e.message)
                  this.result5 = errHint
                  return;
                }
              } else {
                tmpMax = max;
              }

              if (isAnyArray(tmpArr) && tmpArr.length > 0 && (tmpMax || tmpMax == 0) && !!!this.result5) {
                try{
                  this.result5 = JSON.stringify(rescale(tmpArr, { max: tmpMax}))
                } catch (e) {
                  console.log('test page min 7 e:'+e.message)
                  this.result5 = e.message;
                }
              } else {
                this.result5 = errHint
              }
            })

          Text('结果: ' + this.result5)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 10 })

          Text('rescale(array, { min, autoMinMax: true })使用示例')
            .fontSize(30)
            .fontWeight(FontWeight.Normal)
            .margin({ top: 30 })

          TextInput({ placeholder: '请输入数组 如： [1,2,3]' })
            .height(50)
            .fontSize("18vp")
              // .placeholderFont({size: 20})
            .margin({ top: 10 })
            .width('80%')
            .onChange((value) => {
              this.inputStr6 = value;
            })

          Text('无输入默认值为 [1,2,3]')
            .fontSize(20)
            .fontWeight(FontWeight.Normal)
            .margin({ top: 10 })

          TextInput({ placeholder: '请输入min值' })
            .height(50)
            .fontSize("18vp")
              // .placeholderFont({size: 20})
            .margin({ top: 10 })
            .width('80%')
            .onChange((value) => {
              this.inputMin2 = value;
            })

          Text('无输入min默认值为 '+min)
            .fontSize(20)
            .fontWeight(FontWeight.Normal)
            .margin({ top: 10 })

          Text('点击，运算')
            .fontSize(30)
            .height(50)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 10 })
            .onClick((ev) => {
              let tmpArr: Array<number> = [];
              let tmpMin: number;
              this.result6 = ''
              if (this.inputStr6) {
                try {
                  tmpArr = JSON.parse(this.inputStr6)
                } catch (e) {
                  console.log('test page 8 e:'+e.message)
                  this.result6 = errHint
                  return;
                }
              } else {
                tmpArr = this.arr;
              }

              if(!!this.inputMin2){
                try {
                  tmpMin = Number.parseInt(this.inputMin2)
                } catch (e) {
                  console.log('test page 9 e:'+e.message)
                  this.result6 = errHint
                  return;
                }
              } else {
                tmpMin = min;
              }

              if (isAnyArray(tmpArr) && tmpArr.length > 0 && (tmpMin || tmpMin == 0) && !!!this.result6) {
                try{
                  this.result6 = JSON.stringify(rescale(tmpArr, { min: tmpMin, autoMinMax: true }))
                } catch (e) {
                  console.log('test page min 9 e:'+e.message)
                  this.result6 = e.message;
                }
              } else {
                this.result6 = errHint
              }
            })

          Text('结果: ' + this.result6)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 10 })


          Text('rescale(array, { max, autoMinMax: true })使用示例')
            .fontSize(30)
            .fontWeight(FontWeight.Normal)
            .margin({ top: 30 })

          TextInput({ placeholder: '请输入数组 如： [1,2,3]' })
            .height(50)
            .fontSize("18vp")
              // .placeholderFont({size: 20})
            .margin({ top: 10 })
            .width('80%')
            .onChange((value) => {
              this.inputStr7 = value;
            })

          Text('无输入默认值为 [1,2,3]')
            .fontSize(20)
            .fontWeight(FontWeight.Normal)
            .margin({ top: 10 })

          TextInput({ placeholder: '请输入max值' })
            .height(50)
            .fontSize("18vp")
              // .placeholderFont({size: 20})
            .margin({ top: 10 })
            .width('80%')
            .onChange((value) => {
              this.inputMax2 = value;
            })

          Text('无输入max默认值为 '+max)
            .fontSize(20)
            .fontWeight(FontWeight.Normal)
            .margin({ top: 10 })

          Text('点击，运算')
            .fontSize(30)
            .height(50)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 10 })
            .onClick((ev) => {
              let tmpArr: Array<number> = [];
              let tmpMax: number;
              this.result7 = ''
              if (this.inputStr7) {
                try {
                  tmpArr = JSON.parse(this.inputStr7)
                } catch (e) {
                  console.log('test page 10 e:'+e.message)
                  this.result7 = errHint
                  return;
                }
              } else {
                tmpArr = this.arr;
              }

              if(!!this.inputMax2){
                try {
                  tmpMax = Number.parseInt(this.inputMax2)
                } catch (e) {
                  console.log('test page 11 e:'+e.message)
                  this.result7 = e.message
                  return;
                }
              } else {
                tmpMax = max;
              }

              if (isAnyArray(tmpArr) && tmpArr.length > 0 && (tmpMax || tmpMax == 0) && !!!this.result7) {
                try{
                  this.result7 = JSON.stringify(rescale(tmpArr, { max: tmpMax, autoMinMax: true }))
                } catch (e) {
                  console.log('test page min 11 e:'+e.message)
                  this.result7 = e.message;
                }
              } else {
                this.result7 = errHint
              }
            })

          Text('结果: ' + this.result7)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 10 })

          Text('rescale(array, { min, max })使用示例')
            .fontSize(30)
            .fontWeight(FontWeight.Normal)
            .margin({ top: 30 })

          TextInput({ placeholder: '请输入数组 如： [1,2,3]' })
            .height(50)
            .fontSize("18vp")
              // .placeholderFont({size: 20})
            .margin({ top: 10 })
            .width('80%')
            .onChange((value) => {
              this.inputStr8 = value;
            })

          Text('无输入默认值为 [1,2,3]')
            .fontSize(20)
            .fontWeight(FontWeight.Normal)
            .margin({ top: 10 })

          TextInput({ placeholder: '请输入min值' })
            .height(50)
            .fontSize("18vp")
              // .placeholderFont({size: 20})
            .margin({ top: 10 })
            .width('80%')
            .onChange((value) => {
              this.inputMin3 = value;
            })

          Text('无输入min默认值为 '+min)
            .fontSize(20)
            .fontWeight(FontWeight.Normal)
            .margin({ top: 10 })

          TextInput({ placeholder: '请输入max值' })
            .height(50)
            .fontSize("18vp")
              // .placeholderFont({size: 20})
            .margin({ top: 10 })
            .width('80%')
            .onChange((value) => {
              this.inputMax3 = value;
            })

          Text('无输入max默认值为 '+max)
            .fontSize(20)
            .fontWeight(FontWeight.Normal)
            .margin({ top: 10 })

          Text('点击，运算')
            .fontSize(30)
            .height(50)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 10 })
            .onClick((ev) => {
              let tmpArr: Array<number> = [];
              let tmpMin: number;
              let tmpMax: number;
              this.result8 = ''
              if (this.inputStr8) {
                try {
                  tmpArr = JSON.parse(this.inputStr8)
                } catch (e) {
                  console.log('test page 12 e:'+e.message)
                  this.result8 = errHint
                  return;
                }
              } else {
                tmpArr = this.arr;
              }

              if(!!this.inputMin3){
                try {
                  tmpMin = Number.parseInt(this.inputMin3)
                } catch (e) {
                  console.log('test page 13 e:'+e.message)
                  this.result8 = errHint
                  return;
                }
              } else {
                tmpMin = min;
              }

              if(!!this.inputMax3){
                try {
                  tmpMax = Number.parseInt(this.inputMax3)
                } catch (e) {
                  console.log('test page 14 e:'+e.message)
                  this.result8 = errHint
                  return;
                }
              } else {
                tmpMax = max;
              }

              if (isAnyArray(tmpArr) && tmpArr.length > 0 && (tmpMax || tmpMax == 0) && (tmpMin || tmpMin == 0) && !!!this.result8) {
                try{
                  this.result8 = JSON.stringify(rescale(tmpArr, { min: tmpMin, max: tmpMax }))
                } catch (e) {
                  console.log('test page min 14 e:'+e.message)
                  this.result8 = e.message;
                }
              } else {
                this.result8 = errHint
              }
            })

          Text('结果: ' + this.result8)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 10, bottom: 30 })

        }
        .width('100%')
      }
    }
    .height('100%')
  }
}