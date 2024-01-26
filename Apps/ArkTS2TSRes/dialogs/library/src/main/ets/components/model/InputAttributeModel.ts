let __generate__Id: number = 0;
function generateId(): string {
    return "InputAttributeModel_" + ++__generate__Id;
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
export class InputAttributeModel {
    /* ---------------------------输入框设置--------------------------- */
    placeholder: string = ''; // 提示文本,默认不显示
    inputFontSize: Length = 20; // 字体大小,默认20
    inputFontColor: Color = Color.Black; // 字体颜色,默认黑色
    inputRadius: Length = 5; // 输入框圆角,默认5
    inputWidth: Length = '100%'; // 输入框宽度,默认占满父容器
    inputHeight: Length = '100%'; // 输入框高度,默认跟随字体
    /* ---------------------------弹出框设置--------------------------- */
    dataList: string[] = []; // 弹出框内容列表,默认为空
    targetSpace: Length = 15; // 弹出框与输入框的间距,默认15
    placement: Placement = Placement.Bottom; // 弹出框的位置,默认在下方
    popupFontSize: Length = 20; // 弹窗框字体大小,默认20
    popupFontColor: Color = Color.Black; // 弹出框字体颜色,默认黑色
    popupWidth: Length = '100%'; // 弹出框宽度,默认占满父容器
    popupMaxWidth: Length = this.inputWidth; // 弹出框最大宽度为输入框宽度
    popupMaxHeight: Length = 500; // 弹出框最大高度,默认500
    popupColor: Color = Color.White; // 弹出框背景色,默认白色
    popupBorder: BorderOptions = {
        width: 2,
        style: BorderStyle.Solid,
        color: '#CECECE',
        radius: 25
    };
    popupScrollBar: BarState = BarState.Off; // 弹出列表滚动条,默认不显示
    hasDivider: boolean = true; // 弹出框是否需要分割线
    divider: Divider = {
        strokeWidth: 1,
        color: '#CECECE',
        startMargin: 10,
        endMargin: 10
    };
    setInputWidth(width: Length) {
        this.inputWidth = width;
        this.popupMaxWidth = width;
    }
}
export interface Divider {
    strokeWidth: number;
    color: string;
    startMargin: number;
    endMargin: number;
}
