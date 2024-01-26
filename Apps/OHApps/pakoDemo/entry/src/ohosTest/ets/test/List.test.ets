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
import StringsTest from './Strings.test'
import MiscTest from './Misc.test'
import InflateTest from './Inflate.test'
import InflateCoverPortedTest from './InflateCoverPorted.test'
import GzipSpecialsTest from './GzipSpecials.test'
import DeflateTest from './Deflate.test'
import BeflateCoverTest from './BeflateCover.test'
import ChunksTest from './Chunks.test'
import BinaryCmpareTest from './BinaryCompare.test'

export default function testsuite() {
  InflateCoverPortedTest()
  StringsTest();
  MiscTest()
  InflateTest()
  GzipSpecialsTest()
  DeflateTest()
  BeflateCoverTest()
  ChunksTest()
  BinaryCmpareTest()
}