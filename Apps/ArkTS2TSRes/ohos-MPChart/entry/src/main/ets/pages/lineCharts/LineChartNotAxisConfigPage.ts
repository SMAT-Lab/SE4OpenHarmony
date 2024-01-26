interface LineChartNotAxisConfigPage_Params {
    menuItemArr?: Array<string>;
    title?: string;
    titleModel?: ChartTitleModel;
    model?: LineChartModel | null;
    dataSet?: LineDataSet | null;
    titleSelcetString?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "LineChartNotAxisConfigPage_" + ++__generate__Id;
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
import { Color as ChartColor, JArrayList, EntryOhos, LineDataSet, ILineDataSet, LineData, Mode, LineChart, LineChartModel, } from '@ohos/mpchart';
import title, { ChartTitleModel } from '../../title';
class LineChartNotAxisConfigPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.menuItemArr = ['Animate X', 'Animate Y', 'Animate XY'];
        this.title = 'No Axis settings';
        this.__titleModel = new ObservedPropertyObject(new ChartTitleModel(), this, "titleModel");
        this.model = null;
        this.dataSet = null;
        this.titleSelcetString = 'X';
        this.updateWithValueParams(params);
        this.declareWatch("titleModel", this.menuCallback);
    }
    updateWithValueParams(params: LineChartNotAxisConfigPage_Params) {
        if (params.menuItemArr !== undefined) {
            this.menuItemArr = params.menuItemArr;
        }
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
    private model: LineChartModel | null;
    private dataSet: LineDataSet | null;
    private titleSelcetString: string;
    //标题栏菜单回调
    menuCallback() {
        if (this.titleModel == null || this.titleModel == undefined) {
            return;
        }
        let index: number = this.titleModel.getIndex();
        if (index == undefined || index == -1) {
            return;
        }
        switch (this.menuItemArr[index]) {
            case 'Animate X':
                this.titleSelcetString = 'X';
                this.animate();
                break;
            case 'Animate Y':
                this.titleSelcetString = 'Y';
                this.animate();
                break;
            case 'Animate XY':
                this.titleSelcetString = 'XY';
                this.animate();
                break;
        }
        this.titleModel.setIndex(-1);
    }
    public animate() {
        if (this.model) {
            if (this.titleSelcetString == 'X') {
                this.model.animateX(2000);
            }
            else if (this.titleSelcetString == 'Y') {
                this.model.animateY(2000);
            }
            else if (this.titleSelcetString == 'XY') {
                this.model.animateXY(2000, 2000);
            }
        }
    }
    aboutToAppear() {
        this.titleModel.menuItemArr = this.menuItemArr;
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
        this.dataSet.setDrawCircles(true); //折线点画圆圈
        this.dataSet.setDrawCircleHole(false); //设置内部孔
        this.dataSet.setColorByColor(Color.Black); //设置折现颜色
        // 设置数据点的颜色
        this.dataSet.setCircleColor(Color.Blue); // 可以设置为你想要的颜色
        // 设置数据点的半径
        this.dataSet.setCircleRadius(4); // 设置半径大小
        this.dataSet.setCircleHoleRadius(2); //设置内径
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
        Flex.create({ justifyContent: FlexAlign.Center, direction: FlexDirection.Column });
        Flex.margin(10);
        Text.create('演示不设置任何Axis轴的默认情况!');
        Text.fontSize(14);
        Text.fontWeight(FontWeight.Medium);
        Text.fontColor(Color.Orange);
        Text.pop();
        Flex.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new LineChartNotAxisConfigPage("1", undefined, {}));
