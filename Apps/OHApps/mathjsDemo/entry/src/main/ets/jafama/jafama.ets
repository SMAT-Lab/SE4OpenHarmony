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
import * as math from 'mathjs';
import router from '@ohos.router';

@Entry
@Component
struct Index {
  scroller: Scroller = new Scroller()
  zerosStr = '0'
  @State message: string = 'jafama 测试'
  @State log2Value: math.BigNumber = math.bignumber(0)
  @State acoshValue: string = this.zerosStr
  @State asinhValue: string = this.zerosStr
  @State atan2Value: string = this.zerosStr
  @State coshValue: string = this.zerosStr
  @State sinhValue: string = this.zerosStr
  @State tanhValue: string = this.zerosStr
  @State isEvenValue: string = this.zerosStr
  @State oddValue: string = this.zerosStr
  @State log2ValueTime: string = this.zerosStr
  @State acoshValueTime: string = this.zerosStr
  @State asinhValueTime: string = this.zerosStr
  @State atan2ValueTime: string = this.zerosStr
  @State coshValueTime: string = this.zerosStr
  @State sinhValueTime: string = this.zerosStr
  @State tanhValueTime: string = this.zerosStr
  @State isEvenValueTime: string = this.zerosStr
  @State oddValueTime: string = this.zerosStr
  @State mathAbsNeg: string = this.zerosStr
  @State mathTimeAbsNeg: string = this.zerosStr
  @State mathACosh1p: string = this.zerosStr
  @State mathTimeACosh1p: string = this.zerosStr
  @State mathAtanh: string = this.zerosStr
  @State mathTimeAtanh: string = this.zerosStr
  @State mathCbrt: string = this.zerosStr
  @State mathTimeCbrt: string = this.zerosStr
  @State mathCeil: string = this.zerosStr
  @State mathTimeCeil: string = this.zerosStr
  @State mathCoshm1: string = this.zerosStr
  @State mathTimeCoshm1: string = this.zerosStr
  @State mathHypot: string = this.zerosStr
  @State mathTimeHypot: string = this.zerosStr
  @State mathLog1p: string = this.zerosStr
  @State mathTimeLog1p: string = this.zerosStr
  @State mathLog10: string = this.zerosStr
  @State mathTimeLog10: string = this.zerosStr
  @State mathPow: string = this.zerosStr
  @State mathTimePow: string = this.zerosStr
  mathPow1: string = ''
  mathPow2: string = ''
  mathLog101: string = ''
  mathLog1p1: string = ''
  mathHypot1: string = ''
  mathHypot2: string = ''
  mathCoshm: string = ''
  mathCeil1: string = ''
  mathCbrt1: string = ''
  mathAtanh1: string = ''
  mathACosh1p1: string = ''
  mathAbsNeg1: string = ''
  mathlog2: string = ''
  mathacosh: string = ''
  mathasinh: string = ''
  mathatan1: string = ''
  mathatan2: string = ''
  mathcosh: string = ''
  mathsinh: string = ''
  mathtanh: string = ''
  mathceil: string = ''
  mathodd: string = ''

  build() {
    Scroll(this.scroller) {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入数值' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathPow1 = value
          })

        TextInput({ placeholder: '请输入数值' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathPow2 = value
          })

        Text('pow test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathPow = math.pow(math.evaluate(this.mathPow1), math.evaluate(this.mathPow2)).toString()
              let time1 = Date.now()
              this.mathTimePow = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathPow)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimePow)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入数值' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathLog101 = value
          })

        Text('log10 test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathLog10 = math.log10(math.evaluate(this.mathLog101)).toString()
              let time1 = Date.now()
              this.mathTimeLog10 = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathLog10)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeLog10)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入数值' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathLog1p1 = value
          })


        Text('log1p test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathLog1p = math.log1p(math.evaluate(this.mathLog1p1)).toString()
              let time1 = Date.now()
              this.mathTimeLog1p = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("log1p：" + this.mathLog1p)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeLog1p)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入数值' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathHypot1 = value
          })

        TextInput({ placeholder: '请输入数值' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathHypot2 = value
          })

        Text('hypot test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathHypot = math.hypot(math.evaluate(this.mathHypot1), math.evaluate(this.mathHypot2)).toString()
              let time1 = Date.now()
              this.mathTimeHypot = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("hypot：" + this.mathHypot)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeHypot)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入数值' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathCoshm = value
          })

        Text('coshm1 test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathCoshm1 = (math.cosh(math.evaluate(this.mathCoshm)) - 1).toString()
              let time1 = Date.now()
              this.mathTimeCoshm1 = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("coshm1：" + this.mathCoshm1)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeCoshm1)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入数值' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathCeil1 = value
          })

        Text('ceil test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathCeil = math.ceil(math.evaluate(this.mathCeil1)).toString()
              let time1 = Date.now()
              this.mathTimeCeil = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("ceil：" + this.mathCeil)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeCeil)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入数值' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathCbrt1 = value
          })

        Text('cbrt test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathCbrt = math.cbrt(math.evaluate(this.mathCbrt1)).toString()
              let time1 = Date.now()
              this.mathTimeCbrt = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("cbrt：" + this.mathCbrt)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeCbrt)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入数值' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathAtanh1 = value
          })

        Text('atanh test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathAtanh = math.atanh(math.evaluate(this.mathAtanh1)).toString()
              let time1 = Date.now()
              this.mathTimeAtanh = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("atanh：" + this.mathAtanh)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeAtanh)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入数值' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathACosh1p1 = value
          })

        Text('acosh1p test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathACosh1p = math.acosh(math.bignumber(this.mathACosh1p1 + 1)).toString()
              let time1 = Date.now()
              this.mathTimeACosh1p = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("acosh1p：" + this.mathACosh1p)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeACosh1p)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入数值' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathAbsNeg1 = value
          })

        Text('absNeg test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathAbsNeg = math.subtract(0, math.abs(math.bignumber(this.mathAbsNeg1))).toString(10)
              let time1 = Date.now()
              this.mathTimeAbsNeg = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathAbsNeg)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeAbsNeg)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入数值' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathodd = value
          })

        Text('isOdd 测试')
          .fontSize(16)
          .margin({ top: 32 })
          .padding(8)
          .border({ width: 2, color: '#535353', radius: 6 })
          .onClick(() => {
            try {
              let time = Date.now()
              this.oddValue = isOdd(Number(this.mathodd)).toString()
              let time1 = Date.now()
              this.oddValueTime = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text('isOdd:' + this.oddValue)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.oddValueTime)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入数值' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathceil = value
          })

        Text('isEven 测试')
          .fontSize(16)
          .margin({ top: 32 })
          .padding(8)
          .border({ width: 2, color: '#535353', radius: 6 })
          .onClick(() => {
            try {
              let time = Date.now()
              this.isEvenValue = isEven(Number(this.mathceil)).toString()
              let time1 = Date.now()
              this.isEvenValueTime = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text('isEven:' + this.isEvenValue)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.isEvenValueTime)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入数值' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathlog2 = value
          })

        Text('log2测试')
          .fontSize(16)
          .margin({ top: 32 })
          .padding(8)
          .border({ width: 2, color: '#535353', radius: 6 })
          .onClick(() => {
            try {
              let time = Date.now()
              this.log2Value = math.log2(math.bignumber(this.mathlog2))
              let time1 = Date.now()
              this.log2ValueTime = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text('log2:' + this.log2Value)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.log2ValueTime)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入大于等于 1 的任意实数' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathacosh = value
          })

        Text('acosh测试')
          .fontSize(16)
          .margin({ top: 32 })
          .padding(8)
          .border({ width: 2, color: '#535353', radius: 6 })
          .onClick(() => {
            try {
              let time = Date.now()
              this.acoshValue = math.acosh(math.evaluate(this.mathacosh)).toString()
              let time1 = Date.now()
              this.acoshValueTime = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text('acosh:' + this.acoshValue)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.acoshValueTime)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入数值' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathasinh = value
          })

        Text('asinh测试')
          .fontSize(16)
          .margin({ top: 32 })
          .padding(8)
          .border({ width: 2, color: '#535353', radius: 6 })
          .onClick(() => {
            try {
              let time = Date.now()
              this.asinhValue = math.asinh(math.evaluate(this.mathasinh)).toString()
              let time1 = Date.now()
              this.asinhValueTime = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text('asinh:' + this.asinhValue)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.asinhValueTime)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入数值' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathatan1 = value
          })

        TextInput({ placeholder: '请输入数值' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathatan2 = value
          })

        Text('atan2测试')
          .fontSize(16)
          .margin({ top: 32 })
          .padding(8)
          .border({ width: 2, color: '#535353', radius: 6 })
          .onClick(() => {
            try {
              let time = Date.now()
              this.atan2Value = math.atan2(math.evaluate(this.mathatan1), math.evaluate(this.mathatan2)).toString()
              let time1 = Date.now()
              this.atan2ValueTime = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text('atan2:' + this.atan2Value)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.atan2ValueTime)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入数值' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathcosh = value
          })

        Text('cosh测试')
          .fontSize(16)
          .margin({ top: 32 })
          .padding(8)
          .border({ width: 2, color: '#535353', radius: 6 })
          .onClick(() => {
            try {
              let time = Date.now()
              this.coshValue = math.cosh(math.evaluate(this.mathcosh)).toString()
              let time1 = Date.now()
              this.coshValueTime = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text('cosh:' + this.coshValue)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.coshValueTime)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入数值' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathsinh = value
          })

        Text('sinh测试')
          .fontSize(16)
          .margin({ top: 32 })
          .padding(8)
          .border({ width: 2, color: '#535353', radius: 6 })
          .onClick(() => {
            try {
              let time = Date.now()
              this.sinhValue = math.sinh(math.evaluate(this.mathsinh)).toString()
              let time1 = Date.now()
              this.sinhValueTime = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text('sinh:' + this.sinhValue)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.sinhValueTime)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入数值' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathtanh = value
          })

        Text('tanh测试')
          .fontSize(16)
          .margin({ top: 32 })
          .padding(8)
          .border({ width: 2, color: '#535353', radius: 6 })
          .onClick(() => {
            try {
              let time = Date.now()
              this.tanhValue = math.tanh(math.evaluate(this.mathtanh)).toString()
              let time1 = Date.now()
              this.tanhValueTime = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text('tanh:' + this.tanhValue)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.tanhValueTime)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text('跳转到首页')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
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

function isEven( x: number ): boolean {
  return isInteger( x/2.0 );
}

function isOdd( x: number ): boolean {
  // Check sign to prevent overflow...
  if ( x > 0.0 ) {
    return isEven( x-1.0 );
  }
  return isEven( x+1.0 );
}

function isInteger( x: number ): boolean {
  return (floor(x) === x);
}

const floor = Math.floor;