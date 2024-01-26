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

import { BaseCenterMode } from '../model/BaseCenterModel'

@CustomDialog
export struct ConfirmDialog {
  @BuilderParam slotContent?: () => void;
  @State model: BaseCenterMode = new BaseCenterMode();
  controller: CustomDialogController
  // 若尝试在CustomDialog中传入多个其他的Controller，以实现在CustomDialog中打开另一个或另一些CustomDialog，那么此处需要将指向自己的controller放在最后

  build() {
    Column() {
      Text(this.model.title).fontSize(this.model.titleFontSize).margin(this.model.titleMargin).textAlign(this.model.titleTextAlign)
      Column(){
        if(this.slotContent != undefined) {
          this.slotContent()
        }
      }
      if(this.model.isDisplayBtn) {
        Column(){
          Button(this.model.confirmBtnTitle,{ type: this.model.btnType })
            .fontColor(this.model.confirmBtnFontColor)
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
        .height(this.model.btnContentHeight).width(this.model.btnContentWidth)
        .margin(this.model.btnContentMargin)
        .border(this.model.btnContentBorder)
      }
    }
    .width(this.model.dialogWidth)
    .backgroundColor(this.model.dialogBgColor)
    .borderRadius(this.model.dialogBorderRadius)
  }
}
