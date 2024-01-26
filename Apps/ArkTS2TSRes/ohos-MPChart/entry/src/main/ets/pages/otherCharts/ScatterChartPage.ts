interface Index_Params {
    menuItemArr?: Array<string>;
    title?: string;
    titleModel?: ChartTitleModel;
    model?: ScatterChartModel | null;
    seekBarX?: SeekBarModel;
    seekBarY?: SeekBarModel;
    valueSelectedListener?: OnChartValueSelectedListener;
    isDrawValuesEnable?: boolean;
    titleSelcetString?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ScatterChartPage_" + ++__generate__Id;
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
import { Color as ChartColor, JArrayList, XAxis, XAxisPosition, YAxis, Description, Legend, OnChartValueSelectedListener, Highlight, EntryOhos, YAxisLabelPosition, ScatterChart, ScatterChartModel, ScatterData, ScatterDataSet, IScatterDataSet, OnChartGestureListener, ChartGesture, ColorTemplate, ChartShape, } from '@ohos/mpchart';
import CustomScatterShapeRenderer from '../../otherChart/CustomScatterShapeRenderer';
import title, { ChartTitleModel } from '../../title';
import SeekBar, { SeekBarModel } from '../../customcomponents/SeekBar';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.menuItemArr = ['Animate X', 'Animate Y', 'Animate XY'];
        this.title = 'ScatterChartPage';
        this.__titleModel = new ObservedPropertyObject(new ChartTitleModel(), this, "titleModel");
        this.model = null;
        this.__seekBarX = new ObservedPropertyObject(new SeekBarModel(), this, "seekBarX");
        this.__seekBarY = new ObservedPropertyObject(new SeekBarModel(), this, "seekBarY");
        this.valueSelectedListener = {
            onValueSelected: (e: EntryOhos, h: Highlight) => {
                console.info("ScatterChartPage onValueSelected: " + e.getX());
            },
            onNothingSelected: () => {
                console.info("ScatterChartPage onNothingSelected");
            }
        };
        this.isDrawValuesEnable = true;
        this.titleSelcetString = 'X';
        this.updateWithValueParams(params);
        this.declareWatch("titleModel", this.menuCallback);
        this.declareWatch("seekBarX", this.seekBarXValueWatch);
        this.declareWatch("seekBarY", this.seekBarYValueWatch);
    }
    updateWithValueParams(params: Index_Params) {
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
        if (params.seekBarX !== undefined) {
            this.seekBarX = params.seekBarX;
        }
        if (params.seekBarY !== undefined) {
            this.seekBarY = params.seekBarY;
        }
        if (params.valueSelectedListener !== undefined) {
            this.valueSelectedListener = params.valueSelectedListener;
        }
        if (params.isDrawValuesEnable !== undefined) {
            this.isDrawValuesEnable = params.isDrawValuesEnable;
        }
        if (params.titleSelcetString !== undefined) {
            this.titleSelcetString = params.titleSelcetString;
        }
    }
    aboutToBeDeleted() {
        this.__titleModel.aboutToBeDeleted();
        this.__seekBarX.aboutToBeDeleted();
        this.__seekBarY.aboutToBeDeleted();
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
    private model: ScatterChartModel | null;
    private __seekBarX: ObservedPropertyObject<SeekBarModel>;
    get seekBarX() {
        return this.__seekBarX.get();
    }
    set seekBarX(newValue: SeekBarModel) {
        this.__seekBarX.set(newValue);
    }
    private __seekBarY: ObservedPropertyObject<SeekBarModel>;
    get seekBarY() {
        return this.__seekBarY.get();
    }
    set seekBarY(newValue: SeekBarModel) {
        this.__seekBarY.set(newValue);
    }
    seekBarXValueWatch(): void {
        this.setData(this.seekBarX.getValue(), this.seekBarY.getValue());
    }
    seekBarYValueWatch(): void {
        this.setData(this.seekBarX.getValue(), this.seekBarY.getValue());
    }
    private valueSelectedListener: OnChartValueSelectedListener;
    private isDrawValuesEnable: boolean;
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
        this.seekBarX.setValue(20)
            .setMax(50)
            .setMin(5);
        this.seekBarY.setValue(100)
            .setMax(200)
            .setMin(20);
        this.titleModel.menuItemArr = this.menuItemArr;
        this.titleModel.title = this.title;
        console.log('aboutToAppear-----' + 'into');
        this.model = new ScatterChartModel();
        let l: Legend | null = this.model.getLegend();
        if (l) {
            l.setEnabled(true);
        }
        this.model.setOnChartValueSelectedListener(this.valueSelectedListener);
        let description: Description | null = this.model.getDescription();
        if (description) {
            description.setEnabled(false);
        }
        this.model.setMaxVisibleValueCount(160);
        this.model.setPinchZoom(false);
        this.model.setDrawGridBackground(false);
        let xAxis: XAxis | null = this.model.getXAxis();
        if (xAxis) {
            xAxis.setPosition(XAxisPosition.BOTTOM);
            xAxis.setDrawGridLines(false);
            xAxis.setGranularity(1);
            xAxis.setLabelCount(7);
        }
        let leftAxis: YAxis | null = this.model.getAxisLeft();
        if (leftAxis) {
            leftAxis.setLabelCount(8, false);
            leftAxis.setPosition(YAxisLabelPosition.OUTSIDE_CHART);
            leftAxis.setSpaceTop(15);
            leftAxis.setAxisMinimum(0);
        }
        let rightAxis: YAxis | null = this.model.getAxisRight();
        if (rightAxis) {
            rightAxis.setLabelCount(8, false);
            rightAxis.setDrawGridLines(false);
            rightAxis.setSpaceTop(15);
            rightAxis.setAxisMinimum(0);
        }
        let start: number = 1;
        let values: JArrayList<EntryOhos> = new JArrayList<EntryOhos>();
        for (let i = start; i < 20; i++) {
            let val = Number(Math.random() * 41);
            if (Math.random() * 100 < 25) {
                values.add(new EntryOhos(i, val));
            }
            else {
                values.add(new EntryOhos(i, val));
            }
        }
        let dataSet: ScatterDataSet = new ScatterDataSet(values, 'DataSet');
        dataSet.setHighLightColor(Color.Black);
        dataSet.setDrawIcons(false);
        let dataSetList: JArrayList<IScatterDataSet> = new JArrayList<IScatterDataSet>();
        dataSetList.add(dataSet);
        this.setData(20, 100);
        this.model.notifyDataSetChanged();
    }
    /**
     * 初始化数据
     * @param xRange  x轴范围
     * @param yRange  y轴范围
     */
    private setData(xRange: number, yRange: number): void {
        let values1 = this.generateRandomData(xRange, yRange);
        let values2 = this.generateRandomData(xRange, yRange);
        let values3 = this.generateRandomData(xRange, yRange);
        let set1 = new ScatterDataSet(values1, "DS 1");
        set1.setScatterShape(ChartShape.SQUARE);
        set1.setColorByColor(ColorTemplate.COLORFUL_COLORS[0]);
        let set2 = new ScatterDataSet(values2, "DS 2");
        set2.setScatterShape(ChartShape.CIRCLE);
        set2.setScatterShapeHoleColor(ColorTemplate.COLORFUL_COLORS[3]);
        set2.setScatterShapeHoleRadius(3);
        set2.setColorByColor(ColorTemplate.COLORFUL_COLORS[1]);
        let set3 = new ScatterDataSet(values3, "DS 3");
        set3.setShapeRenderer(new CustomScatterShapeRenderer());
        set3.setColorByColor(ColorTemplate.COLORFUL_COLORS[2]);
        set1.setScatterShapeSize(8);
        set2.setScatterShapeSize(8);
        set3.setScatterShapeSize(8);
        let dataSets: JArrayList<IScatterDataSet> = new JArrayList<IScatterDataSet>();
        dataSets.add(set1); // add the data sets
        dataSets.add(set2);
        dataSets.add(set3);
        let dataResult: ScatterData = new ScatterData(dataSets);
        dataResult.setDrawValues(this.isDrawValuesEnable);
        dataResult.setValueTextSize(8);
        dataResult.setHighlightEnabled(true);
        dataResult.setValueTextSize(vp2px(10));
        if (this.model) {
            this.model.setData(dataResult);
        }
        dataResult.notifyDataChanged();
    }
    private generateRandomData(xRange: number, yRange: number): JArrayList<EntryOhos> {
        let values = new JArrayList<EntryOhos>();
        for (let i = 0; i < xRange; i++) {
            let x = i; // Random x value within specified count.
            let y = Math.random() * yRange; // Random y value within specified range.
            values.add(new EntryOhos(x, y));
        }
        return values;
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
        Column.create();
        let earlierCreatedChild_3: SeekBar = (this && this.findChildById) ? this.findChildById("3") as SeekBar : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new SeekBar("3", this, { model: this.seekBarX }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                model: this.seekBarX
            });
            View.create(earlierCreatedChild_3);
        }
        let earlierCreatedChild_4: SeekBar = (this && this.findChildById) ? this.findChildById("4") as SeekBar : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new SeekBar("4", this, { model: this.seekBarY }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                model: this.seekBarY
            });
            View.create(earlierCreatedChild_4);
        }
        Column.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
