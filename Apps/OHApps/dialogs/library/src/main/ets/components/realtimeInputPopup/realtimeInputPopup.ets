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

import { InputAttributeModel } from '../model/InputAttributeModel'

@Component
export struct RealtimeInputPopup {
  @State customPopup: boolean = false
  @Link model: InputAttributeModel
  @Link inputVal: string

  // popup构造器定义弹框内容
  @Builder popupBuilder() {
    if (this.model.dataList.length != 0) {
      List() {
        ForEach(this.model.dataList, (data:string) => {
          ListItem() {
            Button(data)
              .fontSize(this.model.popupFontSize)
              .fontColor(this.model.popupFontColor)
              .type(ButtonType.Normal)
              .align(Alignment.Start)
              .width('100%')
              .padding(10)
              .backgroundColor(Color.Transparent)
              .onClick(() => {
                this.customPopup = false
                setTimeout(() => {
                  this.inputVal = data
                }, 100)
              })
          }
        })
      }
      .scrollBar(this.model.popupScrollBar)
      .divider(this.model.hasDivider ? this.model.divider : null)
      .constraintSize({ maxWidth: this.model.popupMaxWidth, maxHeight: this.model.popupMaxWidth })
      .width(this.model.popupWidth)
      .height('100%')
      .border(this.model.popupBorder)
    }
  }

  build() {
    Column() {
      TextInput({ text: this.inputVal, placeholder: this.model.placeholder })
        .fontSize(this.model.inputFontSize)
        .fontColor(this.model.inputFontColor)
        .borderRadius(this.model.inputRadius)
        .width(this.model.inputWidth)
        .onChange((value) => {
          this.inputVal = value
          if (!value) {
            this.model.dataList = []
            this.customPopup = false
            return
          }
          this.customPopup = true
        })
        .bindPopup(this.customPopup, {
          builder: this.popupBuilder,
          targetSpace: this.model.targetSpace,
          placement: this.model.placement,
          popupColor: this.model.popupColor,
          autoCancel: true,
          enableArrow: false,
          onStateChange: (e) => {
            if (!e.isVisible) {
              this.customPopup = false
            }
          }
        })
    }
  }
}