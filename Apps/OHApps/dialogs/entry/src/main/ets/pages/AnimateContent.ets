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
import { LVLineWithTextController,LVLineWithText } from '@ohos/dialogs'
import { LVCircularRing,LVCircularRingController,AnimateManager,Switch } from '@ohos/dialogs'
import animator from "@ohos.animator";
@CustomDialog
struct CustomDialogExample {
  @Link percentValue: number
  @State lvLineWithTextController: LVLineWithTextController = new LVLineWithTextController()
    .setViewColor("rgb(33,66,77)").setTextColor("rgb(233, 166, 177)")
  controller?: CustomDialogController = undefined
  // 若尝试在CustomDialog中传入多个其他的Controller，以实现在CustomDialog中打开另一个或另一些CustomDialog，那么此处需要将指向自己的controller放在最后
  cancel: () => void = ()=>{}
  confirm: () => void = ()=>{}

  build() {
    Stack(){
      LVLineWithText({controller: $lvLineWithTextController, percentValue: $percentValue})
        .width('100%')
        .height('100%')
    }
    .width(300)
    .height(50)
    .backgroundColor('#33000000')
  }
}
@CustomDialog
struct CustomDialogExample2 {

  @State ringController: LVCircularRingController = new LVCircularRingController()
    .setViewColor("#64ffffff").setBarColor("#FFFF00")
  @State ringAnimatedManager: AnimateManager = {
    animatedSwitch: Switch.CLOSE
  }
  controller: CustomDialogController
  // 若尝试在CustomDialog中传入多个其他的Controller，以实现在CustomDialog中打开另一个或另一些CustomDialog，那么此处需要将指向自己的controller放在最后
  cancel: () => void = ()=>{}
  confirm: () => void = ()=>{}

  build() {
    Column(){
      LVCircularRing({controller: $ringController, animateManager: $ringAnimatedManager})
        .width(100)
        .height(100)
      Row(){
        Button('时间0.5s').onClick(()=>{
          this.ringAnimatedManager = {
            animatedSwitch: Switch.OPEN
          }
        })
        Button('时间5s').onClick(()=>{
          this.ringAnimatedManager = {
            animatedSwitch: Switch.OPEN,
            duration: 5000
          }
        })
        Button('关闭').onClick(()=>{
          this.ringAnimatedManager = {
            animatedSwitch: Switch.CLOSE
          }
        })
      }
      .margin({top:50})
    }
    .alignItems(HorizontalAlign.Center)
    .justifyContent(FlexAlign.Center)
    .width(300)
    .height(300)
    .backgroundColor('#33000000')
  }
}

@Entry
@Component
struct AnimateContent {
  @State inputValue: string = '点击展示数字百分比'
  @State inputValue2: string = '点击展示圆环'
  dialogProgressNumberController: CustomDialogController = new CustomDialogController({
    builder: CustomDialogExample({
      percentValue: $percentValue
    }),
    autoCancel: true,
    alignment: DialogAlignment.Center,
    customStyle: true
  })
  dialogRingController: CustomDialogController = new CustomDialogController({
    builder: CustomDialogExample2({
    }),
    autoCancel: true,
    alignment: DialogAlignment.Center,
    customStyle: true
  })

  // 在自定义组件即将析构销毁时将dialogControlle删除和置空
  aboutToDisappear() {





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

  @State percentValue: number = 0


  build() {
    Column() {
      Button(this.inputValue)
        .onClick(() => {
          if (this.dialogProgressNumberController != undefined) {
            this.dialogProgressNumberController.open()

            let animator1 = animator.create({
              duration:5000,
              easing:'linear',
              iterations: 1,
              begin:0,
              end:100,
              fill:'none',
              delay:0,
              direction: 'normal'
            })
            animator1.onframe = (inputValue:number) => {
              console.log('dodo value = '+ inputValue)
              this.percentValue = Math.floor(inputValue);
            }
           animator1.play()
          }
        }).backgroundColor(0x317aff)

      Button(this.inputValue2)
        .onClick(()=>{
          if(this.dialogRingController != undefined){
            this.dialogRingController.open()
          }
        }).margin({top:20})

    }.width('100%').margin({ top: 5 })
  }
}