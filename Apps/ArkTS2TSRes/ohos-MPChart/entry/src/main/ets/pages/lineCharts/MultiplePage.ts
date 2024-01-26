interface MultiplePage_Params {
    menuItemArr?: Array<string>;
    model?: LineChartModel;
    title?: string;
    titleModel?: ChartTitleModel;
    topAxis?: XAxis;
    bottomAxis?: XAxis;
    mWidth?: number;
    mHeight?: number;
    minOffset?: number;
    leftAxis?: YAxis | null;
    rightAxis?: YAxis | null;
    lineData?: LineData | null;
    titleSelectString?: string;
    seekBarX?: SeekBarModel;
    seekBarY?: SeekBarModel;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MultiplePage_" + ++__generate__Id;
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
import { Color as ChartColor, JArrayList, XAxis, YAxis, EntryOhos, LineDataSet, ILineDataSet, LineData, Mode, LineChart, LineChartModel, ColorTemplate, Legend, ChartColorStop, LegendForm, LegendVerticalAlignment, LegendHorizontalAlignment, LegendOrientation } from '@ohos/mpchart';
import Constants from '../../constants/Constants';
import title, { ChartTitleModel } from '../../title/index';
import SeekBar, { SeekBarModel } from '../../customcomponents/SeekBar';
import Utils from '../../utils/Utils';
class MultiplePage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.menuItemArr = [Constants.TOGGLE_VALUES, Constants.TOGGLE_FILLED, Constants.TOGGLE_CIRCLES,
            Constants.TOGGLE_CUBIC, Constants.TOGGLE_STEPPED, Constants.TOGGLE_HORIZONTAL_CUBIC, Constants.TOGGLE_PINCHZOOM,
            Constants.TOGGLE_AUTO_SCALE, Constants.TOGGLE_HIGHLIGHT, Constants.ANIMATE_X, Constants.ANIMATE_Y, Constants.ANIMATE_XY, Constants.SAVE_IMAGE];
        this.model = new LineChartModel();
        this.title = 'MultiLineChart';
        this.__titleModel = new ObservedPropertyObject(new ChartTitleModel(), this, "titleModel");
        this.topAxis = new XAxis();
        this.bottomAxis = new XAxis();
        this.mWidth = 350;
        this.mHeight = 300;
        this.minOffset = 15;
        this.leftAxis = null;
        this.rightAxis = null;
        this.lineData = null;
        this.__titleSelectString = new ObservedPropertySimple('X', this, "titleSelectString");
        this.__seekBarX = new ObservedPropertyObject(new SeekBarModel(), this, "seekBarX");
        this.__seekBarY = new ObservedPropertyObject(new SeekBarModel(), this, "seekBarY");
        this.updateWithValueParams(params);
        this.declareWatch("titleModel", this.menuCallback);
        this.declareWatch("seekBarX", this.seekBarXValueWatch);
        this.declareWatch("seekBarY", this.seekBarYValueWatch);
    }
    updateWithValueParams(params: MultiplePage_Params) {
        if (params.menuItemArr !== undefined) {
            this.menuItemArr = params.menuItemArr;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.titleModel !== undefined) {
            this.titleModel = params.titleModel;
        }
        if (params.topAxis !== undefined) {
            this.topAxis = params.topAxis;
        }
        if (params.bottomAxis !== undefined) {
            this.bottomAxis = params.bottomAxis;
        }
        if (params.mWidth !== undefined) {
            this.mWidth = params.mWidth;
        }
        if (params.mHeight !== undefined) {
            this.mHeight = params.mHeight;
        }
        if (params.minOffset !== undefined) {
            this.minOffset = params.minOffset;
        }
        if (params.leftAxis !== undefined) {
            this.leftAxis = params.leftAxis;
        }
        if (params.rightAxis !== undefined) {
            this.rightAxis = params.rightAxis;
        }
        if (params.lineData !== undefined) {
            this.lineData = params.lineData;
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
        this.__titleSelectString.aboutToBeDeleted();
        this.__seekBarX.aboutToBeDeleted();
        this.__seekBarY.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    //标题栏菜单文本
    private menuItemArr: Array<string>;
    private model: LineChartModel;
    //标题栏标题
    private title: string;
    private __titleModel: ObservedPropertyObject<ChartTitleModel>;
    get titleModel() {
        return this.__titleModel.get();
    }
    set titleModel(newValue: ChartTitleModel) {
        this.__titleModel.set(newValue);
    }
    private topAxis: XAxis; //顶部X轴
    private bottomAxis: XAxis; //底部X轴
    private mWidth: number; //表的宽度
    private mHeight: number; //表的高度
    private minOffset: number;
    private leftAxis: YAxis | null;
    private rightAxis: YAxis | null;
    private lineData: LineData | null;
    private __titleSelectString: ObservedPropertySimple<string>;
    get titleSelectString() {
        return this.__titleSelectString.get();
    }
    set titleSelectString(newValue: string) {
        this.__titleSelectString.set(newValue);
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
        if (this.titleSelectString == 'X') {
            this.model.animateX(60);
        }
        else if (this.titleSelectString == 'Y') {
            this.model.animateY(60);
        }
        else if (this.titleSelectString == 'XY') {
            this.model.animateXY(60, 60);
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
        this.setData(20, 100);
        let legend: Legend | null = this.model.getLegend();
        if (legend) {
            legend.setEnabled(true);
            // 设置图例的位置
            legend.setVerticalAlignment(LegendVerticalAlignment.TOP);
            legend.setHorizontalAlignment(LegendHorizontalAlignment.CENTER);
            legend.setOrientation(LegendOrientation.HORIZONTAL);
            legend.setDrawInside(false);
            // 设置图例的样式和大小
            legend.setForm(LegendForm.DEFAULT);
            // 设置图例的颜色
            legend.setTextColor(Color.Black);
        }
        this.model.setMinOffset(this.minOffset);
        this.model.setVisibleXRangeMaximum(5);
        if (this.lineData) {
            this.model.setData(this.lineData);
        }
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
            let val: number = Math.random() * range + 3;
            values1.add(new EntryOhos(i, val));
        }
        for (let i = 0; i < count; i++) {
            let val: number = Math.random() * range + 3;
            values2.add(new EntryOhos(i, val));
        }
        for (let i = 0; i < count; i++) {
            let val: number = Math.random() * range + 3;
            values3.add(new EntryOhos(i, val));
        }
        let dataSet = new JArrayList<ILineDataSet>();
        let gradientFillColor = new JArrayList<ChartColorStop>();
        gradientFillColor.add(['#ffffff', 0.3]);
        gradientFillColor.add(['#00ffff', 1.0]);
        let set1 = new LineDataSet(values1, "DataSet 1");
        set1.setDrawFilled(false);
        set1.setDrawValues(true);
        set1.setDrawCircles(true);
        set1.setDrawCircleHole(true);
        set1.setCircleColor(ColorTemplate.colorRgb(0, 255, 0));
        set1.setCircleRadius(4);
        set1.setCircleHoleRadius(2);
        set1.setMode(Mode.LINEAR);
        set1.setColorByColor(Color.Green);
        set1.setLineWidth(2.5);
        set1.enableDashedLine(10, 10, 0);
        dataSet.add(set1);
        let set2 = new LineDataSet(values2, "DataSet 2");
        set2.setDrawFilled(false);
        set2.setDrawValues(true);
        set2.setDrawCircles(true);
        set2.setDrawCircleHole(true);
        set2.setCircleColor(ColorTemplate.colorRgb(255, 247, 140));
        set2.setCircleRadius(4);
        set2.setCircleHoleRadius(2);
        set2.setMode(Mode.LINEAR);
        set2.setColorByColor(Color.Orange);
        set2.setLineWidth(2.5);
        dataSet.add(set2);
        let set3 = new LineDataSet(values3, "DataSet 3");
        set3.setDrawFilled(false);
        set3.setDrawValues(true);
        set3.setDrawCircles(true);
        set3.setDrawCircleHole(true);
        set3.setCircleColor(ColorTemplate.colorRgb(255, 208, 140));
        set3.setCircleRadius(4);
        set3.setCircleHoleRadius(2);
        set3.setMode(Mode.LINEAR);
        set3.setColorByColor(Color.Yellow);
        set3.setLineWidth(2.5);
        dataSet.add(set3);
        let lineData: LineData = new LineData(dataSet);
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
        Column.create();
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
        Column.pop();
    }
}
loadDocument(new MultiplePage("1", undefined, {}));
