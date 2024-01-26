let __generate__Id: number = 0;
function generateId(): string {
    return "TitleModel_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import BaseModel from './BaseModel';
import { length2Vp } from '../utils/UiUtil';
import common from '@ohos.app.ability.common';
const DEFAULT_TOP_PADDING: Length = '7vp';
const DEFAULT_TEXT_SIZE: Length = '15fp';
const DEFAULT_FOOTER_INDICATOR_PADDING: Length = '7vp';
const DEFAULT_FOOTER_INDICATOR_HEIGHT: Length = '4vp';
const DEFAULT_FOOTER_LINE_HEIGHT: Length = '2vp';
const DEFAULT_TITLE_PADDING: Length = '5vp';
const DEFAULT_CLIP_PADDING: Length = '4vp';
const DEFAULT_FOOTER_INDICATOR_UNDERLINE_PADDING: Length = '20vp';
export class TitleModel extends BaseModel<TitleModel> {
    constructor(tabsController: TabsController | null) {
        super(tabsController);
    }
    centerItemClickListener: (position: number) => void = (position: number) => { };
    // 纵向各区域尺寸
    private topPadding: number = length2Vp(getContext(), DEFAULT_TOP_PADDING); // 文字区域和顶部间距
    private textSize: number = length2Vp(getContext(), DEFAULT_TEXT_SIZE); // 字体大小，决定了文字区高度，需要通过evalutateTextHeight 换算
    private footerIndicatorPadding: number = length2Vp(getContext(), DEFAULT_FOOTER_INDICATOR_PADDING); // 文字区和滑块区间距
    private footerIndicatorHeight: number = length2Vp(getContext(), DEFAULT_FOOTER_INDICATOR_HEIGHT); // 滑块高度
    private footerLineHeight: number = length2Vp(getContext(), DEFAULT_FOOTER_LINE_HEIGHT); // 底部直线高度
    // 横向尺寸
    private titlePadding: number = length2Vp(getContext(), DEFAULT_TITLE_PADDING); // 相邻title间最小间距
    private clipPadding: number = length2Vp(getContext(), DEFAULT_CLIP_PADDING); // 左右两侧显示未选中title的区域宽度
    private footerIndicatorUnderlinePadding: number = length2Vp(getContext(), DEFAULT_FOOTER_INDICATOR_UNDERLINE_PADDING); // 横线形式的滑块两侧超出title宽度的长度,此属性原库未以java接口形式公开，仅以xml属性提供自定义
    // 文字相关设置
    private textColor: ResourceColor = $r('app.color.title_default_text_color');
    private selectedColor: ResourceColor = $r('app.color.title_default_selected_color');
    private selectedBold: boolean = true;
    private fontFamily: string = "sans-serif";
    // 游标相关设置
    private linePosition: LinePosition = LinePosition.BOTTOM;
    private footerIndicatorStyle: IndicatorStyle = IndicatorStyle.UNDERLINE;
    private footerColor: ResourceColor = $r('app.color.title_default_footer_color');
    public setOnCenterItemClickListener(callback: (position: number) => void): TitleModel {
        this.centerItemClickListener = callback;
        return this;
    }
    public setFooterColor(footerColor: ResourceColor): TitleModel {
        this.footerColor = footerColor;
        return this;
    }
    public getFooterColor(): ResourceColor {
        return this.footerColor;
    }
    public setFooterLineHeight(footerLineHeight: Length, context?: common.UIAbilityContext): TitleModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.footerLineHeight = length2Vp(context, footerLineHeight);
        return this;
    }
    public getFooterLineHeight(): number {
        return this.footerLineHeight;
    }
    public setFooterIndicatorHeight(footerIndicatorHeight: Length, context?: common.UIAbilityContext): TitleModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.footerIndicatorHeight = length2Vp(context, footerIndicatorHeight);
        return this;
    }
    public getFooterIndicatorHeight(): number {
        return this.footerIndicatorHeight;
    }
    public setFooterIndicatorPadding(footerIndicatorPadding: Length, context?: common.UIAbilityContext): TitleModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.footerIndicatorPadding = length2Vp(context, footerIndicatorPadding);
        return this;
    }
    public getFooterIndicatorPadding(): number {
        return this.footerIndicatorPadding;
    }
    public setFooterIndicatorStyle(indicatorStyle: IndicatorStyle): TitleModel {
        this.footerIndicatorStyle = indicatorStyle;
        return this;
    }
    public getFooterIndicatorStyle(): IndicatorStyle {
        return this.footerIndicatorStyle;
    }
    public setLinePosition(linePosition: LinePosition): TitleModel {
        this.linePosition = linePosition;
        return this;
    }
    public getLinePosition(): LinePosition {
        return this.linePosition;
    }
    public setSelectedColor(selectedColor: ResourceColor): TitleModel {
        this.selectedColor = selectedColor;
        return this;
    }
    public getSelectedColor(): ResourceColor {
        return this.selectedColor;
    }
    public setSelectedBold(selectedBold: boolean): TitleModel {
        this.selectedBold = selectedBold;
        return this;
    }
    public isSelectedBold(): boolean {
        return this.selectedBold;
    }
    public setTextColor(textColor: ResourceColor): TitleModel {
        this.textColor = textColor;
        return this;
    }
    public getTextColor(): ResourceColor {
        return this.textColor;
    }
    public setTextSize(textSize: Length, context?: common.UIAbilityContext): TitleModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.textSize = length2Vp(context, textSize);
        return this;
    }
    public getTextSize(): number {
        return this.textSize;
    }
    public setTitlePadding(titlePadding: Length, context?: common.UIAbilityContext): TitleModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.titlePadding = length2Vp(context, titlePadding);
        return this;
    }
    public getTitlePadding(): number {
        return this.titlePadding;
    }
    public setTopPadding(topPadding: Length, context?: common.UIAbilityContext): TitleModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.topPadding = length2Vp(context, topPadding);
        return this;
    }
    public getTopPadding(): number {
        return this.topPadding;
    }
    public setClipPadding(clipPadding: Length, context?: common.UIAbilityContext): TitleModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.clipPadding = length2Vp(context, clipPadding);
        return this;
    }
    public getClipPadding(): number {
        return this.clipPadding;
    }
    public setFontFamily(fontFamily: string): TitleModel {
        this.fontFamily = fontFamily;
        return this;
    }
    public getFontFamily(): string {
        return this.fontFamily;
    }
    public setFooterIndicatorUnderlinePadding(footerIndicatorUnderlinePadding: Length, context?: common.UIAbilityContext): TitleModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.footerIndicatorUnderlinePadding = length2Vp(context, footerIndicatorUnderlinePadding);
        return this;
    }
    public getFooterIndicatorUnderlinePadding() {
        return this.footerIndicatorUnderlinePadding;
    }
}
export class Bounds {
    left: number;
    top: number;
    right: number;
    bottom: number;
    constructor(left: number = 0, top: number = 0, right: number = 0, bottom: number = 0) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
}
export enum IndicatorStyle {
    NONE,
    TRIANGLE,
    UNDERLINE
}
export enum LinePosition {
    BOTTOM,
    TOP
}
