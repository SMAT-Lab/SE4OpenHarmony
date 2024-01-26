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

import { InputDialog, inputModel } from '@ohos/dialogs'
import {  BtnBorder,BtnContentBorder,InputBorder } from '@ohos/dialogs'
import { SelectParam } from '../components/SelectParam'
import { SelectInput } from '../components/SelectInput'
@Entry
@Component
struct InputDialogExample {
  @State inputValue: string = ''
  @State title: string = '标题'
  @State placeholder: string = '请输入'
  @State model: inputModel = new inputModel()
  @State select: SelectParam = new SelectParam()
  aboutToAppear() {
    this.model.titleFontColor = '#ffffff'
    this.model.titleHeight = 60
    this.model.contentFontColor = '#ffffff'
    this.model.cancelBtnFontColor = '#ffffff'
    this.model.cancelBtnBgColor = '#232323'
    this.model.cancelBtnTitle = 'cancel'
    let btnBorder:BtnBorder = {
    width: {right: 1},
    color:{right:'#ffffff'},
    style:{top:BorderStyle.Solid}
    }
    this.model.btnBorder = btnBorder
    this.model.confirmBtnFontColor = '#ffffff'
    this.model.confirmBtnBgColor = '#232323'
    this.model.confirmBtnTitle = 'OK'
    this.model.isDisplayBtn = true
    this.model.btnWidth = '50%'
    this.model.btnHeight = 60
    this.model.btnContentMargin = {top: 30}
    this.model.placeholderColor = '#ffffff'
    this.model.dialogBgColor = '#232323'
    this.model.dialogPadding = {top: 10}
    this.model.inputBgColor =  '#232323'
    this.model.inputPadding = 0
    this.model.inputMargin ={left:20,right:20}
    this.model.inputMargin = {left:20,right:20}
    this.model.inputBorderRadius = 0
    let btnContentBorder:BtnContentBorder = {
      width: {top: 1},
      color:{top:'#ffffff'},
      style:{top:BorderStyle.Solid}
    }
    this.model.btnContentBorder = btnContentBorder
    let inputBorder:InputBorder={
      width: {bottom: 1},
      color:{bottom:'#008577'},
      style:{top:BorderStyle.Solid}
    }
    this.model.inputBorder = inputBorder;
    this.model.titleFontColor = '#ffffff'
    this.model.isDisplayInput = true
    this.model.cancel = this.onCancel
    this.model.confirm = this.confirm
    this.model.customCallback = {
      beforeAppear: () => {
        console.log('inputContent', 'beforeAppear回调')
      },
      beforeDisappear: () => {
        console.log('inputContent', 'beforeDisappear回调')
      }
    }
    this.model.dialogWidth = '80%'
  }

  InputController: CustomDialogController | undefined = undefined
  onCancel() {
    console.info('Callback when the first button is clicked')
  }

  confirm() {
    console.info('Callback when the second button is clicked')
  }

  build() {
    Column(){
      Button('input弹窗').onClick(() => {
        this.InputController = new CustomDialogController({
          builder: InputDialog({
            model: this.model,
            inputValue: this.inputValue
          }),
          customStyle: true,
          autoCancel: this.select.autoCancel,
          alignment: DialogAlignment.Center,
          maskColor: this.select.maskColor,
          offset: { dx: this.select.dx, dy: this.select.dy }
        })
        this.model.isDisplayInput = this.select.isDisplayInput
        this.model.dialogBorderRadius = this.select.borderRadius
        this.model.confirmBtnBorderRadius = { bottomRight: this.select.borderRadius }
        this.model.cancelBtnBorderRadius = { bottomLeft: this.select.borderRadius }
        this.model.isSupportGesture = this.select.isSupportGesture
        this.model.autoCancel = this.select.autoCancel
        if(this.InputController != undefined) {
          this.InputController.open()
        }
      })
      SelectInput({
        select: this.select
      })
    }
  }
}