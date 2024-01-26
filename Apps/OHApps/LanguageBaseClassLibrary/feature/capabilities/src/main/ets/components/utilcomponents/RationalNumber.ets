/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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

import { compareTo, getDenominator, getValueOf, isFinite, isNaN, isZero } from '../../util/RationalNumberUtil';
import { GridOperation } from '../GridOperation';

const NUMERATOR1: number = 1;
const DENOMINATOR1: number = 2;
const NUMERATOR2: number = 3;
const DENOMINATOR2: number = 4;

@Extend(Text) function textStyle() {
  .border({ width: 1, color: '#000000', radius: 10, style: BorderStyle.Solid })
  .fontSize(24)
  .textAlign(TextAlign.Center)
}

@Preview
@Component
export struct RationalNumber {
  @State resultText: string = '';

  build() {
    Scroll() {
      Column({ space: 12 }) {
        Text($r('app.string.first_rational_number'))
          .width('100%')
          .fontSize(24)
          .textAlign(TextAlign.Start)
        this.Texts(NUMERATOR1, DENOMINATOR1)
        Text($r('app.string.second_rational_number'))
          .width('100%')
          .fontSize(24)
          .textAlign(TextAlign.Start)
        this.Texts(NUMERATOR2, DENOMINATOR2)
        Text(this.resultText)
          .textStyle()
          .width('100%')
          .height(100)
        GridOperation({ operationRes: $r('app.strarray.rational_number_operations'), doOperation: this.doOperation })
      }
      .width('100%')
      .padding(16)
    }
    .scrollBar(BarState.Off)
    .align(Alignment.Start)
  }

  @Builder
  Texts(numerator: number, denominator: number) {
    Row() {
      Text($r('app.string.numerator'))
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
      Text(`${numerator}`)
        .textStyle()
        .margin({ left: 5 })
        .layoutWeight(1)
      Text($r('app.string.denominator'))
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
      Text(`${denominator}`)
        .textStyle()
        .margin({ left: 5 })
        .layoutWeight(1)
    }
    .width('100%')
    .alignItems(VerticalAlign.Center)
    .justifyContent(FlexAlign.SpaceAround)
  }

  doOperation = (index: number) => {
    switch (index) {
      case 0:
        this.resultText = compareTo();
        break;
      case 1:
        this.resultText = getValueOf();
        break;
      case 2:
        this.resultText = getDenominator();
        break;
      case 3:
        this.resultText = isZero();
        break;
      case 4:
        this.resultText = isNaN();
        break;
      case 5:
        this.resultText = isFinite();
        break;
      default:
        break;
    }
  }
}