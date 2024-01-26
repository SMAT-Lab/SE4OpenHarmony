let __generate__Id: number = 0;
function generateId(): string {
    return "BottomTabsModel_" + ++__generate__Id;
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
const DEFAULT_HEIGHT: Length = '65vp';
const DEFAULT_SELECT_TEXT_COLOR: string = '#ff0000';
const DEFAULT_UNSELECT_TEXT_COLOR: string = '#828282';
const DEFAULT_SELECT_TEXT_SIZE: Length = '19vp';
const DEFAULT_UNSELECT_TEXT_SIZE: Length = '17vp';
const DEFAULT_CENTER_VIEW_WIDTH: Length = '50vp';
const DEFAULT_CENTER_VIEW_HEIGHT: Length = '50vp';
const DEFAULT_SELECT_ICON_SIZE: Length = '35vp';
const DEFAULT_UNSELECT_ICON_SIZE: Length = '28vp';
export class BottomTabsModel extends BaseModel<BottomTabsModel> {
    protected height: number = length2Vp(getContext(), DEFAULT_HEIGHT); // tab的高度
    protected backgroundColor: ResourceColor = $r('app.color.bottom_default_background_color');
    private textSelectColor: string = DEFAULT_SELECT_TEXT_COLOR; // 文字的颜色
    private textNormalColor: string = DEFAULT_UNSELECT_TEXT_COLOR; // 文字的颜色
    private textSelectSize: number = length2Vp(getContext(), DEFAULT_SELECT_TEXT_SIZE); // 文字选中的大小
    private textNormalSize: number = length2Vp(getContext(), DEFAULT_UNSELECT_TEXT_SIZE); // 文字未选中的大小
    private centerView: string | PixelMap | Resource | null = null;
    private centerViewWidth: number = length2Vp(getContext(), DEFAULT_CENTER_VIEW_WIDTH);
    private centerViewHeight: number = length2Vp(getContext(), DEFAULT_CENTER_VIEW_HEIGHT);
    private iconSelectSize: number = length2Vp(getContext(), DEFAULT_SELECT_ICON_SIZE);
    private iconNormalSize: number = length2Vp(getContext(), DEFAULT_UNSELECT_ICON_SIZE);
    private onCenterClick: () => void = () => { };
    private clickCallback: (index: number) => void = (index: number) => { };
    private iconsScale: boolean = true;
    constructor(controller: TabsController | null) {
        super(controller);
    }
    setClickListener(clickCallback: (index: number) => void): BottomTabsModel {
        this.clickCallback = clickCallback;
        return this;
    }
    getClickListener(): (num: number) => void {
        return this.clickCallback;
    }
    setCenterImage(url: string | PixelMap | Resource, width?: Length, height?: Length, context?: common.UIAbilityContext): BottomTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.centerView = url;
        if (width) {
            this.centerViewWidth = length2Vp(context, width);
        }
        if (height) {
            this.centerViewHeight = length2Vp(context, height);
        }
        return this;
    }
    getCenterImage(): string | PixelMap | Resource | null {
        return this.centerView;
    }
    getCenterViewWidth(): number {
        return this.centerViewWidth;
    }
    getCenterViewHeight(): number {
        return this.centerViewHeight;
    }
    removeCenterImage(): BottomTabsModel {
        this.centerView = null;
        return this;
    }
    setCenterClickListener(listener: () => void): BottomTabsModel {
        this.onCenterClick = listener;
        return this;
    }
    getCenterClickListener(): () => void {
        return this.onCenterClick;
    }
    setSelectedTextColor(color: string): BottomTabsModel {
        this.textSelectColor = color;
        return this;
    }
    getSelectedTextColor(): string {
        return this.textSelectColor;
    }
    setUnselectedTextColor(color: string): BottomTabsModel {
        this.textNormalColor = color;
        return this;
    }
    getUnselectedTextColor(): string {
        return this.textNormalColor;
    }
    setSelectedTextSize(size: number): BottomTabsModel {
        this.textSelectSize = size;
        return this;
    }
    getSelectedTextSize(): number {
        return this.textSelectSize;
    }
    setUnselectedTextSize(size: number): BottomTabsModel {
        this.textNormalSize = size;
        return this;
    }
    getUnselectedTextSize(): number {
        return this.textNormalSize;
    }
    setIconsScale(scale: boolean): BottomTabsModel {
        this.iconsScale = scale;
        return this;
    }
    isIconsScale(): boolean {
        return this.iconsScale;
    }
    setSelectedIconSize(size: Length, context?: common.UIAbilityContext): BottomTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.iconSelectSize = length2Vp(context, size);
        return this;
    }
    getSelectedIconSize(): number {
        return this.iconSelectSize;
    }
    setUnselectedIconSize(size: Length, context?: common.UIAbilityContext): BottomTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.iconNormalSize = length2Vp(context, size);
        return this;
    }
    getUnselectedIconSize(): number {
        return this.iconNormalSize;
    }
}
