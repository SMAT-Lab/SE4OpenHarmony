/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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

import prompt from '@ohos.promptAction'
import Logger from '../model/Logger'

@CustomDialog
export struct AddDialog {
  private fileName: string = ''
  private fileContent: string = ''
  private isInserted: boolean = false
  private controller: CustomDialogController
  private createFile:Function = (isInserted: boolean, name: string, content: string) => {}
  @Builder InputLine(inputName: Resource, key: string, inputPrompt: Resource, inputContent: string, onChange: (value: string) => void) {
    Row() {
      Text(inputName)
        .width(80)
        .fontSize(18)
        .margin({ left: 10 })
        .fontColor(Color.Black)
        .fontWeight(FontWeight.Medium)
      TextInput({ placeholder: inputPrompt, text: inputContent })
        .id('input' + (key))
        .layoutWeight(1)
        .placeholderColor(Color.Gray)
        .fontSize(16)
        .maxLength(16)
        .margin({ right: 10 })
        .onChange(onChange)
    }
    .margin({ top: '3%' })
  }

  aboutToAppear() {
    this.fileName = ''
    this.fileContent = ''
  }

  build() {
    Column() {
      Text($r('app.string.create_file'))
        .fontSize(24)
        .fontColor(Color.Black)
        .fontWeight(FontWeight.Bold)
        .margin({ top: '3%' })

      this.InputLine($r('app.string.file_name'), 'FileName', $r('app.string.input_name'), this.fileName, (value: string) => {
        this.fileName = value
      })
      this.InputLine($r('app.string.file_content'), 'FileContent', $r('app.string.input_content'), this.fileContent, (value: string) => {
        this.fileContent = value
      })

      Row() {
        Button() {
          Text($r('app.string.button_confirm'))
            .fontColor(Color.Blue)
            .fontSize(17)
        }
        .id('confirmBtn')
        .margin(5)
        .layoutWeight(7)
        .backgroundColor(Color.White)
        .onClick(() => {
          Logger.info(`this.fileName = ${this.fileName}`)
          if (this.fileName === '') {
            prompt.showToast({ message: $r('app.string.warning_empty'), duration: 1000 })
            return
          }
          this.isInserted = true
          Logger.info(`fileName = ${this.fileName}`)
          this.createFile(this.isInserted, this.fileName, this.fileContent)
          Logger.info(`isInserted = ${this.isInserted}`)
          this.controller.close()
        })

        Divider()
          .height(30)
          .vertical(true)
          .strokeWidth(2)
          .color($r('app.color.divider_bg'))

        Button() {
          Text($r('app.string.button_cancel'))
            .fontColor(Color.Red)
            .fontSize(17)
        }
        .margin(5)
        .layoutWeight(7)
        .backgroundColor(Color.White)
        .onClick(() => {
          this.controller.close()
        })
      }
    }
    .padding('3%')
  }
}