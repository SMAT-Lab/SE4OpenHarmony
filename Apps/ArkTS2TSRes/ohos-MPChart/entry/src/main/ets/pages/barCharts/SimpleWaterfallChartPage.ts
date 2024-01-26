interface SimpleWaterfallChartPage_Params {
    model?: WaterfallChartModel | null;
    leftAxis?: YAxis | null;
    rightAxis?: YAxis | null;
    xAxis?: XAxis | null;
    limitLine1?: LimitLine | null;
    limitLine2?: LimitLine | null;
    data?: BarData | null;
    normalMarker?: MarkerView | null;
    title?: string;
    titleModel?: ChartTitleModel;
    valueSelectedListener?: OnChartValueSelectedListener;
    chartGestureListener?: OnChartGestureListener;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SimpleWaterfallChartPage_" + ++__generate__Id;
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
import { BarData, ChartGesture, Color as ChartColor, Description, EntryOhos, Highlight, IBarDataSet, JArrayList, Legend, LimitLabelPosition, LimitLine, MarkerView, OnChartGestureListener, OnChartValueSelectedListener, XAxis, XAxisPosition, YAxis } from '@ohos/mpchart';
import WaterfallDataSet from '../../waterfallchart/data/WaterfallDataSet';
import WaterfallEntry, { WaterfallHighlight } from '../../waterfallchart/data/WaterfallEntry';
import WaterfallChart from '../../waterfallchart/component/WaterfallChart';
import WaterfallChartModel from '../../waterfallchart/model/WaterfallChartModel';
import title, { ChartTitleModel } from '../../title';
class SimpleWaterfallChartPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.model = null;
        this.leftAxis = null;
        this.rightAxis = null;
        this.xAxis = null;
        this.limitLine1 = null;
        this.limitLine2 = null;
        this.data = null;
        this.normalMarker = null;
        this.title = 'Waterfall';
        this.__titleModel = new ObservedPropertyObject(new ChartTitleModel(), this, "titleModel");
        this.valueSelectedListener = {
            onValueSelected: (e: EntryOhos, h: Highlight) => {
                console.info("SimpleWaterfallChartPage onValueSelected: " + e.getX());
            },
            onNothingSelected: () => {
                console.info("SimpleWaterfallChartPage onNothingSelected");
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
    updateWithValueParams(params: SimpleWaterfallChartPage_Params) {
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
        if (params.limitLine1 !== undefined) {
            this.limitLine1 = params.limitLine1;
        }
        if (params.limitLine2 !== undefined) {
            this.limitLine2 = params.limitLine2;
        }
        if (params.data !== undefined) {
            this.data = params.data;
        }
        if (params.normalMarker !== undefined) {
            this.normalMarker = params.normalMarker;
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
    private model: WaterfallChartModel | null;
    private leftAxis: YAxis | null;
    private rightAxis: YAxis | null;
    private xAxis: XAxis | null;
    private limitLine1: LimitLine | null;
    private limitLine2: LimitLine | null;
    private data: BarData | null;
    private normalMarker: MarkerView | null;
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
        this.model = new WaterfallChartModel();
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
        this.model.setMaxVisibleValueCount(40);
        // scaling can now only be done on x- and y-axis separately
        this.model.setPinchZoom(false);
        this.model.setDrawGridBackground(false);
        this.model.setGridBackgroundColor('#500000ff');
        this.model.setDrawBarShadow(false);
        this.model.setDrawValueAboveBar(false);
        this.model.setHighlightFullBarEnabled(false);
        this.limitLine1 = new LimitLine(120, 'Upper Limit');
        this.limitLine1.setLineWidth(4);
        this.limitLine1.enableDashedLine(10, 10, 0);
        this.limitLine1.setLabelPosition(LimitLabelPosition.RIGHT_TOP);
        this.limitLine1.setTextSize(vp2px(10));
        this.limitLine2 = new LimitLine(50, 'Lower Limit');
        this.limitLine2.setLineWidth(4);
        this.limitLine2.enableDashedLine(10, 10, 0);
        this.limitLine2.setLineColor(Color.Yellow);
        this.limitLine2.setLabelPosition(LimitLabelPosition.RIGHT_BOTTOM);
        this.limitLine2.setTextSize(vp2px(10));
        // change the position of the y-labels
        this.leftAxis = this.model.getAxisLeft();
        if (this.leftAxis) {
            this.leftAxis.setAxisMinimum(0); // this replaces setStartAtZero(true)
            this.leftAxis.setDrawLimitLinesBehindData(false);
            // add limit lines
            this.leftAxis.addLimitLine(this.limitLine1);
            this.leftAxis.addLimitLine(this.limitLine2);
        }
        this.rightAxis = this.model.getAxisRight();
        if (this.rightAxis) {
            this.rightAxis.setEnabled(false);
            this.rightAxis.setAxisMinimum(0);
        }
        this.xAxis = this.model.getXAxis();
        if (this.xAxis) {
            this.xAxis.setPosition(XAxisPosition.BOTTOM);
        }
        this.normalMarker = new MarkerView();
        this.model.setMarker(this.normalMarker);
        this.data = this.getNormalData();
        this.model.setData(this.data);
        this.model.setVisibleXRangeMaximum(5);
    }
    private getNormalData(): BarData {
        let values: JArrayList<WaterfallEntry> = new JArrayList<WaterfallEntry>();
        //标记点
        let h1a = new WaterfallHighlight(70, 70, Color.Blue);
        let h1b = new WaterfallHighlight(10, 10, ChartColor.argb(100, 0, 255, 0));
        let h1c = new WaterfallHighlight(40, 50);
        let h2 = new WaterfallHighlight(50, 70);
        let h3 = new WaterfallHighlight(60, 70);
        let h4 = new WaterfallHighlight(70, 80);
        values.add(new WaterfallEntry(1, 10, 80, undefined, undefined, h1a, h1b, h1c));
        values.add(new WaterfallEntry(2, 20, 80));
        values.add(new WaterfallEntry(3, 30, 80, undefined, undefined, h2));
        values.add(new WaterfallEntry(4, 40, 80));
        values.add(new WaterfallEntry(5, 50, 80, undefined, undefined, h3));
        values.add(new WaterfallEntry(6, 60, 80));
        values.add(new WaterfallEntry(7, 70, 80, undefined, undefined, h4));
        let dataSet: WaterfallDataSet = new WaterfallDataSet(values, 'DataSet');
        dataSet.setHighLightColor(Color.Black);
        dataSet.setDrawIcons(false);
        dataSet.setColorByColor(Color.Pink);
        dataSet.setValueTextSize(vp2px(10));
        let dataSetList: JArrayList<IBarDataSet> = new JArrayList<IBarDataSet>();
        dataSetList.add(dataSet);
        let barData: BarData = new BarData(dataSetList);
        barData.setBarWidth(0.3);
        return barData;
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
        __Common__.create();
        __Common__.width('100%');
        __Common__.height('70%');
        let earlierCreatedChild_3: WaterfallChart = (this && this.findChildById) ? this.findChildById("3") as WaterfallChart : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new WaterfallChart("3", this, { model: this.model }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                model: this.model
            });
            if (!earlierCreatedChild_3.needsUpdate()) {
                earlierCreatedChild_3.markStatic();
            }
            View.create(earlierCreatedChild_3);
        }
        __Common__.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new SimpleWaterfallChartPage("1", undefined, {}));
