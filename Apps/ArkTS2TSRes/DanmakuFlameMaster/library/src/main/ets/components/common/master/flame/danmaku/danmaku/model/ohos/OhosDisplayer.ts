let __generate__Id: number = 0;
function generateId(): string {
    return "OhosDisplayer_" + ++__generate__Id;
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
import { IDisplayer, DANMAKU_STYLE_DEFAULT, DANMAKU_STYLE_NONE, DANMAKU_STYLE_SHADOW, DANMAKU_STYLE_STROKEN, DANMAKU_STYLE_PROJECTION } from '../IDisplayer';
import { AbsDisplayer } from '../AbsDisplayer';
import { AlphaValue } from '../AlphaValue';
import { BaseDanmaku } from '../BaseDanmaku';
import { IRenderer, NOTHING_RENDERING, TEXT_RENDERING } from '../../renderer/IRenderer';
import DanmakuView from '../../../ui/widget/DanmakuView';
import { DanmakuFactory } from './DanmakuFactory';
import { BaseCacheStuffer } from './BaseCacheStuffer';
import { SimpleTextCacheStuffer } from './SimpleTextCacheStuffer';
import { Paint, Style } from '../../../../../../compat/Paint';
export class DisplayerConfig {
    private sLastScaleTextSize: number = 0;
    private sCachedScaleSize: Map<number, number> = new Map();
    public PAINT: Paint | any = null;
    public PAINT_DUPLICATE: Paint | any = null;
    public ALPHA_PAINT: Paint | any = null;
    public UNDERLINE_PAINT: Paint | any = null;
    public BORDER_PAINT: Paint | any = null;
    /**
           * 下划线高度
           */
    public UNDERLINE_HEIGHT: number = 4;
    /**
           * 边框厚度
           */
    public BORDER_WIDTH: number = 4;
    /**
           * 阴影半径
           */
    private SHADOW_RADIUS: number = 4.0;
    /**
           * 描边宽度
           */
    private STROKE_WIDTH: number = 3.5;
    /**
           * 投影参数
           */
    public sProjectionOffsetX: number = 1.0;
    public sProjectionOffsetY: number = 1.0;
    private sProjectionAlpha: number = 0xCC;
    /**
           * 开启阴影，可动态改变
           */
    public CONFIG_HAS_SHADOW: boolean = false;
    private HAS_SHADOW: boolean = this.CONFIG_HAS_SHADOW;
    /**
           * 开启描边，可动态改变
           */
    public CONFIG_HAS_STROKE: boolean = true;
    public HAS_STROKE: boolean = this.CONFIG_HAS_STROKE;
    /**
           * 开启投影，可动态改变
           */
    public CONFIG_HAS_PROJECTION: boolean = false;
    public HAS_PROJECTION: boolean = this.CONFIG_HAS_PROJECTION;
    /**
           * 开启抗锯齿，可动态改变
           */
    public CONFIG_ANTI_ALIAS: boolean = true;
    private ANTI_ALIAS: boolean = this.CONFIG_ANTI_ALIAS;
    private isTranslucent: boolean = false;
    private transparency: number = AlphaValue.MAX;
    private scaleTextSize: number = 1.0;
    private isTextScaled: boolean = false;
    public margin: number = 0;
    public allMarginTop: number = 0;
    public constructor() {
        this.PAINT = new Paint(null);
        this.PAINT.setStrokeWidth(this.STROKE_WIDTH);
        this.PAINT_DUPLICATE = new Paint(null, this.PAINT);
        this.ALPHA_PAINT = new Paint(null);
        this.UNDERLINE_PAINT = new Paint(null);
        this.UNDERLINE_PAINT.setStrokeWidth(this.UNDERLINE_HEIGHT);
        this.UNDERLINE_PAINT.setStyle(Style.STROKE);
        this.BORDER_PAINT = new Paint(null);
        this.BORDER_PAINT.setStyle(Style.STROKE);
        this.BORDER_PAINT.setStrokeWidth(this.BORDER_WIDTH);
    }
    public setTypeface(typeface: string): void {
        this.PAINT.setTypeface(typeface);
    }
    public setShadowRadius(shadowRadius: number): void {
        this.SHADOW_RADIUS = shadowRadius;
    }
    public setStrokeWidth(s: number): void {
        this.PAINT.setStrokeWidth(s);
        this.STROKE_WIDTH = s;
    }
    public setProjectionConfig(offsetX: number, offsetY: number, alpha: number): void {
        if (this.sProjectionOffsetX != offsetX || this.sProjectionOffsetY != offsetY || this.sProjectionAlpha != alpha) {
            this.sProjectionOffsetX = (offsetX > 1.0) ? offsetX : 1.0;
            this.sProjectionOffsetY = (offsetY > 1.0) ? offsetY : 1.0;
            this.sProjectionAlpha = (alpha < 0) ? 0 : ((alpha > 255) ? 255 : alpha);
        }
    }
    public setFakeBoldText(fakeBoldText: boolean): void {
        this.PAINT.setFakeBoldText(fakeBoldText);
    }
    public setTransparency(newTransparency: number): void {
        this.isTranslucent = (newTransparency != AlphaValue.MAX);
        this.transparency = newTransparency;
    }
    public setScaleTextSizeFactor(factor: number): void {
        this.isTextScaled = (factor != 1);
        this.scaleTextSize = factor;
    }
    private applyTextScaleConfig(danmaku: BaseDanmaku, paint: Paint): void {
        if (!this.isTextScaled) {
            return;
        }
        let size: number | undefined = this.sCachedScaleSize.get(danmaku.textSize);
        if (size == null || this.sLastScaleTextSize != this.scaleTextSize) {
            this.sLastScaleTextSize = this.scaleTextSize;
            size = danmaku.textSize * this.scaleTextSize;
            this.sCachedScaleSize.set(danmaku.textSize, size);
        }
        paint.setTextSize(size);
    }
    public hasStroke(danmaku: BaseDanmaku): boolean {
        return (this.HAS_STROKE || this.HAS_PROJECTION) && this.STROKE_WIDTH > 0 && danmaku.textShadowColor != 0;
    }
    public getBorderPaint(danmaku: BaseDanmaku): Paint {
        this.BORDER_PAINT.setColor(danmaku.borderColor);
        return this.BORDER_PAINT;
    }
    public getUnderlinePaint(danmaku: BaseDanmaku): Paint {
        this.UNDERLINE_PAINT.setColor(danmaku.underlineColor);
        return this.UNDERLINE_PAINT;
    }
    public getPaint(danmaku: BaseDanmaku, fromWorkerThread: boolean): Paint {
        let paint: Paint;
        if (fromWorkerThread) {
            paint = this.PAINT;
        }
        else {
            paint = this.PAINT_DUPLICATE;
            paint.set(this.PAINT);
        }
        paint.setTextSize(danmaku.textSize);
        this.applyTextScaleConfig(danmaku, paint);
        //ignore the transparent textShadowColor
        if (!this.HAS_SHADOW || this.SHADOW_RADIUS <= 0 || danmaku.textShadowColor == 0) {
            paint.clearShadowLayer();
        }
        else {
            paint.setShadowLayer(this.SHADOW_RADIUS, 0, 0, danmaku.textShadowColor);
        }
        //    paint.setAntiAlias(this.ANTI_ALIAS);
        return paint;
    }
    public applyPaintConfig(danmaku: BaseDanmaku, paint: Paint, stroke: boolean): void {
        if (this.isTranslucent) {
            if (stroke) {
                paint.setStyle(this.HAS_PROJECTION ? Style.FILL : Style.FILL_AND_STROKE);
                paint.setColor(danmaku.textShadowColor & 0x00FFFFFF);
                let alpha: number = this.HAS_PROJECTION ? this.sProjectionAlpha * (this.transparency / AlphaValue.MAX)
                    : this.transparency;
                paint.setAlpha(alpha);
            }
            else {
                paint.setStyle(Style.FILL);
                paint.setColor(danmaku.textColor & 0x00FFFFFF);
                paint.setAlpha(this.transparency);
            }
        }
        else {
            if (stroke) {
                paint.setStyle(this.HAS_PROJECTION ? Style.FILL : Style.FILL_AND_STROKE);
                paint.setColor(danmaku.textShadowColor & 0x00FFFFFF);
                let alpha: number = this.HAS_PROJECTION ? this.sProjectionAlpha : AlphaValue.MAX;
                paint.setAlpha(alpha);
            }
            else {
                paint.setStyle(Style.FILL);
                paint.setColor(danmaku.textColor & 0x00FFFFFF);
                paint.setAlpha(AlphaValue.MAX);
            }
        }
        if (danmaku.getType() == BaseDanmaku.TYPE_SPECIAL) {
            paint.setAlpha(danmaku.getAlpha());
        }
    }
    public clearTextHeightCache(): void {
        this.sCachedScaleSize.clear();
    }
    public getStrokeWidth(): number {
        if (this.HAS_SHADOW && this.HAS_STROKE) {
            return Math.max(this.SHADOW_RADIUS, this.STROKE_WIDTH);
        }
        if (this.HAS_SHADOW) {
            return this.SHADOW_RADIUS;
        }
        if (this.HAS_STROKE) {
            return this.STROKE_WIDTH;
        }
        return 0;
    }
    public definePaintParams(fromWorkerThread: boolean): void {
        this.HAS_STROKE = this.CONFIG_HAS_STROKE;
        this.HAS_SHADOW = this.CONFIG_HAS_SHADOW;
        this.HAS_PROJECTION = this.CONFIG_HAS_PROJECTION;
        this.ANTI_ALIAS = this.CONFIG_ANTI_ALIAS;
    }
}
export class OhosDisplayer extends AbsDisplayer<CanvasRenderingContext2D, string> {
    //    private Camera camera = new Camera();
    //
    //    private Matrix matrix = new Matrix();
    //
    private mDisplayConfig: DisplayerConfig = new DisplayerConfig();
    private sStuffer: BaseCacheStuffer = new SimpleTextCacheStuffer();
    public constructor() {
        super();
    }
    public setTypeFace(font: string): void {
        this.mDisplayConfig.setTypeface(font);
    }
    public setShadowRadius(s: number): void {
        this.mDisplayConfig.setShadowRadius(s);
    }
    public setPaintStorkeWidth(s: number): void {
        this.mDisplayConfig.setStrokeWidth(s);
    }
    public setProjectionConfig(offsetX: number, offsetY: number, alpha: number): void {
        this.mDisplayConfig.setProjectionConfig(offsetX, offsetY, alpha);
    }
    public setFakeBoldText(fakeBoldText: boolean): void {
        this.mDisplayConfig.setFakeBoldText(fakeBoldText);
    }
    public setTransparency(newTransparency: number): void {
        this.mDisplayConfig.setTransparency(newTransparency);
    }
    public setScaleTextSizeFactor(factor: number): void {
        this.mDisplayConfig.setScaleTextSizeFactor(factor);
    }
    public setCacheStuffer(cacheStuffer: BaseCacheStuffer): void {
        if (cacheStuffer != this.sStuffer) {
            this.sStuffer = cacheStuffer;
        }
    }
    public getCacheStuffer(): BaseCacheStuffer {
        return this.sStuffer;
    }
    public setMargin(m: number): void {
        this.mDisplayConfig.margin = m;
    }
    public getMargin(): number {
        return this.mDisplayConfig.margin;
    }
    public setAllMarginTop(m: number): void {
        this.mDisplayConfig.allMarginTop = m;
    }
    public getAllMarginTop(): number {
        return this.mDisplayConfig.allMarginTop;
    }
    public canvas: CanvasRenderingContext2D | any;
    private width: number = 0;
    private height: number = 0;
    private locationZ: number = 0;
    private density: number = vp2px(1);
    private densityDpi: number = vp2px(1) * 160;
    private scaledDensity: number = vp2px(1);
    private mSlopPixel: number = 0;
    private update(c: CanvasRenderingContext2D): void {
        this.canvas = c;
        if (c != null) {
            this.width = c.width;
            this.height = c.height;
            if (this.mDisplayConfig != null) {
                this.mDisplayConfig.PAINT.setContext(c);
                this.mDisplayConfig.PAINT_DUPLICATE.setContext(c);
                this.mDisplayConfig.BORDER_PAINT.setContext(c);
                this.mDisplayConfig.ALPHA_PAINT.setContext(c);
                this.mDisplayConfig.UNDERLINE_PAINT.setContext(c);
            }
        }
    }
    public getWidth(): number {
        return this.width;
    }
    public getHeight(): number {
        return this.height;
    }
    public getDensity(): number {
        return this.density;
    }
    public getDensityDpi(): number {
        return this.densityDpi;
    }
    public draw(danmaku: BaseDanmaku): number {
        let top: number = danmaku.getTop();
        let left: number = danmaku.getLeft();
        if (this.canvas != null) {
            let alphaPaint: Paint | any = null;
            let needRestore: boolean = false;
            if (danmaku.getType() == BaseDanmaku.TYPE_SPECIAL) {
                if (danmaku.getAlpha() == AlphaValue.TRANSPARENT) {
                    return NOTHING_RENDERING;
                }
                if (danmaku.rotationZ != 0 || danmaku.rotationY != 0) {
                    this.saveCanvas(danmaku, this.canvas, left, top);
                    needRestore = true;
                }
                let alpha: number = danmaku.getAlpha();
                if (alpha != AlphaValue.MAX) {
                    alphaPaint = this.mDisplayConfig.ALPHA_PAINT;
                    alphaPaint.setAlpha(danmaku.getAlpha());
                }
            }
            // skip drawing when danmaku is transparent
            if (alphaPaint != null && alphaPaint.getAlpha() == AlphaValue.TRANSPARENT) {
                return NOTHING_RENDERING;
            }
            // drawing cache
            let result: number = NOTHING_RENDERING;
            if (alphaPaint != null) {
                this.mDisplayConfig.PAINT.setAlpha(alphaPaint.getAlpha());
                this.mDisplayConfig.PAINT_DUPLICATE.setAlpha(alphaPaint.getAlpha());
            }
            else {
                this.resetPaintAlpha(this.mDisplayConfig.PAINT);
            }
            this.drawDanmaku(danmaku, this.canvas, left, top, false);
            result = TEXT_RENDERING;
            if (needRestore) {
                this.restoreCanvas(this.canvas);
            }
            return result;
        }
        return NOTHING_RENDERING;
    }
    public recycle(danmaku: BaseDanmaku): void {
        if (this.sStuffer != null) {
            this.sStuffer.releaseResource(danmaku);
        }
    }
    private resetPaintAlpha(paint: Paint): void {
        if (paint.getAlpha() != AlphaValue.MAX) {
            paint.setAlpha(AlphaValue.MAX);
        }
    }
    private restoreCanvas(canvas: CanvasRenderingContext2D): void {
        this.canvas.restore(); //useless
    }
    private saveCanvas(danmaku: BaseDanmaku, canvas: CanvasRenderingContext2D, left: number, top: number): number {
        //          camera.save();
        //          if (locationZ !=0 && Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB_MR1) {
        //              camera.setLocation(0, 0, locationZ);
        //          }
        //          camera.rotateY(-danmaku.rotationY);
        //          camera.rotateZ(-danmaku.rotationZ);
        //          camera.getMatrix(matrix);
        //          matrix.preTranslate(-left, -top);
        //          matrix.postTranslate(left , top);
        //          camera.restore();
        //          let count:number = canvas.save();
        //          canvas.concat(matrix);
        //          return count;
        return 0;
    }
    public drawDanmaku(danmaku: BaseDanmaku, canvas: CanvasRenderingContext2D, left: number, top: number, fromWorkerThread: boolean): void {
        if (this.sStuffer != null) {
            this.sStuffer.drawDanmaku(danmaku, canvas, left, top, fromWorkerThread, this.mDisplayConfig);
        }
    }
    private getPaint(danmaku: BaseDanmaku, fromWorkerThread: boolean): Paint {
        return this.mDisplayConfig.getPaint(danmaku, fromWorkerThread);
    }
    public prepare(danmaku: BaseDanmaku, fromWorkerThread: boolean): void {
        if (this.sStuffer != null) {
            this.sStuffer.prepare(danmaku, fromWorkerThread);
        }
    }
    public measure(danmaku: BaseDanmaku, fromWorkerThread: boolean): void {
        let paint: Paint = this.getPaint(danmaku, fromWorkerThread);
        if (this.mDisplayConfig.HAS_STROKE) {
            this.mDisplayConfig.applyPaintConfig(danmaku, paint, true);
        }
        this.calcPaintWH(danmaku, paint, fromWorkerThread);
        if (this.mDisplayConfig.HAS_STROKE) {
            this.mDisplayConfig.applyPaintConfig(danmaku, paint, false);
        }
    }
    private calcPaintWH(danmaku: BaseDanmaku, paint: Paint, fromWorkerThread: boolean): void {
        this.sStuffer.measure(danmaku, paint, fromWorkerThread);
        this.setDanmakuPaintWidthAndHeight(danmaku, danmaku.paintWidth, danmaku.paintHeight);
    }
    private setDanmakuPaintWidthAndHeight(danmaku: BaseDanmaku, w: number, h: number): void {
        let pw: number = w + 2 * danmaku.padding;
        let ph: number = h + 2 * danmaku.padding;
        if (danmaku.borderColor != 0) {
            pw += 2 * this.mDisplayConfig.BORDER_WIDTH;
            ph += 2 * this.mDisplayConfig.BORDER_WIDTH;
        }
        danmaku.paintWidth = pw + this.getStrokeWidth();
        danmaku.paintHeight = ph;
    }
    public clearTextHeightCache(): void {
        this.sStuffer.clearCaches();
        this.mDisplayConfig.clearTextHeightCache();
    }
    public getScaledDensity(): number {
        return this.scaledDensity;
    }
    public resetSlopPixel(factor: number): void {
        let d: number = Math.max(factor, this.getWidth() / DanmakuFactory.BILI_PLAYER_WIDTH); //correct for low density and high resolution
        let slop: number = d * DanmakuFactory.DANMAKU_MEDIUM_TEXTSIZE;
        this.mSlopPixel = slop;
        if (factor > 1)
            this.mSlopPixel = (slop * factor);
    }
    public getSlopPixel(): number {
        return this.mSlopPixel;
    }
    public setDensities(density: number, densityDpi: number, scaledDensity: number): void {
        this.density = density;
        this.densityDpi = densityDpi;
        this.scaledDensity = scaledDensity;
    }
    public setSize(width: number, height: number): void {
        this.width = width;
        this.height = height;
        this.locationZ = width / 2 / Math.tan((Math.PI / 180) * (55 / 2));
    }
    public setDanmakuStyle(style: number, values: number[]): void {
        switch (style) {
            case DANMAKU_STYLE_NONE:
                this.mDisplayConfig.CONFIG_HAS_SHADOW = false;
                this.mDisplayConfig.CONFIG_HAS_STROKE = false;
                this.mDisplayConfig.CONFIG_HAS_PROJECTION = false;
                break;
            case DANMAKU_STYLE_SHADOW:
                this.mDisplayConfig.CONFIG_HAS_SHADOW = true;
                this.mDisplayConfig.CONFIG_HAS_STROKE = false;
                this.mDisplayConfig.CONFIG_HAS_PROJECTION = false;
                this.setShadowRadius(values[0]);
                break;
            case DANMAKU_STYLE_DEFAULT:
            case DANMAKU_STYLE_STROKEN:
                this.mDisplayConfig.CONFIG_HAS_SHADOW = false;
                this.mDisplayConfig.CONFIG_HAS_STROKE = true;
                this.mDisplayConfig.CONFIG_HAS_PROJECTION = false;
                this.setPaintStorkeWidth(values[0]);
                break;
            case DANMAKU_STYLE_PROJECTION:
                this.mDisplayConfig.CONFIG_HAS_SHADOW = false;
                this.mDisplayConfig.CONFIG_HAS_STROKE = false;
                this.mDisplayConfig.CONFIG_HAS_PROJECTION = true;
                this.setProjectionConfig(values[0], values[1], values[2]);
                break;
        }
    }
    public setExtraData(data: CanvasRenderingContext2D): void {
        this.update(data);
    }
    public getExtraData(): CanvasRenderingContext2D {
        return this.canvas;
    }
    public getStrokeWidth(): number {
        return this.mDisplayConfig.getStrokeWidth();
    }
}
