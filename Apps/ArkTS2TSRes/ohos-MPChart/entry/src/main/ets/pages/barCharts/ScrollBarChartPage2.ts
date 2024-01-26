interface ScrollBarChartPage2_Params {
    model?: BarChartModel | null;
    leftAxis?: YAxis | null;
    rightAxis?: YAxis | null;
    xAxis?: XAxis | null;
    data?: BarData | null;
    colorSetter?: XAxisColorSetter[];
    menuItemArr?: Array<string>;
    titleSelectString?: string;
    title?: string;
    titleModel?: ChartTitleModel;
    valueSelectedListener?: OnChartValueSelectedListener;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ScrollBarChartPage2_" + ++__generate__Id;
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
import { BarChart, BarChartModel, BarData, BarDataSet, BarEntry, EntryOhos, Highlight, IBarDataSet, JArrayList, OnChartValueSelectedListener, XAxis, XAxisPosition, YAxis, } from '@ohos/mpchart';
import title, { ChartTitleModel } from '../../title';
import Constants from '../../constants/Constants';
import Utils from '../../utils/Utils';
interface XAxisColorSetter {
    colorText: string;
    colorVal: string;
    color: number;
}
interface GridColorSetter {
    colorText: string;
    colorVal: string;
    color: number;
}
interface LineWidthSetter {
    text: string;
    lineWidth: number;
    lineWidthValue: string;
}
class ScrollBarChartPage2 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.model = null;
        this.leftAxis = null;
        this.rightAxis = null;
        this.xAxis = null;
        this.data = null;
        this.__colorSetter = new ObservedPropertyObject([
            { colorText: '红色', color: Color.Red, colorVal: 'red' },
            { colorText: '蓝色', color: Color.Blue, colorVal: 'blue' },
        ]
        //标题栏菜单文本
        , this, "colorSetter");
        this.menuItemArr = [Constants.TOGGLE_BAR_BORDERS, Constants.TOGGLE_VALUES,
            Constants.TOGGLE_HIGHLIGHT, Constants.TOGGLE_PINCHZOOM, Constants.TOGGLE_AUTO_SCALE,
            Constants.ANIMATE_X, Constants.ANIMATE_Y, Constants.ANIMATE_XY, Constants.SAVE_IMAGE];
        this.titleSelectString = 'X';
        this.title = 'BarChart Extension';
        this.__titleModel = new ObservedPropertyObject(new ChartTitleModel()
        //标题栏菜单回调
        , this, "titleModel");
        this.valueSelectedListener = {
            onValueSelected: (e: EntryOhos, h: Highlight) => {
                console.info("ScrollBarChartPage onValueSelected: " + e.getX());
            },
            onNothingSelected: () => {
                console.info("ScrollBarChartPage onNothingSelected");
            }
        };
        this.updateWithValueParams(params);
        this.declareWatch("titleModel", this.menuCallback);
    }
    updateWithValueParams(params: ScrollBarChartPage2_Params) {
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
        if (params.data !== undefined) {
            this.data = params.data;
        }
        if (params.colorSetter !== undefined) {
            this.colorSetter = params.colorSetter;
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
        if (params.valueSelectedListener !== undefined) {
            this.valueSelectedListener = params.valueSelectedListener;
        }
    }
    aboutToBeDeleted() {
        this.__colorSetter.aboutToBeDeleted();
        this.__titleModel.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private model: BarChartModel | null;
    private leftAxis: YAxis | null;
    private rightAxis: YAxis | null;
    private xAxis: XAxis | null;
    private data: BarData | null;
    private __colorSetter: ObservedPropertyObject<XAxisColorSetter[]>;
    get colorSetter() {
        return this.__colorSetter.get();
    }
    set colorSetter(newValue: XAxisColorSetter[]) {
        this.__colorSetter.set(newValue);
    }
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
        this.titleModel.menuItemArr = this.menuItemArr;
        this.titleModel.title = this.title;
        this.model = new BarChartModel();
        this.model.setOnChartValueSelectedListener(this.valueSelectedListener);
        this.model.setDragEnabled(false); //禁用滑动
        this.model.setScaleEnabled(false); //禁用缩放
        // if more than 40 entries are displayed in the this.model, no values will be drawn
        this.model.setMaxVisibleValueCount(40);
        // scaling can now only be done on x- and y-axis separately
        this.model.setPinchZoom(false);
        this.model.setDrawGridBackground(false);
        this.model.setGridBackgroundColor('#500000ff');
        this.model.setDrawBarShadow(false);
        this.model.setDrawValueAboveBar(false);
        this.model.setHighlightFullBarEnabled(false);
        // change the position of the y-labels
        this.leftAxis = this.model.getAxisLeft();
        if (this.leftAxis) {
            this.leftAxis.setAxisMinimum(0); // this replaces setStartAtZero(true)
        }
        this.rightAxis = this.model.getAxisRight();
        if (this.rightAxis) {
            this.rightAxis.setEnabled(false);
            this.rightAxis.setAxisMinimum(0);
        }
        this.xAxis = this.model.getXAxis();
        if (this.xAxis) {
            this.xAxis.setPosition(XAxisPosition.BOTTOM);
        }
        this.data = this.getNormalData();
        this.model.setData(this.data);
        this.model.setVisibleXRangeMaximum(20);
    }
    private getNormalData(): BarData {
        let values: JArrayList<BarEntry> = new JArrayList<BarEntry>();
        values.add(new BarEntry(1, 73.3));
        values.add(new BarEntry(2, 5.4));
        values.add(new BarEntry(3, 73.9));
        values.add(new BarEntry(4, 79.9));
        values.add(new BarEntry(5, 69.3));
        values.add(new BarEntry(6, 70.7));
        values.add(new BarEntry(7, 81.2));
        values.add(new BarEntry(8, 13.1));
        values.add(new BarEntry(9, 34.2));
        values.add(new BarEntry(10, 58.4));
        values.add(new BarEntry(11, 44.7));
        values.add(new BarEntry(12, 10.5));
        values.add(new BarEntry(13, 15.6));
        values.add(new BarEntry(14, 95.8));
        values.add(new BarEntry(15, 57.4));
        values.add(new BarEntry(16, 64.5));
        values.add(new BarEntry(17, 21.4));
        values.add(new BarEntry(18, 33.2));
        values.add(new BarEntry(19, 96.9));
        let dataSet: BarDataSet = new BarDataSet(values, 'DataSet');
        dataSet.setHighLightColor(Color.Black);
        dataSet.setDrawIcons(false);
        dataSet.setColorByColor(Color.Pink);
        let dataSetList: JArrayList<IBarDataSet> = new JArrayList<IBarDataSet>();
        dataSetList.add(dataSet);
        let barData: BarData = new BarData(dataSetList);
        barData.setBarWidth(0.85);
        return barData;
    }
    yAxisExtensionLineSettings(parent = null) {
        Row.create();
        Row.alignSelf(ItemAlign.Start);
        Text.create('y轴延伸是否开启： ');
        Text.pop();
        Row.create();
        Checkbox.create({ name: 'yExtensionLine', group: 'YE' });
        Checkbox.select(this.model?.yAxisExtensionLineIsEnable());
        Checkbox.onChange((isChecked: boolean) => {
            this.model?.setYAxisExtensionLine(isChecked);
            this.model?.invalidate();
        });
        Checkbox.pop();
        Row.pop();
        Row.pop();
    }
    yAxisVisibleSettings(parent = null) {
        Row.create();
        Row.alignSelf(ItemAlign.Start);
        Text.create('y轴是否显示： ');
        Text.pop();
        Row.create();
        Text.create('左y轴： ');
        Text.pop();
        Checkbox.create({ name: 'leftYAxis', group: 'yAxis' });
        Checkbox.select(true);
        Checkbox.onChange((isChecked: boolean) => {
            if (this.leftAxis) {
                this.leftAxis.setEnabled(isChecked);
                this.model?.invalidate();
            }
        });
        Checkbox.pop();
        Row.pop();
        Row.create();
        Text.create('右y轴： ');
        Text.pop();
        Checkbox.create({ name: 'rightYAxis', group: 'yAxis' });
        Checkbox.onChange((isChecked: boolean) => {
            if (this.rightAxis) {
                this.rightAxis.setEnabled(isChecked);
                this.model?.invalidate();
            }
        });
        Checkbox.pop();
        Row.pop();
        Row.pop();
    }
    axisColorSettings(parent = null) {
        Row.create();
        Row.alignSelf(ItemAlign.Start);
        Text.create('轴线文字和颜色: ');
        Text.pop();
        ForEach.create("2", this, ObservedObject.GetRawObject(this.colorSetter), (item: XAxisColorSetter) => {
            Row.create();
            Text.create(item.colorText);
            Text.pop();
            Radio.create({ value: item.colorVal, group: 'axisColor' });
            Radio.checked(true);
            Radio.onChange((isChecked: boolean) => {
                if (isChecked && this.model) {
                    const xAxis = this.model.getXAxis();
                    const leftYAxis = this.model.getAxisLeft();
                    const rightYAxis = this.model.getAxisRight();
                    if (xAxis) {
                        xAxis.setTextColor(item.color);
                        xAxis.setTextSize(24);
                        xAxis.setAxisLineColor(item.color);
                    }
                    if (leftYAxis) {
                        leftYAxis.setTextColor(item.color);
                        leftYAxis.setTextSize(24);
                        leftYAxis.setAxisLineColor(item.color);
                    }
                    if (rightYAxis) {
                        rightYAxis.setTextColor(item.color);
                        rightYAxis.setTextSize(24);
                        rightYAxis.setAxisLineColor(item.color);
                    }
                    this.model.invalidate();
                }
            });
            Row.pop();
        });
        ForEach.pop();
        Row.pop();
    }
    axisLineWidthSettings(parent = null) {
        Row.create();
        Row.alignSelf(ItemAlign.Start);
        Text.create('y轴线宽： ');
        Text.pop();
        ForEach.create("3", this, ObservedObject.GetRawObject([
            { text: '0.5', lineWidth: 0.5, lineWidthValue: 'l1' },
            { text: '1', lineWidth: 1, lineWidthValue: 'l2' }
        ]), (item: LineWidthSetter) => {
            Row.create();
            Text.create(item.text);
            Text.pop();
            Radio.create({ value: item.lineWidthValue, group: 'lineWidth' });
            Radio.checked(false);
            Radio.onChange((isChecked: boolean) => {
                if (isChecked) {
                    if (this.model) {
                        const yAxis = this.model.getAxisLeft();
                        if (yAxis) {
                            yAxis.setAxisLineWidth(item.lineWidth);
                            this.model.invalidate();
                        }
                    }
                }
            });
            Row.pop();
        }, (item: LineWidthSetter) => item.lineWidthValue);
        ForEach.pop();
        Row.pop();
    }
    render() {
        Column.create();
        let earlierCreatedChild_4: title = (this && this.findChildById) ? this.findChildById("4") as title : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new title("4", this, { model: this.titleModel }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                model: this.titleModel
            });
            View.create(earlierCreatedChild_4);
        }
        Column.create();
        Divider.create();
        Divider.width('1px');
        Divider.padding({ top: 5 });
        Scroll.create();
        Column.create();
        this.yAxisExtensionLineSettings(this);
        this.yAxisVisibleSettings(this);
        this.axisColorSettings(this);
        this.axisLineWidthSettings(this);
        Column.pop();
        Scroll.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new ScrollBarChartPage2("1", undefined, {}));
