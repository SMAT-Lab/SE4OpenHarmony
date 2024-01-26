let __generate__Id: number = 0;
function generateId(): string {
    return "LineScatterCandleRadarDataSet_" + ++__generate__Id;
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
import { DashPathEffect } from './Paint';
import EntryOhos from './EntryOhos';
import BarLineScatterCandleBubbleDataSet from './BarLineScatterCandleBubbleDataSet';
import ILineScatterCandleRadarDataSet from '../interfaces/datasets/ILineScatterCandleRadarDataSet';
import Utils from '../utils/Utils';
import { JArrayList } from '../utils/JArrayList';
export default abstract class LineScatterCandleRadarDataSet<T extends EntryOhos> extends BarLineScatterCandleBubbleDataSet<T> implements ILineScatterCandleRadarDataSet<T> {
    protected mDrawVerticalHighlightIndicator: boolean = true;
    protected mDrawHorizontalHighlightIndicator: boolean = true;
    /** the width of the highlight indicator lines */
    protected mHighlightLineWidth: number = 0.5;
    /** the path effect for dashed highlight-lines */
    protected mHighlightDashPathEffect: DashPathEffect | null = null;
    constructor(yVals: JArrayList<T> | null, label: string) {
        super(yVals, label);
        this.mHighlightLineWidth = Utils.convertDpToPixel(0.5);
    }
    /**
     * Enables / disables the horizontal highlight-indicator. If disabled, the indicator is not drawn.
     * @param enabled
     */
    public setDrawHorizontalHighlightIndicator(enabled: boolean): void {
        this.mDrawHorizontalHighlightIndicator = enabled;
    }
    /**
     * Enables / disables the vertical highlight-indicator. If disabled, the indicator is not drawn.
     * @param enabled
     */
    public setDrawVerticalHighlightIndicator(enabled: boolean): void {
        this.mDrawVerticalHighlightIndicator = enabled;
    }
    /**
     * Enables / disables both vertical and horizontal highlight-indicators.
     * @param enabled
     */
    public setDrawHighlightIndicators(enabled: boolean): void {
        this.setDrawVerticalHighlightIndicator(enabled);
        this.setDrawHorizontalHighlightIndicator(enabled);
    }
    public isVerticalHighlightIndicatorEnabled(): boolean {
        return this.mDrawVerticalHighlightIndicator;
    }
    public isHorizontalHighlightIndicatorEnabled(): boolean {
        return this.mDrawHorizontalHighlightIndicator;
    }
    /**
     * Sets the width of the highlight line in dp.
     * @param width
     */
    public setHighlightLineWidth(width: number): void {
        this.mHighlightLineWidth = Utils.convertDpToPixel(width);
    }
    public getHighlightLineWidth(): number {
        return this.mHighlightLineWidth;
    }
    /**
     * Enables the highlight-line to be drawn in dashed mode, e.g. like this "- - - - - -"
     *
     * @param lineLength the length of the line pieces
     * @param spaceLength the length of space in between the line-pieces
     * @param phase offset, in degrees (normally, use 0)
     */
    public enableDashedHighlightLine(lineLength: number, spaceLength: number, phase: number): void {
        let arr = [lineLength, spaceLength];
        this.mHighlightDashPathEffect = new DashPathEffect(arr, phase);
    }
    /**
     * Disables the highlight-line to be drawn in dashed mode.
     */
    public disableDashedHighlightLine(): void {
        this.mHighlightDashPathEffect = null;
    }
    /**
     * Returns true if the dashed-line effect is enabled for highlight lines, false if not.
     * Default: disabled
     * @return
     */
    public isDashedHighlightLineEnabled(): boolean {
        return !this.mHighlightDashPathEffect ? false : true;
    }
    public getDashPathEffectHighlight(): DashPathEffect /*DashPathEffect*/ | null {
        return this.mHighlightDashPathEffect;
    }
    protected copyTo(lineScatterCandleRadarDataSet: LineScatterCandleRadarDataSet<T>): void {
        super.copyTo(lineScatterCandleRadarDataSet);
        lineScatterCandleRadarDataSet.mDrawHorizontalHighlightIndicator = this.mDrawHorizontalHighlightIndicator;
        lineScatterCandleRadarDataSet.mDrawVerticalHighlightIndicator = this.mDrawVerticalHighlightIndicator;
        lineScatterCandleRadarDataSet.mHighlightLineWidth = this.mHighlightLineWidth;
        lineScatterCandleRadarDataSet.mHighlightDashPathEffect = this.mHighlightDashPathEffect;
    }
}
