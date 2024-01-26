interface FilledAxisPage_Params {
    model?: LineChartModel | null;
    leftAxis?: YAxis | null;
    rightAxis?: YAxis | null;
    xAxis?: XAxis | null;
    minOffset?: number;
    title?: string;
    titleModel?: ChartTitleModel;
    valueSelectedListener?: OnChartValueSelectedListener;
    chartGestureListener?: OnChartGestureListener;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "FilledAxisPage_" + ++__generate__Id;
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
import { Color as ChartColor, JArrayList, XAxis, XAxisPosition, YAxis, Description, Legend, OnChartValueSelectedListener, Highlight, EntryOhos, YAxisLabelPosition, LineDataSet, ILineDataSet, LineData, Mode, LineChart, LineChartModel, OnChartGestureListener, ChartGesture, ChartColorStop, } from '@ohos/mpchart';
import title, { ChartTitleModel } from '../../title';
import SeekBar, { SeekBarModel } from '../../customcomponents/SeekBar';
class FilledAxisPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.model = null;
        this.leftAxis = null;
        this.rightAxis = null;
        this.xAxis = null;
        this.minOffset = 15;
        this.title = 'FillLinePage';
        this.__titleModel = new ObservedPropertyObject(new ChartTitleModel(), this, "titleModel");
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
    }
    updateWithValueParams(params: FilledAxisPage_Params) {
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
        if (params.minOffset !== undefined) {
            this.minOffset = params.minOffset;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.titleModel !== undefined) {
            this.titleModel = params.titleModel;
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
        SubscriberManager.Get().delete(this.id());
    }
    private model: LineChartModel | null;
    private leftAxis: YAxis | null;
    private rightAxis: YAxis | null;
    private xAxis: XAxis | null;
    private minOffset: number;
    //标题栏标题
    private title: string;
    private __titleModel: ObservedPropertyObject<ChartTitleModel>;
    get titleModel() {
        return this.__titleModel.get();
    }
    set titleModel(newValue: ChartTitleModel) {
        this.__titleModel.set(newValue);
    }
    private valueSelectedListener: OnChartValueSelectedListener;
    private chartGestureListener: OnChartGestureListener;
    aboutToAppear() {
        this.titleModel.title = this.title;
        this.model = new LineChartModel();
        this.model.setOnChartValueSelectedListener(this.valueSelectedListener);
        let description: Description | null = this.model.getDescription();
        if (description) {
            description.setEnabled(false);
        }
        this.model.setMaxVisibleValueCount(60);
        this.model.setPinchZoom(false);
        this.model.setDrawGridBackground(false);
        this.xAxis = this.model.getXAxis();
        if (this.xAxis) {
            this.xAxis.setEnabled(false); //X轴是否显示
            this.xAxis.setPosition(XAxisPosition.TOP);
            this.xAxis.setDrawGridLines(true); //纵向线格显示
            this.xAxis.setGranularity(1);
            this.xAxis.setLabelCount(6); //设置X轴坐标个数
            this.xAxis.setAxisMinimum(0);
            this.xAxis.setAxisMaximum(40); //设置X轴最大值
        }
        this.leftAxis = this.model.getAxisLeft();
        if (this.leftAxis) {
            this.leftAxis.setLabelCount(6, false);
            this.leftAxis.setDrawGridLines(false);
            this.leftAxis.setPosition(YAxisLabelPosition.OUTSIDE_CHART);
            this.leftAxis.setAxisMinimum(-250);
            this.leftAxis.setAxisMaximum(900);
            this.leftAxis.setDrawAxisLine(true);
        }
        this.rightAxis = this.model.getAxisRight();
        if (this.rightAxis) {
            this.rightAxis.setDrawGridLines(false);
            this.rightAxis.setLabelCount(6, false);
            this.rightAxis.setAxisMinimum(-250); // this replaces setStartAtZero(true)
            this.rightAxis.setAxisMaximum(900);
            this.rightAxis.setDrawAxisLine(true);
            this.rightAxis.setDrawLabels(false);
        }
        let legend: Legend | null = this.model.getLegend();
        if (legend) {
            legend.setEnabled(false);
        }
        this.setData(100, 60);
        this.model.setMinOffset(this.minOffset);
        this.model.setVisibleXRangeMaximum(50);
    }
    private setData(count: number, range: number): void {
        let values1 = new JArrayList<EntryOhos>();
        for (let i = 0; i < count; i++) {
            let val: number = Math.random() * range + 550;
            values1.add(new EntryOhos(i, val));
        }
        let values2 = new JArrayList<EntryOhos>();
        for (let i = 0; i < count; i++) {
            let val: number = Math.random() * range + 150;
            values2.add(new EntryOhos(i, val));
        }
        let gradientFillColor1 = new JArrayList<ChartColorStop>();
        gradientFillColor1.add(['#00ffff', 0.1]);
        gradientFillColor1.add(['#ffffff', 1.0]);
        let gradientFillColor2 = new JArrayList<ChartColorStop>();
        gradientFillColor2.add(['#ffffff', 0.1]);
        gradientFillColor2.add(['#ffffff', 1.0]);
        let dataSet = new JArrayList<ILineDataSet>();
        let set1 = new LineDataSet(values1, "DataSet 1");
        set1.setDrawFilled(true);
        set1.setDrawValues(false);
        set1.setDrawCircles(false);
        set1.setMode(Mode.LINEAR);
        set1.setGradientFillColor(gradientFillColor1);
        set1.setColorByColor(ChartColor.rgb(255, 241, 46));
        set1.setLineWidth(2);
        dataSet.add(set1);
        let set2 = new LineDataSet(values2, "DataSet 2");
        set2.setDrawFilled(true);
        set2.setDrawValues(false);
        set2.setDrawCircles(false);
        set2.setMode(Mode.LINEAR);
        set2.setGradientFillColor(gradientFillColor2);
        set2.setColorByColor(ChartColor.rgb(255, 241, 46));
        set2.setLineWidth(2);
        dataSet.add(set2);
        let lineData: LineData = new LineData(dataSet);
        lineData.setValueTextSize(vp2px(10));
        if (this.model) {
            this.model.setData(lineData);
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
        Stack.create({ alignContent: Alignment.TopStart });
        Stack.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new FilledAxisPage("1", undefined, {}));
