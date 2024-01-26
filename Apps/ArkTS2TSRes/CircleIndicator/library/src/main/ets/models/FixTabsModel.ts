let __generate__Id: number = 0;
function generateId(): string {
    return "FixTabsModel_" + ++__generate__Id;
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
export enum CursorType {
    Overline,
    Underline,
    Block
}
const DEFAULT_LINE_HEIGHT: Length = '3vp';
const DEFAULT_TEXT_SELECT_SIZE: number = 22;
const DEFAULT_TEXT_NORMAL_SIZE: number = 18;
const DEFAULT_BORDER_RADIUS: Length = 0;
const DEFAULT_WIDTH: Length = '360vp';
const DEFAULT_BG_HEIGHT_PERCENT: string = "100%";
const DEFAULT_BG_IMAGE_TEXT: string = " ";
const DEFAULT_TEXT_NORMAL_COLOR: string = "#000000";
const DEFAULT_TEXT_SELECT_COLOR: string = "#848484";
export class FixTabsModel extends BaseModel<FixTabsModel> {
    private amin: boolean = true; // 是否有移动动画
    private lineHeight: number = length2Vp(getContext(), DEFAULT_LINE_HEIGHT); // 线的高度
    private lineColor: ResourceColor = $r('app.color.fix_line_color'); // 横线的颜色
    private textSelectColor: string = DEFAULT_TEXT_NORMAL_COLOR; // 文字的颜色
    private textNormalColor: string = DEFAULT_TEXT_SELECT_COLOR; // 文字的颜色
    private textSelectSize: number = DEFAULT_TEXT_SELECT_SIZE; // 文字选中的大小
    private textNormalSize: number = DEFAULT_TEXT_NORMAL_SIZE; // 文字未选中的大小
    private bgColor: ResourceColor = $r('app.color.fix_slider_background_color'); // 滑块的背景色
    private bgHeightPercent: string = DEFAULT_BG_HEIGHT_PERCENT;
    private borderRadius: number = length2Vp(getContext(), DEFAULT_BORDER_RADIUS); // 滑块的背景色的圆角度数
    private bgImageText: string = DEFAULT_BG_IMAGE_TEXT; // 背景图片上的文字
    private bgImage: string | PixelMap | Resource | null = null; // 滑块上的图片
    private clickCallback: (index: number) => void = (index: number) => { };
    private cursorType: CursorType = CursorType.Underline;
    protected width: number = length2Vp(getContext(), DEFAULT_WIDTH);
    constructor(controller: TabsController | null) {
        super(controller);
    }
    public setBgHeightPercent(bgHeightPercent: string) {
        this.bgHeightPercent = bgHeightPercent;
        return this;
    }
    public getBgHeightPercent(): string {
        return this.bgHeightPercent;
    }
    public setSelectedTextColor(color: string): FixTabsModel {
        this.textSelectColor = color;
        return this;
    }
    public getSelectedTextColor(): string {
        return this.textSelectColor;
    }
    public setUnselectedTextColor(color: string): FixTabsModel {
        this.textNormalColor = color;
        return this;
    }
    public getUnselectedTextColor(): string {
        return this.textNormalColor;
    }
    public setSelectedTextSize(size: Length, context?: common.UIAbilityContext): FixTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.textSelectSize = length2Vp(context, size);
        return this;
    }
    public getSelectedTextSize(): number {
        return this.textSelectSize;
    }
    public setUnselectedTextSize(size: Length, context?: common.UIAbilityContext): FixTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.textNormalSize = length2Vp(context, size);
        return this;
    }
    public getUnselectedTextSize() {
        return this.textNormalSize;
    }
    public setLineHeight(lineHeight: Length, context?: common.UIAbilityContext): FixTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.lineHeight = length2Vp(context, lineHeight);
        return this;
    }
    public getLineHeight(): number {
        return this.lineHeight;
    }
    public setLineColor(lineColor: ResourceColor): FixTabsModel {
        this.lineColor = lineColor;
        return this;
    }
    public getLineColor(): ResourceColor {
        return this.lineColor;
    }
    public setAnimation(amin: boolean): FixTabsModel {
        this.amin = amin;
        return this;
    }
    public isAnimation(): boolean {
        return this.amin;
    }
    public setCursorType(cursorType: CursorType): FixTabsModel {
        this.cursorType = cursorType;
        return this;
    }
    public getCursorType(): CursorType {
        return this.cursorType;
    }
    public setCursorColor(color: ResourceColor): FixTabsModel {
        this.bgColor = color;
        return this;
    }
    public getCursorColor(): ResourceColor {
        return this.bgColor;
    }
    public setCursorImage(url: string | PixelMap | Resource): FixTabsModel {
        this.bgImage = url;
        return this;
    }
    public getCursorImage(): string | PixelMap | Resource | null {
        return this.bgImage;
    }
    public setCursorRadius(radius: Length, context?: common.UIAbilityContext): FixTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.borderRadius = length2Vp(context, radius);
        return this;
    }
    public getCursorRadius(): number {
        return this.borderRadius;
    }
    public setCursorText(text: string): FixTabsModel {
        this.bgImageText = text;
        return this;
    }
    public getCursorText(): string {
        return this.bgImageText;
    }
    public setClickListener(listener: (num: number) => void): FixTabsModel {
        this.clickCallback = listener;
        return this;
    }
    public getClickListener(): (num: number) => void {
        return this.clickCallback;
    }
}
