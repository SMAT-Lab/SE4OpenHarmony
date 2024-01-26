interface DualAxisPage_Params {
    menuItemArr?: Array<string>;
    title?: string;
    titleModel?: ChartTitleModel;
    titleSelectString?: string;
    model?: LineChartModel | null;
    leftAxis?: YAxis | null;
    rightAxis?: YAxis | null;
    xAxis?: XAxis | null;
    dataSet?: LineDataSet | null;
    seekBarX?: SeekBarModel;
    seekBarY?: SeekBarModel;
    valueSelectedListener?: OnChartValueSelectedListener;
    chartGestureListener?: OnChartGestureListener;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DualAxisPage_" + ++__generate__Id;
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
import { Color as ChartColor, JArrayList, XAxis, XAxisPosition, YAxis, Description, Legend, OnChartValueSelectedListener, Highlight, EntryOhos, YAxisLabelPosition, LineDataSet, ILineDataSet, LineData, LineChart, LineChartModel, OnChartGestureListener, ChartGesture, ColorTemplate, Mode, } from '@ohos/mpchart';
import Constants from '../../constants/Constants';
import title, { ChartTitleModel } from '../../title';
import SeekBar, { SeekBarModel } from '../../customcomponents/SeekBar';
import Utils from '../../utils/Utils';
class DualAxisPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.menuItemArr = [Constants.TOGGLE_VALUES, Constants.TOGGLE_FILLED, Constants.TOGGLE_CIRCLES,
            Constants.TOGGLE_CUBIC, Constants.TOGGLE_STEPPED, Constants.TOGGLE_HORIZONTAL_CUBIC, Constants.TOGGLE_PINCHZOOM,
            Constants.TOGGLE_AUTO_SCALE, Constants.TOGGLE_HIGHLIGHT, Constants.ANIMATE_X, Constants.ANIMATE_Y, Constants.ANIMATE_XY, Constants.SAVE_IMAGE];
        this.title = 'LineChartPage2';
        this.__titleModel = new ObservedPropertyObject(new ChartTitleModel(), this, "titleModel");
        this.titleSelectString = 'X';
        this.model = null;
        this.leftAxis = null;
        this.rightAxis = null;
        this.xAxis = null;
        this.dataSet = null;
        this.__seekBarX = new ObservedPropertyObject(new SeekBarModel(), this, "seekBarX");
        this.__seekBarY = new ObservedPropertyObject(new SeekBarModel(), this, "seekBarY");
        this.valueSelectedListener = {
            onValueSelected: (e: EntryOhos, h: Highlight) => {
                console.info("ScrollBarChart onValueSelected: " + e.getX());
            },
            onNothingSelected: () => {
                console.info("ScrollBarChart onNothingSelected");
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
        this.declareWatch("seekBarX", this.seekBarXValueWatch);
        this.declareWatch("seekBarY", this.seekBarYValueWatch);
    }
    updateWithValueParams(params: DualAxisPage_Params) {
        if (params.menuItemArr !== undefined) {
            this.menuItemArr = params.menuItemArr;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.titleModel !== undefined) {
            this.titleModel = params.titleModel;
        }
        if (params.titleSelectString !== undefined) {
            this.titleSelectString = params.titleSelectString;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.leftAxis !== undefined) {
            this.leftAxis = params.leftAxis;
        }
        if (params.rightAxis !== undefined) {
            this.rightAxis = params.rightAxis;
        }
        if (params.xAxis !== undefined) {
            this.xAxis = params.xAxis;
        }
        if (params.dataSet !== undefined) {
            this.dataSet = params.dataSet;
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
        if (params.chartGestureListener !== undefined) {
            this.chartGestureListener = params.chartGestureListener;
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
    private titleSelectString: string;
    private model: LineChartModel | null;
    private leftAxis: YAxis | null;
    private rightAxis: YAxis | null;
    private xAxis: XAxis | null;
    private dataSet: LineDataSet | null;
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
    private chartGestureListener: OnChartGestureListener;
    //标题栏菜单回调
    menuCallback() {
        if (this.model == null || this.model == undefined) {
            return;
        }
        let index: number = this.titleModel.getIndex();
        if (index == undefined || index == -1) {
            return;
        }
        let data = this.model.getData();
        let sets: JArrayList<ILineDataSet> | null = null;
        if (data) {
            sets = data.getDataSets();
        }
        switch (this.menuItemArr[index]) {
            case Constants.TOGGLE_VALUES:
                if (!data || !sets) {
                    break;
                }
                for (let i = 0; i < sets.size(); i++) {
                    let set = sets.get(i) as LineDataSet;
                    set.setDrawValues(!set.isDrawValuesEnabled());
                }
                console.log('log' + 1111);
                this.model.invalidate();
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
            case Constants.TOGGLE_HIGHLIGHT:
                if (data != null) {
                    data.setHighlightEnabled(!data.isHighlightEnabled());
                    this.model.invalidate();
                }
                break;
            case Constants.TOGGLE_FILLED:
                if (sets) {
                    for (let i = 0; i < sets.size(); i++) {
                        let set = sets.get(i) as LineDataSet;
                        if (set.isDrawFilledEnabled()) {
                            set.setDrawFilled(false);
                        }
                        else {
                            set.setDrawFilled(true);
                        }
                    }
                    this.model.invalidate();
                }
                break;
            case Constants.TOGGLE_CIRCLES:
                if (sets) {
                    for (let i = 0; i < sets.size(); i++) {
                        let set = sets.get(i) as LineDataSet;
                        if (set.isDrawCirclesEnabled()) {
                            set.setDrawCircles(false);
                        }
                        else {
                            set.setDrawCircles(true);
                        }
                    }
                    this.model.invalidate();
                }
                break;
            case Constants.TOGGLE_CUBIC:
                if (sets) {
                    for (let i = 0; i < sets.size(); i++) {
                        let set = sets.get(i) as LineDataSet;
                        set.setMode(set.getMode() == Mode.CUBIC_BEZIER ? Mode.LINEAR : Mode.CUBIC_BEZIER);
                    }
                    this.model.invalidate();
                }
                break;
            case Constants.TOGGLE_STEPPED:
                if (sets) {
                    for (let i = 0; i < sets.size(); i++) {
                        let set = sets.get(i) as LineDataSet;
                        set.setMode(set.getMode() == Mode.STEPPED ? Mode.LINEAR : Mode.STEPPED);
                    }
                    this.model.invalidate();
                }
                break;
            case Constants.TOGGLE_HORIZONTAL_CUBIC:
                if (sets) {
                    for (let i = 0; i < sets.size(); i++) {
                        let set = sets.get(i) as LineDataSet;
                        set.setMode(set.getMode() == Mode.HORIZONTAL_BEZIER ? Mode.LINEAR : Mode.HORIZONTAL_BEZIER);
                    }
                    this.model.invalidate();
                }
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
        this.seekBarX.setValue(18)
            .setMax(50)
            .setMin(5);
        this.seekBarY.setValue(30)
            .setMax(200)
            .setMin(20);
        this.titleModel.menuItemArr = this.menuItemArr;
        this.titleModel.title = this.title;
        this.model = new LineChartModel();
        this.model.setOnChartValueSelectedListener(this.valueSelectedListener);
        let description: Description | null = this.model.getDescription();
        if (description) {
            description.setEnabled(false);
        }
        this.model.setPinchZoom(false);
        this.model.setDrawGridBackground(false);
        this.xAxis = this.model.getXAxis();
        if (this.xAxis) {
            this.xAxis.setPosition(XAxisPosition.TOP);
            this.xAxis.setDrawGridLines(true); //纵向线格显示
            this.xAxis.setGranularity(1);
            this.xAxis.setLabelCount(6); //设置X轴坐标个数
            this.xAxis.setTextColor(Color.White);
        }
        this.leftAxis = this.model.getAxisLeft();
        if (this.leftAxis) {
            this.leftAxis.setLabelCount(6, false);
            this.leftAxis.setTextColor(ColorTemplate.getHoloBlue());
            this.leftAxis.setDrawGridLines(true);
            this.leftAxis.setPosition(YAxisLabelPosition.OUTSIDE_CHART);
            this.leftAxis.setDrawAxisLine(true);
            this.leftAxis.setGranularityEnabled(true);
        }
        this.rightAxis = this.model.getAxisRight();
        if (this.rightAxis) {
            this.rightAxis.setEnabled(true); //右Y轴是否显示
            this.rightAxis.setDrawGridLines(false);
            this.rightAxis.setLabelCount(6, false);
            this.rightAxis.setTextColor(Color.Red);
            this.rightAxis.setDrawAxisLine(false);
            this.rightAxis.setDrawLabels(true);
            this.rightAxis.setDrawZeroLine(false);
            this.rightAxis.setGranularityEnabled(false);
        }
        let legend: Legend | null = this.model.getLegend();
        if (legend) {
            legend.setEnabled(false);
        }
        this.setData(18, 30); //数据点的个数太多会导致数据不能显示
        this.model.setVisibleXRangeMaximum(50); //会影响数据点的显示，太大也不会显示
    }
    /**
     * 初始化数据
     * @param count  曲线图点的个数
     * @param range  y轴范围
     */
    private setData(count: number, range: number): void {
        let values1 = new JArrayList<EntryOhos>();
        let values2 = new JArrayList<EntryOhos>();
        let values3 = new JArrayList<EntryOhos>();
        for (let i = 0; i < count; i++) {
            let yVal: number = Math.random() * (range / 2) + 50;
            values1.add(new EntryOhos(i, yVal));
        }
        for (let i = 0; i < count; i++) {
            let yVal: number = Math.random() * range + 100;
            values2.add(new EntryOhos(i, yVal));
        }
        for (let i = 0; i < count; i++) {
            let yVal: number = Math.random() * range + 120;
            values3.add(new EntryOhos(i, yVal));
        }
        let dataSet = new JArrayList<ILineDataSet>();
        let set1 = new LineDataSet(values1, "DataSet 1");
        set1.setDrawFilled(false);
        set1.setDrawValues(true);
        set1.setDrawCircles(true);
        set1.setDrawCircleHole(false);
        set1.setCircleRadius(3);
        set1.setCircleColor(Color.White);
        set1.setColorByColor(ColorTemplate.colorRgb(140, 234, 255));
        set1.setLineWidth(2);
        dataSet.add(set1);
        let set2 = new LineDataSet(values2, "DataSet 2");
        set2.setDrawFilled(false);
        set2.setDrawValues(true);
        set2.setDrawCircles(true);
        set2.setDrawCircleHole(false);
        set2.setCircleRadius(3);
        set2.setCircleColor(Color.White);
        set2.setColorByColor(Color.Red);
        set2.setLineWidth(2);
        dataSet.add(set2);
        let set3 = new LineDataSet(values3, "DataSet 3");
        set3.setDrawFilled(false);
        set3.setDrawValues(true);
        set3.setDrawCircles(true);
        set3.setDrawCircleHole(false);
        set3.setCircleRadius(3);
        set3.setCircleColor(Color.White);
        set3.setColorByColor(Color.Yellow);
        set3.setLineWidth(2);
        dataSet.add(set3);
        let lineData: LineData = new LineData(dataSet);
        lineData.setValueTextSize(vp2px(10));
        if (this.model) {
            this.model.setData(lineData);
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
        Stack.create({ alignContent: Alignment.TopStart });
        Stack.pop();
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
loadDocument(new DualAxisPage("1", undefined, {}));
