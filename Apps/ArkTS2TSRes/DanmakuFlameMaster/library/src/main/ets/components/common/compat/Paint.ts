let __generate__Id: number = 0;
function generateId(): string {
    return "Paint_" + ++__generate__Id;
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
export class Paint {
    private mContext: CanvasRenderingContext2D | null = null;
    private mColor: number = 0;
    private mTextSize: number = 15;
    private mAlpha: number = 255;
    private mLineWidth: number = 1;
    private mTypeface: string = 'sans-serif';
    private mShadowBlur: number = 0;
    private mShadowOffsetX: number = 0;
    private mShadowOffsetY: number = 0;
    private mShadowColor: number = 0x00FFFFFF;
    private mBold: boolean = false;
    constructor(context: CanvasRenderingContext2D | null, paint?: Paint) {
        this.mContext = context;
        if (paint !== undefined) {
            this.set(paint);
        }
    }
    public set(paint: Paint) {
        if (paint.mContext != null) {
            this.mContext = paint.getContext();
        }
        this.mColor = paint.getColor();
        this.mTextSize = paint.getTextSize();
        this.mAlpha = paint.getAlpha();
        this.mLineWidth = paint.getStrokeWidth();
        this.mTypeface = paint.getTypeface();
        this.mShadowBlur = paint.getRadius();
        this.mShadowOffsetX = paint.getDx();
        this.mShadowOffsetY = paint.getDy();
        this.mShadowColor = paint.getShadowColor();
        this.mBold = paint.getFakeBoldText();
    }
    public setContext(context: CanvasRenderingContext2D) {
        this.mContext = context;
    }
    public getContext(): CanvasRenderingContext2D | any {
        return this.mContext;
    }
    public setStrokeWidth(lineWidth: number) {
        this.mLineWidth = lineWidth;
    }
    public getStrokeWidth(): number {
        return this.mLineWidth;
    }
    public setTypeface(typeface: string) {
        this.mTypeface = typeface;
    }
    public getTypeface(): string {
        return this.mTypeface;
    }
    public setFakeBoldText(bold: boolean) {
        this.mBold = bold;
    }
    public getFakeBoldText(): boolean {
        return this.mBold;
    }
    public setTextSize(textSize: number) {
        this.mTextSize = textSize;
    }
    public getTextSize(): number {
        return this.mTextSize;
    }
    public setStyle(style: Style) {
    }
    public setColor(color: number) {
        this.mColor = color;
    }
    public getColor(): number {
        return this.mColor;
    }
    public setAlpha(a: number) {
        this.mAlpha = a;
    }
    public getAlpha(): number {
        return this.mAlpha;
    }
    public clearShadowLayer(): number {
        return this.mShadowBlur = 0;
    }
    public setShadowLayer(radius: number, dx: number, dy: number, shadowColor: number) {
        this.mShadowBlur = radius;
        this.mShadowOffsetX = dx;
        this.mShadowOffsetY = dy;
        this.mShadowColor = shadowColor;
    }
    public getRadius(): number {
        return this.mShadowBlur;
    }
    public getDx(): number {
        return this.mShadowOffsetX;
    }
    public getDy(): number {
        return this.mShadowOffsetY;
    }
    public getShadowColor(): number {
        return this.mShadowColor;
    }
}
export enum Style {
    FILL,
    STROKE,
    FILL_AND_STROKE
}
