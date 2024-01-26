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

let tempValue:string

export function setData(value: string, controller: CustomDialogController) {
  tempValue = value
  controller.open()
}

@CustomDialog
export struct CustomDialogExample {
  controller?: CustomDialogController

  build() {
    Column() {
      Text('测试结果').fontSize(20).margin({ top: 10, bottom: 10 })
      Text(tempValue).fontSize(20).margin({ top: 10, bottom: 10 })
      Button('确定')
        .onClick(() => {
          if (this.controller != undefined) {
            this.controller.close()
          }
        })
        .backgroundColor(0xffffff)
        .fontSize(20)
        .fontColor(Color.Red)
        .margin({ bottom: 10 })
    }
  }
}