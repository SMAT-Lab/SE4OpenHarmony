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
import router from '@ohos.router'
import {describe, it} from "@ohos/hypium"
import {Sleep} from './Util'

export default function pageImport() {
  describe("PageImportTest", () => {
    it('pageImportHar', 0, async () => {
      await Sleep(1000)
      router.clear()
      await router.pushUrl({url: "pages/PageImportHar"})
      await Sleep(1000)
      router.back()
      await Sleep(1000)
    })
    it('pageImportOhpm', 0, async () => {
      await Sleep(1000)
      router.clear()
      await router.pushUrl({url: "pages/PageImportOhpm"})
      await Sleep(1000)
      router.back()
      await Sleep(1000)
    })
    it('pageImportRelative', 0, async () => {
      await Sleep(1000)
      router.clear()
      await router.pushUrl({url: "pages/PageImportRelative"})
      await Sleep(1000)
      router.back()
      await Sleep(1000)
    })
    it('pageImportAppNapi', 0, async () => {
      await Sleep(1000)
      router.clear()
      await router.pushUrl({url: "pages/PageImportNapi"})
      await Sleep(1000)
      router.back()
      await Sleep(1000)
    })
    it('pageImportSystemNapi', 0, async () => {
      await Sleep(1000)
      router.clear()
      await router.pushUrl({url: "pages/PageImportSystem"})
      await Sleep(1000)
      router.back()
      await Sleep(1000)
    })
  })
}
