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

import { BaseMode } from './BaseModel'
export interface  TitleBorder {                                   // 标题边框
  width?: Length | EdgeWidths,
  color?:  ResourceColor | EdgeColors,
  radius?:  Length | BorderRadiuses,
  style?: BorderStyle | EdgeStyles
}

export interface BtnContentBorder{
  width?: Length | EdgeWidths,
  color?:  ResourceColor | EdgeColors,
  radius?:  Length | BorderRadiuses,
  style?: BorderStyle | EdgeStyles
}


export interface BtnBorder{                                     // 按钮边框
  width?: Length | EdgeWidths,
  color?:  ResourceColor | EdgeColors,
  radius?:  Length | BorderRadiuses,
  style?: BorderStyle | EdgeStyles
}

export class BaseCenterMode extends BaseMode {

  // 基本属性

  title?: string = '标题'                           // 弹窗标题

  titleFontSize?: number = 24                      // 弹窗标题文字尺寸

  titleFontColor?: Color | string = '#000000'      // 弹窗标题文字颜色

  titleHeight?: number | string = 60               // 标题高度

  titleWight?: number | string = '100%'            // 标题宽度

  titleTextAlign?: TextAlign = TextAlign.Center    // 标题文本对齐方式

  titleMargin?: Margin | number                    // 标题外边距

  titleBorder?:TitleBorder = undefined

  contentHeight?: string | number = 200             // 内容高度

  contentValue?: string = '这里是内容区域'            // 内容文字

  contentFontColor?: string = '#ffffff'            // 内容文字颜色

  contentFontSize: number | string | Resource = 20                    // 弹窗内容文字尺寸

  contentTextAlign?: TextAlign = TextAlign.Center  // 内容文本对齐方式

  contentMargin?: Margin | number                  // 内容外边距

  contentPadding?: Padding | number                // 内容内边距

  /* ---------------------------按钮设置--------------------------- */

  cancelBtnTitle?: string = '取消'                // 取消按钮标题

  cancelBtnFontColor?: string = '#000000'        // 取消字体颜色

  cancelBtnBgColor?: string = '#ffffff'          // 取消背景颜色

  cancelBtnBorderRadius?: Length|BorderRadiuses = {bottomLeft:10}         // 取消按钮边框弧度

  confirmBtnTitle?: string = '确认'                                       // 确认按钮标题

  confirmBtnFontColor?: Color | string = '#317aff'                          // 确认字体颜色

  confirmBtnBgColor?:  Color | string = '#ffffff'                           // 确认背景颜色

  confirmBtnBorderRadius?: Length | BorderRadiuses = {bottomRight:10}       // 确认按钮边框弧度

  isDisplayBtn?: Boolean = true                    // 是否显示按钮

  btnContentWidth?: string | number = '100%'       // 按钮块宽度

  btnContentHeight?: string | number               // 按钮块高度

  btnContentMargin?: Margin | number               // 按钮块外边距

  btnContentBorder?:BtnContentBorder = undefined

  btnWidth?: number|string = '50%'                 // 按钮宽度

  btnHeight?: number|string = 60                   // 按钮高度

  btnBorder?:BtnBorder = undefined

  btnFontSize?:number = 20                         // 按钮文字大小

  btnType?: ButtonType  = ButtonType.Normal        // 按钮类型


  /* ---------------------------弹窗函数设置--------------------------- */

  confirm?: (val?:Object) => void                  // 确认函数

  cancel?: () => void                           // 取消函数

  /* ---------------------------弹窗设置--------------------------- */

  dialogHeight?: number | string                    // 弹窗高度

  dialogWidth?: number | string = '80%'             // 弹窗宽度

  dialogBgColor?: Color | string = Color.White      // 弹窗背景颜色

  dialogBorderRadius?: number = 10                  // 弹窗圆角大小

  popupAnimation?:TransitionEffect = undefined      // 弹窗动画

  dialogPadding?: Padding | number                  // 弹窗内边距

}