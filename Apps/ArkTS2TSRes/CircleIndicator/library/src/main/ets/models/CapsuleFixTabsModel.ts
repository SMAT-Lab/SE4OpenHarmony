let __generate__Id: number = 0;
function generateId(): string {
    return "CapsuleFixTabsModel_" + ++__generate__Id;
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
import common from '@ohos.app.ability.common';
import BaseModel from '../models/BaseModel';
import { length2Vp } from '../utils/UiUtil';
const DEFAULT_WIDTH: Length = '300vp';
const DEFAULT_HEIGHT: Length = '50vp';
const DEFAULT_SELECTED_TEXT_SIZE: Length = '19fp';
const DEFAULT_UNSELECTED_TEXT_SIZE: Length = '17fp';
const DEFAULT_BORDER_WIDTH: Length = '2vp';
const DEFAULT_RADIUS: Length = '25vp';
export class CapsuleFixTabsModel extends BaseModel<CapsuleFixTabsModel> {
    protected width: number = length2Vp(getContext(), DEFAULT_WIDTH); // tab的宽度
    protected height: number = length2Vp(getContext(), DEFAULT_HEIGHT); // tab的高度
    protected backgroundColor: ResourceColor = $r('app.color.capsule_default_background_color');
    private selectedTextColor: ResourceColor = $r('app.color.capsule_default_selected_text_color'); // 选中后的颜色
    private unselectedTextColor: ResourceColor = $r('app.color.capsule_default_unselected_text_color'); // 未选中后的颜色
    private selectedTextSize: number = length2Vp(getContext(), DEFAULT_SELECTED_TEXT_SIZE); // 选中后的颜色
    private unselectedTextSize: number = length2Vp(getContext(), DEFAULT_UNSELECTED_TEXT_SIZE); // 未选中后的颜色
    private fillColor: ResourceColor = $r('app.color.capsule_default_fill_color');
    private borderWidth: number = length2Vp(getContext(), DEFAULT_BORDER_WIDTH); // 边框的粗细
    private clickCallback: (index: number) => void = (index: number) => { };
    private radius: number = length2Vp(getContext(), DEFAULT_RADIUS);
    private paddingX: number = 0;
    private paddingY: number = 0;
    private animation: boolean = true;
    constructor(controller: TabsController | null) {
        super(controller);
    }
    setClickListener(clickCallback: (index: number) => void): CapsuleFixTabsModel {
        this.clickCallback = clickCallback;
        return this;
    }
    getClickListener(): (num: number) => void {
        return this.clickCallback;
    }
    setSelectedTextColor(color: ResourceColor): CapsuleFixTabsModel {
        this.selectedTextColor = color;
        return this;
    }
    getSelectedTextColor(): ResourceColor {
        return this.selectedTextColor;
    }
    setUnselectedTextColor(color: ResourceColor): CapsuleFixTabsModel {
        this.unselectedTextColor = color;
        return this;
    }
    getUnselectedTextColor(): ResourceColor {
        return this.unselectedTextColor;
    }
    setFillColor(fillColor: ResourceColor): CapsuleFixTabsModel {
        this.fillColor = fillColor;
        return this;
    }
    getFillColor(): ResourceColor {
        return this.fillColor;
    }
    setBorderWidth(borderWidth: Length, context?: common.UIAbilityContext): CapsuleFixTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.borderWidth = length2Vp(context, borderWidth);
        return this;
    }
    getBorderWidth(): number {
        return this.borderWidth;
    }
    setRadius(roundRadius: Length, context?: common.UIAbilityContext): CapsuleFixTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.radius = length2Vp(context, roundRadius);
        return this;
    }
    getRadius(): number {
        return this.radius;
    }
    setSelectedTextSize(size: Length, context?: common.UIAbilityContext): CapsuleFixTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.selectedTextSize = length2Vp(context, size);
        return this;
    }
    getSelectedTextSize(): number {
        return this.selectedTextSize;
    }
    setUnselectedTextSize(size: Length, context?: common.UIAbilityContext): CapsuleFixTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.unselectedTextSize = length2Vp(context, size);
        return this;
    }
    getUnselectedTextSize(): number {
        return this.unselectedTextSize;
    }
    setHorizontalPadding(horizontalPadding: Length, context?: common.UIAbilityContext): CapsuleFixTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.paddingX = length2Vp(context, horizontalPadding);
        return this;
    }
    getHorizontalPadding(): number {
        return this.paddingX;
    }
    setVerticalPadding(verticalPadding: Length, context?: common.UIAbilityContext): CapsuleFixTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.paddingY = length2Vp(context, verticalPadding);
        return this;
    }
    getVerticalPadding(): number {
        return this.paddingY;
    }
    setAnimation(animation: boolean): CapsuleFixTabsModel {
        this.animation = animation;
        return this;
    }
    isAnimation(): boolean {
        return this.animation;
    }
}
