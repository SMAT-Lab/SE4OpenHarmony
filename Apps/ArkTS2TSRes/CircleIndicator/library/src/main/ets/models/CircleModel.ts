let __generate__Id: number = 0;
function generateId(): string {
    return "CircleModel_" + ++__generate__Id;
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
const DEFAULT_WIDTH: Length = '230vp';
const DEFAULT_HEIGHT: Length = '50vp';
const DEFAULT_STROKE_WIDTH: Length = '9vp';
const DEFAULT_RADIUS: Length = '10vp';
const DEFAULT_ITEM_WIDTH: Length = '15vp';
const DEFAULT_ITEM_HEIGHT: Length = '10vp';
const DEFAULT_MARGIN: Length = '5vp';
const DEFAULT_RECTANGLE_RADIUS: Length = '20vp';
export class CircleModel extends BaseModel<CircleModel> {
    protected width: number = length2Vp(getContext(), DEFAULT_WIDTH);
    protected height: number = length2Vp(getContext(), DEFAULT_HEIGHT);
    protected backgroundColor: ResourceColor = $r('app.color.circle_default_background_color');
    private snap: boolean = false;
    private fillColor: ResourceColor = $r('app.color.circle_default_fill_color');
    private rectangle: boolean = false;
    private strokeWidth: number = length2Vp(getContext(), DEFAULT_STROKE_WIDTH);
    private radius: number = length2Vp(getContext(), DEFAULT_RADIUS);
    private itemWidth: number = length2Vp(getContext(), DEFAULT_ITEM_WIDTH);
    private itemHeight: number = length2Vp(getContext(), DEFAULT_ITEM_HEIGHT);
    private borderlines: boolean = false;
    private backgroundGradient: boolean = false;
    private scale: boolean = false;
    private rotate: boolean = false;
    private unselectedColor: ResourceColor = $r('app.color.circle_default_unselected_color');
    private strokeColor: ResourceColor = $r('app.color.circle_default_stroke_color');
    private margin: number = length2Vp(getContext(), DEFAULT_MARGIN);
    private orientation: Orientation = Orientation.HORIZONTAL;
    private centered: boolean = true;
    private rectangleRadius: number = length2Vp(getContext(), DEFAULT_RECTANGLE_RADIUS);
    constructor(controller: TabsController | null) {
        super(controller);
    }
    public setRectangleRadius(rectangleRadius: Length, context?: common.UIAbilityContext): CircleModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.rectangleRadius = length2Vp(context, rectangleRadius);
        return this;
    }
    public getRectangleRadius(): number {
        return this.rectangleRadius;
    }
    public setFillColor(fillColor: ResourceColor): CircleModel {
        this.fillColor = fillColor;
        return this;
    }
    public getFillColor(): ResourceColor {
        return this.fillColor;
    }
    public setCentered(centered: boolean): CircleModel {
        this.centered = centered;
        return this;
    }
    public isCentered(): boolean {
        return this.centered;
    }
    public setOrientation(orientation: Orientation): CircleModel {
        this.orientation = orientation;
        console.log("orientation" + orientation);
        return this;
    }
    public getOrientation(): Orientation {
        return this.orientation;
    }
    public setUnselectedColor(unselectedColor: ResourceColor): CircleModel {
        this.unselectedColor = unselectedColor;
        return this;
    }
    public getUnselectedColor(): ResourceColor {
        return this.unselectedColor;
    }
    public setSnap(snap: boolean): CircleModel {
        this.snap = snap;
        return this;
    }
    public isSnap(): boolean {
        return this.snap;
    }
    public setRadius(radius: Length, context?: common.UIAbilityContext): CircleModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.radius = length2Vp(context, radius);
        return this;
    }
    public getRadius(): number {
        return this.radius;
    }
    public setStrokeWidth(strokeWidth: Length, context?: common.UIAbilityContext): CircleModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.strokeWidth = length2Vp(context, strokeWidth);
        return this;
    }
    public getStrokeWidth(): number {
        return this.strokeWidth;
    }
    public setStrokeColor(strokeColor: ResourceColor): CircleModel {
        this.strokeColor = strokeColor;
        return this;
    }
    public getStrokeColor(): ResourceColor {
        return this.strokeColor;
    }
    public setRotate(rotate: boolean): CircleModel {
        this.rotate = rotate;
        return this;
    }
    public isRotate(): boolean {
        return this.rotate;
    }
    public setScale(scale: boolean): CircleModel {
        this.scale = scale;
        return this;
    }
    public isScale(): boolean {
        return this.scale;
    }
    public setBackgroundGradient(backgroundGradient: boolean): CircleModel {
        this.backgroundGradient = backgroundGradient;
        return this;
    }
    public isBackgroundGradient(): boolean {
        return this.backgroundGradient;
    }
    public setBorderLines(borderlines: boolean): CircleModel {
        this.borderlines = borderlines;
        return this;
    }
    public isBorderLines(): boolean {
        return this.borderlines;
    }
    public setMargin(margin: Length, context?: common.UIAbilityContext): CircleModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.margin = length2Vp(context, margin);
        return this;
    }
    public getMargin(): number {
        return this.margin;
    }
    public setItemWidth(itemWidth: Length, context?: common.UIAbilityContext): CircleModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.itemWidth = length2Vp(context, itemWidth);
        return this;
    }
    public getItemWidth(): number {
        return this.itemWidth;
    }
    public setItemHeight(itemHeight: Length, context?: common.UIAbilityContext): CircleModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.itemHeight = length2Vp(context, itemHeight);
        return this;
    }
    public getItemHeight(): number {
        return this.itemHeight;
    }
    public setRectangle(rectangle: boolean): CircleModel {
        this.rectangle = rectangle;
        return this;
    }
    public isRectangle(): boolean {
        return this.rectangle;
    }
}
export enum Orientation {
    HORIZONTAL,
    VERTICAL
}
