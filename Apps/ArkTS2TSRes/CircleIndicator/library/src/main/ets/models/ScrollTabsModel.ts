let __generate__Id: number = 0;
function generateId(): string {
    return "ScrollTabsModel_" + ++__generate__Id;
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
import { IconItem } from './IconModel';
import common from '@ohos.app.ability.common';
const DEFAULT_HEIGHT: Length = '53vp';
const DEFAULT_CURSOR_HEIGHT: Length = '6vp';
const DEFAULT_TEXT_HEIGHT: Length = '45vp';
const DEFAULT_DIVIDER_HEIGHT: Length = '2vp';
const DEFAULT_CURSOR_WIDTH: Length = '80vp';
const DEFAULT_TEXT_WIDTH: Length = '80vp';
const DEFAULT_SELECTED_TEXT_SIZE: Length = '18vp';
const DEFAULT_ICON_SIZE: Length = '25vp';
const DEFAULT_UNSELECTED_TEXT_SIZE: Length = '18vp';
export class ScrollTabsModel extends BaseModel<ScrollTabsModel> {
    protected height: number = length2Vp(getContext(), DEFAULT_HEIGHT);
    protected backgroundColor: ResourceColor = $r('app.color.scroll_default_background_color');
    private snap: boolean = true;
    private icons: IconItem[] = [];
    color: ResourceColor = $r('app.color.scroll_default_cursor_color');
    private fontColor: ResourceColor = $r('app.color.scroll_default_selected_text_color');
    private showdivider: boolean = false;
    private mHasIcon: boolean = false;
    private cursorHeight: number = length2Vp(getContext(), DEFAULT_CURSOR_HEIGHT);
    private textHeight: number = length2Vp(getContext(), DEFAULT_TEXT_HEIGHT);
    private dividerHeight: number = length2Vp(getContext(), DEFAULT_DIVIDER_HEIGHT);
    private cursorWidth: number = length2Vp(getContext(), DEFAULT_CURSOR_WIDTH);
    private textWidth: number = length2Vp(getContext(), DEFAULT_TEXT_WIDTH);
    private dividerColor: ResourceColor = $r('app.color.scroll_default_divider_color');
    private selectedTextSize: number = length2Vp(getContext(), DEFAULT_SELECTED_TEXT_SIZE);
    private iconSize: number = length2Vp(getContext(), DEFAULT_ICON_SIZE);
    private UnselectedTextColor: ResourceColor = $r('app.color.scroll_default_unselected_text_color');
    private UnselectedTextSize: number = length2Vp(getContext(), DEFAULT_UNSELECTED_TEXT_SIZE);
    private cursorUp: boolean = false;
    private clickListener: (index: number) => void = (index: number) => { };
    constructor(controller: TabsController | null) {
        super(controller);
    }
    public setCursorUp(cursorUp: boolean): ScrollTabsModel {
        this.cursorUp = cursorUp;
        return this;
    }
    public isCursorUp(): boolean {
        return this.cursorUp;
    }
    public setUnselectedTextSize(UnselectedTextSize: Length, context?: common.UIAbilityContext): ScrollTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.UnselectedTextSize = length2Vp(context, UnselectedTextSize);
        return this;
    }
    public getUnselectedTextSize(): number {
        return this.UnselectedTextSize;
    }
    public setUnselectedTextColor(UnselectedTextColor: ResourceColor): ScrollTabsModel {
        this.UnselectedTextColor = UnselectedTextColor;
        return this;
    }
    public getUnselectedTextColor(): ResourceColor {
        return this.UnselectedTextColor;
    }
    public setIcons(icons: IconItem[]): ScrollTabsModel {
        this.icons = icons;
        this.mHasIcon = true;
        return this;
    }
    public getIcons(): IconItem[] {
        return this.icons;
    }
    public hasIcon(): boolean {
        return this.mHasIcon;
    }
    public setIconSize(iconSize: Length, context?: common.UIAbilityContext): ScrollTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.iconSize = length2Vp(context, iconSize);
        return this;
    }
    public getIconSize(): number {
        return this.iconSize;
    }
    public setSelectedTextSize(selectedTextSize: Length, context?: common.UIAbilityContext): ScrollTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.selectedTextSize = length2Vp(context, selectedTextSize);
        return this;
    }
    public getSelectedTextSize(): number {
        return this.selectedTextSize;
    }
    public setDividerColor(dividerColor: ResourceColor): ScrollTabsModel {
        this.dividerColor = dividerColor;
        return this;
    }
    public getDividerColor(): ResourceColor {
        return this.dividerColor;
    }
    public setCursorWidth(cursorWidth: Length, context?: common.UIAbilityContext): ScrollTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.cursorWidth = length2Vp(context, cursorWidth);
        return this;
    }
    public getCursorWidth(): number {
        return this.cursorWidth;
    }
    public setTextWidth(textWidth: Length, context?: common.UIAbilityContext): ScrollTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.textWidth = length2Vp(context, textWidth);
        return this;
    }
    public getTextWidth(): number {
        return this.textWidth;
    }
    public setDividerHeight(dividerHeight: Length, context?: common.UIAbilityContext): ScrollTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.dividerHeight = length2Vp(context, dividerHeight);
        return this;
    }
    public getDividerHeight(): number {
        return this.dividerHeight;
    }
    public setCursorHeight(cursorHeight: Length, context?: common.UIAbilityContext): ScrollTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.cursorHeight = length2Vp(context, cursorHeight);
        return this;
    }
    public getCursorHeight(): number {
        return this.cursorHeight;
    }
    public setTextHeight(textHeight: Length, context?: common.UIAbilityContext): ScrollTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.textHeight = length2Vp(context, textHeight);
        return this;
    }
    public getTextHeight(): number {
        return this.textHeight;
    }
    public setShowDivider(showdivider: boolean): ScrollTabsModel {
        this.showdivider = showdivider;
        return this;
    }
    public isShowDivider(): boolean {
        return this.showdivider;
    }
    public setSelectedTextColor(fontColor: ResourceColor): ScrollTabsModel {
        this.fontColor = fontColor;
        return this;
    }
    public getSelectedTextColor(): ResourceColor {
        return this.fontColor;
    }
    public setCursorColor(color: ResourceColor): ScrollTabsModel {
        this.color = color;
        return this;
    }
    public getCursorColor(): ResourceColor {
        return this.color;
    }
    public setSnap(snap: boolean): ScrollTabsModel {
        this.snap = snap;
        return this;
    }
    public isSnap(): boolean {
        return this.snap;
    }
    public setClickListener(callback: (index: number) => void): ScrollTabsModel {
        this.clickListener = callback;
        return this;
    }
    public getClickListener(): (num: number) => void {
        return this.clickListener;
    }
}
