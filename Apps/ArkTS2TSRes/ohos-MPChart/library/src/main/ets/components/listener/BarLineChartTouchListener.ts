let __generate__Id: number = 0;
function generateId(): string {
    return "BarLineChartTouchListener_" + ++__generate__Id;
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
import Highlight from '../highlight/Highlight';
import ViewPortHandler from '../utils/ViewPortHandler';
import MPPointF from '../utils/MPPointF';
import Matrix from '../utils/Matrix';
import ChartTouchListener, { ChartGesture } from './ChartTouchListener';
import BarLineChartBase from '../charts/BarLineChartBaseModel';
import IDataSet from '../interfaces/datasets/IDataSet';
import Utils from '../utils/Utils';
import OnChartGestureListener from './OnChartGestureListener';
// import HorizontalBarChart from '../charts/HorizontalBarChart'
import BarLineScatterCandleBubbleData from '../data/BarLineScatterCandleBubbleData';
import IBarLineScatterCandleBubbleDataSet from '../interfaces/datasets/IBarLineScatterCandleBubbleDataSet';
import EntryOhos from '../data/EntryOhos';
/**
 * TouchListener for Bar-, Line-, Scatter- and CandleStickChart with handles all
 * touch interaction. Longpress == Zoom out. Double-Tap == Zoom in.
 *
 * @author Philipp Jahoda
 */
export default class BarLineChartTouchListener extends ChartTouchListener<BarLineChartBase<BarLineScatterCandleBubbleData<IBarLineScatterCandleBubbleDataSet<EntryOhos>>>> {
    /**
     * the original touch-matrix from the chart
     */
    private mMatrix: Matrix = new Matrix();
    /**
     * matrix for saving the original matrix state
     */
    private mSavedMatrix: Matrix = new Matrix();
    /**
     * point where the touch action started
     */
    private mTouchStartPoint: MPPointF = MPPointF.getInstance(0, 0);
    /**
     * center between two pointers (fingers on the display)
     */
    private mTouchPointCenter: MPPointF = MPPointF.getInstance(0, 0);
    private mSavedXDist: number = 1.0;
    private mSavedYDist: number = 1.0;
    private mSavedDist: number = 1.0;
    private mClosestDataSetToTouch: IDataSet<EntryOhos> | null = null;
    /**
     * used for tracking velocity of dragging
     */
    //  private mVelocityTracker: VelocityTracker;
    private mDecelerationLastTime: number = 0;
    private mDecelerationCurrentPoint: MPPointF = MPPointF.getInstance(0, 0);
    private mDecelerationVelocity: MPPointF = MPPointF.getInstance(0, 0);
    /**
     * the distance of movement that will be counted as a drag
     */
    private mDragTriggerDist: number = 0.0;
    /**
     * the minimum distance between the pointers that will trigger a zoom gesture
     */
    private mMinScalePointerDistance: number = 0.0;
    /**
     * Constructor with initialization parameters.
     *
     * @param chart               instance of the chart
     * @param touchMatrix         the touch-matrix of the chart
     * @param dragTriggerDistance the minimum movement distance that will be interpreted as a "drag" gesture in dp (3dp equals
     *                            to about 9 pixels on a 5.5" FHD screen)
     */
    constructor(chart: BarLineChartBase<BarLineScatterCandleBubbleData<IBarLineScatterCandleBubbleDataSet<EntryOhos>>>, touchMatrix: Matrix, dragTriggerDistance: number) {
        super(chart);
        this.mMatrix = touchMatrix;
        this.mDragTriggerDist = Utils.convertDpToPixel(dragTriggerDistance);
        this.mMinScalePointerDistance = Utils.convertDpToPixel(3.5);
    }
    public onTouch(event: TouchEvent) {
        // Handle touch events here...
        switch (event.type & 255) {
            case TouchType.Down:
                this.actionDown(true, event);
                break;
            case TouchType.Move:
                this.actionMove(true, event);
                break;
            case TouchType.Up:
                this.actionUp(true, event);
                break;
            case TouchType.Cancel:
                this.actionUp(true, event);
                break;
        }
    }
    actionDown(isTouchEvent: boolean, event: TouchEvent | GestureEvent) {
        if (!this.mChart.isDragEnabled() && (!this.mChart.isScaleXEnabled() && !this.mChart.isScaleYEnabled())) {
            return;
        }
        this.startAction(isTouchEvent, event);
        this.stopDeceleration();
        this.saveTouchStart(isTouchEvent, event);
        // perform the transformation, update the chart
        this.mMatrix = this.mChart.getViewPortHandler().refresh(this.mMatrix, this.mChart, true);
    }
    actionPinchDown(isTouchEvent: boolean, event: TouchEvent | GestureEvent) {
        if (!event) {
            return;
        }
        let gestureFingersCount: number = 1;
        if (isTouchEvent) {
            event = event as TouchEvent;
            if (!event.touches || event.touches.length == 0 || !event.touches[0]) {
                return;
            }
            gestureFingersCount = event.touches.length;
        }
        else {
            event = event as GestureEvent;
            if (!event.fingerList || event.fingerList.length == 0 || !event.fingerList[0]) {
                return;
            }
            gestureFingersCount = event.fingerList.length;
        }
        if (gestureFingersCount >= 2) {
            this.mChart.disableScroll();
            this.saveTouchStart(true, event);
            // get the distance between the pointers on the x-axis
            this.mSavedXDist = BarLineChartTouchListener.getXDist(isTouchEvent, event);
            // get the distance between the pointers on the y-axis
            this.mSavedYDist = BarLineChartTouchListener.getYDist(isTouchEvent, event);
            // get the total distance between the pointers
            this.mSavedDist = BarLineChartTouchListener.spacing(isTouchEvent, event);
            if (this.mSavedDist > 10) {
                if (this.mChart.isPinchZoomEnabled()) {
                    this.mTouchMode = ChartTouchListener.PINCH_ZOOM;
                }
                else {
                    if (this.mChart.isScaleXEnabled() != this.mChart.isScaleYEnabled()) {
                        this.mTouchMode = this.mChart.isScaleXEnabled() ? ChartTouchListener.X_ZOOM : ChartTouchListener.Y_ZOOM;
                    }
                    else {
                        this.mTouchMode = this.mSavedXDist > this.mSavedYDist ? ChartTouchListener.X_ZOOM : ChartTouchListener.Y_ZOOM;
                    }
                }
            }
            // determine the touch-pointer center
            BarLineChartTouchListener.midPoint(this.mTouchPointCenter, isTouchEvent, event);
        }
    }
    actionMove(isTouchEvent: boolean, event: TouchEvent | GestureEvent) {
        if (!event) {
            return;
        }
        let xCoordinate: number = 0;
        let yCoordinate: number = 0;
        if (isTouchEvent) {
            event = event as TouchEvent;
            if (!event.touches || event.touches.length == 0 || !event.touches[0]) {
                return;
            }
            xCoordinate = event.touches[0].x;
            yCoordinate = event.touches[0].y;
        }
        else {
            event = event as GestureEvent;
            if (!event.fingerList || event.fingerList.length == 0 || !event.fingerList[0]) {
                return;
            }
            xCoordinate = event.fingerList[0].localX;
            yCoordinate = event.fingerList[0].localY;
        }
        if (this.mTouchMode == ChartTouchListener.DRAG) {
            this.mChart.disableScroll();
            let x: number = this.mChart.isDragXEnabled() ? xCoordinate - this.mTouchStartPoint.x : 0;
            let y: number = this.mChart.isDragYEnabled() ? yCoordinate - this.mTouchStartPoint.y : 0;
            this.performDrag(isTouchEvent, event, x, y);
        }
        else if (this.mTouchMode == ChartTouchListener.X_ZOOM || this.mTouchMode == ChartTouchListener.Y_ZOOM || this.mTouchMode == ChartTouchListener.PINCH_ZOOM) {
            this.mChart.disableScroll();
            if (this.mChart.isScaleXEnabled() || this.mChart.isScaleYEnabled())
                this.performZoom(isTouchEvent, event);
        }
        else if (this.mTouchMode == ChartTouchListener.NONE
            && Math.abs(ChartTouchListener.distance(xCoordinate, this.mTouchStartPoint.x, yCoordinate, this.mTouchStartPoint.y)) > this.mDragTriggerDist) {
            if (this.mChart.isDragEnabled()) {
                let shouldPan: boolean = !this.mChart.isFullyZoomedOut() ||
                    !this.mChart.hasNoDragOffset();
                if (shouldPan) {
                    let distanceX: number = Math.abs(xCoordinate - this.mTouchStartPoint.x);
                    let distanceY: number = Math.abs(yCoordinate - this.mTouchStartPoint.y);
                    // Disable dragging in a direction that's disallowed
                    if ((this.mChart.isDragXEnabled() || distanceY >= distanceX) &&
                        (this.mChart.isDragYEnabled() || distanceY <= distanceX)) {
                        this.mLastGesture = ChartGesture.DRAG;
                        this.mTouchMode = ChartTouchListener.DRAG;
                    }
                }
                else {
                    if (this.mChart.isHighlightPerDragEnabled()) {
                        this.mLastGesture = ChartGesture.DRAG;
                        if (this.mChart.isHighlightPerDragEnabled())
                            this.performHighlightDrag(isTouchEvent, event);
                    }
                }
            }
        }
        // perform the transformation, update the chart
        this.mMatrix = this.mChart.getViewPortHandler().refresh(this.mMatrix, this.mChart, true);
    }
    actionUp(isTouchEvent: boolean, event: TouchEvent | GestureEvent) {
        if (!event) {
            return;
        }
        let gestureFingersCount: number = 1;
        let xCoordinate: number = 0;
        let yCoordinate: number = 0;
        if (isTouchEvent) {
            event = event as TouchEvent;
            if (!event.touches || event.touches.length == 0 || !event.touches[0]) {
                return;
            }
            xCoordinate = event.touches[0].x;
            yCoordinate = event.touches[0].y;
            gestureFingersCount = event.touches.length;
        }
        else {
            event = event as GestureEvent;
            if (!event.fingerList || event.fingerList.length == 0 || !event.fingerList[0]) {
                return;
            }
            xCoordinate = event.fingerList[0].localX;
            yCoordinate = event.fingerList[0].localY;
            gestureFingersCount = event.fingerList.length;
        }
        if (Math.abs(xCoordinate) > Utils.getMinimumFlingVelocity() ||
            Math.abs(yCoordinate) > Utils.getMinimumFlingVelocity()) {
            if (this.mTouchMode == ChartTouchListener.DRAG && this.mChart.isDragDecelerationEnabled()) {
                this.stopDeceleration();
                this.mDecelerationLastTime = new Date().getMilliseconds();
                this.mDecelerationCurrentPoint.x = xCoordinate;
                this.mDecelerationCurrentPoint.y = yCoordinate;
                //            this.mDecelerationVelocity.x = velocityX;
                //            this.mDecelerationVelocity.y = velocityY;
                //            Utils.postInvalidateOnAnimation(this.mChart); // This causes computeScroll to fire, recommended for this by
                // Google
            }
        }
        if (this.mTouchMode == ChartTouchListener.X_ZOOM ||
            this.mTouchMode == ChartTouchListener.Y_ZOOM ||
            this.mTouchMode == ChartTouchListener.PINCH_ZOOM ||
            this.mTouchMode == ChartTouchListener.POST_ZOOM) {
            // Range might have changed, which means that Y-axis labels
            // could have changed in size, affecting Y-axis size.
            // So we need to recalculate offsets.
            this.mChart.calculateOffsets();
            // this.mChart.postInvalidate();
        }
        if (this.mTouchMode == ChartTouchListener.NONE) {
            let h: Highlight | null = this.mChart.getHighlightByTouchPoint(xCoordinate, yCoordinate);
            if (this.mChart.isHighlightPerTapEnabled() && h) {
                this.performHighlight(h);
            }
            this.mChart.setLastGestureSingleTap();
            this.mLastGesture = ChartGesture.SINGLE_TAP;
            let l: OnChartGestureListener | null = this.mChart.getOnChartGestureListener();
            if (l != null) {
                l.onChartSingleTapped(isTouchEvent, event);
            }
        }
        this.mTouchMode = ChartTouchListener.NONE;
        this.mChart.enableScroll();
        this.endAction(isTouchEvent, event);
        if (gestureFingersCount >= 2) {
            // Utils.velocityTrackerPointerUpCleanUpIfNecessary(event, mVelocityTracker);
            this.mTouchMode = ChartTouchListener.POST_ZOOM;
        }
        // perform the transformation, update the chart
        this.mMatrix = this.mChart.getViewPortHandler().refresh(this.mMatrix, this.mChart, true);
    }
    actionPinchUp(isTouchEvent: boolean, event: TouchEvent | GestureEvent) {
        // Utils.velocityTrackerPointerUpCleanUpIfNecessary(event, mVelocityTracker);
        this.mTouchMode = ChartTouchListener.POST_ZOOM;
        // perform the transformation, update the chart
        this.mMatrix = this.mChart.getViewPortHandler().refresh(this.mMatrix, this.mChart, true);
    }
    actionCancel(isTouchEvent: boolean, event: TouchEvent | GestureEvent) {
        this.mTouchMode = ChartTouchListener.NONE;
        this.endAction(isTouchEvent, event);
        // perform the transformation, update the chart
        this.mMatrix = this.mChart.getViewPortHandler().refresh(this.mMatrix, this.mChart, true);
    }
    /**
     * ################ ################ ################ ################
     */
    /** BELOW CODE PERFORMS THE ACTUAL TOUCH ACTIONS */
    /**
     * Saves the current Matrix state and the touch-start point.
     *
     * @param event
     */
    private saveTouchStart(isTouchEvent: boolean, event: TouchEvent | GestureEvent) {
        this.mSavedMatrix.set(this.mMatrix);
        if (isTouchEvent) {
            let touch = event as TouchEvent;
            if (!touch.touches || touch.touches.length == 0 || !touch.touches[0]) {
                return;
            }
            this.mTouchStartPoint.x = touch.touches[0].x;
            this.mTouchStartPoint.y = touch.touches[0].y;
        }
        else {
            let gesture = event as GestureEvent;
            if (!gesture.fingerList || gesture.fingerList.length == 0 || !gesture.fingerList[0]) {
                return;
            }
            this.mTouchStartPoint.x = gesture.fingerList[0].globalX;
            this.mTouchStartPoint.y = gesture.fingerList[0].globalY;
        }
        this.mClosestDataSetToTouch = this.mChart.getDataSetByTouchPoint(this.mTouchStartPoint.x, this.mTouchStartPoint.y);
    }
    /**
     * Performs all necessary operations needed for dragging.
     *
     * @param event
     */
    private performDrag(isTouchEvent: boolean, event: TouchEvent | GestureEvent, distanceX: number, distanceY: number) {
        this.mLastGesture = ChartGesture.DRAG;
        this.mMatrix.set(this.mSavedMatrix);
        let l: OnChartGestureListener | null = this.mChart.getOnChartGestureListener();
        // check if axis is inverted
        if (this.inverted()) {
            // if there is an inverted horizontalbarchart
            // if (this.mChart instanceof HorizontalBarChart) {
            //   distanceX = -distanceX;
            // } else {
            distanceY = -distanceY;
            // }
        }
        this.mMatrix.postTranslate(distanceX, distanceY);
        if (l != null) {
            l.onChartTranslate(isTouchEvent, event, distanceX, distanceY);
        }
        this.mChart.invalidate();
    }
    /**
     * Performs the all operations necessary for pinch and axis zoom.
     *
     * @param event
     */
    private performZoom(isTouchEvent: boolean, event: TouchEvent | GestureEvent) {
        let gestureFingersCount: number = 1;
        if (isTouchEvent) {
            event = event as TouchEvent;
            gestureFingersCount = event.touches.length;
        }
        else {
            event = event as GestureEvent;
            gestureFingersCount = event.fingerList.length;
        }
        if (gestureFingersCount >= 2) { // two finger zoom
            let l: OnChartGestureListener | null = this.mChart.getOnChartGestureListener();
            // get the distance between the pointers of the touch event
            let totalDist: number = BarLineChartTouchListener.spacing(isTouchEvent, event);
            if (totalDist > this.mMinScalePointerDistance) {
                // get the translation
                let t: MPPointF = this.getTrans(this.mTouchPointCenter.x, this.mTouchPointCenter.y);
                let h: ViewPortHandler = this.mChart.getViewPortHandler();
                // take actions depending on the activated touch mode
                if (this.mTouchMode == ChartTouchListener.PINCH_ZOOM) {
                    this.mLastGesture = ChartGesture.PINCH_ZOOM;
                    let scale: number = totalDist / this.mSavedDist; // total scale
                    let isZoomingOut: boolean = (scale < 1);
                    let canZoomMoreX: boolean = isZoomingOut ?
                        h.canZoomOutMoreX() :
                        h.canZoomInMoreX();
                    let canZoomMoreY: boolean = isZoomingOut ?
                        h.canZoomOutMoreY() :
                        h.canZoomInMoreY();
                    let scaleX: number = (this.mChart.isScaleXEnabled()) ? scale : 1;
                    let scaleY: number = (this.mChart.isScaleYEnabled()) ? scale : 1;
                    if (canZoomMoreY || canZoomMoreX) {
                        this.mMatrix.set(this.mSavedMatrix);
                        this.mMatrix.postScale(scaleX, scaleY, t.x, t.y);
                        if (l != null) {
                            l.onChartScale(isTouchEvent, event, scaleX, scaleY);
                        }
                    }
                }
                else if (this.mTouchMode == ChartTouchListener.X_ZOOM && this.mChart.isScaleXEnabled()) {
                    this.mLastGesture = ChartGesture.X_ZOOM;
                    let xDist: number = BarLineChartTouchListener.getXDist(isTouchEvent, event);
                    let scaleX: number = xDist / this.mSavedXDist; // x-axis scale
                    let isZoomingOut: boolean = (scaleX < 1);
                    let canZoomMoreX: boolean = isZoomingOut ?
                        h.canZoomOutMoreX() :
                        h.canZoomInMoreX();
                    if (canZoomMoreX) {
                        this.mMatrix.set(this.mSavedMatrix);
                        this.mMatrix.postScale(scaleX, 1, t.x, t.y);
                        if (l != null) {
                            l.onChartScale(isTouchEvent, event, scaleX, 1);
                        }
                    }
                }
                else if (this.mTouchMode == ChartTouchListener.Y_ZOOM && this.mChart.isScaleYEnabled()) {
                    this.mLastGesture = ChartGesture.Y_ZOOM;
                    let yDist: number = BarLineChartTouchListener.getYDist(isTouchEvent, event);
                    let scaleY: number = yDist / this.mSavedYDist; // y-axis scale
                    let isZoomingOut: boolean = (scaleY < 1);
                    let canZoomMoreY: boolean = isZoomingOut ?
                        h.canZoomOutMoreY() :
                        h.canZoomInMoreY();
                    if (canZoomMoreY) {
                        this.mMatrix.set(this.mSavedMatrix);
                        this.mMatrix.postScale(1, scaleY, t.x, t.y);
                        if (l != null) {
                            l.onChartScale(isTouchEvent, event, 1, scaleY);
                        }
                    }
                }
                MPPointF.recycleInstance(t);
            }
        }
    }
    /**
     * Highlights upon dragging, generates callbacks for the selection-listener.
     *
     * @param e
     */
    private performHighlightDrag(isTouchEvent: boolean, event: TouchEvent | GestureEvent) {
        let xCoordinate: number = 0;
        let yCoordinate: number = 0;
        if (isTouchEvent) {
            event = event as TouchEvent;
            if (!event.touches || event.touches.length == 0 || !event.touches[0]) {
                return;
            }
            xCoordinate = event.touches[0].x;
            yCoordinate = event.touches[0].y;
        }
        else {
            event = event as GestureEvent;
            if (!event.fingerList || event.fingerList.length == 0 || !event.fingerList[0]) {
                return;
            }
            xCoordinate = event.fingerList[0].localX;
            yCoordinate = event.fingerList[0].localY;
        }
        let h: Highlight | null = this.mChart.getHighlightByTouchPoint(xCoordinate, yCoordinate);
        if (h != null && this.mLastHighlighted && !h.equalTo(this.mLastHighlighted)) {
            this.mLastHighlighted = h;
            this.mChart.highlightValueForObject(h, true);
        }
    }
    /**
     * ################ ################ ################ ################
     */
    /** DOING THE MATH BELOW ;-) */
    /**
     * Determines the center point between two pointer touch points.
     *
     * @param point
     * @param event
     */
    private static midPoint(point: MPPointF, isTouchEvent: boolean, event: TouchEvent | GestureEvent) {
        let x: number = 0;
        let y: number = 0;
        if (isTouchEvent) {
            event = event as TouchEvent;
            if (!event.touches || event.touches.length == 0 || !event.touches[0]) {
                return;
            }
            x = event.touches[0].x + event.touches[1].x;
            y = event.touches[0].y + event.touches[1].y;
        }
        else {
            event = event as GestureEvent;
            if (!event.fingerList || event.fingerList.length == 0 || !event.fingerList[0]) {
                return;
            }
            x = event.fingerList[0].localX + event.fingerList[1].localX;
            y = event.fingerList[0].localY + event.fingerList[1].localY;
        }
        point.x = (x / 2);
        point.y = (y / 2);
    }
    /**
     * returns the distance between two pointer touch points
     *
     * @param event
     * @return
     */
    private static spacing(isTouchEvent: boolean, event: TouchEvent | GestureEvent): number {
        let x: number = 0;
        let y: number = 0;
        if (isTouchEvent) {
            event = event as TouchEvent;
            if (!event.touches || event.touches.length == 0 || !event.touches[0]) {
                return 0;
            }
            x = event.touches[0].x - event.touches[1].x;
            y = event.touches[0].y - event.touches[1].y;
        }
        else {
            event = event as GestureEvent;
            if (!event.fingerList || event.fingerList.length == 0 || !event.fingerList[0]) {
                return 0;
            }
            x = event.fingerList[0].localX - event.fingerList[1].localX;
            y = event.fingerList[0].localY - event.fingerList[1].localY;
        }
        return Math.sqrt(x * x + y * y);
    }
    /**
     * calculates the distance on the x-axis between two pointers (fingers on
     * the display)
     *
     * @param e
     * @return
     */
    private static getXDist(isTouchEvent: boolean, e: TouchEvent | GestureEvent): number {
        let x: number = 0;
        if (isTouchEvent) {
            e = e as TouchEvent;
            if (!e.touches || e.touches.length == 0 || !e.touches[0]) {
                return 0;
            }
            x = Math.abs(e.touches[0].x - e.touches[1].x);
        }
        else {
            e = e as GestureEvent;
            if (!e.fingerList || e.fingerList.length == 0 || !e.fingerList[0]) {
                return 0;
            }
            x = Math.abs(e.fingerList[0].localX - e.fingerList[1].localX);
        }
        return x;
    }
    /**
     * calculates the distance on the y-axis between two pointers (fingers on
     * the display)
     *
     * @param e
     * @return
     */
    private static getYDist(isTouchEvent: boolean, e: TouchEvent | GestureEvent): number {
        let y: number = 0;
        if (isTouchEvent) {
            e = e as TouchEvent;
            if (!e.touches || e.touches.length == 0 || !e.touches[0]) {
                return 0;
            }
            y = Math.abs(e.touches[0].y - e.touches[1].y);
        }
        else {
            e = e as GestureEvent;
            if (!e.fingerList || e.fingerList.length == 0 || !e.fingerList[0]) {
                return 0;
            }
            y = Math.abs(e.fingerList[0].localY - e.fingerList[1].localY);
        }
        return y;
    }
    /**
     * Returns a recyclable MPPointF instance.
     * returns the correct translation depending on the provided x and y touch
     * points
     *
     * @param x
     * @param y
     * @return
     */
    public getTrans(x: number, y: number): MPPointF {
        let vph: ViewPortHandler = this.mChart.getViewPortHandler();
        let xTrans: number = x - vph.offsetLeft();
        let yTrans: number = 0;
        // check if axis is inverted
        if (this.inverted()) {
            yTrans = -(y - vph.offsetTop());
        }
        else {
            yTrans = -(this.mChart.getHeight() - y - vph.offsetBottom());
        }
        return MPPointF.getInstance(xTrans, yTrans);
    }
    /**
     * Returns true if the current touch situation should be interpreted as inverted, false if not.
     *
     * @return
     */
    private inverted(): boolean {
        return (this.mClosestDataSetToTouch == null && this.mChart.isAnyAxisInverted()) || (this.mClosestDataSetToTouch != null
            && this.mChart.isInverted(this.mClosestDataSetToTouch.getAxisDependency()));
    }
    /**
     * ################ ################ ################ ################
     */
    /** GETTERS AND GESTURE RECOGNITION BELOW */
    /**
     * returns the matrix object the listener holds
     *
     * @return
     */
    public getMatrix(): Matrix {
        return this.mMatrix;
    }
    /**
     * Sets the minimum distance that will be interpreted as a "drag" by the chart in dp.
     * Default: 3dp
     *
     * @param dragTriggerDistance
     */
    public setDragTriggerDist(dragTriggerDistance: number) {
        this.mDragTriggerDist = Utils.convertDpToPixel(dragTriggerDistance);
    }
    public onDoubleTap(isTouchEvent: boolean, e: TouchEvent | GestureEvent): void {
        if (!e) {
            return;
        }
        let x: number = 0;
        let y: number = 0;
        if (isTouchEvent) {
            e = e as TouchEvent;
            if (!e.touches || e.touches.length == 0 || !e.touches[0]) {
                return;
            }
            x = e.touches[0].x;
            y = e.touches[0].y;
        }
        else {
            e = e as GestureEvent;
            if (!e.fingerList || e.fingerList.length == 0 || !e.fingerList[0]) {
                return;
            }
            x = e.fingerList[0].localX;
            y = e.fingerList[0].localY;
        }
        this.mLastGesture = ChartGesture.DOUBLE_TAP;
        let l: OnChartGestureListener | null = this.mChart.getOnChartGestureListener();
        if (l != null) {
            l.onChartDoubleTapped(isTouchEvent, e);
        }
        let chartData = this.mChart.getData();
        // check if double-tap zooming is enabled
        if (this.mChart.isDoubleTapToZoomEnabled() && chartData && chartData.getEntryCount() > 0) {
            let trans: MPPointF = this.getTrans(x, y);
            let scaleX: number = this.mChart.isScaleXEnabled() ? 1.4 : 1;
            let scaleY: number = this.mChart.isScaleYEnabled() ? 1.4 : 1;
            this.mChart.zoom(scaleX, scaleY, trans.x, trans.y);
            if (this.mChart.isLogEnabled())
                console.info("BarlineChartTouch:" + "Double-Tap, Zooming In, x: " + trans.x + ", y: "
                    + trans.y);
            if (l != null) {
                l.onChartScale(isTouchEvent, e, scaleX, scaleY);
            }
            MPPointF.recycleInstance(trans);
        }
    }
    public onLongPressed(isTouchEvent: boolean, e: TouchEvent | GestureEvent) {
        this.startAction(isTouchEvent, e);
        this.mLastGesture = ChartGesture.LONG_PRESS;
        let l: OnChartGestureListener | null = this.mChart.getOnChartGestureListener();
        if (l != null) {
            l.onChartLongPressed(isTouchEvent, e);
        }
        if (!this.mChart.isHighlightPerLongPressEnabled()) {
            return;
        }
        this.mChart.setLastGestureLongPress();
        this.mTouchMode = ChartTouchListener.LONG_PRESS;
        let x: number = 0;
        let y: number = 0;
        if (isTouchEvent) {
            let touch = e as TouchEvent;
            if (!touch.touches || touch.touches.length == 0 || !touch.touches[0]) {
                return;
            }
            x = touch.touches[0].x;
            y = touch.touches[0].y;
        }
        else {
            let gesture = e as GestureEvent;
            if (!gesture.fingerList || gesture.fingerList.length == 0 || !gesture.fingerList[0]) {
                return;
            }
            x = gesture.fingerList[0].localX;
            y = gesture.fingerList[0].localY;
        }
        let h: Highlight | null = this.mChart.getHighlightByTouchPoint(x, y);
        if (h) {
            this.performHighlight(h);
        }
    }
    public getXyByEvent(isTouchEvent: boolean, e: TouchEvent | GestureEvent): [
        number,
        number
    ] | undefined {
        let x: number = 0;
        let y: number = 0;
        if (isTouchEvent) {
            let touch = e as TouchEvent;
            if (!touch.touches || touch.touches.length == 0 || !touch.touches[0]) {
                return;
            }
            x = touch.touches[0].x;
            y = touch.touches[0].y;
        }
        else {
            let gesture = e as GestureEvent;
            if (!gesture.fingerList || gesture.fingerList.length == 0 || !gesture.fingerList[0]) {
                return;
            }
            x = gesture.fingerList[0].localX;
            y = gesture.fingerList[0].localY;
        }
        return [x, y];
    }
    public onLongPressUp(isTouchEvent: boolean, e: TouchEvent | GestureEvent) {
        this.mLastGesture = ChartGesture.LONG_PRESS;
        this.endAction(isTouchEvent, e);
    }
    public onLongPressCancel(isTouchEvent: boolean, e: TouchEvent | GestureEvent) {
        this.mLastGesture = ChartGesture.LONG_PRESS;
        this.endAction(isTouchEvent, e);
    }
    public onSingleTapUp(isTouchEvent: boolean, e: TouchEvent | GestureEvent): void {
        // if (!e) {
        //   return;
        // }
        // this.actionDown(isTouchEvent, e);
        // this.mLastGesture = ChartGesture.SINGLE_TAP;
        //
        // let l: OnChartGestureListener | null = this.mChart.getOnChartGestureListener();
        //
        // if (l != null) {
        //   l.onChartSingleTapped(isTouchEvent, e);
        // }
        //
        // if (!this.mChart.isHighlightPerTapEnabled()) {
        //   return;
        // }
        // this.mChart.setLastGestureSingleTap();
        // let x: number = 0;
        // let y: number = 0;
        // if (isTouchEvent) {
        //   let touch = e as TouchEvent;
        //   if (!touch.touches || touch.touches.length == 0 || !touch.touches[0]) {
        //     return;
        //   }
        //   x = touch.touches[0].x;
        //   y = touch.touches[0].y;
        // } else {
        //   let gesture = e as GestureEvent;
        //   if (!gesture.fingerList || gesture.fingerList.length == 0 || !gesture.fingerList[0]) {
        //     return;
        //   }
        //   x = gesture.fingerList[0].localX;
        //   y = gesture.fingerList[0].localY;
        // }
        // let h: Highlight | null = this.mChart.getHighlightByTouchPoint(x, y);
        // if (h) {
        //   this.performHighlight(h);
        // }
        //
        // this.actionUp(isTouchEvent, e);
    }
    public onFling(isTouchEvent: boolean, e1: TouchEvent, e2: TouchEvent, velocityX: number, velocityY: number): boolean {
        this.mLastGesture = ChartGesture.FLING;
        let l: OnChartGestureListener | null = this.mChart.getOnChartGestureListener();
        if (l != null) {
            l.onChartFling(isTouchEvent, e1, e2, velocityX, velocityY);
        }
        return false;
    }
    public stopDeceleration() {
        this.mDecelerationVelocity.x = 0;
        this.mDecelerationVelocity.y = 0;
    }
    public computeScroll() {
        if (this.mDecelerationVelocity.x == 0 && this.mDecelerationVelocity.y == 0)
            return; // There's no deceleration in progress
        const currentTime: number = new Date().getMilliseconds();
        this.mDecelerationVelocity.x *= this.mChart.getDragDecelerationFrictionCoef();
        this.mDecelerationVelocity.y *= this.mChart.getDragDecelerationFrictionCoef();
        const timeInterval: number = (currentTime - this.mDecelerationLastTime) / 1000;
        let distanceX: number = this.mDecelerationVelocity.x * timeInterval;
        let distanceY: number = this.mDecelerationVelocity.y * timeInterval;
        this.mDecelerationCurrentPoint.x += distanceX;
        this.mDecelerationCurrentPoint.y += distanceY;
        // let event:TouchEvent = TouchEvent.obtain(currentTime, currentTime, TouchType.Move, this.mDecelerationCurrentPoint.x,
        //   mDecelerationCurrentPoint.y, 0);
        //
        // let dragDistanceX:number = this.mChart.isDragXEnabled() ? this.mDecelerationCurrentPoint.x - this.mTouchStartPoint.x : 0;
        // let dragDistanceY:number = this.mChart.isDragYEnabled() ? this.mDecelerationCurrentPoint.y - this.mTouchStartPoint.y : 0;
        //
        // this.performDrag(event, dragDistanceX, dragDistanceY);
        //
        // event.recycle();
        this.mMatrix = this.mChart.getViewPortHandler().refresh(this.mMatrix, this.mChart, false);
        this.mDecelerationLastTime = currentTime;
        if (Math.abs(this.mDecelerationVelocity.x) >= 0.01 || Math.abs(this.mDecelerationVelocity.y) >= 0.01) {
            // Utils.postInvalidateOnAnimation(this.mChart); // This causes computeScroll to fire, recommended for this by Google
        }
        else {
            // Range might have changed, which means that Y-axis labels
            // could have changed in size, affecting Y-axis size.
            // So we need to recalculate offsets.
            this.mChart.calculateOffsets();
            // this.mChart.postInvalidate();
            this.stopDeceleration();
        }
    }
}
