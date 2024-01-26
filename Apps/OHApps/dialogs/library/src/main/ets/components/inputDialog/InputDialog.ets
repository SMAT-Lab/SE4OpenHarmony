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

import { inputModel } from '../model/inputModel'

@CustomDialog
export struct  InputDialog {
  controller: CustomDialogController
  @State model: inputModel = new inputModel();
  @Link inputValue: string

  build() {
    Column() {
      Text(this.model.title)
        .fontSize(this.model.titleFontSize)
        .height(this.model.titleHeight)
        .fontColor(this.model.titleFontColor)
        .textAlign(this.model.titleTextAlign)
      Text(this.model.contentValue)
        .fontSize(this.model.contentFontSize)
        .fontColor(this.model.contentFontColor)
        .textAlign(this.model.contentTextAlign)
      TextInput({placeholder: this.model.placeholder,text: this.inputValue})
        .borderRadius(this.model.inputBorderRadius)
        .margin(this.model.inputMargin)
        .fontColor(this.model.inputFontColor)
        .backgroundColor(this.model.inputBgColor)
        .border(this.model.inputBorder)
        .padding(this.model.inputPadding)
        .borderRadius(this.model.inputBorderRadius)
        .placeholderColor(this.model.placeholderColor)
      if(this.model.isDisplayBtn) {
       Column(){
         Flex({direction: FlexDirection.Row}) {
             Button(this.model.cancelBtnTitle,{ type: this.model.btnType })
               .fontColor(this.model.cancelBtnFontColor)
               .fontSize(this.model.btnFontSize)
               .backgroundColor(this.model.cancelBtnBgColor)
               .width(this.model.btnWidth)
               .height(this.model.btnHeight)
               .border(this.model.btnBorder)
               .onClick(() =>{
                 this.controller.close()
                 if(this.model.cancel != undefined) {
                   this.model.cancel()
                 }
               })
               .borderRadius(this.model.cancelBtnBorderRadius)
             Button(this.model.confirmBtnTitle,{ type: this.model.btnType })
               .fontColor(this.model.contentFontColor)
               .fontSize(this.model.btnFontSize)
               .backgroundColor(this.model.confirmBtnBgColor)
               .width(this.model.btnWidth)
               .height(this.model.btnHeight)
               .onClick(() =>{
                 this.controller.close()
                 if(this.model.confirm != undefined) {
                   this.model.confirm()
                 }
               })
               .borderRadius(this.model.confirmBtnBorderRadius)
         }
       }.width(this.model.btnContentWidth)
       .margin(this.model.btnContentMargin)
       .border(this.model.btnContentBorder)
      }
    }
    .width(this.model.dialogWidth)
    .padding(this.model.dialogPadding)
    .backgroundColor(this.model.dialogBgColor)
    .borderRadius(this.model.dialogBorderRadius)
    .transition(this.model.popupAnimation)
  }
}
