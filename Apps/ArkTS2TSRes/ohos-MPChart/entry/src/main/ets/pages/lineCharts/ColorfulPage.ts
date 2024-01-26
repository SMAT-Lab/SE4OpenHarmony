interface ColorfulPage_Params {
    title?: string;
    titleModel?: ChartTitleModel;
    lineChartModel1?: LineChartModel;
    lineChartModel2?: LineChartModel;
    lineChartModel3?: LineChartModel;
    lineChartModel4?: LineChartModel;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ColorfulPage_" + ++__generate__Id;
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
import { Color as ChartColor, JArrayList, XAxis, XAxisPosition, YAxis, Description, Legend, OnChartValueSelectedListener, Highlight, EntryOhos, YAxisLabelPosition, LineDataSet, ILineDataSet, LineData, Mode, LineChart, LineChartModel, OnChartGestureListener, ChartGesture, ColorTemplate, AxisDependency } from '@ohos/mpchart';
import title, { ChartTitleModel } from '../../title';
class ColorfulPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.title = 'LineChartPageColored';
        this.titleModel = new ChartTitleModel();
        this.lineChartModel1 = new LineChartModel();
        this.lineChartModel2 = new LineChartModel();
        this.lineChartModel3 = new LineChartModel();
        this.lineChartModel4 = new LineChartModel();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ColorfulPage_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.titleModel !== undefined) {
            this.titleModel = params.titleModel;
        }
        if (params.lineChartModel1 !== undefined) {
            this.lineChartModel1 = params.lineChartModel1;
        }
        if (params.lineChartModel2 !== undefined) {
            this.lineChartModel2 = params.lineChartModel2;
        }
        if (params.lineChartModel3 !== undefined) {
            this.lineChartModel3 = params.lineChartModel3;
        }
        if (params.lineChartModel4 !== undefined) {
            this.lineChartModel4 = params.lineChartModel4;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    //标题栏标题
    private title: string;
    private titleModel: ChartTitleModel;
    private lineChartModel1: LineChartModel;
    private lineChartModel2: LineChartModel;
    private lineChartModel3: LineChartModel;
    private lineChartModel4: LineChartModel;
    aboutToAppear() {
        this.titleModel.title = this.title;
        this.initialLineChartModel(this.lineChartModel1);
        this.initialLineChartModel(this.lineChartModel2);
        this.initialLineChartModel(this.lineChartModel3);
        this.initialLineChartModel(this.lineChartModel4);
    }
    // 初始化折线图数据模型
    private initialLineChartModel(model: LineChartModel) {
        let description: Description | null = model.getDescription();
        if (description) {
            description.setEnabled(false);
        }
        model.setMaxVisibleValueCount(50);
        model.setPinchZoom(false);
        model.setDrawGridBackground(false);
        let xAxis: XAxis | null = model.getXAxis();
        if (xAxis) {
            xAxis.setEnabled(false);
            xAxis.setXOffset(0);
            xAxis.setPosition(XAxisPosition.BOTTOM);
            xAxis.setDrawGridLines(false);
            xAxis.setGranularity(1);
            xAxis.setLabelCount(7);
        }
        let leftAxis: YAxis | null = model.getAxisLeft();
        if (leftAxis) {
            leftAxis.setEnabled(false);
            leftAxis.setLabelCount(8, false);
            leftAxis.setPosition(YAxisLabelPosition.OUTSIDE_CHART);
            leftAxis.setSpaceTop(15);
            leftAxis.setAxisMinimum(0);
        }
        let rightAxis: YAxis | null = model.getAxisRight();
        if (rightAxis) {
            rightAxis.setEnabled(false);
            rightAxis.setLabelCount(8, false);
            rightAxis.setDrawGridLines(false);
            rightAxis.setSpaceTop(15);
            rightAxis.setAxisMinimum(0);
        }
        let legend: Legend | null = model.getLegend();
        if (legend) {
            legend.setEnabled(false);
        }
        let start: number = 1;
        let values: JArrayList<EntryOhos> = new JArrayList<EntryOhos>();
        for (let i = start; i < 40; i++) {
            let val = Number(Math.random() * 41);
            if (Math.random() * 100 < 25) {
                values.add(new EntryOhos(i, val));
            }
            else {
                values.add(new EntryOhos(i, val));
            }
        }
        let dataSet: LineDataSet = new LineDataSet(values, 'DataSet');
        dataSet.setHighlightEnabled(false);
        dataSet.setDrawIcons(false);
        dataSet.setMode(Mode.LINEAR);
        dataSet.setDrawCircles(true);
        dataSet.setDrawCircleHole(true); //设置内部孔
        dataSet.setCircleHoleColor(Color.Green);
        dataSet.setDrawValues(false);
        dataSet.setColorByColor(Color.White); //设置折线颜色
        // 设置数据点的颜色
        dataSet.setCircleColor(Color.White); // 可以将圆环设置为你想要的颜色
        // dataSet.enableDashedLine(5, 5, 0);//虚折线
        // 设置数据点的半径
        dataSet.setCircleRadius(5); // 设置半径大小
        dataSet.setCircleHoleRadius(2.5); //设置内径
        let dataSetList: JArrayList<ILineDataSet> = new JArrayList<ILineDataSet>();
        dataSetList.add(dataSet);
        let lineData: LineData = new LineData(dataSetList);
        lineData.setValueTextSize(vp2px(10));
        model.setData(lineData);
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
        Column.layoutWeight(1);
        Stack.create({ alignContent: Alignment.TopStart });
        Stack.pop();
        Stack.create({ alignContent: Alignment.TopStart });
        Stack.pop();
        Stack.create({ alignContent: Alignment.TopStart });
        Stack.pop();
        Stack.create({ alignContent: Alignment.TopStart });
        Stack.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new ColorfulPage("1", undefined, {}));
