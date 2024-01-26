let __generate__Id: number = 0;
function generateId(): string {
    return "DrawHelper_" + ++__generate__Id;
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
import { Paint } from '../../../../compat/Paint';
import { RectF } from '../.././../../compat/RectF';
import { measureTextWidth } from '../danmaku/util/UiUtil';
import { colorNumber2String, applyPaintToCanvas } from '../danmaku/util/UiUtil';
export class DrawHelper {
    public static PAINT_FPS: Paint | any = null;
    public static RECT: RectF = new RectF();
    private static USE_DRAWCOLOR_TO_CLEAR_CANVAS: boolean = true;
    private static USE_DRAWCOLOR_MODE_CLEAR: boolean = true;
    public static useDrawColorToClearCanvas(use: boolean, useClearMode: boolean): void {
        DrawHelper.USE_DRAWCOLOR_TO_CLEAR_CANVAS = use;
        DrawHelper.USE_DRAWCOLOR_MODE_CLEAR = useClearMode;
    }
    public static drawFPS(canvas: CanvasRenderingContext2D, text: string): void {
        if (DrawHelper.PAINT_FPS == null) {
            DrawHelper.PAINT_FPS = new Paint(canvas);
            DrawHelper.PAINT_FPS.setColor(0xff0000);
            DrawHelper.PAINT_FPS.setTextSize(30);
        }
        let top: number = canvas.height - 15;
        DrawHelper.clearCanvasByPoints(canvas, 10, top - 15, measureTextWidth(text, DrawHelper.PAINT_FPS) + 20, canvas.height);
        applyPaintToCanvas(DrawHelper.PAINT_FPS, canvas);
        canvas.fillText(text, 15, top);
    }
    public static clearCanvas(canvas: CanvasRenderingContext2D): void {
        DrawHelper.RECT.set(0, 0, canvas.width, canvas.height);
        DrawHelper.clearCanvasByRectF(canvas, DrawHelper.RECT);
    }
    public static fillTransparent(canvas: CanvasRenderingContext2D): void {
        canvas.clearRect(0, 0, canvas.width, canvas.height);
    }
    public static clearCanvasByPoints(canvas: CanvasRenderingContext2D, left: number, top: number, right: number, bottom: number): void {
        DrawHelper.RECT.set(left, top, right, bottom);
        DrawHelper.clearCanvasByRectF(canvas, DrawHelper.RECT);
    }
    private static clearCanvasByRectF(canvas: CanvasRenderingContext2D, rect: RectF): void {
        if (rect.width() <= 0 || rect.height() <= 0) {
            return;
        }
        canvas.clearRect(rect.left, rect.top, rect.width(), rect.height());
    }
}
