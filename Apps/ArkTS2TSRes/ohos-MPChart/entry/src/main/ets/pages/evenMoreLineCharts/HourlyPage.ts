interface HourlyPage_Params {
    lineData?: LineData;
    lineChartModel?: LineChartModel;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "HourlyPage_" + ++__generate__Id;
}
/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
import { LineChartModel } from '@ohos/mpchart';
import { LineChart } from '@ohos/mpchart';
import { XAxis, XAxisPosition } from '@ohos/mpchart';
import { YAxis, AxisDependency, YAxisLabelPosition } from '@ohos/mpchart';
import { LineData } from '@ohos/mpchart';
import { LineDataSet, Mode } from '@ohos/mpchart';
import { EntryOhos } from '@ohos/mpchart';
import { JArrayList } from '@ohos/mpchart';
import { ILineDataSet } from '@ohos/mpchart';
import { ColorTemplate } from '@ohos/mpchart';
import { IAxisValueFormatter } from '@ohos/mpchart';
import { AxisBase } from '@ohos/mpchart';
class TopAxisValueFormatter implements IAxisValueFormatter {
    getFormattedValue(value: number, axis: AxisBase): string {
        let mmdd = new Date().toDateString().split(' ');
        let day = Number(mmdd[2]) + value / 20;
        let hours = new Date().getHours() + value / 20;
        console.log('lz getFormattedValue value:' + value);
        return day + ' ' + mmdd[1] + ' ' + hours;
    }
}
class HourlyPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__lineData = new ObservedPropertyObject(new LineData(), this, "lineData");
        this.__lineChartModel = new ObservedPropertyObject(new LineChartModel(), this, "lineChartModel");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: HourlyPage_Params) {
        if (params.lineData !== undefined) {
            this.lineData = params.lineData;
        }
        if (params.lineChartModel !== undefined) {
            this.lineChartModel = params.lineChartModel;
        }
    }
    aboutToBeDeleted() {
        this.__lineData.aboutToBeDeleted();
        this.__lineChartModel.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __lineData: ObservedPropertyObject<LineData>;
    get lineData() {
        return this.__lineData.get();
    }
    set lineData(newValue: LineData) {
        this.__lineData.set(newValue);
    }
    private __lineChartModel: ObservedPropertyObject<LineChartModel>;
    get lineChartModel() {
        return this.__lineChartModel.get();
    }
    set lineChartModel(newValue: LineChartModel) {
        this.__lineChartModel.set(newValue);
    }
    aboutToAppear() {
        this.lineData = this.initCurveData(100, 50);
        this.lineChartModel.setData(this.lineData);
        let topAxis = this.lineChartModel.getXAxis();
        if (topAxis) {
            topAxis.setLabelCount(5, false);
            topAxis.setPosition(XAxisPosition.TOP_INSIDE);
            topAxis.setTextSize(10);
            topAxis.setTextColor(ColorTemplate.colorRgb(255, 192, 56));
            topAxis.setAxisMinimum(0);
            topAxis.setAxisMaximum(100);
            topAxis.setCenterAxisLabels(true);
            topAxis.setDrawAxisLine(true);
            topAxis.setDrawLabels(true);
            topAxis.setDrawGridLines(true);
            topAxis.setGranularity(1);
            topAxis.setValueFormatter(new TopAxisValueFormatter());
        }
        let leftAxis = this.lineChartModel.getAxisLeft();
        if (leftAxis) {
            leftAxis = new YAxis(AxisDependency.LEFT);
            leftAxis.setPosition(YAxisLabelPosition.INSIDE_CHART);
            leftAxis.setDrawGridLines(true);
            leftAxis.setGranularityEnabled(true);
            leftAxis.setAxisMinimum(0);
            leftAxis.setAxisMaximum(170);
            leftAxis.setYOffset(-9);
            leftAxis.setTextColor(ColorTemplate.colorRgb(255, 192, 56));
            leftAxis.setLabelCount(6, false);
        }
        let rightAxis = this.lineChartModel.getAxisRight();
        if (rightAxis) {
            rightAxis = new YAxis(AxisDependency.RIGHT);
            rightAxis.setDrawGridLines(true);
            rightAxis.setLabelCount(6, false);
            rightAxis.setAxisMinimum(0);
            rightAxis.setAxisMaximum(170);
            rightAxis.setDrawAxisLine(true);
            rightAxis.setDrawLabels(false);
            rightAxis.setDrawGridLines(false);
        }
    }
    private initCurveData(count: number, range: number): LineData {
        let values = new JArrayList<EntryOhos>();
        let now: number = new Date().getHours();
        let to: number = now + count;
        for (let x = 0; x < count; x++) {
            let yVal: number = (Math.random() * range) + 50;
            values.add(new EntryOhos(x, yVal));
        }
        let dataSet = new JArrayList<ILineDataSet>();
        let dataSet1 = new LineDataSet(values, "DataSet 1");
        dataSet1.setDrawFilled(false);
        dataSet1.setDrawValues(false);
        dataSet1.setDrawCircles(false);
        dataSet1.setDrawCircleHole(false);
        dataSet1.setCircleRadius(4);
        dataSet1.setCircleHoleRadius(2);
        dataSet1.setCircleHoleColor(Color.White);
        dataSet1.setCircleColor(ColorTemplate.colorRgb(140, 234, 255));
        dataSet1.setMode(Mode.LINEAR);
        dataSet1.setColorByColor(ColorTemplate.colorRgb(140, 234, 255));
        dataSet1.setLineWidth(1.5);
        dataSet.add(dataSet1);
        return new LineData(dataSet);
    }
    render() {
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.pop();
    }
}
loadDocument(new HourlyPage("1", undefined, {}));
