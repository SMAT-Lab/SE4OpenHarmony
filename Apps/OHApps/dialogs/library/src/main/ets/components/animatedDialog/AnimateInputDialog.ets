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

import radio from '@ohos.telephony.radio'
import { AnimateDialogOptions } from './AnimateDialogOptions'
import { AnimateEffect } from './AnimateEffect'

@CustomDialog
export struct AnimateInputDialog {
  controller: CustomDialogController
  inputValue: string = '测试动画内容'
  title: string = '测试动画'

  isDisplay: boolean = true

  cancel: () => void = ()=>{}
  confirm: () => void = ()=>{}
  @State showDialog: boolean = true
  duration: number = 1000; // 这个值是动画执行时长,

  openAnimatedFlag: boolean = false;
  compDialogWidth: number = 0;
  compDialogHeight: number = 0;
  @State showStatus:Visibility = Visibility.Hidden;
  @State useScale: boolean = false;
  @State scaleOptions: ScaleOptions = {
    x: 1,
    y: 1,
    z: 1,
    centerX: '50%',
    centerY: '50%'
  }
  @Link animateOptions: AnimateDialogOptions;


  closeDialog(){
    this.executeEndAnimate();
    this.controller.close();
  }

  aboutToAppear() {
    this.openAnimatedFlag = true;
  }



  aboutToDisappear() {

  }

  animateBeforeStartStatus() {
    if (AnimateEffect.ScaleLeftTop == this.animateOptions.animate) {
      this.scaleOptions = {
        x: 0,
        y: 0,
        z: 1,
        centerX: 0,
        centerY: 0,
      }
    }
    else if (AnimateEffect.ScaleLeftBottom == this.animateOptions.animate) {
      this.scaleOptions = {
        x: 0,
        y: 0,
        z: 1,
        centerX: 0,
        centerY: '100%',
      }
    }
    else if (AnimateEffect.ScaleRightTop == this.animateOptions.animate) {
      this.scaleOptions = {
        x: 0,
        y: 0,
        z: 1,
        centerX: '100%',
        centerY: 0,
      }
    }
    else if (AnimateEffect.ScaleRightBottom == this.animateOptions.animate) {
      this.scaleOptions = {
        x: 0,
        y: 0,
        z: 1,
        centerX: '100%',
        centerY: '100%',
      }
    }
    else if (AnimateEffect.ScaleCenterLeft == this.animateOptions.animate) {
      this.scaleOptions = {
        x: 0,
        y: 1,
        z: 1,
        centerX: 0,
        centerY: '50%',
      }
    }
    else if (AnimateEffect.ScaleCenterRight == this.animateOptions.animate) {
      this.scaleOptions = {
        x: 0,
        y: 1,
        z: 1,
        centerX: '100%',
        centerY: '50%',
      }
    }
    else if (AnimateEffect.ScaleCenterTop == this.animateOptions.animate) {
      this.scaleOptions = {
        x: 1,
        y: 0,
        z: 1,
        centerX: '50%',
        centerY: 0,
      }
    }
    else if (AnimateEffect.ScaleCenterBottom == this.animateOptions.animate) {
      this.scaleOptions = {
        x: 1,
        y: 0,
        z: 1,
        centerX: '50%',
        centerY: '100%',
      }
    }
  }

  animateAfterStartStatus() {
    if (AnimateEffect.ScaleLeftTop == this.animateOptions.animate) {
      this.scaleOptions = {
        x: 1,
        y: 1,
        z: 1,
        centerX: 0,
        centerY: 0,
      }
    }
    else if (AnimateEffect.ScaleLeftBottom == this.animateOptions.animate) {
      this.scaleOptions = {
        x: 1,
        y: 1,
        z: 1,
        centerX: 0,
        centerY: '100%',
      }
    }
    else if (AnimateEffect.ScaleRightTop == this.animateOptions.animate) {
      this.scaleOptions = {
        x: 1,
        y: 1,
        z: 1,
        centerX: '100%',
        centerY: 0,
      }
    }
    else if (AnimateEffect.ScaleRightBottom == this.animateOptions.animate) {
      this.scaleOptions = {
        x: 1,
        y: 1,
        z: 1,
        centerX: '100%',
        centerY: '100%',
      }
    }
    else if (AnimateEffect.ScaleCenterLeft == this.animateOptions.animate) {
      this.scaleOptions = {
        x: 1,
        y: 1,
        z: 1,
        centerX: 0,
        centerY: '50%',
      }
    }
    else if (AnimateEffect.ScaleCenterRight == this.animateOptions.animate) {
      this.scaleOptions = {
        x: 1,
        y: 1,
        z: 1,
        centerX: '100%',
        centerY: '50%',
      }
    }
    else if (AnimateEffect.ScaleCenterTop == this.animateOptions.animate) {
      this.scaleOptions = {
        x: 1,
        y: 1,
        z: 1,
        centerX: '50%',
        centerY: 0,
      }
    }
    else if (AnimateEffect.ScaleCenterBottom == this.animateOptions.animate) {
      this.scaleOptions = {
        x: 1,
        y: 1,
        z: 1,
        centerX: '50%',
        centerY: '100%',
      }
    }
  }

  animateBeforeEndStatus() {
    this.animateAfterStartStatus();
  }

  animateAfterEndStatus() {
    this.animateBeforeStartStatus();
  }


  // 开启动画
  executeStartAnimate() {
    this.animateBeforeStartStatus();
    this.useScale = true
    animateTo({ duration: this.duration, curve: Curve.Linear, onFinish: () => {
      this.useScale = false;
    } }, () => {
    this.animateAfterStartStatus()
    })
    this.showStatus = Visibility.Visible
  }
  // 反转动画
  executeEndAnimate() {
    this.animateBeforeEndStatus()
    this.useScale = true
    animateTo({ duration: this.duration, curve: Curve.Linear, onFinish: () => {

    } }, () => {
      this.animateAfterEndStatus()
    })
  }

  build() {
    Stack(){
        Column() {
          Text(this.title)
            .fontSize(24)
            .padding(5)
            .height(60)
            .fontColor('#ffffff')
            .textAlign(TextAlign.Center)
          Text('这里是提示内容区域')
            .fontSize(18)
            .padding(5)
            .height(40)
            .fontColor('#ffffff')
            .textAlign(TextAlign.Center)

          if (this.isDisplay) {
            Column() {
              Flex({ direction: FlexDirection.Row }) {
                Text('Cancel')
                  .fontColor('#ffffff')
                  .textAlign(TextAlign.Center)
                  .width('50%')
                  .height('100%')
                  .lineHeight('100%')
                  .border({
                    width: { right: 1 },
                    color: { right: '#ffffff' },
                    style: { top: BorderStyle.Solid }
                  })
                  .onClick(() => {
                    this.closeDialog()
                    this.cancel()
                  })
                Text('Ok')
                  .fontColor("#ffffff")
                  .textAlign(TextAlign.Center)
                  .width('50%')
                  .height('100%')
                  .lineHeight('100%')
                  .onClick(() => {
                    this.closeDialog();
                    this.confirm()
                  })
              }.width('100%')
            }.height(60).width('100%')
            .margin({ top: 20 })
            .border({
              width: { top: 1 },
              color: { top: '#ffffff' },
              style: { top: BorderStyle.Solid },
            })
          }
        }
        .width('80%')
        .backgroundColor('#232323')
        .borderRadius(10)
        .visibility(this.showStatus)
        .scale(this.useScale ? this.scaleOptions : {})
        .onAreaChange((oldValue, newValue) => {
          this.compDialogWidth = newValue.width as number;
          this.compDialogHeight = newValue.height as number;
          if (this.openAnimatedFlag) {
            this.executeStartAnimate();
          }
        })
        .onClick(() =>{
          return
        })

    }
    .onClick(() =>{
      this.closeDialog()
      // this.controller.close()
    })

  }


}
