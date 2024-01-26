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

import { PositionDialog,BaseCenterMode } from '@ohos/dialogs'
import { AnimateEffect,AnimateDialogOptions } from '@ohos/dialogs'
import { BtnBorder,BtnContentBorder } from '@ohos/dialogs'

@Entry
@Component
struct CustomDialogExample2 {
  scroller: Scroller = new Scroller()
  @State model:BaseCenterMode = new BaseCenterMode()
  @State inputValue: string = 'click me'
  @State isFixPosition: boolean = true
  @State positionDialog: string = 'center'
  @State popupAnimation:TransitionEffect | undefined = undefined
  @State animateOption: AnimateDialogOptions = { animate:AnimateEffect.ScaleCenterBottom}
  @State curve:Curve = Curve.EaseIn  //动画曲线
  customDialogController?: CustomDialogController = undefined
  aboutToAppear(){
    this.model.title='标题'
    this.model.titleMargin = { top: 10, bottom: 10 }
    this.model.contentMargin = { left:10,right:10, bottom: 30 }
    let btnContentBorder:BtnContentBorder = {
      width: {top: 1},
      color:{top:'#F6F6F6'},
      style:{top:BorderStyle.Solid},
    }
    this.model.btnContentBorder = btnContentBorder

    let btnBorder:BtnBorder = {
      width: {right: 1},
      color:{right:'#F6F6F6'},
      style:{right:BorderStyle.Solid}
    }
    this.model.btnBorder = btnBorder
  }

  @Builder componentBuilder() {
    Stack({ alignContent: Alignment.TopStart }) {
      Scroll(this.scroller){
        Column(){
          Text( '你可以为弹窗选择任意一种动画，但这并不必要，因为我已经默认给每种弹窗设定了最佳动画！对于你自定义的弹窗，可以随心选中心仪的动画方案。')
            .fontColor(Color.Black)
            .fontSize(20)
          Column().height(200).width('100%').backgroundColor(Color.Pink)
        }
      }
    }.height('100%').padding(10)

  }
  dialogController: CustomDialogController | undefined = new CustomDialogController({
    builder: PositionDialog({
      slotContent: () => {
        this.componentBuilder()
      },
      animateOptions: this.animateOption,
      model:this.model,
      cancel: this.onCancel,
      confirm: this.onAccept,
      isFixPosition: this.isFixPosition,
      positionDialog: this.positionDialog,
      duration: 500,
      curve: this.curve
    }),
    cancel: this.existApp,
    autoCancel: true,
    alignment: DialogAlignment.Center,
    offset: { dx: 0, dy: 0 },
    gridCount: 4,
    customStyle: true,
    // openAnimation:{duration:3000},
    closeAnimation:{duration:500}
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
  @State text: string = "下拉选择"
  @State index: number = 2
  @State space: number = 8
  @State arrowPosition: ArrowPosition = ArrowPosition.END

  build() {
    Column() {
     Flex({direction:FlexDirection.Row,alignItems: ItemAlign.Center}){
       Text('请选择动画：')
       Select([
         { value: 'TranslateFromCenter'},
         { value: 'TranslateFromTop'},
         { value: 'TranslateFromBottom' },
         { value: 'TranslateFromLeft' },
         { value: 'TranslateFromRight' },
         { value: 'TranslateFromLeftTop' },
         { value: 'TranslateFromLeftBottom' },
         { value: 'TranslateRightTop' },
         { value: 'TranslateFromRightBottom' },
         { value: 'ScaleLeftTop'},
         { value: 'ScaleLeftBottom' },
         { value: 'ScaleRightTop' },
         { value: 'ScaleRightBottom' },
         { value: 'ScaleCenterLeft' },
         { value: 'ScaleCenterTop' },
         { value: 'ScaleCenterRight' },
         { value: 'ScaleCenterBottom' }
       ])
         .value(this.text)
         .font({ size: 16, weight: 500 })
         .fontColor('#182431')
         .selectedOptionFont({ size: 16, weight: 400 })
         .optionFont({ size: 16, weight: 400 })
         .space(this.space)
         .arrowPosition(this.arrowPosition)
         .onSelect((index:number, text: string)=>{
           let option = new AnimateDialogOptions()
           option.animate = AnimateEffect[text]
           this.animateOption = option
           if(this.dialogController != undefined) {
             this.dialogController.open()
           }
           this.text = text;
         })
     }
    }.width('100%').margin({ top: 5 }).backdropBlur(20)
  }
}
