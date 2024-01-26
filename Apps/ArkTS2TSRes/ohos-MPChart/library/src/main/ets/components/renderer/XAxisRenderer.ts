let __generate__Id: number = 0;
function generateId(): string {
    return "XAxisRenderer_" + ++__generate__Id;
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
import AxisRenderer from './AxisRenderer';
import { XAxis, XAxisPosition } from '../components/XAxis';
import ViewPortHandler from '../utils/ViewPortHandler';
import Transformer from '../utils/Transformer';
import Utils from '../utils/Utils';
import FSize from '../utils/FSize';
import MPPointF from '../utils/MPPointF';
import MPPointD from '../utils/MPPointD';
import LimitLine, { LimitLabelPosition } from '../components/LimitLine';
import { JArrayList } from '../utils/JArrayList';
import MyRect from '../data/Rect';
import { Style } from '../data/Paint';
export default class XAxisRenderer extends AxisRenderer {
    protected mXAxis: XAxis | null = null;
    constructor(viewPortHandler: ViewPortHandler, xAxis: XAxis, trans?: Transformer) {
        super(viewPortHandler, xAxis, trans);
        this.mXAxis = xAxis;
        if (this.mAxisLabelPaint) {
            this.mAxisLabelPaint.setColor(Color.Black);
            this.mAxisLabelPaint.setTextAlign('center');
            this.mAxisLabelPaint.setTextSize(vp2px(10));
        }
    }
    protected setupGridPaint() {
        if (this.mGridPaint && this.mAxis && this.mXAxis) {
            this.mGridPaint.setColor(this.mXAxis.getGridColor());
            this.mGridPaint.setStrokeWidth(this.mXAxis.getGridLineWidth());
            let dashPathEffect = this.mAxis.getGridDashPathEffect();
            this.mGridPaint.setDashPathEffect(dashPathEffect);
        }
    }
    public computeAxis(min: number, max: number, inverted: boolean) {
        // calculate the starting and entry point of the y-labels (depending on
        // zoom / contentrect bounds)
        if (!this.mViewPortHandler || !this.mTrans) {
            return;
        }
        if (this.mViewPortHandler.contentWidth() > 10 && !this.mViewPortHandler.isFullyZoomedOutX()) {
            let p1: MPPointD | undefined = this.mTrans?.getValuesByTouchPoint(this.mViewPortHandler.contentLeft(), this.mViewPortHandler.contentTop());
            let p2: MPPointD | undefined = this.mTrans?.getValuesByTouchPoint(this.mViewPortHandler.contentRight(), this.mViewPortHandler.contentTop());
            if (!!p1 && !!p2) {
                if (inverted) {
                    min = p2.x;
                    max = p1.x;
                }
                else {
                    min = p1.x;
                    max = p2.x;
                }
                MPPointD.recycleInstance(p1);
                MPPointD.recycleInstance(p2);
            }
        }
        this.computeAxisValues(min, max);
    }
    //     @Override
    protected computeAxisValues(min: number, max: number) {
        super.computeAxisValues(min, max);
        this.computeSize();
    }
    protected computeSize() {
        if (!this.mAxis || !this.mXAxis) {
            return;
        }
        let longest: string = this.mXAxis.getLongestLabel();
        if (this.mAxisLabelPaint) {
            this.mAxisLabelPaint.setFontFamily(this.mXAxis.getTypeface());
            this.mAxisLabelPaint.setTextSize(this.mXAxis.getTextSize());
            let labelSize: FSize = Utils.calcTextSize(this.mAxisLabelPaint, longest);
            let labelWidth = labelSize.width;
            let labelHeight = Utils.calcTextHeight(this.mAxisLabelPaint, "Q");
            let labelRotatedSize: FSize = Utils.getSizeOfRotatedRectangleByDegrees(labelWidth, labelHeight, this.mXAxis.getLabelRotationAngle());
            this.mXAxis.mLabelWidth = Math.round(labelWidth);
            this.mXAxis.mLabelHeight = Math.round(labelHeight);
            this.mXAxis.mLabelRotatedWidth = Math.round(labelRotatedSize.width);
            this.mXAxis.mLabelRotatedHeight = Math.round(labelRotatedSize.height);
            FSize.recycleInstance(labelRotatedSize);
            FSize.recycleInstance(labelSize);
        }
    }
    public renderAxisLabels(c: CanvasRenderingContext2D): void {
        if (!this.mXAxis || !this.mViewPortHandler) {
            return;
        }
        if (!this.mXAxis.isEnabled() || !this.mXAxis.isDrawLabelsEnabled())
            return;
        let yoffset = this.mXAxis.getYOffset();
        if (this.mAxisLabelPaint) {
            this.mAxisLabelPaint.setFontFamily(this.mXAxis.getTypeface());
            this.mAxisLabelPaint.setTextSize(this.mXAxis.getTextSize());
            this.mAxisLabelPaint.setColor(this.mXAxis.getTextColor());
        }
        let pointF: MPPointF = MPPointF.getInstance(0, 0);
        if (this.mXAxis.getPosition() == XAxisPosition.TOP) {
            pointF.x = 0.5;
            pointF.y = 1.0;
            this.drawLabels(c, this.mViewPortHandler.contentTop() - yoffset - this.mXAxis.mLabelRotatedHeight / 2, pointF);
        }
        else if (this.mXAxis.getPosition() == XAxisPosition.TOP_INSIDE) {
            pointF.x = 0.5;
            pointF.y = 1.0;
            this.drawLabels(c, this.mViewPortHandler.contentTop() + yoffset + this.mXAxis.mLabelRotatedHeight / 2, pointF);
        }
        else if (this.mXAxis.getPosition() == XAxisPosition.BOTTOM) {
            pointF.x = 0.5;
            pointF.y = 0.0;
            this.drawLabels(c, this.mViewPortHandler.contentBottom() + yoffset + this.mXAxis.mLabelRotatedHeight / 2, pointF);
        }
        else if (this.mXAxis.getPosition() == XAxisPosition.BOTTOM_INSIDE) {
            pointF.x = 0.5;
            pointF.y = 0.0;
            this.drawLabels(c, this.mViewPortHandler.contentBottom() - yoffset - this.mXAxis.mLabelRotatedHeight / 2, pointF);
        }
        else { // BOTH SIDED
            pointF.x = 0.5;
            pointF.y = 1.0;
            this.drawLabels(c, this.mViewPortHandler.contentTop() - yoffset - this.mXAxis.mLabelRotatedHeight / 2, pointF);
            pointF.x = 0.5;
            pointF.y = 0.0;
            this.drawLabels(c, this.mViewPortHandler.contentBottom() + yoffset + this.mXAxis.mLabelRotatedHeight / 2, pointF);
        }
        MPPointF.recycleInstance(pointF);
    }
    public renderAxisLine(c: CanvasRenderingContext2D): void {
        if (!this.mAxisLinePaint || !this.mViewPortHandler || !this.mXAxis || !this.mXAxis.isDrawAxisLineEnabled() || !this.mXAxis.isEnabled())
            return;
        this.mAxisLinePaint.setColor(this.mXAxis.getAxisLineColor());
        this.mAxisLinePaint.setStrokeWidth(this.mXAxis.getAxisLineWidth());
        this.mAxisLinePaint.setDashPathEffect(this.mXAxis.getAxisLineDashPathEffect());
        // 重置更新Context上下文样式
        Utils.resetContext2DStyle(c, this.mAxisLinePaint);
        let left = this.mViewPortHandler.contentLeft();
        let top = this.mViewPortHandler.contentTop();
        let right = this.mViewPortHandler.contentRight();
        let bottom = this.mViewPortHandler.contentBottom();
        if (this.mXAxis.getPosition() == XAxisPosition.TOP
            || this.mXAxis.getPosition() == XAxisPosition.TOP_INSIDE
            || this.mXAxis.getPosition() == XAxisPosition.BOTH_SIDED) {
            c.beginPath();
            c.moveTo(left, top);
            c.lineTo(right, top);
            c.stroke();
            c.closePath();
        }
        if (this.mXAxis.getPosition() == XAxisPosition.BOTTOM
            || this.mXAxis.getPosition() == XAxisPosition.BOTTOM_INSIDE
            || this.mXAxis.getPosition() == XAxisPosition.BOTH_SIDED) {
            c.beginPath();
            c.moveTo(left, bottom);
            c.lineTo(right, bottom);
            c.stroke();
            c.closePath();
        }
    }
    /**
     * draws the x-labels on the specified y-position
     *
     * @param pos
     */
    protected drawLabels(c: CanvasRenderingContext2D, pos: number, anchor: MPPointF): void {
        if (!this.mXAxis) {
            return;
        }
        let labelRotationAngleDegrees = this.mXAxis.getLabelRotationAngle();
        let centeringEnabled = this.mXAxis.isCenterAxisLabelsEnabled();
        let positions: number[] = new Array<number>(this.mXAxis.mEntryCount * 2);
        for (let i = 0; i < positions.length; i += 2) {
            // only fill x values
            if (centeringEnabled) {
                positions[i] = this.mXAxis.mCenteredEntries[i / 2];
            }
            else {
                positions[i] = this.mXAxis.mEntries[i / 2];
            }
        }
        if (this.mTrans) {
            this.mTrans.pointValuesToPixel(positions);
        }
        // let labelPaint:Paint[] = new Array();
        for (let i = 0; i < positions.length; i += 2) {
            let x = positions[i];
            // if (this.mViewPortHandler && this.mViewPortHandler.isInBoundsX(this.getXRelativeValue(x)/this.getAxisPercent())) {
            if (this.mViewPortHandler && this.mViewPortHandler.isInBoundsX(x)) {
                let label = this.mXAxis.getValueFormatter().getFormattedValue(this.mXAxis.mEntries[i / 2], this.mXAxis);
                if (this.mXAxis.isAvoidFirstLastClippingEnabled()) {
                    // avoid clipping of the last
                    if (i / 2 == this.mXAxis.mEntryCount - 1 && this.mXAxis.mEntryCount > 1) {
                        let width = Utils.calcTextWidth(this.mAxisLabelPaint, label);
                        if (width > this.mViewPortHandler.offsetRight() * 2
                            && x + width > this.mViewPortHandler.getChartWidth())
                            x -= width / 2;
                        // avoid clipping of the first
                    }
                    else if (i == 0) {
                        let width = Utils.calcTextWidth(this.mAxisLabelPaint, label);
                        x += width / 2;
                    }
                }
                this.drawLabel(c, label, x, pos, anchor, labelRotationAngleDegrees);
            }
            // if (this.mAxis && this.mXAxis){
            //   if(x-this.mAxis.getAxisMinimum()==0){
            //     let label = this.mXAxis.getValueFormatter().getFormattedValue(this.mXAxis.mEntries[i / 2], this.mXAxis);
            //     if(this.drawLabel(label, x, pos, anchor, labelRotationAngleDegrees)){
            //       labelPaint.push(this.drawLabel(label, x, pos, anchor, labelRotationAngleDegrees)!);
            //     }
            //   }
            // }
        }
        // return labelPaint;
    }
    protected drawLabel(c: CanvasRenderingContext2D, formattedLabel: string, x: number, y: number, anchor: MPPointF, angleDegrees: number): void {
        Utils.drawXAxisValue(c, formattedLabel, x, y, this.mAxisLabelPaint, anchor, angleDegrees);
        // if (this.mAxisLabelPaint && this.mXAxis) {
        //   let xResult=this.calcXLeftOffset(x);
        //   let labelPaint=new TextPaint(this.mAxisLabelPaint as TextPaint);
        //   return Utils.drawXAxisValue(formattedLabel, xResult, y,labelPaint , anchor, angleDegrees, this.mXAxis.getXCenterOffset());
        // }
        // return null;
    }
    // protected mRenderGridLinesPath: Path2D = new Path2D();
    protected mRenderGridLinesBuffer: number[] = new Array(2);
    public renderGridLines(c: CanvasRenderingContext2D): void {
        if (!this.mAxis || !this.mXAxis || !this.mXAxis.isDrawGridLinesEnabled() || !this.mXAxis.isEnabled()) {
            return;
        }
        c.save();
        c.beginPath();
        let clippingRect = this.getGridClippingRect();
        c.rect(clippingRect.left, clippingRect.top, clippingRect.width(), clippingRect.height());
        c.closePath();
        c.clip();
        // if (this.mGridPaint) {
        //   this.mGridPaint.setColor(this.mXAxis.getGridColor());
        //   this.mGridPaint.setStrokeWidth(this.mXAxis.getGridLineWidth());
        //   let dashPathEffect = this.mXAxis.getGridDashPathEffect();
        //   if (dashPathEffect) {
        //     this.mGridPaint.setDashPathEffect(dashPathEffect);
        //   }
        // }
        if (this.mRenderGridLinesBuffer.length != this.mAxis.mEntryCount * 2) {
            this.mRenderGridLinesBuffer = new Array<number>(this.mXAxis.mEntryCount * 2);
        }
        let positions: number[] = this.mRenderGridLinesBuffer;
        for (let i = 0; i < positions.length; i += 2) {
            positions[i] = this.mXAxis.mEntries[i / 2];
            positions[i + 1] = this.mXAxis.mEntries[i / 2];
        }
        if (this.mTrans) {
            this.mTrans.pointValuesToPixel(positions);
        }
        this.setupGridPaint();
        for (let i = 0; i < positions.length; i += 2) {
            this.drawGridLine(c, positions[i], positions[i + 1]);
        }
        c.restore();
    }
    protected mGridClippingRect: MyRect = new MyRect();
    public getGridClippingRect(): MyRect {
        if (this.mViewPortHandler) {
            this.mGridClippingRect.set(this.mViewPortHandler.getContentRect().left, this.mViewPortHandler.getContentRect().top, this.mViewPortHandler.getContentRect().right, this.mViewPortHandler.getContentRect().bottom);
        }
        if (this.mAxis) {
            this.mGridClippingRect.inset(-this.mAxis.getGridLineWidth(), 0, -this.mAxis.getGridLineWidth(), 0);
        }
        return this.mGridClippingRect;
    }
    /**
     * Draws the grid line at the specified position using the provided path.
     *
     * @param c
     * @param x
     * @param y
     * @param gridLinePath
     */
    protected drawGridLine(c: CanvasRenderingContext2D, x: number, y: number): void {
        Utils.resetContext2DStyle(c, this.mGridPaint);
        c.beginPath();
        c.moveTo(x, (this.mViewPortHandler ? this.mViewPortHandler.contentBottom() : 0));
        c.lineTo(x, (this.mViewPortHandler ? this.mViewPortHandler.contentTop() : 0));
        c.stroke();
        c.closePath();
        // let xResult:number=this.calcXLeftOffset(x)
        // if (this.mViewPortHandler) {
        //   path="M"+Utils.convertDpToPixel(xResult)+" "+Utils.convertDpToPixel(this.mViewPortHandler.contentBottom())+"L"+Utils.convertDpToPixel(xResult)+" "+Utils.convertDpToPixel(this.mViewPortHandler.contentTop())
        // }
        // let pathPaint:PathPaint=new PathPaint(this.mGridPaint as PathPaint);
        // pathPaint.setCommands(path);
        // return pathPaint
    }
    protected mRenderLimitLinesBuffer = new Array<number>(2);
    protected mLimitLineClippingRect = new MyRect();
    private renderLinesInner(c: CanvasRenderingContext2D, lines: JArrayList<LimitLine>) {
        if (!this.mXAxis || !this.mAxis) {
            return;
        }
        if (!lines || lines.size() <= 0)
            return;
        let position = this.mRenderLimitLinesBuffer;
        position[0] = 0;
        position[1] = 0;
        for (let i = 0; i < lines.size(); i++) {
            let l: LimitLine = lines.get(i);
            if (!l.isEnabled()) {
                continue;
            }
            c.save();
            if (this.mViewPortHandler) {
                this.mLimitLineClippingRect.set(this.mViewPortHandler.getContentRect()
                    .left, this.mViewPortHandler.getContentRect().top, this.mViewPortHandler.getContentRect().right, this.mViewPortHandler.getContentRect().bottom);
            }
            if (this.mAxis) {
                this.mGridClippingRect.inset(-this.mAxis.getGridLineWidth(), 0, -this.mAxis.getGridLineWidth(), 0);
            }
            position[0] = l.getLimit();
            position[1] = 0;
            if (this.mTrans) {
                this.mTrans.pointValuesToPixel(position);
            }
            this.renderLimitLineLine(c, l, position);
            this.renderLimitLineLabel(c, l, position, 2 + l.getYOffset());
            c.restore();
        }
    }
    /**
     * render custom grid lines.
     *
     * @param c
     */
    public renderCustomGridLines(c: CanvasRenderingContext2D) {
        let gridLines = this.mXAxis?.getGridLines();
        gridLines && this.renderLinesInner(c, gridLines);
    }
    /**
     * return the LimitLines draw data.
     *
     * @param c
     */
    public renderLimitLines(c: CanvasRenderingContext2D): void {
        let limitLines = this.mXAxis?.getLimitLines();
        limitLines && this.renderLinesInner(c, limitLines);
    }
    public mLimitLineSegmentsBuffer: number[] = new Array<number>(4);
    // private mLimitLinePath: Path2D = new Path2D();
    public renderLimitLineLine(c: CanvasRenderingContext2D, limitLine: LimitLine, position: number[]): void {
        // let leftXResult = this.calcXLeftOffset(position[0])
        this.mLimitLineSegmentsBuffer[0] = position[0];
        this.mLimitLineSegmentsBuffer[1] = this.mViewPortHandler ? this.mViewPortHandler.contentTop() : 0;
        this.mLimitLineSegmentsBuffer[2] = position[0];
        this.mLimitLineSegmentsBuffer[3] = this.mViewPortHandler ? this.mViewPortHandler.contentBottom() : 0;
        // this.mLimitLinePath = new Path2D();
        if (this.mLimitLinePaint) {
            this.mLimitLinePaint.setStyle(Style.STROKE);
            this.mLimitLinePaint.setColor(limitLine.getLineColor());
            this.mLimitLinePaint.setStrokeWidth(limitLine.getLineWidth());
            let dashPathEffect = limitLine.getDashPathEffect();
            if (dashPathEffect) {
                this.mLimitLinePaint.setDashPathEffect(dashPathEffect);
            }
            Utils.resetContext2DStyle(c, this.mLimitLinePaint);
            c.beginPath();
            c.moveTo(this.mLimitLineSegmentsBuffer[0], this.mLimitLineSegmentsBuffer[1]);
            c.lineTo(this.mLimitLineSegmentsBuffer[2], this.mLimitLineSegmentsBuffer[3]);
            c.stroke();
            c.closePath();
            // let path: string = "M" + Utils.convertDpToPixel(this.mLimitLineSegmentsBuffer[0]) + " " + Utils.convertDpToPixel(this.mLimitLineSegmentsBuffer[1]) + "L" + Utils.convertDpToPixel(this.mLimitLineSegmentsBuffer[2]) + " " + Utils.convertDpToPixel(this.mLimitLineSegmentsBuffer[3])
            // let pathPaint: PathPaint = new PathPaint(this.mLimitLinePaint as PathPaint);
            // pathPaint.setCommands(path);
            // return pathPaint;
        }
        // return null;
    }
    public renderLimitLineLabel(c: CanvasRenderingContext2D, limitLine: LimitLine, position: number[], yOffset: number): void {
        let label: string = limitLine.getLabel();
        // if drawing the limit-value label is enabled
        if (label && label.length > 0) {
            if (this.mLimitLinePaint) {
                this.mLimitLinePaint.setStyle(limitLine.getTextStyle());
                this.mLimitLinePaint.setDashPathEffect(null);
                this.mLimitLinePaint.setColor(limitLine.getTextColor());
                this.mLimitLinePaint.setStrokeWidth(0.5);
                this.mLimitLinePaint.setTextSize(limitLine.getTextSize());
            }
            let xOffset = limitLine.getLineWidth() + limitLine.getXOffset();
            let labelPosition: LimitLabelPosition = limitLine.getLabelPosition();
            let paintStyle = this.mLimitLinePaint.getStyle();
            if (labelPosition == LimitLabelPosition.RIGHT_TOP) {
                const labelLineHeight = Utils.calcTextHeight(this.mLimitLinePaint, label);
                this.mLimitLinePaint.setTextAlign('left');
                Utils.resetContext2DStyle(c, this.mLimitLinePaint);
                switch (paintStyle) {
                    case Style.STROKE:
                        c.beginPath();
                        c.strokeText(label, position[0] + xOffset, (this.mViewPortHandler ? this.mViewPortHandler.contentTop() : 0) + yOffset + labelLineHeight);
                        c.closePath();
                        break;
                    case Style.FILL:
                    case Style.FILL_AND_STROKE:
                    default:
                        c.beginPath();
                        c.fillText(label, position[0] + xOffset, (this.mViewPortHandler ? this.mViewPortHandler.contentTop() : 0) + yOffset + labelLineHeight);
                        c.closePath();
                        break;
                }
                // textPaint.setTextAlign(TextAlign.Start);
                // textPaint.x=this.calcXLeftOffset(position[0])+xOffset;
                // textPaint.y=this.mViewPortHandler?this.mViewPortHandler.contentTop():0+yOffset
            }
            else if (labelPosition == LimitLabelPosition.RIGHT_BOTTOM) {
                this.mLimitLinePaint.setTextAlign('left');
                Utils.resetContext2DStyle(c, this.mLimitLinePaint);
                switch (paintStyle) {
                    case Style.STROKE:
                        c.beginPath();
                        c.strokeText(label, position[0] + xOffset, (this.mViewPortHandler ? this.mViewPortHandler.contentBottom() : 0) - yOffset);
                        c.closePath();
                        break;
                    case Style.FILL:
                    case Style.FILL_AND_STROKE:
                    default:
                        c.beginPath();
                        c.fillText(label, position[0] + xOffset, (this.mViewPortHandler ? this.mViewPortHandler.contentBottom() : 0) - yOffset);
                        c.closePath();
                        break;
                }
                // if (this.mLimitLinePaint) {
                //   let labelLineHeight = Utils.calcTextHeight(this.mLimitLinePaint, label);
                //   textPaint.setTextAlign(TextAlign.Start);
                //   textPaint.x=this.calcXLeftOffset(position[0])+xOffset;
                //   textPaint.y=this.mViewPortHandler?this.mViewPortHandler.contentBottom():0-yOffset-labelLineHeight;
                // }
            }
            else if (labelPosition == LimitLabelPosition.LEFT_TOP) {
                this.mLimitLinePaint.setTextAlign('right');
                const labelLineHeight = Utils.calcTextHeight(this.mLimitLinePaint, label);
                Utils.resetContext2DStyle(c, this.mLimitLinePaint);
                switch (paintStyle) {
                    case Style.STROKE:
                        c.beginPath();
                        c.strokeText(label, position[0] - xOffset, this.mViewPortHandler ? this.mViewPortHandler.contentTop() : 0 + yOffset + labelLineHeight);
                        c.closePath();
                        break;
                    case Style.FILL:
                    case Style.FILL_AND_STROKE:
                    default:
                        c.beginPath();
                        c.fillText(label, position[0] - xOffset, this.mViewPortHandler ? this.mViewPortHandler.contentTop() : 0 + yOffset + labelLineHeight);
                        c.closePath();
                        break;
                }
                // textPaint.setTextAlign(TextAlign.End);
                // let labelLineWidth = Utils.calcTextWidth(this.mLimitLinePaint, label);
                // textPaint.x=this.calcXLeftOffset(position[0])-xOffset-labelLineWidth;
                // textPaint.y=this.mViewPortHandler?this.mViewPortHandler.contentTop():0+yOffset;
            }
            else {
                this.mLimitLinePaint.setTextAlign('right');
                Utils.resetContext2DStyle(c, this.mLimitLinePaint);
                switch (paintStyle) {
                    case Style.STROKE:
                        c.beginPath();
                        c.strokeText(label, position[0] - xOffset, (this.mViewPortHandler ? this.mViewPortHandler.contentBottom() : 0) - yOffset);
                        c.closePath();
                        break;
                    case Style.FILL:
                    case Style.FILL_AND_STROKE:
                    default:
                        c.beginPath();
                        c.fillText(label, position[0] - xOffset, (this.mViewPortHandler ? this.mViewPortHandler.contentBottom() : 0) - yOffset);
                        c.closePath();
                        break;
                }
                // textPaint.setTextAlign(TextAlign.End);
                // let labelLineWidth = Utils.calcTextWidth(this.mLimitLinePaint, label);
                // let labelLineHeight = Utils.calcTextHeight(this.mLimitLinePaint, label);
                // textPaint.x=this.calcXLeftOffset(position[0])-xOffset-labelLineWidth;
                // textPaint.y=this.mViewPortHandler?this.mViewPortHandler.contentBottom():0-yOffset-labelLineHeight;
                //                c.drawText(label, position[0] - xOffset, mViewPortHandler.contentBottom() - yOffset, mLimitLinePaint);
            }
            // return  textPaint;
        }
        // return null;
    }
}
