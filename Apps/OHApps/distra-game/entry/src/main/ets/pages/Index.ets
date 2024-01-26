/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { PlaneGame } from "./flygame"

let context;
context = getContext(this) as any

function requestPermission() {
  context = getContext(this) as any
  let permissions: Array<string> = ['ohos.permission.DISTRIBUTED_DATASYNC']
  context.requestPermissionsFromUser(permissions).then((data) => {
    console.info("Succeed to request permission from user with data: " + JSON.stringify(data))
  }).catch((error) => {
    console.info("Failed to request permission from user with error: " + JSON.stringify(error))
  })
}

@Entry
@Component
struct Index {
  @State text: string = ''
  @State eventType: string = ''

  async aboutToAppear() {
    await requestPermission()
  }

  build() {
    Row() {
      Column() {
        PlaneGame()
      }
    }
  }
}