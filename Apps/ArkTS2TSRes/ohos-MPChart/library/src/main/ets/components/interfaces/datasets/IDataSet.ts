let __generate__Id: number = 0;
function generateId(): string {
    return "IDataSet_" + ++__generate__Id;
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
import { DashPathEffect, FontFamily } from '../../data/Paint';
import { LegendForm } from '../../components/Legend';
import { AxisDependency } from '../../components/YAxis';
import { Rounding } from '../../data/DataSet';
import EntryOhos from '../../data/EntryOhos';
import IValueFormatter from '../../formatter/IValueFormatter';
import MPPointF from '../../utils/MPPointF';
import { JArrayList } from '../../utils/JArrayList';
export default interface IDataSet<T extends EntryOhos> {
    /** ###### ###### DATA RELATED METHODS ###### ###### */
    /**
     * returns the minimum y-value this DataSet holds
     *
     * @return
     */
    getYMin(): number;
    /**
     * returns the maximum y-value this DataSet holds
     *
     * @return
     */
    getYMax(): number;
    /**
     * returns the minimum x-value this DataSet holds
     *
     * @return
     */
    getXMin(): number;
    /**
     * returns the maximum x-value this DataSet holds
     *
     * @return
     */
    getXMax(): number;
    /**
     * Returns the number of y-values this DataSet represents -> the size of the y-values array
     * -> yvals.size()
     *
     * @return
     */
    getEntryCount(): number;
    /**
     * Calculates the minimum and maximum x and y values (mXMin, mXMax, mYMin, mYMax).
     */
    calcMinMax(): void;
    /**
     * Calculates the min and max y-values from the Entry closest to the given fromX to the Entry closest to the given toX value.
     * This is only needed for the autoScaleMinMax feature.
     *
     * @param fromX
     * @param toX
     */
    calcMinMaxY(fromX: number, toX: number): void;
    /**
     * Returns the first Entry object found at the given x-value with binary
     * search.
     * If the no Entry at the specified x-value is found, this method
     * returns the Entry at the closest x-value according to the rounding.
     * INFORMATION: This method does calculations at runtime. Do
     * not over-use in performance critical situations.
     *
     * @param xValue the x-value
     * @param closestToY If there are multiple y-values for the specified x-value,
     * @param rounding determine whether to round up/down/closest
     *                 if there is no Entry matching the provided x-value
     * @return
    *
     *
     */
    getEntryForXValue(xValue: number, closestToY: number, rounding?: Rounding): T | null;
    /**
     * Returns the first Entry object found at the given x-value with binary
     * search.
     * If the no Entry at the specified x-value is found, this method
     * returns the Entry at the closest x-value.
     * INFORMATION: This method does calculations at runtime. Do
     * not over-use in performance critical situations.
     *
     *
     * @param xValue the x-value
     * @param closestToY If there are multiple y-values for the specified x-value,
     * @return
     */
    // getEntryForXValue(xValue : number, closestToY : number) : T;
    /**
     * Returns all Entry objects found at the given x-value with binary
     * search. An empty array if no Entry object at that x-value.
     * INFORMATION: This method does calculations at runtime. Do
     * not over-use in performance critical situations.
     *
     * @param xValue
     * @return
     */
    getEntriesForXValue(xValue: number): JArrayList<T>;
    /**
     * Returns the Entry object found at the given index (NOT xIndex) in the values array.
     *
     * @param index
     * @return
     */
    getEntryForIndex(index: number): T;
    /**
     * Returns the first Entry index found at the given x-value with binary
     * search.
     * If the no Entry at the specified x-value is found, this method
     * returns the Entry at the closest x-value according to the rounding.
     * INFORMATION: This method does calculations at runtime. Do
     * not over-use in performance critical situations.
     *
     * @param xValue the x-value
     * @param closestToY If there are multiple y-values for the specified x-value,
     * @param rounding determine whether to round up/down/closest
     *                 if there is no Entry matching the provided x-value
     * @return
     */
    getEntryIndex(xValue: number, closestToY: number, rounding: Rounding): number;
    /**
     * Returns the position of the provided entry in the DataSets Entry array.
     * Returns -1 if doesn't exist.
     *
     * @param e
     * @return
     */
    getEntryIndexByEntry(e: T): number;
    /**
     * This method returns the actual
     * index in the Entry array of the DataSet for a given xIndex. IMPORTANT: This method does
     * calculations at runtime, do not over-use in performance critical
     * situations.
     *
     * @param xIndex
     * @return
     */
    getIndexInEntries(xIndex: number): number;
    /**
     * Adds an Entry to the DataSet dynamically.
     * Entries are added to the end of the list.
     * This will also recalculate the current minimum and maximum
     * values of the DataSet and the value-sum.
     *
     * @param e
     */
    addEntry(e: T): boolean;
    /**
     * Adds an Entry to the DataSet dynamically.
     * Entries are added to their appropriate index in the values array respective to their x-position.
     * This will also recalculate the current minimum and maximum
     * values of the DataSet and the value-sum.
     *
     * @param e
     */
    addEntryOrdered(e: T): void;
    /**
     * Removes the first Entry (at index 0) of this DataSet from the entries array.
     * Returns true if successful, false if not.
     *
     * @return
     */
    removeFirst(): boolean;
    /**
     * Removes the last Entry (at index size-1) of this DataSet from the entries array.
     * Returns true if successful, false if not.
     *
     * @return
     */
    removeLast(): boolean;
    /**
     * Removes an Entry from the DataSets entries array. This will also
     * recalculate the current minimum and maximum values of the DataSet and the
     * value-sum. Returns true if an Entry was removed, false if no Entry could
     * be removed.
     *
     * @param e
     */
    removeEntry(e: T): boolean;
    /**
     * Removes the Entry object closest to the given x-value from the DataSet.
     * Returns true if an Entry was removed, false if no Entry could be removed.
     *
     * @param xValue
     */
    removeEntryByXValue(xValue: number): boolean;
    /**
     * Removes the Entry object at the given index in the values array from the DataSet.
     * Returns true if an Entry was removed, false if no Entry could be removed.
     *
     * @param index
     * @return
     */
    removeEntryByIndex(index: number): boolean;
    /**
     * Checks if this DataSet contains the specified Entry. Returns true if so,
     * false if not. NOTE: Performance is pretty bad on this one, do not
     * over-use in performance critical situations.
     *
     * @param entry
     * @return
     */
    contains(entry: T): boolean;
    /**
     * Removes all values from this DataSet and does all necessary recalculations.
     */
    clear(): void;
    /** ###### ###### STYLING RELATED (& OTHER) METHODS ###### ###### */
    /**
     * Returns the label string that describes the DataSet.
     *
     * @return
     */
    getLabel(): string;
    /**
     * Sets the label string that describes the DataSet.
     *
     * @param label
     */
    setLabel(label: string): void;
    /**
     * Returns the axis this DataSet should be plotted against.
     *
     * @return
     */
    getAxisDependency(): AxisDependency;
    /**
     * Set the y-axis this DataSet should be plotted against (either LEFT or
     * RIGHT). Default: LEFT
     *
     * @param dependency
     */
    setAxisDependency(dependency: AxisDependency): void;
    /**
     * returns all the colors that are set for this DataSet
     *
     * @return
     */
    getColors(): JArrayList<Number>;
    /**
     * Returns the color at the given index of the DataSet's color array.
     * Performs a IndexOutOfBounds check by modulus.
     *
     * @param index
     * @return
     */
    getColor(index?: number): number;
    /**
     * returns true if highlighting of values is enabled, false if not
     *
     * @return
     */
    isHighlightEnabled(): boolean;
    /**
     * If set to true, value highlighting is enabled which means that values can
     * be highlighted programmatically or by touch gesture.
     *
     * @param enabled
     */
    setHighlightEnabled(enabled: boolean): void;
    /**
     * Sets the formatter to be used for drawing the values inside the chart. If
     * no formatter is set, the chart will automatically determine a reasonable
     * formatting (concerning decimals) for all the values that are drawn inside
     * the chart. Use chart.getDefaultValueFormatter() to use the formatter
     * calculated by the chart.
     *
     * @param f
     */
    setValueFormatter(f: IValueFormatter): void;
    /**
     * Returns the formatter used for drawing the values inside the chart.
     *
     * @return
     */
    getValueFormatter(): IValueFormatter | null;
    /**
     * Returns true if the valueFormatter object of this DataSet is null.
     *
     * @return
     */
    needsFormatter(): boolean;
    /**
     * Sets the color the value-labels of this DataSet should have.
     *
     * @param color
     */
    setValueTextColor(color: number): void;
    /**
     * Sets a list of colors to be used as the colors for the drawn values.
     *
     * @param colors
     */
    setValueTextColors(colors: JArrayList<Number>): void;
    /**
     * Sets a Typeface for the value-labels of this DataSet.
     *
     * @param tf
     */
    setValueTypeface(tf: FontFamily): void;
    /**
     * Sets the text-size of the value-labels of this DataSet in dp.
     *
     * @param size
     */
    setValueTextSize(size: number): void;
    /**
     * Returns only the first color of all colors that are set to be used for the values.
     *
     * @return
     */
    // getValueTextColor() : number;
    /**
     * Returns the color at the specified index that is used for drawing the values inside the chart.
     * Uses modulus internally.
     *
     * @param index
     * @return
     */
    getValueTextColor(index?: number): number;
    /**
     * Returns the typeface that is used for drawing the values inside the chart
     *
     * @return
     */
    getValueTypeface(): FontFamily;
    /**
     * Returns the text size that is used for drawing the values inside the chart
     *
     * @return
     */
    getValueTextSize(): number;
    /**
     * The form to draw for this dataset in the legend.
     * <p/>
     * Return `DEFAULT` to use the default legend form.
     */
    getForm(): LegendForm;
    /**
     * The form size to draw for this dataset in the legend.
     * <p/>
     * Return `Float.NaN` to use the default legend form size.
     */
    getFormSize(): number;
    /**
     * The line width for drawing the form of this dataset in the legend
     * <p/>
     * Return `Float.NaN` to use the default legend form line width.
     */
    getFormLineWidth(): number;
    /**
     * The line dash path effect used for shapes that consist of lines.
     * <p/>
     * Return `null` to use the default legend form line dash effect.
     */
    getFormLineDashEffect(): DashPathEffect /*DashPathEffect*/ | null;
    /**
     * set this to true to draw y-values on the chart.
     *
     * NOTE (for bar and line charts): if `maxVisibleCount` is reached, no values will be drawn even
     * if this is enabled
     * @param enabled
     */
    setDrawValues(enabled: boolean): void;
    /**
     * Returns true if y-value drawing is enabled, false if not
     *
     * @return
     */
    isDrawValuesEnabled(): boolean;
    /**
     * Set this to true to draw y-icons on the chart.
     *
     * NOTE (for bar and line charts): if `maxVisibleCount` is reached, no icons will be drawn even
     * if this is enabled
     *
     * @param enabled
     */
    setDrawIcons(enabled: boolean): void;
    /**
     * Returns true if y-icon drawing is enabled, false if not
     *
     * @return
     */
    isDrawIconsEnabled(): boolean;
    /**
     * Offset of icons drawn on the chart.
     *
     * For all charts except Pie and Radar it will be ordinary (x offset,y offset).
     *
     * For Pie and Radar chart it will be (y offset, distance from center offset); so if you want icon to be rendered under value, you should increase X component of CGPoint, and if you want icon to be rendered closet to center, you should decrease height component of CGPoint.
     * @param offset
     */
    setIconsOffset(offset: MPPointF): void;
    /**
     * Get the offset for drawing icons.
     */
    getIconsOffset(): MPPointF;
    /**
     * Set the visibility of this DataSet. If not visible, the DataSet will not
     * be drawn to the chart upon refreshing it.
     *
     * @param visible
     */
    setVisible(visible: boolean): void;
    /**
     * Returns true if this DataSet is visible inside the chart, or false if it
     * is currently hidden.
     *
     * @return
     */
    isVisible(): boolean;
}
