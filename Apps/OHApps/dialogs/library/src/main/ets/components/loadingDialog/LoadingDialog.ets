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

import { LoadingDialogModel } from '../model/LoadingDialogModel'

@CustomDialog
export struct LoadingDialog {
  controller: CustomDialogController;
  @Prop loadingTitle: string = '加载中'
  @State data: LoadingDialogModel = new LoadingDialogModel();
  @State interpolatedProgress: string = ''
  @State linearProgress: string = ''
  @Prop popupAnimation:TransitionEffect|undefined = undefined
  // 控制执行一次
  interpolatedFlag: boolean = false
  linearFlag: boolean = false
  @StorageProp('state') state: number = 1
  //监测进度值的改变
  @State @Watch("interpolatedUpdated") interpolatedData: LoadingDialogModel = new LoadingDialogModel();
  //监测进度值的改变
  @State @Watch("linearUpdated") linearData: LoadingDialogModel = new LoadingDialogModel();

  interpolatedUpdated(value: Object): void {
    this.interpolatedProgress = this.interpolatedData.getProgress()
    if (AppStorage.Get('state') == 1) {
      this.interpolatedRunCallback()
    }
  }

  linearUpdated(value: Object): void {
    this.interpolatedProgress = this.interpolatedData.getProgress()
    this.linearProgress = this.linearData.getProgress()
    if (AppStorage.Get('state') == 1) {
      this.linearRunCallback()
    }
  }

  interpolatedRunCallback() {
    // 内插值进度轮
    if (this.interpolatedProgress == '0.00') {
      if (this.interpolatedFlag) {
        this.interpolatedFlag = false
        this.interpolatedData.setProgress(1).init()
      }
    } else if (this.interpolatedProgress == '1.00') {
      if (!this.interpolatedFlag) {
        this.interpolatedFlag = true
        this.interpolatedData.setProgress(0).init()
      }
    }
  }

  linearRunCallback() {
    // 线性进度轮
    if (this.linearProgress == '0.00') {
      if (this.linearFlag) {
        this.linearFlag = false
        this.linearData.setProgress(1).init()
      }
    } else if (this.linearProgress == '1.00') {
      if (!this.linearFlag) {
        this.linearFlag = true
        this.linearData.setProgress(0).init()
      }
    }
  }

  build() {
    Column() {
      Flex({ direction: FlexDirection.Column,justifyContent:FlexAlign.Center,alignItems: ItemAlign.Center }){
        Column(){
          Stack() {
            Path()
              .strokeWidth(this.data.barWidth)
              .fillOpacity(0)
              .stroke(this.data.barColor)
              .commands(this.data.svgPath)
              .width(50)
              .height(50)
              .zIndex(2)
            Path()
              .strokeWidth(this.data.rimWidth)
              .fillOpacity(0)
              .stroke(this.data.rimColor)
              .width(50)
              .height(50)
              .commands(this.data.rimSvgPath)
              .zIndex(0)
          }
        }
        Column(){
          Text(this.loadingTitle).fontSize(15).fontColor(0x7A7A7A).textAlign(TextAlign.Center)
        }
      }
    }.height(100).width(100).backgroundColor(Color.White).borderRadius(10).transition(this.popupAnimation != undefined ? this.popupAnimation:undefined)
  }

  aboutToAppear() {
    this.data.init()
    this.interpolatedData
      .setSpinning(false)
      .setLinearProgress(true)
      .setProgress(1)
      .init()
    this.linearData
      .setSpinning(false)
      .setLinearProgress(true)
      .setProgress(1)
      .init()
  }

  aboutToDisappear() {
    // 关闭定时器
    this.data.closeTimer()
    this.interpolatedData.closeTimer()
    this.linearData.closeTimer()
  }
}