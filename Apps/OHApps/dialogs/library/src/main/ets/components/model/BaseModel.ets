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

export interface CustomCallback {

  beforeAppear?: () => void // 控件调aboutToAppear时回调

  beforeDisappear?: () => void  // 控件调aboutToDisappear时回调
}

export class BaseMode {

  // 是否允许点击返回键关闭弹窗
  onBackClose?: boolean = true

  // 是否允许操作后关闭弹窗，用于确认，选择按钮场景
  autoClose?: boolean = true

  // 弹窗动画器，支持自定义能力
  popupAnimation?:TransitionEffect

  // 弹窗弹出后的位置 Left|Right|Top|Bottom
  positionDialog?: string

  // 是否支持手势拖拽
  isSupportGesture?: boolean = true

  // 是否在弹框退出时，删除对象，释放资源
  isDeleteOnDisappear?: boolean = false

  // 设置弹窗build前和build后的回调
  customCallback?: CustomCallback

  // 是否允许点击遮罩层退出
  autoCancel?: boolean = true

  // 背景模糊效果设置
  backdropBlur?: number = 0

  // 圆角弧度
  borderRadius?: Length | BorderRadiuses

  // 是否默认打开输入法， 带弹框的场景
  isDisplayInput?: boolean = true
}

