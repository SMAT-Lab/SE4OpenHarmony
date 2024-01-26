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
export struct MessageDialog {
  @State model:BaseCenterMode = new BaseCenterMode()
  @State offsetX: number = 0;
  @State offsetY: number = 0;
  @State isFixPosition: boolean = true
  @Prop positionDialog: string = 'center';
  @State positionX: number = 0;
  @State positionY: number = 0;
  @Link blurValue: number

  controller: CustomDialogController
  // 若尝试在CustomDialog中传入多个其他的Controller，以实现在CustomDialog中打开另一个或另一些CustomDialog，那么此处需要将指向自己的controller放在最后

  aboutToAppear() {
    if(this.isFixPosition) {
      if(this.positionDialog == 'left') {
        this.offsetX = -75
        this.positionX = -75
      }else if(this.positionDialog == 'right') {
        this.offsetX = 75
        this.positionX = 75
      }else{
        this.offsetX = 0
        this.positionX = 0
      }
      if(this.positionDialog == 'top') {
        this.offsetY = -300
        this.positionY = -300
      }else if(this.positionDialog == 'bottom') {
        this.offsetY = 300
        this.positionY = 300
      }else{
        this.offsetY = 0
        this.positionY = 0
      }
    }
  }

  aboutToDisappear() {
    this.blurValue = 0
  }

  build() {
    Column() {
      Text(this.model.contentValue)
        .fontSize(this.model.contentFontSize)
        .padding(this.model.contentPadding)
        .fontColor(this.model.contentFontColor)
    }
    .width(this.model.dialogWidth)
    .backgroundColor(this.model.dialogBgColor)
    .borderRadius(this.model.dialogBorderRadius)
    .transition(this.model.popupAnimation)
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
