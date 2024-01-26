let __generate__Id: number = 0;
function generateId(): string {
    return "YAxisRenderer_" + ++__generate__Id;
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
import MyRect from '../data/Rect';
import YAxis, { AxisDependency, YAxisLabelPosition } from '../components/YAxis';
import Paint, { Style } from '../data/Paint';
import Utils from '../utils/Utils';
import AxisRenderer from '../renderer/AxisRenderer';
import LimitLine, { LimitLabelPosition } from '../components/LimitLine';
import { JArrayList } from '../utils/JArrayList';
import ViewPortHandler from '../utils/ViewPortHandler';
import Transformer from '../utils/Transformer';
import MPPointD from '../utils/MPPointD';
export default class YAxisRenderer extends AxisRenderer {
    protected mYAxis: YAxis | null = null;
    protected mZeroLinePaint: Paint = new Paint();
    constructor(viewPortHandler: ViewPortHandler, yAxis: YAxis, trans?: Transformer) {
        super(viewPortHandler, yAxis, trans);
        this.mYAxis = yAxis;
        if (viewPortHandler != null) {
            if (this.mAxisLabelPaint) {
                this.mAxisLabelPaint.setColor(Color.Black);
                this.mAxisLabelPaint.setTextSize(vp2px(10));
            }
            this.mZeroLinePaint = new Paint();
            this.mZeroLinePaint.setColor(Color.Gray);
            this.mZeroLinePaint.setStrokeWidth(1);
            this.mZeroLinePaint.setStyle(Style.STROKE);
        }
    }
    /**
     * draws the y-axis labels to the screen
     */
    public renderAxisLabels(c: CanvasRenderingContext2D): void {
        if (!this.mYAxis) {
            return;
        }
        if (!this.mYAxis.isEnabled() || !this.mYAxis.isDrawLabelsEnabled())
            return;
        let positions: number[] = this.getTransformedPositions();
        if (this.mAxisLabelPaint) {
            this.mAxisLabelPaint.setFontFamily(this.mYAxis.getTypeface());
            this.mAxisLabelPaint.setTextSize(this.mYAxis.getTextSize());
            this.mAxisLabelPaint.setColor(this.mYAxis.getTextColor());
            let xOffset = this.mYAxis.getXOffset();
            let yOffset = Utils.calcTextHeight(this.mAxisLabelPaint, "A") + this.mYAxis.getYOffset();
            let dependency: AxisDependency = this.mYAxis.getAxisDependency();
            let labelPosition: YAxisLabelPosition = this.mYAxis.getLabelPosition();
            let xPos: number = 0;
            if (dependency == AxisDependency.LEFT) {
                if (labelPosition == YAxisLabelPosition.OUTSIDE_CHART) {
                    if (this.mAxisLabelPaint) {
                        this.mAxisLabelPaint.setTextAlign('right');
                    }
                    xPos = (this.mViewPortHandler ? this.mViewPortHandler.offsetLeft() : 0) - xOffset;
                }
                else {
                    if (this.mAxisLabelPaint) {
                        this.mAxisLabelPaint.setTextAlign('left');
                    }
                    if (this.mViewPortHandler) {
                        xPos = (this.mViewPortHandler ? this.mViewPortHandler.offsetLeft() : 0) + xOffset;
                    }
                }
            }
            else {
                if (labelPosition == YAxisLabelPosition.OUTSIDE_CHART) {
                    if (this.mAxisLabelPaint) {
                        this.mAxisLabelPaint.setTextAlign('left');
                    }
                    if (this.mViewPortHandler) {
                        xPos = this.mViewPortHandler.contentRight() + xOffset;
                    }
                }
                else {
                    if (this.mAxisLabelPaint) {
                        this.mAxisLabelPaint.setTextAlign('right');
                    }
                    if (this.mViewPortHandler) {
                        xPos = this.mViewPortHandler.contentRight() - xOffset;
                    }
                }
            }
            this.drawYLabels(c, xPos, positions, yOffset);
        }
        // return [];
    }
    public renderAxisLine(c: CanvasRenderingContext2D, extraLength: number): void {
        if (!this.mYAxis || !this.mViewPortHandler || !this.mYAxis.isEnabled() || !this.mYAxis.isDrawAxisLineEnabled()) {
            return;
        }
        if (this.mAxisLinePaint) {
            this.mAxisLinePaint.setColor(this.mYAxis.getAxisLineColor());
            this.mAxisLinePaint.setStrokeWidth(this.mYAxis.getAxisLineWidth());
            Utils.resetContext2DStyle(c, this.mAxisLinePaint);
            if (this.mYAxis.getAxisDependency() == AxisDependency.LEFT) {
                c.beginPath();
                c.moveTo(this.mViewPortHandler.contentLeft(), this.mViewPortHandler.contentTop());
                c.lineTo(this.mViewPortHandler.contentLeft(), this.mViewPortHandler.contentBottom() + extraLength);
                c.stroke();
                c.closePath();
            }
            else {
                c.beginPath();
                c.moveTo(this.mViewPortHandler.contentRight(), this.mViewPortHandler.contentTop());
                c.lineTo(this.mViewPortHandler.contentRight(), this.mViewPortHandler.contentBottom() + extraLength);
                c.stroke();
                c.closePath();
            }
        }
    }
    /**
     * draws the y-labels on the specified x-position
     *
     * @param fixedPosition
     * @param positions
     */
    protected drawYLabels(c: CanvasRenderingContext2D, fixedPosition: number, positions: number[], offset: number): void {
        // let paints:Paint[] = [];
        if (!this.mYAxis) {
            return;
        }
        const fromIndex = this.mYAxis.isDrawBottomYLabelEntryEnabled() ? 0 : 1;
        const to = this.mYAxis.isDrawTopYLabelEntryEnabled()
            ? this.mYAxis.mEntryCount
            : (this.mYAxis.mEntryCount - 1);
        let xOffset: number = this.mYAxis.getLabelXOffset();
        // draw
        for (let i = fromIndex; i < to; i++) {
            // if (!this.mAxis || !this.mAxisLabelPaint || !this.mAxisLinePaint) {
            //   return [];
            // }
            // let newLabelPaint:TextPaint = new TextPaint(this.mAxisLabelPaint as TextPaint);
            let text: string = this.mYAxis.getFormattedLabel(i);
            let originTextBaseLine: CanvasTextBaseline = this.mAxisLabelPaint.getTextBaseline();
            this.mAxisLabelPaint.setTextBaseline('middle');
            Utils.resetContext2DStyle(c, this.mAxisLabelPaint);
            switch (this.mAxisLabelPaint.getStyle()) {
                case Style.STROKE:
                    c.beginPath();
                    c.strokeText(text, fixedPosition + xOffset, positions[i * 2 + 1] + offset - Utils.calcTextHeight(this.mAxisLabelPaint, text));
                    c.closePath();
                    break;
                case Style.FILL_AND_STROKE:
                case Style.FILL:
                default:
                    c.beginPath();
                    c.fillText(text, fixedPosition + xOffset, positions[i * 2 + 1] + offset - Utils.calcTextHeight(this.mAxisLabelPaint, text));
                    c.closePath();
                    break;
            }
            this.mAxisLabelPaint.setTextBaseline(originTextBaseLine);
            // newLabelPaint.setText(text);
            // newLabelPaint.setX(fixedPosition + xOffset);
            // let interval = ((this.mAxisLinePaint as LinePaint).endPoint[1] - (this.mAxisLinePaint as LinePaint).startPoint[1])  / (to - 1);
            // let lastNumber = this.mAxis.mEntries[this.mAxis.mEntries.length - 1];
            // let topOffset = ((this.mAxis.getAxisMaximum() - lastNumber) / (lastNumber - this.mAxis.mEntries[this.mAxis.mEntries.length - 2]) * interval)
            // let bottomOffset = ((this.mAxis.mEntries[0] - this.mAxis.mAxisMinimum) / (this.mAxis.mEntries[1] - this.mAxis.mEntries[0]) * interval)
            // interval = ((this.mAxisLinePaint as LinePaint).endPoint[1] - (this.mAxisLinePaint as LinePaint).startPoint[1] - topOffset - bottomOffset)  / (to - 1)
            // let nowOffset = offset;
            // if(this.mYAxis.isInverted()){
            //   nowOffset += bottomOffset;
            //   if(!this.mYAxis.isDrawBottomYLabelEntryEnabled()){
            //     newLabelPaint.setY(interval * (to - i - 1) + nowOffset);
            //   }else{
            //     newLabelPaint.setY(interval * i + nowOffset);
            //   }
            // }else{
            //   nowOffset += topOffset;
            //   if(!this.mYAxis.isDrawBottomYLabelEntryEnabled()){
            //     newLabelPaint.setY(interval * i + nowOffset);
            //   }else{
            //     newLabelPaint.setY(interval * (to - i - 1) + nowOffset);
            //   }
            // }
            // if(newLabelPaint.textAlign == TextAlign.End){
            //   newLabelPaint.setWidth((this.mAxisLinePaint as LinePaint).startPoint[0]);
            // }
            // paints.push(newLabelPaint)
        }
        // return paints;
    }
    // protected mRenderGridLinesPath: Path2D = new Path2D();
    public renderGridLines(c: CanvasRenderingContext2D): void {
        // let paints:Paint[] = []
        // const fromIndex = this.mYAxis.isDrawBottomYLabelEntryEnabled() ? 0 : 1;
        // const to = this.mYAxis.isDrawTopYLabelEntryEnabled()
        //   ? this.mYAxis.mEntryCount
        //   : (this.mYAxis.mEntryCount - 1);
        if (!this.mYAxis) {
            return;
        }
        if (!this.mYAxis.isEnabled())
            return;
        if (this.mYAxis.isDrawGridLinesEnabled()) {
            c.save();
            c.beginPath();
            let contentRect = this.getGridClippingRect();
            c.rect(contentRect.left, contentRect.top, contentRect.right - contentRect.left, contentRect.bottom - contentRect.top);
            c.closePath();
            c.clip();
            let positions: number[] = this.getTransformedPositions();
            if (this.mGridPaint) {
                this.mGridPaint.setColor(this.mYAxis.getGridColor());
                this.mGridPaint.setStrokeWidth(this.mYAxis.getGridLineWidth());
                let dashEffect = this.mYAxis.getGridDashPathEffect();
                this.mGridPaint.setDashPathEffect(dashEffect);
            }
            // let gridLinePath: Path2D = this.mRenderGridLinesPath;
            // gridLinePath = new Path2D();
            //      let yOffset = Utils.calcTextHeight(this.mAxisLabelPaint, "A") / 2.5 + this.mYAxis.getYOffset()
            // draw the grid
            if (positions) {
                for (let i = 0; i < positions.length; i += 2) {
                    Utils.resetContext2DStyle(c, this.mGridPaint);
                    c.beginPath();
                    this.linePath(c, i, positions);
                    c.closePath();
                    // gridLinePath = new Path2D();
                }
            }
            c.restore();
        }
        if (this.mYAxis && this.mYAxis.isDrawZeroLineEnabled()) {
            this.drawZeroLine(c);
            // if (paint) {
            //   paints.push(paint);
            // }
        }
        // return paints;
    }
    protected mGridClippingRect: MyRect = new MyRect();
    public getGridClippingRect(): MyRect {
        if (this.mViewPortHandler) {
            this.mGridClippingRect.set(this.mViewPortHandler.getContentRect().left, this.mViewPortHandler.getContentRect().top, this.mViewPortHandler.getContentRect().right, this.mViewPortHandler.getContentRect().bottom);
        }
        if (this.mAxis) {
            this.mGridClippingRect.inset(0, -this.mAxis.getGridLineWidth(), 0, -this.mAxis.getGridLineWidth());
        }
        return this.mGridClippingRect;
    }
    /**
     * Calculates the path for a grid line.
     *
     * @param p
     * @param i
     * @param positions
     * @return
     */
    protected linePath(c: CanvasRenderingContext2D, i: number, positions: number[]): void {
        c.beginPath();
        c.moveTo(this.mViewPortHandler ? this.mViewPortHandler.offsetLeft() : 0, positions[i + 1]);
        c.lineTo(this.mViewPortHandler ? this.mViewPortHandler.contentRight() : 0, positions[i + 1]);
        c.stroke();
        c.closePath();
        // if (this.mAxisLinePaint && this.mViewPortHandler) {
        //   p = "M" + Utils.convertDpToPixel((this.mAxisLinePaint as LinePaint).startPoint[0]) + " " + Utils.convertDpToPixel(positions[i + 1]) + " L" + Utils.convertDpToPixel(this.mViewPortHandler.contentRight()) + " " + Utils.convertDpToPixel(positions[i + 1]) + " Z";
        // }
        // return p;
    }
    protected mGetTransformedPositionsBuffer: number[] = new Array<number>(2);
    /**
     * Transforms the values contained in the axis entries to screen pixels and returns them in form of a float array
     * of x- and y-coordinates.
     *
     * @return
     */
    protected getTransformedPositions(): number[] {
        if (!this.mYAxis) {
            return [];
        }
        if (this.mGetTransformedPositionsBuffer.length != this.mYAxis.mEntryCount * 2) {
            this.mGetTransformedPositionsBuffer = new Array<number>(this.mYAxis.mEntryCount * 2);
        }
        let positions: number[] = this.mGetTransformedPositionsBuffer;
        for (let i = 0; i < positions.length; i += 2) {
            // only fill y values, x values are not needed for y-labels
            positions[i + 1] = this.mYAxis.mEntries[i / 2];
        }
        if (this.mTrans) {
            this.mTrans.pointValuesToPixel(positions);
        }
        return positions;
    }
    // protected mDrawZeroLinePath: Path2D = new Path2D();
    protected mZeroLineClippingRect: MyRect = new MyRect();
    /**
     * Draws the zero line.
     */
    protected drawZeroLine(c: CanvasRenderingContext2D): void {
        c.save();
        if (this.mYAxis && this.mViewPortHandler && this.mTrans) {
            this.mZeroLineClippingRect.set(this.mViewPortHandler.getContentRect().left, this.mViewPortHandler.getContentRect()
                .top, this.mViewPortHandler.getContentRect().right, this.mViewPortHandler.getContentRect().bottom);
            this.mZeroLineClippingRect.inset(0, -this.mYAxis.getZeroLineWidth(), 0, -this.mYAxis.getZeroLineWidth());
            c.rect(this.mZeroLineClippingRect.left, this.mZeroLineClippingRect.top, this.mZeroLineClippingRect.right - this.mZeroLineClippingRect.left, this.mZeroLineClippingRect.bottom - this.mZeroLineClippingRect.top);
            c.clip();
            // draw zero line
            let pos: MPPointD = this.mTrans.getPixelForValues(0, 0);
            if (this.mZeroLinePaint) {
                this.mZeroLinePaint.setColor(this.mYAxis.getZeroLineColor());
                this.mZeroLinePaint.setStrokeWidth(this.mYAxis.getZeroLineWidth());
            }
            // let zeroLinePath = this.mDrawZeroLinePath;
            // zeroLinePath = new Path2D();
            c.beginPath();
            c.moveTo(this.mViewPortHandler ? this.mViewPortHandler.contentLeft() : 0, pos.y);
            c.lineTo(this.mViewPortHandler ? this.mViewPortHandler.contentRight() : 0, pos.y);
            c.stroke();
            c.closePath();
            c.restore();
        }
    }
    // protected mRenderLimitLines: Path2D = new Path2D();
    protected mRenderLimitLinesBuffer: number[] = new Array<number>(2);
    protected mLimitLineClippingRect: MyRect = new MyRect();
    public renderLine(c: CanvasRenderingContext2D, l: LimitLine) {
        if (this.mViewPortHandler) {
            this.mLimitLineClippingRect.set(this.mViewPortHandler.getContentRect()
                .left, this.mViewPortHandler.getContentRect().top, this.mViewPortHandler.getContentRect().right, this.mViewPortHandler.getContentRect().bottom);
        }
        this.mLimitLineClippingRect.inset(0, -l.getLineWidth(), 0, -l.getLineWidth());
        c.beginPath();
        c.rect(this.mLimitLineClippingRect.left, this.mLimitLineClippingRect.top, this.mLimitLineClippingRect.width(), this.mLimitLineClippingRect.height());
        c.closePath();
        c.clip();
        this.mLimitLinePaint.setStyle(Style.STROKE);
        this.mLimitLinePaint.setColor(l.getLineColor());
        this.mLimitLinePaint.setStrokeWidth(l.getLineWidth());
        let dashEffect = l.getDashPathEffect();
        this.mLimitLinePaint.setDashPathEffect(dashEffect);
        this.mRenderLimitLinesBuffer[1] = l.getLimit();
        if (this.mTrans) {
            this.mTrans.pointValuesToPixel(this.mRenderLimitLinesBuffer);
        }
        Utils.resetContext2DStyle(c, this.mLimitLinePaint);
        c.beginPath();
        c.moveTo(this.mViewPortHandler ? this.mViewPortHandler.contentLeft() : 0, this.mRenderLimitLinesBuffer[1]);
        c.lineTo(this.mViewPortHandler ? this.mViewPortHandler.contentRight() : 0, this.mRenderLimitLinesBuffer[1]);
        c.stroke();
        c.closePath();
    }
    public renderCustomGridLines(c: CanvasRenderingContext2D) {
        if (!this.mYAxis) {
            return;
        }
        let gridLines = this.mYAxis.getGridLines();
        if (!gridLines || gridLines.size() <= 0)
            return;
        for (let i = 0; i < gridLines.size(); i++) {
            c.save();
            let l: LimitLine = gridLines.get(i);
            if (!l.isEnabled())
                continue;
            this.renderLine(c, l);
            c.restore();
        }
    }
    /**
     * Draws the LimitLines associated with this axis to the screen.
     *
     * @param c
     */
    public renderLimitLines(c: CanvasRenderingContext2D): void {
        if (!this.mYAxis) {
            return;
        }
        let limitLines: JArrayList<LimitLine> = this.mYAxis.getLimitLines();
        // let paints:Paint[] = []
        if (!limitLines || limitLines.size() <= 0)
            return;
        let pts: number[] = this.mRenderLimitLinesBuffer;
        pts[0] = 0;
        pts[1] = 0;
        // let limitLinePath: Path2D = this.mRenderLimitLines;
        // limitLinePath = new Path2D();
        for (let i = 0; i < limitLines.size(); i++) {
            let l: LimitLine = limitLines.get(i);
            if (!l.isEnabled())
                continue;
            c.save();
            this.renderLine(c, l);
            let label: string = l.getLabel();
            if (label) {
                this.mLimitLinePaint.setStyle(l.getTextStyle());
                this.mLimitLinePaint.setDashPathEffect(null);
                this.mLimitLinePaint.setColor(l.getTextColor());
                this.mLimitLinePaint.setFontFamily(l.getTypeface());
                this.mLimitLinePaint.setStrokeWidth(0.5);
                this.mLimitLinePaint.setTextSize(l.getTextSize());
                const labelLineHeight = Utils.calcTextHeight(this.mLimitLinePaint, label);
                let xOffset = 4 + l.getXOffset();
                let yOffset = l.getLineWidth() + labelLineHeight + l.getYOffset();
                const position: LimitLabelPosition = l.getLabelPosition();
                let paintStyle = this.mLimitLinePaint.getStyle();
                if (position == LimitLabelPosition.RIGHT_TOP) {
                    this.mLimitLinePaint.setTextAlign('right');
                    Utils.resetContext2DStyle(c, this.mLimitLinePaint);
                    switch (paintStyle) {
                        case Style.STROKE:
                            c.beginPath();
                            c.strokeText(label, (this.mViewPortHandler ? this.mViewPortHandler.contentRight() : 0) - xOffset, pts[1] - yOffset + labelLineHeight);
                            c.closePath();
                            break;
                        case Style.FILL:
                        case Style.FILL_AND_STROKE:
                        default:
                            c.beginPath();
                            c.fillText(label, (this.mViewPortHandler ? this.mViewPortHandler.contentRight() : 0) - xOffset, pts[1] - yOffset + labelLineHeight);
                            c.closePath();
                            break;
                    }
                }
                else if (position == LimitLabelPosition.RIGHT_BOTTOM) {
                    this.mLimitLinePaint.setTextAlign('right');
                    Utils.resetContext2DStyle(c, this.mLimitLinePaint);
                    switch (paintStyle) {
                        case Style.STROKE:
                            c.beginPath();
                            c.strokeText(label, (this.mViewPortHandler ? this.mViewPortHandler.contentRight() : 0) - xOffset, pts[1] + yOffset - Utils.calcTextHeight(this.mLimitLinePaint, label) / 2);
                            c.closePath();
                            break;
                        case Style.FILL:
                        case Style.FILL_AND_STROKE:
                        default:
                            c.beginPath();
                            c.fillText(label, (this.mViewPortHandler ? this.mViewPortHandler.contentRight() : 0) - xOffset, pts[1] + yOffset - Utils.calcTextHeight(this.mLimitLinePaint, label) / 2);
                            c.closePath();
                            break;
                    }
                }
                else if (position == LimitLabelPosition.LEFT_TOP) {
                    this.mLimitLinePaint.setTextAlign('left');
                    Utils.resetContext2DStyle(c, this.mLimitLinePaint);
                    switch (paintStyle) {
                        case Style.STROKE:
                            c.beginPath();
                            c.strokeText(label, (this.mViewPortHandler ? this.mViewPortHandler.contentLeft() : 0) + xOffset, pts[1] - yOffset + labelLineHeight);
                            c.closePath();
                            break;
                        case Style.FILL:
                        case Style.FILL_AND_STROKE:
                        default:
                            c.beginPath();
                            c.fillText(label, (this.mViewPortHandler ? this.mViewPortHandler.contentLeft() : 0) + xOffset, pts[1] - yOffset + labelLineHeight);
                            c.closePath();
                            break;
                    }
                }
                else {
                    this.mLimitLinePaint.setTextAlign('left');
                    Utils.resetContext2DStyle(c, this.mLimitLinePaint);
                    switch (paintStyle) {
                        case Style.STROKE:
                            c.beginPath();
                            c.strokeText(label, (this.mViewPortHandler ? this.mViewPortHandler.contentLeft() : 0) + xOffset, pts[1] + yOffset - Utils.calcTextHeight(this.mLimitLinePaint, label) / 2);
                            c.closePath();
                            break;
                        case Style.FILL:
                        case Style.FILL_AND_STROKE:
                        default:
                            c.beginPath();
                            c.fillText(label, (this.mViewPortHandler ? this.mViewPortHandler.contentLeft() : 0) + xOffset, pts[1] + yOffset - Utils.calcTextHeight(this.mLimitLinePaint, label) / 2);
                            c.closePath();
                            break;
                    }
                }
            }
            c.restore();
            // if (this.mAxisLinePaint) {
            //   let interval = ((this.mAxisLinePaint as LinePaint).endPoint[1] - (this.mAxisLinePaint as LinePaint).startPoint[1]);
            //   if ( this.mAxis && this.mViewPortHandler) {
            //     let offset = interval - interval * ((l.getLimit()- this.mAxis.mAxisMinimum) / (this.mAxis.mAxisMaximum - this.mAxis.mAxisMinimum));
            //     pts[1]  = offset + this.mViewPortHandler.offsetTop();
            //
            //     limitLinePath = "M"+Utils.convertDpToPixel((this.mAxisLinePaint as LinePaint).startPoint[0])+" "+Utils.convertDpToPixel(pts[1])+" L"+Utils.convertDpToPixel(this.mViewPortHandler.contentRight())+" "+Utils.convertDpToPixel(pts[1]);
            //
            //     (newPathLine as PathPaint).setCommands(limitLinePath)
            //     limitLinePath = "";
            //
            //   }
            //   paints.push(newPathLine)
            //
            //   let label: string = l.getLabel();
            //   //
            //   // if drawing the limit-value label is enabled
            //   if (label != null && label != "") {
            //
            //     let textPaint:TextPaint = new TextPaint();
            //     textPaint.set(this.mLimitLinePaint);
            //     textPaint.setStyle(l.getTextStyle());
            //     textPaint.setDashPathEffect(null);
            //     textPaint.setColor(l.getTextColor());
            //     textPaint.setTypeface(l.getTypeface());
            //     textPaint.setStrokeWidth(0.5);
            //     textPaint.setTextSize(l.getTextSize());
            //
            //     const labelLineHeight: number = Utils.calcTextHeight(textPaint, label);
            //     let xOffset: number = Utils.calcTextWidth(textPaint,l.getLabel()) + l.getXOffset() + 4;
            //     let yOffset: number = l.getLineWidth() + labelLineHeight + l.getYOffset();
            //
            //     const position: LimitLabelPosition = l.getLabelPosition();
            //
            //     if (position == LimitLabelPosition.RIGHT_TOP) {
            //
            //       textPaint.setTextAlign(TextAlign.End);
            //       textPaint.setText(label);
            //       if (this.mViewPortHandler) {
            //         textPaint.setX(this.mViewPortHandler.contentRight() - xOffset);
            //       }
            //       textPaint.setY(pts[1] - yOffset);
            //       paints.push(textPaint);
            //
            //     } else if (position == LimitLabelPosition.RIGHT_BOTTOM) {
            //
            //       textPaint.setTextAlign(TextAlign.End);
            //       textPaint.setText(label);
            //       if (this.mViewPortHandler) {
            //         textPaint.setX(this.mViewPortHandler.contentRight() - xOffset);
            //       }
            //       textPaint.setY(pts[1] + l.getYOffset());
            //       paints.push(textPaint);
            //
            //     } else if (position == LimitLabelPosition.LEFT_TOP) {
            //
            //       textPaint.setTextAlign(TextAlign.Start);
            //       textPaint.setText(label);
            //       if (this.mViewPortHandler) {
            //         textPaint.setX(this.mViewPortHandler.contentLeft() + xOffset);
            //       }
            //       textPaint.setY(pts[1] - yOffset);
            //       paints.push(textPaint);
            //
            //     } else {
            //
            //       textPaint.setTextAlign(TextAlign.Start);
            //       textPaint.setText(label);
            //       if (this.mViewPortHandler) {
            //         textPaint.setX(this.mViewPortHandler.offsetLeft() + xOffset);
            //       }
            //       textPaint.setY(pts[1] + l.getYOffset());
            //       paints.push(textPaint);
            //     }
            //   }
            // }
        }
        // return paints;
    }
}
