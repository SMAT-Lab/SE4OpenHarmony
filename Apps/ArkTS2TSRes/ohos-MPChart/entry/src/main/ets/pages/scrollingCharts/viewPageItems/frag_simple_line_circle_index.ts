interface fragSimpleLineCircleIndex_Params {
    topAxis?: XAxis;
    bottomAxis?: XAxis;
    mWidth?: number;
    mHeight?: number;
    minOffset?: number;
    leftAxis?: YAxis | null;
    rightAxis?: YAxis | null;
    lineData?: LineData | null;
    legendArr?: LegendEntry[];
    lineChartModel?: LineChartModel;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "frag_simple_line_circle_index_" + ++__generate__Id;
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
import { XAxis } from '@ohos/mpchart';
import { YAxis } from '@ohos/mpchart';
import { LineData } from '@ohos/mpchart';
import { LineDataSet, Mode } from '@ohos/mpchart';
import { EntryOhos } from '@ohos/mpchart';
import { JArrayList } from '@ohos/mpchart';
import { ILineDataSet } from '@ohos/mpchart';
import { LineChartModel } from '@ohos/mpchart';
import { LineChart } from '@ohos/mpchart';
import N from '../data/N';
import Nlogn from '../data/Nlogn';
import Square from '../data/Square';
import Three from '../data/Three';
export default class fragSimpleLineCircleIndex extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.topAxis = new XAxis();
        this.bottomAxis = new XAxis();
        this.mWidth = 380;
        this.mHeight = 600;
        this.minOffset = 15;
        this.leftAxis = null;
        this.rightAxis = null;
        this.lineData = null;
        this.legendArr = [];
        this.__lineChartModel = new ObservedPropertyObject(new LineChartModel(), this, "lineChartModel");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: fragSimpleLineCircleIndex_Params) {
        if (params.topAxis !== undefined) {
            this.topAxis = params.topAxis;
        }
        if (params.bottomAxis !== undefined) {
            this.bottomAxis = params.bottomAxis;
        }
        if (params.mWidth !== undefined) {
            this.mWidth = params.mWidth;
        }
        if (params.mHeight !== undefined) {
            this.mHeight = params.mHeight;
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
        if (params.lineData !== undefined) {
            this.lineData = params.lineData;
        }
        if (params.legendArr !== undefined) {
            this.legendArr = params.legendArr;
        }
        if (params.lineChartModel !== undefined) {
            this.lineChartModel = params.lineChartModel;
        }
    }
    aboutToBeDeleted() {
        this.__lineChartModel.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private topAxis: XAxis; //顶部X轴
    private bottomAxis: XAxis; //底部X轴
    private mWidth: number; //表的宽度
    private mHeight: number; //表的高度
    private minOffset: number;
    private leftAxis: YAxis | null;
    private rightAxis: YAxis | null;
    private lineData: LineData | null;
    private legendArr: LegendEntry[];
    private __lineChartModel: ObservedPropertyObject<LineChartModel>;
    get lineChartModel() {
        return this.__lineChartModel.get();
    }
    set lineChartModel(newValue: LineChartModel) {
        this.__lineChartModel.set(newValue);
    }
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
        let leftAxis = this.lineChartModel.getAxisLeft();
        if (leftAxis) {
            leftAxis.setLabelCount(7, false);
            leftAxis.setAxisMinimum(this.lineData.getYMin());
            leftAxis.setAxisMaximum(this.lineData.getYMax() + 10);
            leftAxis.setDrawGridLines(true);
            leftAxis.setDrawAxisLine(true);
            leftAxis.setTextColor(Color.White);
            leftAxis.setSpaceTop(15);
            leftAxis.setAxisLineColor(0x80333333);
        }
        let rightAxis = this.lineChartModel.getAxisRight();
        if (rightAxis) {
            rightAxis.setDrawGridLines(false);
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
        let valuesN = new JArrayList<EntryOhos>();
        let n: number[] = new N().data;
        for (let i = 0; i < n.length; i++) {
            valuesN.add(new EntryOhos(i, n[i]));
        }
        let valuesNlogn = new JArrayList<EntryOhos>();
        let nlogn: number[] = new Nlogn().data;
        for (let i = 0; i < nlogn.length; i++) {
            valuesNlogn.add(new EntryOhos(i, nlogn[i]));
        }
        let valuesSquare = new JArrayList<EntryOhos>();
        let square: number[] = new Square().data;
        for (let i = 0; i < square.length; i++) {
            valuesSquare.add(new EntryOhos(i, square[i]));
        }
        let valuesThree = new JArrayList<EntryOhos>();
        let three: number[] = new Three().data;
        for (let i = 0; i < three.length; i++) {
            valuesThree.add(new EntryOhos(i, three[i]));
        }
        let dataSet = new JArrayList<ILineDataSet>();
        let set1 = new LineDataSet(valuesN, "O(n)");
        set1.setDrawFilled(false);
        set1.setDrawValues(false);
        set1.setDrawCircles(true);
        set1.setDrawCircleHole(true);
        set1.setCircleColor(0xc0ff8c);
        set1.setCircleRadius(3);
        set1.setCircleHoleRadius(2);
        set1.setMode(Mode.LINEAR);
        set1.setColorByColor(0xc0ff8c);
        set1.setLineWidth(2.5);
        let set2 = new LineDataSet(valuesNlogn, "O(nlogn)");
        set2.setDrawFilled(false);
        set2.setDrawValues(false);
        set2.setDrawCircles(true);
        set2.setDrawCircleHole(true);
        set2.setCircleColor(0xfff78c);
        set2.setCircleRadius(3);
        set2.setCircleHoleRadius(2);
        set2.setMode(Mode.LINEAR);
        set2.setColorByColor(0xfff78c);
        set2.setLineWidth(2.5);
        let set3 = new LineDataSet(valuesSquare, "O(n²)");
        set3.setDrawFilled(false);
        set3.setDrawValues(false);
        set3.setDrawCircles(true);
        set3.setDrawCircleHole(true);
        set3.setCircleColor(0xffd068);
        set3.setCircleRadius(3);
        set3.setCircleHoleRadius(2);
        set3.setMode(Mode.LINEAR);
        set3.setColorByColor(0xffd068);
        set3.setLineWidth(2.5);
        let set4 = new LineDataSet(valuesThree, "O(n³)");
        set4.setDrawFilled(false);
        set4.setDrawValues(false);
        set4.setDrawCircles(true);
        set4.setDrawCircleHole(true);
        set4.setCircleColor(0x8ceaff);
        set4.setCircleRadius(3);
        set4.setCircleHoleRadius(2);
        set4.setMode(Mode.LINEAR);
        set4.setColorByColor(0x8ceaff);
        set4.setLineWidth(2.5);
        dataSet.add(set1);
        dataSet.add(set2);
        dataSet.add(set3);
        dataSet.add(set4);
        return new LineData(dataSet);
    }
    private getFormattedValue(value: number): string {
        return value.toFixed(1);
    }
}
loadDocument(new fragSimpleLineCircleIndex("1", undefined, {}));
