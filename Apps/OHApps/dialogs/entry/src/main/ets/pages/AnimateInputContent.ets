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

import { AnimateInputDialog,AnimateEffect,AnimateDialogOptions } from '@ohos/dialogs'

@Entry
@Component
struct AnimateInputContent {
  @State inputValue: string = ''
  @State title: string = '标题'
  @State placeholder: string = '请输入'
  @State animateOption: AnimateDialogOptions = { animate:AnimateEffect.ScaleCenterLeft}
  // CheckDialogController: CustomDialogController = new CustomDialogController
  InputController: CustomDialogController = new CustomDialogController({
    builder: AnimateInputDialog({
      animateOptions:$animateOption,
      cancel: () => {this.onCancel()},
      confirm: () => {this.confirm()}
    }),
    customStyle: true,
    alignment: DialogAlignment.Center,
    openAnimation:{duration:3000},
    closeAnimation:{duration:3000}
  })
  onCancel() {
    console.info('Callback when the first button is clicked')
  }

  confirm() {
    console.info('Callback when the second button is clicked')
  }

  build() {
    Column(){
      Button('input弹窗').onClick(() => {
        this.InputController.open()
      })
    }
  }
}