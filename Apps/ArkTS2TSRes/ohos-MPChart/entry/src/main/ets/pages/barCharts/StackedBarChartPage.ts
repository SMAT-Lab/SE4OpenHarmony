interface StackedBarChartPage_Params {
    model?: BarChartModel | null;
    leftAxis?: YAxis | null;
    rightAxis?: YAxis | null;
    xAxis?: XAxis | null;
    limitLine1?: LimitLine | null;
    limitLine2?: LimitLine | null;
    data?: BarData | null;
    normalMarker?: MarkerView | null;
    stackMarker?: CustomMarkerView | null;
    menuItemArr?: Array<string>;
    titleSelectString?: string;
    title?: string;
    titleModel?: ChartTitleModel;
    valueSelectedListener?: OnChartValueSelectedListener;
    chartGestureListener?: OnChartGestureListener;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "StackedBarChartPage_" + ++__generate__Id;
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
import { BarChart, BarChartModel, BarData, BarDataSet, BarEntry, ChartGesture, ColorTemplate, Description, EntryOhos, Highlight, IBarDataSet, JArrayList, Legend, LimitLabelPosition, LimitLine, MarkerView, OnChartGestureListener, OnChartValueSelectedListener, XAxis, XAxisPosition, YAxis, } from '@ohos/mpchart';
import Constants from '../../constants/Constants';
import CustomMarkerView from '../../customcomponents/CustomMarkerView';
import title, { ChartTitleModel } from '../../title';
import Utils from '../../utils/Utils';
class StackedBarChartPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.model = null;
        this.leftAxis = null;
        this.rightAxis = null;
        this.xAxis = null;
        this.limitLine1 = null;
        this.limitLine2 = null;
        this.data = null;
        this.normalMarker = null;
        this.stackMarker = null;
        this.menuItemArr = [Constants.TOGGLE_BAR_BORDERS, Constants.TOGGLE_VALUES,
            Constants.TOGGLE_HIGHLIGHT, Constants.TOGGLE_PINCHZOOM, Constants.TOGGLE_AUTO_SCALE,
            Constants.ANIMATE_X, Constants.ANIMATE_Y, Constants.ANIMATE_XY, Constants.SAVE_IMAGE];
        this.titleSelectString = 'X';
        this.title = 'Stacked';
        this.__titleModel = new ObservedPropertyObject(new ChartTitleModel()
        //标题栏菜单回调
        , this, "titleModel");
        this.valueSelectedListener = {
            onValueSelected: (e: EntryOhos, h: Highlight) => {
                console.info("StackedBarChartPage onValueSelected: " + e.getX());
            },
            onNothingSelected: () => {
                console.info("StackedBarChartPage onNothingSelected");
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
    updateWithValueParams(params: StackedBarChartPage_Params) {
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
        if (params.normalMarker !== undefined) {
            this.normalMarker = params.normalMarker;
        }
        if (params.stackMarker !== undefined) {
            this.stackMarker = params.stackMarker;
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
    private normalMarker: MarkerView | null;
    private stackMarker: CustomMarkerView | null;
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
    private chartGestureListener: OnChartGestureListener;
    aboutToAppear() {
        this.titleModel.menuItemArr = this.menuItemArr;
        this.titleModel.title = this.title;
        this.model = new BarChartModel();
        this.model.setOnChartValueSelectedListener(this.valueSelectedListener);
        this.model.setOnChartGestureListener(this.chartGestureListener);
        let description: Description | null = this.model.getDescription();
        if (description) {
            description.setEnabled(false);
        }
        let l: Legend | null = this.model.getLegend();
        if (l) {
            l.setEnabled(false);
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
            this.xAxis.setPosition(XAxisPosition.TOP);
        }
        this.normalMarker = new MarkerView();
        this.model.setMarker(this.normalMarker);
        this.stackMarker = new CustomMarkerView();
        this.data = this.getStackData();
        this.model.setData(this.data);
        this.model.setVisibleXRangeMaximum(20);
    }
    private getColors(): number[] {
        // have as many colors as stack-values per entry
        let colors: number[] = [];
        colors.push(ColorTemplate.MATERIAL_COLORS[0]);
        colors.push(ColorTemplate.MATERIAL_COLORS[1]);
        colors.push(ColorTemplate.MATERIAL_COLORS[2]);
        return colors;
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
        set1.setColorsByVariable(this.getColors());
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
        Column.pop();
        Column.pop();
    }
}
loadDocument(new StackedBarChartPage("1", undefined, {}));
