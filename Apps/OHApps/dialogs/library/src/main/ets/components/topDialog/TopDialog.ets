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

import { BaseCenterMode } from  '../model/BaseCenterModel'
@CustomDialog
export struct TopDialog {
  @Link isAnimation:boolean
  @State model: BaseCenterMode = new BaseCenterMode()
  @BuilderParam slotContent?: () => void
  controller: CustomDialogController

  aboutToAppear() {
    this.isAnimation = true
  }
  aboutToDisappear(){
    this.isAnimation = false
  }

  build() {
    Stack(){
      if(this.isAnimation) {
        Column(){
          if(this.slotContent != undefined) {
            this.slotContent()
          }
        }
        .position({x:0,y:0})
        .width(this.model.dialogWidth)
        .height(this.model.dialogHeight)
        .backgroundColor(this.model.dialogBgColor)
        .transition(this.model.popupAnimation)
        .onClick(() =>{
          return
        })
      }
    }
    .height('100%').width('100%')
    .onClick(() =>{
      this.isAnimation = false
      this.controller.close()
    })
  }
}