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

import { ButtonAttributeModel } from '../model/ButtonAttributeModel'

@Component
export struct PopupButton {
  @State model: ButtonAttributeModel = new ButtonAttributeModel()
  @State customPopup: boolean = false

  @Builder popupBuilder() {
    Row() {
      if (this.model.firstText) {
        Text(this.model.firstText)
          .fontSize(this.model.firstFontSize)
          .fontColor(this.model.firstFontColor)
          .width(this.model.firstWidth)
          .height(this.model.firstHeight)
          .onClick(this.model.firstAction)
      }
      if (this.model.hasDivider) {
        Divider()
          .vertical(this.model.isVertical)
          .height(this.model.dividerHeight)
          .color(this.model.dividerColor)
          .opacity(this.model.dividerOpacity)
          .margin(this.model.dividerMargin)
      }
      if (this.model.secondText) {
        Text(this.model.secondText)
          .fontSize(this.model.secondFontSize)
          .fontColor(this.model.secondFontColor)
          .width(this.model.secondWidth)
          .height(this.model.secondHeight)
          .onClick(this.model.secondAction)
      }
    }
    .padding(20)
  }

  build() {
    Button(this.model.buttonText)
      .type(this.model.buttonType)
      .borderRadius(this.model.buttonBorderRadius)
      .backgroundColor(this.model.buttonBgColor)
      .fontSize(this.model.buttonFontSize)
      .fontColor(this.model.buttonFontColor)
      .width(this.model.buttonWidth)
      .height(this.model.buttonHeight)
      .onClick(() => {
        this.customPopup = true
      })
      .bindPopup(this.customPopup, {
        builder: this.popupBuilder,
        targetSpace: this.model.targetSpace,
        placement: this.model.placement,
        popupColor: this.model.popupColor,
        autoCancel: this.model.autoCancel,
        enableArrow: this.model.enableArrow,
        onStateChange: (e) => {
          if (!e.isVisible) {
            this.customPopup = false
          }
        }
      })
  }
}