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
import worker from '@ohos.worker'
import { describe, it, expect } from "@ohos/hypium"
import {Sleep} from './Util'

export default function workerImport() {
  describe("WorkerImportTest", () => {
    it('importOhpm', 0, async () => {
      let workerImportOhpm = 'failed'
      let threadWorker = new worker.ThreadWorker('entry/ets/workers/workerImportOhpm')
      threadWorker.postMessage("ModuleTest host to worker")
      threadWorker.onmessage = () => {
        workerImportOhpm = 'success';
      }
      await Sleep(2000)
      expect(workerImportOhpm).assertEqual('success')
    })
    it('importRelative', 0, async () => {
      let workerImportRelative = 'failed'
      let threadWorker = new worker.ThreadWorker('entry/ets/workers/workerImportRelative')
      threadWorker.postMessage("ModuleTest host to worker")
      threadWorker.onmessage = () => {
        workerImportRelative = 'success';
      }
      await Sleep(2000)
      expect(workerImportRelative).assertEqual('success')
    })
    it('importSystemNapi', 0, async () => {
      let workerImportSystem = 'failed'
      let threadWorker = new worker.ThreadWorker('entry/ets/workers/workerImportSystem')
      threadWorker.postMessage("ModuleTest host to worker")
      threadWorker.onmessage = () => {
        workerImportSystem = 'success';
      }
      await Sleep(2000)
      expect(workerImportSystem).assertEqual('success')
    })
    it('importAppNapi', 0, async () => {
      let workerImportNapi = 'failed'
      let threadWorker = new worker.ThreadWorker('entry/ets/workers/workerImportNapi')
      threadWorker.postMessage("ModuleTest host to worker")
      threadWorker.onmessage = () => {
        workerImportNapi = 'success';
      }
      await Sleep(2000)
      expect(workerImportNapi).assertEqual('success')
    })
  })
}

