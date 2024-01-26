let __generate__Id: number = 0;
function generateId(): string {
    return "LineModel_" + ++__generate__Id;
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
const DEFAULT_HEIGHT: Length = '10vp';
const DEFAULT_WIDTH: Length = '360vp';
const DEFAULT_LINE_WIDTH: Length = '40vp';
const DEFAULT_LINE_HEIGHT: Length = '3vp';
const DEFAULT_MARGIN: Length = '10vp';
export class LineModel extends BaseModel<LineModel> {
    protected height: number = length2Vp(getContext(), DEFAULT_HEIGHT);
    protected width: number = length2Vp(getContext(), DEFAULT_WIDTH);
    protected backgroundColor: ResourceColor = $r('app.color.line_default_background_color');
    private tabWidth: number = length2Vp(getContext(), DEFAULT_LINE_WIDTH);
    private tabHeight: number = length2Vp(getContext(), DEFAULT_LINE_HEIGHT);
    private color: ResourceColor = $r('app.color.line_default_selected_color');
    private bgColor: ResourceColor = $r('app.color.line_default_unselected_color');
    private margin: number = length2Vp(getContext(), DEFAULT_MARGIN);
    private centered: boolean = true;
    private animation: boolean = true;
    constructor(controller: TabsController | null) {
        super(controller);
    }
    setSelectedColor(color: ResourceColor): LineModel {
        this.color = color;
        return this;
    }
    getSelectedColor(): ResourceColor {
        return this.color;
    }
    setUnselectedColor(color: ResourceColor): LineModel {
        this.bgColor = color;
        return this;
    }
    getUnselectedColor(): ResourceColor {
        return this.bgColor;
    }
    setMargin(margin: Length, context?: common.UIAbilityContext): LineModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.margin = length2Vp(context, margin);
        return this;
    }
    getMargin(): number {
        return this.margin;
    }
    setCentered(centered: boolean): LineModel {
        this.centered = centered;
        return this;
    }
    isCentered(): boolean {
        return this.centered;
    }
    setLineWidth(lineWidth: Length, context?: common.UIAbilityContext): LineModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.tabWidth = length2Vp(context, lineWidth);
        return this;
    }
    getLineWidth(): number {
        return this.tabWidth;
    }
    setStrokeWidth(lineHeight: Length, context?: common.UIAbilityContext): LineModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.tabHeight = length2Vp(context, lineHeight);
        return this;
    }
    getStrokeWidth(): number {
        return this.tabHeight;
    }
    setAnimation(animation: boolean): LineModel {
        this.animation = animation;
        return this;
    }
    isAnimation(): boolean {
        return this.animation;
    }
}
