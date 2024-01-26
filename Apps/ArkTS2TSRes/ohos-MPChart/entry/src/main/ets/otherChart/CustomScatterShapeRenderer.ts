let __generate__Id: number = 0;
function generateId(): string {
    return "CustomScatterShapeRenderer_" + ++__generate__Id;
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
import { IScatterDataSet, IShapeRenderer, Paint, Style, Utils, ViewPortHandler } from '@ohos/mpchart';
export default class CustomScatterShapeRenderer implements IShapeRenderer {
    public renderShape(c: CanvasRenderingContext2D, dataSet: IScatterDataSet, viewPortHandler: ViewPortHandler, posX: number, posY: number, renderPaint: Paint): void {
        let shapeHalf: number = dataSet.getScatterShapeSize() / 2;
        renderPaint.setStyle(Style.STROKE);
        renderPaint.setStrokeWidth(Utils.convertDpToPixel(1));
        Utils.resetContext2DStyle(c, renderPaint);
        c.beginPath();
        c.moveTo(posX - shapeHalf, posY - shapeHalf);
        c.lineTo(posX + shapeHalf, posY + shapeHalf);
        c.stroke();
        c.closePath();
    }
}
