let __generate__Id: number = 0;
function generateId(): string {
    return "ButtonAttributeModel_" + ++__generate__Id;
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
export class ButtonAttributeModel {
    /* ---------------------------Button设置-------------------------- */
    buttonText: ResourceStr = 'Button'; // 按钮文字,默认Button
    buttonType: ButtonType = ButtonType.Normal; // 按钮样式,默认Normal
    buttonBorderRadius: Length | BorderRadiuses = 5; // 按钮圆角,默认5
    buttonBgColor: ResourceColor = Color.Blue; // 按钮背景色,默认蓝色
    buttonFontSize: Length = 20; // 按钮字体大小,默认20
    buttonFontColor: ResourceColor = Color.White; // 按钮字体颜色,默认白色
    buttonWidth: Length = 100; // 按钮宽度,默认100
    buttonHeight: Length = 50; // 按钮高度,默认50
    /* ----------------------------气泡设置---------------------------- */
    placement: Placement = Placement.Bottom; // 气泡弹出的位置,默认下方弹出
    targetSpace: Length = 15; // 气泡弹出的位置与按钮的距离,默认15
    popupColor: ResourceColor = Color.Grey; // 气泡颜色,默认灰色
    autoCancel: boolean = true; // 气泡自动关闭,默认true
    enableArrow: boolean = true; // 气泡是否显示箭头
    /* ---------------------------第一段设置--------------------------- */
    firstText: ResourceStr = '第一段文字'; // 第一段文字内容
    firstFontSize: Length = 12; // 第一段字体大小,默认20
    firstFontColor: ResourceColor = Color.Black; // 第一段字体颜色,默认黑色
    firstWidth: Length = 0; // 第一段文字宽度,默认占满父容器
    firstHeight: Length = 0; // 第一段文字高度,默认跟随字体
    firstAction: () => void = () => { }; // 第一个事件
    /* ---------------------------分隔符设置--------------------------- */
    hasDivider: boolean = true; // 是否需要分隔符
    isVertical: boolean = true; // 分隔符是否纵向,默认是
    dividerHeight: Length = 14; // 分隔符高度,默认22
    dividerColor: ResourceColor = '#182431'; // 分隔符颜色,默认'#182431'
    dividerOpacity: number | Resource = 0.6; // 分隔符透明度,默认0.6
    dividerMargin: Margin | Length = {
        left: 8,
        right: 8
    };
    /* ---------------------------第二段设置--------------------------- */
    secondText: ResourceStr = '第二段文字'; // 第二段文字内容
    secondFontSize: Length = 12; // 第二段字体大小,默认20
    secondFontColor: ResourceColor = Color.Black; // 第二段字体颜色,默认黑色
    secondWidth: Length = 0; // 第二段文字宽度,默认占满父容器
    secondHeight: Length = 0; // 第二段文字高度,默认跟随字体
    secondAction: () => void = () => { }; // 第二个事件
}
