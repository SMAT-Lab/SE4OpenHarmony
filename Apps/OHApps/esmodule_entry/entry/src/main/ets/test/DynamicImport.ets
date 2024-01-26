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

export default function dynamicImport() {
  describe("DynamicImportTest", async () => {
    it('importHar', 0, async () => {
      let lib = await import('har')
      expect(lib.add(2, 3)).assertEqual(5)
    })
    it('importRelative', 0, async () => {
      let lib = await import('./test')
      expect(lib.add(2, 3)).assertEqual(5)
      expect(lib.default).assertEqual('test')
    })
    it('importOhpm', 0, async () => {
      let lib = await import('leap-year')
      expect(lib.default(2000)).assertEqual(true)
    })
    it('importSystemInternal', 0, async () => {
      let lib = await import('@ohos.hilog')
      lib.default.info(0x0000, "testTag", 'dexter log: call ohos.hilog')
    })
    it('importSystemBuiltin', 0, async () => {
      let lib = await import('@system.app')
      lib.default.getInfo()
    })
    it('importAppNapi', 0, async () => {
      let lib = await import('libentry.so')
      expect(lib.default.add(2,3)).assertEqual(5)
    })
  })
}