let __generate__Id: number = 0;
function generateId(): string {
    return "SpringScrollTabsModel_" + ++__generate__Id;
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
const DEFAULT_MAX_RADIUS_PERCENT: number = 0.7;
const DEFAULT_MIN_RADIUS_PERCENT: number = 0.2;
const DEFAULT_VIEW_WIDTH: number = lpx2px(720);
const DEFAULT_TEXT_SIZE: number = 12;
const DEFAULT_TEXT_COLOR: string = "#000000";
const DEFAULT_SELECTED_TEXT_COLOR: string = "#ff0000";
export class SpringScrollTabsModel extends BaseModel<SpringScrollTabsModel> {
    private maxRadiusPercent: number = DEFAULT_MAX_RADIUS_PERCENT;
    private minRadiusPercent: number = DEFAULT_MIN_RADIUS_PERCENT;
    private mSpringColor: ResourceColor = $r('app.color.spring_color');
    private viewWidth: number = DEFAULT_VIEW_WIDTH;
    private textSize: number = DEFAULT_TEXT_SIZE;
    private textColor: string = DEFAULT_TEXT_COLOR;
    private selectedTextColor: string = DEFAULT_SELECTED_TEXT_COLOR;
    private isClickChange: boolean = false;
    private selectedTextSize: number = DEFAULT_TEXT_SIZE;
    constructor(controller: TabsController | null) {
        super(controller);
        if (!!!this.viewWidth) {
            this.viewWidth = lpx2px(720);
        }
    }
    public setClickChange(isClickChange: boolean): SpringScrollTabsModel {
        this.isClickChange = isClickChange;
        return this;
    }
    public setViewWidth(viewWidth: Length, context?: common.UIAbilityContext): SpringScrollTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.viewWidth = length2Vp(context, viewWidth);
        return this;
    }
    public getViewWidth(): number {
        return this.viewWidth;
    }
    public setMaxRadiusPercent(maxRadiusPercent: number): SpringScrollTabsModel {
        if (maxRadiusPercent > 1) {
            this.maxRadiusPercent = 1;
        }
        else if (maxRadiusPercent <= 0) {
            throw new Error("You can not set maxRadiusPercent less than 0");
        }
        this.maxRadiusPercent = maxRadiusPercent;
        return this;
    }
    public getMaxRadiusPercent(): number {
        return this.maxRadiusPercent;
    }
    public setMinRadiusPercent(minRadiusPercent: number): SpringScrollTabsModel {
        if (minRadiusPercent > 1) {
            throw new Error("You can not set maxRadiusPercent more than 1");
        }
        else if (minRadiusPercent <= 0) {
            this.maxRadiusPercent = 0;
        }
        this.minRadiusPercent = minRadiusPercent;
        return this;
    }
    public getMinRadiusPercent(): number {
        return this.minRadiusPercent;
    }
    public setUnselectTextSize(textSize: Length, context?: common.UIAbilityContext): SpringScrollTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.textSize = length2Vp(context, textSize);
        return this;
    }
    public getUnselectTextSize(): number {
        return this.textSize;
    }
    public setSelectedTextSize(selectedTextSize: number): SpringScrollTabsModel {
        this.selectedTextSize = selectedTextSize;
        return this;
    }
    public getSelectedTextSize(): number {
        return this.selectedTextSize;
    }
    public setUnselectTextColor(textColor: string): SpringScrollTabsModel {
        this.textColor = textColor;
        return this;
    }
    public getUnselectTextColor(): string {
        return this.textColor;
    }
    public setSelectedTextColor(selectedTextColor: string): SpringScrollTabsModel {
        this.selectedTextColor = selectedTextColor;
        return this;
    }
    public getSelectedTextColor(): string {
        return this.selectedTextColor;
    }
    public setSpringColor(mSpringColor: ResourceColor): SpringScrollTabsModel {
        this.mSpringColor = mSpringColor;
        return this;
    }
    public getSpringColor(): ResourceColor {
        return this.mSpringColor;
    }
}
