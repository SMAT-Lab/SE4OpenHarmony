interface fragSimpleLineIndex_Params {
    minOffset?: number;
    lineChartModel?: LineChartModel;
    lineData?: LineData | null;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "frag_simple_line_index_" + ++__generate__Id;
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
import { LegendEntry } from '@ohos/mpchart';
import { XAxis, XAxisPosition } from '@ohos/mpchart';
import { YAxis, AxisDependency, YAxisLabelPosition } from '@ohos/mpchart';
import { LineData } from '@ohos/mpchart';
import { LineDataSet, Mode } from '@ohos/mpchart';
import { EntryOhos } from '@ohos/mpchart';
import { JArrayList } from '@ohos/mpchart';
import { ILineDataSet } from '@ohos/mpchart';
import { LineChartModel } from '@ohos/mpchart';
import { LineChart } from '@ohos/mpchart';
import Cosine from '../data/Cosine';
import Sine from '../data/Sine';
interface legendItem {
    index: number;
    legendItem: LegendEntry;
}
export default class fragSimpleLineIndex extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.minOffset = 15;
        this.__lineChartModel = new ObservedPropertyObject(new LineChartModel(), this, "lineChartModel");
        this.lineData = null;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: fragSimpleLineIndex_Params) {
        if (params.minOffset !== undefined) {
            this.minOffset = params.minOffset;
        }
        if (params.lineChartModel !== undefined) {
            this.lineChartModel = params.lineChartModel;
        }
        if (params.lineData !== undefined) {
            this.lineData = params.lineData;
        }
    }
    aboutToBeDeleted() {
        this.__lineChartModel.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private minOffset: number;
    private __lineChartModel: ObservedPropertyObject<LineChartModel>;
    get lineChartModel() {
        return this.__lineChartModel.get();
    }
    set lineChartModel(newValue: LineChartModel) {
        this.__lineChartModel.set(newValue);
    }
    private lineData: LineData | null;
    render() {
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Stack.create({ alignContent: Alignment.TopStart });
        Stack.pop();
        Column.pop();
    }
    aboutToAppear() {
        this.lineData = this.initCurveData(45, 100);
        this.lineChartModel.setData(this.lineData);
        let xAxis = this.lineChartModel.getXAxis();
        if (xAxis) {
            xAxis.setLabelCount(5, false);
            xAxis.setPosition(XAxisPosition.TOP);
            xAxis.setAxisMinimum(0);
            xAxis.setAxisMaximum(this.lineData.getXMax());
            xAxis.setDrawAxisLine(false);
            xAxis.setDrawLabels(false);
            xAxis.setDrawGridLines(false);
        }
        let leftAxis = this.lineChartModel.getAxisLeft();
        if (leftAxis) {
            leftAxis.setLabelCount(10, false);
            leftAxis.setPosition(YAxisLabelPosition.OUTSIDE_CHART);
            leftAxis.setAxisMinimum(this.lineData.getYMin() - 0.3);
            leftAxis.setAxisMaximum(this.lineData.getYMax() + 0.3);
            leftAxis.setDrawGridLines(true);
            leftAxis.setDrawAxisLine(true);
            leftAxis.setTextColor(Color.White);
            leftAxis.setSpaceTop(15);
            leftAxis.setAxisLineColor(0x80333333);
        }
        let rightAxis = this.lineChartModel.getAxisRight();
        if (rightAxis) {
            rightAxis = new YAxis(AxisDependency.RIGHT);
            rightAxis.setDrawGridLines(false);
            //rightAxis.setLabelCount(7, false);
            rightAxis.setAxisMinimum(this.lineData.getYMin()); // this replaces setStartAtZero(true)
            rightAxis.setAxisMaximum(this.lineData.getYMax());
            rightAxis.setDrawAxisLine(false);
            rightAxis.setDrawLabels(false);
        }
    }
    /**
     * 初始化数据
     * @param count  曲线图点的个数
     * @param range  y轴范围
     */
    private initCurveData(count: number, range: number): LineData {
        let valuesSine = new JArrayList<EntryOhos>();
        let sine: number[] = new Sine().data;
        for (let i = 0; i < sine.length; i++) {
            valuesSine.add(new EntryOhos(i, sine[i]));
        }
        let valuesCosine = new JArrayList<EntryOhos>();
        let cosine: number[] = new Cosine().data;
        for (let i = 0; i < cosine.length; i++) {
            valuesCosine.add(new EntryOhos(i, cosine[i]));
        }
        let dataSet = new JArrayList<ILineDataSet>();
        let set1 = new LineDataSet(valuesSine, "Sine function");
        set1.setLineWidth(2);
        set1.setDrawFilled(false);
        set1.setDrawValues(false);
        set1.setMode(Mode.CUBIC_BEZIER);
        set1.setColorByColor(0xc0ff8c);
        set1.setDrawCircles(false);
        let set2 = new LineDataSet(valuesCosine, "Cosine function");
        set2.setLineWidth(2);
        set2.setDrawFilled(false);
        set2.setDrawValues(false);
        set2.setMode(Mode.CUBIC_BEZIER);
        set2.setColorByColor(0xfff78c);
        set2.setDrawCircles(false);
        dataSet.add(set1);
        dataSet.add(set2);
        return new LineData(dataSet);
    }
}
loadDocument(new fragSimpleLineIndex("1", undefined, {}));
