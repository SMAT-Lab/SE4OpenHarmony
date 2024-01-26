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
export struct RepeatDialog {
  @State model: BaseCenterMode = new BaseCenterMode();
  @State offsetX: number = 0;
  @State offsetY: number = 0;
  @State positionX: number = 0;
  @State positionY: number = 0;
  @Prop popupAnimation:TransitionEffect | undefined = undefined
  @BuilderParam slotContent?: () => void;

  controller?: CustomDialogController= undefined
  // 若尝试在CustomDialog中传入多个其他的Controller，以实现在CustomDialog中打开另一个或另一些CustomDialog，那么此处需要将指向自己的controller放在最后
  cancel: () => void =()=>{}
  confirm: () => void =()=>{}

  aboutToDisappear() {
    if(this.model.isDeleteOnDisappear) {
      this.controller = undefined;
    }
  }

  build() {
    Column() {
      Text(this.model.title)
        .fontSize(this.model.titleFontSize)
        .fontColor(this.model.titleFontColor)
        .margin(this.model.titleMargin)
        .textAlign(this.model.titleTextAlign)
        .height(this.model.titleHeight)
        .border(this.model.titleBorder)
        .width(this.model.titleWight)
      Column(){
        if(this.slotContent != undefined) {
          this.slotContent()
        }
      }
      .height(this.model.contentHeight)
      .margin(this.model.contentMargin)
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
                if(this.controller != undefined) {
                  this.controller.close()
                }
                this.cancel()
              })
              .borderRadius(this.model.cancelBtnBorderRadius)
            Button(this.model.confirmBtnTitle,{ type: this.model.btnType })
              .fontColor(this.model.confirmBtnFontColor)
              .fontSize(this.model.btnFontSize)
              .backgroundColor(this.model.confirmBtnBgColor)
              .width(this.model.btnWidth)
              .height(this.model.btnHeight)
              .onClick(() =>{
                if(this.controller!= undefined) {
                  this.controller.close()
                }
                this.confirm()
              })
              .borderRadius(this.model.confirmBtnBorderRadius)
          }
        }.width(this.model.btnContentWidth)
        .margin(this.model.btnContentMargin)
        .border(this.model.btnContentBorder)
      }
    }
    .onClick(() => {
      return
    })
    .width(this.model.dialogWidth)
    .backgroundColor(this.model.dialogBgColor)
    .borderRadius(this.model.dialogBorderRadius)
    .padding(this.model.dialogPadding)
    .translate(
      { x: this.offsetX, y: this.offsetY, z: 0 }
    )
    .gesture(
      // 声明该组合手势的类型为Sequence类型
      GestureGroup(GestureMode.Sequence,
        // 该组合手势第一个触发的手势为长按手势，且长按手势可多次响应
        LongPressGesture({ repeat: true })
          // 当长按手势识别成功，增加Text组件上显示的count次数
          .onAction((event: GestureEvent) => {
            if (event.repeat) {
            }
            console.info('LongPress onAction');
          })
          .onActionEnd(() => {
            console.info('LongPress end');
          }),
        // 当长按之后进行拖动，PanGesture手势被触发
        PanGesture()
          .onActionStart(() => {
            console.info('pan start');
          })
            // 当该手势被触发时，根据回调获得拖动的距离，修改该组件的位移距离从而实现组件的移动
          .onActionUpdate((event: GestureEvent) => {
            this.offsetX = this.positionX + event.offsetX;
            this.offsetY = this.positionY + event.offsetY;
            console.info('pan update');
          })
          .onActionEnd(() => {
            this.positionX = this.offsetX;
            this.positionY = this.offsetY;
          })
      )
    )
  }
}
