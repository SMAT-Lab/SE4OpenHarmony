/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { MessageDialog, BaseCenterMode } from '@ohos/dialogs'

@Entry
@Component
struct Message {
  @State model:BaseCenterMode = new BaseCenterMode()
  @State textValue: string = '这里是消息内容'
  @State inputValue: string = '消息弹窗'
  @State isFixPosition: boolean = true
  @State positionDialog: string = 'top'
  @State blurValue: number = 0

  aboutToAppear(){
    this.model.contentValue = '这里是消息内容'
    this.model.contentPadding = 10
    this.model.dialogWidth = 300
    this.model.dialogBgColor = Color.Pink
  }

  dialogController: CustomDialogController | undefined = new CustomDialogController({
    builder: MessageDialog({
      model:this.model,
      isFixPosition: this.isFixPosition,
      positionDialog: this.positionDialog,
      blurValue: this.blurValue
    }),
    autoCancel: true,
    alignment: DialogAlignment.Center,
    offset: { dx: 0, dy: 0 },
    gridCount: 4,
    customStyle: true,
    maskColor: Color.Transparent,
  })
  // 在自定义组件即将析构销毁时将dialogControlle删除和置空
  aboutToDisappear() {

    this.dialogController = undefined // 将dialogController置空
  }

  build() {
    Column() {
      Column().height(200).width(200).backgroundColor(Color.Yellow)
      Text('模糊效果')
      Button(this.inputValue)
        .onClick(() => {
          if (this.dialogController != undefined) {
            this.dialogController.open()
            this.blurValue = 50
          }
        })
    }.width('100%').height('100%').margin({ top: 25 })
    .backgroundColor(Color.White)
    .blur(this.blurValue)
  }
}
