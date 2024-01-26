interface CandlestickChartPage_Params {
    menuItemArr?: Array<string>;
    title?: string;
    titleModel?: ChartTitleModel;
    model?: CandleStickChartModel | null;
    titleSelectString?: string;
    seekBarX?: SeekBarModel;
    seekBarY?: SeekBarModel;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CandlestickChartPage_" + ++__generate__Id;
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
import { AxisDependency, CandleData, CandleDataSet, CandleEntry, CandleStickChart, CandleStickChartModel, ChartPixelMap, Description, JArrayList, Legend, Style, XAxis, XAxisPosition, YAxis } from '@ohos/mpchart';
import title, { ChartTitleModel } from '../../title';
import SeekBar, { SeekBarModel } from '../../customcomponents/SeekBar';
class CandlestickChartPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.menuItemArr = ['Animate X', 'Animate Y', 'Animate XY'];
        this.title = 'CandleStickChartPage';
        this.__titleModel = new ObservedPropertyObject(new ChartTitleModel(), this, "titleModel");
        this.model = null;
        this.titleSelectString = 'X';
        this.__seekBarX = new ObservedPropertyObject(new SeekBarModel(), this, "seekBarX");
        this.__seekBarY = new ObservedPropertyObject(new SeekBarModel(), this, "seekBarY");
        this.updateWithValueParams(params);
        this.declareWatch("titleModel", this.menuCallback);
        this.declareWatch("seekBarX", this.seekBarXValueWatch);
        this.declareWatch("seekBarY", this.seekBarYValueWatch);
    }
    updateWithValueParams(params: CandlestickChartPage_Params) {
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
        if (params.titleSelectString !== undefined) {
            this.titleSelectString = params.titleSelectString;
        }
        if (params.seekBarX !== undefined) {
            this.seekBarX = params.seekBarX;
        }
        if (params.seekBarY !== undefined) {
            this.seekBarY = params.seekBarY;
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
    private title: string;
    private __titleModel: ObservedPropertyObject<ChartTitleModel>;
    get titleModel() {
        return this.__titleModel.get();
    }
    set titleModel(newValue: ChartTitleModel) {
        this.__titleModel.set(newValue);
    }
    private model: CandleStickChartModel | null;
    private titleSelectString: string;
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
                this.titleSelectString = 'X';
                this.animate();
                break;
            case 'Animate Y':
                this.titleSelectString = 'Y';
                this.animate();
                break;
            case 'Animate XY':
                this.titleSelectString = 'XY';
                this.animate();
                break;
        }
        this.titleModel.setIndex(-1);
    }
    public animate() {
        if (this.model) {
            if (this.titleSelectString == 'X') {
                this.model.animateX(2000);
            }
            else if (this.titleSelectString == 'Y') {
                this.model.animateY(2000);
            }
            else if (this.titleSelectString == 'XY') {
                this.model.animateXY(2000, 2000);
            }
        }
    }
    aboutToAppear() {
        this.seekBarX.setValue(40)
            .setMax(50)
            .setMin(5);
        this.seekBarY.setValue(100)
            .setMax(200)
            .setMin(20);
        this.titleModel.menuItemArr = this.menuItemArr;
        this.titleModel.title = this.title;
        this.model = new CandleStickChartModel();
        let description: Description | null = this.model.getDescription();
        if (description) {
            description.setEnabled(false);
        }
        let l: Legend | null = this.model.getLegend();
        if (l) {
            l.setEnabled(true);
        }
        this.model.setMaxVisibleValueCount(60);
        this.model.setPinchZoom(false);
        this.model.setDrawGridBackground(true);
        this.model.setGridBackgroundColor(Color.White);
        this.setData(40, 100);
        let xAxis: XAxis | null = this.model.getXAxis();
        if (xAxis) {
            xAxis.setPosition(XAxisPosition.BOTTOM);
            xAxis.setDrawGridLines(true);
        }
        let leftAxis: YAxis | null = this.model.getAxisLeft();
        if (leftAxis) {
            leftAxis.setLabelCount(7, false);
            leftAxis.setDrawGridLines(true);
            leftAxis.setDrawAxisLine(true);
        }
        let rightAxis: YAxis | null = this.model.getAxisRight();
        if (rightAxis) {
            rightAxis.setLabelCount(7, false);
            rightAxis.setDrawGridLines(true);
            rightAxis.setDrawAxisLine(true);
        }
        let legend: Legend | null = this.model.getLegend();
        if (legend) {
            legend.setEnabled(true);
        }
    }
    private setData(count: number, range: number): void {
        let values: JArrayList<CandleEntry> = new JArrayList<CandleEntry>();
        for (let i = 0; i < count; i++) {
            let val: number = (Math.random() * 40) + (range + 3);
            let high: number = Number(Math.random() * 9) + 8.0;
            let low: number = Number(Math.random() * 9) + 8.0;
            let open: number = Number(Math.random() * 6) + 1.0;
            let close: number = Number(Math.random() * 6) + 1.0;
            let even: boolean = i % 2 == 0;
            values.add(new CandleEntry(i, val + high, val - low, even ? val + open : val - open, even ? val - close : val + close, new ChartPixelMap()));
        }
        let dataSet: CandleDataSet = new CandleDataSet(values, "Data Set");
        dataSet.setDrawIcons(false);
        dataSet.setAxisDependency(AxisDependency.LEFT);
        dataSet.setShadowColor(Color.Gray);
        dataSet.setShadowWidth(0.7);
        dataSet.setDecreasingPaintStyle(Style.FILL);
        dataSet.setDecreasingColor(Color.Red);
        dataSet.setIncreasingColor(Color.Green);
        dataSet.setIncreasingPaintStyle(Style.STROKE);
        dataSet.setNeutralColor(Color.Blue);
        let data: CandleData = new CandleData([dataSet]);
        data.setValueTextSize(vp2px(7));
        if (this.model) {
            this.model.resetTracking();
            this.model.setData(data);
            this.model.invalidate();
        }
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
loadDocument(new CandlestickChartPage("1", undefined, {}));
