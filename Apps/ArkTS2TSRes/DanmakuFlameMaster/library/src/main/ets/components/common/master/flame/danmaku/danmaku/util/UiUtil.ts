let __generate__Id: number = 0;
function generateId(): string {
    return "UiUtil_" + ++__generate__Id;
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
import { Paint } from '../../../../../compat/Paint';
/**
 * fontSize: in vp
 * return: px
 */
export function measureTextHeight(paint: Paint | any): number {
    if (paint) {
        applyPaintToCanvas(paint, paint.getContext());
        return paint.getContext().measureText("M").width * 1.2;
    }
    return paint.getTextSize();
}
export function measureTextWidth(text: string, paint: Paint): number {
    applyPaintToCanvas(paint, paint.getContext());
    return paint.getContext().measureText(text).width;
}
export function applyPaintToCanvas(paint: Paint, context: CanvasRenderingContext2D) {
    context.font = paint.getTextSize() + "px " + paint.getTypeface();
    context.lineWidth = px2vp(paint.getStrokeWidth());
    context.shadowBlur = px2vp(paint.getRadius());
    context.shadowOffsetX = px2vp(paint.getDx());
    context.shadowOffsetY = px2vp(paint.getDy());
    context.shadowColor = colorNumber2String(paint.getShadowColor());
    context.shadowBlur = paint.getRadius();
    context.fillStyle = colorNumber2String(paint.getColor(), paint.getAlpha());
    context.strokeStyle = colorNumber2String(paint.getColor(), paint.getAlpha());
}
export function colorNumber2String(color: number, alpha: number = 255) {
    let colorStr = ("00000" + (color & 0xffffff).toString(16)).substr(-6);
    let alphaStr = ("0" + (alpha & 0xff).toString(16)).substr(-2);
    return "#" + alphaStr + colorStr;
}
