/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import BigNumberJs from './BigNumber.test'
import absoluteValue from './absoluteValue.test'
import close from './close.test'
import comparedTo from './comparedTo.test'
import config from './config.test'
import decimalPlaces from './decimalPlaces.test'
import dividedBy from './dividedBy.test'
import dividedToIntegerBy from './dividedToIntegerBy.test'
import exponentiatedBy from './exponentiatedBy.test'
import integerValue from './integerValue.test'
import isBigNumber from './isBigNumber.test'
import isMethods from './isMethods.test'
import minmax from './minmax.test'
import minus from './minus.test'
import modulo from './modulo.test'
import multipliedBy from './multipliedBy.test'
import negated from './negated.test'
import plus from './plus.test'
import precision from './precision.test'
import random from './random.test'
import shiftedBy from './shiftedBy.test'
import squareRoot from './squareRoot.test'
import sum from './sum.test'
import toExponential from './toExponential.test'
import toFixed from './toFixed.test'
import toFormat from './toFormat.test'
import toFraction from './toFraction.test'
import toNumber from './toNumber.test'
import toPrecision from './toPrecision.test'
import toString from './toString.test'

export default function testsuite() {
  BigNumberJs()
  absoluteValue()
  close()
  comparedTo()
  config()
  decimalPlaces()
  dividedBy()
  dividedToIntegerBy()
  exponentiatedBy()
  integerValue()
  isBigNumber()
  isMethods()
  minmax()
  minus()
  modulo()
  multipliedBy()
  negated()
  plus()
  precision()
  random()
  shiftedBy()
  squareRoot()
  sum()
  toExponential()
  toFixed()
  toFormat()
  toFraction()
  toNumber()
  toPrecision()
  toString()
}