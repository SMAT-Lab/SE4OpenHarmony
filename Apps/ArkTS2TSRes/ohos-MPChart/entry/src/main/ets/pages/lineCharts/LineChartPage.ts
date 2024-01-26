interface LineChartPage_Params {
    menuItemArr?: Array<string>;
    title?: string;
    titleModel?: ChartTitleModel;
    model?: LineChartModel | null;
    leftAxis?: YAxis | null;
    rightAxis?: YAxis | null;
    xAxis?: XAxis | null;
    mCurrentMaxVisibleXCount?: string;
    mLastMaxVisibleXCount?: string;
    mBackgroundColor?: string;
    mLineWidth?: string;
    limitLine1?: LimitLine | null;
    limitLine2?: LimitLine | null;
    dataSet?: LineDataSet | null;
    lineData?: LineData | null;
    valueSelectedListener?: OnChartValueSelectedListener;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "LineChartPage_" + ++__generate__Id;
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
import { Color as ChartColor, JArrayList, XAxis, XAxisPosition, YAxis, Description, Legend, OnChartValueSelectedListener, Highlight, EntryOhos, YAxisLabelPosition, LineDataSet, ILineDataSet, LineData, Mode, LineChart, LineChartModel, LimitLine, LimitLabelPosition, ChartColorStop, LegendForm, } from '@ohos/mpchart';
import promptAction from '@ohos.promptAction';
import title, { ChartTitleModel } from '../../title';
import LongPressMarkerView from '../../customcomponents/LongPressMarkerView';
import Constants from '../../constants/Constants';
import Utils from '../../utils/Utils';
class LineChartPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.menuItemArr = [Constants.TOGGLE_VALUES, Constants.TOGGLE_FILLED, Constants.TOGGLE_CIRCLES,
            Constants.TOGGLE_CUBIC, Constants.TOGGLE_STEPPED, Constants.TOGGLE_HORIZONTAL_CUBIC, Constants.TOGGLE_PINCHZOOM,
            Constants.TOGGLE_AUTO_SCALE, Constants.TOGGLE_HIGHLIGHT, Constants.ANIMATE_X, Constants.ANIMATE_Y, Constants.ANIMATE_XY, Constants.SAVE_IMAGE];
        this.title = 'LineChartPage 1';
        this.__titleModel = new ObservedPropertyObject(new ChartTitleModel(), this, "titleModel");
        this.model = null;
        this.leftAxis = null;
        this.rightAxis = null;
        this.xAxis = null;
        this.mCurrentMaxVisibleXCount = '20';
        this.mLastMaxVisibleXCount = '20';
        this.mBackgroundColor = '#500000ff';
        this.mLineWidth = '85';
        this.limitLine1 = null;
        this.limitLine2 = null;
        this.dataSet = null;
        this.lineData = null;
        this.valueSelectedListener = {
            onValueSelected: (e: EntryOhos, h: Highlight) => {
                console.info("LineChartPage onValueSelected: " + e.getX());
            },
            onNothingSelected: () => {
                console.info("LineChartPage onNothingSelected");
            }
        };
        this.updateWithValueParams(params);
        this.declareWatch("titleModel", this.menuCallback);
    }
    updateWithValueParams(params: LineChartPage_Params) {
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
        if (params.leftAxis !== undefined) {
            this.leftAxis = params.leftAxis;
        }
        if (params.rightAxis !== undefined) {
            this.rightAxis = params.rightAxis;
        }
        if (params.xAxis !== undefined) {
            this.xAxis = params.xAxis;
        }
        if (params.mCurrentMaxVisibleXCount !== undefined) {
            this.mCurrentMaxVisibleXCount = params.mCurrentMaxVisibleXCount;
        }
        if (params.mLastMaxVisibleXCount !== undefined) {
            this.mLastMaxVisibleXCount = params.mLastMaxVisibleXCount;
        }
        if (params.mBackgroundColor !== undefined) {
            this.mBackgroundColor = params.mBackgroundColor;
        }
        if (params.mLineWidth !== undefined) {
            this.mLineWidth = params.mLineWidth;
        }
        if (params.limitLine1 !== undefined) {
            this.limitLine1 = params.limitLine1;
        }
        if (params.limitLine2 !== undefined) {
            this.limitLine2 = params.limitLine2;
        }
        if (params.dataSet !== undefined) {
            this.dataSet = params.dataSet;
        }
        if (params.lineData !== undefined) {
            this.lineData = params.lineData;
        }
        if (params.valueSelectedListener !== undefined) {
            this.valueSelectedListener = params.valueSelectedListener;
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
    private leftAxis: YAxis | null;
    private rightAxis: YAxis | null;
    private xAxis: XAxis | null;
    private mCurrentMaxVisibleXCount: string;
    private mLastMaxVisibleXCount: string;
    private mBackgroundColor: string;
    private mLineWidth: string;
    private limitLine1: LimitLine | null;
    private limitLine2: LimitLine | null;
    private dataSet: LineDataSet | null;
    private lineData: LineData | null;
    private valueSelectedListener: OnChartValueSelectedListener;
    //标题栏菜单回调
    menuCallback() {
        if (this.titleModel == null || this.titleModel == undefined) {
            return;
        }
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
                this.model.animateX(2000);
                break;
            case Constants.ANIMATE_Y:
                this.model.animateY(2000);
                break;
            case Constants.ANIMATE_XY:
                this.model.animateXY(2000, 2000);
                break;
            case Constants.SAVE_IMAGE:
                Utils.saveImage(this.title, this.model ? this.model.context2d : null);
                break;
        }
        this.titleModel.setIndex(-1);
    }
    aboutToAppear() {
        this.titleModel.menuItemArr = this.menuItemArr;
        this.titleModel.title = this.title;
        this.model = new LineChartModel();
        this.model.setOnChartValueSelectedListener(this.valueSelectedListener);
        let description: Description | null = this.model.getDescription();
        if (description) {
            description.setEnabled(false);
        }
        this.model.setMaxVisibleValueCount(60);
        this.model.setPinchZoom(false);
        this.model.setDrawGridBackground(false);
        this.limitLine1 = new LimitLine(120, 'Upper Limit');
        this.limitLine1.setLineWidth(4);
        this.limitLine1.enableDashedLine(10, 10, 0);
        this.limitLine1.setLabelPosition(LimitLabelPosition.RIGHT_TOP);
        this.limitLine1.setTextSize(vp2px(10));
        this.limitLine2 = new LimitLine(50, 'Lower Limit');
        this.limitLine2.setLineWidth(4);
        this.limitLine2.enableDashedLine(10, 10, 0);
        this.limitLine2.setLineColor(Color.Yellow);
        this.limitLine2.setLabelPosition(LimitLabelPosition.RIGHT_BOTTOM);
        this.limitLine2.setTextSize(vp2px(10));
        this.xAxis = this.model.getXAxis();
        if (this.xAxis) {
            this.xAxis.setPosition(XAxisPosition.BOTTOM);
            this.xAxis.setDrawGridLines(false);
            this.xAxis.setGranularity(1);
            this.xAxis.setLabelCount(7);
        }
        this.leftAxis = this.model.getAxisLeft();
        if (this.leftAxis) {
            this.leftAxis.setLabelCount(8, false);
            this.leftAxis.setPosition(YAxisLabelPosition.OUTSIDE_CHART);
            this.leftAxis.setSpaceTop(15);
            this.leftAxis.setAxisMinimum(0);
            this.leftAxis.setAxisMaximum(200);
        }
        this.rightAxis = this.model.getAxisRight();
        if (this.rightAxis) {
            this.rightAxis.setLabelCount(8, false);
            this.rightAxis.setDrawGridLines(false);
            this.rightAxis.setSpaceTop(15);
            this.rightAxis.setAxisMinimum(0);
            this.rightAxis.setAxisMaximum(200);
            this.rightAxis.setEnabled(false);
        }
        let legend: Legend | null = this.model.getLegend();
        if (legend) {
            legend.setEnabled(true);
            // draw legend entries as lines
            legend.setForm(LegendForm.LINE);
        }
        let lineData: LineData = this.getLineData();
        lineData.setValueTextSize(vp2px(10));
        this.model.setLongPressMarker(new LongPressMarkerView());
        this.model.setData(lineData);
        this.model.setVisibleXRangeMaximum(7);
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
        this.dataSet.setColorByColor(Color.Black); //设置折线颜色
        let gradientFillColor = new JArrayList<ChartColorStop>();
        gradientFillColor.add(["#0C0099CC", 0.2]);
        gradientFillColor.add(["#7F0099CC", 0.4]);
        gradientFillColor.add(["#0099CC", 1.0]);
        this.dataSet.setGradientFillColor(gradientFillColor);
        this.dataSet.setDrawFilled(true);
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
        Scroll.create();
        Scroll.layoutWeight(1);
        Scroll.margin({ bottom: 50 });
        Stack.create();
        Stack.align(Alignment.TopEnd);
        Column.create();
        Row.create();
        Row.alignSelf(ItemAlign.Start);
        Text.create('数据类型： ');
        Text.pop();
        Row.create();
        Text.create('普通: ');
        Text.pop();
        Radio.create({ value: 'CUBIC_BEZIER', group: 'dataType' });
        Radio.checked(true);
        Radio.onChange((isChecked: boolean) => {
            if (isChecked) {
                this.lineData = this.getLineData();
                if (this.dataSet && this.model) {
                    this.dataSet.setMode(Mode.LINEAR);
                    this.model.setData(this.lineData);
                }
            }
        });
        Row.pop();
        Row.create();
        Text.create('贝塞尔曲线: ');
        Text.pop();
        Radio.create({ value: 'gradient', group: 'dataType' });
        Radio.checked(false);
        Radio.onChange((isChecked: boolean) => {
            if (isChecked) {
                this.lineData = this.getLineData();
                if (this.dataSet && this.model) {
                    this.dataSet.setMode(Mode.CUBIC_BEZIER);
                    this.model.setData(this.lineData);
                }
            }
        });
        Row.pop();
        Row.pop();
        Row.create();
        Row.alignSelf(ItemAlign.Start);
        Text.create('数据类型： ');
        Text.pop();
        Row.create();
        Text.create('NoData: ');
        Text.pop();
        Radio.create({ value: 'noData', group: 'dataType' });
        Radio.checked(false);
        Radio.onChange((isChecked: boolean) => {
            if (isChecked) {
                if (this.model) {
                    this.model.setData(null);
                    this.model.invalidate();
                }
            }
        });
        Row.pop();
        Row.create();
        Text.create('NoDataSets: ');
        Text.pop();
        Radio.create({ value: 'gradient', group: 'dataType' });
        Radio.checked(false);
        Radio.onChange((isChecked: boolean) => {
            if (isChecked) {
                this.lineData = new LineData(new JArrayList<ILineDataSet>());
                if (this.model) {
                    this.model.setData(this.lineData);
                }
            }
        });
        Row.pop();
        Row.pop();
        Row.create();
        Row.alignSelf(ItemAlign.Start);
        Text.create('Y轴是否显示： ');
        Text.pop();
        Row.create();
        Text.create('左Y轴: ');
        Text.pop();
        Checkbox.create({ name: 'leftYAxis', group: 'yAxis' });
        Checkbox.select(true);
        Checkbox.onChange((isChecked: boolean) => {
            if (this.leftAxis) {
                this.leftAxis.setEnabled(isChecked);
            }
        });
        Checkbox.pop();
        Row.pop();
        Row.create();
        Text.create('右Y轴: ');
        Text.pop();
        Checkbox.create({ name: 'rightYAxis', group: 'yAxis' });
        Checkbox.onChange((isChecked: boolean) => {
            if (this.rightAxis) {
                this.rightAxis.setEnabled(isChecked);
            }
        });
        Checkbox.pop();
        Row.pop();
        Row.pop();
        Row.create();
        Row.alignSelf(ItemAlign.Start);
        Text.create('左Y轴位置： ');
        Text.pop();
        Row.create();
        Text.create('表外: ');
        Text.pop();
        Radio.create({ value: 'outSideChart', group: 'leftYAxisLabelPosition' });
        Radio.checked(true);
        Radio.onChange((isChecked: boolean) => {
            if (this.leftAxis && isChecked) {
                this.leftAxis.setPosition(YAxisLabelPosition.OUTSIDE_CHART);
            }
        });
        Row.pop();
        Row.create();
        Row.padding({ left: 20 });
        Text.create('表内: ');
        Text.pop();
        Radio.create({ value: 'inSideChart', group: 'leftYAxisLabelPosition' });
        Radio.checked(false);
        Radio.onChange((isChecked: boolean) => {
            if (this.leftAxis && isChecked) {
                this.leftAxis.setPosition(YAxisLabelPosition.INSIDE_CHART);
            }
        });
        Row.pop();
        Row.pop();
        Row.create();
        Row.alignSelf(ItemAlign.Start);
        Text.create('右Y轴位置： ');
        Text.pop();
        Row.create();
        Text.create('表外: ');
        Text.pop();
        Radio.create({ value: 'outSideChart', group: 'rightYAxisLabelPosition' });
        Radio.checked(true);
        Radio.onChange((isChecked: boolean) => {
            if (this.rightAxis && isChecked) {
                this.rightAxis.setPosition(YAxisLabelPosition.OUTSIDE_CHART);
            }
        });
        Row.pop();
        Row.create();
        Row.padding({ left: 20 });
        Text.create('表内: ');
        Text.pop();
        Radio.create({ value: 'inSideChart', group: 'rightYAxisLabelPosition' });
        Radio.checked(false);
        Radio.onChange((isChecked: boolean) => {
            if (this.rightAxis && isChecked) {
                this.rightAxis.setPosition(YAxisLabelPosition.INSIDE_CHART);
            }
        });
        Row.pop();
        Row.pop();
        Row.create();
        Row.alignSelf(ItemAlign.Start);
        Text.create('X轴是否显示： ');
        Text.pop();
        Row.create();
        Text.create('X轴: ');
        Text.pop();
        Checkbox.create({ name: 'isShowXAxis', group: 'xAxis' });
        Checkbox.select(true);
        Checkbox.onChange((isChecked: boolean) => {
            if (this.xAxis) {
                this.xAxis.setEnabled(isChecked);
            }
        });
        Checkbox.pop();
        Row.pop();
        Row.pop();
        Text.create('X轴位置');
        Text.alignSelf(ItemAlign.Start);
        Text.pop();
        Row.create();
        Row.alignSelf(ItemAlign.Start);
        Column.create();
        Column.layoutWeight(1);
        Text.create('top');
        Text.pop();
        Radio.create({ value: 'top', group: 'xAxisLabelPosition' });
        Radio.checked(false);
        Radio.onChange((isChecked: boolean) => {
            if (this.xAxis && isChecked) {
                this.xAxis.setPosition(XAxisPosition.TOP);
            }
        });
        Column.pop();
        Column.create();
        Column.layoutWeight(1);
        Text.create('bottom');
        Text.pop();
        Radio.create({ value: 'bottom', group: 'xAxisLabelPosition' });
        Radio.checked(true);
        Radio.onChange((isChecked: boolean) => {
            if (this.xAxis && isChecked) {
                this.xAxis.setPosition(XAxisPosition.BOTTOM);
            }
        });
        Column.pop();
        Column.create();
        Column.layoutWeight(1);
        Text.create('both side');
        Text.pop();
        Radio.create({ value: 'both', group: 'xAxisLabelPosition' });
        Radio.checked(false);
        Radio.onChange((isChecked: boolean) => {
            if (this.xAxis && isChecked) {
                this.xAxis.setPosition(XAxisPosition.BOTH_SIDED);
            }
        });
        Column.pop();
        Column.create();
        Column.layoutWeight(1);
        Text.create('top');
        Text.pop();
        Text.create('InSide');
        Text.pop();
        Radio.create({ value: 'topInSide', group: 'xAxisLabelPosition' });
        Radio.checked(false);
        Radio.onChange((isChecked: boolean) => {
            if (this.xAxis && isChecked) {
                this.xAxis.setPosition(XAxisPosition.TOP_INSIDE);
            }
        });
        Column.pop();
        Column.create();
        Column.layoutWeight(1);
        Text.create('bottom');
        Text.pop();
        Text.create('InSide');
        Text.pop();
        Radio.create({ value: 'bottomInSide', group: 'xAxisLabelPosition' });
        Radio.checked(false);
        Radio.onChange((isChecked: boolean) => {
            if (this.xAxis && isChecked) {
                this.xAxis.setPosition(XAxisPosition.BOTTOM_INSIDE);
            }
        });
        Column.pop();
        Row.pop();
        Row.create();
        Row.alignSelf(ItemAlign.Start);
        Text.create('X轴标签最大显示数： ');
        Text.pop();
        TextInput.create({ text: this.mLastMaxVisibleXCount, placeholder: 'please input xAxis labels count.' });
        TextInput.layoutWeight(1);
        TextInput.type(InputType.Number);
        TextInput.onChange((value) => {
            this.mCurrentMaxVisibleXCount = value;
        });
        TextInput.onSubmit(() => {
            if (this.model && this.lineData && Number(this.mCurrentMaxVisibleXCount)) {
                let numValue: number = Number(this.mCurrentMaxVisibleXCount);
                if (numValue <= Number(this.mLastMaxVisibleXCount) && numValue > 0) {
                    this.mLastMaxVisibleXCount = this.mCurrentMaxVisibleXCount;
                    this.model.setVisibleXRangeMaximum(numValue);
                    this.lineData.notifyDataChanged();
                    promptAction.showToast({ message: 'X轴标签最大显示数已设置为： ' + this.mLastMaxVisibleXCount });
                }
                else {
                    promptAction.showToast({ message: '请输入小于等于' + this.mLastMaxVisibleXCount + '的正整数' });
                }
            }
            else {
                promptAction.showToast({ message: '请输入小于等于' + this.mLastMaxVisibleXCount + '的正整数' });
            }
        });
        Row.pop();
        Row.create();
        Row.alignSelf(ItemAlign.Start);
        Text.create('是否绘制背景色： ');
        Text.pop();
        Checkbox.create({ name: 'isDrawBackground', group: 'isDrawBackground' });
        Checkbox.select(false);
        Checkbox.onChange((isChecked: boolean) => {
            if (this.model) {
                this.model.setDrawGridBackground(isChecked);
            }
        });
        Checkbox.pop();
        Row.pop();
        Row.create();
        Row.alignSelf(ItemAlign.Start);
        Text.create('背景色： ');
        Text.pop();
        TextInput.create({ text: '#500000ff', placeholder: 'please input background color.ex:#500000ff/#0000ff' });
        TextInput.layoutWeight(1);
        TextInput.onChange((value) => {
            this.mBackgroundColor = value;
        });
        TextInput.onSubmit(() => {
            if (this.model && this.mBackgroundColor) {
                this.model.setGridBackgroundColor(this.mBackgroundColor);
                promptAction.showToast({ message: '背景色已设置为： ' + this.mBackgroundColor });
            }
        });
        Row.pop();
        Row.create();
        Row.alignSelf(ItemAlign.Start);
        Text.create('LimitLine是否在数据后： ');
        Text.pop();
        Checkbox.create({ name: 'isShowLimitLineBehindData', group: 'isShowLimitLineBehindData' });
        Checkbox.select(false);
        Checkbox.onChange((isChecked: boolean) => {
            if (this.leftAxis) {
                this.leftAxis.setDrawLimitLinesBehindData(isChecked);
            }
        });
        Checkbox.pop();
        Row.pop();
        Row.create();
        Row.alignSelf(ItemAlign.Start);
        Column.create();
        Text.create('左Y轴');
        Text.pop();
        Text.create('LimitLine');
        Text.pop();
        Text.create('位置');
        Text.pop();
        Column.pop();
        Column.create();
        Column.layoutWeight(1);
        Text.create('both');
        Text.pop();
        Radio.create({ value: 'both', group: 'limitLinePosition' });
        Radio.checked(true);
        Radio.onChange((isChecked: boolean) => {
            if (this.leftAxis && isChecked) {
                this.leftAxis.removeAllLimitLines();
                if (this.limitLine1) {
                    this.leftAxis.addLimitLine(this.limitLine1);
                }
                if (this.limitLine2) {
                    this.leftAxis.addLimitLine(this.limitLine2);
                }
            }
        });
        Column.pop();
        Column.create();
        Column.layoutWeight(1);
        Text.create('none');
        Text.pop();
        Radio.create({ value: 'none', group: 'limitLinePosition' });
        Radio.checked(false);
        Radio.onChange((isChecked: boolean) => {
            if (this.leftAxis && isChecked) {
                this.leftAxis.removeAllLimitLines();
            }
        });
        Column.pop();
        Column.create();
        Column.layoutWeight(1);
        Text.create('upper');
        Text.pop();
        Radio.create({ value: 'upper', group: 'limitLinePosition' });
        Radio.checked(false);
        Radio.onChange((isChecked: boolean) => {
            if (this.leftAxis && isChecked) {
                this.leftAxis.removeAllLimitLines();
                if (this.limitLine1) {
                    this.leftAxis.addLimitLine(this.limitLine1);
                }
            }
        });
        Column.pop();
        Column.create();
        Column.layoutWeight(1);
        Text.create('lower');
        Text.pop();
        Radio.create({ value: 'lower', group: 'limitLinePosition' });
        Radio.checked(false);
        Radio.onChange((isChecked: boolean) => {
            if (this.leftAxis && isChecked) {
                this.leftAxis.removeAllLimitLines();
                if (this.limitLine2) {
                    this.leftAxis.addLimitLine(this.limitLine2);
                }
            }
        });
        Column.pop();
        Row.pop();
        Column.pop();
        Button.createWithLabel('刷新');
        Button.margin({ top: 100 });
        Button.onClick(() => {
            if (this.model) {
                this.model.notifyDataSetChanged();
                this.model.invalidate();
            }
        });
        Button.pop();
        Stack.pop();
        Scroll.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new LineChartPage("1", undefined, {}));
