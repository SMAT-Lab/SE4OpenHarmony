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

import libworker,{Message} from 'libworker.so'
import worker, { MessageEvents, ErrorEvent } from '@ohos.worker';

const workerInstance = new worker.ThreadWorker('entry/ets/pages/workers/worker.ts')

workerInstance.onmessage = (e: MessageEvents): void => {
  let info: string = e.data
  console.log("main thread onmessage" + info)
}

workerInstance.onexit = () => {
  console.log("main thread exit")
}

workerInstance.onerror = (err: ErrorEvent) => {
  console.log("main thread error")
}

@Entry
@Component
struct Index {
  @State message: string = 'Hello World';

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            for (let i = 0; i < 100; i++) {
              let test = new Message("hello")
              workerInstance.postMessage("start")
              libworker.AsyncTaskMessageReturnMessage(test, "one").then((result : Message) => {
                console.log("main thread " + result.message)
              })
            }
          })
      }
      .width('100%')
    }
    .height('100%')
  }
}