let __generate__Id: number = 0;
function generateId(): string {
    return "SimpleTextCacheStuffer_" + ++__generate__Id;
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
import { BaseCacheStuffer } from '../ohos/BaseCacheStuffer';
import { BaseDanmaku } from '../BaseDanmaku';
import { SpecialDanmaku } from '../SpecialDanmaku';
import { DisplayerConfig } from './OhosDisplayer';
import { Paint } from '../../../../../../compat/Paint';
import { measureTextHeight, measureTextWidth, applyPaintToCanvas } from '../../util/UiUtil';
export class SimpleTextCacheStuffer extends BaseCacheStuffer {
    private static sTextHeightCache: Map<number, number> = new Map();
    protected getCacheHeight(danmaku: BaseDanmaku, paint: Paint): number {
        let textSize: number = paint.getTextSize();
        let textHeight: number | any = SimpleTextCacheStuffer.sTextHeightCache.get(textSize);
        if (textHeight == null) {
            textHeight = measureTextHeight(paint);
            SimpleTextCacheStuffer.sTextHeightCache.set(textSize, textHeight);
        }
        return textHeight;
    }
    public measure(danmaku: BaseDanmaku, paint: Paint, fromWorkerThread: boolean) {
        let w: number = 0;
        let textHeight: number = 0;
        if (danmaku.lines == null) {
            if (danmaku.text == null) {
                w = 0;
            }
            else {
                w = measureTextWidth(danmaku.text.toString(), paint);
                textHeight = this.getCacheHeight(danmaku, paint);
            }
            danmaku.paintWidth = w;
            danmaku.paintHeight = textHeight;
        }
        else {
            textHeight = this.getCacheHeight(danmaku, paint);
            danmaku.lines.forEach((tempStr: string) => {
                if (tempStr.length > 0) {
                    let tr: number = measureTextWidth(tempStr, paint);
                    w = Math.max(tr, w);
                }
            });
            danmaku.paintWidth = w;
            danmaku.paintHeight = danmaku.lines.length * textHeight;
        }
    }
    protected drawStroke(danmaku: BaseDanmaku, lineText: string | null, canvas: CanvasRenderingContext2D, left: number, top: number, paint: Paint) {
        if (lineText != null) {
            applyPaintToCanvas(paint, canvas);
            canvas.fillText(lineText, left, top);
        }
        else {
            applyPaintToCanvas(paint, canvas);
            canvas.fillText(danmaku.text.toString(), left, top);
        }
    }
    protected drawText(danmaku: BaseDanmaku, lineText: string | null, canvas: CanvasRenderingContext2D, left: number, top: number, paint: Paint, fromWorkerThread: boolean) {
        if (fromWorkerThread && danmaku instanceof SpecialDanmaku) {
            paint.setAlpha(255);
        }
        if (lineText != null) {
            applyPaintToCanvas(paint, canvas);
            canvas.fillText(lineText, left, top);
        }
        else {
            applyPaintToCanvas(paint, canvas);
            canvas.fillText(danmaku.text.toString(), left, top);
        }
    }
    public clearCaches() {
        SimpleTextCacheStuffer.sTextHeightCache.clear();
    }
    protected drawBackground(danmaku: BaseDanmaku, canvas: CanvasRenderingContext2D, left: number, top: number) {
    }
    public drawDanmaku(danmaku: BaseDanmaku, canvas: CanvasRenderingContext2D, left: number, top: number, fromWorkerThread: boolean, displayerConfig: DisplayerConfig) {
        let _left: number = left;
        let _top: number = top;
        left += danmaku.padding;
        top += danmaku.padding;
        if (danmaku.borderColor != 0) {
            left += displayerConfig.BORDER_WIDTH;
            top += displayerConfig.BORDER_WIDTH;
        }
        displayerConfig.definePaintParams(fromWorkerThread);
        let paint: Paint = displayerConfig.getPaint(danmaku, fromWorkerThread);
        this.drawBackground(danmaku, canvas, _left, _top);
        let ascent = measureTextHeight(paint) * -0.9;
        if (danmaku.lines != null) {
            let lines: string[] = danmaku.lines;
            if (lines.length == 1) {
                if (displayerConfig.hasStroke(danmaku)) {
                    displayerConfig.applyPaintConfig(danmaku, paint, true);
                    let strokeLeft: number = left;
                    let strokeTop: number = top - ascent;
                    if (displayerConfig.HAS_PROJECTION) {
                        strokeLeft += displayerConfig.sProjectionOffsetX;
                        strokeTop += displayerConfig.sProjectionOffsetY;
                    }
                    this.drawStroke(danmaku, lines[0], canvas, strokeLeft, strokeTop, paint);
                }
                displayerConfig.applyPaintConfig(danmaku, paint, false);
                this.drawText(danmaku, lines[0], canvas, left, top - ascent, paint, fromWorkerThread);
            }
            else {
                let textHeight: number = (danmaku.paintHeight - 2 * danmaku.padding) / lines.length;
                let t: number = 0;
                for (t; t < lines.length; t++) {
                    if (lines[t] == null || lines[t].length == 0) {
                        continue;
                    }
                    if (displayerConfig.hasStroke(danmaku)) {
                        displayerConfig.applyPaintConfig(danmaku, paint, true);
                        let strokeLeft: number = left;
                        let strokeTop: number = t * textHeight + top - ascent;
                        if (displayerConfig.HAS_PROJECTION) {
                            strokeLeft += displayerConfig.sProjectionOffsetX;
                            strokeTop += displayerConfig.sProjectionOffsetY;
                        }
                        this.drawStroke(danmaku, lines[t], canvas, strokeLeft, strokeTop, paint);
                    }
                    displayerConfig.applyPaintConfig(danmaku, paint, false);
                    this.drawText(danmaku, lines[t], canvas, left, t * textHeight + top - ascent, paint, fromWorkerThread);
                }
            }
        }
        else {
            if (displayerConfig.hasStroke(danmaku)) {
                displayerConfig.applyPaintConfig(danmaku, paint, true);
                let strokeLeft: number = left;
                let strokeTop: number = top - ascent;
                if (displayerConfig.HAS_PROJECTION) {
                    strokeLeft += displayerConfig.sProjectionOffsetX;
                    strokeTop += displayerConfig.sProjectionOffsetY;
                }
                this.drawStroke(danmaku, null, canvas, strokeLeft, strokeTop, paint);
            }
            displayerConfig.applyPaintConfig(danmaku, paint, false);
            this.drawText(danmaku, null, canvas, left, top - ascent, paint, fromWorkerThread);
        }
        // draw underline
        if (danmaku.underlineColor != 0) {
            let linePaint: Paint = displayerConfig.getUnderlinePaint(danmaku);
            let bottom: number = _top + danmaku.paintHeight - displayerConfig.UNDERLINE_HEIGHT;
            let path: Path2D = new Path2D('M' + _left + ' ' + bottom + ' ' + 'L' + (_left + danmaku.paintWidth) + ' ' + (bottom));
            applyPaintToCanvas(linePaint, canvas);
            canvas.stroke(path);
        }
        //draw border
        if (danmaku.borderColor != 0) {
            let borderPaint: Paint = displayerConfig.getBorderPaint(danmaku);
            applyPaintToCanvas(borderPaint, canvas);
            canvas.strokeRect(_left, _top, danmaku.paintWidth, danmaku.paintHeight);
        }
    }
}
