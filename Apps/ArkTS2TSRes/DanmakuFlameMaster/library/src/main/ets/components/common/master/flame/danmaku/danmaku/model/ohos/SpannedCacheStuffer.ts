let __generate__Id: number = 0;
function generateId(): string {
    return "SpannedCacheStuffer_" + ++__generate__Id;
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
import { Paint } from '../../../../../../compat/Paint';
import { BaseDanmaku } from '../BaseDanmaku';
import { SimpleTextCacheStuffer } from '../../model/ohos/SimpleTextCacheStuffer';
import { measureTextHeight, applyPaintToCanvas } from '../../util/UiUtil';
/**
 * Created by ch on 15-7-16.
 */
export class SpannedCacheStuffer extends SimpleTextCacheStuffer {
    public measure(danmaku: BaseDanmaku, paint: Paint, fromWorkerThread: boolean): void {
        if (danmaku.text != null && danmaku.text.startsWith("<img")) {
            let text: string = danmaku.text;
            let indexSrcStart = text.indexOf("src=\"") + 5;
            let indexSrcEnd = text.indexOf("\"", indexSrcStart);
            let src: string = text.substring(indexSrcStart, indexSrcEnd);
            let indexWidthStart = text.indexOf("width=\"") + 7;
            let indexWidthEnd = text.indexOf("\"", indexWidthStart);
            let width: number = Number(text.substring(indexWidthStart, indexWidthEnd)).valueOf();
            let indexHeightStart = text.indexOf("height=\"") + 8;
            let indexHeightEnd = text.indexOf("\"", indexHeightStart);
            let height: number = Number(text.substring(indexHeightStart, indexHeightEnd)).valueOf();
            let indexTagEnd = text.indexOf("/>") + 2;
            let pureText = text.substring(indexTagEnd);
            danmaku.text = pureText;
            super.measure(danmaku, paint, fromWorkerThread);
            danmaku.paintWidth += width;
            danmaku.paintHeight = Math.max(danmaku.paintHeight, height);
            danmaku.obj = { src: src, width: width, height: height };
            return;
        }
        super.measure(danmaku, paint, fromWorkerThread);
    }
    public drawStroke(danmaku: BaseDanmaku, lineText: string, canvas: CanvasRenderingContext2D, left: number, top: number, paint: Paint) {
        if (danmaku.obj == null) {
            super.drawStroke(danmaku, lineText, canvas, left, top, paint);
        }
    }
    public drawText(danmaku: BaseDanmaku, lineText: string, canvas: CanvasRenderingContext2D, left: number, top: number, paint: Paint, fromWorkerThread: boolean) {
        if (danmaku.obj == null) {
            super.drawText(danmaku, lineText, canvas, left, top, paint, fromWorkerThread);
            return;
        }
        let imgInfo: any = danmaku.obj;
        let src: any = imgInfo["src"];
        let width: any = imgInfo["width"];
        let height: any = imgInfo["height"];
        let requestRemeasure: boolean = 0 != (danmaku.requestFlags & BaseDanmaku.FLAG_REQUEST_REMEASURE);
        let requestInvalidate: boolean = 0 != (danmaku.requestFlags & BaseDanmaku.FLAG_REQUEST_INVALIDATE);
        if (requestInvalidate) {
            if (requestInvalidate) {
                danmaku.requestFlags &= ~BaseDanmaku.FLAG_REQUEST_INVALIDATE;
            }
        }
        let needRestore: boolean = false;
        let ascent: number = measureTextHeight(paint) * -0.9;
        if (left != 0 && top != 0) {
            canvas.save();
            canvas.translate(px2vp(left), px2vp(top + ascent));
            needRestore = true;
        }
        let imageBitmap: ImageBitmap = new ImageBitmap(src);
        canvas.drawImage(imageBitmap, 0, 0, px2vp(width), px2vp(height));
        canvas.fillStyle = "#8A2233B1";
        canvas.fillRect(px2vp(width), 0, px2vp(danmaku.paintWidth - width), px2vp(height));
        applyPaintToCanvas(paint, canvas);
        if (needRestore) {
            canvas.translate(0, px2vp(-ascent));
        }
        canvas.fillText(danmaku.text, px2vp(width), 0);
        if (needRestore) {
            canvas.restore();
        }
    }
    public clearCaches(): void {
        super.clearCaches();
    }
    public clearCache(danmaku: BaseDanmaku): void {
        super.clearCache(danmaku);
        danmaku.obj = null;
    }
    public releaseResource(danmaku: BaseDanmaku): void {
        this.clearCache(danmaku);
        super.releaseResource(danmaku);
    }
}
