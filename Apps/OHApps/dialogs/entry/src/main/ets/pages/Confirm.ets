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

import { ConfirmDialog } from '@ohos/dialogs'
import { BaseCenterMode } from '@ohos/dialogs'
import { BtnContentBorder } from '@ohos/dialogs'
import { TestType } from '@ohos/hypium'

@Entry
@Component
struct ConfirmExample {
  @State textValue: string = '我是标题'
  @State contentValue: string = '床前明月光，疑是地上霜，举头望明月，低头思故乡。床前明月光，疑是地上霜，举头望明月，低头思故乡。'
  @State inputValue: string = 'click me'
  @State positionDialog: string = 'center'
  @State animitionMove:string = 'center'
  @State model:BaseCenterMode = new BaseCenterMode()

  aboutToAppear(){
    this.model.title = '我是标题'
    this.model.contentValue = '床前明月光，疑是地上霜，举头望明月，低头思故乡。床前明月光，疑是地上霜，举头望明月，低头思故乡。'
    // this.model.contentMargin = 20
    this.model.titleMargin = { top: 30,bottom: 10 }
    this.model.btnWidth = '100%'
    this.model.btnHeight = '100%'
    this.model.confirmBtnFontColor = '#87C5BF'
    this.model.confirmBtnBgColor = '#fff'
    this.model.confirm = this.onAccept
    this.model.btnContentHeight = 60
    this.model.btnContentMargin = { top: 20 }
    let btnContentBorder:BtnContentBorder =     {
      width: { top: 1 },
      color:{ top:'#F0F0F0' },
      style:{ top:BorderStyle.Solid },
    }

    this.model.btnContentBorder =btnContentBorder


  }

  dialogController: CustomDialogController | undefined = new CustomDialogController({
    builder: ConfirmDialog({
      slotContent: () => {
        this.componentBuilder()
      },
      model:this.model
    }),
    cancel: this.existApp,
    autoCancel: true,
    alignment: DialogAlignment.Center,
    offset: { dx: 0, dy: 0 },
    gridCount: 4,
    customStyle: true
  })

  // 在自定义组件即将析构销毁时将dialogControlle删除和置空
  aboutToDisappear() {

    this.dialogController = undefined // 将dialogController置空
  }

  onAccept() {
    console.info('Callback when the second button is clicked')
  }

  existApp() {
    console.info('Click the callback in the blank area')
  }


  @Builder componentBuilder() {
    Text('床前明月光，疑是地上霜，举头望明月，低头思故乡。床前明月光，疑是地上霜，举头望明月，低头思故乡。')
      .fontSize(this.model.contentFontSize)
      .margin(20)
      .textAlign(this.model.contentTextAlign)
  }

  build() {
    Column() {
      Button('显示confirm弹窗').onClick(() => {
        if(this.dialogController != undefined) {
          this.dialogController.open()
        }
      })
    }
  }
}
