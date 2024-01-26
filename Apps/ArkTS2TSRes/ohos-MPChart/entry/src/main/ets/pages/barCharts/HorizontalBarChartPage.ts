interface HorizontalBarChartPage_Params {
    model?: HorizontalBarChartModel | null;
    menuItemArr?: Array<string>;
    titleSelectString?: string;
    title?: string;
    titleModel?: ChartTitleModel;
    seekBarX?: SeekBarModel;
    seekBarY?: SeekBarModel;
    valueSelectedListener?: OnChartValueSelectedListener;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "HorizontalBarChartPage_" + ++__generate__Id;
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
import { Color as ChartColor, ChartPixelMap, JArrayList, XAxis, XAxisPosition, YAxis, Description, Legend, OnChartValueSelectedListener, Highlight, EntryOhos, YAxisLabelPosition, BarEntry, BarDataSet, BarData, Fill, IBarDataSet, HorizontalBarChart, HorizontalBarChartModel, } from '@ohos/mpchart';
import title, { ChartTitleModel } from '../../title';
import SeekBar, { SeekBarModel } from '../../customcomponents/SeekBar';
import Constants from '../../constants/Constants';
import Utils from '../../utils/Utils';
class HorizontalBarChartPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.model = null;
        this.menuItemArr = [Constants.TOGGLE_BAR_BORDERS, Constants.TOGGLE_VALUES,
            Constants.TOGGLE_HIGHLIGHT, Constants.TOGGLE_PINCHZOOM, Constants.TOGGLE_AUTO_SCALE,
            Constants.ANIMATE_X, Constants.ANIMATE_Y, Constants.ANIMATE_XY, Constants.SAVE_IMAGE];
        this.titleSelectString = 'X';
        this.title = 'Horizontal';
        this.__titleModel = new ObservedPropertyObject(new ChartTitleModel(), this, "titleModel");
        this.__seekBarX = new ObservedPropertyObject(new SeekBarModel(), this, "seekBarX");
        this.__seekBarY = new ObservedPropertyObject(new SeekBarModel(), this, "seekBarY");
        this.valueSelectedListener = {
            onValueSelected: (e: EntryOhos, h: Highlight) => {
                console.info("HorizontalBarChartPage onValueSelected: " + e.getX());
            },
            onNothingSelected: () => {
            }
        };
        this.updateWithValueParams(params);
        this.declareWatch("titleModel", this.menuCallback);
        this.declareWatch("seekBarX", this.seekBarXValueWatch);
        this.declareWatch("seekBarY", this.seekBarYValueWatch);
    }
    updateWithValueParams(params: HorizontalBarChartPage_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.menuItemArr !== undefined) {
            this.menuItemArr = params.menuItemArr;
        }
        if (params.titleSelectString !== undefined) {
            this.titleSelectString = params.titleSelectString;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.titleModel !== undefined) {
            this.titleModel = params.titleModel;
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
    }
    aboutToBeDeleted() {
        this.__titleModel.aboutToBeDeleted();
        this.__seekBarX.aboutToBeDeleted();
        this.__seekBarY.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private model: HorizontalBarChartModel | null;
    //标题栏菜单文本
    private menuItemArr: Array<string>;
    private titleSelectString: string;
    //标题栏标题
    private title: string;
    private __titleModel: ObservedPropertyObject<ChartTitleModel>;
    get titleModel() {
        return this.__titleModel.get();
    }
    set titleModel(newValue: ChartTitleModel) {
        this.__titleModel.set(newValue);
    }
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
        if (!this.model || index == undefined || index == -1) {
            return;
        }
        let barData = this.model.getBarData();
        if (!barData)
            return;
        let sets: JArrayList<IBarDataSet> | null = null;
        if (barData) {
            sets = barData.getDataSets();
        }
        switch (this.menuItemArr[index]) {
            case Constants.TOGGLE_BAR_BORDERS:
                for (let i = 0; i < barData.getDataSets().length(); i++) {
                    let barDataSet = barData.getDataSets().get(i) as BarDataSet;
                    barDataSet.setBarBorderWidth(barDataSet.getBarBorderWidth() == 1 ? 0 : 1);
                }
                this.model.invalidate();
                break;
            case Constants.TOGGLE_VALUES:
                if (!barData || !sets) {
                    break;
                }
                for (let i = 0; i < sets.size(); i++) {
                    let set = sets.get(i) as BarDataSet;
                    set.setDrawValues(!set.isDrawValuesEnabled());
                }
                this.model.invalidate();
                break;
            case Constants.TOGGLE_HIGHLIGHT:
                if (barData != null) {
                    barData.setHighlightEnabled(!barData.isHighlightEnabled());
                    this.model.invalidate();
                }
                break;
            case Constants.TOGGLE_PINCHZOOM:
                if (this.model.isPinchZoomEnabled()) {
                    this.model.setPinchZoom(false);
                }
                else {
                    this.model.setPinchZoom(true);
                }
                this.model.invalidate();
                break;
            case Constants.TOGGLE_AUTO_SCALE:
                this.model.setAutoScaleMinMaxEnabled(!this.model.isAutoScaleMinMaxEnabled());
                this.model.notifyDataSetChanged();
                break;
            case Constants.ANIMATE_X:
                this.titleSelectString = 'X';
                this.animate();
                break;
            case Constants.ANIMATE_Y:
                this.titleSelectString = 'Y';
                this.animate();
                break;
            case Constants.ANIMATE_XY:
                this.titleSelectString = 'XY';
                this.animate();
                break;
            case Constants.SAVE_IMAGE:
                Utils.saveImage(this.title, this.model ? this.model.context2d : null);
                break;
            default:
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
    private valueSelectedListener: OnChartValueSelectedListener;
    aboutToAppear() {
        this.seekBarX.setValue(10)
            .setMax(50)
            .setMin(5);
        this.seekBarY.setValue(50)
            .setMax(200)
            .setMin(20);
        this.titleModel.menuItemArr = this.menuItemArr;
        this.titleModel.title = this.title;
        this.model = new HorizontalBarChartModel();
        this.model.animateX(1000);
        this.model.setOnChartValueSelectedListener(this.valueSelectedListener);
        this.model.setDrawBarShadow(false);
        this.model.setDrawValueAboveBar(true);
        let description: Description | null = this.model.getDescription();
        if (description) {
            description.setEnabled(false);
        }
        // this.model.setMaxVisibleValueCount(60);
        this.model.setPinchZoom(false);
        this.model.setDrawGridBackground(false);
        let xAxis: XAxis | null = this.model.getXAxis();
        if (xAxis) {
            xAxis.setPosition(XAxisPosition.BOTTOM);
            xAxis.setDrawGridLines(false);
            xAxis.setGranularity(1);
            xAxis.setLabelCount(7);
            xAxis.setDrawAxisLine(true);
        }
        let leftAxis: YAxis | null = this.model.getAxisLeft();
        if (leftAxis) {
            leftAxis.setLabelCount(8, false);
            leftAxis.setPosition(YAxisLabelPosition.OUTSIDE_CHART);
            leftAxis.setDrawAxisLine(true);
        }
        let rightAxis: YAxis | null = this.model.getAxisRight();
        if (rightAxis) {
            rightAxis.setLabelCount(8, false);
            rightAxis.setDrawGridLines(false);
            rightAxis.setDrawAxisLine(true);
        }
        let legend: Legend | null = this.model.getLegend();
        if (legend) {
            legend.setEnabled(false);
        }
        this.model.setFitBars(true);
        this.setData(10, 50);
    }
    private setData(count: number, range: number): void {
        let startAxis: number = 0;
        let endAxis: number = startAxis + count;
        let values: JArrayList<BarEntry> = new JArrayList<BarEntry>();
        for (let i = startAxis; i < endAxis; i++) {
            let val = Number(Math.random() * range);
            values.add(new BarEntry(i, val));
        }
        let dataSet: BarDataSet = new BarDataSet(values, 'DataSet');
        dataSet.setHighLightColor(Color.Black);
        dataSet.setDrawIcons(false);
        dataSet.setColorByColor(0x8CEAFF);
        let dataSetList: JArrayList<IBarDataSet> = new JArrayList<IBarDataSet>();
        dataSetList.add(dataSet);
        let barData: BarData = new BarData(dataSetList);
        barData.setValueTextSize(vp2px(10));
        barData.setBarWidth(0.9);
        if (this.model) {
            this.model.setData(barData);
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
loadDocument(new HorizontalBarChartPage("1", undefined, {}));
