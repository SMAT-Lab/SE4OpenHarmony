let __generate__Id: number = 0;
function generateId(): string {
    return "TriangularModel_" + ++__generate__Id;
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
import Curves from '@ohos.curves';
import common from '@ohos.app.ability.common';
const DEFAULT_HEIGHT: Length = '18vp';
const DEFAULT_LINE_HEIGHT: Length = '10vp';
const DEFAULT_TRIANGLE_WIDTH: Length = '12vp';
const DEFAULT_TRIANGLE_HEIGHT: Length = '27vp';
export class TriangularModel extends BaseModel<TriangularModel> {
    protected height: number = length2Vp(getContext(), DEFAULT_HEIGHT);
    protected backgroundColor: ResourceColor = $r('app.color.default_transparent_color');
    private mLineHeight: number = length2Vp(getContext(), DEFAULT_LINE_HEIGHT);
    private mTriangleWidth: number = length2Vp(getContext(), DEFAULT_TRIANGLE_WIDTH);
    private mTriangleHeight: number = length2Vp(getContext(), DEFAULT_TRIANGLE_HEIGHT);
    private mLineColor: ResourceColor = $r('app.color.default_triangular_line_color');
    private mReverse: boolean = false;
    mStartInterpolator: any;
    constructor(tabsController: TabsController | null) {
        super(tabsController);
    }
    public getLineHeight(): number {
        return this.mLineHeight;
    }
    public setLineHeight(lineHeight: Length, context?: common.UIAbilityContext): TriangularModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.mLineHeight = length2Vp(context, lineHeight);
        return this;
    }
    public getLineColor(): ResourceColor {
        return this.mLineColor;
    }
    public setLineColor(lineColor: ResourceColor): TriangularModel {
        this.mLineColor = lineColor;
        return this;
    }
    public getTriangleHeight(): number {
        return this.mTriangleHeight;
    }
    public setTriangleHeight(triangleHeight: Length, context?: common.UIAbilityContext): TriangularModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.mTriangleHeight = length2Vp(context, triangleHeight);
        return this;
    }
    public getTriangleWidth(): number {
        return this.mTriangleWidth;
    }
    public setTriangleWidth(triangleWidth: Length, context?: common.UIAbilityContext): TriangularModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.mTriangleWidth = length2Vp(context, triangleWidth);
        return this;
    }
    public getReverse(): boolean {
        return this.mReverse;
    }
    public setReverse(reverse: boolean): TriangularModel {
        this.mReverse = reverse;
        return this;
    }
    public getInterpolator(): any {
        return this.mStartInterpolator;
    }
    public setInterpolator(startInterpolator: any): TriangularModel {
        this.mStartInterpolator = startInterpolator;
        return this;
    }
}
