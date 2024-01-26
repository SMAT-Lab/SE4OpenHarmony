interface HalfPieChartPage_Params {
    menuItemArr?: Array<string>;
    title?: string;
    titleModel?: ChartTitleModel;
    model?: PieChartModel;
    parties?: string[];
    pieData?: PieData | null;
    valueSelectedListener?: OnChartValueSelectedListener;
    chartGestureListener?: OnChartGestureListener;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "HalfPieChartPage_" + ++__generate__Id;
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
import { ChartGesture, ColorTemplate, EntryOhos, Highlight, JArrayList, Legend, LegendOrientation, MPPointF, OnChartGestureListener, OnChartValueSelectedListener, PieChart, PieChartModel, PieData, PieDataSet, PieEntry } from '@ohos/mpchart';
import title, { ChartTitleModel } from '../../title';
class HalfPieChartPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.menuItemArr = ['Toggle Bar Borders', 'Animate X', 'Animate Y', 'Animate XY'];
        this.title = 'HalfPieChartPage';
        this.__titleModel = new ObservedPropertyObject(new ChartTitleModel()
        //标题栏菜单回调
        , this, "titleModel");
        this.model = new PieChartModel();
        this.parties = [
            "Party A", "Party B", "Party C", "Party D", "Party E", "Party F", "Party G", "Party H",
            "Party I", "Party J", "Party K", "Party L", "Party M", "Party N", "Party O", "Party P",
            "Party Q", "Party R", "Party S", "Party T", "Party U", "Party V", "Party W", "Party X",
            "Party Y", "Party Z"
        ];
        this.pieData = null;
        this.valueSelectedListener = {
            onValueSelected: (e: EntryOhos, h: Highlight) => {
                console.info("PieChartPage onValueSelected: " + e.getX());
            },
            onNothingSelected: () => {
                console.info("PieChartPage onNothingSelected");
            }
        };
        this.chartGestureListener = {
            onChartGestureStart: (isTouchEvent: boolean, me: TouchEvent | GestureEvent, lastPerformedGestureMode: ChartGesture) => {
                console.info("-----------------chartGestureListener onChartGestureStart lastMode: " + lastPerformedGestureMode);
            },
            onChartGestureEnd: (isTouchEvent: boolean, me: TouchEvent | GestureEvent, lastPerformedGestureMode: ChartGesture) => {
                console.info("-----------------chartGestureListener onChartGestureEnd lastMode: " + lastPerformedGestureMode);
            },
            onChartLongPressed: (isTouchEvent: boolean, me: TouchEvent | GestureEvent) => {
                console.info("-----------------chartGestureListener onChartLongPressed");
            },
            onChartDoubleTapped: (isTouchEvent: boolean, me: TouchEvent | GestureEvent) => {
                console.info("-----------------chartGestureListener onChartDoubleTapped");
            },
            onChartSingleTapped: (isTouchEvent: boolean, me: TouchEvent | GestureEvent) => {
                console.info("-----------------chartGestureListener onChartSingleTapped");
            },
            onChartFling: (isTouchEvent: boolean, me1: TouchEvent | GestureEvent, me2: TouchEvent, velocityX: number, velocityY: number) => {
                console.info("-----------------chartGestureListener onChartFling velocityX: " + velocityX + "  velocityY: " + velocityY);
            },
            onChartScale: (isTouchEvent: boolean, me: TouchEvent | GestureEvent, scaleX: number, scaleY: number) => {
                console.info("-----------------chartGestureListener onChartScale scaleX: " + scaleX + "  scaleY: " + scaleY);
            },
            onChartTranslate: (isTouchEvent: boolean, me: TouchEvent | GestureEvent, dX: number, dY: number) => {
                console.info("-----------------chartGestureListener onChartTranslate dx: " + dX + "  dy: " + dY);
            }
        };
        this.updateWithValueParams(params);
        this.declareWatch("titleModel", this.menuCallback);
    }
    updateWithValueParams(params: HalfPieChartPage_Params) {
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
        if (params.parties !== undefined) {
            this.parties = params.parties;
        }
        if (params.pieData !== undefined) {
            this.pieData = params.pieData;
        }
        if (params.valueSelectedListener !== undefined) {
            this.valueSelectedListener = params.valueSelectedListener;
        }
        if (params.chartGestureListener !== undefined) {
            this.chartGestureListener = params.chartGestureListener;
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
    //标题栏菜单回调
    menuCallback() {
        if (this.titleModel == null || this.titleModel == undefined) {
            return;
        }
        let index: number = this.titleModel.getIndex();
        if (!this.model || index == undefined || index == -1) {
            return;
        }
        switch (this.menuItemArr[index]) {
            case 'Animate X':
                this.model.animateX(2000);
                break;
            case 'Animate Y':
                this.model.animateY(2000);
                break;
            case 'Animate XY':
                this.model.animateXY(2000, 2000);
                break;
        }
        this.titleModel.setIndex(-1);
    }
    private model: PieChartModel;
    protected parties: string[];
    private pieData: PieData | null;
    private valueSelectedListener: OnChartValueSelectedListener;
    private chartGestureListener: OnChartGestureListener;
    aboutToAppear() {
        this.titleModel.menuItemArr = this.menuItemArr;
        this.titleModel.title = this.title;
        let l: Legend | null = this.model.getLegend();
        if (l) {
            l.setEnabled(true);
            l.setOrientation(LegendOrientation.VERTICAL);
        }
        this.model.animateX(1000);
        this.model.setUsePercentValues(true);
        this.model.getDescription()?.setEnabled(false);
        this.model.setExtraOffsets(5, 10, 5, 5);
        this.model.setOnChartGestureListener(this.chartGestureListener);
        this.model.setDragDecelerationFrictionCoef(0.95);
        this.model.setCenterText("mpchart");
        this.model.setCenterTextSize(22);
        this.model.setDrawHoleEnabled(true);
        this.model.setHoleColor(Color.White);
        this.model.setTransparentCircleColor(Color.White);
        this.model.setTransparentCircleAlpha(110);
        this.model.setHoleRadius(58);
        this.model.setTransparentCircleRadius(61);
        this.model.setDrawCenterText(true);
        // enable rotation of the chart by touch
        this.model.setRotationEnabled(false);
        this.model.setHighlightPerTapEnabled(true);
        this.model.setMaxAngle(180);
        this.model.setRotationAngle(180);
        this.setData(4, 10);
    }
    // 初始化饼状图数据
    private setData(count: number, range: number): void {
        let entries: JArrayList<PieEntry> = new JArrayList<PieEntry>();
        // NOTE: The order of the entries when being added to the entries array determines their position around the center of
        // the chart.
        for (let i = 0; i < count; i++) {
            entries.add(new PieEntry(((Math.random() * range) + range / 5), this.parties[i % this.parties.length], undefined, undefined));
        }
        let dataSet: PieDataSet = new PieDataSet(entries, "Election Results");
        dataSet.setDrawIcons(false);
        dataSet.setSliceSpace(1);
        dataSet.setIconsOffset(new MPPointF(0, 40));
        dataSet.setSelectionShift(5);
        dataSet.setValueTextSize(25);
        dataSet.setValueTextColor(Color.White);
        // add a lot of colors
        let colors: JArrayList<number> = new JArrayList();
        for (let index = 0; index < ColorTemplate.COLORFUL_COLORS.length; index++) {
            colors.add(ColorTemplate.COLORFUL_COLORS[index]);
        }
        for (let index = 0; index < ColorTemplate.VORDIPLOM_COLORS.length; index++) {
            colors.add(ColorTemplate.VORDIPLOM_COLORS[index]);
        }
        for (let index = 0; index < ColorTemplate.JOYFUL_COLORS.length; index++) {
            colors.add(ColorTemplate.JOYFUL_COLORS[index]);
        }
        for (let index = 0; index < ColorTemplate.LIBERTY_COLORS.length; index++) {
            colors.add(ColorTemplate.LIBERTY_COLORS[index]);
        }
        for (let index = 0; index < ColorTemplate.PASTEL_COLORS.length; index++) {
            colors.add(ColorTemplate.PASTEL_COLORS[index]);
        }
        colors.add(ColorTemplate.getHoloBlue());
        dataSet.setColorsByList(colors);
        let data: PieData = new PieData(dataSet);
        this.model.setData(data);
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
        Column.pop();
    }
}
loadDocument(new HalfPieChartPage("1", undefined, {}));
