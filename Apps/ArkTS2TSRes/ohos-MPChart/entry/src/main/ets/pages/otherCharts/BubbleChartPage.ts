interface BubbleChartPage_Params {
    menuItemArr?: Array<string>;
    title?: string;
    titleModel?: ChartTitleModel;
    model?: BubbleChartModel | null;
    seekBarX?: SeekBarModel;
    seekBarY?: SeekBarModel;
    valueSelectedListener?: OnChartValueSelectedListener;
    isDrawValuesEnable?: boolean;
    titleSelcetString?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "BubbleChartPage_" + ++__generate__Id;
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
import { Color as ChartColor, JArrayList, XAxis, XAxisPosition, YAxis, Description, Legend, OnChartValueSelectedListener, Highlight, EntryOhos, YAxisLabelPosition, BubbleEntry, ChartPixelMap, IBubbleDataSet, BubbleDataSet, MPPointF, BubbleChart, BubbleChartModel, BubbleData } from '@ohos/mpchart';
import title, { ChartTitleModel } from '../../title';
import SeekBar, { SeekBarModel } from '../../customcomponents/SeekBar';
class BubbleChartPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.menuItemArr = ['Animate X', 'Animate Y', 'Animate XY'];
        this.title = 'BubbleChartPage';
        this.__titleModel = new ObservedPropertyObject(new ChartTitleModel(), this, "titleModel");
        this.model = null;
        this.__seekBarX = new ObservedPropertyObject(new SeekBarModel(), this, "seekBarX");
        this.__seekBarY = new ObservedPropertyObject(new SeekBarModel(), this, "seekBarY");
        this.valueSelectedListener = {
            onValueSelected: (e: EntryOhos, h: Highlight) => {
                console.info("BubbleChartPage onValueSelected: " + e.getX());
            },
            onNothingSelected: () => {
            }
        };
        this.isDrawValuesEnable = true;
        this.titleSelcetString = 'X';
        this.updateWithValueParams(params);
        this.declareWatch("titleModel", this.menuCallback);
        this.declareWatch("seekBarX", this.seekBarXValueWatch);
        this.declareWatch("seekBarY", this.seekBarYValueWatch);
    }
    updateWithValueParams(params: BubbleChartPage_Params) {
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
    private model: BubbleChartModel | null;
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
        this.seekBarX.setValue(5)
            .setMax(50)
            .setMin(5);
        this.seekBarY.setValue(100)
            .setMax(200)
            .setMin(20);
        this.titleModel.menuItemArr = this.menuItemArr;
        this.titleModel.title = this.title;
        this.model = new BubbleChartModel();
        let l: Legend | null = this.model.getLegend();
        if (l) {
            l.setEnabled(true);
        }
        this.model.setOnChartValueSelectedListener(this.valueSelectedListener);
        let description: Description | null = this.model.getDescription();
        if (description) {
            description.setEnabled(false);
        }
        this.model.setMaxVisibleValueCount(60);
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
        let values: JArrayList<BubbleEntry> = new JArrayList<BubbleEntry>();
        for (let i = start; i < 20; i++) {
            let val = Number(Math.random() * 41);
            if (Math.random() * 100 < 25) {
                values.add(new BubbleEntry(i, val));
            }
            else {
                values.add(new BubbleEntry(i, val));
            }
        }
        let dataSet: BubbleDataSet = new BubbleDataSet(values, 'DataSet');
        dataSet.setHighLightColor(Color.Black);
        dataSet.setDrawIcons(false);
        let dataSetList: JArrayList<IBubbleDataSet> = new JArrayList<IBubbleDataSet>();
        dataSetList.add(dataSet);
        // let lineData: LineData = new LineData(dataSetList);
        // lineData.setValueTextSize(vp2px(10));
        this.setData(5, 50);
        this.model.notifyDataSetChanged();
        this.model.setVisibleXRangeMaximum(7);
    }
    /**
     * 初始化数据
     * @param count  曲线图点的个数
     * @param range  y轴范围
     */
    private setData(count: number, range: number): void {
        let values1 = new JArrayList<BubbleEntry>();
        let values2 = new JArrayList<BubbleEntry>();
        let values3 = new JArrayList<BubbleEntry>();
        let imgePaint: ChartPixelMap = new ChartPixelMap();
        // imgePaint.setIcon($r('app.media.star'))
        imgePaint.setWidth(px2vp(32));
        imgePaint.setHeight(px2vp(32));
        //
        for (let i = 0; i < count; i++) {
            values1.add(new BubbleEntry(i, Math.random() * range, Math.random() * range, imgePaint));
            values2.add(new BubbleEntry(i, Math.random() * range, Math.random() * range, imgePaint));
            values3.add(new BubbleEntry(i, Math.random() * range, Math.random() * range));
        }
        let set1: BubbleDataSet = new BubbleDataSet(values1, "DS 1");
        set1.setDrawIcons(false);
        set1.setColorByColor(0x88c12552);
        set1.setIconsOffset(new MPPointF(0, px2vp(0)));
        set1.setDrawValues(this.isDrawValuesEnable);
        let set2: BubbleDataSet = new BubbleDataSet(values2, "DS 2");
        set2.setDrawIcons(false);
        set2.setIconsOffset(new MPPointF(0, px2vp(0)));
        set2.setColorByColor(0x88ff6600);
        set2.setDrawValues(this.isDrawValuesEnable);
        let set3: BubbleDataSet = new BubbleDataSet(values3, "DS 3");
        set3.setDrawIcons(false);
        set3.setIconsOffset(new MPPointF(0, 0));
        set3.setColorByColor(0x88f5c700);
        set3.setDrawValues(this.isDrawValuesEnable);
        let dataSets = new JArrayList<IBubbleDataSet>();
        dataSets.add(set1);
        dataSets.add(set2);
        dataSets.add(set3);
        let dataResult: BubbleData = new BubbleData(dataSets);
        dataResult.setDrawValues(this.isDrawValuesEnable);
        dataResult.setValueTextSize(8);
        dataResult.setValueTextColor(Color.White);
        dataResult.setHighlightCircleWidth(1.5);
        dataResult.setHighlightEnabled(true);
        dataResult.notifyDataChanged();
        if (this.model) {
            this.model.setData(dataResult);
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
        Column.pop();
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
    }
}
loadDocument(new BubbleChartPage("1", undefined, {}));
