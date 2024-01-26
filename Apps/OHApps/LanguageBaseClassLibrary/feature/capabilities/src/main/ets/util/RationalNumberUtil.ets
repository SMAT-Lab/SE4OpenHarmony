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

import util from '@ohos.util';
import { getString } from '@ohos/common';

const NUMERATOR1: number = 1;
const DENOMINATOR1: number = 2;
const NUMERATOR2: number = 3;
const DENOMINATOR2: number = 4;
const RATIONAL_NUMBER1 = util.RationalNumber.parseRationalNumber(NUMERATOR1, DENOMINATOR1);
const RATIONAL_NUMBER2 = util.RationalNumber.parseRationalNumber(NUMERATOR2, DENOMINATOR2);

export function compareTo(): string {
  let result = RATIONAL_NUMBER1.compare(RATIONAL_NUMBER2)
  if (result === 0) {
    return getString($r('app.string.equal_to'));
  }
  if (result === 1) {
    return getString($r('app.string.greater_than'));
  }
  if (result === -1) {
    return getString($r('app.string.less_than'));
  }
  return '';
}

export function getValueOf(): string {
  let valueOf = RATIONAL_NUMBER1.valueOf();
  return `${getString($r('app.string.rational_number_value_of'))}${valueOf}`;
}

export function getDenominator(): string {
  let numerator = RATIONAL_NUMBER1.getNumerator();
  let denominator = RATIONAL_NUMBER1.getDenominator();
  return `${getString($r('app.string.numerator'))}${numerator}, ${getString($r('app.string.denominator'))}${denominator}`;
}

export function isZero(): string {
  let isZero = RATIONAL_NUMBER1.isZero();
  console.log('ButtonComponent isZero' + isZero);
  if (isZero) {
    return `${getString($r('app.string.first_rational_number'))} is zero`;
  } else {
    return `${getString($r('app.string.first_rational_number'))} is not zero`;
  }
}

export function isNaN(): string {
  let isNaN = RATIONAL_NUMBER1.isNaN();
  if (isNaN) {
    return `${getString($r('app.string.first_rational_number'))} is NaN`;
  } else {
    return `${getString($r('app.string.first_rational_number'))} is not NaN`;
  }
}

export function isFinite(): string {
  let isFinite = RATIONAL_NUMBER1.isFinite();
  if (isFinite) {
    return `${getString($r('app.string.first_rational_number'))} is Finite`;
  } else {
    return `${getString($r('app.string.first_rational_number'))} is not Finite`;
  }
}

