/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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

export interface Data {
  added?: undefined | boolean
  count: number
  removed?: undefined | boolean
  value: string | Params[] | Array<boolean | number | string>
}

export interface Options {
  ignoreCase?: boolean
  ignoreWhitespace?: boolean
  newlineIsToken?: boolean
  undefinedReplacement?: boolean | null
  foo?: string
  stringifyReplacer?: (k, v) => {}
  comparator?: (left: Params, right: Params) => {}
  fuzzFactor?: number
  test?: string
  test2?: string
}

export interface Params {
  a?: number | Date | RegExp | Error | Error[] | Params | Array<number | Params>
  b?: number | Date
  c?: number | Date | null | undefined | Array<number | Options>
  d?: number
}

export interface Patch {
  index?: string
  oldFileName?: string
  newFileName?: string
  oldHeader?: string
  newHeader?: string
  hunks?: Hunks[]
}

export interface Hunks {
  oldStart?: number
  oldLines?: number
  newStart?: number
  newLines?: number
  lines?: string[]
  linedelimiters?: string[]
}