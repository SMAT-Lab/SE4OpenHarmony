/**
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
import {describe, it, expect} from "@ohos/hypium"
import {add as add1} from 'har'
import {ohpmRes} from 'har'
import {add as add2} from './test'
import isLeapYear1 from 'leap-year'
import hilog from "@ohos.hilog"
import app from "@system.app"
import testNapi from "libentry.so"

export default function staticImport() {
  describe("StaticImportTest", () => {
    it('importHar', 0, () => {
      expect(add1(2, 3)).assertEqual(5)
    })
    it('importRelative', 0, () => {
      expect(add2(2, 3)).assertEqual(5)
    })
    it('importOhpm', 0, () => {
      expect(isLeapYear1(2000)).assertEqual(true)
    })
    it('importSystemInternal', 0, () => {
      hilog.info(0x0000, "testTag", 'dexter log: call ohos.hilog')
    })
    it('importSystemBuiltin', 0, () => {
      app.getInfo()
    })
    it("harImportOhpm", 0, () => {
      expect(ohpmRes).assertEqual(true)
    })
    it("importAppNapi", 0,() => {
      expect(testNapi.add(2, 3)).assertEqual(5)
    })
  })
}

