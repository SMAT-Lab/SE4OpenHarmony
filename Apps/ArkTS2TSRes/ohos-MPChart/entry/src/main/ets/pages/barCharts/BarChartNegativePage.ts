interface BarChartNegativePage_Params {
    model?: BarChartModel | null;
    leftAxis?: YAxis | null;
    rightAxis?: YAxis | null;
    xAxis?: XAxis | null;
    data?: BarData | null;
    normalMarker?: MarkerView | null;
    menuItemArr?: Array<string>;
    title?: string;
    titleModel?: ChartTitleModel;
    seekBarX?: SeekBarModel;
    seekBarY?: SeekBarModel;
    valueSelectedListener?: OnChartValueSelectedListener;
    chartGestureListener?: OnChartGestureListener;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "BarChartNegativePage_" + ++__generate__Id;
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
import { BarChart, BarChartModel, BarData, BarDataSet, BarEntry, ChartGesture, Description, EntryOhos, Highlight, IBarDataSet, JArrayList, Legend, MarkerView, OnChartGestureListener, OnChartValueSelectedListener, XAxis, XAxisPosition, YAxis, YAxisLabelPosition, } from '@ohos/mpchart';
import title, { ChartTitleModel } from '../../title';
import SeekBar, { SeekBarModel } from '../../customcomponents/SeekBar';
class BarChartNegativePage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.model = null;
        this.leftAxis = null;
        this.rightAxis = null;
        this.xAxis = null;
        this.data = null;
        this.normalMarker = null;
        this.menuItemArr = [];
        this.title = 'Negative';
        this.__titleModel = new ObservedPropertyObject(new ChartTitleModel(), this, "titleModel");
        this.__seekBarX = new ObservedPropertyObject(new SeekBarModel(), this, "seekBarX");
        this.__seekBarY = new ObservedPropertyObject(new SeekBarModel(), this, "seekBarY");
        this.valueSelectedListener = {
            onValueSelected: (e: EntryOhos, h: Highlight) => {
                console.info("BarChartNegativePage onValueSelected: " + e.getX());
            },
            onNothingSelected: () => {
                console.info("BarChartNegativePage onNothingSelected");
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
    updateWithValueParams(params: BarChartNegativePage_Params) {
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
        if (!barData) {
            return;
        }
        this.titleModel.setIndex(-1);
    }
    private valueSelectedListener: OnChartValueSelectedListener;
    private chartGestureListener: OnChartGestureListener;
    aboutToAppear() {
        this.seekBarX.setValue(4)
            .setMax(50)
            .setMin(2);
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
            l.setEnabled(false);
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
            this.leftAxis.setPosition(YAxisLabelPosition.OUTSIDE_CHART);
            this.leftAxis.setDrawLabels(false);
            this.leftAxis.setSpaceTop(25);
            this.leftAxis.setSpaceBottom(25);
            this.leftAxis.setDrawAxisLine(false);
            this.leftAxis.setDrawGridLines(false);
            this.leftAxis.setDrawZeroLine(true);
            this.leftAxis.setDrawLimitLinesBehindData(false);
            this.leftAxis.setZeroLineWidth(0.7);
            // add limit lines
        }
        this.rightAxis = this.model.getAxisRight();
        if (this.rightAxis) {
            this.rightAxis.setEnabled(false);
        }
        this.xAxis = this.model.getXAxis();
        if (this.xAxis) {
            this.xAxis.setPosition(XAxisPosition.BOTTOM);
            this.xAxis.setDrawLabels(false);
            this.xAxis.setDrawGridLines(false);
            this.xAxis.setDrawAxisLine(false);
            this.xAxis.setCenterAxisLabels(true);
            this.xAxis.setLabelCount(5);
            this.xAxis.setGranularity(1);
        }
        this.normalMarker = new MarkerView();
        this.model.setMarker(this.normalMarker);
        this.setData(4, 100);
        // this.model.setVisibleXRangeMaximum(20);
    }
    private setData(count: number, range: number): void {
        let startAxis: number = 0;
        let endAxis: number = startAxis + count;
        let values: JArrayList<BarEntry> = new JArrayList<BarEntry>();
        let valueColors: JArrayList<number> = new JArrayList<number>();
        for (let i = startAxis; i < endAxis; i++) {
            let val = Math.random() * range - range / 2;
            values.add(new BarEntry(i, val));
        }
        for (let i = 0; i < values.length(); i++) {
            if (values.at(i).getY() > 0) {
                valueColors.add(0xD34A58);
            }
            else {
                valueColors.add(0x6EBE66);
            }
        }
        let dataSet: BarDataSet = new BarDataSet(values, 'DataSet');
        dataSet.setValueTextColors(valueColors);
        dataSet.setColorsByVariable(valueColors.toArray());
        dataSet.setDrawValues(true);
        let dataSetList: JArrayList<IBarDataSet> = new JArrayList<IBarDataSet>();
        dataSetList.add(dataSet);
        let barData: BarData = new BarData(dataSetList);
        barData.setBarWidth(0.8);
        if (this.model) {
            this.model.setData(barData);
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
loadDocument(new BarChartNegativePage("1", undefined, {}));
