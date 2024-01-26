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
import tempUtilsTest from './TempUtil.test'
import countryUtilsTest from './CountryUtils.test'
import nodeCacheTest from './NodeCache.test'
import gcoordTest from  './Gcoord.test'
import colorTest from  './Color.test'
import timeTest from  './Time.test'
import picture from  './Picture.test'
import portTime from  './portTime.test'
export default function testsuite() {
  tempUtilsTest()
  countryUtilsTest()
  nodeCacheTest()
  gcoordTest()
  colorTest()
  timeTest()
  picture()
  // portTime()
}