interface TallBarChartPage_Params {
    scroller?: Scroller;
    model?: BarChartModel;
    minOffset?: number;
    leftAxis?: YAxis | null;
    rightAxis?: YAxis | null;
    bottomAxis?: XAxis;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TallBarChartPage_" + ++__generate__Id;
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
import { ColorTemplate } from '@ohos/mpchart';
import { XAxis, XAxisPosition } from '@ohos/mpchart';
import { YAxis, AxisDependency, YAxisLabelPosition } from '@ohos/mpchart';
import { BarEntry } from '@ohos/mpchart';
import { JArrayList } from '@ohos/mpchart';
import { BarDataSet } from '@ohos/mpchart';
import { BarData } from '@ohos/mpchart';
import { BarChart, BarChartModel } from '@ohos/mpchart';
import { IBarDataSet } from '@ohos/mpchart';
class TallBarChartPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.__model = new ObservedPropertyObject(new BarChartModel(), this, "model");
        this.minOffset = 15;
        this.leftAxis = null;
        this.rightAxis = null;
        this.bottomAxis = new XAxis();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TallBarChartPage_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.minOffset !== undefined) {
            this.minOffset = params.minOffset;
        }
        if (params.leftAxis !== undefined) {
            this.leftAxis = params.leftAxis;
        }
        if (params.rightAxis !== undefined) {
            this.rightAxis = params.rightAxis;
        }
        if (params.bottomAxis !== undefined) {
            this.bottomAxis = params.bottomAxis;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller;
    private __model: ObservedPropertyObject<BarChartModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: BarChartModel) {
        this.__model.set(newValue);
    }
    private minOffset: number; //X轴线偏移量
    private leftAxis: YAxis | null;
    private rightAxis: YAxis | null;
    private bottomAxis: XAxis;
    public aboutToAppear() {
        let leftAxis = this.model.getAxisLeft();
        if (leftAxis) {
            leftAxis.setLabelCount(11, false);
            leftAxis.setPosition(YAxisLabelPosition.OUTSIDE_CHART);
            leftAxis.setSpaceTop(15);
            leftAxis.setAxisMinimum(0);
            leftAxis.setAxisMaximum(100);
            leftAxis.enableGridDashedLine(10, 10, 0);
        }
        let rightAxis = this.model.getAxisRight();
        if (rightAxis) {
            rightAxis = new YAxis(AxisDependency.RIGHT);
            rightAxis.setDrawGridLines(false);
            rightAxis.setLabelCount(7, false);
            rightAxis.setSpaceTop(11);
            rightAxis.setAxisMinimum(0); // this replaces setStartAtZero(true)
            rightAxis.setAxisMaximum(100);
        }
        let xAxis = this.model.getXAxis();
        if (xAxis) {
            xAxis.setLabelCount(6, false);
            xAxis.setPosition(XAxisPosition.BOTTOM);
            xAxis.setAxisMinimum(0);
            xAxis.setAxisMaximum(12);
        }
        this.setData(12, 100);
        this.model.setDrawBarShadow(false);
        this.model.setDrawValueAboveBar(true);
        this.model.getDescription()?.setEnabled(false);
        this.model.setMaxVisibleValueCount(60);
    }
    render() {
        Scroll.create(this.scroller);
        Scroll.width('100%');
        Scroll.height('100%');
        Column.create();
        Column.width('100%');
        Column.alignItems(HorizontalAlign.Start);
        Text.create('START OF SCROLLVIEW');
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Blank.create();
        Blank.height(px2vp(350));
        Blank.pop();
        Blank.create();
        Blank.height(px2vp(700));
        Blank.pop();
        Text.create('END OF SCROLLVIEW');
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Column.pop();
        Scroll.pop();
    }
    menuCallback(itemStr: string, index: number) {
        console.info('callback1:' + itemStr + ",index:" + index);
    }
    private setData(count: number, range: number) {
        let start: number = 0;
        let values: JArrayList<BarEntry> = new JArrayList<BarEntry>();
        for (let i = start; i < start + count; i++) {
            let multi = range;
            let val: number = Math.round(Math.random() * multi);
            values.add(new BarEntry(i, val));
        }
        let set1: BarDataSet;
        let barData = this.model.getBarData();
        if (barData != null &&
            barData.getDataSetCount() > 0) {
            set1 = barData.getDataSetByIndex(0) as BarDataSet;
            set1.setValues(values);
            barData.notifyDataChanged();
            this.model.notifyDataSetChanged();
        }
        else {
            set1 = new BarDataSet(values, "Data Set");
            set1.setColorsByVariable(ColorTemplate.VORDIPLOM_COLORS);
            set1.setDrawValues(false);
            let dataSets: JArrayList<IBarDataSet> = new JArrayList<IBarDataSet>();
            dataSets.add(set1);
            let data: BarData = new BarData(dataSets);
            this.model.setData(data);
            this.model.setFitBars(true);
        }
    }
}
loadDocument(new TallBarChartPage("1", undefined, {}));
