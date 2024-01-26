/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import router from '@ohos.router';
import * as math from 'mathjs';
import BigNumber from 'bignumber.js';
import long from 'long';

@Entry
@Component
struct Index {
  scroller: Scroller = new Scroller()
  zerosStr = '0'
  @State message: string = 'crcalc test'
  @State mathAbs: string = this.zerosStr
  @State mathTimeAbs: string = this.zerosStr
  @State mathAcos: string = this.zerosStr
  @State mathTimeAcos: string = this.zerosStr
  @State mathAdd: string = this.zerosStr
  @State mathTimeAdd: string = this.zerosStr
  @State mathAsin: string = this.zerosStr
  @State mathTimeAsin: string = this.zerosStr
  @State mathAtan: string = this.zerosStr
  @State mathTimeAtan: string = this.zerosStr
  @State mathByteValue: string = this.zerosStr
  @State mathTimeByteValue: string = this.zerosStr
  @State mathCompare: string = this.zerosStr
  @State mathTimeCompare: string = this.zerosStr
  @State mathCos: string = this.zerosStr
  @State mathTimeCos: string = this.zerosStr
  @State mathDivide: string = this.zerosStr
  @State mathTimeDivide: string = this.zerosStr
  @State mathExp: string = this.zerosStr
  @State mathTimeExp: string = this.zerosStr
  @State mathFormat: string = this.zerosStr
  @State mathTimeFormat: string = this.zerosStr
  @State mathIntValue: string = this.zerosStr
  @State mathTimeIntValue: string = this.zerosStr
  @State mathLeftShift: string = this.zerosStr
  @State mathTimeLeftShift: string = this.zerosStr
  @State mathLog: string = this.zerosStr
  @State mathTimeLog: string = this.zerosStr
  @State mathLongValue: string = this.zerosStr
  @State mathTimeLongValue: string = this.zerosStr
  @State mathMax: string = this.zerosStr
  @State mathTimeMax: string = this.zerosStr
  @State mathMin: string = this.zerosStr
  @State mathTimeMin: string = this.zerosStr
  @State mathMultiply: string = this.zerosStr
  @State mathTimeMultiply: string = this.zerosStr
  @State mathRadix: string = this.zerosStr
  @State mathTimeRadix: string = this.zerosStr
  @State mathRightArithShift: string = this.zerosStr
  @State mathTimeRightArithShift: string = this.zerosStr
  @State mathRound: string = this.zerosStr
  @State mathTimeRound: string = this.zerosStr
  @State mathSin: string = this.zerosStr
  @State mathTimeSin: string = this.zerosStr
  @State mathSqrt: string = this.zerosStr
  @State mathTimeSqrt: string = this.zerosStr
  @State mathSubtract: string = this.zerosStr
  @State mathTimeSubtract: string = this.zerosStr
  @State mathTan: string = this.zerosStr
  @State mathTimeTan: string = this.zerosStr
  @State mathUnaryMinus: string = this.zerosStr
  @State mathTimeUnaryMinus: string = this.zerosStr
  @State mathSignum: boolean = true
  @State mathposSignum: boolean = true
  @State mathTimeSignum: string = this.zerosStr
  @State mathTimeSignum1: string = this.zerosStr
  mathatanSignum: string = ''
  mathatanSignum1: string = ''
  mathUnaryMinus1: string = ''
  mathTan1: string = ''
  mathSubtract1: string = ''
  mathSubtract2: string = ''
  mathSqrt1: string = ''
  mathSin1: string = ''
  mathRound1: string = ''
  mathRightArithShift1: string = ''
  mathRightArithShift2: string = ''
  mathRadix1: string = ''
  mathRadix2: number = 0
  mathMultiply1: string = ''
  mathMultiply2: string = ''
  mathMin1: string = ''
  mathMin2: string = ''
  mathMax1: string = ''
  mathMax2: string = ''
  mathLongValue1: string = ''
  mathLog1: string = ''
  mathLeftShift1: string = ''
  mathLeftShift2: string = ''
  mathIntValue1: string = ''
  mathFormat1: string = ''
  mathExp1: string = ''
  mathDivide1: string = ''
  mathDivide2: string = ''
  mathCos1: string = ''
  mathCompare1: string = ''
  mathCompare2: string = ''
  mathByteValue1: string = ''
  mathAtan1: string = ''
  mathAsin1: string = ''
  mathAdd1: string = ''
  mathAdd2: string = ''
  mathAcosStr: string = ''
  mathAbsStr: string = ''

  build() {
    Scroll(this.scroller) {
      Column() {

        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathatanSignum = value
          })

        Text('isNegative test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathSignum = math.isNegative(math.bignumber(this.mathatanSignum))
              let time1 = Date.now()
              this.mathTimeSignum = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathSignum)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeSignum)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathatanSignum1 = value
          })

        Text('isPositive test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathposSignum = math.isPositive(math.bignumber(this.mathatanSignum1))
              let time1 = Date.now()
              this.mathTimeSignum1 = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathposSignum)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeSignum1)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathUnaryMinus1 = value
          })

        Text('unaryMinus test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathUnaryMinus = math.unaryMinus(math.bignumber(this.mathUnaryMinus1)).toFixed(10)
              let time1 = Date.now()
              this.mathTimeUnaryMinus = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathUnaryMinus)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeUnaryMinus)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数，取值范围：{x|x≠(π/2)+kπ,k∈Z}' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathTan1 = value
          })

        Text('tan test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathTan = math.tan(math.bignumber(this.mathTan1)).toFixed(10)
              let time1 = Date.now()
              this.mathTimeTan = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })


        Text("结果：" + this.mathTan)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeTan)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathSubtract1 = value
          })

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathSubtract2 = value
          })

        Text('subtract test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathSubtract = math.subtract(math.bignumber(this.mathSubtract1), math.bignumber(this.mathSubtract2)).toFixed(10)
              let time1 = Date.now()
              this.mathTimeSubtract = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathSubtract)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeSubtract)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathSqrt1 = value
          })

        Text('sqrt test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathSqrt = math.sqrt(math.bignumber(this.mathSqrt1)).toFixed(10)
              let time1 = Date.now()
              this.mathTimeSqrt = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })


        Text("结果：" + this.mathSqrt)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeSqrt)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathSin1 = value
          })

        Text('sin test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathSin = math.sin(math.bignumber(this.mathSin1)).toFixed(10)
              let time1 = Date.now()
              this.mathTimeSin = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })


        Text("结果：" + this.mathSin)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeSin)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathRound1 = value
          })

        Text('round test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathRound = math.round(math.bignumber(this.mathRound1)).toFixed(10)
              let time1 = Date.now()
              this.mathTimeRound = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })


        Text("结果：" + this.mathRound)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeRound)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathRightArithShift1 = value
          })

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathRightArithShift2 = value
          })

        Text('rightArithShift test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathRightArithShift = math.rightArithShift(math.bignumber(this.mathRightArithShift1), math.bignumber(this.mathRightArithShift2)).toFixed(10)
              let time1 = Date.now()
              this.mathTimeRightArithShift = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })


        Text("结果：" + this.mathRightArithShift)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeRightArithShift)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathRadix1 = value
          })

        TextInput({ placeholder: '请输入转化的进制' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathRadix2 = Number(value)
          })

        Text('radix test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              let n: BigNumber = new BigNumber(this.mathRadix1)
              this.mathRadix = n.toString(this.mathRadix2)
              let time1 = Date.now()
              this.mathTimeRadix = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathRadix)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeRadix)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathMultiply1 = value
          })

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathMultiply2 = value
          })

        Text('multiply test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathMultiply = math.multiply(math.bignumber(this.mathMultiply1), math.bignumber(this.mathMultiply2)).toString()
              let time1 = Date.now()
              this.mathTimeMultiply = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathMultiply)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeMultiply)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathMin1 = value
          })

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathMin2 = value
          })

        Text('min test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathMin = math.min(math.bignumber(this.mathMin1), math.bignumber(this.mathMin2)).toFixed(10)
              let time1 = Date.now()
              this.mathTimeMin = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathMin)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeMin)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathMax1 = value
          })

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathMax2 = value
          })

        Text('max test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathMax = math.max(math.bignumber(this.mathMax1), math.bignumber(this.mathMax2)).toFixed(10)
              let time1 = Date.now()
              this.mathTimeMax = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathMax)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeMax)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathLongValue1 = value
          })

        Text('longValue test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathLongValue = long.fromString(this.mathLongValue1).toString()
              let time1 = Date.now()
              this.mathTimeLongValue = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathLongValue)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeLongValue)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathLog1 = value
          })

        Text('log test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathLog = math.log(math.bignumber(this.mathLog1)).toFixed(10)
              let time1 = Date.now()
              this.mathTimeLog = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathLog)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeLog)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathLeftShift1 = value
          })

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathLeftShift2 = value
          })

        Text('leftShift test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathLeftShift = math.leftShift(math.bignumber(this.mathLeftShift1), math.bignumber(this.mathLeftShift2)).toFixed(10)
              let time1 = Date.now()
              this.mathTimeLeftShift = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathLeftShift)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeLeftShift)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathIntValue1 = value
          })

        Text('intValue test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathIntValue = long.fromString(this.mathIntValue1).toInt().toString()
              let time1 = Date.now()
              this.mathTimeIntValue = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathIntValue)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeIntValue)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathFormat1 = value
          })

        Text('format test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathFormat = math.format(math.bignumber(this.mathFormat1))
              let time1 = Date.now()
              this.mathTimeFormat = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathFormat)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeFormat)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathExp1 = value
          })

        Text('exp test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathExp = math.exp(math.bignumber(this.mathExp1)).toFixed(10)
              let time1 = Date.now()
              this.mathTimeExp = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathExp)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeExp)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathDivide1 = value
          })

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathDivide2 = value
          })

        Text('divide test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathDivide = math.divide(math.bignumber(this.mathDivide1), math.bignumber(this.mathDivide2)).toString(10)
              let time1 = Date.now()
              this.mathTimeDivide = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathDivide)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeDivide)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入-1 到 1 之间任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathCos1 = value
          })

        Text('cos test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathCos = math.cos(math.bignumber(this.mathCos1)).toFixed(10)
              let time1 = Date.now()
              this.mathTimeCos = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathCos)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeCos)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathCompare1 = value
          })

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathCompare2 = value
          })

        Text('compare test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathCompare = math.compare(math.bignumber(this.mathCompare1), math.bignumber(this.mathCompare2)).toString()
              let time1 = Date.now()
              this.mathTimeCompare = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathCompare)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeCompare)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathByteValue1 = value
          })

        Text('byteValue test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              let arr = new Int8Array(1)
              arr[0] = long.fromString(this.mathByteValue1).toInt()
              this.mathByteValue = arr[0].toString()
              let time1 = Date.now()
              this.mathTimeByteValue = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathByteValue)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeByteValue)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathAtan1 = value
          })

        Text('atan test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathAtan = math.atan(math.bignumber(this.mathAtan1)).toFixed(10)
              let time1 = Date.now()
              this.mathTimeAtan = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathAtan)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeAtan)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入 -1 到 1 之间任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathAsin1 = value
          })

        Text('asin test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathAsin = math.asin(math.bignumber(this.mathAsin1)).toFixed(10)
              let time1 = Date.now()
              this.mathTimeAsin = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathAsin)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeAsin)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathAdd1 = value
          })

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathAdd2 = value
          })

        Text('add test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathAdd = math.add(math.bignumber(this.mathAdd1), math.bignumber(this.mathAdd2)).toFixed(10)
              let time1 = Date.now()
              this.mathTimeAdd = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathAdd)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeAdd)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入-1 到 1 之间任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathAcosStr = value
          })

        Text('acos test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathAcos = math.acos(math.bignumber(this.mathAcosStr)).toFixed(10)
              let time1 = Date.now()
              this.mathTimeAcos = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathAcos)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeAcos)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathAbsStr = value
          })

        Text('abs test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathAbs = math.abs(math.bignumber(this.mathAbsStr)).toFixed(10)
              let time1 = Date.now()
              this.mathTimeAbs = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathAbs)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeAbs)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text('跳转到首页')
          .fontSize(20)
          .padding(8)
          .margin({ top: 32 })
          .fontWeight(FontWeight.Bold)
          .border({ width: 2, color: '#535353', radius: 6 })
          .onClick(() => {
            router.back()
          })

      }
      .width('100%')
    }
    .scrollable(ScrollDirection.Vertical)
    .scrollBar(BarState.On)
    .scrollBarColor(Color.Gray)
    .scrollBarWidth(30)
    .onScroll((xOffset: number, yOffset: number) => {
      console.info(xOffset + ' ' + yOffset)
    })
    .onScrollEdge((side: Edge) => {
      console.info('To the edge')
    })
    .onScrollEnd(() => {
      console.info('Scroll Stop')
    })
  }
  onPageHide(): void {
    console.log('lllllllllllll消失')
  }
}