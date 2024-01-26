interface ScrollBarChartPage_Params {
    model?: BarChartModel | null;
    leftAxis?: YAxis | null;
    rightAxis?: YAxis | null;
    xAxis?: XAxis | null;
    limitLine1?: LimitLine | null;
    limitLine2?: LimitLine | null;
    data?: BarData | null;
    mBarWidth?: string;
    mBackgroundColor?: string;
    mLastMaxVisibleXCount?: string;
    mCurrentMaxVisibleXCount?: string;
    normalMarker?: MarkerView | null;
    stackMarker?: CustomMarkerView | null;
    isChangedMaxVisibleXCount?: boolean;
    menuItemArr?: Array<string>;
    titleSelectString?: string;
    title?: string;
    titleModel?: ChartTitleModel;
    valueSelectedListener?: OnChartValueSelectedListener;
    chartGestureListener?: OnChartGestureListener;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ScrollBarChartPage_" + ++__generate__Id;
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
import { BarChart, BarChartModel, BarData, BarDataSet, BarEntry, ChartGesture, Description, EntryOhos, Fill, Highlight, IBarDataSet, JArrayList, Legend, LimitLabelPosition, LimitLine, MarkerView, OnChartGestureListener, OnChartValueSelectedListener, XAxis, XAxisPosition, YAxis, YAxisLabelPosition } from '@ohos/mpchart';
import CustomMarkerView from '../../customcomponents/CustomMarkerView';
import promptAction from '@ohos.promptAction';
import title, { ChartTitleModel } from '../../title';
import LongPressMarkerView from '../../customcomponents/LongPressMarkerView';
import Constants from '../../constants/Constants';
import Utils from '../../utils/Utils';
class ScrollBarChartPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.model = null;
        this.leftAxis = null;
        this.rightAxis = null;
        this.xAxis = null;
        this.limitLine1 = null;
        this.limitLine2 = null;
        this.data = null;
        this.mBarWidth = '85';
        this.mBackgroundColor = '#500000ff';
        this.mLastMaxVisibleXCount = '20';
        this.mCurrentMaxVisibleXCount = '20';
        this.normalMarker = null;
        this.stackMarker = null;
        this.isChangedMaxVisibleXCount = false;
        this.menuItemArr = [Constants.TOGGLE_BAR_BORDERS, Constants.TOGGLE_VALUES,
            Constants.TOGGLE_HIGHLIGHT, Constants.TOGGLE_PINCHZOOM, Constants.TOGGLE_AUTO_SCALE, Constants.TOGGLE_ROUNDED,
            Constants.ANIMATE_X, Constants.ANIMATE_Y, Constants.ANIMATE_XY, Constants.SAVE_IMAGE];
        this.titleSelectString = 'X';
        this.title = 'BarChart';
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
    updateWithValueParams(params: ScrollBarChartPage_Params) {
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
        if (params.limitLine1 !== undefined) {
            this.limitLine1 = params.limitLine1;
        }
        if (params.limitLine2 !== undefined) {
            this.limitLine2 = params.limitLine2;
        }
        if (params.data !== undefined) {
            this.data = params.data;
        }
        if (params.mBarWidth !== undefined) {
            this.mBarWidth = params.mBarWidth;
        }
        if (params.mBackgroundColor !== undefined) {
            this.mBackgroundColor = params.mBackgroundColor;
        }
        if (params.mLastMaxVisibleXCount !== undefined) {
            this.mLastMaxVisibleXCount = params.mLastMaxVisibleXCount;
        }
        if (params.mCurrentMaxVisibleXCount !== undefined) {
            this.mCurrentMaxVisibleXCount = params.mCurrentMaxVisibleXCount;
        }
        if (params.normalMarker !== undefined) {
            this.normalMarker = params.normalMarker;
        }
        if (params.stackMarker !== undefined) {
            this.stackMarker = params.stackMarker;
        }
        if (params.isChangedMaxVisibleXCount !== undefined) {
            this.isChangedMaxVisibleXCount = params.isChangedMaxVisibleXCount;
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
        if (params.chartGestureListener !== undefined) {
            this.chartGestureListener = params.chartGestureListener;
        }
    }
    aboutToBeDeleted() {
        this.__titleModel.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private model: BarChartModel | null;
    private leftAxis: YAxis | null;
    private rightAxis: YAxis | null;
    private xAxis: XAxis | null;
    private limitLine1: LimitLine | null;
    private limitLine2: LimitLine | null;
    private data: BarData | null;
    private mBarWidth: string;
    private mBackgroundColor: string;
    private mLastMaxVisibleXCount: string;
    private mCurrentMaxVisibleXCount: string;
    private normalMarker: MarkerView | null;
    private stackMarker: CustomMarkerView | null;
    private isChangedMaxVisibleXCount: boolean;
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
            case Constants.TOGGLE_ROUNDED:
                if (!barData) {
                    break;
                }
                if (barData.getTopRadius() == 0) {
                    barData.setTopRadius(5);
                }
                else {
                    barData.setTopRadius(0);
                }
                this.model.invalidate();
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
    private chartGestureListener: OnChartGestureListener;
    aboutToAppear() {
        this.titleModel.menuItemArr = this.menuItemArr;
        this.titleModel.title = this.title;
        this.model = new BarChartModel();
        this.model.setOnChartValueSelectedListener(this.valueSelectedListener);
        this.model.setOnChartGestureListener(this.chartGestureListener);
        this.model.setDragEnabled(false); //禁用滑动
        this.model.setScaleEnabled(false); //禁用缩放
        let description: Description | null = this.model.getDescription();
        if (description) {
            description.setEnabled(true);
        }
        let l: Legend | null = this.model.getLegend();
        if (l) {
            l.setEnabled(true);
        }
        // if more than 40 entries are displayed in the this.model, no values will be drawn
        this.model.setMaxVisibleValueCount(40);
        // scaling can now only be done on x- and y-axis separately
        this.model.setPinchZoom(false);
        this.model.setDrawGridBackground(false);
        this.model.setGridBackgroundColor('#500000ff');
        this.model.setDrawBarShadow(false);
        this.model.setDrawValueAboveBar(false);
        this.model.setHighlightFullBarEnabled(false);
        //设置长按事件自定义view
        this.model.setLongPressMarker(new LongPressMarkerView());
        // //设置是否支持拖拽
        // this.model.setDragEnabled(false);
        // //设置是否支持长按高亮
        // this.model.setHighlightPerLongPressEnabled(false);
        // //设置是否支持双击放大
        // this.model.setDoubleTapToZoomEnabled(false);
        // //设置是否支持点击高亮
        // this.model.setHighlightPerTapEnabled(false);
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
        // change the position of the y-labels
        this.leftAxis = this.model.getAxisLeft();
        if (this.leftAxis) {
            this.leftAxis.setAxisMinimum(0); // this replaces setStartAtZero(true)
            this.leftAxis.setDrawLimitLinesBehindData(false);
            // add limit lines
            this.leftAxis.addLimitLine(this.limitLine1);
            this.leftAxis.addLimitLine(this.limitLine2);
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
        this.normalMarker = new MarkerView();
        this.model.setMarker(this.normalMarker);
        this.stackMarker = new CustomMarkerView();
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
    private getGradientData(): BarData {
        let values: JArrayList<BarEntry> = new JArrayList<BarEntry>();
        values.add(new BarEntry(1, 32.9));
        values.add(new BarEntry(2, 44.7));
        values.add(new BarEntry(3, 2.1));
        values.add(new BarEntry(4, 46.9));
        values.add(new BarEntry(5, 8.8));
        values.add(new BarEntry(6, 82.1));
        values.add(new BarEntry(7, 86.9));
        values.add(new BarEntry(8, 15.9));
        values.add(new BarEntry(9, 29.4));
        values.add(new BarEntry(10, 71.6));
        values.add(new BarEntry(11, 55.7));
        values.add(new BarEntry(12, 35.8));
        values.add(new BarEntry(13, 67.7));
        values.add(new BarEntry(14, 34.9));
        values.add(new BarEntry(15, 50.9));
        values.add(new BarEntry(16, 40.5));
        values.add(new BarEntry(17, 27.1));
        values.add(new BarEntry(18, 45.7));
        values.add(new BarEntry(19, 26.8));
        let dataSet: BarDataSet = new BarDataSet(values, 'DataSet');
        dataSet.setHighLightColor(Color.Black);
        dataSet.setDrawIcons(false);
        let startColor1: string = '#ffffbb33';
        let startColor2: string = '#ff33b5e5';
        let startColor3: string = '#ffffbb33';
        let startColor4: string = '#ff99cc00';
        let startColor5: string = '#ffff4444';
        let endColor1: string = '#ff0099cc';
        let endColor2: string = '#ffaa66cc';
        let endColor3: string = '#ff669900';
        let endColor4: string = '#ffcc0000';
        let endColor5: string = '#ffff8800';
        let gradientFills: JArrayList<Fill> = new JArrayList<Fill>();
        gradientFills.add(new Fill(startColor1, endColor1));
        gradientFills.add(new Fill(startColor2, endColor2));
        gradientFills.add(new Fill(startColor3, endColor3));
        gradientFills.add(new Fill(startColor4, endColor4));
        gradientFills.add(new Fill(startColor5, endColor5));
        dataSet.setFills(gradientFills);
        let dataSetList: JArrayList<IBarDataSet> = new JArrayList<IBarDataSet>();
        dataSetList.add(dataSet);
        let barData: BarData = new BarData(dataSetList);
        barData.setBarWidth(0.85);
        return barData;
    }
    private getStackData(): BarData {
        let values: JArrayList<BarEntry> = new JArrayList<BarEntry>();
        values.add(new BarEntry(1, [38.0, 28.0, 39.8]));
        values.add(new BarEntry(2, [18.2, 16.1, 16.1]));
        values.add(new BarEntry(3, [45.8, 49.8, 26.7]));
        values.add(new BarEntry(4, [36.5, 43.8, 15.1]));
        values.add(new BarEntry(5, [51.5, 35.4, 24.1]));
        values.add(new BarEntry(6, [44.9, 21.4, 15.9]));
        values.add(new BarEntry(7, [32.9, 40.4, 32.7]));
        values.add(new BarEntry(8, [24.3, 31.0, 47.1]));
        values.add(new BarEntry(9, [17.4, 48.4, 49.6]));
        values.add(new BarEntry(10, [32.0, 29.8, 20.0]));
        values.add(new BarEntry(11, [43.9, 52.7, 27.7]));
        values.add(new BarEntry(12, [28.4, 46.2, 51.8]));
        values.add(new BarEntry(13, [42.6, 51.9, 44.0]));
        values.add(new BarEntry(14, [14.8, 22.4, 31.2]));
        values.add(new BarEntry(15, [50.3, 18.7, 18.3]));
        values.add(new BarEntry(16, [20.7, 22.9, 40.2]));
        values.add(new BarEntry(17, [49.4, 38.3, 41.7]));
        values.add(new BarEntry(18, [45.9, 40.7, 29.5]));
        values.add(new BarEntry(19, [37.1, 31.8, 42.9]));
        let set1: BarDataSet | null = null;
        set1 = new BarDataSet(values, "Statistics Vienna 2014");
        set1.setDrawIcons(false);
        set1.setColorsByArr([Color.Red, Color.Green, Color.Pink]);
        set1.setStackLabels(["Births", "Divorces", "Marriages"]);
        let dataSets: JArrayList<IBarDataSet> = new JArrayList<IBarDataSet>();
        dataSets.add(set1);
        let data: BarData = new BarData(dataSets);
        data.setValueTextColor(Color.White);
        return data;
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
        Radio.create({ value: 'normal', group: 'dataType' });
        Radio.checked(true);
        Radio.onChange((isChecked: boolean) => {
            if (isChecked) {
                this.data = this.getNormalData();
                if (this.model) {
                    if (this.normalMarker) {
                        this.model.setMarker(this.normalMarker);
                    }
                    this.model.setData(this.data);
                    if (this.isChangedMaxVisibleXCount) {
                        this.model.setVisibleXRangeMaximum(Number(this.mLastMaxVisibleXCount));
                        this.model.setVisibleXRangeMinimum(Number(this.mLastMaxVisibleXCount));
                        this.data.notifyDataChanged();
                        this.model.notifyDataSetChanged();
                        this.model.invalidate();
                    }
                }
            }
        });
        Row.pop();
        Row.create();
        Text.create('渐变: ');
        Text.pop();
        Radio.create({ value: 'gradient', group: 'dataType' });
        Radio.checked(false);
        Radio.onChange((isChecked: boolean) => {
            if (isChecked) {
                this.data = this.getGradientData();
                if (this.model) {
                    if (this.normalMarker) {
                        this.model.setMarker(this.normalMarker);
                    }
                    this.model.setData(this.data);
                    if (this.isChangedMaxVisibleXCount) {
                        this.model.setVisibleXRangeMaximum(Number(this.mLastMaxVisibleXCount));
                        this.model.setVisibleXRangeMinimum(Number(this.mLastMaxVisibleXCount));
                        this.data.notifyDataChanged();
                        this.model.notifyDataSetChanged();
                        this.model.invalidate();
                    }
                }
            }
        });
        Row.pop();
        Row.create();
        Text.create('堆叠: ');
        Text.pop();
        Radio.create({ value: 'stack', group: 'dataType' });
        Radio.checked(false);
        Radio.onChange((isChecked: boolean) => {
            if (isChecked) {
                this.data = this.getStackData();
                if (this.model) {
                    if (this.stackMarker) {
                        this.model.setMarker(this.stackMarker);
                    }
                    this.model.setData(this.data);
                    if (this.isChangedMaxVisibleXCount) {
                        this.model.setVisibleXRangeMaximum(Number(this.mLastMaxVisibleXCount));
                        this.model.setVisibleXRangeMinimum(Number(this.mLastMaxVisibleXCount));
                        this.data.notifyDataChanged();
                        this.model.notifyDataSetChanged();
                        this.model.invalidate();
                    }
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
                this.data = new BarData(new JArrayList<IBarDataSet>());
                if (this.model) {
                    this.model.setData(this.data);
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
            if (this.model && this.data && Number(this.mCurrentMaxVisibleXCount)) {
                let numValue: number = Number(this.mCurrentMaxVisibleXCount);
                if (numValue <= Number(this.mLastMaxVisibleXCount) && numValue > 0) {
                    this.isChangedMaxVisibleXCount = true;
                    this.mLastMaxVisibleXCount = this.mCurrentMaxVisibleXCount;
                    this.model.setVisibleXRangeMaximum(numValue);
                    this.data.notifyDataChanged();
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
        Text.create('是否设置MarkerView: ');
        Text.pop();
        Checkbox.create({ name: 'isShowMarkerView', group: 'isShowMarkerView' });
        Checkbox.select(true);
        Checkbox.onChange((isChecked: boolean) => {
            if (this.model) {
                this.model.setDrawMarkerViews(isChecked);
            }
        });
        Checkbox.pop();
        Row.pop();
        Row.create();
        Row.alignSelf(ItemAlign.Start);
        Text.create('设置柱状图显示宽度百分比： ');
        Text.pop();
        TextInput.create({ text: '85', placeholder: 'please input bar width percent.' });
        TextInput.layoutWeight(1);
        TextInput.type(InputType.Number);
        TextInput.onChange((value) => {
            this.mBarWidth = value;
        });
        TextInput.onSubmit(() => {
            if (this.data && this.mBarWidth) {
                let percent: number = Number(this.mBarWidth);
                if (percent > 0 && percent <= 100) {
                    this.data.setBarWidth(percent / 100);
                    promptAction.showToast({ message: '柱状图显示宽度百分比已设置为： ' + this.mBarWidth });
                }
                else {
                    promptAction.showToast({ message: '请输入1-100之间的正整数' });
                }
            }
            else {
                promptAction.showToast({ message: '请输入1-100之间的正整数' });
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
loadDocument(new ScrollBarChartPage("1", undefined, {}));
