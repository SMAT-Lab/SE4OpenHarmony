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

import { BaseCenterMode } from './BaseCenterModel'

export class listSelectModel extends BaseCenterMode {

  /* ---------------------------弹窗列表设置--------------------------- */

  selectMode:string ='normal'    // 列表选中模式  normal-正常,radio-单选,checkbox-多选

  listPadding: Padding | number =  0  // 列表内边距

  listTextWidth?: number|string = '100%'    // 列表文本宽度

  listTextFontSize?: number = 16   // 列表字体大小

  listTextFontColor?: Color | string  = '#000000'    // 列表字体大小

  listTextAlign?: TextAlign = TextAlign.Center  // 列表文本对齐方式

  listSelectTextAlign?: TextAlign = TextAlign.Start  // 列表选择框文本对齐方式

  selectBoxSize?: number = 20    // 列表选择框尺寸

  listItemHeight?: number|string = 60    // 列表item高度

  listItemPadding?: Padding | number    // 列表item内边距

  listItemBorder?:ListItemBorder

  listHeight?: string|number = 200    // 列表高度

  listDirection?: Axis  = Axis.Vertical          // 列表排列方向

  listScrollBar?: BarState = BarState.Auto       // 列表滑动

  listEdgeEffect?: EdgeEffect = EdgeEffect.Spring // 列表滑动边缘效果，默认无效果

  boxSelectedColor?: Color|string = '#007DFF'     // 选中后选择框颜色
}
export interface ListItemBorder{                                    // 列表item边框
  width?: Length | EdgeWidths,
  color?:  ResourceColor | EdgeColors,
  radius?:  Length | BorderRadiuses,
  style?: BorderStyle | EdgeStyles
}