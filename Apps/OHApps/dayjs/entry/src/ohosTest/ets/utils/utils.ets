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
import {
  describe as _describe,
  beforeAll as _beforeAll,
  beforeEach as _beforeEach,
  afterEach as _afterEach,
  afterAll as _afterAll,
  it as _it,
  expect as _expect,
  TestType,
  Size,
  Level
} from '@ohos/hypium'

export function describe(testSuiteName: string, callback: Function): void {
  return _describe(testSuiteName, callback)
}

export function it(testCaseName: string, callback: Function): void {
  testCaseName = testCaseName.split("_").join("__")
  return _it(testCaseName, TestType.FUNCTION, callback)
}

export function expect(actualValue?: boolean | string | number) {

  interface ReType {
    toBe: (value: boolean | string | number, tValue?: boolean | string | number) => void
    toBeInstanceOf: (expectValue: string) => void
    toEqual: (value: string | number, tValue?: string | number) => void
  }

  let instant: (expectValue: string) => void = _expect(actualValue).assertInstanceOf

  let result: ReType = {
    toBe: (value: boolean | string | number, tValue?: boolean | string | number): void => _expect(actualValue)
      .assertEqual(value),
    toBeInstanceOf: instant,
    toEqual: (value: string | number, tValue?: string | number): void => _expect(actualValue).assertEqual(value)
  }

  return result
}

export function responseTime(fn: Function, name: string) {
  let startTime1 = new Date().getTime();
  fn();
  let endTime1 = new Date().getTime();
  let averageTime1 = (endTime1 - startTime1) * 1000;
  console.log("dayjs：" + name + " : " + averageTime1 + "us")
}