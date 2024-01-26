interface BarChartMultiplePage_Params {
    model?: BarChartModel | null;
    leftAxis?: YAxis | null;
    rightAxis?: YAxis | null;
    xAxis?: XAxis | null;
    data?: BarData | null;
    normalMarker?: MarkerView | null;
    menuItemArr?: Array<string>;
    titleSelectString?: string;
    title?: string;
    titleModel?: ChartTitleModel;
    seekBarX?: SeekBarModel;
    seekBarY?: SeekBarModel;
    valueSelectedListener?: OnChartValueSelectedListener;
    chartGestureListener?: OnChartGestureListener;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "BarChartMultiplePage_" + ++__generate__Id;
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
import { BarChart, BarChartModel, BarData, BarDataSet, BarEntry, ChartGesture, Color, Description, EntryOhos, Highlight, IBarDataSet, JArrayList, Legend, LegendHorizontalAlignment, LegendOrientation, LegendVerticalAlignment, MarkerView, OnChartGestureListener, OnChartValueSelectedListener, XAxis, XAxisPosition, YAxis, } from '@ohos/mpchart';
import title, { ChartTitleModel } from '../../title';
import SeekBar, { SeekBarModel } from '../../customcomponents/SeekBar';
import Constants from '../../constants/Constants';
import Utils from '../../utils/Utils';
class BarChartMultiplePage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.model = null;
        this.leftAxis = null;
        this.rightAxis = null;
        this.xAxis = null;
        this.data = null;
        this.normalMarker = null;
        this.menuItemArr = [Constants.TOGGLE_BAR_BORDERS, Constants.TOGGLE_VALUES,
            Constants.TOGGLE_HIGHLIGHT, Constants.TOGGLE_PINCHZOOM, Constants.TOGGLE_AUTO_SCALE,
            Constants.ANIMATE_X, Constants.ANIMATE_Y, Constants.ANIMATE_XY, Constants.SAVE_IMAGE];
        this.titleSelectString = 'X';
        this.title = 'Multiple';
        this.__titleModel = new ObservedPropertyObject(new ChartTitleModel(), this, "titleModel");
        this.__seekBarX = new ObservedPropertyObject(new SeekBarModel(), this, "seekBarX");
        this.__seekBarY = new ObservedPropertyObject(new SeekBarModel(), this, "seekBarY");
        this.valueSelectedListener = {
            onValueSelected: (e: EntryOhos, h: Highlight) => {
                console.info("ScrollBarChart onValueSelected: " + e.getX());
            },
            onNothingSelected: () => {
                console.info("ScrollBarChart onNothingSelected");
            }
        };
        this.chartGestureListener = {
            onChartGestureStart: (isTouchEvent: boolean, me: TouchEvent | GestureEvent, lastPerformedGestureMode: ChartGesture) => {
                console.info("-----------------chartGestureListener onChartGestureStart lastMode: " + lastPerformedGestureMode);
            },
            onChartGestureEnd: (isTouchEvent: boolean, me: TouchEvent | GestureEvent, lastPerformedGestureMode: ChartGesture) => {
                console.info("-----------------chartGestureListener onChartGestureEnd lastMode: " + lastPerformedGestureMode);
            },
            onChartLongPressed: (isTouchEvent: boolean, me: TouchEvent | GestureEvent) => {
                console.info("-----------------chartGestureListener onChartLongPressed");
            },
            onChartDoubleTapped: (isTouchEvent: boolean, me: TouchEvent | GestureEvent) => {
                console.info("-----------------chartGestureListener onChartDoubleTapped");
            },
            onChartSingleTapped: (isTouchEvent: boolean, me: TouchEvent | GestureEvent) => {
                console.info("-----------------chartGestureListener onChartSingleTapped");
            },
            onChartFling: (isTouchEvent: boolean, me1: TouchEvent | GestureEvent, me2: TouchEvent, velocityX: number, velocityY: number) => {
                console.info("-----------------chartGestureListener onChartFling velocityX: " + velocityX + "  velocityY: " + velocityY);
            },
            onChartScale: (isTouchEvent: boolean, me: TouchEvent | GestureEvent, scaleX: number, scaleY: number) => {
                console.info("-----------------chartGestureListener onChartScale scaleX: " + scaleX + "  scaleY: " + scaleY);
            },
            onChartTranslate: (isTouchEvent: boolean, me: TouchEvent | GestureEvent, dX: number, dY: number) => {
                console.info("-----------------chartGestureListener onChartTranslate dx: " + dX + "  dy: " + dY);
            }
        };
        this.updateWithValueParams(params);
        this.declareWatch("titleModel", this.menuCallback);
        this.declareWatch("seekBarX", this.seekBarXValueWatch);
        this.declareWatch("seekBarY", this.seekBarYValueWatch);
    }
    updateWithValueParams(params: BarChartMultiplePage_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.leftAxis !== undefined) {
            this.leftAxis = params.leftAxis;
        }
        if (params.rightAxis !== undefined) {
            this.rightAxis = params.rightAxis;
        }
        if (params.xAxis !== undefined) {
            this.xAxis = params.xAxis;
        }
        if (params.data !== undefined) {
            this.data = params.data;
        }
        if (params.normalMarker !== undefined) {
            this.normalMarker = params.normalMarker;
        }
        if (params.menuItemArr !== undefined) {
            this.menuItemArr = params.menuItemArr;
        }
        if (params.titleSelectString !== undefined) {
            this.titleSelectString = params.titleSelectString;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.titleModel !== undefined) {
            this.titleModel = params.titleModel;
        }
        if (params.seekBarX !== undefined) {
            this.seekBarX = params.seekBarX;
        }
        if (params.seekBarY !== undefined) {
            this.seekBarY = params.seekBarY;
        }
        if (params.valueSelectedListener !== undefined) {
            this.valueSelectedListener = params.valueSelectedListener;
        }
        if (params.chartGestureListener !== undefined) {
            this.chartGestureListener = params.chartGestureListener;
        }
    }
    aboutToBeDeleted() {
        this.__titleModel.aboutToBeDeleted();
        this.__seekBarX.aboutToBeDeleted();
        this.__seekBarY.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private model: BarChartModel | null;
    private leftAxis: YAxis | null;
    private rightAxis: YAxis | null;
    private xAxis: XAxis | null;
    private data: BarData | null;
    private normalMarker: MarkerView | null;
    //标题栏菜单文本
    private menuItemArr: Array<string>;
    private titleSelectString: string;
    //标题栏标题
    private title: string;
    private __titleModel: ObservedPropertyObject<ChartTitleModel>;
    get titleModel() {
        return this.__titleModel.get();
    }
    set titleModel(newValue: ChartTitleModel) {
        this.__titleModel.set(newValue);
    }
    private __seekBarX: ObservedPropertyObject<SeekBarModel>;
    get seekBarX() {
        return this.__seekBarX.get();
    }
    set seekBarX(newValue: SeekBarModel) {
        this.__seekBarX.set(newValue);
    }
    private __seekBarY: ObservedPropertyObject<SeekBarModel>;
    get seekBarY() {
        return this.__seekBarY.get();
    }
    set seekBarY(newValue: SeekBarModel) {
        this.__seekBarY.set(newValue);
    }
    seekBarXValueWatch(): void {
        this.setData(this.seekBarX.getValue(), this.seekBarY.getValue());
    }
    seekBarYValueWatch(): void {
        this.setData(this.seekBarX.getValue(), this.seekBarY.getValue());
    }
    //标题栏菜单回调
    menuCallback() {
        if (this.titleModel == null || this.titleModel == undefined) {
            return;
        }
        let index: number = this.titleModel.getIndex();
        if (!this.model || index == undefined || index == -1) {
            return;
        }
        let barData = this.model.getBarData();
        if (!barData)
            return;
        let sets: JArrayList<IBarDataSet> | null = null;
        if (barData) {
            sets = barData.getDataSets();
        }
        switch (this.menuItemArr[index]) {
            case Constants.TOGGLE_BAR_BORDERS:
                for (let i = 0; i < barData.getDataSets().length(); i++) {
                    let barDataSet = barData.getDataSets().get(i) as BarDataSet;
                    barDataSet.setBarBorderWidth(barDataSet.getBarBorderWidth() == 1 ? 0 : 1);
                }
                this.model.invalidate();
                break;
            case Constants.TOGGLE_VALUES:
                if (!barData || !sets) {
                    break;
                }
                for (let i = 0; i < sets.size(); i++) {
                    let set = sets.get(i) as BarDataSet;
                    set.setDrawValues(!set.isDrawValuesEnabled());
                }
                this.model.invalidate();
                break;
            case Constants.TOGGLE_HIGHLIGHT:
                if (barData != null) {
                    barData.setHighlightEnabled(!barData.isHighlightEnabled());
                    this.model.invalidate();
                }
                break;
            case Constants.TOGGLE_PINCHZOOM:
                if (this.model.isPinchZoomEnabled()) {
                    this.model.setPinchZoom(false);
                }
                else {
                    this.model.setPinchZoom(true);
                }
                this.model.invalidate();
                break;
            case Constants.TOGGLE_AUTO_SCALE:
                this.model.setAutoScaleMinMaxEnabled(!this.model.isAutoScaleMinMaxEnabled());
                this.model.notifyDataSetChanged();
                break;
            case Constants.ANIMATE_X:
                this.titleSelectString = 'X';
                this.animate();
                break;
            case Constants.ANIMATE_Y:
                this.titleSelectString = 'Y';
                this.animate();
                break;
            case Constants.ANIMATE_XY:
                this.titleSelectString = 'XY';
                this.animate();
                break;
            case Constants.SAVE_IMAGE:
                Utils.saveImage(this.title, this.model ? this.model.context2d : null);
            default:
        }
        this.titleModel.setIndex(-1);
    }
    public animate() {
        if (this.model) {
            if (this.titleSelectString == 'X') {
                this.model.animateX(2000);
            }
            else if (this.titleSelectString == 'Y') {
                this.model.animateY(2000);
            }
            else if (this.titleSelectString == 'XY') {
                this.model.animateXY(2000, 2000);
            }
        }
    }
    private valueSelectedListener: OnChartValueSelectedListener;
    private chartGestureListener: OnChartGestureListener;
    aboutToAppear() {
        this.seekBarX.setValue(5)
            .setMax(50)
            .setMin(5);
        this.seekBarY.setValue(100)
            .setMax(200)
            .setMin(20);
        this.titleModel.menuItemArr = this.menuItemArr;
        this.titleModel.title = this.title;
        this.model = new BarChartModel();
        this.model.setOnChartValueSelectedListener(this.valueSelectedListener);
        this.model.setOnChartGestureListener(this.chartGestureListener);
        let description: Description | null = this.model.getDescription();
        if (description) {
            description.setEnabled(false);
        }
        let l: Legend | null = this.model.getLegend();
        if (l) {
            l.setEnabled(true);
            l.setVerticalAlignment(LegendVerticalAlignment.TOP);
            l.setHorizontalAlignment(LegendHorizontalAlignment.RIGHT);
            l.setOrientation(LegendOrientation.VERTICAL);
            l.setDrawInside(true);
        }
        // if more than 40 entries are displayed in the this.model, no values will be drawn
        this.model.setMaxVisibleValueCount(60);
        // scaling can now only be done on x- and y-axis separately
        this.model.setPinchZoom(false);
        this.model.setDrawGridBackground(false);
        this.model.setGridBackgroundColor('#500000ff');
        this.model.setDrawBarShadow(false);
        this.model.setDrawValueAboveBar(true);
        this.model.setHighlightFullBarEnabled(false);
        // change the position of the y-labels
        this.leftAxis = this.model.getAxisLeft();
        if (this.leftAxis) {
            this.leftAxis.setAxisMinimum(0); // this replaces setStartAtZero(true)
            this.leftAxis.setDrawLimitLinesBehindData(false);
            // this.leftAxis.setPosition(YAxisLabelPosition.OUTSIDE_CHART);
            this.leftAxis.setSpaceTop(30);
            this.leftAxis.enableGridDashedLine(10, 10, 0);
            // add limit lines
        }
        this.rightAxis = this.model.getAxisRight();
        if (this.rightAxis) {
            this.rightAxis.setEnabled(false);
            this.rightAxis.setDrawGridLines(false);
            this.rightAxis.setLabelCount(6, false);
            this.rightAxis.setSpaceTop(11);
        }
        this.xAxis = this.model.getXAxis();
        if (this.xAxis) {
            this.xAxis.setLabelCount(5, false);
            this.xAxis.setPosition(XAxisPosition.BOTTOM);
        }
        this.normalMarker = new MarkerView();
        this.model.setMarker(this.normalMarker);
        if (this.xAxis && this.leftAxis) {
            this.setData(5, 110);
        }
        // this.model.setVisibleXRangeMaximum(20);
    }
    private setData(count: number, range: number) {
        let groupSpace: number = 0.08;
        let barSpace: number = 0.03; // x4 DataSet
        let barWidth: number = 0.2; // x4 DataSet
        // (0.2 + 0.03) * 4 + 0.08 = 1.00 -> interval per "group"
        let startYear: number = 1980;
        let endYear: number = startYear + count;
        let values1: JArrayList<BarEntry> = new JArrayList<BarEntry>();
        let values2: JArrayList<BarEntry> = new JArrayList<BarEntry>();
        let values3: JArrayList<BarEntry> = new JArrayList<BarEntry>();
        let values4: JArrayList<BarEntry> = new JArrayList<BarEntry>();
        let randomMultiplier: number = range;
        for (let i = startYear; i < endYear; i++) {
            values1.add(new BarEntry(i, (Math.random() * randomMultiplier)));
            values2.add(new BarEntry(i, (Math.random() * randomMultiplier)));
            values3.add(new BarEntry(i, (Math.random() * randomMultiplier)));
            values4.add(new BarEntry(i, (Math.random() * randomMultiplier)));
        }
        let set1: BarDataSet, set2: BarDataSet, set3: BarDataSet, set4: BarDataSet;
        if (this.model && this.model.getBarData() != null && this.model.getBarData()!
            .getDataSetCount() > 0) {
            set1 = this.model.getBarData()!.getDataSetByIndex(0) as BarDataSet;
            set2 = this.model.getBarData()!.getDataSetByIndex(1) as BarDataSet;
            set3 = this.model.getBarData()!.getDataSetByIndex(2) as BarDataSet;
            set4 = this.model.getBarData()!.getDataSetByIndex(3) as BarDataSet;
            set1.setValues(values1);
            set2.setValues(values2);
            set3.setValues(values3);
            set4.setValues(values4);
            this.model.getBarData()!.notifyDataChanged();
            this.model.notifyDataSetChanged();
        }
        else {
            set1 = new BarDataSet(values1, "Company A");
            set1.setColorsByArr([Color.rgb(104, 241, 175)]);
            set2 = new BarDataSet(values2, "Company B");
            set2.setColorsByArr([Color.rgb(164, 228, 251)]);
            set3 = new BarDataSet(values3, "Company C");
            set3.setColorsByArr([Color.rgb(242, 247, 158)]);
            set4 = new BarDataSet(values4, "Company D");
            set4.setColorsByArr([Color.rgb(255, 102, 0)]);
            let dataSets: JArrayList<IBarDataSet> = new JArrayList<IBarDataSet>();
            dataSets.add(set1);
            dataSets.add(set2);
            dataSets.add(set3);
            dataSets.add(set4);
            let data: BarData = new BarData(dataSets);
            this.model?.setData(data);
        }
        if (this.model && this.xAxis) {
            this.model.getBarData()!.setBarWidth(barWidth);
            this.xAxis.setAxisMinimum(startYear);
            this.xAxis.setAxisMaximum(startYear + this.model.getBarData()!.getGroupWidth(groupSpace, barSpace) * count);
            this.model.groupBars(startYear, groupSpace, barSpace);
            this.model.invalidate();
        }
    }
    render() {
        Column.create();
        let earlierCreatedChild_2: title = (this && this.findChildById) ? this.findChildById("2") as title : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new title("2", this, { model: this.titleModel }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                model: this.titleModel
            });
            View.create(earlierCreatedChild_2);
        }
        Column.create();
        Divider.create();
        Divider.width('1px');
        Divider.padding({ top: 5 });
        Column.create();
        let earlierCreatedChild_3: SeekBar = (this && this.findChildById) ? this.findChildById("3") as SeekBar : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new SeekBar("3", this, { model: this.seekBarX }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                model: this.seekBarX
            });
            View.create(earlierCreatedChild_3);
        }
        let earlierCreatedChild_4: SeekBar = (this && this.findChildById) ? this.findChildById("4") as SeekBar : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new SeekBar("4", this, { model: this.seekBarY }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                model: this.seekBarY
            });
            View.create(earlierCreatedChild_4);
        }
        Column.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new BarChartMultiplePage("1", undefined, {}));
