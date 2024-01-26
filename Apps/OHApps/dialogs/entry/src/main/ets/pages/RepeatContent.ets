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

import { RepeatDialog,BaseCenterMode } from '@ohos/dialogs'
import { AnimateEffect,AnimateDialogOptions } from '@ohos/dialogs'
import { TitleBorder,BtnContentBorder } from '@ohos/dialogs'
@Entry
@Component
struct RepeatDialogExample {
  scroller: Scroller = new Scroller()
  @State model:BaseCenterMode = new BaseCenterMode()
  @State inputValue: string = 'click me'
  @State animateOption: AnimateDialogOptions = { animate:AnimateEffect.TranslateFromTop}
  aboutToAppear(){
    this.model.dialogPadding={left:10,right:10}
    this.model.dialogBgColor = '#F0A0CA'
    this.model.title='复用项目已有组件'
    this.model.titleFontColor = Color.Red
    this.model.contentHeight = 100
    this.model.titleMargin = { top: 10, bottom: 10 }
    this.model.contentMargin = { left:10,right:10, bottom: 0 }
    let btnContentBorder:BtnContentBorder = {
      width: {top: 1},
      color:{top: Color.Yellow},
      style:{top:BorderStyle.Solid},
    }
    this.model.btnContentBorder = btnContentBorder
    this.model.cancelBtnTitle = 'cancel'
    this.model.cancelBtnFontColor = '#6E495D'
    this.model.confirmBtnFontColor = '#6E495D'
    this.model.cancelBtnBgColor = '#F0A0CA'
    this.model.confirmBtnBgColor = '#F0A0CA'
    this.model.confirmBtnTitle = 'OK'
    let titleBorder:TitleBorder = {
      width: {bottom: 1},
      color:{bottom: Color.Yellow},
      style:{bottom:BorderStyle.Solid},
    }
    this.model.titleBorder = titleBorder
  }

  @Builder componentBuilder() {
    Stack({ alignContent: Alignment.TopStart }) {
      Scroll(this.scroller){
        Column(){
          Text( '你可以为弹窗选择任意一种动画，但这并不必要，因为我已经默认给每种弹窗设定了最佳动画！对于你自定义的弹窗，可以随心选中心仪的动画方案。')
            .fontColor(Color.Black)
            .fontSize(20)
        }
      }
    }.height('100%').padding(10)

  }
  dialogController: CustomDialogController|undefined = new CustomDialogController({
    builder: RepeatDialog({
      slotContent: () => {
        this.componentBuilder()
      },
      model:this.model,
      cancel: this.onCancel,
      confirm: this.onAccept,
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

  onCancel() {
    console.info('Callback when the first button is clicked')
  }

  onAccept() {
    console.info('Callback when the second button is clicked')
  }

  existApp() {
    console.info('Click the callback in the blank area')
  }

  build() {
    Column() {
      Flex({direction:FlexDirection.Row,alignItems: ItemAlign.Center}){
        Button('使用内置弹窗绑定项目已有布局').onClick(()=>{
          if(this.dialogController!= undefined) {
            this.dialogController.open()
          }
        })
      }
    }.width('100%').margin({ top: 5 }).backdropBlur(20)
  }
}
