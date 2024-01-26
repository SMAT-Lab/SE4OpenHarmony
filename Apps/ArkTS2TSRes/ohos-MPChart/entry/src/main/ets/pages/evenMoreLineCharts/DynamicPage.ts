interface DynamicPage_Params {
    leftAxis?: YAxis | null;
    rightAxis?: YAxis | null;
    topAxis?: XAxis;
    bottomAxis?: XAxis;
    lineData?: LineData;
    mWidth?;
    mHeight?;
    flag?: number;
    colors?;
    index?: number;
    lineChartModel?: LineChartModel;
    values?: JArrayList<EntryOhos>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DynamicPage_" + ++__generate__Id;
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
class DynamicPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.leftAxis = null;
        this.rightAxis = null;
        this.topAxis = new XAxis();
        this.bottomAxis = new XAxis();
        this.__lineData = new ObservedPropertyObject(new LineData(), this, "lineData");
        this.mWidth = 300;
        this.mHeight = 300;
        this.__flag = new ObservedPropertySimple(0, this, "flag");
        this.colors = ColorTemplate.VORDIPLOM_COLORS;
        this.index = 0;
        this.__lineChartModel = new ObservedPropertyObject(new LineChartModel(), this, "lineChartModel");
        this.values = new JArrayList<EntryOhos>();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DynamicPage_Params) {
        if (params.leftAxis !== undefined) {
            this.leftAxis = params.leftAxis;
        }
        if (params.rightAxis !== undefined) {
            this.rightAxis = params.rightAxis;
        }
        if (params.topAxis !== undefined) {
            this.topAxis = params.topAxis;
        }
        if (params.bottomAxis !== undefined) {
            this.bottomAxis = params.bottomAxis;
        }
        if (params.lineData !== undefined) {
            this.lineData = params.lineData;
        }
        if (params.mWidth !== undefined) {
            this.mWidth = params.mWidth;
        }
        if (params.mHeight !== undefined) {
            this.mHeight = params.mHeight;
        }
        if (params.flag !== undefined) {
            this.flag = params.flag;
        }
        if (params.colors !== undefined) {
            this.colors = params.colors;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.lineChartModel !== undefined) {
            this.lineChartModel = params.lineChartModel;
        }
        if (params.values !== undefined) {
            this.values = params.values;
        }
    }
    aboutToBeDeleted() {
        this.__lineData.aboutToBeDeleted();
        this.__flag.aboutToBeDeleted();
        this.__lineChartModel.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private leftAxis: YAxis | null;
    private rightAxis: YAxis | null;
    private topAxis: XAxis;
    private bottomAxis: XAxis; //底部X轴
    private __lineData: ObservedPropertyObject<LineData>;
    get lineData() {
        return this.__lineData.get();
    }
    set lineData(newValue: LineData) {
        this.__lineData.set(newValue);
    }
    private mWidth;
    private mHeight;
    private __flag: ObservedPropertySimple<number>;
    get flag() {
        return this.__flag.get();
    }
    set flag(newValue: number) {
        this.__flag.set(newValue);
    }
    private colors;
    private index: number;
    private __lineChartModel: ObservedPropertyObject<LineChartModel>;
    get lineChartModel() {
        return this.__lineChartModel.get();
    }
    set lineChartModel(newValue: LineChartModel) {
        this.__lineChartModel.set(newValue);
    }
    aboutToAppear() {
        let topAxis = this.lineChartModel.getXAxis();
        if (topAxis) {
            topAxis.setLabelCount(5, false);
            topAxis.setAxisMinimum(0);
            topAxis.setAxisMaximum(50);
            topAxis.setDrawAxisLine(false);
            topAxis.setDrawLabels(true);
            topAxis.setDrawGridLines(true);
        }
        let leftAxis = this.lineChartModel.getAxisLeft();
        if (leftAxis) {
            leftAxis.setLabelCount(6, false);
            leftAxis.setDrawGridLines(true);
            leftAxis.setPosition(YAxisLabelPosition.OUTSIDE_CHART);
            leftAxis.setAxisMinimum(0);
            leftAxis.setAxisMaximum(50);
        }
        let rightAxis = this.lineChartModel.getAxisRight();
        if (rightAxis) {
            rightAxis.setDrawGridLines(true);
            rightAxis.setLabelCount(6, false);
            rightAxis.setAxisMinimum(0);
            rightAxis.setAxisMaximum(50);
        }
        this.lineChartModel.setData(this.lineData);
    }
    private values: JArrayList<EntryOhos>;
    private initCurveData(count: number, range: number): LineData {
        this.values.add(new EntryOhos(count, range));
        let dataSet = new JArrayList<ILineDataSet>();
        let set1 = new LineDataSet(this.values, "DataSet 1");
        set1.setDrawFilled(false);
        set1.setDrawValues(true);
        set1.setDrawCircles(true);
        set1.setDrawCircleHole(true);
        set1.setCircleRadius(4);
        set1.setCircleHoleRadius(2);
        set1.setCircleHoleColor(Color.White);
        set1.setCircleColor(ColorTemplate.colorRgb(140, 234, 255));
        set1.setMode(Mode.LINEAR);
        set1.setColorByColor(ColorTemplate.colorRgb(140, 234, 255));
        set1.setLineWidth(1.5);
        dataSet.add(set1);
        return new LineData(dataSet);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('80%');
        Column.alignItems(HorizontalAlign.Start);
        Column.align(Alignment.Center);
        Button.createWithLabel('Add Entry', { type: ButtonType.Capsule, stateEffect: true });
        Button.backgroundColor(0x317aff);
        Button.width(120);
        Button.margin({ left: 100, top: 25, bottom: 25 });
        Button.onClick(() => {
            this.addEntry();
        });
        Button.pop();
        If.create();
        if (this.flag == 0) {
            If.branchId(0);
            Text.create('No chart data available. Use the menu to add entries and data sets!');
            Text.width('100%');
            Text.height('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
        }
        else {
            If.branchId(1);
        }
        If.pop();
        Column.pop();
    }
    addEntry() {
        if (this.flag != 1) {
            this.flag = 1;
        }
        this.lineChartModel.setData(this.initCurveData(this.index++, Math.random() * 50));
    }
    removeLastEntry() {
        if (this.lineData != null) {
            let set: ILineDataSet | null = this.lineData.getDataSetByIndex(0);
            if (set != null) {
                let e: EntryOhos | null = set.getEntryForXValue(set.getEntryCount() - 1, Number.NaN);
                if (e) {
                    this.lineData.removeEntry(e, 0);
                }
            }
        }
    }
    addDataSet() {
        if (this.lineData == null) {
            this.lineData = new LineData();
        }
        else {
            let count: number = this.lineData.getDataSetCount() + 1;
            let dataSetByIndex = this.lineData.getDataSetByIndex(0);
            if (dataSetByIndex) {
                let amount: number = dataSetByIndex.getEntryCount();
                let values: JArrayList<EntryOhos> = new JArrayList<EntryOhos>();
                for (let i = 0; i < amount; i++) {
                    values.add(new EntryOhos(i, (Math.random() * 50) + 50 * count));
                }
                let dataSet: LineDataSet = new LineDataSet(values, 'DataSet ' + count);
                dataSet.setLineWidth(2.5);
                dataSet.setCircleRadius(4.5);
                let color = this.colors[count % this.colors.length];
                dataSet.setColorByColor(color);
                dataSet.setCircleColor(color);
                dataSet.setHighLightColor(color);
                dataSet.setValueTextSize(10);
                dataSet.setValueTextColor(color);
                this.lineData.addDataSet(dataSet);
                this.lineData.notifyDataChanged();
            }
        }
        this.flag = 1;
    }
    removeDataSet() {
        if (this.lineData != null) {
            let dataSet = this.lineData.getDataSetByIndex(this.lineData.getDataSetCount() - 1);
            if (dataSet) {
                this.lineData.removeDataSet(dataSet);
            }
        }
    }
    clear() {
        this.lineData.clearValues();
        this.flag = 0;
    }
    menuCallback(itemStr: string, index: number) {
        console.log('lz index:' + index);
        switch (index) {
            case 0:
                break;
            case 1:
                this.addEntry();
                //prompt.showToast({ message: 'Entry added!', duration: 1000});
                break;
            case 2:
                this.removeLastEntry();
                //prompt.showToast({ message: 'Entry removed!', duration: 1000});
                break;
            case 3:
                this.addDataSet();
                //prompt.showToast({ message: 'DataSet added!', duration: 1000});
                break;
            case 4:
                this.removeDataSet();
                //prompt.showToast({ message: 'DataSet removed!', duration: 1000});
                break;
            case 5:
                this.clear();
                //prompt.showToast({ message: 'Chart cleared!', duration: 1000});
                break;
            case 6:
                break;
        }
    }
    createSet(): LineDataSet {
        let values = new JArrayList<EntryOhos>();
        for (let i = 0; i < 10; i++) {
            let yVal: number = (Math.random() * 50);
            values.add(new EntryOhos(i, yVal));
        }
        let set1: LineDataSet = new LineDataSet(values, "DataSet 1");
        set1.setDrawFilled(false);
        set1.setDrawValues(true);
        set1.setDrawCircles(true);
        set1.setDrawCircleHole(true);
        set1.setCircleRadius(4);
        set1.setCircleHoleRadius(2);
        set1.setCircleHoleColor(Color.White);
        set1.setCircleColor(ColorTemplate.colorRgb(140, 234, 255));
        set1.setMode(Mode.LINEAR);
        set1.setColorByColor(ColorTemplate.colorRgb(140, 234, 255));
        set1.setLineWidth(2.5);
        return set1;
    }
}
loadDocument(new DynamicPage("1", undefined, {}));
