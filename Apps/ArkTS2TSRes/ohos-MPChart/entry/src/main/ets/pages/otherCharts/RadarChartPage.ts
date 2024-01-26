interface RadarChartPage_Params {
    menuItemArr?: Array<string>;
    title?: string;
    titleModel?: ChartTitleModel;
    model?: RadarChartModel;
    valueSelectedListener?: OnChartValueSelectedListener;
    normalMarker?: RadarMarkerView | null;
    titleSelcetString?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "RadarChartPage_" + ++__generate__Id;
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
import { Color as ChartColor, JArrayList, XAxis, XAxisPosition, Description, Legend, OnChartValueSelectedListener, Highlight, EntryOhos, RadarEntry, RadarChart, RadarDataSet, RadarChartModel, IRadarDataSet, RadarData, YAxis, IAxisValueFormatter, AxisBase, LegendVerticalAlignment, LegendHorizontalAlignment, LegendOrientation, } from '@ohos/mpchart';
import RadarMarkerView from '../../customcomponents/RadarMarkerView';
import title, { ChartTitleModel } from '../../title';
class valueFormatter implements IAxisValueFormatter {
    private mActivities: string[] = ["Burger", "Steak", "Salad", "Pasta", "Pizza"];
    getFormattedValue(value: number, axis: AxisBase): string {
        return this.mActivities[Math.floor(value % this.mActivities.length)];
    }
}
class RadarChartPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.menuItemArr = ['Animate X', 'Animate Y', 'Animate XY'];
        this.title = 'RadarChartPage';
        this.__titleModel = new ObservedPropertyObject(new ChartTitleModel(), this, "titleModel");
        this.model = new RadarChartModel();
        this.valueSelectedListener = {
            onValueSelected: (e: EntryOhos, h: Highlight) => {
                console.info("RadarChartPage onValueSelected: " + e.getX());
            },
            onNothingSelected: () => {
            }
        };
        this.normalMarker = null;
        this.titleSelcetString = 'X';
        this.updateWithValueParams(params);
        this.declareWatch("titleModel", this.menuCallback);
    }
    updateWithValueParams(params: RadarChartPage_Params) {
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
        if (params.valueSelectedListener !== undefined) {
            this.valueSelectedListener = params.valueSelectedListener;
        }
        if (params.normalMarker !== undefined) {
            this.normalMarker = params.normalMarker;
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
    private model: RadarChartModel;
    private valueSelectedListener: OnChartValueSelectedListener;
    private normalMarker: RadarMarkerView | null;
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
        this.model.setOnChartValueSelectedListener(this.valueSelectedListener);
        let description: Description | null = this.model.getDescription();
        if (description) {
            description.setEnabled(false);
        }
        let l: Legend | null = this.model.getLegend();
        if (l) {
            l.setEnabled(true);
            l.setVerticalAlignment(LegendVerticalAlignment.TOP);
            l.setHorizontalAlignment(LegendHorizontalAlignment.CENTER);
            l.setOrientation(LegendOrientation.HORIZONTAL);
            l.setDrawInside(false);
            l.setXEntrySpace(7);
            l.setYEntrySpace(5);
            l.setTextColor(Color.White);
            l.setTextSize(48);
        }
        this.model.setWebLineWidth(0.3);
        this.model.setWebColor(0xFFCCCCCC);
        this.model.setWebLineWidthInner(0.3);
        this.model.setWebColorInner(0xFFCCCCCC);
        // 设置图表顶部距离
        this.model.setExtraTopOffset(-100);
        this.normalMarker = new RadarMarkerView();
        this.model.setMarker(this.normalMarker);
        let xAxis: XAxis | null = this.model.getXAxis();
        if (xAxis) {
            xAxis.setPosition(XAxisPosition.BOTTOM);
            xAxis.setDrawGridLines(false);
            xAxis.setTextSize(48);
            xAxis.setYOffset(0);
            xAxis.setXOffset(0);
            xAxis.setGranularity(1);
            xAxis.setLabelCount(7);
            xAxis.setValueFormatter(new valueFormatter());
            xAxis.setTextColor(Color.White);
        }
        let yAxis: YAxis | null = this.model.getYAxis();
        if (yAxis) {
            yAxis.setLabelCount(5, false);
            yAxis.setTextSize(20);
            yAxis.setAxisMinimum(0);
            yAxis.setAxisMaximum(80);
            yAxis.setDrawLabels(false);
        }
        this.setData();
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
        Column.pop();
    }
    private setData(): void {
        let mul = 80;
        let min = 20;
        let cnt = 5;
        let entries1: JArrayList<RadarEntry> = new JArrayList<RadarEntry>();
        let entries2: JArrayList<RadarEntry> = new JArrayList<RadarEntry>();
        // NOTE: The order of the entries when being added to the entries array determines their position around the center of
        // the chart.
        for (let i = 0; i < cnt; i++) {
            let val1 = (Math.random() * mul) + min;
            entries1.add(new RadarEntry(val1));
            let val2 = (Math.random() * mul) + min;
            entries2.add(new RadarEntry(val2));
        }
        let set1: RadarDataSet = new RadarDataSet(entries1, "Last Week");
        set1.setColorByColor(ChartColor.rgb(103, 110, 129));
        set1.setFillColor(ChartColor.rgb(103, 110, 129));
        set1.setDrawFilled(true);
        set1.setFillAlpha(180);
        set1.setLineWidth(2);
        set1.setDrawHighlightCircleEnabled(true);
        set1.setDrawHighlightIndicators(false);
        let set2: RadarDataSet = new RadarDataSet(entries2, "This Week");
        set2.setColorByColor(ChartColor.rgb(121, 162, 175));
        set2.setFillColor(ChartColor.rgb(121, 162, 175));
        set2.setDrawFilled(true);
        set2.setFillAlpha(180);
        set2.setLineWidth(2);
        set2.setDrawHighlightCircleEnabled(true);
        set2.setDrawHighlightIndicators(false);
        let sets: JArrayList<IRadarDataSet> = new JArrayList<IRadarDataSet>();
        sets.add(set1);
        sets.add(set2);
        let data: RadarData = new RadarData(sets);
        data.setValueTextSize(20);
        data.setDrawValues(false);
        data.setValueTextColor(Color.White);
        this.model.setData(data);
    }
}
loadDocument(new RadarChartPage("1", undefined, {}));
