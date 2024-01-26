interface ScrollBarChartPage2_Params {
    model?: BarChartModel | null;
    leftAxis?: YAxis | null;
    rightAxis?: YAxis | null;
    xAxis?: XAxis | null;
    data?: BarData | null;
    lineChartModel?: LineChartModel | null;
    dataSet?: LineDataSet | null;
    customUiInfo?: CustomUiInfo;
    lineChartCustomUiInfo?: CustomUiInfo;
    uiTriggerEvent?: EventType;
    eventText?: string;
    colorSetter?: XAxisColorSetter[];
    menuItemArr?: Array<string>;
    titleSelectString?: string;
    title?: string;
    titleModel?: ChartTitleModel;
    valueSelectedListener?: OnChartValueSelectedListener;
    chartGestureListener?: OnChartGestureListener;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CustomMarkerViewChartPage_" + ++__generate__Id;
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
import { BarChart, BarChartModel, BarData, BarDataSet, BarEntry, ChartColorStop, ChartGesture, EntryOhos, Highlight, IBarDataSet, ILineDataSet, JArrayList, LineChart, LineChartModel, LineData, LineDataSet, Mode, OnChartGestureListener, OnChartValueSelectedListener, XAxis, XAxisPosition, YAxis, } from '@ohos/mpchart';
import title, { ChartTitleModel } from '../../title';
import Constants from '../../constants/Constants';
import Utils from '../../utils/Utils';
import { EventType } from '@ohos/mpchart/src/main/ets/components/listener/EventControl';
import { CustomUiInfo } from '@ohos/mpchart/src/main/ets/components/data/customUiData';
interface XAxisColorSetter {
    colorText: string;
    colorVal: string;
    color: number;
}
interface uiTriggerType {
    text: string;
    type: EventType;
}
class ScrollBarChartPage2 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.model = null;
        this.leftAxis = null;
        this.rightAxis = null;
        this.xAxis = null;
        this.data = null;
        this.lineChartModel = null;
        this.dataSet = null;
        this.__customUiInfo = new ObservedPropertyObject(new CustomUiInfo(90, 50), this, "customUiInfo");
        this.__lineChartCustomUiInfo = new ObservedPropertyObject(new CustomUiInfo(90, 60), this, "lineChartCustomUiInfo");
        this.__uiTriggerEvent = new ObservedPropertyObject(EventType.SingleTap, this, "uiTriggerEvent");
        this.__eventText = new ObservedPropertySimple('', this, "eventText");
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
        this.title = 'Event Control & Custom MarkerView';
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
                this.eventText = 'LongPressed!';
                console.info("-----------------chartGestureListener onChartLongPressed");
            },
            onChartDoubleTapped: (isTouchEvent: boolean, me: TouchEvent | GestureEvent) => {
                this.eventText = 'DoubleTapped!';
                console.info("-----------------chartGestureListener onChartDoubleTapped");
            },
            onChartSingleTapped: (isTouchEvent: boolean, me: TouchEvent | GestureEvent) => {
                this.eventText = 'SingleTapped!';
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
        if (params.lineChartModel !== undefined) {
            this.lineChartModel = params.lineChartModel;
        }
        if (params.dataSet !== undefined) {
            this.dataSet = params.dataSet;
        }
        if (params.customUiInfo !== undefined) {
            this.customUiInfo = params.customUiInfo;
        }
        if (params.lineChartCustomUiInfo !== undefined) {
            this.lineChartCustomUiInfo = params.lineChartCustomUiInfo;
        }
        if (params.uiTriggerEvent !== undefined) {
            this.uiTriggerEvent = params.uiTriggerEvent;
        }
        if (params.eventText !== undefined) {
            this.eventText = params.eventText;
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
        if (params.chartGestureListener !== undefined) {
            this.chartGestureListener = params.chartGestureListener;
        }
    }
    aboutToBeDeleted() {
        this.__customUiInfo.aboutToBeDeleted();
        this.__lineChartCustomUiInfo.aboutToBeDeleted();
        this.__uiTriggerEvent.aboutToBeDeleted();
        this.__eventText.aboutToBeDeleted();
        this.__colorSetter.aboutToBeDeleted();
        this.__titleModel.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private model: BarChartModel | null;
    private leftAxis: YAxis | null;
    private rightAxis: YAxis | null;
    private xAxis: XAxis | null;
    private data: BarData | null;
    private lineChartModel: LineChartModel | null;
    private dataSet: LineDataSet | null;
    // 宽: 90 高: 30
    private __customUiInfo: ObservedPropertyObject<CustomUiInfo>;
    get customUiInfo() {
        return this.__customUiInfo.get();
    }
    set customUiInfo(newValue: CustomUiInfo) {
        this.__customUiInfo.set(newValue);
    }
    private __lineChartCustomUiInfo: ObservedPropertyObject<CustomUiInfo>;
    get lineChartCustomUiInfo() {
        return this.__lineChartCustomUiInfo.get();
    }
    set lineChartCustomUiInfo(newValue: CustomUiInfo) {
        this.__lineChartCustomUiInfo.set(newValue);
    }
    // 自定义ui事件触发类型
    private __uiTriggerEvent: ObservedPropertyObject<EventType>;
    get uiTriggerEvent() {
        return this.__uiTriggerEvent.get();
    }
    set uiTriggerEvent(newValue: EventType) {
        this.__uiTriggerEvent.set(newValue);
    }
    // 事件显示文字
    private __eventText: ObservedPropertySimple<string>;
    get eventText() {
        return this.__eventText.get();
    }
    set eventText(newValue: string) {
        this.__eventText.set(newValue);
    }
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
    private chartGestureListener: OnChartGestureListener;
    aboutToAppear() {
        this.titleModel.menuItemArr = this.menuItemArr;
        this.titleModel.title = this.title;
        this.model = new BarChartModel();
        this.model.setOnChartValueSelectedListener(this.valueSelectedListener);
        this.model.setOnChartGestureListener(this.chartGestureListener);
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
        // line chart 设置
        this.lineChartModel = new LineChartModel();
        this.lineChartModel.setOnChartGestureListener(this.chartGestureListener);
        let lineData: LineData = this.getLineData();
        lineData.setValueTextSize(vp2px(10));
        this.lineChartModel.setData(lineData);
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
    private setEventStatusByType(evType: EventType, isChecked: Boolean) {
        if (this.model && this.lineChartModel) {
            if (isChecked) {
                this.model.eventControl.setEventEnable(evType);
                this.lineChartModel.eventControl.setEventEnable(evType);
            }
            else {
                this.model.eventControl.setEventDisable(evType);
                this.lineChartModel.eventControl.setEventDisable(evType);
            }
        }
    }
    eventSettings(parent = null) {
        Row.create();
        Text.create(`自定义点击：${this.eventText}`);
        Text.pop();
        Row.pop();
        Row.create();
        Row.alignSelf(ItemAlign.Start);
        Text.create('事件是否开启： ');
        Text.pop();
        Row.create();
        Text.create('单击: ');
        Text.pop();
        Checkbox.create({ name: 'leftYAxis', group: 'yAxis' });
        Checkbox.select(this.model?.eventControl.eventIsEnable(EventType.SingleTap));
        Checkbox.onChange((isChecked: boolean) => {
            this.setEventStatusByType(EventType.SingleTap, isChecked);
        });
        Checkbox.pop();
        Row.pop();
        Row.create();
        Text.create('双击: ');
        Text.pop();
        Checkbox.create({ name: 'rightYAxis', group: 'yAxis' });
        Checkbox.select(this.model?.eventControl.eventIsEnable(EventType.DoubleTap));
        Checkbox.onChange((isChecked: boolean) => {
            this.setEventStatusByType(EventType.DoubleTap, isChecked);
        });
        Checkbox.pop();
        Row.pop();
        Row.create();
        Text.create('长按: ');
        Text.pop();
        Checkbox.create({ name: 'rightYAxis', group: 'yAxis' });
        Checkbox.select(this.model?.eventControl.eventIsEnable(EventType.LongPress));
        Checkbox.onChange((isChecked: boolean) => {
            this.setEventStatusByType(EventType.LongPress, isChecked);
        });
        Checkbox.pop();
        Row.pop();
        Row.pop();
        Row.create();
        Row.alignSelf(ItemAlign.Start);
        Text.create('自定义ui事件触发类型：');
        Text.pop();
        ForEach.create("2", this, ObservedObject.GetRawObject([
            { text: '单击', type: EventType.SingleTap },
            { text: '双击', type: EventType.DoubleTap },
            { text: '长按', type: EventType.LongPress },
        ]), (item: uiTriggerType) => {
            Row.create();
            Text.create(item.text);
            Text.pop();
            Radio.create({ value: String(item.type), group: 'eV' });
            Radio.checked(this.uiTriggerEvent === item.type);
            Radio.onChange((isChecked: boolean) => {
                if (isChecked) {
                    this.uiTriggerEvent = item.type;
                }
            });
            Row.pop();
        });
        ForEach.pop();
        Row.pop();
    }
    customUi(parent = null) {
        If.create();
        // 是否在图表content内
        if (this.customUiInfo.isInbounds && this.customUiInfo.data) {
            If.branchId(0);
            Column.create();
            Column.padding(4);
            Column.borderRadius(6);
            Column.border({ width: 1, color: Color.Orange });
            Column.backgroundColor(0xf0f0f0);
            Column.width(this.customUiInfo.width);
            Column.height(this.customUiInfo.height);
            Column.margin({ left: this.customUiInfo.x, top: this.customUiInfo.y });
            Column.alignItems(HorizontalAlign.Start);
            Column.onClick(ev => {
                this.customUiInfo.showUi = false;
            });
            Text.create(`2023-12-15`);
            Text.fontColor(Color.Gray);
            Text.fontSize(12);
            Text.fontWeight(FontWeight.Bold);
            Text.pop();
            Text.create(`X: ${this.customUiInfo.data.getX()}`);
            Text.fontColor(Color.Gray);
            Text.fontSize(12);
            Text.pop();
            Text.create(`Y: ${this.customUiInfo.data.getY()}`);
            Text.fontColor(Color.Gray);
            Text.fontSize(12);
            Text.pop();
            Column.pop();
        }
        If.pop();
    }
    lineChartCustomUi(parent = null) {
        If.create();
        // 是否在图表content内
        if (this.customUiInfo.isInbounds && this.customUiInfo?.data) {
            If.branchId(0);
            Column.create();
            Column.padding(4);
            Column.borderRadius(8);
            Column.border({ width: 1, color: Color.Blue });
            Column.backgroundColor(0xf0f0f0);
            Column.width(this.customUiInfo.width);
            Column.height(this.customUiInfo.height);
            Column.margin({ left: this.customUiInfo.x, top: this.customUiInfo.y });
            Column.alignItems(HorizontalAlign.Start);
            Column.onClick(ev => {
                this.customUiInfo.showUi = false;
            });
            Text.create(`2023-12-15`);
            Text.fontColor(Color.Gray);
            Text.fontSize(12);
            Text.fontWeight(FontWeight.Bold);
            Text.pop();
            Text.create(`X: ${this.customUiInfo.data.getX()}`);
            Text.fontColor(Color.Gray);
            Text.fontSize(12);
            Text.pop();
            Text.create(`Y: ${Math.round(this.customUiInfo.data.getY())}`);
            Text.fontColor(Color.Gray);
            Text.fontSize(12);
            Text.pop();
            Column.pop();
        }
        If.pop();
    }
    render() {
        Column.create();
        let earlierCreatedChild_3: title = (this && this.findChildById) ? this.findChildById("3") as title : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new title("3", this, { model: this.titleModel }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                model: this.titleModel
            });
            View.create(earlierCreatedChild_3);
        }
        Column.create();
        Divider.create();
        Divider.width('1px');
        Divider.padding({ top: 5 });
        Divider.create();
        Divider.width('1px');
        Divider.padding({ top: 5 });
        Scroll.create();
        Stack.create();
        Stack.align(Alignment.TopEnd);
        Column.create();
        this.eventSettings(this);
        Column.pop();
        Stack.pop();
        Scroll.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new ScrollBarChartPage2("1", undefined, {}));
