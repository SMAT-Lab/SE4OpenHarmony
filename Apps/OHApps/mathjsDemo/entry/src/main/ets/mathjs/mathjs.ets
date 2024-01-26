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
  @State message: string = 'mathjs 测试'
  @State mathlsolve: string = this.zerosStr
  @State mathTimelsolve: string = this.zerosStr
  @State mathlusolve: string = this.zerosStr
  @State mathTimelusolve: string = this.zerosStr
  @State mathsimplify: string = this.zerosStr
  @State mathTimesimplify: string = this.zerosStr
  @State mathsimplifyConstant: string = this.zerosStr
  @State mathTimesimplifyConstant: string = this.zerosStr
  @State mathusolve: string = this.zerosStr
  @State mathTimeusolve: string = this.zerosStr
  @State mathcumsum: string = this.zerosStr
  @State mathTimecumsum: string = this.zerosStr
  @State mathmad: string = this.zerosStr
  @State mathTimemad: string = this.zerosStr
  @State mathmean: string = this.zerosStr
  @State mathTimemean: string = this.zerosStr
  @State mathProd: string = this.zerosStr
  @State mathTimeProd: string = this.zerosStr
  @State mathSum: string = this.zerosStr
  @State mathTimeSum: string = this.zerosStr
  @State mathVariance: string = this.zerosStr
  @State mathTimeVariance: string = this.zerosStr
  @State mathHasNumericValue: string = this.zerosStr
  @State mathTimeHasNumericValue: string = this.zerosStr
  @State mathIsInteger: string = this.zerosStr
  @State mathTimeIsInteger: string = this.zerosStr
  @State mathIsNaN: string = this.zerosStr
  @State mathTimeIsNaN: string = this.zerosStr
  @State mathIsNumeric: string = this.zerosStr
  @State mathTimeIsNumeric: string = this.zerosStr
  @State mathIsPrime: string = this.zerosStr
  @State mathTimeIsPrime: string = this.zerosStr
  @State mathIsZero: string = this.zerosStr
  @State mathTimeIsZero: string = this.zerosStr
  @State bitwiseMath: string = this.zerosStr
  @State mathbitNot: string = this.zerosStr
  @State mathbitOr: string = this.zerosStr
  @State mathbitXor: string = this.zerosStr
  @State mathTimeBitwise: string = this.zerosStr
  @State mathTimebitNot: string = this.zerosStr
  @State mathTimebitOr: string = this.zerosStr
  @State mathTimebitXor: string = this.zerosStr
  arrays = '[[10, 1, 10], [1, 10, 1], [10, 1, 10]]'
  arrayMath = '[10, 1, 10]'
  mathIsZeroArr = this.arrayMath
  mathIsPrimeArr = this.arrayMath
  mathIsNumericArr = this.arrayMath
  mathIsNaNArr = this.arrayMath
  mathIsIntegerArr = this.arrayMath
  mathHasNumericValueArr = this.arrayMath
  mathVarianceArr = this.arrayMath
  mathSumArr = this.arrayMath
  mathProdArr = this.arrayMath
  mathmeanArr = '[[2,5],[6,3],[1,7]]'
  mathmean1: string = ''
  mathmadArr = this.arrays
  mathcumsumArr = this.arrays
  mathusolveArr = this.arrays
  mathnumusolve = '[1,2,3]'
  mathsimplifyConstantStr = '2 * 2^ (2 - 1)'
  mathnumsimplifyConstant: math.SimplifyOptions = { exactFractions: true }
  mathsimplifyStr = '2 * 1 * x ^ (2 - 1)'
  mathnumsimplify: ESObject = { x: 4 }
  mathnumsimplify1: math.SimplifyOptions = { exactFractions: true }
  mathlsolveArr = this.arrays
  mathnumlsolve = '[1,2,3]'
  mathlusolveArr = '[[-2, 3], [2, 1]]'
  mathnumlusolve = '[11, 9]'
  mathBitwise = '1'
  mathapplybitNot = '1'
  mathapplybitOr = '1'
  mathapplybitOr1 = '1'
  mathapplybitXor = '1'
  mathapplybitXor1 = '1'
  mathnum = '0'

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
            this.mathBitwise = value
          })

        TextInput({ placeholder: '请输入数值' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathnum = value
          })

        Text('bitAnd test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.bitwiseMath = math.bitAnd(math.evaluate(this.mathBitwise), math.evaluate(this.mathnum)).toString()
              let time1 = Date.now()
              this.mathTimeBitwise = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.bitwiseMath)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeBitwise)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入数值' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathapplybitNot = value
          })

        Text('bitNot test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathbitNot = math.bitNot(math.evaluate(this.mathapplybitNot)).toString()
              let time1 = Date.now()
              this.mathTimebitNot = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathbitNot)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimebitNot)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入数值' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathapplybitOr = value
          })

        TextInput({ placeholder: '请输入数值' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathapplybitOr1 = value
          })

        Text('bitOr test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathbitOr = math.bitOr(math.evaluate(this.mathapplybitOr), math.evaluate(this.mathapplybitOr1)).toString()
              let time1 = Date.now()
              this.mathTimebitOr = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathbitOr)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimebitOr)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入数值' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathapplybitXor = value
          })

        TextInput({ placeholder: '请输入数值' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathapplybitXor1 = value
          })

        Text('bitXor test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathbitXor = math.bitXor(math.evaluate(this.mathapplybitXor), math.evaluate(this.mathapplybitXor1)).toString()
              let time1 = Date.now()
              this.mathTimebitXor = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathbitXor)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimebitXor)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入对称矩阵 如： [10,1,10]' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathIsZeroArr = value
          })

        Text('isZero test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathIsZero = math.isZero(math.evaluate(this.mathIsZeroArr)).toString()
              let time1 = Date.now()
              this.mathTimeIsZero = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathIsZero)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeIsZero)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入number| [10,1,10]' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathIsPrimeArr = value
          })

        Text('isPrime test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathIsPrime = math.isPrime(math.evaluate(this.mathIsPrimeArr)).toString()
              let time1 = Date.now()
              this.mathTimeIsPrime = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathIsPrime)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeIsPrime)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入number| [10,1,10]' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathIsNumericArr = value
          })

        Text('isNumeric test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathIsNumeric = math.isNumeric(math.evaluate(this.mathIsNumericArr)).toString()
              let time1 = Date.now()
              this.mathTimeIsNumeric = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathIsNumeric)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeIsNumeric)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入number | [10,1,10]' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathIsNaNArr = value
          })

        Text('isNaN test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathIsNaN = math.isNaN(math.evaluate(this.mathIsNaNArr)).toString()
              let time1 = Date.now()
              this.mathTimeIsNaN = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathIsNaN)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeIsNaN)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入number| [10,1,10]' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathIsIntegerArr = value
          })

        Text('isInteger test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathIsInteger = math.isInteger(math.evaluate(this.mathIsIntegerArr)).toString()
              let time1 = Date.now()
              this.mathTimeIsInteger = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathIsInteger)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeIsInteger)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入对称矩阵 如： [10,1,10]' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathHasNumericValueArr = value
          })

        Text('hasNumericValue test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathHasNumericValue = math.hasNumericValue(math.evaluate(this.mathHasNumericValueArr)).toString()
              let time1 = Date.now()
              this.mathTimeHasNumericValue = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathHasNumericValue)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeHasNumericValue)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入对称矩阵 如： [10,1,10]' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathVarianceArr = value
          })

        Text('variance test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathVariance = math.variance(math.evaluate(this.mathVarianceArr)).toString()
              let time1 = Date.now()
              this.mathTimeVariance = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathVariance)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeVariance)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入对称矩阵 如： [10,1,10]' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathSumArr = value
          })

        Text('sum test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathSum = math.sum(math.evaluate(this.mathSumArr)).toString()
              let time1 = Date.now()
              this.mathTimeSum = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathSum)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeSum)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入对称矩阵 如： [10,1,10]' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathProdArr = value
          })

        Text('prod test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathProd = math.prod(math.evaluate(this.mathProdArr)).toString()
              let time1 = Date.now()
              this.mathTimeProd = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathProd)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeProd)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入数组 如： [[2,5],[6,3],[1,7]]' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathmeanArr = value
          })

        TextInput({ placeholder: '请输入数值或者不输入' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathmean1 = value
          })

        Text('mean test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              if (this.mathmean1) {
                this.mathmean = math.mean(math.evaluate(this.mathmeanArr), math.evaluate(this.mathmean1)).toString()
              } else {
                this.mathmean = math.mean(math.evaluate(this.mathmeanArr)).toString()
              }
              let time1 = Date.now()
              this.mathTimemean = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathmean)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimemean)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入对称矩阵 如： [[10,1,10],[1,10,1],[10,1,10]]' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathmadArr = value
          })

        Text('mad test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathmad = math.mad(math.evaluate(this.mathmadArr)).toString()
              let time1 = Date.now()
              this.mathTimemad = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathmad)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimemad)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入对称矩阵 如： [[10,1,10],[1,10,1],[10,1,10]]' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathcumsumArr = value
          })

        Text('cumsum test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathcumsum = math.cumsum(math.evaluate(this.mathcumsumArr)).toString()
              let time1 = Date.now()
              this.mathTimecumsum = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathcumsum)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimecumsum)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入对称矩阵 如：[[10, 1, 10], [1, 10, 1], [10, 1, 10]]' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathusolveArr = value
          })

        TextInput({ placeholder: '请输入矩阵 如：[[1, 2, 3]' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathnumusolve = value
          })

        Text('usolve test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathusolve = math.usolve(math.evaluate(this.mathusolveArr), math.evaluate(this.mathnumusolve)).toString()
              let time1 = Date.now()
              this.mathTimeusolve = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathusolve)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimeusolve)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入表达式 如： 2 * 2 ^ (2 - 1)' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathsimplifyConstantStr = value
          })

        TextInput({ placeholder: '请输入如： Boolean值 或者不输入' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathnumsimplifyConstant.exactFractions = new Boolean(value).valueOf()
          })

        Text('simplifyConstant test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathsimplifyConstant = math.simplifyConstant(this.mathsimplifyConstantStr, this.mathnumsimplifyConstant).toString()
              let time1 = Date.now()
              this.mathTimesimplifyConstant = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathsimplifyConstant)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimesimplifyConstant)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入表达式 如： 2 * 1 * x ^ (2 - 1)' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathsimplifyStr = value
          })

        TextInput({ placeholder: '请输入数值 或者 不输入' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathnumsimplify.x = Number(value)
          })

        TextInput({ placeholder: '请输入如：{exactFractions: true} 或者不输入' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathnumsimplify1.exactFractions = new Boolean(value).valueOf()
          })

        Text('simplify test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathsimplify = math.simplify(this.mathsimplifyStr, this.mathnumsimplify, this.mathnumsimplify1).toString()
              let time1 = Date.now()
              this.mathTimesimplify = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathsimplify)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimesimplify)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        TextInput({ placeholder: '请输入数组 如：[[-2, 3], [2, 1]]' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathlusolveArr = value
          })

        TextInput({ placeholder: '请输入数组 如：[11, 9]' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathnumlusolve = value
          })

        Text('lusolve test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathlusolve = math.lusolve(math.evaluate(this.mathlusolveArr), math.evaluate(this.mathnumlusolve)).toString()
              let time1 = Date.now()
              this.mathTimelusolve = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathlusolve)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimelusolve)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)


        TextInput({ placeholder: '请输入数组 如：[[10, 1, 10], [1, 10, 1], [10, 1, 10]]' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathlsolveArr = value
          })

        TextInput({ placeholder: '请输入数组 如：[1,2,3]' })
          .caretColor(Color.Blue)
          .height(50)
          .fontSize(30)
          .onChange((value: string) => {
            this.mathnumlsolve = value
          })

        Text('lsolve test')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            try {
              let time = Date.now()
              this.mathlsolve = math.lsolve(math.evaluate(this.mathlsolveArr), math.evaluate(this.mathnumlsolve)).toString()
              let time1 = Date.now()
              this.mathTimelsolve = (time1 - time).toString()
            } catch (err) {
              console.log('errerr ' + err)
            }
          })

        Text("结果：" + this.mathlsolve)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Text("时间：" + this.mathTimelsolve)
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