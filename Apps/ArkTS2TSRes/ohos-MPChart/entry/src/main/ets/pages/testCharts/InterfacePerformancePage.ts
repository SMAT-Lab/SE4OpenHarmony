interface performanceTestPage_Params {
    title?: string;
    titleModel?: ChartTitleModel;
    model?: LineChartModel | null;
    dataSet?: LineDataSet | null;
    titleSelcetString?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "InterfacePerformancePage_" + ++__generate__Id;
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
import { Color as ChartColor, JArrayList, EntryOhos, LineDataSet, ILineDataSet, LineData, Mode, LineChart, LineChartModel, YAxis, XAxis, } from '@ohos/mpchart/index';
import { EventControl, EventType } from '@ohos/mpchart/src/main/ets/components/listener/EventControl';
import title, { ChartTitleModel } from '../../title';
import { GridLineConfig } from '@ohos/mpchart/src/main/ets/components/interfaces/LineConfig/CustomGridLineConfig';
import calcFunctionExecTime from '../../utils/calcFunctionExecTime';
class performanceTestPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.title = 'Performance Test';
        this.__titleModel = new ObservedPropertyObject(new ChartTitleModel(), this, "titleModel");
        this.model = null;
        this.dataSet = null;
        this.titleSelcetString = 'X';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: performanceTestPage_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.titleModel !== undefined) {
            this.titleModel = params.titleModel;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.dataSet !== undefined) {
            this.dataSet = params.dataSet;
        }
        if (params.titleSelcetString !== undefined) {
            this.titleSelcetString = params.titleSelcetString;
        }
    }
    aboutToBeDeleted() {
        this.__titleModel.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    //标题栏标题
    private title: string;
    private __titleModel: ObservedPropertyObject<ChartTitleModel>;
    get titleModel() {
        return this.__titleModel.get();
    }
    set titleModel(newValue: ChartTitleModel) {
        this.__titleModel.set(newValue);
    }
    private model: LineChartModel | null;
    private dataSet: LineDataSet | null;
    private titleSelcetString: string;
    aboutToAppear() {
        // this.titleModel.menuItemArr = this.menuItemArr
        this.titleModel.title = this.title;
        this.model = new LineChartModel();
        this.model.setMaxVisibleValueCount(60);
        let lineData: LineData = this.getLineData();
        lineData.setValueTextSize(vp2px(10));
        this.model.setData(lineData);
        this.model.setVisibleXRangeMaximum(7);
        this.model.moveViewToX(10);
        this.model.invalidate();
    }
    private getLineData(): LineData {
        let start: number = 1;
        let values: JArrayList<EntryOhos> = new JArrayList<EntryOhos>();
        for (let i = start; i < 20; i++) {
            let val = Number(Math.random() * 141);
            if (Math.random() * 100 < 25) {
                values.add(new EntryOhos(i, val));
            }
            else {
                values.add(new EntryOhos(i, val));
            }
        }
        this.dataSet = new LineDataSet(values, 'DataSet');
        this.dataSet.setHighLightColor(Color.Black);
        this.dataSet.setDrawIcons(false);
        this.dataSet.setMode(Mode.LINEAR);
        this.dataSet.setDrawCircles(true);
        this.dataSet.setDrawCircleHole(false);
        this.dataSet.setColorByColor(Color.Black);
        // 设置数据点的颜色
        this.dataSet.setCircleColor(Color.Blue);
        // 设置数据点的半径
        this.dataSet.setCircleRadius(4);
        this.dataSet.setCircleHoleRadius(2);
        let dataSetList: JArrayList<ILineDataSet> = new JArrayList<ILineDataSet>();
        dataSetList.add(this.dataSet);
        let lineData: LineData = new LineData(dataSetList);
        return lineData;
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
        Scroll.create();
        Scroll.height('60%');
        Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.Start });
        Flex.margin(10);
        If.create();
        if (this.model) {
            If.branchId(0);
            ForEach.create("3", this, ObservedObject.GetRawObject([
                { thisArg: this.model.eventControl, funcName: 'setEventEnable', params: [EventType.SingleTap] },
                { thisArg: this.model.eventControl, funcName: 'setEventDisable', params: [EventType.SingleTap] },
                { thisArg: this.model.eventControl, funcName: 'eventIsEnable', params: [EventType.SingleTap] },
                { thisArg: this.model.eventControl, funcName: 'eventIsDisable', params: [EventType.SingleTap] },
            ]), (item: any) => {
                Button.createWithLabel('eventControl.' + item.funcName);
                Button.width('90%');
                Button.margin({ top: 10 });
                Button.onClick(() => {
                    calcFunctionExecTime<EventControl, EventType>(item.thisArg, item.funcName, item.params);
                });
                Button.pop();
            });
            ForEach.pop();
            Button.createWithLabel('model.setYAxisExtensionLine');
            Button.width('90%');
            Button.margin({ top: 10 });
            Button.onClick(() => {
                if (this.model) {
                    calcFunctionExecTime<LineChartModel, boolean>(this.model, 'setYAxisExtensionLine', [true]);
                }
            });
            Button.pop();
            Button.createWithLabel('model.yAxisExtensionLineIsEnable');
            Button.width('90%');
            Button.margin({ top: 10 });
            Button.onClick(() => {
                if (this.model) {
                    calcFunctionExecTime<LineChartModel, undefined>(this.model, 'yAxisExtensionLineIsEnable', []);
                }
            });
            Button.pop();
            Button.createWithLabel(`xAxis.addGridLine`);
            Button.width('90%');
            Button.margin({ top: 10 });
            Button.onClick(() => {
                const xAxis = this.model?.getXAxis();
                if (xAxis) {
                    calcFunctionExecTime<XAxis, GridLineConfig>(xAxis, 'addGridLine', [{ lineWidth: 1, lineColor: Color.Blue, position: 7 }], {
                        endCallBack: () => {
                            xAxis.getGridLines().clear();
                        }
                    });
                }
            });
            Button.pop();
            Button.createWithLabel(`xAxis.getGridLines`);
            Button.width('90%');
            Button.margin({ top: 10 });
            Button.onClick(() => {
                const xAxis = this.model?.getXAxis();
                if (xAxis) {
                    calcFunctionExecTime<XAxis, GridLineConfig>(xAxis, 'getGridLines', []);
                }
            });
            Button.pop();
            Button.createWithLabel(`xAxis.setTextColor`);
            Button.width('90%');
            Button.margin({ top: 10 });
            Button.onClick(() => {
                const xAxis = this.model?.getXAxis();
                if (xAxis) {
                    calcFunctionExecTime<XAxis, number>(xAxis, 'setTextColor', [Color.Black]);
                }
            });
            Button.pop();
            Button.createWithLabel(`xAxis.setTextSize`);
            Button.width('90%');
            Button.margin({ top: 10 });
            Button.onClick(() => {
                const xAxis = this.model?.getXAxis();
                if (xAxis) {
                    calcFunctionExecTime<XAxis, number>(xAxis, 'setTextSize', [12]);
                }
            });
            Button.pop();
            Button.createWithLabel(`xAxis.setAxisLineColor`);
            Button.width('90%');
            Button.margin({ top: 10 });
            Button.onClick(() => {
                const xAxis = this.model?.getXAxis();
                if (xAxis) {
                    calcFunctionExecTime<XAxis, number>(xAxis, 'setAxisLineColor', [Color.Blue]);
                }
            });
            Button.pop();
            Button.createWithLabel(`xAxis.setAxisLineWidth`);
            Button.width('90%');
            Button.margin({ top: 10 });
            Button.onClick(() => {
                const xAxis = this.model?.getXAxis();
                if (xAxis) {
                    calcFunctionExecTime<XAxis, number>(xAxis, 'setAxisLineWidth', [1]);
                }
            });
            Button.pop();
        }
        If.pop();
        Flex.pop();
        Scroll.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new performanceTestPage("1", undefined, {}));
