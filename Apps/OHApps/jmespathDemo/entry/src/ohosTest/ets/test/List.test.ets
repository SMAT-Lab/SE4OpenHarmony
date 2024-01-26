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

import parsing from './parsing.test'
import search from './search.test'
import strictDeepEqual from './strictDeepEqual.test'
import tokenize from './tokenize.test'
import basic from './basic.test'
import current from './current.test'
import boolean from './boolean.test'
import escape from './escape.test'
import filters from './filters.test'
import functions from './functions.test'
import identifiers from './identifiers.test'
import indices from './indices.test'
import literal from './literal.test'
import multiselect from './multiselect.test'
import pipe from './pipe.test'
import slice from './slice.test'
import syntax from './syntax.test'
import unicode from './unicode.test'
import wildcard from './wildcard.test'
import jmespathAPI from './jmespathAPI.test'

export default function testsuite() {
  jmespathAPI()
  tokenize()
  parsing()
  strictDeepEqual()
  search()
  basic()
  boolean()
  current()
  escape()
  filters()
  functions()
  identifiers()
  indices()
  literal()
  multiselect()
  pipe()
  slice()
  syntax()
  unicode()
  wildcard()
}