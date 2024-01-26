/*
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
 
 import CommonConstants from '../common/constants/CommonConstants'

@CustomDialog
export default struct EditDialog {
  @Link notebookName: string
  @State newValue: string = ''
  controller: CustomDialogController
  confirm: (notebookName: string) => void

  build() {
    Column() {
      Text($r('app.string.dialog_change_name')).fontSize(CommonConstants.FONT_SIZE_29).margin({ top: 30, bottom: 20 })
      TextInput({
        placeholder: $r('app.string.notebook_name_input'), text: this.notebookName
      })
        .maxLength(30)
        .placeholderColor($r('app.color.black_30'))
        .fontSize(CommonConstants.FONT_SIZE_19)
        .padding({
          left: 10
        })
        .backgroundColor($r('app.color.black_3'))
        .height(48)
        .borderRadius(0)
        .width('90%')
        .onChange((value: string) => {
          this.newValue = value
        })
      Flex({ justifyContent: FlexAlign.SpaceAround }) {
        Text($r('app.string.dialog_cancel'))
          .fontSize(CommonConstants.FONT_SIZE_19)
          .onClick(() => {
            this.newValue = this.notebookName;
            this.controller.close()
          })
          .backgroundColor(0xffffff)
          .fontColor(Color.Black)
          .fontSize(CommonConstants.FONT_SIZE_22)
          .padding({ bottom: 20, top: 15 })
          .layoutWeight(1)
          .textAlign(TextAlign.Center)

        Text($r('app.string.dialog_confirm'))
          .onClick(() => {
            if (this.notebookName.length > 0) {
              this.notebookName = this.newValue;
              this.confirm(this.notebookName)
            }
            this.controller.close()
          })
          .backgroundColor(0xffffff)
          .fontColor($r('app.color.theme'))
          .fontSize(CommonConstants.FONT_SIZE_22)
          .padding({ bottom: 20, top: 15 })
          .layoutWeight(1)
          .textAlign(TextAlign.Center)
      }
    }
  }
}
