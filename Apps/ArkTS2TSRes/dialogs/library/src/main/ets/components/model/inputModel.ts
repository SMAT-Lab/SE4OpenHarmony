let __generate__Id: number = 0;
function generateId(): string {
    return "inputModel_" + ++__generate__Id;
}
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
import { BaseCenterMode } from './BaseCenterModel';
export class inputModel extends BaseCenterMode {
    /* ---------------------------输入框设置--------------------------- */
    inputFontSize?: number = 20; // 输入框文字尺寸
    inputFontColor?: string = '#000000'; // 输入框文字颜色
    inputBgColor?: string = '#ffffff'; // 输入框背景颜色
    placeholder?: string = '请输入'; // 输入框提示文字
    placeholderColor?: string = '#000000'; // 输入框placeholder提示文字颜色
    inputBorderRadius?: number = 10; // 输入框borderRadius大小
    inputMargin?: Margin | number; // 输入框外边距
    inputPadding?: Padding | number; // 输入框内边距
    inputBorder?: InputBorder;
}
export interface InputBorder {
    width?: Length | EdgeWidths;
    color?: ResourceColor | EdgeColors;
    radius?: Length | BorderRadiuses;
    style?: BorderStyle | EdgeStyles;
}
