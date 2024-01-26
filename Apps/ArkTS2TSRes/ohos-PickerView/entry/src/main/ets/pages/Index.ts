interface CircleDividerTest_Params {
    showTimeData?: ShowTimePickerViewLib.Model;
    timeData?: TimePickerComponent.Model;
    yearReachSecondData?: YearReachSecondComponent.Model;
    circleDividerData?: CircleDividerViewLib.Model;
    cityData?: CityPickerComponentEntity.Model;
    customizeData?: CustomizePickerComponent.Model;
    cardData?: CardPickerComponent.Model;
    areaData?: AreaDataPickerViewLib.Model;
    scroller?: Scroller;
    selectValue?: string;
    count?: number;
    index?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import router from '@ohos.router';
import { AreaDataPickerViewLib } from '@ohos/pickerview';
import { ShowTimePickerViewLib } from '@ohos/pickerview';
import { CircleDividerViewLib } from '@ohos/pickerview';
import { TimePickerComponent } from '@ohos/pickerview';
import { YearReachSecondComponent } from '@ohos/pickerview';
import { CityPickerComponent } from '@ohos/pickerview';
import { CityPickerComponentEntity } from '@ohos/pickerview';
import { CustomizePickerComponent } from '@ohos/pickerview';
import { CardPickerComponent } from '@ohos/pickerview';
import { DividerType, DateType } from '@ohos/pickerview';
class CircleDividerTest extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__showTimeData = new ObservedPropertyObject(new ShowTimePickerViewLib.Model(), this, "showTimeData");
        this.__timeData = new ObservedPropertyObject(new TimePickerComponent.Model(), this, "timeData");
        this.__yearReachSecondData = new ObservedPropertyObject(new YearReachSecondComponent.Model(), this, "yearReachSecondData");
        this.__circleDividerData = new ObservedPropertyObject(new CircleDividerViewLib.Model(), this, "circleDividerData");
        this.__cityData = new ObservedPropertyObject(new CityPickerComponentEntity.Model(), this, "cityData");
        this.__customizeData = new ObservedPropertyObject(new CustomizePickerComponent.Model(), this, "customizeData");
        this.__cardData = new ObservedPropertyObject(new CardPickerComponent.Model(), this, "cardData");
        this.__areaData = new ObservedPropertyObject(new AreaDataPickerViewLib.Model(), this, "areaData");
        this.scroller = new Scroller();
        this.__selectValue = new ObservedPropertySimple("", this, "selectValue");
        this.count = 0;
        this.__index = new ObservedPropertySimple(0, this, "index");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CircleDividerTest_Params) {
        if (params.showTimeData !== undefined) {
            this.showTimeData = params.showTimeData;
        }
        if (params.timeData !== undefined) {
            this.timeData = params.timeData;
        }
        if (params.yearReachSecondData !== undefined) {
            this.yearReachSecondData = params.yearReachSecondData;
        }
        if (params.circleDividerData !== undefined) {
            this.circleDividerData = params.circleDividerData;
        }
        if (params.cityData !== undefined) {
            this.cityData = params.cityData;
        }
        if (params.customizeData !== undefined) {
            this.customizeData = params.customizeData;
        }
        if (params.cardData !== undefined) {
            this.cardData = params.cardData;
        }
        if (params.areaData !== undefined) {
            this.areaData = params.areaData;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.selectValue !== undefined) {
            this.selectValue = params.selectValue;
        }
        if (params.count !== undefined) {
            this.count = params.count;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
    }
    aboutToBeDeleted() {
        this.__showTimeData.aboutToBeDeleted();
        this.__timeData.aboutToBeDeleted();
        this.__yearReachSecondData.aboutToBeDeleted();
        this.__circleDividerData.aboutToBeDeleted();
        this.__cityData.aboutToBeDeleted();
        this.__customizeData.aboutToBeDeleted();
        this.__cardData.aboutToBeDeleted();
        this.__areaData.aboutToBeDeleted();
        this.__selectValue.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __showTimeData: ObservedPropertyObject<ShowTimePickerViewLib.Model>;
    get showTimeData() {
        return this.__showTimeData.get();
    }
    set showTimeData(newValue: ShowTimePickerViewLib.Model) {
        this.__showTimeData.set(newValue);
    }
    private __timeData: ObservedPropertyObject<TimePickerComponent.Model>;
    get timeData() {
        return this.__timeData.get();
    }
    set timeData(newValue: TimePickerComponent.Model) {
        this.__timeData.set(newValue);
    }
    private __yearReachSecondData: ObservedPropertyObject<YearReachSecondComponent.Model>;
    get yearReachSecondData() {
        return this.__yearReachSecondData.get();
    }
    set yearReachSecondData(newValue: YearReachSecondComponent.Model) {
        this.__yearReachSecondData.set(newValue);
    }
    private __circleDividerData: ObservedPropertyObject<CircleDividerViewLib.Model>;
    get circleDividerData() {
        return this.__circleDividerData.get();
    }
    set circleDividerData(newValue: CircleDividerViewLib.Model) {
        this.__circleDividerData.set(newValue);
    }
    private __cityData: ObservedPropertyObject<CityPickerComponentEntity.Model>;
    get cityData() {
        return this.__cityData.get();
    }
    set cityData(newValue: CityPickerComponentEntity.Model) {
        this.__cityData.set(newValue);
    }
    private __customizeData: ObservedPropertyObject<CustomizePickerComponent.Model>;
    get customizeData() {
        return this.__customizeData.get();
    }
    set customizeData(newValue: CustomizePickerComponent.Model) {
        this.__customizeData.set(newValue);
    }
    private __cardData: ObservedPropertyObject<CardPickerComponent.Model>;
    get cardData() {
        return this.__cardData.get();
    }
    set cardData(newValue: CardPickerComponent.Model) {
        this.__cardData.set(newValue);
    }
    private __areaData: ObservedPropertyObject<AreaDataPickerViewLib.Model>;
    get areaData() {
        return this.__areaData.get();
    }
    set areaData(newValue: AreaDataPickerViewLib.Model) {
        this.__areaData.set(newValue);
    }
    private scroller: Scroller;
    private __selectValue: ObservedPropertySimple<string>;
    get selectValue() {
        return this.__selectValue.get();
    }
    set selectValue(newValue: string) {
        this.__selectValue.set(newValue);
    }
    private count: number;
    private __index: ObservedPropertySimple<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    selectValueChange(selectValueParam: string): void {
        console.info("selectValueParam================" + selectValueParam);
    }
    render() {
        Stack.create();
        Scroll.create(this.scroller);
        Column.create();
        Text.create(this.index.toString());
        Text.visibility(Visibility.None);
        Text.pop();
        //CircleDividerJump({ model: this.circleDividerData })
        Column.create();
        //CircleDividerJump({ model: this.circleDividerData })
        Column.alignItems(HorizontalAlign.Center);
        //CircleDividerJump({ model: this.circleDividerData })
        Column.width("100%");
        Row.create();
        Row.alignItems(VerticalAlign.Top);
        Row.margin({ top: this.circleDividerData.pickerSpace });
        Text.create('圆形分割器');
        Text.height(50);
        Text.fontSize(20);
        Text.fontColor(Color.Black);
        Text.backgroundColor(Color.Gray);
        Text.width("90%");
        Text.textAlign(TextAlign.Center);
        Text.onClick(() => {
            router.pushUrl({ url: 'pages/CircleDividerPickerView',
                params: { text: this.circleDividerData.text,
                    firstArray: this.circleDividerData.firstArray,
                    dividerLineColor: this.circleDividerData.dividerLineColor,
                    dividerLineStroke: this.circleDividerData.dividerLineStroke,
                    columnWidth: this.circleDividerData.columnWidth,
                    fontSize: this.circleDividerData.fontSize,
                    fontColor: this.circleDividerData.fontColor,
                    titleFontSize: this.circleDividerData.titleFontSize,
                    titleFontColor: this.circleDividerData.titleFontColor,
                    cancelButtonFont: this.circleDividerData.cancelButtonFont,
                    confirmButtonFont: this.circleDividerData.confirmButtonFont,
                    cancelButtonColor: this.circleDividerData.cancelButtonColor,
                    confirmButtonColor: this.circleDividerData.confirmButtonColor,
                    color: this.circleDividerData.color,
                    pickerSpace: this.circleDividerData.pickerSpace,
                    buttonBackgroundColor: this.circleDividerData.buttonBackgroundColor,
                    defaultSelection: this.circleDividerData.defaultSelection
                }
            });
        });
        Text.pop();
        Row.pop();
        //CircleDividerJump({ model: this.circleDividerData })
        Column.pop();
        // AreaDataJump({ model: this.areaData })
        Column.create();
        // AreaDataJump({ model: this.areaData })
        Column.alignItems(HorizontalAlign.Center);
        // AreaDataJump({ model: this.areaData })
        Column.width("100%");
        Row.create();
        Row.alignItems(VerticalAlign.Top);
        Row.margin({ top: this.areaData.pickerSpace });
        Text.create('AreaDataParseSample');
        Text.height(50);
        Text.fontSize(20);
        Text.fontColor(Color.Black);
        Text.backgroundColor(Color.Gray);
        Text.width("90%");
        Text.textAlign(TextAlign.Center);
        Text.onClick(() => {
            router.pushUrl({ url: 'pages/AreaDataPickerView',
                params: {
                    text: this.areaData.text,
                    dividerLineColor: this.areaData.dividerLineColor,
                    dividerLineStroke: this.areaData.dividerLineStroke,
                    columnWidth: this.areaData.columnWidth,
                    fontSize: this.areaData.fontSize,
                    fontColor: this.areaData.fontColor,
                    titleFontSize: this.areaData.titleFontSize,
                    titleFontColor: this.areaData.titleFontColor,
                    cancelButtonFont: this.areaData.cancelButtonFont,
                    cancelButtonColor: this.areaData.cancelButtonColor,
                    confirmButtonFont: this.areaData.confirmButtonFont,
                    confirmButtonColor: this.areaData.confirmButtonColor,
                    defaultSelection: this.areaData.defaultSelection,
                    color: this.areaData.color,
                    pickerSpace: this.areaData.pickerSpace,
                    buttonBackgroundColor: this.areaData.buttonBackgroundColor,
                    dividerType: this.areaData.dividerType,
                    lineSpacingMultiplier: this.areaData.lineSpacingMultiplier,
                    popupWindowHeight: this.areaData.popupWindowHeight,
                    textHeight: this.areaData.textHeight
                }
            });
        });
        Text.pop();
        Row.pop();
        // AreaDataJump({ model: this.areaData })
        Column.pop();
        Column.pop();
        Scroll.pop();
        Stack.pop();
    }
    public aboutToAppear() {
        this.showTimeData
            .setDividerLineStroke(2) //设置分割线宽度【0,5】，默认 2
            .setDividerLineColor(Color.Black) //控制分割线颜色
            .setFontSize(20) //控制文字大小
            .setFontColor(Color.Red) //控制文字颜色
            .setConfirmButtonFont("确定") //控制确定按钮显示的文字
            .setCancelButtonFont("取消") //控制取消按钮显示的文字
            .setCancelButtonColor(Color.Red) //控制取消按钮的文字颜色
            .setConfirmButtonColor(Color.Black) //控制确定文字颜色
            .setTitleFontSize(20) //设置标题、确定按钮、取消按钮文字大小
            .setTitleFontColor(Color.Black) //设置标题文字颜色
            .setPickerSpace(20) //设置选择器页面间隔
            .setButtonBackgroundColor("#7CDCDC") //设置按钮背景颜色
            .setYearRangeStart(2001) //时间开始范围
            .setYearRangeEnd(2050) //时间结束范围
            .setDefaultSelection([2005, 5, 11]) //默认选择项
            .setDividerType(DividerType.CIRCLE) //设置分割线类型
            .setLineSpacingMultiplier(40) //设置间距
            .withClick(() => {
            this.showTimeData.withText("clicked " + this.count++ + " times");
        });
        this.timeData
            .setDividerLineStroke(1) //设置分割线宽度【0,5】，默认 2
            .setDividerLineColor(Color.Red) //控制分割线颜色
            .setFontSize(20) //控制文字大小
            .setFontColor(Color.Black) //控制文字颜色
            .setAreaIsShow(false) //控制区是否显示、列的宽度  true:显示区  false： 不显示区
            .setConfirmButtonFont("确定") //控制确定按钮显示的文字
            .setCancelButtonFont("取消") //控制取消按钮显示的文字
            .setCancelButtonColor(Color.Red) //控制取消按钮的文字颜色
            .setConfirmButtonColor(Color.Red) //控制确定文字颜色
            .setTitleFontSize(20) //设置标题、确定按钮、取消按钮文字大小
            .setTitleFontColor(Color.Green) //设置标题文字颜色
            .setPickerSpace(25) //设置选择器页面间隔
            .setYearRangeStart(1999) //设置开始时间
            .setYearRangeEnd(2010) //设置结束时间
            .setButtonBackgroundColor("#7CDCDC") //设置按钮背景颜色
            .setCalendarType(false) //设置显示false：阳历 true：阴历
            .setDefaultSelection(["2005", "10", "03"]) //设置默认选择时间,不设置选项设置为null
            .setDividerType(DividerType.CIRCLE) //设置分割线类型
            .setAutoCancel(true) //设置外部点击是否取消弹框
            .setLineSpacingMultiplier(50) //设置间隔
            .withClick(() => {
            this.timeData.withText("clicked " + this.count++ + " times");
        });
        this.yearReachSecondData
            .setDividerLineStroke(1) //设置分割线宽度【0,5】，默认 2
            .setDividerLineColor(Color.Red) //控制分割线颜色
            .setFontSize(20) //控制文字大小
            .setFontColor(Color.Black) //控制文字颜色
            .setConfirmButtonFont("确定") //控制确定按钮显示的文字
            .setCancelButtonFont("取消") //控制取消按钮显示的文字
            .setCancelButtonColor(Color.Red) //控制取消按钮的文字颜色
            .setConfirmButtonColor(Color.Black) //控制确定文字颜色
            .setTitleFontSize(20) //设置标题、确定按钮、取消按钮文字大小
            .setTitleFontColor(Color.Black) //设置标题文字颜色
            .setPickerSpace(25) //设置选择器页面间隔
            .setButtonBackgroundColor("#7CDCDC") //设置按钮背景颜色
            .setDefaultSelection(["2021", "02", "27", "12", "59", "0"]) //设置默认选择时间,不设置选项设置为0
            .setYearLable("") //设置年Lable
            .setMonthLable("") //设置月Lable
            .setDayLable("") //设置天Lable
            .setHourLable("") //设置时Lable
            .setSecondLable("") //设置分Lable
            .setMinuteLable("") //设置秒Lable
            .setDividerType(DividerType.CIRCLE) //设置分割线类型
            .setDateType([true, true, true, true, true, true]) // 设置 年、月、日 时、分、秒的显示
            .setLineSpacingMultiplier(0) //设置间隔
            .withClick(() => {
            this.yearReachSecondData.withText("clicked " + this.count++ + " times");
        });
        this.circleDividerData
            .setDividerLineStroke(4) //设置分割线宽度，默认 1
            .setDividerLineColor(Color.Green) //控制分割线颜色
            .setFirstArray([11, 22, 33, 44, 55, 66, 77, 88, 99, 100, 200, 300, 400, 500, 600, 700, 800, 900])
            .setFontSize(30) //控制文字大小
            .setFontColor(Color.Red) //控制文字颜色
            .setConfirmButtonFont("ok") //控制确定按钮显示的文字
            .setCancelButtonFont("cancel") //控制取消按钮显示的文字
            .setCancelButtonColor(Color.Red) //控制取消按钮的文字颜色
            .setConfirmButtonColor(Color.Black) //控制确定文字颜色
            .setTitleFontSize(20) //设置标题、确定按钮、取消按钮文字大小
            .setTitleFontColor(Color.Red) //设置标题文字颜色
            .setPickerSpace(25) //设置选择器页面间隔
            .setButtonBackgroundColor("#7CDCDC") //设置按钮背景颜色
            .setDefaultSelection([66]) //设置默认选择城市,不设置选项设置为null
            .withClick(() => {
            this.circleDividerData.withText("clicked " + this.count++ + " times");
        });
        console.warn("setCallback" + this.selectValueChange);
        this.cityData
            .setDividerLineStroke(2) //设置分割线宽度【0,5】，默认 2
            .setDividerLineColor(Color.Red) //控制分割线颜色
            .setFontSize(20) //控制文字大小
            .setFontColor(Color.Black) //控制文字颜色
            .setAreaIsShow(false) //控制区是否显示、列的宽度  true:显示区  false： 不显示区
            .setConfirmButtonFont("确定") //控制确定按钮显示的文字
            .setCancelButtonFont("取消") //控制取消按钮显示的文字
            .setCancelButtonColor(Color.Red) //控制取消按钮的文字颜色
            .setConfirmButtonColor(Color.Black) //控制确定文字颜色
            .setTitleFontSize(20) //设置标题、确定按钮、取消按钮文字大小
            .setTitleFontColor(Color.Black) //设置标题文字颜色
            .setPickerSpace(25) //设置选择器页面间隔
            .setLengthOverFive_fontSize(15) //字符长度超过5个时，设置的字体大小
            .setButtonBackgroundColor("#7CDCDC") //设置按钮背景颜色
            .setDefaultSelection(["江苏省", ""]) //设置默认选择城市,不设置选项设置为null
            .setDividerType(DividerType.CIRCLE) //设置分割线类型
            .setLineSpacingMultiplier(0) //设置间隔
            .setCallback(this.selectValueChange)
            .withClick(() => {
            this.cityData.withText("clicked " + this.count++ + " times");
        });
        this.customizeData
            .setDividerLineStroke(3) //设置分割线宽度【0,5】，默认 2
            .setDividerLineColor(Color.Black) //控制分割线颜色
            //.setNPicker(['c','h','i','n','a'], ['c','h','i','n','a'], ['b','e','i','j','i','n','g'])  //非联动数据
            .setPicker(['c', 'h', 'd'], [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']], [[['11', '11', '11'], ['22', '22', '22'], ['33', '33', '33']], [['44', '44', '44'], ['55', '55', '55'], ['66', '66', '66']], [['77', '77', '77'], ['88', '88', '88'], ['99', '99', '99']]]) //联动数据
            .setThirdIsShow(true) // //自定选择器第三列是否显示
            .setFontSize(30) //控制文字大小
            .setFontColor(Color.Red) //控制文字颜色
            .setConfirmButtonFont("确定") //控制确定按钮显示的文字
            .setCancelButtonFont("取消") //控制取消按钮显示的文字
            .setCancelButtonColor(Color.Black) //控制确定、取消按钮的文字颜色
            .setConfirmButtonColor(Color.Red) //控制确定、取消按钮的文字颜色
            .setTitleFontSize(20) //设置标题、确定按钮、取消按钮文字大小
            .setTitleFontColor(Color.Red) //设置标题文字颜色
            .setPickerSpace(25) //设置选择器页面间隔
            .setButtonBackgroundColor("#7CDCDC") //设置按钮背景颜色
            .setDividerType(DividerType.WRAP) //设置分割线类型
            .setLineSpacingMultiplier(10) //设置文本间距
            .withClick(() => {
            this.customizeData.withText("clicked " + this.count++ + " times");
        });
        this.cardData
            .setDividerLineStroke(1) //设置分割线宽度【0,5】，默认 2
            .setDividerLineColor(Color.Red) //控制分割线颜色
            .setFontSize(20) //控制文字大小
            .setFontColor(Color.Red) //控制文字颜色
            .setAreaIsShow(false) //控制区是否显示、列的宽度  true:显示区  false： 不显示区
            .setConfirmButtonFont("确定") //控制确定按钮显示的文字
            .setCancelButtonFont("取消") //控制取消按钮显示的文字
            .setCancelButtonColor(Color.Black) //控制确定、取消按钮的文字颜色
            .setConfirmButtonColor(Color.Red) //控制确定、取消按钮的文字颜色
            .setTitleFontSize(20) //设置标题、确定按钮、取消按钮文字大小
            .setTitleFontColor(Color.Black) //设置标题文字颜色
            .setPickerSpace(25) //设置选择器页面间隔
            .setButtonBackgroundColor("#7CDCDC") //设置按钮背景颜色
            .setOutSideCancelable(false) //外部点击是否关闭弹窗true:支持外部点击关闭弹窗 false：相反
            .withClick(() => {
            this.cardData.withText("clicked " + this.count++ + " times");
        });
        this.areaData
            .setDividerLineStroke(1) //设置分割线宽度【0,5】，默认 2
            .setDividerLineColor(Color.Red) //控制分割线颜色
            .setFontSize(20) //控制文字大小
            .setFontColor(Color.Black) //控制文字颜色
            .setConfirmButtonFont("确定") //控制确定按钮显示的文字
            .setCancelButtonFont("取消") //控制取消按钮显示的文字
            .setCancelButtonColor(Color.Black) //控制确定、取消按钮的文字颜色
            .setConfirmButtonColor(Color.Red) //控制确定、取消按钮的文字颜色
            .setTitleFontSize(20) //设置标题、确定按钮、取消按钮文字大小
            .setTitleFontColor(Color.Black) //设置标题文字颜色
            .setPickerSpace(25) //设置选择器页面间隔
            .setButtonBackgroundColor("#7CDCDC") //设置按钮背景颜色
            .setDividerType(DividerType.WRAP) //设置分割线类型
            .setLineSpacingMultiplier(10) //设置文本间距
            .withClick(() => {
            this.areaData.withText("clicked " + this.count++ + " times");
        });
    }
}
loadDocument(new CircleDividerTest("1", undefined, {}));
