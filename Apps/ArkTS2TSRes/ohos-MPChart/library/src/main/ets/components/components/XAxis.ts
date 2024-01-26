let __generate__Id: number = 0;
function generateId(): string {
    return "XAxis_" + ++__generate__Id;
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
import Utils from '../utils/Utils';
import AxisBase from './AxisBase';
/**
 * Class representing the x-axis labels settings. Only use the setter methods to
 * modify it. Do not access public variables directly. Be aware that not all
 * features the XLabels class provides are suitable for the RadarChart.
 *
 * @author Philipp Jahoda
 */
export class XAxis extends AxisBase {
    /**
     * width of the x-axis labels in pixels - this is automatically
     * calculated by the computeSize() methods in the renderers
     */
    public mLabelWidth: number = 1;
    /**
     * height of the x-axis labels in pixels - this is automatically
     * calculated by the computeSize() methods in the renderers
     */
    public mLabelHeight: number = 1;
    /**
     * width of the (rotated) x-axis labels in pixels - this is automatically
     * calculated by the computeSize() methods in the renderers
     */
    public mLabelRotatedWidth: number = 1;
    /**
     * height of the (rotated) x-axis labels in pixels - this is automatically
     * calculated by the computeSize() methods in the renderers
     */
    public mLabelRotatedHeight: number = 1;
    /**
     * This is the angle for drawing the X axis labels (in degrees)
     */
    protected mLabelRotationAngle: number = 0;
    /**
     * if set to true, the chart will avoid that the first and last label entry
     * in the chart "clip" off the edge of the chart
     */
    private mAvoidFirstLastClipping: boolean = false;
    /**
     * the position of the x-labels relative to the chart
     */
    private mPosition: XAxisPosition = XAxisPosition.TOP;
    // private xCenterOffset:number = 0;
    // public longest:string='';
    constructor() {
        super();
        this.mYOffset = Utils.convertDpToPixel(4);
    }
    //
    // public getXCenterOffset(): number {
    //     return this.xCenterOffset;
    // }
    //
    // public setXCenterOffset(xCenterOffset: number): void {
    //     this.xCenterOffset = xCenterOffset;
    // }
    /**
     * returns the position of the x-labels
     */
    public getPosition(): XAxisPosition {
        return this.mPosition;
    }
    /**
     * sets the position of the x-labels
     *
     * @param pos
     */
    public setPosition(pos: XAxisPosition): void {
        this.mPosition = pos;
    }
    /**
     * returns the angle for drawing the X axis labels (in degrees)
     */
    public getLabelRotationAngle(): number {
        return this.mLabelRotationAngle;
    }
    /**
     * sets the angle for drawing the X axis labels (in degrees)
     *
     * @param angle the angle in degrees
     */
    public setLabelRotationAngle(angle: number): void {
        this.mLabelRotationAngle = angle;
    }
    /**
     * if set to true, the chart will avoid that the first and last label entry
     * in the chart "clip" off the edge of the chart or the screen
     *
     * @param enabled
     */
    public setAvoidFirstLastClipping(enabled: boolean): void {
        this.mAvoidFirstLastClipping = enabled;
    }
    /**
     * returns true if avoid-first-lastclipping is enabled, false if not
     *
     * @return
     */
    public isAvoidFirstLastClippingEnabled(): boolean {
        return this.mAvoidFirstLastClipping;
    }
}
/**
 * enum for the position of the x-labels relative to the chart
 */
export enum XAxisPosition {
    TOP,
    BOTTOM,
    BOTH_SIDED,
    TOP_INSIDE,
    BOTTOM_INSIDE
}
