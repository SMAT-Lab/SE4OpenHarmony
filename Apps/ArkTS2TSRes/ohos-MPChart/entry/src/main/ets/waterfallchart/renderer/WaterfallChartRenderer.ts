let __generate__Id: number = 0;
function generateId(): string {
    return "WaterfallChartRenderer_" + ++__generate__Id;
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
import { BarChartRenderer, BarData, ChartPixelMap, Fill, FillDirection, Highlight, IBarDataSet, IValueFormatter, JArrayList, MPPointF, Rect as MyRect, Style, Transformer, Utils } from '@ohos/mpchart';
import WaterfallBuffer from '../buffer/WaterfallBuffer';
import WaterfallEntry from '../data/WaterfallEntry';
export default class WaterfallChartRenderer extends BarChartRenderer {
    protected mBarBuffers: WaterfallBuffer[] = new Array<WaterfallBuffer>();
    public initBuffers(): void {
        if (!this.mChart) {
            return;
        }
        let barData: BarData | null = this.mChart.getBarData();
        if (barData) {
            this.mBarBuffers = new Array(barData.getDataSetCount());
            for (let i = 0; i < this.mBarBuffers.length; i++) {
                let dataSet: IBarDataSet | null = barData.getDataSetByIndex(i);
                if (dataSet) {
                    this.mBarBuffers[i] = new WaterfallBuffer(dataSet.getEntryCount() * 4 * (dataSet.isStacked() ? dataSet.getStackSize() : 1), barData.getDataSetCount(), dataSet.isStacked());
                }
            }
        }
    }
    private mWaterfallShadowRectBuffer: MyRect = new MyRect();
    protected drawDataSet(c: CanvasRenderingContext2D, dataSet: IBarDataSet, index: number): void {
        if (!this.mChart) {
            return;
        }
        let trans: Transformer | null = this.mChart.getTransformer(dataSet.getAxisDependency());
        if (this.mBarBorderPaint) {
            this.mBarBorderPaint.setColor(dataSet.getBarBorderColor());
            this.mBarBorderPaint.setStrokeWidth(Utils.convertDpToPixel(dataSet.getBarBorderWidth()));
        }
        const drawBorder: boolean = dataSet.getBarBorderWidth() > 0.0;
        let phaseX: number = 1;
        let phaseY: number = 1;
        if (this.mAnimator) {
            phaseX = this.mAnimator.getPhaseX();
            phaseY = this.mAnimator.getPhaseY();
        }
        // draw the bar shadow before the values
        if (this.mShadowPaint && this.mChart.isDrawBarShadowEnabled()) {
            this.mShadowPaint.setColor(dataSet.getBarShadowColor());
            let barData: BarData | null = this.mChart.getBarData();
            if (!barData) {
                return;
            }
            const barWidth: number = barData.getBarWidth();
            const barWidthHalf: number = barWidth / 2.0;
            let x: number = 0;
            for (let i = 0, count = Math.min(Number(Math.ceil(Number(dataSet.getEntryCount()) * phaseX)), dataSet.getEntryCount()); i < count; i++) {
                let e: WaterfallEntry = dataSet.getEntryForIndex(i) as WaterfallEntry;
                x = e.getX();
                this.mWaterfallShadowRectBuffer.left = x - barWidthHalf;
                this.mWaterfallShadowRectBuffer.right = x + barWidthHalf;
                if (trans) {
                    trans.rectValueToPixel(this.mWaterfallShadowRectBuffer);
                }
                if (!this.mViewPortHandler || !this.mViewPortHandler.isInBoundsLeft(this.mWaterfallShadowRectBuffer.right)) {
                    continue;
                }
                if (!this.mViewPortHandler || !this.mViewPortHandler.isInBoundsRight(this.mWaterfallShadowRectBuffer.left)) {
                    break;
                }
                this.mWaterfallShadowRectBuffer.top = this.mViewPortHandler ? this.mViewPortHandler.contentTop() : 0;
                this.mWaterfallShadowRectBuffer.bottom = this.mViewPortHandler ? this.mViewPortHandler.contentBottom() : 0;
                if (this.mShadowPaint) {
                    Utils.resetContext2DStyle(c, this.mShadowPaint);
                    c.beginPath();
                    c.rect(this.mWaterfallShadowRectBuffer.left, this.mWaterfallShadowRectBuffer.top, this.mWaterfallShadowRectBuffer.width(), this.mWaterfallShadowRectBuffer.height());
                    switch (this.mShadowPaint.getStyle()) {
                        case Style.STROKE:
                            c.stroke();
                            break;
                        case Style.FILL:
                        case Style.FILL_AND_STROKE:
                        default:
                            c.fill();
                            break;
                    }
                    c.closePath();
                }
            }
        }
        // initialize the buffer
        let buffer: WaterfallBuffer = this.mBarBuffers[index];
        buffer.setPhases(phaseX, phaseY);
        buffer.setDataSet(index);
        buffer.setInverted(this.mChart.isInverted(dataSet.getAxisDependency()));
        let barData: BarData | null = this.mChart.getBarData();
        if (barData) {
            buffer.setBarWidth(barData.getBarWidth());
        }
        buffer.feed(dataSet);
        if (trans) {
            trans.pointValuesToPixel(buffer.buffer);
        }
        let fills: JArrayList<Fill> | null = dataSet.getFills();
        const isCustomFill: boolean = !!fills && !fills.isEmpty();
        const isSingleColor: boolean = dataSet.getColors().size() == 1;
        const isInverted: boolean = this.mChart.isInverted(dataSet.getAxisDependency());
        if (isSingleColor) {
            this.mRenderPaint.setColor(dataSet.getColor());
        }
        for (let j = 0, pos = 0; j < buffer.size(); j += 4, pos++) {
            if (!this.mViewPortHandler || !this.mViewPortHandler.isInBoundsLeft(buffer.buffer[j + 2]))
                continue;
            if (!this.mViewPortHandler || !this.mViewPortHandler.isInBoundsRight(buffer.buffer[j]))
                break;
            if (!isSingleColor) {
                // Set the color for the currently drawn value. If the index
                // is out of bounds, reuse colors.
                this.mRenderPaint.setColor(dataSet.getColor(pos));
            }
            if (isCustomFill) {
                let fill: Fill | null = dataSet.getFill(pos);
                if (fill) {
                    fill.fillRect(c, this.mRenderPaint, buffer.buffer[j], buffer.buffer[j + 1], buffer.buffer[j + 2], buffer.buffer[j + 3], isInverted ? FillDirection.DOWN : FillDirection.UP);
                }
            }
            else {
                if (this.mRenderPaint) {
                    Utils.resetContext2DStyle(c, this.mRenderPaint);
                }
                let left: number = buffer.buffer[j];
                let bottom: number = buffer.buffer[j + 1];
                let right: number = buffer.buffer[j + 2];
                let top: number = buffer.buffer[j + 3];
                //绘制数据
                let radius = (right - left) / 2;
                if (Math.abs(top - bottom) > (right - left)) {
                    this.drawRoundedRectangles(c, left, top, right, bottom, radius);
                }
                else {
                    this.drawCircle(c, left, top, radius);
                }
                //绘制标记点
                let e: WaterfallEntry = dataSet.getEntryForIndex(j / 4) as WaterfallEntry;
                let highlights = e.getHighlights();
                for (let i = 0; i < highlights.length; i++) {
                    let h = highlights[i];
                    //canvas画布的y轴与图表的y轴方向相反
                    let maxY = h.getMinY();
                    let minY = h.getMaxY();
                    let yArray = [0, minY, 0, maxY];
                    trans?.pointValuesToPixel(yArray);
                    if (Math.abs(yArray[1] - yArray[3]) > (right - left)) {
                        c.save();
                        c.fillStyle = h.getColor();
                        this.drawRoundedRectangles(c, left, yArray[1], right, yArray[3], radius);
                        c.restore();
                    }
                    else {
                        c.save();
                        c.fillStyle = h.getColor();
                        if (yArray[3] + 2 * radius > bottom) {
                            this.drawCircle(c, left, bottom - 2 * radius, radius);
                        }
                        else {
                            this.drawCircle(c, left, yArray[3], radius);
                        }
                        c.restore();
                    }
                }
            }
            if (drawBorder) {
                if (this.mBarBorderPaint) {
                    Utils.resetContext2DStyle(c, this.mBarBorderPaint);
                }
                c.beginPath();
                c.rect(buffer.buffer[j], buffer.buffer[j + 1], buffer.buffer[j + 2] - buffer.buffer[j], buffer.buffer[j + 3] - buffer.buffer[j + 1]);
                c.stroke();
                c.closePath();
            }
        }
    }
    private drawCircle(c: CanvasRenderingContext2D, left: number, top: number, radius: number) {
        c.beginPath();
        c.arc(left + radius, top + radius, radius, 0, 2 * Math.PI);
        c.closePath();
        c.fill();
    }
    private drawRoundedRectangles(c: CanvasRenderingContext2D, left: number, top: number, right: number, bottom: number, radius: number) {
        c.beginPath();
        c.moveTo(left + radius, top);
        c.lineTo(right - radius, top);
        c.arc(right - radius, top + radius, radius, 3 / 2 * Math.PI, 0);
        c.lineTo(right, bottom - radius);
        c.arc(right - radius, bottom - radius, radius, 0, Math.PI / 2);
        c.lineTo(left + radius, bottom);
        c.arc(left + radius, bottom - radius, radius, Math.PI / 2, Math.PI);
        c.lineTo(left, top + radius);
        c.arc(left + radius, top + radius, radius, Math.PI, 3 / 2 * Math.PI);
        c.closePath();
        c.fill();
    }
    // @Override
    public drawValues(c: CanvasRenderingContext2D): void {
        if (!this.mChart || !this.mChart.getBarData()) {
            return;
        }
        // if values are drawn
        if (this.isDrawingValuesAllowed(this.mChart)) {
            let barData: BarData | null = this.mChart.getBarData();
            if (!barData) {
                return;
            }
            let dataSets: JArrayList<IBarDataSet> = barData.getDataSets();
            const valueOffsetPlus: number = 0;
            let posOffset: number = 0;
            let negOffset: number = 0;
            let drawValueAboveBar: boolean = this.mChart.isDrawValueAboveBarEnabled();
            for (let i = 0; i < barData.getDataSetCount(); i++) {
                let dataSet: IBarDataSet = dataSets.get(i);
                if (!this.shouldDrawValues(dataSet))
                    continue;
                // apply the text-styling defined by the DataSet
                this.applyValueTextStyle(dataSet);
                let isInverted: boolean = this.mChart.isInverted(dataSet.getAxisDependency());
                // calculate the correct offset depending on the draw position of
                // the value
                let valueTextHeight: number = Utils.calcTextHeight(this.mValuePaint, "8");
                posOffset = (drawValueAboveBar ? -valueOffsetPlus : valueTextHeight + valueOffsetPlus);
                negOffset = (drawValueAboveBar ? valueTextHeight + valueOffsetPlus : -valueOffsetPlus);
                if (isInverted) {
                    posOffset = -posOffset - valueTextHeight;
                    negOffset = -negOffset - valueTextHeight;
                }
                // get the buffer
                let buffer: WaterfallBuffer = this.mBarBuffers[i];
                let iconsOffset: MPPointF = MPPointF.getInstance(0, 0, dataSet.getIconsOffset());
                iconsOffset.x = Utils.convertDpToPixel(iconsOffset.x);
                iconsOffset.y = Utils.convertDpToPixel(iconsOffset.y);
                for (let j = 0; j < buffer.buffer.length * (this.mAnimator ? this.mAnimator.getPhaseX() : 1); j += 4) {
                    let x: number = (buffer.buffer[j] + buffer.buffer[j + 2]) / 2;
                    if (!this.mViewPortHandler || !this.mViewPortHandler.isInBoundsRight(x))
                        break;
                    if (!this.mViewPortHandler || !this.mViewPortHandler.isInBoundsY(buffer.buffer[j + 1])
                        || !this.mViewPortHandler.isInBoundsLeft(x))
                        continue;
                    let entry: WaterfallEntry = dataSet.getEntryForIndex(j / 4) as WaterfallEntry;
                    let val: number = entry.getY();
                    if (dataSet.isDrawValuesEnabled()) {
                        let valueFormatter: IValueFormatter | null = dataSet.getValueFormatter();
                        if (valueFormatter) {
                            this.drawValue(c, valueFormatter, val, entry, i, x, (buffer.buffer[j + 3] + posOffset), dataSet.getValueTextColor(j / 4));
                        }
                    }
                    let icon: ChartPixelMap | null = entry.getIcon();
                    if (icon && dataSet.isDrawIconsEnabled()) {
                        let px: number = x;
                        let py: number = val >= 0 ?
                            (buffer.buffer[j + 1] + posOffset) :
                            (buffer.buffer[j + 3] + negOffset);
                        px += iconsOffset.x;
                        py += iconsOffset.y;
                        Utils.drawImage(c, icon, Utils.parseInt(px), Utils.parseInt(py));
                    }
                }
                MPPointF.recycleInstance(iconsOffset);
            }
        }
    }
    // @Override
    public drawHighlighted(c: CanvasRenderingContext2D, indices: Highlight[]): void {
        if (!this.mChart) {
            return;
        }
        let barData: BarData | null = this.mChart.getBarData();
        if (!barData) {
            return;
        }
        for (let i = 0; i < indices.length; i++) {
            let high: Highlight = indices[i];
            let set: IBarDataSet | null = barData.getDataSetByIndex(high.getDataSetIndex());
            if (set == null || !set.isHighlightEnabled())
                continue;
            let e: WaterfallEntry | null = set.getEntryForXValue(high.getX(), high.getY()) as WaterfallEntry;
            if (!e) {
                continue;
            }
            if (!this.isInBoundsX(e, set))
                continue;
            let trans: Transformer | null = this.mChart.getTransformer(set.getAxisDependency());
            let highLightColor: number = set.getHighLightColor();
            if (highLightColor == 0) {
                highLightColor = Color.Black;
            }
            this.mHighlightPaint.setColor(highLightColor);
            this.mHighlightPaint.setGlobalAlpha(set.getHighLightAlpha() / 255);
            let y1: number = 0;
            let y2: number = 0;
            y1 = e.getY();
            y2 = e.getMinY();
            if (trans) {
                this.prepareBarHighlight(e.getX(), y1, y2, barData.getBarWidth() / 2, trans);
            }
            this.setHighlightDrawPos(high, this.mBarRect);
            Utils.resetContext2DStyle(c, this.mHighlightPaint);
            let round = this.mBarRect.width() / 2;
            if (this.mBarRect.height() >= this.mBarRect.width()) {
                c.beginPath();
                c.moveTo(this.mBarRect.left + round, this.mBarRect.top);
                c.lineTo(this.mBarRect.right - round, this.mBarRect.top);
                c.arc(this.mBarRect.right - round, this.mBarRect.top + round, round, 3 / 2 * Math.PI, 0);
                c.lineTo(this.mBarRect.right, this.mBarRect.bottom - round);
                c.arc(this.mBarRect.right - round, this.mBarRect.bottom - round, round, 0, Math.PI / 2);
                c.lineTo(this.mBarRect.left + round, this.mBarRect.bottom);
                c.arc(this.mBarRect.left + round, this.mBarRect.bottom - round, round, Math.PI / 2, Math.PI);
                c.lineTo(this.mBarRect.left, this.mBarRect.top + round);
                c.arc(this.mBarRect.left + round, this.mBarRect.top + round, round, Math.PI, 3 / 2 * Math.PI);
                c.closePath();
                c.fill();
            }
            else {
                c.beginPath();
                let centerX = this.mBarRect.left + this.mBarRect.width() / 2;
                let centerY = this.mBarRect.top + this.mBarRect.height() / 2;
                c.moveTo(centerX, centerY);
                c.arc(centerX, centerY, round, 0, 360, false);
                c.fill();
                c.closePath();
            }
        }
    }
}
